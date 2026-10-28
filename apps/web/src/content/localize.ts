import { locales, type Locale } from "@/i18n/config";

/** A value translated into every locale: `{ "en": "...", "ru": "..." }`. */
export type Localized<T = string> = Record<Locale, T>;

/** `T` with every `Localized<X>` replaced by `X`, at any depth. */
export type Resolved<T> =
  T extends Localized<infer U>
    ? Resolved<U>
    : T extends readonly (infer E)[]
      ? Resolved<E>[]
      : T extends object
        ? { [K in keyof T]: Resolved<T[K]> }
        : T;

function isLocalized(value: object): value is Localized<unknown> {
  const keys = Object.keys(value);
  return keys.length === locales.length && locales.every((locale) => keys.includes(locale));
}

/** Picks one locale out of bilingual content, recursively. */
export function localize<T>(value: T, locale: Locale): Resolved<T> {
  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale)) as Resolved<T>;
  }
  if (value !== null && typeof value === "object") {
    if (isLocalized(value)) return localize(value[locale], locale) as Resolved<T>;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localize(item, locale)]),
    ) as Resolved<T>;
  }
  return value as Resolved<T>;
}
