import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi, FeedPage } from '../api/postsApi';

export function useUserPosts(userId: string) {
  return useInfiniteQuery<FeedPage>({
    queryKey: ['userPosts', userId],
    queryFn: ({ pageParam }) => postsApi.getUserPosts(userId, pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!userId,
  });
}
