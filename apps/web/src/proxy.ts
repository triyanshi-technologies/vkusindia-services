import { NextResponse, type NextRequest } from "next/server";
import { countryLocales, defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";

/**
 * Locale routing (Vercel only; static exports have no proxy).
 *
 * 1. A language the visitor picked in the switcher (cookie) always wins,
 *    including on shared links to the other language.
 * 2. Otherwise, URLs without a locale get one based on the visitor's country.
 * 3. Otherwise, the default locale.
 *
 * Search engine crawlers send no cookie, so every localized URL stays indexable.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment, ...rest] = pathname.split("/");

  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferredLocale = isLocale(cookieValue) ? cookieValue : undefined;

  if (isLocale(firstSegment)) {
    if (!preferredLocale || preferredLocale === firstSegment) return NextResponse.next();
    return redirectTo(request, ["", preferredLocale, ...rest].join("/"));
  }

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const locale = preferredLocale ?? (country && countryLocales[country]) ?? defaultLocale;

  return redirectTo(request, `/${locale}${pathname === "/" ? "" : pathname}`);
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals and any path with a file extension (favicon.ico, robots.txt, images…).
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
