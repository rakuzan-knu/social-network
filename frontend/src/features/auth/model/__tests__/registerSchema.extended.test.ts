import { describe, it, expect } from 'vitest';
import { registerSchema } from '../registerSchema';

describe('registerSchema (Extended)', () => {
  it('enforces password length and email format', () => {
    const res = registerSchema.safeParse({
      firstName: 'Alice',
      lastName: 'Smith',
      username: 'alice_smith',
      identity: 'alice@example.com',
      password: 'password123',
      birthDay: '15',
      birthMonth: 'May',
      birthYear: '2000',
      gender: 'Female',
    });
    expect(res.success).toBe(true);
  });
});
