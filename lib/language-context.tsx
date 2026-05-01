"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "./i18n";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

const STORAGE_KEY = "petfocus_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "es") {
        setLangState(stored);
      } else {
        // Try to auto-detect from browser
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("es")) setLangState("es");
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const setLang = (newLang: Lang) => setLangState(newLang);
  const toggle = () => setLangState((prev) => (prev === "en" ? "es" : "en"));

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
