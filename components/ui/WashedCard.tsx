import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Soft brand-color washed card — same look as the Hero / FinalCTA backgrounds.
 * White → cream gradient base with diffused brand-color blobs in each corner.
 *
 * Used to give alternating sections a unified, on-brand visual rhythm.
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
          "relative mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-card",
          innerClassName
        )}
        style={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(139, 35, 50, 0.18) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 0%, rgba(200, 160, 74, 0.18) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 100%, rgba(42, 131, 136, 0.16) 0%, transparent 60%)",
            "radial-gradient(circle at 0% 100%, rgba(45, 110, 78, 0.14) 0%, transparent 55%)",
            "linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%)",
          ].join(", "),
        }}
      >
        {/* Soft brand-color blobs */}
        <div
          aria-hidden
          className="absolute -top-10 -left-10 w-[35%] h-[45%] rounded-full bg-brand-primary/12 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -top-6 right-[-6%] w-[35%] h-[45%] rounded-full bg-brand-accent/15 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-[-8%] right-[12%] w-[40%] h-[45%] rounded-full bg-brand-secondary/12 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-[-10%] -left-10 w-[35%] h-[45%] rounded-full bg-brand-accent-2/12 blur-3xl pointer-events-none"
        />

        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
