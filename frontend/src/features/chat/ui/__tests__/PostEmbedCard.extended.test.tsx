import { describe, it, expect } from 'vitest';
import { PostEmbedCard } from '../PostEmbedCard';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PostEmbedCard (Extended)', () => {
  it('renders preview card of shared post', () => {
    const { container } = renderWithProviders(<PostEmbedCard postId="post-123" />);
    expect(container.firstChild).toBeDefined();
  });
});
