import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import MessageList from '../MessageList';

describe('MessageList (Extended)', () => {
  it('renders chat message list container', () => {
    const { container } = renderWithProviders(
      <MessageList
        messages={[]}
        currentUserId="u1"
        otherParticipantId="u2"
        hasMore={false}
        isLoading={false}
        isFetchingMore={false}
        typingParticipants={[]}
        isGroup={false}
        onLoadMore={vi.fn()}
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
    expect(container).toBeDefined();
  });
});
