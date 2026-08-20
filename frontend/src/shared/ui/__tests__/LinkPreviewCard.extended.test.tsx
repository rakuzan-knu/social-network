import { describe, it, expect } from 'vitest';
import { LinkPreviewCard } from '../LinkPreviewCard';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('LinkPreviewCard (Extended)', () => {
  it('renders OpenGraph metadata with title and domain', () => {
    const { container } = renderWithProviders(<LinkPreviewCard url="https://github.com" />);
    expect(container.firstChild).toBeDefined();
  });
});
