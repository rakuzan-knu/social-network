import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedPage, postsApi } from '../api/postsApi';

export const FEED_QUERY_KEY = ['feed'] as const;

export function usePostsFeed() {
  return useInfiniteQuery<FeedPage>({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => postsApi.getFeed(pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
