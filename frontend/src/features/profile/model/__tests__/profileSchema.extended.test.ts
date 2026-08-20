import { describe, it, expect } from 'vitest';
import { profileSchema, RESERVED_USERNAMES } from '../profileSchema';

describe('profileSchema (Extended)', () => {
  it('disallows reserved usernames like admin and system', () => {
    expect(RESERVED_USERNAMES.includes('admin')).toBe(true);
    const res = profileSchema.safeParse({ username: 'admin', displayName: 'Admin User' });
    expect(res.success).toBe(false);
  });
});
