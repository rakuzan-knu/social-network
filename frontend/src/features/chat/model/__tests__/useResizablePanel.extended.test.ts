import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useResizablePanel } from '../useResizablePanel';

describe('useResizablePanel (Extended)', () => {
  it('resizes panel width within min and max boundaries', () => {
    const { result } = renderHook(() => useResizablePanel(200, 500, 300));
    expect(result.current.width).toBe(300);
    expect(typeof result.current.handleResizeStart).toBe('function');
  });
});
