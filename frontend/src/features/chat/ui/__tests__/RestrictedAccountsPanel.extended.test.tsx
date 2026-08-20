import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import RestrictedAccountsPanel from '../RestrictedAccountsPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('RestrictedAccountsPanel (Extended)', () => {
  it('renders restricted accounts panel with back action', () => {
    renderWithProviders(<RestrictedAccountsPanel onClose={vi.fn()} />);
    expect(screen.getByText(/restricted accounts/i)).toBeInTheDocument();
  });
});
