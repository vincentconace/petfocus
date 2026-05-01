import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "ink";
type Size = "sm" | "md" | "lg";

// Unified palette aligned with the PetFocus logo:
//   primary / ink  → burgundy (brand-primary, the logo's dominant color)
//   secondary      → teal (brand-secondary), for non-CTA accent buttons
//   ghost          → white pill, for soft secondary actions
//   dark           → near-black, reserved for sections with dark backgrounds
const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-burgundy-glow",
  secondary:
    "bg-brand-secondary text-white hover:bg-brand-secondary-hover shadow-pill",
  ghost:
    "bg-white text-ink-primary border border-line hover:border-ink-primary/30 hover:bg-bg-cream shadow-pill",
  dark: "bg-bg-dark text-white hover:bg-black shadow-ink-glow",
  // `ink` is kept as an alias for primary so existing call sites work, but
  // visually it now matches the brand burgundy (no more out-of-palette black).
  ink: "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-burgundy-glow",
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
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] hover:scale-[1.02] cursor-pointer";

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
