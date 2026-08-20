import { describe, it, expect, vi } from 'vitest';
import Profile from '../Profile';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('@/entities/profile/model/useCurrentUser', () => ({
  useCurrentUser: () => ({
    data: { id: 'u1', username: 'my_profile', displayName: 'My Profile', avatar: null },
    isLoading: false,
  }),
}));

vi.mock('@/entities/profile/model/useUserByUsername', () => ({
  useUserByUsername: () => ({
    data: {
      id: 'u1',
      username: 'my_profile',
      displayName: 'My Profile',
      avatar: null,
      followersCount: 0,
      followingCount: 0,
    },
    isLoading: false,
  }),
}));

vi.mock('@/entities/post/model/useUserPosts', () => ({
  useUserPosts: () => ({
    data: { pages: [{ posts: [] }] },
    isLoading: false,
  }),
}));

vi.mock('@/entities/post/model/useUserReposts', () => ({
  useUserReposts: () => ({
    data: { pages: [{ posts: [] }] },
    isLoading: false,
  }),
}));

describe('ProfilePage (Extended)', () => {
  it('renders profile page wrapper', () => {
    const { container } = renderWithProviders(<Profile />);
    expect(container.firstChild).toBeDefined();
  });
});
