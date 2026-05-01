"use client";

import { Star } from "lucide-react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Testimonials() {
  const { lang } = useLang();
  const items = T.testimonials.items;
  // Duplicate for infinite marquee
  const looped = [...items, ...items];

  return (
    <section className="py-12 lg:py-16">
      <WashedCard innerClassName="py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto px-5 lg:px-10 mb-12">
          <Badge>{t(T.testimonials.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(T.testimonials.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(T.testimonials.italicWord, lang)}</span>{" "}
            {t(T.testimonials.headlinePart2, lang)}
          </h2>
          <p className="mt-4 text-ink-secondary text-lg">
            {t(T.testimonials.sub, lang)}
          </p>
        </div>

        <div className="marquee-mask">
          <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
            {looped.map((item, i) => (
              <article
                key={i}
                className="w-[340px] sm:w-[400px] shrink-0 bg-white rounded-3xl border border-line p-7 shadow-card"
              >
              <div className="flex gap-0.5 mb-4">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={14} className="text-brand-accent fill-brand-accent" />
                ))}
              </div>
              <p className="text-ink-secondary leading-relaxed mb-5 italic">
                "{t(item.quote, lang)}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary flex items-center justify-center text-white font-display text-lg shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-ink-primary">{item.name}</div>
                  <div className="text-sm text-ink-secondary">{t(item.role, lang)}</div>
                </div>
              </div>
              </article>
            ))}
          </div>
        </div>
      </WashedCard>
    </section>
  );
}
