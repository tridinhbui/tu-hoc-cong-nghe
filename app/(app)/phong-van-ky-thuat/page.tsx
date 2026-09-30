"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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
  Play,
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
  formatCategoryLabel,
  getInterviewQuestionById,
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
import CoCoSays from "@/components/CoCoSays";
import { useQuizKeys } from "@/lib/use-quiz-keys";
import { btnEnergy, btnPrimary, btnSecondary, panel, panelFocus, ProgressBar, quizKey, quizOption, SectionHead, StatTable, Sys, tabClass, textLink, type QuizOptionState } from "@/components/ui/system";

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

/** Ô chọn (nghề, độ khó, số câu, chủ đề). Đang chọn: viền 2px xanh + nền
 *  băng + chữ xanh đậm + dấu tích + bóng xanh - xanh ở đây là CHỨC NĂNG, không
 *  phải trang trí. Chưa chọn: thẻ trắng nổi trên canvas băng bằng bóng mảnh
 *  (viền 2px trong suốt để ô không nhảy kích thước), rê chuột thì viền xanh
 *  nhạt - để ô đã chọn là thứ duy nhất nổi trong lưới.
 *
 *  `tone = "energy"` chỉ cho mức "Khó": độ khó là thử thách, nên lúc chọn nó
 *  đổi sang coral thay cho xanh (luật màu trong components/ui/system.tsx). */
function choiceClass(active: boolean, tone: "accent" | "energy" = "accent") {
  return `relative rounded-control border-2 transition-[background-color,border-color,color,box-shadow,transform] cursor-pointer ${
    active
      ? tone === "energy"
        ? "border-energy bg-energy-soft text-energy-strong shadow-card-hover"
        : "border-accent bg-accent-wash text-accent-strong shadow-card-hover"
      : "border-transparent bg-surface text-ink-body shadow-card hover:border-accent-line hover:text-ink-max motion-safe:hover:-translate-y-px"
  }`;
}
/** Dấu tích góc ô đang chọn - cặp với choiceClass. */
function ChoiceCheck({ active, tone = "accent" }: { active: boolean; tone?: "accent" | "energy" }) {
  if (!active) return null;
  return (
    <span
      aria-hidden
      className={`absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-white dark:text-[#07101f] ${
        tone === "energy" ? "bg-energy" : "bg-accent"
      }`}
    >
      <Check className="w-2.5 h-2.5" strokeWidth={3.6} />
    </span>
  );
}
const PASS_RATIO = 0.6;
/** Bằng MIN_DIFFICULTY_POOL trong app/api/knowledge-challenge/route.ts: dưới
 *  ngưỡng này route bù câu ở độ khó gần nhất. Khối "Buổi phỏng vấn sẽ được
 *  tạo" nói điều đó ra, nên hai con số phải đi cùng nhau. */
const API_MIN_DIFFICULTY_POOL = 20;

/** Người ngồi đối diện theo độ khó - cùng bảng tên InterviewerStage dùng. */
const ROUND_NAME_KEY: Record<QuizDifficulty, "roundScreen" | "roundAnalyst" | "roundPressure" | "roundMixed"> = {
  de: "roundScreen",
  "trung-binh": "roundAnalyst",
  kho: "roundPressure",
  "tat-ca": "roundMixed",
};

/** Trạng thái của một bước thiết lập: đã chọn = xanh nhạt (tiến độ đã đi),
 *  đang chọn = xanh đậm (hành động), chưa tới = xám. Cả hai đều là xanh brand:
 *  tiến độ học là nhận diện của app, không phải một màu riêng. */
type StepStatus = "done" | "current" | "todo";
type StepId = "role" | "difficulty" | "focus" | "interview";
const STEP_BORDER: Record<StepStatus, string> = {
  done: "border-accent-line-mid",
  current: "border-accent",
  todo: "border-line-strong",
};
const STEP_TEXT: Record<StepStatus, string> = {
  done: "text-accent",
  current: "text-accent-strong",
  todo: "text-ink-faint",
};

function StepHead({
  n,
  label,
  hint,
  status,
  statusLabel,
}: {
  n: string;
  label: string;
  hint: string;
  status: StepStatus;
  statusLabel: string;
}) {
  return (
    <div className="pb-1">
      <p className="flex items-center gap-2">
        <Sys className={STEP_TEXT[status]}>{n}</Sys>
        <span className={`eyebrow ${status === "todo" ? "text-ink-faint" : status === "current" ? "text-accent-strong" : "text-ink-max"}`}>{label}</span>
        <span className={`ml-auto text-[10.5px] font-bold ${STEP_TEXT[status]}`}>{statusLabel}</span>
      </p>
      <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>
    </div>
  );
}

/* i18n-ignore-start: nhãn phương án A-D và đồng hồ mm:ss, cùng ở mọi ngôn ngữ */
function optionLetter(i: number): string {
  return String.fromCharCode(65 + i);
}
function clock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
/* i18n-ignore-end */

type Stage = "setup" | "loading" | "empty" | "error" | "ready" | "done";
type Mode = "technical" | "behavioral";

export default function TechnicalInterviewPage() {
  const { t, locale } = useI18n();
  const R = t.revampInterview;
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
  /** Bước nào người học đã CHỦ ĐỘNG chọn. Giá trị mặc định (mọi vị trí, trộn
   *  độ khó, 5 câu) vẫn chạy được, nhưng chưa bấm thì bước đó chưa "xong" -
   *  đó là thứ làm dải 01-04 thành tiến độ thật. */
  const [roleChosen, setRoleChosen] = useState(false);
  const [diffChosen, setDiffChosen] = useState(false);
  const [focusChosen, setFocusChosen] = useState(false);
  /** Giây (tính từ lúc bắt đầu buổi) mà câu hiện tại được hỏi, và số giây đã
   *  dùng cho từng câu - đo lúc chốt đáp án, không ước lượng. */
  const [qStartSec, setQStartSec] = useState(0);
  const [durations, setDurations] = useState<number[]>([]);
  const [notes, setNotes] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<StepId | null>(null);

  const totalQuestions = TECH_INTERVIEW_QUESTIONS.length;

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

  const elapsedLabel = clock(elapsed);

  const scrollToStep = useCallback((id: StepId) => {
    document.getElementById(`step-${id}`)?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, []);

  /** Về màn thiết lập và dừng đồng hồ - đồng hồ không chạy ngầm sau lưng. */
  const exitToSetup = useCallback(() => {
    setStartedAt(null);
    setStage("setup");
  }, []);

  // Cuộn tới một bước sau khi màn thiết lập đã render lại (nút "Chọn mức khó
  // hơn" ở màn kết quả). Đọc ref trong effect, không đặt state.
  useEffect(() => {
    if (stage !== "setup" || !pendingScroll.current) return;
    const id = pendingScroll.current;
    pendingScroll.current = null;
    requestAnimationFrame(() => scrollToStep(id));
  }, [stage, scrollToStep]);

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
    setQStartSec(0);
    setDurations([]);
    setNotes("");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
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

  const q = localizedQuestions[activeQ];
  const allDone = submitted && activeQ === questions.length - 1;
  const score = results.filter(Boolean).length;
  const passed = questions.length > 0 && score >= Math.ceil(questions.length * PASS_RATIO);

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
    if (startedAt !== null && durations[activeQ] === undefined) {
      const spent = Math.floor((Date.now() - startedAt) / 1000) - qStartSec;
      setDurations((d) => {
        const n = [...d];
        n[activeQ] = Math.max(0, spent);
        return n;
      });
    }
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
      if (startedAt !== null) setElapsed(Math.floor((Date.now() - startedAt) / 1000));
      setStartedAt(null);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
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
    if (stored === undefined && startedAt !== null) {
      setQStartSec(Math.floor((Date.now() - startedAt) / 1000));
    }
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

  const inSession = stage === "ready" && !!q;

  const sessionRoleLabel = selectedCareer
    ? careerCoverage.find((c) => c.careerId === selectedCareer)?.title ?? R.allRoles
    : R.allRoles;

  /** Kho khớp với lựa chọn, tính đúng theo luật của interviewQuestionsFor
   *  trong app/api/knowledge-challenge/route.ts. */
  const envPool = useMemo(() => {
    let base = selectedCareer ? getTechnicalQuestionsForCareer(selectedCareer) : TECH_INTERVIEW_QUESTIONS;
    if (selectedSection) {
      const scoped = base.filter((qq) => qq.category === selectedSection);
      if (scoped.length > 0) base = scoped;
    }
    if (difficulty === "tat-ca") return { pool: base.length, exact: base.length, padded: false };
    const exact = base.filter((qq) => qq.difficulty === difficulty).length;
    if (exact >= API_MIN_DIFFICULTY_POOL) return { pool: exact, exact, padded: false };
    return { pool: Math.min(base.length, API_MIN_DIFFICULTY_POOL), exact, padded: true };
  }, [selectedCareer, selectedSection, difficulty]);

  const plannedCount = Math.min(questionCount, envPool.pool);
  const plannedPass = Math.ceil(plannedCount * PASS_RATIO);

  const envRows = [
    { label: R.envInterviewer, value: t.interview[ROUND_NAME_KEY[difficulty]] },
    { label: R.envRole, value: sessionRoleLabel },
    { label: R.envDifficulty, value: `${IB_DIFFICULTY_TITLE[difficulty]} - ${IB_DIFFICULTY_COPY[difficulty]}` },
    {
      label: R.envTopic,
      value: selectedSection ?? format(R.envTopicMixed, { n: activeCategoryCounts.length }),
    },
    {
      label: R.envQuestions,
      value: format(envPool.pool < questionCount ? R.envQuestionsShort : R.envQuestionsValue, {
        n: plannedCount,
        pool: envPool.pool,
      }),
    },
    {
      label: R.envScoring,
      value: format(R.envScoringValue, { pass: plannedPass, n: plannedCount, xp: QUIZ_XP_PER_CORRECT[difficulty] }),
    },
    { label: R.envClock, value: R.envClockValue },
  ];

  const focusValue = `${questionCount} ${t.interview.questionsUnit} - ${selectedSection ?? t.interview.topicPickerAll}`;
  const stepDone = [roleChosen, diffChosen, focusChosen];
  const firstOpen = stepDone.findIndex((d) => !d);
  const currentStep = firstOpen === -1 ? 3 : firstOpen;
  const stepStatusOf = (i: number): StepStatus => (i < 3 && stepDone[i] ? "done" : i === currentStep ? "current" : "todo");
  const steps: { id: StepId; label: string; value: string; status: StepStatus }[] = [
    { id: "role", label: R.stepRole, value: sessionRoleLabel, status: stepStatusOf(0) },
    { id: "difficulty", label: R.stepDifficulty, value: IB_DIFFICULTY_TITLE[difficulty], status: stepStatusOf(1) },
    { id: "focus", label: R.stepFocus, value: focusValue, status: stepStatusOf(2) },
    { id: "interview", label: R.stepInterview, value: t.interview[ROUND_NAME_KEY[difficulty]], status: stepStatusOf(3) },
  ];
  function stepStatusLabel(s: { id: StepId; status: StepStatus }): string {
    if (s.id === "interview") return s.status === "current" ? R.statusReady : R.statusNext;
    return s.status === "done" ? R.statusDone : s.status === "current" ? R.statusCurrent : R.statusNext;
  }

  // ─── Buổi phỏng vấn: thời gian câu hiện tại và câu hỏi tiếp theo ───
  const questionSeconds =
    submitted && durations[activeQ] !== undefined ? durations[activeQ] : Math.max(0, elapsed - qStartSec);

  const followUp = useMemo(() => {
    if (!q || !submitted) return null;
    const generic = R.followUpGeneric[activeQ % R.followUpGeneric.length];
    const picked = answers[activeQ]?.selected ?? selected;
    if (results[activeQ]) {
      const others = q.options.map((_, i) => i).filter((i) => i !== q.correct);
      const letter = optionLetter(others[activeQ % Math.max(1, others.length)] ?? 0);
      return { specific: format(R.followUpWhyNot, { letter }), generic };
    }
    return {
      specific: format(R.followUpWrong, {
        picked: optionLetter(picked ?? 0),
        correct: optionLetter(q.correct),
      }),
      generic,
    };
  }, [q, submitted, activeQ, answers, selected, results, R]);

  // ─── Màn kết quả: dữ liệu từng câu, bốn trục, kỹ năng ưu tiên ───
  const perQuestion = useMemo(
    () =>
      localizedQuestions.map((qq, i) => ({
        category: (qq as ChallengeQuestion & { category?: string }).category ?? qq.lessonTitle.split("·").pop()?.trim() ?? "",
        difficulty: getInterviewQuestionById(-qq.lessonId)?.difficulty,
        ok: results[i] === true,
        seconds: durations[i] as number | undefined,
      })),
    [localizedQuestions, results, durations]
  );

  const avgSeconds = useMemo(() => {
    const measured = perQuestion.map((d) => d.seconds).filter((s): s is number => s !== undefined);
    return measured.length ? measured.reduce((a, b) => a + b, 0) / measured.length : 0;
  }, [perQuestion]);

  const axes = useMemo(() => {
    const pctOf = (list: typeof perQuestion) =>
      list.length ? Math.round((list.filter((d) => d.ok).length / list.length) * 100) : null;
    const mid = perQuestion.filter((d) => d.difficulty === "trung-binh");
    const hard = perQuestion.filter((d) => d.difficulty === "kho");
    return [
      {
        id: "accuracy",
        label: R.axisAccuracy,
        pct: pctOf(perQuestion),
        basis: format(R.axisAccuracyBasis, { correct: score, total: perQuestion.length }),
      },
      {
        id: "reasoning",
        label: R.axisReasoning,
        pct: pctOf(mid),
        basis: mid.length ? format(R.axisReasoningBasis, { n: mid.length }) : R.axisReasoningNone,
      },
      { id: "communication", label: R.axisCommunication, pct: null, basis: R.axisCommunicationNone },
      {
        id: "depth",
        label: R.axisDepth,
        pct: pctOf(hard),
        basis: hard.length ? format(R.axisDepthBasis, { n: hard.length }) : R.axisDepthNone,
      },
    ];
  }, [perQuestion, score, R]);

  /** Chủ đề sai nhiều nhất; hoà thì chủ đề có tỉ lệ đúng thấp hơn. */
  const topicStats = useMemo(() => {
    const byTopic = new Map<string, { label: string; wrong: number; attempted: number }>();
    for (const d of perQuestion) {
      if (!d.category) continue;
      const row = byTopic.get(d.category) ?? { label: d.category, wrong: 0, attempted: 0 };
      row.attempted += 1;
      if (!d.ok) row.wrong += 1;
      byTopic.set(d.category, row);
    }
    return [...byTopic.values()]
      .filter((r) => r.wrong > 0)
      .sort((a, b) => b.wrong - a.wrong || b.wrong / b.attempted - a.wrong / a.attempted);
  }, [perQuestion]);
  const priority = topicStats[0] ?? null;
  const otherMissed = topicStats.slice(1);
  const cocoResultLines = !priority ? R.cocoPerfect : passed ? R.cocoPass : R.cocoFail;

  return (
    <div className="h-[calc(100dvh-3.5rem)] lg:h-dvh overflow-hidden flex flex-col bg-page font-sans">
      {/* ─── 1. THANH TRÊN ───
          Trong buổi phỏng vấn thanh này chỉ còn ba thứ: nút thoát, đang ở câu
          nào của vị trí nào, và đồng hồ. Không có liên kết về dashboard, không
          có chip XP - người ngồi phòng phỏng vấn thật không nhìn thấy menu. */}
      <div className="shrink-0 border-b border-line-soft bg-surface shadow-card">
        {inSession ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={exitToSetup}
                aria-label={R.exit}
                title={R.exit}
                className={`${btnSecondary} !px-2.5 !py-1.5 !text-xs cursor-pointer`}
              >
                <X className="w-4 h-4" strokeWidth={2.4} />
                <span>{R.exitShort}</span>
              </button>
              <div className="min-w-0">
                <p className="flex min-w-0 items-center gap-1.5 text-sm font-black text-ink-max">
                  <span className="truncate">{sessionRoleLabel}</span>
                  <span aria-hidden className="h-3 w-px shrink-0 bg-line-strong" />
                  <span className="truncate">{t.interview[ROUND_NAME_KEY[difficulty]]}</span>
                </p>
                <p className="font-mono text-[11px] tabular-nums text-ink-muted">
                  {format(R.questionOf, { n: activeQ + 1, total: questions.length })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-lg font-medium tabular-nums text-ink-max">
              <Clock className="w-4 h-4 text-ink-faint" strokeWidth={2} aria-hidden />
              <span className="sr-only">{R.timerLabel}</span>
              {elapsedLabel}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {stage !== "setup" && mode !== "behavioral" ? (
                <button
                  type="button"
                  onClick={exitToSetup}
                  className="flex items-center justify-center w-9 h-9 rounded-control text-ink-muted hover:bg-accent-wash hover:text-accent-strong transition-colors cursor-pointer"
                  aria-label={t.interview.back}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  aria-label={t.interview.backToDashboard}
                  className="flex items-center justify-center w-9 h-9 rounded-control text-ink-muted hover:bg-accent-wash hover:text-accent-strong transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              )}
              <h1 className="text-lg sm:text-xl font-black text-ink-max tracking-tight">
                {t.interview.pageTitle}
              </h1>
            </div>

            <span className="inline-flex items-center rounded-full bg-reward-soft px-2.5 py-1 text-xs font-bold tabular-nums text-reward-strong">
              {format(t.quizPage.xpPerQuestion, { xp: QUIZ_XP_PER_CORRECT[difficulty] })}
            </span>
          </div>
        )}
      </div>

      {/* ─── 2. NỘI DUNG CUỘN ─── */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        {stage === "setup" && (
          <div className="max-w-7xl mx-auto space-y-5">
            {/* CHỌN CHẾ ĐỘ: KỸ THUẬT / HÀNH VI

                Trước đây `mode` có đủ hai giá trị và `BehavioralPrepPanel`
                được import, nhưng `setMode` không được gọi ở đâu cả - nên 121
                thẻ luyện phỏng vấn hành vi không có đường nào mở ra được. */}
            <div className="flex gap-6 border-b border-line">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ────── CỘT TRÁI: BỐN BƯỚC THIẾT LẬP ────── */}
            <div className="lg:col-span-8 space-y-6 min-w-0">
              {/* 1. MỞ ĐẦU - Cơ Cơ thay cho dòng phụ đề cứng. Ảnh núi và nút
                  "Bắt đầu" thứ hai trên ảnh đã gỡ: hai nút bắt đầu thì không nút
                  nào là đích của phần thiết lập. */}
              <div className="space-y-3">
                <SectionHead code={SYS.interview} eyebrow={R.eyebrow} title={R.title} />
                <CoCoSays lines={t.coco.interview} size={40} />
                <div className="flex items-center gap-3">
                  <ProgressBar value={ibCoverage?.pct ?? 0} className="h-1.5 w-28 sm:w-36" />
                  <span className="text-xs font-bold tabular-nums text-accent-strong">
                    {format(R.coverage, { pct: ibCoverage?.pct ?? 0 })}
                  </span>
                  <span className="rounded-full bg-reward-soft px-2 py-0.5 text-xs font-bold tabular-nums text-reward-strong">
                    {format(R.xpGain, { xp: ibXp })}
                  </span>
                </div>
              </div>

              {/* 2. BỐN BƯỚC LÀ TIẾN ĐỘ THẬT, không phải trang trí.
                  Đã chọn = cyan, đang chọn = xanh brand, chưa tới = xám. Bấm vào
                  một bước là cuộn tới đúng khối của bước đó. */}
              <ol aria-label={R.stepperLabel} className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                {steps.map((s, i) => (
                  <li key={s.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => scrollToStep(s.id)}
                      aria-current={s.status === "current" ? "step" : undefined}
                      className={`w-full min-w-0 pt-2 text-left cursor-pointer transition-colors ${s.status === "current" ? "border-t-[3px]" : "border-t-2"} ${STEP_BORDER[s.status]} ${s.status === "todo" ? "opacity-80 hover:opacity-100" : ""}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sys className={STEP_TEXT[s.status]}>{SYS.step(i + 1)}</Sys>
                        {s.status === "done" && <Check className={`w-3.5 h-3.5 ${STEP_TEXT.done}`} strokeWidth={3} />}
                        <span className={`ml-auto text-[10.5px] font-bold ${STEP_TEXT[s.status]}`}>{stepStatusLabel(s)}</span>
                      </span>
                      <span className={`mt-1 block text-xs font-black ${s.status === "todo" ? "text-ink-faint" : s.status === "current" ? "text-accent-strong" : "text-ink-max"}`}>{s.label}</span>
                      <span className="block truncate text-[11px] text-ink-muted">{s.value}</span>
                    </button>
                  </li>
                ))}
              </ol>

              {/* 01 VỊ TRÍ */}
              <section id="step-role" className="scroll-mt-4 space-y-2">
                <StepHead n={SYS.step(1)} label={R.stepRole} hint={R.roleHint} status={steps[0].status} statusLabel={stepStatusLabel(steps[0])} />
                {/* lg:grid-cols-7 - bảy thẻ (tất cả + 5 nghề + "Xem thêm") vốn
                    tràn xuống hàng hai chỉ để chứa đúng một nút. Ở lg có chỗ cho
                    cả bảy trên một hàng. Giữ 6 cột ở md. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCareer(null);
                      setSelectedSection(null);
                      setRoleChosen(true);
                    }}
                    aria-pressed={selectedCareer === null}
                    className={`${choiceClass(selectedCareer === null)} p-3 flex flex-col items-center justify-center text-center min-h-[72px]`}
                  >
                    <ChoiceCheck active={selectedCareer === null} />
                    <BriefcaseBusiness className="w-4 h-4 mb-0.5" strokeWidth={2} />
                    <span className="text-xs font-black block truncate w-full">{t.interview.allCareers}</span>
                    <span className="font-mono text-[10.5px] tabular-nums text-ink-muted">{totalQuestions}</span>
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
                          setRoleChosen(true);
                        }}
                        aria-pressed={active}
                        className={`${choiceClass(active)} p-2.5 flex flex-col items-center justify-center text-center min-h-[72px]`}
                      >
                        <ChoiceCheck active={active} />
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
                    className="p-2.5 rounded-control border-2 border-dashed border-accent-line text-accent-strong transition-colors hover:border-accent hover:bg-accent-wash cursor-pointer flex flex-col items-center justify-center min-h-[72px]"
                  >
                    <span className="text-xs font-black block">{t.interview.seeMore}</span>
                    <span className="text-[10.5px] text-ink-muted font-bold mt-0.5">{t.interview.seeMoreCareers}</span>
                  </button>
                </div>
              </section>

              {/* 02 ĐỘ KHÓ */}
              <section id="step-difficulty" className="scroll-mt-4 space-y-2">
                <StepHead n={SYS.step(2)} label={R.stepDifficulty} hint={R.difficultyHint} status={steps[1].status} statusLabel={stepStatusLabel(steps[1])} />
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
                        onClick={() => {
                          setDifficulty(id);
                          setDiffChosen(true);
                        }}
                        aria-pressed={isSelected}
                        className={`${choiceClass(isSelected, id === "kho" ? "energy" : "accent")} p-3 flex flex-col items-center justify-center text-center min-h-[68px]`}
                      >
                        <ChoiceCheck active={isSelected} tone={id === "kho" ? "energy" : "accent"} />
                        <span className="text-xs font-black flex items-center gap-1">
                          <item.Icon className={`w-3.5 h-3.5 shrink-0 ${id === "kho" ? "text-energy" : "text-accent"}`} strokeWidth={2} /> {item.title}
                        </span>
                        <span className="text-[10.5px] font-medium mt-0.5 text-ink-muted">
                          {item.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 03 TRỌNG TÂM: số câu + chủ đề */}
              <section id="step-focus" className="scroll-mt-4 space-y-3">
                <StepHead n={SYS.step(3)} label={R.stepFocus} hint={R.focusHint} status={steps[2].status} statusLabel={stepStatusLabel(steps[2])} />
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-ink-soft">{R.countLabel}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {QUESTION_COUNT_OPTIONS.map((n) => {
                      const isSelected = questionCount === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setQuestionCount(n);
                            setFocusChosen(true);
                          }}
                          aria-pressed={isSelected}
                          className={`${choiceClass(isSelected)} p-3 flex items-center justify-center gap-1.5 min-h-[48px] font-bold`}
                        >
                          <ChoiceCheck active={isSelected} />
                          <ScrollText className="w-4 h-4 shrink-0" strokeWidth={2} />
                          <span className="text-xs">
                            <span className="font-mono tabular-nums">{n}</span> {t.interview.questionsUnit}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-ink-soft">{R.topicLabel}</p>
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
                          onClick={() => {
                            setSelectedSection(active ? null : topic.value);
                            setFocusChosen(true);
                          }}
                          aria-pressed={active}
                          className={`${choiceClass(active)} p-2.5 flex flex-col items-center justify-center text-center min-h-[68px]`}
                        >
                          <ChoiceCheck active={active} />
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
                        className="p-2.5 rounded-control border-2 border-dashed border-accent-line text-accent-strong transition-colors hover:border-accent hover:bg-accent-wash cursor-pointer flex flex-col items-center justify-center min-h-[68px]"
                      >
                        <span className="text-xs font-black block">{t.interview.seeMore}</span>
                        <span className="text-[10.5px] text-ink-muted font-bold mt-0.5">
                          + {activeCategoryCounts.length - 5} {t.interview.seeMoreTopics}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* 04 PHỎNG VẤN - buổi phỏng vấn các lựa chọn trên sẽ tạo ra, rồi
                  nút duy nhất để bắt đầu. Mọi con số ở đây tính từ chính kho câu
                  hỏi theo đúng luật của /api/knowledge-challenge, không ước lượng. */}
              <section id="step-interview" className={`${panelFocus} scroll-mt-4 space-y-3 p-4 sm:p-5`}>
                <StepHead n={SYS.step(4)} label={R.stepInterview} hint={R.interviewHint} status={steps[3].status} statusLabel={stepStatusLabel(steps[3])} />
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {envRows.map((row) => (
                    <div key={row.label} className="flex items-baseline gap-3 border-b border-accent-line/60 py-2">
                      <dt className="w-28 shrink-0 eyebrow text-ink-faint">{row.label}</dt>
                      <dd className="min-w-0 text-sm font-bold text-ink-max">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                {envPool.padded && (
                  <p className="text-xs text-ink-muted">{format(R.envPadded, { exact: envPool.exact })}</p>
                )}
                <button
                  type="button"
                  onClick={() => void startQuiz(difficulty, selectedSection)}
                  className={`${btnEnergy} w-full !py-5 !text-base cursor-pointer`}
                >
                  <Play className="w-5 h-5" strokeWidth={2.4} />
                  <span>{R.startCta}</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.4} />
                </button>
                <p className="text-center text-[11px] text-ink-muted">{R.startHint}</p>
              </section>
            </div>

            {/* ────── CỘT PHẢI: TIẾN ĐỘ VÀ ĐIỂM YẾU ────── */}
            <div className="lg:col-span-4 space-y-6 min-w-0">
              {/* TIẾN ĐỘ CỦA BẠN */}
              <div className={`${panel} space-y-4 p-4`}>
                <h3 className="eyebrow text-accent-strong">
                  {t.interview.progressTitle}
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-control bg-reward-soft flex items-center justify-center">
                    <span className="font-mono text-sm font-bold tabular-nums text-reward-strong">
                      {SYS.level(totalXp === null ? "-" : String(getLevelByXp(totalXp).level))}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold tabular-nums text-reward-strong">
                      {totalXp === null
                        ? "-- XP"
                        : `${totalXp.toLocaleString(intlLocale(locale))} / ${(getNextLevel(getLevelByXp(totalXp).level)?.minXp ?? totalXp).toLocaleString(intlLocale(locale))} XP`}
                    </span>
                    <ProgressBar value={totalXp === null ? 0 : getLevelProgress(totalXp)} tone="reward" className="mt-1.5 h-1.5 w-full" />
                  </div>
                </div>

                <StatTable
                  className="[&_dd]:text-ink-soft"
                  rows={[
                    // Chỉ con số: cột giá trị của StatTable đi bằng mono, và "{n} ngày"
                    // là chữ tiếng Việt - nhãn "Chuỗi ngày" đã nói đơn vị.
                    { label: t.interview.streakLabel, value: streakDays === null ? "--" : streakDays },
                    { label: t.interview.answeredLabel, value: ibSolved ?? "--" },
                    { label: t.interview.accuracyLabel, value: ibAccuracy === null ? "--" : `${ibAccuracy}%` },
                  ]}
                />
              </div>

              {/* Hai panel điểm yếu đã được import từ lâu mà không render ở đâu.
                  Cả hai tự ẩn khi chưa đủ dữ liệu, nên không vẽ khung rỗng. */}
              <InterviewWeakAreasPanel userId={userId} onDrillSection={(label) => void redrillSection(label)} refreshKey={weakAreasKey} />
              <InterviewMissedQuestionsPanel userId={userId} onDrillQuestions={redrillQuestions} refreshKey={weakAreasKey} />

              {/* THẺ "NHIỆM VỤ HÀNG NGÀY" VÀ "PHẦN THƯỞNG" ĐÃ GỠ, đừng dựng lại.
                  Cả hai viết cứng tiến độ và rương XP mà không có gì đỡ phía
                  sau. Thẻ "Bạn đang làm rất tốt" với ảnh núi cũng gỡ theo đợt
                  revamp: ảnh minh hoạ không mang thông tin gì. */}
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
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-black text-ink-max">
                  {t.interview.pickerTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setRolePickerOpen(false)}
                  aria-label={t.interview.pickerClose}
                  className="w-8 h-8 rounded-control flex items-center justify-center text-ink-muted hover:bg-accent-wash hover:text-accent-strong cursor-pointer"
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
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-control border border-line-strong bg-surface focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                              setRoleChosen(true);
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
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-black text-ink-max">
                  {t.interview.topicPickerTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setTopicPickerOpen(false)}
                  aria-label={t.interview.pickerClose}
                  className="w-8 h-8 rounded-control flex items-center justify-center text-ink-muted hover:bg-accent-wash hover:text-accent-strong cursor-pointer"
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
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-control border border-line-strong bg-surface focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                        setFocusChosen(true);
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
            <button onClick={exitToSetup} className={`${textLink} cursor-pointer`}>
              {t.interview.backToSetup}
            </button>
          </div>
        )}

        {/* ─── STAGE: READY - BUỔI PHỎNG VẤN ───
            Trái: người phỏng vấn, câu hỏi, câu trả lời của ứng viên. Phải:
            đồng hồ, tiến độ buổi, câu hỏi tiếp theo và ghi chú. Không có gì
            khác trên màn - không menu, không thẻ tiến độ tổng. */}
        {inSession && q && (
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 min-w-0 space-y-4">
              <InterviewerStage
                round={difficulty}
                question={q.question}
                questionKey={activeQ}
                explanation={submitted ? q.explanation : null}
                verdict={submitted ? (results[activeQ] ? "correct" : "wrong") : null}
                bleed={false}
                maxHeightVh={40}
              />

              {/* CÂU HỎI DẠNG CHỮ THẬT, không chỉ trong bong bóng 3D: chọn/copy
                  được, trình đọc màn hình đọc được, và vẫn còn khi WebGL không
                  dựng được. Cảnh 3D ở trên là phần không khí. */}
              {/* ĐIỂM NHẤN của buổi phỏng vấn: câu hỏi và các phương án nằm chung
                  một khối panelFocus; mọi thứ khác trên màn yên lặng. */}
              <div className={`${panelFocus} space-y-4 p-4 sm:p-5`}>
              <div>
                <p className="eyebrow text-accent-strong">{R.interviewerQuestion}</p>
                <p className="mt-1 select-text text-lg font-extrabold leading-snug text-ink-max sm:text-xl">
                  {q.question}
                </p>
              </div>

              <div className="space-y-2">
                <p className="eyebrow text-ink-faint">{R.yourAnswer}</p>
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isCorrectOpt = oi === q.correct;
                  // Cùng trạng thái phương án với màn luyện /kiem-tra (quizOption /
                  // quizKey trong components/ui/system.tsx), để "đã chọn", "đúng",
                  // "sai" trông như nhau ở mọi nơi người học trả lời câu hỏi.
                  const state: QuizOptionState = submitted
                    ? isCorrectOpt
                      ? "correct"
                      : isSelected
                        ? "wrong"
                        : "dim"
                    : isSelected
                      ? "selected"
                      : "idle";
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => choose(oi)}
                      className={`${quizOption(state)} px-3.5 py-3 text-sm select-text flex items-center gap-3 ${
                        state === "correct" || state === "wrong" || state === "selected" ? "font-bold" : "font-medium"
                      }`}
                    >
                      {/* Huy hiệu A/B/C/D: người học nói "chọn C", và câu hỏi
                          tiếp theo của người phỏng vấn tham chiếu bằng chữ cái. */}
                      <span
                        className={quizKey(state)}
                      >
                        {optionLetter(oi)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {submitted && isCorrectOpt && (
                        <Check className="w-5 h-5 shrink-0 text-cyan-700 dark:text-cyan-400" strokeWidth={3} />
                      )}
                      {submitted && isSelected && !isCorrectOpt && (
                        <X className="w-5 h-5 shrink-0 text-danger" strokeWidth={3} />
                      )}
                    </button>
                  );
                })}
              </div>
              </div>

              {submitted && (
                <div
                  className={`rounded-control border border-l-4 p-3.5 flex items-start gap-3 ${
                    results[activeQ]
                      ? "border-cyan-200 border-l-cyan-600 bg-cyan-50 dark:border-cyan-900 dark:border-l-cyan-400 dark:bg-cyan-950"
                      : "border-danger-line border-l-red-600 bg-danger-soft dark:border-l-red-400"
                  }`}
                >
                  <span className={`shrink-0 mt-0.5 ${results[activeQ] ? "text-cyan-700 dark:text-cyan-400" : "text-danger"}`}>
                    {results[activeQ] ? <Check className="w-4.5 h-4.5" strokeWidth={2.6} /> : <X className="w-4.5 h-4.5" strokeWidth={2.6} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-black ${results[activeQ] ? "text-cyan-800 dark:text-cyan-300" : "text-danger"}`}>
                      {results[activeQ] ? format(t.interview.verdictRight, { xp: QUIZ_XP_PER_CORRECT[difficulty] }) : t.interview.verdictWrong}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-body">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Cơ Cơ đứng NGOÀI phòng phỏng vấn: người phỏng vấn là cảnh 3D ở
                  trên, còn Cơ Cơ là huấn luyện viên nhận xét sau mỗi câu. */}
              {submitted && (
                <CoCoSays
                  key={`${activeQ}-${results[activeQ] ? "r" : "w"}`}
                  lines={results[activeQ] ? R.cocoRight : R.cocoWrong}
                  salt={activeQ}
                  size={36}
                />
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

            <aside className={`${panel} lg:col-span-4 min-w-0 space-y-5 p-4 lg:sticky lg:top-0`}>
              {/* ĐỒNG HỒ + TIẾN ĐỘ BUỔI */}
              <div>
                <p className="eyebrow text-ink-faint">{R.timerLabel}</p>
                <p className="mt-1 font-mono text-3xl font-medium tabular-nums text-ink-max">{elapsedLabel}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {format(R.thisQuestion, { time: clock(questionSeconds) })}
                </p>
                <p className="mt-4 eyebrow text-ink-faint">{R.progressLabel}</p>
                <div className="mt-1.5 flex gap-1" aria-hidden>
                  {questions.map((_, i) => {
                    const answered = answers[i] !== undefined;
                    const tone = answered
                      ? results[i]
                        ? "bg-cyan-600 dark:bg-cyan-400"
                        : "bg-red-600 dark:bg-red-400"
                      : i === activeQ
                        ? "bg-brand-600 dark:bg-brand-500"
                        : "bg-surface-sunken";
                    return <span key={i} className={`h-2 flex-1 rounded-full motion-safe:transition-colors motion-safe:duration-300 ${tone}`} />;
                  })}
                </div>
                <p className="mt-2 flex items-center justify-between text-xs font-bold">
                  <span className="text-ink-soft tabular-nums">{format(R.correctSoFar, { n: score, total: questions.length })}</span>
                  <span className="rounded-full bg-reward-soft px-2 py-0.5 tabular-nums text-reward-strong">
                    {format(R.xpGain, { xp: score * QUIZ_XP_PER_CORRECT[difficulty] })}
                  </span>
                </p>
              </div>

              {/* CÂU HỎI TIẾP THEO - dựng từ chính câu vừa trả lời (chữ cái
                  của phương án bị loại / đã chọn), không bịa nội dung mới. */}
              <div className="border-t border-line-soft pt-4">
                <p className="eyebrow text-ink-faint">{R.followUpLabel}</p>
                {submitted && followUp ? (
                  <div className="mt-1.5 space-y-1.5">
                    <p className="text-sm font-bold leading-snug text-ink-max">{followUp.specific}</p>
                    <p className="text-sm leading-snug text-ink-body">{followUp.generic}</p>
                    <p className="text-[11px] text-ink-muted">{R.followUpHint}</p>
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs text-ink-muted">{R.followUpPending}</p>
                )}
              </div>

              {/* GHI CHÚ - chỉ sống trong state của buổi; phím 1-4 không bắt
                  khi con trỏ đang ở đây (useQuizKeys bỏ qua TEXTAREA). */}
              <div className="border-t border-line-soft pt-4">
                <label htmlFor="interview-notes" className="eyebrow text-ink-faint">{R.notesLabel}</label>
                <textarea
                  id="interview-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder={R.notesPlaceholder}
                  className="mt-1.5 w-full resize-y rounded-control border border-line-strong bg-surface-raised px-3 py-2 text-sm leading-relaxed text-ink focus:border-brand-600 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <p className="mt-1 text-[11px] text-ink-muted">{R.notesNote}</p>
              </div>
            </aside>
          </div>
        )}

        {/* ─── STAGE: DONE - PHẢN HỒI CÓ CẤU TRÚC ───
            Bốn trục chỉ lấy từ dữ liệu thật của lượt vừa làm. Trục nào câu trắc
            nghiệm không đo được thì in "CHƯA ĐO" kèm lý do, không có số. */}
        {stage === "done" && (
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHead code={SYS.result} title={R.resultTitle} />
                <span
                  className={`rounded-full border px-2.5 py-1 font-mono text-xs font-bold ${
                    passed
                      ? "border-reward-line bg-reward-soft text-reward-strong"
                      : "border-line-strong bg-surface text-ink-muted"
                  }`}
                >
                  {passed ? R.passBadge : R.failBadge}
                </span>
              </div>
              <CoCoSays
                lines={cocoResultLines}
                vars={priority ? { topic: priority.label } : undefined}
                size={40}
              />
            </div>

            <dl className={`${panel} grid grid-cols-2 sm:grid-cols-4 divide-x divide-line-soft overflow-hidden`}>
              {[
                { label: R.statScore, value: `${score}/${questions.length}`, tone: "text-ink-max" },
                { label: R.statTime, value: elapsedLabel, tone: "text-ink-max" },
                { label: R.statAvg, value: clock(avgSeconds), tone: "text-ink-max" },
                {
                  label: R.statXp,
                  value: xpAwarded === null ? "..." : format(R.xpGain, { xp: xpAwarded }),
                  tone: "text-reward-strong",
                },
              ].map((s) => (
                <div key={s.label} className="px-3 py-3">
                  <dt className="eyebrow text-ink-faint">{s.label}</dt>
                  <dd className={`mt-1 font-mono text-lg font-bold tabular-nums ${s.tone}`}>{s.value}</dd>
                </div>
              ))}
            </dl>

            {/* BỐN TRỤC */}
            <div className={`${panel} space-y-2 p-4`}>
              <p className="eyebrow text-accent-strong border-b border-line-soft pb-2">{R.axesTitle}</p>
              <ul className="divide-y divide-line-soft">
                {axes.map((axis) => (
                  <li key={axis.id} className="py-3 grid grid-cols-1 sm:grid-cols-[10rem_1fr_3.5rem] gap-x-4 gap-y-1.5 items-center">
                    <p className="text-sm font-black text-ink-max">{axis.label}</p>
                    <div className="min-w-0">
                      {axis.pct === null ? (
                        <p className="text-xs leading-relaxed text-ink-muted">{axis.basis}</p>
                      ) : (
                        <>
                          <ProgressBar value={axis.pct} className="h-1.5 w-full" />
                          <p className="mt-1 text-[11px] text-ink-muted">{axis.basis}</p>
                        </>
                      )}
                      {axis.id === "communication" && (
                        <button
                          type="button"
                          onClick={() => {
                            setMode("behavioral");
                            exitToSetup();
                          }}
                          className={`${textLink} mt-1 !text-xs cursor-pointer`}
                        >
                          {R.axisCommunicationCta}
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.4} />
                        </button>
                      )}
                    </div>
                    <p className={`font-mono text-sm font-medium tabular-nums sm:text-right ${axis.pct === null ? "text-ink-faint" : "text-ink-max"}`}>
                      {axis.pct === null ? R.notMeasured : `${axis.pct}%`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* KỸ NĂNG ƯU TIÊN - đúng MỘT: chủ đề sai nhiều nhất trong buổi. */}
            <div className={`${panelFocus} border-l-4 border-l-accent px-4 py-4 space-y-2`}>
              <p className="eyebrow text-accent-strong">{R.priorityTitle}</p>
              {priority ? (
                <>
                  <p className="text-lg font-black leading-snug text-ink-max">{priority.label}</p>
                  <p className="text-xs text-ink-body">
                    {format(R.priorityBasis, { wrong: priority.wrong, attempted: priority.attempted })}
                  </p>
                  <button
                    type="button"
                    onClick={() => void redrillSection(priority.label)}
                    className={`${btnPrimary} cursor-pointer`}
                  >
                    <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                    <span>{R.priorityCta}</span>
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-ink-max">{R.priorityNone}</p>
                  <button
                    type="button"
                    onClick={() => {
                      exitToSetup();
                      pendingScroll.current = "difficulty";
                    }}
                    className={`${btnPrimary} cursor-pointer`}
                  >
                    <span>{R.priorityNoneCta}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                </>
              )}
            </div>

            {/* TỪNG CÂU: đúng/sai, độ khó, thời gian */}
            <div className={`${panel} space-y-2 p-4`}>
              <p className="eyebrow text-accent-strong border-b border-line-soft pb-2">{R.timelineTitle}</p>
              <div className="flex flex-wrap gap-1.5">
                {perQuestion.map((d, i) => (
                  <div
                    key={i}
                    title={d.category}
                    className={`min-w-12 rounded-control border px-1.5 py-1 text-center ${
                      d.ok
                        ? "border-cyan-600 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-950/40"
                        : "border-red-600 bg-danger-soft dark:border-red-400"
                    }`}
                  >
                    <span className={`flex items-center justify-center ${d.ok ? "text-cyan-700 dark:text-cyan-400" : "text-danger"}`}>
                      {d.ok ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <X className="w-3.5 h-3.5" strokeWidth={3} />}
                    </span>
                    <span className="block font-mono text-[10px] tabular-nums text-ink-muted">
                      {d.seconds === undefined ? "--" : clock(d.seconds)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {otherMissed.length > 0 && (
              <div className="space-y-2">
                <p className="eyebrow text-ink-muted">{R.otherTopics}</p>
                <div className="flex flex-wrap gap-2">
                  {otherMissed.map(({ label, wrong }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => void redrillSection(label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control border border-accent-line bg-surface text-xs font-bold text-ink-body shadow-card hover:bg-accent-wash hover:text-accent-strong transition-colors cursor-pointer"
                    >
                      <span>{label}</span>
                      <span className="text-danger">
                        (<span className="font-mono tabular-nums">{wrong}</span> {t.interview.wrongCount})
                      </span>
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.4} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
              <button onClick={exitToSetup} className={`${btnSecondary} cursor-pointer`}>
                {t.interview.practiceAgain}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
