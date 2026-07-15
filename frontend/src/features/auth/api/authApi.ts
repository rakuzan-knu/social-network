import { apiClient as api } from '@/shared/api/httpClient';
import { FoundUserResponse } from '../model/types';

export interface LoginPayload {
  identity: string;
  password?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  gender: 'Male' | 'Female' | 'Custom' | string;
  identity: string;
  password?: string;
}

export interface FindAccountPayload {
  identifier: string;
}

export interface ResetPasswordPayload {
  userId?: string;
  identity?: string;
  code?: string;
  newPassword?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatar?: string | null;
  banner?: string | null;
  bannerPosition?: number;
  identity: string;
  birthDate?: string;
  gender: 'Male' | 'Female' | 'Custom' | string;
  createdAt: string;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export const authApi = {
  login: (data: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', data).then((res) => res.data),

  register: (data: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', data).then((res) => res.data),

  logout: (refreshToken?: string) => {
    const token = refreshToken || localStorage.getItem('refreshToken') || '';
    return api.post('/auth/logout', { refreshToken: token });
  },

  checkUsername: (username: string) =>
    api
      .get<{ isAvailable: boolean }>(`/auth/check-username`, { params: { username } })
      .then((res) => res.data),

  findAccount: (identifier: string) =>
    api
      .post<FoundUserResponse>('/auth/find-account', { identifier } satisfies FindAccountPayload)
      .then((res) => res.data),

  resetPassword: (data: ResetPasswordPayload) =>
    api.post<{ success: boolean }>('/auth/reset-password', data).then((res) => res.data),

  getProfile: (userId: string) => api.get<UserProfile>(`/users/${userId}`).then((res) => res.data),

  getByUsername: (username: string) =>
    api.get<UserProfile>(`/users/by-username/${username}`).then((res) => res.data),

  getMe: () => api.get<UserProfile>('/users/me').then((res) => res.data),
};
