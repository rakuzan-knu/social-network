import { describe, it, expect } from 'vitest';
import type { FoundUserResponse } from '../types';

describe('Auth model types (Extended)', () => {
  it('supports found user response typing', () => {
    const user: FoundUserResponse = {
      id: 'u1',
      name: 'Alice',
      role: 'USER',
      maskedEmail: 'a***@example.com',
      maskedPhone: '***-***-1234',
    };
    expect(user.id).toBe('u1');
    expect(user.name).toBe('Alice');
  });
});
