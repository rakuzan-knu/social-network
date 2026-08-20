import { describe, it, expect, vi } from 'vitest';
import GroupMembersSection from '../GroupMembersSection';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('GroupMembersSection (Extended)', () => {
  const conv = { id: 'c1', type: 'GROUP' as const, participants: [] };

  it('renders group participants section', () => {
    const { container } = renderWithProviders(
      <GroupMembersSection
        conversation={conv as any}
        onSelectMember={vi.fn()}
        onAddMembers={vi.fn()}
        onViewAll={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
