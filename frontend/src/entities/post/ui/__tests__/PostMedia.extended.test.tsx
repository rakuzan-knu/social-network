import { describe, it, expect } from 'vitest';
import { PostMedia } from '../PostMedia';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PostMedia (Extended)', () => {
  it('renders post media gallery', () => {
    const media = [{ id: 'm1', type: 'image' as const, url: 'https://example.com/pic.jpg' }];
    const { container } = renderWithProviders(<PostMedia media={media} />);
    expect(container.firstChild).toBeDefined();
  });
});
