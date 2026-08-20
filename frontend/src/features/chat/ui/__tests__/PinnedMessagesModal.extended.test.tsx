import { describe, it, expect, vi } from 'vitest';
import PinnedMessagesModal from '../PinnedMessagesModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PinnedMessagesModal (Extended)', () => {
  it('renders pinned messages list dialog', () => {
    const { container } = renderWithProviders(
      <PinnedMessagesModal
        pinnedMessages={[]}
        onJumpToMessage={vi.fn()}
        onUnpin={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
