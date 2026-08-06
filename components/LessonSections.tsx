"use client";

import React from "react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { highlightGlossaryTerms } from "@/components/GlossaryTerm";
import FormulaBlock from "@/components/FormulaBlock";
import { useI18n } from "@/lib/i18n/context";

function renderFormattedText(text: string, seenTerms: Set<string>): React.ReactNode {
  // Split on double or single line breaks for clean paragraph spacing
  const lines = text.split(/\n\n|\n/);

  return (
    <span className="space-y-3 block">
      {lines.map((lineText, lineIdx) => {
        if (!lineText.trim()) return null;

        // Parse **bold** syntax inside each line
        const parts = lineText.split(/(\*\*[^*]+\*\*)/g);
        const formattedParts = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            const inner = part.slice(2, -2);
            return (
              <strong key={pIdx} className="font-extrabold text-stone-900 dark:text-stone-100">
                {highlightGlossaryTerms(inner, seenTerms)}
              </strong>
            );
          }
          return <React.Fragment key={pIdx}>{highlightGlossaryTerms(part, seenTerms)}</React.Fragment>;
        });

        return (
          <span key={lineIdx} className="block leading-relaxed">
            {formattedParts}
          </span>
        );
      })}
    </span>
  );
}

interface LessonSectionsProps {
  sections: LessonSectionBlock[];
  // Rendered inline immediately after the block at `checkpointAfterIndex`.
  // Taking it as a slot - rather than letting the caller split `sections`
  // and render this component twice - keeps one continuous pass over the
  // array, which matters for two things that would otherwise break: the
  // `heading-${i}` ids that LessonTableOfContents scrolls to (a second
  // render would restart i at 0 and collide), and the shared `seenTerms`
  // set below.
  checkpoint?: React.ReactNode;
  checkpointAfterIndex?: number;
}

export default function LessonSections({
  sections,
  checkpoint,
  checkpointAfterIndex = -1,
}: LessonSectionsProps) {
  const { t } = useI18n();
  // Shared across the whole lesson body so a term already highlighted once
  // (e.g. "dòng tiền" in an early paragraph) doesn't get re-wrapped every
  // time it's mentioned again later in the same lesson.
  const seenTerms = new Set<string>();

  const renderBlock = (block: LessonSectionBlock, i: number): React.ReactNode => {
    switch (block.type) {
      case "lead":
        return (
          <div key={i} className="text-xl leading-relaxed font-normal text-stone-800 dark:text-stone-100">
            {renderFormattedText(block.text, seenTerms)}
          </div>
        );

      case "heading":
        return (
          <h2 key={i} id={`heading-${i}`} className="text-2xl font-bold text-stone-900 dark:text-white scroll-mt-24 pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
            {block.text}
          </h2>
        );

      case "paragraph":
        return (
          <div key={i} className="text-lg leading-relaxed">
            {renderFormattedText(block.text, seenTerms)}
          </div>
        );

      case "list":
        return (
          <ul key={i} className="space-y-3 pl-1 my-4">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-stone-700 dark:text-stone-100 text-lg">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <div className="flex-1">{renderFormattedText(item, seenTerms)}</div>
              </li>
            ))}
          </ul>
        );

      case "callout":
        return (
          <div key={i} className="border-l-4 border-l-stone-900 dark:border-l-amber-400 bg-stone-50 dark:bg-stone-900/80 rounded-r-2xl p-5 sm:p-6 space-y-2 border border-stone-200 dark:border-stone-800 my-6">
            <p className="text-xs font-black text-stone-500 dark:text-stone-300 uppercase tracking-widest">{block.label}</p>
            <div className="text-stone-800 dark:text-stone-100 text-base leading-relaxed">{renderFormattedText(block.text, seenTerms)}</div>
          </div>
        );

      case "comparison":
        return (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[block.left, block.right].map((side) => (
              <div key={side.label} className="border border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900 rounded-2xl p-5 space-y-2 shadow-2xs">
                <p className="text-xs font-black text-stone-500 dark:text-stone-300 uppercase tracking-widest">{side.label}</p>
                <div className="text-base text-stone-700 dark:text-stone-100 leading-relaxed">{renderFormattedText(side.text, seenTerms)}</div>
              </div>
            ))}
          </div>
        );

      case "conceptTable":
        return (
          <div key={i} className="rounded-2xl overflow-hidden border-2 border-stone-900 dark:border-stone-700 shadow-lg my-6">
            <div className="bg-stone-900 dark:bg-stone-800 px-6 py-4">
              <p className="text-white font-extrabold text-lg tracking-wide">{block.title}</p>
              <p className="text-stone-300 text-sm mt-0.5">{block.subtitle ?? t.finalTwo.lessonSections.defaultConceptTableSubtitle}</p>
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800 bg-white/95 dark:bg-stone-900">
              {block.concepts.map(({ vi, en, def }) => (
                <div
                  key={en}
                  className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 dark:hover:bg-stone-800 hover:pl-8"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-bold text-stone-900 dark:text-stone-100 text-base group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">{vi}</span>
                      <span className="text-sm text-stone-500 dark:text-stone-300 font-mono bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">{en}</span>
                    </div>
                    <p className="text-stone-500 dark:text-stone-300 text-base mt-1 leading-relaxed group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">{def}</p>
                  </div>
                  <span className="text-stone-200 dark:text-stone-600 group-hover:text-stone-500 dark:group-hover:text-stone-300 transition-colors text-lg mt-0.5 flex-shrink-0">→</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "formula":
        return (
          <FormulaBlock
            key={i}
            title={block.title}
            label={block.label}
            numerator={block.numerator}
            denominator={block.denominator}
            multiplier={block.multiplier}
            equation={block.equation}
            variables={block.variables}
            example={block.example}
          />
        );

      case "closing":
        return (
          <div key={i} className="text-center space-y-2 py-6 border-t border-stone-200/80 dark:border-stone-800 my-6">
            {block.lines.map((line, j) => (
              <p
                key={j}
                className={j === block.lines.length - 1 ? "text-stone-900 dark:text-white font-bold text-xl" : "text-stone-600 dark:text-stone-200 text-base"}
              >
                {line}
              </p>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 text-stone-700 dark:text-stone-100 leading-relaxed text-lg">
      {sections.map((block, i) => {
        const rendered = renderBlock(block, i);
        if (checkpoint && i === checkpointAfterIndex) {
          return (
            <React.Fragment key={i}>
              {rendered}
              {checkpoint}
            </React.Fragment>
          );
        }
        return rendered;
      })}
    </div>
  );
}
