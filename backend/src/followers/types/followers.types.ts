import type { FollowStatus } from '@prisma/client';
import type { Paginated } from '../../common/pagination';

export type PublicUserSummary = {
  id: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type FollowUserRow = {
  id: string;
  user: PublicUserSummary;
};

export type GetFollowersResult = Paginated<PublicUserSummary>;

export type FollowActionResult = {
  status: FollowStatus;
};

export type FollowRequestRow = {
  id: string;
  user: PublicUserSummary;
};

export type GetFollowRequestsResult = Paginated<PublicUserSummary>;
