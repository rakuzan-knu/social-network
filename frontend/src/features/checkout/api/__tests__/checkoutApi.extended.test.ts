import { describe, it, expect } from 'vitest';
import { checkoutApi } from '../checkoutApi';

describe('checkoutApi (Extended)', () => {
  it('defines checkout method', () => {
    expect(checkoutApi.checkout).toBeDefined();
  });
});
