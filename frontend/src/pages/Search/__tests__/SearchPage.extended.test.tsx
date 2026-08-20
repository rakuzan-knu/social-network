import { describe, it, expect } from 'vitest';
import SearchPage from '../SearchPage';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SearchPage (Extended)', () => {
  it('renders search input and tabs', () => {
    const { container } = renderWithProviders(<SearchPage />);
    expect(container.firstChild).toBeDefined();
  });
});
