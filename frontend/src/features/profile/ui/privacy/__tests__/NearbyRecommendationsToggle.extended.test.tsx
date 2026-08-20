import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import NearbyRecommendationsToggle from '../NearbyRecommendationsToggle';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('NearbyRecommendationsToggle (Extended)', () => {
  it('renders nearby toggle switch', () => {
    renderWithProviders(<NearbyRecommendationsToggle />);
    expect(screen.getByText(/show me in nearby recommendations/i)).toBeInTheDocument();
  });
});
