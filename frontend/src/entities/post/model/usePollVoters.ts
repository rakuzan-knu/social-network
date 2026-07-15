import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../api/postsApi';

export interface PollVoterGroup {
  optionId: string;
  voters: { id: string; username: string; displayName?: string; avatar?: string | null }[];
}

export function usePollVoters(postId: string | number) {
  return useQuery<PollVoterGroup[]>({
    queryKey: ['poll-voters', postId],
    queryFn: () => postsApi.getPollVoters(postId),
  });
}
