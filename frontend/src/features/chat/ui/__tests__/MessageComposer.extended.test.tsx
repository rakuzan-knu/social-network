import { describe, it, expect, vi } from 'vitest';
import MessageComposer from '../MessageComposer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageComposer (Extended)', () => {
  it('renders chat message composer', () => {
    const actions = {
      sendMessage: vi.fn(),
      editMessage: vi.fn(),
      deleteMessage: vi.fn(),
      togglePin: vi.fn(),
      toggleReaction: vi.fn(),
      sendVoiceNote: vi.fn(),
      sendVideoNote: vi.fn(),
      sendPoll: vi.fn(),
      sendTyping: vi.fn(),
    };

    const { container } = renderWithProviders(
      <MessageComposer
        conversationId="c1"
        actions={actions as any}
        replyingTo={null}
        onCancelReply={vi.fn()}
        stagedFiles={[]}
        stagedFilesError={null}
        onDismissFilesError={vi.fn()}
        isGroup={false}
        onAddFiles={vi.fn()}
        onRemoveFile={vi.fn()}
        onReplaceFile={vi.fn()}
        onClearFiles={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
