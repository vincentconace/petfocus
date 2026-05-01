"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import { LinkButton } from "../ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function CoreFeatures() {
  const { lang } = useLang();
  const c = T.core;

  return (
    <section className="py-12 lg:py-16">
      <WashedCard innerClassName="py-16 lg:py-24 px-5 lg:px-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <Badge>{t(c.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">
            {t(c.headlinePart1, lang)}{" "}
            <span className="italic-accent">{t(c.italicWord, lang)}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {c.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-line shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-float-lg transition-all flex flex-col"
            >
              <CoreVisual idx={i} />
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="display-3 mb-4">{t(card.title, lang)}</h3>
                {"items" in card && card.items ? (
                  <ul className="space-y-2 mb-6 flex-1">
                    {card.items.map((it, k) => (
                      <li
                        key={k}
                        className="flex items-start gap-2.5 text-ink-secondary text-sm"
                      >
                        <Check
                          size={16}
                          className="text-brand-secondary mt-0.5 shrink-0"
                        />
                        {t(it, lang)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-ink-secondary leading-relaxed mb-6 flex-1">
                    {t(card.body!, lang)}
                  </p>
                )}
                {"cta" in card && card.cta && (
                  <LinkButton href="#contact" variant="ghost" size="sm" className="self-start">
                    {t(card.cta, lang)} <ArrowRight size={14} />
                  </LinkButton>
                )}
                {!("cta" in card) && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all self-start"
                  >
                    {t(T.common.learnMore, lang)} <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </WashedCard>
    </section>
  );
}

function CoreVisual({ idx }: { idx: number }) {
  if (idx === 0) {
    // Comfort & Support — pet on bed illustration
    return (
      <div className="aspect-[16/10] bg-gradient-to-br from-brand-secondary/15 via-bg-cream to-brand-accent/15 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <ellipse cx="100" cy="100" rx="80" ry="6" fill="#000" opacity="0.05" />
          <rect x="40" y="70" width="120" height="20" rx="10" fill="#E8DFC9" />
          <rect x="50" y="60" width="100" height="20" rx="6" fill="#D6A55C" />
          <ellipse cx="100" cy="60" rx="35" ry="20" fill="#F5D5B8" />
          <circle cx="85" cy="55" r="2" fill="#1A1A1A" />
          <circle cx="115" cy="55" r="2" fill="#1A1A1A" />
          <ellipse cx="100" cy="62" rx="3" ry="2" fill="#1A1A1A" />
          <path d="M97 64 Q 100 70 103 64" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path
            d="M70 50 Q 65 38 80 40 M 130 50 Q 135 38 120 40"
            stroke="#D6A55C"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <g transform="translate(150, 30)" fill="#8B2332">
            <path d="M5 9 Q 0 4 2 1 Q 5 -1 7 2 Q 10 -1 13 1 Q 15 4 10 9 Q 7 11 5 9 Z" />
          </g>
        </svg>
      </div>
    );
  }
  if (idx === 1) {
    // Additional Services — grooming kit
    return (
      <div className="aspect-[16/10] bg-gradient-to-br from-brand-accent/20 via-bg-cream to-brand-primary/10 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <ellipse cx="100" cy="105" rx="60" ry="4" fill="#000" opacity="0.05" />
          {/* nail clipper */}
          <g transform="translate(40, 40)">
            <rect x="0" y="20" width="50" height="6" rx="3" fill="#8B2332" />
            <rect x="20" y="0" width="6" height="40" rx="3" fill="#C8A04A" />
            <rect x="0" y="35" width="50" height="6" rx="3" fill="#8B2332" />
          </g>
          {/* paw */}
          <g transform="translate(120, 50)" fill="#2A8388">
            <ellipse cx="20" cy="30" rx="14" ry="10" />
            <circle cx="8" cy="14" r="5" />
            <circle cx="20" cy="8" r="5" />
            <circle cx="32" cy="14" r="5" />
            <circle cx="38" cy="26" r="4" />
          </g>
          {/* sparkles */}
          <g fill="#C8A04A">
            <path d="M170 30 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z" />
            <path d="M30 90 l 1.5 4.5 l 4.5 1.5 l -4.5 1.5 l -1.5 4.5 l -1.5 -4.5 l -4.5 -1.5 l 4.5 -1.5 z" />
          </g>
        </svg>
      </div>
    );
  }
  // Mobile Veterinary Care — van + house
  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-brand-primary/10 via-bg-cream to-brand-secondary/15 flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <ellipse cx="100" cy="105" rx="80" ry="4" fill="#000" opacity="0.05" />
        {/* House */}
        <g transform="translate(20, 40)">
          <path d="M0 30 L 30 5 L 60 30 Z" fill="#8B2332" />
          <rect x="5" y="30" width="50" height="40" fill="#FAF6EE" stroke="#E8DFC9" />
          <rect x="22" y="44" width="16" height="26" fill="#8B2332" rx="1" />
        </g>
        {/* Van */}
        <g transform="translate(100, 50)">
          <rect x="0" y="10" width="70" height="35" rx="6" fill="#fff" stroke="#1A1A1A" strokeWidth="1.5" />
          <rect x="50" y="14" width="18" height="18" rx="2" fill="#2A8388" opacity="0.85" />
          <rect x="6" y="14" width="40" height="14" rx="2" fill="#fff" />
          <text
            x="26"
            y="26"
            fill="#8B2332"
            fontFamily="Georgia"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
          >
            PetFocus
          </text>
          <circle cx="14" cy="48" r="6" fill="#1A1A1A" />
          <circle cx="14" cy="48" r="2.5" fill="#666" />
          <circle cx="56" cy="48" r="6" fill="#1A1A1A" />
          <circle cx="56" cy="48" r="2.5" fill="#666" />
          {/* cross icon */}
          <g transform="translate(28, 16)">
            <rect x="-3" y="-7" width="6" height="14" fill="#8B2332" rx="1" />
            <rect x="-7" y="-3" width="14" height="6" fill="#8B2332" rx="1" />
          </g>
        </g>
        {/* dotted route */}
        <path
          d="M 80 75 Q 90 60 100 75"
          stroke="#C8A04A"
          strokeWidth="2"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>
    </div>
  );
}
