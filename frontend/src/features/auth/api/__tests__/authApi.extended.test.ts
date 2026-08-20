import { describe, it, expect } from 'vitest';
import { authApi } from '../authApi';

describe('authApi (Extended)', () => {
  it('defines authentication and account recovery methods', () => {
    expect(authApi.login).toBeDefined();
    expect(authApi.register).toBeDefined();
    expect(authApi.findAccount).toBeDefined();
    expect(authApi.resetPassword).toBeDefined();
  });
});
