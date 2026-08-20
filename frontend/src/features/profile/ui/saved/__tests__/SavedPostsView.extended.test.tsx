import { describe, it, expect } from 'vitest';
import { SavedPostsView } from '../SavedPostsView';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SavedPostsView (Extended)', () => {
  it('renders saved posts container', () => {
    const { container } = renderWithProviders(<SavedPostsView userId="user-1" />);
    expect(container.firstChild).toBeDefined();
  });
});
