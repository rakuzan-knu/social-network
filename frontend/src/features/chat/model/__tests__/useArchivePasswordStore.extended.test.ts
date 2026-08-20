import { describe, it, expect } from 'vitest';
import { useArchivePasswordStore } from '../useArchivePasswordStore';

describe('useArchivePasswordStore (Extended)', () => {
  it('sets and resets archive lock state', () => {
    useArchivePasswordStore.getState().resetPassword();
    expect(useArchivePasswordStore.getState().passwordHash).toBeNull();
  });
});
