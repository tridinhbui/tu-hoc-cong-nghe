"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Gamepad2, Trophy, History as HistoryIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuthGate } from "@/lib/use-auth-gate";
import { GAMES, getGameMeta, type GameType } from "@/lib/games";
import { recalculateUserStats } from "@/lib/supabase-user";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import GameHistory from "@/components/games/GameHistory";
import BucketGame from "@/components/games/BucketGame";
import PairGame from "@/components/games/PairGame";

type InnerTab = "play" | "leaderboard" | "history";

const ACCENT: Record<string, { grad: string; ring: string; chip: string }> = {
  emerald: { grad: "from-emerald-500 to-teal-500", ring: "hover:border-emerald-400 dark:hover:border-emerald-600", chip: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" },
  sky: { grad: "from-sky-500 to-blue-500", ring: "hover:border-sky-400 dark:hover:border-sky-600", chip: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300" },
  amber: { grad: "from-amber-500 to-orange-500", ring: "hover:border-amber-400 dark:hover:border-amber-600", chip: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" },
  violet: { grad: "from-violet-500 to-purple-500", ring: "hover:border-violet-400 dark:hover:border-violet-600", chip: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300" },
  rose: { grad: "from-rose-500 to-pink-500", ring: "hover:border-rose-400 dark:hover:border-rose-600", chip: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300" },
};

export default function GameHubClient() {
  const { userId, checking } = useAuthGate();
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [innerTab, setInnerTab] = useState<InnerTab>("play");

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

          <div className="grid sm:grid-cols-2 gap-3.5">
            {GAMES.map((g) => {
              const a = ACCENT[g.accent] ?? ACCENT.emerald;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setActiveGame(g.id);
                    setInnerTab("play");
                  }}
                  className={`group text-left rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5 transition-all hover:shadow-lg ${a.ring}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${a.grad} text-white text-2xl flex items-center justify-center shadow-sm`}>
                      {g.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100">{g.title}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">{g.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 mt-4 text-xs font-bold px-2.5 py-1.5 rounded-lg ${a.chip}`}>
                    Chơi ngay
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </button>
              );
            })}
          </div>
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
