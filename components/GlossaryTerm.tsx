"use client";

import React, { useEffect, useRef, useState } from "react";
import { findGlossaryMatches } from "@/lib/finance-glossary";

// Dotted-underline term with a CSS-only (no JS/state needed) tooltip showing
// the English translation on hover/focus - server-renderable since it's
// plain markup, no client component required.
function GlossaryTermSpan({ term, en }: { term: string; en: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className="relative inline-block group/term">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="border-b border-dotted border-stone-400 dark:border-stone-500 cursor-help focus:outline-none"
      >
        {term}
      </button>
      <span className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 whitespace-nowrap rounded-md bg-stone-900 dark:bg-stone-700 text-white text-xs font-semibold px-2 py-1 transition-opacity z-20 ${
        open ? "opacity-100" : "pointer-events-none opacity-0 group-hover/term:opacity-100 group-focus-within/term:opacity-100"
      }`}>
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
