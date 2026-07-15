"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Gamepad2, Trophy, History as HistoryIcon, ArrowLeft, Crown } from "lucide-react";
import Link from "next/link";
import { useAuthGate } from "@/lib/use-auth-gate";
import { GAMES, getGameMeta, type GameType } from "@/lib/games";
import { recalculateUserStats } from "@/lib/supabase-user";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import GameHistory from "@/components/games/GameHistory";
import BucketGame from "@/components/games/BucketGame";
import PairGame from "@/components/games/PairGame";
import CombinedGameLeaderboard from "@/components/games/CombinedGameLeaderboard";

type InnerTab = "play" | "leaderboard" | "history";
type HubTab = "games" | "combined";

const ACCENT: Record<string, { grad: string; ring: string; chip: string; glow: string; shadow: string }> = {
  emerald: {
    grad: "from-emerald-500 to-teal-500",
    ring: "hover:border-emerald-400 dark:hover:border-emerald-600",
    chip: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    glow: "bg-emerald-500/5 dark:bg-emerald-500/10",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_16px_32px_-10px_rgba(16,185,129,0.25)]"
  },
  sky: {
    grad: "from-sky-500 to-blue-500",
    ring: "hover:border-sky-400 dark:hover:border-sky-600",
    chip: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300",
    glow: "bg-sky-500/5 dark:bg-sky-500/10",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_16px_32px_-10px_rgba(14,165,233,0.25)]"
  },
  amber: {
    grad: "from-amber-500 to-orange-500",
    ring: "hover:border-amber-400 dark:hover:border-amber-600",
    chip: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
    glow: "bg-amber-500/5 dark:bg-amber-500/10",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_16px_32px_-10px_rgba(245,158,11,0.25)]"
  },
  violet: {
    grad: "from-violet-500 to-purple-500",
    ring: "hover:border-violet-400 dark:hover:border-violet-600",
    chip: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
    glow: "bg-violet-500/5 dark:bg-violet-500/10",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_16px_32px_-10px_rgba(139,92,246,0.25)]"
  },
  rose: {
    grad: "from-rose-500 to-pink-500",
    ring: "hover:border-rose-400 dark:hover:border-rose-600",
    chip: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    glow: "bg-rose-500/5 dark:bg-rose-500/10",
    shadow: "hover:shadow-[0_16px_32px_-10px_rgba(244,63,94,0.15)] dark:hover:shadow-[0_16px_32px_-10px_rgba(244,63,94,0.25)]"
  },
};

export default function GameHubClient() {
  const { userId, checking } = useAuthGate();
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [innerTab, setInnerTab] = useState<InnerTab>("play");
  const [hubTab, setHubTab] = useState<HubTab>("games");

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  function handleFinished(score: number, total: number, xpEarned: number) {
    if (xpEarned > 0) toast.success(`Hoàn thành! ${score}/${total} đúng - nhận +${xpEarned} XP`);
    else toast.info(`Được ${score}/${total} - cần đúng ít nhất 70% để nhận XP. Thử lại nhé!`);
    // Fold the game's best-per-game XP into the user's real total_xp/level
    // right away (best-effort - the session is already saved regardless).
    if (userId) void recalculateUserStats(userId).catch(() => {});
    setInnerTab("leaderboard");
  }

  if (!activeGame) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-4 flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              <Gamepad2 className="w-3.5 h-3.5" /> Mini Game
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Chơi để ghi nhớ kiến thức</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 mb-6">
            Kéo thả nhanh, nhớ lâu - vượt 70% mỗi ván để nhận XP và leo bảng xếp hạng riêng của từng game.
          </p>

          <div className="flex gap-1 sm:gap-1.5 mb-5 bg-stone-100 dark:bg-stone-900 rounded-xl p-1 sm:p-1.5 max-w-xs">
            {[
              { id: "games" as const, label: "Các game", icon: Gamepad2 },
              { id: "combined" as const, label: "BXH tổng hợp", icon: Crown },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setHubTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all ${
                  hubTab === id
                    ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {label}
              </button>
            ))}
          </div>

          {hubTab === "combined" ? (
            <CombinedGameLeaderboard />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {GAMES.map((g) => {
                const a = ACCENT[g.accent] ?? ACCENT.emerald;
                return (
                  <button
                    key={g.id}
                    onClick={() => {
                      setActiveGame(g.id);
                      setInnerTab("play");
                    }}
                    className={`group text-left rounded-2xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-900 p-5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${a.ring} ${a.shadow}`}
                  >
                    {/* Glowing background spot in the corner */}
                    <div className={`absolute -bottom-8 -right-8 w-24 h-24 ${a.glow} rounded-full blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-125`} />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <span className={`flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br ${a.grad} text-white text-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}>
                        {g.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-extrabold text-stone-900 dark:text-stone-50 group-hover:text-stone-950 dark:group-hover:text-white transition-colors">{g.title}</p>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 shrink-0 bg-stone-50 dark:bg-stone-950/60 px-1.5 py-0.5 rounded">
                            {g.mechanic === "bucket" ? "Phân loại 📥" : "Ghép cặp 🔗"}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">{g.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl transition-all duration-300 ${a.chip} group-hover:shadow-sm`}>
                        Chơi ngay
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const meta = getGameMeta(activeGame);
  const a = ACCENT[meta.accent] ?? ACCENT.emerald;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => setActiveGame(null)}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Chọn game khác
        </button>

        <div className="mb-4 sm:mb-6 flex items-center gap-3">
          <span className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.grad} text-white text-xl flex items-center justify-center flex-shrink-0`}>
            {meta.emoji}
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">{meta.title}</h1>
        </div>

        <div className="flex gap-1 sm:gap-1.5 mb-4 sm:mb-6 bg-stone-100 dark:bg-stone-900 rounded-xl p-1 sm:p-1.5">
          {[
            { id: "play" as const, label: "Chơi", short: "Chơi", icon: Gamepad2 },
            { id: "leaderboard" as const, label: "Bảng xếp hạng", short: "BXH", icon: Trophy },
            { id: "history" as const, label: "Lịch sử", short: "LS", icon: HistoryIcon },
          ].map(({ id, label, short, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setInnerTab(id)}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all ${
                innerTab === id
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        {innerTab === "play" &&
          (meta.mechanic === "bucket" ? (
            <BucketGame userId={userId} gameType={activeGame} onFinished={handleFinished} />
          ) : (
            <PairGame userId={userId} gameType={activeGame} onFinished={handleFinished} />
          ))}
        {innerTab === "leaderboard" && <GameLeaderboard gameType={activeGame} />}
        {innerTab === "history" && <GameHistory userId={userId} gameType={activeGame} />}
      </div>
    </div>
  );
}
