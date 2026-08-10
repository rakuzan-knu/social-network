import type {
  AutoDeletePeriod,
  FollowStatusView,
  LastSeenGranularity,
} from '@/features/profile/model/privacyTypes';

export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  bio?: string | null;
  avatar?: string | null;
  banner?: string | null;
  bannerPosition?: number;
  identity: string;
  birthDate?: string | null;
  gender: 'Male' | 'Female' | 'Custom' | string;
  createdAt: string;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  followersCount?: number;
  followingCount?: number;
  isPrivate?: boolean;
  followStatus?: FollowStatusView;
  lastSeen?: string | LastSeenGranularity | null;
  autoDeletePeriod?: AutoDeletePeriod;
}
