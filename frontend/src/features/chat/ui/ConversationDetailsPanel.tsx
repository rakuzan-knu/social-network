import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  UserRound,
  Bell,
  BellOff,
  Search,
  ChevronDown,
  ChevronRight,
  Pin,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  Palette,
  Pencil,
  ShieldQuestion,
  Eye,
  ShieldAlert,
  Ban,
  Flag,
  Archive,
  Trash2,
  Users,
  LogOut,
  Crown,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import Avatar from '../../../shared/ui/Avatar';
import GroupAvatarCollage from '../../../shared/ui/GroupAvatarCollage';
import OnlineStatusIndicator from '../../../shared/ui/OnlineStatusIndicator';
import { usePresenceStore } from '@/shared/model/usePresenceStore';
import { useAuthStore } from '@/shared/model/useAuthStore';
import { ConversationView, MessageView, MuteLevel } from '../../../entities/chat/model/types';
import { ConversationDisplay } from '../lib/getConversationDisplay';
import NicknamesModal from './NicknamesModal';
import PinnedMessagesModal from './PinnedMessagesModal';
import MuteOptionsModal from './MuteOptionsModal';
import MediaFilesLinksModal from '@/shared/ui/MediaFilesLinksModal';
import EditGroupModal from './EditGroupModal';
import GroupParticipantsModal from './GroupParticipantsModal';
import AddMembersModal from './AddMembersModal';
import GroupMemberDetailView from './GroupMemberDetailView';
import { useMessageActions } from '../model/useMessageActions';
import {
  useArchiveConversation,
  useBlockUser,
  useMuteConversation,
  useReportUser,
  useLeaveConversation,
} from '../model/useConversationMutations';

interface ConversationDetailsPanelProps {
  conversation: ConversationView;
  display: ConversationDisplay;
  otherUserId: string | null;
  messages: MessageView[];
  onClose: () => void;
  onOpenSearch: () => void;
  onJumpToMessage: (messageId: string) => void;
}

function SectionButton({
  icon,
  label,
  sublabel,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
        danger ? 'text-red-400 hover:bg-red-500/10' : 'text-gray-200 hover:bg-white/5'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        {sublabel && <span className="block text-xs text-gray-500">{sublabel}</span>}
      </span>
    </button>
  );
}

function ExpandableSection({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-gray-200 hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-semibold">{label}</span>
        {isOpen ? (
          <ChevronDown size={16} className="text-gray-500" />
        ) : (
          <ChevronRight size={16} className="text-gray-500" />
        )}
      </button>
      {isOpen && <div className="flex flex-col gap-0.5 pl-1 pb-1">{children}</div>}
    </div>
  );
}

export default function ConversationDetailsPanel({
  conversation,
  display,
  otherUserId,
  messages,
  onClose,
  onOpenSearch,
  onJumpToMessage,
}: ConversationDetailsPanelProps) {
  const navigate = useNavigate();
  const { userId: currentUserId } = useAuthStore();
  const isGroup = conversation.type === 'GROUP';

  const isOnline = usePresenceStore((s) =>
    otherUserId ? s.onlineUserIds.has(otherUserId) : false,
  );
  const muteConversation = useMuteConversation();
  const archiveConversation = useArchiveConversation();
  const blockUser = useBlockUser();
  const reportUser = useReportUser();
  const leaveConversation = useLeaveConversation();
  const messageActions = useMessageActions(conversation.id);

  const [isInfoOpen, setInfoOpen] = useState(true);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isNicknamesModalOpen, setNicknamesModalOpen] = useState(false);
  const [isPinnedModalOpen, setPinnedModalOpen] = useState(false);
  const [isMuteModalOpen, setMuteModalOpen] = useState(false);
  const [isEditGroupModalOpen, setEditGroupModalOpen] = useState(false);
  const [isParticipantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [isAddMembersModalOpen, setAddMembersModalOpen] = useState(false);
  const [viewedMemberId, setViewedMemberId] = useState<string | null>(null);
  const [galleryTab, setGalleryTab] = useState<'media' | 'files' | 'links' | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, 180);
  };

  const otherUsername = conversation.participants.find((p) => p.userId === otherUserId)?.user
    .username;
  const myParticipant = conversation.participants.find((p) => p.userId === currentUserId);

  const isMuted = conversation.myMuteLevel !== 'NONE';
  const pinnedCount = conversation.pinnedMessages.length;

  const { mediaCount, fileCount, linkCount } = useMemo(() => {
    let media = 0;
    let files = 0;
    let links = 0;
    for (const m of messages) {
      for (const a of m.attachments) {
        if (a.type === 'IMAGE' || a.type === 'VIDEO' || a.type === 'GIF') media += 1;
        else if (a.type === 'FILE' || a.type === 'AUDIO') files += 1;
        else if (a.type === 'LINK') links += 1;
      }
    }
    return { mediaCount: media, fileCount: files, linkCount: links };
  }, [messages]);

  const handleToggleMute = () => {
    if (isMuted) {
      muteConversation.mutate({ conversationId: conversation.id, muteLevel: 'NONE' });
    } else {
      setMuteModalOpen(true);
    }
  };

  const handleConfirmMute = (muteLevel: MuteLevel) => {
    muteConversation.mutate({ conversationId: conversation.id, muteLevel });
    setMuteModalOpen(false);
  };

  const handleLeaveGroup = () => {
    if (!window.confirm('Leave this group?')) return;
    leaveConversation.mutate(conversation.id, {
      onSuccess: () => {
        navigate('/messages');
        requestClose();
      },
    });
  };

  const viewedParticipant = conversation.participants.find((p) => p.userId === viewedMemberId);
  const canManageMembers = myParticipant?.role === 'OWNER';

  if (viewedParticipant) {
    return (
      <div
        className={`h-full w-[340px] flex-shrink-0 flex flex-col bg-[#16161a]/80 backdrop-blur-2xl border-l border-white/5 ${
          isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
        }`}
      >
        <GroupMemberDetailView
          conversation={conversation}
          participant={viewedParticipant}
          canManage={canManageMembers}
          onBack={() => setViewedMemberId(null)}
        />
      </div>
    );
  }

  return (
    <div
      className={`h-full w-[340px] flex-shrink-0 flex flex-col bg-[#16161a]/80 backdrop-blur-2xl border-l border-white/5 ${
        isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'
      }`}
    >
      <div className="flex items-center justify-between px-5 h-16 flex-shrink-0 border-b border-white/5">
        <h2 className="text-base font-bold text-white">Chat details</h2>
        <button
          onClick={requestClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors active:scale-90"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-5">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            {isGroup ? (
              <GroupAvatarCollage
                avatars={conversation.participants.map((p) => p.user.avatar)}
                size={80}
              />
            ) : (
              <>
                <Avatar size="xl" src={display.avatar} />
                {otherUserId && (
                  <OnlineStatusIndicator userId={otherUserId} variant="dot" size="md" />
                )}
              </>
            )}
          </div>
          <p className="text-lg font-bold text-white">{display.title}</p>
          {isGroup ? (
            <p className="text-sm mt-0.5 text-gray-500">
              {conversation.participants.length} members
            </p>
          ) : (
            <p
              className={`inline-flex items-center gap-1.5 text-sm mt-0.5 ${isOnline ? 'text-emerald-400' : 'text-gray-500'}`}
            >
              {isOnline && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              {isOnline ? 'Active now' : 'Offline'}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mb-5">
          {!isGroup && otherUserId && otherUsername && (
            <a
              href={`/${otherUsername}`}
              className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl text-gray-300 hover:bg-white/5 transition-colors"
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
                <UserRound size={17} />
              </span>
              <span className="text-[11px] font-medium">Profile</span>
            </a>
          )}
          {isGroup && (
            <button
              onClick={() => setParticipantsModalOpen(true)}
              className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl text-gray-300 hover:bg-white/5 transition-colors"
            >
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
                <Users size={17} />
              </span>
              <span className="text-[11px] font-medium">Members</span>
            </button>
          )}
          <button
            onClick={handleToggleMute}
            className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl text-gray-300 hover:bg-white/5 transition-colors"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
              {isMuted ? <BellOff size={17} /> : <Bell size={17} />}
            </span>
            <span className="text-[11px] font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
          <button
            onClick={onOpenSearch}
            className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl text-gray-300 hover:bg-white/5 transition-colors"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
              <Search size={17} />
            </span>
            <span className="text-[11px] font-medium">Search</span>
          </button>
        </div>

        {isGroup && (
          <>
            <div className="h-px bg-white/5 my-2" />
            <div className="flex items-center justify-between px-3 pt-1 pb-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {conversation.participants.length} participants
              </p>
              <button
                onClick={() => setAddMembersModalOpen(true)}
                title="Add more users"
                className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <UserPlus size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-0.5 max-h-40 overflow-y-auto custom-scrollbar mb-1">
              {conversation.participants.slice(0, 5).map((p) => {
                const name = p.nickname ?? p.user.displayName ?? p.user.username;
                return (
                  <button
                    key={p.userId}
                    onClick={() => setViewedMemberId(p.userId)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="relative">
                      <Avatar size="sm" src={p.user.avatar} />
                      <OnlineStatusIndicator userId={p.userId} variant="dot" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{name}</p>
                    </div>
                    {(p.role === 'OWNER' || p.role === 'ADMIN') && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-500 flex-shrink-0">
                        {p.role === 'OWNER' ? (
                          <Crown size={12} className="text-yellow-500" />
                        ) : (
                          <ShieldCheck size={12} className="text-blue-400" />
                        )}
                        {p.role === 'OWNER' ? 'Owner' : 'Admin'}
                      </span>
                    )}
                  </button>
                );
              })}
              {conversation.participants.length > 5 && (
                <button
                  onClick={() => setParticipantsModalOpen(true)}
                  className="text-left px-3 py-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View all {conversation.participants.length} participants
                </button>
              )}
            </div>
          </>
        )}

        <div className="h-px bg-white/5 my-2" />

        <p className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Chat settings
        </p>

        <ExpandableSection
          label="Chat info"
          isOpen={isInfoOpen}
          onToggle={() => setInfoOpen((v) => !v)}
        >
          <SectionButton
            icon={<Pin size={17} />}
            label="Pinned messages"
            sublabel={`${pinnedCount}`}
            onClick={() => setPinnedModalOpen(true)}
          />
          <SectionButton
            icon={<ImageIcon size={17} />}
            label="Media"
            sublabel={`${mediaCount} loaded`}
            onClick={() => setGalleryTab('media')}
          />
          <SectionButton
            icon={<FileText size={17} />}
            label="Files"
            sublabel={`${fileCount} loaded`}
            onClick={() => setGalleryTab('files')}
          />
          <SectionButton
            icon={<LinkIcon size={17} />}
            label="Links"
            sublabel={`${linkCount} loaded`}
            onClick={() => setGalleryTab('links')}
          />
        </ExpandableSection>

        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-gray-200 hover:bg-white/5 transition-colors">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Palette size={17} className="text-gray-400" /> Change theme
          </span>
          <ChevronRight size={16} className="text-gray-500" />
        </button>

        {isGroup ? (
          <button
            onClick={() => setEditGroupModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-gray-200 hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              <Pencil size={17} className="text-gray-400" /> Edit group
            </span>
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        ) : (
          <button
            onClick={() => setNicknamesModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-gray-200 hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              <Pencil size={17} className="text-gray-400" /> Edit nickname
            </span>
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        )}

        <div className="h-px bg-white/5 my-2" />

        <p className="px-3 pt-1 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Privacy &amp; support
        </p>

        <ExpandableSection
          label="Privacy and support"
          isOpen={isPrivacyOpen}
          onToggle={() => setPrivacyOpen((v) => !v)}
        >
          <SectionButton
            icon={isMuted ? <Bell size={17} /> : <BellOff size={17} />}
            label={isMuted ? 'Unmute notifications' : 'Mute notifications'}
            onClick={handleToggleMute}
          />
          <SectionButton icon={<ShieldQuestion size={17} />} label="Message permissions" />
          <SectionButton icon={<Eye size={17} />} label="Read receipts" sublabel="On" />
          <SectionButton icon={<ShieldAlert size={17} />} label="Restrict" />
          {!isGroup && otherUserId && (
            <SectionButton
              icon={<Ban size={17} />}
              label="Block"
              danger
              onClick={() => blockUser.mutate(otherUserId)}
            />
          )}
          {!isGroup && otherUserId && (
            <SectionButton
              icon={<Flag size={17} />}
              label="Report"
              sublabel="Leave feedback and report this conversation"
              danger
              onClick={() => reportUser.mutate({ userId: otherUserId, category: 'OTHER' })}
            />
          )}
        </ExpandableSection>

        <div className="h-px bg-white/5 my-2" />

        {isGroup ? (
          <SectionButton
            icon={<LogOut size={17} />}
            label="Leave group"
            danger
            onClick={handleLeaveGroup}
          />
        ) : (
          <>
            <SectionButton
              icon={<Archive size={17} />}
              label={conversation.isArchived ? 'Unarchive chat' : 'Archive chat'}
              danger
              onClick={() =>
                archiveConversation.mutate({
                  conversationId: conversation.id,
                  archived: !conversation.isArchived,
                })
              }
            />
            <SectionButton icon={<Trash2 size={17} />} label="Delete chat" danger />
          </>
        )}
      </div>

      {isNicknamesModalOpen && (
        <NicknamesModal conversation={conversation} onClose={() => setNicknamesModalOpen(false)} />
      )}

      {isPinnedModalOpen && (
        <PinnedMessagesModal
          pinnedMessages={conversation.pinnedMessages}
          onClose={() => setPinnedModalOpen(false)}
          onJumpToMessage={(messageId) => {
            setPinnedModalOpen(false);
            onJumpToMessage(messageId);
          }}
          onUnpin={(messageId) => messageActions.unpinMessage(messageId).catch(() => {})}
        />
      )}

      {isMuteModalOpen && (
        <MuteOptionsModal onClose={() => setMuteModalOpen(false)} onConfirm={handleConfirmMute} />
      )}

      {galleryTab && (
        <MediaFilesLinksModal
          messages={messages}
          initialTab={galleryTab}
          onClose={() => setGalleryTab(null)}
          onJumpToMessage={onJumpToMessage}
        />
      )}

      {isEditGroupModalOpen && (
        <EditGroupModal
          conversation={conversation}
          onClose={() => setEditGroupModalOpen(false)}
          onOpenParticipants={() => {
            setEditGroupModalOpen(false);
            setParticipantsModalOpen(true);
          }}
        />
      )}

      {isParticipantsModalOpen && (
        <GroupParticipantsModal
          conversation={conversation}
          currentUserId={currentUserId}
          onClose={() => setParticipantsModalOpen(false)}
          onSelectMember={(userId) => setViewedMemberId(userId)}
        />
      )}

      {isAddMembersModalOpen && (
        <AddMembersModal
          conversationId={conversation.id}
          existingMemberIds={conversation.participants.map((p) => p.userId)}
          onClose={() => setAddMembersModalOpen(false)}
        />
      )}
    </div>
  );
}
