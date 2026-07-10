"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft ember glow that trails the cursor on desktop.
 * Disabled for touch devices and when reduced-motion is requested.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 160, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full"
    >
      <div
        className="h-full w-full rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,0.16) 0%, rgba(194,41,138,0.10) 32%, rgba(124,92,255,0.05) 55%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
}
