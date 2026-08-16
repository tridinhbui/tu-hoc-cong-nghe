"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  NotebookPen,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { getUserAnalytics } from "@/lib/supabase-analytics";
import { createClient } from "@/lib/supabase";
import type { LearningAnalytics as LearningAnalyticsType } from "@/lib/supabase-analytics";
import LeaderboardSection from "@/components/analytics/LeaderboardSection";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { getCurrentUser } from "@/lib/current-user";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

function metricTone(score: number) {
  if (score >= 75) return "text-emerald-700 dark:text-emerald-300";
  if (score >= 45) return "text-amber-700 dark:text-amber-300";
  return "text-stone-700 dark:text-stone-300";
}

const panelClass =
  "min-w-0 overflow-hidden rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900";
const panelSoftClass =
  "rounded-2xl border border-stone-200/60 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-800/40";
type AnalyticsSection = "overview" | "knowledge" | "memory" | "competency" | "leaderboard";

const sectionLabelClass = "text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400";

/** Recharts truyền vào tooltip nhiều trường hơn ba trường dưới đây, nhưng đây
 *  là toàn bộ phần component này đọc - khai đúng phần dùng thì đổi phiên bản
 *  recharts không âm thầm làm kiểu rộng ra mà không ai biết. */
interface TooltipEntry {
  value: number | string;
  name?: string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: number | string;
  formatter?: (value: number | string, name?: string) => React.ReactNode;
  labelFormatter?: (label: number | string) => React.ReactNode;
}

const CustomTooltip = ({ active, payload, label, formatter, labelFormatter }: CustomTooltipProps) => {
  // Its own hook: Recharts renders this outside the analytics component tree, so
  // `t` cannot be closed over from there.
  const { t } = useI18n();
  if (active && payload && payload.length) {
    const formattedLabel = labelFormatter && label !== undefined ? labelFormatter(label) : label;
    return (
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-xl text-xs space-y-1.5 z-50">
        {formattedLabel && (
          <p className="font-extrabold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800/80 pb-1 mb-1.5">
            {formattedLabel}
          </p>
        )}
        {payload.map((item, idx) => {
          const displayVal = formatter ? formatter(item.value, item.name) : item.value;
          const displayName = item.name === "lessonsCompleted" ? t.analytics.seriesLessons : item.name === "minutesSpent" ? t.analytics.seriesMinutes : item.name;
          return (
            <div key={idx} className="flex items-center gap-4 justify-between">
              <span className="text-stone-500 dark:text-stone-400 font-medium">{displayName}:</span>
              <span className="font-bold text-stone-900 dark:text-stone-100" style={{ color: item.color || undefined }}>
                {displayVal}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

// Hàm thuần nên không gọi được `useI18n()`; nhận `t` làm tham số thay vì
// dựng câu chữ tại chỗ.
function insightFromAnalytics(analytics: LearningAnalyticsType, t: Dictionary) {
  const insights: string[] = [];

  if (analytics.recentMomentum.last7DaysLessons === 0) {
    insights.push(t.analytics.insightNoStudy7d);
  } else {
    insights.push(format(t.analytics.insightLessons7d, { count: analytics.recentMomentum.last7DaysLessons }));
  }

  if (analytics.bestStudyHour !== null) {
    insights.push(`${formatHour(analytics.bestStudyHour)} · ${t.analytics.peakWindow[analytics.peakStudyWindow]}`);
  }

  if (analytics.notes.totalNotes > 0) {
    insights.push(format(t.analytics.insightNotes, { count: analytics.notes.totalNotes }));
  }

  if (analytics.completionRate < 60 && analytics.totalLessonsStarted >= 3) {
    insights.push(format(t.analytics.insightCompletion, { percent: analytics.completionRate }));
  }

  return insights.slice(0, 3);
}

function MetricCard({
  icon,
  label,
  value,
  hint,
  accent,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_20px_35px_-15px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_35px_-15px_rgba(16,185,129,0.06)]"
    >
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accent}`} />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`${sectionLabelClass} text-[10px] tracking-[0.2em] opacity-80`}>
            {label}
          </p>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-stone-50 tracking-tight">{value}</p>
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed truncate">{hint}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-500 dark:text-stone-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function SummaryStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">{value}</p>
      <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">{hint}</p>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8">
        <div className="h-6 w-40 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="mt-4 h-10 w-72 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        <div className="mt-3 h-5 w-full max-w-2xl rounded-full bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-36 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-96 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800" />
        <div className="h-96 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

export default function LearningAnalytics({ hideLeaderboardTab = false }: { hideLeaderboardTab?: boolean }) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");
  const [analytics, setAnalytics] = useState<LearningAnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<AnalyticsSection>(
    !hideLeaderboardTab && initialTab === "leaderboard" ? "leaderboard" : "overview"
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const supabase = createClient();
        const user = await getCurrentUser();

        if (user) {
          setUserId(user.id);
          const data = await getUserAnalytics(user.id);
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnalytics();
  }, []);

  const weeklyPeak = useMemo(() => {
    if (!analytics) return 0;
    return Math.max(...analytics.weeklyActivity.map((week) => week.lessonsCompleted), 1);
  }, [analytics]);

  const trackPieData = useMemo(() => {
    if (!analytics) return [];
    return [
      { name: t.analytics.trackPersonal, value: analytics.lessonsByTrack.personal, color: "#10b981" },
      { name: t.analytics.trackProfessional, value: analytics.lessonsByTrack.professional, color: "#57534e" },
      { name: "Bonus", value: analytics.lessonsByTrack.bonus, color: "#f59e0b" },
    ].filter((item) => item.value > 0);
  }, [analytics]);

  const difficultyData = useMemo(() => {
    if (!analytics) return [];
    return [
      { label: t.difficulty["Dễ"], value: analytics.lessonsByDifficulty.easy, color: "#10b981" },
      { label: t.difficulty["Trung bình"], value: analytics.lessonsByDifficulty.medium, color: "#f59e0b" },
      { label: t.difficulty["Khó"], value: analytics.lessonsByDifficulty.hard, color: "#78716c" },
    ];
  }, [analytics]);

  const studyHourData = useMemo(() => {
    if (!analytics) return [];
    return analytics.studyTimeDistribution.filter((slot) => slot.lessonsCompleted > 0);
  }, [analytics]);

  const insights = useMemo(() => (analytics ? insightFromAnalytics(analytics, t) : []), [analytics]);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8 text-center text-stone-500 dark:text-stone-400">
        {t.analytics.noData}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative overflow-hidden rounded-[26px] border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-4 sm:p-5 shadow-xs"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
              {t.analytics.personal}
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl font-black leading-tight tracking-tight text-stone-900 dark:text-stone-100">
              {t.analytics.currentRhythm}
            </h2>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-800/80 px-2.5 py-1 text-xs font-bold text-stone-700 dark:text-stone-300 shadow-2xs"
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Compact Horizontal Quick Stats */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 shrink-0">
            <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-stone-50/80 to-white dark:from-stone-800/60 dark:to-stone-900 p-2 sm:p-3 text-center min-w-[72px] sm:min-w-[85px]">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-400">{t.analytics.streakLabel}</p>
              <p className="mt-1 text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 whitespace-nowrap">{format(t.analytics.streakDays, { count: analytics.streakDays })}</p>
              <p className="text-[9px] font-semibold text-stone-500 dark:text-stone-400 truncate">{format(t.analytics.streakRecord, { count: analytics.longestStreak })}</p>
            </div>

            <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-stone-50/80 to-white dark:from-stone-800/60 dark:to-stone-900 p-2 sm:p-3 text-center min-w-[72px] sm:min-w-[85px]">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-400">{t.analytics.quizScoreLabel}</p>
              <p className="mt-1 text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{analytics.averageQuizScore}%</p>
              <p className="text-[9px] font-semibold text-stone-500 dark:text-stone-400 truncate">{format(t.analytics.lessonCount, { count: analytics.totalLessonsCompleted })}</p>
            </div>

            <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-gradient-to-b from-stone-50/80 to-white dark:from-stone-800/60 dark:to-stone-900 p-2 sm:p-3 text-center min-w-[72px] sm:min-w-[85px]">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-400">{t.analytics.studyHourLabel}</p>
              <p className="mt-1 text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 whitespace-nowrap">
                {analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.hourUnknown}
              </p>
              <p className="text-[9px] font-semibold text-stone-500 truncate">{t.analytics.peakWindow[analytics.peakStudyWindow]}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Premium Tab Selector */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-6 mt-2 pb-0 overflow-x-auto scrollbar-none">
        {([
          { id: "overview", label: t.analytics.tabOverview },
          { id: "knowledge", label: t.analytics.tabKnowledge },
          { id: "memory", label: t.analytics.tabMemory },
          { id: "competency", label: t.analytics.tabCompetency },
          ...(!hideLeaderboardTab ? [{ id: "leaderboard", label: t.analytics.tabLeaderboard }] : []),
        ] as { id: AnalyticsSection; label: string }[]).map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="relative pb-3 text-sm font-bold transition-all cursor-pointer focus:outline-none whitespace-nowrap shrink-0"
            >
              <span className={`transition-colors duration-200 ${isActive ? "text-stone-900 dark:text-stone-50" : "text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 inset-x-0 h-[2.5px] bg-emerald-500 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-3.5 grid-cols-2 sm:grid-cols-2">
            <MetricCard
              icon={<Flame className="h-5 w-5" />}
              label={t.analytics.cardStreak}
              value={`${analytics.streakDays}`}
              hint={format(t.analytics.streakRecordHint, { count: analytics.longestStreak })}
              accent="from-orange-500 to-red-600"
              delay={0.02}
            />
            <MetricCard
              icon={<Sparkles className="h-5 w-5" />}
              label={t.analytics.cardWeekRhythm}
              value={format(t.analytics.lessonCount, { count: analytics.recentMomentum.last7DaysLessons })}
              hint={format(t.analytics.minutesDone, { count: analytics.recentMomentum.last7DaysMinutes })}
              accent="from-emerald-500 to-teal-500"
              delay={0.06}
            />
            <MetricCard
              icon={<Clock3 className="h-5 w-5" />}
              label={t.analytics.cardStudyTime}
              value={format(t.analytics.minutesValue, { count: analytics.totalTimeSpent })}
              hint={`${t.analytics.peakWindow[analytics.peakStudyWindow]} · ${analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.hourUnknown}`}
              accent="from-sky-400 to-blue-600"
              delay={0.1}
            />
            <MetricCard
              icon={<TrendingUp className="h-5 w-5" />}
              label={t.analytics.cardWeekTrend}
              value={`${analytics.recentMomentum.weeklyTrendPercent > 0 ? "+" : ""}${analytics.recentMomentum.weeklyTrendPercent}%`}
              hint={format(t.analytics.lessons30d, { count: analytics.recentMomentum.last30DaysLessons })}
              accent="from-teal-400 to-emerald-600"
              delay={0.14}
            />
          </div>

          <div className="grid gap-6 grid-cols-1">
            <motion.section
              custom={0.08}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className={sectionLabelClass}>{t.analytics.rhythmEyebrow}</p>
                  <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.rhythmTitle}</h3>
                </div>
                <div className={panelSoftClass + " px-3.5 py-1.5 text-xs text-stone-600 dark:text-stone-300 font-bold"}>
                  {format(t.analytics.rhythmPeak, { count: weeklyPeak })}
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.weeklyActivity} margin={{ left: -10, right: 0, top: 12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="weeklyLessons" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="4 4" className="dark:stroke-stone-800" opacity={0.6} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#78716c" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#78716c" }} allowDecimals={false} />
                    <Tooltip
                      content={
                        <CustomTooltip
                          formatter={(value: number | string, name?: string) => {
                            if (name === "lessonsCompleted") return format(t.analytics.lessonsUnit, { count: value });
                            if (name === "minutesSpent") return format(t.analytics.minutesUnit, { count: value });
                            return `${value}`;
                          }}
                          labelFormatter={(label: number | string) => format(t.analytics.weekStarting, { label })}
                        />
                      }
                    />
                    <Area type="monotone" dataKey="lessonsCompleted" stroke="#10b981" strokeWidth={2.5} fill="url(#weeklyLessons)" />
                    <Area type="monotone" dataKey="minutesSpent" stroke="#78716c" strokeWidth={1.5} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.section>

            <motion.section
              custom={0.12}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6">
                <p className={sectionLabelClass}>{t.analytics.hoursEyebrow}</p>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.hoursTitle}</h3>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{t.analytics.hoursSub}</p>
              </div>
              {studyHourData.length === 0 ? (
                <div className="flex h-[300px] items-center justify-center rounded-2xl bg-stone-50/50 dark:bg-stone-800/40 text-xs text-stone-400 dark:text-stone-500 border border-stone-200/50 dark:border-stone-800/80">
                  {t.analytics.hoursEmpty}
                </div>
              ) : (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyHourData} margin={{ left: -22, right: 0, top: 12, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#e7e5e4" strokeDasharray="4 4" className="dark:stroke-stone-800" opacity={0.6} />
                      <XAxis
                        dataKey="hour"
                        tickFormatter={(value) => `${value}h`}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "#78716c" }}
                      />
                      <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#78716c" }} allowDecimals={false} />
                      <Tooltip
                        content={
                          <CustomTooltip
                            formatter={(value: number | string) => format(t.analytics.lessonsUnit, { count: value })}
                            labelFormatter={(label: number | string) => format(t.analytics.hourBucket, { hour: formatHour(Number(label)) })}
                          />
                        }
                      />
                      <Bar dataKey="lessonsCompleted" radius={[10, 10, 2, 2]}>
                        {studyHourData.map((entry) => (
                          <Cell
                            key={entry.hour}
                            fill={entry.hour === analytics.bestStudyHour ? "#10b981" : "#78716c"}
                            fillOpacity={entry.hour === analytics.bestStudyHour ? 1 : 0.65}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      )}

      {activeSection === "knowledge" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<Brain className="h-5 w-5" />}
              label={t.analytics.cardAvgQuiz}
              value={`${analytics.averageQuizScore}%`}
              hint={format(t.analytics.avgMinutesPerLesson, { count: analytics.averageMinutesPerLesson })}
              accent="from-amber-400 to-orange-500"
              delay={0.02}
            />
            <MetricCard
              icon={<Target className="h-5 w-5" />}
              label={t.analytics.cardCompleted}
              value={`${analytics.totalLessonsCompleted}`}
              hint={format(t.analytics.completionOfStarted, { percent: analytics.completionRate, count: analytics.totalLessonsStarted })}
              accent="from-emerald-500 to-teal-500"
              delay={0.06}
            />
            <MetricCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              label={t.analytics.cardCompletionRate}
              value={`${analytics.completionRate}%`}
              hint={t.analytics.hintCompletionRatio}
              accent="from-indigo-400 to-purple-600"
              delay={0.1}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.section
              custom={0.16}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6">
                <p className={sectionLabelClass}>{t.analytics.trackEyebrow}</p>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.trackTitle}</h3>
              </div>
              {trackPieData.length === 0 ? (
                <div className="flex h-[260px] items-center justify-center rounded-2xl bg-stone-50/50 dark:bg-stone-800/40 text-xs text-stone-400 dark:text-stone-500 border border-stone-200/50 dark:border-stone-800/80">
                  {t.analytics.trackEmpty}
                </div>
              ) : (
                <div className="grid min-w-0 items-center gap-6 md:grid-cols-[1fr_1.1fr]">
                  <div className="h-[250px] relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trackPieData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={88}
                          paddingAngle={4}
                        >
                          {trackPieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip formatter={(value: number | string) => format(t.analytics.lessonsUnit, { count: value })} />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-400 dark:text-stone-500">{t.analytics.total}</span>
                      <span className="text-xl font-extrabold text-stone-900 dark:text-stone-50">{format(t.analytics.lessonCount, { count: analytics.totalLessonsCompleted })}</span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {trackPieData.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-stone-200/60 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-900/30 px-3.5 py-2.5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-3 w-3 rounded-full ring-2 ring-white dark:ring-stone-900 shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="font-bold text-stone-800 dark:text-stone-200">{item.name}</span>
                        </div>
                        <span className="font-extrabold text-stone-900 dark:text-stone-50">{format(t.analytics.lessonCount, { count: item.value })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>

            <motion.section
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className={sectionLabelClass}>{t.analytics.difficultyEyebrow}</p>
                  <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.difficultyTitle}</h3>
                </div>
                <div className={panelSoftClass + " px-3.5 py-1.5 text-xs text-stone-600 dark:text-stone-300 font-bold"}>
                  {format(t.analytics.lessonsDone, { count: analytics.totalLessonsCompleted })}
                </div>
              </div>
              <div className="space-y-4">
                {difficultyData.map((item) => {
                  const width = analytics.totalLessonsCompleted > 0 ? (item.value / analytics.totalLessonsCompleted) * 100 : 0;
                  return (
                    <div key={item.label} className="text-xs">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="font-bold text-stone-800 dark:text-stone-200">{item.label}</span>
                        </div>
                        <span className="font-extrabold text-stone-900 dark:text-stone-50">{format(t.analytics.lessonsWithPercent, { count: item.value, percent: Math.round(width) })}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>
      )}

      {activeSection === "memory" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              icon={<NotebookPen className="h-5 w-5" />}
              label={t.analytics.cardTotalNotes}
              value={`${analytics.notes.totalNotes} note`}
              hint={format(t.analytics.lessonsWithNotes, { count: analytics.notes.lessonsWithNotes })}
              accent="from-indigo-400 to-purple-600"
              delay={0.02}
            />
            <MetricCard
              icon={<BookMarked className="h-5 w-5" />}
              label={t.analytics.cardManualFlags}
              value={format(t.analytics.lessonCount, { count: analytics.manualFlags.totalFlags })}
              hint={t.analytics.hintSelfMarked}
              accent="from-cyan-400 to-sky-500"
              delay={0.06}
            />
            <MetricCard
              icon={<Award className="h-5 w-5" />}
              label={t.analytics.cardRhythmStability}
              value={`${analytics.consistencyScore}%`}
              hint={t.analytics.hintConsistency}
              accent="from-stone-500 to-stone-700"
              delay={0.1}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <motion.section
              custom={0.24}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className={sectionLabelClass}>{t.analytics.notesEyebrow}</p>
                  <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.notesTitle}</h3>
                </div>
                <Link
                  href="/ghi-chu"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.analytics.seeAll}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {analytics.notes.topLessons.length === 0 ? (
                <div className="rounded-xl border border-stone-200/50 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-800/40 px-5 py-8 text-xs text-stone-400 dark:text-stone-500 text-center leading-relaxed">
                  {t.analytics.notesEmpty}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {analytics.notes.topLessons.map((lesson, index) => (
                    <Link
                      key={lesson.lessonId}
                      href={lesson.slug ? `/bai-hoc/${lesson.slug}` : "/ghi-chu"}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-stone-200/60 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/30 px-3.5 py-3 transition-all hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 hover:border-emerald-500/20"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-stone-900 text-xs font-bold text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800">
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {lesson.title}
                          </p>
                          <p className="mt-1 text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                            {format(t.analytics.notesSaved, { count: lesson.notesCount })}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500" />
                    </Link>
                  ))}
                </div>
              )}
            </motion.section>

            <motion.section
              custom={0.28}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={panelClass + " p-4 sm:p-6"}
            >
              <div className="mb-6">
                <p className={sectionLabelClass}>{t.analytics.nextEyebrow}</p>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">{t.analytics.nextTitle}</h3>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-stone-200/65 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/30 p-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">{t.analytics.tipFinishTitle}</p>
                      <p className="mt-1 text-stone-500 dark:text-stone-400 leading-relaxed">
                        {format(t.analytics.tipFinishBody, { rate: analytics.completionRate })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-200/65 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/30 p-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <BarChart3 className="mt-0.5 h-4.5 w-4.5 text-blue-500 dark:text-blue-400 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">{t.analytics.tipHoursTitle}</p>
                      <p className="mt-1 text-stone-500 dark:text-stone-400 leading-relaxed">
                        {format(t.analytics.tipHoursBody, { hour: analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.tipHoursFallback })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-200/65 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/30 p-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <NotebookPen className="mt-0.5 h-4.5 w-4.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">{t.analytics.tipNotesTitle}</p>
                      <p className="mt-1 text-stone-500 dark:text-stone-400 leading-relaxed">
                        {format(t.analytics.tipNotesBody, { count: analytics.notes.totalNotes })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white cursor-pointer"
                >
                  {t.analytics.continueLearning}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/ghi-chu"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-2.5 text-xs font-bold text-stone-800 dark:text-stone-100 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer"
                >
                  {t.analytics.openNotes}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      )}


      {activeSection === "leaderboard" && <LeaderboardSection userId={userId} />}
    </div>
  );
}
