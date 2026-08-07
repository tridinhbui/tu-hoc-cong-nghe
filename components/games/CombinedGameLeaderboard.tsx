"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Gamepad2 } from "lucide-react";
import { getCombinedGameLeaderboard, getCombinedGameTitle, GAMES, type CombinedLeaderboardRow } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// Sums each player's best-per-game XP across every mini-game (see
// getCombinedGameXp/get_combined_game_leaderboard) so playing a variety of
// games pays off, not just grinding one favorite.
export default function CombinedGameLeaderboard() {
  const { t } = useI18n();
  const cl = t.games.combinedGameLeaderboard;
  const [rows, setRows] = useState<CombinedLeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Không bật lại cờ ở đây: effect chỉ chạy một lần (deps rỗng) và
    // `loading` đã khởi tạo bằng true.
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
    return <div className="py-10 text-center text-sm text-stone-400">{cl.loading}</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-stone-500">
        {cl.empty}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-stone-500 mb-1">
        {cl.subtitle}
      </p>
      {rows.map((row, i) => {
        const rank = i + 1;
        const title = getCombinedGameTitle(rank);
        return (
          <div
            key={row.user_id}
            className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 ${
              rank <= 3
                ? "border-amber-200 bg-amber-50/60"
                : "border-stone-200 bg-white"
            }`}
          >
            <span className="w-7 text-center text-sm font-extrabold text-stone-500 flex-shrink-0">
              {RANK_MEDAL[rank] ?? rank}
            </span>
            {isValidAvatar(row.avatarUrl) ? (
              <Image src={row.avatarUrl} alt={row.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-extrabold text-stone-600 flex-shrink-0">
                {row.name.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 truncate">{row.name}</p>
              {title ? (
                <p className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {title}
                </p>
              ) : (
                <p className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Gamepad2 className="w-3 h-3" />
                  {format(cl.gamesPlayed, { played: row.gamesPlayed, total: GAMES.length })}
                </p>
              )}
            </div>
            <span className="text-sm font-extrabold text-stone-900 flex-shrink-0">{format(cl.totalXp, { xp: row.totalXp })}</span>
          </div>
        );
      })}
    </div>
  );
}
