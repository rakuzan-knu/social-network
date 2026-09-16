import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { postsApi } from '../api/postsApi';
import { FeedPage } from '@/entities/post/api/postsApi';
import { PostType } from '@/entities/post/model/types';

export function useLikeMutation(postId: string | number, isLiked: boolean, queryKey: unknown[]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => (isLiked ? postsApi.unlike(postId) : postsApi.like(postId)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: unknown) => patchFeedData(old, postId, isLiked));
      return { prev };
    },
    onError: (_err, _vars, ctx) => ctx && queryClient.setQueryData(queryKey, ctx.prev),
  });
}

function patchFeedData(old: unknown, postId: string | number, isLiked: boolean): unknown {
  if (!old || typeof old !== 'object' || !('pages' in old)) return old;
  const inf = old as InfiniteData<Record<string, unknown>>;
  const targetId = String(postId);

  return {
    ...inf,
    pages: inf.pages.map((page: Record<string, unknown>) => {
      // Standard FeedPage with .posts array
      if (Array.isArray(page.posts)) {
        return {
          ...page,
          posts: page.posts.map((p: PostType) =>
            String(p.id) === targetId
              ? {
                  ...p,
                  isLiked: !isLiked,
                  likes: Math.max(0, (p.likes ?? 0) + (isLiked ? -1 : 1)),
                }
              : p,
          ),
        };
      }
      // CompactFeedResponse with .data array
      if (Array.isArray(page.data)) {
        return {
          ...page,
          data: page.data.map(
            (item: { id: string; viewer: { isLiked: boolean }; stats: { likes: number } }) =>
              String(item.id) === targetId
                ? {
                    ...item,
                    viewer: { ...item.viewer, isLiked: !isLiked },
                    stats: {
                      ...item.stats,
                      likes: Math.max(0, (item.stats?.likes ?? 0) + (isLiked ? -1 : 1)),
                    },
                  }
                : item,
          ),
        };
      }
      return page;
    }),
  };
}
