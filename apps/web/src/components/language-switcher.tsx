"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

function rememberLocale(locale: Locale) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}

export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  // Drop the leading locale segment: "/en/services" -> "/services"
  const restOfPath = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1">
        {locales.map((locale) => {
          const isCurrent = locale === currentLocale;

          return (
            <li key={locale}>
              <Link
                href={`/${locale}${restOfPath ? `/${restOfPath}` : ""}`}
                hrefLang={locale}
                // The proxy would redirect a prefetch of the other locale back to the current one.
                prefetch={false}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => rememberLocale(locale)}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm font-semibold transition-colors ${
                  isCurrent ? "bg-secondary text-white" : "text-primary hover:bg-section"
                }`}
              >
                <span aria-hidden="true">{locale.toUpperCase()}</span>
                <span className="sr-only" lang={locale}>
                  {localeNames[locale]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
