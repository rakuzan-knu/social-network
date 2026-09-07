import React from 'react';
import { Mic, MicOff, Headphones, PhoneOff, Radio, VolumeX } from 'lucide-react';
import Avatar from '@/shared/ui/Avatar';
import { useVoiceChannelStore } from '../../model/voiceChannelStore';

export function VoiceChannelDock() {
  const {
    activeVoiceChannelId,
    activeVoiceChannelTitle,
    participants,
    isMuted,
    isDeafened,
    toggleMute,
    toggleDeafen,
    leaveVoiceChannel,
  } = useVoiceChannelStore();

  if (!activeVoiceChannelId) return null;

  return (
    <div
      role="region"
      aria-label="Background voice channel dock"
      className="fixed bottom-6 right-6 z-40 max-w-sm bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-white select-none animate-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-400 truncate flex items-center gap-1.5">
              <Radio size={12} />
              Voice 2.0 Connected
            </p>
            <p className="text-[11px] text-zinc-300 truncate max-w-44 font-medium">
              {activeVoiceChannelTitle || 'Coworking Room'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className={`p-1.5 rounded-lg transition ${
              isMuted
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
          </button>

          <button
            type="button"
            onClick={toggleDeafen}
            title={isDeafened ? 'Undeafen' : 'Deafen (Mutes and deafens)'}
            className={`p-1.5 rounded-lg transition ${
              isDeafened
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-white/10 text-zinc-300 hover:text-white'
            }`}
          >
            {isDeafened ? <VolumeX size={14} /> : <Headphones size={14} />}
          </button>

          <button
            type="button"
            onClick={leaveVoiceChannel}
            title="Disconnect from voice room"
            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition shadow-sm ml-1"
          >
            <PhoneOff size={14} />
          </button>
        </div>
      </div>

      {/* Connected Coworking Participants Avatars Stack */}
      <div className="mt-2.5 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {participants.length === 0 ? (
          <span className="text-[11px] text-zinc-500 italic">No other participants</span>
        ) : (
          participants.map((p) => (
            <div
              key={p.userId}
              className="relative flex-shrink-0 group"
              title={p.displayName || p.username}
            >
              <div
                className={`relative rounded-full transition-all duration-200 ${
                  p.isSpeaking
                    ? 'ring-2 ring-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] scale-105'
                    : 'ring-1 ring-white/15'
                }`}
              >
                <Avatar src={p.avatar} size="xs" />
              </div>
              {p.isMuted && (
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[9px] shadow-sm">
                  <MicOff size={8} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
