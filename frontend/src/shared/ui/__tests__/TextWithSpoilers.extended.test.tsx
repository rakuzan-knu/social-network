import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextWithSpoilers from '../TextWithSpoilers';

describe('TextWithSpoilers (Extended)', () => {
  it('renders spoiler tags and reveals content on click', () => {
    render(<TextWithSpoilers text="Movie ending: ||the hero wins|| at the end" />);
    expect(screen.getByText(/the hero wins/i)).toBeInTheDocument();
  });
});
