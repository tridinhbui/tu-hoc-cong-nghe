"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, ChevronLeft, CheckCircle2 } from "lucide-react";
import { submitQuizSession, computeQuizXp, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/supabase-quiz-sessions";
import { recalculateUserStats } from "@/lib/supabase-user";
import { getIbCategoryCounts, IB_TECHNICAL_QUESTIONS, IB_BEHAVIORAL_QUESTIONS } from "@/lib/ib-question-bank";
import BehavioralPrepPanel from "@/components/BehavioralPrepPanel";
import { recordQuizMistake } from "@/lib/quiz-mistakes";
import { getCategoryPerformance } from "@/lib/ib-weak-areas";
import {
  buildSectionMastery,
  modeLocks,
  nextObjective,
  rankFor,
  rankPoints,
  recommendedSection,
  INTERVIEW_MODE_IDS,
  MODE_QUESTION_COUNT,
  MOCK_MILESTONE_SECTIONS,
  ROUND_PHASES,
  type InterviewModeId,
  type MasteryTier,
  type RoundPhase,
} from "@/lib/ib-progression";
import { readPreparedBehavioral } from "@/lib/ib-behavioral-prepared";
import { getCareersCoveredByBank, getTechnicalQuestionsForCareer } from "@/lib/ib-question-careers";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { useI18n } from "@/lib/i18n/context";
import { mergeCareer } from "@/lib/finance-careers-i18n";
import { format } from "@/lib/i18n";
import {
  groupCoverageByCategory,
  withoutWholeBankCareers,
  type CareerCategory,
} from "@/lib/ib-career-picker";
import { getCurrentUserId } from "@/lib/current-user";

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
  /** Chặng của câu này trong vòng. Route tính và sắp sẵn theo thứ tự
   *  khởi động → lõi → áp lực; xem app/api/knowledge-challenge/route.ts. */
  phase?: RoundPhase;
  token: string;
}

const XP_PER_QUESTION = 5;
const PASS_RATIO = 0.6;

/** Màu của bốn bậc thành thạo.
 *
 *  Bốn màu, không phải mười bốn: màu ở đây mã hoá BẬC, không mã hoá section.
 *  Và `untested` cố ý là màu trung tính chứ không phải đỏ - chưa đo được không
 *  phải là kém, gán nó màu cảnh báo là nói với người mới rằng họ đang yếu ở cả
 *  mười bốn mục trước khi trả lời câu nào. */
const MASTERY_TONE: Record<MasteryTier, string> = {
  untested: "text-stone-400 dark:text-stone-500",
  weak: "text-rose-600 dark:text-rose-400",
  improving: "text-amber-600 dark:text-amber-400",
  strong: "text-sky-700 dark:text-sky-400",
  mastered: "text-emerald-600 dark:text-emerald-400",
};

const MASTERY_BAR: Record<MasteryTier, string> = {
  untested: "bg-stone-200 dark:bg-stone-800",
  weak: "bg-rose-500",
  improving: "bg-amber-500",
  strong: "bg-sky-500",
  mastered: "bg-emerald-500",
};

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";

/** Technical is a scored MCQ drill; behavioral is un-scored prep. They can't
 *  share a flow because only one of them has right answers. */
type Mode = "technical" | "behavioral";

export default function TechnicalInterviewPage() {
  const { t, locale } = useI18n();
  const [userId, setUserId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("technical");
  /** Vòng phỏng vấn đang chọn. Thay cho `difficulty` ở phần chọn: `mock` không
   *  phải một độ khó mà là một track riêng ở route, nên id chọn và tham số gửi
   *  đi không còn là cùng một thứ - xem `startMode`. */
  const [interviewMode, setInterviewMode] = useState<InterviewModeId>("tat-ca");
  /** Độ khó của lượt ĐANG CHẠY. Vẫn là QuizDifficulty vì submitQuizSession ghi
   *  nó xuống bảng phiên; `mock` quy về "tat-ca" ở đó. */
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("tat-ca");
  /** Vòng của lượt đang chạy, để phần kết quả gọi đúng tên nó. */
  const [activeMode, setActiveMode] = useState<InterviewModeId>("tat-ca");
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
    const titles = new Map(FINANCE_CAREERS.map((c) => [c.id, mergeCareer(c, locale).title]));
    return getCareersCoveredByBank()
      .filter((c) => titles.has(c.careerId))
      .map((c) => ({ ...c, title: titles.get(c.careerId)! }));
  }, []);

  const uncoveredCount = FINANCE_CAREERS.length - careerCoverage.length;

  /** Nghề theo nhóm, dùng làm <optgroup> của ô chọn vị trí.
   *
   *  Ô tìm bỏ dấu đã bỏ cùng với bộ chọn tự dựng: <select> gốc đã có gõ-để-nhảy
   *  của hệ điều hành, và 43 mục chia sẵn theo bảy nhóm thì cuộn tới nơi nhanh
   *  hơn gõ. matchesVietnamese vẫn còn nguyên trong lib/vn-search.ts cho những
   *  ô tìm thật ở nơi khác. */
  const roleGroups = useMemo(
    () => groupCoverageByCategory(withoutWholeBankCareers(careerCoverage, totalQuestions)),
    [careerCoverage, totalQuestions]
  );

  // `Partial` chứ không phải `Record` đầy đủ, và có đường lùi ở chỗ dùng.
  // FinanceCareer["category"] là union mở - thêm một nhóm ngành vào
  // lib/finance-careers.ts là làm hỏng biên dịch ở đây, tức là một thay đổi dữ
  // liệu ở file khác chặn cả trang này. Nhóm chưa có nhãn thì hiện id thay vì
  // không dựng được; bộ chọn vẫn chạy, và lib/__tests__/ib-career-picker.test.ts
  // mới là chỗ bắt nhóm bị rơi ra ngoài (nó đang đỏ vì đúng chuyện đó).
  const CATEGORY_LABELS = useMemo(
    (): Partial<Record<CareerCategory, string>> => ({
      investment: t.careerPath.catInvestmentLabel,
      dealmaking: t.careerPath.catDealmakingLabel,
      accounting: t.careerPath.catAccountingLabel,
      risk: t.careerPath.catRiskLabel,
      banking: t.careerPath.catBankingLabel,
      advisory: t.careerPath.catAdvisoryLabel,
      data: t.careerPath.catDataLabel,
    }),
    [t]
  );

  // The section breakdown shown under the drill: scoped to the selected
  // career so it reflects what that person will actually be asked.
  const activeCategoryCounts = useMemo(
    () =>
      getIbCategoryCounts(
        selectedCareer ? getTechnicalQuestionsForCareer(selectedCareer) : IB_TECHNICAL_QUESTIONS
      ),
    [selectedCareer]
  );

  useEffect(() => {
    void getCurrentUserId().then(setUserId);
  }, []);

  /* ─────────────────── Tiến bộ: đo, không phải trang trí ─────────────────── */

  /** Hiệu suất từng section, đọc từ user_ib_question_attempts.
   *
   *  Trang tự đọc thay vì mượn IbWeakAreasPanel như trước. Panel ấy đã được gỡ
   *  khỏi đây: nó vẽ đúng những con số mà bảng thành thạo bên dưới vẽ - tỉ lệ
   *  đúng từng section, cộng một câu "chỗ yếu nhất là X" - nên để cả hai là
   *  hiển thị một bảng dữ liệu hai lần, bằng hai lần truy vấn cùng một bảng.
   *  Component vẫn còn trong repo cho chỗ khác dùng. */
  const [performance, setPerformance] = useState<Awaited<ReturnType<typeof getCategoryPerformance>>>([]);
  const [performanceLoaded, setPerformanceLoaded] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void getCategoryPerformance(userId)
      .then((rows) => {
        if (!cancelled) setPerformance(rows);
      })
      .catch((error) => console.error("Error loading IB section mastery:", error))
      .finally(() => {
        if (!cancelled) setPerformanceLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // weakAreasKey đổi sau mỗi lượt xong, nên bảng thành thạo đọc lại số vừa
    // được ghi thay vì số trước lượt.
  }, [userId, weakAreasKey]);

  /** Thành thạo theo section, ghép trên TOÀN BỘ section của ngân hàng đang
   *  hoạt động - kể cả những section chưa đụng tới. */
  const sections = useMemo(
    () => buildSectionMastery(performance, activeCategoryCounts),
    [performance, activeCategoryCounts]
  );

  const rank = useMemo(() => rankFor(rankPoints(sections)), [sections]);
  const locks = useMemo(() => modeLocks(sections), [sections]);
  const objective = useMemo(() => nextObjective(sections, rank), [sections, rank]);
  const nextSection = useMemo(() => recommendedSection(sections), [sections]);

  /** Số câu behavioral đã mở khung trả lời, trên máy này. Độ phủ, không phải
   *  điểm - xem lib/ib-behavioral-prepared.ts. */
  const [preparedBehavioral, setPreparedBehavioral] = useState(0);
  useEffect(() => {
    setPreparedBehavioral(readPreparedBehavioral().size);
  }, [mode]);

  const startQuiz = useCallback(async (
    overrideDifficulty?: QuizDifficulty,
    overrideSection?: string | null,
    asMock = false
  ) => {
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
      // `mock-interview` là một track riêng ở route, không phải một độ khó: nó
      // lấy 10 câu rải đều các section thay vì 5 câu ngẫu nhiên. Cả hai track
      // đều đi qua cùng đường ký token và cùng đường chấm, nên phần thưởng và
      // bản ghi từng câu không lệch nhau.
      const track = asMock ? "mock-interview" : "ib";
      const res = await fetch(
        `/api/knowledge-challenge?track=${track}&difficulty=${effectiveDifficulty}${careerParam}${sectionParam}`
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

  /** Bắt đầu một vòng theo id đã chọn.
   *
   *  Một id chọn ánh xạ sang HAI tham số khác nhau, nên nó không gộp được vào
   *  `difficulty`: `mock` chạy track riêng, ba vòng còn lại chạy độ khó của
   *  chúng. Gộp lại thì "mock" phải giả làm một độ khó, và route không có độ
   *  khó nào tên vậy - nó sẽ lọc ra pool rỗng, đúng cách `trung-binh` đang
   *  hỏng. */
  const startMode = useCallback(
    (id: InterviewModeId) => {
      setActiveMode(id);
      const asDifficulty: QuizDifficulty = id === "mock" ? "tat-ca" : (id as QuizDifficulty);
      // Phải set, không chỉ truyền xuống: `difficulty` là thứ finalizeQuiz ghi
      // vào submitQuizSession. Chỉ truyền qua tham số thì mọi lượt đều được
      // lưu là "tat-ca" - trạng thái ban đầu - và bảng phiên sẽ nói rằng không
      // ai từng chạy vòng áp lực.
      setDifficulty(asDifficulty);
      return startQuiz(asDifficulty, null, id === "mock");
    },
    [startQuiz]
  );

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
    void recordQuizMistake(q.lessonId, 0, ok, q.question);
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
    // Same one-screen contract as /kiem-tra - see APP_MOBILE_HEADER_H there
    // for why the mobile height subtracts AppNavbar's sticky header.
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-stone-50 dark:bg-stone-950">
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-9 h-9 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={t.interview.backToDashboard}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            {/* Phụ đề bỏ đi: nó nói lại đúng điều tiêu đề khối bên dưới đã
                nói, và nói bằng chữ nhỏ hơn ngay phía trên nó. Huy hiệu XP
                xanh lá cũng vậy - con số +5 XP giờ nằm trong dòng thông tin
                của khối drill, chỗ người ta thật sự đang cân nhắc có bắt đầu
                hay không. */}
            <h1 className="text-lg font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
              <BriefcaseBusiness className="w-4 h-4 text-stone-400" />
              {t.interview.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4">
        {/* Mode switch. Hidden mid-drill so a half-finished scored run can't be
            abandoned by an accidental tab click. */}
        {(stage === "setup" || mode === "behavioral") && (
          // Tab gạch chân thay cho hộp pill. Đây là bước MỘT của luồng (chọn
          // loại câu hỏi), nên nó phải đọc ra như một cái tab - còn hộp bo góc
          // có nền, có viền, có shadow thì đọc ra như một khối nội dung nữa
          // xếp chồng lên khối bên dưới. Giữ nguyên chỗ đứng ở cả hai chế độ:
          // chuyển nó vào cột điều khiển bên phải sẽ làm nó biến mất khi sang
          // Behavioral, vì chế độ đó thay cả tấm panel.
          <div className="mb-5 flex items-center gap-6 border-b border-stone-200 dark:border-stone-800">
            {/* Mỗi tab mang con số tiến bộ CỦA TRACK MÌNH: technical là cấp
                bậc, behavioral là số câu đã chuẩn bị. Hai thước đo khác nhau
                vì hai track đo được hai thứ khác nhau - technical có đúng/sai,
                behavioral không. Ép chúng về một thanh phần trăm chung sẽ phải
                bịa ra một điểm số cho bên không có điểm. */}
            {([
              [
                "technical",
                format(t.interview.technicalCount, { count: totalQuestions }),
                t.interview.rankNames[rank.id],
              ],
              [
                "behavioral",
                format(t.interview.behavioralCount, { count: behavioralCount }),
                format(t.behavioralPrep.coverageCount, { done: preparedBehavioral, total: behavioralCount }),
              ],
            ] as const).map(([id, label, meta]) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`-mb-px cursor-pointer border-b-2 pb-2.5 text-[13px] font-bold transition-colors ${
                  mode === id
                    ? "border-stone-900 text-stone-900 dark:border-stone-100 dark:text-stone-100"
                    : "border-transparent text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300"
                }`}
              >
                {label}
                <span className="ml-2 font-semibold text-stone-400 dark:text-stone-500">{meta}</span>
              </button>
            ))}
          </div>
        )}

        {mode === "behavioral" && <BehavioralPrepPanel />}

        {mode === "technical" && stage === "setup" && (
          <div className="space-y-5">
            {/* MỘT tấm panel cho cả màn chuẩn bị.
                Trước đây đây là hai tấm chồng nhau: một thẻ "Đang luyện /
                Đổi vị trí" chiếm nguyên chiều ngang chỉ để giữ một nhãn và một
                nút, rồi tới tấm hero. Chọn vị trí là một bước của cùng một
                luồng chọn-rồi-bắt-đầu, nên nó thuộc về cột điều khiển bên
                phải, cạnh vòng phỏng vấn và nút bắt đầu. */}
            <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
              {/* ── Dải cấp bậc ──
                  Một dòng ngang duy nhất trên đầu panel, không phải một tấm
                  thẻ riêng. Cấp bậc là NGỮ CẢNH cho việc chọn vòng ở dưới, nên
                  nó đứng cùng khung với việc đó; tách ra thành thẻ riêng là
                  quay lại đúng kiểu bảng điều khiển game mà cả trang này đang
                  tránh. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-5 py-3 sm:px-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">
                    {t.interview.rankLabel}
                  </span>
                  <span className="text-sm font-black tracking-tight text-stone-900 dark:text-stone-100">
                    {t.interview.rankNames[rank.id]}
                  </span>
                </div>

                {/* Thanh tiến độ TRONG bậc hiện tại, không phải tổng thể. Một
                    thanh chạy từ 0 tới đỉnh thang sẽ đứng yên hàng tuần ở giữa
                    hành trình; thanh trong bậc thì nhúc nhích mỗi lần một
                    section lên hạng. */}
                {rank.nextId ? (
                  <div className="flex min-w-[10rem] flex-1 items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                      <div
                        className="h-full rounded-full bg-stone-900 transition-all duration-500 dark:bg-stone-100"
                        style={{ width: `${Math.max(3, rank.progressPct)}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">
                      {format(t.interview.rankToNext, {
                        points: rank.pointsToNext,
                        next: t.interview.rankNames[rank.nextId],
                      })}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    {t.interview.rankMaxed}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                    {t.interview.drillHeading}
                  </h2>
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">
                    {t.interview.drillBodyPart1}
                    <strong className="font-bold text-stone-800 dark:text-stone-200">{t.interview.drillBookTitle}</strong>
                    {t.interview.drillBodyPart2}
                  </p>

                  {/* ── Mục tiêu kế tiếp ──
                      MỘT câu, không phải một danh sách. Cái gần nhất chưa mở
                      được nói ra; ba mục tiêu bày cùng lúc thì không cái nào
                      là mục tiêu. */}
                  <p className="mt-4 flex items-start gap-2 rounded-lg border-l-2 border-amber-400 bg-stone-50 px-3 py-2 text-[13px] leading-relaxed text-stone-700 dark:bg-stone-950/60 dark:text-stone-300">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {t.interview.objectiveLabel}
                    </span>
                    <span>
                      {objective.kind === "unlock-kho"
                        ? format(t.interview.objectiveUnlockKho, { count: objective.remaining })
                        : objective.kind === "unlock-mock"
                          ? format(t.interview.objectiveUnlockMock, { count: objective.remaining })
                          : objective.kind === "next-rank"
                            ? format(t.interview.objectiveNextRank, {
                                count: objective.remaining,
                                next: rank.nextId ? t.interview.rankNames[rank.nextId] : "",
                              })
                            : t.interview.objectiveMaxed}
                    </span>
                  </p>

                  {/* ── Thành thạo theo section ──
                      Thay cho bảng "tên section / số câu" của lượt trước. Số
                      câu trong ngân hàng là thuộc tính của bộ đề và nó không
                      đổi bao giờ; thứ đổi sau mỗi lượt - và thứ quyết định nên
                      luyện gì tiếp - là mức thành thạo. Số câu vẫn còn, lùi
                      xuống làm chú thích của thanh tiến độ. */}
                  <div className="mt-5 border-t border-stone-200 pt-4 dark:border-stone-800">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">
                        {selectedCareer ? t.interview.sectionsForRole : t.interview.sectionsAll}
                      </p>
                      {!performanceLoaded && userId && (
                        <span className="text-[11px] text-stone-400 dark:text-stone-500">
                          {t.interview.masteryLoading}
                        </span>
                      )}
                    </div>

                    <ul className="mt-2 divide-y divide-stone-100 dark:divide-stone-800/70">
                      {sections.map((s) => {
                        const isNext = nextSection?.category === s.category;
                        const isMilestone = MOCK_MILESTONE_SECTIONS.includes(s.category);
                        return (
                          <li key={s.category} className="py-2">
                            <div className="flex items-baseline justify-between gap-3">
                              <button
                                type="button"
                                onClick={() => void redrillSection(s.label)}
                                className="min-w-0 flex-1 truncate text-left text-[13px] font-semibold text-stone-800 hover:underline dark:text-stone-200"
                              >
                                {s.label}
                                {isMilestone && (
                                  <span
                                    className="ml-1.5 text-stone-300 dark:text-stone-600"
                                    title={t.interview.milestoneSectionHint}
                                    aria-label={t.interview.milestoneSectionHint}
                                  >
                                    ◆
                                  </span>
                                )}
                              </button>
                              {/* Section nên luyện tiếp là chỗ DUY NHẤT trong
                                  danh sách được đánh dấu. Tô màu cả bốn bậc
                                  thành thạo sẽ cho ra mười bốn dòng nhiều màu
                                  và không dòng nào nổi lên. */}
                              {isNext && (
                                <span className="shrink-0 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-stone-950">
                                  {t.interview.nextUpBadge}
                                </span>
                              )}
                              <span className={`shrink-0 text-[11px] font-bold ${MASTERY_TONE[s.tier]}`}>
                                {t.interview.masteryTiers[s.tier]}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                              <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${MASTERY_BAR[s.tier]}`}
                                  style={{ width: `${s.tier === "untested" ? 0 : Math.max(3, s.accuracy)}%` }}
                                />
                              </div>
                              {/* Chưa đo được thì in số câu của section, không
                                  in "0%". Một dòng 0% cạnh mười ba dòng khác
                                  đọc ra là "bạn sai hết", trong khi sự thật là
                                  "bạn chưa làm câu nào". */}
                              <span className="w-24 shrink-0 text-right text-[11px] tabular-nums text-stone-400 dark:text-stone-500">
                                {s.tier === "untested"
                                  ? format(t.interview.masteryUntestedCount, { total: s.total })
                                  : format(t.interview.masteryScore, {
                                      accuracy: s.accuracy,
                                      correct: s.correct,
                                      attempted: s.attempted,
                                    })}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* ── Cột điều khiển: nhiệm vụ đang chọn ── */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-5 sm:p-6">
                  <label
                    htmlFor="ib-role"
                    className="block text-[11px] font-semibold text-stone-400 dark:text-stone-500"
                  >
                    {t.interview.currentRoleLabel}
                  </label>
                  <select
                    id="ib-role"
                    value={selectedCareer ?? ""}
                    onChange={(e) => setSelectedCareer(e.target.value || null)}
                    className="mt-1.5 w-full cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-2 text-[13px] font-semibold text-stone-800 focus:border-stone-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                  >
                    <option value="">{format(t.interview.allWithCount, { count: totalQuestions })}</option>
                    {roleGroups.map((group) => (
                      <optgroup key={group.category} label={CATEGORY_LABELS[group.category] ?? group.category}>
                        {group.careers.map((c) => (
                          <option key={c.careerId} value={c.careerId}>
                            {c.title} · {c.questionCount}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>

                  {/* Vòng phỏng vấn: ô chọn, và mục đã khoá thì `disabled`.
                      Khoá bằng thuộc tính disabled của <option> chứ không phải
                      bằng cách giấu mục đi - một thang tiến bộ mà không thấy
                      bậc trên thì không phải thang, nó chỉ là một danh sách
                      ngắn hơn. */}
                  <label
                    htmlFor="ib-mode"
                    className="mt-4 block text-[11px] font-semibold text-stone-400 dark:text-stone-500"
                  >
                    {t.interview.pickRound}
                  </label>
                  <select
                    id="ib-mode"
                    value={interviewMode}
                    onChange={(e) => setInterviewMode(e.target.value as InterviewModeId)}
                    className="mt-1.5 w-full cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-2 text-[13px] font-semibold text-stone-800 focus:border-stone-500 focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                  >
                    {INTERVIEW_MODE_IDS.map((id) => (
                      <option key={id} value={id} disabled={!locks[id].unlocked}>
                        {t.interview.modeNames[id]}
                        {locks[id].unlocked
                          ? ` — ${t.interview.modeBlurbs[id]}`
                          : ` — ${format(t.interview.modeLockedShort, { count: locks[id].remaining })}`}
                      </option>
                    ))}
                  </select>

                  {/* ── Nhiệm vụ đang chọn ──
                      Ba con số của lượt sắp chạy, đọc từ chính mode đang chọn
                      chứ không phải gõ tay: số câu lấy từ MODE_QUESTION_COUNT
                      (khớp hằng số của route), XP là số câu × XP mỗi câu. Đây
                      là chỗ ba tấm thẻ thống kê cũ đi về - chúng nói về cả bộ
                      đề, còn đây nói về lượt bạn sắp làm. */}
                  <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-stone-200 pt-3 dark:border-stone-800">
                    <div>
                      <dt className="text-[10px] font-semibold text-stone-400 dark:text-stone-500">
                        {t.interview.missionQuestions}
                      </dt>
                      <dd className="mt-0.5 text-sm font-black tabular-nums text-stone-900 dark:text-stone-100">
                        {MODE_QUESTION_COUNT[interviewMode]}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold text-stone-400 dark:text-stone-500">
                        {t.interview.missionDuration}
                      </dt>
                      <dd className="mt-0.5 text-sm font-black text-stone-900 dark:text-stone-100">
                        {format(t.interview.missionMinutes, {
                          minutes: Math.max(3, Math.round(MODE_QUESTION_COUNT[interviewMode] * 0.7)),
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold text-stone-400 dark:text-stone-500">
                        {t.interview.missionReward}
                      </dt>
                      <dd className="mt-0.5 text-sm font-black tabular-nums text-stone-900 dark:text-stone-100">
                        +{MODE_QUESTION_COUNT[interviewMode] * XP_PER_QUESTION}
                      </dd>
                    </div>
                  </dl>

                  {locks[interviewMode].unlocked ? (
                    <button
                      type="button"
                      onClick={() => void startMode(interviewMode)}
                      className="mt-4 w-full cursor-pointer rounded-lg bg-amber-400 px-4 py-3 text-sm font-black text-stone-950 transition-colors hover:bg-amber-300 active:scale-[0.99]"
                    >
                      {t.interview.startDrill}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled
                        className="mt-4 w-full cursor-not-allowed rounded-lg bg-stone-200 px-4 py-3 text-sm font-black text-stone-500 dark:bg-stone-800 dark:text-stone-500"
                      >
                        {t.interview.modeLockedCta}
                      </button>
                      <p className="mt-2 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                        {interviewMode === "mock"
                          ? format(t.interview.mockUnlockHint, { count: locks.mock.remaining })
                          : format(t.interview.khoUnlockHint, {
                              count: locks.kho.remaining,
                              required: locks.kho.required,
                            })}
                      </p>
                    </>
                  )}

                  {/* Đường tắt tới đúng section đang cần luyện. Nút bắt đầu ở
                      trên chạy vòng đã chọn; nút này chạy đúng một section, và
                      nó là hành động mà câu "mục tiêu kế tiếp" bên trái vừa
                      khuyên - nên nó phải bấm được ngay, không bắt người ta đi
                      tìm dòng đó trong danh sách mười bốn mục. */}
                  {nextSection && (
                    <button
                      type="button"
                      onClick={() => void redrillSection(nextSection.label)}
                      className="mt-2.5 w-full cursor-pointer rounded-lg border border-stone-300 px-4 py-2.5 text-[13px] font-bold text-stone-700 transition-colors hover:border-stone-500 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500"
                    >
                      {format(t.interview.drillRecommended, { section: nextSection.label })}
                    </button>
                  )}

                  {uncoveredCount > 0 && (
                    <p className="mt-3 text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
                      {format(t.interview.uncoveredNote, { uncovered: uncoveredCount, total: FINANCE_CAREERS.length })}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {mode === "technical" && stage === "loading" && <p className="text-center text-stone-500 dark:text-stone-400 py-16">{t.interview.loadingQuestions}</p>}

        {mode === "technical" && stage === "error" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">{t.interview.loadFailed}</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              {t.interview.back}
            </button>
          </div>
        )}

        {mode === "technical" && stage === "empty" && (
          <div className="text-center py-16 space-y-4">
            <p className="text-stone-500 dark:text-stone-400">{t.interview.noQuestions}</p>
            <button onClick={() => setStage("setup")} className="text-sm font-bold text-stone-700 dark:text-stone-300 underline cursor-pointer">
              {t.interview.back}
            </button>
          </div>
        )}

        {mode === "technical" && stage === "ready" && q && (
          <div className="mx-auto max-w-4xl space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-6 shadow-sm">
            {/* ── Đầu vòng: chặng, không phải ba tấm thẻ ──
                Ba ô "Câu / Đúng / Vòng" mỗi ô một viền đã gộp thành một dòng.
                Thứ thay chỗ chúng là dải chặng: một vòng phỏng vấn thật đi từ
                câu khởi động tới câu áp lực, và route đã sắp câu hỏi theo đúng
                thứ tự đó (xem `phase` trong app/api/knowledge-challenge/route.ts),
                nên dải này mô tả một chuyện có thật chứ không dán nhãn theo vị
                trí. Chặng nào lượt này không có câu thì hiện mờ - nói rằng
                vòng đã chọn không chứa nó, thay vì vờ như có. */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-[13px] font-black text-stone-900 dark:text-stone-100">
                  {t.interview.modeNames[activeMode]}
                </span>
                <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">
                  {format(t.interview.roundProgress, {
                    index: activeQ + 1,
                    total: questions.length,
                    correct: score,
                  })}
                </span>
              </div>

              <ol className="mt-3 flex gap-1.5">
                {ROUND_PHASES.map((phase) => {
                  const inRun = questions.some((question) => question.phase === phase);
                  const isCurrent = q.phase === phase;
                  const done =
                    inRun &&
                    !isCurrent &&
                    questions.findIndex((question) => question.phase === phase) < activeQ;
                  return (
                    <li key={phase} className="min-w-0 flex-1">
                      <div
                        className={`h-1 rounded-full transition-colors ${
                          isCurrent
                            ? "bg-amber-400"
                            : done
                              ? "bg-stone-900 dark:bg-stone-100"
                              : inRun
                                ? "bg-stone-200 dark:bg-stone-800"
                                : "bg-stone-100 dark:bg-stone-900"
                        }`}
                      />
                      <p
                        className={`mt-1 truncate text-[10px] font-semibold ${
                          isCurrent
                            ? "text-stone-900 dark:text-stone-100"
                            : inRun
                              ? "text-stone-500 dark:text-stone-400"
                              : "text-stone-300 dark:text-stone-700"
                        }`}
                      >
                        {t.interview.roundPhases[phase]}
                      </p>
                    </li>
                  );
                })}
                {/* Chặng thứ tư là KẾT QUẢ. Nó không phải một chặng hỏi bài,
                    nên nó không lấy câu nào từ ngân hàng - nhưng bỏ nó ra khỏi
                    dải thì vòng trông như kết thúc lửng ở câu cuối. */}
                <li className="min-w-0 flex-1">
                  <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-900" />
                  <p className="mt-1 truncate text-[10px] font-semibold text-stone-300 dark:text-stone-700">
                    {t.interview.roundResult}
                  </p>
                </li>
              </ol>

              <p className="mt-3 truncate text-[11px] text-stone-400 dark:text-stone-500">{q.lessonTitle}</p>
            </div>

            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4 sm:p-5">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                {t.interview.interviewerAsks}
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
                <p className="font-bold mb-1">{results[activeQ] ? format(t.interview.goodAnswer, { xp: XP_PER_QUESTION }) : t.interview.explanation}</p>
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
                {t.interview.lockAnswer}
              </button>
            ) : (
              <button onClick={next} className="w-full py-4 rounded-xl font-extrabold text-base uppercase tracking-wide cursor-pointer bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90">
                {allDone ? t.interview.seeResults : t.interview.nextQuestion}
              </button>
            )}
          </div>
        )}

        {mode === "technical" && stage === "done" && (
          <div className="mx-auto max-w-3xl text-center space-y-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7 shadow-sm">
            <div className="text-5xl">{score === questions.length ? "🏆" : score >= questions.length * 0.7 ? "🎉" : "💪"}</div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t.interview.doneTitle}</h3>
              <p className="text-sm mt-1 text-stone-500 dark:text-stone-400">
                {format(t.interview.doneScore, { score, total: questions.length })}{passed ? t.interview.donePassed : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{t.interview.readiness}</p>
                <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">{Math.round((score / Math.max(1, questions.length)) * 100)}%</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{t.interview.statRound}</p>
                <p className="mt-1 text-sm font-black text-stone-900 dark:text-stone-100">{t.interview.modeNames[activeMode]}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{t.interview.nextAction}</p>
                <p className="mt-1 text-sm font-black text-emerald-600 dark:text-emerald-400">{passed ? t.interview.levelUp : t.interview.reviewMistakes}</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wide mb-1 text-amber-700 dark:text-amber-400">{t.interview.xpEarned}</p>
              <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400">
                {xpAwarded === null ? "..." : format(t.miscUi.xpGain, { count: xpAwarded })}
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
                  {t.interview.sectionsToReview}
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
                      <span className="text-amber-600/80 dark:text-amber-400/80">{format(t.interview.missedCount, { count: missed })}</span>
                      <span aria-hidden>↻</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2.5 text-[11px] text-stone-500 dark:text-stone-400">
                  {t.interview.sectionsHint}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/dashboard" className="py-3 rounded-xl border text-sm font-bold text-center border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800">
                {t.interview.backToDashboard}
              </Link>
              <button onClick={() => setStage("setup")} className="py-3 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer bg-amber-400 text-stone-950">
                {t.interview.newDrill}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
