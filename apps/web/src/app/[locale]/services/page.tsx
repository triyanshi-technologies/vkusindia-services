import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServiceRows } from "@/components/sections/service-rows";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { getPageContent } from "@/content/pages";
import { getServices } from "@/content/services";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getPageContent(locale, "services");

  return {
    title: page.title,
    description: page.description,
    alternates: getAlternates(locale, "/services"),
  };
}

export default async function ServicesPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const page = getPageContent(locale, "services");
  const cta = getPageContent(locale, "cta");

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.description}
        image={page.image.key}
        breadcrumbs={{
          label: dict.common.breadcrumbs,
          items: [{ label: dict.nav.items.home, href: localePath(locale) }, { label: page.title }],
        }}
      />
      <Section>
        <ServiceRows locale={locale} services={getServices(locale)} linkLabel={dict.common.learnMore} />
      </Section>
      <CtaBanner
        title={cta.title}
        description={cta.description}
        button={{ href: localePath(locale, "/contact"), label: cta.button }}
        image={cta.image.key}
      />
    </>
  );
}
