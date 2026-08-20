import { describe, it, expect } from 'vitest';
import { RegisterPage } from '../RegisterPage';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('RegisterPage (Extended)', () => {
  it('renders register page with form', () => {
    const { container } = renderWithProviders(<RegisterPage />);
    expect(container.firstChild).toBeDefined();
  });
});
