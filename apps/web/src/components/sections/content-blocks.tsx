import { Section, SectionHeading } from "@/components/ui/section";
import type { ServiceBlock } from "@/content/services";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/cn";
import { Checklist } from "./checklist";
import { ComparisonTable } from "./comparison-table";
import { FeatureGrid } from "./feature-grid";
import { Timeline } from "./timeline";

type ContentBlocksProps = {
  blocks: ServiceBlock[];
  labels: Dictionary["blocks"];
};

/**
 * Renders page-builder blocks as full-width sections. Light blocks alternate
 * between "section" and "card" (starting with "section", since the service
 * overview above is "card"); checklists always get a dark band.
 */
export function ContentBlocks({ blocks, labels }: ContentBlocksProps) {
  return blocks.map((block, index) => {
    const headingId = `block-${index}`;
    const surface = index % 2 === 0 ? "section" : "card";
    const isDark = block.type === "checklist";

    return (
      <Section
        key={headingId}
        tone={isDark ? "primary" : surface}
        aria-labelledby={headingId}
        className={cn("relative isolate overflow-clip", isDark && "bg-dots")}
      >
        <SectionHeading
          id={headingId}
          title={block.title}
          description={block.intro ?? undefined}
          inverse={isDark}
          align={block.type === "steps" || block.type === "comparison" ? "center" : "start"}
        />
        <div className="mt-12 sm:mt-14">
          <BlockBody block={block} labels={labels} surface={surface} />
        </div>
      </Section>
    );
  });
}

function BlockBody({
  block,
  labels,
  surface,
}: {
  block: ServiceBlock;
  labels: Dictionary["blocks"];
  surface: "section" | "card";
}) {
  switch (block.type) {
    case "features":
      return <FeatureGrid items={block.items} />;
    case "steps":
      return <Timeline items={block.items} stepLabel={labels.step} surface={surface} />;
    case "checklist":
      return <Checklist items={block.items} />;
    case "comparison":
      return <ComparisonTable columns={block.columns} rows={block.rows} versusLabel={labels.versus} />;
  }
}
