"use client";

import { motion } from "framer-motion";
import { HomeIcon, Languages, Clock, ShieldCheck } from "lucide-react";
import Badge from "../ui/Badge";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

const ICONS = [
  <HomeIcon size={22} key="h" />,
  <Languages size={22} key="l" />,
  <Clock size={22} key="c" />,
  <ShieldCheck size={22} key="s" />,
];

export default function Features() {
  const { lang } = useLang();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <Badge>{t(T.features.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(T.features.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(T.features.italicWord, lang)}</span>
          </h2>
          <p className="mt-4 text-ink-secondary text-lg">{t(T.features.sub, lang)}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {T.features.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-7 lg:p-8 bg-white rounded-3xl border border-line shadow-card hover:-translate-y-1 hover:shadow-float-lg transition-all"
            >
              <span className="inline-block text-[0.6rem] uppercase tracking-[0.18em] text-brand-primary font-semibold mb-4 px-3 py-1 rounded-full bg-brand-primary/10">
                {t(item.tag, lang)}
              </span>
              <div className="w-12 h-12 rounded-full bg-bg-cream text-brand-primary flex items-center justify-center mb-5 border border-line-warm/70 shadow-pill">
                {ICONS[i]}
              </div>
              <h3 className="font-display text-xl text-ink-primary mb-2 leading-tight">
                {t(item.title, lang)}
              </h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                {t(item.desc, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
