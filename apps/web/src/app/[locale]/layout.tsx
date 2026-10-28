import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.metadata.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.metadata.description,
    applicationName: siteConfig.name,
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only rounded-md bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {dict.common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
