import type { CSSProperties } from "react";
import { ContentIcon } from "@/components/icons";
import { CountUp } from "@/components/motion/count-up";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

type StatsBandProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: { icon: string; value: string; label: string }[];
  note: string;
};

/**
 * Floating card that overlaps the bottom of the hero: a heading row, then
 * equal stat tiles whose numbers count up as they scroll into view.
 */
export function StatsBand({ eyebrow, title, description, items, note }: StatsBandProps) {
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-28 lg:-mt-32">
      <Container>
        <div className="reveal-fade rounded-3xl bg-card p-6 shadow-2xl shadow-primary/15 ring-1 ring-border sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2
                id="stats-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl"
              >
                {title}
              </h2>
            </div>
            <p className="max-w-md text-pretty text-muted lg:text-right">{description}</p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.label}
                className="reveal group flex flex-col rounded-2xl bg-page p-4 ring-1 ring-border transition-colors hover:bg-section sm:p-6"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-card text-secondary shadow-sm ring-1 ring-border">
                  <ContentIcon name={item.icon} className="size-5" />
                </span>
                {/* Visually the number comes first; in the DOM the term (dt) comes first. */}
                <div className="mt-4 flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-sm text-pretty text-muted">{item.label}</dt>
                  <dd className="text-2xl font-bold tracking-tight whitespace-nowrap text-primary tabular-nums sm:text-3xl xl:text-4xl">
                    <span aria-hidden="true">
                      <CountUp value={item.value} />
                    </span>
                    <span className="sr-only">{item.value}</span>
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-xs text-muted">{note}</p>
        </div>
      </Container>
    </section>
  );
}
