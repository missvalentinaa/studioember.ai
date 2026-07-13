"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { waysToWork } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { PromptBar } from "@/components/ui/PromptBar";

type Plan = (typeof waysToWork.plans)[number];

const GLOW_GRADIENT =
  "linear-gradient(120deg, #9640a8 0%, #cb72b8 25%, #f9a074 50%, #f4c0c7 75%, #9640a8 100%)";

// Scroll-progress bands (0 → 1 across the whole pinned track).
const ZOOM_END = 0.03;
const PAUSE_END = 0.14;
const FADE_END = 0.19;
const BAR_END = 0.23;
const TYPE1_START = BAR_END;
const TYPE1_END = 0.33;
const HOLD1_END = 0.5;
const ERASE1_END = 0.56;
const BLINK_END = 0.62;
const TYPE2_START = BLINK_END;
const TYPE2_END = 0.74;
const POP1_END = 0.42;
const POP2_END = 0.9;

const check = (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CardMotion = {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
  pointerEvents: MotionValue<"auto" | "none">;
};

/** A plan's content on a restrained light glass surface — colour lives in a
 *  soft blurred glow behind the card (same recipe as the AI-demo card),
 *  only bleeding faintly through the glass itself, scroll-scrubbed as it
 *  pops into place. */
function PopCard({ plan, m }: { plan: Plan; m: CardMotion }) {
  return (
    <motion.div
      style={{ scale: m.scale, opacity: m.opacity, pointerEvents: m.pointerEvents }}
      className="relative origin-top-left"
    >
      <div
        aria-hidden="true"
        className="animate-gradient-flow pointer-events-none absolute -inset-3 rounded-[32px] opacity-60 blur-2xl sm:-inset-5"
        style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%" }}
      />
      <div
        aria-hidden="true"
        className="animate-gradient-flow pointer-events-none absolute -inset-1 rounded-[28px] opacity-70"
        style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%", animationDuration: "22s" }}
      />

      <div className="relative h-full min-h-[340px] overflow-hidden rounded-[26px] border border-hairline bg-surface/80 shadow-[0_40px_80px_-40px_rgba(26,22,20,0.35)] backdrop-blur-sm sm:min-h-[440px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
        />

        <motion.div
          style={{ opacity: m.contentOpacity, y: m.contentY }}
          className="relative flex h-full flex-col p-3.5 text-ink sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
            <MonoLabel className="text-[0.58rem] sm:text-[0.72rem]" dot={false}>
              {plan.name}
            </MonoLabel>
            {plan.featured && (
              <span className="rounded-full border border-hairline-2 bg-surface-2 px-2 py-0.5 text-[0.58rem] font-medium text-ink sm:px-3 sm:py-1 sm:text-[0.68rem]">
                Most chosen
              </span>
            )}
          </div>

          <h3 className="display-light mt-2 text-[0.95rem] leading-tight sm:mt-4 sm:text-[1.6rem]">
            {plan.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-snug text-ink-soft sm:mt-3 sm:line-clamp-none sm:text-base">
            {plan.body}
          </p>

          <ul className="mt-2.5 space-y-1 border-t border-hairline pt-2.5 sm:mt-5 sm:space-y-2 sm:pt-5">
            {plan.includes.slice(0, 4).map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-[0.62rem] text-ink sm:gap-2.5 sm:text-[0.9rem]"
              >
                <span
                  className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-white sm:h-[18px] sm:w-[18px]"
                  style={{ background: "var(--ember-gradient)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="sm:h-[13px] sm:w-[13px]">
                    <path
                      d="M3 8.5l3.2 3.2L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-2.5 sm:pt-5">
            <div className="border-t border-hairline pt-2.5 sm:pt-5">
              <p
                className="mono-label truncate text-[0.52rem] sm:text-[0.65rem]"
                style={{ letterSpacing: "0.1em" }}
              >
                {plan.meta}
              </p>
              <p className="mt-1 text-[0.95rem] font-semibold tracking-tight text-ink sm:mt-2 sm:text-[1.5rem]">
                {plan.price}
              </p>
              <div className="mt-2 sm:mt-4">
                <PillButton
                  href="#contact"
                  variant={plan.featured ? "primary" : "ghost"}
                  arrow
                  className="w-full py-1.5 text-[0.68rem] sm:py-2.5 sm:text-[0.88rem]"
                >
                  {plan.cta}
                </PillButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function useCardMotion(
  progress: MotionValue<number>,
  popEnd: number,
  popStart: number,
): CardMotion {
  const scale = useTransform(progress, [popStart, popEnd], [0.18, 1], { clamp: true });
  const opacity = useTransform(progress, [popStart, popEnd], [0, 1], { clamp: true });
  const contentOpacity = useTransform(progress, [popStart + 0.02, popEnd + 0.02], [0, 1], {
    clamp: true,
  });
  const contentY = useTransform(progress, [popStart + 0.02, popEnd + 0.02], [12, 0], {
    clamp: true,
  });
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  return { scale, opacity, contentOpacity, contentY, pointerEvents };
}

function ScrollSequence({ launchSprint, continuum }: { launchSprint: Plan; continuum: Plan }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Heading zooms in, pauses centered, then docks up toward the top of the
  // frame and stays put — it never fades out, so once the prompt pill and
  // cards animate in beneath it, everything is visible together. The eyebrow
  // above it fades out over the same docking window so it — and the search
  // pill's blurred glow rising from beneath — never overlap the heading.
  const headingOpacity = useTransform(progress, [0, ZOOM_END], [0, 1], { clamp: true });
  const headingScale = useTransform(
    progress,
    [0, ZOOM_END, PAUSE_END, FADE_END],
    [0.86, 1.08, 1.08, 0.7],
    { clamp: true },
  );
  const headingY = useTransform(progress, [PAUSE_END, FADE_END], ["0vh", "-36vh"], {
    clamp: true,
  });
  const eyebrowOpacity = useTransform(progress, [PAUSE_END, FADE_END], [1, 0], { clamp: true });
  const headingPointerEvents = useTransform(headingScale, (s) => (s > 0.9 ? "auto" : "none"));

  const sceneOpacity = useTransform(progress, [FADE_END, BAR_END], [0, 1], { clamp: true });
  const sceneY = useTransform(progress, [FADE_END, BAR_END], ["5vh", "0vh"], { clamp: true });
  const scenePointerEvents = useTransform(sceneOpacity, (o) => (o > 0.5 ? "auto" : "none"));

  const barTextMV = useTransform(progress, (p: number) => {
    if (p < TYPE1_START) return "";
    if (p < TYPE1_END) {
      const t = (p - TYPE1_START) / (TYPE1_END - TYPE1_START);
      return launchSprint.prompt.slice(0, Math.round(t * launchSprint.prompt.length));
    }
    if (p < HOLD1_END) return launchSprint.prompt;
    if (p < ERASE1_END) {
      const t = (p - HOLD1_END) / (ERASE1_END - HOLD1_END);
      return launchSprint.prompt.slice(0, Math.round((1 - t) * launchSprint.prompt.length));
    }
    if (p < TYPE2_START) return "";
    if (p < TYPE2_END) {
      const t = (p - TYPE2_START) / (TYPE2_END - TYPE2_START);
      return continuum.prompt.slice(0, Math.round(t * continuum.prompt.length));
    }
    return continuum.prompt;
  });

  const cursorOnMV = useTransform(progress, (p: number) => {
    if (p < ERASE1_END) return 1;
    if (p < BLINK_END) {
      const t = (p - ERASE1_END) / (BLINK_END - ERASE1_END);
      const seg = Math.floor(t * 4);
      return seg % 2 === 0 ? 0 : 1;
    }
    return 1;
  });

  const [barText, setBarText] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  useMotionValueEvent(barTextMV, "change", (latest) => setBarText(latest));
  useMotionValueEvent(cursorOnMV, "change", (latest) => setCursorOn(latest === 1));

  const card1 = useCardMotion(progress, POP1_END, TYPE1_END + 0.01);
  const card2 = useCardMotion(progress, POP2_END, TYPE2_END + 0.04);

  return (
    <section ref={trackRef} className="relative h-[640vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-5">
        <motion.div
          style={{
            opacity: headingOpacity,
            scale: headingScale,
            y: headingY,
            pointerEvents: headingPointerEvents,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-5 text-center"
        >
          <motion.div style={{ opacity: eyebrowOpacity }}>
            <MonoLabel>{waysToWork.label}</MonoLabel>
          </motion.div>
          <h2 className="display text-[clamp(2rem,5.2vw,3.6rem)] max-w-[20ch]">
            {waysToWork.heading}
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: sceneOpacity, y: sceneY, pointerEvents: scenePointerEvents }}
          className="absolute inset-0 flex flex-col items-center justify-end gap-3 px-5 pb-[1vh] sm:gap-6 sm:pb-[2vh]"
        >
          <div className="w-full scale-[0.82]">
            <PromptBar text={barText} cursorOn={cursorOn} />
          </div>
          {/* Always 2 columns, even on mobile — this pinned frame has a
           *  fixed, overflow-hidden height, so stacking to 1 column would
           *  push the second card's price/CTA permanently out of view
           *  with no way to scroll to it. */}
          <div className="grid w-full max-w-4xl grid-cols-2 gap-2.5 sm:gap-5">
            <PopCard plan={launchSprint} m={card1} />
            <PopCard plan={continuum} m={card2} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StaticFallback({ launchSprint, continuum }: { launchSprint: Plan; continuum: Plan }) {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <MonoLabel>{waysToWork.label}</MonoLabel>
        <h2 className="display text-[clamp(2rem,5.2vw,3.6rem)] max-w-[20ch]">
          {waysToWork.heading}
        </h2>
      </div>
      <div className="mt-16 grid w-full max-w-4xl gap-5 sm:grid-cols-2">
        {[launchSprint, continuum].map((plan) => (
          <div key={plan.name} className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[32px] opacity-60 blur-2xl sm:-inset-5"
              style={{ backgroundImage: GLOW_GRADIENT }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1 rounded-[28px] opacity-70"
              style={{ backgroundImage: GLOW_GRADIENT }}
            />
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-[26px] border border-hairline bg-surface/80 shadow-[0_40px_80px_-40px_rgba(26,22,20,0.35)] backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
              />
              <div className="relative flex h-full flex-col p-8 text-ink sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <MonoLabel dot={false}>{plan.name}</MonoLabel>
                  {plan.featured && (
                    <span className="rounded-full border border-hairline-2 bg-surface-2 px-3 py-1 text-[0.68rem] font-medium text-ink">
                      Most chosen
                    </span>
                  )}
                </div>
                <h3 className="display-light mt-6 text-[1.6rem] sm:text-[1.9rem]">{plan.title}</h3>
                <p className="mt-4 text-ink-soft">{plan.body}</p>
                <ul className="mt-7 space-y-3 border-t border-hairline pt-7">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.95rem] text-ink">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: "var(--ember-gradient)" }}
                      >
                        {check}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <div className="border-t border-hairline pt-7">
                    <p className="mono-label" style={{ letterSpacing: "0.14em" }}>
                      {plan.meta}
                    </p>
                    <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-ink">
                      {plan.price}
                    </p>
                    <div className="mt-5">
                      <PillButton
                        href="#contact"
                        variant={plan.featured ? "primary" : "ghost"}
                        arrow
                        className="w-full py-3"
                      >
                        {plan.cta}
                      </PillButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WaysToWork() {
  const [launchSprint, continuum] = waysToWork.plans;
  const reduce = useReducedMotion();

  return (
    <>
      {reduce ? (
        <Section className="relative">
          <StaticFallback launchSprint={launchSprint} continuum={continuum} />
        </Section>
      ) : (
        <ScrollSequence launchSprint={launchSprint} continuum={continuum} />
      )}

      <Section
        className={
          reduce
            ? "pt-0 pb-16 sm:pb-20 lg:pb-24"
            : "relative pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24"
        }
      >
        <Reveal delay={0.1}>
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[22px] border border-hairline bg-surface/60 px-6 py-5 backdrop-blur-sm sm:flex-row sm:text-left">
            <div className="text-center sm:text-left">
              <p className="font-medium tracking-tight text-ink">{waysToWork.fallback.title}</p>
              <p className="mt-1 max-w-[46ch] text-[0.92rem] text-ink-soft">
                {waysToWork.fallback.body}
              </p>
            </div>
            <PillButton href={waysToWork.fallback.href} variant="ghost-glow" arrow className="shrink-0">
              {waysToWork.fallback.cta}
            </PillButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
