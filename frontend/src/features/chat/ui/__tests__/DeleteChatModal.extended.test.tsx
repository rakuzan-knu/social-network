import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DeleteChatModal from '../DeleteChatModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeleteChatModal (Extended)', () => {
  it('renders delete conversation modal', () => {
    renderWithProviders(
      <DeleteChatModal
        conversationName="Alice"
        avatarUrl={null}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );
    expect(screen.getByText(/delete chat/i)).toBeInTheDocument();
  });
});
