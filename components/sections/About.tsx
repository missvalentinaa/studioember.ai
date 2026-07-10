"use client";

import { about } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { EmberMark } from "@/components/ui/Logo";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <MonoLabel>{about.label}</MonoLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mono-label mt-6" style={{ color: "var(--color-ink)" }}>
              {about.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">{about.heading}</h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="max-w-[52ch] text-lg text-ink-soft">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px] border border-hairline bg-surface/60 p-8 backdrop-blur-sm sm:p-10">
            <EmberOrb
              variant="spectrum"
              className="right-[-20%] top-[-20%] h-64 w-64 opacity-50"
              blur={44}
            />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-surface">
                <EmberMark className="h-7 w-7" />
              </div>
              <p className="mt-6 text-xl font-medium tracking-tight text-ink">
                Led by Indi & Karyn Caburian
              </p>
              <p className="mt-2 text-ink-soft">
                Positioning · Design · Development · AI systems
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-hairline pt-8">
                {about.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[2rem] font-semibold tracking-tight ember-text">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[0.78rem] leading-tight text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
