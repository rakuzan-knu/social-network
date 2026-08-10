import React, { useMemo, useState } from 'react';
import {
  Lock,
  X,
  Maximize2,
  Minimize2,
  ArchiveRestore,
  Users,
  KeyRound,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import Modal from '@/shared/ui/Modal';
import Avatar from '@/shared/ui/Avatar';
import GroupAvatarCollage from '@/shared/ui/GroupAvatarCollage';
import OnlineStatusIndicator from '@/shared/ui/OnlineStatusIndicator';
import AttachmentDropZone from '@/shared/ui/AttachmentDropZone';
import { useAuthStore } from '@/shared/model/useAuthStore';
import { useStagedAttachments } from '@/shared/model/useStagedAttachments';
import { ConversationView, MessageView } from '../../../entities/chat/model/types';
import { useConversations } from '../model/useConversations';
import { useArchiveConversation } from '../model/useConversationMutations';
import { useMessages } from '../model/useMessages';
import { useMessageActions } from '../model/useMessageActions';
import { getConversationDisplay, getMessagePreview } from '../lib/getConversationDisplay';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import ForwardMessageModal from './ForwardMessageModal';
import ArchivePasswordGate from './ArchivePasswordGate';

interface ArchivedChatsModalProps {
  onClose: () => void;
}

function getActivityTime(conversation: ConversationView) {
  const activityAt =
    conversation.lastMessage?.createdAt ?? conversation.updatedAt ?? conversation.createdAt;
  const time = new Date(activityAt).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function ArchivedChatsModal({ onClose }: ArchivedChatsModalProps) {
  const { userId } = useAuthStore();
  const { data: conversations } = useConversations();
  const [unlocked, setUnlocked] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const archived = useMemo(
    () =>
      (conversations ?? [])
        .filter((c) => c.isArchived)
        .sort((a, b) => getActivityTime(b) - getActivityTime(a)),
    [conversations],
  );

  const activeConversation = archived.find((c) => c.id === activeId) ?? null;
  if (activeId && !activeConversation) setActiveId(null);

  const sizeClass = isExpanded
    ? 'w-screen h-screen rounded-none'
    : 'w-[min(1100px,94vw)] h-[min(760px,90vh)] rounded-3xl';

  return (
    <Modal onClose={onClose} className={sizeClass}>
      {(close) => (
        <div
          className={`relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#0b0b0c]/95 shadow-2xl backdrop-blur-2xl ${
            isExpanded ? 'rounded-none' : 'rounded-3xl'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-60" />

          <header className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Lock size={22} className="text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-white">Archived chats</h2>
                <p className="flex items-center gap-1.5 truncate text-[12px] text-gray-400">
                  <ShieldCheck size={13} className="flex-shrink-0 text-emerald-400" />
                  End-to-end encryption · Only you
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              {unlocked && (
                <button
                  onClick={() => {
                    setUnlocked(false);
                    setActiveId(null);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <KeyRound size={14} />
                  Password
                </button>
              )}
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {!unlocked ? (
            <ArchivePasswordGate onUnlock={() => setUnlocked(true)} />
          ) : (
            <div className="relative flex min-h-0 flex-1">
              <ArchivedList
                conversations={archived}
                currentUserId={userId}
                activeId={activeId}
                onSelect={setActiveId}
              />
              <div className="flex min-w-0 flex-1 flex-col border-l border-white/10">
                {activeConversation ? (
                  <ArchivedThreadPane
                    key={activeConversation.id}
                    conversation={activeConversation}
                    onUnarchived={() => setActiveId(null)}
                  />
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-500">
                    <MessageSquare size={38} />
                    <p className="text-sm font-medium">
                      {archived.length > 0
                        ? 'Select an archived chat to view its history'
                        : 'You have no archived chats'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
interface ArchivedListProps {
  conversations: ConversationView[];
  currentUserId: string | null;
  activeId: string | null;
  onSelect: (id: string) => void;
}

function ArchivedList({ conversations, currentUserId, activeId, onSelect }: ArchivedListProps) {
  const archiveConversation = useArchiveConversation();

  return (
    <aside className="flex w-[300px] flex-shrink-0 flex-col overflow-y-auto custom-scrollbar bg-white/[0.02] p-2">
      {conversations.length === 0 && (
        <p className="mt-8 px-4 text-center text-sm text-gray-500">No archived chats</p>
      )}
      {conversations.map((c) => {
        const display = getConversationDisplay(c, currentUserId);
        const isActive = activeId === c.id;
        return (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
              isActive ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <div className="relative flex-shrink-0">
              {display.isGroup ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-gray-400">
                  <Users size={18} />
                </div>
              ) : (
                <>
                  <Avatar size="md" src={display.avatar} />
                  {display.otherUserId && (
                    <OnlineStatusIndicator userId={display.otherUserId} variant="dot" />
                  )}
                </>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium text-gray-100">{display.title}</p>
              <p className="truncate text-[13px] text-gray-500">{getMessagePreview(c)}</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                archiveConversation.mutate({ conversationId: c.id, archived: false });
              }}
              title="Unarchive chat"
              aria-label="Unarchive chat"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-400 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100"
            >
              <ArchiveRestore size={16} />
            </button>
          </div>
        );
      })}
    </aside>
  );
}
interface ArchivedThreadPaneProps {
  conversation: ConversationView;
  onUnarchived: () => void;
}

function ArchivedThreadPane({ conversation, onUnarchived }: ArchivedThreadPaneProps) {
  const { userId } = useAuthStore();
  const display = getConversationDisplay(conversation, userId);
  const isGroup = conversation.type === 'GROUP';
  const otherParticipant = isGroup
    ? undefined
    : conversation.participants.find((p) => p.userId !== userId);

  const {
    messages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading: isLoadingMessages,
  } = useMessages(conversation.id);
  const actions = useMessageActions(conversation.id);
  const archiveConversation = useArchiveConversation();
  const staged = useStagedAttachments();

  const [replyingTo, setReplyingTo] = useState<MessageView | null>(null);
  const [forwardingMessage, setForwardingMessage] = useState<MessageView | null>(null);

  const handleUnarchive = () => {
    archiveConversation.mutate({ conversationId: conversation.id, archived: false });
    onUnarchived();
  };

  const handleDelete = (messageId: string, forAll: boolean) => {
    actions.deleteMessage(messageId, forAll).catch(() => {});
  };

  const handleTogglePin = (message: MessageView) => {
    if (message.isPinned) actions.unpinMessage(message.id).catch(() => {});
    else actions.pinMessage(message.id).catch(() => {});
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            {isGroup ? (
              <GroupAvatarCollage
                avatars={conversation.participants.map((p) => p.user.avatar)}
                size={36}
              />
            ) : (
              <>
                <Avatar size="sm" src={display.avatar} />
                {otherParticipant && (
                  <OnlineStatusIndicator userId={otherParticipant.userId} variant="dot" />
                )}
              </>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{display.title}</p>
            <p className="flex items-center gap-1.5 truncate text-[12px] text-gray-500">
              <Lock size={11} className="flex-shrink-0" />
              Secured archived chat
            </p>
          </div>
        </div>

        <button
          onClick={handleUnarchive}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-gray-100 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
        >
          <ArchiveRestore size={15} />
          Unarchive
        </button>
      </div>

      <AttachmentDropZone onFilesDropped={staged.addFiles}>
        <MessageList
          messages={messages}
          currentUserId={userId}
          otherParticipantId={otherParticipant?.userId ?? null}
          hasMore={!!hasNextPage}
          isLoading={isLoadingMessages}
          isFetchingMore={isFetchingNextPage}
          typingParticipants={[]}
          isGroup={isGroup}
          onLoadMore={fetchNextPage}
          onReply={setReplyingTo}
          onEdit={(message) => {
            const nextBody = window.prompt('Edit message', message.body ?? '');
            if (nextBody && nextBody !== message.body)
              actions.editMessage(message.id, nextBody).catch(() => {});
          }}
          onDelete={handleDelete}
          onForward={setForwardingMessage}
          onTogglePin={handleTogglePin}
          onReport={() => {}}
          onReact={actions.addReaction}
          onUnreact={actions.removeReaction}
        />

        <MessageComposer
          actions={actions}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          stagedFiles={staged.files}
          stagedFilesError={staged.error}
          onAddFiles={staged.addFiles}
          onRemoveFile={staged.removeFile}
          onReplaceFile={staged.replaceFile}
          onClearFiles={staged.clear}
          onDismissFilesError={staged.dismissError}
          isGroup={isGroup}
        />
      </AttachmentDropZone>

      {forwardingMessage && (
        <ForwardMessageModal
          onClose={() => setForwardingMessage(null)}
          onForward={(conversationIds) => {
            actions.forwardMessage(forwardingMessage.id, conversationIds).catch(() => {});
            setForwardingMessage(null);
          }}
        />
      )}
    </div>
  );
}
