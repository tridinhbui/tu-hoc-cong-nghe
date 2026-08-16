"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Flame, BookOpen, Target, Sparkles } from "lucide-react";
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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface UserStatsProps {
  xp: number;
  lessonsCompleted: number;
  totalLessons: number;
  avgQuizScore?: number;
  userId?: string;
  sidebar?: boolean;
  embedded?: boolean;
  /** Bản gọn của trang tổng quan. Rút banner thi thăng cấp về một dòng; phần
   *  bị rút quay lại nguyên vẹn khi người học chọn "Đầy đủ". */
  compact?: boolean;
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
  compact = false,
}: UserStatsProps) {
  const { t } = useI18n();
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
            equipData.forEach((e: { slot: string; asset_key: string }) => {
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
      toast.success(format(t.userStats.streakRestored, { days: restored.current_streak, cost: STREAK_RESTORE_XP_COST }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t.userStats.restoreFailed);
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
            toast.success(`✨ ${format(t.userStats.activateWarrior, { level: currentLevel.level })}`);
          }}
          className="relative shrink-0 cursor-pointer group/avatar"
          title={t.userStats.clickToActivate}
        >
          <FinanceCharacterAvatar level={currentLevel.level} equipments={equippedGear} size="xs" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <span className="text-[8px] sm:text-[9px] font-black text-stone-400 dark:text-stone-400 uppercase tracking-widest block leading-none">
            {format(t.userStats.levelLabel, { level: currentLevel.level, total: LEVELS.length })}
          </span>
          <h3 className={`font-black text-stone-950 dark:text-white mt-0.5 tracking-tight leading-none truncate ${
            sidebar ? "text-[15px]" : "text-sm sm:text-base"
          }`}>
            {t.levelTitles[currentLevel.level] ?? currentLevel.name}
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
            {xp} {t.miscUi.userStats.xpUnit}
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
                    title={format(t.userStats.levelTooltip, { level: lvl.level, name: t.levelTitles[lvl.level] ?? lvl.name, xp: lvl.minXp })}
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
      {/* HAI HÀNG SỐ LIỆU, MỘT KHUNG.
          Trước đây mỗi con số là một thẻ bo 12px nền màu riêng (xanh dương cho
          bài học, bạc hà cho quiz), nằm trong một thẻ bo 16px có viền, nằm
          trong một lưới - ba lớp khung cho hai dòng chữ, và hai mảng màu chỉ
          để phân biệt hai thứ mà nhãn đã nói rõ. Nhãn và giá trị giờ nằm cùng
          hàng, ngăn nhau bằng một nét kẻ. */}
      <div className={`relative z-10 rounded-lg border border-stone-200 dark:border-stone-800 ${sidebar ? "mb-2.5 px-2.5" : "mb-4 px-3"}`}>
        <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 py-1.5 dark:border-stone-800/80">
          <span className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
            <BookOpen className="w-3.5 h-3.5 shrink-0 text-stone-400 dark:text-stone-500" />
            {t.userStats.lessons}
          </span>
          <span className="shrink-0 text-[13px] tabular-nums text-stone-900 dark:text-stone-100">
            <span className="font-semibold">{lessonsCompleted}</span>
            <span className="text-stone-400 dark:text-stone-500"> / {totalLessons}</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 py-1.5">
          <span className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
            <Target className="w-3.5 h-3.5 shrink-0 text-stone-400 dark:text-stone-500" />
            {t.userStats.quizAvg}
          </span>
          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-stone-900 dark:text-stone-100">
            {Math.round(avgQuizScore)}%
          </span>
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
              {format(t.userStats.lostStreak, { days: restoreOffer.lostStreak })}
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{t.userStats.restoreHint}</p>
          </div>
          <button
            onClick={handleRestoreStreak}
            disabled={restoringStreak}
            className="shrink-0 text-[10px] font-black uppercase px-2.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 transition-colors"
          >
            {restoringStreak ? t.userStats.restoring : format(t.userStats.restoreCost, { cost: STREAK_RESTORE_XP_COST })}
          </button>
        </div>
      )}

      {/* Lối vào Góc yên tĩnh, và chỉ ở đây.

          Trang đó tồn tại cho những lúc khó, nhưng lối vào duy nhất tới nó là
          thẻ lời nhắn hôm nay - tức là người ta chỉ tìm thấy nó khi được mời,
          không phải khi cần. Khoảnh khắc khó thì đã được phát hiện sẵn ngay
          phía trên: vừa mất chuỗi, và thứ duy nhất được đề nghị là trả XP để
          mua lại.

          Nên đặt ở đây một lựa chọn không phải giao dịch. Một dòng, chữ nhỏ,
          không viền, không badge, không đếm số - nó không được phép cạnh
          tranh với nút khôi phục, chỉ cần có mặt. Không thêm vào navbar vì
          làm thế là biến một chỗ trú thành một mục nữa phải hoàn thành. */}
      {restoreOffer.canRestore && (
        <div className="mt-1.5 text-center relative z-10">
          <Link
            href="/loi-nhan"
            className="text-[10px] font-semibold text-stone-400 underline-offset-2 transition-colors hover:text-stone-600 hover:underline dark:text-stone-500 dark:hover:text-stone-300"
          >
            {t.userStats.quietCornerLink}
          </Link>
        </div>
      )}

      {/* Level Progress Bar & Alert Banner */}
      {nextLevel && (
        <div className="mt-0.5 pt-2 border-t border-stone-100 dark:border-stone-800/80 relative z-10">
          <div className="flex items-center justify-between text-[10px] mb-1 font-bold text-stone-500 dark:text-stone-400">
            <span>{format(t.userStats.progressLabel, { level: currentLevel.level })} <span className="text-emerald-600 dark:text-emerald-400">({Math.round(progress)}%)</span></span>
            <span className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300">
              {format(t.userStats.nextLevelLabel, { level: nextLevel.level, name: t.levelTitles[nextLevel.level] ?? nextLevel.name })} <span>{LEVEL_EMOJIS[nextLevel.level] || "🌱"}</span>
              {/* Số XP còn thiếu đứng CẠNH tên cấp sắp tới, không còn là một ô
                  riêng ghi "+54 XP" không nói đi đâu. Ô đó, dòng "Tiến độ cấp
                  2 (23%)" và tên cấp kế tiếp là ba cách nói cùng một câu, xếp
                  cách nhau chưa tới một phân. */}
              {xpToNext > 0 && (
                <span className="font-black text-indigo-600 dark:text-indigo-400">
                  · {format(t.userStats.xpToNext, { count: xpToNext })}
                </span>
              )}
            </span>
          </div>
          {/* Một thanh 4px màu đặc. Bản cũ cao 8px, tô gradient ba chặng, đổ
              bóng phát sáng và có một lớp trắng nhấp nháy vô hạn chồng lên -
              chuyển động liên tục cho một con số không đổi. */}
          <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!sidebar && (
            <div className="mt-3.5 p-3 bg-stone-50/80 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-800/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🎯</span>
                <span>
                  {t.userStats.lessonsToLevelUpPart1}{" "}
                  <span className="font-extrabold text-stone-900 dark:text-stone-100">
                    {format(t.userStats.lessonsToLevelUpBold, { count: Math.max(1, Math.ceil(xpToNext / 20)) })}
                  </span>{" "}
                  {format(t.userStats.lessonsToLevelUpPart2, { xp: xpToNext })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 dark:text-stone-300">
                <span className="text-sm shrink-0">🏆</span>
                <span>
                  {t.userStats.upcomingTitlePart1} <span className="font-extrabold text-amber-600 dark:text-amber-400">{t.levelTitles[nextLevel.level] ?? nextLevel.name}</span>
                </span>
              </div>
              {cfaGateRemaining > 0 && (
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span className="text-sm shrink-0">🎓</span>
                  <span>
                    {format(t.userStats.cfaGateRemainingPart1, { level: nextLevel.level })} <span className="font-extrabold">{format(t.userStats.cfaGateRemainingCount, { count: cfaGateRemaining })}</span> {t.userStats.cfaGateRemainingPart2}
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
            <span>👑 {format(t.userStats.maxLevelReached, { name: t.levelTitles[currentLevel.level] ?? currentLevel.name })}</span>
          </div>
        </div>
      )}

      {/* Level Exam Gatekeeper Banner */}
      {nextLevel && (
        <div className="mt-2.5 relative z-10 pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => {
              setSelectedExamLevel(nextLevel.level);
              setShowExamModal(true);
            }}
            // Hành động PHỤ, nên trông như hành động phụ. Trước đây nó là một
            // banner tô kín gradient xanh lá→ngọc→xanh lá, có đổ bóng, phóng to
            // khi rê chuột, một emoji khiên, chữ `font-black` đổ bóng, và một
            // viên thuốc nền đen chữ xanh làm nút. Nó là thứ đậm nhất trong cả
            // cột - đậm hơn cả tiến độ học - cho một bài thi mà người học chỉ
            // vào khi đã sẵn sàng.
            //
            // Giữ nguyên hành vi và cả dòng điều kiện điểm; chỉ hạ trọng lượng.
            className={`w-full flex items-center justify-between gap-3 rounded-lg border border-stone-200 text-left transition-colors hover:border-stone-400 cursor-pointer dark:border-stone-800 dark:hover:border-stone-600 ${compact ? "p-2" : "p-3"}`}
          >
            <div>
              <p className="text-[11px] font-medium leading-tight text-stone-700 dark:text-stone-300">{format(t.userStats.examBannerTitle, { level: nextLevel.level })}</p>
              {/* Dòng điều kiện điểm chỉ có ở bản đầy đủ. Ở bản gọn nó đẩy
                  banner cao gấp đôi để nói một thứ modal thi cũng nói lại
                  ngay khi mở. */}
              {!compact && (
                <p className="mt-0.5 text-[10px] text-stone-500 dark:text-stone-400">{format(t.userStats.examBannerHint, { percent: LEVEL_EXAMS[nextLevel.level]?.minPassPercentage || 80 })}</p>
              )}
            </div>
            <span className="shrink-0 text-[10px] font-semibold text-stone-500 dark:text-stone-400">
              {t.userStats.examBannerCta}
            </span>
          </button>
        </div>
      )}

      {/* Embedded Topic Mastery Heatmap within Personal Stats removed per request */}

      {showExamModal && userId && (
        <RigorousLevelExamModal
          levelToTest={selectedExamLevel}
          userId={userId}
          onClose={() => setShowExamModal(false)}
          onExamPassed={(lvl) => {
            setShowExamModal(false);
            toast.success(format(t.userStats.examPassed, { level: lvl }));
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
