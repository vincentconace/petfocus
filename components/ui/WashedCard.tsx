import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Soft brand-colour washed card — the same surface used behind the hero,
 * alternating sections and the footer.
 *
 * The gradient lives in `.brand-wash` (app/globals.css) rather than an inline
 * style so it resolves against the theme's CSS variables and follows dark mode.
 */
export default function WashedCard({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={clsx("relative px-3 sm:px-5 lg:px-8", className)}>
      <div
        className={clsx(
          "brand-wash relative mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-card",
          innerClassName
        )}
      >
        {/* Diffused brand blobs. Blue dominates, green accompanies, and pink
            stays a trace — the 25/10/5 proportion from §06. */}
        <div
          aria-hidden
          className="absolute -top-10 -left-10 w-[35%] h-[45%] rounded-full bg-brand-primary/12 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -top-6 right-[-6%] w-[35%] h-[45%] rounded-full bg-brand-support/14 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-[-8%] right-[12%] w-[40%] h-[45%] rounded-full bg-brand-primary/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-[-10%] -left-10 w-[35%] h-[45%] rounded-full bg-brand-accent/6 blur-3xl pointer-events-none"
        />

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
