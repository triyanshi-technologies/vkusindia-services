import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PhoneIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons";
import { ContentBlocks } from "@/components/sections/content-blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServiceTiles } from "@/components/sections/service-tiles";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHeader } from "@/components/ui/page-header";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { servicesAnchor } from "@/config/navigation";
import { imageProps } from "@/content/images";
import { getPageContent } from "@/content/pages";
import { getService, getServiceSlugs, getServices } from "@/content/services";
import { getSiteSettings } from "@/content/site-settings";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

// Slugs are shared across locales, so one list covers every [locale].
export async function generateStaticParams() {
  return (await getServiceSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const service = await getService(locale, slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: getAlternates(locale, `/services/${slug}`),
  };
}

const contactLinkClass =
  "flex min-h-11 items-center gap-3 rounded-lg px-3 font-semibold text-primary transition-colors hover:bg-section";

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const [{ slug }, locale, dict] = await Promise.all([params, getLocale(), getDictionary()]);
  const [service, services, contact] = await Promise.all([
    getService(locale, slug),
    getServices(locale),
    getSiteSettings(locale),
  ]);
  if (!service) notFound();

  const cta = getPageContent(locale, "cta");
  const otherServices = services.filter((other) => other.slug !== slug).slice(0, 3);
  const contactHref = localePath(locale, "/contact");

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.tagline}
        image={service.image}
        breadcrumbs={{
          label: dict.common.breadcrumbs,
          items: [
            { label: dict.nav.items.home, href: localePath(locale) },
            { label: dict.nav.items.services, href: `${localePath(locale)}${servicesAnchor}` },
            { label: service.title },
          ],
        }}
      />

      <Section tone="card" aria-labelledby="service-overview">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <Eyebrow>{dict.servicePage.overview}</Eyebrow>
            <h2
              id="service-overview"
              className="mt-3 text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl lg:text-4xl"
            >
              {service.summary}
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
              <Image
                {...imageProps(service.image)}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <aside aria-labelledby="service-aside" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-page p-6 shadow-sm sm:p-8">
              <h2 id="service-aside" className="text-xl font-semibold text-primary">
                {dict.servicePage.asideTitle}
              </h2>
              <p className="mt-2 text-muted">{dict.servicePage.asideText}</p>
              <ButtonLink href={contactHref} className="mt-6 w-full">
                {dict.nav.cta}
              </ButtonLink>
              <ul className="mt-6 space-y-1 border-t border-border pt-6">
                <li>
                  <a href={contact.phoneHref} className={contactLinkClass}>
                    <PhoneIcon className="size-5 text-secondary" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                    <WhatsAppIcon className="size-5 text-secondary" />
                    {dict.contactPage.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={contact.telegramUrl} target="_blank" rel="noopener noreferrer" className={contactLinkClass}>
                    <TelegramIcon className="size-5 text-secondary" />
                    {dict.contactPage.telegram}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <ContentBlocks blocks={service.blocks} labels={dict.blocks} />

      <Section aria-labelledby="other-services">
        <SectionHeading id="other-services" title={dict.servicePage.otherServices} />
        <div className="mt-12">
          <ServiceTiles locale={locale} services={otherServices} layout="row" />
        </div>
      </Section>

      <CtaBanner
        title={cta.title}
        description={cta.description}
        button={{ href: contactHref, label: cta.button }}
        image={cta.image.key}
      />
    </>
  );
}
