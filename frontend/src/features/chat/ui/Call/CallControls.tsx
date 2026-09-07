import React, { useEffect, useState } from 'react';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  MonitorUp,
  MonitorX,
  PhoneOff,
  Settings,
  Sparkles,
  Wand2,
  UploadCloud,
  Film,
  PenTool,
  Smile,
  Compass,
  Radio,
  Camera,
  Bot,
  Boxes,
} from 'lucide-react';
import { useCallStore } from '../../model/callStore';

const REACTION_EMOJIS = ['❤️', '🔥', '👏', '🎉', '🚀', '💎'];

interface CallControlsProps {
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
  onOpenSettings: () => void;
  onSendReaction?: (emoji: string) => void;
}

export function CallControls({
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall,
  onOpenSettings,
  onSendReaction,
}: CallControlsProps) {
  const [isReactionsOpen, setIsReactionsOpen] = useState(false);

  const {
    isMuted,
    isVideoOff,
    isScreenSharing,
    isScreenAudioSharing,
    isNoiseSuppressionEnabled,
    setIsNoiseSuppressionEnabled,
    virtualBackground,
    setVirtualBackground,
    fileTransfers,
    isFileTransferOpen,
    setIsFileTransferOpen,
    isSyncPlayOpen,
    setIsSyncPlayOpen,
    isWhiteboardOpen,
    toggleWhiteboard,
    isSoundboardOpen,
    toggleSoundboard,
    isLiveSummaryOpen,
    toggleLiveSummary,
    isDualCameraOpen,
    toggleDualCamera,
    isHolographicCallOpen,
    toggleHolographicCall,
    isTravelerModeEnabled,
    setIsTravelerModeEnabled,
    isPTTEnabled,
    isPTTActive,
  } = useCallStore();

  const activeTransfersCount = Object.values(fileTransfers).filter(
    (t) => t.status === 'transferring',
  ).length;

  // Keyboard shortcuts: M for mute, V for video, W for whiteboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        onToggleMute();
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        onToggleVideo();
      } else if (e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        toggleWhiteboard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleMute, onToggleVideo, toggleWhiteboard]);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-5 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Push to talk status pill */}
      {isPTTEnabled && (
        <div
          className={`absolute -top-9 left-8 -translate-x-1/2 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all duration-150 ${
            isPTTActive
              ? 'bg-emerald-500/90 text-white shadow-emerald-500/30 scale-105 animate-pulse'
              : 'bg-zinc-900/90 text-zinc-300 border border-white/10'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isPTTActive ? 'bg-white' : 'bg-emerald-400'}`}
          />
          {isPTTActive ? 'PTT Active' : 'Hold Space'}
        </div>
      )}

      {/* Mute Button */}
      <button
        onClick={onToggleMute}
        title={isMuted ? 'Unmute microphone (M)' : 'Mute microphone (M)'}
        aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isMuted
            ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Video Toggle Button */}
      <button
        onClick={onToggleVideo}
        title={isVideoOff ? 'Start camera (V)' : 'Stop camera (V)'}
        aria-label={isVideoOff ? 'Start camera' : 'Stop camera'}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isVideoOff
            ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        {isVideoOff ? <VideoOff size={20} /> : <VideoIcon size={20} />}
      </button>

      {/* Screen Share Button */}
      <button
        onClick={onToggleScreenShare}
        title={isScreenSharing ? 'Stop presenting' : 'Share screen'}
        aria-label={isScreenSharing ? 'Stop presenting' : 'Share screen'}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isScreenSharing
            ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/30'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        {isScreenSharing ? <MonitorX size={20} /> : <MonitorUp size={20} />}
        {isScreenAudioSharing && (
          <span
            title="System audio is being shared"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950 flex items-center justify-center animate-pulse"
          />
        )}
      </button>

      {/* Quick Background Blur Toggle */}
      <button
        onClick={() => setVirtualBackground(virtualBackground === 'blur' ? 'none' : 'blur')}
        title={virtualBackground === 'blur' ? 'Background Blur: ON' : 'Toggle Background Blur'}
        aria-label="Toggle Background Blur"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          virtualBackground === 'blur'
            ? 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.25)]'
            : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10'
        }`}
      >
        <Wand2 size={20} />
      </button>

      {/* Quick AI Noise Suppression Toggle */}
      <button
        onClick={() => setIsNoiseSuppressionEnabled(!isNoiseSuppressionEnabled)}
        title={
          isNoiseSuppressionEnabled
            ? 'Neural Noise Cancellation: ON (RNNoise WASM)'
            : 'Neural Noise Cancellation: OFF'
        }
        aria-label="Toggle Neural Noise Cancellation"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isNoiseSuppressionEnabled
            ? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
            : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10'
        }`}
      >
        <Sparkles size={20} />
      </button>

      {/* Floating Reaction Emotes Popover */}
      <div className="relative">
        <button
          onClick={() => setIsReactionsOpen((prev) => !prev)}
          title="Send Reaction Emote"
          aria-label="Send Reaction Emote"
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
            isReactionsOpen
              ? 'bg-pink-500/25 text-pink-300 border border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          <Smile size={20} className={isReactionsOpen ? 'text-pink-300' : 'text-pink-400'} />
        </button>

        {isReactionsOpen && (
          <div
            role="toolbar"
            aria-label="Reaction emojis"
            className="absolute bottom-16 left-1/2 -translate-x-1/2 p-2 bg-zinc-900/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
          >
            {REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onSendReaction?.(emoji);
                }}
                className="w-10 h-10 flex items-center justify-center text-xl rounded-xl hover:bg-white/15 active:scale-125 transition-transform duration-150"
                aria-label={`Send ${emoji} reaction`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Traveler / Eco-Mode Button */}
      <button
        onClick={() => setIsTravelerModeEnabled(!isTravelerModeEnabled)}
        title={
          isTravelerModeEnabled
            ? 'Traveler Mode: ON (Data & Battery Saver: 12kbps Opus, 15fps UI)'
            : 'Traveler Mode: OFF (Save 4G data & battery)'
        }
        aria-label="Toggle Traveler Mode"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isTravelerModeEnabled
            ? 'bg-emerald-500/25 text-emerald-300 hover:bg-emerald-500/35 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Compass
          size={20}
          className={isTravelerModeEnabled ? 'text-emerald-300' : 'text-emerald-400'}
        />
      </button>

      {/* P2P File Transfer Button */}
      <button
        onClick={() => setIsFileTransferOpen(!isFileTransferOpen)}
        title="P2P File Transfer (Unlimited size, $0 cost)"
        aria-label="P2P File Transfer"
        className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all duration-200"
      >
        <UploadCloud size={20} className="text-indigo-300" />
        {activeTransfersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse shadow-md">
            {activeTransfersCount}
          </span>
        )}
      </button>

      {/* Watch Together (SyncPlay) Button */}
      <button
        onClick={() => setIsSyncPlayOpen(!isSyncPlayOpen)}
        title="Watch Together (SyncPlay P2P)"
        aria-label="Watch Together"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isSyncPlayOpen
            ? 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/40 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Film size={20} className="text-purple-400" />
      </button>

      {/* Interactive Whiteboard (CRDT) Button */}
      <button
        onClick={toggleWhiteboard}
        title={isWhiteboardOpen ? 'Close Whiteboard (W)' : 'Interactive Whiteboard (W)'}
        aria-label="Interactive Whiteboard"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isWhiteboardOpen
            ? 'bg-amber-500/25 text-amber-300 hover:bg-amber-500/35 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <PenTool size={20} className={isWhiteboardOpen ? 'text-amber-300' : 'text-amber-400'} />
      </button>

      {/* Live Soundboard Button */}
      <button
        onClick={toggleSoundboard}
        title={isSoundboardOpen ? 'Close Soundboard' : 'Live Soundboard & Memes'}
        aria-label="Live Soundboard"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isSoundboardOpen
            ? 'bg-orange-500/25 text-orange-300 hover:bg-orange-500/35 border border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Radio size={20} className={isSoundboardOpen ? 'text-orange-300' : 'text-orange-400'} />
      </button>

      {/* AI Live Summary («What did I miss?») Button */}
      <button
        onClick={toggleLiveSummary}
        title={isLiveSummaryOpen ? 'Close AI Live Summary' : '«What did I miss?» AI Live Summary'}
        aria-label="AI Live Summary"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isLiveSummaryOpen
            ? 'bg-cyan-500/25 text-cyan-300 hover:bg-cyan-500/35 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Bot size={20} className={isLiveSummaryOpen ? 'text-cyan-300' : 'text-cyan-400'} />
      </button>

      {/* Dual Camera Studio Mode Button */}
      <button
        onClick={toggleDualCamera}
        title={isDualCameraOpen ? 'Close Dual Camera' : 'Dual Camera Studio Mode'}
        aria-label="Dual Camera Mode"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isDualCameraOpen
            ? 'bg-emerald-500/25 text-emerald-300 hover:bg-emerald-500/35 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Camera size={20} className={isDualCameraOpen ? 'text-emerald-300' : 'text-emerald-400'} />
      </button>

      {/* 3D Gaussian Splatting Holographic Call Button */}
      <button
        onClick={toggleHolographicCall}
        title={
          isHolographicCallOpen ? 'Close 3D Holographic Call' : '3D Holographic Call (WebXR LiDAR)'
        }
        aria-label="3D Holographic Call"
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
          isHolographicCallOpen
            ? 'bg-cyan-500/30 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
        }`}
      >
        <Boxes
          size={20}
          className={isHolographicCallOpen ? 'text-cyan-300 animate-pulse' : 'text-cyan-400'}
        />
      </button>

      {/* Audio/Video Settings */}
      <button
        onClick={onOpenSettings}
        title="Device Settings"
        aria-label="Device Settings"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all duration-200"
      >
        <Settings size={20} />
      </button>

      {/* End Call Button */}
      <button
        onClick={onEndCall}
        title="Leave call"
        aria-label="Leave call"
        className="w-14 h-12 px-4 flex items-center justify-center rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 transition-all duration-200 hover:scale-105"
      >
        <PhoneOff size={20} />
      </button>
    </div>
  );
}
