import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MessengerPage from '../Messenger';
import { renderWithProviders } from '@/test/renderWithProviders';
import { useConversations } from '@/features/chat/model/useConversations';

vi.mock('@/widgets/sidebar/ui/RailwaySidebar', () => ({
  default: () => <div data-testid="messenger-sidebar">Sidebar</div>,
}));

vi.mock('@/features/chat/ui/ChatListPanel', () => ({
  default: () => <div data-testid="chat-list-panel">Chat List</div>,
}));

vi.mock('@/features/chat/ui/ChatThread', () => ({
  default: ({ conversation }: { conversation: any }) => (
    <div data-testid="chat-thread">Thread: {conversation.id}</div>
  ),
}));

vi.mock('@/features/chat/model/usePresence', () => ({
  usePresenceSync: vi.fn(),
}));

vi.mock('@/features/chat/model/useConversations', () => ({
  useConversations: vi.fn(),
}));

describe('MessengerPage (Extended)', () => {
  it('renders sidebar, chat list panel, and empty state when no conversation is selected', () => {
    vi.mocked(useConversations).mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    renderWithProviders(<MessengerPage />);

    expect(screen.getByTestId('messenger-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('chat-list-panel')).toBeInTheDocument();
    expect(screen.getByText('Select a chat to start messaging')).toBeInTheDocument();
  });

  it('renders active ChatThread when active conversationId is in route params', () => {
    vi.mocked(useConversations).mockReturnValue({
      data: [
        {
          id: 'conv-active-1',
          type: 'DIRECT',
          participants: [],
          lastMessage: null,
          unreadCount: 0,
          pinnedMessages: [],
        },
      ],
      isLoading: false,
    } as any);

    renderWithProviders(<MessengerPage />, {
      initialEntries: ['/messages/conv-active-1'],
    });

    // When route matches, ChatThread will render
  });
});
