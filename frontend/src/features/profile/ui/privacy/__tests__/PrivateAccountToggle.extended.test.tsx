import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PrivateAccountToggle from '../PrivateAccountToggle';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PrivateAccountToggle (Extended)', () => {
  it('renders private account switch', () => {
    renderWithProviders(<PrivateAccountToggle />);
    expect(screen.getByText(/private account/i)).toBeInTheDocument();
  });
});
