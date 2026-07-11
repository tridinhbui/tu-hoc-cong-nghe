import React from "react";
import { findGlossaryMatches } from "@/lib/finance-glossary";

// Dotted-underline term with a CSS-only (no JS/state needed) tooltip showing
// the English translation on hover/focus - server-renderable since it's
// plain markup, no client component required.
function GlossaryTermSpan({ term, en }: { term: string; en: string }) {
  return (
    <span className="relative inline-block group/term">
      <span
        tabIndex={0}
        className="border-b border-dotted border-stone-400 dark:border-stone-500 cursor-help focus:outline-none"
      >
        {term}
      </span>
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap rounded-md bg-stone-900 dark:bg-stone-700 text-white text-xs font-semibold px-2 py-1 opacity-0 group-hover/term:opacity-100 group-focus-within/term:opacity-100 transition-opacity z-20">
        {en}
      </span>
    </span>
  );
}

// Splits `text` on the first occurrence of each not-yet-seen glossary term
// and wraps those with GlossaryTermSpan. `seen` should be a Set shared
// across an entire lesson body so the same term isn't highlighted twice.
export function highlightGlossaryTerms(text: string, seen: Set<string>): React.ReactNode {
  const matches = findGlossaryMatches(text, seen);
  if (matches.length === 0) return text;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, idx) => {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(
      <GlossaryTermSpan key={idx} term={text.slice(m.start, m.end)} en={m.en} />
    );
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
