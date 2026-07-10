import { clsx } from "@/lib/clsx";

type Variant = "ember" | "violet" | "coral" | "spectrum";

const gradients: Record<Variant, string> = {
  spectrum:
    "radial-gradient(circle at 38% 34%, #ffcf9e 0%, #ff8a4c 16%, #ff6b35 32%, #e5484d 50%, #c2298a 68%, #7c5cff 86%, rgba(124,92,255,0) 100%)",
  ember:
    "radial-gradient(circle at 40% 36%, #ffd9b0 0%, #ff8a4c 22%, #ff6b35 44%, #e5484d 70%, rgba(229,72,77,0) 100%)",
  violet:
    "radial-gradient(circle at 42% 38%, #d6c9ff 0%, #a48bff 24%, #7c5cff 48%, #c2298a 78%, rgba(194,41,138,0) 100%)",
  coral:
    "radial-gradient(circle at 40% 38%, #ffc0a0 0%, #ff8a4c 26%, #e5484d 52%, #c2298a 80%, rgba(194,41,138,0) 100%)",
};

type EmberOrbProps = {
  variant?: Variant;
  className?: string;
  /** softness of the core, in px */
  blur?: number;
  /** outer atmospheric glow */
  glow?: boolean;
  animate?: boolean;
};

/**
 * A soft, luminous gradient orb — the studio's signature light source.
 * Pure CSS: crisp at any resolution, no image assets.
 */
export function EmberOrb({
  variant = "spectrum",
  className,
  blur = 24,
  glow = true,
  animate = true,
}: EmberOrbProps) {
  return (
    <div className={clsx("pointer-events-none absolute", className)} aria-hidden="true">
      <div className={clsx("relative h-full w-full", animate && "animate-drift")}>
        {glow && (
          <div
            className="absolute inset-[-25%] rounded-full opacity-55"
            style={{
              background: gradients[variant],
              // Cap the glow blur so low-end GPUs don't choke rasterizing huge radii.
              filter: `blur(${Math.min(blur * 1.7, 72)}px)`,
            }}
          />
        )}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: gradients[variant], filter: `blur(${Math.min(blur, 56)}px)` }}
        />
        {/* inner light bloom */}
        <div
          className="absolute inset-[18%] rounded-full opacity-70 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 42% 38%, rgba(255,240,220,0.9), rgba(255,138,76,0) 55%)",
            filter: `blur(${blur * 0.6}px)`,
          }}
        />
      </div>
    </div>
  );
}
