import { describe, it, expect } from 'vitest';
import type { PollOptionResult } from '../types';

describe('Post Entity Types (Extended)', () => {
  it('types poll option results', () => {
    const opt: PollOptionResult = {
      id: 'o1',
      text: 'Option 1',
      votes: 10,
    };
    expect(opt.votes).toBe(10);
  });
});
