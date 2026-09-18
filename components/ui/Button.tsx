import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "support" | "ink";
type Size = "sm" | "md" | "lg";

/**
 * Button palette follows §06 of the brand manual:
 *   "Blue is the brand's dominant color. Green accompanies and organizes;
 *    pink is reserved to highlight specific actions and should never
 *    dominate a piece."
 *
 *   primary   → pink. The one action the site drives to: calling the clinic.
 *               Uses `accent-strong` (a darkened pink) because brand pink with
 *               white text lands at 3.8:1, under WCAG AA.
 *   secondary → blue. Structural and secondary actions.
 *   support   → green. Reserved for the end-of-life surfaces, where pink
 *               would read as promotional.
 *   ghost     → surface pill with a hairline border.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-brand-accent-strong text-white hover:bg-brand-accent-hover shadow-accent-glow",
  secondary:
    "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-primary-glow",
  support:
    "bg-brand-support-text text-white hover:bg-brand-support-hover dark:text-[#0B1017] shadow-pill",
  ghost:
    "bg-bg-surface text-ink-primary border border-line hover:border-brand-primary/40 hover:bg-bg-subtle shadow-pill",
  // `ink` is kept as an alias for the blue button so older call sites work.
  ink: "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-primary-glow",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] hover:scale-[1.02] cursor-pointer";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
