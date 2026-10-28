export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Set only when the visitor explicitly picks a language in the switcher. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Visitors from these countries (ISO 3166-1 alpha-2) get a non-default locale. */
export const countryLocales: Partial<Record<string, Locale>> = {
  RU: "ru",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
