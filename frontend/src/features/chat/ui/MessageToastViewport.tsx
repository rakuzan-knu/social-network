import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Avatar from '../../../shared/ui/Avatar';
import GroupAvatarCollage from '../../../shared/ui/GroupAvatarCollage';
import { useMessageToastStore } from '@/shared/model/useMessageToastStore';
import { CONVERSATIONS_KEY } from '@/shared/api/queryKeys';
import { ConversationView } from '../../../entities/chat/model/types';
import { chatApi } from '../api/chatApi';

export default function MessageToastViewport() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toasts, removeToast, dismissAll } = useMessageToastStore();

  const openToast = (toastId: string, conversationId: string, messageId: string) => {
    removeToast(toastId);
    queryClient.setQueryData<ConversationView[]>([CONVERSATIONS_KEY], (prev) =>
      prev?.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation,
      ),
    );
    chatApi.markRead(conversationId).catch(() => {});
    navigate(`/messages/${conversationId}?messageId=${messageId}`);
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-5 bottom-5 z-[70] flex w-[min(380px,calc(100vw-2.5rem))] flex-col gap-2 pointer-events-none">
      {toasts.length >= 3 && (
        <button
          type="button"
          onClick={dismissAll}
          className="pointer-events-auto h-11 rounded-2xl border border-white/10 bg-[#171b22]/92 text-sm font-medium text-sky-300 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:bg-[#1d232c] hover:text-sky-200"
        >
          Dismiss all
        </button>
      )}

      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="button"
          tabIndex={0}
          onClick={() => openToast(toast.id, toast.conversationId, toast.messageId)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openToast(toast.id, toast.conversationId, toast.messageId);
            }
          }}
          className="pointer-events-auto group relative flex min-h-[82px] items-center gap-3 rounded-[22px] border border-white/10 bg-[#171b22]/88 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 ease-out animate-slideInRight hover:bg-[#1d232c]/92"
        >
          <div className="flex-shrink-0">
            {toast.isGroup ? (
              toast.avatar ? (
                <Avatar size="md" src={toast.avatar} />
              ) : (
                <GroupAvatarCollage avatars={toast.memberAvatars} size={40} />
              )
            ) : (
              <Avatar size="md" src={toast.avatar} />
            )}
          </div>

          <div className="min-w-0 flex-1 pr-5">
            <p className="truncate text-sm font-semibold text-white">{toast.title}</p>
            <p className="truncate text-[13px] leading-5 text-gray-300">{toast.body}</p>
          </div>

          <span className="flex-shrink-0 self-end pb-1 text-[13px] text-gray-500">...</span>

          <button
            type="button"
            aria-label="Close notification"
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
