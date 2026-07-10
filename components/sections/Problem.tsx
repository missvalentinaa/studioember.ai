"use client";

import { motion, type Variants } from "framer-motion";
import { problem } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EmberOrb } from "@/components/ui/EmberOrb";

const check = (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8.5l3.2 3.2L13 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Inherits hidden/visible from the parent RevealItem — pops in just after the row fades in. */
const markVariants: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export function Problem() {
  return (
    <Section className="overflow-hidden">
      <EmberOrb
        variant="ember"
        className="right-[-14%] top-[10%] h-[420px] w-[420px] opacity-20"
        blur={70}
      />

      <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <MonoLabel>{problem.label}</MonoLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.6vw,4rem)]">
              <span className="block">{problem.headingA}</span>
              <span className="block text-faint">{problem.headingB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[44ch] text-lg text-ink-soft">{problem.lead}</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-end">
          <RevealGroup className="divide-y divide-hairline border-y border-hairline">
            {problem.points.map((p) => (
              <RevealItem key={p}>
                <div className="flex items-start gap-4 py-5">
                  <motion.span
                    variants={markVariants}
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--ember-gradient)" }}
                  >
                    {check}
                  </motion.span>
                  <span className="text-[1.05rem] text-ink">{p}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-ink-soft">{problem.close}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight">
              <span className="ember-text">{problem.resolve}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
