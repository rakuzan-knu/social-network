import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MessageReactionsModal from '../MessageReactionsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessageReactionsModal (Extended)', () => {
  it('renders modal with reactions summary', () => {
    renderWithProviders(
      <MessageReactionsModal
        reactions={[]}
        currentUserId="u1"
        onClose={vi.fn()}
        onRemoveOwn={vi.fn()}
      />,
    );
    expect(screen.getByText(/reactions/i)).toBeInTheDocument();
  });
});
