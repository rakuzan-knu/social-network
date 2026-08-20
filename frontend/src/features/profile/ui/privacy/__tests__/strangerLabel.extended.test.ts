import { describe, it, expect } from 'vitest';
import { strangerLabel } from '../strangerLabel';

describe('strangerLabel (Extended)', () => {
  it('returns human-readable visibility labels', () => {
    expect(typeof strangerLabel('LAST_SEEN', 'EVERYBODY')).toBe('string');
    expect(typeof strangerLabel('BIO', 'CONTACTS')).toBe('string');
    expect(typeof strangerLabel('MESSAGES', 'NOBODY')).toBe('string');
  });
});
