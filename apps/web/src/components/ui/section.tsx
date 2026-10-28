import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

const tones = {
  page: "bg-page",
  section: "bg-section",
  card: "bg-card",
  primary: "bg-primary text-white",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone;
};

/** A full-width band with vertical rhythm and a centered container. */
export function Section({ tone = "page", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  /** Set on dark sections (tone="primary"). */
  inverse?: boolean;
  className?: string;
};

/** Section title and intro. Pass `id` and reference it with `aria-labelledby` on the section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "start",
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
          eyebrow && "mt-3",
          inverse ? "text-white" : "text-primary",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg text-pretty", inverse ? "text-white/80" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

/** Small uppercase label above a heading. */
export function Eyebrow({ inverse = false, children }: { inverse?: boolean; children: string }) {
  return (
    <p
      className={cn(
        "text-sm font-semibold tracking-wider uppercase",
        inverse ? "text-section" : "text-secondary",
      )}
    >
      {children}
    </p>
  );
}
