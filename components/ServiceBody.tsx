"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Phone, ArrowRight } from "lucide-react";
import { LinkButton } from "./ui/Button";
import Badge from "./ui/Badge";
import ServiceCard from "./ServiceCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { SERVICES, type Service } from "@/lib/services";
import { sectionHref } from "@/lib/routes";

/**
 * The service page body, driven entirely by `lib/services.ts`.
 *
 * Block order follows the reference site plus the "how it's performed" section
 * the client asked for:
 *   image → intro → what's included → how the visit works → related → CTA
 */
export default function ServiceBody({ service }: { service: Service }) {
  const { lang } = useLang();
  const isSetApart = Boolean(service.setApart);
  const accent = isSetApart
    ? "text-brand-support-text"
    : "text-brand-primary";

  const related = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* Intro + what's included */}
          <div>
            <p className="text-lg text-ink-secondary leading-relaxed">
              {t(service.intro, lang)}
            </p>

            <h2 className="display-3 mt-12 mb-6">
              {t(T.services.includes, lang)}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {service.includes.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="flex items-start gap-2.5 text-ink-secondary"
                >
                  <Check size={17} className={`${accent} mt-0.5 shrink-0`} />
                  <span>{t(item, lang)}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <LinkButton
                href="tel:+13853819161"
                variant={isSetApart ? "support" : "primary"}
                size="lg"
              >
                <Phone size={16} />
                {t(T.nav.callUs, lang)}
              </LinkButton>
              <span className="text-ink-secondary">385-381-9161</span>
            </div>
          </div>

          {/* The same service-specific photograph appears on its summary card. */}
          <div className="lg:sticky lg:top-28">
            <Image
              src={service.image}
              alt={t(service.imageAlt, lang)}
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-card"
            />
          </div>
        </div>
      </section>

      {/* How the visit works */}
      <section className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div
          className="brand-wash-flat mx-auto max-w-7xl rounded-[2rem] sm:rounded-[2.5rem] border border-line shadow-card overflow-hidden"
        >
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
              <Badge>{t(T.visit.badge, lang)}</Badge>
              <h2 className="display-2 mt-5">{t(T.visit.headline, lang)}</h2>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {T.visit.steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative"
                >
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${
                      isSetApart ? "bg-brand-support-text" : "bg-brand-primary"
                    } text-white font-extrabold text-sm shadow-pill`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="subhead text-xl mt-4 mb-2">
                    {t(step.title, lang)}
                  </h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">
                    {t(step.desc, lang)}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="px-3 sm:px-5 lg:px-8 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="display-3">{t(T.services.related, lang)}</h2>
            <Link
              href={sectionHref(lang, "services")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all shrink-0"
            >
              {t(T.services.backToAll, lang)}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
