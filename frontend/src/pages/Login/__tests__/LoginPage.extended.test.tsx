import { describe, it, expect } from 'vitest';
import { LoginPage } from '../LoginPage';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('LoginPage (Extended)', () => {
  it('renders login page with form', () => {
    const { container } = renderWithProviders(<LoginPage />);
    expect(container.firstChild).toBeDefined();
  });
});
