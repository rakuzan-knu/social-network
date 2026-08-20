import { describe, it, expect } from 'vitest';
import { extractFirstUrl } from '../urlUtils';

describe('urlUtils (Extended)', () => {
  it('extracts http and https URLs from text', () => {
    const text = 'Visit https://github.com and http://example.org';
    const first = extractFirstUrl(text);
    expect(first).toBe('https://github.com/');
  });
});
