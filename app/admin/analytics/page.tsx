"use server";

import { Users, BookOpen, TrendingUp, Clock, Award } from "lucide-react";
import { getSystemAnalytics } from "@/lib/admin/analytics";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  let analytics = null;
  let error = null;

  try {
    analytics = await getSystemAnalytics();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load analytics";
  }

  const statCards = [
    {
      label: "Tổng người dùng",
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      label: "Active tuần này",
      value: analytics?.activeUsersThisWeek || 0,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      label: "Bài học hoàn thành",
      value: analytics?.totalLessonsCompleted || 0,
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      label: "Điểm quiz trung bình",
      value: `${analytics?.avgQuizScore || 0}%`,
      icon: Award,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/40",
    },
    {
      label: "Thời học trung bình",
      value: `${analytics?.avgStudyTimeMinutes || 0} phút`,
      icon: Clock,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-950/40",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Phân tích</h1>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Thống kê tổng quan toàn hệ thống
      </p>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
          Lỗi: {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`${card.bg} rounded-lg p-6 border border-stone-200 dark:border-stone-800`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-1">{card.label}</p>
                  <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{card.value}</p>
                </div>
                <Icon className={`${card.color} w-8 h-8 opacity-75`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Metrics */}
        <div className="bg-white dark:bg-stone-900 rounded-lg p-6 border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Thống kê trung bình</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-stone-600 dark:text-stone-400">Bài học/người dùng</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {(analytics?.avgLessonsPerUser || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600 dark:text-stone-400">Thời học trung bình</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {Math.round(analytics?.avgStudyTimeMinutes || 0)} phút
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-600 dark:text-stone-400">Điểm quiz trung bình</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {analytics?.avgQuizScore || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Retention Rate */}
        <div className="bg-white dark:bg-stone-900 rounded-lg p-6 border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Tỷ lệ giữ chân người dùng</h2>
          <div className="space-y-3">
            {analytics?.userRetention.map((item) => (
              <div key={item.week} className="flex justify-between items-center">
                <span className="text-stone-600 dark:text-stone-400">Tuần {item.week}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Active Users */}
      {analytics?.dailyActiveUsers && analytics.dailyActiveUsers.length > 0 && (
        <div className="mt-6 bg-white dark:bg-stone-900 rounded-lg p-6 border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Người dùng hoạt động hàng ngày (7 ngày gần nhất)</h2>
          <div className="space-y-2">
            {analytics.dailyActiveUsers.map((day, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-stone-600 dark:text-stone-400">{day.date}</span>
                <span className="font-medium text-stone-900 dark:text-stone-100">{day.count} người</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
