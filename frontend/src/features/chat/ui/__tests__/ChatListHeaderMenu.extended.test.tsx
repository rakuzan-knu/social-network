import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ChatListHeaderMenu from '../ChatListHeaderMenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatListHeaderMenu (Extended)', () => {
  it('renders main header menu options', () => {
    renderWithProviders(<ChatListHeaderMenu onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
});
