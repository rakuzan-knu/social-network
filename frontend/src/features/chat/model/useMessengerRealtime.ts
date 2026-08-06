import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useChatSocket } from './useChatSocket';
import { CONVERSATIONS_KEY } from '@/shared/api/queryKeys';
import { ConversationView, MessageView } from '../../../entities/chat/model/types';
import { useAuthStore } from '@/shared/model/useAuthStore';
import {
  initializeMessageNotificationSound,
  playMessageNotificationSound,
} from '@/shared/lib/messageNotificationSound';
import { useMessageToastStore } from '@/shared/model/useMessageToastStore';
import { getConversationDisplay } from '../lib/getConversationDisplay';
import { getMessageToastPreview } from '../lib/getMessageToastPreview';

export function useMessengerRealtime(
  conversationIds: string[],
  activeConversationId: string | null = null,
  showPushNotifications = false,
) {
  const socket = useChatSocket();
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();
  const addToast = useMessageToastStore((s) => s.addToast);
  const joinedRef = useRef<Set<string>>(new Set());
  const playedMessageIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    initializeMessageNotificationSound();
  }, []);

  useEffect(() => {
    conversationIds.forEach((id) => {
      if (joinedRef.current.has(id)) return;
      socket.emit('joinConversation', { conversationId: id });
      joinedRef.current.add(id);
    });
  }, [conversationIds, socket]);

  useEffect(() => {
    const handleNewMessage = ({ message }: { conversationId: string; message: MessageView }) => {
      const conversations = queryClient.getQueryData<ConversationView[]>([CONVERSATIONS_KEY]);
      const conversation = conversations?.find((c) => c.id === message.conversationId);
      const shouldNotify =
        message.sender.id !== userId &&
        message.conversationId !== activeConversationId &&
        conversation?.myMuteLevel !== 'MESSAGES' &&
        conversation?.myMuteLevel !== 'MESSAGES_AND_CALLS' &&
        !playedMessageIdsRef.current.has(message.id);

      queryClient.setQueryData<ConversationView[]>([CONVERSATIONS_KEY], (prev) =>
        prev?.map((c) =>
          c.id === message.conversationId
            ? {
                ...c,
                lastMessage: message,
                unreadCount:
                  message.sender.id === userId || c.id === activeConversationId
                    ? 0
                    : c.unreadCount + 1,
              }
            : c,
        ),
      );

      if (shouldNotify) {
        playedMessageIdsRef.current.add(message.id);
        playMessageNotificationSound();

        if (showPushNotifications && conversation) {
          const display = getConversationDisplay(conversation, userId);
          addToast({
            id: message.id,
            conversationId: message.conversationId,
            messageId: message.id,
            title: display.title,
            body: getMessageToastPreview(message),
            avatar: display.avatar,
            memberAvatars: conversation.participants.map((participant) => participant.user.avatar),
            isGroup: display.isGroup,
          });
        }
      }
    };

    const handleConversationUpdated = (updated: Partial<ConversationView> & { id: string }) => {
      queryClient.setQueryData<ConversationView[]>([CONVERSATIONS_KEY], (prev) =>
        prev?.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)),
      );
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('conversationUpdated', handleConversationUpdated);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('conversationUpdated', handleConversationUpdated);
    };
  }, [socket, queryClient, userId, activeConversationId, showPushNotifications, addToast]);
}
