import type { CSSProperties } from "react";

type ComparisonTableProps = {
  columns: string[];
  rows: { feature: string; values: string[] }[];
  /** Word between the two column titles, e.g. "vs". */
  versusLabel: string;
};

/**
 * Mirrored comparison: option A on the left, option B (highlighted) on the
 * right, the criterion in the middle. On phones each row stacks with labels.
 */
export function ComparisonTable({ columns, rows, versusLabel }: ComparisonTableProps) {
  const [first = "", second = ""] = columns;

  return (
    <div>
      <div aria-hidden="true" className="mb-6 hidden grid-cols-[1fr_12rem_1fr] items-center gap-6 md:grid">
        <p className="rounded-2xl bg-card px-6 py-4 text-right text-lg font-semibold text-primary ring-1 ring-border">
          {first}
        </p>
        <p className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-primary text-sm font-bold text-white uppercase">
          {versusLabel}
        </p>
        <p className="rounded-2xl bg-secondary px-6 py-4 text-lg font-semibold text-white">{second}</p>
      </div>

      <ul className="space-y-4">
        {rows.map((row, index) => (
          <li
            key={row.feature}
            className="reveal grid gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border md:grid-cols-[1fr_12rem_1fr] md:items-center md:gap-6 md:p-6"
            style={{ "--i": index % 3 } as CSSProperties}
          >
            <h3 className="text-lg font-semibold text-primary md:col-start-2 md:row-start-1 md:rounded-full md:bg-section md:px-4 md:py-2 md:text-center md:text-base">
              {row.feature}
            </h3>
            <p className="text-muted md:col-start-1 md:row-start-1 md:text-right">
              <span className="block text-sm font-semibold text-primary md:sr-only">{first}: </span>
              {row.values[0]}
            </p>
            <p className="border-l-4 border-secondary pl-4 text-primary md:col-start-3 md:row-start-1">
              <span className="block text-sm font-semibold text-secondary md:sr-only">{second}: </span>
              {row.values[1]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
