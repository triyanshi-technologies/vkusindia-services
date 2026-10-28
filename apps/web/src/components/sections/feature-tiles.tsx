import type { CSSProperties } from "react";
import { ContentIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";

type FeatureTilesProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
};

/** Dark band: the heading pinned on the left, numbered glass tiles on the right. */
export function FeatureTiles({ id, eyebrow, title, description, items }: FeatureTilesProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-primary py-20 text-white sm:py-28">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full bg-secondary/30 blur-3xl"
      />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} inverse />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="reveal group relative rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-white/25 sm:even:translate-y-10 sm:even:hover:translate-y-9"
              style={{ "--i": index % 2 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute top-6 right-7 text-4xl font-black text-white/10 transition-colors group-hover:text-white/20"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-white">
                <ContentIcon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-white/80">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
