import { describe, it, expect } from 'vitest';
import { LoginForm } from '../LoginForm';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('LoginForm (Extended)', () => {
  it('renders login form with inputs', () => {
    const { container } = renderWithProviders(<LoginForm />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });
});
