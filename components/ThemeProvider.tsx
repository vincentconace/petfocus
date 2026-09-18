"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";

export const THEME_KEY = "petfocus_theme";

export type Theme = "light" | "dark";

/**
 * Applied before first paint so a dark-mode visitor never sees a white flash.
 * Sets a data attribute rather than a class: `<html>` carries a React-rendered
 * className, and mixing imperative classes into it is asking for trouble.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_KEY}');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

type ThemeContext = { theme: Theme; toggle: () => void };
const Ctx = createContext<ThemeContext | undefined>(undefined);

// useLayoutEffect warns during SSR; there is no layout work to do there anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Keeps `data-theme` on <html> in sync.
 *
 * Why this has to re-apply rather than set once: the root layout lives under
 * the [lang] segment, so switching language re-renders <html>. React then
 * strips attributes it does not itself render — verified with a
 * MutationObserver, which caught `data-theme → null` on every language switch.
 * The page did not reload (client-side navigation), so the <head> script never
 * ran again, and the site silently fell back to light and stayed there.
 *
 * The re-apply runs in a layout effect so it lands before the browser paints;
 * a plain effect would show one frame of the wrong theme on every navigation.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const transitionTimer = useRef<number | undefined>(undefined);

  // The init script has already written the correct value by the time this
  // runs on the client, so read it back rather than guessing.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  useIsomorphicLayoutEffect(() => {
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme, pathname]);

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_KEY)) return;
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    // Let colours cross-fade for the length of the switch, then take the
    // transition back off so it does not slow hover states or interfere with
    // Framer Motion. See the [data-theme-transition] rule in globals.css.
    const root = document.documentElement;
    root.setAttribute("data-theme-transition", "");
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(
      () => root.removeAttribute("data-theme-transition"),
      300
    );

    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ theme, toggle }}>
      {/* Framer Motion ignored prefers-reduced-motion entirely — every
          whileInView entrance still ran for visitors who asked for less
          motion. "user" keeps transforms and opacity still while leaving
          layout animations working. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
