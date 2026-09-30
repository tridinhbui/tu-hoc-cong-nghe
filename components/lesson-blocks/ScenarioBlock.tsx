"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, CircleAlert, CheckCircle2, GitBranch, RotateCcw, Undo2 } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary, panel, Sys } from "@/components/ui/system";

/** Khối `scenario` - xem lib/lesson-types.ts. */
export type ScenarioBlockProps = Extract<LessonSectionBlock, { type: "scenario" }> & { onPass?: () => void };

type Step = { from: string; label: string };

export default function ScenarioBlock({ title, start, nodes, onPass }: ScenarioBlockProps) {
  const { t } = useI18n();
  const c = t.lessonBlockPractice;
  const [current, setCurrent] = useState(start);
  const [path, setPath] = useState<Step[]>([]);
  const passed = useRef(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const node = nodes[current];
  const ending = node?.ending;

  useEffect(() => {
    if (ending === "good" && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }, [ending, onPass]);

  // Chuyển cảnh thì đưa tiêu điểm về cảnh mới, để người dùng bàn phím không
  // bị kẹt trên một nút đã biến mất.
  useEffect(() => {
    if (moved.current) sceneRef.current?.focus();
  }, [current]);

  if (!node) return null;

  function choose(label: string, next: string) {
    moved.current = true;
    setPath((p) => [...p, { from: current, label }]);
    setCurrent(next);
  }
  function stepBack() {
    const last = path[path.length - 1];
    if (!last) return;
    moved.current = true;
    setPath((p) => p.slice(0, -1));
    setCurrent(last.from);
  }
  function restart() {
    moved.current = true;
    setPath([]);
    setCurrent(start);
  }

  return (
    <section className={`my-8 overflow-hidden ${panel}`}>
      <header className="space-y-2 border-b border-line px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-accent-strong">
          <GitBranch className="h-3.5 w-3.5" aria-hidden />
          <Sys>{c.kindScenario}</Sys>
        </p>
        <h3 className="text-lg font-black tracking-tight text-ink-max">{title}</h3>
      </header>

      <div className="space-y-4 px-4 py-4 sm:px-5">
        {path.length > 0 && (
          <nav aria-label={c.pathLabel}>
            <Sys className="text-ink-muted">{c.pathLabel}</Sys>
            <ol className="mt-1 flex flex-wrap items-center gap-1 text-xs text-ink-body">
              <li className="text-ink-muted">{c.pathStart}</li>
              {path.map((s, i) => (
                <li key={i} className="flex min-w-0 items-center gap-1">
                  <ChevronRight className="h-3 w-3 shrink-0 text-ink-faint" aria-hidden />
                  <span className="rounded-control bg-surface-raised px-2 py-0.5 [overflow-wrap:anywhere]">{s.label}</span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          ref={sceneRef}
          tabIndex={-1}
          aria-live="polite"
          className={`rounded-control border px-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
            ending === "good"
              ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40"
              : ending === "bad"
                ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40"
                : "border-line bg-surface-raised"
          }`}
        >
          {ending && (
            <p className={`mb-1 flex items-center gap-1.5 text-sm font-bold ${ending === "good" ? "text-cyan-800 dark:text-cyan-300" : "text-rose-700 dark:text-rose-300"}`}>
              {ending === "good" ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <CircleAlert className="h-4 w-4" aria-hidden />}
              {ending === "good" ? c.endingGood : c.endingBad}
            </p>
          )}
          <p className="whitespace-pre-line text-base leading-7 text-ink-max">{node.text}</p>
        </div>

        {!ending && node.choices && (
          <div role="group" aria-label={c.choicesLabel} className="space-y-2">
            <p className="text-sm font-bold text-ink-muted">{c.choicesLabel}</p>
            {node.choices.map((ch, i) => (
              <button
                key={i}
                type="button"
                onClick={() => choose(ch.label, ch.next)}
                className="flex w-full items-start gap-2 rounded-control border border-line bg-surface px-3 py-2 text-left text-sm leading-6 text-ink-body transition-colors hover:border-brand-300 hover:bg-accent-soft hover:text-ink-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-accent-strong" aria-hidden />
                <span>{ch.label}</span>
              </button>
            ))}
          </div>
        )}

        {ending && (
          <div className="flex flex-wrap gap-2">
            {ending === "bad" && path.length > 0 && (
              <button type="button" className={btnPrimary} onClick={stepBack}>
                <Undo2 className="h-4 w-4" aria-hidden />
                {c.stepBack}
              </button>
            )}
            <button type="button" className={btnSecondary} onClick={restart}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              {c.restart}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
