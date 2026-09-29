"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Clock3,
  Flame,
  NotebookPen,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { getUserAnalytics } from "@/lib/cloudflare-analytics";
import type { LearningAnalytics as LearningAnalyticsType } from "@/lib/cloudflare-analytics";
import LeaderboardSection from "@/components/analytics/LeaderboardSection";
import { APP_SYS } from "@/components/analytics/system-codes";
import { SectionHead, StatusDot, btnPrimary, btnSecondary, panel, tabClass, textLink } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { getCurrentUser } from "@/lib/current-user";

/*
 * Cùng ngôn ngữ với trang chủ (xem components/ui/system.tsx): khung viền 1px,
 * không bóng, không dải gradient trang trí trên đầu thẻ. Số liệu đi bằng mono
 * tabular-nums; xanh chỉ tô dữ liệu chính trên biểu đồ và tab đang mở - các
 * chuỗi phụ đi bằng sắc độ đá (stone) thay cho cam/tím/vàng.
 */

/* Màu biểu đồ: brand-600 cho dữ liệu chính, hai sắc độ đá cho phần còn lại. */
const CHART_BRAND = "#417acd";
const CHART_STONE = "#78716c";
const CHART_STONE_LIGHT = "#a8a29e";
const CHART_STONE_DARK = "#44403c";

function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

const panelClass = `min-w-0 overflow-hidden ${panel}`;
type AnalyticsSection = "overview" | "knowledge" | "memory" | "competency" | "leaderboard";

const eyebrowClass = "text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted";

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
      <div className="z-50 space-y-1 rounded-sm border border-line-strong bg-white p-2.5 text-xs dark:border-stone-700 dark:bg-stone-900">
        {formattedLabel && (
          <p className="mb-1 border-b border-line pb-1 font-bold text-ink">
            {formattedLabel}
          </p>
        )}
        {payload.map((item, idx) => {
          const displayVal = formatter ? formatter(item.value, item.name) : item.value;
          const displayName = item.name === "lessonsCompleted" ? t.analytics.seriesLessons : item.name === "minutesSpent" ? t.analytics.seriesMinutes : item.name;
          return (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="font-medium text-ink-muted">{displayName}:</span>
              <span className="font-mono font-medium tabular-nums text-ink-max">{displayVal}</span>
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

/** Ô số liệu: nhãn sans chữ hoa nhỏ, giá trị mono căn thẳng, gợi ý một dòng.
 *  Không dải màu trên đầu, không nhấc lên khi rê chuột. */
function MetricCard({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint: string }) {
  return (
    <div className={`${panel} p-4`}>
      <div className="flex items-center justify-between gap-3 border-b border-line pb-2">
        <p className={eyebrowClass}>{label}</p>
        <span className="shrink-0 text-ink-faint" aria-hidden>
          {icon}
        </span>
      </div>
      <p className="mt-3 font-mono text-2xl font-medium tabular-nums tracking-tight text-ink-max">{value}</p>
      <p className="mt-1 truncate text-xs leading-5 text-ink-muted">{hint}</p>
    </div>
  );
}

function PanelHead({ eyebrow, title, sub, aside }: { eyebrow: string; title: string; sub?: string; aside?: ReactNode }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4 border-b border-line pb-3">
      <div className="min-w-0">
        <p className={eyebrowClass}>{eyebrow}</p>
        <h3 className="mt-1 text-base font-black tracking-tight text-ink-max">{title}</h3>
        {sub && <p className="mt-1 text-xs text-ink-muted">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className={`${panel} p-5`}>
        <div className="h-4 w-40 rounded-xs bg-surface-sunken" />
        <div className="mt-4 h-7 w-72 rounded-xs bg-surface-sunken" />
        <div className="mt-3 h-4 w-full max-w-2xl rounded-xs bg-surface-sunken" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-md border border-line bg-surface-sunken" />
        ))}
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
      { name: t.analytics.trackPersonal, value: analytics.lessonsByTrack.personal, color: CHART_BRAND },
      { name: t.analytics.trackProfessional, value: analytics.lessonsByTrack.professional, color: CHART_STONE_DARK },
      { name: "Bonus", value: analytics.lessonsByTrack.bonus, color: CHART_STONE_LIGHT },
    ].filter((item) => item.value > 0);
  }, [analytics]);

  const difficultyData = useMemo(() => {
    if (!analytics) return [];
    return [
      { label: t.difficulty["Dễ"], value: analytics.lessonsByDifficulty.easy, color: CHART_STONE_LIGHT },
      { label: t.difficulty["Trung bình"], value: analytics.lessonsByDifficulty.medium, color: CHART_STONE },
      { label: t.difficulty["Khó"], value: analytics.lessonsByDifficulty.hard, color: CHART_STONE_DARK },
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
      <div className={`${panel} p-6 text-center text-sm text-ink-muted sm:p-8`}>
        {t.analytics.noData}
      </div>
    );
  }

  const quickStats = [
    {
      label: t.analytics.streakLabel,
      value: format(t.analytics.streakDays, { count: analytics.streakDays }),
      hint: format(t.analytics.streakRecord, { count: analytics.longestStreak }),
    },
    {
      label: t.analytics.quizScoreLabel,
      value: `${analytics.averageQuizScore}%`,
      hint: format(t.analytics.lessonCount, { count: analytics.totalLessonsCompleted }),
    },
    {
      label: t.analytics.studyHourLabel,
      value: analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.hourUnknown,
      hint: t.analytics.peakWindow[analytics.peakStudyWindow],
    },
  ];

  return (
    <div className="space-y-6">
      <section className={`${panel} p-4 sm:p-5`}>
        <SectionHead code={APP_SYS.analytics} eyebrow={t.analytics.personal} title={t.analytics.currentRhythm} size="sm" />

        {insights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-center gap-2 text-sm font-semibold text-ink-body">
                <StatusDot tone={index === 0 ? "brand" : "muted"} />
                {insight}
              </li>
            ))}
          </ul>
        )}

        {/* Ba số nhanh: một bảng ba cột chia bằng đường kẻ 1px. */}
        <dl className="mt-4 grid grid-cols-3 divide-x divide-stone-200 border-y border-line dark:divide-stone-800">
          {quickStats.map((stat) => (
            <div key={stat.label} className="min-w-0 px-2 py-2.5 first:pl-0 sm:px-3">
              <dt className="truncate text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-muted">{stat.label}</dt>
              <dd className="mt-1 whitespace-nowrap font-mono text-base font-medium tabular-nums text-ink-max sm:text-lg">
                {stat.value}
              </dd>
              <dd className="truncate text-[11px] text-ink-muted">{stat.hint}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div role="tablist" className="flex gap-6 overflow-x-auto border-b border-line scrollbar-none">
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
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSection(tab.id)}
              className={`shrink-0 cursor-pointer whitespace-nowrap ${tabClass(isActive)}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={<Flame className="h-4 w-4" />}
              label={t.analytics.cardStreak}
              value={`${analytics.streakDays}`}
              hint={format(t.analytics.streakRecordHint, { count: analytics.longestStreak })}
            />
            <MetricCard
              icon={<Sparkles className="h-4 w-4" />}
              label={t.analytics.cardWeekRhythm}
              value={format(t.analytics.lessonCount, { count: analytics.recentMomentum.last7DaysLessons })}
              hint={format(t.analytics.minutesDone, { count: analytics.recentMomentum.last7DaysMinutes })}
            />
            <MetricCard
              icon={<Clock3 className="h-4 w-4" />}
              label={t.analytics.cardStudyTime}
              value={format(t.analytics.minutesValue, { count: analytics.totalTimeSpent })}
              hint={`${t.analytics.peakWindow[analytics.peakStudyWindow]} · ${analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.hourUnknown}`}
            />
            <MetricCard
              icon={<TrendingUp className="h-4 w-4" />}
              label={t.analytics.cardWeekTrend}
              value={`${analytics.recentMomentum.weeklyTrendPercent > 0 ? "+" : ""}${analytics.recentMomentum.weeklyTrendPercent}%`}
              hint={format(t.analytics.lessons30d, { count: analytics.recentMomentum.last30DaysLessons })}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead
                eyebrow={t.analytics.rhythmEyebrow}
                title={t.analytics.rhythmTitle}
                aside={
                  <span className="shrink-0 font-mono text-xs tabular-nums text-ink-muted">
                    {format(t.analytics.rhythmPeak, { count: weeklyPeak })}
                  </span>
                }
              />
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.weeklyActivity} margin={{ left: -10, right: 0, top: 12, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#e7e5e4" className="dark:stroke-stone-800" opacity={0.6} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: CHART_STONE }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: CHART_STONE }} allowDecimals={false} />
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
                    <Area type="linear" dataKey="lessonsCompleted" stroke={CHART_BRAND} strokeWidth={2} fill={CHART_BRAND} fillOpacity={0.08} />
                    <Area type="linear" dataKey="minutesSpent" stroke={CHART_STONE} strokeWidth={1.5} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead eyebrow={t.analytics.hoursEyebrow} title={t.analytics.hoursTitle} sub={t.analytics.hoursSub} />
              {studyHourData.length === 0 ? (
                <div className="flex h-[240px] items-center justify-center rounded-sm border border-dashed border-line text-xs text-ink-faint">
                  {t.analytics.hoursEmpty}
                </div>
              ) : (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyHourData} margin={{ left: -22, right: 0, top: 12, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#e7e5e4" className="dark:stroke-stone-800" opacity={0.6} />
                      <XAxis
                        dataKey="hour"
                        tickFormatter={(value) => `${value}h`}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: CHART_STONE }}
                      />
                      <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: CHART_STONE }} allowDecimals={false} />
                      <Tooltip
                        content={
                          <CustomTooltip
                            formatter={(value: number | string) => format(t.analytics.lessonsUnit, { count: value })}
                            labelFormatter={(label: number | string) => format(t.analytics.hourBucket, { hour: formatHour(Number(label)) })}
                          />
                        }
                      />
                      <Bar dataKey="lessonsCompleted" radius={[2, 2, 0, 0]}>
                        {studyHourData.map((entry) => (
                          <Cell
                            key={entry.hour}
                            fill={entry.hour === analytics.bestStudyHour ? CHART_BRAND : CHART_STONE_LIGHT}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>
          </div>
        </div>
      )}

      {activeSection === "knowledge" && (
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            <MetricCard
              icon={<Brain className="h-4 w-4" />}
              label={t.analytics.cardAvgQuiz}
              value={`${analytics.averageQuizScore}%`}
              hint={format(t.analytics.avgMinutesPerLesson, { count: analytics.averageMinutesPerLesson })}
            />
            <MetricCard
              icon={<Target className="h-4 w-4" />}
              label={t.analytics.cardCompleted}
              value={`${analytics.totalLessonsCompleted}`}
              hint={format(t.analytics.completionOfStarted, { percent: analytics.completionRate, count: analytics.totalLessonsStarted })}
            />
            <MetricCard
              icon={<CheckCircle2 className="h-4 w-4" />}
              label={t.analytics.cardCompletionRate}
              value={`${analytics.completionRate}%`}
              hint={t.analytics.hintCompletionRatio}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead eyebrow={t.analytics.trackEyebrow} title={t.analytics.trackTitle} />
              {trackPieData.length === 0 ? (
                <div className="flex h-[220px] items-center justify-center rounded-sm border border-dashed border-line text-xs text-ink-faint">
                  {t.analytics.trackEmpty}
                </div>
              ) : (
                <div className="grid min-w-0 items-center gap-6 md:grid-cols-[1fr_1.1fr]">
                  <div className="relative flex h-[230px] items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trackPieData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={62}
                          outerRadius={86}
                          paddingAngle={2}
                          stroke="none"
                        >
                          {trackPieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip formatter={(value: number | string) => format(t.analytics.lessonsUnit, { count: value })} />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-faint">{t.analytics.total}</span>
                      <span className="font-mono text-lg font-medium tabular-nums text-ink-max">
                        {format(t.analytics.lessonCount, { count: analytics.totalLessonsCompleted })}
                      </span>
                    </div>
                  </div>
                  <dl className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                    {trackPieData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-3 py-2 text-sm">
                        <dt className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-[1px]" style={{ backgroundColor: item.color }} aria-hidden />
                          <span className="font-semibold text-ink-body">{item.name}</span>
                        </dt>
                        <dd className="font-mono tabular-nums text-ink-max">{format(t.analytics.lessonCount, { count: item.value })}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </section>

            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead
                eyebrow={t.analytics.difficultyEyebrow}
                title={t.analytics.difficultyTitle}
                aside={
                  <span className="shrink-0 font-mono text-xs tabular-nums text-ink-muted">
                    {format(t.analytics.lessonsDone, { count: analytics.totalLessonsCompleted })}
                  </span>
                }
              />
              <div className="space-y-4">
                {difficultyData.map((item) => {
                  const width = analytics.totalLessonsCompleted > 0 ? (item.value / analytics.totalLessonsCompleted) * 100 : 0;
                  return (
                    <div key={item.label} className="text-xs">
                      <div className="mb-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-[1px]" style={{ backgroundColor: item.color }} aria-hidden />
                          <span className="font-semibold text-ink-body">{item.label}</span>
                        </div>
                        <span className="font-mono tabular-nums text-ink-max">
                          {format(t.analytics.lessonsWithPercent, { count: item.value, percent: Math.round(width) })}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-xs bg-surface-sunken">
                        <div className="h-full" style={{ width: `${width}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}

      {activeSection === "memory" && (
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            <MetricCard
              icon={<NotebookPen className="h-4 w-4" />}
              label={t.analytics.cardTotalNotes}
              value={`${analytics.notes.totalNotes} note`}
              hint={format(t.analytics.lessonsWithNotes, { count: analytics.notes.lessonsWithNotes })}
            />
            <MetricCard
              icon={<BookMarked className="h-4 w-4" />}
              label={t.analytics.cardManualFlags}
              value={format(t.analytics.lessonCount, { count: analytics.manualFlags.totalFlags })}
              hint={t.analytics.hintSelfMarked}
            />
            <MetricCard
              icon={<Award className="h-4 w-4" />}
              label={t.analytics.cardRhythmStability}
              value={`${analytics.consistencyScore}%`}
              hint={t.analytics.hintConsistency}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead
                eyebrow={t.analytics.notesEyebrow}
                title={t.analytics.notesTitle}
                aside={
                  <Link href="/ghi-chu" className={`shrink-0 ${textLink} text-xs`}>
                    {t.analytics.seeAll}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                }
              />

              {analytics.notes.topLessons.length === 0 ? (
                <div className="rounded-sm border border-dashed border-line px-5 py-8 text-center text-xs leading-relaxed text-ink-faint">
                  {t.analytics.notesEmpty}
                </div>
              ) : (
                <ol className="divide-y divide-stone-200 border-y border-line dark:divide-stone-800">
                  {analytics.notes.topLessons.map((lesson, index) => (
                    <li key={lesson.lessonId}>
                      <Link
                        href={lesson.slug ? `/bai-hoc/${lesson.slug}` : "/ghi-chu"}
                        className="group flex items-center justify-between gap-4 px-1 py-2.5 transition-colors hover:bg-surface-raised dark:hover:bg-stone-800/60"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="w-6 shrink-0 text-center font-mono text-xs tabular-nums text-ink-faint">
                            {APP_SYS.rank(index + 1)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink group-hover:text-accent-strong">{lesson.title}</p>
                            <p className="mt-0.5 font-mono text-[11px] tabular-nums text-ink-faint">
                              {format(t.analytics.notesSaved, { count: lesson.notesCount })}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-accent" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className={panelClass + " p-4 sm:p-5"}>
              <PanelHead eyebrow={t.analytics.nextEyebrow} title={t.analytics.nextTitle} />

              <ul className="divide-y divide-stone-200 border-y border-line text-sm dark:divide-stone-800">
                {[
                  {
                    icon: CheckCircle2,
                    title: t.analytics.tipFinishTitle,
                    body: format(t.analytics.tipFinishBody, { rate: analytics.completionRate }),
                  },
                  {
                    icon: BarChart3,
                    title: t.analytics.tipHoursTitle,
                    body: format(t.analytics.tipHoursBody, {
                      hour: analytics.bestStudyHour !== null ? formatHour(analytics.bestStudyHour) : t.analytics.tipHoursFallback,
                    }),
                  },
                  {
                    icon: NotebookPen,
                    title: t.analytics.tipNotesTitle,
                    body: format(t.analytics.tipNotesBody, { count: analytics.notes.totalNotes }),
                  },
                ].map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <li key={tip.title} className="flex items-start gap-2.5 py-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                      <div>
                        <p className="font-bold text-ink-max">{tip.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{tip.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link href="/dashboard" className={btnPrimary}>
                  {t.analytics.continueLearning}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
                <Link href="/ghi-chu" className={btnSecondary}>
                  {t.analytics.openNotes}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeSection === "leaderboard" && <LeaderboardSection userId={userId} />}
    </div>
  );
}
