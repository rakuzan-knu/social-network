import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MessageContextMenu from '../MessageContextMenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageContextMenu (Extended)', () => {
  const msg = { id: 'm1', body: 'Context menu msg', attachments: [] };
  it('renders context menu options', () => {
    renderWithProviders(
      <MessageContextMenu
        message={msg as any}
        isOwnMessage={true}
        onClose={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onForward={vi.fn()}
        onTogglePin={vi.fn()}
        onReport={vi.fn()}
      />,
    );
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });
});
