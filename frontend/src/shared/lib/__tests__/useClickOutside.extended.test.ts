import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside (Extended)', () => {
  it('calls handler when clicking outside target element', () => {
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, handler));

    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(ref.current);
  });
});
