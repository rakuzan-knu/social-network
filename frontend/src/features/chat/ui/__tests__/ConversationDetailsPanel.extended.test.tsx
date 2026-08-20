import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ConversationDetailsPanel from '../ConversationDetailsPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ConversationDetailsPanel (Extended)', () => {
  const conv = { id: 'c1', type: 'DIRECT' as const, participants: [], pinnedMessages: [] };
  const display = { title: 'Alice', avatar: null, avatarUrl: null, isGroup: false };

  it('renders chat details drawer', () => {
    renderWithProviders(
      <ConversationDetailsPanel
        conversation={conv as any}
        display={display as any}
        otherUserId="u2"
        messages={[]}
        onClose={vi.fn()}
        onOpenSearch={vi.fn()}
        onJumpToMessage={vi.fn()}
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
