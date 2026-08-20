import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ForwardMessageModal from '../ForwardMessageModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ForwardMessageModal (Extended)', () => {
  it('renders forward to chat modal', () => {
    renderWithProviders(<ForwardMessageModal onClose={vi.fn()} onForward={vi.fn()} />);
    expect(screen.getByText(/forward message/i)).toBeInTheDocument();
  });
});
