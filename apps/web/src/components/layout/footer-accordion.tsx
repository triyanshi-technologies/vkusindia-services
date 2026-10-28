"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type FooterAccordionProps = {
  heading: string;
  children: ReactNode;
};

/**
 * A footer link column that collapses into an accordion on screens up to 480px.
 * Wider screens show a plain heading and an always-open list; the toggle
 * button only exists (in the accessibility tree too) at the small size.
 */
export function FooterAccordion({ heading, children }: FooterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  return (
    <div className="max-[481px]:border-b max-[481px]:border-white/15">
      <h2 className="text-sm font-semibold tracking-wider uppercase">
        <span className="max-[481px]:hidden">{heading}</span>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={listId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex min-h-12 w-full items-center justify-between gap-4 text-left tracking-wider uppercase min-[481px]:hidden"
        >
          {heading}
          <ChevronRightIcon
            // Points down when closed, up when open.
            className={cn(
              "size-5 transition-transform duration-200",
              isOpen ? "-rotate-90" : "rotate-90",
            )}
          />
        </button>
      </h2>
      <ul
        id={listId}
        className={cn(
          "mt-4 space-y-1 text-sm max-[481px]:mt-0 max-[481px]:pb-4",
          !isOpen && "max-[481px]:hidden",
        )}
      >
        {children}
      </ul>
    </div>
  );
}
