"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { process } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Step = (typeof process.steps)[number];

function TimelineNode({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const threshold = (index + 0.65) / total;
  const scale = useTransform(progress, [threshold - 0.16, threshold], [0.45, 1], {
    clamp: true,
  });
  const opacity = useTransform(progress, [threshold - 0.16, threshold], [0.3, 1], {
    clamp: true,
  });

  return (
    <div className="flex flex-col items-start">
      <motion.span
        className="h-4 w-4 rounded-full ring-4 ring-canvas"
        style={{ scale, opacity, background: "var(--ember-gradient)" }}
      />
      <span className="mt-6 font-mono text-sm text-muted">{step.no}</span>
      <h3 className="mt-3 text-2xl font-medium tracking-tight">{step.name}</h3>
      <p className="mt-3 max-w-[30ch] text-ink-soft">{step.body}</p>
    </div>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.55"],
  });

  return (
    <Section>
      <SectionHeading label={process.label} title={process.heading} />

      {/* Desktop — scroll-driven horizontal timeline */}
      <div ref={trackRef} className="relative mt-24 hidden md:block">
        <div className="absolute left-[7px] right-[7px] top-[7px] h-[2px] bg-hairline" />
        <motion.div
          className="absolute left-[7px] right-[7px] top-[7px] h-[2px] origin-left"
          style={{ scaleX: scrollYProgress, background: "var(--ember-gradient)" }}
        />
        <div className="grid grid-cols-3 gap-10">
          {process.steps.map((s, i) => (
            <TimelineNode
              key={s.no}
              step={s}
              index={i}
              total={process.steps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Mobile — stacked cards */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-[26px] border border-hairline bg-hairline md:hidden">
        {process.steps.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.1}>
            <div className="group relative flex h-full flex-col bg-canvas p-8 transition-colors duration-300 hover:bg-surface sm:p-10">
              <div className="flex items-center justify-between">
                <span
                  className="text-[3.4rem] font-light leading-none tracking-tight text-transparent"
                  style={{ WebkitTextStroke: "1px #d9d0c6" }}
                >
                  {s.no}
                </span>
                <span
                  className="h-2.5 w-2.5 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "var(--ember-gradient)" }}
                />
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-tight">{s.name}</h3>
              <p className="mt-3 text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
