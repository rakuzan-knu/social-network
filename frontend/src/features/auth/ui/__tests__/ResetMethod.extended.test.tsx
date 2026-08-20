import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ResetMethod } from '../ResetMethod';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ResetMethod (Extended)', () => {
  const user = {
    id: 'u1',
    name: 'Alice',
    role: 'USER',
    maskedEmail: 'a***@example.com',
    maskedPhone: '***-***-1234',
  };

  it('renders method selection options', () => {
    renderWithProviders(<ResetMethod user={user} onCancel={vi.fn()} />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });
});
