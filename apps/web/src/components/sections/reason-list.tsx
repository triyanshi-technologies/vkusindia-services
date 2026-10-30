import type { CSSProperties } from "react";
import { ContentIcon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/ui/section";

type ReasonListProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
};

/**
 * Reasons as a quiet two-column list beside the heading: no cards, just a
 * rule above each one. Stacks on smaller screens.
 */
export function ReasonList({ id, eyebrow, title, description, items }: ReasonListProps) {
  return (
    <Section tone="section" aria-labelledby={id}>
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} />

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="reveal border-t border-primary/15 pt-5 transition-colors hover:border-secondary"
              style={{ "--i": index % 2 } as CSSProperties}
            >
              <div className="flex items-center gap-3">
                <ContentIcon name={item.icon} className="size-5 shrink-0 text-secondary" />
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              </div>
              <p className="mt-2 text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
