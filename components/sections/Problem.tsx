"use client";

import { problem } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EmberOrb } from "@/components/ui/EmberOrb";

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
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "var(--ember-gradient)" }}
                  />
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
