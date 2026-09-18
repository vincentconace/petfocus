"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import type { Lang } from "./i18n";

type LangContextType = {
  lang: Lang;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

/**
 * Language now comes from the URL (`/en/...`, `/es/...`), not localStorage.
 *
 * The old version kept the choice in localStorage and flipped the copy on the
 * client. That was fine for a single landing page, but every service page is
 * meant to be found in search — and a client-side flag means Google indexes
 * exactly one version of each. Switching languages is navigation now; see
 * `swapLang` in lib/routes.ts.
 *
 * First-visit detection moved to middleware.ts, which redirects `/` to the
 * visitor's language.
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  // The other half of the language cross-fade. The toggle sets
  // `data-lang-switching` to fade the outgoing page down; this clears it once
  // the new language has mounted, which fades the incoming one back up.
  //
  // The timeout is a safety net: if a navigation is cancelled or fails, the
  // page must not be left stuck at opacity 0.
  useEffect(() => {
    const root = document.documentElement;
    const clear = () => root.removeAttribute("data-lang-switching");
    const frame = requestAnimationFrame(clear);
    const failsafe = window.setTimeout(clear, 1200);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(failsafe);
    };
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
