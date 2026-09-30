"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bot, CheckCircle2, CircleAlert, RotateCcw, Send, User, XCircle } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { format } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary, panel, Sys } from "@/components/ui/system";

/** Khối `aiLab` - xem lib/lesson-types.ts. Không gọi AI thật: mọi câu trả
 *  lời là chữ viết sẵn trong khối, không có mạng. */
export type AiLabBlockProps = Extract<LessonSectionBlock, { type: "aiLab" }> & { onPass?: () => void };
type PromptProps = Extract<AiLabBlockProps, { mode: "prompt" }> & { onPass?: () => void };
type SpotProps = Extract<AiLabBlockProps, { mode: "spotError" }> & { onPass?: () => void };

export default function AiLabBlock(props: AiLabBlockProps) {
  return props.mode === "spotError" ? <SpotErrorLab {...props} /> : <PromptLab {...props} />;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Hiện dần chữ như đang gõ; tắt chuyển động thì hiện ngay. */
function useTyped(text: string, runKey: number): string {
  const [progress, setProgress] = useState({ run: -1, n: 0 });
  const instant = !text || prefersReducedMotion();
  useEffect(() => {
    if (instant) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + 3);
      setProgress({ run: runKey, n: i });
      if (i >= text.length) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [text, runKey, instant]);
  if (instant) return text;
  return progress.run === runKey ? text.slice(0, progress.n) : "";
}

function Header({ kind, title, task }: { kind: string; title: string; task: string }) {
  const { t } = useI18n();
  return (
    <header className="space-y-2 border-b border-line px-4 py-3 sm:px-5">
      <p className="flex items-center gap-2 text-accent-strong">
        <Bot className="h-3.5 w-3.5" aria-hidden />
        <Sys>{kind}</Sys>
      </p>
      <h3 className="text-lg font-black tracking-tight text-ink-max">{title}</h3>
      <p className="max-w-[68ch] whitespace-pre-line text-base leading-7 text-ink-body">{task}</p>
      <p className="text-xs text-ink-muted">{t.lessonBlockPractice.simulatedNote}</p>
    </header>
  );
}

function PromptLab({ title, task, parts, responses, onPass }: PromptProps) {
  const { t } = useI18n();
  const c = t.lessonBlockPractice;
  const [choice, setChoice] = useState<Record<string, number>>({});
  const [sent, setSent] = useState<{ choice: Record<string, number>; reply: string } | null>(null);
  const [runKey, setRunKey] = useState(0);
  const passed = useRef(false);

  const complete = parts.every((p) => choice[p.id] !== undefined);
  const promptText = parts
    .filter((p) => choice[p.id] !== undefined)
    .map((p) => p.options[choice[p.id]].text)
    .join("\n");
  const isGood = (sel: Record<string, number>, id: string) => {
    const p = parts.find((x) => x.id === id);
    return !!p && sel[id] !== undefined && !!p.options[sel[id]]?.good;
  };
  const changed = sent !== null && parts.some((p) => sent.choice[p.id] !== choice[p.id]);
  const allGoodSent = sent !== null && parts.every((p) => isGood(sent.choice, p.id));
  const typed = useTyped(sent?.reply ?? "", runKey);

  function send() {
    if (!complete) return;
    const snap = { ...choice };
    const reply = responses.find((r) => (r.requires ?? []).every((id) => isGood(snap, id))) ?? responses[responses.length - 1];
    setSent({ choice: snap, reply: reply.text });
    setRunKey((k) => k + 1);
    if (parts.every((p) => isGood(snap, p.id)) && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }

  return (
    <section className={`my-8 overflow-hidden ${panel}`}>
      <Header kind={c.kindPrompt} title={title} task={task} />
      <div className="space-y-4 px-4 py-4 sm:px-5">
        <p className="text-sm font-bold text-ink-muted">{c.pickPart}</p>
        {parts.map((p) => (
          <fieldset key={p.id} className="space-y-2">
            <legend className="mb-1 text-sm font-bold text-ink-max">{p.label}</legend>
            <div className="flex flex-col gap-2">
              {p.options.map((o, oi) => {
                const on = choice[p.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setChoice((s) => ({ ...s, [p.id]: oi }))}
                    className={`w-full rounded-control border px-3 py-2 text-left text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                      on ? "border-accent bg-accent-soft text-ink-max" : "border-line bg-surface-raised text-ink-body hover:border-brand-300"
                    }`}
                  >
                    {o.text}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="rounded-control border border-line-strong">
          <p className="border-b border-line px-3 py-1.5 text-ink-muted">
            <Sys>{c.composer}</Sys>
          </p>
          <p aria-live="polite" className={`min-h-[3rem] whitespace-pre-line px-3 py-2 text-sm leading-6 ${promptText ? "text-ink-max" : "text-ink-muted"}`}>
            {promptText || c.composerEmpty}
          </p>
          <div className="flex justify-end border-t border-line px-3 py-2">
            <button type="button" className={btnPrimary} onClick={send} disabled={!complete}>
              <Send className="h-4 w-4" aria-hidden />
              {sent ? c.resend : c.send}
            </button>
          </div>
        </div>

        {sent && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <User className="mt-1 h-4 w-4 shrink-0 text-ink-muted" aria-label={c.you} />
              <p className="whitespace-pre-line rounded-control bg-surface-raised px-3 py-2 text-sm leading-6 text-ink-body">
                {parts.map((p) => p.options[sent.choice[p.id]].text).join("\n")}
              </p>
            </div>
            <div className="flex gap-2">
              <Bot className="mt-1 h-4 w-4 shrink-0 text-accent-strong" aria-label={c.assistant} />
              <div className="min-w-0 flex-1 rounded-control border border-line px-3 py-2">
                <Sys className="text-ink-muted">{c.assistant}</Sys>
                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink-max" data-testid="ailab-reply">
                  {typed || c.typing}
                </p>
                <p className="sr-only" role="status">{sent.reply}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-ink-max">{c.feedbackTitle}</p>
              <ul className="space-y-2">
                {parts.map((p) => {
                  const o = p.options[sent.choice[p.id]];
                  const good = !!o.good;
                  return (
                    <li key={p.id} className={`rounded-control border px-3 py-2 text-sm leading-6 ${good ? "border-cyan-600/40 bg-cyan-50 dark:bg-cyan-950/30" : "border-rose-500/40 bg-rose-50 dark:bg-rose-950/30"}`}>
                      <p className="flex flex-wrap items-center gap-2 font-bold text-ink-max">
                        {good ? <CheckCircle2 className="h-4 w-4 text-cyan-700 dark:text-cyan-400" aria-hidden /> : <CircleAlert className="h-4 w-4 text-alert" aria-hidden />}
                        {p.label}
                        <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">{good ? c.partGood : c.partNeedsWork}</span>
                      </p>
                      <p className="mt-1 text-ink-body">{o.feedback}</p>
                    </li>
                  );
                })}
              </ul>
              <p role="status" className={`text-sm font-bold ${allGoodSent ? "text-cyan-700 dark:text-cyan-400" : "text-ink-body"}`}>
                {changed ? c.changedSinceSend : allGoodSent ? c.promptPassed : c.promptTryAgain}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SpotErrorLab({ title, task, segments, onPass }: SpotProps) {
  const { t } = useI18n();
  const c = t.lessonBlockPractice;
  const [flags, setFlags] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const passed = useRef(false);

  const errorIdx = segments.map((s, i) => (s.error !== undefined ? i : -1)).filter((i) => i >= 0);
  const caught = errorIdx.filter((i) => flags.has(i)).length;
  const falseFlags = [...flags].filter((i) => segments[i]?.error === undefined).length;
  const ok = caught === errorIdx.length && falseFlags <= 1;

  function toggle(i: number) {
    if (checked) return;
    setFlags((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  }

  function check() {
    setChecked(true);
    if (ok && !passed.current) {
      passed.current = true;
      onPass?.();
    }
  }

  return (
    <section className={`my-8 overflow-hidden ${panel}`}>
      <Header kind={c.kindSpotError} title={title} task={task} />
      <div className="space-y-4 px-4 py-4 sm:px-5">
        <p className="text-sm text-ink-muted">{c.spotHint}</p>
        <div className="rounded-control border border-line-strong">
          <p className="flex items-center gap-2 border-b border-line px-3 py-1.5 text-ink-muted">
            <Bot className="h-3.5 w-3.5" aria-hidden />
            <Sys>{c.draftLabel}</Sys>
          </p>
          <ol className="space-y-1 p-2">
            {segments.map((s, i) => {
              const on = flags.has(i);
              const isErr = s.error !== undefined;
              let tone = on ? "border-accent bg-accent-soft text-ink-max" : "border-transparent text-ink-body hover:bg-surface-raised";
              let verdict: { icon: ReactNode; label: string } | null = null;
              if (checked) {
                if (isErr && on) {
                  tone = "border-cyan-600 bg-cyan-50 text-ink-max dark:bg-cyan-950/40";
                  verdict = { icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />, label: c.spotCaught };
                } else if (isErr) {
                  tone = "border-rose-500 bg-rose-50 text-ink-max dark:bg-rose-950/40";
                  verdict = { icon: <XCircle className="h-3.5 w-3.5" aria-hidden />, label: c.spotMissed };
                } else if (on) {
                  tone = "border-amber-500 bg-amber-50 text-ink-max dark:bg-amber-950/40";
                  verdict = { icon: <CircleAlert className="h-3.5 w-3.5" aria-hidden />, label: c.spotFalse };
                } else tone = "border-transparent text-ink-body";
              }
              return (
                <li key={i}>
                  <button
                    type="button"
                    aria-pressed={on}
                    disabled={checked}
                    onClick={() => toggle(i)}
                    className={`w-full rounded-control border-2 px-3 py-2 text-left text-sm leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 disabled:cursor-default ${tone}`}
                  >
                    {s.text}
                  </button>
                  {verdict && (
                    <p className="flex items-start gap-1.5 px-3 pt-1 text-xs leading-5 text-ink-body">
                      <span className="mt-0.5 shrink-0">{verdict.icon}</span>
                      <span>
                        <strong>{verdict.label}</strong>
                        {isErr && s.error ? ` - ${s.error}` : ""}
                      </span>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-ink-muted">{format(c.flaggedCount, { count: flags.size })}</span>
          {checked ? (
            <button type="button" className={btnSecondary} onClick={() => { setChecked(false); setFlags(new Set()); }}>
              <RotateCcw className="h-4 w-4" aria-hidden />
              {c.retry}
            </button>
          ) : (
            <button type="button" className={btnPrimary} onClick={check}>
              {c.check}
            </button>
          )}
        </div>
        {checked && (
          <div role="status" className="space-y-1 text-sm">
            <p className="text-ink-body">{format(c.spotSummary, { caught, total: errorIdx.length, falseFlags })}</p>
            <p className={`font-bold ${ok ? "text-cyan-700 dark:text-cyan-400" : "text-rose-700 dark:text-rose-300"}`}>{ok ? c.spotPassed : c.spotFailed}</p>
          </div>
        )}
      </div>
    </section>
  );
}
