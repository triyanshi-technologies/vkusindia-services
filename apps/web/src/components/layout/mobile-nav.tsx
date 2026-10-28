"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { NavLink } from "./nav-link";

type MobileNavProps = {
  items: { href: string; label: string; exact: boolean }[];
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
        className="absolute inset-x-0 top-full border-b border-border bg-card shadow-lg"
      >
        <Container className="py-4">
          <nav aria-label={labels.nav}>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    exact={item.exact}
                    onClick={close}
                    className="flex w-full text-base"
                  >
                    {item.label}
                  </NavLink>
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
