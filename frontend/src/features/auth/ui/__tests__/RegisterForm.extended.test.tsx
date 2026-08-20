import { describe, it, expect } from 'vitest';
import { RegisterForm } from '../RegisterForm';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('RegisterForm (Extended)', () => {
  it('renders registration form fields', () => {
    const { container } = renderWithProviders(<RegisterForm />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });
});
