import { describe, it, expect, beforeEach } from 'vitest';
import { usePresenceStore } from '../usePresenceStore';

describe('usePresenceStore (Extended)', () => {
  beforeEach(() => {
    usePresenceStore.setState({ onlineUserIds: new Set() });
  });

  it('sets user online and offline status', () => {
    usePresenceStore.getState().setOnline('user-1');
    expect(usePresenceStore.getState().onlineUserIds.has('user-1')).toBe(true);

    usePresenceStore.getState().setOffline('user-1');
    expect(usePresenceStore.getState().onlineUserIds.has('user-1')).toBe(false);
  });
});
