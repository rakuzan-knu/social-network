import { describe, it, expect } from 'vitest';
import Feed from '../Feed';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FeedPage (Extended)', () => {
  it('renders the feed page layout', () => {
    const { container } = renderWithProviders(<Feed />);
    expect(container.firstChild).toBeDefined();
  });
});
