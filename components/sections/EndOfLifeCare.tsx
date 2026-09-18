"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Check, ArrowRight } from "lucide-react";
import { LinkButton } from "../ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { serviceHref } from "@/lib/routes";
import { getService } from "@/lib/services";

/**
 * End of Life Care — intentionally its own section, placed high on the page.
 *
 * Design register is deliberately quieter than the rest of the site: no gold
 * sparkles, no bouncy illustration, slower entrance, muted green/teal instead
 * of the burgundy CTA glow. Someone landing here is not shopping for nail
 * trims, and the page should not sound like it is selling to them.
 */
export default function EndOfLifeCare() {
  const { lang } = useLang();
  const c = T.endOfLife;
  const service = getService("end-of-life")!;

  return (
    <section id="end-of-life" className="py-12 lg:py-16">
      <div className="px-3 sm:px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="brand-wash-quiet relative mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-line shadow-card"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-12 p-7 sm:p-10 lg:p-14">
            {/* Copy */}
            <div>
              <span className="label-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-surface border border-line text-brand-support-text shadow-pill">
                {t(c.badge, lang)}
              </span>

              <h2 className="display-2 mt-5">
                {t(c.headlinePart1, lang)}{" "}
                <span className="text-brand-support-text">
                  {t(c.italicWord, lang)}
                </span>
              </h2>

              <p className="mt-5 text-ink-secondary leading-relaxed max-w-xl">
                {t(c.body, lang)}
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
                {c.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-ink-primary text-sm font-medium"
                  >
                    <Check size={16} className="text-brand-support-text shrink-0" />
                    {t(it, lang)}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <LinkButton
                  href="tel:+13853819161"
                  variant="support"
                  size="lg"
                >
                  <Phone size={16} />
                  {t(c.cta, lang)}
                </LinkButton>
                <Link
                  href={serviceHref(lang, "end-of-life")}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-support-text hover:gap-2.5 transition-[gap,color] duration-200"
                >
                  {t(c.more, lang)}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={service.image}
                alt={t(service.imageAlt, lang)}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

