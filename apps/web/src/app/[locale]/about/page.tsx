import type { Metadata } from "next";
import Image from "next/image";
import { Approach } from "@/components/sections/approach";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureTiles } from "@/components/sections/feature-tiles";
import { PageHeader } from "@/components/ui/page-header";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { images } from "@/content/images";
import { getHomeContent, getPageContent } from "@/content/pages";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/paths";
import { getAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = getPageContent(locale, "about");

  return {
    title: page.title,
    description: page.description,
    alternates: getAlternates(locale, "/about"),
  };
}

export default async function AboutPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const page = getPageContent(locale, "about");
  const { approach, why } = getHomeContent(locale);
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

      <Section tone="card" aria-labelledby="about-story">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading id="about-story" eyebrow={page.story.eyebrow} title={page.story.title} />
            <div className="mt-6 space-y-4 text-lg text-muted">
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={images[page.story.image.key]}
              alt={page.story.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="section" aria-labelledby="about-philosophy">
        <figure className="mx-auto max-w-4xl text-center">
          <Eyebrow>{page.philosophy.eyebrow}</Eyebrow>
          <h2
            id="about-philosophy"
            className="mt-3 text-3xl font-semibold tracking-tight text-balance text-primary sm:text-4xl"
          >
            {page.philosophy.title}
          </h2>
          <blockquote className="mt-8 text-xl leading-relaxed text-pretty text-primary sm:text-2xl">
            <p>“{page.philosophy.text}”</p>
          </blockquote>
        </figure>
      </Section>

      <Approach
        eyebrow={approach.eyebrow}
        title={approach.title}
        description={approach.description}
        image={approach.image}
        items={approach.items}
      />

      <FeatureTiles
        id="about-why"
        eyebrow={why.eyebrow}
        title={why.title}
        description={why.description}
        items={why.items}
      />

      <CtaBanner
        title={cta.title}
        description={cta.description}
        button={{ href: localePath(locale, "/contact"), label: cta.button }}
        image={cta.image.key}
      />
    </>
  );
}
