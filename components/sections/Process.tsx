"use client";

import { process } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <Section>
      <SectionHeading label={process.label} title={process.heading} />

      <div className="mt-16 grid gap-px overflow-hidden rounded-[26px] border border-hairline bg-hairline md:grid-cols-3">
        {process.steps.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.1}>
            <div className="group relative flex h-full flex-col bg-canvas p-8 transition-colors duration-300 hover:bg-surface sm:p-10">
              <div className="flex items-center justify-between">
                <span
                  className="text-[3.4rem] font-light leading-none tracking-tight text-transparent"
                  style={{
                    WebkitTextStroke: "1px #d9d0c6",
                  }}
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
