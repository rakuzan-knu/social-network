import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatListPanel from '../ChatListPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatListPanel (Extended)', () => {
  it('renders conversation search and list panel', () => {
    renderWithProviders(
      <ChatListPanel onSelectConversation={vi.fn()} activeConversationId={null} />,
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});
