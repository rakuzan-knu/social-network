import { describe, it, expect } from 'vitest';
import { ForgotPasswordPage } from '../ForgotPasswordPage';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ForgotPasswordPage (Extended)', () => {
  it('renders password reset wizard page', () => {
    const { container } = renderWithProviders(<ForgotPasswordPage />);
    expect(container.firstChild).toBeDefined();
  });
});
