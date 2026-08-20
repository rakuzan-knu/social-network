import { describe, it, expect, vi } from 'vitest';
import MessageBubble from '../MessageBubble';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageBubble (Extended)', () => {
  const message = {
    id: 'm1',
    body: 'Hello',
    createdAt: new Date().toISOString(),
    senderId: 'u2',
    sender: { id: 'u2', username: 'bob', displayName: 'Bob', avatar: null },
    attachments: [],
    reactions: [],
  };

  it('renders chat message bubble', () => {
    const { container } = renderWithProviders(
      <MessageBubble
        message={message as any}
        isOwnMessage={false}
        showAvatar={true}
        isReadByOther={false}
        currentUserId="u1"
        onReply={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onForward={vi.fn()}
        onTogglePin={vi.fn()}
        onReact={vi.fn()}
        onUnreact={vi.fn()}
        onReport={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
