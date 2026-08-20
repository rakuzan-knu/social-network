import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUndoRedoStack } from '../useUndoRedoStack';

describe('useUndoRedoStack (Extended Suite)', () => {
  it('handles Ctrl+Z, Ctrl+Shift+Z, and Ctrl+Y keyboard shortcuts', () => {
    const { result } = renderHook(() => useUndoRedoStack<string>());

    act(() => {
      result.current.commit('State 1');
    });
    act(() => {
      result.current.commit('State 2');
    });
    act(() => {
      result.current.commit('State 3');
    });

    expect(result.current.current).toBe('State 3');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);

    // Press Ctrl+Z to undo
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }),
      );
    });
    expect(result.current.current).toBe('State 2');
    expect(result.current.canRedo).toBe(true);

    // Press Ctrl+Shift+Z to redo
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Z', ctrlKey: true, shiftKey: true, bubbles: true }),
      );
    });
    expect(result.current.current).toBe('State 3');

    // Undo again, then test Ctrl+Y to redo
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }),
      );
    });
    expect(result.current.current).toBe('State 2');

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'y', ctrlKey: true, bubbles: true }),
      );
    });
    expect(result.current.current).toBe('State 3');
  });

  it('safely handles undo and redo on empty stacks', () => {
    const { result } = renderHook(() => useUndoRedoStack<string>());

    act(() => {
      result.current.undo();
    });
    expect(result.current.current).toBe(null);

    act(() => {
      result.current.redo();
    });
    expect(result.current.current).toBe(null);
  });
});
