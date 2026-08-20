import { describe, it, expect } from 'vitest';
import { CollectionCardCover } from '../CollectionCardCover';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CollectionCardCover (Extended)', () => {
  it('renders collection card cover', () => {
    const { container } = renderWithProviders(<CollectionCardCover coverImg={null} post={null} />);
    expect(container).toBeDefined();
  });
});
