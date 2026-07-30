"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft, CheckCircle2, Clock3, Target, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { submitQuizSession, computeQuizXp, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getIbCategoryCounts, IB_TECHNICAL_QUESTIONS, IB_BEHAVIORAL_QUESTIONS } from "@/lib/ib-question-bank";
import BehavioralPrepPanel from "@/components/BehavioralPrepPanel";
import IbWeakAreasPanel from "@/components/IbWeakAreasPanel";
import { recordQuizMistake } from "@/lib/quiz-mistakes";
import { getCareersCoveredByBank, getTechnicalQuestionsForCareer } from "@/lib/ib-question-careers";
import { FINANCE_CAREERS } from "@/lib/finance-careers";

// Standalone "Technical Interview" drill - split out of /kiem-tra (which
// stays the general-purpose knowledge-check page) because the 400-question
// IB bank is its own product surface with its own audience (interview prep,
// not daily study habit) and deserves its own nav entry rather than living
// as a card buried in a track/difficulty picker built for lesson quizzes.
//
// Unlike the old embedded version, this page follows the site's normal
// light/dark theme (bg-white dark:bg-stone-900 etc.) instead of forcing a
// permanently-dark "trading terminal" look regardless of the user's theme.

interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
}

const IB_DIFFICULTY_COPY: Record<QuizDifficulty, string> = {
  "tat-ca": "Full mixed drill",
  de: "Foundation screen",
  "trung-binh": "Analyst round",
  kho: "Pressure round",
};

const DIFFICULTIES: { id: QuizDifficulty; label: string }[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "de", label: "Dễ" },
  { id: "trung-binh", label: "Trung bình" },
  { id: "kho", label: "Khó" },
];

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

/** Technical is a scored MCQ drill; behavioral is un-scored prep. They can't
 *  share a flow because only one of them has right answers. */
type Mode = "technical" | "behavioral";

export default function TechnicalInterviewPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("technical");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("tat-ca");
  // Which career's slice of the bank to drill. null = the whole technical
  // pool. Only careers the bank genuinely covers are offered.
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  // Set when re-drilling a single section after a run; cleared on any fresh
  // drill so it can't silently pin every later round to one topic.
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  // Bumped when a run finishes, so the weak-areas panel picks up the rows
  // the submit route just wrote instead of showing pre-drill numbers.
  const [weakAreasKey, setWeakAreasKey] = useState(0);
  const [stage, setStage] = useState<Stage>("setup");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<QuizAnswerSubmission[]>([]);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);

  // Technical only - the behavioral sections are listed by BehavioralPrepPanel
  // under its own mode, since they're a different kind of practice.
  const totalQuestions = IB_TECHNICAL_QUESTIONS.length;
  const behavioralCount = IB_BEHAVIORAL_QUESTIONS.length;

  // Careers the bank genuinely covers, with real counts derived from the
  // questions themselves. Titles come from FINANCE_CAREERS so the picker and
  // the career pages can't drift apart.
  const careerCoverage = useMemo(() => {
    const titles = new Map(FINANCE_CAREERS.map((c) => [c.id, c.title]));
    return getCareersCoveredByBank()
      .filter((c) => titles.has(c.careerId))
      .map((c) => ({ ...c, title: titles.get(c.careerId)! }));
  }, []);

  const uncoveredCount = FINANCE_CAREERS.length - careerCoverage.length;

  // The section breakdown shown under the drill: scoped to the selected
  // career so it reflects what that person will actually be asked.
  const activeCategoryCounts = useMemo(
    () =>
      getIbCategoryCounts(
        selectedCareer ? getTechnicalQuestionsForCareer(selectedCareer) : IB_TECHNICAL_QUESTIONS
      ),
    [selectedCareer]
  );

  const activeQuestionTotal = selectedCareer
    ? activeCategoryCounts.reduce((sum, c) => sum + c.count, 0)
    : totalQuestions;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, [supabase]);

  const startQuiz = useCallback(async (overrideDifficulty?: QuizDifficulty, overrideSection?: string | null) => {
    const effectiveDifficulty = overrideDifficulty ?? difficulty;
    setSelectedSection(overrideSection ?? null);
    setStage("loading");
    setActiveQ(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setAnswers([]);
    setXpAwarded(null);
    try {
      // The career filter has to happen server-side. The API already slices
      // the pool down to five questions before responding, so filtering the
      // response client-side left almost nothing - and matching a Vietnamese
      // career title against an English `lessonTitle` matched nothing at all.
      const careerParam = selectedCareer ? `&career=${encodeURIComponent(selectedCareer)}` : "";
      const sectionParam = overrideSection ? `&section=${encodeURIComponent(overrideSection)}` : "";
      const res = await fetch(
        `/api/knowledge-challenge?track=ib&difficulty=${effectiveDifficulty}${careerParam}${sectionParam}`
      );
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      const pool: ChallengeQuestion[] = data.questions || [];
      if (!pool || pool.length === 0) {
        setStage("empty");
        return;
      }
      setQuestions(pool);
      setResults(new Array(pool.length).fill(false));
      setStage("ready");
    } catch (error) {
      console.error("Error loading technical interview drill:", error);
      setStage("error");
    }
  }, [difficulty, selectedCareer]);

  /** Sections the learner got wrong in this run, most-missed first. The
   *  category is parsed out of `lessonTitle`, which the API formats as
   *  "IB Question Bank · <category>". */
  const missedSections = useMemo(() => {
    const counts = new Map<string, number>();
    questions.forEach((question, i) => {
      if (results[i]) return;
      const label = question.lessonTitle.split("·").pop()?.trim();
      if (!label) return;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([label, missed]) => ({ label, missed }))
      .sort((a, b) => b.missed - a.missed);
  }, [questions, results]);

  const redrillSection = useCallback(
    (label: string) => startQuiz(difficulty, label),
    [startQuiz, difficulty]
  );

  const q = questions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);
  const progressPct = questions.length > 0 ? Math.round(((activeQ + (submitted ? 1 : 0)) / questions.length) * 100) : 0;

  async function finalizeQuiz() {
    if (!userId || recording || xpAwarded !== null) return;
    setRecording(true);
    try {
      const result = await submitQuizSession("ib", difficulty, answers);
      await recalculateUserStats(userId);
      setXpAwarded(result.xpEarned);
      setWeakAreasKey((k) => k + 1);
    } catch (error) {
      console.error("Error recording quiz session:", error);
      setXpAwarded(computeQuizXp(score, questions.length));
    } finally {
      setRecording(false);
    }
  }

  function choose(oi: number) {
    if (submitted) return;
    setSelected(oi);
  }

  function verify() {
    if (selected === null) return;
    const ok = selected === q.correct;
    setResults((r) => {
      const n = [...r];
      n[activeQ] = ok;
      return n;
    });
    setAnswers((a) => [...a, { token: q.token, selected }]);
    setSubmitted(true);
    // Feed the spaced-repetition review flow at /on-tap-cau-sai. Interview
    // questions were absent from it entirely: nothing here ever called this,
    // so a learner could miss the same DCF question every week and never see
    // it again in review. `q.lessonId` is the negated bank id and
    // questionIndex is 0 because each bank question stands alone rather than
    // being the nth question of a lesson - the review action understands that
    // convention. Fire-and-forget, same as the lesson quiz caller.
    void recordQuizMistake(q.lessonId, 0, ok);
  }

  function next() {
    if (activeQ === questions.length - 1) {
      setStage("done");
      void finalizeQuiz();
      return;
    }
    setActiveQ((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <div className="h-dvh overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950">
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Về Dashboard"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
                <BriefcaseBusiness className="w-5 h-5 text-amber-500" />
                Technical Interview
              </h1>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                Luyện technical + behavioral như một vòng phỏng vấn analyst thật
              </p>
            </div>
          </div>
          {mode === "technical" && (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
              <span>Thưởng +{XP_PER_QUESTION} XP / câu đúng</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {/* Mode switch. Hidden mid-drill so a half-finished scored run can't be
            abandoned by an accidental tab click. */}
        {(stage === "setup" || mode === "behavioral") && (
          <div className="mb-6 inline-flex p-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
            <button
              onClick={() => setMode("technical")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                mode === "technical"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Technical · {totalQuestions} câu
            </button>
            <button
              onClick={() => setMode("behavioral")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                mode === "behavioral"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Behavioral · {behavioralCount} câu
            </button>
          </div>
        )}

        {mode === "behavioral" && <BehavioralPrepPanel />}

        {mode === "technical" && stage === "setup" && (
          <div className="space-y-6">
            <IbWeakAreasPanel
              userId={userId}
              onDrillSection={redrillSection}
              refreshKey={weakAreasKey}
            />

            {/* Which career's questions to drill.
                The bank is Investment Banking's - 395 questions scraped from
                an IB interview guide - but its accounting, valuation and DCF
                sections are the shared core of most analytical finance roles,
                so they're offered to those careers too via
                lib/ib-question-careers.ts. Counts below are computed from the
                bank, not hardcoded: an earlier version of this picker
                advertised 120/95/85/110 questions for tracks that had no
                questions at all, and clicking them showed an empty drill. */}
            <div className="rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-stone-900 p-4 sm:p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                  Luyện theo vị trí bạn nhắm tới
                </h3>
                <span className="inline-flex items-center gap-2 rounded-xl bg-amber-400/10 border border-amber-300/50 dark:border-amber-800 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  Nguồn: bộ 400 IB Interview Questions
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                Bộ câu hỏi này viết cho Ngân hàng Đầu tư, nhưng phần kế toán, định giá và DCF dùng chung được cho
                nhiều vị trí phân tích khác. Chọn vị trí để chỉ luyện đúng phần liên quan.
              </p>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCareer(null)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                    selectedCareer === null
                      ? "border-amber-500 bg-amber-400 text-stone-950 font-black"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-300"
                  }`}
                >
                  Tất cả · {totalQuestions}
                </button>
                {careerCoverage.map((c) => {
                  const active = selectedCareer === c.careerId;
                  return (
                    <button
                      key={c.careerId}
                      type="button"
                      onClick={() => setSelectedCareer(active ? null : c.careerId)}
                      title={c.categories.join(" · ")}
                      className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                        active
                          ? "border-amber-500 bg-amber-400 text-stone-950 font-black"
                          : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-600 dark:text-stone-300 hover:border-stone-300"
                      }`}
                    >
                      {c.title}
                      <span className={active ? "text-stone-950 font-extrabold" : "text-stone-400 dark:text-stone-500"}>
                        {" "}· {c.questionCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                {uncoveredCount} / {FINANCE_CAREERS.length} vị trí khác chưa có bộ câu hỏi riêng — phần technical
                của các nghề đó đang được xây dần.
              </p>
            </div>

            <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      Investment Banking & Finance Drill
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/80 bg-amber-400/10 px-3 py-1 text-[10px] font-black text-amber-900 dark:text-amber-200">
                      <span>✨ Chuẩn bộ "400 Questions IB Guide" Phố Wall</span>
                    </div>
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                    Luyện technical interview như một vòng analyst thực chiến
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-stone-600 dark:text-stone-300">
                    Bộ câu hỏi phỏng vấn biên soạn theo chuẩn cuốn <strong>"400 Questions Investment Banking Interview Guide"</strong> truyền thống Phố Wall, trải rộng khắp các chuyên ngành: Kế toán 3 báo cáo, Định giá DCF, M&A, LBO, Tín dụng & Tài chính doanh nghiệp.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {[
                      { icon: Target, label: "Question bank", value: `${activeQuestionTotal} câu` },
                      { icon: Clock3, label: "Mỗi lượt", value: "3-5 phút" },
                      { icon: Trophy, label: "Thưởng", value: "+XP" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-3 py-3">
                          <Icon className="h-4 w-4 text-amber-500" />
                          <p className="mt-2 text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{item.label}</p>
                          <p className="mt-0.5 text-sm font-black text-stone-900 dark:text-stone-100">{item.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* The actual section breakdown - what "400 IB Questions" is
                      really made of, so a learner can see coverage instead of
                      a single opaque number. */}
                  <div className="mt-5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                      {selectedCareer ? "Các section bạn sẽ được hỏi" : "Các section trong bộ câu hỏi"}
                    </p>
                    {/* Read-only breakdown, not a filter. Filtering by a single
                        category is done through the career picker above, which
                        narrows server-side; a client-side chip filter could
                        only ever act on the five questions already returned. */}
                    <div className="flex flex-wrap gap-1.5">
                      {activeCategoryCounts.map((c) => (
                        <span
                          key={c.label}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs font-bold text-stone-600 dark:text-stone-300"
                        >
                          {c.label}
                          <span className="text-stone-400 dark:text-stone-500">· {c.count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-5 sm:p-6 lg:p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Chọn vòng phỏng vấn</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {DIFFICULTIES.map((d) => {
                      const selected = difficulty === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDifficulty(d.id)}
                          className={`rounded-2xl border-2 px-3 py-3 text-left transition-all cursor-pointer ${
                            selected
                              ? "border-amber-400 bg-amber-400 text-stone-950 shadow-sm"
                              : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700"
                          }`}
                        >
                          <span className="block text-xs font-black">{d.label}</span>
                          <span className={`mt-1 block text-[10px] font-bold ${selected ? "text-stone-800" : "text-stone-400 dark:text-stone-500"}`}>
                            {IB_DIFFICULTY_COPY[d.id]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => void startQuiz(difficulty)}
                    className="mt-4 w-full rounded-2xl bg-amber-400 hover:bg-amber-300 px-4 py-4 text-sm font-black uppercase tracking-wider text-stone-950 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Bắt đầu IB drill →
                  </button>
                  <p className="mt-3 text-[11px] font-semibold leading-relaxed text-stone-500 dark:text-stone-400">
                    Gợi ý: dùng "Trung bình" cho mock analyst round, dùng "Khó" khi muốn luyện áp lực trước interview.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {mode === "technical" && stage === "loading" && <p className="text-center text-stone-500 dark:text-stone-400 py-16">Đang chuẩn bị câu hỏi...</p>}

        {mode === "technical" && stage === "error" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Không thể tải bài kiểm tra lúc này. Vui lòng thử lại sau.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại
            </button>
          </div>
        )}

        {mode === "technical" && stage === "empty" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">Chưa có câu hỏi nào cho độ khó này. Thử độ khó khác nhé.</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              ← Quay lại
            </button>
          </div>
        )}

        {mode === "technical" && stage === "ready" && q && (
          <div className="mx-auto max-w-4xl space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-6 shadow-sm">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  IB Interview Drill
                </span>
                <span className="text-xs truncate max-w-[60%] text-stone-500 dark:text-stone-400">{q.lessonTitle}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Câu hỏi</p>
                  <p className="text-sm font-black text-stone-900 dark:text-stone-100">{activeQ + 1}/{questions.length}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Đúng</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{score}</p>
                </div>
                <div className="rounded-xl bg-white dark:bg-stone-900 px-3 py-2 border border-stone-200 dark:border-stone-800">
                  <p className="text-[9px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Round</p>
                  <p className="text-sm font-black text-amber-600 dark:text-amber-400">{IB_DIFFICULTY_COPY[difficulty]}</p>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-amber-400"
                  style={{ width: `${Math.max(6, progressPct)}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4 sm:p-5">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                Interviewer asks
              </p>
              <p className="font-bold text-lg leading-relaxed select-text text-stone-900 dark:text-stone-100">{q.question}</p>
            </div>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                let cls = "border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 hover:border-amber-300 dark:hover:border-amber-800";
                if (submitted) {
                  if (isCorrectOpt) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-400 font-semibold";
                  else if (isSelected) cls = "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-400 font-semibold";
                  else cls = "border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-400 dark:text-stone-500";
                } else if (isSelected) {
                  cls = "border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-stone-900 dark:text-amber-200 font-semibold";
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => choose(oi)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer text-sm select-text ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className={`rounded-xl p-4 text-sm leading-relaxed border ${results[activeQ] ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"}`}>
                <p className="font-bold mb-1">{results[activeQ] ? `Good answer. +${XP_PER_QUESTION} XP` : "Giải thích:"}</p>
                <p>{q.explanation}</p>
              </div>
            )}

            {!submitted ? (
              <button
                disabled={selected === null}
                onClick={verify}
                className={`w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2 ${
                  selected !== null
                    ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                    : "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Chốt câu trả lời
              </button>
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90">
                {allDone ? "Xem kết quả →" : "Câu tiếp theo →"}
              </button>
            )}
          </div>
        )}

        {mode === "technical" && stage === "done" && (
          <div className="mx-auto max-w-3xl text-center space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 shadow-sm">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Hoàn thành IB interview drill!</h3>
              <p className="text-sm mt-1 text-stone-500 dark:text-stone-400">
                {score}/{questions.length} câu đúng {passed ? "· Đạt" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Interview readiness</p>
                <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">{Math.round((score / Math.max(1, questions.length)) * 100)}%</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Round</p>
                <p className="mt-1 text-sm font-black text-stone-900 dark:text-stone-100">{IB_DIFFICULTY_COPY[difficulty]}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">Next action</p>
                <p className="mt-1 text-sm font-black text-emerald-600 dark:text-emerald-400">{passed ? "Lên độ khó" : "Ôn câu sai"}</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-amber-700 dark:text-amber-400">XP nhận được</p>
              <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400">
                {xpAwarded === null ? "..." : `+${xpAwarded} XP`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {results.map((ok, i) => (
                <div key={i} className={`w-8 h-8 rounded-full text-xs flex items-center justify-center text-white font-bold ${ok ? "bg-emerald-500" : "bg-rose-400"}`}>
                  {ok ? "✓" : "✗"}
                </div>
              ))}
            </div>

            {/* Sections missed in this run, each one clickable straight into
                another drill of that section. This used to be a list of dead
                <p> tags naming the category and offering nothing to do about
                it. */}
            {missedSections.length > 0 && (
              <div className="text-left rounded-xl p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2.5">
                  Section cần ôn lại
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missedSections.map(({ label, missed }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => void redrillSection(label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
                    >
                      {label}
                      <span className="text-amber-600/80 dark:text-amber-400/80">· sai {missed}</span>
                      <span aria-hidden>↻</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2.5 text-[11px] text-stone-500 dark:text-stone-400">
                  Bấm một section để luyện lại đúng phần đó.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/dashboard" className="py-3 rounded-xl border text-sm font-bold text-center border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800">
                Về Dashboard
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer bg-amber-400 text-stone-950">
                Drill mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
