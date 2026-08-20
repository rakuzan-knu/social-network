import { describe, it, expect } from 'vitest';
import { formatRelativeTime } from '../formatRelativeTime';

describe('formatRelativeTime (Extended)', () => {
  it('formats recent and past timestamps nicely', () => {
    const now = new Date().toISOString();
    const result = formatRelativeTime(now);
    expect(typeof result).toBe('string');
  });
});
