import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { RedisSelfHealingService } from '../redis/redis-self-healing.service';
import {
  type HealthResponseDto,
  type PingResponseDto,
  type RedisMemoryInfoDto,
  type SelfHealResponseDto,
  type SelfHealTriggerDto,
  type SelfHealingStatusDto,
} from '@common/contracts';
import { HealthRepository } from './health.repository';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly redisService: RedisService,
    private readonly redisSelfHealingService: RedisSelfHealingService,
  ) {}

  getLiveness(): PingResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness(): Promise<{ isHealthy: boolean; response: HealthResponseDto }> {
    const [dbOk, redisOk, memoryInfo] = await Promise.all([
      this.healthRepository.pingDatabase(),
      this.checkRedis(),
      this.redisSelfHealingService.getRedisMemoryInfo(),
    ]);

    const isHealthy = dbOk && redisOk;

    // Automated self-healing trigger: if Redis memory exceeds threshold (e.g. 90%), execute runbook
    if (memoryInfo.isHighMemory) {
      this.logger.warn(
        `[HEALTH CHECK ALERT] Redis memory high (${memoryInfo.memoryUsagePercent}% >= ${(memoryInfo.thresholdRatio * 100).toFixed(0)}%). Executing automated self-healing runbook...`,
      );
      void this.redisSelfHealingService.checkAndSelfHeal(
        false,
        memoryInfo.thresholdRatio,
        undefined,
        `Automated HealthCheck Trigger (Memory at ${memoryInfo.memoryUsagePercent}%)`,
      );
    }

    const lastEviction = this.redisSelfHealingService.getLastEvictionInfo();
    const selfHealing: SelfHealingStatusDto = {
      status: memoryInfo.isHighMemory ? 'triggered' : 'idle',
      redisMemoryRatio: memoryInfo.memoryRatio,
      redisEvictedKeys: lastEviction.lastEvictedKeysCount,
      lastTriggeredAt: lastEviction.lastEvictionTimestamp,
      actionsExecuted: lastEviction.lastEvictionTimestamp ? ['EVICT_NON_CRITICAL_CACHE_KEYS'] : [],
    };

    const response: HealthResponseDto = {
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: dbOk ? 'ok' : 'error',
        redis: redisOk ? 'ok' : 'error',
      },
      selfHealing,
    };

    return { isHealthy, response };
  }

  async getRedisMemoryInfo(): Promise<RedisMemoryInfoDto> {
    return this.redisSelfHealingService.getRedisMemoryInfo();
  }

  async triggerSelfHealing(dto?: SelfHealTriggerDto): Promise<SelfHealResponseDto> {
    return this.redisSelfHealingService.checkAndSelfHeal(
      dto?.force ?? true,
      dto?.threshold,
      dto?.patterns,
      dto?.reason,
    );
  }

  private async checkRedis(): Promise<boolean> {
    try {
      const pingPromise = this.redisService.getClient().ping();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Redis ping timeout')), 1500),
      );
      await Promise.race([pingPromise, timeoutPromise]);
      return true;
    } catch (e) {
      this.logger.warn(`Redis readiness check failed: ${String(e)}`);
      return false;
    }
  }
}
