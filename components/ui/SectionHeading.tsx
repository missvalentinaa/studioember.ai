import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { clsx } from "@/lib/clsx";

export function SectionHeading({
  label,
  title,
  lead,
  align = "left",
  className,
}: {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <MonoLabel>{label}</MonoLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="display text-[clamp(2rem,5.2vw,3.6rem)] max-w-[20ch]">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={clsx(
              "max-w-[52ch] text-lg text-ink-soft",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
