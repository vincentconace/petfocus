import type { Config } from "tailwindcss";

/**
 * Tokens resolve to the CSS variables declared in app/globals.css, so every
 * colour follows the light/dark theme automatically and no component holds a
 * hex value. Source of truth: Petfocus Brand Manual v1.0 (2026).
 */
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Blue — dominant. Headlines, structure, links, secondary buttons.
          primary: c("primary"),
          "primary-hover": c("primary-hover"),
          // Pink — "reserved to highlight specific actions". Primary CTAs only.
          accent: c("accent"),
          "accent-strong": c("accent-strong"),
          "accent-hover": c("accent-hover"),
          // Green — "accompanies and organises". Checkmarks, labels, support.
          support: c("support"),
          "support-text": c("support-text"),
          "support-hover": c("support-hover"),
          // Unaltered brand values, for places that must match the logo exactly.
          blue: c("blue"),
          green: c("green"),
          pink: c("pink"),
        },
        bg: {
          DEFAULT: c("bg"),
          subtle: c("bg-subtle"),
          surface: c("surface"),
        },
        ink: {
          primary: c("ink"),
          secondary: c("ink-secondary"),
          subtle: c("ink-subtle"),
        },
        line: {
          DEFAULT: c("line"),
        },
      },
      fontFamily: {
        // §07 — Plus Jakarta Sans is the brand's single typeface.
        // System substitutes per the manual: Segoe UI, then Helvetica.
        sans: [
          "var(--font-jakarta)",
          "Segoe UI",
          "Helvetica",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-jakarta)",
          "Segoe UI",
          "Helvetica",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        headline: "-0.02em",
        label: "0.16em",
      },
      borderRadius: {
        card: "1.5rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "float-lg": "var(--shadow-float-lg)",
        pill: "var(--shadow-pill)",
        "accent-glow": "0 10px 30px rgb(var(--c-accent-strong) / 0.3)",
        "primary-glow": "0 10px 30px rgb(var(--c-primary) / 0.28)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
