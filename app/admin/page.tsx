import Link from "next/link";
import {
  MessageSquare,
  Users,
  BookOpen,
  Clock,
  FileText,
  TrendingUp,
  Award,
  Sparkles,
  BookMarked,
  BarChart3,
} from "lucide-react";
import { getUnreadMessageCount } from "@/lib/admin/messages";
import { getUnreadChatCount } from "@/lib/admin/chat";
import { getUserCount } from "@/lib/admin/users";
import { getLessonCount } from "@/lib/admin/lessons";
import { getPendingUnlockCount } from "@/lib/admin/unlock-requests";
import { getDocumentCount } from "@/lib/admin/documents";
import { getSystemAnalytics } from "@/lib/admin/analytics";
import { getFeatureEventStats } from "@/lib/admin/feature-events";
import FeatureEventsPanel from "@/components/admin/FeatureEventsPanel";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [
    unreadMessages,
    unreadChat,
    userCount,
    lessonCount,
    pendingUnlocks,
    documentCount,
    analyticsResult,
    featureEventStats,
  ] = await Promise.all([
    getUnreadMessageCount().catch(() => 0),
    getUnreadChatCount().catch(() => 0),
    getUserCount().catch(() => 0),
    getLessonCount().catch(() => 0),
    getPendingUnlockCount().catch(() => 0),
    getDocumentCount().catch(() => 0),
    getSystemAnalytics().catch(() => null),
    getFeatureEventStats(30).catch(() => []),
  ]);

  const overviewCards = [
    {
      href: "/admin/messages",
      label: "Tin nhắn chưa đọc",
      value: unreadMessages + unreadChat,
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      href: "/admin/users",
      label: "Tổng người dùng",
      value: userCount,
      icon: Users,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      href: "/admin/lessons",
      label: "Tổng bài học",
      value: lessonCount,
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      href: "/admin/lessons",
      label: "Yêu cầu mở khóa chờ duyệt",
      value: pendingUnlocks,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      href: "/admin/documents",
      label: "Tài liệu giveaway",
      value: documentCount,
      icon: FileText,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
  ];

  const analytics = analyticsResult;
  const totalUsers = analytics?.totalUsers || userCount || 0;
  const activeThisWeek = analytics?.activeUsersThisWeek || 0;
  const personalCount = analytics?.trackBreakdown.personal || 0;
  const professionalCount = analytics?.trackBreakdown.professional || 0;
  const cfaCount = analytics?.trackBreakdown.cfa || 0;

  const personalPct = totalUsers ? Math.round((personalCount / totalUsers) * 100) : 0;
  const professionalPct = totalUsers ? Math.round((professionalCount / totalUsers) * 100) : 0;
  const cfaPct = totalUsers ? Math.round((cfaCount / totalUsers) * 100) : 0;

  const dauData = analytics?.dailyActiveUsers || [];
  const maxDau = Math.max(...dauData.map((d) => d.count), 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-500" />
          Tổng quan & Phân tích Hệ Thống
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Trạng thái tổng thể, chỉ số phân tích người dùng & hiệu suất học tập realtime.
        </p>
      </div>

      {/* Overview Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 hover:border-stone-400 dark:hover:border-stone-600 transition-all shadow-xs"
            >
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{card.value}</p>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Analytics KPI Performance Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl p-5 border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1.5">
              Đăng nhập tuần này (Active)
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{activeThisWeek}</p>
          </div>
          <div className="flex justify-end mt-2">
            <TrendingUp className="text-emerald-600 dark:text-emerald-400 w-5 h-5 opacity-70" />
          </div>
        </div>

        <div className="rounded-xl p-5 border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1.5">
              Bài học hoàn thành
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{analytics?.totalLessonsCompleted || 0}</p>
          </div>
          <div className="flex justify-end mt-2">
            <BookOpen className="text-purple-600 dark:text-purple-400 w-5 h-5 opacity-70" />
          </div>
        </div>

        <div className="rounded-xl p-5 border border-orange-100 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/20 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1.5">
              Điểm Quiz trung bình
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{analytics?.avgQuizScore || 0}%</p>
          </div>
          <div className="flex justify-end mt-2">
            <Award className="text-orange-600 dark:text-orange-400 w-5 h-5 opacity-70" />
          </div>
        </div>

        <div className="rounded-xl p-5 border border-pink-100 dark:border-pink-900/50 bg-pink-50/50 dark:bg-pink-950/20 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1.5">
              Thời gian học TB
            </p>
            <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{analytics?.avgStudyTimeMinutes || 0} phút</p>
          </div>
          <div className="flex justify-end mt-2">
            <Clock className="text-pink-600 dark:text-pink-400 w-5 h-5 opacity-70" />
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: DAU Visual Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Lượng hoạt động hàng ngày (7 ngày gần nhất)
          </h2>

          {dauData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-xs text-stone-400">
              Không có dữ liệu hoạt động.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2 border-b border-l border-stone-100 dark:border-stone-800">
                {dauData.map((day, idx) => {
                  const barHeightPercent = Math.round((day.count / maxDau) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                      <div className="text-[10px] font-bold text-stone-850 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                        {day.count}
                      </div>
                      <div
                        style={{ height: `${Math.max(barHeightPercent, 4)}%` }}
                        className="w-full bg-emerald-500/80 dark:bg-emerald-600/80 rounded-t-sm group-hover:bg-emerald-500 transition-colors"
                      />
                      <div className="text-[9px] text-stone-500 dark:text-stone-400 mt-2 truncate w-full text-center">
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
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Tỷ lệ chọn lộ trình học
            </h2>
            <div className="space-y-4">
              <div className="h-5 w-full rounded-full overflow-hidden flex bg-stone-100 dark:bg-stone-800">
                <div style={{ width: `${personalPct}%` }} className="bg-blue-500" title={`Cá nhân: ${personalPct}%`} />
                <div style={{ width: `${professionalPct}%` }} className="bg-purple-500" title={`Chuyên ngành: ${professionalPct}%`} />
                <div style={{ width: `${cfaPct}%` }} className="bg-amber-500" title={`CFA: ${cfaPct}%`} />
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-stone-600 dark:text-stone-400">Tài chính cá nhân</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{personalCount} ({personalPct}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    <span className="text-stone-600 dark:text-stone-400">Tài chính chuyên ngành</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{professionalCount} ({professionalPct}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-stone-600 dark:text-stone-400">CFA Level 1</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{cfaCount} ({cfaPct}%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-450 text-center">
            Tổng cộng: {totalUsers} tài khoản người học.
          </div>
        </div>
      </div>

      {/* Top Lessons & System Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Popular Lessons (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-indigo-500" />
            Top 5 bài học phổ biến nhất
          </h2>
          {!analytics?.topLessons || analytics.topLessons.length === 0 ? (
            <p className="text-xs text-stone-500 dark:text-stone-400">Chưa có dữ liệu bài học hoàn thành.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-500 font-bold uppercase tracking-wider">
                    <th className="py-2.5">Bài học</th>
                    <th className="py-2.5 text-center">Lượt học xong</th>
                    <th className="py-2.5 text-right">Điểm quiz TB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50 dark:divide-stone-800/50">
                  {analytics.topLessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition-colors">
                      <td className="py-3 font-semibold text-stone-900 dark:text-stone-100">
                        {lesson.slug ? (
                          <Link href={`/bai-hoc/${lesson.slug}`} className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400">
                            {lesson.title}
                          </Link>
                        ) : (
                          lesson.title
                        )}
                      </td>
                      <td className="py-3 text-center font-bold text-stone-700 dark:text-stone-300">
                        {lesson.completions}
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
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
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4">
            Hiệu suất trung bình
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-stone-50 dark:border-stone-800/50 pb-2 text-xs">
              <span className="text-stone-600 dark:text-stone-400">Bài học / người dùng</span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {(analytics?.avgLessonsPerUser || 0).toFixed(1)} bài
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-50 dark:border-stone-800/50 pb-2 text-xs">
              <span className="text-stone-600 dark:text-stone-400">Lượng bài học hoàn tất</span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {analytics?.totalLessonsCompleted || 0} bài
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-50 dark:border-stone-800/50 pb-2 text-xs">
              <span className="text-stone-600 dark:text-stone-400">Thời gian tự học TB</span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {analytics?.avgStudyTimeMinutes || 0} phút / bài
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-600 dark:text-stone-400">Điểm số Quiz TB</span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {analytics?.avgQuizScore || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Click Events Panel */}
      <FeatureEventsPanel stats={featureEventStats} />
    </div>
  );
}
