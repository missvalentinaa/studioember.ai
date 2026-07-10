import { clsx } from "@/lib/clsx";

/** Ember mark (flame) + wordmark. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <EmberMark className="h-[26px] w-[26px]" />
      {showWordmark && (
        <span className="text-[1.02rem] font-semibold tracking-[-0.03em] text-ink">
          Ember<span className="text-muted"> Studio</span>
        </span>
      )}
    </span>
  );
}

export function EmberMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ember-mark" x1="4" y1="21" x2="20" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff8a4c" />
          <stop offset="0.45" stopColor="#ff6b35" />
          <stop offset="0.75" stopColor="#c2298a" />
          <stop offset="1" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <path
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        fill="url(#ember-mark)"
      />
    </svg>
  );
}
