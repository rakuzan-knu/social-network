import type { FollowStatus } from '@prisma/client';
import type { FollowRequestRow, FollowUserRow } from '../types/followers.types';

export const FOLLOWERS_REPOSITORY = Symbol('FOLLOWERS_REPOSITORY');

export interface IFollowersRepository {
  getFollowers(userId: string, limit: number, after?: string): Promise<FollowUserRow[]>;
  getFollowing(userId: string, limit: number, after?: string): Promise<FollowUserRow[]>;
  /** Creates the follow edge with the given status; ACCEPTED normally, PENDING for private targets. */
  followUser(followerId: string, followingId: string, status: FollowStatus): Promise<FollowStatus>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  /** Whether the target account is private (drives PENDING vs ACCEPTED). */
  isTargetPrivate(followingId: string): Promise<boolean | null>;
  listPendingRequests(ownerId: string, limit: number, after?: string): Promise<FollowRequestRow[]>;
  /** Flips a PENDING request to ACCEPTED; returns false if there was no such pending request. */
  acceptRequest(ownerId: string, followerId: string): Promise<boolean>;
  /** Deletes a PENDING request; returns false if there was none. */
  rejectRequest(ownerId: string, followerId: string): Promise<boolean>;
  pendingCount(ownerId: string): Promise<number>;
}
