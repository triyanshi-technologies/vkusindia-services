import type { CSSProperties } from "react";
import { ContentIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

/**
 * Column span for one cell, so the last row never leaves an empty gap.
 * Desktop uses six columns (three cells of two): a last row of two cells splits
 * the width in half, a single last cell spans it. On tablets (two columns) an odd
 * last cell spans both.
 */
function cellSpan(index: number, count: number, fourAcross: boolean): string {
  const isLast = index === count - 1;
  const tablet = isLast && count % 2 === 1 ? "sm:col-span-2" : "";
  if (fourAcross) return tablet;

  const leftover = count % 3;
  const inLastRow = index >= count - leftover;
  if (inLastRow && leftover === 1) return cn(tablet, "lg:col-span-6");
  if (inLastRow && leftover === 2) return cn(tablet, "lg:col-span-3");
  return cn(tablet, "lg:col-span-2");
}

/**
 * Features as one panel divided by hairlines (instead of separate cards).
 * Each cell gets an accent bar on hover. 4 or 8 items sit four across, others three.
 */
export function FeatureGrid({ items }: { items: Feature[] }) {
  const fourAcross = items.length % 4 === 0;

  return (
    <ul
      className={cn(
        "reveal-fade grid gap-px overflow-clip rounded-3xl bg-primary/10 shadow-sm ring-1 ring-primary/10 sm:grid-cols-2",
        fourAcross ? "lg:grid-cols-4" : "lg:grid-cols-6",
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            "group relative bg-card p-7 transition-colors duration-300 hover:bg-page sm:p-8",
            cellSpan(index, items.length, fourAcross),
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100"
          />
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-section text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
              <ContentIcon name={item.icon} className="size-6" />
            </span>
            <span aria-hidden="true" className="text-sm font-semibold text-muted tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="reveal mt-6 text-lg font-semibold text-primary" style={{ "--i": index % 4 } as CSSProperties}>
            {item.title}
          </h3>
          <p className="mt-2 text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
