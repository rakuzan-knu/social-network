import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DeleteChatHistoryModal from '../DeleteChatHistoryModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeleteChatHistoryModal (Extended)', () => {
  it('renders clear history modal dialog', () => {
    renderWithProviders(
      <DeleteChatHistoryModal conversationName="Alice" onClose={vi.fn()} onConfirm={vi.fn()} />,
    );
    expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
  });
});
