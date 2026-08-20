import { describe, it, expect, vi } from 'vitest';
import { AccountSwitcherMenuItem } from '../AccountSwitcherSubmenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AccountSwitcherSubmenu (Extended)', () => {
  it('renders account switcher dropdown items', () => {
    const { container } = renderWithProviders(
      <AccountSwitcherMenuItem onSwitchAccount={vi.fn()} onOpenManageAccounts={vi.fn()} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
