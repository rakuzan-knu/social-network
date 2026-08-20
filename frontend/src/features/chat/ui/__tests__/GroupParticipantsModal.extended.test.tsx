import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import GroupParticipantsModal from '../GroupParticipantsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('GroupParticipantsModal (Extended)', () => {
  const conv = { id: 'c1', type: 'GROUP' as const, participants: [] };
  it('renders participants modal', () => {
    renderWithProviders(
      <GroupParticipantsModal
        conversation={conv as any}
        currentUserId="u1"
        onClose={vi.fn()}
        onSelectMember={vi.fn()}
      />,
    );
    expect(screen.getByText(/participants/i)).toBeInTheDocument();
  });
});
