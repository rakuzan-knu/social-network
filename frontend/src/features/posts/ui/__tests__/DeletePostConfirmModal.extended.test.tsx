import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { DeletePostConfirmModal } from '../DeletePostConfirmModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeletePostConfirmModal (Extended)', () => {
  it('renders delete confirmation prompt and fires onConfirm', () => {
    const onConfirm = vi.fn();
    renderWithProviders(
      <DeletePostConfirmModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={onConfirm}
        isDeleting={false}
      />,
    );

    expect(screen.getByText(/delete post?/i)).toBeInTheDocument();
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);
    expect(onConfirm).toHaveBeenCalled();
  });
});
