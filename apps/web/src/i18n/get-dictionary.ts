import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";
import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  ru: () => import("./dictionaries/ru").then((module) => module.default),
};

/** The locale of the current route. Responds with 404 for unknown locales. */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/** UI strings for the locale of the current route. */
export async function getDictionary(): Promise<Dictionary> {
  return loadDictionary(await getLocale());
}
