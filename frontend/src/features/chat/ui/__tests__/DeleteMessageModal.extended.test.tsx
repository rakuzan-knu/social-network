import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DeleteMessageModal from '../DeleteMessageModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeleteMessageModal (Extended)', () => {
  it('renders delete message modal', () => {
    renderWithProviders(
      <DeleteMessageModal isOwnMessage={true} onClose={vi.fn()} onConfirm={vi.fn()} />,
    );
    expect(screen.getByText(/delete message/i)).toBeInTheDocument();
  });
});
