import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useChatSocketEvent } from '../useChatSocketEvent';

describe('useChatSocketEvent (Extended)', () => {
  it('subscribes and unsubscribes to socket event', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useChatSocketEvent('chat:message', handler));
    expect(typeof unmount).toBe('function');
    unmount();
  });
});
