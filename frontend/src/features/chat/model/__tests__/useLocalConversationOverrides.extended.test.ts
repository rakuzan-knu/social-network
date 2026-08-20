import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalConversationOverrides } from '../useLocalConversationOverrides';

describe('useLocalConversationOverrides (Extended)', () => {
  it('allows pinning and marking conversations as unread locally', () => {
    const { result } = renderHook(() => useLocalConversationOverrides());

    act(() => {
      result.current.togglePinLocally('c1');
      result.current.toggleUnreadLocally('c1');
    });

    expect(result.current.pinnedLocally.has('c1')).toBe(true);
    expect(result.current.forcedUnreadLocally.has('c1')).toBe(true);
  });
});
