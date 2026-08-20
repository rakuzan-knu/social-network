import { describe, it, expect } from 'vitest';
import { derivePasswordVerifier, verifyPasswordVerifier } from '../derivePasswordHash';

describe('derivePasswordHash (Extended)', () => {
  it('derives verifier and verifies password', async () => {
    const stored = await derivePasswordVerifier('secret123');
    expect(stored.hash).toBeDefined();
    const isValid = await verifyPasswordVerifier('secret123', stored);
    expect(isValid).toBe(true);
  });
});
