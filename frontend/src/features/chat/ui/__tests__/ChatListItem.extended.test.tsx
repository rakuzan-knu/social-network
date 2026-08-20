import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatListItem from '../ChatListItem';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatListItem (Extended)', () => {
  const conv = {
    id: 'c1',
    type: 'DIRECT' as const,
    participants: [
      {
        userId: 'u2',
        role: 'MEMBER',
        user: { id: 'u2', username: 'bob', displayName: 'Bob', avatar: null },
      },
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  };

  it('renders conversation snippet item', () => {
    renderWithProviders(
      <ChatListItem
        conversation={conv as any}
        isActive={false}
        currentUserId="u1"
        isPinnedLocally={false}
        isForcedUnread={false}
        onSelect={vi.fn()}
        onTogglePinLocally={vi.fn()}
        onToggleUnreadLocally={vi.fn()}
      />,
    );
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
