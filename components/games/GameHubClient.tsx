"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Gamepad2, Trophy, History as HistoryIcon, Swords } from "lucide-react";
import { useAuthGate } from "@/lib/use-auth-gate";
import { GAMES, type GameType } from "@/lib/games";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import GameHistory from "@/components/games/GameHistory";
import FinancialStatementGame from "@/components/games/FinancialStatementGame";
import TermMatchGame from "@/components/games/TermMatchGame";

type InnerTab = "play" | "leaderboard" | "history";

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
    if (xpEarned > 0) {
      toast.success(`Hoàn thành! ${score}/${total} đúng - nhận +${xpEarned} XP`);
    } else {
      toast.info(`Được ${score}/${total} - cần đúng ít nhất 70% để nhận XP. Thử lại nhé!`);
    }
    setInnerTab("leaderboard");
  }

  if (!activeGame) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6 flex items-center gap-2.5">
            <Gamepad2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Mini Game
              </p>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Kéo thả để ghi nhớ kiến thức</h1>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGame(g.id);
                  setInnerTab("play");
                }}
                className="text-left rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{g.emoji}</span>
                <p className="font-bold text-stone-900 dark:text-stone-100 mt-3">{g.title}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">{g.description}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Chơi ngay <Swords className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const meta = GAMES.find((g) => g.id === activeGame)!;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => setActiveGame(null)}
          className="text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4"
        >
          ← Chọn game khác
        </button>

        <div className="mb-4 sm:mb-6 flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl">{meta.emoji}</span>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">{meta.title}</h1>
        </div>

        <div className="flex gap-1 sm:gap-1.5 mb-4 sm:mb-6 bg-stone-100 dark:bg-stone-900 rounded-xl p-1 sm:p-1.5">
          {[
            { id: "play" as const, label: "Chơi", icon: Gamepad2 },
            { id: "leaderboard" as const, label: "BXH", icon: Trophy },
            { id: "history" as const, label: "Lịch sử", icon: HistoryIcon },
          ].map(({ id, label, icon: Icon }) => (
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
              <span className="sm:hidden">{id === "leaderboard" ? "BXH" : id === "play" ? "Chơi" : "LS"}</span>
            </button>
          ))}
        </div>

        {innerTab === "play" &&
          (activeGame === "financial-statement-match" ? (
            <FinancialStatementGame userId={userId} onFinished={handleFinished} />
          ) : (
            <TermMatchGame userId={userId} onFinished={handleFinished} />
          ))}
        {innerTab === "leaderboard" && <GameLeaderboard gameType={activeGame} />}
        {innerTab === "history" && <GameHistory userId={userId} gameType={activeGame} />}
      </div>
    </div>
  );
}
