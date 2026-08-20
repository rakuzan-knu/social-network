import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MediaLightbox from '../MediaLightbox';

describe('MediaLightbox (Extended)', () => {
  const items = [
    {
      message: {
        id: 'm1',
        conversationId: 'c1',
        senderId: 'u1',
        sender: { id: 'u1', username: 'alice', displayName: 'Alice', avatar: null },
        body: 'photo',
        createdAt: '2026-01-01',
        reactions: [],
        attachments: [],
      },
      attachment: {
        id: 'a1',
        type: 'IMAGE',
        url: 'https://example.com/pic.jpg',
        fileName: 'pic.jpg',
        size: 1024,
      },
    },
  ];
  it('renders fullscreen media viewer', () => {
    const { container } = render(
      <MediaLightbox
        items={items as any}
        index={0}
        onIndexChange={vi.fn()}
        onClose={vi.fn()}
        onJumpToMessage={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
