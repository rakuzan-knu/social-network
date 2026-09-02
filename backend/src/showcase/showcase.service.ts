import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  Optional,
} from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { FollowStatus } from '@prisma/client';
import {
  ShowcasePrivacy,
  type UpdateShowcaseDto,
  type ProfileShowcaseDto,
  type ShowcaseMediaItemDto,
  type SpotlightMediaDto,
  type ProfileAnthemDto,
  type LiveActivityStatusDto,
  type ConnectedAccountsDto,
} from '@common/contracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  SHOWCASE_REPOSITORY,
  type IShowcaseRepository,
} from './interfaces/showcase-repository.interface';

function getZodiacSign(date: Date): string {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // 1-12

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '♈ Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '♉ Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return '♊ Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return '♋ Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '♌ Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '♍ Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return '♎ Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return '♏ Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '♐ Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '♑ Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '♒ Aquarius';
  return '♓ Pisces';
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const m = today.getUTCMonth() - birthDate.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--;
  }
  return Math.max(0, age);
}

function formatLocalTime(timezoneStr: string): string {
  try {
    const tz = timezoneStr || 'UTC';
    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const formatted = timeFormatter.format(now);
    return formatted;
  } catch {
    const now = new Date();
    return `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;
  }
}

function canView(privacy: ShowcasePrivacy, relationship: 'SELF' | 'FOLLOWER' | 'PUBLIC'): boolean {
  if (relationship === 'SELF') return true;
  if (privacy === ShowcasePrivacy.PUBLIC) return true;
  if (privacy === ShowcasePrivacy.FOLLOWERS) return relationship === 'FOLLOWER';
  return false;
}

@Injectable()
export class ShowcaseService {
  private readonly logger = new Logger(ShowcaseService.name);

  constructor(
    @Inject(SHOWCASE_REPOSITORY)
    private readonly showcaseRepo: IShowcaseRepository,
    private readonly redis: RedisService,
    @Optional()
    private readonly eventEmitter?: EventEmitter2,
  ) {}

  private showcaseKey(userId: string): string {
    return `showcase:${userId}`;
  }

  async getShowcase(targetUsername: string, viewerId: string | null): Promise<ProfileShowcaseDto> {
    const user = await this.showcaseRepo.findUserWithShowcase(targetUsername);

    if (!user) {
      throw new NotFoundException(`User @${targetUsername} not found`);
    }

    // Determine relationship
    let relationship: 'SELF' | 'FOLLOWER' | 'PUBLIC' = 'PUBLIC';
    if (viewerId) {
      if (viewerId === user.id) {
        relationship = 'SELF';
      } else {
        const followStatus = await this.showcaseRepo.getFollowStatus(viewerId, user.id);
        if (followStatus === FollowStatus.ACCEPTED) {
          relationship = 'FOLLOWER';
        }
      }
    }

    const rawShowcase = user.showcase || (await this.showcaseRepo.upsertDefaultShowcase(user.id));

    // Personal Meta
    const metaAllowed = canView(rawShowcase.privacyMeta, relationship);
    const activityAllowed = canView(rawShowcase.privacyActivity, relationship);
    const showcaseAllowed = canView(rawShowcase.privacyShowcase, relationship);
    const linksAllowed = canView(rawShowcase.privacyLinks, relationship);

    let birthDateStr: string | null = null;
    let ageVal: number | null = null;
    let zodiacVal: string | null = null;
    let genderVal: string | null = null;
    let localTimeVal: string | null = null;

    if (metaAllowed) {
      if (user.birthDate && rawShowcase.showBirthdate) {
        birthDateStr = user.birthDate.toISOString().split('T')[0];
        zodiacVal = getZodiacSign(user.birthDate);
      }
      if (user.birthDate && rawShowcase.showAge) {
        ageVal = calculateAge(user.birthDate);
      }
      if (rawShowcase.showGender && user.gender) {
        genderVal = user.gender;
      }
      if (rawShowcase.showTimezone) {
        localTimeVal = formatLocalTime(rawShowcase.timezone || 'UTC');
      }
    }

    const connectedAccounts: ConnectedAccountsDto | null = linksAllowed
      ? {
          github:
            user.githubUsername ||
            (rawShowcase.connectedAccounts as ConnectedAccountsDto | null)?.github ||
            null,
          steam: (rawShowcase.connectedAccounts as ConnectedAccountsDto | null)?.steam || null,
          spotify: (rawShowcase.connectedAccounts as ConnectedAccountsDto | null)?.spotify || null,
          discord: (rawShowcase.connectedAccounts as ConnectedAccountsDto | null)?.discord || null,
          twitch: (rawShowcase.connectedAccounts as ConnectedAccountsDto | null)?.twitch || null,
        }
      : null;

    const activityStatus: LiveActivityStatusDto | null = activityAllowed
      ? (rawShowcase.activityStatus as LiveActivityStatusDto | null) || null
      : null;

    const spotlightMedia: SpotlightMediaDto | null = showcaseAllowed
      ? (rawShowcase.spotlightMedia as SpotlightMediaDto | null) || null
      : null;

    const anthemTrack: ProfileAnthemDto | null = showcaseAllowed
      ? (rawShowcase.anthemTrack as ProfileAnthemDto | null) || null
      : null;

    const mediaItems: ShowcaseMediaItemDto[] = showcaseAllowed
      ? (rawShowcase.mediaItems || []).map(
          (m: {
            id: string;
            type: any;
            isWishlist?: boolean | null;
            title: string;
            posterUrl: string;
            externalId?: string | null;
            externalUrl?: string | null;
            rating?: number | null;
            userComment?: string | null;
            tags?: string[] | null;
            releaseYear?: number | null;
            position: number;
          }) => ({
            id: m.id,
            type: m.type,
            isWishlist: m.isWishlist ?? false,
            title: m.title,
            posterUrl: m.posterUrl,
            externalId: m.externalId,
            externalUrl: m.externalUrl,
            rating: m.rating,
            userComment: m.userComment,
            tags: m.tags || [],
            releaseYear: m.releaseYear,
            position: m.position,
          }),
        )
      : [];

    // Check if at least 1 widget is visible and configured
    const hasMeta =
      metaAllowed &&
      Boolean(birthDateStr || ageVal !== null || genderVal || rawShowcase.pronouns || localTimeVal);
    const hasActivity = Boolean(activityStatus);
    const hasLinks = Boolean(
      connectedAccounts && Object.values(connectedAccounts).some((v) => Boolean(v)),
    );
    const hasShowcase = Boolean(spotlightMedia || anthemTrack || mediaItems.length > 0);

    const hasVisibleWidgets = hasMeta || hasActivity || hasLinks || hasShowcase;

    return {
      id: rawShowcase.id,
      userId: user.id,
      hasVisibleWidgets: relationship === 'SELF' ? true : hasVisibleWidgets,
      relationship,
      privacyMeta: rawShowcase.privacyMeta,
      privacyActivity: rawShowcase.privacyActivity,
      privacyShowcase: rawShowcase.privacyShowcase,
      privacyLinks: rawShowcase.privacyLinks,
      accentColor: rawShowcase.accentColor || '#6366f1',
      showAge: rawShowcase.showAge,
      showBirthdate: rawShowcase.showBirthdate,
      showGender: rawShowcase.showGender,
      showTimezone: rawShowcase.showTimezone,
      pronouns: metaAllowed ? rawShowcase.pronouns : null,
      timezone: metaAllowed ? rawShowcase.timezone : null,
      birthDate: birthDateStr,
      age: ageVal,
      gender: genderVal,
      zodiacSign: zodiacVal,
      localTime: localTimeVal,
      connectedAccounts,
      activityStatus,
      spotlightMedia,
      anthemTrack,
      mediaItems,
    };
  }

  async updateShowcase(userId: string, dto: UpdateShowcaseDto): Promise<ProfileShowcaseDto> {
    const user = await this.showcaseRepo.findUserBasic(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Validate maximum 5 items per media type for Board vs Wishlist
    if (dto.mediaItems) {
      const counts: Record<string, number> = {};
      for (const item of dto.mediaItems) {
        const key = `${item.type}:${Boolean(item.isWishlist)}`;
        counts[key] = (counts[key] || 0) + 1;
        if (counts[key] > 5) {
          throw new BadRequestException(
            `Cannot add more than 5 items for ${item.isWishlist ? 'wishlist' : 'board'} category "${item.type}"`,
          );
        }
      }
    }

    await this.showcaseRepo.updateShowcase(userId, dto);

    await this.redis.del(this.showcaseKey(userId));

    // Real-time WebSocket emission if eventEmitter is available
    if (this.eventEmitter && dto.activityStatus !== undefined) {
      this.eventEmitter.emit('showcase.presence.updated', {
        userId,
        activityStatus: dto.activityStatus,
      });
    }

    return this.getShowcase(user.username, userId);
  }
}
