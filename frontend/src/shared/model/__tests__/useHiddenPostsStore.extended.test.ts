import { describe, it, expect, beforeEach } from 'vitest';
import { useHiddenPostsStore } from '../useHiddenPostsStore';

describe('useHiddenPostsStore (Extended)', () => {
  beforeEach(() => {
    useHiddenPostsStore.setState({ hiddenIds: new Set() });
  });

  it('hides and unhides posts by ID', () => {
    expect(useHiddenPostsStore.getState().hiddenIds.has('p-1')).toBe(false);

    useHiddenPostsStore.getState().hidePost('p-1');
    expect(useHiddenPostsStore.getState().hiddenIds.has('p-1')).toBe(true);

    useHiddenPostsStore.getState().unhidePost('p-1');
    expect(useHiddenPostsStore.getState().hiddenIds.has('p-1')).toBe(false);
  });
});
