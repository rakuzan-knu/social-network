import { z } from 'zod';

export const healthServicesStatusSchema = z.object({
  database: z.enum(['ok', 'error']),
  redis: z.enum(['ok', 'error']),
});

export class HealthServicesStatusDto {
  database!: 'ok' | 'error';
  redis!: 'ok' | 'error';
}

export const selfHealingStatusSchema = z.object({
  status: z.enum(['idle', 'triggered', 'completed', 'error']),
  lastTriggeredAt: z.string().optional(),
  redisMemoryRatio: z.number().optional(),
  redisEvictedKeys: z.number().optional(),
  actionsExecuted: z.array(z.string()).optional(),
});

export class SelfHealingStatusDto {
  status!: 'idle' | 'triggered' | 'completed' | 'error';
  lastTriggeredAt?: string;
  redisMemoryRatio?: number;
  redisEvictedKeys?: number;
  actionsExecuted?: string[];
}

export const healthResponseSchema = z.object({
  status: z.enum(['ok', 'degraded', 'error']),
  timestamp: z.string(),
  uptime: z.number(),
  services: healthServicesStatusSchema,
  selfHealing: selfHealingStatusSchema.optional(),
});

export class HealthResponseDto {
  status!: 'ok' | 'degraded' | 'error';
  timestamp!: string;
  uptime!: number;
  services!: HealthServicesStatusDto;
  selfHealing?: SelfHealingStatusDto;
}

export const pingResponseSchema = z.object({
  status: z.string(),
  timestamp: z.string(),
});

export class PingResponseDto {
  status!: string;
  timestamp!: string;
}

export const redisMemoryInfoSchema = z.object({
  usedMemoryBytes: z.number(),
  usedMemoryHuman: z.string(),
  maxMemoryBytes: z.number(),
  maxMemoryHuman: z.string(),
  memoryRatio: z.number(),
  memoryUsagePercent: z.number(),
  isHighMemory: z.boolean(),
  thresholdRatio: z.number(),
  fragmentationRatio: z.number().optional(),
  peakMemoryBytes: z.number().optional(),
});

export class RedisMemoryInfoDto {
  usedMemoryBytes!: number;
  usedMemoryHuman!: string;
  maxMemoryBytes!: number;
  maxMemoryHuman!: string;
  memoryRatio!: number;
  memoryUsagePercent!: number;
  isHighMemory!: boolean;
  thresholdRatio!: number;
  fragmentationRatio?: number;
  peakMemoryBytes?: number;
}

export const selfHealTriggerSchema = z.object({
  force: z.boolean().optional(),
  threshold: z.number().min(0.1).max(1.0).optional(),
  patterns: z.array(z.string()).optional(),
  reason: z.string().optional(),
});

export class SelfHealTriggerDto {
  force?: boolean;
  threshold?: number;
  patterns?: string[];
  reason?: string;
}

export const selfHealResponseSchema = z.object({
  triggered: z.boolean(),
  reason: z.string(),
  evictedCount: z.number(),
  evictedPatterns: z.record(z.number()),
  memoryBeforeBytes: z.number(),
  memoryAfterBytes: z.number(),
  freedBytes: z.number(),
  memoryRatioBefore: z.number(),
  memoryRatioAfter: z.number(),
  durationMs: z.number(),
  timestamp: z.string(),
});

export class SelfHealResponseDto {
  triggered!: boolean;
  reason!: string;
  evictedCount!: number;
  evictedPatterns!: Record<string, number>;
  memoryBeforeBytes!: number;
  memoryAfterBytes!: number;
  freedBytes!: number;
  memoryRatioBefore!: number;
  memoryRatioAfter!: number;
  durationMs!: number;
  timestamp!: string;
}
