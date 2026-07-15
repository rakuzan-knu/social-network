import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../features/auth/api/authApi';
import { useAuthStore } from './useAuthStore';

export function useCurrentUser() {
  const { userId, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => {
      if (!userId) throw new Error('User not identified');
      return authApi.getProfile(userId);
    },
    enabled: isAuthenticated && !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
