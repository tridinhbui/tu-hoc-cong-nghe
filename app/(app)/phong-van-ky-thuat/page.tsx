"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  ChevronLeft,
  Gem,
  TrendingUp,
  Coins,
  BarChart3,
  Swords,
  Sprout,
  Mountain,
  Flag,
  ScrollText,
  RotateCcw,
  Check,
  CheckCircle2,
  Shield,
  Clock,
  ArrowRight,
  ArrowLeft,
  Target,
  Trophy,
  Flame,
  Search,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { submitQuizSession, computeQuizXp, QUIZ_XP_PER_CORRECT, getQuizStats, type QuizDifficulty, type QuizAnswerSubmission } from "@/lib/cloudflare-quiz-sessions";
import { recalculateUserStats, getUserStats } from "@/lib/cloudflare-user";
import { getUserStreak } from "@/lib/cloudflare-streak";
import { getLevelByXp, getNextLevel, getLevelProgress } from "@/lib/levels";
import {
  TECH_CAREERS,
  TECH_INTERVIEW_QUESTIONS,
  TECH_BEHAVIORAL_CARDS,
  formatCategoryLabel,
  getTechnicalQuestionsForCareer,
} from "@/lib/interview-bank";
import BehavioralPrepPanel from "@/components/BehavioralPrepPanel";
import InterviewWeakAreasPanel from "@/components/InterviewWeakAreasPanel";
import InterviewMissedQuestionsPanel from "@/components/InterviewMissedQuestionsPanel";
import { recordQuizMistake } from "@/lib/quiz-mistakes";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale, type Dictionary } from "@/lib/i18n";
import { matchesVietnamese } from "@/lib/vn-search";
import { getCurrentUserId } from "@/lib/current-user";
import { getInterviewCoverage, type InterviewCoverage } from "@/lib/interview-weak-areas";
import InterviewerStage from "@/components/InterviewerStage";
import { useQuizKeys } from "@/lib/use-quiz-keys";
import { btnPrimary, btnSecondary, panel, SectionHead, StatTable, Sys, tabClass, textLink } from "@/components/ui/system";

interface ChallengeQuestion {
  lessonId: number;
  lessonTitle: string;
  lessonSlug: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  token: string;
  /** Hoán vị máy chủ đã áp lên `options`; xem chú thích ở
   *  app/api/knowledge-challenge/route.ts. Cũ hơn bản đó thì thiếu trường
   *  này, nên nó là tuỳ chọn và thiếu thì KHÔNG dịch lại phương án. */
  optionOrder?: number[];
}

/** Nhãn NGẮN của độ khó ("Trung bình"), khác `ibDifficultyCopy` là dòng phụ
 *  ("Mức analyst"). Dòng tóm tắt dưới nút "BẮT ĐẦU LUYỆN NGAY" từng ghi cứng
 *  bốn nhãn này bằng tiếng Việt, nên người đọc tiếng Anh thấy
 *  "5 questions • Trung bình". */
function ibDifficultyTitle(t: Dictionary): Record<QuizDifficulty, string> {
  return {
    "tat-ca": t.interview.diffAll,
    de: t.interview.diffEasy,
    "trung-binh": t.interview.diffMedium,
    kho: t.interview.diffHard,
  };
}

function ibDifficultyCopy(t: Dictionary): Record<QuizDifficulty, string> {
  return {
    "tat-ca": t.interview.diffAllSub,
    de: t.interview.diffEasySub,
    "trung-binh": t.interview.diffMediumSub,
    kho: t.interview.diffHardSub,
  };
}

/** Icon cho từng thẻ nghề, lấy theo thứ tự thẻ chứ không theo nghề.
 *
 *  Danh sách nghề ở đây sắp theo SỐ CÂU giảm dần và đổi khi kho câu hỏi đổi,
 *  nên gắn icon cố định cho từng nghề sẽ phải bảo trì một bảng ánh xạ mà không
 *  ai nhớ cập nhật. Ở đây icon chỉ để phân biệt thẻ bằng mắt, không mang nghĩa
 *  về nghề - đúng như bộ emoji nó thay thế. */
const CAREER_ICONS: LucideIcon[] = [Gem, TrendingUp, Coins, BarChart3, Shield];

/** Nhóm nghề cho bộ chọn vai trò: bảy nghề chỉ cần ba nhóm để dò bằng mắt. */
type CareerCategory = "build" | "data-ai" | "ops-quality";
const CAREER_GROUP_OF: Record<string, CareerCategory> = {
  frontend: "build",
  backend: "build",
  mobile: "build",
  data: "data-ai",
  "ai-engineer": "data-ai",
  devops: "ops-quality",
  qa: "ops-quality",
};
const CAREER_GROUP_ORDER: CareerCategory[] = ["build", "data-ai", "ops-quality"];

const QUESTION_COUNT_OPTIONS = [5, 10, 20, 30] as const;
const DEFAULT_QUESTION_COUNT = 5;

const DIFFICULTY_IDS: QuizDifficulty[] = ["tat-ca", "de", "trung-binh", "kho"];
/* i18n-ignore-start: định danh hệ thống (mono), cùng một chuỗi ở mọi ngôn ngữ */
const SYS = {
  interview: "THCN://INTERVIEW/TECH",
  result: "THCN://INTERVIEW/RESULT",
  step: (n: number) => String(n).padStart(2, "0"),
  level: (n: string) => `LV.${n}`,
};
/* i18n-ignore-end */

/** Ô chọn (nghề, độ khó, số câu, chủ đề): viền 1px, bo 2px. Đang chọn thì
 *  viền xanh + nền xanh nhạt - xanh ở đây là CHỨC NĂNG, không phải trang trí. */
function choiceClass(active: boolean) {
  return `rounded-sm border transition-colors cursor-pointer ${
    active
      ? "border-brand-600 bg-accent-soft text-ink-max dark:border-brand-400"
      : "border-line-strong bg-white text-ink-heading hover:border-stone-950 dark:bg-stone-900 dark:hover:border-stone-200"
  }`;
}
const PASS_RATIO = 0.6;

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";
type Mode = "technical" | "behavioral";

export default function TechnicalInterviewPage() {
  const { t, locale } = useI18n();
  const IB_DIFFICULTY_COPY = ibDifficultyCopy(t);
  const IB_DIFFICULTY_TITLE = ibDifficultyTitle(t);
  const [userId, setUserId] = useState<string | null>(null);
  /** Dòng "Hoàn thành x% - y XP" từng ghi cứng 21% và 1119 XP cho MỌI người
   *  học, kèm thanh tiến độ width: "21%". Giờ đọc từ user_interview_question_attempts
   *  và user_quiz_sessions - xem chú thích ở getInterviewCoverage. */
  const [ibCoverage, setInterviewCoverage] = useState<InterviewCoverage | null>(null);
  const [ibXp, setIbXp] = useState<number>(0);
  /** Bảng "TIẾN ĐỘ CỦA BẠN" từng ghi cứng TOÀN BỘ: LV.2, 1.119/2.000 XP, thanh
   *  56%, chuỗi ngày lấy từ một chuỗi cố định trong từ điển, 86 câu đã trả lời
   *  và 72% chính xác. Mọi người học thấy y hệt. Giờ đọc từ user_stats,
   *  user_streaks và user_quiz_sessions. */
  const [totalXp, setTotalXp] = useState<number | null>(null);
  const [streakDays, setStreakDays] = useState<number | null>(null);
  const [ibSolved, setIbSolved] = useState<number | null>(null);
  const [ibAccuracy, setIbAccuracy] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("technical");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("tat-ca");
  const [questionCount, setQuestionCount] = useState<number>(DEFAULT_QUESTION_COUNT);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [weakAreasKey, setWeakAreasKey] = useState(0);
  const [stage, setStage] = useState<Stage>("setup");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  /** Đồng hồ ĐẾM LÊN từ lúc lượt luyện bắt đầu, không đếm ngược.
   *
   *  Mẫu thiết kế vẽ "25:00" nghe như đếm ngược, nhưng trang này không có giới
   *  hạn thời gian và dựng một cái đếm ngược sẽ là bịa ra một luật chơi không
   *  tồn tại - hết giờ thì sao? Đo thời gian đã dùng là con số THẬT, và nó vẫn
   *  tạo đúng áp lực nhẹ mà khối này cần. */
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [answers, setAnswers] = useState<QuizAnswerSubmission[]>([]);
  const [xpAwarded, setXpAwarded] = useState<number | null>(null);
  const [recording, setRecording] = useState(false);

  const totalQuestions = TECH_INTERVIEW_QUESTIONS.length;
  const behavioralCount = TECH_BEHAVIORAL_CARDS.length;

  const careerCoverage = useMemo(
    () =>
      TECH_CAREERS.map((c) => ({
        careerId: c.id,
        title: c.title,
        englishTitle: c.englishTitle,
        questionCount: getTechnicalQuestionsForCareer(c.id).length,
      })).filter((c) => c.questionCount > 0),
    []
  );

  const topCareers = useMemo(
    () => careerCoverage.slice().sort((a, b) => b.questionCount - a.questionCount).slice(0, 5),
    [careerCoverage]
  );

  const [rolePickerOpen, setRolePickerOpen] = useState(false);
  const [roleQuery, setRoleQuery] = useState("");
  /** Bộ chọn CHỦ ĐỀ, dựng theo đúng khuôn bộ chọn nghề.
   *
   *  Nút "Xem thêm + N chủ đề" trước đây chỉ gọi `setSelectedSection(null)`:
   *  nó hứa một danh sách và thay vào đó BỎ CHỌN chủ đề đang chọn - tức bấm
   *  vào để xem thêm lại mất luôn thứ vừa chọn. */
  const [topicPickerOpen, setTopicPickerOpen] = useState(false);
  const [topicQuery, setTopicQuery] = useState("");

  const visibleGroups = useMemo(() => {
    const matches = careerCoverage.filter(
      (c) => matchesVietnamese(c.title, roleQuery) || matchesVietnamese(c.englishTitle, roleQuery)
    );
    return CAREER_GROUP_ORDER.map((category) => ({
      category,
      careers: matches.filter((c) => CAREER_GROUP_OF[c.careerId] === category),
    })).filter((g) => g.careers.length > 0);
  }, [careerCoverage, roleQuery]);

  const CATEGORY_LABELS = useMemo(
    (): Record<CareerCategory, string> => ({
      build: t.interview.groupBuild,
      "data-ai": t.interview.groupDataAi,
      "ops-quality": t.interview.groupOpsQuality,
    }),
    [t]
  );

  const activeCategoryCounts = useMemo(() => {
    const raw = selectedCareer ? getTechnicalQuestionsForCareer(selectedCareer) : TECH_INTERVIEW_QUESTIONS;
    const byValue = new Map<string, { value: string; label: string; count: number }>();
    for (const q of raw) {
      const value = formatCategoryLabel(q.category);
      const existing = byValue.get(value);
      if (existing) {
        existing.count += 1;
        continue;
      }
      byValue.set(value, {
        value,
        label: value,
        count: 1,
      });
    }
    return [...byValue.values()].sort((a, b) => b.count - a.count);
  }, [selectedCareer]);

  const visibleTopics = useMemo(
    () => activeCategoryCounts.filter((topic) => matchesVietnamese(topic.label, topicQuery)),
    [activeCategoryCounts, topicQuery]
  );

  useEffect(() => {
    void getCurrentUserId().then(setUserId);
  }, []);

  // Escape đóng modal đang mở. Không đặt state trong THÂN effect - chỉ trong
  // callback của listener, đúng thứ `react-hooks/set-state-in-effect` quan tâm.
  useEffect(() => {
    if (!rolePickerOpen && !topicPickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setRolePickerOpen(false);
      setTopicPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rolePickerOpen, topicPickerOpen]);

  // Nạp lại khi `stage` đổi: xong một lượt là vừa có thêm câu đã trả lời và
  // thêm XP, nên dòng tiến độ phải phản ánh ngay chứ không đợi tải lại trang.
  useEffect(() => {
    if (!userId) return;
    void getInterviewCoverage(userId).then(setInterviewCoverage).catch(() => {});
    void getQuizStats(userId, "interview")
      .then((st) => {
        setIbXp(st.xp);
        setIbSolved(st.solved);
        setIbAccuracy(st.accuracyPct);
      })
      .catch(() => {});
    void getUserStats(userId).then((st) => setTotalXp(st?.total_xp ?? 0)).catch(() => {});
    void getUserStreak(userId).then((st) => setStreakDays(st?.current_streak ?? 0)).catch(() => {});
  }, [userId, stage]);

  // Chỉ chạy khi đang trong lượt. Không đặt state thẳng trong thân effect -
  // chỉ trong callback của interval, đúng thứ `react-hooks/set-state-in-effect`
  // quan tâm.
  useEffect(() => {
    if (startedAt === null) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const elapsedLabel = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  const startQuiz = useCallback(async (
    overrideDifficulty?: QuizDifficulty,
    overrideSection?: string | null,
    onlyQuestionIds?: number[],
  ) => {
    const effectiveDifficulty = onlyQuestionIds?.length ? "tat-ca" : (overrideDifficulty ?? difficulty);
    setSelectedSection(overrideSection ?? null);
    setStage("loading");
    setActiveQ(0);
    setStartedAt(Date.now());
    setElapsed(0);
    setSelected(null);
    setSubmitted(false);
    setResults([]);
    setAnswers([]);
    setXpAwarded(null);
    try {
      const careerParam = selectedCareer ? `&career=${encodeURIComponent(selectedCareer)}` : "";
      const sectionParam = overrideSection ? `&section=${encodeURIComponent(overrideSection)}` : "";
      const idsParam = onlyQuestionIds?.length ? `&ids=${onlyQuestionIds.join(",")}` : "";
      const res = await fetch(
        `/api/knowledge-challenge?track=interview&difficulty=${effectiveDifficulty}&count=${onlyQuestionIds?.length ?? questionCount}&locale=${locale}${careerParam}${sectionParam}${idsParam}`
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
  }, [difficulty, selectedCareer, questionCount, locale]);

  const redrillSection = useCallback(
    (label: string) => startQuiz(difficulty, label),
    [startQuiz, difficulty]
  );

  const redrillQuestions = useCallback(
    (questionIds: number[]) => void startQuiz(undefined, null, questionIds),
    [startQuiz]
  );

  // Kho mới có bản tiếng Việt, nên không có gì để dịch lại tại chỗ. Khi kho có
  // bản dịch, chỗ này là nơi ghép lại - và phương án phải đi qua `optionOrder`.
  const localizedQuestions = questions;

  const missedSections = useMemo(() => {
    const counts = new Map<string, number>();
    localizedQuestions.forEach((question, i) => {
      if (results[i]) return;
      const label = question.lessonTitle.split("·").pop()?.trim();
      if (!label) return;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([label, missed]) => ({ label, missed }))
      .sort((a, b) => b.missed - a.missed);
  }, [localizedQuestions, results]);

  const q = localizedQuestions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);
  const progressPct = questions.length > 0 ? Math.round(((activeQ + (submitted ? 1 : 0)) / questions.length) * 100) : 0;

  async function finalizeQuiz() {
    if (!userId || recording || xpAwarded !== null) return;
    setRecording(true);
    try {
      const result = await submitQuizSession("interview", difficulty, answers);
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
    /* Ghi theo CHỈ SỐ CÂU, không phải `[...a, ...]`.
     *
     *  Nối vào cuối thì quay lại câu trước rồi bấm "Câu tiếp theo" đẩy câu ấy
     *  về trạng thái chưa trả lời, và `verify()` nối thêm một dòng NỮA cho
     *  cùng một token - mảng gửi lên `submitQuizSession` có hai lần cùng một
     *  câu. Gán theo chỉ số thì trả lời lại chỉ ghi đè, không sinh thêm. */
    setAnswers((a) => {
      const n = [...a];
      n[activeQ] = { token: q.token, selected };
      return n;
    });
    setSubmitted(true);
    void recordQuizMistake(q.lessonId, 0, ok, q.question);
  }

  /** Quay lại câu trước để ĐỌC LẠI, không phải để trả lời lại.
   *
   *  `results` và `answers` đã ghi rồi và không đụng tới ở đây - cho sửa lại
   *  đáp án cũ là mở đường ghi đè điểm đã chấm. Nên câu cũ mở ra ở trạng thái
   *  ĐÃ NỘP, với đúng phương án người học từng chọn. */
  function prev() {
    if (activeQ === 0) return;
    const target = activeQ - 1;
    setActiveQ(target);
    setSelected(answers[target]?.selected ?? null);
    setSubmitted(true);
  }

  function next() {
    if (activeQ === questions.length - 1) {
      setStage("done");
      void finalizeQuiz();
      return;
    }
    /* Câu ĐÃ trả lời mở lại ở trạng thái đã nộp, đúng như `prev()`.
     *
     *  Trước đây nút này luôn xoá trắng, nên đi lùi rồi đi tới lại là câu cũ
     *  trông như chưa làm: bấm "Chốt câu trả lời" lần nữa chấm lại chính câu
     *  đó và nối thêm một dòng trùng token vào `answers`. */
    const target = activeQ + 1;
    const stored = answers[target];
    setActiveQ(target);
    setSelected(stored?.selected ?? null);
    setSubmitted(stored !== undefined);
  }

  // 1-4 chọn phương án, Enter chốt rồi sang câu sau. Tắt khi đang mở modal để
  // phím số không vừa chọn nghề vừa chọn đáp án của câu phía sau.
  useQuizKeys({
    optionCount: q?.options.length ?? 0,
    enabled: stage === "ready" && !!q && !rolePickerOpen && !topicPickerOpen,
    onPick: choose,
    onEnter: () => {
      if (submitted) next();
      else verify();
    },
  });

  const difficultyTitle = IB_DIFFICULTY_TITLE[difficulty];

  return (
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-page dark:bg-stone-950 font-sans">
      {/* ─── 1. TOP NAVIGATION HEADER ─── */}
      <div className="shrink-0 border-b border-line-strong bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {stage !== "setup" && mode !== "behavioral" ? (
              <button
                type="button"
                onClick={() => setStage("setup")}
                className="flex items-center justify-center w-9 h-9 rounded-sm text-ink-muted hover:bg-surface-raised hover:text-ink transition-colors cursor-pointer"
                aria-label={t.interview.back}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-9 h-9 rounded-sm text-ink-muted hover:bg-surface-raised hover:text-ink transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}
            <h1 className="text-lg sm:text-xl font-black text-ink-max tracking-tight">
              {t.interview.pageTitle}
            </h1>
          </div>

          <span className="inline-flex items-center rounded-sm border border-line-strong px-2 py-1 text-xs font-bold text-ink-soft">
            {format(t.quizPage.xpPerQuestion, { xp: QUIZ_XP_PER_CORRECT[difficulty] })}
          </span>
        </div>
      </div>

      {/* ─── 2. MAIN SCROLLABLE CONTENT ─── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        {stage === "setup" && (
          <div className="max-w-7xl mx-auto space-y-5">
            {/* CHỌN CHẾ ĐỘ: KỸ THUẬT / HÀNH VI

                Trước đây `mode` có đủ hai giá trị và `BehavioralPrepPanel`
                được import, nhưng `setMode` không được gọi ở đâu cả - nên 121
                thẻ luyện phỏng vấn hành vi không có đường nào mở ra được. */}
            <div className="flex gap-6 border-b border-line-strong">
              {([
                { id: "technical" as Mode, label: t.interview.modeTechnical, sub: t.interview.modeTechnicalSub },
                { id: "behavioral" as Mode, label: t.interview.modeBehavioral, sub: t.interview.modeBehavioralSub },
              ]).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  aria-pressed={mode === m.id}
                  className={`${tabClass(mode === m.id)} text-left cursor-pointer`}
                >
                  <span className="block">{m.label}</span>
                  <span className="block mt-0.5 text-[11px] font-medium text-ink-muted">{m.sub}</span>
                </button>
              ))}
            </div>
            {mode === "behavioral" ? (
              <BehavioralPrepPanel career={selectedCareer} />
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* ────── LEFT COLUMN (~68% width) ────── */}
            <div className="lg:col-span-8 space-y-5 min-w-0">
              {/* 1. HERO */}
              <div className={`${panel} p-4 sm:p-5 flex flex-col xl:flex-row items-stretch justify-between gap-4`}>
                <div className="min-w-0 flex-1 flex flex-col justify-between gap-3">
                  <SectionHead
                    code={SYS.interview}
                    eyebrow={t.interview.heroEyebrow}
                    title={t.interview.heroTitle}
                    sub={t.interview.heroSub}
                  />

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ink-muted">
                      {t.interview.heroDone}
                    </span>
                    <div className="w-28 sm:w-36 h-1.5 rounded-xs bg-surface-sunken overflow-hidden">
                      <div className="h-full bg-brand-600 dark:bg-brand-500" style={{ width: `${ibCoverage?.pct ?? 0}%` }} />
                    </div>
                    <span className="text-xs font-bold tabular-nums text-ink-soft">
                      {format(t.interview.heroProgress, { pct: ibCoverage?.pct ?? 0, xp: ibXp })}
                    </span>
                  </div>
                </div>

                <div className="relative w-full xl:w-80 h-38 shrink-0 rounded-sm overflow-hidden select-none border border-line-strong bg-surface flex items-center justify-center">
                  <Image
                    src="/images/dashboard/interview_hero_mountain.jpg"
                    alt={t.interview.heroAlt}
                    fill
                    className="object-cover object-center"
                  />
                  <button
                    type="button"
                    onClick={() => void startQuiz(difficulty, selectedSection)}
                    className={`${btnPrimary} absolute bottom-3 right-3 z-20 cursor-pointer`}
                  >
                    <span>{t.interview.heroCta}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* 2. BỐN BƯỚC */}
              <ol className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                {[
                  { title: t.interview.step1, sub: t.interview.step1Sub },
                  { title: t.interview.step2, sub: t.interview.step2Sub },
                  { title: t.interview.step3, sub: t.interview.step3Sub },
                  { title: t.interview.step4, sub: t.interview.step4Sub },
                ].map((s, i) => (
                  <li
                    key={i}
                    className={`min-w-0 border-t-2 pt-2 ${i === 0 ? "border-brand-600 dark:border-brand-400" : "border-line-strong"}`}
                  >
                    <Sys className={i === 0 ? "text-accent-strong" : "text-ink-faint"}>{SYS.step(i + 1)}</Sys>
                    <p className="mt-1 text-xs font-black text-ink-max truncate">{s.title}</p>
                    <p className="text-[10.5px] text-ink-muted truncate">{s.sub}</p>
                  </li>
                ))}
              </ol>

              {/* 3. SECTION 1: CHỌN NGHỀ NGHIỆP PHỎNG VẤN */}
              <div className="space-y-2">
                <h3 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
                  {t.interview.sectionCareer}
                </h3>
                {/* lg:grid-cols-7 - bảy thẻ (tất cả + 5 nghề + "Xem thêm") vốn
                    tràn xuống hàng hai chỉ để chứa đúng một nút. Ở lg có chỗ cho
                    cả bảy trên một hàng, và ~92px thu lại ở đó nhiều hơn mọi
                    lượt cắt padding trong trang cộng lại. Giữ 6 cột ở md. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCareer(null);
                      setSelectedSection(null);
                    }}
                    aria-pressed={selectedCareer === null}
                    className={`${choiceClass(selectedCareer === null)} p-3 flex flex-col items-center justify-center text-center min-h-[72px]`}
                  >
                    <BriefcaseBusiness className="w-4 h-4 mb-0.5" strokeWidth={2} />
                    <span className="text-xs font-black block truncate w-full">
                      {selectedCareer === null ? `${totalQuestions} ${t.interview.questionsUnit}` : t.interview.allCareers}
                    </span>
                  </button>

                  {topCareers.map((c, i) => {
                    const active = selectedCareer === c.careerId;
                    const CareerIcon = CAREER_ICONS[i % CAREER_ICONS.length];
                    return (
                      <button
                        key={c.careerId}
                        type="button"
                        onClick={() => {
                          setSelectedCareer(active ? null : c.careerId);
                          setSelectedSection(null);
                        }}
                        aria-pressed={active}
                        className={`${choiceClass(active)} p-2.5 flex flex-col items-center justify-center text-center min-h-[72px]`}
                      >
                        <span className="text-xs font-black block line-clamp-2 w-full leading-tight">
                          {c.title}
                        </span>
                        <span className="text-[10.5px] mt-1 font-bold flex items-center gap-1 text-ink-muted">
                          <CareerIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                          <span className="font-mono tabular-nums">{c.questionCount}</span> {t.interview.questionsUnit}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setRolePickerOpen(true)}
                    className="p-2.5 rounded-sm border border-dashed border-line-firm text-ink-body transition-colors hover:border-stone-950 dark:hover:border-stone-300 cursor-pointer flex flex-col items-center justify-center min-h-[72px]"
                  >
                    <span className="text-xs font-black block">{t.interview.seeMore}</span>
                    <span className="text-[10.5px] text-accent-strong font-bold mt-0.5">{t.interview.seeMoreCareers}</span>
                  </button>
                </div>
              </div>

              {/* 4. SECTION 2: CHỌN ĐỘ KHÓ */}
              <div className="space-y-2">
                <h3 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
                  {t.interview.sectionDifficulty}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DIFFICULTY_IDS.map((id) => {
                    const isSelected = difficulty === id;
                    const labels: Record<QuizDifficulty, { title: string; sub: string; Icon: LucideIcon }> = {
                      "tat-ca": { title: t.interview.diffAll, sub: t.interview.diffAllSub, Icon: Swords },
                      de: { title: t.interview.diffEasy, sub: t.interview.diffEasySub, Icon: Sprout },
                      "trung-binh": { title: t.interview.diffMedium, sub: t.interview.diffMediumSub, Icon: Mountain },
                      kho: { title: t.interview.diffHard, sub: t.interview.diffHardSub, Icon: Flag },
                    };
                    const item = labels[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDifficulty(id)}
                        aria-pressed={isSelected}
                        className={`${choiceClass(isSelected)} p-3 flex flex-col items-center justify-center text-center min-h-[68px]`}
                      >
                        <span className="text-xs font-black flex items-center gap-1">
                          <item.Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} /> {item.title}
                        </span>
                        <span className="text-[10.5px] font-medium mt-0.5 text-ink-muted">
                          {item.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. SECTION 3: CHỌN SỐ LƯỢNG CÂU */}
              <div className="space-y-2">
                <h3 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
                  {t.interview.sectionCount}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {QUESTION_COUNT_OPTIONS.map((n) => {
                    const isSelected = questionCount === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setQuestionCount(n)}
                        aria-pressed={isSelected}
                        className={`${choiceClass(isSelected)} p-3 flex items-center justify-center gap-1.5 min-h-[48px] font-bold`}
                      >
                        <ScrollText className="w-4 h-4 shrink-0" strokeWidth={2} />
                        <span className="text-xs">
                          <span className="font-mono tabular-nums">{n}</span> {t.interview.questionsUnit}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. SECTION 4: CHỌN CHỦ ĐỀ TRỌNG ĐIỂM */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-line-strong pb-2">
                  <h3 className="eyebrow text-ink-soft">
                    {t.interview.sectionTopic}
                  </h3>
                  {selectedSection && (
                    <button
                      type="button"
                      onClick={() => setSelectedSection(null)}
                      className="text-xs font-bold text-ink-muted hover:text-ink cursor-pointer"
                    >
                      {t.interview.clearTopic} <X className="w-3 h-3 inline-block align-[-1px]" strokeWidth={2.6} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {activeCategoryCounts.slice(0, 5).map((topic) => {
                    const active = selectedSection === topic.value;
                    return (
                      <button
                        key={topic.value}
                        type="button"
                        onClick={() => setSelectedSection(active ? null : topic.value)}
                        aria-pressed={active}
                        className={`${choiceClass(active)} p-2.5 flex flex-col items-center justify-center text-center min-h-[68px]`}
                      >
                        <span className="text-xs font-black block line-clamp-2 w-full leading-tight">
                          {topic.label}
                        </span>
                        <span className="font-mono text-[10.5px] mt-1 tabular-nums text-ink-muted">
                          {topic.count}
                        </span>
                      </button>
                    );
                  })}

                  {activeCategoryCounts.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setTopicPickerOpen(true)}
                      className="p-2.5 rounded-sm border border-dashed border-line-firm text-ink-body transition-colors hover:border-stone-950 dark:hover:border-stone-300 cursor-pointer flex flex-col items-center justify-center min-h-[68px]"
                    >
                      <span className="text-xs font-black block">{t.interview.seeMore}</span>
                      <span className="text-[10.5px] text-accent-strong font-bold mt-0.5">
                        + {activeCategoryCounts.length - 5} {t.interview.seeMoreTopics}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* 7. NÚT BẮT ĐẦU */}
              <button
                type="button"
                onClick={() => void startQuiz(difficulty, selectedSection)}
                className={`${btnPrimary} w-full flex-col !gap-1 !py-4 cursor-pointer`}
              >
                <span className="text-base font-black tracking-wide flex items-center gap-2">
                  {t.interview.startNow}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                </span>
                <span className="text-xs font-medium opacity-75">
                  {questionCount} {t.interview.startNote} {difficultyTitle} • {selectedSection ? selectedSection : t.interview.diffAllSub}
                </span>
              </button>
            </div>

            {/* ────── RIGHT COLUMN (~32% width) ────── */}
            <div className="lg:col-span-4 space-y-5 min-w-0">
              {/* TIẾN ĐỘ CỦA BẠN */}
              <div className={`${panel} p-5 space-y-4`}>
                <h3 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
                  {t.interview.progressTitle}
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-sm border border-line-strong bg-surface-raised dark:bg-stone-950 flex items-center justify-center">
                    <span className="font-mono text-sm font-medium tabular-nums text-ink-max">
                      {SYS.level(totalXp === null ? "-" : String(getLevelByXp(totalXp).level))}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs tabular-nums text-ink-heading">
                      {totalXp === null
                        ? "-- XP"
                        : `${totalXp.toLocaleString(intlLocale(locale))} / ${(getNextLevel(getLevelByXp(totalXp).level)?.minXp ?? totalXp).toLocaleString(intlLocale(locale))} XP`}
                    </span>
                    <div className="w-full h-1.5 rounded-xs bg-surface-sunken overflow-hidden mt-1.5">
                      <div className="h-full bg-brand-600 dark:bg-brand-500" style={{ width: `${totalXp === null ? 0 : getLevelProgress(totalXp)}%` }} />
                    </div>
                  </div>
                </div>

                <StatTable
                  className="border-t border-line-soft"
                  rows={[
                    // Chỉ con số: cột giá trị của StatTable đi bằng mono, và "{n} ngày"
                    // là chữ tiếng Việt - nhãn "Chuỗi ngày" đã nói đơn vị.
                    { label: t.interview.streakLabel, value: streakDays === null ? "--" : streakDays },
                    { label: t.interview.answeredLabel, value: ibSolved ?? "--" },
                    { label: t.interview.accuracyLabel, value: ibAccuracy === null ? "--" : `${ibAccuracy}%` },
                  ]}
                />
              </div>

              {/* THẺ "NHIỆM VỤ HÀNG NGÀY" ĐÃ GỠ, và đừng dựng lại ở đây.
                  Nó hiện ba nhiệm vụ với tiến độ 0/1, 7/10 và 1/2 cùng ba thanh
                  0%, 70%, 50% - tất cả viết cứng, nên mọi người học thấy y hệt.
                  Kèm một đồng hồ đếm ngược "12:34:57" cũng cố định.

                  Ba nhiệm vụ ấy không có gì đỡ phía sau: danh mục nhiệm vụ thật
                  nằm ở lib/supabase-quests.ts (daily_1..daily_4, daily_focus...)
                  và không chứa nhiệm vụ nào của trang phỏng vấn. Muốn có thẻ này
                  thì việc đúng là thêm nhiệm vụ vào danh mục ấy rồi đọc qua
                  getDailyQuests, chứ không phải vẽ lại ba thanh tiến độ. */}

              {/* THẺ "PHẦN THƯỞNG" CŨNG ĐÃ GỠ, cùng lý do. Ba rương 50 / 120 /
                  200 XP viết cứng, dòng "Hoàn thành mục tiêu để mở rương" và
                  một nút "Xem tất cả" không dẫn đi đâu. Không có mục tiêu nào,
                  không có rương nào và không có dòng mã nào cộng số XP đó -
                  XP thật của trang này là computeQuizXp, hiện ở màn kết quả. */}

              {/* BẠN ĐANG LÀM RẤT TỐT */}
              <div className={`${panel} p-5 space-y-2`}>
                <h3 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
                  {t.interview.encourageTitle}
                </h3>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-ink-soft font-medium leading-relaxed flex-1">
                    {t.interview.encourageBody}
                  </p>
                  <div className="relative w-16 h-14 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src="/images/dashboard/quote_mountain.jpg"
                      alt={t.interview.encourageAlt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
            )}
          </div>
        )}

        {/* ─── ROLE PICKER MODAL ─── */}
        {/* Bấm ra ngoài đóng modal, và Escape cũng vậy (effect ở trên). Trước
            đây chỉ có dấu X ở góc, nên trên điện thoại - nơi dấu X nhỏ nhất -
            không có cách nào ra ngoài ngoài việc bấm đúng 32 pixel đó. */}
        {rolePickerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4"
            onClick={() => setRolePickerOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.interview.pickerTitle}
              onClick={(e) => e.stopPropagation()}
              className={`${panel} relative w-full max-w-xl max-h-[85vh] overflow-hidden p-6 space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-line-strong pb-3">
                <h3 className="text-base font-black text-ink-max">
                  {t.interview.pickerTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setRolePickerOpen(false)}
                  aria-label={t.interview.pickerClose}
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-ink-muted hover:bg-surface-raised hover:text-ink cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={roleQuery}
                  onChange={(e) => setRoleQuery(e.target.value)}
                  placeholder={t.interview.pickerPlaceholder}
                  aria-label={t.interview.pickerSearchLabel}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-line-strong bg-surface focus:border-brand-600 focus:outline-none"
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
                {visibleGroups.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <p className="eyebrow text-ink-faint">
                      {CATEGORY_LABELS[group.category]}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {group.careers.map((c) => {
                        const active = selectedCareer === c.careerId;
                        return (
                          <button
                            key={c.careerId}
                            type="button"
                            onClick={() => {
                              setSelectedCareer(active ? null : c.careerId);
                              setSelectedSection(null);
                              setRolePickerOpen(false);
                            }}
                            aria-pressed={active}
                            className={`${choiceClass(active)} p-3 text-left text-xs flex items-center justify-between font-bold`}
                          >
                            <span className="truncate">{c.title}</span>
                            <span className="font-mono text-[10px] tabular-nums text-ink-faint">{c.questionCount}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {/* Ô tìm không khớp gì thì khối này trống trơn và modal trông
                    như đang tải. */}
                {visibleGroups.length === 0 && (
                  <p className="py-8 text-center text-xs font-bold text-ink-muted">
                    {t.interview.pickerEmpty}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── TOPIC PICKER MODAL ─── */}
        {topicPickerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4"
            onClick={() => setTopicPickerOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t.interview.topicPickerTitle}
              onClick={(e) => e.stopPropagation()}
              className={`${panel} relative w-full max-w-xl max-h-[85vh] overflow-hidden p-6 space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-line-strong pb-3">
                <h3 className="text-base font-black text-ink-max">
                  {t.interview.topicPickerTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setTopicPickerOpen(false)}
                  aria-label={t.interview.pickerClose}
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-ink-muted hover:bg-surface-raised hover:text-ink cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={topicQuery}
                  onChange={(e) => setTopicQuery(e.target.value)}
                  placeholder={t.interview.topicPickerPlaceholder}
                  aria-label={t.interview.topicPickerSearchLabel}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-line-strong bg-surface focus:border-brand-600 focus:outline-none"
                />
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSection(null);
                    setTopicPickerOpen(false);
                  }}
                  aria-pressed={selectedSection === null}
                  className={`${choiceClass(selectedSection === null)} w-full p-3 text-left text-xs font-bold`}
                >
                  {t.interview.topicPickerAll}
                </button>
                {visibleTopics.map((topic) => {
                  const active = selectedSection === topic.value;
                  return (
                    <button
                      key={topic.value}
                      type="button"
                      onClick={() => {
                        setSelectedSection(active ? null : topic.value);
                        setTopicPickerOpen(false);
                      }}
                      aria-pressed={active}
                      className={`${choiceClass(active)} w-full p-3 text-left text-xs font-bold flex items-center justify-between gap-3`}
                    >
                      <span className="truncate">{topic.label}</span>
                      <span className="font-mono text-[10px] tabular-nums text-ink-faint shrink-0">{topic.count}</span>
                    </button>
                  );
                })}
                {visibleTopics.length === 0 && (
                  <p className="py-8 text-center text-xs font-bold text-ink-muted">
                    {t.interview.topicPickerEmpty}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── STAGE: LOADING ─── */}
        {stage === "loading" && (
          <div className="text-center py-20 space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-sm font-bold text-ink-soft">{t.interview.loadingQuestions}</p>
          </div>
        )}

        {/* ─── STAGE: ERROR / EMPTY ─── */}
        {(stage === "error" || stage === "empty") && (
          <div className="text-center py-16 space-y-4">
            <p className="text-ink-muted font-bold">
              {stage === "error" ? t.interview.loadError : t.interview.loadEmpty}
            </p>
            <button onClick={() => setStage("setup")} className={`${textLink} cursor-pointer`}>
              {t.interview.backToSetup}
            </button>
          </div>
        )}

        {/* ─── STAGE: READY (DRILL IN PROGRESS) ─── */}
        {stage === "ready" && q && (
          <div className={`${panel} mx-auto max-w-5xl space-y-5 p-5 sm:p-6`}>
            {/* Dải tiêu đề: bên trái là "đang ở đâu", bên phải là "đang thế nào".
                Bản trước xếp ba ô vuông CÂU HỎI / ĐÃ ĐÚNG / ĐỘ KHÓ chiếm trọn
                bề ngang rồi mới tới thanh tiến độ - ba dòng cho thứ đọc được
                trong một dòng. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line-strong pb-4">
              <span className="shrink-0 w-10 h-10 rounded-sm border border-line-strong bg-surface-raised dark:bg-stone-950 flex items-center justify-center text-ink-body">
                <BriefcaseBusiness className="w-5 h-5" strokeWidth={2} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-ink truncate">
                  {t.interview.drillHeader}
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <div className="h-1.5 flex-1 rounded-xs overflow-hidden bg-surface-sunken">
                    <div
                      className="h-full transition-all duration-500 bg-brand-600 dark:bg-brand-500"
                      style={{ width: `${Math.max(6, progressPct)}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-ink-muted">
                    <span className="font-mono tabular-nums">{activeQ + 1}/{questions.length}</span> {t.interview.questionsUnit}
                  </span>
                </div>
              </div>

              <div className="flex items-stretch shrink-0 divide-x divide-line-strong rounded-sm border border-line-strong">
                {[
                  { Icon: Clock, label: t.interview.chipTime, value: elapsedLabel },
                  { Icon: Target, label: t.interview.chipCorrect, value: `${score}/${questions.length}` },
                  { Icon: Trophy, label: t.interview.chipScore, value: String(score * QUIZ_XP_PER_CORRECT[difficulty]) },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="px-2.5 py-1.5 flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0 text-ink-faint" strokeWidth={2} />
                    <div className="leading-tight">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-ink-faint">{label}</p>
                      <p className="font-mono text-xs font-medium tabular-nums text-ink">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <InterviewerStage
              round={difficulty}
              question={q.question}
              questionKey={activeQ}
              explanation={submitted ? q.explanation : null}
              verdict={submitted ? (results[activeQ] ? "correct" : "wrong") : null}
            />

            {/* CÂU HỎI DẠNG CHỮ THẬT, không chỉ trong bong bóng 3D.
                Trước đây khối này render `InterviewerStage` mà không bật
                `showCaption`, và không in câu hỏi ở đâu nữa - nên câu hỏi chỉ
                tồn tại trong một texture của three.js: không chọn/copy được,
                không cho tiện ích dịch đọc, không cho trình đọc màn hình đọc,
                bé đi theo khung ở 375px, và biến mất hẳn nếu WebGL không dựng
                được. Cảnh 3D ở trên giờ là phần trang trí. */}
            <p className="select-text text-base font-extrabold leading-snug text-ink sm:text-lg">
              <span className="sr-only">{t.interview.questionLabel}: </span>
              {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isCorrectOpt = oi === q.correct;
                let cls = "border-line-strong bg-white dark:bg-stone-900 text-ink hover:border-stone-950 dark:hover:border-stone-300";
                let badgeCls = "border-line-strong text-ink-muted";
                if (submitted) {
                  if (isCorrectOpt) {
                    cls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
                    badgeCls = "border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-stone-950";
                  } else if (isSelected) {
                    cls = "border-red-600 dark:border-red-400 bg-danger-soft text-ink-max font-bold";
                    badgeCls = "border-red-600 bg-red-600 text-white dark:border-red-400 dark:bg-red-400 dark:text-stone-950";
                  } else {
                    cls = "border-line bg-surface text-ink-faint";
                    badgeCls = "border-line text-ink-faint";
                  }
                } else if (isSelected) {
                  cls = "border-brand-600 dark:border-brand-400 bg-accent-soft text-ink-max font-bold";
                  badgeCls = "border-brand-600 text-accent-strong dark:border-brand-400";
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => choose(oi)}
                    className={`w-full text-left px-3.5 py-3 rounded-sm border transition-colors cursor-pointer text-sm select-text font-medium flex items-center gap-3 ${cls}`}
                  >
                    {/* Huy hiệu A/B/C/D. Nó không chỉ để đẹp: người học nói
                        "chọn C" chứ không nói "chọn dòng thứ ba", và không có
                        chữ cái thì lời giải bên dưới không tham chiếu được. */}
                    <span
                      className={`shrink-0 w-7 h-7 rounded-xs border flex items-center justify-center font-mono text-xs font-medium ${badgeCls}`}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {submitted && isCorrectOpt && (
                      <Check className="w-5 h-5 shrink-0 text-accent" strokeWidth={3} />
                    )}
                    {submitted && isSelected && !isCorrectOpt && (
                      <X className="w-5 h-5 shrink-0 text-danger" strokeWidth={3} />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div
                className={`rounded-sm border border-l-2 p-3.5 flex items-start gap-3 ${
                  results[activeQ]
                    ? "border-accent-line border-l-brand-600 bg-accent-soft dark:border-l-brand-400"
                    : "border-danger-line border-l-red-600 bg-danger-soft dark:border-l-red-400"
                }`}
              >
                <span className={`shrink-0 mt-0.5 ${results[activeQ] ? "text-accent" : "text-danger"}`}>
                  {results[activeQ] ? <Check className="w-4.5 h-4.5" strokeWidth={2.6} /> : <X className="w-4.5 h-4.5" strokeWidth={2.6} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-black ${results[activeQ] ? "text-accent-strong" : "text-danger"}`}>
                    {results[activeQ] ? format(t.interview.verdictRight, { xp: QUIZ_XP_PER_CORRECT[difficulty] }) : t.interview.verdictWrong}
                  </p>
                  {/* Lời giải hiện ở ĐÂY chứ không chỉ trong cảnh 3D: cảnh là
                      thứ người học nhìn lúc đọc câu hỏi, còn lời giải là thứ họ
                      đọc lúc mắt đã ở dưới cột đáp án. */}
                  <p className="mt-1 text-xs leading-relaxed text-ink-body">
                    {q.explanation}
                  </p>
                </div>
              </div>
            )}

            {!submitted ? (
              <button
                disabled={selected === null}
                onClick={verify}
                className={`${btnPrimary} w-full !py-3.5 cursor-pointer`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.interview.lockAnswer}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={activeQ === 0}
                  onClick={prev}
                  className={`${btnSecondary} cursor-pointer`}
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.4} />
                  <span>{t.interview.prevQuestion}</span>
                </button>
                <button
                  onClick={next}
                  className={`${btnPrimary} cursor-pointer`}
                >
                  <span>{allDone ? t.interview.seeResult : t.interview.nextQuestion}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── STAGE: DONE (SUMMARY & REVIEWS) ─── */}
        {stage === "done" && (
          <div className={`${panel} mx-auto max-w-2xl space-y-5 p-6 sm:p-8`}>
            <SectionHead
              code={SYS.result}
              title={t.interview.doneTitle}
              sub={`${t.interview.doneScore} ${score}/${questions.length} ${t.interview.questionsUnit} ${passed ? t.interview.donePass : ""}`}
            />

            <StatTable
              rows={[
                { label: t.interview.readinessLabel, value: `${Math.round((score / Math.max(1, questions.length)) * 100)}%` },
                { label: t.interview.xpEarnedLabel, value: xpAwarded === null ? "..." : `+${xpAwarded} XP` },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-sm border border-line-strong p-4">
                <p className="eyebrow text-ink-faint">{t.interview.roundLabel}</p>
                <p className="mt-1 text-sm font-black text-ink">{IB_DIFFICULTY_COPY[difficulty]}</p>
              </div>
              <div className="rounded-sm border border-line-strong p-4">
                <p className="eyebrow text-ink-faint">{t.interview.nextStepLabel}</p>
                <p className="mt-1 text-sm font-black text-ink">
                  {passed ? t.interview.nextHarder : t.interview.nextReview}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {results.map((ok, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-xs text-xs flex items-center justify-center text-white font-bold ${
                    ok ? "bg-brand-600" : "bg-red-600"
                  }`}
                >
                  {ok ? <Check className="w-4 h-4" strokeWidth={3} /> : <X className="w-4 h-4" strokeWidth={3} />}
                </div>
              ))}
            </div>

            {missedSections.length > 0 && (
              <div className="rounded-sm border border-line-strong p-4">
                <p className="eyebrow text-ink-muted mb-2.5">
                  {t.interview.weakTopics}
                </p>
                <div className="flex flex-wrap gap-2">
                  {missedSections.map(({ label, missed }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => void redrillSection(label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-line-strong text-xs font-bold text-ink-body hover:border-stone-950 dark:hover:border-stone-300 transition-colors cursor-pointer"
                    >
                      <span>{label}</span>
                      <span className="text-danger">
                        (<span className="font-mono tabular-nums">{missed}</span> {t.interview.wrongCount})
                      </span>
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.4} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setStage("setup")}
              className={`${btnPrimary} w-full cursor-pointer`}
            >
              {t.interview.practiceAgain}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
