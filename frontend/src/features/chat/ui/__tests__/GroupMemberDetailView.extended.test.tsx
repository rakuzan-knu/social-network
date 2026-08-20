import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import GroupMemberDetailView from '../GroupMemberDetailView';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('GroupMemberDetailView (Extended)', () => {
  const participant = {
    userId: 'u1',
    role: 'ADMIN' as const,
    user: { id: 'u1', username: 'alice', displayName: 'Alice', avatar: null, isVerified: false },
  };
  const conv = { id: 'c1', type: 'GROUP' as const, participants: [] };
  it('renders group member profile preview', () => {
    renderWithProviders(
      <GroupMemberDetailView
        participant={participant as any}
        conversation={conv as any}
        canManage={true}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getAllByText('Alice')[0]).toBeInTheDocument();
  });
});
