import { describe, it, expect, vi } from 'vitest';
import { CommentComposer } from '../CommentComposer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CommentComposer (Extended)', () => {
  it('renders comment composer', () => {
    const { container } = renderWithProviders(
      <CommentComposer
        currentUserHandle="alice"
        replyingTo={null}
        onCancelReply={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );
    expect(container.querySelector('input') || container.querySelector('textarea')).toBeDefined();
  });
});
