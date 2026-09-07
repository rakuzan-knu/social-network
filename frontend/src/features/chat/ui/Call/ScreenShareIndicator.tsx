import { Monitor, X, Pencil } from 'lucide-react';
import { useCallStore } from '../../model/callStore';

interface ScreenShareIndicatorProps {
  onStop: () => void;
}

export function ScreenShareIndicator({ onStop }: ScreenShareIndicatorProps) {
  const { isScreenSharing, isScreenAnnotationActive, setIsScreenAnnotationActive } = useCallStore();

  if (!isScreenSharing) return null;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 backdrop-blur-md shadow-xl text-blue-200 text-xs font-medium animate-fadeIn">
      <div className="flex items-center gap-2">
        <Monitor size={15} className="text-blue-400 animate-pulse" />
        <span>You are sharing your screen</span>
      </div>

      <button
        onClick={() => setIsScreenAnnotationActive(!isScreenAnnotationActive)}
        title="Live draw & laser pointer over screen"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
          isScreenAnnotationActive
            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
            : 'bg-white/15 hover:bg-white/25 text-white'
        }`}
      >
        <Pencil size={12} />
        <span>{isScreenAnnotationActive ? 'Drawing On' : 'Draw'}</span>
      </button>

      <button
        onClick={onStop}
        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors"
      >
        <X size={12} />
        <span>Stop</span>
      </button>
    </div>
  );
}
