import React from 'react';
import { Phone, Video, Info, Radio } from 'lucide-react';
import Avatar from '../../../shared/ui/Avatar';
import GroupAvatarCollage from '../../../shared/ui/GroupAvatarCollage';
import OnlineStatusIndicator from '../../../shared/ui/OnlineStatusIndicator';
import { ConversationDisplay } from '../lib/getConversationDisplay';
import { VerifiedCheckmark } from '@/entities/profile/ui/VerifiedCheckmark';
import { useCallPrewarmer } from '../lib/webrtc/webrtcPrewarmer';
import { useVoiceChannelStore } from '../model/voiceChannelStore';
import { useCurrentUser } from '@/entities/profile/model/useCurrentUser';

interface ChatThreadHeaderProps {
  conversationId?: string;
  display: ConversationDisplay;
  otherUserId: string | null;
  isOtherTyping: boolean;
  isDetailsOpen: boolean;
  onToggleDetails: () => void;
  isGroup?: boolean;
  memberAvatars?: (string | null)[];
  memberCount?: number;
  onStartCall?: (type: 'audio' | 'video') => void;
}

export default function ChatThreadHeader({
  conversationId,
  display,
  otherUserId,
  isOtherTyping,
  isDetailsOpen,
  onToggleDetails,
  isGroup,
  memberAvatars = [],
  memberCount = 0,
  onStartCall,
}: ChatThreadHeaderProps) {
  const callKey = otherUserId || 'default';
  const prewarmer = useCallPrewarmer(callKey);

  const { activeVoiceChannelId, joinVoiceChannel, leaveVoiceChannel } = useVoiceChannelStore();
  const { data: currentUser } = useCurrentUser();
  const isVoiceActive = Boolean(conversationId && activeVoiceChannelId === conversationId);

  const handleToggleVoice = () => {
    if (!conversationId) return;
    if (isVoiceActive) {
      leaveVoiceChannel();
    } else {
      joinVoiceChannel(
        conversationId,
        display.title,
        currentUser
          ? {
              userId: currentUser.id,
              username: currentUser.username,
              displayName: currentUser.displayName,
              avatar: currentUser.avatar,
              isMuted: false,
              isSpeaking: false,
            }
          : undefined,
      );
    }
  };

  return (
    <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          {isGroup ? (
            display.avatar ? (
              <Avatar size="sm" src={display.avatar} />
            ) : (
              <GroupAvatarCollage avatars={memberAvatars} size={36} />
            )
          ) : (
            <>
              <Avatar size="sm" src={display.avatar} />
              {otherUserId && <OnlineStatusIndicator userId={otherUserId} variant="dot" />}
            </>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{display.title}</p>
            {display.isVerified && <VerifiedCheckmark size="sm" />}
          </div>
          {isOtherTyping ? (
            <p className="text-[12px] truncate text-blue-400">Typing…</p>
          ) : isGroup ? (
            <p className="text-[12px] truncate text-gray-500">{memberCount} members</p>
          ) : (
            otherUserId && (
              <span className="flex items-center gap-1.5 min-w-0">
                <OnlineStatusIndicator
                  userId={otherUserId}
                  variant="dot"
                  className="static shrink-0 border-0! w-2! h-2!"
                  showOfflineDot={false}
                />
                <OnlineStatusIndicator
                  userId={otherUserId}
                  variant="text"
                  className="text-[12px] truncate block"
                />
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {conversationId && (
          <button
            type="button"
            onClick={handleToggleVoice}
            title={
              isVoiceActive
                ? 'Leave Background Voice Room (Voice 2.0)'
                : 'Join Background Coworking Voice Room (Voice 2.0)'
            }
            aria-label="Toggle background voice channel"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isVoiceActive
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'text-zinc-400 hover:text-emerald-400 hover:bg-white/5 border border-white/10'
            }`}
          >
            <Radio
              size={15}
              className={isVoiceActive ? 'text-black animate-pulse' : 'text-emerald-400'}
            />
            <span className="hidden sm:inline">{isVoiceActive ? 'In Voice' : 'Voice 2.0'}</span>
          </button>
        )}

        <button
          onClick={() => {
            prewarmer.prewarmImmediately();
            onStartCall?.('audio');
          }}
          onMouseEnter={prewarmer.onMouseEnter}
          onMouseLeave={prewarmer.onMouseLeave}
          onTouchStart={prewarmer.onTouchStart}
          title="Audio call"
          aria-label="Start audio call"
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Phone size={19} />
        </button>
        <button
          onClick={() => {
            prewarmer.prewarmImmediately();
            onStartCall?.('video');
          }}
          onMouseEnter={prewarmer.onMouseEnter}
          onMouseLeave={prewarmer.onMouseLeave}
          onTouchStart={prewarmer.onTouchStart}
          title="Video call"
          aria-label="Start video call"
          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Video size={19} />
        </button>
        <button
          onClick={onToggleDetails}
          title="Conversation info"
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            isDetailsOpen
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Info size={19} />
        </button>
      </div>
    </div>
  );
}
