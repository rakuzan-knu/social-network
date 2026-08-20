import { describe, it, expect } from 'vitest';
import { userSearchApi } from '../userSearchApi';

describe('userSearchApi (Extended)', () => {
  it('defines user search method', () => {
    expect(userSearchApi.search).toBeDefined();
  });
});
