type ScrollMarqueeProps = {
  /** Words shown in both rows. Repeated to fill the width. */
  words: string[];
};

/**
 * Two rows of oversized words that slide in opposite directions as the page
 * scrolls. Moves only with the scroll (never on its own) and is purely
 * decorative, so it is hidden from assistive technology.
 */
export function ScrollMarquee({ words }: ScrollMarqueeProps) {
  const row = [...words, ...words, ...words, ...words];

  return (
    <div aria-hidden="true" className="overflow-clip bg-page py-14 select-none sm:py-20">
      <div className="slide-start flex w-max gap-10 text-4xl font-bold tracking-tight whitespace-nowrap text-primary sm:text-6xl">
        {row.map((word, index) => (
          <span key={index} className="flex items-center gap-10">
            {word}
            <span className="size-3 rounded-full bg-secondary sm:size-4" />
          </span>
        ))}
      </div>
      <div className="slide-end mt-4 flex w-max gap-10 text-4xl font-bold tracking-tight whitespace-nowrap sm:mt-6 sm:text-6xl">
        {row.map((word, index) => (
          <span key={index} className="text-outline flex items-center gap-10">
            {word}
            <span className="size-3 rounded-full border-2 border-secondary sm:size-4" />
          </span>
        ))}
      </div>
    </div>
  );
}
