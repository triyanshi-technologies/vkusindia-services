import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon, CheckIcon, ContentIcon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/ui/section";

type Stage = {
  icon: string;
  title: string;
  description: string;
  points: string[];
  outcome: string;
  services: { href: string; label: string }[];
};

type StageJourneyProps = {
  eyebrow: string;
  title: string;
  description: string;
  stages: Stage[];
  labels: { stage: string; includes: string; outcome: string; relatedServices: string };
};

/**
 * The business lifecycle in detail: stages side by side on desktop, joined by
 * a line through their markers. Subgrid lines up each card's intro, points and
 * result across the columns. On smaller screens the stages stack along a vertical line.
 */
export function StageJourney({ eyebrow, title, description, stages, labels }: StageJourneyProps) {
  return (
    <Section tone="card" aria-labelledby="journey-title">
      <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-16">
        <SectionHeading id="journey-title" eyebrow={eyebrow} title={title} />
        <p className="max-w-2xl text-lg text-pretty text-muted">{description}</p>
      </div>

      <ol className="mt-12 grid gap-x-6 lg:grid-cols-3">
        {stages.map((stage, index) => {
          const number = String(index + 1).padStart(2, "0");

          return (
            <li
              key={stage.title}
              className="group grid grid-cols-[3rem_1fr] gap-x-4 lg:row-span-4 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-y-0"
            >
              {/* Marker and the line to the next stage: vertical on phones, horizontal on desktop. */}
              <div aria-hidden="true" className="flex flex-col items-center lg:mb-6 lg:flex-row">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                  <ContentIcon name={stage.icon} className="size-6" />
                </span>
                <span className="my-2 w-0.5 flex-1 bg-border group-last:invisible lg:mx-3 lg:my-0 lg:-mr-3 lg:h-0.5 lg:w-auto" />
              </div>

              <article
                className="reveal flex flex-col rounded-2xl border border-border bg-page p-6 transition-shadow hover:shadow-lg max-lg:mb-6 max-lg:group-last:mb-0 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
                style={{ "--i": index } as CSSProperties}
              >
                <header>
                  <p className="text-sm font-semibold text-secondary">
                    {labels.stage} {number}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-primary">{stage.title}</h3>
                  <p className="mt-2 text-muted">{stage.description}</p>
                </header>

                <ul aria-label={labels.includes} className="mt-5 space-y-2">
                  {stage.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-primary">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-secondary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <footer className="mt-5 border-t border-border pt-5">
                  <p className="text-sm text-primary">
                    <span className="font-semibold text-secondary">{labels.outcome}: </span>
                    {stage.outcome}
                  </p>
                  {stage.services.length > 0 && (
                    <ul aria-label={labels.relatedServices} className="mt-3 flex flex-wrap gap-x-4">
                      {stage.services.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            className="group/link inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                          >
                            <span className="link-underline">{service.label}</span>
                            <ArrowRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </footer>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
