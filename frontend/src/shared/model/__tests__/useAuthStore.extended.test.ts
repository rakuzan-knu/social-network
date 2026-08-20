import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore (Extended)', () => {
  beforeEach(() => {
    useAuthStore.getState().clearAuth();
  });

  it('sets credentials on login and clears state on logout', () => {
    useAuthStore.getState().setAuth('u1');

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().userId).toBe('u1');

    useAuthStore.getState().clearAuth();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().userId).toBeNull();
  });
});
