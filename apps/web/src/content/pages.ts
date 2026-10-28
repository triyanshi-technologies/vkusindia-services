import type { Locale } from "@/i18n/config";
import homeData from "./data/home.json";
import pagesData from "./data/pages.json";
import { localize } from "./localize";
import type { HomeContent, PagesContent } from "./types";

/** TEMPORARY local content source, replaced by Sanity singletons later. */

const home = homeData as HomeContent;
const pages = pagesData as PagesContent;

export function getHomeContent(locale: Locale) {
  return localize(home, locale);
}

export function getPageContent<K extends keyof PagesContent>(locale: Locale, page: K) {
  return localize(pages[page], locale);
}
