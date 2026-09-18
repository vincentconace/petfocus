"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { serviceHref } from "@/lib/routes";
import type { Service } from "@/lib/services";

/**
 * Wide, quieter card for a service that is deliberately set apart from the
 * grid. Muted green rather than the burgundy CTA palette, for the same reason
 * the home section is: this is not a service anyone is shopping for.
 */
export default function FeaturedServiceCard({ service }: { service: Service }) {
  const { lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="brand-wash-quiet rounded-[2rem] border border-line shadow-card overflow-hidden grid lg:grid-cols-[1.2fr_0.8fr]"
    >
      <div className="p-8 sm:p-10 lg:p-12">
        <span className="label-text inline-flex items-center px-4 py-1.5 rounded-full bg-bg-surface border border-line text-brand-support-text shadow-pill">
          {t(service.title, lang)}
        </span>

        <h2 className="display-2 mt-5 max-w-2xl">
          <span className="text-brand-support-text">
            {t(service.tagline, lang)}
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-ink-secondary leading-relaxed">
          {t(service.intro, lang)}
        </p>

        <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
          {service.includes.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-ink-secondary text-sm"
            >
              <Check
                size={16}
                className="text-brand-support mt-0.5 shrink-0"
              />
              {t(item, lang)}
            </li>
          ))}
        </ul>

        <Link
          href={serviceHref(lang, service.id)}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-support-text text-white dark:text-[#0B1017] hover:bg-brand-support-hover shadow-pill transition-colors duration-200 font-semibold"
        >
          {t(T.common.learnMore, lang)}
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="relative min-h-72 lg:min-h-full">
        <Image
          src={service.image}
          alt={t(service.imageAlt, lang)}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}
