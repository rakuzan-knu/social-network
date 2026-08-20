import { describe, it, expect } from 'vitest';
import { followRequestsApi } from '../followRequestsApi';

describe('followRequestsApi (Extended)', () => {
  it('defines follow requests fetch, count, and respond methods', () => {
    expect(followRequestsApi.list).toBeDefined();
    expect(followRequestsApi.count).toBeDefined();
    expect(followRequestsApi.accept).toBeDefined();
    expect(followRequestsApi.reject).toBeDefined();
  });
});
