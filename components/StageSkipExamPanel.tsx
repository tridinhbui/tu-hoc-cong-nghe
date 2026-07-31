"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Rocket, CheckCircle2, XCircle, ChevronLeft } from "lucide-react";
import { recalculateUserStats } from "@/lib/supabase-user";
import {
  STAGE_EXAM_PASS_RATIO,
  STAGE_EXAM_QUESTION_COUNT,
  STAGE_EXAM_RETRY_COOLDOWN_MS,
  formatCooldown,
  type StageExamEligibility,
  type StageExamTrack,
} from "@/lib/stage-exam";

// "Thi vượt chặng" - one exam credits an entire chặng as complete, for
// learners who already know the material and don't want to click through
// twenty lessons to prove it.
//
// Grading and crediting both happen in app/api/stage-exam; this component
// never decides whether someone passed. It shows questions, collects the
// signed tokens back, and renders whatever the server returns.

const TRACKS: { id: StageExamTrack; label: string }[] = [
  { id: "personal", label: "Tài chính cá nhân" },
  { id: "professional", label: "Tài chính chuyên ngành" },
];

interface ExamQuestion {
  lessonId: number;
  questionIndex: number;
  question: string;
  options: string[];
  explanation: string;
  token: string;
}

interface Result {
  score: number;
  total: number;
  passed: boolean;
  creditedLessons: number;
  alreadyCompleted?: number;
}

type View = "pick" | "loading" | "exam" | "result";

export default function StageSkipExamPanel({ userId }: { userId: string | null }) {
  const [track, setTrack] = useState<StageExamTrack>("personal");
  const [stages, setStages] = useState<StageExamEligibility[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [view, setView] = useState<View>("pick");

  const [activeStage, setActiveStage] = useState<StageExamEligibility | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const loadStages = useCallback(async () => {
    if (!userId) {
      setListLoading(false);
      return;
    }
    setListLoading(true);
    try {
      const res = await fetch(`/api/stage-exam?track=${track}`, { cache: "no-store" });
      const data = await res.json();
      setStages(data.stages ?? []);
    } catch (error) {
      console.error("Error loading stage exams:", error);
      setStages([]);
    } finally {
      setListLoading(false);
    }
  }, [userId, track]);

  useEffect(() => {
    void loadStages();
  }, [loadStages]);

  async function startExam(stage: StageExamEligibility) {
    setView("loading");
    setActiveStage(stage);
    setResult(null);
    setActiveQ(0);
    try {
      const res = await fetch(
        `/api/stage-exam?track=${track}&stage=${encodeURIComponent(stage.stageLabel)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (res.status === 429) {
        // Cooldown after a failed attempt - the server won't hand out a fresh
        // draw yet, which is what stops re-rolling until an easy set appears.
        toast.error(data.message ?? "Chưa tới lượt thi lại.");
        setView("pick");
        return;
      }
      if (!data.questions?.length) {
        toast.error("Chặng này chưa đủ câu hỏi để thi vượt.");
        setView("pick");
        return;
      }
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
      setView("exam");
    } catch (error) {
      console.error("Error starting stage exam:", error);
      toast.error("Không tải được đề thi.");
      setView("pick");
    }
  }

  async function submitExam() {
    if (!activeStage || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/stage-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          stageLabel: activeStage.stageLabel,
          // Unanswered questions submit an out-of-range index so they count
          // as wrong rather than shrinking the denominator.
          answers: questions.map((q, i) => ({ token: q.token, selected: answers[i] ?? -1 })),
        }),
      });
      const data: Result & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      setResult(data);
      setView("result");
      if (data.passed) {
        toast.success(`Đạt! ${data.creditedLessons} bài được tính hoàn thành.`);
        if (userId) void recalculateUserStats(userId).catch(() => {});
        void loadStages();
      }
    } catch (error) {
      console.error("Error submitting stage exam:", error);
      toast.error("Không nộp được bài thi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!userId) return null;

  const answeredCount = answers.filter((a) => a !== null).length;
  const passPercent = Math.round(STAGE_EXAM_PASS_RATIO * 100);

  return (
    <div className="rounded-3xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/50 dark:bg-stone-900 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h3 className="text-sm font-black uppercase tracking-widest text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Rocket className="w-4 h-4 text-violet-500" />
          Thi vượt chặng
        </h3>
        {view !== "pick" && (
          <button
            onClick={() => setView("pick")}
            className="inline-flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Chọn chặng khác
          </button>
        )}
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
        Đã biết nội dung một chặng rồi? Làm {STAGE_EXAM_QUESTION_COUNT} câu, đúng từ {passPercent}% trở lên là toàn bộ
        bài trong chặng được tính hoàn thành — không cần học lại từng bài.
      </p>

      {view === "pick" && (
        <>
          <div className="flex gap-1.5 mb-3">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrack(t.id)}
                className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                  track === t.id
                    ? "border-violet-500 bg-violet-500 text-white"
                    : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {listLoading ? (
            <div className="py-8 flex items-center justify-center gap-2 text-stone-500 dark:text-stone-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-bold">Đang tải danh sách chặng...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {stages.map((s) => {
                const done = s.lessonCount > 0 && s.completedCount >= s.lessonCount;
                return (
                  <div
                    key={s.stageLabel}
                    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-3.5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black text-stone-900 dark:text-stone-100 truncate">
                        {s.stageLabel}: {s.stageName}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        {s.completedCount}/{s.lessonCount} bài đã xong · {s.questionCount} câu hỏi
                        {!s.eligible && " · chưa đủ câu để thi"}
                      </p>
                    </div>
                    {done ? (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã xong
                      </span>
                    ) : (
                      <button
                        onClick={() => void startExam(s)}
                        disabled={!s.eligible}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Thi vượt
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {view === "loading" && (
        <div className="py-10 flex items-center justify-center gap-2 text-stone-500 dark:text-stone-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-bold">Đang chuẩn bị đề thi...</span>
        </div>
      )}

      {view === "exam" && questions[activeQ] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
            <span>
              {activeStage?.stageLabel} · Câu {activeQ + 1}/{questions.length}
            </span>
            <span>Đã trả lời {answeredCount}/{questions.length}</span>
          </div>
          <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${((activeQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p className="font-bold text-base leading-relaxed text-stone-900 dark:text-stone-100">
            {questions[activeQ].question}
          </p>

          {/* No per-question feedback: this is an exam, not a practice drill.
              Showing the answer as you go would let someone restart until
              they'd seen every question. */}
          <div className="space-y-2">
            {questions[activeQ].options.map((opt, oi) => {
              const picked = answers[activeQ] === oi;
              return (
                <button
                  key={oi}
                  onClick={() =>
                    setAnswers((a) => {
                      const n = [...a];
                      n[activeQ] = oi;
                      return n;
                    })
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-colors cursor-pointer ${
                    picked
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-stone-900 dark:text-violet-200 font-semibold"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 hover:border-violet-300"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => setActiveQ((i) => Math.max(0, i - 1))}
              disabled={activeQ === 0}
              className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Câu trước
            </button>
            {activeQ < questions.length - 1 ? (
              <button
                onClick={() => setActiveQ((i) => i + 1)}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
              >
                Câu tiếp theo →
              </button>
            ) : (
              <button
                onClick={() => void submitExam()}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-xs font-black cursor-pointer inline-flex items-center gap-1.5"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Nộp bài
              </button>
            )}
          </div>
        </div>
      )}

      {view === "result" && result && (
        <div className="text-center py-4 space-y-3">
          {result.passed ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          ) : (
            <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
          )}
          <p className="text-2xl font-black text-stone-900 dark:text-stone-100 tabular-nums">
            {result.score}/{result.total}
          </p>
          {result.passed ? (
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              Đạt! {result.creditedLessons} bài vừa được tính hoàn thành
              {result.alreadyCompleted ? ` (${result.alreadyCompleted} bài bạn đã học trước đó)` : ""}.
            </p>
          ) : (
            <p className="text-sm font-bold text-stone-600 dark:text-stone-400">
              Chưa đạt — cần đúng từ {passPercent}%. Học qua chặng này rồi quay lại sau{" "}
              {formatCooldown(STAGE_EXAM_RETRY_COOLDOWN_MS)} nhé.
            </p>
          )}
          <button
            onClick={() => setView("pick")}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black cursor-pointer"
          >
            Về danh sách chặng
          </button>
        </div>
      )}
    </div>
  );
}
