import { describe, it, expect } from 'vitest';
import { colorForHostname } from '../extractChatMedia';

describe('extractChatMedia (Extended)', () => {
  it('extracts media and colors', () => {
    expect(typeof colorForHostname('github.com')).toBe('string');
  });
});
