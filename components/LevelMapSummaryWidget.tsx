"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, Brain, RefreshCcw, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { getUserAnalytics, type LearningAnalytics } from "@/lib/supabase-analytics";

interface LevelMapSummaryWidgetProps {
  userId: string;
}

function trendLabel(percent: number, last7DaysLessons: number) {
  if (last7DaysLessons === 0) return "Chưa có bài mới trong 7 ngày qua";
  if (percent >= 15) return "Đang tiến bộ rõ";
  if (percent <= -15) return "Đang chững lại";
  return "Nhịp học đang ổn định";
}

function trendTone(percent: number, last7DaysLessons: number) {
  if (last7DaysLessons === 0) return "text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800";
  if (percent >= 15) return "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40";
  if (percent <= -15) return "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40";
  return "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40";
}

export default function LevelMapSummaryWidget({ userId }: LevelMapSummaryWidgetProps) {
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || user.id !== userId) return;
        const data = await getUserAnalytics(user.id);
        if (!cancelled) setAnalytics(data);
      } catch (error) {
        console.error("Error loading level map summary:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const weakArea = analytics?.weakAreas?.[0] ?? null;
  const trend = analytics ? trendLabel(analytics.recentMomentum.weeklyTrendPercent, analytics.recentMomentum.last7DaysLessons) : "";
  const trendClass = analytics ? trendTone(analytics.recentMomentum.weeklyTrendPercent, analytics.recentMomentum.last7DaysLessons) : "";

  const studySummary = useMemo(() => {
    if (!analytics) return [];
    return [
      {
        title: "Đã học gì",
        value: `${analytics.totalLessonsCompleted} bài`,
        hint: `${analytics.totalXpEarned} XP · ${analytics.totalTimeSpent} phút`,
        icon: BookOpen,
      },
      {
        title: "Còn yếu chủ đề nào",
        value: weakArea ? weakArea.topic : "Chưa có dữ liệu",
        hint: weakArea ? `${weakArea.lessonsCount} lần lặp lỗi` : "Làm thêm quiz để hệ thống nhận diện",
        icon: Brain,
      },
      {
        title: "Cần ôn lại gì",
        value: analytics.notes.topLessons[0] ? analytics.notes.topLessons[0].title : "Bài vừa học",
        hint: analytics.notes.topLessons[0]
          ? `${analytics.notes.topLessons[0].notesCount} ghi chú - ôn bằng note`
          : "Ôn lại bài mới hoàn thành",
        icon: RefreshCcw,
      },
      {
        title: "Tuần này",
        value: trend,
        hint: `${analytics.recentMomentum.last7DaysLessons} bài · ${analytics.recentMomentum.last7DaysMinutes} phút`,
        icon: TrendingUp,
      },
    ];
  }, [analytics, trend, weakArea]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5 animate-pulse">
        <div className="h-4 w-44 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 rounded-xl bg-stone-100 dark:bg-stone-800" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-rose-800 dark:text-rose-200">Chưa đủ dữ liệu để lập bản đồ cấp độ</p>
            <p className="mt-1 text-xs text-rose-700/90 dark:text-rose-300/90 leading-relaxed">
              Học thêm vài bài, làm quiz đầu vào hoặc mở lại dashboard sau khi có tiến độ mới để hệ thống vẽ đúng lộ trình của bạn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
            Bản đồ Cấp độ Học viên
          </p>
          <h3 className="mt-1.5 text-base font-extrabold text-stone-900 dark:text-stone-100">
            Nhìn nhanh tiến độ, điểm yếu và nhịp học
          </h3>
        </div>
        <Link
          href="/analytics"
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 px-3 py-2 text-[11px] font-extrabold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
        >
          Xem chi tiết
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {studySummary.map((item) => {
          const Icon = item.icon;
          const isTrend = item.title === "Tuần này";
          return (
            <div
              key={item.title}
              className={`rounded-2xl border p-3.5 ${isTrend ? trendClass : "border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {item.hint}
                  </p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/80 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {weakArea && (
        <div className="mt-4 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
            Gợi ý ôn ngay
          </p>
          <p className="mt-2 text-sm font-bold text-stone-900 dark:text-stone-100">
            Chủ đề đang yếu nhất là <span className="text-amber-700 dark:text-amber-300">{weakArea.topic}</span>
          </p>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Ưu tiên làm lại một quiz ngắn, đọc lại bài liên quan và đối chiếu ngay note hoặc flashcard của bài đó.
          </p>
        </div>
      )}
    </section>
  );
}
