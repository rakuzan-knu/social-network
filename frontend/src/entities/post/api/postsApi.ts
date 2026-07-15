import { apiClient as api } from '@/shared/api/httpClient';
import { PostType } from '../model/types';

export interface FeedPage {
  posts: PostType[];
  nextCursor: string | null;
}

export const postsApi = {
  getFeed: (after?: string, limit = 10) =>
    api.get<FeedPage>('/posts', { params: { after, limit } }).then((r) => r.data),

  getUserPosts: (userId: string, after?: string) =>
    api.get<FeedPage>(`/users/${userId}/posts`, { params: { after } }).then((r) => r.data),

  getUserReposts: (userId: string, after?: string) =>
    api.get<FeedPage>(`/users/${userId}/reposts`, { params: { after } }).then((r) => r.data),

  createPost: (data: FormData) =>
    api
      .post<PostType>('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data),

  votePoll: (postId: string | number, optionId: string) =>
    api.post(`/posts/${postId}/poll/vote`, { optionId }).then((r) => r.data),

  getPollVoters: (postId: string | number) =>
    api.get(`/posts/${postId}/poll/voters`).then((r) => r.data),

  like: (postId: string | number) => api.post(`/posts/${postId}/like`).then((r) => r.data),
  unlike: (postId: string | number) => api.delete(`/posts/${postId}/like`).then((r) => r.data),
  repost: (postId: string | number) => api.post(`/posts/${postId}/repost`).then((r) => r.data),
};
