"use client";

import { useEffect, useState } from "react";
import { getGameHistory, type GameSession, type GameType } from "@/lib/games";

export default function GameHistory({ userId, gameType }: { userId: string; gameType: GameType }) {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getGameHistory(userId, gameType)
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .catch((error) => console.error("Error loading game history:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, gameType]);

  if (loading) {
    return <div className="py-10 text-center text-sm text-stone-400 dark:text-stone-500">Đang tải lịch sử...</div>;
  }

  if (sessions.length === 0) {
    return <div className="py-10 text-center text-sm text-stone-500 dark:text-stone-400">Bạn chưa chơi game này lần nào.</div>;
  }

  return (
    <div className="space-y-2">
      {sessions.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3.5 py-2.5"
        >
          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {s.score}/{s.total} đúng
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {new Date(s.created_at).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
            </p>
          </div>
          <span
            className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
              s.xp_earned > 0
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
            }`}
          >
            {s.xp_earned > 0 ? `+${s.xp_earned} XP` : "Không đạt XP"}
          </span>
        </div>
      ))}
    </div>
  );
}
