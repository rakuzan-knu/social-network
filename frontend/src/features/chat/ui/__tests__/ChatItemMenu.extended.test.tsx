import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatItemMenu from '../ChatItemMenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatItemMenu (Extended)', () => {
  const conv = { id: 'c1', type: 'DIRECT' as const, participants: [] };
  it('renders context options for a conversation item', () => {
    renderWithProviders(
      <ChatItemMenu
        conversation={conv as any}
        otherUserId="u2"
        isPinnedLocally={false}
        isForcedUnread={false}
        onTogglePinLocally={vi.fn()}
        onToggleUnreadLocally={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText(/mute/i) || screen.getByRole('menu')).toBeInTheDocument();
  });
});
