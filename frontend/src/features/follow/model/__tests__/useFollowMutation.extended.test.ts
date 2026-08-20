import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useFollowMutation } from '../useFollowMutation';
import { followApi } from '../../api/followApi';
import { USER_KEY } from '@/shared/api/queryKeys';
import { useAuthStore } from '@/shared/model/useAuthStore';
import { useMessageToastStore } from '@/shared/model/useMessageToastStore';

describe('useFollowMutation (Extended Suite)', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });

    useAuthStore.setState({ userId: 'current-user-1' });
    useMessageToastStore.setState({ toasts: [] });

    queryClient.setQueryData([USER_KEY, 'target-user-2'], {
      id: 'target-user-2',
      username: 'target',
      followersCount: 10,
      followingCount: 5,
      isFollowing: false,
    });

    queryClient.setQueryData([USER_KEY, 'current-user-1'], {
      id: 'current-user-1',
      username: 'current',
      followersCount: 3,
      followingCount: 8,
      isFollowing: false,
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  it('optimistically follows user and increments follower/following counts', async () => {
    vi.spyOn(followApi, 'follow').mockResolvedValueOnce({ success: true } as any);

    const { result } = renderHook(() => useFollowMutation('target-user-2', false), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(followApi.follow).toHaveBeenCalledWith('target-user-2');
    const target = queryClient.getQueryData<any>([USER_KEY, 'target-user-2']);
    expect(target.isFollowing).toBe(true);
    expect(target.followersCount).toBe(11);

    const me = queryClient.getQueryData<any>([USER_KEY, 'current-user-1']);
    expect(me.followingCount).toBe(9);
  });

  it('rolls back optimistic follow and adds error toast on API failure', async () => {
    vi.spyOn(followApi, 'follow').mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useFollowMutation('target-user-2', false), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch {
        // Expected mutation error
      }
    });

    const target = queryClient.getQueryData<any>([USER_KEY, 'target-user-2']);
    expect(target.isFollowing).toBe(false);
    expect(target.followersCount).toBe(10);

    expect(useMessageToastStore.getState().toasts.length).toBeGreaterThan(0);
  });
});
