"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { CheckCircle2, Lightbulb, Play, RotateCcw, XCircle } from "lucide-react";
import type { RunnableLanguage } from "@/lib/lesson-types";
import { gradeOutput, type GradeResult } from "@/lib/code-runner/grade";
import { format } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";
import { CODE_TEXT, HighlightedCode, OutputPanel, useCodeRunner } from "./code-shared";
import { CopyButton } from "./CodeBlock";

interface Props {
  language: RunnableLanguage;
  title: string;
  task: string;
  starter: string;
  solution: string;
  expectedOutput: string;
  hints?: string[];
}

const INDENT = "    ";

// Ô soạn xuống dòng mềm thay vì cuộn ngang: <pre> tô màu và <textarea> phải
// ngắt dòng ở CÙNG chỗ, và hai phần tử chỉ làm được vậy khi cả hai cùng bọc
// chữ theo một luật. Cuộn ngang thì textarea cuộn một mình, lớp màu đứng yên.
const EDITOR_TEXT = CODE_TEXT.replace("whitespace-pre", "whitespace-pre-wrap [overflow-wrap:anywhere]");

export default function ExerciseBlock({ language, title, task, starter, solution, expectedOutput, hints = [] }: Props) {
  const { t } = useI18n();
  const c = t.lessonCode;
  const [code, setCode] = useState(starter);
  const [grade, setGrade] = useState<GradeResult | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const { state, run, busy } = useCodeRunner(language);
  const editorId = useId();

  const check = async () => {
    const result = await run(code);
    setAttempted(true);
    // Chương trình lỗi hay quá giờ thì chưa có gì để chấm - khung đầu ra đã
    // nói lý do, thêm "chưa khớp" chỉ là nói lại một điều sai hướng.
    setGrade(result.ok ? gradeOutput(result.stdout, expectedOutput) : null);
  };

  // Tab chèn bốn dấu cách thay vì nhảy ra khỏi ô: với Python, thụt lề LÀ cú
  // pháp. Shift+Tab và Esc vẫn để trình duyệt xử lý, nên bàn phím không bị nhốt.
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!busy) void check();
      return;
    }
    if (e.key !== "Tab" || e.shiftKey) return;
    e.preventDefault();
    const ta = e.currentTarget;
    const { selectionStart: s, selectionEnd: end } = ta;
    const next = code.slice(0, s) + INDENT + code.slice(end);
    setCode(next);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = s + INDENT.length;
    });
  };

  const lines = code.split("\n").length;

  return (
    <section className="my-8 overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
      <header className="space-y-2 border-b border-stone-300 bg-[#f3f1ec] px-4 py-3 dark:border-stone-700 dark:bg-stone-950 sm:px-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-accent-strong">
          <span>{c.exerciseBadge}</span>
          <span className="text-ink-faint">·</span>
          <span className="font-mono">{c.languageNames[language]}</span>
        </p>
        <h3 className="text-lg font-black tracking-tight text-ink-max">{title}</h3>
        <p className="max-w-[68ch] whitespace-pre-line text-base leading-7 text-ink-body">{task}</p>
        <p className="max-w-[68ch] text-sm leading-6 text-ink-muted">{c.exerciseHint}</p>
      </header>

      <div className="grid gap-0 border-b border-line-strong">
        <div className="px-4 py-3 sm:px-5">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{c.expected}</p>
          <pre className="overflow-x-auto rounded-sm bg-stone-100 px-3 py-2 font-mono text-[13px] leading-6 text-ink-max dark:bg-stone-800">
            {expectedOutput}
          </pre>
        </div>
      </div>

      <div className="bg-[#1e1e1e]">
        <div className="flex items-center justify-between border-b border-stone-700 px-4 py-2">
          <label htmlFor={editorId} className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400">
            {c.editorLabel}
          </label>
          <CopyButton code={code} />
        </div>
        <div className="relative max-h-[28rem] overflow-auto">
          {/* Lớp tô màu nằm dưới, textarea trong suốt nằm trên: người học gõ
              vào textarea thật (có con trỏ, chọn chữ, hoàn tác của trình
              duyệt), nhưng nhìn thấy mã đã tô màu. */}
          <pre aria-hidden className={`${EDITOR_TEXT} pointer-events-none px-4 py-3`}>
            <HighlightedCode code={code.endsWith("\n") ? code + " " : code} language={language} />
          </pre>
          <textarea
            id={editorId}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            rows={Math.max(lines, 4)}
            className={`${EDITOR_TEXT} absolute inset-0 h-full w-full resize-none overflow-hidden bg-transparent px-4 py-3 text-transparent caret-white outline-none selection:bg-brand-500/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-stone-700 px-4 py-2">
          <button
            type="button"
            onClick={() => void check()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
          >
            <Play className="h-3.5 w-3.5" aria-hidden />
            {busy ? c.running : c.check}
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(starter);
              setGrade(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-bold text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            {c.reset}
          </button>
          <span className="ml-auto hidden font-mono text-[11px] text-stone-500 sm:inline">{c.shortcut}</span>
        </div>
        <OutputPanel state={state} language={language} />
      </div>

      {grade ? <GradeBanner grade={grade} /> : null}

      <footer className="space-y-3 px-4 py-3 sm:px-5">
        {hints.slice(0, hintsShown).map((hint, i) => (
          <p key={i} className="flex items-start gap-2 text-sm leading-6 text-ink-body">
            <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
            <span>
              <span className="font-bold">{format(c.hintN, { n: i + 1, total: hints.length })}: </span>
              {hint}
            </span>
          </p>
        ))}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {hintsShown < hints.length ? (
            <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="font-bold text-accent-strong underline-offset-4 hover:underline">
              {c.showHint} ({hintsShown + 1}/{hints.length})
            </button>
          ) : null}
          {attempted ? (
            <button type="button" onClick={() => setSolutionOpen((o) => !o)} className="font-bold text-accent-strong underline-offset-4 hover:underline">
              {solutionOpen ? c.hideSolution : c.showSolution}
            </button>
          ) : (
            <span className="text-ink-muted">{c.solutionLocked}</span>
          )}
        </div>
        {solutionOpen ? (
          <pre className={`${CODE_TEXT} overflow-x-auto rounded-sm bg-[#1e1e1e] px-4 py-3`}>
            <HighlightedCode code={solution} language={language} />
          </pre>
        ) : null}
      </footer>
    </section>
  );
}

function GradeBanner({ grade }: { grade: GradeResult }) {
  const { t } = useI18n();
  const c = t.lessonCode;
  if (grade.pass) {
    return (
      <p role="status" className="flex items-center gap-2 border-b border-stone-300 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800 dark:border-stone-700 dark:bg-brand-950/40 dark:text-brand-200 sm:px-5">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        {c.pass}
      </p>
    );
  }
  return (
    <div role="status" className="space-y-1 border-b border-stone-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-stone-700 dark:bg-red-950/40 dark:text-red-100 sm:px-5">
      <p className="flex items-center gap-2 font-bold">
        <XCircle className="h-4 w-4" aria-hidden />
        {grade.line ? format(c.failLine, { line: grade.line }) : c.failGeneric}
      </p>
      {grade.line ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 font-mono text-[13px] leading-6">
          <dt className="text-danger">{c.failExpected}</dt>
          <dd className="whitespace-pre-wrap break-all">{grade.expectedLine || " "}</dd>
          <dt className="text-danger">{c.failActual}</dt>
          <dd className="whitespace-pre-wrap break-all">{grade.actualLine ?? c.failMissing}</dd>
        </dl>
      ) : null}
    </div>
  );
}
