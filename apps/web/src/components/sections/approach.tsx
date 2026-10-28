import Image from "next/image";
import { Section, SectionHeading, type SectionTone } from "@/components/ui/section";
import { images, type ImageKey } from "@/content/images";

type ApproachProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: { key: ImageKey; alt: string };
  items: { letter: string; title: string; description: string }[];
  tone?: SectionTone;
};

/**
 * The A–Z lifecycle. On desktop the heading and photo stay pinned while the
 * three stages scroll past them.
 */
export function Approach({ eyebrow, title, description, image, items, tone = "card" }: ApproachProps) {
  return (
    <Section tone={tone} aria-labelledby="approach-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="approach-title"
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <div className="scroll-zoom absolute inset-0">
              <Image
                src={images[image.key]}
                alt={image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="space-y-6 lg:pt-24">
          {items.map((item) => (
            <li
              key={item.letter}
              className="reveal relative overflow-hidden rounded-3xl border border-border bg-page p-8 sm:p-10 lg:min-h-72"
            >
              <span
                aria-hidden="true"
                className="text-outline pointer-events-none absolute -top-4 right-4 text-[9rem] leading-none font-black opacity-60 sm:text-[11rem]"
              >
                {item.letter}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white"
              >
                {item.letter}
              </span>
              <h3 className="relative mt-8 text-2xl font-semibold text-primary">{item.title}</h3>
              <p className="relative mt-3 max-w-md text-lg text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
