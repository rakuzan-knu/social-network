import { describe, it, expect } from 'vitest';
import { privacyApi } from '../privacyApi';

describe('privacyApi (Extended)', () => {
  it('defines privacy settings and exceptions methods', () => {
    expect(privacyApi.getPrivacy).toBeDefined();
    expect(privacyApi.updatePrivacy).toBeDefined();
    expect(privacyApi.listExceptions).toBeDefined();
  });
});
