"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  /** Display value such as "$30.8B", "+26%" or "153,8 млн т". The first number is animated. */
  value: string;
};

/**
 * Counts the number in `value` up from zero once it scrolls into view.
 * The server renders the final value, so it is correct without JavaScript;
 * the animation writes to the DOM directly and never re-renders.
 * Decorative: pair it with the final value in screen reader text.
 */
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const raw = value.match(/\d+(?:[.,]\d+)?/)?.[0];
    if (!element || !raw) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const separator = raw.includes(",") ? "," : ".";
    const decimals = raw.split(/[.,]/)[1]?.length ?? 0;
    const target = Number(raw.replace(",", "."));
    const format = (n: number) => value.replace(raw, n.toFixed(decimals).replace(".", separator));

    let frame = 0;
    element.textContent = format(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1600, 1);
          const eased = 1 - (1 - progress) ** 3;
          element.textContent = format(target * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
