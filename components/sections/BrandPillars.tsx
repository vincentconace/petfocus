"use client";

import { motion } from "framer-motion";
import { Heart, HandHeart, House } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function BrandPillars() {
  const { lang } = useLang();

  const pillars = [
    {
      icon: <Heart size={24} />,
      bg: "bg-brand-primary",
      title: t(T.pillars.care.title, lang),
      desc: t(T.pillars.care.desc, lang),
    },
    {
      icon: <HandHeart size={24} />,
      bg: "bg-brand-secondary",
      title: t(T.pillars.compassion.title, lang),
      desc: t(T.pillars.compassion.desc, lang),
    },
    {
      icon: <House size={24} />,
      bg: "bg-brand-accent-2",
      title: t(T.pillars.convenience.title, lang),
      desc: t(T.pillars.convenience.desc, lang),
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-secondary mb-4">
            {t(T.pillars.eyebrow, lang)}
          </p>
          <h2 className="display-2">{t(T.pillars.headline, lang)}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white hover:bg-bg-cream/70 rounded-3xl p-8 border border-line transition-all hover:-translate-y-1 hover:shadow-float-lg shadow-card"
            >
              <div
                className={`w-14 h-14 rounded-full ${p.bg} text-white flex items-center justify-center mb-5 shadow-pill group-hover:scale-110 transition-transform`}
              >
                {p.icon}
              </div>
              <h3 className="display-3 mb-2">{p.title}</h3>
              <p className="text-ink-secondary leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
