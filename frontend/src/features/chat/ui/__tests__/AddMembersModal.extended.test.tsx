import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import AddMembersModal from '../AddMembersModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AddMembersModal (Extended)', () => {
  it('renders modal to add participants to group', () => {
    renderWithProviders(
      <AddMembersModal conversationId="c1" existingMemberIds={[]} onClose={vi.fn()} />,
    );
    expect(screen.getByText(/add members/i)).toBeInTheDocument();
  });
});
