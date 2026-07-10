"use client";

import { finalCta } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { EmberOrb } from "@/components/ui/EmberOrb";
import { ContactForm } from "@/components/ui/ContactForm";

export function FinalCTA() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <EmberOrb
        variant="spectrum"
        className="left-1/2 top-[-8%] h-[420px] w-[420px] -translate-x-1/2 opacity-40"
        blur={60}
      />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="lg:pt-6">
          <Reveal>
            <MonoLabel>{finalCta.label}</MonoLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,4rem)]">
              Build the version people{" "}
              <span className="ember-text">take seriously.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[46ch] text-lg text-ink-soft">{finalCta.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-2 backdrop-blur-sm">
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ background: "var(--ember-gradient)" }}
              />
              <span className="text-[0.85rem] text-ink-soft">{finalCta.note}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
