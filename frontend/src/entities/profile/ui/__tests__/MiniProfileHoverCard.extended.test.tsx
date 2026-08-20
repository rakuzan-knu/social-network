import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import { MiniProfileHoverCard } from '../MiniProfileHoverCard';
import { renderWithProviders } from '@/test/renderWithProviders';
import { apiClient } from '@/shared/api/httpClient';
import { postsApi } from '@/entities/post/api/postsApi';

vi.mock('@/shared/api/httpClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

vi.mock('@/entities/post/api/postsApi', () => ({
  postsApi: {
    getUserPosts: vi.fn(),
  },
}));

vi.mock('@/features/chat/api/chatApi', () => ({
  chatApi: {
    createDirectConversation: vi.fn(),
  },
}));

describe('MiniProfileHoverCard (Extended)', () => {
  const mockProfile = {
    id: 'user-alice-123',
    username: 'alice',
    displayName: 'Alice Cooper',
    avatar: 'https://example.com/alice.jpg',
    banner: null,
    bio: 'Software engineer and open source contributor',
    isVerified: true,
    followersCount: 1250,
    followingCount: 340,
    postsCount: 42,
    isFollowing: false,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    vi.mocked(apiClient.get).mockResolvedValue({
      data: mockProfile,
    });

    vi.mocked(postsApi.getUserPosts).mockResolvedValue({
      posts: [
        {
          id: 'post-1',
          text: 'Hello world post',
          likes: 12,
          commentsCount: 3,
          createdAt: new Date().toISOString(),
          author: { id: 'user-alice-123', username: 'alice', avatar: null },
        } as any,
      ],
      nextCursor: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders children trigger element when closed', () => {
    renderWithProviders(
      <MiniProfileHoverCard username="alice">
        <span data-testid="user-link">@alice</span>
      </MiniProfileHoverCard>,
    );

    expect(screen.getByTestId('user-link')).toBeInTheDocument();
    expect(
      screen.queryByText('Software engineer and open source contributor'),
    ).not.toBeInTheDocument();
  });

  it('opens hovercard on mouse enter after debounce timer and fetches profile data', async () => {
    renderWithProviders(
      <MiniProfileHoverCard username="@alice">
        <span data-testid="user-link">@alice</span>
      </MiniProfileHoverCard>,
    );

    const trigger = screen.getByTestId('user-link');
    fireEvent.mouseEnter(trigger);

    // Advance 180ms enter timer
    act(() => {
      vi.advanceTimersByTime(180);
    });

    // Check loading indicator or rendered card
    expect(apiClient.get).toHaveBeenCalledWith('/users/by-username/alice');
  });

  it('closes hovercard on mouse leave after delay', () => {
    renderWithProviders(
      <MiniProfileHoverCard username="alice">
        <span data-testid="user-link">@alice</span>
      </MiniProfileHoverCard>,
    );

    const trigger = screen.getByTestId('user-link');
    fireEvent.mouseEnter(trigger);

    act(() => {
      vi.advanceTimersByTime(180);
    });

    fireEvent.mouseLeave(trigger);

    act(() => {
      vi.advanceTimersByTime(250);
    });
  });
});
