import { describe, it, expect } from 'vitest';
import { userApi } from '../userApi';

describe('userApi (Extended)', () => {
  it('defines user profile fetch and update methods', () => {
    expect(userApi.getProfile).toBeDefined();
    expect(userApi.getByUsername).toBeDefined();
    expect(userApi.checkUsername).toBeDefined();
  });
});
