import type { CSSProperties } from "react";
import { CountUp } from "@/components/motion/count-up";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

type StatsBandProps = {
  eyebrow: string;
  title: string;
  items: { value: string; label: string }[];
  note: string;
};

/**
 * Compact card over the bottom of the hero: the heading and the numbers share
 * one row on desktop. Numbers count up as they scroll into view.
 */
export function StatsBand({ eyebrow, title, items, note }: StatsBandProps) {
  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-24 lg:-mt-20">
      <Container>
        <div className="reveal-fade grid gap-6 rounded-2xl bg-card p-6 shadow-xl shadow-primary/10 sm:p-8 lg:grid-cols-[14rem_1fr] lg:items-center lg:gap-10">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="stats-title"
              className="mt-2 text-xl font-semibold tracking-tight text-balance text-primary"
            >
              {title}
            </h2>
            <p className="mt-2 text-xs text-muted">{note}</p>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.label}
                className="reveal flex flex-col-reverse justify-end"
                style={{ "--i": index } as CSSProperties}
              >
                {/* Visually the number comes first; in the DOM the term (dt) comes first. */}
                <dt className="mt-1 text-sm text-pretty text-muted">{item.label}</dt>
                <dd className="text-[1.375rem] font-semibold tracking-tight whitespace-nowrap text-primary tabular-nums sm:text-3xl lg:text-2xl xl:text-3xl">
                  <span aria-hidden="true">
                    <CountUp value={item.value} />
                  </span>
                  <span className="sr-only">{item.value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
