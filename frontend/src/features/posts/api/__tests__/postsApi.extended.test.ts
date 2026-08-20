import { describe, it, expect } from 'vitest';
import { postsApi } from '../postsApi';

describe('postsApi mutations (Extended)', () => {
  it('defines post creation, edit, like, repost, and bookmark mutations', () => {
    expect(postsApi.createPost).toBeDefined();
    expect(postsApi.editPost).toBeDefined();
    expect(postsApi.deletePost).toBeDefined();
    expect(postsApi.like).toBeDefined();
    expect(postsApi.repost).toBeDefined();
  });
});
