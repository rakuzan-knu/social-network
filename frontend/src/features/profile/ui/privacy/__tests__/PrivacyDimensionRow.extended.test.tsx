import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import PrivacyDimensionRow from '../PrivacyDimensionRow';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PrivacyDimensionRow (Extended)', () => {
  it('renders privacy dimension selector', () => {
    renderWithProviders(
      <PrivacyDimensionRow dimension="BIO" title="Bio" privacy={undefined} onClick={vi.fn()} />,
    );
    expect(screen.getByText('Bio')).toBeInTheDocument();
  });
});
