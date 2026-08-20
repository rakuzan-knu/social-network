import { describe, it, expect } from 'vitest';
import { BADGE_DICTIONARY, getBadgeById } from '../badges';

describe('Profile Badges Config (Extended)', () => {
  it('defines available badge definitions with titles and icons', () => {
    expect(Array.isArray(BADGE_DICTIONARY)).toBe(true);
    BADGE_DICTIONARY.forEach((b) => {
      expect(b.id).toBeDefined();
      expect(b.name).toBeDefined();
    });
    expect(getBadgeById('DEVELOPER')?.name).toBe('Developer');
  });
});
