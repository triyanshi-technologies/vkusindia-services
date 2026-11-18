import type { CSSProperties } from "react";
import { ContentIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type IndustryGridProps = {
  items: { icon: string; name: string }[];
  /** Background the grid sits on, so the tiles stand out from it. */
  surface: "section" | "card";
};

/** Industries as compact icon + name tiles: two across on phones, three on wider screens. */
export function IndustryGrid({ items, surface }: IndustryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={item.name}
          className={cn(
            "reveal group flex flex-col items-start gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-secondary sm:flex-row sm:items-center sm:p-6",
            surface === "section" ? "bg-card" : "bg-page",
          )}
          style={{ "--i": index % 3 } as CSSProperties}
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors group-hover:bg-secondary">
            <ContentIcon name={item.icon} className="size-6" />
          </span>
          <span className="text-base font-semibold text-balance text-primary sm:text-lg">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
