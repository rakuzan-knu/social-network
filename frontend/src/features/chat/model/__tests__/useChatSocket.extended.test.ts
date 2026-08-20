import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useChatSocket } from '../useChatSocket';

describe('useChatSocket (Extended)', () => {
  it('connects to chat socket for real-time events', () => {
    const { result } = renderHook(() => useChatSocket());
    expect(result.current).toBeDefined();
  });
});
