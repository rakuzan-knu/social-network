import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoDeletePeriod } from '@prisma/client';

/** Coarse "last seen" bucket shown when the viewer may not see the exact timestamp. */
export enum LastSeenGranularity {
  RECENTLY = 'RECENTLY',
  WITHIN_WEEK = 'WITHIN_WEEK',
  WITHIN_MONTH = 'WITHIN_MONTH',
  LONG_AGO = 'LONG_AGO',
}

/** Viewer's follow relationship to the profile owner. */
export enum FollowStatusView {
  NONE = 'none',
  PENDING = 'pending',
  FOLLOWING = 'following',
}

export class UserProfileDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty({ nullable: true })
  displayName!: string | null;

  @ApiProperty({ nullable: true })
  avatar!: string | null;

  @ApiPropertyOptional({ nullable: true })
  banner?: string | null;

  @ApiPropertyOptional()
  bannerPosition?: number;

  @ApiProperty({ nullable: true })
  bio!: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Only present when the viewer may see it' })
  birthDate?: string | null;

  @ApiProperty()
  isPrivate!: boolean;

  @ApiPropertyOptional({
    enum: FollowStatusView,
    description: "Viewer's follow relationship; omitted for owner/anonymous",
  })
  followStatus?: FollowStatusView;

  @ApiPropertyOptional({
    description: 'Exact ISO date when visible, otherwise a LastSeenGranularity bucket',
  })
  lastSeen?: string | LastSeenGranularity | null;

  @ApiPropertyOptional({ enum: AutoDeletePeriod, description: 'Owner-only' })
  autoDeletePeriod?: AutoDeletePeriod;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
