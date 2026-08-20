import { describe, it, expect } from 'vitest';
import type { PollOptionDraft } from '../types';

describe('Post feature types (Extended)', () => {
  it('allows building poll option drafts', () => {
    const draft: PollOptionDraft = { id: 'draft-1', text: 'Option A' };
    expect(draft.text).toBe('Option A');
  });
});
