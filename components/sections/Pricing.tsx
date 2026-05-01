"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Pricing() {
  const { lang } = useLang();
  const p = T.pricing;

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-secondary mb-4">
            {t(p.eyebrow, lang)}
          </p>
          <h2 className="display-2">
            {t(p.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(p.italicWord, lang)}</span>
          </h2>
          <p className="mt-4 text-ink-secondary text-lg">{t(p.sub, lang)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {p.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-3xl p-7 lg:p-8 transition-all hover:-translate-y-1 ${
                plan.featured
                  ? "shimmer-border text-white md:-translate-y-3 shadow-float-lg"
                  : "bg-white border border-line shadow-card hover:shadow-float-lg"
              }`}
            >
              {plan.featured && plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-accent text-bg-dark text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {t(plan.tag, lang)}
                </div>
              )}
              <h3
                className={`font-display text-2xl mb-2 ${
                  plan.featured ? "text-white" : "text-ink-primary"
                }`}
              >
                {t(plan.name, lang)}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className={`font-display text-5xl ${
                    plan.featured ? "text-white" : "text-ink-primary"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.featured ? "text-white/70" : "text-ink-secondary"
                  }`}
                >
                  {t(plan.period, lang)}
                </span>
              </div>
              <p
                className={`text-[0.7rem] uppercase tracking-[0.18em] mb-3 font-semibold ${
                  plan.featured ? "text-brand-accent" : "text-brand-primary"
                }`}
              >
                Features:
              </p>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2.5 text-sm ${
                      plan.featured ? "text-white/85" : "text-ink-secondary"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0 ${
                        plan.featured ? "bg-brand-accent" : "bg-brand-primary"
                      }`}
                    >
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </span>
                    {t(f, lang)}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "secondary" : "primary"}
                size="md"
                className="w-full"
                onClick={() => (window.location.href = "tel:+13853819161")}
              >
                {t(plan.cta, lang)}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
