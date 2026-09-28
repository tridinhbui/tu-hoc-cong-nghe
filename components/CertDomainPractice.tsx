"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X, XCircle, Sparkles } from "lucide-react";
import { submitQuizSession, type QuizAnswerSubmission } from "@/lib/cloudflare-quiz-sessions";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import { getCurrentUserId } from "@/lib/current-user";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/**
 * Luyện một miền thi trên /chung-chi/<certId>.
 *
 * Câu hỏi là quiz của chính các bài thuộc miền (app/api/knowledge-challenge,
 * track "cert"), không phải kho đề riêng - nên không có câu nào chưa qua
 * `npm run audit:lessons`. Server xáo phương án và ký đáp án vào token; điểm
 * và XP do route nộp bài tính lại từ token, client chỉ hiện.
 *
 * Mười câu: đủ để biết một miền đã chắc hay chưa, ngắn đủ để làm giữa hai bài.
 */

const QUESTION_COUNT = 10;
/** Ngưỡng "nắm khá chắc" - cùng mức 80% với thi vượt chặng. */
const STRONG_RATIO = 0.8;

interface Question {
  lessonTitle: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
}

type Stage = "loading" | "error" | "empty" | "login" | "quiz" | "done";

export default function CertDomainPractice({
  certId,
  domainId,
  domainTitle,
  onClose,
}: {
  certId: string;
  domainId: string;
  domainTitle: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const p = t.certTracks.practice;
  const [stage, setStage] = useState<Stage>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswerSubmission[]>([]);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState<number | null>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch(
        `/api/knowledge-challenge?track=cert&cert=${encodeURIComponent(certId)}&domain=${encodeURIComponent(domainId)}&count=${QUESTION_COUNT}`
      ).catch(() => null);
      if (cancelled) return;
      if (!res) return setStage("error");
      if (res.status === 401) return setStage("login");
      if (!res.ok) return setStage("error");
      const data = (await res.json()) as { questions?: Question[] };
      if (cancelled) return;
      if (!data.questions?.length) return setStage("empty");
      setQuestions(data.questions);
      setStage("quiz");
    })();
    return () => {
      cancelled = true;
    };
  }, [certId, domainId, round]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  function check() {
    if (selected === null || !q) return;
    setChecked(true);
    if (selected === q.correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { token: q.token, selected }]);
  }

  async function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    setStage("done");
    try {
      const result = await submitQuizSession("cert", "tat-ca", answers);
      setXp(result.xpEarned);
      const userId = await getCurrentUserId();
      if (userId) await recalculateUserStats(userId);
    } catch (error) {
      console.error("Error recording cert practice:", error);
      setXp(0);
    }
  }

  function retry() {
    setQuestions([]);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setScore(0);
    setXp(null);
    setStage("loading");
    setRound((r) => r + 1);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={format(p.title, { domain: domainTitle })}
      onClick={onClose}
    >
      <div
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl sm:rounded-3xl dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-black text-ink-max">{format(p.title, { domain: domainTitle })}</h2>
            {questions.length > 0 && (
              <p className="mt-0.5 text-xs text-ink-muted">{format(p.subtitle, { count: questions.length })}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={p.close}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-raised"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {stage === "loading" && <p className="py-10 text-center text-sm text-ink-muted">{p.loading}</p>}
          {stage === "error" && <p className="py-10 text-center text-sm text-ink-muted">{p.error}</p>}
          {stage === "empty" && <p className="py-10 text-center text-sm text-ink-muted">{p.empty}</p>}
          {stage === "login" && <p className="py-10 text-center text-sm text-ink-muted">{p.loginNeeded}</p>}

          {stage === "quiz" && q && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-ink-muted">
                <span className="font-mono">{format(p.questionOf, { n: index + 1, total: questions.length })}</span>
                <span className="truncate">{format(p.fromLesson, { title: q.lessonTitle })}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all"
                  style={{ width: `${Math.round(((index + (checked ? 1 : 0)) / questions.length) * 100)}%` }}
                />
              </div>
              <p className="text-sm font-bold leading-relaxed text-ink-max">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isPicked = selected === i;
                  const isRight = checked && i === q.correct;
                  const isWrongPick = checked && isPicked && i !== q.correct;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={checked}
                      onClick={() => setSelected(i)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        isRight
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                          : isWrongPick
                            ? "border-rose-400 bg-rose-50 dark:bg-rose-950/30"
                            : isPicked
                              ? "border-brand-500 bg-brand-50/60 dark:bg-brand-950/30"
                              : "border-line hover:border-brand-300"
                      }`}
                    >
                      <span className="mt-0.5 font-mono text-xs font-black text-ink-faint">{String.fromCharCode(65 + i)}</span>
                      <span className="flex-1 text-ink">{opt}</span>
                      {isRight && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />}
                      {isWrongPick && <XCircle className="h-4 w-4 shrink-0 text-rose-500" />}
                    </button>
                  );
                })}
              </div>
              {checked && (
                <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
                  <p className={`text-xs font-black ${selected === q.correct ? "text-accent-strong" : "text-alert"}`}>
                    {selected === q.correct ? p.right : p.wrong}
                  </p>
                  {q.explanation && (
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      <span className="font-bold text-ink">{p.explanation}: </span>
                      {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {stage === "done" && (
            <div className="space-y-3 py-6 text-center">
              <p className="font-mono text-[11px] font-bold tracking-wider text-ink-muted uppercase">{p.resultTitle}</p>
              <p className="text-3xl font-black text-ink-max">{format(p.resultScore, { score, total: questions.length })}</p>
              <p className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
                <Sparkles className="h-4 w-4" />
                {xp === null ? p.saving : format(p.xpEarned, { xp })}
              </p>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-ink-muted">
                {score >= Math.ceil(questions.length * STRONG_RATIO) ? p.strong : p.weak}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-line px-5 py-3">
          {stage === "quiz" &&
            (checked ? (
              <button
                type="button"
                onClick={() => void next()}
                className="rounded-xl bg-brand-900 px-5 py-2.5 text-xs font-black text-white hover:bg-brand-700"
              >
                {isLast ? p.finish : p.next}
              </button>
            ) : (
              <button
                type="button"
                onClick={check}
                disabled={selected === null}
                className="rounded-xl bg-brand-900 px-5 py-2.5 text-xs font-black text-white hover:bg-brand-700 disabled:opacity-40"
              >
                {p.check}
              </button>
            ))}
          {stage === "done" && (
            <button
              type="button"
              onClick={retry}
              className="rounded-xl border border-line px-5 py-2.5 text-xs font-black text-ink hover:border-brand-300"
            >
              {p.retry}
            </button>
          )}
          {stage !== "quiz" && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-brand-900 px-5 py-2.5 text-xs font-black text-white hover:bg-brand-700"
            >
              {p.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
