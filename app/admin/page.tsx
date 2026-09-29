import Link from "next/link";
import {
  MessageSquare,
  Users,
  BookOpen,
  Clock,
  FileText,
  TrendingUp,
  Award,
  BookMarked,
  BarChart3,
} from "lucide-react";
import { getUnreadMessageCount } from "@/lib/admin/messages";
import { getUnreadChatCount } from "@/lib/admin/chat";
import { getUserCount } from "@/lib/admin/users";
import { getLessonCount } from "@/lib/admin/lessons";
import { getPendingUnlockCount } from "@/lib/admin/unlock-requests";
import { getDocumentCount, getPendingDocumentCount } from "@/lib/admin/documents";
import { getPendingAppealCount } from "@/lib/admin/appeals";
import { getOpenBugReportCount } from "@/lib/admin/bugs";
import { getSystemAnalytics } from "@/lib/admin/analytics";
import { getFeatureEventStats } from "@/lib/admin/feature-events";
import FeatureEventsPanel from "@/components/admin/FeatureEventsPanel";
import WorldUsagePanel from "@/components/admin/WorldUsagePanel";
import LessonFunnelPanel from "@/components/admin/LessonFunnelPanel";
import { getLessonFunnel, type LessonFunnel } from "@/lib/admin/lesson-funnel";
import { getWorldUsage, type WorldUsage } from "@/lib/admin/world-usage";
import NeedsActionPanel from "@/components/admin/NeedsActionPanel";
import { panel } from "@/components/ui/system";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary, format } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const ta = t.adminTwo.adminOverview;
  const [
    unreadMessages,
    unreadChat,
    userCount,
    lessonCount,
    pendingUnlocks,
    documentCount,
    pendingDocuments,
    pendingAppeals,
    openBugReports,
    analyticsResult,
    featureEventStats,
    worldUsage,
    lessonFunnel,
  ] = await Promise.all([
    getUnreadMessageCount().catch(() => 0),
    getUnreadChatCount().catch(() => 0),
    getUserCount().catch(() => 0),
    getLessonCount().catch(() => 0),
    getPendingUnlockCount().catch(() => 0),
    getDocumentCount().catch(() => 0),
    getPendingDocumentCount().catch(() => 0),
    getPendingAppealCount().catch(() => 0),
    getOpenBugReportCount().catch(() => 0),
    getSystemAnalytics().catch(() => null),
    getFeatureEventStats(30).catch(() => []),
    // Bảng này không được phép làm hỏng cả trang admin nếu bảng chưa tồn tại -
    // getWorldUsage đã tự trả về trạng thái "không đọc được" thay vì ném lỗi,
    // catch ở đây chỉ là lớp cuối.
    getWorldUsage().catch(
      (e: Error): WorldUsage => ({
        available: false,
        reason: e.message,
        rows: [],
        totalMinutes: 0,
        totalLearners: 0,
      })
    ),
    getLessonFunnel().catch(
      (e: Error): LessonFunnel => ({
        available: false,
        reason: e.message,
        rows: [],
        totalOpens: 0,
        whySplit: null,
        minOpensForSplit: 0,
      })
    ),
  ]);

  const overviewCards = [
    {
      href: "/admin/messages",
      label: ta.cards.unreadMessages,
      value: unreadMessages + unreadChat,
      icon: MessageSquare,
    },
    {
      href: "/admin/users",
      label: ta.cards.totalUsers,
      value: userCount,
      icon: Users,
    },
    {
      href: "/admin/lessons",
      label: ta.cards.totalLessons,
      value: lessonCount,
      icon: BookOpen,
    },
    {
      href: "/admin/lessons",
      label: ta.cards.pendingUnlocks,
      value: pendingUnlocks,
      icon: Clock,
    },
    {
      href: "/admin/documents",
      label: ta.cards.documents,
      value: documentCount,
      icon: FileText,
    },
  ];

  const analytics = analyticsResult;
  const totalUsers = analytics?.totalUsers || userCount || 0;
  const activeThisWeek = analytics?.activeUsersThisWeek || 0;
  const personalCount = analytics?.trackBreakdown.personal || 0;
  const professionalCount = analytics?.trackBreakdown.professional || 0;
  const certificationCount = analytics?.trackBreakdown.certification || 0;

  const personalPct = totalUsers ? Math.round((personalCount / totalUsers) * 100) : 0;
  const professionalPct = totalUsers ? Math.round((professionalCount / totalUsers) * 100) : 0;
  const certificationPct = totalUsers ? Math.round((certificationCount / totalUsers) * 100) : 0;

  const dauData = analytics?.dailyActiveUsers || [];
  const maxDau = Math.max(...dauData.map((d) => d.count), 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ink mb-1 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-ink-soft" />
          {ta.title}
        </h1>
        <p className="text-sm text-ink-muted">
          {ta.subtitle}
        </p>
      </div>

      {/* Needs Action - the one panel that's a to-do list, not a history */}
      <NeedsActionPanel
        pendingAppeals={pendingAppeals}
        openBugReports={openBugReports}
        pendingUnlocks={pendingUnlocks}
        pendingDocuments={pendingDocuments}
        unreadMessages={unreadMessages + unreadChat}
      />

      {/* Overview Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`${panel} p-5 hover:border-line-firm transition-colors`}
            >
              <div className="w-9 h-9 rounded-sm border border-line-strong flex items-center justify-center mb-3">
                <Icon className="w-4.5 h-4.5 text-ink-soft" />
              </div>
              <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{card.value}</p>
              <p className="text-xs font-semibold text-ink-muted mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Analytics KPI Performance Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${panel} p-5 flex flex-col justify-between`}>
          <div>
            <p className="eyebrow text-ink-muted mb-1.5">
              {ta.kpis.activeThisWeek}
            </p>
            <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{activeThisWeek}</p>
          </div>
          <div className="flex justify-end mt-2">
            <TrendingUp className="text-ink-faint w-5 h-5" />
          </div>
        </div>

        <div className={`${panel} p-5 flex flex-col justify-between`}>
          <div>
            <p className="eyebrow text-ink-muted mb-1.5">
              {ta.kpis.lessonsCompleted}
            </p>
            <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{analytics?.totalLessonsCompleted || 0}</p>
          </div>
          <div className="flex justify-end mt-2">
            <BookOpen className="text-ink-faint w-5 h-5" />
          </div>
        </div>

        <div className={`${panel} p-5 flex flex-col justify-between`}>
          <div>
            <p className="eyebrow text-ink-muted mb-1.5">
              {ta.kpis.avgQuizScore}
            </p>
            <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{analytics?.avgQuizScore || 0}%</p>
          </div>
          <div className="flex justify-end mt-2">
            <Award className="text-ink-faint w-5 h-5" />
          </div>
        </div>

        <div className={`${panel} p-5 flex flex-col justify-between`}>
          <div>
            <p className="eyebrow text-ink-muted mb-1.5">
              {ta.kpis.avgStudyTime}
            </p>
            <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">{analytics?.avgStudyTimeMinutes || 0} {ta.minutesUnit}</p>
          </div>
          <div className="flex justify-end mt-2">
            <Clock className="text-ink-faint w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: DAU Visual Chart */}
        <div className={`lg:col-span-2 ${panel} p-5`}>
          <h2 className="eyebrow text-ink-soft border-b border-line-strong pb-2 mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" />
            {ta.dauHeading}
          </h2>

          {dauData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-ink-faint">
              {ta.noActivityData}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2 border-b border-l border-line-soft">
                {dauData.map((day, idx) => {
                  const barHeightPercent = Math.round((day.count / maxDau) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                      <div className="font-mono text-[10px] font-medium tabular-nums text-ink-heading opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                        {day.count}
                      </div>
                      <div
                        style={{ height: `${Math.max(barHeightPercent, 4)}%` }}
                        className="w-full bg-brand-600 dark:bg-brand-500 rounded-t-xs group-hover:bg-brand-700 dark:group-hover:bg-brand-300 transition-colors"
                      />
                      <div className="font-mono text-[9px] tabular-nums text-ink-muted mt-2 truncate w-full text-center">
                        {day.date.split("-").slice(1).join("/")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Track Breakdown */}
        <div className={`${panel} p-5 flex flex-col justify-between`}>
          <div>
            <h2 className="eyebrow text-ink-soft border-b border-line-strong pb-2 mb-4 flex items-center gap-1.5">
              {ta.trackRatioHeading}
            </h2>
            <div className="space-y-4">
              <div className="h-4 w-full rounded-xs overflow-hidden flex bg-surface-raised">
                <div style={{ width: `${personalPct}%` }} className="bg-brand-600 dark:bg-brand-500" title={format(ta.trackTitles.personal, { pct: personalPct })} />
                <div style={{ width: `${professionalPct}%` }} className="bg-stone-500" title={format(ta.trackTitles.professional, { pct: professionalPct })} />
                <div style={{ width: `${certificationPct}%` }} className="bg-stone-300 dark:bg-stone-600" title={format(ta.trackTitles.certification, { pct: certificationPct })} />
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-brand-600 dark:bg-brand-500 shrink-0" />
                    <span className="text-ink-soft">{ta.trackNames.personal}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-ink-max">{personalCount} ({personalPct}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-stone-500 shrink-0" />
                    <span className="text-ink-soft">{ta.trackNames.professional}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-ink-max">{professionalCount} ({professionalPct}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-stone-300 dark:bg-stone-600 shrink-0" />
                    <span className="text-ink-soft">{ta.trackNames.certification}</span>
                  </div>
                  <span className="font-mono font-medium tabular-nums text-ink-max">{certificationCount} ({certificationPct}%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-line-soft text-[10px] text-ink-faint text-center">
            {format(ta.totalAccountsFooter, { total: totalUsers })}
          </div>
        </div>
      </div>

      {/* Top Lessons & System Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Popular Lessons (2 cols) */}
        <div className={`lg:col-span-2 ${panel} p-5`}>
          <h2 className="eyebrow text-ink-soft border-b border-line-strong pb-2 mb-4 flex items-center gap-1.5">
            <BookMarked className="w-4 h-4" />
            {ta.topLessonsHeading}
          </h2>
          {!analytics?.topLessons || analytics.topLessons.length === 0 ? (
            <p className="text-xs text-ink-muted">{ta.noLessonData}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line-strong text-ink-muted font-bold uppercase tracking-wider">
                    <th className="py-2.5">{ta.tableHeaders.lesson}</th>
                    <th className="py-2.5 text-center">{ta.tableHeaders.completions}</th>
                    <th className="py-2.5 text-right">{ta.tableHeaders.avgScore}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {analytics.topLessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-surface transition-colors">
                      <td className="py-3 font-semibold text-ink">
                        {lesson.slug ? (
                          <Link href={`/bai-hoc/${lesson.slug}`} className="underline-offset-4 hover:underline hover:text-accent-strong">
                            {lesson.title}
                          </Link>
                        ) : (
                          lesson.title
                        )}
                      </td>
                      <td className="py-3 text-center font-mono font-medium tabular-nums text-ink-body">
                        {lesson.completions}
                      </td>
                      <td className="py-3 text-right font-mono font-medium tabular-nums text-ink-max">
                        {lesson.avgScore}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Study metrics summary */}
        <div className={`${panel} p-5`}>
          <h2 className="eyebrow text-ink-soft border-b border-line-strong pb-2 mb-4">
            {ta.avgPerformanceHeading}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-line pb-2 text-xs">
              <span className="text-ink-soft">{ta.rows.lessonsPerUser}</span>
              <span className="font-mono font-medium tabular-nums text-ink-max">
                {(analytics?.avgLessonsPerUser || 0).toFixed(1)} {ta.rows.lessonsPerUserUnit}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-line pb-2 text-xs">
              <span className="text-ink-soft">{ta.rows.lessonsCompleted}</span>
              <span className="font-mono font-medium tabular-nums text-ink-max">
                {analytics?.totalLessonsCompleted || 0} {ta.rows.lessonsCompletedUnit}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-line pb-2 text-xs">
              <span className="text-ink-soft">{ta.rows.avgStudyTime}</span>
              <span className="font-mono font-medium tabular-nums text-ink-max">
                {analytics?.avgStudyTimeMinutes || 0} {ta.rows.avgStudyTimeUnit}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-ink-soft">{ta.rows.avgQuizScore}</span>
              <span className="font-mono font-medium tabular-nums text-ink-max">
                {analytics?.avgQuizScore || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Click Events Panel */}
      <FeatureEventsPanel stats={featureEventStats} />

      <WorldUsagePanel usage={worldUsage} />
      <LessonFunnelPanel funnel={lessonFunnel} />
    </div>
  );
}
