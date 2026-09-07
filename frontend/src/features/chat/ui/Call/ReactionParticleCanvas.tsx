import React, { useEffect, useRef } from 'react';
import { ReactionParticleEngine } from '../../lib/webrtc/reactionParticleEngine';
import { useCallStore } from '../../model/callStore';
import { initOffscreenParticleBridge } from '../../lib/webrtc/offscreenParticleWorkerBridge';

interface ReactionParticleCanvasProps {
  engine: ReactionParticleEngine;
}

export function ReactionParticleCanvas({ engine }: ReactionParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const isTravelerModeEnabled = useCallStore((s) => s.isTravelerModeEnabled);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    // Initialize Offscreen Worker Bridge
    const bridge = initOffscreenParticleBridge(
      canvas,
      engine,
      rect.width || 800,
      rect.height || 600,
      dpr,
    );

    bridge.setTravelerMode(isTravelerModeEnabled);

    // If running in Offscreen Web Worker, the worker manages 100% of rendering loop
    if (bridge.isOffscreen) {
      engine.onSpawn = (emoji, w, h, ratio) => {
        bridge.spawn(emoji, w, h, ratio !== undefined ? ratio * w : undefined);
      };

      const handleResize = () => {
        const r = canvas.getBoundingClientRect();
        const currentDpr = window.devicePixelRatio || 1;
        bridge.resize(r.width, r.height, currentDpr);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        engine.onSpawn = undefined;
        window.removeEventListener('resize', handleResize);
        bridge.destroy();
      };
    }

    // Fallback: In-thread RAF rendering loop if OffscreenCanvas is unavailable
    let isRunning = true;

    const resizeCanvas = () => {
      const r = canvas.getBoundingClientRect();
      const currentDpr = window.devicePixelRatio || 1;
      canvas.width = r.width * currentDpr;
      canvas.height = r.height * currentDpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(currentDpr, currentDpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const targetIntervalMs = isTravelerModeEnabled ? 66 : 16;
    let lastRenderTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isRunning) return;

      const elapsed = currentTime - lastRenderTime;

      if (elapsed >= targetIntervalMs) {
        lastRenderTime = currentTime;
        const dtSeconds = Math.min(0.1, (currentTime - lastTimeRef.current) / 1000);
        lastTimeRef.current = currentTime;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const r = canvas.getBoundingClientRect();
          ctx.clearRect(0, 0, r.width, r.height);

          const hasActiveParticles = engine.update(dtSeconds);
          if (hasActiveParticles) {
            engine.render(ctx);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      bridge.destroy();
    };
  }, [engine, isTravelerModeEnabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 w-full h-full"
    />
  );
}
