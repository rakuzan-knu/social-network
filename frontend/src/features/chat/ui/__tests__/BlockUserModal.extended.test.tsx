import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import BlockUserModal from '../BlockUserModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BlockUserModal (Extended)', () => {
  it('renders user blocking dialog', () => {
    renderWithProviders(<BlockUserModal onClose={vi.fn()} />);
    expect(screen.getByText(/block someone/i)).toBeInTheDocument();
  });
});
