import type { Metadata } from "next";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: getAlternates(await getLocale(), "/"),
  };
}

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-4 py-24"
    >
      <LanguageSwitcher currentLocale={locale} label={dict.common.languageSwitcher} />
      <h1 className="text-4xl font-semibold tracking-tight text-primary">{dict.home.title}</h1>
      <p className="text-lg text-muted">{dict.home.underConstruction}</p>
    </main>
  );
}
