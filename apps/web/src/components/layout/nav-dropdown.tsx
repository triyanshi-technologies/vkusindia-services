"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { ArrowRightIcon, ChevronRightIcon, ContentIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { HeaderNavMenu } from "./nav-types";

/**
 * Desktop dropdown (disclosure pattern: a button that shows a panel of links).
 * Opens on hover with a mouse and on click/tap/Enter; closes on Escape, on a
 * click outside, when focus leaves it, and on navigation.
 */
export function NavDropdown({ label, activePrefix, entries, footer }: Omit<HeaderNavMenu, "type">) {
  const pathname = usePathname();
  // Remembering where it was opened closes it automatically when the route changes.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;
  const isActive = pathname.startsWith(activePrefix);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // A hover-opened panel shouldn't snap shut when the same mouse then clicks the button.
  const openedByHover = useRef(false);
  const panelId = useId();

  const open = () => {
    window.clearTimeout(closeTimer.current);
    setOpenedAt(pathname);
  };
  const close = () => {
    window.clearTimeout(closeTimer.current);
    openedByHover.current = false;
    setOpenedAt(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenedAt(null);
      buttonRef.current?.focus();
    }
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenedAt(null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    if (!isOpen) openedByHover.current = true;
    open();
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(close, 150);
  }

  function onButtonClick() {
    if (isOpen && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    if (isOpen) close();
    else open();
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onButtonClick}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-semibold transition-colors hover:bg-section",
          isActive || isOpen ? "text-secondary" : "text-primary",
        )}
      >
        {label}
        <ChevronRightIcon
          className={cn("size-4 transition-transform duration-200", isOpen ? "-rotate-90" : "rotate-90")}
        />
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        // pt-3 bridges the gap below the button so the mouse can travel into the panel.
        className="animate-pop absolute top-full left-1/2 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
      >
        <div className="overflow-hidden rounded-2xl bg-card shadow-2xl shadow-primary/15 ring-1 ring-border">
          <ul className="grid grid-cols-2 gap-1 p-3">
            {entries.map((entry) => {
              const isCurrent = pathname === entry.href;

              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={close}
                    className={cn(
                      "group flex h-full gap-4 rounded-xl p-3 transition-colors hover:bg-page",
                      isCurrent && "bg-page",
                    )}
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-section text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                      <ContentIcon name={entry.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-primary">{entry.label}</span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{entry.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-4 bg-section px-6 py-4">
            <p className="text-sm text-primary">{footer.text}</p>
            <Link
              href={footer.href}
              onClick={close}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-hover"
            >
              {footer.label}
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
