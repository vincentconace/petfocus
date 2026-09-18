"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Badge from "./ui/Badge";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { sectionHref } from "@/lib/routes";
import {
  ORG,
  LEGAL_UPDATED,
  type LegalBlock,
  type LegalDoc,
} from "@/lib/legal";

/**
 * Renders a legal document from `lib/legal.ts`.
 *
 * Long documents that nobody reads are the norm here, so this one is built to
 * be readable: a plain-language summary first, a table of contents that sticks
 * beside the text, numbered sections with real anchors, and a measure capped
 * near 70 characters. The anchors matter — "see section 4 of our terms" has to
 * be a link someone can actually send.
 */
export default function LegalBody({ doc }: { doc: LegalDoc }) {
  const { lang } = useLang();

  const other = doc.id === "privacy" ? "terms" : "privacy";
  const otherLabel =
    doc.id === "privacy" ? t(T.legal.terms, lang) : t(T.legal.privacy, lang);

  return (
    <section className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-ink-subtle">
          {t(T.legal.updated, lang)}:{" "}
          <time dateTime={LEGAL_UPDATED.iso} className="text-ink-secondary">
            {t(LEGAL_UPDATED.label, lang)}
          </time>
        </p>

        {/* The summary is not the agreement and does not try to be — it is
            there so that someone who reads only the first screen still leaves
            knowing the five things that matter. */}
        <div className="mt-6 brand-wash rounded-[1.75rem] border border-line p-7 sm:p-10">
          <Badge>{t(T.legal.summary, lang)}</Badge>
          <ul className="mt-6 space-y-3.5">
            {doc.summary.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 text-ink-primary leading-relaxed"
              >
                <span
                  aria-hidden
                  className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-support"
                />
                <span>{t(item, lang)}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-subtle">
            {t(T.legal.summaryNote, lang)}
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[minmax(0,1fr)_16rem] gap-10 lg:gap-14 items-start">
          <div className="order-2 lg:order-1 max-w-[70ch]">
            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 pt-10 first:pt-0"
              >
                <h2 className="display-3 flex gap-3">
                  <span
                    aria-hidden
                    className="text-brand-support-text tabular-nums shrink-0"
                  >
                    {i + 1}.
                  </span>
                  <span>{t(section.heading, lang)}</span>
                </h2>

                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} lang={lang} />
                  ))}
                  {section.id === "contact" && <ContactDetails />}
                </div>
              </section>
            ))}

            <div className="mt-14 pt-8 border-t border-line">
              <Link
                href={sectionHref(lang, other)}
                className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:gap-3 transition-all"
              >
                {t(T.legal.alsoRead, lang)}: {otherLabel}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Table of contents — desktop only. A twenty-section document needs
              a way in that is not scrolling, but putting that list above the
              text on a phone means scrolling past it to reach the document.
              Small screens get the summary card instead. */}
          <nav
            aria-label={t(T.legal.onThisPage, lang)}
            className="hidden lg:block order-1 lg:order-2 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto rounded-2xl border border-line bg-bg-surface p-5 shadow-pill"
          >
            <h2 className="label-text text-brand-support-text">
              {t(T.legal.onThisPage, lang)}
            </h2>
            <ol className="mt-4 space-y-2 text-sm">
              {doc.sections.map((section, i) => (
                <li key={section.id} className="flex gap-2">
                  <span aria-hidden className="text-ink-subtle tabular-nums">
                    {i + 1}.
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-ink-secondary hover:text-brand-primary transition-colors"
                  >
                    {t(section.heading, lang)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

function Block({ block, lang }: { block: LegalBlock; lang: "en" | "es" }) {
  if (block.kind === "p") {
    return (
      <p className="text-ink-secondary leading-relaxed">
        {t(block.text, lang)}
      </p>
    );
  }

  if (block.kind === "callout") {
    return (
      <p className="border-l-[3px] border-brand-accent-strong bg-bg-subtle rounded-r-xl pl-5 pr-5 py-4 text-ink-primary font-medium leading-relaxed">
        {t(block.text, lang)}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {block.lead && (
        <p className="text-ink-secondary leading-relaxed">
          {t(block.lead, lang)}
        </p>
      )}
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-ink-secondary leading-relaxed"
          >
            <span
              aria-hidden
              className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary/50"
            />
            <span>{t(item, lang)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The contact block at the foot of each document.
 *
 * Email and mailing address render only when `ORG` has them — the same
 * approach `Footer` takes with social links. A privacy policy that lists an
 * address nobody has confirmed is worse than one that lists only the phone
 * number we know answers.
 */
function ContactDetails() {
  const { lang } = useLang();

  return (
    <ul className="mt-6 space-y-3">
      <li>
        <a
          href={ORG.phoneHref}
          className="inline-flex items-center gap-2.5 font-semibold text-ink-primary hover:text-brand-primary transition-colors"
        >
          <Phone size={16} className="text-brand-primary" />
          {ORG.phone}
        </a>
      </li>
      {ORG.email && (
        <li>
          <a
            href={`mailto:${ORG.email}`}
            className="inline-flex items-center gap-2.5 text-ink-secondary hover:text-brand-primary transition-colors"
          >
            <Mail size={16} className="text-brand-primary" />
            {ORG.email}
          </a>
        </li>
      )}
      <li className="flex items-center gap-2.5 text-ink-secondary">
        <MapPin size={16} className="text-brand-primary" />
        {ORG.address || (lang === "es" ? "Norte de Utah" : "Northern Utah")}
      </li>
    </ul>
  );
}
