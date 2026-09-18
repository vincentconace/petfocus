"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { LinkButton } from "../ui/Button";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function FinalCTA() {
  const { lang } = useLang();
  const c = T.finalCta;

  return (
    <section id="contact" className="relative py-12 lg:py-16">
      <WashedCard innerClassName="py-20 lg:py-28 px-5 lg:px-10 shadow-float-lg">
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-brand-primary mb-5 font-semibold"
          >
            {t(c.eyebrow, lang)}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="display-1 text-ink-primary"
          >
            {t(c.headlinePart1, lang)}{" "}
            <span className="italic text-brand-primary">{c.italicWord}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 text-ink-secondary text-lg max-w-xl mx-auto"
          >
            {t(c.family, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <LinkButton href="tel:+13853819161" variant="primary" size="lg">
              <Phone size={16} aria-hidden="true" />
              {t(T.contact.call, lang)}
            </LinkButton>
            <LinkButton href="sms:+13853819161" variant="ghost" size="lg">
              <MessageCircle size={16} aria-hidden="true" />
              {t(T.contact.message, lang)}
            </LinkButton>
          </motion.div>
          <p className="mt-5 text-sm text-ink-secondary">385-381-9161</p>
        </div>
      </WashedCard>
    </section>
  );
}
