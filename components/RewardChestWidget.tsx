"use client";

import { useState, useEffect } from "react";
import { Gift, Sparkles, Trophy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { recalculateUserStats } from "@/lib/supabase-user";

interface RewardChestWidgetProps {
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

export default function RewardChestWidget({ userId }: RewardChestWidgetProps) {
  const [chests, setChests] = useState<number>(0);
  const [opening, setOpening] = useState<boolean>(false);
  const [shaking, setShaking] = useState<boolean>(false);
  const [rewardReveal, setRewardReveal] = useState<any | null>(null);

  const chestKey = `thtcdn_chests_${userId}`;
  const titlesKey = `thtcdn_unlocked_titles_${userId}`;
  const themesKey = `thtcdn_unlocked_themes_${userId}`;

  const loadChests = () => {
    if (typeof window !== "undefined") {
      setChests(Number(window.localStorage.getItem(chestKey) ?? "0"));
    }
  };

  useEffect(() => {
    loadChests();

    // Listen for changes from other widgets
    window.addEventListener("thtcdn_chests_updated", loadChests);
    return () => {
      window.removeEventListener("thtcdn_chests_updated", loadChests);
    };
  }, [userId]);

  const handleOpenChest = () => {
    if (chests <= 0 || opening) return;

    setShaking(true);

    // After 1 second of shaking, reveal the reward
    setTimeout(async () => {
      setShaking(false);
      setOpening(true);

      const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
      setRewardReveal(randomReward);

      // Decrement chest count
      const nextChests = Math.max(0, chests - 1);
      setChests(nextChests);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(chestKey, String(nextChests));
      }

      // Process reward
      if (randomReward.type === "title" && typeof window !== "undefined") {
        const unlocked = JSON.parse(window.localStorage.getItem(titlesKey) ?? "[]") as string[];
        const rewardVal = String(randomReward.value);
        if (!unlocked.includes(rewardVal)) {
          unlocked.push(rewardVal);
          window.localStorage.setItem(titlesKey, JSON.stringify(unlocked));
        }
        // Set as active title immediately
        window.localStorage.setItem(`thtcdn_active_title_${userId}`, rewardVal);
        window.dispatchEvent(new Event("thtcdn_profile_updated"));
      } else if (randomReward.type === "theme" && typeof window !== "undefined") {
        const unlocked = JSON.parse(window.localStorage.getItem(themesKey) ?? "[]") as string[];
        const rewardVal = String(randomReward.value);
        if (!unlocked.includes(rewardVal)) {
          unlocked.push(rewardVal);
          window.localStorage.setItem(themesKey, JSON.stringify(unlocked));
        }
        // Set as active theme immediately
        window.localStorage.setItem(`thtcdn_active_theme_${userId}`, rewardVal);
        window.dispatchEvent(new Event("thtcdn_theme_updated"));
        window.dispatchEvent(new Event("thtcdn_profile_updated"));
      } else if (randomReward.type === "xp") {
        try {
          // In a real app we'd add it to DB. For now, since user profile recalculation is DB-backed,
          // we can simulate giving them XP by forcing a recalculate.
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

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm space-y-4">
      {/* Shaking Animation CSS */}
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

      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-rose-500" />
          Kho Báu Tài Chính
        </h4>
        <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full">
          {chests} rương
        </span>
      </div>

      {chests > 0 ? (
        <div className="text-center py-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-3">
          <button
            onClick={handleOpenChest}
            disabled={opening}
            className={`mx-auto w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ${
              shaking ? "chest-shake" : ""
            }`}
          >
            <span className="text-3xl">🎁</span>
          </button>
          <div className="space-y-1">
            <p className="text-xs font-bold text-stone-800">
              Bạn có rương quà chưa mở!
            </p>
            <p className="text-[10px] text-stone-400">
              Nhấn vào rương để mở khóa danh hiệu và phần thưởng
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-5 text-stone-400 text-[11px] leading-relaxed">
          Không có rương nào chưa mở. Hoàn thành nhiệm vụ hàng ngày hoặc thi vượt ải chặng để kiếm rương kho báu! 🏆
        </div>
      )}

      {/* Reward Reveal Panel */}
      {opening && rewardReveal && (
        <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-xl relative space-y-5 animate-[scaleIn_0.3s_ease-out]">
            <div className="w-16 h-16 mx-auto bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-600">
                Bạn đã mở rương nhận được
              </span>
              <h3 className="text-lg font-black text-stone-900 flex items-center justify-center gap-1.5">
                {rewardReveal.type === "title" && <Trophy className="w-5 h-5 text-amber-500" />}
                {rewardReveal.value}
                {rewardReveal.type === "xp" && " XP"}
              </h3>
              <p className="text-xs text-stone-500">
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
      )}
    </div>
  );
}
