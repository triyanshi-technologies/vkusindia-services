import type { CSSProperties } from "react";
import { CountUp } from "@/components/motion/count-up";
import { Eyebrow } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

type StatsBandProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: { value: string; label: string }[];
  note: string;
};

/** Floating card that overlaps the bottom of the hero, with numbers that count up. */
export function StatsBand({ eyebrow, title, description, items, note }: StatsBandProps) {
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-28 lg:-mt-32">
      <Container>
        <div className="reveal-fade rounded-3xl bg-card p-6 shadow-2xl shadow-primary/15 ring-1 ring-border sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2
                id="stats-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-balance text-primary sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-3 text-muted">{description}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
              {items.map((item, index) => (
                <div
                  key={item.label}
                  className="reveal flex flex-col-reverse justify-end lg:px-6 lg:first:pl-0 lg:last:pr-0"
                  style={{ "--i": index } as CSSProperties}
                >
                  <dt className="mt-2 text-sm text-muted">{item.label}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-secondary tabular-nums sm:text-4xl">
                    <span aria-hidden="true">
                      <CountUp value={item.value} />
                    </span>
                    <span className="sr-only">{item.value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-8 border-t border-border pt-4 text-xs text-muted">{note}</p>
        </div>
      </Container>
    </section>
  );
}
