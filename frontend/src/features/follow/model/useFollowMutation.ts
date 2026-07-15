import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { followApi, FollowListPage } from '../api/followApi';
import type { UserProfile } from '@/features/auth/api/authApi';

export function useFollowMutation(id: string, isFollowing: boolean) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (isFollowing ? followApi.unfollow(id) : followApi.follow(id)),
    onMutate: async () => {
      const nextIsFollowing = !isFollowing;

      queryClient.setQueriesData<UserProfile>(
        {
          queryKey: ['user'],
          predicate: (q) => (q.state.data as UserProfile | undefined)?.id === id,
        },
        (old) =>
          old && {
            ...old,
            isFollowing: nextIsFollowing,
            followersCount: Math.max(0, (old.followersCount ?? 0) + (nextIsFollowing ? 1 : -1)),
          },
      );

      queryClient.setQueriesData<InfiniteData<FollowListPage>>(
        { queryKey: ['followList'] },
        (old) =>
          old?.pages && {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((u) =>
                u.id === id ? { ...u, isFollowing: nextIsFollowing } : u,
              ),
            })),
          },
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['followList'] });
    },
  });
}
