import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ContributorBadgeModal } from '../ContributorBadgeModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ContributorBadgeModal (Extended)', () => {
  it('renders contributor badge modal with tiers', () => {
    renderWithProviders(<ContributorBadgeModal isOpen={true} onClose={vi.fn()} prCount={5} />);
    expect(screen.getByText(/contributor badge/i)).toBeInTheDocument();
  });
});
