"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { homeHref } from "@/lib/routes";

export type Crumb = { label: string; href?: string };

/**
 * Header for inner pages. The navbar is fixed and was designed to float over
 * the home hero's canvas, so inner pages carry their own top padding to match
 * its height at each breakpoint.
 */
export default function PageHeader({
  title,
  tagline,
  crumbs = [],
}: {
  title: string;
  tagline?: string;
  crumbs?: Crumb[];
}) {
  const { lang } = useLang();

  return (
    <header className="px-3 sm:px-5 lg:px-8 pt-[84px] sm:pt-[70px] lg:pt-[86px]">
      <div
        className="brand-wash relative mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden mt-3 sm:mt-4 border border-line"
      >
        <div className="relative px-6 sm:px-10 lg:px-14 py-14 sm:py-18 lg:py-24 max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-sm text-ink-secondary"
          >
            <Link
              href={homeHref(lang)}
              className="hover:text-brand-primary transition-colors"
            >
              {t(T.nav.home, lang)}
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-ink-subtle" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink-primary">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="display-1 mt-5"
            style={{ fontSize: "clamp(2.25rem, 4vw + 1rem, 3.75rem)" }}
          >
            {title}
          </motion.h1>

          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="subhead mt-4 text-lg text-ink-secondary"
            >
              {tagline}
            </motion.p>
          )}
        </div>
      </div>
    </header>
  );
}
