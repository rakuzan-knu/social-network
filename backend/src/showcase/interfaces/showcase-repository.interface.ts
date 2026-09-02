import type { FollowStatus } from '@prisma/client';
import type { UpdateShowcaseDto } from '@common/contracts';

export const SHOWCASE_REPOSITORY = Symbol('SHOWCASE_REPOSITORY');

export interface IShowcaseRepository {
  findUserWithShowcase(username: string): Promise<{
    id: string;
    username: string;
    displayName: string | null;
    birthDate: Date | null;
    gender: string | null;
    githubUsername: string | null;
    showcase: any;
  } | null>;
  findUserBasic(userId: string): Promise<{ id: string; username: string } | null>;
  getFollowStatus(followerId: string, followingId: string): Promise<FollowStatus | null>;
  upsertDefaultShowcase(userId: string): Promise<any>;
  updateShowcase(userId: string, dto: UpdateShowcaseDto): Promise<void>;
}
