import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { AddAccountModal } from '../AddAccountModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AddAccountModal (Extended)', () => {
  it('renders modal dialog to sign in with another account', () => {
    renderWithProviders(<AddAccountModal onClose={vi.fn()} onBack={vi.fn()} />);
    expect(screen.getByText(/add account/i)).toBeInTheDocument();
  });
});
