"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import ServiceCard from "../ServiceCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { GRID_SERVICES } from "@/lib/services";
import { sectionHref } from "@/lib/routes";

/**
 * Home summary only — title + one-line tagline per service, no bullet lists.
 * The detail (what's included, how the visit works) lives on the service page.
 * This is what keeps the home short enough that people reach the bottom.
 */
export default function Services() {
  const { lang } = useLang();

  return (
    <section id="services" className="py-12 lg:py-16">
      <WashedCard innerClassName="py-16 lg:py-24 px-5 lg:px-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <Badge>{t(T.services.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(T.services.headlinePart1, lang)}{" "}
            <span className="brand-accent-text">{t(T.services.italicWord, lang)}</span>
          </h2>
          <p className="mt-4 text-ink-secondary text-lg">
            {t(T.services.sub, lang)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GRID_SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={sectionHref(lang, "services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg-surface border border-line text-ink-primary hover:border-ink-primary/30 hover:bg-bg-subtle shadow-pill transition-all font-medium"
          >
            {t(T.services.seeAll, lang)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </WashedCard>
    </section>
  );
}
