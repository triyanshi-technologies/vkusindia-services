import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Canonical URL and hreflang links for a page that exists in every locale.
 * `path` is the locale-independent path, e.g. "/" or "/services/warehouse".
 */
export function getAlternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const suffix = path === "/" ? "" : path;

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])),
      // The root URL picks a language for the visitor, so it is the best fallback for the home page.
      "x-default": suffix ? `/${defaultLocale}${suffix}` : "/",
    },
  };
}
