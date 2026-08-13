import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  services: {
    database: 'ok' | 'error';
    redis: 'ok' | 'error';
  };
}

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Service health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  async check(): Promise<HealthStatus> {
    const [dbOk, redisOk] = await Promise.all([this.checkDatabase(), this.checkRedis()]);

    const allOk = dbOk && redisOk;

    return {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        database: dbOk ? 'ok' : 'error',
        redis: redisOk ? 'ok' : 'error',
      },
    };
  }

  @SkipThrottle()
  @Get('ping')
  @Get('api/ping')
  @Get('health/ping')
  @ApiOperation({ summary: 'Lightweight keep-alive ping for monitoring' })
  @ApiResponse({ status: 200, description: 'Ping successful' })
  ping(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health/debug-sentry')
  @ApiOperation({ summary: 'Trigger Sentry test error' })
  @ApiResponse({ status: 500, description: 'Internal Server Error (Sentry Test)' })
  debugSentry(): void {
    throw new Error('🔥 Sentry Integration Test Error from NestJS Health Check!');
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      await this.redis.getClient().ping();
      return true;
    } catch {
      return false;
    }
  }
}
