import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Voice / video calls — shared Zod contracts (REST + WS signaling)
// ─────────────────────────────────────────────────────────────────────────────

export const CallType = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  SCREEN_SHARE: 'SCREEN_SHARE',
} as const;
export type CallType = (typeof CallType)[keyof typeof CallType];
export const CallTypeSchema = z.enum(['AUDIO', 'VIDEO', 'SCREEN_SHARE']);

export const CallStatus = {
  INITIATED: 'INITIATED',
  RINGING: 'RINGING',
  CONNECTED: 'CONNECTED',
  ENDED: 'ENDED',
  MISSED: 'MISSED',
  DECLINED: 'DECLINED',
  FAILED: 'FAILED',
} as const;
export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];
export const CallStatusSchema = z.enum([
  'INITIATED',
  'RINGING',
  'CONNECTED',
  'ENDED',
  'MISSED',
  'DECLINED',
  'FAILED',
]);

export const CallEndReason = {
  ENDED_BY_USER: 'ENDED_BY_USER',
  MISSED: 'MISSED',
  DECLINED: 'DECLINED',
  BUSY: 'BUSY',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PARTICIPANT_LEFT: 'PARTICIPANT_LEFT',
  TIMEOUT: 'TIMEOUT',
  SYSTEM: 'SYSTEM',
} as const;
export type CallEndReason = (typeof CallEndReason)[keyof typeof CallEndReason];
export const CallEndReasonSchema = z.enum([
  'ENDED_BY_USER',
  'MISSED',
  'DECLINED',
  'BUSY',
  'NETWORK_ERROR',
  'PARTICIPANT_LEFT',
  'TIMEOUT',
  'SYSTEM',
]);

/** Who can call me — mirrors PrivacyDimension.CALLS. */
export const CallPrivacyLevelSchema = z.enum(['EVERYONE', 'FOLLOWERS', 'MUTUAL', 'NOBODY']);
export type CallPrivacyLevel = z.infer<typeof CallPrivacyLevelSchema>;

// ── SDP / ICE ────────────────────────────────────────────────────────────────

/** Max SDP size (~ 64 KiB). Real SDPs are 2–10 KiB; this is a DoS guard. */
export const MAX_SDP_LENGTH = 65_536;

export const SdpSchema = z.object({
  type: z.enum(['offer', 'answer', 'pranswer', 'rollback']),
  sdp: z.string().max(MAX_SDP_LENGTH).optional(),
});
export type Sdp = z.infer<typeof SdpSchema>;

export const IceCandidateSchema = z.object({
  candidate: z.string().max(2048),
  sdpMid: z.string().max(64).nullable().optional(),
  sdpMLineIndex: z.number().int().min(0).max(255).nullable().optional(),
  usernameFragment: z.string().max(256).nullable().optional(),
});
export type IceCandidate = z.infer<typeof IceCandidateSchema>;

// ── Participants ─────────────────────────────────────────────────────────────

export const CallParticipantStateSchema = z.object({
  userId: z.string().uuid(),
  muted: z.boolean(),
  videoEnabled: z.boolean(),
  screenSharing: z.boolean(),
  joinedAt: z.string().datetime().nullable(),
  leftAt: z.string().datetime().nullable(),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER']),
});
export type CallParticipantState = z.infer<typeof CallParticipantStateSchema>;

export const CallUserSummarySchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  displayName: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
});
export type CallUserSummary = z.infer<typeof CallUserSummarySchema>;

// ── Call view (REST + WS payload) ────────────────────────────────────────────

export const CallViewSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  type: CallTypeSchema,
  status: CallStatusSchema,
  initiator: CallUserSummarySchema,
  participants: z.array(CallParticipantStateSchema.merge(z.object({ user: CallUserSummarySchema }))),
  startedAt: z.string().datetime(),
  connectedAt: z.string().datetime().nullable(),
  endedAt: z.string().datetime().nullable(),
  endedReason: CallEndReasonSchema.nullable(),
  durationMs: z.number().int().nullable(),
  e2eeEnabled: z.boolean(),
});
export type CallView = z.infer<typeof CallViewSchema>;

// ── WS: client → server ──────────────────────────────────────────────────────

export const CallInitiatePayloadSchema = z.object({
  conversationId: z.string().uuid(),
  type: CallTypeSchema,
  /** SDP offer for the first remote peer (1:1) — for groups offers are exchanged via renegotiate. */
  sdp: SdpSchema.optional(),
  /** Client-generated idempotency key (prevents duplicate rows on reconnect). */
  clientCallId: z.string().uuid().optional(),
});
export type CallInitiatePayload = z.infer<typeof CallInitiatePayloadSchema>;

export const CallAcceptPayloadSchema = z.object({
  callId: z.string().uuid(),
  sdp: SdpSchema,
  /** Accepted with camera on/off (VIDEO calls). */
  videoEnabled: z.boolean().optional(),
});
export type CallAcceptPayload = z.infer<typeof CallAcceptPayloadSchema>;

export const CallRejectPayloadSchema = z.object({
  callId: z.string().uuid(),
  reason: z.enum(['DECLINED', 'BUSY']).default('DECLINED'),
});
export type CallRejectPayload = z.infer<typeof CallRejectPayloadSchema>;

export const CallIceCandidatePayloadSchema = z.object({
  callId: z.string().uuid(),
  /** Target peer (mesh). Omit to broadcast to every other participant. */
  targetUserId: z.string().uuid().optional(),
  candidate: IceCandidateSchema,
});
export type CallIceCandidatePayload = z.infer<typeof CallIceCandidatePayloadSchema>;

export const CallSdpRenegotiatePayloadSchema = z.object({
  callId: z.string().uuid(),
  targetUserId: z.string().uuid(),
  sdp: SdpSchema,
});
export type CallSdpRenegotiatePayload = z.infer<typeof CallSdpRenegotiatePayloadSchema>;

export const CallEndPayloadSchema = z.object({
  callId: z.string().uuid(),
  reason: CallEndReasonSchema.default('ENDED_BY_USER'),
});
export type CallEndPayload = z.infer<typeof CallEndPayloadSchema>;

export const CallIdPayloadSchema = z.object({ callId: z.string().uuid() });
export type CallIdPayload = z.infer<typeof CallIdPayloadSchema>;

export const CallVideoTogglePayloadSchema = z.object({
  callId: z.string().uuid(),
  enabled: z.boolean(),
});
export type CallVideoTogglePayload = z.infer<typeof CallVideoTogglePayloadSchema>;

export const CallReconnectPayloadSchema = z.object({
  callId: z.string().uuid(),
});
export type CallReconnectPayload = z.infer<typeof CallReconnectPayloadSchema>;

// ── WS: server → client ──────────────────────────────────────────────────────

export const CallIncomingEventSchema = z.object({
  call: CallViewSchema,
  from: CallUserSummarySchema,
  sdp: SdpSchema.optional(),
  /** Ring timeout in ms — client auto-dismisses after this. */
  ringTimeoutMs: z.number().int().positive(),
});
export type CallIncomingEvent = z.infer<typeof CallIncomingEventSchema>;

export const CallRingingEventSchema = z.object({
  callId: z.string().uuid(),
  userId: z.string().uuid(),
});
export type CallRingingEvent = z.infer<typeof CallRingingEventSchema>;

export const CallAcceptedEventSchema = z.object({
  call: CallViewSchema,
  userId: z.string().uuid(),
  sdp: SdpSchema,
});
export type CallAcceptedEvent = z.infer<typeof CallAcceptedEventSchema>;

export const CallRejectedEventSchema = z.object({
  callId: z.string().uuid(),
  userId: z.string().uuid(),
  reason: z.enum(['DECLINED', 'BUSY']),
});
export type CallRejectedEvent = z.infer<typeof CallRejectedEventSchema>;

export const CallIceCandidateEventSchema = z.object({
  callId: z.string().uuid(),
  fromUserId: z.string().uuid(),
  candidate: IceCandidateSchema,
});
export type CallIceCandidateEvent = z.infer<typeof CallIceCandidateEventSchema>;

export const CallSdpRenegotiateEventSchema = z.object({
  callId: z.string().uuid(),
  fromUserId: z.string().uuid(),
  sdp: SdpSchema,
});
export type CallSdpRenegotiateEvent = z.infer<typeof CallSdpRenegotiateEventSchema>;

export const CallEndedEventSchema = z.object({
  call: CallViewSchema,
  endedBy: z.string().uuid().nullable(),
  reason: CallEndReasonSchema,
});
export type CallEndedEvent = z.infer<typeof CallEndedEventSchema>;

export const CallParticipantStateEventSchema = z.object({
  callId: z.string().uuid(),
  participant: CallParticipantStateSchema,
});
export type CallParticipantStateEvent = z.infer<typeof CallParticipantStateEventSchema>;

export const CallParticipantJoinedEventSchema = z.object({
  callId: z.string().uuid(),
  participant: CallParticipantStateSchema.merge(z.object({ user: CallUserSummarySchema })),
});
export type CallParticipantJoinedEvent = z.infer<typeof CallParticipantJoinedEventSchema>;

export const CallParticipantLeftEventSchema = z.object({
  callId: z.string().uuid(),
  userId: z.string().uuid(),
  reason: CallEndReasonSchema,
});
export type CallParticipantLeftEvent = z.infer<typeof CallParticipantLeftEventSchema>;

export const CallErrorCode = {
  NOT_FOUND: 'CALL_NOT_FOUND',
  FORBIDDEN: 'CALL_FORBIDDEN',
  BUSY: 'CALL_BUSY',
  ALREADY_ACTIVE: 'CALL_ALREADY_ACTIVE',
  PRIVACY_BLOCKED: 'CALL_PRIVACY_BLOCKED',
  DND: 'CALL_DND',
  INVALID_STATE: 'CALL_INVALID_STATE',
  TOO_MANY_PARTICIPANTS: 'CALL_TOO_MANY_PARTICIPANTS',
  RATE_LIMITED: 'CALL_RATE_LIMITED',
  VALIDATION: 'CALL_VALIDATION',
} as const;
export type CallErrorCode = (typeof CallErrorCode)[keyof typeof CallErrorCode];

export const CallErrorEventSchema = z.object({
  callId: z.string().uuid().nullable(),
  code: z.enum([
    'CALL_NOT_FOUND',
    'CALL_FORBIDDEN',
    'CALL_BUSY',
    'CALL_ALREADY_ACTIVE',
    'CALL_PRIVACY_BLOCKED',
    'CALL_DND',
    'CALL_INVALID_STATE',
    'CALL_TOO_MANY_PARTICIPANTS',
    'CALL_RATE_LIMITED',
    'CALL_VALIDATION',
  ]),
  message: z.string(),
});
export type CallErrorEvent = z.infer<typeof CallErrorEventSchema>;

// ── REST ─────────────────────────────────────────────────────────────────────

export const IceServerSchema = z.object({
  urls: z.union([z.string(), z.array(z.string())]),
  username: z.string().optional(),
  credential: z.string().optional(),
});
export type IceServer = z.infer<typeof IceServerSchema>;

/** GET /calls/ice-servers — short-lived TURN credentials (RFC 8489 / coturn REST API). */
export const IceServersResponseSchema = z.object({
  iceServers: z.array(IceServerSchema),
  /** Unix epoch seconds when the TURN credential expires. */
  expiresAt: z.number().int(),
  /** ICE transport policy hint (relay-only when the user opted in for privacy). */
  iceTransportPolicy: z.enum(['all', 'relay']),
});
export type IceServersResponse = z.infer<typeof IceServersResponseSchema>;

export const CallHistoryQuerySchema = z.object({
  conversationId: z.string().uuid().optional(),
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
export type CallHistoryQuery = z.infer<typeof CallHistoryQuerySchema>;

export const CallHistoryResponseSchema = z.object({
  items: z.array(CallViewSchema),
  nextCursor: z.string().uuid().nullable(),
});
export type CallHistoryResponse = z.infer<typeof CallHistoryResponseSchema>;

export const CallStatsPayloadSchema = z.object({
  callId: z.string().uuid(),
  /** Rough RTC stats snapshot from the client (privacy-safe aggregates). */
  rttMs: z.number().min(0).max(60_000).optional(),
  packetLossPct: z.number().min(0).max(100).optional(),
  jitterMs: z.number().min(0).max(60_000).optional(),
  candidateType: z.enum(['host', 'srflx', 'prflx', 'relay']).optional(),
});
export type CallStatsPayload = z.infer<typeof CallStatsPayloadSchema>;

// ── Limits ───────────────────────────────────────────────────────────────────

export const CALL_LIMITS = {
  /** Hard ceiling for mesh (P2P) group calls; beyond this you need an SFU. */
  MAX_MESH_PARTICIPANTS: 8,
  /** How long the callee's phone rings before auto-MISSED. */
  RING_TIMEOUT_MS: 45_000,
  /** Grace period for a participant to reconnect before being kicked. */
  RECONNECT_GRACE_MS: 30_000,
  /** TURN credential TTL (seconds). */
  TURN_CREDENTIAL_TTL_SEC: 3_600,
  /** Max call initiations per user per minute. */
  INITIATE_RATE_PER_MIN: 10,
} as const;
