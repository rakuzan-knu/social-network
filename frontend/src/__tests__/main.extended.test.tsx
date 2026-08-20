import { describe, it, expect } from 'vitest';

describe('Main Entrypoint (Extended)', () => {
  it('defines the root render setup and sentry initialization', async () => {
    const sentry = await import('@/shared/config/sentry');
    expect(sentry.initSentry).toBeDefined();
    expect(typeof sentry.initSentry).toBe('function');
  });

  it('provides queryClient configuration', async () => {
    const { queryClient } = await import('@/shared/api/queryClient');
    expect(queryClient).toBeDefined();
    expect(queryClient.getDefaultOptions()).toBeDefined();
  });
});
