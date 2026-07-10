import { clsx } from "@/lib/clsx";

/** Uppercase, letter-spaced monospace micro-label with an ember tick. */
export function MonoLabel({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={clsx("mono-label inline-flex items-center gap-2.5", className)}>
      {dot && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--ember-gradient)" }}
        />
      )}
      {children}
    </span>
  );
}
