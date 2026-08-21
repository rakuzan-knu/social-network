import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import EditProfileModal from '../EditProfileModal';
import { useUIStore } from '@/shared/model/useUIStore';
import { useAuthStore } from '@/shared/model/useAuthStore';
import { resetUIStore } from '@/test/resetUIStore';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('@/entities/profile/model/useCurrentUser', () => ({
  useCurrentUser: () => ({
    data: { id: 'u1', username: 'alice', displayName: 'Alice Cooper', bio: 'Bio' },
    isLoading: false,
  }),
}));

describe('EditProfileModal (Extended)', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.getState().setAuth('u1');
      useUIStore.getState().openEditProfile();
    });
  });

  afterEach(() => {
    act(() => {
      resetUIStore();
      useAuthStore.getState().clearAuth();
    });
  });

  it('renders edit profile modal with account information section', () => {
    renderWithProviders(<EditProfileModal />);
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
  });
});
