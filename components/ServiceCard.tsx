"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Microscope,
  Activity,
  Smile,
  Scissors,
  HeartPulse,
  Sparkles,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { serviceHref } from "@/lib/routes";
import type { Service } from "@/lib/services";

export const SERVICE_ICONS: Record<string, typeof Stethoscope> = {
  wellness: Stethoscope,
  laboratory: Microscope,
  diagnostics: Activity,
  dental: Smile,
  surgery: Scissors,
  medical: HeartPulse,
  technician: Sparkles,
  "end-of-life": Heart,
};

/**
 * Summary card — title + one-line tagline, never the full bullet list.
 * Shared by the home grid and the /services index so the two can't drift.
 */
export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const { lang } = useLang();
  const Icon = SERVICE_ICONS[service.id] ?? Stethoscope;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        href={serviceHref(lang, service.id)}
        className="group h-full flex flex-col overflow-hidden bg-bg-surface rounded-3xl border border-line shadow-card hover:-translate-y-1 hover:shadow-float-lg transition-all"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle">
          <Image
            src={service.image}
            alt={t(service.imageAlt, lang)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col flex-1 p-6 lg:p-7">
          <div
            className={`w-10 h-10 rounded-full ${
              index % 2 === 0 ? "bg-brand-support" : "bg-brand-primary"
            } text-white flex items-center justify-center mb-5 shadow-pill`}
          >
            <Icon size={19} aria-hidden="true" />
          </div>
          <h3 className="display-3 mb-2.5">{t(service.title, lang)}</h3>
          <p className="text-ink-secondary text-sm leading-relaxed flex-1">
            {t(service.tagline, lang)}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary group-hover:gap-2.5 transition-all">
            {t(T.common.learnMore, lang)}
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
