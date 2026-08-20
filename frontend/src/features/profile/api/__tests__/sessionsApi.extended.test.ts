import { describe, it, expect } from 'vitest';
import { sessionsApi } from '../sessionsApi';

describe('sessionsApi (Extended)', () => {
  it('defines session list and revoke methods', () => {
    expect(sessionsApi.list).toBeDefined();
    expect(sessionsApi.revoke).toBeDefined();
    expect(sessionsApi.revokeAllOthers).toBeDefined();
  });
});
