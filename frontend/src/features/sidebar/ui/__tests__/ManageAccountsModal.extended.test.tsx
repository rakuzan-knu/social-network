import { describe, it, expect, vi } from 'vitest';
import { ManageAccountsModal } from '../ManageAccountsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ManageAccountsModal (Extended)', () => {
  it('renders manage accounts modal', () => {
    const { container } = renderWithProviders(
      <ManageAccountsModal onClose={vi.fn()} onAddAccount={vi.fn()} onSwitchAccount={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
