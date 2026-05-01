"use client";

import Logo from "./ui/Logo";
import { Phone, Mail, MapPin, Instagram, Facebook, Star } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();

  const cols = [
    {
      title: t(T.footer.cols.services, lang),
      links: [
        t(T.services.preventive.title, lang),
        t(T.services.diagnostics.title, lang),
        t(T.services.dental.title, lang),
        t(T.services.surgery.title, lang),
      ],
    },
    {
      title: t(T.footer.cols.company, lang),
      links: [
        t(T.nav.about, lang),
        t(T.nav.area, lang),
        t(T.blog.badge, lang),
        t(T.nav.contact, lang),
      ],
    },
  ];

  return (
    <footer
      className="relative text-ink-primary overflow-hidden"
      style={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(139, 35, 50, 0.18) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(200, 160, 74, 0.18) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(42, 131, 136, 0.16) 0%, transparent 55%)",
          "radial-gradient(circle at 0% 100%, rgba(45, 110, 78, 0.16) 0%, transparent 50%)",
          "linear-gradient(180deg, #FAF6EE 0%, #FFFFFF 100%)",
        ].join(", "),
      }}
    >
      {/* Soft brand-color blobs */}
      <div className="absolute -top-10 -left-10 w-[35%] h-[60%] rounded-full bg-brand-primary/12 blur-3xl pointer-events-none" />
      <div className="absolute -top-6 right-[-6%] w-[35%] h-[60%] rounded-full bg-brand-accent/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-12%] right-[15%] w-[40%] h-[60%] rounded-full bg-brand-secondary/12 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={44} showText={false} className="shadow-pill" />
              <div>
                <div className="font-display text-2xl text-ink-primary">PetFocus</div>
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-ink-secondary mt-0.5 font-brand">
                  Mobile Veterinary Service
                </div>
              </div>
            </div>
            <p className="mt-6 text-ink-secondary max-w-sm leading-relaxed">
              {t(T.footer.tagline, lang)}
            </p>
            <p className="mt-2 text-ink-secondary italic font-display">
              {t(T.finalCta.family, lang)}
            </p>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="text-xs uppercase tracking-[0.18em] text-brand-primary font-brand mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3 text-ink-secondary text-sm">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="hover:text-brand-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-brand-primary font-brand mb-4">
              {t(T.footer.cols.contact, lang)}
            </h4>
            <ul className="space-y-3 text-ink-secondary text-sm">
              <li>
                <a
                  href="tel:+13853819161"
                  className="flex items-center gap-2 hover:text-brand-primary transition-colors"
                >
                  <Phone size={14} className="text-brand-primary" /> 385-381-9161
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@petfocus.com"
                  className="flex items-center gap-2 hover:text-brand-primary transition-colors"
                >
                  <Mail size={14} className="text-brand-primary" /> hello@petfocus.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-primary" /> Northern Utah
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Star].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-line text-ink-secondary hover:bg-brand-primary hover:text-white hover:border-brand-primary flex items-center justify-center transition-colors shadow-pill"
                  aria-label="social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <p>{t(T.footer.rights, lang)}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-brand-primary transition-colors">
              Terms
            </a>
            <span className="font-display italic">Made with ♥ in Utah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
