import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatFolderContextMenu from '../ChatFolderContextMenu';

describe('ChatFolderContextMenu (Extended)', () => {
  const folder = {
    id: 'f1',
    name: 'Work',
    iconKey: 'briefcase',
    color: '#3b82f6',
    includedConversationIds: [],
    excludedConversationIds: [],
    isCustom: true,
  };
  it('renders context menu for chat folder', () => {
    render(
      <ChatFolderContextMenu
        folder={folder as any}
        x={100}
        y={100}
        onClose={vi.fn()}
        onEdit={vi.fn()}
        onMarkRead={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText(/edit folder/i)).toBeInTheDocument();
  });
});
