"use client";

import React from "react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { highlightGlossaryTerms } from "@/components/GlossaryTerm";
import FormulaBlock from "@/components/FormulaBlock";
import FeynmanCard from "@/components/learning-flows/FeynmanCard";
import CodeBlock from "@/components/lesson-blocks/CodeBlock";
import ExerciseBlock from "@/components/lesson-blocks/ExerciseBlock";
import { useI18n } from "@/lib/i18n/context";
import { Sys } from "@/components/ui/system";

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
              <strong key={pIdx} className="font-bold text-ink-max">
                {highlightGlossaryTerms(inner, seenTerms)}
              </strong>
            );
          }
          return <React.Fragment key={pIdx}>{highlightGlossaryTerms(part, seenTerms)}</React.Fragment>;
        });

        return (
          <span key={lineIdx} className="block">
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
          <div key={i} className="max-w-[68ch] text-xl leading-8 text-ink-heading">
            {renderFormattedText(block.text, seenTerms)}
          </div>
        );

      case "heading":
        return (
          <h2 key={i} id={`heading-${i}`} className="scroll-mt-24 border-t border-stone-300 pt-5 text-2xl font-black leading-tight tracking-tight text-ink-max dark:border-stone-700">
            {block.text}
          </h2>
        );

      case "paragraph":
        return (
          <div key={i} className="max-w-[68ch] text-lg leading-8">
            {renderFormattedText(block.text, seenTerms)}
          </div>
        );

      case "list":
        return (
          <ul key={i} className="my-4 max-w-[68ch] space-y-3 pl-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-lg leading-8 text-ink-body">
                <span aria-hidden className="mt-[0.8rem] h-1.5 w-1.5 flex-shrink-0 rounded-[1px] bg-stone-950 dark:bg-stone-200" />
                <div className="flex-1">{renderFormattedText(item, seenTerms)}</div>
              </li>
            ))}
          </ul>
        );

      case "callout":
        return (
          <div key={i} className="my-6 max-w-[68ch] space-y-1.5 border-l-2 border-stone-950 py-1 pl-4 dark:border-stone-200 sm:pl-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{block.label}</p>
            <div className="text-base leading-7 text-ink-heading sm:text-[17px] sm:leading-8">{renderFormattedText(block.text, seenTerms)}</div>
          </div>
        );

      case "comparison":
        return (
          <div key={i} className="my-6 grid grid-cols-1 overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 sm:grid-cols-2">
            {[block.left, block.right].map((side, j) => (
              <div
                key={side.label}
                className={`space-y-2 p-5 ${j > 0 ? "border-t border-line-strong sm:border-l sm:border-t-0" : ""}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{side.label}</p>
                <div className="text-base leading-7 text-ink-body">{renderFormattedText(side.text, seenTerms)}</div>
              </div>
            ))}
          </div>
        );

      case "conceptTable":
        return (
          <div key={i} className="my-6 overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
            <div className="border-b border-stone-300 bg-[#f3f1ec] px-4 py-3 dark:border-stone-700 dark:bg-stone-950 sm:px-5">
              <p className="text-lg font-black tracking-tight text-ink-max">{block.title}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{block.subtitle ?? t.finalTwo.lessonSections.defaultConceptTableSubtitle}</p>
            </div>
            <dl className="divide-y divide-stone-200 dark:divide-stone-800">
              {block.concepts.map(({ vi, en, def }, j) => (
                <div key={en} className="flex items-baseline gap-4 px-4 py-4 sm:px-5">
                  <Sys className="flex-shrink-0 text-ink-faint">{String(j + 1).padStart(2, "0")}</Sys>
                  <div className="min-w-0 flex-1">
                    <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-base font-bold text-ink-max">{vi}</span>
                      {/* Thuật ngữ gốc tiếng Anh: định danh, nên đi mono. */}
                      <span className="font-mono text-[13px] text-ink-muted">{en}</span>
                    </dt>
                    <dd className="mt-1 max-w-[68ch] text-base leading-7 text-ink-body">{def}</dd>
                  </div>
                </div>
              ))}
            </dl>
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
          <div key={i} className="my-6 max-w-[68ch] space-y-2 border-t border-stone-300 py-6 dark:border-stone-700">
            {block.lines.map((line, j) => (
              <p
                key={j}
                className={j === block.lines.length - 1 ? "text-xl font-black tracking-tight text-ink-max" : "text-base leading-7 text-ink-soft"}
              >
                {line}
              </p>
            ))}
          </div>
        );

      case "feynman":
        return (
          <div key={i} className="text-base">
            {block.title ? <h3 className="mb-3 text-xl font-black tracking-tight text-ink-max">{block.title}</h3> : null}
            <FeynmanCard
              badge={t.learningFlows.feynmanBadge}
              hint={t.learningFlows.feynmanHint}
              oneLinerLabel={t.learningFlows.oneLinerLabel}
              copy={block}
            />
          </div>
        );

      case "code":
        return <CodeBlock key={i} language={block.language} code={block.code} caption={block.caption} runnable={block.runnable} />;

      case "exercise":
        return (
          <ExerciseBlock
            key={i}
            language={block.language}
            title={block.title}
            task={block.task}
            starter={block.starter}
            solution={block.solution}
            expectedOutput={block.expectedOutput}
            hints={block.hints}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 text-lg leading-8 text-ink-body">
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
