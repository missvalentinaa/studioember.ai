"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "ghost" | "dark" | "ghost-glow" | "outline-light";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium tracking-tight transition-colors duration-200 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2";

const styles: Record<Variant, string> = {
  primary: "text-white shadow-[0_8px_30px_-8px_rgba(255,107,53,0.6)]",
  ghost:
    "border border-hairline-2 bg-surface/60 text-ink backdrop-blur-sm hover:border-ink/25 hover:bg-surface",
  dark: "bg-ink text-canvas hover:bg-ink-soft",
  /** Ghost that lights up with the animated ember gradient on hover — for a
   *  single quiet CTA that should still invite a click. */
  "ghost-glow":
    "border border-hairline-2 bg-surface/60 text-ink backdrop-blur-sm transition-colors duration-500 hover:border-transparent hover:text-white",
  /** Bordered pill tuned for sitting directly on a colourful/gradient
   *  surface — near-transparent fill so the gradient shows through. */
  "outline-light":
    "border border-ink/20 bg-white/15 text-ink backdrop-blur-sm hover:border-ink/35 hover:bg-white/30",
};

type PillButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

/** Magnetic pill button. Primary variant carries the ember gradient. */
export function PillButton({
  children,
  href,
  variant = "primary",
  className,
  arrow = false,
  onClick,
  type = "button",
}: PillButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18 });
  const y = useSpring(my, { stiffness: 260, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--ember-gradient)" }}
        />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-200 group-hover:bg-white/10" />
      )}
      {variant === "ghost-glow" && (
        <span
          aria-hidden="true"
          className="animate-gradient-flow absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--ember-gradient)" }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </>
  );

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x, y },
    className: clsx(base, styles[variant], className),
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} onClick={onClick} {...sharedProps}>
      {inner}
    </motion.button>
  );
}
