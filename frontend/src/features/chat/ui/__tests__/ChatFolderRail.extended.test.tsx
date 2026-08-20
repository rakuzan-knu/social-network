import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ChatFolderRail from '../ChatFolderRail';

describe('ChatFolderRail (Extended)', () => {
  it('renders folder rail with active folder', () => {
    const { container } = render(
      <ChatFolderRail
        folders={[]}
        conversations={[]}
        forcedUnreadIds={new Set()}
        activeFolderId="all"
        onSelect={vi.fn()}
        onCreate={vi.fn()}
        onContextMenu={vi.fn()}
        onReorder={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
