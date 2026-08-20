import { describe, it, expect } from 'vitest';
import { loginSchema } from '../loginSchema';

describe('loginSchema (Extended)', () => {
  it('validates credentials schema', () => {
    const valid = loginSchema.safeParse({ identity: 'alice@example.com', password: 'password123' });
    expect(valid.success).toBe(true);
  });
});
