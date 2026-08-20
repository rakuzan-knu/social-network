import { describe, it, expect } from 'vitest';
import { normalizePost, normalizeFeedPage } from '../postsApi';

describe('postsApi (Extended)', () => {
  it('normalizes raw post responses', () => {
    const rawPost = {
      id: 'p-1',
      text: 'Hello world',
      createdAt: '2026-01-01T00:00:00.000Z',
      author: { id: 'u1', username: 'alice', displayName: 'Alice' },
    };
    const normalized = normalizePost(rawPost as any);
    expect(normalized.id).toBe('p-1');
  });

  it('normalizes feed page with nextCursor', () => {
    const page = normalizeFeedPage({
      posts: [],
      nextCursor: 'cursor-123',
    });
    expect(page.nextCursor).toBe('cursor-123');
    expect(page.posts).toEqual([]);
  });
});
