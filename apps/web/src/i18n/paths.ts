import type { Locale } from "./config";

/** Prefixes a locale-independent path with the locale: ("en", "/services") -> "/en/services". */
export function localePath(locale: Locale, path = "/"): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
