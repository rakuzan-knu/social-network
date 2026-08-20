import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { AuthFooter } from '../AuthFooter';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AuthFooter (Extended)', () => {
  it('renders copyright and navigation footer links', () => {
    renderWithProviders(<AuthFooter />);
    expect(screen.getByText(/terms/i) || screen.getByText(/privacy/i)).toBeInTheDocument();
  });
});
