import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { UndoHideSnackbar } from '../UndoHideSnackbar';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('../../model/useHiddenUndoStore', () => ({
  useHiddenUndoStore: () => ({
    hiddenPostId: 'p-101',
    clearUndo: vi.fn(),
  }),
}));

describe('UndoHideSnackbar (Extended)', () => {
  it('renders post hidden banner with undo action button', () => {
    renderWithProviders(<UndoHideSnackbar />);
    expect(screen.getByText(/post hidden/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });
});
