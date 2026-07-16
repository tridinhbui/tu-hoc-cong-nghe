"use client";

import { useState, useEffect } from "react";
import { Gift, Sparkles, Trophy, CheckCircle2, Flame, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/supabase-user";

interface CombinedRewardsWidgetProps {
  userId: string;
}

const REWARDS = [
  { type: "title", value: "Chiến thần tích lũy", desc: "Danh hiệu tôn vinh kỷ luật tích sản" },
  { type: "title", value: "Kẻ hủy diệt nợ nần", desc: "Danh hiệu dành cho người làm chủ tài chính" },
  { type: "title", value: "Sói già phố Wall", desc: "Danh hiệu của bậc thầy phân tích thị trường" },
  { type: "title", value: "Đại gia lãi kép", desc: "Danh hiệu dành cho tín đồ dòng tiền dài hạn" },
  { type: "title", value: "Bậc thầy định giá", desc: "Danh hiệu của chuyên gia đọc báo cáo tài chính" },
  { type: "xp", value: 30, desc: "Cộng ngay +30 XP vào tổng điểm tích lũy" },
  { type: "xp", value: 50, desc: "Cộng ngay +50 XP vào tổng điểm tích lũy" },
  { type: "theme", value: "gold", desc: "Mở khóa Giao diện Hoàng Kim quý tộc" },
  { type: "theme", value: "emerald", desc: "Mở khóa Giao diện Ngọc Lục Bảo đặc biệt" }
];

export default function CombinedRewardsWidget({ userId }: CombinedRewardsWidgetProps) {
  const [activeTab, setActiveTab] = useState<"chests" | "quests">("chests");
  const [isExpanded, setIsExpanded] = useState(false);

  // Chest state
  const [chests, setChests] = useState<number>(0);
  const [opening, setOpening] = useState<boolean>(false);
  const [shaking, setShaking] = useState<boolean>(false);
  const [rewardReveal, setRewardReveal] = useState<any | null>(null);

  // Quest state
  const [streak, setStreak] = useState<number>(0);
  const [weeklyLessonsCount, setWeeklyLessonsCount] = useState<number>(0);
  const [perfectQuizStreak, setPerfectQuizStreak] = useState<number>(0);
  const [isEpicClaimed, setIsEpicClaimed] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);

  // Storage keys
  const chestKey = `thtcdn_chests_${userId}`;
  const titlesKey = `thtcdn_unlocked_titles_${userId}`;
  const themesKey = `thtcdn_unlocked_themes_${userId}`;
  const streakKey = `thtcdn_streak_${userId}`;
  const weeklyLessonsKey = `thtcdn_weekly_completed_lessons_${userId}`;
  const perfectQuizzesKey = `thtcdn_weekly_perfect_quizzes_${userId}`;

  const loadChests = () => {
    if (typeof window !== "undefined") {
      setChests(Number(window.localStorage.getItem(chestKey) ?? "0"));
    }
  };

  const getWeekKey = () => {
    const d = new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${d.getFullYear()}_w${weekNumber}`;
  };

  const weekKey = getWeekKey();
  const epicClaimedKey = `thtcdn_weekly_epic_claimed_${userId}_${weekKey}`;

  const getMondayOfCurrentWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.getTime();
  };

  const loadProgress = () => {
    if (typeof window === "undefined") return;

    // Chests
    loadChests();

    // Streak
    const currentStreak = Number(window.localStorage.getItem(streakKey) ?? "0");
    setStreak(currentStreak);

    // Weekly lessons
    const mondayTime = getMondayOfCurrentWeek();
    const rawLessons = window.localStorage.getItem(weeklyLessonsKey) ?? "[]";
    try {
      const lessonsList = JSON.parse(rawLessons) as { lessonId: number; timestamp: number }[];
      const activeThisWeek = lessonsList.filter((l) => l.timestamp >= mondayTime);
      const uniqueLessonIds = new Set(activeThisWeek.map((l) => l.lessonId));
      setWeeklyLessonsCount(uniqueLessonIds.size);
    } catch (e) {
      setWeeklyLessonsCount(0);
    }

    // Perfect quiz streak
    const currentPerfect = Number(window.localStorage.getItem(perfectQuizzesKey) ?? "0");
    setPerfectQuizStreak(currentPerfect);

    // Epic Claimed status
    const claimed = window.localStorage.getItem(epicClaimedKey) === "true";
    setIsEpicClaimed(claimed);
  };

  useEffect(() => {
    loadProgress();

    const events = ["thtcdn_chests_updated", "thtcdn_weekly_quests_updated", "thtcdn_profile_updated"];
    events.forEach((event) => window.addEventListener(event, loadProgress));

    return () => {
      events.forEach((event) => window.removeEventListener(event, loadProgress));
    };
  }, [userId]);

  const handleOpenChest = () => {
    if (chests <= 0 || opening) return;

    setShaking(true);

    setTimeout(async () => {
      setShaking(false);
      setOpening(true);

      const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
      setRewardReveal(randomReward);

      const nextChests = Math.max(0, chests - 1);
      setChests(nextChests);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(chestKey, String(nextChests));
      }

      if (randomReward.type === "title" && typeof window !== "undefined") {
        const unlocked = JSON.parse(window.localStorage.getItem(titlesKey) ?? "[]") as string[];
        const rewardVal = String(randomReward.value);
        if (!unlocked.includes(rewardVal)) {
          unlocked.push(rewardVal);
          window.localStorage.setItem(titlesKey, JSON.stringify(unlocked));
        }
        window.localStorage.setItem(`thtcdn_active_title_${userId}`, rewardVal);
        window.dispatchEvent(new Event("thtcdn_profile_updated"));
      } else if (randomReward.type === "theme" && typeof window !== "undefined") {
        const unlocked = JSON.parse(window.localStorage.getItem(themesKey) ?? "[]") as string[];
        const rewardVal = String(randomReward.value);
        if (!unlocked.includes(rewardVal)) {
          unlocked.push(rewardVal);
          window.localStorage.setItem(themesKey, JSON.stringify(unlocked));
        }
        window.localStorage.setItem(`thtcdn_active_theme_${userId}`, rewardVal);
        window.dispatchEvent(new Event("thtcdn_theme_updated"));
        window.dispatchEvent(new Event("thtcdn_profile_updated"));
      } else if (randomReward.type === "xp") {
        try {
          await recalculateUserStats(userId);
        } catch (e) {
          console.error("Error giving chest XP:", e);
        }
      }
    }, 1000);
  };

  const handleClaimReward = () => {
    setOpening(false);
    setRewardReveal(null);
    toast.success("Đã thu thập phần quà thành công! 🌟");
  };

  // Quests logic
  const streakProgress = Math.min(streak, 5);
  const lessonsProgress = Math.min(weeklyLessonsCount, 10);
  const quizProgress = Math.min(perfectQuizStreak, 3);

  const quest1Done = streakProgress >= 5;
  const quest2Done = lessonsProgress >= 10;
  const quest3Done = quizProgress >= 3;

  const allQuestsDone = quest1Done && quest2Done && quest3Done;

  const handleClaimEpic = async () => {
    if (!allQuestsDone || isEpicClaimed || claiming) return;
    setClaiming(true);

    try {
      const currentChests = Number(window.localStorage.getItem(chestKey) ?? "0");
      window.localStorage.setItem(chestKey, String(currentChests + 3));

      await recalculateUserStats(userId);

      window.localStorage.setItem(epicClaimedKey, "true");
      setIsEpicClaimed(true);

      toast.success("Chúc mừng! Bạn đã mở khóa Rương Sử Thi: Nhận +3 Rương Quà & +100 XP cực lớn! 🎁🏆👑");
      
      window.dispatchEvent(new Event("thtcdn_chests_updated"));
      window.dispatchEvent(new Event("thtcdn_profile_updated"));
      loadProgress();
    } catch (error) {
      console.error("Error claiming epic chest:", error);
      toast.error("Lỗi khi nhận phần thưởng. Hãy thử lại.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-850 rounded-3xl shadow-sm overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-950/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-rose-500" />
          <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100">Phần Thưởng</span>
          {chests > 0 && (
            <span className="text-[9px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
              {chests} rương
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400 dark:text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500" />}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-stone-100 dark:border-stone-800">
          {/* Tabs */}
          <div className="flex gap-1 p-2 bg-stone-50 dark:bg-stone-950/50">
            <button
              onClick={() => setActiveTab("chests")}
              className={`flex-1 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "chests"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              Rương Quà
            </button>
            <button
              onClick={() => setActiveTab("quests")}
              className={`flex-1 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "quests"
                  ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              Nhiệm Vụ Tuần
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "chests" ? (
              <>
                <style>{`
                  @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(0px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(2px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(2px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                  }
                  .chest-shake {
                    animation: shake 0.5s infinite;
                  }
                `}</style>

                {chests > 0 ? (
                  <div className="text-center py-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-150 dark:border-stone-850/80 space-y-3">
                    <button
                      onClick={handleOpenChest}
                      disabled={opening}
                      className={`mx-auto w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ${
                        shaking ? "chest-shake" : ""
                      }`}
                    >
                      <span className="text-2xl">🎁</span>
                    </button>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        Bạn có rương quà chưa mở!
                      </p>
                      <p className="text-[10px] text-stone-400 dark:text-stone-550">
                        Nhấn vào rương để mở khóa danh hiệu và phần thưởng
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5 text-stone-450 dark:text-stone-550 text-[10px] leading-relaxed">
                    Không có rương nào chưa mở. Hoàn thành nhiệm vụ hàng ngày hoặc thi vượt ải chặng để kiếm rương kho báu! 🏆
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-3">
                  {/* Quest 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        Chuỗi Học Tập
                      </span>
                      <span>{streakProgress}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${quest1Done ? "bg-orange-500" : "bg-orange-400"}`}
                        style={{ width: `${(streakProgress / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Quest 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-sky-500" />
                        Bài Học Tuần
                      </span>
                      <span>{lessonsProgress}/10</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${quest2Done ? "bg-sky-500" : "bg-sky-400"}`}
                        style={{ width: `${(lessonsProgress / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Quest 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-stone-700 dark:text-stone-300">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        Quiz Hoàn Hảo
                      </span>
                      <span>{quizProgress}/3</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${quest3Done ? "bg-emerald-500" : "bg-emerald-400"}`}
                        style={{ width: `${(quizProgress / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {allQuestsDone ? (
                  isEpicClaimed ? (
                    <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-2xl text-center text-[10px] text-stone-450 dark:text-stone-550 font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Đã nhận phần thưởng tuần này!
                    </div>
                  ) : (
                    <button
                      onClick={handleClaimEpic}
                      disabled={claiming}
                      className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95 animate-pulse"
                    >
                      <Gift className="w-4 h-4" />
                      {claiming ? "Đang nhận quà..." : "Mở Rương Sử Thi! 🎁"}
                    </button>
                  )
                ) : (
                  <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-2xl text-center text-[10px] text-stone-400 dark:text-stone-550 font-bold">
                    🔒 Hoàn thành cả 3 nhiệm vụ để mở khóa
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Reward Reveal Overlay */}
      {opening && rewardReveal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-850 rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl relative space-y-5 animate-[scaleIn_0.3s_ease-out]">
            <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Bạn đã mở rương nhận được
              </span>
              <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1.5">
                {rewardReveal.type === "title" && <Trophy className="w-5 h-5 text-amber-500" />}
                {rewardReveal.value}
                {rewardReveal.type === "xp" && " XP"}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {rewardReveal.desc}
              </p>
            </div>

            <button
              onClick={handleClaimReward}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Thu thập phần quà <CheckCircle2 className="w-4 h-4 inline-block ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
