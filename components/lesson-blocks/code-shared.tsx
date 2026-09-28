"use client";

import { useCallback, useState, type ReactNode } from "react";
import { highlightCode, SYNTAX_CLASS } from "@/lib/code-runner/highlight";
import { isRunnerWarm, runCode, RUN_TIMEOUT_MS, type RunResult } from "@/lib/code-runner/run";
import type { CodeLanguage, RunnableLanguage } from "@/lib/lesson-types";
import { format } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";

/** Lớp chữ dùng chung cho <pre> tô màu và <textarea> nằm khít bên trên nó -
 *  hai lớp phải trùng từng pixel, nên cùng một chuỗi class. */
export const CODE_TEXT = "font-mono text-[13px] leading-6 sm:text-sm sm:leading-6 whitespace-pre [tab-size:4]";

export function HighlightedCode({ code, language }: { code: string; language: CodeLanguage }) {
  return (
    <>
      {highlightCode(code, language).map((tok, i) => (
        <span key={i} className={SYNTAX_CLASS[tok.kind]}>
          {tok.text}
        </span>
      ))}
    </>
  );
}

export type RunState = { status: "idle" } | { status: "loading" } | { status: "running" } | { status: "done"; result: RunResult };

export function useCodeRunner(language: RunnableLanguage) {
  const [state, setState] = useState<RunState>({ status: "idle" });
  const run = useCallback(
    async (code: string): Promise<RunResult> => {
      setState({ status: isRunnerWarm(language) ? "running" : "loading" });
      const result = await runCode(language, code);
      setState({ status: "done", result });
      return result;
    },
    [language],
  );
  return { state, run, busy: state.status === "loading" || state.status === "running" };
}

/** Khung đầu ra kiểu terminal: đầu ra in được trước, lỗi (nếu có) ở dưới. */
export function OutputPanel({ state, language }: { state: RunState; language: RunnableLanguage }) {
  const { t } = useI18n();
  const c = t.lessonCode;
  if (state.status === "idle") return null;

  let body: ReactNode;
  if (state.status === "loading") body = <p className="text-stone-400">{c.loadingPython}</p>;
  else if (state.status === "running") body = <p className="text-stone-400">{c.running}</p>;
  else {
    const r = state.result;
    const message = r.timedOut
      ? format(c.timedOut, { seconds: RUN_TIMEOUT_MS[language] / 1000 })
      : r.loadFailed
        ? c.loadFailed
        : r.inputUnsupported
          ? c.inputUnsupported
          : r.error;
    body = (
      <>
        {r.stdout ? (
          <pre className={`${CODE_TEXT} text-stone-100`}>{r.stdout}</pre>
        ) : !message ? (
          <p className="text-stone-400">{c.noOutput}</p>
        ) : null}
        {message ? (
          <p className="mt-1 whitespace-pre-wrap font-mono text-[13px] leading-6 text-red-300">
            {r.line && !r.timedOut && !r.loadFailed && !r.inputUnsupported ? format(c.errorOnLine, { line: r.line }) : c.error} {message}
          </p>
        ) : null}
      </>
    );
  }

  return (
    <div className="border-t border-stone-700 bg-stone-950 px-4 py-3" aria-live="polite">
      <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stone-500">{c.output}</p>
      <div className="overflow-x-auto">{body}</div>
    </div>
  );
}
