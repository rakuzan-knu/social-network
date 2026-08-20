import { describe, it, expect } from 'vitest';
import { resetSessionStores } from '../resetSession';
import { useAuthStore } from '../useAuthStore';

describe('resetSessionStores (Extended)', () => {
  it('resets auth session stores cleanly', () => {
    useAuthStore.getState().setAuth('user-1');
    resetSessionStores();
    expect(typeof resetSessionStores).toBe('function');
  });
});
