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
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  /** e.g. "Switch language to" (followed by the other language's name). */
  label: string;
};

function rememberLocale(locale: Locale) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}

/**
 * EN/RU toggle. With two locales it is a single link to the other language,
 * styled as a switch whose thumb sits on the current one.
 */
export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  // Drop the leading locale segment: "/en/services" -> "/services"
  const restOfPath = pathname.split("/").slice(2).join("/");
  const target = locales.find((locale) => locale !== currentLocale) ?? currentLocale;
  const thumbOnSecond = currentLocale === locales[1];

  return (
    <Link
      href={`/${target}${restOfPath ? `/${restOfPath}` : ""}`}
      hrefLang={target}
      // The proxy would redirect a prefetch of the other locale back to the current one.
      prefetch={false}
      onClick={() => rememberLocale(target)}
      className="group relative inline-flex h-10 shrink-0 items-center rounded-full bg-section p-1 text-xs font-bold ring-1 ring-border-input/40 transition-colors hover:ring-secondary"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-secondary shadow-sm transition-transform duration-200",
          thumbOnSecond && "translate-x-full",
        )}
      />
      {locales.map((locale) => (
        <span
          key={locale}
          className={cn(
            "relative z-10 inline-flex h-8 w-10 items-center justify-center transition-colors",
            locale === currentLocale ? "text-white" : "text-primary",
          )}
        >
          {locale.toUpperCase()}
        </span>
      ))}
      <span className="sr-only">
        {`, ${label} `}
        <span lang={target}>{localeNames[target]}</span>
      </span>
    </Link>
  );
}
