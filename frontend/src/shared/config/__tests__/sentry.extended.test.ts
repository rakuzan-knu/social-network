import { describe, it, expect } from 'vitest';
import { initSentry } from '../sentry';

describe('initSentry (Extended)', () => {
  it('runs initialization without crashing', () => {
    expect(() => initSentry()).not.toThrow();
  });
});
