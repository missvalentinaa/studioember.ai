"use client";

import { clsx } from "@/lib/clsx";

const GLOW_GRADIENT =
  "linear-gradient(120deg, #9640a8 0%, #cb72b8 25%, #f9a074 50%, #f4c0c7 75%, #9640a8 100%)";

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A glowing prompt bar — "Create | {typed text}" — with an animated
 * gradient ring and a rich ambient bloom bleeding through a translucent
 * glass fill, so the colour reads through the pill itself rather than
 * sitting behind a near-opaque dark background.
 */
export function PromptBar({ text, cursorOn }: { text: string; cursorOn: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="animate-gradient-flow pointer-events-none absolute -inset-16 rounded-full opacity-70 blur-3xl"
        style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%" }}
      />
      <div
        aria-hidden="true"
        className="animate-gradient-flow pointer-events-none absolute -inset-8 rounded-full opacity-60 blur-2xl"
        style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%", animationDuration: "22s" }}
      />
      <div
        className="animate-gradient-flow relative rounded-full p-[1.5px]"
        style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%" }}
      >
        <div className="relative flex items-center gap-3 overflow-hidden rounded-full bg-[#3a1145]/45 px-6 py-4 backdrop-blur-2xl sm:px-7 sm:py-5">
          {/* inner colour wash so the glow reads through the glass itself */}
          <div
            aria-hidden="true"
            className="animate-gradient-flow pointer-events-none absolute inset-0 opacity-45"
            style={{ backgroundImage: GLOW_GRADIENT, backgroundSize: "220% 220%" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(240px 100px at 30% 50%, rgba(255,255,255,0.28), transparent 72%)",
            }}
          />
          <span className="relative flex h-6 w-6 shrink-0 items-center justify-center text-white">
            <PlusIcon />
          </span>
          <span className="relative shrink-0 whitespace-nowrap text-[1.05rem] font-medium text-white">
            Create
          </span>
          <span
            aria-hidden="true"
            className="relative h-6 w-px shrink-0"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.9), transparent)",
              boxShadow: "0 0 8px rgba(255,255,255,0.7)",
            }}
          />
          <span className="relative min-w-0 flex-1 truncate text-left text-[1.05rem] text-white/85">
            {text}
            <span
              className={clsx(
                "ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-white transition-opacity duration-150",
                cursorOn ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
