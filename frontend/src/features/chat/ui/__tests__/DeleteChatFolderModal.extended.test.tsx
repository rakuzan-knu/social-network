import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DeleteChatFolderModal from '../DeleteChatFolderModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeleteChatFolderModal (Extended)', () => {
  it('renders delete folder confirmation dialog', () => {
    renderWithProviders(
      <DeleteChatFolderModal folderName="Work" onClose={vi.fn()} onConfirm={vi.fn()} />,
    );
    expect(screen.getByText(/delete folder/i)).toBeInTheDocument();
  });
});
