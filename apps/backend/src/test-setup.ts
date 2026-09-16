import { Logger } from '@nestjs/common';
import { vi } from 'vitest';
import * as dotenv from 'dotenv';
import path from 'path';

// Expose vi as jest globally with comprehensive Jest API polyfills for legacy tests
const jestProxy = new Proxy(vi as any, {
  get(target, prop, receiver) {
    if (prop === 'setTimeout') {
      return (ms: number) => {
        try {
          vi.setConfig({ testTimeout: ms });
        } catch {
          // ignore if called before runner context init
        }
      };
    }
    if (prop === 'isolateModules') {
      return (fn: () => void) => fn();
    }
    if (prop === 'retryTimes') {
      return (num: number) => {
        try {
          (vi as any).setConfig({ retry: num });
        } catch {
          // ignore
        }
      };
    }
    return Reflect.get(target, prop, receiver);
  },
});
(globalThis as any).jest = jestProxy;

// Legacy Jest (done) callback compatibility wrapper for Vitest 3.x
const wrapTestFn = (fn: any) => {
  if (typeof fn === 'function' && fn.length > 0) {
    return () =>
      new Promise<void>((resolve, reject) => {
        const done = (err?: any) => {
          if (err) reject(err instanceof Error ? err : new Error(String(err)));
          else resolve();
        };
        try {
          const result = fn(done);
          if (result && typeof result.then === 'function') {
            result.then(
              () => resolve(),
              (reason) => reject(reason instanceof Error ? reason : new Error(String(reason))),
            );
          }
        } catch (e) {
          reject(e instanceof Error ? e : new Error(String(e)));
        }
      });
  }
  return fn;
};

const createTestWrapper = (orig: any) => {
  if (!orig) return orig;
  const wrapped = (name: string, fn: any, timeout?: number) => orig(name, wrapTestFn(fn), timeout);
  Object.assign(wrapped, orig);
  if (orig.only)
    wrapped.only = (name: string, fn: any, timeout?: number) =>
      orig.only(name, wrapTestFn(fn), timeout);
  if (orig.skip) wrapped.skip = orig.skip;
  if (orig.concurrent)
    wrapped.concurrent = (name: string, fn: any, timeout?: number) =>
      orig.concurrent(name, wrapTestFn(fn), timeout);
  return wrapped;
};

if ((globalThis as any).it) {
  (globalThis as any).it = createTestWrapper((globalThis as any).it);
}
if ((globalThis as any).test) {
  (globalThis as any).test = createTestWrapper((globalThis as any).test);
}

// Load backend/.env if present
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Silence NestJS info/warn logging in unit tests to keep test outputs clean and legible
Logger.overrideLogger(['error']);

// Provide fallback test environment variables for modules validating env on import
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/social?schema=public';
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || 'test-jwt-access-secret-at-least-32-chars-long-for-testing';
process.env.JWT_ACCESS_TTL = process.env.JWT_ACCESS_TTL || '15m';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'test-jwt-refresh-secret-at-least-32-chars-long-for-testing';
process.env.JWT_REFRESH_TTL = process.env.JWT_REFRESH_TTL || '7d';

afterAll(async () => {
  // Allow pending async microtasks/timers to drain cleanly before Jest terminates
  await new Promise((resolve) => setTimeout(resolve, 100));
});
