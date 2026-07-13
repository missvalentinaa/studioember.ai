"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hero } from "@/lib/content";
import { HeroFrames, FRAME_COUNT } from "@/components/ui/HeroFrames";
import { PillButton } from "@/components/ui/PillButton";
import { MonoLabel } from "@/components/ui/MonoLabel";

/** Warm feather that fades the clip's edges into the paper canvas. */
const FRAME_FEATHER =
  "radial-gradient(135% 120% at 50% 40%, transparent 42%, rgba(251,249,246,0.55) 72%, var(--color-canvas) 100%)";

/** The heading markup — shared between the scroll and reduced-motion paths.
 *  Keeps the CSS `.reveal-line` mount entrance (JS mount-animate is broken by
 *  Strict Mode double-mount — see project memory). */
function HeadingLines() {
  return (
    <h1 className="display max-w-[16ch] text-[clamp(2.9rem,9vw,6.6rem)]">
      <span className="block overflow-hidden pb-[0.08em]">
        <span className="reveal-line block" style={{ animationDelay: "0.32s" }}>
          Look <span className="ember-text">funded.</span>
        </span>
      </span>
      <span className="block overflow-hidden pb-[0.08em]">
        <span className="reveal-line block" style={{ animationDelay: "0.46s" }}>
          Operate like it too.
        </span>
      </span>
    </h1>
  );
}

export function ScrollHero() {
  const reduce = useReducedMotion();

  if (reduce) return <StaticHero />;
  return <ScrollHeroMotion />;
}

/* ------------------------------------------------------------------ *
 *  Full scroll-driven experience
 * ------------------------------------------------------------------ */
function ScrollHeroMotion() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Frame scrub (continuous 0 → last frame) across the rise.
  const frame = useTransform(p, [0.03, 0.78], [0, FRAME_COUNT - 1], { clamp: true });

  // Supporting content clears early so the heading stands alone for the climax.
  const eyebrowOpacity = useTransform(p, [0.02, 0.16], [1, 0]);
  const supportOpacity = useTransform(p, [0.04, 0.24], [1, 0]);
  const supportY = useTransform(p, [0.04, 0.24], [0, 34]);
  const hintOpacity = useTransform(p, [0.0, 0.12], [1, 0]);

  // Heading reaction at near-contact, then dissolve into the light.
  const headingY = useTransform(p, [0.04, 0.6], [0, -10]);
  const headingScale = useTransform(p, [0.6, 0.82], [1, 1.025]);
  const headingGlow = useTransform(p, [0.5, 0.82], [0, 1]);
  const headingOpacity = useTransform(p, [0.85, 0.97], [1, 0]);

  // Frames dissolve as the bloom takes over.
  const framesOpacity = useTransform(p, [0.86, 0.98], [1, 0]);
  const framesScale = useTransform(p, [0.7, 1], [1, 1.06]);

  // Bloom: seeded at the fingertip/heading point, expands + brightens to warm-white.
  const bloomScale = useTransform(p, [0.72, 1], [0.35, 7]);
  const bloomOpacity = useTransform(p, [0.66, 0.9, 1], [0, 1, 1]);
  const veilOpacity = useTransform(p, [0.9, 1], [0, 1]);

  return (
    <section id="top" ref={trackRef} className="relative h-[240svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5">
        {/* Hand-rising frame sequence */}
        <motion.div
          style={{ opacity: framesOpacity, scale: framesScale }}
          className="pointer-events-none absolute inset-0"
        >
          <HeroFrames frame={frame} />
          {/* feather the clip edges into the paper canvas */}
          <div
            className="absolute inset-0"
            style={{ background: FRAME_FEATHER }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Expanding warm bloom */}
        <motion.div
          style={{ scale: bloomScale, opacity: bloomOpacity }}
          className="pointer-events-none absolute left-1/2 top-[40%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,252,247,1) 0%, rgba(255,244,228,0.96) 20%, rgba(255,180,120,0.55) 42%, rgba(229,72,77,0.32) 60%, rgba(124,92,255,0.14) 78%, rgba(124,92,255,0) 100%)",
            }}
          />
        </motion.div>

        {/* Final warm wash → clean handoff to the next section (== canvas colour) */}
        <motion.div
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-canvas"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div style={{ opacity: eyebrowOpacity }} className="mb-8">
            <div className="reveal-rise inline-flex rounded-full border border-hairline bg-surface/60 px-4 py-1.5 backdrop-blur-sm">
              <MonoLabel>{hero.eyebrow}</MonoLabel>
            </div>
          </motion.div>

          <motion.div
            style={{ y: headingY, scale: headingScale, opacity: headingOpacity }}
            className="relative"
          >
            {/* warm glow that blooms behind the words at near-contact */}
            <motion.div
              style={{ opacity: headingGlow }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,249,240,0.9) 0%, rgba(255,232,205,0.5) 38%, rgba(255,232,205,0) 70%)",
                  filter: "blur(24px)",
                }}
              />
            </motion.div>
            <div className="relative">
              <HeadingLines />
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: supportOpacity, y: supportY }}
            className="flex flex-col items-center"
          >
            <p className="reveal-rise mt-8 max-w-[54ch] text-balance text-lg text-ink-soft sm:text-xl">
              {hero.body}
            </p>
            <div className="reveal-rise mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <PillButton href={hero.primary.href} arrow className="px-7 py-3.5 text-base">
                {hero.primary.label}
              </PillButton>
              <PillButton
                href={hero.secondary.href}
                variant="ghost"
                className="px-7 py-3.5 text-base"
              >
                {hero.secondary.label}
              </PillButton>
            </div>
            <div className="reveal-rise mt-12">
              <MonoLabel dot={false}>{hero.note}</MonoLabel>
            </div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="mono-label" style={{ fontSize: "0.62rem" }}>
            Scroll
          </span>
          <span className="h-9 w-px bg-gradient-to-b from-ink/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 *  Reduced-motion: no pin, no scrub — final frame + heading at rest
 * ------------------------------------------------------------------ */
function StaticHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={`/hero/frame-${String(FRAME_COUNT).padStart(3, "0")}.webp`}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: FRAME_FEATHER }} />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 rounded-full border border-hairline bg-surface/60 px-4 py-1.5 backdrop-blur-sm">
          <MonoLabel>{hero.eyebrow}</MonoLabel>
        </div>
        <HeadingLines />
        <p className="mt-8 max-w-[54ch] text-balance text-lg text-ink-soft sm:text-xl">
          {hero.body}
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <PillButton href={hero.primary.href} arrow className="px-7 py-3.5 text-base">
            {hero.primary.label}
          </PillButton>
          <PillButton href={hero.secondary.href} variant="ghost" className="px-7 py-3.5 text-base">
            {hero.secondary.label}
          </PillButton>
        </div>
        <div className="mt-12">
          <MonoLabel dot={false}>{hero.note}</MonoLabel>
        </div>
      </div>
    </section>
  );
}
