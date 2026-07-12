"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { work } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Project = (typeof work.projects)[number];

function cover(palette: string[]) {
  const [a, b, c] = palette;
  return `radial-gradient(120% 120% at 22% 18%, ${a} 0%, transparent 52%),
          radial-gradient(110% 110% at 82% 26%, ${b} 0%, transparent 48%),
          radial-gradient(130% 130% at 60% 96%, ${c} 0%, transparent 60%),
          linear-gradient(160deg, #1a1614, #2a211d)`;
}

/** Base sticky offset (clears the floating nav) + per-card step so the deck
 *  fans out slightly — each pinned card sits a touch lower than the last. */
const STACK_TOP = 104;
const STACK_STEP = 18;

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const range: [number, number] = [index / total, 1];
  const targetScale = 1 - (total - index) * 0.045;
  const scale = useTransform(progress, range, [1, targetScale]);
  const brightness = useTransform(progress, range, [1, 0.85]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div
      className="sticky flex h-[78vh] min-h-[460px] items-center justify-center sm:h-[84vh]"
      style={{ top: STACK_TOP + index * STACK_STEP }}
    >
      <motion.div
        style={{ scale, filter, transformOrigin: "top center" }}
        className="relative w-full"
      >
        <a
          href="#contact"
          className="group block focus-visible:outline-none"
          aria-label={`${project.title} — view project`}
        >
          <div className="relative h-[64vh] min-h-[420px] w-full overflow-hidden rounded-[28px] border border-hairline shadow-[0_50px_90px_-50px_rgba(26,22,20,0.5)] sm:h-[70vh]">
            {/* generated cover art */}
            <div
              className="absolute inset-0 scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              style={{ background: cover(project.palette) }}
            />
            {/* floating drift orb inside */}
            <div
              className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl animate-drift-slow"
              style={{
                background: `radial-gradient(circle at 40% 35%, #ffe4c4, ${project.palette[0]} 30%, ${project.palette[1]} 60%, transparent 75%)`,
              }}
            />
            <div className="absolute inset-0 bg-white/20" />

            {/* top row */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-8">
              <span className="mono-label" style={{ color: "rgba(255,255,255,0.85)" }}>
                {project.client}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[0.7rem] text-white/90 backdrop-blur-sm">
                {project.index} / {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* bottom content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <h3 className="max-w-[22ch] text-[1.7rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[2.6rem]">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/25 px-2.5 py-1 text-[0.72rem] text-white/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-end sm:gap-3">
                <div className="rounded-2xl bg-white/95 px-3.5 py-2.5 backdrop-blur-sm">
                  <div className="text-[1.05rem] font-semibold leading-none tracking-tight text-ink">
                    {project.stat.value}
                  </div>
                  <div className="mt-1 max-w-[16ch] text-[0.66rem] leading-tight text-muted">
                    {project.stat.label}
                  </div>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-105">
                  <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12L12 4M12 4H5M12 4v7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <Section id="work">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading label={work.label} title={work.heading} className="max-w-2xl" />
        <Reveal delay={0.1}>
          <p className="max-w-[36ch] text-ink-soft sm:text-right">{work.body}</p>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative mt-16">
        {work.projects.map((p, i) => (
          <StackCard
            key={p.index}
            project={p}
            index={i}
            total={work.projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </Section>
  );
}
