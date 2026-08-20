import { ConversationView } from '../../../entities/chat/model/types';

export interface ConversationDisplay {
  title: string;
  avatar: string | null;
  isGroup: boolean;
  otherUserId: string | null;
  otherUsername?: string | null;
  isVerified?: boolean;
  primaryBadge?: string | null;
}

export function getConversationDisplay(
  conversation: ConversationView,
  currentUserId: string | null,
): ConversationDisplay {
  if (conversation.type === 'GROUP') {
    return {
      title: conversation.name ?? 'Unnamed group',
      avatar: conversation.avatar,
      isGroup: true,
      otherUserId: null,
      otherUsername: null,
      isVerified: Boolean(conversation.isVerified),
      primaryBadge: conversation.primaryBadge ?? null,
    };
  }

  const other = (conversation.participants ?? []).find(
    (p) => (p.userId ?? (p as unknown as { id?: string }).id) !== currentUserId,
  );

  return {
    title:
      other?.nickname ??
      other?.user?.displayName ??
      other?.user?.username ??
      (other as unknown as { displayName?: string })?.displayName ??
      (other as unknown as { username?: string })?.username ??
      'Unknown user',
    avatar: other?.user?.avatar ?? (other as unknown as { avatar?: string | null })?.avatar ?? null,
    isGroup: false,
    otherUserId: other?.userId ?? (other as unknown as { id?: string })?.id ?? null,
    otherUsername:
      other?.user?.username ?? (other as unknown as { username?: string })?.username ?? null,
    isVerified: Boolean(
      other?.user?.isVerified ?? (other as unknown as { isVerified?: boolean })?.isVerified,
    ),
    primaryBadge:
      other?.user?.primaryBadge ??
      (other as unknown as { primaryBadge?: string | null })?.primaryBadge ??
      null,
  };
}

export function getMessagePreview(conversation: ConversationView): string {
  const msg = conversation.lastMessage;
  if (!msg) return 'No messages yet';
  if (msg.isDeleted) return 'This message was deleted';
  if (msg.attachments.length > 0)
    return `${msg.sender.displayName ?? msg.sender.username} sent an attachment`;
  return msg.body ?? '';
}
