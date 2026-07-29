"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Flame, BookOpen, Target, TrendingUp, Sparkles } from "lucide-react";
import { getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress, getCfaGateRemaining, LEVELS } from "@/lib/levels";
import { createClient } from "@/lib/supabase";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import { getLevelStats, getCfaCompletedCount, type LevelStats } from "@/lib/supabase-user";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getRemainingStreakFreezes,
  getStreakRestoreOffer,
  restoreStreakWithXp,
  STREAK_RESTORE_XP_COST,
  type UserStreak,
} from "@/lib/supabase-streak";
import { recalculateUserStats } from "@/lib/supabase-user";

interface UserStatsProps {
  xp: number;
  lessonsCompleted: number;
  totalLessons: number;
  avgQuizScore?: number;
  userId?: string;
  sidebar?: boolean;
  embedded?: boolean;
}

const LEVEL_EMOJIS: Record<number, string> = {
  1: "🌱", // Tò mò
  2: "🎒", // Học viên
  3: "💼", // Nhà đầu tư
  4: "📊", // Nhà phân tích
  5: "🛡️", // Cố vấn Tài chính
  6: "👑", // Thạo thủ Tài chính
  7: "🔥", // Chuyên gia Tài chính
  8: "💎", // Bậc thầy Tài chính
  9: "🎓", // Chuyên viên CFA
  10: "🦁", // Huyền thoại Đầu tư
  11: "🏛️", // Giám đốc Quỹ Hedge Fund
  12: "🌐", // Quản lý Danh mục Chiến lược
  13: "🚀", // Bậc thầy Phân tích Thị trường
  14: "⚡", // Lãnh đạo Tài chính Tối cao
  15: "🔱", // Đại Thuyền trưởng Phố Wall
};

import RigorousLevelExamModal from "@/components/RigorousLevelExamModal";
import { LEVEL_EXAMS } from "@/lib/level-exams";

export default function UserStats({
  xp,
  lessonsCompleted,
  totalLessons,
  avgQuizScore = 0,
  userId,
  sidebar = false,
  embedded = false,
}: UserStatsProps) {
  const [cfaCompleted, setCfaCompleted] = useState(0);
  const currentLevel = getLevelByXp(xp, cfaCompleted);
  const nextLevel = getNextLevel(currentLevel.level);
  const xpToNext = getXpToNextLevel(xp, cfaCompleted);
  const progress = getLevelProgress(xp, cfaCompleted);
  const cfaGateRemaining = nextLevel ? getCfaGateRemaining(nextLevel, cfaCompleted) : 0;

  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedExamLevel, setSelectedExamLevel] = useState<number>(2);

  const [levelStats, setLevelStats] = useState<LevelStats | null>(null);
  const [openLevelTooltip, setOpenLevelTooltip] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [freezesLeft, setFreezesLeft] = useState(3);
  const [streakRow, setStreakRow] = useState<UserStreak | null>(null);
  const [restoringStreak, setRestoringStreak] = useState(false);
  const [hasActivityToday, setHasActivityToday] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [userCoins, setUserCoins] = useState<number>(0);
  const [equippedGear, setEquippedGear] = useState<CharacterEquipments>({});
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    const loadActiveTitle = () => {
      if (typeof window !== "undefined") {
        setActiveTitle(window.localStorage.getItem(`thtcdn_active_title_${userId}`));
      }
    };
    loadActiveTitle();

    const handleCoinUpdated = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail?.coins !== undefined) {
        setUserCoins(customEv.detail.coins);
      }
    };

    window.addEventListener("thtcdn_profile_updated", loadActiveTitle);
    window.addEventListener("thtcdn:coin-updated", handleCoinUpdated);
    return () => {
      window.removeEventListener("thtcdn_profile_updated", loadActiveTitle);
      window.removeEventListener("thtcdn:coin-updated", handleCoinUpdated);
    };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    const supabase = createClient();
    
    // Fetch RPG Equipped gear & Coins
    async function loadUserData() {
      try {
        const [{ data: equipData }, { data: profileData }] = await Promise.all([
          supabase.from("user_equipments").select("slot, asset_key").eq("user_id", userId),
          supabase.from("user_profiles").select("coins").eq("id", userId).single(),
        ]);

        if (!cancelled) {
          if (equipData) {
            const gear: CharacterEquipments = {};
            equipData.forEach((e: any) => {
              gear[e.slot as keyof CharacterEquipments] = e.asset_key;
            });
            setEquippedGear(gear);
          }
          if (profileData?.coins !== undefined) {
            setUserCoins(profileData.coins);
          }
        }
      } catch (err) {
        console.error("Error fetching user equipment/coins:", err);
      }
    }
    void loadUserData();

    // Fetch Level Stats
    getLevelStats(userId)
      .then((stats) => {
        if (!cancelled) setLevelStats(stats);
      })
      .catch((error) => console.error("Error loading level stats:", error));

    // L9+ CFA gate - needs to match what recalculateUserStats persisted.
    getCfaCompletedCount(userId)
      .then((count) => {
        if (!cancelled) setCfaCompleted(count);
      })
      .catch((error) => console.error("Error loading CFA completed count:", error));

    // Fetch Streak
    getUserStreak(userId)
      .then((streakData) => {
        if (!cancelled) {
          setStreak(streakData?.current_streak || 0);
          setFreezesLeft(getRemainingStreakFreezes(streakData));
          setStreakRow(streakData);
        }
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

  useEffect(() => {
    if (openLevelTooltip === null) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenLevelTooltip(null);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [openLevelTooltip]);

  const restoreOffer = getStreakRestoreOffer(streakRow);

  async function handleRestoreStreak() {
    if (!userId || restoringStreak) return;
    setRestoringStreak(true);
    try {
      const restored = await restoreStreakWithXp(userId);
      setStreak(restored.current_streak);
      setStreakRow(restored);
      await recalculateUserStats(userId);
      toast.success(`Đã khôi phục chuỗi ${restored.current_streak} ngày! (-${STREAK_RESTORE_XP_COST} XP)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể khôi phục chuỗi.");
    } finally {
      setRestoringStreak(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden transition-all duration-300 group ${
        embedded
          ? `${sidebar ? "p-0" : "p-0"}`
          : `bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm hover:shadow-lg ${sidebar ? "p-4" : "p-4 sm:p-5"}`
      }`}
    >
      {/* Subtle background glow bubbles for gamified accent */}
      {!embedded && <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125" />}
      {!embedded && <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125" />}
      {/* Top accent bar - subtle gradient tied to level progress */}
      {!embedded && <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-70" />}

      <div className={`flex items-center gap-2.5 relative z-10 ${sidebar ? "mb-2" : "mb-4"}`}>
        <motion.div
          whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            toast.success(`✨ Chiến binh Cấp ${currentLevel.level} sẵn sàng chinh phục Phố Wall!`);
          }}
          className="relative shrink-0 cursor-pointer group/avatar"
          title="Bấm để kích hoạt chiến binh!"
        >
          <FinanceCharacterAvatar level={currentLevel.level} equipments={equippedGear} size="xs" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <span className="text-[8px] sm:text-[9px] font-black text-stone-400 dark:text-stone-400 uppercase tracking-widest block leading-none">
            Cấp độ {currentLevel.level} / {LEVELS.length}
          </span>
          <h3 className={`font-black text-stone-950 dark:text-white mt-0.5 tracking-tight leading-none truncate ${
            sidebar ? "text-[15px]" : "text-sm sm:text-base"
          }`}>
            {currentLevel.name}
          </h3>
          {activeTitle && (
            <span className="text-[9px] font-black text-amber-500 dark:text-amber-400 mt-1 block leading-none truncate">
              🏆 {activeTitle}
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className={`inline-flex items-center gap-1 font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-500 dark:to-teal-600 rounded-full shadow-sm shadow-emerald-500/25 ${
            sidebar ? "text-[10px] px-2.5 py-0.5" : "text-[11px] px-3 py-1.5"
          }`}>
            <Sparkles className={sidebar ? "w-2.5 h-2.5" : "w-3 h-3"} />
            {xp} XP
          </span>
        </div>
      </div>

      {/* Mini RPG Status / Wardrobe Widget removed to declutter the card */}

      {/* Level roadmap - horizontally scrollable strip of all levels, so the
          full ladder (now 8 tiers) stays browsable on narrow screens without
          forcing the card taller. Skipped in sidebar mode - too cramped. */}
      {!sidebar && (
        <div className="relative z-10 mb-4 -mx-1 px-1 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 pb-1 w-max min-w-full">
            {LEVELS.map((lvl, idx) => {
              const reached = xp >= lvl.minXp;
              const isCurrent = lvl.level === currentLevel.level;
              return (
                <div key={lvl.level} className="flex items-center gap-2 shrink-0">
                  <div
                    title={`Cấp ${lvl.level}: ${lvl.name} (${lvl.minXp} XP)`}
                    className={`flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 border transition-all ${
                      isCurrent
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm scale-105"
                        : reached
                        ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/10"
                        : "border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/30 opacity-60"
                    }`}
                  >
                    <span className="text-base leading-none">{LEVEL_EMOJIS[lvl.level] || "🌱"}</span>
                    <span className={`text-[8px] font-black uppercase tracking-wide ${isCurrent ? "text-emerald-700 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"}`}>
                      L{lvl.level}
                    </span>
                  </div>
                  {idx < LEVELS.length - 1 && (
                    <div className={`w-4 h-0.5 rounded-full shrink-0 ${reached ? "bg-emerald-400 dark:bg-emerald-600" : "bg-stone-200 dark:bg-stone-800"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modern Stats Grid */}
      <div className={`grid gap-1.5 relative z-10 ${sidebar ? "mb-2.5" : "mb-4"}`}>
        <div className={`grid ${sidebar ? "grid-cols-1" : "grid-cols-2"} gap-2 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/85 ${
          sidebar ? "p-1.5" : "p-3"
        }`}>
          <div className="min-w-0 rounded-xl bg-sky-50/50 dark:bg-sky-950/15 border border-sky-100/70 dark:border-sky-900/30 px-2.5 py-1.5">
            <span className="text-[8px] sm:text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Bài học</span>
            <div className="flex items-center gap-1 mt-1 truncate">
              <BookOpen className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400 shrink-0" />
              <span className={`font-black text-stone-950 dark:text-stone-50 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{lessonsCompleted}</span>
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500">/ {totalLessons}</span>
            </div>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-2 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/85 ${
          sidebar ? "p-1.5" : "p-3"
        }`}>
          <div className="min-w-0 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100/70 dark:border-emerald-900/30 px-2.5 py-1.5">
            <span className="text-[8px] sm:text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Quiz TB</span>
            <div className="flex items-center gap-1 mt-1">
              <Target className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span className={`font-black text-emerald-600 dark:text-emerald-400 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{Math.round(avgQuizScore)}%</span>
            </div>
          </div>
          <div className="min-w-0 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100/70 dark:border-indigo-900/30 px-2.5 py-1.5">
            <span className="text-[8px] sm:text-[9px] font-black text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Tiến cấp</span>
            <div className="flex items-center gap-1 mt-1 truncate">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className={`font-black text-indigo-600 dark:text-indigo-400 ${sidebar ? "text-xs" : "text-sm sm:text-base"}`}>{xpToNext > 0 ? `+${xpToNext} XP` : "Tối đa"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Streak restore offer - shown once all 3 free freezes are used up
          and the streak actually reset, letting the user buy it back with
          XP instead of losing it for good. */}
      {restoreOffer.canRestore && (
        <div className="mt-2.5 p-3 bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-xl flex items-center gap-3 relative z-10">
          <span className="text-xl shrink-0">💔</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
              Bạn vừa mất chuỗi {restoreOffer.lostStreak} ngày
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">Đã hết lượt bảo vệ miễn phí - khôi phục bằng XP?</p>
          </div>
          <button
            onClick={handleRestoreStreak}
            disabled={restoringStreak}
            className="shrink-0 text-[10px] font-black uppercase px-2.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 transition-colors"
          >
            {restoringStreak ? "..." : `-${STREAK_RESTORE_XP_COST} XP`}
          </button>
        </div>
      )}

      {/* Level Progress Bar & Alert Banner */}
      {nextLevel && (
        <div className="mt-0.5 pt-2 border-t border-stone-100 dark:border-stone-800/80 relative z-10">
          <div className="flex items-center justify-between text-[10px] mb-1 font-bold text-stone-500 dark:text-stone-400">
            <span>Tiến độ cấp {currentLevel.level} <span className="text-emerald-600 dark:text-emerald-400">({Math.round(progress)}%)</span></span>
            <span className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300">
              Cấp {nextLevel.level}: {nextLevel.name} <span>{LEVEL_EMOJIS[nextLevel.level] || "🌱"}</span>
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800/70 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 rounded-full transition-all duration-500 relative shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[pulse_1.5s_infinite]" />
            </div>
          </div>

          {!sidebar && (
            <div className="mt-3.5 p-3 bg-stone-50/80 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🎯</span>
                <span>
                  Còn khoảng <span className="font-extrabold text-stone-900 dark:text-stone-100">{Math.max(1, Math.ceil(xpToNext / 20))} bài học</span> (+{xpToNext} XP) để lên cấp!
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🏆</span>
                <span>
                  Sắp mở danh hiệu: <span className="font-extrabold text-amber-600 dark:text-amber-400">{nextLevel.name}</span>
                </span>
              </div>
              {cfaGateRemaining > 0 && (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span className="text-sm shrink-0">🎓</span>
                  <span>
                    Cấp {nextLevel.level} còn yêu cầu hoàn thành thêm <span className="font-extrabold">{cfaGateRemaining} bài/module CFA</span> - đủ XP thôi chưa đủ
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!nextLevel && (
        <div className="mt-2.5 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 relative z-10">
          <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 font-bold">
            <span>👑 Bạn đã đạt cấp độ tối đa! Chúc mừng {currentLevel.name}!</span>
          </div>
        </div>
      )}

      {/* Level Exam Gatekeeper Banner */}
      {nextLevel && (
        <div className="mt-3 relative z-10 pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => {
              setSelectedExamLevel(nextLevel.level);
              setShowExamModal(true);
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs transition-all shadow-md hover:scale-[1.01] cursor-pointer"
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="leading-tight text-white drop-shadow-sm font-extrabold text-[11px]">BÀI THI THĂNG CẤP KHẮT KHE (LEVEL {nextLevel.level})</p>
                <p className="text-[10px] text-emerald-100 font-bold">Cần thi đỗ ≥ {LEVEL_EXAMS[nextLevel.level]?.minPassPercentage || 80}% điểm trắc nghiệm để thăng hạng</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-stone-950 text-emerald-400 text-[10px] font-black tracking-wide shrink-0">
              VÀO THI NGAY →
            </span>
          </button>
        </div>
      )}

      {showExamModal && userId && (
        <RigorousLevelExamModal
          levelToTest={selectedExamLevel}
          userId={userId}
          onClose={() => setShowExamModal(false)}
          onExamPassed={(lvl) => {
            setShowExamModal(false);
            toast.success(`Chúc mừng bạn đã vượt qua bài thi khắt khe Level ${lvl}!`);
          }}
        />
      )}

      <style>{`
        @keyframes heatwave {
          0%, 100% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.6;
          }
        }
        @keyframes sparkFloat {
          0% {
            transform: translateY(0) scale(0.3);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-20px) scale(1.3);
            opacity: 0;
          }
        }
        @keyframes flameWobble {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.04, 0.96); }
        }
        @keyframes flameMidWobble {
          0%, 100% { transform: rotate(2deg) scale(0.98); }
          50% { transform: rotate(-3deg) scale(1.02, 0.98); }
        }
        @keyframes flameCoreWobble {
          0%, 100% { transform: rotate(-1deg) scale(1.02); }
          50% { transform: rotate(2deg) scale(0.96, 1.04); }
        }
      `}</style>
    </div>
  );
}
