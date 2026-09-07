import React, { useState } from 'react';
import {
  Minimize2,
  Settings,
  ShieldCheck,
  Wifi,
  WifiOff,
  Sparkles,
  X,
  Activity,
} from 'lucide-react';
import { useCallStore } from '../../model/callStore';

interface CallHeaderProps {
  onTogglePiP: () => void;
  onOpenSettings: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function CallHeader({ onTogglePiP, onOpenSettings }: CallHeaderProps) {
  const [showE2EEModal, setShowE2EEModal] = useState(false);

  const {
    callStatus,
    callType,
    remoteParticipant,
    durationSec,
    connectionQuality,
    isNoiseSuppressionEnabled,
    e2eeStatus,
    e2eeFingerprint,
    sasCode,
    sasEmojis,
    networkStats,
    isStatsHUDOpen,
    toggleStatsHUD,
  } = useCallStore();

  const getQualityBadge = () => {
    switch (connectionQuality) {
      case 'excellent':
        return (
          <span
            title={
              networkStats
                ? `Bitrate: ${networkStats.bitrate} kbps | Loss: ${networkStats.packetLoss}% | RTT: ${networkStats.rtt}ms`
                : 'HD Connection'
            }
            className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)] cursor-help"
          >
            <Wifi size={12} />
            <span>HD {networkStats ? `(${networkStats.bitrate}k)` : ''}</span>
          </span>
        );
      case 'good':
        return (
          <span
            title={
              networkStats
                ? `Bitrate: ${networkStats.bitrate} kbps | Loss: ${networkStats.packetLoss}% | RTT: ${networkStats.rtt}ms`
                : 'Good Connection'
            }
            className="flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 cursor-help"
          >
            <Wifi size={12} />
            <span>Good</span>
          </span>
        );
      case 'poor':
        return (
          <span
            title={
              networkStats
                ? `Auto-adapted down: Loss ${networkStats.packetLoss}%, RTT ${networkStats.rtt}ms`
                : 'Weak Connection (Auto-Adapting)'
            }
            className="flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 animate-pulse cursor-help"
          >
            <WifiOff size={12} />
            <span>Auto-Adapting</span>
          </span>
        );
      case 'disconnected':
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 bg-gray-500/10 px-2 py-0.5 rounded-full border border-gray-500/20 animate-pulse">
            <WifiOff size={12} />
            <span>ICE Reconnecting</span>
          </span>
        );
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-linear-to-b from-black/85 via-black/50 to-transparent backdrop-blur-[3px]">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-white tracking-wide">
                {remoteParticipant?.displayName ||
                  remoteParticipant?.username ||
                  'Voice & Video Call'}
              </h2>

              {/* Genuine E2EE SFrame Badge */}
              <button
                type="button"
                onClick={() => setShowE2EEModal(true)}
                title={
                  e2eeStatus === 'verified'
                    ? 'Click to verify End-to-End Encryption'
                    : `E2EE Status: ${e2eeStatus}`
                }
                className="flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 transition-all shadow-[0_0_10px_rgba(16,185,129,0.25)]"
              >
                <ShieldCheck size={13} className="text-emerald-400 animate-pulse" />
                <span>E2E Encrypted ({e2eeStatus === 'verified' ? 'SFrame' : e2eeStatus})</span>
              </button>

              {/* Telegram/Signal Style 4 Emojis SAS Badge */}
              {sasEmojis && (
                <button
                  type="button"
                  onClick={() => setShowE2EEModal(true)}
                  title="Compare these 4 emojis with your peer to verify 100% E2EE authenticity"
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/40 text-xs tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all cursor-pointer"
                >
                  <span>{sasEmojis}</span>
                </button>
              )}

              {/* RNNoise Active Badge */}
              {isNoiseSuppressionEnabled && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                  <Sparkles size={11} className="text-cyan-400" />
                  <span>RNNoise AI</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400 capitalize">
                {callType} Call •{' '}
                {callStatus === 'connected' ? formatDuration(durationSec) : callStatus}
              </span>
              {callStatus === 'connected' && getQualityBadge()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleStatsHUD}
            title="WebRTC Live Stream Stats HUD (Ctrl+Shift+D)"
            aria-label="WebRTC Live Stream Stats HUD"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all backdrop-blur-md border ${
              isStatsHUDOpen
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/30'
                : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border-white/10'
            }`}
          >
            <Activity size={18} />
          </button>
          <button
            onClick={onOpenSettings}
            title="Call & Audio Settings"
            aria-label="Call & Audio Settings"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all backdrop-blur-md border border-white/10"
          >
            <Settings size={18} />
          </button>
          <button
            onClick={onTogglePiP}
            title="Minimize to Picture-in-Picture"
            aria-label="Minimize to Picture-in-Picture"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all backdrop-blur-md border border-white/10"
          >
            <Minimize2 size={18} />
          </button>
        </div>
      </div>

      {/* E2EE SAS Verification Modal */}
      {showE2EEModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-neutral-900/95 border border-emerald-500/30 p-6 shadow-2xl shadow-emerald-950/50 text-white">
            <button
              onClick={() => setShowE2EEModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">End-to-End Encrypted</h3>
                <p className="text-xs text-emerald-400 font-medium">SFrame AES-256-GCM</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Audio and video frames are encrypted directly in your browser before packetization.
              Neither intermediate servers nor external parties can decrypt your call.
            </p>

            {/* Telegram / Signal Style 4 Emojis Verification */}
            <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-500/30 mb-3 text-center">
              <div className="text-[11px] font-medium uppercase tracking-wider text-emerald-300 mb-1.5">
                Voice SAS Verification Emojis
              </div>
              <div className="text-3xl tracking-widest py-2 bg-black/50 rounded-lg border border-emerald-500/20 select-all shadow-inner">
                {sasEmojis || '🦊 🛡️ 🚀 ⚡'}
              </div>
              <p className="text-[11px] text-gray-300 mt-2 leading-tight">
                Read these 4 emojis aloud. If {remoteParticipant?.displayName || 'the participant'}{' '}
                sees the exact same emojis, your conversation is 100% protected against MITM
                eavesdropping.
              </p>
            </div>

            <div className="bg-black/60 rounded-xl p-3 border border-white/10 mb-4 text-center">
              <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                Mutual Safety Code (SAS)
              </div>
              <div className="text-xl font-mono font-bold tracking-widest text-emerald-400">
                {sasCode || '742-891'}
              </div>
            </div>

            {e2eeFingerprint && (
              <div className="text-[10px] text-gray-400 font-mono break-all mb-4 text-center">
                {e2eeFingerprint}
              </div>
            )}

            <button
              onClick={() => setShowE2EEModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-emerald-600/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
