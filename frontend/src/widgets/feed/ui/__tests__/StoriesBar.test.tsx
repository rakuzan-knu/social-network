import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { StoriesBar } from '../StoriesBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStoryEditorStore } from '@/features/stories/model/useStoryEditorStore';
import { useStoryViewerStore } from '@/features/stories/model/useStoryViewerStore';
import * as storiesModule from '@/features/stories/model/useStories';

vi.mock('@/entities/profile/model/useCurrentUser', () => ({
  useCurrentUser: () => ({
    data: {
      id: 'u-1',
      username: 'alice',
      displayName: 'Alice Wonderland',
      avatar: 'https://example.com/alice.jpg',
    },
  }),
}));

const mockFeed = [
  {
    user: { id: 'u-1', username: 'alice', displayName: 'Alice Wonderland', avatar: null },
    hasUnviewed: true,
    hasCloseFriendsStory: true,
    latestStoryTimestamp: new Date().toISOString(),
    stories: [{ id: 's-own', authorId: 'u-1', mediaUrl: 'https://img.jpg' } as any],
  },
  {
    user: { id: 'u-2', username: 'bob', displayName: 'Bob', avatar: null },
    hasUnviewed: true,
    hasCloseFriendsStory: true,
    latestStoryTimestamp: new Date().toISOString(),
    stories: [
      {
        id: 's-1',
        authorId: 'u-2',
        mediaUrl: 'https://example.com/s1.jpg',
        mediaType: 'IMAGE',
        author: { id: 'u-2', username: 'bob', displayName: 'Bob', avatar: null },
      } as any,
    ],
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('StoriesBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStoryEditorStore.getState().closeEditor();
    useStoryViewerStore.getState().closeViewer();
    vi.spyOn(storiesModule, 'useStoriesFeed').mockReturnValue({
      data: mockFeed as any,
      isLoading: false,
    } as any);
  });

  it('renders current user active story, toggles own story menu and opens viewer/editor', () => {
    render(<StoriesBar />, { wrapper: createWrapper() });

    expect(screen.getByText('Ваша история')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByTitle('Close Friends Story')).toBeInTheDocument();

    // Click own avatar -> opens context menu
    const ownAvatarBtn = screen.getByText('Ваша история').parentElement!.querySelector('button')!;
    fireEvent.click(ownAvatarBtn);

    expect(screen.getByText('Посмотреть')).toBeInTheDocument();
    expect(screen.getByText('Новая история')).toBeInTheDocument();

    // Click Посмотреть
    fireEvent.click(screen.getByText('Посмотреть'));
    expect(useStoryViewerStore.getState().isOpen).toBe(true);

    // Reopen and click Новая история
    fireEvent.click(ownAvatarBtn);
    fireEvent.click(screen.getByText('Новая история'));
    expect(useStoryEditorStore.getState().isOpen).toBe(true);
  });

  it('opens viewer when clicking another user story', () => {
    render(<StoriesBar />, { wrapper: createWrapper() });

    fireEvent.click(screen.getByText('Bob'));
    expect(useStoryViewerStore.getState().isOpen).toBe(true);
  });

  it('renders loading skeleton when loading and empty feed', () => {
    vi.spyOn(storiesModule, 'useStoriesFeed').mockReturnValue({
      data: [],
      isLoading: true,
    } as any);

    render(<StoriesBar />, { wrapper: createWrapper() });
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
