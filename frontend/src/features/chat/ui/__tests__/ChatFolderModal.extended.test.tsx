import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatFolderModal from '../ChatFolderModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatFolderModal (Extended)', () => {
  it('renders folder configuration modal', () => {
    renderWithProviders(
      <ChatFolderModal conversations={[]} currentUserId="u1" onClose={vi.fn()} onSave={vi.fn()} />,
    );
    expect(screen.getByText(/new folder/i) || screen.getByRole('dialog')).toBeInTheDocument();
  });
});
