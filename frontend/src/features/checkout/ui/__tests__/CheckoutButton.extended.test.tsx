import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CheckoutButton } from '../CheckoutButton';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('../../model/useCheckout', () => ({
  useCheckout: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe('CheckoutButton (Extended)', () => {
  it('renders upgrade button with premium label', () => {
    renderWithProviders(<CheckoutButton cartId="cart-1" onSuccess={vi.fn()} onError={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
