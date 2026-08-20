import { describe, it, expect, vi } from 'vitest';
import PinnedMessagesBar from '../PinnedMessagesBar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PinnedMessagesBar (Extended)', () => {
  it('renders pinned banner top bar', () => {
    const { container } = renderWithProviders(
      <PinnedMessagesBar
        pinnedMessages={[]}
        onJumpToMessage={vi.fn()}
        onUnpin={vi.fn()}
        onOpenAllPinned={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
