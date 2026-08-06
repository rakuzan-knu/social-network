import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  FlipHorizontal,
  RotateCw,
  Undo2,
  Redo2,
  Pencil,
  Highlighter,
  Eraser,
  Smile,
  Type,
  Pipette,
} from 'lucide-react';
import type { Theme, EmojiStyle } from 'emoji-picker-react';
import { flipPointX, rotatePoint90, Point } from '../lib/imageEditorGeometry';

const EmojiPicker = lazy(() => import('emoji-picker-react'));

type ToolMode = 'draw' | 'sticker' | 'text';
type DrawTool = 'pencil' | 'marker' | 'eraser';

interface Stroke {
  id: string;
  tool: DrawTool;
  color: string;
  size: number;
  points: Point[];
}

interface StickerItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
  fontSize: number;
}

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
}

interface Snapshot {
  baseImageSrc: string;
  baseWidth: number;
  baseHeight: number;
  strokes: Stroke[];
  stickers: StickerItem[];
  texts: TextItem[];
}

const COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#a855f7',
  '#ffffff',
];

interface ImageEditorModalProps {
  file: File;
  onCancel: () => void;
  onSave: (editedFile: File) => void;
}

export default function ImageEditorModal({ file, onCancel, onSave }: ImageEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);

  const [current, setCurrent] = useState<Snapshot | null>(null);
  const [undoStack, setUndoStack] = useState<Snapshot[]>([]);
  const [redoStack, setRedoStack] = useState<Snapshot[]>([]);

  const [toolMode, setToolMode] = useState<ToolMode>('draw');
  const [drawTool, setDrawTool] = useState<DrawTool>('pencil');
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(10);

  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [pendingSticker, setPendingSticker] = useState<string | null>(null);

  const [textDraft, setTextDraft] = useState<{ x: number; y: number; value: string } | null>(null);

  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const draggingStickerId = useRef<string | null>(null);
  const draggingTextId = useRef<string | null>(null);
  const [dragPreview, setDragPreview] = useState<{ id: string; x: number; y: number } | null>(null);
  const [liveStroke, setLiveStroke] = useState<Stroke | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setCurrent({
        baseImageSrc: url,
        baseWidth: img.naturalWidth,
        baseHeight: img.naturalHeight,
        strokes: [],
        stickers: [],
        texts: [],
      });
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = baseImageRef.current;
    if (!canvas || !img || !current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = current.baseWidth;
    canvas.height = current.baseHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, current.baseWidth, current.baseHeight);

    const allStrokes = liveStroke ? [...current.strokes, liveStroke] : current.strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.save();
      ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.globalAlpha = stroke.tool === 'marker' ? 0.55 : 1;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (const point of stroke.points.slice(1)) ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.restore();
    }

    for (const sticker of current.stickers) {
      const pos = dragPreview?.id === sticker.id ? dragPreview : sticker;
      ctx.save();
      ctx.font = `${sticker.fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sticker.emoji, pos.x, pos.y);
      ctx.restore();
    }

    for (const text of current.texts) {
      const pos = dragPreview?.id === text.id ? dragPreview : text;
      ctx.save();
      ctx.font = `${text.fontSize}px sans-serif`;
      ctx.fillStyle = text.color;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      text.text
        .split('\n')
        .forEach((line, i) => ctx.fillText(line, pos.x, pos.y + i * text.fontSize * 1.2));
      ctx.restore();
    }
  }, [current, liveStroke, dragPreview]);

  useEffect(() => {
    const baseImageSrc = current?.baseImageSrc;
    if (!baseImageSrc) return;
    const img = new Image();
    img.onload = () => {
      baseImageRef.current = img;
      redraw();
    };
    img.src = baseImageSrc;
  }, [current?.baseImageSrc, redraw]);

  useLayoutEffect(() => {
    redraw();
  }, [redraw]);

  const commit = (next: Snapshot) => {
    if (current) setUndoStack((prev) => [...prev, current]);
    setRedoStack([]);
    setCurrent(next);
  };

  const undo = useCallback(() => {
    setUndoStack((prevUndo) => {
      if (prevUndo.length === 0) return prevUndo;
      const last = prevUndo[prevUndo.length - 1];
      setCurrent((curr) => {
        if (curr) setRedoStack((r) => [...r, curr]);
        return last;
      });
      return prevUndo.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prevRedo) => {
      if (prevRedo.length === 0) return prevRedo;
      const last = prevRedo[prevRedo.length - 1];
      setCurrent((curr) => {
        if (curr) setUndoStack((u) => [...u, curr]);
        return last;
      });
      return prevRedo.slice(0, -1);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;
      if (e.key.toLowerCase() === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if (e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const getImagePoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const getDisplayScale = () => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return canvas.width / rect.width;
  };

  const findStickerAt = (point: Point) =>
    current?.stickers.find((s) => Math.hypot(s.x - point.x, s.y - point.y) < s.fontSize * 0.7);

  const findTextAt = (point: Point) =>
    current?.texts.find(
      (t) =>
        point.x >= t.x - 4 &&
        point.x <= t.x + t.fontSize * 8 &&
        point.y >= t.y - 4 &&
        point.y <= t.y + t.fontSize * 1.4,
    );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!current) return;
    const point = getImagePoint(e);

    if (toolMode === 'draw') {
      isDrawingRef.current = true;
      const stroke: Stroke = {
        id: crypto.randomUUID(),
        tool: drawTool,
        color,
        size: size * getDisplayScale(),
        points: [point],
      };
      currentStrokeRef.current = stroke;
      setLiveStroke(stroke);
      return;
    }

    if (toolMode === 'sticker') {
      const hit = findStickerAt(point);
      if (hit) {
        draggingStickerId.current = hit.id;
      } else if (pendingSticker) {
        commit({
          ...current,
          stickers: [
            ...current.stickers,
            {
              id: crypto.randomUUID(),
              emoji: pendingSticker,
              x: point.x,
              y: point.y,
              fontSize: size * 4 * getDisplayScale(),
            },
          ],
        });
        setPendingSticker(null);
      }
      return;
    }

    if (toolMode === 'text') {
      const hit = findTextAt(point);
      if (hit) {
        draggingTextId.current = hit.id;
      } else {
        setTextDraft({ x: point.x, y: point.y, value: '' });
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!current) return;

    if (isDrawingRef.current && currentStrokeRef.current) {
      const point = getImagePoint(e);
      currentStrokeRef.current = {
        ...currentStrokeRef.current,
        points: [...currentStrokeRef.current.points, point],
      };
      setLiveStroke(currentStrokeRef.current);
      return;
    }

    if (draggingStickerId.current) {
      const point = getImagePoint(e);
      setDragPreview({ id: draggingStickerId.current, x: point.x, y: point.y });
      return;
    }

    if (draggingTextId.current) {
      const point = getImagePoint(e);
      setDragPreview({ id: draggingTextId.current, x: point.x, y: point.y });
    }
  };

  const handlePointerUp = () => {
    if (!current) return;

    if (isDrawingRef.current && currentStrokeRef.current) {
      isDrawingRef.current = false;
      const stroke = currentStrokeRef.current;
      currentStrokeRef.current = null;
      setLiveStroke(null);
      if (stroke.points.length > 1) commit({ ...current, strokes: [...current.strokes, stroke] });
      return;
    }

    if (draggingStickerId.current && dragPreview) {
      const id = draggingStickerId.current;
      commit({
        ...current,
        stickers: current.stickers.map((s) =>
          s.id === id ? { ...s, x: dragPreview.x, y: dragPreview.y } : s,
        ),
      });
      draggingStickerId.current = null;
      setDragPreview(null);
      return;
    }

    if (draggingTextId.current && dragPreview) {
      const id = draggingTextId.current;
      commit({
        ...current,
        texts: current.texts.map((t) =>
          t.id === id ? { ...t, x: dragPreview.x, y: dragPreview.y } : t,
        ),
      });
      draggingTextId.current = null;
      setDragPreview(null);
    }
  };

  const applyBaseTransform = (
    transform: (ctx: CanvasRenderingContext2D, newW: number, newH: number) => void,
    newW: number,
    newH: number,
    pointTransform: (p: Point) => Point,
  ) => {
    if (!current || !baseImageRef.current) return;
    const off = document.createElement('canvas');
    off.width = newW;
    off.height = newH;
    const ctx = off.getContext('2d')!;
    transform(ctx, newW, newH);
    ctx.drawImage(baseImageRef.current, 0, 0, current.baseWidth, current.baseHeight);

    commit({
      baseImageSrc: off.toDataURL(),
      baseWidth: newW,
      baseHeight: newH,
      strokes: current.strokes.map((s) => ({ ...s, points: s.points.map(pointTransform) })),
      stickers: current.stickers.map((s) => ({ ...s, ...pointTransform(s) })),
      texts: current.texts.map((t) => ({ ...t, ...pointTransform(t) })),
    });
  };

  const handleMirror = () => {
    if (!current) return;
    applyBaseTransform(
      (ctx, w) => {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
      },
      current.baseWidth,
      current.baseHeight,
      (p) => flipPointX(p, current.baseWidth),
    );
  };

  const handleRotate = () => {
    if (!current) return;
    applyBaseTransform(
      (ctx, w) => {
        ctx.translate(w, 0);
        ctx.rotate(Math.PI / 2);
      },
      current.baseHeight,
      current.baseWidth,
      (p) => rotatePoint90(p, current.baseWidth, current.baseHeight),
    );
  };

  const commitTextDraft = () => {
    if (!textDraft || !current) {
      setTextDraft(null);
      return;
    }
    if (textDraft.value.trim()) {
      commit({
        ...current,
        texts: [
          ...current.texts,
          {
            id: crypto.randomUUID(),
            text: textDraft.value,
            x: textDraft.x,
            y: textDraft.y,
            color,
            fontSize: size * 2.4,
          },
        ],
      });
    }
    setTextDraft(null);
  };

  const handleDone = () => {
    if (textDraft) commitTextDraft();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const edited = new File([blob], file.name.replace(/\.\w+$/, '.png'), { type: 'image/png' });
      onSave(edited);
    }, 'image/png');
  };

  if (!current) {
    return (
      <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80">
        <p className="text-gray-400 text-sm">Loading image…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] flex flex-col bg-black/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full text-sm font-semibold text-gray-200 bg-white/5 hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMirror}
            title="Mirror"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <FlipHorizontal size={18} />
          </button>
          <button
            onClick={handleRotate}
            title="Rotate 90°"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCw size={18} />
          </button>
        </div>

        <button
          onClick={handleDone}
          className="px-5 py-2 rounded-full text-sm font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors"
        >
          Done
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 px-6 relative">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 touch-none"
          style={{
            maxWidth: '100%',
            maxHeight: '65vh',
            width: 'auto',
            height: 'auto',
            cursor: toolMode === 'draw' ? 'crosshair' : pendingSticker ? 'copy' : 'default',
          }}
        />

        {textDraft && (
          <TextDraftOverlay
            canvasRef={canvasRef}
            draft={textDraft}
            color={color}
            fontSize={size * 2.4}
            onChange={(value) => setTextDraft((prev) => (prev ? { ...prev, value } : prev))}
            onCommit={commitTextDraft}
          />
        )}
      </div>

      <div className="flex-shrink-0 bg-[#141416]/95 backdrop-blur-2xl border-t border-white/10">
        {toolMode === 'draw' && (
          <div className="flex items-center gap-3 px-6 pt-4">
            <button
              onClick={undo}
              disabled={undoStack.length === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={redo}
              disabled={redoStack.length === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Redo2 size={18} />
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {(
              [
                { key: 'pencil', icon: Pencil, label: 'Pencil' },
                { key: 'marker', icon: Highlighter, label: 'Marker' },
                { key: 'eraser', icon: Eraser, label: 'Eraser' },
              ] as { key: DrawTool; icon: typeof Pencil; label: string }[]
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setDrawTool(key)}
                title={label}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  drawTool === key
                    ? 'bg-white/15 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
              </button>
            ))}

            <input
              type="range"
              min={2}
              max={40}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 mx-2 accent-blue-500"
            />

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                />
              ))}
              <label
                title="Custom color"
                className="relative w-6 h-6 rounded-full border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden bg-white/5 hover:scale-110 transition-transform"
              >
                <Pipette size={12} className="text-gray-300 pointer-events-none" />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {toolMode === 'sticker' && (
          <div className="flex items-center justify-between px-6 pt-4">
            <p className="text-xs text-gray-500">
              {pendingSticker
                ? 'Click on the image to place it'
                : 'Pick an emoji, then click on the image'}
            </p>
            <div className="relative">
              <button
                onClick={() => setEmojiPickerOpen((v) => !v)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                Choose emoji
              </button>
              {isEmojiPickerOpen && (
                <div className="absolute bottom-full right-0 mb-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl bg-white/[0.05] rounded-2xl overflow-hidden border border-white/10 animate-fadeIn">
                  <Suspense
                    fallback={
                      <div className="w-[300px] h-[350px] flex items-center justify-center text-gray-500 text-sm">
                        Loading…
                      </div>
                    }
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setPendingSticker(emojiData.emoji);
                        setEmojiPickerOpen(false);
                      }}
                      theme={'dark' as Theme}
                      emojiStyle={'apple' as EmojiStyle}
                      lazyLoadEmojis
                      previewConfig={{ showPreview: false }}
                      height={350}
                      width={300}
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        )}

        {toolMode === 'text' && (
          <div className="flex items-center gap-4 px-6 pt-4">
            <p className="text-xs text-gray-500 flex-shrink-0">Click on the image to add text</p>
            <input
              type="range"
              min={10}
              max={40}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 px-6 py-4">
          {(
            [
              { key: 'draw', icon: Pencil, label: 'Draw' },
              { key: 'sticker', icon: Smile, label: 'Sticker' },
              { key: 'text', icon: Type, label: 'Text' },
            ] as { key: ToolMode; icon: typeof Pencil; label: string }[]
          ).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setToolMode(key)}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl text-xs font-medium transition-colors ${
                toolMode === key ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextDraftOverlay({
  canvasRef,
  draft,
  color,
  fontSize,
  onChange,
  onCommit,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  draft: { x: number; y: number; value: string };
  color: string;
  fontSize: number;
  onChange: (value: string) => void;
  onCommit: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [screenPos, setScreenPos] = useState({ left: 0, top: 0, scale: 1 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const parentRect = canvas.parentElement!.getBoundingClientRect();
    const scale = canvasRect.width / canvas.width;
    setScreenPos({
      left: canvasRect.left - parentRect.left + draft.x * scale,
      top: canvasRect.top - parentRect.top + draft.y * scale,
      scale,
    });
  }, [canvasRef, draft.x, draft.y]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={draft.value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onCommit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onCommit();
        }
      }}
      style={{
        position: 'absolute',
        left: screenPos.left,
        top: screenPos.top,
        color,
        fontSize: fontSize * screenPos.scale,
        minWidth: 40,
      }}
      className="bg-transparent border border-dashed border-white/40 rounded px-1 outline-none resize-none leading-tight"
      rows={1}
    />
  );
}
