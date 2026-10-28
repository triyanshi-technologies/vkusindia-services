import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getPageContent } from "@/content/pages";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getPageContent(locale, "privacy");

  return {
    title: page.title,
    description: page.description,
    alternates: getAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const page = getPageContent(locale, "privacy");

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.description}
        breadcrumbs={{
          label: dict.common.breadcrumbs,
          items: [{ label: dict.nav.items.home, href: localePath(locale) }, { label: page.title }],
        }}
      />
      {/* The policy text is drafted separately and will be added here. */}
      <Section tone="card">
        <p className="max-w-3xl text-lg text-muted">{dict.common.comingSoon}</p>
      </Section>
    </>
  );
}
