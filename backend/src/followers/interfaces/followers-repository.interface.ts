import { type UserProfileDto } from '../../users/dto/user-profile.dto';

export const FOLLOWERS_REPOSITORY = Symbol('FOLLOWERS_REPOSITORY');

export interface IFollowersRepository {
  getFollowers(userId: string): Promise<UserProfileDto[]>;
  getFollowing(userId: string): Promise<UserProfileDto[]>;
  followUser(followerId: string, followingId: string): Promise<void>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
}
