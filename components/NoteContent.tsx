"use client";

import katex from "katex";

interface NoteContentProps {
  content: string;
}

type Segment =
  | { type: "text"; value: string }
  | { type: "block"; value: string }
  | { type: "inline"; value: string };

// Splits on $$...$$ (block math) first, then splits whatever text is left
// over on $...$ (inline math) - lets a note mix plain Vietnamese sentences
// with formulas like "$$\text{Giá trị} = \frac{FV}{(1+r)^n}$$" without
// needing a separate math-only field.
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

  const final: Segment[] = [];
  for (const seg of segments) {
    if (seg.type !== "text") {
      final.push(seg);
      continue;
    }
    const inlineRegex = /\$([^$\n]+?)\$/g;
    let li = 0;
    let m: RegExpExecArray | null;
    while ((m = inlineRegex.exec(seg.value)) !== null) {
      if (m.index > li) final.push({ type: "text", value: seg.value.slice(li, m.index) });
      final.push({ type: "inline", value: m[1] });
      li = m.index + m[0].length;
    }
    if (li < seg.value.length) final.push({ type: "text", value: seg.value.slice(li) });
  }

  return final;
}

function renderKatex(tex: string, displayMode: boolean): string {
  try {
    // trust:false (the default) keeps HTML-generating commands like \href
    // and \includegraphics disabled, so this stays safe to render from
    // arbitrary user-typed note content.
    return katex.renderToString(tex, { throwOnError: false, displayMode });
  } catch {
    return tex;
  }
}

export default function NoteContent({ content }: NoteContentProps) {
  const segments = splitSegments(content);

  // No math delimiters found at all - skip the wrapper markup and render
  // exactly like a plain note always has.
  if (segments.length === 1 && segments[0].type === "text") {
    return <p className="text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{content}</p>;
  }

  return (
    <div className="text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        if (seg.type === "inline") {
          return <span key={i} dangerouslySetInnerHTML={{ __html: renderKatex(seg.value, false) }} />;
        }
        return (
          <div key={i} className="my-2 overflow-x-auto">
            <span dangerouslySetInnerHTML={{ __html: renderKatex(seg.value, true) }} />
          </div>
        );
      })}
    </div>
  );
}
