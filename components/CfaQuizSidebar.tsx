"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Visually identical to the regular lesson page's quiz sidebar
// (components/LessonPageLayout.tsx:920-1153) - same progress dots, one
// active question, option styling, sticky submit/retry/next block, and
// completion card. Kept as its own component (not a reuse of
// LessonPageLayout itself) because that component is tightly coupled to the
// personal/professional lesson progress system (XP, streak, offline sync,
// recall scheduling) that CFA modules don't participate in - this one runs
// entirely on its own local state plus a single onFinish callback.

export interface CfaQuizQuestion {
  question: ReactNode;
  options: ReactNode[];
  correct: number;
  explanation: ReactNode;
}

interface Props {
  quiz: CfaQuizQuestion[];
  onFinish?: (score: number, total: number) => void;
  nextModuleId?: string | null;
}

const ACCENT = { bar: "bg-amber-500", btn: "bg-amber-600 hover:bg-amber-700" };

export default function CfaQuizSidebar({ quiz, onFinish, nextModuleId }: Props) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<(number | null)[]>(new Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [results, setResults] = useState<boolean[]>(new Array(quiz.length).fill(false));
  const [activeQ, setActiveQ] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [finished, setFinished] = useState(false);
  const [quizCollapsed, setQuizCollapsed] = useState(false);
  const [finishFired, setFinishFired] = useState(false);

  const submittedCount = submitted.filter(Boolean).length;
  const allDone = submittedCount === quiz.length;
  const score = results.filter(Boolean).length;

  function choose(qi: number, oi: number) {
    if (submitted[qi]) return;
    setSelected((s) => {
      const n = [...s];
      n[qi] = oi;
      return n;
    });
  }

  function verify(qi: number) {
    const sel = selected[qi];
    if (sel === null || submitted[qi]) return;
    const ok = sel === quiz[qi].correct;
    const newResults = [...results];
    newResults[qi] = ok;
    const newSubmitted = [...submitted];
    newSubmitted[qi] = true;
    setResults(newResults);
    setSubmitted(newSubmitted);

    if (newSubmitted.every(Boolean)) {
      setReviewMode(false);
      if (!finishFired) {
        setFinishFired(true);
        onFinish?.(newResults.filter(Boolean).length, quiz.length);
      }
    }
  }

  function retry(qi: number) {
    if (results[qi]) return;
    const newSelected = [...selected];
    newSelected[qi] = null;
    const newSubmitted = [...submitted];
    newSubmitted[qi] = false;
    setSelected(newSelected);
    setSubmitted(newSubmitted);
    setActiveQ(qi);
    setReviewMode(false);
    setFinished(false);
  }

  function viewQuestion(qi: number) {
    setActiveQ(qi);
    setReviewMode(true);
  }

  function restartQuiz() {
    setSelected(new Array(quiz.length).fill(null));
    setSubmitted(new Array(quiz.length).fill(false));
    setResults(new Array(quiz.length).fill(false));
    setActiveQ(0);
    setReviewMode(false);
    setFinished(false);
    setFinishFired(false);
  }

  if (quiz.length === 0) return null;

  const q = quiz[activeQ];
  const qSubmitted = submitted[activeQ];
  const qCorrect = results[activeQ];
  const qSelected = selected[activeQ];

  return (
    <div className="space-y-4">
      {/* Quiz progress - collapsible */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 overflow-hidden">
        <button
          onClick={() => setQuizCollapsed(!quizCollapsed)}
          className="w-full flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-base font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-wide">{t.cfaQuizSidebar.quickCheck}</span>
            <span className="text-base font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
              {submittedCount}/{quiz.length}
            </span>
          </div>
          {quizCollapsed ? <ChevronDown className="w-5 h-5 text-stone-500 dark:text-stone-400" /> : <ChevronUp className="w-5 h-5 text-stone-500 dark:text-stone-400" />}
        </button>
        {!quizCollapsed && (
          <div className="p-6 pt-0">
            <div className="flex gap-2">
              {quiz.map((_, i) => (
                <button
                  key={i}
                  onClick={() => viewQuestion(i)}
                  title={submitted[i] ? t.cfaQuizSidebar.reviewThisQuestion : undefined}
                  className={`flex-1 h-3 rounded-full transition-all cursor-pointer ${
                    submitted[i]
                      ? results[i]
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                      : i === activeQ
                      ? ACCENT.bar
                      : "bg-stone-300 dark:bg-stone-700"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active question */}
      {!finished || reviewMode ? (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-stone-700 dark:text-stone-300 uppercase tracking-wider bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                {format(t.cfaQuizSidebar.questionCounter, { current: activeQ + 1, total: quiz.length })}
              </span>
              {qSubmitted && (
                <span
                  className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                    qCorrect
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400"
                      : "bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400"
                  }`}
                >
                  {qCorrect ? t.cfaQuizSidebar.correctBadge : t.cfaQuizSidebar.incorrectBadge}
                </span>
              )}
            </div>
            <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-relaxed select-text">{q.question}</p>
          </div>

          <div className="space-y-3">
            {q.options.map((opt, oi) => {
              const isSelected = qSelected === oi;
              const isCorrectOpt = oi === q.correct;
              let cls =
                "border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800";
              if (qSubmitted) {
                if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400 font-semibold";
                else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400 font-semibold";
                else cls = "border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400";
              } else if (isSelected) {
                cls = "border-2 border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold";
              }
              return (
                <button
                  key={oi}
                  disabled={qSubmitted}
                  onClick={() => choose(activeQ, oi)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-4 cursor-pointer font-medium text-base select-text ${cls}`}
                >
                  <span className="w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center flex-shrink-0 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-300 select-none">
                    {["A", "B", "C", "D"][oi]}
                  </span>
                  <span className="flex-1 text-base leading-snug select-text">{opt}</span>
                  {qSubmitted && isCorrectOpt && <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">✓</span>}
                  {qSubmitted && isSelected && !isCorrectOpt && <span className="text-rose-600 dark:text-rose-400 font-bold text-xl">✗</span>}
                </button>
              );
            })}
          </div>

          {qSubmitted && (
            <div
              className={`rounded-xl p-4 text-sm leading-relaxed border ${
                qCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400"
                  : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"
              }`}
            >
              <p className="font-bold mb-1.5">{qCorrect ? t.cfaQuizSidebar.correctExclaim : t.cfaQuizSidebar.explanationLabel}</p>
              {!qCorrect && qSelected !== null && (
                <p className="mb-2 pb-2 border-b border-rose-200 dark:border-rose-900">
                  <span className="font-semibold">{t.cfaQuizSidebar.youChose}</span> &quot;{q.options[qSelected]}&quot;
                  <br />
                  <span className="font-semibold">{t.cfaQuizSidebar.correctAnswer}</span> &quot;{q.options[q.correct]}&quot;
                </p>
              )}
              <p>{q.explanation}</p>
            </div>
          )}

          <div className="sticky bottom-0 -mx-8 -mb-8 px-8 pb-6 pt-3 bg-gradient-to-t from-white dark:from-stone-900 from-70% to-transparent">
            {!qSubmitted ? (
              <button
                disabled={qSelected === null}
                onClick={() => verify(activeQ)}
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all cursor-pointer shadow-lg ${
                  qSelected !== null ? ACCENT.btn : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed shadow-none"
                }`}
              >
                {t.cfaQuizSidebar.checkCta}
              </button>
            ) : (
              <div className="flex gap-3">
                {!qCorrect && (
                  <button
                    onClick={() => retry(activeQ)}
                    className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer shadow-lg"
                  >
                    {t.cfaQuizSidebar.retryCta}
                  </button>
                )}
                {reviewMode && finished ? (
                  <button
                    onClick={() => setReviewMode(false)}
                    className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${ACCENT.btn} cursor-pointer shadow-lg`}
                  >
                    {t.cfaQuizSidebar.backToResults}
                  </button>
                ) : activeQ < quiz.length - 1 ? (
                  <button
                    onClick={() => setActiveQ(activeQ + 1)}
                    className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${ACCENT.btn} cursor-pointer shadow-lg`}
                  >
                    {t.cfaQuizSidebar.nextQuestionCta}
                  </button>
                ) : (
                  !reviewMode &&
                  allDone && (
                    <button
                      onClick={() => setFinished(true)}
                      className={`flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white ${ACCENT.btn} cursor-pointer shadow-lg`}
                    >
                      {t.cfaQuizSidebar.seeResultsCta}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completion card */
        <div
          className={`rounded-2xl border p-7 text-center space-y-4 ${
            score === quiz.length
              ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900"
              : "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900"
          }`}
        >
          <div className="text-5xl">{score === quiz.length ? "★" : score >= quiz.length * 0.7 ? "+" : "↑"}</div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">{t.cfaQuizSidebar.completedTitle}</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              {format(t.cfaQuizSidebar.completedScore, { score, total: quiz.length })}
            </p>
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {results.map((ok, i) => (
              <button
                key={i}
                onClick={() => (ok ? viewQuestion(i) : retry(i))}
                title={ok ? t.cfaQuizSidebar.reviewThisQuestion : t.cfaQuizSidebar.retryThisQuestion}
                className={`w-9 h-9 rounded-full text-sm flex items-center justify-center text-white font-bold cursor-pointer ${
                  ok ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-400 hover:bg-rose-500"
                }`}
              >
                {ok ? "✓" : "✗"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/cfa"
              className="py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold text-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              {t.cfaQuizSidebar.backToCfa}
            </Link>
            {nextModuleId ? (
              <Link href={`/cfa/${nextModuleId}`} className={`py-3.5 rounded-xl text-white text-sm font-bold text-center ${ACCENT.btn} transition-colors`}>
                {t.cfaQuizSidebar.nextLessonCta}
              </Link>
            ) : (
              <div className="py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-sm font-bold text-center">{t.cfaQuizSidebar.outOfLessons}</div>
            )}
          </div>
          <button
            onClick={restartQuiz}
            className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 uppercase tracking-wide transition-colors cursor-pointer"
          >
            {t.cfaQuizSidebar.restartFromStart}
          </button>
        </div>
      )}

      {/* Mini nav between questions */}
      {(!finished || reviewMode) && quiz.length > 1 && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4">
          <div className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wide mb-3">{t.cfaQuizSidebar.questionsNav}</div>
          <div className="grid grid-cols-5 gap-2">
            {quiz.map((_, i) => (
              <button
                key={i}
                onClick={() => viewQuestion(i)}
                className={`h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  i === activeQ
                    ? `${ACCENT.bar} text-white`
                    : submitted[i]
                    ? results[i]
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                      : "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
