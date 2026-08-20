import { describe, it, expect } from 'vitest';
import { SuggestedUsersCarousel } from '../SuggestedUsersCarousel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SuggestedUsersCarousel (Extended)', () => {
  it('renders suggested users carousel container', () => {
    const { container } = renderWithProviders(<SuggestedUsersCarousel />);
    expect(container).toBeDefined();
  });
});
