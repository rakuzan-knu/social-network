import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaRecorderGesture } from '../useMediaRecorderGesture';

describe('useMediaRecorderGesture (Extended)', () => {
  it('initializes recorder state', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useMediaRecorderGesture({ onSend }));
    expect(result.current.recordState).toBe('idle');
  });
});
