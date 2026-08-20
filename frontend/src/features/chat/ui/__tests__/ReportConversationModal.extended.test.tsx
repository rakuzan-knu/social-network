import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ReportConversationModal from '../ReportConversationModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ReportConversationModal (Extended)', () => {
  it('renders report conversation dialog', () => {
    renderWithProviders(<ReportConversationModal userId="u1" onClose={vi.fn()} />);
    expect(screen.getByText(/report conversation/i)).toBeInTheDocument();
  });
});
