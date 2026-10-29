import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/icons";
import { Approach } from "@/components/sections/approach";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureTiles } from "@/components/sections/feature-tiles";
import { HomeHero } from "@/components/sections/home-hero";
import { ScrollMarquee } from "@/components/sections/scroll-marquee";
import { ServiceTiles } from "@/components/sections/service-tiles";
import { StatsBand } from "@/components/sections/stats-band";
import { Timeline } from "@/components/sections/timeline";
import { Section, SectionHeading } from "@/components/ui/section";
import { servicesAnchor } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getHomeContent, getPageContent } from "@/content/pages";
import { getServices } from "@/content/services";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: getAlternates(await getLocale(), "/"),
  };
}

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { hero, stats, services: servicesCopy, approach, why, process } = getHomeContent(locale);
  const cta = getPageContent(locale, "cta");
  const services = getServices(locale);
  const contactHref = localePath(locale, "/contact");
  const servicesHref = `${localePath(locale)}${servicesAnchor}`;

  return (
    <>
      <HomeHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        panelTitle={hero.panelTitle}
        panelNote={hero.panelNote}
        highlights={hero.highlights}
        primary={{ href: contactHref, label: hero.primaryCta }}
        secondary={{ href: servicesHref, label: hero.secondaryCta }}
        image={hero.image}
      />

      <StatsBand
        eyebrow={stats.eyebrow}
        title={stats.title}
        description={stats.description}
        items={stats.items}
        note={stats.note}
      />

      <Section id={servicesAnchor.slice(1)} aria-labelledby="home-services">
        <SectionHeading
          id="home-services"
          eyebrow={servicesCopy.eyebrow}
          title={servicesCopy.title}
          description={servicesCopy.description}
        />
        <div className="mt-12">
          <ServiceTiles locale={locale} services={services} />
        </div>
      </Section>

      <ScrollMarquee words={services.map((service) => service.title)} />

      <Approach
        eyebrow={approach.eyebrow}
        title={approach.title}
        description={approach.description}
        image={approach.image}
        items={approach.items}
      />

      <FeatureTiles
        id="home-why"
        eyebrow={why.eyebrow}
        title={why.title}
        description={why.description}
        items={why.items}
      />

      <Section aria-labelledby="home-process">
        <SectionHeading
          id="home-process"
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
          align="center"
        />
        <div className="mx-auto mt-14 max-w-5xl">
          <Timeline items={process.items} stepLabel={dict.blocks.step} surface="page" />
        </div>
      </Section>

      <CtaBanner
        title={cta.title}
        description={cta.description}
        button={{ href: contactHref, label: cta.button }}
        secondary={{
          href: siteConfig.contact.whatsappUrl,
          label: dict.contactPage.whatsapp,
          icon: <WhatsAppIcon className="size-5" />,
        }}
        image={cta.image.key}
      />
    </>
  );
}
