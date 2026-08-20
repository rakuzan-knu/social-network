import { describe, it, expect } from 'vitest';
import type { CommentType } from '../types';

describe('Comment Entity Types (Extended)', () => {
  it('types CommentType attributes correctly', () => {
    const comment: Partial<CommentType> = {
      id: 'c1',
      text: 'Comment body',
      createdAt: '2026-01-01',
    };
    expect(comment.text).toBe('Comment body');
  });
});
