import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import BatchDeleteModal from '../BatchDeleteModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BatchDeleteModal (Extended)', () => {
  it('renders multi-message delete prompt', () => {
    renderWithProviders(<BatchDeleteModal count={3} onClose={vi.fn()} onConfirm={vi.fn()} />);
    expect(screen.getByText(/delete 3 messages/i)).toBeInTheDocument();
  });
});
