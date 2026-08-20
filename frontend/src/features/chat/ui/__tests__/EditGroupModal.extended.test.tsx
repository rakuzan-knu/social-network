import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import EditGroupModal from '../EditGroupModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('EditGroupModal (Extended)', () => {
  const conv = { id: 'c1', type: 'GROUP' as const, name: 'Group name', participants: [] };
  it('renders edit group dialog', () => {
    renderWithProviders(
      <EditGroupModal
        conversation={conv as any}
        onClose={vi.fn()}
        onOpenParticipants={vi.fn()}
        onOpenAdmins={vi.fn()}
      />,
    );
    expect(screen.getByText(/edit group/i)).toBeInTheDocument();
  });
});
