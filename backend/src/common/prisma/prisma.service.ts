import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool, type PoolConfig } from 'pg';

import os from 'os';

export function createPgPool(
  rawUrl?: string,
  options?: {
    poolLimit?: number;
    poolTimeout?: number;
    connectTimeout?: number;
    statementTimeout?: number;
    queryTimeout?: number;
  },
): Pool | undefined {
  if (!rawUrl) return undefined;
  if (rawUrl.startsWith('memory://') || rawUrl === 'memory') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createInMemoryPgPool } = require('../../../test/in-memory-db');
      return createInMemoryPgPool();
    } catch {
      return undefined;
    }
  }
  const cpus = os.cpus()?.length || 2;
  const defaultPoolLimit = Math.max(5, Math.min(30, cpus * 4));
  const poolLimit =
    options?.poolLimit ?? Number(process.env.DATABASE_POOL_LIMIT || defaultPoolLimit);
  const idleTimeoutMillis =
    (options?.poolTimeout ?? Number(process.env.DATABASE_POOL_TIMEOUT_SECONDS || 10)) * 1000;
  const connectionTimeoutMillis =
    (options?.connectTimeout ?? Number(process.env.DATABASE_CONNECT_TIMEOUT_SECONDS || 10)) * 1000;
  const statementTimeout =
    options?.statementTimeout ?? Number(process.env.DATABASE_STATEMENT_TIMEOUT_MS || 10000);
  const queryTimeout =
    options?.queryTimeout ?? Number(process.env.DATABASE_QUERY_TIMEOUT_MS || 10000);

  const config: PoolConfig = {
    connectionString: rawUrl,
    max: poolLimit,
    idleTimeoutMillis,
    connectionTimeoutMillis,
    statement_timeout: statementTimeout,
    query_timeout: queryTimeout,
  };

  return new Pool(config);
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  readonly pool?: Pool | undefined;

  constructor() {
    const rawUrl = process.env.DATABASE_URL;
    let pool: Pool | undefined;
    let adapter: PrismaPg | undefined;

    if (rawUrl) {
      pool = createPgPool(rawUrl);
      if (pool) {
        adapter = new PrismaPg(pool);
      }
    }

    super(
      adapter
        ? {
            adapter,
            log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
          }
        : {
            log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
          },
    );

    this.pool = pool;
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    try {
      const statementTimeout = Number(process.env.DATABASE_STATEMENT_TIMEOUT_MS || 10000);
      await this.$executeRawUnsafe(`SET statement_timeout = ${statementTimeout};`);
      await this.$executeRawUnsafe(
        `SET idle_in_transaction_session_timeout = ${statementTimeout};`,
      );
      await this.$executeRawUnsafe(`SET lock_timeout = ${statementTimeout};`);
    } catch {
      // Ignored for testing mocks or non-postgres environments
    }
  }

  getPoolMetrics(): { total: number; idle: number; active: number; waiting: number } | null {
    if (!this.pool) return null;
    const total = this.pool.totalCount;
    const idle = this.pool.idleCount;
    const waiting = this.pool.waitingCount;
    const active = Math.max(0, total - idle);
    return { total, idle, active, waiting };
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
    } catch {
      // Ignore disconnect error on teardown
    }
    try {
      if (this.pool && !this.pool.ended && !this.pool.ending) {
        await this.pool.end();
      }
    } catch {
      // Ignore pool end error on teardown
    }
  }
}
