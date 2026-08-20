import { describe, it, expect } from 'vitest';
import { securityApi } from '../securityApi';

describe('securityApi (Extended)', () => {
  it('defines change password and delete account methods', () => {
    expect(securityApi.changePassword).toBeDefined();
    expect(securityApi.deleteAccount).toBeDefined();
  });
});
