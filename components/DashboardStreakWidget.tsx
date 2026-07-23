"use client";

import { useEffect, useState } from "react";
import { Flame, ShieldCheck, Snowflake, Sparkles, X, Info, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getRemainingStreakFreezes,
  freezeStreakManually,
  MAX_STREAK_FREEZES,
  type UserStreak,
} from "@/lib/supabase-streak";

export default function DashboardStreakWidget({ userId }: { userId: string }) {
  const [streak, setStreak] = useState(0);
  const [freezesLeft, setFreezesLeft] = useState(3);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [streakRow, setStreakRow] = useState<UserStreak | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [freezing, setFreezing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getUserStreak(userId)
      .then((streakData) => {
        if (cancelled) return;
        setStreak(streakData?.current_streak || 0);
        setFreezesLeft(getRemainingStreakFreezes(streakData));
        setStreakRow(streakData);
      })
      .catch((error) => console.error("Error loading streak:", error));

    checkActivityToday(userId)
      .then((todayActivity) => {
        if (!cancelled) setHasActivityToday(todayActivity);
      })
      .catch((error) => console.error("Error checking today activity:", error));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleManualFreeze = async () => {
    if (freezesLeft <= 0) {
      toast.error("Bạn đã dùng hết 3 lượt bảo vệ Streak miễn phí!");
      return;
    }
    setFreezing(true);
    try {
      const updated = await freezeStreakManually(userId);
      setStreakRow(updated);
      setFreezesLeft(getRemainingStreakFreezes(updated));
      setHasActivityToday(true);
      toast.success("🧊 Đã kích hoạt Freeze Streak! Chuỗi ngày của bạn an toàn cho hôm nay.");
    } catch (error) {
      console.error("Error freezing streak:", error);
      toast.error(error instanceof Error ? error.message : "Khôi phục/Đóng băng chuỗi thất bại");
    } finally {
      setFreezing(false);
    }
  };

  return (
    <>
      {/* Interactive Streak Card Button */}
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-1.5 shadow-2xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer group select-none"
        title="Bấm để xem cơ chế Bảo vệ & Freeze Streak"
      >
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${streak > 0 ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-2xs" : "bg-stone-100 dark:bg-stone-800 text-stone-400"}`}>
          <Flame className={`h-4.5 w-4.5 ${streak > 0 ? "fill-white text-white" : "fill-current"}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Streak</span>
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">ⓘ</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-black leading-none text-orange-600 dark:text-orange-400">{streak} ngày</span>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold leading-none text-sky-600 dark:text-sky-400" title={`${freezesLeft} lượt bảo vệ chuỗi`}>
              <ShieldCheck className="w-3 h-3 text-sky-500" />
              <span>{freezesLeft}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 🧊 STREAK PROTECTION & FREEZE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900 space-y-5">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white shadow-md">
                <Snowflake className="h-6 w-6 animate-spin-slow" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <ShieldCheck className="w-3 h-3 text-sky-600" />
                  Streak Protection System
                </span>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
                  Cơ Chế Bảo Vệ & Đóng Băng Streak
                </h3>
              </div>
            </div>

            {/* Status Summary Pill */}
            <div className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50 dark:from-sky-950/40 dark:to-stone-900 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-stone-900 dark:text-stone-100">Trạng thái bảo vệ hiện tại</p>
                <p className="text-xs font-extrabold text-sky-700 dark:text-sky-300 mt-0.5">
                  Còn <strong>{freezesLeft} / {MAX_STREAK_FREEZES}</strong> lượt bảo vệ miễn phí
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-orange-600 bg-white dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-orange-200 shadow-2xs">
                  🔥 {streak} ngày
                </span>
              </div>
            </div>

            {/* Feature Explanations */}
            <div className="space-y-3">
              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-850/40">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">🛡️ Tự Động Bảo Vệ Bằng Lá Chắn</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    Mỗi tài khoản có sẵn <strong>3 lượt bảo vệ Streak</strong>. Nếu bận 1 ngày không kịp học bài, hệ thống tự động trừ 1 lượt lá chắn để <strong>giữ nguyên chuỗi ngày</strong> mà không bị reset về 0.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-850/40">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">❄️ Chủ Động Băng Hà Chuỗi (Freeze Streak)</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    Chuẩn bị đi du lịch, nghỉ lễ hoặc lịch trình bận rộn? Bạn có thể <strong>chủ động bấm nút Freeze Streak</strong> bên dưới bất cứ lúc nào để bảo vệ Streak an toàn cho ngày hôm nay!
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 flex items-start gap-3 bg-stone-50/50 dark:bg-stone-850/40">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">⚡ Khôi Phục Chuỗi Đã Mất Bằng XP</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    Trong trường hợp đã dùng hết 3 lượt bảo vệ miễn phí, bạn vẫn có thể chuộc lại chuỗi kỷ lục đã mất bất kỳ lúc nào bằng điểm XP thưởng.
                  </p>
                </div>
              </div>
            </div>

            {/* Freeze Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleManualFreeze}
                disabled={freezing || freezesLeft <= 0}
                className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Snowflake className="w-4 h-4" />
                <span>{freezing ? "Đang bảo vệ..." : "🧊 Đóng Băng Chuỗi Ngay (Freeze Streak)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
