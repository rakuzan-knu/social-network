import { describe, it, expect, vi } from 'vitest';
import MessageSearchPanel from '../MessageSearchPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageSearchPanel (Extended)', () => {
  it('renders search panel', () => {
    const { container } = renderWithProviders(
      <MessageSearchPanel conversationId="c1" onClose={vi.fn()} onJumpToMessage={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
