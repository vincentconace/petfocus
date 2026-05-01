"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Star } from "lucide-react";
import { LinkButton } from "../ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative w-full bg-white px-3 sm:px-4 pb-3 sm:pb-4 pt-[14px] sm:pt-[18px] lg:pt-[22px] flex flex-col"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* Floating canvas — soft cream base with diffused brand-color washes
          in each corner (burgundy, gold, teal, green). */}
      <div
        className="relative w-full flex-1 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem] flex"
        style={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(139, 35, 50, 0.22) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 0%, rgba(200, 160, 74, 0.20) 0%, transparent 55%)",
            "radial-gradient(circle at 100% 100%, rgba(42, 131, 136, 0.20) 0%, transparent 60%)",
            "radial-gradient(circle at 0% 100%, rgba(45, 110, 78, 0.18) 0%, transparent 55%)",
            "linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 100%)",
          ].join(", "),
        }}
      >
        <BrandWashes />

        {/* 2-column layout: text left / image right.
            Absolute positioning ensures the layout fills the canvas exactly,
            with explicit insets matching the navbar height + bottom margin. */}
        <div className="absolute inset-0 z-10 grid grid-cols-1 lg:grid-cols-2 pt-[88px] sm:pt-[80px] lg:pt-[100px] pb-6 sm:pb-8 lg:pb-10 px-5 sm:px-8 lg:px-12 xl:px-16 gap-6 lg:gap-10">
          {/* Text column — centered vertically within its cell */}
          <div className="flex flex-col items-center justify-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0 min-h-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-line text-brand-primary text-[0.85rem] tracking-[0.14em] uppercase font-brand shadow-pill">
                <Star size={12} className="fill-brand-accent text-brand-accent" />
                {t(T.hero.badge, lang)}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-ink-primary"
              style={{
                marginTop: "clamp(1rem, 2.4vh, 1.5rem)",
                fontSize: "clamp(2rem, 3.5vw + 0.6rem, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              {t(T.hero.headlinePart1, lang)}{" "}
              <span className="italic font-normal text-brand-primary">
                {t(T.hero.italicWord, lang)}
              </span>
              {t(T.hero.headlinePart2, lang) && (
                <>
                  <br className="hidden md:block" />
                  {t(T.hero.headlinePart2, lang)}
                </>
              )}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-ink-secondary"
              style={{
                marginTop: "clamp(0.75rem, 1.8vh, 1.25rem)",
                fontSize: "clamp(0.875rem, 0.4vw + 0.75rem, 1.0625rem)",
                lineHeight: 1.55,
              }}
            >
              {t(T.hero.sub, lang)}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
              style={{ marginTop: "clamp(1rem, 2.4vh, 1.75rem)" }}
            >
              <LinkButton href="#contact" variant="ink" size="lg">
                {t(T.nav.bookVisit, lang)}
                <ArrowRight size={16} />
              </LinkButton>
              <LinkButton
                href="tel:+13853819161"
                variant="ghost"
                size="lg"
              >
                <Phone size={16} />
                {t(T.hero.callText, lang)}
              </LinkButton>
            </motion.div>
          </div>

          {/* Image column — fills the full available height with a margin
              from the canvas edges and from the navbar. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full min-h-0"
          >
            <img
              src="/hero.jpeg"
              alt={t(T.hero.badge, lang)}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrandWashes() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Soft brand-color blobs that diffuse into the cream base. */}
      <div className="absolute -top-10 -left-10 w-[45%] h-[40%] rounded-full bg-brand-primary/15 blur-3xl" />
      <div className="absolute -top-6 right-[-8%] w-[40%] h-[35%] rounded-full bg-brand-accent/20 blur-3xl" />
      <div className="absolute bottom-[-8%] right-[10%] w-[50%] h-[40%] rounded-full bg-brand-secondary/15 blur-3xl" />
      <div className="absolute bottom-[-10%] -left-10 w-[40%] h-[35%] rounded-full bg-brand-accent-2/15 blur-3xl" />
      <div className="absolute top-[40%] left-[35%] w-[30%] h-[25%] rounded-full bg-white/60 blur-3xl" />
    </div>
  );
}
