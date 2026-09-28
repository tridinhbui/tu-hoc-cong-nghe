"use client";

import { useState } from "react";
import { Check, Copy, Play } from "lucide-react";
import type { CodeLanguage, RunnableLanguage } from "@/lib/lesson-types";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { useI18n } from "@/lib/i18n/context";
import { CODE_TEXT, HighlightedCode, OutputPanel, useCodeRunner } from "./code-shared";

const RUNNABLE: ReadonlySet<CodeLanguage> = new Set<CodeLanguage>(["python", "javascript"]);

interface Props {
  language: CodeLanguage;
  code: string;
  caption?: string;
  runnable?: boolean;
}

export default function CodeBlock({ language, code, caption, runnable }: Props) {
  const { t } = useI18n();
  const canRun = Boolean(runnable) && RUNNABLE.has(language);

  return (
    <figure className="my-6 overflow-hidden rounded-md border border-stone-800 bg-[#1e1e1e]">
      <div className="flex items-center justify-between gap-3 border-b border-stone-700 px-4 py-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400">
          {t.lessonCode.languageNames[language]}
        </span>
        <CopyButton code={code} />
      </div>
      <pre className={`${CODE_TEXT} overflow-x-auto px-4 py-3`}>
        <code>
          <HighlightedCode code={code} language={language} />
        </code>
      </pre>
      {canRun ? <RunRow language={language as RunnableLanguage} code={code} /> : null}
      {caption ? (
        <figcaption className="border-t border-stone-700 bg-stone-900 px-4 py-2 text-sm leading-6 text-stone-300">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function RunRow({ language, code }: { language: RunnableLanguage; code: string }) {
  const { t } = useI18n();
  const { state, run, busy } = useCodeRunner(language);
  return (
    <>
      <div className="border-t border-stone-700 px-4 py-2">
        <button
          type="button"
          onClick={() => run(code)}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-sm bg-brand-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          <Play className="h-3.5 w-3.5" aria-hidden />
          {busy ? t.lessonCode.running : t.lessonCode.run}
        </button>
      </div>
      <OutputPanel state={state} language={language} />
    </>
  );
}

export function CopyButton({ code }: { code: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyToClipboard(code)) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      }}
      className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-bold text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? t.lessonCode.copied : t.lessonCode.copy}
    </button>
  );
}
