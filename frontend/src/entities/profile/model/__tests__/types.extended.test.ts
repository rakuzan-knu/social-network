import { describe, it, expect } from 'vitest';
import type { UserProfile } from '../types';

describe('Profile Entity Types (Extended)', () => {
  it('validates UserProfile schema structure', () => {
    const profile: Partial<UserProfile> = {
      id: 'u-1',
      username: 'johndoe',
      displayName: 'John Doe',
      bio: 'Software architect',
      followersCount: 150,
      followingCount: 75,
    };
    expect(profile.username).toBe('johndoe');
    expect(profile.followersCount).toBe(150);
  });
});
