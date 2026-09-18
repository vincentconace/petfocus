"use client";

import { useId, useState } from "react";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t, type Lang } from "@/lib/i18n";
import geometry from "@/lib/service-area-geometry.json";

const COUNTY_KEYS = ["davis", "salt-lake", "tooele", "utah"];
const COUNTIES = COUNTY_KEYS.map((key) => geometry.counties.find((county) => county.key === key)!);

function countyName(name: string, lang: Lang) {
  const title = name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
  return lang === "es" ? `Condado de ${title}` : `${title} County`;
}

function mapsHref(name: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} County, Utah, USA`)}`;
}

export default function ServiceArea() {
  const { lang } = useLang();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const id = useId();
  const c = T.area;
  const linkLabel = (name: string) => `${countyName(name, lang)} — ${t(c.openMap, lang)} (${t(c.newTab, lang)})`;

  return (
    <section id="area" className="py-12 lg:py-16" aria-labelledby={`${id}-heading`}>
      <WashedCard innerClassName="py-16 lg:py-24 px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge>{t(c.badge, lang)}</Badge>
          <h2 id={`${id}-heading`} className="display-2 mt-5">{t(c.headline, lang)}</h2>
          <p className="mt-4 text-ink-secondary text-lg">{t(c.sub, lang)}</p>
        </div>

        <div className="coverage-panel mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-bg-surface shadow-card grid lg:grid-cols-[1.65fr_1fr]">
          <div className="coverage-map relative flex items-center overflow-hidden bg-bg-subtle">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-brand-primary">
              <span className="h-2 w-2 rounded-full bg-brand-support" />
              {t(c.fourCounties, lang)}
            </div>
            <svg
              viewBox={geometry.viewBox}
              className="block w-full h-auto"
              role="group"
              aria-labelledby={`${id}-title ${id}-description`}
            >
              <title id={`${id}-title`}>{t(c.mapTitle, lang)}</title>
              <desc id={`${id}-description`}>{t(c.mapDescription, lang)}</desc>

              <g aria-hidden="true" className="coverage-context">
                {geometry.counties.filter((county) => !county.served).map((county) => (
                  <path key={county.key} d={county.path} fillRule="evenodd" />
                ))}
              </g>

              {COUNTIES.map((county) => (
                <a
                  key={county.key}
                  href={mapsHref(county.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  aria-label={linkLabel(county.name)}
                  className="coverage-county"
                  data-county={county.key}
                  data-active={activeKey === county.key}
                  onMouseEnter={() => setActiveKey(county.key)}
                  onMouseLeave={() => setActiveKey(null)}
                  onFocus={() => setActiveKey(county.key)}
                  onBlur={() => setActiveKey(null)}
                >
                  <path d={county.path} fillRule="evenodd" />
                  <text x={county.label[0]} y={county.label[1]} textAnchor="middle" dominantBaseline="middle" aria-hidden="true">
                    {county.name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
                  </text>
                </a>
              ))}

              <g aria-hidden="true" className="coverage-compass" transform="translate(762 40)">
                <text textAnchor="middle" y="-10">N</text>
                <path d="M0 0 L-5 17 L0 13 L5 17 Z" />
              </g>
            </svg>

            <div className="coverage-inset absolute hidden sm:block right-5 top-16 rounded-xl border border-line bg-bg-surface/95 p-2" aria-hidden="true">
              <svg viewBox="0 0 100 132" className="w-12 sm:w-16">
                {geometry.counties.map((county) => (
                  <path key={county.key} d={county.statePath} className={county.served ? "coverage-inset-served" : "coverage-inset-context"} fillRule="evenodd" />
                ))}
              </svg>
              <p className="mt-1 text-center text-[0.6rem] font-semibold tracking-wider text-ink-secondary">UTAH</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-9 border-t lg:border-t-0 lg:border-l border-line">
            <h3 className="subhead text-2xl">{t(c.chooseCounty, lang)}</h3>
            <p className="mt-3 mb-6 text-sm leading-relaxed text-ink-secondary">{t(c.instructions, lang)}</p>
            <ul className="space-y-2">
              {COUNTIES.map((county) => (
                <li key={county.key}>
                  <a
                    href={mapsHref(county.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkLabel(county.name)}
                    className="coverage-county-link group flex items-center gap-3 rounded-2xl border border-line p-4 transition-colors hover:bg-bg-subtle hover:border-brand-primary/40"
                    data-county={county.key}
                    data-active={activeKey === county.key}
                    onMouseEnter={() => setActiveKey(county.key)}
                    onMouseLeave={() => setActiveKey(null)}
                    onFocus={() => setActiveKey(county.key)}
                    onBlur={() => setActiveKey(null)}
                  >
                    <span className="coverage-dot h-3 w-3 rounded-full shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-sm text-ink-primary">{countyName(county.name, lang)}</span>
                    <ArrowUpRight size={17} className="ml-auto text-ink-secondary group-hover:text-brand-primary" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-xs text-ink-secondary">
              <MapPin size={14} aria-hidden="true" />
              {t(c.openMap, lang)}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-4 flex flex-col sm:flex-row justify-between gap-3 text-xs text-ink-secondary">
          <a href="https://gis.utah.gov/products/sgid/boundaries/county/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-brand-primary">
            {t(c.boundaries, lang)}
          </a>
          <span>{t(c.newTab, lang)}</span>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-ink-secondary">{t(c.outside, lang)}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-brand-primary">
            <a href="tel:+13853819161" className="inline-flex items-center gap-2 py-2 hover:underline"><Phone size={15} aria-hidden="true" />385-381-9161</a>
            <a href="sms:+13853819161" className="inline-flex items-center gap-2 py-2 hover:underline"><MessageCircle size={15} aria-hidden="true" />{t(T.contact.message, lang)}</a>
          </div>
        </div>
      </WashedCard>
    </section>
  );
}
