import { clsx } from "@/lib/clsx";

/** Consistent section rhythm + centered container. */
export function Section({
  id,
  children,
  className,
  container = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx("relative scroll-mt-24 py-24 sm:py-32 lg:py-40", className)}
    >
      {container ? (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
