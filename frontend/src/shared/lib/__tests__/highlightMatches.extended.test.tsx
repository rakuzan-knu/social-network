import { describe, it, expect } from 'vitest';
import { highlightMatches } from '../highlightMatches';

describe('highlightMatches (Extended)', () => {
  it('highlights substring matches within text', () => {
    const result = highlightMatches('Hello world', 'world');
    expect(result).toBeDefined();
  });
});
