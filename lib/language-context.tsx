"use client";

import { createContext, useContext, ReactNode } from "react";
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
  return (
    <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
