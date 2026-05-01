"use client";

import { motion } from "framer-motion";
import { Stethoscope, Microscope, Smile, Scissors } from "lucide-react";
import { ReactNode } from "react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Services() {
  const { lang } = useLang();

  const cards: {
    icon: ReactNode;
    iconBg: string;
    title: string;
    items: string[];
  }[] = [
    {
      icon: <Stethoscope size={26} />,
      iconBg: "bg-brand-secondary",
      title: t(T.services.preventive.title, lang),
      items: T.services.preventive.items.map((i) => t(i, lang)),
    },
    {
      icon: <Microscope size={26} />,
      iconBg: "bg-brand-primary",
      title: t(T.services.diagnostics.title, lang),
      items: T.services.diagnostics.items.map((i) => t(i, lang)),
    },
    {
      icon: <Smile size={26} />,
      iconBg: "bg-brand-secondary",
      title: t(T.services.dental.title, lang),
      items: T.services.dental.items.map((i) => t(i, lang)),
    },
    {
      icon: <Scissors size={26} />,
      iconBg: "bg-brand-primary",
      title: t(T.services.surgery.title, lang),
      items: T.services.surgery.items.map((i) => t(i, lang)),
    },
  ];

  return (
    <section id="services" className="py-12 lg:py-16">
      <WashedCard innerClassName="py-16 lg:py-24 px-5 lg:px-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <Badge>{t(T.services.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(T.services.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(T.services.italicWord, lang)}</span>
          </h2>
          <p className="mt-4 text-ink-secondary text-lg">{t(T.services.sub, lang)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group bg-white rounded-3xl border border-line p-7 lg:p-9 shadow-card hover:-translate-y-1 hover:shadow-float-lg transition-all"
            >
              <div
                className={`w-14 h-14 rounded-full ${c.iconBg} text-white flex items-center justify-center mb-5 shadow-pill`}
              >
                {c.icon}
              </div>
              <h3 className="display-3 mb-5">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-ink-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </WashedCard>
    </section>
  );
}
