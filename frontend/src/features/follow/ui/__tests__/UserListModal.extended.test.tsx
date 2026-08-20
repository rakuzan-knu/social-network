import { describe, it, expect, vi } from 'vitest';
import { UserListModal } from '../UserListModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('UserListModal (Extended)', () => {
  it('renders user list modal', () => {
    const { container } = renderWithProviders(
      <UserListModal userId="u1" mode="followers" isOwnProfile={true} onClose={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
