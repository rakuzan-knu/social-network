import { z } from 'zod';

export const StoryMediaTypeSchema = z.enum(['IMAGE', 'VIDEO', 'VOICE']);
export type StoryMediaType = z.infer<typeof StoryMediaTypeSchema>;

export const StoryPrivacySchema = z.enum(['ALL_FOLLOWERS', 'CLOSE_FRIENDS']);
export type StoryPrivacy = z.infer<typeof StoryPrivacySchema>;

export const TextOverlaySchema = z.object({
  id: z.string().max(128),
  type: z.literal('text'),
  text: z.string().max(2000),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
  scale: z.number().default(1),
  rotation: z.number().default(0),
  color: z.string().max(32).default('#ffffff'),
  fontFamily: z.string().max(64).default('sans'),
  backgroundStyle: z.enum(['none', 'solid', 'neon', 'glass']).default('none'),
  fontSize: z.number().default(24),
  textAlign: z.enum(['left', 'center', 'right']).default('center'),
});

export const PollOptionSchema = z.object({
  text: z.string().min(1).max(100),
});

export const PollOverlaySchema = z.object({
  id: z.string().max(128),
  type: z.literal('poll'),
  question: z.string().min(1).max(255),
  options: z.array(PollOptionSchema).min(2).max(4),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
  scale: z.number().default(1),
  rotation: z.number().default(0),
});

export const LinkOverlaySchema = z.object({
  id: z.string().max(128),
  type: z.literal('link'),
  url: z.string().url().max(2048),
  title: z.string().min(1).max(128),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
  scale: z.number().default(1),
  rotation: z.number().default(0),
});

export const MentionOverlaySchema = z.object({
  id: z.string().max(128),
  type: z.literal('mention'),
  username: z.string().min(1).max(32),
  displayName: z.string().max(64).optional(),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
  scale: z.number().default(1),
  rotation: z.number().default(0),
});

export const AudioOverlaySchema = z.object({
  id: z.string().max(128),
  type: z.literal('audio'),
  title: z.string().max(128).optional(),
  audioUrl: z.string().max(2048).optional(),
  duration: z.number().optional(),
  waveform: z.array(z.number()).max(256).optional(),
  xPercent: z.number().min(0).max(100),
  yPercent: z.number().min(0).max(100),
});

export const StoryOverlaySchema = z.discriminatedUnion('type', [
  TextOverlaySchema,
  PollOverlaySchema,
  LinkOverlaySchema,
  MentionOverlaySchema,
  AudioOverlaySchema,
]);

export type StoryOverlay = z.infer<typeof StoryOverlaySchema>;
export type TextOverlay = z.infer<typeof TextOverlaySchema>;
export type PollOverlay = z.infer<typeof PollOverlaySchema>;
export type LinkOverlay = z.infer<typeof LinkOverlaySchema>;
export type MentionOverlay = z.infer<typeof MentionOverlaySchema>;
export type AudioOverlay = z.infer<typeof AudioOverlaySchema>;

export const CreateStoryDtoSchema = z.object({
  mediaType: StoryMediaTypeSchema.optional().default('IMAGE'),
  caption: z.string().max(1000).optional(),
  overlays: z.array(StoryOverlaySchema).max(30).optional(),
  privacy: StoryPrivacySchema.optional().default('ALL_FOLLOWERS'),
  backgroundColor: z.string().max(32).optional(),
});

export type CreateStoryDto = z.input<typeof CreateStoryDtoSchema>;

export const ReactToStoryDtoSchema = z.object({
  emoji: z.string().min(1).max(32),
});

export type ReactToStoryDto = z.infer<typeof ReactToStoryDtoSchema>;

export const ReplyToStoryDtoSchema = z.object({
  text: z.string().min(1).max(2000),
});

export type ReplyToStoryDto = z.infer<typeof ReplyToStoryDtoSchema>;

export const VoteStoryPollDtoSchema = z.object({
  optionIndex: z.number().int().min(0).max(3),
});

export type VoteStoryPollDto = z.infer<typeof VoteStoryPollDtoSchema>;

export interface StoryViewerUser {
  id: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
  isVerified?: boolean;
}

export interface StoryPollOptionResult {
  text: string;
  voteCount: number;
  percentage: number;
}

export interface StoryPollResult {
  question: string;
  totalVotes: number;
  userVotedIndex: number | null;
  options: StoryPollOptionResult[];
}

export interface StoryViewResponse {
  id: string;
  authorId: string;
  mediaUrl: string;
  mediaType: StoryMediaType;
  caption: string | null;
  overlays: StoryOverlay[] | null;
  privacy: StoryPrivacy;
  createdAt: string;
  expiresAt: string;
  viewsCount: number;
  hasViewed: boolean;
  userReaction: string | null;
  reactionsCount: Record<string, number>;
  pollResult: StoryPollResult | null;
  author: StoryViewerUser;
}

export interface UserStoriesGroup {
  user: StoryViewerUser;
  hasUnviewed: boolean;
  hasCloseFriendsStory: boolean;
  stories: StoryViewResponse[];
  latestStoryTimestamp: string;
}

export interface StoryViewersListResponse {
  totalViews: number;
  viewers: {
    user: StoryViewerUser;
    viewedAt: string;
    reaction: string | null;
    pollVoteOption: number | null;
  }[];
}
