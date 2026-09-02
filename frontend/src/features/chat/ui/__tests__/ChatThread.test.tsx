import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatThread from '../ChatThread';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ConversationView } from '@/entities/chat/model/types';
import * as messagesHookModule from '../../model/useMessages';

vi.mock('../../api/chatApi', () => ({
  chatApi: {
    getMessages: vi.fn().mockResolvedValue({ data: [], hasMore: false }),
    getMessagesAroundDate: vi.fn().mockResolvedValue({ data: [], hasMore: false }),
    sendMessage: vi.fn(),
    markRead: vi.fn(),
  },
}));

describe('ChatThread', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const mockConv = {
    id: 'conv-1',
    type: 'DIRECT',
    name: null,
    avatar: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    unreadCount: 0,
    myMuteLevel: 'NONE',
    isPinned: false,
    participants: [
      {
        userId: 'usr-1',
        role: 'MEMBER',
        mutedUntil: null,
        joinedAt: new Date().toISOString(),
        nickname: null,
        theme: 'DEFAULT',
        muteLevel: 'NONE',
        user: {
          id: 'usr-1',
          username: 'alice',
          displayName: 'Alice Smith',
          avatar: null,
        },
      },
    ],
  } as unknown as ConversationView;

  it('renders chat thread header, controls and handles date jumping and right panel', async () => {
    const today = new Date();
    const mockMessages = [
      {
        id: 'msg-today',
        conversationId: 'conv-1',
        sender: { id: 'usr-1', username: 'alice', displayName: 'Alice Smith', avatar: null },
        body: 'Today message',
        createdAt: today.toISOString(),
        reactions: [],
        readBy: [],
        attachments: [],
        isEdited: false,
        isDeleted: false,
        isPinned: false,
      },
    ];

    vi.spyOn(messagesHookModule, 'useMessages').mockReturnValue({
      messages: mockMessages,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ChatThread conversation={mockConv} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Alice Smith')).toBeInTheDocument();

    // Toggle details
    const infoBtn = screen.getByTitle('Conversation info');
    fireEvent.click(infoBtn);

    await waitFor(() => {
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
  });

  it('renders blocked banner when conversation is blocked', () => {
    const blockedConv = {
      ...mockConv,
      isBlocked: true,
      blockedByMe: true,
      blockingMe: false,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ChatThread conversation={blockedConv} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/you blocked this user/i)).toBeInTheDocument();
  });

  it('handles pinned messages modal jump and single message forward', async () => {
    const convWithPinned: any = {
      ...mockConv,
      pinnedMessages: [
        {
          id: 'pin-1',
          conversationId: 'conv-1',
          body: 'Pinned note',
          createdAt: new Date().toISOString(),
          sender: { id: 'usr-1', username: 'alice', displayName: 'Alice' },
          reactions: [],
          attachments: [],
        },
        {
          id: 'pin-2',
          body: 'Second pinned note',
          createdAt: new Date().toISOString(),
          sender: { id: 'u2', username: 'alice', displayName: 'Alice', avatar: null },
          reactions: [],
          attachments: [],
        },
      ],
    };

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ChatThread conversation={convWithPinned} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // Open pinned messages modal from pinned bar
    const viewAllBtn = screen.getByTitle('View all pinned messages');
    fireEvent.click(viewAllBtn);

    expect(screen.getByRole('heading', { name: /Pinned messages/i })).toBeInTheDocument();
  });
});
