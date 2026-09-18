import { NextRequest, NextResponse } from "next/server";
import { LANGS, DEFAULT_LANG } from "@/lib/routes";

/**
 * Every page lives under a language prefix. Anything that arrives without one
 * (`/`, or an old un-prefixed link) is redirected to the visitor's language.
 *
 * This replaces the old localStorage auto-detect: the choice has to be in the
 * URL so each language is separately indexable.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLang = LANGS.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLang) return;

  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  const lang = accept.startsWith("es") ? "es" : DEFAULT_LANG;

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
