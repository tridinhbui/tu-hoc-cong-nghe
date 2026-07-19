"use client";

import katex from "katex";
import "katex/dist/katex.min.css";

// Renders inline math $...$ and bold **...**
export function renderInlineStyles(text: string): React.ReactNode[] {
  if (!text) return [];
  const parts = text.split(/\$([\s\S]+?)\$/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      try {
        const cleanMath = part.replace(/\\\\/g, "\\");
        const html = katex.renderToString(cleanMath, { throwOnError: false, displayMode: false });
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <code key={i} className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">{part}</code>;
      }
    }

    const boldParts = part.split(/\*\*([^*]+?)\*\*/g);
    return boldParts.map((subPart, j) => {
      if (j % 2 === 1) {
        return (
          <strong key={`${i}-${j}`} className="font-extrabold text-stone-900 dark:text-white">
            {subPart}
          </strong>
        );
      }
      return <span key={`${i}-${j}`}>{subPart}</span>;
    });
  });
}

const YOUTUBE_URL_RE =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i;

function extractYoutubeId(line: string): string | null {
  const match = line.match(YOUTUBE_URL_RE);
  return match ? match[1] : null;
}

// Renders a real-time playable embed instead of leaving a bare YouTube URL
// as plain text - CFA module content is a plain-text column (see below), so
// any link an author pasted in would otherwise just sit there unclickable-
// looking or as a wall of text, unlike personal-finance lessons which have
// a dedicated video block type.
function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="my-4 aspect-video w-full rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

// Custom Markdown & Math renderer for CFA module content (plain-text
// content column, not the JSON `sections` format personal-finance lessons
// use, so it can't reuse components/LessonSections.tsx).
export default function CfaContentRenderer({ content }: { content: string }) {
  const blocks = content.split(/\$\$([\s\S]+?)\$\$/g);

  return (
    <div className="space-y-4 text-sm text-stone-750 dark:text-stone-300 leading-relaxed font-normal">
      {blocks.map((block, index) => {
        if (index % 2 === 1) {
          try {
            const html = katex.renderToString(block, { throwOnError: false, displayMode: true });
            return (
              <div key={index} className="my-5 overflow-x-auto py-3 bg-stone-50 dark:bg-stone-900/30 rounded-xl px-4 border border-stone-200/50 dark:border-stone-800 shadow-inner">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            );
          } catch {
            return (
              <pre key={index} className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-x-auto text-xs font-mono">
                {block}
              </pre>
            );
          }
        }

        const lines = block.split("\n");
        let listItems: string[] = [];
        let tableRows: string[][] = [];
        const renderedElements: React.ReactNode[] = [];

        const flushList = (key: string) => {
          if (listItems.length > 0) {
            renderedElements.push(
              <ul key={key} className="list-disc pl-5 space-y-1.5 my-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-stone-700 dark:text-stone-300">
                    {renderInlineStyles(item)}
                  </li>
                ))}
              </ul>
            );
            listItems = [];
          }
        };

        const flushTable = (key: string) => {
          if (tableRows.length > 0) {
            const headerCols = tableRows[0];
            const bodyRows = tableRows.slice(2);

            renderedElements.push(
              <div key={key} className="my-4 overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 text-xs text-left">
                  <thead className="bg-stone-50 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 font-extrabold uppercase tracking-wider">
                    <tr>
                      {headerCols.map((col, idx) => (
                        <th key={idx} className="px-4 py-3 font-extrabold">
                          {renderInlineStyles(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-850 bg-white dark:bg-stone-900">
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors odd:bg-white even:bg-stone-50/30 dark:odd:bg-stone-900 dark:even:bg-stone-900/30">
                        {row.map((col, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-stone-600 dark:text-stone-400">
                            {renderInlineStyles(col)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            tableRows = [];
          }
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmed = line.trim();

          if (!trimmed) {
            flushList(`list-flush-${i}`);
            flushTable(`table-flush-${i}`);
            continue;
          }

          if (trimmed.startsWith("|")) {
            flushList(`list-table-${i}`);
            const cols = line.split("|").map((c) => c.trim());
            if (line.trim().startsWith("|")) cols.shift();
            if (line.trim().endsWith("|")) cols.pop();
            tableRows.push(cols);
            continue;
          } else {
            flushTable(`table-flush-${i}`);
          }

          if (trimmed.startsWith("# ")) {
            flushList(`list-h1-${i}`);
            renderedElements.push(
              <h1 key={i} className="text-lg font-extrabold text-stone-900 dark:text-white mt-6 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1.5 first:mt-0">
                {renderInlineStyles(trimmed.slice(2))}
              </h1>
            );
          } else if (trimmed.startsWith("## ")) {
            flushList(`list-h2-${i}`);
            renderedElements.push(
              <h2 key={i} className="text-base font-extrabold text-stone-900 dark:text-white mt-5 mb-2">
                {renderInlineStyles(trimmed.slice(3))}
              </h2>
            );
          } else if (trimmed.startsWith("### ")) {
            flushList(`list-h3-${i}`);
            renderedElements.push(
              <h3 key={i} className="text-sm font-extrabold text-stone-850 dark:text-stone-200 mt-4 mb-1.5">
                {renderInlineStyles(trimmed.slice(4))}
              </h3>
            );
          } else if (trimmed.startsWith("> ")) {
            flushList(`list-bq-${i}`);
            renderedElements.push(
              <blockquote key={i} className="pl-4 border-l-4 border-stone-300 dark:border-stone-700 italic text-stone-600 dark:text-stone-400 my-3">
                {renderInlineStyles(trimmed.slice(2))}
              </blockquote>
            );
          } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            listItems.push(trimmed.slice(2));
          } else if (/^\d+\.\s+/.test(trimmed)) {
            flushList(`list-num-${i}`);
            const text = trimmed.replace(/^\d+\.\s+/, "");
            renderedElements.push(
              <div key={i} className="flex gap-2 pl-1 my-2 text-stone-700 dark:text-stone-300">
                <span className="font-bold text-stone-900 dark:text-white font-mono">{trimmed.match(/^\d+/)?.[0]}.</span>
                <div className="flex-1">{renderInlineStyles(text)}</div>
              </div>
            );
          } else if (extractYoutubeId(trimmed)) {
            flushList(`list-yt-${i}`);
            renderedElements.push(<YoutubeEmbed key={i} videoId={extractYoutubeId(trimmed)!} />);
          } else {
            flushList(`list-p-${i}`);
            renderedElements.push(
              <p key={i} className="my-2 text-stone-700 dark:text-stone-300">
                {renderInlineStyles(line)}
              </p>
            );
          }
        }

        flushList(`list-final-${index}`);
        flushTable(`table-final-${index}`);
        return <div key={index}>{renderedElements}</div>;
      })}
    </div>
  );
}
