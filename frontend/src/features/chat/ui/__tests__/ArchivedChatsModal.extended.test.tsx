import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ArchivedChatsModal from '../ArchivedChatsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ArchivedChatsModal (Extended)', () => {
  it('renders archived chats list', () => {
    renderWithProviders(<ArchivedChatsModal onClose={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /archived chats/i })).toBeInTheDocument();
  });
});
