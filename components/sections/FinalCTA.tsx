"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Mail, Check } from "lucide-react";
import { LinkButton, Button } from "../ui/Button";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function FinalCTA() {
  const { lang } = useLang();
  const c = T.finalCta;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="relative py-12 lg:py-16">
      <WashedCard innerClassName="py-20 lg:py-28 px-5 lg:px-10 shadow-float-lg">
        <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-brand-primary mb-5 font-brand"
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
            {t(T.nav.bookVisit, lang)}
            <ArrowRight size={16} />
          </LinkButton>
          <LinkButton href="tel:+13853819161" variant="ghost" size="lg">
            <Phone size={16} />
            385-381-9161
          </LinkButton>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/80 backdrop-blur-sm border border-line rounded-full p-2 shadow-pill">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Mail size={16} className="text-ink-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t(c.placeholder, lang)}
                className="flex-1 bg-transparent text-ink-primary placeholder:text-ink-subtle outline-none text-sm py-2"
              />
            </div>
            <Button type="submit" variant="primary" size="md">
              {submitted ? <Check size={16} /> : t(c.subscribe, lang)}
            </Button>
          </div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-brand-accent-2 font-medium"
            >
              {lang === "en"
                ? "Thank you! We'll be in touch."
                : "¡Gracias! Le contactaremos pronto."}
            </motion.p>
          )}
        </motion.form>
        </div>
      </WashedCard>
    </section>
  );
}
