"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRightIcon, CloseIcon, ContentIcon, MenuIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { NavLink } from "./nav-link";
import type { HeaderNavItem, HeaderNavMenu } from "./nav-types";

type MobileNavProps = {
  items: HeaderNavItem[];
  cta: { href: string; label: string };
  labels: { nav: string; open: string; close: string };
};

/** Disclosure menu for small screens. Closes on Escape, on link click and on navigation. */
export function MobileNav({ items, cta, labels }: MobileNavProps) {
  const pathname = usePathname();
  // Remembering where the menu was opened closes it automatically when the route changes.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = () => setOpenedAt(null);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenedAt(null);
      buttonRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpenedAt(isOpen ? null : pathname)}
        className="inline-flex size-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-section"
      >
        {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        <span className="sr-only">{isOpen ? labels.close : labels.open}</span>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-b border-border bg-card shadow-lg"
      >
        <Container className="py-4">
          <nav aria-label={labels.nav}>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.label}>
                  {item.type === "link" ? (
                    <NavLink
                      href={item.href}
                      exact={item.exact}
                      onClick={close}
                      className="flex w-full text-base"
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <MobileSubmenu menu={item} onNavigate={close} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={cta.href} onClick={close} className="mt-4 w-full">
            {cta.label}
          </ButtonLink>
        </Container>
      </div>
    </div>
  );
}

/** A nav entry that expands in place to show its links. Starts open on its own pages. */
function MobileSubmenu({ menu, onNavigate }: { menu: HeaderNavMenu; onNavigate: () => void }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(menu.activePrefix);
  const [isExpanded, setIsExpanded] = useState(isActive);
  const listId = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={listId}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        className={cn(
          "flex min-h-11 w-full items-center justify-between rounded-md px-3 text-base font-semibold transition-colors hover:bg-section",
          isActive ? "text-secondary" : "text-primary",
        )}
      >
        {menu.label}
        <ChevronRightIcon
          className={cn("size-5 transition-transform duration-200", isExpanded ? "-rotate-90" : "rotate-90")}
        />
      </button>
      <ul id={listId} hidden={!isExpanded} className="mt-1 mb-2 ml-3 space-y-1 border-l-2 border-section pl-3">
        {menu.entries.map((entry) => {
          const isCurrent = pathname === entry.href;

          return (
            <li key={entry.href}>
              <Link
                href={entry.href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-section",
                  isCurrent ? "text-secondary" : "text-primary",
                )}
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-section text-secondary">
                  <ContentIcon name={entry.icon} className="size-4" />
                </span>
                {entry.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
