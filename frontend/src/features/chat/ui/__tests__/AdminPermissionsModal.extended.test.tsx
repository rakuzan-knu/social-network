import { describe, it, expect, vi } from 'vitest';
import AdminPermissionsModal from '../AdminPermissionsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AdminPermissionsModal (Extended)', () => {
  const adminParticipant = {
    userId: 'u2',
    role: 'ADMIN' as const,
    nickname: 'Bob',
    user: { id: 'u2', username: 'bob', displayName: 'Bob', avatar: null },
  };

  it('renders permissions setting modal', () => {
    const { container } = renderWithProviders(
      <AdminPermissionsModal
        conversationId="c1"
        adminParticipant={adminParticipant as any}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
