"use client";

import { useState, useEffect } from "react";
import { BarChart3, Clock, Target, TrendingUp, Award, Flame } from "lucide-react";
import { getUserAnalytics } from "@/lib/supabase-analytics";
import { createClient } from "@/lib/supabase";
import type { LearningAnalytics } from "@/lib/supabase-analytics";

export default function LearningAnalytics() {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
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

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 animate-pulse">
        <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded"></div>
          <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6 text-center text-stone-500 dark:text-stone-400">
        Không có dữ liệu analytics
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-stone-700 dark:text-stone-300" />
        <h3 className="font-bold text-stone-900 dark:text-stone-100">Thống kê học tập</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Bài hoàn thành</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.totalLessonsCompleted}</p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Tổng XP</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.totalXpEarned}</p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Điểm trung bình</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.averageQuizScore}%</p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Thời gian học</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.totalTimeSpent}p</p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Chuỗi ngày</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.streakDays}</p>
        </div>

        <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase">Level</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analytics.currentLevel}</p>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">Phân bố theo độ khó</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 w-16">Dễ</span>
            <div className="flex-1 h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(analytics.lessonsByDifficulty.easy / Math.max(analytics.totalLessonsCompleted, 1)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100 w-8">{analytics.lessonsByDifficulty.easy}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 w-16">Trung bình</span>
            <div className="flex-1 h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${(analytics.lessonsByDifficulty.medium / Math.max(analytics.totalLessonsCompleted, 1)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100 w-8">{analytics.lessonsByDifficulty.medium}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 w-16">Khó</span>
            <div className="flex-1 h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${(analytics.lessonsByDifficulty.hard / Math.max(analytics.totalLessonsCompleted, 1)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100 w-8">{analytics.lessonsByDifficulty.hard}</span>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div>
        <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">Hoạt động 8 tuần qua</h4>
        <div className="flex items-end gap-2 h-24">
          {analytics.weeklyActivity.map((week, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-stone-200 dark:bg-stone-700 rounded-t transition-all hover:bg-stone-300 dark:hover:bg-stone-600"
                style={{ 
                  height: `${Math.max((week.lessonsCompleted / Math.max(...analytics.weeklyActivity.map(w => w.lessonsCompleted), 1)) * 100, 5)}%` 
                }}
                title={`${week.lessonsCompleted} bài, ${week.xpEarned} XP`}
              />
              <span className="text-[10px] text-stone-500 dark:text-stone-400">T{week.week}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
