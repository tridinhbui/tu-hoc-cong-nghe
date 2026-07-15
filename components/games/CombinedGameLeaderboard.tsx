"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Gamepad2 } from "lucide-react";
import { getCombinedGameLeaderboard, getCombinedGameTitle, GAMES, type CombinedLeaderboardRow } from "@/lib/games";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// Sums each player's best-per-game XP across every mini-game (see
// getCombinedGameXp/get_combined_game_leaderboard) so playing a variety of
// games pays off, not just grinding one favorite.
export default function CombinedGameLeaderboard() {
  const [rows, setRows] = useState<CombinedLeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCombinedGameLeaderboard(10)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((error) => console.error("Error loading combined game leaderboard:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="py-10 text-center text-sm text-stone-400 dark:text-stone-500">Đang tải bảng xếp hạng...</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-stone-500 dark:text-stone-400">
        Chưa có ai lọt bảng tổng hợp. Chơi vài game để chiếm vị trí đầu tiên!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">
        Tổng XP tốt nhất của mỗi game cộng lại - chơi càng nhiều game khác nhau, điểm càng cao.
      </p>
      {rows.map((row, i) => {
        const rank = i + 1;
        const title = getCombinedGameTitle(rank);
        return (
          <div
            key={row.user_id}
            className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
              rank <= 3
                ? "border-amber-200 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20"
                : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
            }`}
          >
            <span className="w-7 text-center text-sm font-extrabold text-stone-500 dark:text-stone-400 flex-shrink-0">
              {RANK_MEDAL[rank] ?? rank}
            </span>
            {row.avatarUrl ? (
              <Image src={row.avatarUrl} alt={row.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-[10px] font-extrabold text-stone-600 dark:text-stone-300 flex-shrink-0">
                {row.name.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{row.name}</p>
              {title ? (
                <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {title}
                </p>
              ) : (
                <p className="text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1">
                  <Gamepad2 className="w-3 h-3" />
                  {row.gamesPlayed}/{GAMES.length} game
                </p>
              )}
            </div>
            <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100 flex-shrink-0">{row.totalXp} XP</span>
          </div>
        );
      })}
    </div>
  );
}
