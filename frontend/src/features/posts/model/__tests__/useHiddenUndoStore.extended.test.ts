import { describe, it, expect, beforeEach } from 'vitest';
import { useHiddenUndoStore } from '../useHiddenUndoStore';

describe('useHiddenUndoStore (Extended)', () => {
  beforeEach(() => {
    useHiddenUndoStore.getState().clearUndo();
  });

  it('sets and clears undo snackbar state', () => {
    useHiddenUndoStore.getState().showUndo('post-101');
    expect(useHiddenUndoStore.getState().activeUndo?.postId).toBe('post-101');

    useHiddenUndoStore.getState().clearUndo();
    expect(useHiddenUndoStore.getState().activeUndo).toBeNull();
  });
});
