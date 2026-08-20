import { describe, it, expect, beforeEach } from 'vitest';
import { useAccountsStore } from '../useAccountsStore';

describe('useAccountsStore (Extended)', () => {
  beforeEach(() => {
    useAccountsStore.setState({ accounts: [], activeAccountId: null });
  });

  it('adds, activates, and removes accounts in the switcher list', () => {
    const acc1 = {
      id: 'acc-1',
      username: 'alice',
      displayName: 'Alice',
      avatar: null,
      accessToken: 'tok1',
      refreshToken: 'ref1',
    };
    const acc2 = {
      id: 'acc-2',
      username: 'bob',
      displayName: 'Bob',
      avatar: null,
      accessToken: 'tok2',
      refreshToken: 'ref2',
    };

    useAccountsStore.getState().upsertAccount(acc1);
    expect(useAccountsStore.getState().accounts.length).toBe(1);
    expect(useAccountsStore.getState().activeAccountId).toBe('acc-1');

    useAccountsStore.getState().upsertAccount(acc2);
    expect(useAccountsStore.getState().accounts.length).toBe(2);

    useAccountsStore.getState().switchAccount('acc-2');
    expect(useAccountsStore.getState().activeAccountId).toBe('acc-2');

    useAccountsStore.getState().removeAccount('acc-1');
    expect(useAccountsStore.getState().accounts.length).toBe(1);
    expect(useAccountsStore.getState().accounts[0].id).toBe('acc-2');
  });
});
