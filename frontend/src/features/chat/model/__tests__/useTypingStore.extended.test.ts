import { describe, it, expect, beforeEach } from 'vitest';
import { useTypingStore } from '../useTypingStore';

describe('useTypingStore (Extended)', () => {
  beforeEach(() => {
    useTypingStore.setState({ typingByConversation: {} });
  });

  it('sets and clears active typing indicators', () => {
    useTypingStore.getState().setTypist('conv-1', 'user-1', true, 'Alice');
    expect(useTypingStore.getState().typingByConversation['conv-1']?.length).toBe(1);

    useTypingStore.getState().setTypist('conv-1', 'user-1', false);
    expect(useTypingStore.getState().typingByConversation['conv-1']?.length).toBe(0);
  });
});
