"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { clsx } from "@/lib/clsx";

export const FRAME_COUNT = 60;
const frameSrc = (i: number) => `/hero/frame-${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Canvas scrubber for the hero hand-rising sequence.
 *
 * Draws the scroll-mapped frame with `object-fit: cover` math and crossfades
 * the two nearest frames by the fractional part of `frame`, so 20 frames read
 * fluid. Only redraws on requestAnimationFrame when the frame value changes.
 * `frame` is a continuous MotionValue in [0, FRAME_COUNT - 1].
 */
export function HeroFrames({
  frame,
  className,
}: {
  frame: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  const rafPending = useRef(false);

  function drawCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    w: number,
    h: number,
    alpha: number,
  ) {
    const ir = img.width / img.height;
    const cr = w / h;
    let dw: number, dh: number;
    if (ir > cr) {
      dh = h;
      dw = h * ir;
    } else {
      dw = w;
      dh = w / ir;
    }
    // Center horizontally; anchor a touch below center so the arm stays rooted
    // near the bottom edge when there is vertical overflow (ultrawide viewports).
    const dx = (w - dw) / 2;
    const dy = (h - dh) * 0.5;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function nearestLoaded(i: number) {
    for (let k = i; k >= 0; k--) if (loaded.current[k]) return k;
    for (let k = i + 1; k < FRAME_COUNT; k++) if (loaded.current[k]) return k;
    return -1;
  }

  function render() {
    rafPending.current = false;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = size.current;
    if (w === 0 || h === 0) return;

    const f = Math.max(0, Math.min(FRAME_COUNT - 1, frame.get()));
    const i = Math.floor(f);
    const j = Math.min(i + 1, FRAME_COUNT - 1);
    const t = f - i;

    ctx.clearRect(0, 0, w, h);
    // Base frame: the exact frame if decoded, else the nearest already-loaded
    // earlier frame — avoids a blank flash if the scrub outruns preloading.
    const base = loaded.current[i] ? i : nearestLoaded(i);
    if (base >= 0) drawCover(ctx, images.current[base], w, h, 1);
    if (base === i && t > 0.001 && j !== i && loaded.current[j]) {
      drawCover(ctx, images.current[j], w, h, t);
    }
    ctx.globalAlpha = 1;
  }

  function scheduleRender() {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(render);
  }

  function resize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size.current = { w: rect.width, h: rect.height, dpr };
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    scheduleRender();
  }

  // Preload all frames.
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let n = 0; n < FRAME_COUNT; n++) {
      const img = new Image();
      img.decoding = "async";
      const idx = n;
      img.onload = () => {
        loaded.current[idx] = true;
        scheduleRender();
      };
      img.src = frameSrc(n);
      imgs.push(img);
    }
    images.current = imgs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Size to the element + follow resizes.
  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (canvasRef.current) ro.observe(canvasRef.current);
    window.addEventListener("orientationchange", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw when the scroll-derived frame changes.
  useMotionValueEvent(frame, "change", scheduleRender);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden="true"
      className={clsx("h-full w-full", className)}
    />
  );
}
