import { clsx } from "@/lib/clsx";

/** Ember mark (gradient bubble) + wordmark. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-4", className)}>
      <EmberMark className="h-[21px] w-[21px]" />
      {showWordmark && (
        <span className="text-[1.02rem] font-semibold tracking-[-0.03em] text-ink">
          Ember<span className="text-muted"> Studio</span>
        </span>
      )}
    </span>
  );
}

/** Soft, transparent gradient bubble — colour lives only at the rim, blurred
 *  for a hazy glass edge, with a faint specular highlight to read as a bubble
 *  rather than a flat blob. */
export function EmberMark({ className }: { className?: string }) {
  return (
    <span className={clsx("relative inline-block", className)} aria-hidden="true">
      <span
        className="absolute inset-[-24%] rounded-full blur-[4px]"
        style={{
          background:
            "conic-gradient(from 200deg, #f4c0c7, #f9a074, #cb72b8, #9640a8, #f4c0c7)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 50%, black 66%, black 80%, transparent 94%)",
          maskImage:
            "radial-gradient(circle, transparent 50%, black 66%, black 80%, transparent 94%)",
        }}
      />
      <span
        className="absolute inset-[22%] rounded-full opacity-80 blur-[1px]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0) 60%)",
        }}
      />
    </span>
  );
}
