"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollSequenceCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
  totalFrames?: number;
}

export default function ScrollSequenceCanvas({
  containerRef,
  totalFrames = 10,
}: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const isLoadedRef = useRef<boolean[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Progressive frame preloading
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    isLoadedRef.current = new Array(totalFrames).fill(false);

    // Formatted frame paths: ezgif-frame-001.png to ezgif-frame-010.png
    const framePaths = Array.from({ length: totalFrames }, (_, i) => {
      const frameNum = String(i + 1).padStart(3, "0");
      return `/frames/ezgif-frame-${frameNum}.png`;
    });

    framePaths.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        if (idx === 0) {
          setFirstFrameReady(true);
        }
      };
      img.onerror = () => {
        // Fallback check to /frames_150/ if needed
        const fallbackImg = new Image();
        fallbackImg.src = `/frames_150/ezgif-frame-${String(idx + 1).padStart(3, "0")}.png`;
        fallbackImg.onload = () => {
          imagesRef.current[idx] = fallbackImg;
          isLoadedRef.current[idx] = true;
          if (idx === 0) setFirstFrameReady(true);
        };
      };
    });

    return () => {
      imagesRef.current = [];
      isLoadedRef.current = [];
    };
  }, [totalFrames]);

  // Scroll and Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive Canvas Resize with Retina DPR
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Scroll progress handler
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetFrameRef.current = 0;
        return;
      }

      // Normalized progress: 0.0 to 1.0
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Map progress directly to frame index [0 .. totalFrames - 1]
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    // Draw frame on canvas with seamless centering and edge blend
    const drawFrame = (frameFloat: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Reset transform & scale to DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Base background: deep black with luxury ambient tone
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Determine base and next frame indices for interpolation
      const baseIdx = Math.floor(frameFloat);
      const nextIdx = Math.min(baseIdx + 1, totalFrames - 1);
      const fraction = frameFloat - baseIdx;

      // Find available images (fallback to nearest loaded image if needed)
      const getImage = (targetIdx: number) => {
        if (imagesRef.current[targetIdx] && isLoadedRef.current[targetIdx]) {
          return imagesRef.current[targetIdx];
        }
        // Fallback to closest loaded
        for (let i = 0; i < totalFrames; i++) {
          const checkIdx = (targetIdx + i) % totalFrames;
          if (imagesRef.current[checkIdx] && isLoadedRef.current[checkIdx]) {
            return imagesRef.current[checkIdx];
          }
        }
        return null;
      };

      const baseImg = getImage(baseIdx);
      if (!baseImg) return;

      // Calculate aspect ratio cover / contain
      const imgRatio = baseImg.width / baseImg.height;
      const canvasRatio = w / h;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      // Cover scaling for full-bleed cinematic feel
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      // Draw base frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(baseImg, drawX, drawY, drawW, drawH);

      // Smooth cross-dissolve to next frame for continuous 60fps filmic feel
      if (fraction > 0.005 && baseIdx !== nextIdx) {
        const nextImg = getImage(nextIdx);
        if (nextImg) {
          ctx.globalAlpha = fraction;
          ctx.drawImage(nextImg, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1.0;
        }
      }

      // Subtle luxury edge vignette to guarantee 100% seamless blending into #000000
      const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.3,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.75
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.85)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    // Persistent Animation Loop with Lerp
    let lastRenderedFrame = -1;
    const renderLoop = () => {
      // Lerp current frame towards target frame
      const ease = prefersReducedMotion ? 1 : 0.08;
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.0001) {
        currentFrameRef.current += diff * ease;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      // Clamp within bounds [0, totalFrames - 1]
      currentFrameRef.current = Math.max(
        0,
        Math.min(currentFrameRef.current, totalFrames - 1)
      );

      // Redraw whenever frame changes or during initial frames
      if (
        Math.abs(currentFrameRef.current - lastRenderedFrame) > 0.001 ||
        lastRenderedFrame === -1
      ) {
        drawFrame(currentFrameRef.current);
        lastRenderedFrame = currentFrameRef.current;
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [containerRef, totalFrames, firstFrameReady]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ background: "#000000" }}
      />
    </div>
  );
}
