"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { process } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = (typeof process.steps)[number];

// Each step's line segment grows over GROW of the scroll range, then holds
// flat for PAUSE before the next segment starts — a scroll-linked "pause"
// after each step is revealed, without pinning the section.
const GROW = 0.22;
const PAUSE = 0.1;

function stepThreshold(index: number) {
  return GROW + index * (GROW + PAUSE);
}

function buildLineKeyframes(total: number) {
  const input: number[] = [0];
  const output: number[] = [0];
  let t = 0;
  for (let i = 0; i < total; i++) {
    t += GROW;
    input.push(Math.min(t, 1));
    output.push((i + 1) / total);
    if (i < total - 1) {
      t += PAUSE;
      input.push(Math.min(t, 1));
      output.push((i + 1) / total);
    }
  }
  if (input[input.length - 1] < 1) {
    input.push(1);
    output.push(1);
  }
  return { input, output };
}

/** Small white four-point sparkle, centered on a timeline orb — spins in as
 *  the line reaches it, then fades once that step is fully revealed. Sits
 *  above the gradient line in stacking order. */
function FourPointStar({ style }: { style: MotionStyle }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 z-10 m-auto h-2.5 w-2.5"
      style={style}
      aria-hidden="true"
    >
      <polygon fill="#fff" points="50,0 60.6,39.4 100,50 60.6,60.6 50,100 39.4,60.6 0,50 39.4,39.4" />
    </motion.svg>
  );
}

function TimelineRow({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
  const threshold = stepThreshold(index);

  const orbScale = useTransform(progress, [threshold - 0.1, threshold], [0.45, 1], {
    clamp: true,
  });
  const orbOpacity = useTransform(progress, [threshold - 0.1, threshold], [0.3, 1], {
    clamp: true,
  });

  const numberGradient = useTransform(progress, [threshold - 0.03, threshold + 0.05], [0, 1], {
    clamp: true,
  });
  const numberBlack = useTransform(numberGradient, (v) => 1 - v);

  const starOpacity = useTransform(
    progress,
    [threshold - 0.02, threshold, threshold + 0.06, threshold + 0.12],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const starRotate = useTransform(progress, [threshold - 0.02, threshold + 0.12], [0, 200], {
    clamp: true,
  });
  const starScale = useTransform(progress, [threshold - 0.02, threshold], [0.3, 1], {
    clamp: true,
  });

  const row = index + 1;

  return (
    <>
      <div className="col-start-1 flex justify-end" style={{ gridRow: row }}>
        <div className="relative inline-block font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-none tracking-tight">
          <motion.span style={{ opacity: numberBlack }}>{step.no}</motion.span>
          <motion.span
            className="ember-text absolute inset-0"
            style={{ opacity: numberGradient }}
            aria-hidden="true"
          >
            {step.no}
          </motion.span>
        </div>
      </div>

      <div className="relative z-10 col-start-2 flex justify-center pt-3" style={{ gridRow: row }}>
        <div className="relative h-4 w-4 flex-shrink-0">
          <motion.span
            className="absolute inset-0 rounded-full ring-4 ring-canvas"
            style={{ scale: orbScale, opacity: orbOpacity, background: "var(--ember-gradient)" }}
          />
          <FourPointStar style={{ opacity: starOpacity, rotate: starRotate, scale: starScale }} />
        </div>
      </div>

      <div className="col-start-3 pb-2 pt-2" style={{ gridRow: row }}>
        <h3 className="text-2xl font-medium tracking-tight">{step.name}</h3>
        <p className="mt-3 max-w-[38ch] text-ink-soft">{step.body}</p>
      </div>
    </>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const { input, output } = buildLineKeyframes(process.steps.length);
  const lineScale = useTransform(scrollYProgress, input, output, { clamp: true });

  return (
    <Section>
      <SectionHeading label={process.label} title={process.heading} align="center" />

      <div
        ref={trackRef}
        className="relative mx-auto mt-16 grid max-w-2xl grid-cols-[auto_16px_1fr] gap-x-4 gap-y-14 sm:mt-20 sm:gap-x-6 sm:gap-y-16"
      >
        <div
          className="col-start-2 w-[2px] justify-self-center bg-hairline"
          style={{ gridRow: `1 / ${process.steps.length + 1}` }}
        />
        <motion.div
          className="col-start-2 w-[2px] origin-top justify-self-center"
          style={{
            gridRow: `1 / ${process.steps.length + 1}`,
            scaleY: lineScale,
            background: "var(--ember-gradient)",
          }}
        />

        {process.steps.map((s, i) => (
          <TimelineRow key={s.no} step={s} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </Section>
  );
}
