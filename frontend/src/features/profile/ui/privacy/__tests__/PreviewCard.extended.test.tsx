import { describe, it, expect } from 'vitest';
import PreviewCard from '../PreviewCard';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PreviewCard (Extended)', () => {
  it('renders preview container', () => {
    const { container } = renderWithProviders(<PreviewCard dimension="BIO" value="EVERYBODY" />);
    expect(container.firstChild).toBeDefined();
  });
});
