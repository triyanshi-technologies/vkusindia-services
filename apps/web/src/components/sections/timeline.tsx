import { cn } from "@/lib/cn";

type TimelineProps = {
  items: { title: string; description: string }[];
  /** "Step" label shown above each title. */
  stepLabel: string;
  /** Background the timeline sits on, so the step badges can cut out the line. */
  surface?: "page" | "section" | "card";
};

const surfaceRings = {
  page: "ring-page",
  section: "ring-section",
  card: "ring-card",
} as const;

/**
 * Numbered steps on a vertical line that draws itself while scrolling.
 * Steps alternate sides on desktop and sit to the right of the line on phones.
 */
export function Timeline({ items, stepLabel, surface = "page" }: TimelineProps) {
  return (
    <ol className="relative">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-5 w-0.5 -translate-x-1/2 bg-border lg:left-1/2"
      >
        <div className="draw-y h-full w-full bg-secondary" />
      </div>

      {items.map((item, index) => {
        const onRight = index % 2 === 1;
        const number = String(index + 1).padStart(2, "0");

        return (
          <li key={item.title} className="relative pb-8 pl-16 last:pb-0 lg:grid lg:grid-cols-2 lg:pb-12 lg:pl-0">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-4 left-5 inline-flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white ring-8 lg:left-1/2",
                surfaceRings[surface],
              )}
            >
              {number}
            </span>
            <div
              className={cn(
                "rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-7",
                onRight ? "reveal-right lg:col-start-2 lg:ml-12" : "reveal-left lg:mr-12 lg:text-right",
              )}
            >
              <p className="text-sm font-semibold text-secondary">
                {stepLabel} {number}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
