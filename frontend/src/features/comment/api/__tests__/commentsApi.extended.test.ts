import { describe, it, expect } from 'vitest';
import { commentsApi, normalizeComment } from '../commentsApi';

describe('commentsApi (Extended)', () => {
  it('defines comment query operations and normalizer', () => {
    expect(commentsApi.getComments).toBeDefined();
    expect(commentsApi.getReplies).toBeDefined();
    expect(commentsApi.uploadMedia).toBeDefined();

    const normalized = normalizeComment({
      id: 'c1',
      content: 'Comment body',
      createdAt: '2026-01-01T00:00:00Z',
      author: { id: 'u1', username: 'alice', displayName: 'Alice' },
    } as any);
    expect(normalized.id).toBe('c1');
  });
});
