"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

/**
 * Navbar geometry scales with viewport width:
 *  - mobile (< 640):  shorter strip + pill, smaller corner radii
 *  - tablet (< 1024): mid sizes
 *  - desktop:         full sizes
 *
 * The constants below are exposed so other sections (Hero) can match the
 * page padding-top to the navbar height at runtime.
 */
function useNavGeometry() {
  const [vw, setVw] = useState(0); // 0 = not yet measured (SSR / pre-mount)
  const mounted = vw > 0;

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Use desktop defaults when not yet measured so the static fallback
  // matches the most common case visually.
  const effectiveVw = mounted ? vw : 1440;
  const isMobile = effectiveVw < 640;
  const isTablet = effectiveVw >= 640 && effectiveVw < 1024;

  const stripH = isMobile ? 14 : isTablet ? 18 : 22;
  const navH = isMobile ? 84 : isTablet ? 70 : 86;
  const concaveR = isMobile ? 14 : isTablet ? 18 : 22;
  const pillR = isMobile ? 20 : isTablet ? 24 : 28;

  // Pill width — narrower than the hero canvas so the concave outer corners
  // stay over the blue canvas (not the white side margins). This replicates
  // the desktop "menu inside the hero" effect on every breakpoint.
  // Hero canvas margin: px-3 (12px) mobile, px-4 (16px) tablet+.
  const sidePadding = isMobile ? 12 : 16;
  const concaveBuffer = 4; // breathing room between concave corner and canvas edge
  const geometricMax =
    effectiveVw - 2 * (sidePadding + concaveR + concaveBuffer);
  const ergonomicMax = isMobile
    ? effectiveVw - 16
    : isTablet
      ? 760
      : 1080;
  const maxPillW = Math.min(geometricMax, ergonomicMax);
  const minPillW = Math.min(
    maxPillW,
    isMobile ? 280 : isTablet ? 540 : 720
  );
  const targetFraction = isMobile ? 0.76 : isTablet ? 0.78 : 0.62;
  const targetPillW = Math.round(effectiveVw * targetFraction);
  const pillW = Math.max(minPillW, Math.min(targetPillW, maxPillW));

  return {
    vw: effectiveVw,
    stripH,
    navH,
    concaveR,
    pillR,
    pillW,
    isMobile,
    mounted,
  };
}

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { vw, stripH, navH, concaveR, pillR, pillW, mounted } =
    useNavGeometry();

  const primaryItems = [
    { label: t(T.nav.home, lang), href: "#home" },
    { label: t(T.nav.services, lang), href: "#services" },
    { label: t(T.nav.about, lang), href: "#about" },
    { label: t(T.nav.contact, lang), href: "#contact" },
  ];

  const moreItems = [
    { label: t(T.nav.area, lang), href: "#area" },
    { label: t(T.blog.badge, lang), href: "#blog" },
    { label: t(T.pricing.eyebrow, lang), href: "#pricing" },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 h-[84px] sm:h-[70px] lg:h-[86px]"
    >
      {/* SSR-safe fallback: a flat white silhouette (no JS-computed SVG) so
          the server-rendered HTML matches the client's first render. After
          mount, swap in the pixel-accurate, viewport-aware silhouette. */}
      {mounted ? (
        <NavSilhouette
          vw={vw}
          navH={navH}
          stripH={stripH}
          concaveR={concaveR}
          pillR={pillR}
          pillW={pillW}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-white rounded-b-[36px]"
        />
      )}

      {/* Foreground content — sits in the lower portion of the pill so the
          logo and buttons drop closer to the bottom curve. */}
      <nav
        aria-label="Primary"
        className="absolute inset-x-0 top-0 h-[84px] sm:h-[70px] lg:h-[86px] flex items-center justify-center pt-[14px] sm:pt-[18px] lg:pt-[22px]"
      >
        <div
          className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 w-full px-4 sm:px-6"
          style={{ maxWidth: pillW - 24 }}
        >
          {/* Logo (favicon) */}
          <a
            href="#home"
            aria-label="PetFocus home"
            className="flex items-center shrink-0"
          >
            <Logo size={80} showText={false} className="sm:hidden" />
            <Logo size={100} showText={false} className="hidden sm:flex" />
          </a>

          {/* Middle grid column — always present so the column structure is
              preserved on mobile (empty) and desktop (menu links centered). */}
          <div className="flex items-center justify-center min-w-0">
            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {primaryItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="px-3 xl:px-4 py-2 rounded-full text-[0.92rem] xl:text-[0.95rem] text-ink-secondary hover:text-ink-primary hover:bg-bg-cream transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setMoreOpen(false), 120)}
                  className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full text-[0.92rem] xl:text-[0.95rem] text-ink-secondary hover:text-ink-primary hover:bg-bg-cream transition-colors cursor-pointer"
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  {lang === "en" ? "Pages" : "Más"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-52 rounded-3xl bg-white border border-line shadow-float-lg p-2"
                    >
                      {moreItems.map((m) => (
                        <a
                          key={m.href}
                          href={m.href}
                          className="block px-3 py-2 rounded-2xl text-sm text-ink-secondary hover:text-ink-primary hover:bg-bg-cream transition-colors"
                        >
                          {m.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>

          {/* Right cluster — pushed to the far right */}
          <div className="flex items-center gap-2 shrink-0">
            <LangToggle
              lang={lang}
              onChange={setLang}
              className="hidden md:inline-flex"
            />
            <LinkButton
              href="tel:+13853819161"
              variant="ink"
              size="sm"
              className="inline-flex !w-12 !h-12 !p-0 sm:!w-auto sm:!h-auto sm:!px-4 sm:!py-2"
              aria-label={t(T.nav.bookVisit, lang)}
            >
              <Phone size={18} className="sm:!w-3.5 sm:!h-3.5" />
              <span className="hidden sm:inline md:hidden">
                {lang === "en" ? "Book" : "Reservar"}
              </span>
              <span className="hidden md:inline">{t(T.nav.bookVisit, lang)}</span>
            </LinkButton>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid place-items-center w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-bg-cream text-ink-primary hover:bg-line transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={22} className="sm:!w-5 sm:!h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-dark/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute right-3 top-3 bottom-3 w-[88%] max-w-sm bg-white rounded-3xl p-6 flex flex-col shadow-float-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <a href="#home" className="flex items-center gap-2.5">
                  <Logo size={40} showText={false} />
                  <span className="font-display text-lg font-semibold text-ink-primary">
                    PetFocus
                  </span>
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="grid place-items-center w-10 h-10 rounded-full bg-bg-cream text-ink-primary hover:bg-line transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <LangToggle
                lang={lang}
                onChange={setLang}
                className="mb-6 self-start"
              />
              <ul className="flex flex-col gap-1">
                {[...primaryItems, ...moreItems].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-2xl text-base font-medium text-ink-primary hover:bg-bg-cream transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <LinkButton
                href="tel:+13853819161"
                variant="ink"
                size="lg"
                className="mt-8"
              >
                <Phone size={16} />
                {t(T.nav.bookVisit, lang)}
              </LinkButton>
              <p className="mt-4 text-sm text-ink-secondary px-2">
                385-381-9161
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Pixel-accurate SVG silhouette: viewBox is set to the actual viewport width
 * each render so corner radii stay perfectly circular at any screen width.
 *
 * Geometry invariant: stripH + concaveR + pillR <= navH so the pill's vertical
 * side never inverts.
 */
function NavSilhouette({
  vw,
  navH,
  stripH,
  concaveR,
  pillR,
  pillW,
}: {
  vw: number;
  navH: number;
  stripH: number;
  concaveR: number;
  pillR: number;
  pillW: number;
}) {
  const W = vw;
  const H = navH;
  const cx = W / 2;
  const halfPillW = pillW / 2;
  const pillLeft = Math.max(0, cx - halfPillW);
  const pillRight = Math.min(W, cx + halfPillW);

  // Outer top corners are added by the parent's overflow-hidden + rounded-t,
  // so the path itself uses square outer corners.
  const d = [
    `M 0 0`,
    `L ${W} 0`,
    `L ${W} ${stripH}`,
    `L ${pillRight + concaveR} ${stripH}`,
    `A ${concaveR} ${concaveR} 0 0 0 ${pillRight} ${stripH + concaveR}`,
    `L ${pillRight} ${navH - pillR}`,
    `A ${pillR} ${pillR} 0 0 1 ${pillRight - pillR} ${navH}`,
    `L ${pillLeft + pillR} ${navH}`,
    `A ${pillR} ${pillR} 0 0 1 ${pillLeft} ${navH - pillR}`,
    `L ${pillLeft} ${stripH + concaveR}`,
    `A ${concaveR} ${concaveR} 0 0 0 ${pillLeft - concaveR} ${stripH}`,
    `L 0 ${stripH}`,
    `Z`,
  ].join(" ");

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    >
      <path d={d} fill="#ffffff" />
    </svg>
  );
}

function LangToggle({
  lang,
  onChange,
  className = "",
}: {
  lang: "en" | "es";
  onChange: (l: "en" | "es") => void;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center bg-bg-cream rounded-full p-0.5 ${className}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-brand-primary"
        style={{ left: lang === "en" ? 2 : "calc(50% + 0px)" }}
      />
      <button
        onClick={() => onChange("en")}
        className={`relative z-10 px-3 py-1 text-xs font-semibold tracking-wider transition-colors cursor-pointer ${lang === "en" ? "text-white" : "text-ink-secondary"
          }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange("es")}
        className={`relative z-10 px-3 py-1 text-xs font-semibold tracking-wider transition-colors cursor-pointer ${lang === "es" ? "text-white" : "text-ink-secondary"
          }`}
      >
        ES
      </button>
    </div>
  );
}
