import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { FindAccount } from '../FindAccount';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FindAccount (Extended)', () => {
  it('renders account recovery lookup form', () => {
    renderWithProviders(<FindAccount onSuccess={vi.fn()} />);
    expect(screen.getByPlaceholderText(/email or number/i)).toBeInTheDocument();
  });
});
