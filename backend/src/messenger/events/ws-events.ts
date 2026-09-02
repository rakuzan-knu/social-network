export const WS_EVENTS = {
  JOIN_CONVERSATION: 'joinConversation',
  LEAVE_CONVERSATION: 'leaveConversation',
  TYPING_START: 'typingStart',
  TYPING_STOP: 'typingStop',
  TYPING: 'typing',
  MARK_READ: 'markRead',
  MESSAGE_READ: 'messageRead',
  USER_ONLINE: 'userOnline',
  USER_OFFLINE: 'userOffline',
  PRESENCE_BATCH: 'presence:batch',
  RECONNECT_WITH_BACKOFF: 'reconnect_with_backoff',
  GET_ONLINE_STATUS: 'getOnlineStatus',
  RATE_LIMIT_EXCEEDED: 'rateLimitExceeded',

  SEND_MESSAGE: 'sendMessage',
  NEW_MESSAGE: 'newMessage',
  MESSAGE_DELIVERED: 'messageDelivered',
  CLIENT_HIBERNATE: 'clientHibernate',
  CLIENT_WAKE: 'clientWake',

  EDIT_MESSAGE: 'editMessage',
  MESSAGE_EDITED: 'messageEdited',

  DELETE_MESSAGE: 'deleteMessage',
  MESSAGE_DELETED: 'messageDeleted',

  FORWARD_MESSAGE: 'forwardMessage',

  ADD_REACTION: 'addReaction',
  MESSAGE_REACTION_ADDED: 'messageReactionAdded',
  REMOVE_REACTION: 'removeReaction',
  MESSAGE_REACTION_REMOVED: 'messageReactionRemoved',

  PIN_MESSAGE: 'pinMessage',
  MESSAGE_PINNED: 'messagePinned',
  UNPIN_MESSAGE: 'unpinMessage',
  MESSAGE_UNPINNED: 'messageUnpinned',

  CONVERSATION_UPDATED: 'conversationUpdated',
  CONVERSATION_DELETED: 'conversationDeleted',
  CONVERSATION_SHARED_THEME_UPDATED: 'conversationSharedThemeUpdated',
  CONVERSATION_SHARED_THEME_UNLINKED: 'conversationSharedThemeUnlinked',
  THEME_PROPOSAL_CREATED: 'themeProposalCreated',
  THEME_PROPOSAL_RESPONDED: 'themeProposalResponded',
  MESSAGES_CLEARED: 'messagesCleared',
  PARTICIPANT_ADDED: 'participantAdded',
  PARTICIPANT_LEFT: 'participantLeft',

  NEW_FOLLOWER: 'newFollower',
  SOCIAL_NOTIFICATION: 'socialNotification',
  NOTIFICATION_NEW: 'notification:new',
  NOTIFICATION_READ: 'notification:read',

  // ── Voice / video calls (WebRTC signaling) ──────────────────────────
  CALL_INITIATE: 'call:initiate',
  CALL_INCOMING: 'call:incoming',
  CALL_RINGING: 'call:ringing',
  CALL_ACCEPT: 'call:accept',
  CALL_ACCEPTED: 'call:accepted',
  CALL_REJECT: 'call:reject',
  CALL_REJECTED: 'call:rejected',
  CALL_ICE_CANDIDATE: 'call:ice-candidate',
  CALL_SDP_RENEGOTIATE: 'call:sdp-renegotiate',
  CALL_END: 'call:end',
  CALL_ENDED: 'call:ended',
  CALL_MUTE: 'call:mute',
  CALL_UNMUTE: 'call:unmute',
  CALL_VIDEO_TOGGLE: 'call:video-toggle',
  CALL_SCREEN_SHARE_START: 'call:screen-share-start',
  CALL_SCREEN_SHARE_STOP: 'call:screen-share-stop',
  CALL_PARTICIPANT_STATE: 'call:participant-state',
  CALL_PARTICIPANT_JOINED: 'call:participant-joined',
  CALL_PARTICIPANT_LEFT: 'call:participant-left',
  CALL_RECONNECT: 'call:reconnect',
  CALL_ERROR: 'call:error',

  GATEWAY_READY: 'gatewayReady',
  GATEWAY_RESUME: 'gatewayResume',
  GATEWAY_RESUMED: 'gatewayResumed',
  RESYNC_REQUIRED: 'resyncRequired',
  HEARTBEAT: 'heartbeat',
} as const;

export type WsEventKey = keyof typeof WS_EVENTS;
export type WsEventValue = (typeof WS_EVENTS)[WsEventKey];
export type WsEventType = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];
