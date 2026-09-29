"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { BookOpen, Target, Trophy, HeartCrack, Crown, Hourglass, ShieldCheck, ArrowRight } from "lucide-react";
import { btnPrimary, panel, Sys, StatTable } from "@/components/ui/system";
import Glyph from "@/components/Glyph";
import { getLevelByXp, getNextLevel, getXpToNextLevel, getLevelProgress, LEVELS } from "@/lib/levels";
import { createClient } from "@/lib/cloudflare";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import { getLevelStats, type LevelStats } from "@/lib/cloudflare-user";
import {
  getUserStreak,
  hasActivityToday as checkActivityToday,
  getRemainingStreakFreezes,
  getStreakRestoreOffer,
  restoreStreakWithXp,
  STREAK_RESTORE_XP_COST,
  type UserStreak,
} from "@/lib/cloudflare-streak";
import { recalculateUserStats } from "@/lib/cloudflare-user";
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
  /** Bỏ hàng avatar + tên cấp + tổng XP ở đầu thẻ. Dashboard bật cờ này vì
   *  khối "Trung tâm kỹ năng" ngay cạnh đã nói đúng ba thứ đó, to hơn - hai
   *  bản của cùng một danh tính cách nhau một cột chỉ làm mắt phải chọn. */
  hideIdentity?: boolean;
}

const LEVEL_EMOJIS: Record<number, string> = {
  1: "🌱", // Tò mò
  2: "🎒", // Học viên
  3: "💼", // Lập trình viên tập sự
  4: "📊", // Kỹ sư phần mềm
  5: "🛡️", // Kỹ sư chính
  6: "👑", // Kỹ sư cao cấp
  7: "🔥", // Chuyên gia hệ thống
  8: "💎", // Kiến trúc sư phần mềm
  9: "🎓", // Ứng viên chứng chỉ AWS
  10: "🦁", // Huyền thoại mã nguồn mở
  11: "🏛️", // Giám đốc kỹ thuật
  12: "🌐", // Kiến trúc sư trưởng nền tảng
  13: "🚀", // Bậc thầy thiết kế hệ thống
  14: "⚡", // Lãnh đạo công nghệ tối cao
  15: "🔱", // Đại thuyền trưởng Silicon Valley
};

import RigorousLevelExamModal from "@/components/RigorousLevelExamModal";
import { LEVEL_EXAMS, RECERTIFICATION_DAYS, getRecertPenaltyXp } from "@/lib/level-exams";
import { getPassedLevelExams } from "@/lib/cloudflare-level-exams";

export default function UserStats({
  xp,
  lessonsCompleted,
  totalLessons,
  avgQuizScore = 0,
  userId,
  sidebar = false,
  embedded = false,
  compact = false,
  hideIdentity = false,
}: UserStatsProps) {
  const { t } = useI18n();
  const currentLevel = getLevelByXp(xp);
  const nextLevel = getNextLevel(currentLevel.level);
  const xpToNext = getXpToNextLevel(xp);
  const progress = getLevelProgress(xp);

  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedExamLevel, setSelectedExamLevel] = useState<number>(2);
  // Bài thi cấp cao nhất đã quá hạn thi lại → đang bị trừ XP (getRecertPenaltyXp).
  const [recert, setRecert] = useState<{ level: number; xp: number } | null>(null);

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
    const cloudflare = createClient();
    
    // Fetch RPG Equipped gear & Coins
    async function loadUserData() {
      try {
        const [{ data: equipData }, { data: profileData }] = await Promise.all([
          cloudflare.from("user_equipments").select("slot, asset_key").eq("user_id", userId),
          cloudflare.from("user_profiles").select("coins").eq("id", userId).single(),
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
    if (!userId) return;
    let cancelled = false;
    void getPassedLevelExams(userId)
      .then((passed) => {
        const rows = Object.values(passed).map((r) => ({ level: r.passedLevel, passed_at: new Date(r.passedAt).toISOString() }));
        const xp = getRecertPenaltyXp(rows);
        if (!cancelled) setRecert(xp > 0 ? { level: Math.max(...rows.map((r) => r.level)), xp } : null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [userId, showExamModal]);

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
      className={`relative overflow-hidden ${
        embedded
          ? "p-0"
          : `${panel} ${sidebar ? "p-4" : "p-4 sm:p-5"}`
      }`}
    >
      {/* Hai quầng sáng mờ và dải gradient đầu thẻ đã gỡ: hệ thiết kế chung
          (components/ui/system.tsx) lấy chiều sâu từ sắc độ nền và đường kẻ
          1px, không từ bóng hay ánh sáng trang trí. */}
      {!hideIdentity && (
      <div className={`flex items-center gap-2.5 ${sidebar ? "mb-2" : "mb-4"}`}>
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            toast.success(`${format(t.userStats.activateWarrior, { level: currentLevel.level })}`);
          }}
          className="relative shrink-0 cursor-pointer"
          title={t.userStats.clickToActivate}
        >
          <TechCharacterAvatar level={currentLevel.level} equipments={equippedGear} size="xs" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <span className="eyebrow block leading-none text-ink-muted">
            {format(t.userStats.levelLabel, { level: currentLevel.level, total: LEVELS.length })}
          </span>
          <h3 className={`font-black text-ink-max mt-1 tracking-tight leading-none truncate ${
            sidebar ? "text-[15px]" : "text-sm sm:text-base"
          }`}>
            {t.levelTitles[currentLevel.level] ?? currentLevel.name}
          </h3>
          {activeTitle && (
            <span className="text-[10px] font-bold text-ink-soft mt-1 flex items-center gap-1 leading-none truncate">
              <Trophy className="w-2.5 h-2.5 shrink-0 text-ink-faint" aria-hidden /> {activeTitle}
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          {/* Tổng XP là số liệu, nên đi bằng mono như số trong bảng hệ thống -
              không còn là viên thuốc gradient. */}
          <span className={`inline-flex items-center rounded-xs bg-surface-raised font-mono font-medium tabular-nums text-ink-max dark:border-stone-700 dark:bg-stone-950 ${
            sidebar ? "text-[10.5px] px-2 py-0.5" : "text-xs px-2.5 py-1"
          }`}>
            {xp} {t.miscUi.userStats.xpUnit}
          </span>
        </div>
      </div>
      )}

      {/* Mini RPG Status / Wardrobe Widget removed to declutter the card */}

      {/* Level roadmap - horizontally scrollable strip of all levels, so the
          full ladder (now 8 tiers) stays browsable on narrow screens without
          forcing the card taller. Skipped in sidebar mode - too cramped. */}
      {!sidebar && (
        <div className="mb-4 -mx-1 px-1 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 pb-1 w-max min-w-full">
            {LEVELS.map((lvl, idx) => {
              const reached = xp >= lvl.minXp;
              const isCurrent = lvl.level === currentLevel.level;
              return (
                <div key={lvl.level} className="flex items-center gap-1.5 shrink-0">
                  <div
                    title={format(t.userStats.levelTooltip, { level: lvl.level, name: t.levelTitles[lvl.level] ?? lvl.name, xp: lvl.minXp })}
                    aria-current={isCurrent ? "step" : undefined}
                    className={`flex flex-col items-center gap-1 rounded-sm px-2.5 py-2 border transition-colors ${
                      isCurrent
                        ? "border-brand-600 bg-white dark:border-brand-400 dark:bg-stone-900"
                        : reached
                        ? "border-line bg-white dark:bg-stone-900"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    <Glyph emoji={LEVEL_EMOJIS[lvl.level] || "🌱"} className={`w-4 h-4 ${isCurrent ? "text-accent-strong" : reached ? "text-ink-body" : "text-ink-faint"}`} />
                    <Sys className={isCurrent ? "text-accent-strong" : "text-ink-muted"}>
                      L{lvl.level}
                    </Sys>
                  </div>
                  {idx < LEVELS.length - 1 && (
                    <div className={`w-3 h-px shrink-0 ${reached ? "bg-stone-500 dark:bg-stone-400" : "bg-surface-deep"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bảng số liệu: nhãn trái, số mono căn phải - cùng khuôn StatTable của
          trang giới thiệu, thay cho hai ô màu xanh da trời / xanh thương hiệu. */}
      <StatTable
        className={`border-y border-line ${sidebar ? "mb-2.5" : "mb-4"}`}
        rows={[
          {
            label: (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-ink-faint shrink-0" aria-hidden />
                {t.userStats.lessons}
              </span>
            ),
            value: (
              <>
                {lessonsCompleted}
                <span className="text-xs text-ink-faint"> / {totalLessons}</span>
              </>
            ),
          },
          {
            label: (
              <span className="inline-flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-ink-faint shrink-0" aria-hidden />
                {t.userStats.quizAvg}
              </span>
            ),
            value: `${Math.round(avgQuizScore)}%`,
          },
        ]}
      />

      {/* Streak restore offer - shown once all 3 free freezes are used up
          and the streak actually reset, letting the user buy it back with
          XP instead of losing it for good. */}
      {restoreOffer.canRestore && (
        <div className="mt-2.5 p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900 rounded-sm flex items-center gap-3">
          <HeartCrack className="w-5 h-5 shrink-0 text-warn-strong" strokeWidth={1.75} aria-hidden />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-ink">
              {format(t.userStats.lostStreak, { days: restoreOffer.lostStreak })}
            </p>
            <p className="text-[10px] text-ink-muted mt-0.5">{t.userStats.restoreHint}</p>
          </div>
          <button
            onClick={handleRestoreStreak}
            disabled={restoringStreak}
            className={`${btnPrimary} shrink-0 px-2.5 py-2 text-[11px]`}
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
        <div className="mt-1.5 text-center">
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
        <div className="mt-0.5 pt-2">
          <div className="flex items-center justify-between gap-2 text-[10.5px] mb-1.5 font-semibold text-ink-faint">
            <span>{format(t.userStats.progressLabel, { level: currentLevel.level })} <span className="font-mono font-medium tabular-nums text-ink-muted">({Math.round(progress)}%)</span></span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              {format(t.userStats.nextLevelLabel, { level: nextLevel.level, name: t.levelTitles[nextLevel.level] ?? nextLevel.name })} <Glyph emoji={LEVEL_EMOJIS[nextLevel.level] || "🌱"} className="w-3 h-3 text-ink-faint" />
              {/* Số XP còn thiếu đứng CẠNH tên cấp sắp tới, không còn là một ô
                  riêng ghi "+54 XP" không nói đi đâu. Ô đó, dòng "Tiến độ cấp
                  2 (23%)" và tên cấp kế tiếp là ba cách nói cùng một câu, xếp
                  cách nhau chưa tới một phân. */}
              {xpToNext > 0 && (
                <span className="font-semibold text-ink-body">
                  · {format(t.userStats.xpToNext, { count: xpToNext })}
                </span>
              )}
            </span>
          </div>
          {/* Thanh tiến độ là dữ liệu sống nên được tô xanh - nhưng phẳng: ô
              vuông 2px, không gradient, không nhấp nháy. */}
          <div className="w-full h-1.5 bg-surface-sunken rounded-xs overflow-hidden">
            <div
              className={`h-full transition-[width] duration-500 ${sidebar ? "bg-accent-line-mid" : "bg-brand-600 dark:bg-brand-500"}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {!sidebar && (
            <div className="mt-3.5 p-3 bg-surface-raised dark:bg-stone-950 rounded-sm space-y-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-ink-soft">
                <Target className="w-3.5 h-3.5 shrink-0 text-ink-muted" aria-hidden />
                <span>
                  {t.userStats.lessonsToLevelUpPart1}{" "}
                  <span className="font-extrabold text-ink">
                    {format(t.userStats.lessonsToLevelUpBold, { count: Math.max(1, Math.ceil(xpToNext / 20)) })}
                  </span>{" "}
                  {format(t.userStats.lessonsToLevelUpPart2, { xp: xpToNext })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-ink-soft">
                <Trophy className="w-3.5 h-3.5 shrink-0 text-ink-muted" aria-hidden />
                <span>
                  {t.userStats.upcomingTitlePart1} <span className="font-extrabold text-ink-max">{t.levelTitles[nextLevel.level] ?? nextLevel.name}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {!nextLevel && (
        <div className="mt-2.5 pt-2.5 border-t border-line">
          <div className="p-3 bg-surface-raised dark:bg-stone-950 rounded-sm flex items-center gap-2 text-xs text-ink-body font-semibold">
            <Crown className="w-4 h-4 shrink-0 text-ink-muted" aria-hidden /><span>{format(t.userStats.maxLevelReached, { name: t.levelTitles[currentLevel.level] ?? currentLevel.name })}</span>
          </div>
        </div>
      )}

      {recert && (
        <div className="mt-3">
          {/* Đỏ ở đây là ngữ nghĩa (đang bị trừ XP), không phải trang trí. */}
          <button
            onClick={() => {
              setSelectedExamLevel(recert.level);
              setShowExamModal(true);
            }}
            className={`w-full flex items-center justify-between gap-2 rounded-sm border border-rose-300 bg-rose-50 hover:border-rose-600 text-rose-800 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200 font-black text-xs transition-colors cursor-pointer ${compact ? "p-2" : "p-3"}`}
          >
            <div className="text-left">
              <p className="leading-tight font-extrabold text-[11px] flex items-center gap-1"><Hourglass className="w-3 h-3 shrink-0" aria-hidden /> {format(t.userStats.recertTitle, { level: recert.level, days: RECERTIFICATION_DAYS })}</p>
              <p className="text-[10px] text-alert-strong font-bold">{format(t.userStats.recertHint, { xp: recert.xp })}</p>
            </div>
            <span className="rounded-xs border border-rose-400 px-2 py-0.5 text-[10px] shrink-0 dark:border-rose-800">{t.userStats.recertCta}</span>
          </button>
        </div>
      )}

      {/* Level Exam Gatekeeper Banner - nút hành động chính của thẻ, nên đi
          bằng khuôn btnPrimary: nền mực, rê chuột thành xanh thương hiệu. */}
      {nextLevel && (
        <div className="mt-3 pt-3 border-t border-line">
          <button
            onClick={() => {
              setSelectedExamLevel(nextLevel.level);
              setShowExamModal(true);
            }}
            className={`${sidebar ? "group inline-flex items-center gap-2 rounded-sm border border-line text-ink-body transition-colors hover:border-line-strong hover:text-ink-max" : btnPrimary} w-full justify-between text-xs ${compact ? "p-2" : "p-3"}`}
          >
            <div className="flex items-center gap-2 text-left">
              <ShieldCheck className={`${compact ? "w-4 h-4" : "w-5 h-5"} shrink-0`} strokeWidth={1.75} aria-hidden />
              <div>
                <p className="leading-tight font-extrabold text-[11px]">{format(t.userStats.examBannerTitle, { level: nextLevel.level })}</p>
                {/* Dòng điều kiện điểm chỉ có ở bản đầy đủ. Ở bản gọn nó đẩy
                    banner cao gấp đôi để nói một thứ modal thi cũng nói lại
                    ngay khi mở. */}
                {!compact && (
                  <p className="text-[10px] font-semibold opacity-75">{format(t.userStats.examBannerHint, { percent: LEVEL_EXAMS[nextLevel.level]?.minPassPercentage || 80 })}</p>
                )}
              </div>
            </div>
            <span className={`inline-flex items-center gap-1 text-[10.5px] font-black tracking-wide shrink-0 ${compact ? "" : "px-1"}`}>
              {t.userStats.examBannerCta}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
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

    </div>
  );
}
