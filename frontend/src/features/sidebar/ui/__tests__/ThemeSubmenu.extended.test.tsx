import { describe, it, expect } from 'vitest';
import { ThemeMenuItem } from '../ThemeSubmenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ThemeSubmenu (Extended)', () => {
  it('renders theme selector submenu', () => {
    const { container } = renderWithProviders(<ThemeMenuItem />);
    expect(container.firstChild).toBeDefined();
  });
});
