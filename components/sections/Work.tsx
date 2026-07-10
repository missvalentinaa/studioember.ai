"use client";

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href="#contact"
      className="group flex flex-col focus-visible:outline-none"
      aria-label={`${project.title} — view project`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-hairline">
        {/* generated cover art */}
        <div
          className="absolute inset-0 scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{ background: cover(project.palette) }}
        />
        {/* floating drift orb inside */}
        <div
          className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl animate-drift-slow"
          style={{
            background: `radial-gradient(circle at 40% 35%, #ffe4c4, ${project.palette[0]} 30%, ${project.palette[1]} 60%, transparent 75%)`,
          }}
        />
        <div className="absolute inset-0 bg-black/5" />

        {/* top row */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span
            className="mono-label text-white/80"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {project.client}
          </span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[0.68rem] text-white/90 backdrop-blur-sm">
            {project.index}
          </span>
        </div>

        {/* view button */}
        <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 12L12 4M12 4H5M12 4v7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* meta */}
      <div className="mt-5 flex flex-col gap-3">
        <h3 className="max-w-[24ch] text-[1.15rem] font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-ink">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-hairline px-2.5 py-1 text-[0.72rem] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <Section id="work">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading label={work.label} title={work.heading} className="max-w-2xl" />
        <Reveal delay={0.1}>
          <p className="max-w-[36ch] text-ink-soft sm:text-right">{work.body}</p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {work.projects.map((p, i) => (
          <Reveal key={p.index} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
