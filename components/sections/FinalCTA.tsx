"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { finalCta } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";

/** Stops for a one-directional wash through the studio's palette, ordered
 *  lightest to darkest so the pan never doubles back on a hue it already
 *  showed, then returning to the start colour so the loop has no seam.
 *  Deliberately no near-white stop — a pale-pink anchor keeps the card from
 *  ever flashing a harsh white band. */
const STOPS: { pos: number; varName: string }[] = [
  { pos: 0, varName: "--color-ember-2" },
  { pos: 1 / 5, varName: "--color-ember" },
  { pos: 2 / 5, varName: "--color-coral" },
  { pos: 3 / 5, varName: "--color-magenta" },
  { pos: 4 / 5, varName: "--color-violet" },
  { pos: 1, varName: "--color-ember-2" },
];
// Diagonal wash: mostly left-to-right with a downward lean, so the bands
// read as travelling diagonally rather than in flat vertical stripes.
const ANGLE_DEG = 125;
const ANGLE_RAD = (ANGLE_DEG * Math.PI) / 180;
const SIN_A = Math.sin(ANGLE_RAD);
// Length, in px, of one full trip through the palette along the gradient's
// own axis. This has to be a *repeating* gradient with an explicit period —
// a plain 0–100% angled gradient tiled as a background image always shows a
// seam at the tile edge, because for any angle other than a multiple of
// 90°, no tile size makes the right edge's colours line up with the left
// edge's (the mismatch is a fixed fraction of the angle, not something a
// bigger or smaller tile can fix). A repeating gradient sidesteps that
// entirely: its pattern is periodic along its own axis, so as long as the
// tile size below is chosen to equal a whole number of periods, the
// tile-repeat boundary can never land on a colour jump.
const PERIOD = 1800;
// Tile width along the pan axis: exactly one period's worth of horizontal
// travel, so background-repeat's tile boundary coincides with the
// gradient's own repeat and never shows a line.
const BG_SIZE = PERIOD / Math.abs(SIN_A);
const LINEAR_GRADIENT = `repeating-linear-gradient(${ANGLE_DEG}deg, ${STOPS.map((s) => `var(${s.varName}) ${s.pos * PERIOD}px`).join(", ")})`;
const DURATION_MS = 10000;

const TAB_WIDTH = 56;

export function FinalCTA() {
  const [open, setOpen] = useState(false);
  const [bumpHovered, setBumpHovered] = useState(false);
  const reduce = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef(0);
  const cardHeightRef = useRef(0);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      cardWidthRef.current = el.offsetWidth;
      cardHeightRef.current = el.offsetHeight;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const progress = useMotionValue(0);
  const cardBgX = useTransform(progress, (p) => `${-p * BG_SIZE}px`);
  // The bump is painted with the *exact same* background image and tile
  // size as the card — just offset — so it's effectively an unclipped
  // continuation of the card's own gradient rather than a JS approximation
  // of it. That guarantees a pixel-perfect match by construction: the
  // browser draws both from the same source, we just shift where each one
  // starts reading from it. X is offset by the bump's own distance from
  // the card's left edge (it's centred under the card); Y is offset by the
  // card's height, so the bump picks up right where the card's bottom
  // edge left off.
  const bumpBgX = useTransform(progress, (p) => {
    const offsetFromCardLeft = cardWidthRef.current / 2 - TAB_WIDTH / 2;
    return `${-p * BG_SIZE - offsetFromCardLeft}px`;
  });
  const bumpBgY = useTransform(progress, () => `${-cardHeightRef.current}px`);

  useAnimationFrame((t) => {
    if (reduce) return;
    progress.set((t % DURATION_MS) / DURATION_MS);
  });

  return (
    <Section id="contact" className="relative !pt-8 sm:!pt-10 lg:!pt-14">
      <Reveal>
        <div className="relative">
          <motion.div
            ref={cardRef}
            className="relative overflow-hidden rounded-[36px] px-6 pb-20 pt-16 text-center sm:px-14 sm:pb-24 sm:pt-20"
            style={{
              backgroundImage: LINEAR_GRADIENT,
              backgroundSize: `${BG_SIZE}px ${BG_SIZE}px`,
              backgroundPositionX: cardBgX,
            }}
          >
            <MonoLabel className="justify-center !text-ink/55" dot>
              {finalCta.label}
            </MonoLabel>

            <h2
              className="display mx-auto mt-6 max-w-[18ch] text-[clamp(2.2rem,5.4vw,3.8rem)] text-white"
              style={{ fontWeight: 600 }}
            >
              {finalCta.heading}
            </h2>

            <p className="mx-auto mt-6 max-w-[50ch] text-lg text-ink/65">{finalCta.body}</p>

            <p className="mono-label mt-9 !text-ink/50">{finalCta.note}</p>

            <motion.p
              className="absolute inset-x-0 bottom-3 font-bold text-white sm:bottom-4"
              initial={false}
              animate={{ opacity: bumpHovered ? 1 : 0, y: bumpHovered ? 0 : 6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Start a project
            </motion.p>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            onMouseEnter={() => setBumpHovered(true)}
            onMouseLeave={() => setBumpHovered(false)}
            onFocus={() => setBumpHovered(true)}
            onBlur={() => setBumpHovered(false)}
            aria-expanded={open}
            aria-label={open ? "Hide the contact form" : "Show the contact form"}
            className="absolute left-1/2 top-full z-10 flex h-10 -translate-x-1/2 items-start justify-center rounded-b-[26px] pt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            style={{
              width: TAB_WIDTH,
              backgroundImage: LINEAR_GRADIENT,
              backgroundSize: `${BG_SIZE}px ${BG_SIZE}px`,
              backgroundPositionX: bumpBgX,
              backgroundPositionY: bumpBgY,
              boxShadow: "0 12px 18px -12px rgba(26,22,20,0.35)",
            }}
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M3 6l5 5 5-5"
                stroke="#fff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </div>
      </Reveal>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="contact-form-panel"
            key="contact-form-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-16">
              <ContactForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
