import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import EditProfileModal from '../EditProfileModal';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('@/entities/profile/model/useCurrentUser', () => ({
  useCurrentUser: () => ({
    data: { id: 'u1', username: 'alice', displayName: 'Alice Cooper', bio: 'Bio' },
  }),
}));

describe('EditProfileModal (Extended)', () => {
  it('renders edit profile form', () => {
    renderWithProviders(<EditProfileModal />);
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
  });
});
