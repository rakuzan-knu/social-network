import React, { useEffect, useRef } from 'react';
import { MessageView, UserSnapshot } from '../../../entities/chat/model/types';
import { groupMessagesByDate } from '../lib/groupMessagesByDate';
import MessageBubble from './MessageBubble';
import TypingIndicatorBubble from '@/shared/ui/TypingIndicatorBubble';

interface MessageListProps {
  messages: MessageView[];
  currentUserId: string | null;
  otherParticipantId: string | null;
  hasMore: boolean;
  isLoading: boolean;
  isFetchingMore: boolean;
  typingParticipants: UserSnapshot[];
  isGroup: boolean;
  onLoadMore: () => void;
  onReply: (message: MessageView) => void;
  onEdit: (message: MessageView) => void;
  onDelete: (messageId: string, forAll: boolean) => void;
  onForward: (message: MessageView) => void;
  onTogglePin: (message: MessageView) => void;
  onReport: (message: MessageView) => void;
  onReact: (messageId: string, emoji: string) => void;
  onUnreact: (messageId: string, emoji: string) => void;
  highlightMessageId?: string | null;
  onHighlightHandled?: () => void;
}

export default function MessageList({
  messages,
  currentUserId,
  otherParticipantId,
  hasMore,
  isLoading,
  isFetchingMore,
  typingParticipants,
  isGroup,
  onLoadMore,
  onReply,
  onEdit,
  onDelete,
  onForward,
  onTogglePin,
  onReport,
  onReact,
  onUnreact,
  highlightMessageId,
  onHighlightHandled,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const prevMessageCountRef = useRef(0);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container || highlightMessageId) return;

    const grew = messages.length > prevMessageCountRef.current;
    const wasNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 200;

    if (grew && wasNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
    prevMessageCountRef.current = messages.length;
  }, [messages, typingParticipants.length, highlightMessageId]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !hasMore || isFetchingMore) return;

    if (container.scrollTop < 100) {
      prevScrollHeightRef.current = container.scrollHeight;
      onLoadMore();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !prevScrollHeightRef.current) return;
    container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
    prevScrollHeightRef.current = 0;
  }, [messages]);

  useEffect(() => {
    if (!highlightMessageId) return;
    const el = messageRefs.current[highlightMessageId];
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const timeout = setTimeout(() => onHighlightHandled?.(), 1700);
    return () => clearTimeout(timeout);
  }, [highlightMessageId, messages, onHighlightHandled]);

  const groups = groupMessagesByDate(messages);

  if (isLoading) {
    return (
      <div ref={containerRef} className="flex-1 overflow-y-auto py-4">
        <MessageThreadSkeleton />
      </div>
    );
  }

  return (
    <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto py-4">
      {isFetchingMore && <OlderMessagesSkeleton />}

      {groups.map((group) => (
        <div key={group.label}>
          <div className="flex items-center gap-3 px-4 my-3">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap">
              {group.label}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {group.messages.map((message, index) => {
            const isOwnMessage = message.sender.id === currentUserId;
            const prev = group.messages[index - 1];
            const showAvatar = !prev || prev.sender.id !== message.sender.id;
            const isReadByOther = otherParticipantId
              ? message.readBy.includes(otherParticipantId)
              : false;

            return (
              <div
                key={message.id}
                ref={(el) => {
                  messageRefs.current[message.id] = el;
                }}
                className={`rounded-2xl ${highlightMessageId === message.id ? 'animate-jumpHighlight' : ''}`}
              >
                <MessageBubble
                  message={message}
                  isOwnMessage={isOwnMessage}
                  showAvatar={showAvatar}
                  isReadByOther={isReadByOther}
                  currentUserId={currentUserId}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onForward={onForward}
                  onTogglePin={onTogglePin}
                  onReport={onReport}
                  onReact={onReact}
                  onUnreact={onUnreact}
                />
              </div>
            );
          })}
        </div>
      ))}

      <TypingIndicatorBubble typists={typingParticipants} isGroup={isGroup} />
    </div>
  );
}

function SkeletonBone({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer ${className}`} />;
}

function SkeletonMessage({
  own = false,
  withMedia = false,
}: {
  own?: boolean;
  withMedia?: boolean;
}) {
  return (
    <div className={`flex items-end gap-2 px-4 py-1 ${own ? 'justify-end' : 'justify-start'}`}>
      {!own && <SkeletonBone className="h-8 w-8 flex-shrink-0 rounded-full" />}
      <div className={`flex max-w-[70%] flex-col gap-1 ${own ? 'items-end' : 'items-start'}`}>
        {withMedia && <SkeletonBone className="h-44 w-[260px] max-w-[62vw] rounded-2xl" />}
        <SkeletonBone className={`h-10 rounded-2xl ${own ? 'w-52' : 'w-64 max-w-[64vw]'}`} />
        <SkeletonBone className="h-2.5 w-12 rounded-md" />
      </div>
      {own && <div className="w-8 flex-shrink-0" />}
    </div>
  );
}

function OlderMessagesSkeleton() {
  return (
    <div className="pb-2" role="status" aria-label="Loading older messages">
      <SkeletonMessage />
      <SkeletonMessage own />
    </div>
  );
}

function MessageThreadSkeleton() {
  return (
    <div className="flex flex-col justify-end gap-1" role="status" aria-label="Loading messages">
      <div className="flex items-center gap-3 px-4 my-3">
        <div className="flex-1 h-px bg-white/5" />
        <SkeletonBone className="h-3 w-16 rounded-md" />
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <SkeletonMessage withMedia />
      <SkeletonMessage own />
      <SkeletonMessage />
      <SkeletonMessage own withMedia />
      <SkeletonMessage />
    </div>
  );
}
