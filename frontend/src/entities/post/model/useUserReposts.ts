import { useInfiniteQuery } from '@tanstack/react-query';
import { postsApi, FeedPage } from '../api/postsApi';

export function useUserReposts(userId: string) {
  return useInfiniteQuery<FeedPage>({
    queryKey: ['userReposts', userId],
    queryFn: ({ pageParam }) => postsApi.getUserReposts(userId, pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!userId,
  });
}
