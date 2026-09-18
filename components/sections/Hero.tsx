"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Pause, Phone, Play, Star } from "lucide-react";
import { LinkButton } from "../ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useLang();
  const [paused, setPaused] = useState(false);

  return (
    <section id="home" aria-labelledby="hero-title" className="hero-shell">
      <div className="hero-canvas" data-paused={paused}>
        <div className="hero-media">
          <Image
            src="/images/hero-home.webp"
            alt={t(T.hero.imageAlt, lang)}
            fill
            priority
            sizes="100vw"
            className="hero-photograph"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-eyebrow label-text">
            <Star size={12} aria-hidden="true" />
            {t(T.hero.badge, lang)}
          </span>
          <h1 id="hero-title" className="hero-title">
            {t(T.hero.headlinePart1, lang)}{" "}
            <span>{t(T.hero.italicWord, lang)}</span>
            {t(T.hero.headlinePart2, lang) && (
              <> {t(T.hero.headlinePart2, lang)}</>
            )}
          </h1>
          <p className="hero-description">{t(T.hero.sub, lang)}</p>
          <div className="hero-actions">
            <LinkButton href="tel:+13853819161" variant="primary" size="lg">
              {t(T.nav.callUs, lang)}
              <ArrowRight size={16} aria-hidden="true" />
            </LinkButton>
            <a href="tel:+13853819161" className="hero-phone">
              <Phone size={16} aria-hidden="true" />
              385-381-9161
            </a>
          </div>
        </div>
        <div className="hero-caption" aria-hidden="true">
          <span className="hero-caption-dot" />
          {t(T.hero.sceneCaption, lang)}
        </div>
        <button
          type="button"
          className="hero-motion-control"
          onClick={() => setPaused((value) => !value)}
          aria-label={t(paused ? T.hero.resumeMotion : T.hero.pauseMotion, lang)}
          aria-pressed={paused}
        >
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          <span>{t(paused ? T.hero.resumeMotion : T.hero.pauseMotion, lang)}</span>
        </button>
      </div>
    </section>
  );
}
