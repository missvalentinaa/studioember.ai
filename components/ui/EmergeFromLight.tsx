"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Reveals its child as it scrolls into view: a gentle scale-down, fade and
 * de-blur so the section appears to grow out of the hero's warm bloom rather
 * than simply scrolling up below it. Passthrough under reduced motion.
 */
export function EmergeFromLight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 40%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0.15, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.8], [9, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  if (reduce) return <>{children}</>;

  return (
    <div ref={ref}>
      <motion.div style={{ scale, opacity, filter, transformOrigin: "50% 28%" }}>
        {children}
      </motion.div>
    </div>
  );
}
