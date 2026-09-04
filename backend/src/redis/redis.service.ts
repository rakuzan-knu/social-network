import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { uid } from 'uid';
import { REDIS_CLIENT } from './redis.constants';
import { safeJsonParse } from '../common/utils/json.util';
import { InMemoryLruCache, type LruCacheStats } from '../common/cache/in-memory-lru-cache';

export interface CachePayload<T> {
  value: T;
  ttl: number;
  savedAt: number;
  deltaMs: number;
}

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly fallbackLru = new InMemoryLruCache<string, string>({
    maxSize: 10_000,
    defaultTtlSeconds: 300,
  });

  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {
    this.setupRedisEventHandlers();
  }

  private readonly onRedisError = (err: Error) => {
    if (!this.fallbackLru.isDegraded()) {
      this.fallbackLru.setDegraded(true);
      this.logger.warn(
        `[Degraded Mode] Redis connection error: ${err.message}. Switched to In-Memory LRU Fallback Cache (Read-Only mode).`,
      );
    }
  };

  private readonly onRedisClose = () => {
    if (!this.fallbackLru.isDegraded()) {
      this.fallbackLru.setDegraded(true);
      this.logger.warn(
        `[Degraded Mode] Redis connection closed. Switched to In-Memory LRU Fallback Cache (Read-Only mode).`,
      );
    }
  };

  private readonly onRedisReady = () => {
    if (this.fallbackLru.isDegraded()) {
      this.fallbackLru.setDegraded(false);
      this.logger.log(
        `[Self-Healing] Redis connection recovered and ready. Exited degraded mode, resumed primary Redis operations.`,
      );
    }
  };

  private setupRedisEventHandlers(): void {
    if (!this.client || typeof this.client.on !== 'function') return;
    this.client.on('error', this.onRedisError);
    this.client.on('close', this.onRedisClose);
    this.client.on('ready', this.onRedisReady);
  }

  private isRedisReady(): boolean {
    if (!this.client || typeof this.client.status !== 'string') return true;
    const status = this.client.status;
    return status === 'ready' || status === 'connect' || status === 'connecting';
  }

  private handleRedisFailure(error: unknown, op: string): void {
    if (!this.fallbackLru.isDegraded()) {
      this.fallbackLru.setDegraded(true);
      this.logger.warn(
        `[Degraded Mode] Redis operation ${op} failed: ${String(error)}. Fallback LRU cache engaged.`,
      );
    }
  }

  isDegraded(): boolean {
    return this.fallbackLru.isDegraded();
  }

  getFallbackStats(): LruCacheStats {
    return this.fallbackLru.getStats();
  }

  clearFallbackCache(): void {
    this.fallbackLru.clear();
  }

  private readonly inFlightLoads = new Map<string, Promise<unknown>>();

  onModuleInit(): void {
    this.logger.log('RedisService initialized');
  }

  onModuleDestroy(): void {
    if (this.client && typeof this.client.off === 'function') {
      this.client.off('error', this.onRedisError);
      this.client.off('close', this.onRedisClose);
      this.client.off('ready', this.onRedisReady);
    }
    this.inFlightLoads.clear();
    this.fallbackLru.clear();
  }

  getClient(): Redis {
    return this.client;
  }

  async set(key: string, value: string, ttlSeconds: number = 86400): Promise<void> {
    const safeTtl = Math.max(1, Math.floor(ttlSeconds));
    this.fallbackLru.set(key, value, safeTtl);

    try {
      if (this.isRedisReady()) {
        if (typeof this.client.setex === 'function') {
          await this.client.setex(key, safeTtl, value);
        } else {
          await this.client.set(key, value, 'EX', safeTtl);
        }
      }
    } catch (e) {
      this.handleRedisFailure(e, `set(${key})`);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      if (this.isRedisReady()) {
        const result = await this.client.get(key);
        if (result !== null) {
          this.fallbackLru.set(key, result);
          return result;
        }
      }
    } catch (e) {
      this.handleRedisFailure(e, `get(${key})`);
    }

    const fallback = this.fallbackLru.get(key);
    return fallback ?? null;
  }

  async del(key: string): Promise<void> {
    this.fallbackLru.delete(key);
    try {
      if (this.isRedisReady()) {
        await this.client.del(key);
      }
    } catch (e) {
      this.handleRedisFailure(e, `del(${key})`);
    }
  }

  /** Deletes every key matching a glob pattern using batch unlinks to prevent RAM spikes and stream leaks. */
  async delByPattern(pattern: string): Promise<void> {
    try {
      if (
        this.client.status !== 'ready' &&
        this.client.status !== 'connecting' &&
        this.client.status !== 'connect'
      ) {
        return;
      }
      const stream = this.client.scanStream({ match: pattern, count: 200 });
      try {
        for await (const resultKeys of stream) {
          const keys = resultKeys as string[];
          if (keys.length > 0) {
            await this.client.unlink(...keys);
          }
        }
      } finally {
        stream.destroy();
      }
    } catch (e) {
      if (String(e).includes('Connection is closed')) {
        return;
      }
      this.logger.error(`Redis delByPattern failed for pattern ${pattern}: ${String(e)}`);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1 || Number(result) > 0 || result === (true as unknown as number);
    } catch (e) {
      this.logger.warn(`Redis exists failed for ${key}: ${String(e)}`);
      return false;
    }
  }

  /**
   * Acquires a distributed lock using Redis SET NX PX.
   * Returns a unique token string if lock acquired, or null if already locked.
   */
  async acquireLock(lockKey: string, ttlMs = 5000): Promise<string | null> {
    try {
      const token = uid(16);
      const result = await this.client.set(lockKey, token, 'PX', Math.max(100, ttlMs), 'NX');
      return result === 'OK' ? token : null;
    } catch (e) {
      this.logger.warn(`Redis acquireLock failed for ${lockKey}: ${String(e)}`);
      return null;
    }
  }

  /**
   * Releases a distributed lock atomically using Lua script only if token matches.
   */
  async releaseLock(lockKey: string, token: string): Promise<boolean> {
    try {
      const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;
      const result = await this.client.eval(script, 1, lockKey, token);
      return result === 1;
    } catch (e) {
      this.logger.warn(`Redis releaseLock failed for ${lockKey}: ${String(e)}`);
      return false;
    }
  }

  /**
   * Executes an asynchronous action wrapped with a distributed mutex lock and retries.
   */
  async withLock<T>(
    lockKey: string,
    action: () => Promise<T>,
    options?: { ttlMs?: number; retryCount?: number; retryDelayMs?: number },
  ): Promise<T> {
    const ttlMs = options?.ttlMs ?? 5000;
    const retryCount = options?.retryCount ?? 10;
    const retryDelayMs = options?.retryDelayMs ?? 100;

    let token: string | null = null;
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      token = await this.acquireLock(lockKey, ttlMs);
      if (token) break;
      if (attempt < retryCount) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }

    if (!token) {
      throw new Error(`Failed to acquire lock for key ${lockKey} after ${retryCount} attempts`);
    }

    try {
      return await action();
    } finally {
      await this.releaseLock(lockKey, token);
    }
  }

  /**
   * Singleflight loader with promise coalescing and TTL jitter to prevent stampedes.
   */
  async getOrSet<T>(key: string, ttlSeconds: number, loader: () => Promise<T>): Promise<T> {
    try {
      if (this.isRedisReady()) {
        const cached = await this.client.get(key);
        if (cached) {
          const parsed = safeJsonParse<T>(cached);
          if (parsed !== null) {
            this.fallbackLru.set(key, cached, ttlSeconds);
            return parsed;
          }
        }
      }
    } catch (e) {
      this.handleRedisFailure(e, `getOrSet.read(${key})`);
    }

    // Check in-memory LRU fallback
    const fallbackRaw = this.fallbackLru.get(key);
    if (fallbackRaw) {
      const parsed = safeJsonParse<T>(fallbackRaw);
      if (parsed !== null) return parsed;
    }

    // Coalesce concurrent in-flight requests for the same key to prevent cache stampede / memory spikes
    const inFlight = this.inFlightLoads.get(key) as Promise<T> | undefined;
    if (inFlight) {
      return inFlight;
    }

    const loadPromise = (async () => {
      try {
        const value = await loader();
        const jitter = Math.floor(Math.random() * Math.min(15, Math.max(1, ttlSeconds * 0.1)));
        const ttl = ttlSeconds + jitter;
        const serialized = JSON.stringify(value);

        // Always populate in-memory fallback LRU
        this.fallbackLru.set(key, serialized, ttl);

        try {
          if (this.isRedisReady()) {
            await this.client.set(key, serialized, 'EX', ttl);
          }
        } catch (e) {
          this.handleRedisFailure(e, `getOrSet.write(${key})`);
        }
        return value;
      } finally {
        this.inFlightLoads.delete(key);
      }
    })();

    this.inFlightLoads.set(key, loadPromise);
    return loadPromise;
  }

  /**
   * Reads from cache or computes value using XFetch probabilistic early expiration.
   * Refreshes hot cache keys in background before TTL expires to prevent stampedes.
   */
  async getOrSetWithProbabilisticEarlyExpiration<T>(
    key: string,
    ttlSeconds: number,
    loader: () => Promise<T>,
    options?: { beta?: number },
  ): Promise<T> {
    const beta = options?.beta ?? 1.0;
    const raw = await this.get(key);

    if (raw) {
      try {
        const parsed = safeJsonParse<CachePayload<T>>(raw);
        if (parsed && typeof parsed === 'object' && 'value' in parsed && 'savedAt' in parsed) {
          const now = Date.now();
          const remainingMs = parsed.savedAt + parsed.ttl * 1000 - now;
          const deltaMs = parsed.deltaMs || 50;

          // XFetch formula: -delta * beta * ln(random) > remainingMs
          const random = Math.random();
          const earlyExpirationThresholdMs =
            -deltaMs * beta * Math.log(random > 0 ? random : 0.0001);

          if (earlyExpirationThresholdMs <= remainingMs) {
            return parsed.value;
          }

          // Probabilistic early expiration triggered: run background reload asynchronously
          void (async () => {
            const lockKey = `lock:${key}`;
            const token = await this.acquireLock(lockKey, 5000);
            if (!token) return;
            try {
              const start = process.hrtime.bigint();
              const freshValue = await loader();
              const computeDuration = Number(process.hrtime.bigint() - start) / 1_000_000;
              const payload: CachePayload<T> = {
                value: freshValue,
                ttl: ttlSeconds,
                savedAt: Date.now(),
                deltaMs: computeDuration,
              };
              await this.set(key, JSON.stringify(payload), ttlSeconds);
            } catch (err) {
              this.logger.warn(`Background XFetch refresh failed for ${key}: ${String(err)}`);
            } finally {
              await this.releaseLock(lockKey, token);
            }
          })();

          return parsed.value;
        }
      } catch {
        // Fall through to standard loading on corrupted JSON
      }
    }

    // Cache miss: compute and save with metadata
    return this.getOrSet(key, ttlSeconds, async () => {
      const start = process.hrtime.bigint();
      const value = await loader();
      const computeDuration = Number(process.hrtime.bigint() - start) / 1_000_000;
      const payload: CachePayload<T> = {
        value,
        ttl: ttlSeconds,
        savedAt: Date.now(),
        deltaMs: computeDuration,
      };
      await this.set(key, JSON.stringify(payload), ttlSeconds);
      return value;
    });
  }

  async zadd(
    key: string,
    score: number,
    member: string,
    ttlSeconds: number = 86400 * 30,
  ): Promise<number> {
    try {
      const result = await this.client.zadd(key, score, member);
      if (ttlSeconds) {
        await this.client.expire(key, Math.max(1, Math.floor(ttlSeconds)));
      }
      return result;
    } catch (e) {
      this.logger.warn(`Redis zadd failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async zrangebyscore(key: string, min: string | number, max: string | number): Promise<string[]> {
    try {
      return await this.client.zrangebyscore(key, min, max);
    } catch (e) {
      this.logger.warn(`Redis zrangebyscore failed for ${key}: ${String(e)}`);
      return [];
    }
  }

  async zremrangebyrank(key: string, start: number, stop: number): Promise<number> {
    try {
      return await this.client.zremrangebyrank(key, start, stop);
    } catch (e) {
      this.logger.warn(`Redis zremrangebyrank failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async incr(key: string, ttlSeconds: number = 86400 * 7): Promise<number> {
    try {
      const val = await this.client.incr(key);
      if (ttlSeconds && val === 1) {
        await this.client.expire(key, Math.max(1, Math.floor(ttlSeconds)));
      }
      return val;
    } catch (e) {
      this.logger.warn(`Redis incr failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async expire(key: string, seconds: number): Promise<number> {
    try {
      return await this.client.expire(key, Math.max(1, Math.floor(seconds)));
    } catch (e) {
      this.logger.warn(`Redis expire failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    try {
      const result = await this.client.sadd(key, ...members);
      await this.client.expire(key, 86400 * 30);
      return result;
    } catch (e) {
      this.logger.warn(`Redis sadd failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async saddWithTtl(key: string, ttlSeconds: number, ...members: string[]): Promise<number> {
    try {
      const result = await this.client.sadd(key, ...members);
      if (ttlSeconds) {
        await this.client.expire(key, Math.max(1, Math.floor(ttlSeconds)));
      }
      return result;
    } catch (e) {
      this.logger.warn(`Redis saddWithTtl failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.srem(key, ...members);
    } catch (e) {
      this.logger.warn(`Redis srem failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async scard(key: string): Promise<number> {
    try {
      return await this.client.scard(key);
    } catch (e) {
      this.logger.warn(`Redis scard failed for ${key}: ${String(e)}`);
      return 0;
    }
  }

  async smembers(key: string): Promise<string[]> {
    try {
      return await this.client.smembers(key);
    } catch (e) {
      this.logger.warn(`Redis smembers failed for ${key}: ${String(e)}`);
      return [];
    }
  }

  async geoadd(
    key: string,
    longitude: number,
    latitude: number,
    member: string,
    ttlSeconds: number = 86400 * 30,
  ): Promise<number> {
    try {
      const result = await this.client.geoadd(key, longitude, latitude, member);
      if (ttlSeconds) {
        await this.client.expire(key, Math.max(1, Math.floor(ttlSeconds)));
      }
      return result;
    } catch (e) {
      this.logger.warn(`Redis geoadd failed: ${String(e)}`);
      return 0;
    }
  }

  async geodist(
    key: string,
    member1: string,
    member2: string,
    unit: 'm' | 'km' = 'km',
  ): Promise<number | null> {
    try {
      const geoClient = this.client as unknown as {
        geodist: (k: string, m1: string, m2: string, u: string) => Promise<string | number | null>;
      };
      const dist = await geoClient.geodist(key, member1, member2, unit);
      return dist !== null && dist !== undefined ? parseFloat(String(dist)) : null;
    } catch (e) {
      this.logger.warn(`Redis geodist failed: ${String(e)}`);
      return null;
    }
  }

  async geosearchMembers(
    key: string,
    longitude: number,
    latitude: number,
    radiusKm: number,
    count = 30,
  ): Promise<string[]> {
    try {
      const geoClient = this.client as unknown as {
        geosearch: (
          k: string,
          from: string,
          lon: number,
          lat: number,
          by: string,
          radius: number,
          u: string,
          order: string,
          countFlag: string,
          cnt: number,
        ) => Promise<string[]>;
      };
      const results: unknown = await geoClient.geosearch(
        key,
        'FROMLONLAT',
        longitude,
        latitude,
        'BYRADIUS',
        radiusKm,
        'km',
        'ASC',
        'COUNT',
        count,
      );
      return Array.isArray(results) ? (results as string[]) : [];
    } catch {
      try {
        const fallbackClient = this.client as unknown as {
          georadius: (
            k: string,
            lon: number,
            lat: number,
            radius: number,
            u: string,
            countFlag: string,
            cnt: number,
            order: string,
          ) => Promise<string[]>;
        };
        const results: unknown = await fallbackClient.georadius(
          key,
          longitude,
          latitude,
          radiusKm,
          'km',
          'COUNT',
          count,
          'ASC',
        );
        return Array.isArray(results) ? (results as string[]) : [];
      } catch (e) {
        this.logger.warn(`Redis geosearch/georadius failed: ${String(e)}`);
        return [];
      }
    }
  }

  async dismissSuggestedUser(viewerId: string, targetId: string): Promise<void> {
    try {
      await this.client
        .multi()
        .sadd(`user:dismissed_suggestions:${viewerId}`, targetId)
        .expire(`user:dismissed_suggestions:${viewerId}`, 2592000)
        .exec();
    } catch (e) {
      this.logger.warn(`Redis dismissSuggestedUser failed: ${String(e)}`);
    }
  }
}
