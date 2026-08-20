import { describe, it, expect } from 'vitest';
import { followApi, normalizeFollowListPage } from '../followApi';

describe('followApi (Extended)', () => {
  it('defines follow, unfollow, and query methods', () => {
    expect(followApi.follow).toBeDefined();
    expect(followApi.unfollow).toBeDefined();
    expect(followApi.getFollowers).toBeDefined();

    const normalized = normalizeFollowListPage({ items: [], nextCursor: null });
    expect(normalized.items).toEqual([]);
  });
});
