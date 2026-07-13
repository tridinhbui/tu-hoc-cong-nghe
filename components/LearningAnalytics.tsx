"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
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
  if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 45) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

function insightFromAnalytics(analytics: LearningAnalyticsType) {
  const insights: string[] = [];

  if (analytics.recentMomentum.last7DaysLessons >= 3) {
    insights.push(`Bạn đang có đà tốt với ${analytics.recentMomentum.last7DaysLessons} bài trong 7 ngày qua.`);
  } else if (analytics.recentMomentum.last7DaysLessons === 0) {
    insights.push("7 ngày qua chưa có bài hoàn thành mới, nên khởi động lại bằng một bài ngắn.");
  } else {
    insights.push(`7 ngày qua bạn hoàn thành ${analytics.recentMomentum.last7DaysLessons} bài, chỉ cần thêm 1-2 bài nữa là nhịp sẽ rõ hơn.`);
  }

  if (analytics.bestStudyHour !== null) {
    insights.push(`Khung giờ học quen thuộc nhất hiện tại là ${formatHour(analytics.bestStudyHour)} (${analytics.peakStudyWindow}).`);
  }

  if (analytics.notes.totalNotes > 0) {
    insights.push(`Bạn đã có ${analytics.notes.totalNotes} ghi chú trên ${analytics.notes.lessonsWithNotes} bài, đây là nền rất tốt để ôn lại.`);
  }

  if (analytics.completionRate < 60 && analytics.totalLessonsStarted >= 3) {
    insights.push(`Tỷ lệ hoàn thành đang là ${analytics.completionRate}%, có thể ưu tiên kết thúc các bài đã mở trước khi nhảy sang bài mới.`);
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
      className="relative overflow-hidden rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-5 shadow-[0_18px_50px_-30px_rgba(28,25,23,0.35)]"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${accent}`} />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-black text-stone-950 dark:text-stone-50">{value}</p>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{hint}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-[28px] sm:rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8">
        <div className="h-6 w-40 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="mt-4 h-10 w-72 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        <div className="mt-3 h-5 w-full max-w-2xl rounded-full bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-36 rounded-3xl bg-stone-200 dark:bg-stone-800" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-96 rounded-[28px] sm:rounded-[32px] bg-stone-200 dark:bg-stone-800" />
        <div className="h-96 rounded-[28px] sm:rounded-[32px] bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

export default function LearningAnalytics() {
  const [analytics, setAnalytics] = useState<LearningAnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
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
      { name: "Cá nhân", value: analytics.lessonsByTrack.personal, color: "#10b981" },
      { name: "Chuyên ngành", value: analytics.lessonsByTrack.professional, color: "#111827" },
      { name: "Bonus", value: analytics.lessonsByTrack.bonus, color: "#f59e0b" },
    ].filter((item) => item.value > 0);
  }, [analytics]);

  const difficultyData = useMemo(() => {
    if (!analytics) return [];
    return [
      { label: "Dễ", value: analytics.lessonsByDifficulty.easy, color: "#10b981" },
      { label: "Trung bình", value: analytics.lessonsByDifficulty.medium, color: "#f59e0b" },
      { label: "Khó", value: analytics.lessonsByDifficulty.hard, color: "#ef4444" },
    ];
  }, [analytics]);

  const studyHourData = useMemo(() => {
    if (!analytics) return [];
    return analytics.studyTimeDistribution.filter((slot) => slot.lessonsCompleted > 0);
  }, [analytics]);

  const insights = useMemo(() => (analytics ? insightFromAnalytics(analytics) : []), [analytics]);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return (
      <div className="rounded-[28px] sm:rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8 text-center text-stone-500 dark:text-stone-400">
        Không có dữ liệu analytics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,250,252,0.94))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),linear-gradient(135deg,_rgba(28,25,23,0.98),_rgba(17,24,39,0.95))] p-5 sm:p-8 shadow-[0_30px_80px_-40px_rgba(28,25,23,0.45)]"
      >
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-600 dark:text-stone-300">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Dashboard học tập
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-stone-50 sm:text-4xl">
              Bức tranh toàn cảnh về cách bạn đang học
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
              Không chỉ là số bài hoàn thành. Phần này cho bạn thấy nhịp học, độ bền streak,
              thời điểm học hiệu quả hơn và những tín hiệu để quay lại đúng chỗ cần cải thiện.
            </p>

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200/80 dark:border-stone-700 bg-white/85 dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-700 dark:text-stone-200"
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>

          <div className="grid w-full min-w-0 gap-4 sm:grid-cols-2 lg:max-w-[320px]">
            <div className="rounded-3xl border border-stone-200/80 dark:border-stone-700 bg-white/85 dark:bg-stone-900/75 p-4 sm:p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                Nhịp 7 ngày
              </p>
              <p className="mt-3 text-3xl font-black text-stone-950 dark:text-stone-50">
                {analytics.recentMomentum.last7DaysLessons}
              </p>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                bài · {analytics.recentMomentum.last7DaysMinutes} phút
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200/80 dark:border-stone-700 bg-white/85 dark:bg-stone-900/75 p-4 sm:p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                Độ ổn định
              </p>
              <p className={`mt-3 text-3xl font-black ${metricTone(analytics.consistencyScore)}`}>
                {analytics.consistencyScore}%
              </p>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                mức hiện diện đều trong 8 tuần gần đây
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Target className="h-5 w-5" />}
          label="Bài hoàn thành"
          value={`${analytics.totalLessonsCompleted}`}
          hint={`${analytics.completionRate}% trên ${analytics.totalLessonsStarted} bài đã mở`}
          accent="bg-emerald-500"
          delay={0.02}
        />
        <MetricCard
          icon={<Award className="h-5 w-5" />}
          label="Tổng XP"
          value={`${analytics.totalXpEarned}`}
          hint={`Level ${analytics.currentLevel} hiện tại`}
          accent="bg-amber-500"
          delay={0.06}
        />
        <MetricCard
          icon={<Brain className="h-5 w-5" />}
          label="Điểm quiz"
          value={`${analytics.averageQuizScore}%`}
          hint={`TB ${analytics.averageMinutesPerLesson} phút cho mỗi bài`}
          accent="bg-sky-500"
          delay={0.1}
        />
        <MetricCard
          icon={<Flame className="h-5 w-5" />}
          label="Chuỗi ngày"
          value={`${analytics.streakDays}`}
          hint={`Kỷ lục ${analytics.longestStreak} ngày liên tiếp`}
          accent="bg-orange-500"
          delay={0.14}
        />
        <MetricCard
          icon={<Clock3 className="h-5 w-5" />}
          label="Thời gian học"
          value={`${analytics.totalTimeSpent} phút`}
          hint={`${analytics.peakStudyWindow} · ${analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : "chưa rõ giờ đỉnh"}`}
          accent="bg-violet-500"
          delay={0.18}
        />
        <MetricCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Xu hướng tuần"
          value={`${analytics.recentMomentum.weeklyTrendPercent > 0 ? "+" : ""}${analytics.recentMomentum.weeklyTrendPercent}%`}
          hint={`${analytics.recentMomentum.last30DaysLessons} bài trong 30 ngày qua`}
          accent="bg-rose-500"
          delay={0.22}
        />
        <MetricCard
          icon={<NotebookPen className="h-5 w-5" />}
          label="Ghi chú"
          value={`${analytics.notes.totalNotes}`}
          hint={`${analytics.notes.lessonsWithNotes} bài có note`}
          accent="bg-indigo-500"
          delay={0.26}
        />
        <MetricCard
          icon={<BookMarked className="h-5 w-5" />}
          label="Đánh dấu thủ công"
          value={`${analytics.manualFlags.totalFlags}`}
          hint="các bài bạn tự xác nhận đã học"
          accent="bg-stone-900 dark:bg-stone-100"
          delay={0.3}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.section
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Weekly Momentum
              </p>
              <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
                Hoạt động 8 tuần gần đây
              </h3>
            </div>
            <div className="rounded-2xl bg-stone-100 dark:bg-stone-800 px-4 py-2 text-sm text-stone-600 dark:text-stone-300">
              Tuần tốt nhất: {weeklyPeak} bài
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.weeklyActivity} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
                <defs>
                  <linearGradient id="weeklyLessons" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#d6d3d1" strokeDasharray="4 4" opacity={0.35} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78716c" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78716c" }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 18,
                    border: "1px solid rgba(214,211,209,0.8)",
                    background: "rgba(255,255,255,0.96)",
                    boxShadow: "0 20px 40px -24px rgba(28,25,23,0.35)",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "lessonsCompleted") return [`${value} bài`, "Hoàn thành"];
                    if (name === "minutesSpent") return [`${value} phút`, "Thời gian"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Tuần bắt đầu ${label}`}
                />
                <Area type="monotone" dataKey="lessonsCompleted" stroke="#059669" strokeWidth={3} fill="url(#weeklyLessons)" />
                <Area type="monotone" dataKey="minutesSpent" stroke="#111827" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          custom={0.12}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              Study Rhythm
            </p>
            <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
              Giờ học quen thuộc
            </h3>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Dựa trên thời điểm bạn hoàn thành bài học, để thấy khung giờ nào đang hợp với bạn nhất.
            </p>
          </div>

          {studyHourData.length === 0 ? (
            <div className="flex h-[320px] items-center justify-center rounded-3xl bg-stone-50 dark:bg-stone-800/50 text-sm text-stone-500 dark:text-stone-400">
              Chưa đủ dữ liệu giờ học để vẽ biểu đồ.
            </div>
          ) : (
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyHourData} margin={{ left: -12, right: 0, top: 12, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#d6d3d1" strokeDasharray="4 4" opacity={0.35} />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(value) => `${value}h`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "#78716c" }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#78716c" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 18,
                      border: "1px solid rgba(214,211,209,0.8)",
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: "0 20px 40px -24px rgba(28,25,23,0.35)",
                    }}
                    formatter={(value: number) => [`${value} bài`, "Hoàn thành"]}
                    labelFormatter={(label) => `Khung giờ ${formatHour(Number(label))}`}
                  />
                  <Bar dataKey="lessonsCompleted" radius={[14, 14, 4, 4]}>
                    {studyHourData.map((entry) => (
                      <Cell
                        key={entry.hour}
                        fill={entry.hour === analytics.bestStudyHour ? "#10b981" : "#111827"}
                        fillOpacity={entry.hour === analytics.bestStudyHour ? 1 : 0.72}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section
          custom={0.16}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Learning Mix
              </p>
              <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
                Bạn học theo track nào nhiều hơn?
              </h3>
            </div>
          </div>

          {trackPieData.length === 0 ? (
            <div className="flex h-[280px] items-center justify-center rounded-3xl bg-stone-50 dark:bg-stone-800/50 text-sm text-stone-500 dark:text-stone-400">
              Chưa có dữ liệu track để hiển thị.
            </div>
          ) : (
            <div className="grid min-w-0 items-center gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trackPieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={92}
                      paddingAngle={3}
                    >
                      {trackPieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 18,
                        border: "1px solid rgba(214,211,209,0.8)",
                        background: "rgba(255,255,255,0.96)",
                        boxShadow: "0 20px 40px -24px rgba(28,25,23,0.35)",
                      }}
                      formatter={(value: number) => [`${value} bài`, "Hoàn thành"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {trackPieData.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{item.name}</span>
                      </div>
                      <span className="text-sm font-black text-stone-900 dark:text-stone-100">{item.value}</span>
                    </div>
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
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Difficulty Balance
              </p>
              <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
                Độ khó bài đã hoàn thành
              </h3>
            </div>
            <div className="rounded-2xl bg-stone-100 dark:bg-stone-800 px-4 py-2 text-sm text-stone-600 dark:text-stone-300">
              {analytics.totalLessonsCompleted} bài
            </div>
          </div>

          <div className="space-y-4">
            {difficultyData.map((item) => {
              const width = analytics.totalLessonsCompleted > 0 ? (item.value / analytics.totalLessonsCompleted) * 100 : 0;
              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-stone-900 dark:text-stone-100">{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-stone-900 dark:text-stone-100">{item.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
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

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                Completion rate
              </p>
              <p className={`mt-3 text-3xl font-black ${metricTone(analytics.completionRate)}`}>
                {analytics.completionRate}%
              </p>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                trên các bài đã bắt đầu
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                Nhịp ghi chú
              </p>
              <p className="mt-3 text-3xl font-black text-stone-950 dark:text-stone-50">
                {analytics.notes.lessonsWithNotes}
              </p>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                bài có note để ôn lại
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.section
          custom={0.24}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
                Note Hotspots
              </p>
              <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
                Bài học được ghi chú nhiều nhất
              </h3>
            </div>
            <Link
              href="/ghi-chu"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 px-4 py-2 text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
            >
              Xem ghi chú
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {analytics.notes.topLessons.length === 0 ? (
            <div className="rounded-3xl bg-stone-50 dark:bg-stone-800/50 px-5 py-6 text-sm text-stone-500 dark:text-stone-400">
              Chưa có ghi chú nào được lưu. Khi bạn note lại ý quan trọng trong bài học, phần này sẽ giúp bạn biết mình đang suy nghĩ nhiều về chủ đề nào nhất.
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.notes.topLessons.map((lesson, index) => (
                <Link
                  key={lesson.lessonId}
                  href={lesson.slug ? `/bai-hoc/${lesson.slug}` : "/ghi-chu"}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 px-4 py-4 transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-stone-900 text-sm font-black text-stone-900 dark:text-stone-100">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">
                        {lesson.title}
                      </p>
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        {lesson.notesCount} ghi chú được lưu ở bài này
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5" />
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
          className="min-w-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 p-4 sm:p-6 shadow-[0_20px_60px_-36px_rgba(28,25,23,0.35)]"
        >
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
              Next Best Actions
            </p>
            <h3 className="mt-2 text-xl font-black text-stone-950 dark:text-stone-50">
              Gợi ý để dùng analytics tốt hơn
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Đóng các bài đang dang dở</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Completion rate của bạn đang là {analytics.completionRate}%. Nếu muốn XP và BXH phản ánh chuẩn hơn, hãy ưu tiên hoàn tất các bài đã mở.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-5 w-5 text-sky-600 dark:text-sky-400" />
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Cố định một khung giờ học</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Hệ thống thấy bạn học tốt nhất vào {analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : "một vài thời điểm rải rác"}. Giữ khung này đều 2-3 buổi/tuần sẽ giúp streak bền hơn.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-4">
              <div className="flex items-start gap-3">
                <NotebookPen className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">Biến ghi chú thành lợi thế ôn tập</p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Bạn đang có {analytics.notes.totalNotes} ghi chú. Hãy quay lại các bài note nhiều nhất để tổng hợp thành checklist hoặc nguyên tắc cá nhân.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-3 font-bold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Tiếp tục học
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ghi-chu"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-3 font-bold text-stone-900 dark:text-stone-100 transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50"
            >
              Mở ghi chú
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
