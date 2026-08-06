import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useChatSocket } from './useChatSocket';
import { CONVERSATION_MESSAGES_KEY, CONVERSATIONS_KEY } from '@/shared/api/queryKeys';
import {
  ConversationView,
  MessageView,
  PaginatedMessages,
} from '../../../entities/chat/model/types';
import { useAuthStore } from '@/shared/model/useAuthStore';

interface InfiniteMessagesData {
  pages: PaginatedMessages[];
  pageParams: unknown[];
}

export function useConversationRealtime(conversationId: string | null) {
  const socket = useChatSocket();
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();
  const [typingUserIds, setTypingUserIds] = useState<Set<string>>(new Set());

  const [typingResetKey, setTypingResetKey] = useState(conversationId);
  if (conversationId !== typingResetKey) {
    setTypingResetKey(conversationId);
    setTypingUserIds(new Set());
  }

  useEffect(() => {
    if (!conversationId) return;

    socket.emit('joinConversation', { conversationId });

    const updatePages = (updater: (pages: PaginatedMessages[]) => PaginatedMessages[]) => {
      queryClient.setQueryData<InfiniteMessagesData>(
        [CONVERSATION_MESSAGES_KEY, conversationId],
        (prev) => (prev ? { ...prev, pages: updater(prev.pages) } : prev),
      );
    };

    const mapMessages = (pages: PaginatedMessages[], fn: (m: MessageView) => MessageView) =>
      pages.map((p) => ({ ...p, data: p.data.map(fn) }));

    const findLoadedMessage = (messageId: string): MessageView | undefined => {
      const data = queryClient.getQueryData<InfiniteMessagesData>([
        CONVERSATION_MESSAGES_KEY,
        conversationId,
      ]);
      return data?.pages.flatMap((p) => p.data).find((m) => m.id === messageId);
    };

    const syncConversationPinned = (updater: (pinned: MessageView[]) => MessageView[]) => {
      queryClient.setQueryData<ConversationView[]>([CONVERSATIONS_KEY], (prev) =>
        prev?.map((c) =>
          c.id === conversationId ? { ...c, pinnedMessages: updater(c.pinnedMessages) } : c,
        ),
      );
    };

    const handleNewMessage = (payload: { conversationId: string; message: MessageView }) => {
      if (payload.conversationId !== conversationId) return;
      updatePages((pages) => {
        if (pages.length === 0)
          return [{ data: [payload.message], hasMore: false, nextCursor: null }];
        const next = [...pages];
        next[0] = { ...next[0], data: [payload.message, ...next[0].data] };
        return next;
      });
      if (payload.message.sender.id !== userId) {
        socket.emit('markRead', { conversationId });
      }
    };

    const handleMessageEdited = (payload: { conversationId: string; message: MessageView }) => {
      if (payload.conversationId !== conversationId) return;
      updatePages((pages) =>
        mapMessages(pages, (m) => (m.id === payload.message.id ? payload.message : m)),
      );
    };

    const handleMessageDeleted = (payload: { conversationId: string; messageId: string }) => {
      if (payload.conversationId !== conversationId) return;
      updatePages((pages) =>
        mapMessages(pages, (m) =>
          m.id === payload.messageId ? { ...m, isDeleted: true, body: null } : m,
        ),
      );
    };

    const handleReaction = (payload: { conversationId: string; message: MessageView }) => {
      if (payload.conversationId !== conversationId) return;
      updatePages((pages) =>
        mapMessages(pages, (m) => (m.id === payload.message.id ? payload.message : m)),
      );
    };

    const onPinned = (p: { conversationId: string; messageId: string }) => {
      if (p.conversationId !== conversationId) return;
      updatePages((pages) =>
        mapMessages(pages, (m) => (m.id === p.messageId ? { ...m, isPinned: true } : m)),
      );

      const message = findLoadedMessage(p.messageId);
      if (message) {
        syncConversationPinned((pinned) => [
          ...pinned.filter((m) => m.id !== p.messageId),
          { ...message, isPinned: true },
        ]);
      }
    };

    const onUnpinned = (p: { conversationId: string; messageId: string }) => {
      if (p.conversationId !== conversationId) return;
      updatePages((pages) =>
        mapMessages(pages, (m) => (m.id === p.messageId ? { ...m, isPinned: false } : m)),
      );
      syncConversationPinned((pinned) => pinned.filter((m) => m.id !== p.messageId));
    };

    const handleTyping = (payload: {
      conversationId: string;
      userId: string;
      isTyping: boolean;
    }) => {
      if (payload.conversationId !== conversationId || payload.userId === userId) return;
      setTypingUserIds((prev) => {
        const next = new Set(prev);
        if (payload.isTyping) {
          next.add(payload.userId);
        } else {
          next.delete(payload.userId);
        }
        return next;
      });
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('messageEdited', handleMessageEdited);
    socket.on('messageDeleted', handleMessageDeleted);
    socket.on('messageReactionAdded', handleReaction);
    socket.on('messageReactionRemoved', handleReaction);
    socket.on('messagePinned', onPinned);
    socket.on('messageUnpinned', onUnpinned);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messageEdited', handleMessageEdited);
      socket.off('messageDeleted', handleMessageDeleted);
      socket.off('messageReactionAdded', handleReaction);
      socket.off('messageReactionRemoved', handleReaction);
      socket.off('messagePinned', onPinned);
      socket.off('messageUnpinned', onUnpinned);
      socket.off('typing', handleTyping);
    };
  }, [conversationId, socket, queryClient, userId]);

  return { typingUserIds };
}
