"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, BarChart3 } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import type { Difficulty } from "@/lib/lessons-loader";
import { createClient } from "@/lib/supabase";
import UserStats from "@/components/UserStats";
import UserProfile from "@/components/UserProfile";
import AdminChat from "@/components/AdminChat";
import Leaderboard from "@/components/Leaderboard";
import OnboardingFlow from "@/components/OnboardingFlow";
import ResumeLearningButton from "@/components/ResumeLearningButton";
import StreakDisplay from "@/components/StreakDisplay";
import { XP_VALUES, getLevelByXp } from "@/lib/levels";
import { hasCompletedOnboarding, completeOnboarding } from "@/lib/supabase-onboarding";

// Slim projection of Lesson — just enough to render the dashboard listing,
// so the full lesson bodies (sections/quiz/etc) never reach this client bundle.
export interface LessonMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: Difficulty;
  track?: "professional" | "personal" | "bonus";
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  xp: number;
  lessonsCompleted: number;
  avgQuizScore: number;
  level: {
    level: number;
    name: string;
    minXp: number;
    color: string;
  };
}

/* ─── Track definitions ─────────────────────────────────────────── */

interface StagePart {
  name: string;
  days: [number, number];
}

interface Stage {
  label: string;
  name: string;
  days: [number, number];
  available: boolean;
  parts: StagePart[];
}

const TRACK_PERSONAL = {
  id: "personal",
  title: "Tài chính cá nhân",
  subtitle: "Lộ trình 80 ngày",
  description:
    "Dành cho người muốn hiểu tiền bạc, kiểm soát chi tiêu, xây dựng tài sản và đầu tư thông minh — không cần kiến thức ngành.",
  pillars: ["Tư duy tiền bạc", "Đầu tư cá nhân", "Lập kế hoạch tài chính"],
  stages: [
    {
      label: "Chặng 1",
      name: "Tư duy tiền bạc và tài chính cơ bản",
      days: [1, 20] as [number, number],
      available: true,
      parts: [
        { name: "Tiền, thời gian và lãi kép", days: [1, 10] as [number, number] },
        { name: "Rủi ro, nợ và hệ thống tài chính", days: [11, 20] as [number, number] },
      ],
    },
    {
      label: "Chặng 2",
      name: "Cổ phiếu, ETF và quỹ đầu tư",
      days: [201, 220] as [number, number],
      available: true,
      parts: [
        { name: "Cổ phiếu, ETF và quỹ chỉ số", days: [201, 210] as [number, number] },
        { name: "Tâm lý đầu tư và thực hành", days: [211, 220] as [number, number] },
      ],
    },
    {
      label: "Chặng 3",
      name: "Trái phiếu và các công cụ cố định",
      days: [221, 240] as [number, number],
      available: true,
      parts: [
        { name: "Nền tảng trái phiếu", days: [221, 230] as [number, number] },
        { name: "Chiến lược và rủi ro trái phiếu", days: [231, 240] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Danh mục đầu tư và kế hoạch hưu trí",
      days: [241, 262] as [number, number],
      available: true,
      parts: [
        { name: "Danh mục theo tuổi và kế hoạch hưu trí", days: [241, 250] as [number, number] },
        { name: "Bảo vệ tài sản và tổng kết hành trình", days: [251, 262] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

const TRACK_PROFESSIONAL = {
  id: "professional",
  title: "Tài chính chuyên ngành",
  subtitle: "Lộ trình 180 ngày chuyên sâu",
  description:
    "Lộ trình chuyên sâu 180 ngày dành cho người đã biết tài chính cơ bản: kế toán, báo cáo tài chính, định giá, trái phiếu, danh mục đầu tư, phái sinh.",
  pillars: ["Kế toán & báo cáo tài chính", "Định giá & phân tích", "Đầu tư & quản lý rủi ro"],
  stages: [
    {
      label: "Chặng 1",
      name: "Kế toán nền tảng",
      days: [21, 40] as [number, number],
      available: true,
      parts: [
        { name: "Ngôn ngữ kế toán và bảng cân đối", days: [21, 30] as [number, number] },
        { name: "Vốn lưu động và nguyên tắc ghi nhận", days: [31, 40] as [number, number] },
      ],
    },
    {
      label: "Chặng 2",
      name: "Đọc 3 báo cáo tài chính",
      days: [41, 60] as [number, number],
      available: true,
      parts: [
        { name: "Income Statement và Balance Sheet", days: [41, 50] as [number, number] },
        { name: "Cash Flow Statement và case thực tế", days: [51, 60] as [number, number] },
      ],
    },
    {
      label: "Chặng 3",
      name: "Chỉ số tài chính cơ bản",
      days: [61, 80] as [number, number],
      available: true,
      parts: [
        { name: "Biên lợi nhuận và khả năng sinh lời", days: [61, 70] as [number, number] },
        { name: "Hiệu quả vận hành và định giá cơ bản", days: [71, 80] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Giá trị thời gian của tiền",
      days: [81, 100] as [number, number],
      available: true,
      parts: [
        { name: "PV, FV và các công cụ chiết khấu", days: [81, 90] as [number, number] },
        { name: "WACC, CAPM và ứng dụng", days: [91, 100] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "Tài chính doanh nghiệp",
      days: [101, 120] as [number, number],
      available: true,
      parts: [
        { name: "Cơ cấu vốn và M&A", days: [101, 110] as [number, number] },
        { name: "Vận hành vốn và tài chính khởi nghiệp", days: [111, 120] as [number, number] },
      ],
    },
    {
      label: "Chặng 6",
      name: "Cổ phiếu và định giá doanh nghiệp",
      days: [121, 140] as [number, number],
      available: true,
      parts: [
        { name: "Định giá tương đối (multiples)", days: [121, 130] as [number, number] },
        { name: "Định giá DCF", days: [131, 140] as [number, number] },
      ],
    },
    {
      label: "Chặng 7",
      name: "Trái phiếu, lãi suất và tín dụng",
      days: [141, 160] as [number, number],
      available: true,
      parts: [
        { name: "Định giá trái phiếu và lãi suất", days: [141, 150] as [number, number] },
        { name: "Rủi ro tín dụng và các loại trái phiếu", days: [151, 160] as [number, number] },
      ],
    },
    {
      label: "Chặng 8",
      name: "Danh mục đầu tư và quản trị rủi ro",
      days: [161, 180] as [number, number],
      available: true,
      parts: [
        { name: "Lý thuyết danh mục hiện đại", days: [161, 170] as [number, number] },
        { name: "Đo lường hiệu quả và các loại quỹ", days: [171, 180] as [number, number] },
      ],
    },
    {
      label: "Chặng 9",
      name: "Phái sinh và công cụ tài chính nâng cao",
      days: [181, 200] as [number, number],
      available: true,
      parts: [
        { name: "Hợp đồng phái sinh cơ bản", days: [181, 190] as [number, number] },
        { name: "Swap, phòng hộ rủi ro và tổng kết", days: [191, 200] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

/* ─── Component ─────────────────────────────────────────────────── */

export default function DashboardClient({ lessonsMeta }: { lessonsMeta: LessonMeta[] }) {
  const router = useRouter();
  const supabase = createClient();
  const progress = useProgress();
  const completed = progress.completedLessons;
  const [activeTrack, setActiveTrackState] = useState<"personal" | "professional">(() => {
    if (typeof window === "undefined") return "personal";
    const saved = window.localStorage.getItem("activeTrack");
    return saved === "personal" || saved === "professional" ? saved : "personal";
  });
  const setActiveTrack = (track: "personal" | "professional") => {
    setActiveTrackState(track);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("activeTrack", track);
    }
  };
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [avgQuizScore, setAvgQuizScore] = useState(0);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [openStages, setOpenStages] = useState<Set<string>>(new Set());
  const [openParts, setOpenParts] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  const toggleStage = (key: string) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const togglePart = (key: string) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleOnboardingComplete = async (selectedTrack: "personal" | "professional") => {
    if (user?.id) {
      try {
        await completeOnboarding(user.id, selectedTrack);
        setActiveTrackState(selectedTrack);
        localStorage.setItem("activeTrack", selectedTrack);
        setShowOnboarding(false);
      } catch (error) {
        console.error("Error completing onboarding:", error);
      }
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  // Check auth and calculate XP on mount
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);

      // Check if user has completed onboarding
      try {
        const hasOnboarded = await hasCompletedOnboarding(session.user.id);
        setOnboardingChecked(true);
        
        if (!hasOnboarded) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Error checking onboarding:", error);
        setOnboardingChecked(true);
      }

      // Calculate XP from completed lessons (10 XP per lesson)
      const calculatedXp = completed.length * XP_VALUES.LESSON_COMPLETED;
      setUserXp(calculatedXp);

      // Mock average quiz score
      setAvgQuizScore(75);

      // Generate leaderboard data with real user
      const mockUsers = [
        {
          id: "user1",
          rank: 0,
          name: "Nguyễn Văn A",
          xp: 450,
          lessonsCompleted: 45,
          avgQuizScore: 88,
          level: getLevelByXp(450),
        },
        {
          id: "user2",
          rank: 0,
          name: "Trần Thị B",
          xp: 380,
          lessonsCompleted: 38,
          avgQuizScore: 82,
          level: getLevelByXp(380),
        },
        {
          id: "user3",
          rank: 0,
          name: "Phạm Văn C",
          xp: 320,
          lessonsCompleted: 32,
          avgQuizScore: 75,
          level: getLevelByXp(320),
        },
        {
          id: session.user.id,
          rank: 0,
          name: session.user.user_metadata?.full_name || session.user.email || "Bạn",
          xp: calculatedXp,
          lessonsCompleted: completed.length,
          avgQuizScore: 75,
          level: getLevelByXp(calculatedXp),
        },
      ];

      // Sort by XP and assign ranks
      const sorted = mockUsers.sort((a, b) => b.xp - a.xp);
      const ranked = sorted.map((user, idx) => ({
        ...user,
        rank: idx + 1,
      }));

      setLeaderboardEntries(ranked);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth, completed.length]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  // Show onboarding if not completed
  if (showOnboarding && onboardingChecked) {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  const sorted = [...lessonsMeta].sort((a, b) => a.id - b.id);
  const track = activeTrack === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;

  const totalDone = completed.length;
  const totalLessons = sorted.length;

  // Case-study lessons (id >= 1001) live outside the day-numbered curriculum
  // entirely — they're real company/topic deep-dives, but with no stage to
  // belong to they were previously only reachable by guessing the URL.
  const bonusLessons = sorted.filter((l) => l.id >= 1001);
  const bonusDone = bonusLessons.filter((l) => completed.includes(l.id)).length;
  const bonusOpen = openStages.has("bonus");

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* ── Sticky header ── */}
      <div className="border-b border-stone-200 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-950 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Tự Học Tài Chính</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Chọn lộ trình phù hợp với bạn</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xl font-bold text-stone-900 dark:text-stone-100">{totalDone}</div>
              <div className="text-xs text-stone-500 dark:text-stone-400">/ {totalLessons} bài đã học</div>
            </div>
            <Link
              href="/analytics"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-lg px-3 py-1.5 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Thống kê
            </Link>
            <UserProfile />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* ── User Stats + Streak (compact row) ── */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <UserStats
              xp={userXp}
              lessonsCompleted={totalDone}
              totalLessons={totalLessons}
              avgQuizScore={avgQuizScore}
            />
          </div>
          <StreakDisplay />
        </div>

        {/* ── Resume Learning Button ── */}
        <div className="max-w-6xl mx-auto mb-8">
          <ResumeLearningButton activeTrack={activeTrack} />
        </div>

        {/* ── Main Content: Lessons + Leaderboard ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Lessons (2 columns on desktop) */}
          <div className="lg:col-span-2">
          {/* Track selector - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[TRACK_PERSONAL, TRACK_PROFESSIONAL].map((t) => {
            const isActive = activeTrack === t.id;
            return (
              <div key={t.id} className="relative group">
                <button
                  onClick={() => setActiveTrack(t.id as "personal" | "professional")}
                  className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${
                    isActive
                      ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600"
                  }`}
                >
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? "text-stone-500 dark:text-stone-400" : "text-stone-500 dark:text-stone-400"}`}>
                    {t.subtitle}
                  </div>
                  <div className={`text-base font-bold ${isActive ? "text-white dark:text-stone-900" : "text-stone-900 dark:text-stone-100"}`}>
                    {t.title}
                  </div>
                </button>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50">
                  <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl px-4 py-3 whitespace-nowrap shadow-lg border border-stone-800 dark:border-stone-700">
                    <p className="text-sm font-bold mb-2">{t.description}</p>
                    <div className="space-y-1 text-xs text-stone-300">
                      {t.pillars.map((pillar) => (
                        <div key={pillar} className="flex gap-2">
                          <span>•</span>
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900 dark:border-t-stone-800" />
                </div>
              </div>
            );
          })}
        </div>

          {/* ── Stages + lessons ── */}
          <div className="space-y-6 mt-8">
          {track.stages.map((stage) => {
            const stageLessons = sorted.filter(
              (l) => l.id >= stage.days[0] && l.id <= stage.days[1] && (!l.track || l.track === activeTrack)
            );
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;
            const stageKey = `${activeTrack}-${stage.label}`;
            const stageOpen = openStages.has(stageKey);

            return (
              <div key={stage.label}>
                {/* Stage header — click to expand/collapse */}
                <button
                  onClick={() => toggleStage(stageKey)}
                  className="w-full flex items-baseline gap-4 mb-4 cursor-pointer text-left"
                >
                  <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                    {stage.label}
                  </span>
                  <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100" role="heading" aria-level={2}>{stage.name}</span>
                  {stage.available && stageLessons.length > 0 && (
                    <span className="ml-auto text-base font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-4 py-1 rounded-lg">
                      {stageDone}/{stageLessons.length}
                    </span>
                  )}
                  <span className={`text-stone-500 dark:text-stone-400 text-sm transition-transform ${stageOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                {/* Not available yet - with lock and loading animation */}
                {stageOpen && !stage.available && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-stone-50 dark:bg-stone-900/50 relative overflow-hidden">
                    {/* Animated building background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 dark:via-stone-800 to-transparent opacity-30 animate-pulse" />

                    {/* Lock icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center animate-bounce">
                        <svg className="w-6 h-6 text-stone-600 dark:text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-3 13h6v2H9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">Chặng này bị khoá</p>
                        <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">Hoàn thành chặng trước để mở</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available but no lessons in DB yet - with building animation */}
                {stageOpen && stage.available && stageLessons.length === 0 && (
                  <div className="border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl px-5 py-6 text-center bg-emerald-50 dark:bg-emerald-950/50 relative overflow-hidden">
                    {/* Animated construction bars */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '28px', animationDelay: '0.2s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '24px', animationDelay: '0.4s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.6s' }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="text-3xl animate-bounce">🏗️</div>
                      <p className="text-stone-600 dark:text-stone-400 text-sm font-extrabold">Đang xây dựng</p>
                      <p className="text-stone-500 dark:text-stone-400 text-xs">Bài học sắp được hoàn thiện</p>
                    </div>
                  </div>
                )}

                {/* Parts (sub-stages) — each its own collapsible accordion */}
                {stageOpen && stage.available && stageLessons.length > 0 && (
                  <div className="space-y-3">
                    {stage.parts.map((part) => {
                      const partLessons = sorted.filter(
                        (l) => l.id >= part.days[0] && l.id <= part.days[1] && (!l.track || l.track === activeTrack)
                      );
                      if (partLessons.length === 0) return null;
                      const partDone = partLessons.filter((l) => completed.includes(l.id)).length;
                      const partKey = `${stageKey}-${part.name}`;
                      const partOpen = openParts.has(partKey);

                      return (
                        <div key={part.name} className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                          <button
                            onClick={() => togglePart(partKey)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 bg-stone-50 dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer text-left"
                          >
                            <span className="font-bold text-stone-800 dark:text-stone-300 text-sm">{part.name}</span>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                              Day {part.days[0]}-{part.days[1]}
                            </span>
                            <span className="ml-auto text-sm font-bold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 px-3 py-0.5 rounded-lg border border-stone-200 dark:border-stone-800">
                              {partDone}/{partLessons.length}
                            </span>
                            <span className={`text-stone-500 dark:text-stone-400 text-sm transition-transform ${partOpen ? "rotate-180" : ""}`}>
                              ▾
                            </span>
                          </button>

                          {partOpen && (
                            <div className="p-2 space-y-2">
                              {partLessons.map((lesson) => {
                                const isDone = completed.includes(lesson.id);
                                return (
                                  <Link
                                    key={lesson.id}
                                    href={`/bai-hoc/${lesson.slug}`}
                                    className={`block rounded-xl border-2 transition-all ${
                                      isDone
                                        ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                                    }`}
                                  >
                                    <div className="flex items-center gap-4 px-6 py-5">
                                      {/* Day number */}
                                      <div className="w-12 flex-shrink-0 text-center">
                                        <span className={`font-mono text-sm font-extrabold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                                          {String(lesson.id).padStart(3, "0")}
                                        </span>
                                      </div>

                                      {/* Status circle */}
                                      <div className="flex-shrink-0">
                                        {isDone ? (
                                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                          </div>
                                        ) : (
                                          <div className="w-6 h-6 rounded-full border-3 border-stone-300 dark:border-stone-700" />
                                        )}
                                      </div>

                                      {/* Title + subtitle */}
                                      <div className="flex-1 min-w-0">
                                        <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                                          {lesson.title}
                                        </div>
                                        <div className={`text-sm mt-1 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {lesson.subtitle}
                                        </div>
                                      </div>

                                      {/* Meta */}
                                      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                                        <span className={`text-sm font-semibold ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                                          {lesson.duration}
                                        </span>
                                        <span className={`text-sm font-bold rounded-lg px-3 py-1 ${
                                          isDone
                                            ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300"
                                            : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                                        }`}>
                                          {isDone ? "Xong" : lesson.difficulty}
                                        </span>
                                      </div>

                                      <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                                        ›
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          </div>

          {/* Case chuyên sâu — real company/topic deep-dives outside the day curriculum */}
          {bonusLessons.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => toggleStage("bonus")}
                className="w-full flex items-baseline gap-4 mb-4 cursor-pointer text-left"
              >
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                  Bonus
                </span>
                <span className="text-lg font-extrabold text-stone-900 dark:text-stone-100" role="heading" aria-level={2}>Case chuyên sâu</span>
                <span className="ml-auto text-base font-bold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 px-4 py-1 rounded-lg">
                  {bonusDone}/{bonusLessons.length}
                </span>
                <span className={`text-stone-400 dark:text-stone-500 text-sm transition-transform ${bonusOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {bonusOpen && (
                <div className="space-y-2">
                  {bonusLessons.map((lesson) => {
                    const isDone = completed.includes(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        href={`/bai-hoc/${lesson.slug}`}
                        className={`block rounded-xl border-2 transition-all ${
                          isDone
                            ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950"
                            : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-4">
                          <div className="flex-shrink-0">
                            {isDone ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-stone-300 dark:border-stone-700" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900 dark:text-emerald-400" : "text-stone-900 dark:text-stone-100"}`}>
                              {lesson.title}
                            </div>
                            <div className={`text-sm mt-0.5 truncate ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400"}`}>
                              {lesson.subtitle}
                            </div>
                          </div>
                          <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500"}`}>
                            ›
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          </div>

          {/* Right: Leaderboard (1 column on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <Leaderboard
              entries={leaderboardEntries}
              currentUserRank={leaderboardEntries.find((e) => e.id === user?.id)?.rank}
            />
          </div>
        </div>
      </div>

      {/* Admin Chat */}
      <AdminChat />
    </div>
  );
}
