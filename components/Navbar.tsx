"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./ui/Logo";
import ThemeToggle from "./ThemeToggle";
import { LinkButton } from "./ui/Button";
import { useLang } from "@/lib/language-context";
import { translations as T, t, type Lang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { homeHref, sectionHref, serviceHref, swapLang } from "@/lib/routes";

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
  // Desktop keeps the extra width the horizontal lockup needs; phones show
  // the isotype instead, so they return to the original narrower pill.
  const ergonomicMax = isMobile
    ? effectiveVw - 16
    : isTablet
      ? 760
      : 1180;
  const maxPillW = Math.min(geometricMax, ergonomicMax);
  const minPillW = Math.min(
    maxPillW,
    isMobile ? 280 : isTablet ? 540 : 720
  );
  const targetFraction = isMobile ? 0.76 : isTablet ? 0.8 : 0.8;
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

type NavLink = { label: string; href: string };
type NavItem = NavLink & { children?: NavLink[] };

function serviceLinksFor(lang: Lang): NavLink[] {
  return SERVICES.map((s) => ({
    label: t(s.title, lang),
    href: serviceHref(lang, s.id),
  }));
}

export default function Navbar() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { vw, stripH, navH, concaveR, pillR, pillW, mounted } =
    useNavGeometry();

  const home = homeHref(lang);
  const servicesPath = sectionHref(lang, "services");

  /** Submenu starts open when you are already somewhere under /services. */
  const [subOpen, setSubOpen] = useState(() =>
    pathname.startsWith(servicesPath)
  );

  const isActive = (href: string) => {
    // Service Area and Contact are still home-page anchors; they all share
    // the home path, so matching on path alone would light up every one of
    // them at once. No active state until they become real pages.
    if (href.includes("#")) return false;
    return pathname === href;
  };

  // Close the drawer on navigation. Next keeps the Navbar mounted between
  // routes, so without this the panel stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setSubOpen(pathname.startsWith(servicesPath));
  }, [pathname, servicesPath]);

  // While the drawer is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /**
   * Services is a real page with a dropdown of the eight service pages,
   * following the reference site.
   *
   * Service Area and Contact are still home-page anchors — they become their
   * own pages next, at which point these become sectionHref() calls too.
   */
  const navItems: NavItem[] =
    [
      { label: t(T.nav.home, lang), href: home },
      {
        label: t(T.nav.services, lang),
        href: sectionHref(lang, "services"),
        children: serviceLinksFor(lang),
      },
      { label: t(T.nav.about, lang), href: sectionHref(lang, "about") },
      { label: t(T.nav.area, lang), href: `${home}#area` },
      { label: t(T.nav.contact, lang), href: `${home}#contact` },
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
          className="absolute inset-0 bg-bg-surface rounded-b-[36px]"
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
          <Link
            href={home}
            aria-label="PetFocus home"
            className="flex items-center shrink-0"
          >
            {/* Isotype on phones — see the §02 note in Logo.tsx. From sm up
                there is room for the full lockup. */}
            <Logo variant="symbol" width={46} priority className="sm:hidden" />
            <Logo
              variant="horizontal"
              width={170}
              priority
              className="hidden sm:inline-block"
            />
          </Link>

          {/* Middle grid column — always present so the column structure is
              preserved on mobile (empty) and desktop (menu links centered). */}
          <div className="flex items-center justify-center min-w-0">
            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 whitespace-nowrap px-3 xl:px-4 py-2 rounded-full text-[0.92rem] xl:text-[0.95rem] text-ink-secondary hover:text-ink-primary hover:bg-bg-subtle transition-colors"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </Link>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                        >
                          <div className="rounded-3xl bg-bg-surface border border-line shadow-float-lg p-2">
                            <Link
                              href={item.href}
                              className="block px-3 py-2 rounded-2xl text-sm font-medium text-ink-primary hover:bg-bg-subtle transition-colors"
                            >
                              {t(T.services.backToAll, lang)}
                            </Link>
                            <div className="my-1 h-px bg-line" />
                            {item.children.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                className="block px-3 py-2 rounded-2xl text-sm text-ink-secondary hover:text-ink-primary hover:bg-bg-subtle transition-colors"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block whitespace-nowrap px-3 xl:px-4 py-2 rounded-full text-[0.92rem] xl:text-[0.95rem] text-ink-secondary hover:text-ink-primary hover:bg-bg-subtle transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right cluster — pushed to the far right */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle className="hidden sm:grid !w-9 !h-9" />
            <LangToggle
              lang={lang}
              pathname={pathname}
              className="hidden md:inline-flex"
            />
            <LinkButton
              href="tel:+13853819161"
              variant="primary"
              size="sm"
              className="inline-flex !w-12 !h-12 !p-0 sm:!w-auto sm:!h-auto sm:!px-4 sm:!py-2"
              aria-label={t(T.nav.callUs, lang)}
            >
              <Phone size={18} className="sm:!w-3.5 sm:!h-3.5" />
              <span className="hidden sm:inline md:hidden">
                {lang === "en" ? "Call" : "Llamar"}
              </span>
              <span className="hidden md:inline">{t(T.nav.callUs, lang)}</span>
            </LinkButton>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid place-items-center w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-bg-subtle text-ink-primary hover:bg-line transition-colors cursor-pointer"
              aria-label={t(T.nav.openMenu, lang)}
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
            className="fixed inset-0 z-50 bg-brand-primary/40 lg:hidden"
            onClick={() => setOpen(false)}
          >
            {/* Three fixed bands: header, scrolling nav, pinned CTA. The
                previous single scrolling column overflowed its own panel — the
                phone number fell outside the rounded card and the CTA sat on
                top of it. */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="absolute right-3 top-3 bottom-3 w-[88%] max-w-sm bg-bg-surface rounded-3xl flex flex-col shadow-float-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={t(T.nav.menu, lang)}
            >
              {/* Header. The isotype leaves room for both toggles on this
                  row, which saves a whole row of height on short phones. */}
              <div className="shrink-0 flex items-center justify-between gap-2 px-5 py-4">
                <Link
                  href={home}
                  onClick={() => setOpen(false)}
                  className="flex items-center shrink-0"
                >
                  <Logo variant="symbol" width={44} />
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <LangToggle lang={lang} pathname={pathname} />
                  <ThemeToggle />
                  <button
                    onClick={() => setOpen(false)}
                    className="grid place-items-center w-10 h-10 rounded-full bg-bg-subtle text-ink-primary hover:bg-line transition-colors cursor-pointer"
                    aria-label={t(T.nav.closeMenu, lang)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="shrink-0 h-px bg-line mx-5" />

              {/* Scrolling nav. On short phones the list runs past the fold,
                  so the bottom edge fades instead of slicing an item in half
                  against the CTA divider. */}
              <div className="relative flex-1 min-h-0">
                <nav
                  aria-label="Mobile"
                  className="h-full overflow-y-auto overscroll-contain px-3 py-3"
                >
                  <ul className="flex flex-col gap-0.5">
                    {navItems.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <li key={item.href}>
                          <div className="flex items-stretch gap-1">
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={`flex-1 py-3 px-4 rounded-2xl text-base font-medium transition-colors ${
                                active
                                  ? "bg-bg-subtle text-brand-primary"
                                  : "text-ink-primary hover:bg-bg-subtle"
                              }`}
                            >
                              {item.label}
                            </Link>
                            {item.children && (
                              <button
                                onClick={() => setSubOpen((v) => !v)}
                                aria-expanded={subOpen}
                                aria-label={`${item.label} — ${t(T.nav.submenu, lang)}`}
                                className="shrink-0 grid place-items-center w-11 rounded-2xl text-ink-secondary hover:bg-bg-subtle transition-colors cursor-pointer"
                              >
                                <ChevronDown
                                  size={18}
                                  className={`transition-transform duration-200 ${
                                    subOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Collapsed by default — eight service links open by
                              default filled half the screen and pushed the rest
                              of the menu out of reach. Auto-opens when you are
                              already inside /services. */}
                          {item.children && (
                            <AnimatePresence initial={false}>
                              {subOpen && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeOut" }}
                                  className="overflow-hidden ml-4 pl-3 border-l border-line"
                                >
                                  {item.children.map((c) => {
                                    const childActive = isActive(c.href);
                                    return (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href}
                                          onClick={() => setOpen(false)}
                                          aria-current={
                                            childActive ? "page" : undefined
                                          }
                                          className={`block py-2.5 px-3 rounded-xl text-sm transition-colors ${
                                            childActive
                                              ? "text-brand-primary font-medium bg-bg-subtle"
                                              : "text-ink-secondary hover:text-ink-primary hover:bg-bg-subtle"
                                          }`}
                                        >
                                          {c.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-surface to-transparent"
                />
              </div>

              {/* Pinned CTA — always reachable without scrolling. */}
              <div className="shrink-0 border-t border-line px-5 py-4 bg-bg-surface">
                <LinkButton
                  href="tel:+13853819161"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <Phone size={16} />
                  {t(T.nav.callUs, lang)}
                </LinkButton>
                <a
                  href="tel:+13853819161"
                  className="mt-2.5 block text-center text-sm text-ink-secondary hover:text-brand-primary transition-colors"
                >
                  385-381-9161
                </a>
              </div>
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
      <path d={d} className="fill-bg-surface" />
    </svg>
  );
}

function LangToggle({
  lang,
  pathname,
  className = "",
}: {
  lang: Lang;
  pathname: string;
  className?: string;
}) {
  // Switching language is navigation now, not a client-side flag — each
  // language has its own URL so both can be indexed.
  return (
    <div
      className={`relative inline-flex items-center bg-bg-subtle rounded-full p-0.5 ${className}`}
    >
      <motion.div
        layout
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-brand-primary"
        style={{ left: lang === "en" ? 2 : "calc(50% + 0px)" }}
      />
      {(["en", "es"] as Lang[]).map((l) => (
        <Link
          key={l}
          href={swapLang(pathname, l)}
          hrefLang={l}
          aria-current={lang === l ? "true" : undefined}
          className={`relative z-10 px-3 py-1 text-xs font-semibold tracking-wider transition-colors ${
            lang === l ? "text-white" : "text-ink-secondary"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
