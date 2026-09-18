"use client";

import clsx from "clsx";

/**
 * The official logo files, used as delivered.
 *
 * Brand Manual rules honoured here:
 *  §02 — the horizontal version is the one specified for website headers.
 *  §03 — minimum on-screen widths: horizontal 160px, primary 100px.
 *  §04 — full colour on white/light, white version on dark backgrounds.
 *  §05 — no shadows, no effects, no recolouring, no distortion.
 *
 * ⚠ `variant="symbol"` departs from §02 ("never separate the symbol from the
 * text"). It exists for two places where the wordmark cannot work: the favicon,
 * and the mobile bar, where the 160px lockup would take 41% of a 390px screen.
 * Requested by the client; flagged for the designer. Everywhere else uses a
 * variant that carries the wordmark.
 */

const MIN_WIDTH = { horizontal: 160, primary: 100, symbol: 32 } as const;

/** Intrinsic pixel sizes of the delivered files, used to reserve space. */
const RATIO = {
  horizontal: 1034 / 267,
  primary: 691 / 643,
  symbol: 570 / 475,
} as const;

type Variant = keyof typeof MIN_WIDTH;

export default function Logo({
  variant = "horizontal",
  width,
  className,
  priority = false,
}: {
  variant?: Variant;
  /** On-screen width in px. Clamped to the manual's minimum. */
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const w = Math.max(width ?? MIN_WIDTH[variant], MIN_WIDTH[variant]);
  const h = Math.round(w / RATIO[variant]);

  const sources: Record<Variant, { light: string; dark: string }> = {
    horizontal: {
      light: "/brand/logo-horizontal.png",
      dark: "/brand/logo-horizontal-onblack.png",
    },
    primary: {
      light: "/brand/logo-primary.png",
      dark: "/brand/logo-primary-onblack.png",
    },
    // The symbol is pixel-identical across the light and dark exports — only
    // the wordmark changes colour — so one file serves both themes.
    symbol: { light: "/brand/symbol.png", dark: "/brand/symbol.png" },
  };

  const { light, dark } = sources[variant];
  const alt = "PetFocus — Mobile Veterinary Service";

  if (light === dark) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={light}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={clsx("shrink-0 object-contain", className)}
        style={{ width: w, height: h }}
      />
    );
  }

  return (
    <span
      className={clsx("relative inline-block shrink-0", className)}
      style={{ width: w, height: h }}
    >
      {/* Two files rather than a CSS filter: §05 forbids altering the logo's
          colours, and the white version is an official export. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="w-full h-full object-contain dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark}
        alt=""
        aria-hidden
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-full object-contain hidden dark:block"
      />
    </span>
  );
}
