"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export const THEME_KEY = "petfocus_theme";

/**
 * Inlined in <head> so the theme is applied before first paint — otherwise a
 * dark-mode visitor gets a white flash on every navigation. Kept as a string
 * because it must run before React hydrates.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_KEY}');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      document.documentElement.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  const label = t(dark ? T.theme.toLight : T.theme.toDark, lang);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid place-items-center w-10 h-10 rounded-full bg-bg-subtle text-ink-primary hover:bg-line transition-colors cursor-pointer ${className}`}
    >
      {/* Before mount the rendered icon must match the server output, which
          cannot know the theme — render the sun and swap after hydration. */}
      {mounted && dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
