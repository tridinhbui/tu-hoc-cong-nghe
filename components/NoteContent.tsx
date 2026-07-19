"use client";

import { useEffect, useState } from "react";

interface NoteContentProps {
  content: string;
}

type Segment =
  | { type: "text"; value: string }
  | { type: "block"; value: string }
  | { type: "inline"; value: string };

// At least 2 backslash-commands (\subseteq, \bigcup, \frac, \text, ...) in a
// paragraph is a strong signal it's pasted LaTeX, even with no $ delimiters
// at all - e.g. "K_n \subseteq \bigcup_{i=1}^{n} K_i \quad\text{and}\quad ...".
// Without this, a note like that rendered as literal backslash-soup instead
// of a formula, because there was nothing to tell it apart from plain text.
const LATEX_COMMAND = /\\[a-zA-Z]+/g;

function looksLikeBareLatex(paragraph: string): boolean {
  const matches = paragraph.match(LATEX_COMMAND);
  return (matches?.length ?? 0) >= 2;
}

// Shared by the note editors (LessonNotes, NotesOverviewClient) to decide
// whether to show a live preview while typing - must use the same detection
// as splitSegments below, or bare-LaTeX content (no $ at all) would render
// correctly once saved but never show a preview while editing.
export function hasMathContent(content: string): boolean {
  if (content.includes("$")) return true;
  return content.split(/\n\s*\n|\n/).some((p) => p.trim() && looksLikeBareLatex(p));
}

// Splits on $$...$$ (block math) first, then splits whatever text is left
// over on $...$ (inline math) - lets a note mix plain Vietnamese sentences
// with formulas like "$$\text{Giá trị} = \frac{FV}{(1+r)^n}$$" without
// needing a separate math-only field. Paragraphs that look like bare LaTeX
// (no $ at all, but multiple \commands) are auto-wrapped as display math.
function splitSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  const blockRegex = /\$\$([\s\S]+?)\$\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: "block", value: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) });
  }

  const withInline: Segment[] = [];
  for (const seg of segments) {
    if (seg.type !== "text") {
      withInline.push(seg);
      continue;
    }
    const inlineRegex = /\$([^$\n]+?)\$/g;
    let li = 0;
    let m: RegExpExecArray | null;
    while ((m = inlineRegex.exec(seg.value)) !== null) {
      if (m.index > li) withInline.push({ type: "text", value: seg.value.slice(li, m.index) });
      withInline.push({ type: "inline", value: m[1] });
      li = m.index + m[0].length;
    }
    if (li < seg.value.length) withInline.push({ type: "text", value: seg.value.slice(li) });
  }

  // Final pass: split remaining plain-text segments into paragraphs (blank
  // line or single newline) and promote any bare-LaTeX-looking ones to
  // display math.
  const final: Segment[] = [];
  for (const seg of withInline) {
    if (seg.type !== "text") {
      final.push(seg);
      continue;
    }
    const parts = seg.value.split(/(\n\s*\n|\n)/);
    for (const part of parts) {
      if (/^\n\s*\n$|^\n$/.test(part)) {
        final.push({ type: "text", value: part });
      } else if (part.trim() && looksLikeBareLatex(part)) {
        final.push({ type: "block", value: part.trim() });
      } else if (part) {
        final.push({ type: "text", value: part });
      }
    }
  }

  return final;
}

// katex is a heavy dependency (~250KB) that most notes never need - the
// vast majority are plain text, and hasMathContent() exists specifically to
// detect the rare case that isn't. Previously imported statically at module
// scope, so EVERY visit to the notes page paid katex's full bundle cost
// even with zero math notes, which was the actual cause of "ghi chú loads
// slowly" - not the notes query itself (a single, cheap, indexed select).
// Loaded lazily here and cached in a module-level promise, so it's fetched
// at most once per session and only when a math segment actually renders.
let katexPromise: Promise<typeof import("katex")> | null = null;
function loadKatex() {
  if (!katexPromise) {
    katexPromise = Promise.all([import("katex"), import("katex/dist/katex.min.css")]).then(([katex]) => katex);
  }
  return katexPromise;
}

function KatexSegment({ tex, displayMode }: { tex: string; displayMode: boolean }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadKatex()
      .then((katexModule) => {
        if (cancelled) return;
        try {
          // trust:false (the default) keeps HTML-generating commands like
          // \href and \includegraphics disabled, so this stays safe to
          // render from arbitrary user-typed note content.
          setHtml(katexModule.default.renderToString(tex, { throwOnError: false, displayMode }));
        } catch {
          setHtml(null);
        }
      })
      .catch(() => setHtml(null));
    return () => {
      cancelled = true;
    };
  }, [tex, displayMode]);

  // Fallback while katex loads (or if it fails): the raw LaTeX source, so
  // there's never a blank gap - just briefly unformatted.
  if (html === null) {
    return displayMode ? (
      <div className="my-2 overflow-x-auto font-mono text-xs text-stone-500 dark:text-stone-400">{tex}</div>
    ) : (
      <span className="font-mono text-xs text-stone-500 dark:text-stone-400">{tex}</span>
    );
  }

  return displayMode ? (
    <div className="my-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default function NoteContent({ content }: NoteContentProps) {
  const segments = splitSegments(content);

  // No math delimiters found at all - skip the wrapper markup (and any
  // katex loading whatsoever) and render exactly like a plain note always has.
  if (segments.length === 1 && segments[0].type === "text") {
    return <p className="text-sm text-stone-700 dark:text-stone-200 whitespace-pre-wrap">{content}</p>;
  }

  return (
    <div className="text-sm text-stone-700 dark:text-stone-200 whitespace-pre-wrap">
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        if (seg.type === "inline") return <KatexSegment key={i} tex={seg.value} displayMode={false} />;
        return <KatexSegment key={i} tex={seg.value} displayMode />;
      })}
    </div>
  );
}
