import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette extracted from the PetFocus logo (cross gradient).
        // Used as the single source of truth across the entire site:
        //   primary  → burgundy (CTAs, accents, dark backgrounds via `deep`)
        //   secondary → teal (secondary actions, supporting accents)
        //   accent    → gold (highlights, ratings, badges)
        //   accent-2  → forest green (success states, supporting visuals)
        //   orange    → warm orange (decorative accents, illustrations)
        brand: {
          primary: "#8B2332",          // PETFOCUS burgundy
          "primary-hover": "#6E1A26",  // darker burgundy (hover)
          deep: "#2A0A10",             // very dark burgundy (replaces near-black)
          secondary: "#2A8388",        // teal
          "secondary-hover": "#1F6A6E", // darker teal (hover)
          accent: "#C8A04A",           // gold / cat silhouette
          "accent-2": "#2D6E4E",       // forest green
          orange: "#D6602B",           // warm orange
        },
        bg: {
          DEFAULT: "#ffffff",
          subtle: "#F8F2E4",
          cream: "#FAF6EE",
          // `dark` is now an on-brand deep burgundy instead of near-black.
          // This unifies Footer / FinalCTA / dark buttons with the brand.
          dark: "#2A0A10",
        },
        ink: {
          primary: "#131313",
          secondary: "#4c4c4c",
          subtle: "#9a9a9a",
        },
        line: {
          DEFAULT: "#efeff2",
          warm: "#E8DFC9",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Anton — the PetFocus logo font. Use for brand-voice accents:
        // eyebrow badges, callouts, big stats, etc.
        brand: ["var(--font-anton)", "Impact", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "display-1": "-0.025em",
      },
      borderRadius: {
        card: "1.5rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(15,23,42,0.05)",
        "card-lg": "0 4px 12px rgba(15,23,42,0.06), 0 24px 48px rgba(15,23,42,0.08)",
        float: "0 8px 28px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04)",
        "float-lg": "0 20px 50px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.05)",
        pill: "0 6px 20px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.06)",
        "burgundy-glow": "0 10px 30px rgba(139, 35, 50, 0.22)",
        "ink-glow": "0 10px 30px rgba(19,19,19,0.25)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delay": "float 4s ease-in-out infinite 1s",
        "float-delay-2": "float 4s ease-in-out infinite 2s",
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
