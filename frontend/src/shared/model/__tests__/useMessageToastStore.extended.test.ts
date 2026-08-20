import { describe, it, expect, beforeEach } from 'vitest';
import { useMessageToastStore } from '../useMessageToastStore';

describe('useMessageToastStore (Extended)', () => {
  beforeEach(() => {
    useMessageToastStore.setState({ toasts: [] });
  });

  it('adds and dismisses message toasts', () => {
    const toast = {
      id: 't-1',
      sender: { id: 'u1', username: 'alice', displayName: 'Alice' },
      message: { text: 'Hello!' },
      conversationId: 'c-1',
    };
    useMessageToastStore.getState().addToast(toast as any);

    expect(useMessageToastStore.getState().toasts.length).toBe(1);

    useMessageToastStore.getState().removeToast('t-1');
    expect(useMessageToastStore.getState().toasts.length).toBe(0);
  });
});
