"use client";

import Link from "next/link";
import Logo from "./ui/Logo";
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Star } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { homeHref, sectionHref, serviceHref } from "@/lib/routes";
import { SOCIAL_PROFILES } from "@/lib/social";

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  google: Star,
} as const;

export default function Footer() {
  const { lang } = useLang();

  const home = homeHref(lang);

  const cols = [
    {
      title: t(T.footer.cols.services, lang),
      links: SERVICES.map((service) => ({
        label: t(service.title, lang),
        href: serviceHref(lang, service.id),
      })),
    },
    {
      title: t(T.footer.cols.company, lang),
      links: [
        { label: t(T.services.backToAll, lang), href: sectionHref(lang, "services") },
        { label: t(T.nav.about, lang), href: sectionHref(lang, "about") },
        { label: t(T.nav.area, lang), href: `${home}#area` },
        { label: t(T.nav.contact, lang), href: `${home}#contact` },
      ],
    },
  ];

  return (
    <footer className="brand-wash relative text-ink-primary overflow-hidden border-t border-line">
      {/* Soft brand-color blobs */}
      <div className="absolute -top-10 -left-10 w-[35%] h-[60%] rounded-full bg-brand-primary/12 blur-3xl pointer-events-none" />
      <div className="absolute -top-6 right-[-6%] w-[35%] h-[60%] rounded-full bg-brand-support/13 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-12%] right-[15%] w-[40%] h-[60%] rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* §05 — no shadow on the logo, and no hand-set wordmark beside
                it: the horizontal lockup already carries the name and the
                "Mobile Veterinary Service" line. */}
            <Logo variant="horizontal" width={210} />
            <p className="mt-6 text-ink-secondary max-w-sm leading-relaxed">
              {t(T.footer.tagline, lang)}
            </p>
            <p className="mt-2 text-ink-secondary">
              {t(T.finalCta.family, lang)}
            </p>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="label-text text-brand-support-text mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3 text-ink-secondary text-sm">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-text text-brand-support-text mb-4">
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
                  href="sms:+13853819161"
                  className="flex items-center gap-2 hover:text-brand-primary transition-colors"
                >
                  <MessageCircle size={14} className="text-brand-primary" /> {t(T.contact.message, lang)}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-primary" /> Northern Utah
              </li>
            </ul>
            {SOCIAL_PROFILES.length > 0 && (
              <div className="mt-6 flex gap-3">
                {SOCIAL_PROFILES.map(({ id, label, href }) => {
                  const Icon = SOCIAL_ICONS[id];
                  return (
                  <a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-bg-surface border border-line text-ink-secondary hover:bg-brand-primary hover:text-white hover:border-brand-primary flex items-center justify-center transition-colors shadow-pill"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle">
          <p>{t(T.footer.rights, lang)}</p>
          <div className="flex items-center gap-5">
            <Link
              href={sectionHref(lang, "privacy")}
              className="hover:text-brand-primary transition-colors"
            >
              {t(T.legal.privacyShort, lang)}
            </Link>
            <Link
              href={sectionHref(lang, "terms")}
              className="hover:text-brand-primary transition-colors"
            >
              {t(T.legal.termsShort, lang)}
            </Link>
            <span className="">Made with ♥ in Utah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
