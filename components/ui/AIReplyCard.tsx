"use client";

import { motion } from "framer-motion";

const Sparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2l1.8 5.4a4 4 0 0 0 2.8 2.8L22 12l-5.4 1.8a4 4 0 0 0-2.8 2.8L12 22l-1.8-5.4a4 4 0 0 0-2.8-2.8L2 12l5.4-1.8a4 4 0 0 0 2.8-2.8L12 2z"
      fill="url(#spark)"
    />
    <defs>
      <linearGradient id="spark" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9640a8" />
        <stop offset="1" stopColor="#cb72b8" />
      </linearGradient>
    </defs>
  </svg>
);

export function AIReplyCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface-2/50 p-4">
      {/* incoming bubbles */}
      <div className="flex flex-col items-end gap-2">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-2 text-[0.8rem] text-ink-soft shadow-sm">
          My invoice from March never synced to Xero
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-white px-3.5 py-2 text-[0.8rem] text-ink-soft shadow-sm">
          Can you add Ethan as an admin on my account?
        </div>
      </div>

      {/* generating pill */}
      <div className="relative mt-3">
        <div
          className="absolute inset-0 rounded-2xl opacity-90"
          style={{
            background:
              "linear-gradient(120deg, rgba(124,92,255,0.14), rgba(194,41,138,0.12) 60%, rgba(255,107,53,0.10))",
          }}
        />
        <div className="relative flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-2.5 backdrop-blur-sm">
          <Sparkle />
          <span className="text-[0.82rem] font-medium text-ink">Generating reply</span>
          <span className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--ember-gradient)" }}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="ml-auto -rotate-45"
            aria-hidden="true"
          >
            <path
              d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
              stroke="#9640a8"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="mono-label" style={{ fontSize: "0.58rem" }}>
          Agent · live
        </span>
        <span className="flex items-center gap-1.5 text-[0.7rem] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Connected to your tools
        </span>
      </div>
    </div>
  );
}
