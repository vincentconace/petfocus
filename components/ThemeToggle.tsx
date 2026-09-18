"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = theme === "dark";
  const label = t(dark ? T.theme.toLight : T.theme.toDark, lang);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid place-items-center w-10 h-10 rounded-full bg-bg-subtle text-ink-primary hover:bg-line transition-colors cursor-pointer ${className}`}
    >
      {/* The server cannot know the theme, so the first paint must match the
          server output. Swap to the real icon once hydrated. */}
      {mounted && dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
