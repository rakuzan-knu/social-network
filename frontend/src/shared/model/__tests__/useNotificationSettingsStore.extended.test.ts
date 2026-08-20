import { describe, it, expect } from 'vitest';
import { useNotificationSettingsStore } from '../useNotificationSettingsStore';

describe('useNotificationSettingsStore (Extended)', () => {
  it('updates notification position and sound preferences', () => {
    useNotificationSettingsStore.getState().setToastPosition('top-left');
    expect(useNotificationSettingsStore.getState().toastPosition).toBe('top-left');

    useNotificationSettingsStore.getState().setAllowSound(false);
    expect(useNotificationSettingsStore.getState().allowSound).toBe(false);
  });
});
