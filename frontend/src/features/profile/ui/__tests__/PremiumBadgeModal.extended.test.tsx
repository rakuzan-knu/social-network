import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PremiumBadgeModal } from '../PremiumBadgeModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PremiumBadgeModal (Extended)', () => {
  it('renders premium badge information and perks', () => {
    renderWithProviders(<PremiumBadgeModal isOpen={true} onClose={vi.fn()} />);
    expect(
      screen.getByRole('heading', {
        name: /subscribe to premium to get an evolving profile badge/i,
      }),
    ).toBeInTheDocument();
  });
});
