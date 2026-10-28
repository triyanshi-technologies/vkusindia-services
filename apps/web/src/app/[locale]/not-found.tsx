import Link from "next/link";
import { locale as localeParam } from "next/root-params";
import { Container } from "@/components/ui/container";
import { defaultLocale, isLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const value = await localeParam();
  // Not getLocale(): it calls notFound() itself, which would recurse here.
  const locale = isLocale(value) ? value : defaultLocale;
  const dict = await loadDictionary(locale);

  return (
    <Container className="flex max-w-3xl flex-1 flex-col justify-center gap-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-primary">{dict.notFound.title}</h1>
      <p className="text-lg text-muted">{dict.notFound.description}</p>
      <Link
        href={`/${locale}`}
        className="font-semibold text-secondary underline underline-offset-4 hover:text-secondary-hover"
      >
        {dict.notFound.backHome}
      </Link>
    </Container>
  );
}
