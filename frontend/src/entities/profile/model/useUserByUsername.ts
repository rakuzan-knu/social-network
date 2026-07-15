import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/authApi';

export function useUserByUsername(username?: string) {
  return useQuery({
    queryKey: ['user', 'by-username', username],
    queryFn: () => {
      if (!username) throw new Error('Username not specified');
      return authApi.getByUsername(username);
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
}
