import { Users, BookOpen, TrendingUp, Clock, Award, BookMarked, Sparkles } from "lucide-react";
import { getSystemAnalytics } from "@/lib/admin/analytics";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  let analytics = null;
  let error = null;

  try {
    analytics = await getSystemAnalytics();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load analytics";
  }

  const totalUsers = analytics?.totalUsers || 0;
  const activeThisWeek = analytics?.activeUsersThisWeek || 0;
  const personalCount = analytics?.trackBreakdown.personal || 0;
  const professionalCount = analytics?.trackBreakdown.professional || 0;
  const cfaCount = analytics?.trackBreakdown.cfa || 0;

  // Percentages for tracks
  const personalPct = totalUsers ? Math.round((personalCount / totalUsers) * 100) : 0;
  const professionalPct = totalUsers ? Math.round((professionalCount / totalUsers) * 100) : 0;
  const cfaPct = totalUsers ? Math.round((cfaCount / totalUsers) * 100) : 0;

  const statCards = [
    {
      label: "Tổng người dùng",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50/50 dark:bg-blue-950/20",
      border: "border-blue-100 dark:border-blue-900/50",
    },
    {
      label: "Đăng nhập tuần này (Active)",
      value: activeThisWeek,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
      border: "border-emerald-100 dark:border-emerald-900/50",
    },
    {
      label: "Bài học hoàn thành",
      value: analytics?.totalLessonsCompleted || 0,
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50/50 dark:bg-purple-950/20",
      border: "border-purple-100 dark:border-purple-900/50",
    },
    {
      label: "Điểm quiz trung bình",
      value: `${analytics?.avgQuizScore || 0}%`,
      icon: Award,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50/50 dark:bg-orange-950/20",
      border: "border-orange-100 dark:border-orange-900/50",
    },
    {
      label: "Thời gian học TB",
      value: `${analytics?.avgStudyTimeMinutes || 0} phút`,
      icon: Clock,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50/50 dark:bg-pink-950/20",
      border: "border-pink-100 dark:border-pink-900/50",
    },
  ];

  // Daily Active Users Chart Configuration
  const dauData = analytics?.dailyActiveUsers || [];
  const maxDau = Math.max(...dauData.map((d) => d.count), 5); // Fallback to 5 to avoid division by zero or super tiny charts

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Phân tích Hệ Thống</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Chỉ số hiệu suất, hoạt động người dùng và phân bổ bài học thực tế.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-400 text-sm">
          Lỗi tải số liệu: {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`rounded-xl p-5 border ${card.border} ${card.bg} flex flex-col justify-between`}>
              <div>
                <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1.5">{card.label}</p>
                <p className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">{card.value}</p>
              </div>
              <div className="flex justify-end mt-2">
                <Icon className={`${card.color} w-5 h-5 opacity-70`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: DAU Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm">
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
              {/* SVG Visual Chart */}
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
                        {day.date.split("-").slice(1).join("/")} {/* Format as MM/DD */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Track Breakdown */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Tỷ lệ chọn lộ trình học
            </h2>
            <div className="space-y-4">
              {/* Stacked Horizontal Bar Chart */}
              <div className="h-5 w-full rounded-full overflow-hidden flex bg-stone-100 dark:bg-stone-800">
                <div style={{ width: `${personalPct}%` }} className="bg-blue-500" title={`Cá nhân: ${personalPct}%`} />
                <div style={{ width: `${professionalPct}%` }} className="bg-purple-500" title={`Chuyên ngành: ${professionalPct}%`} />
                <div style={{ width: `${cfaPct}%` }} className="bg-amber-500" title={`CFA: ${cfaPct}%`} />
              </div>

              {/* Legends with detailed numbers */}
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
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-indigo-500" />
            Top 5 bài học phổ biến nhất
          </h2>
          {(!analytics?.topLessons || analytics.topLessons.length === 0) ? (
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
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm">
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
    </div>
  );
}
