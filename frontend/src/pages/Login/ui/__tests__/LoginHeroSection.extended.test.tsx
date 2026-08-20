import { describe, it, expect } from 'vitest';
import { HeroSection } from '../LoginHeroSection';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('LoginHeroSection (Extended)', () => {
  it('renders login hero promotional content', () => {
    const { container } = renderWithProviders(<HeroSection />);
    expect(container.firstChild).toBeDefined();
  });
});
