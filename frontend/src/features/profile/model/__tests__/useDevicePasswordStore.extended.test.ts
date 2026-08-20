import { describe, it, expect } from 'vitest';
import { useDevicePasswordStore } from '../useDevicePasswordStore';

describe('useDevicePasswordStore (Extended)', () => {
  it('sets and checks local device lock state', () => {
    useDevicePasswordStore.getState().unlock();
    expect(useDevicePasswordStore.getState().unlocked).toBe(true);

    useDevicePasswordStore.getState().disable();
    expect(useDevicePasswordStore.getState().unlocked).toBe(false);
  });
});
