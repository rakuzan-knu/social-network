import { AutoDeletePeriod } from '@prisma/client';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Millisecond retention window for each non-OFF auto-delete period. */
export const AUTO_DELETE_INTERVAL_MS: Record<Exclude<AutoDeletePeriod, 'OFF'>, number> = {
  DAY: DAY_MS,
  WEEK: 7 * DAY_MS,
  MONTH: 30 * DAY_MS,
  QUARTER: 90 * DAY_MS,
};

/** Returns the cutoff Date; messages created before it are eligible for deletion. */
export function cutoffFor(period: AutoDeletePeriod, now: number): Date | null {
  if (period === AutoDeletePeriod.OFF) return null;
  return new Date(now - AUTO_DELETE_INTERVAL_MS[period]);
}
