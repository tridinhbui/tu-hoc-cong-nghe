"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Gamepad2 } from "lucide-react";
import RankBadge from "@/components/games/RankBadge";
import { getCombinedGameLeaderboard, getCombinedGameTitle, GAMES, type CombinedLeaderboardRow } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { panel } from "@/components/ui/system";
import { localizeCombinedGameTitle } from "@/lib/games-i18n";
import { format } from "@/lib/i18n";

// Sums each player's best-per-game XP across every mini-game (see
// getCombinedGameXp/get_combined_game_leaderboard) so playing a variety of
// games pays off, not just grinding one favorite.
export default function CombinedGameLeaderboard() {
  const { t, locale } = useI18n();
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
    return <div className="py-10 text-center text-sm text-ink-faint">{cl.loading}</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-ink-muted">
        {cl.empty}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs text-ink-soft">
        {cl.subtitle}
      </p>
      <div className={`${panel} divide-y divide-stone-200 dark:divide-stone-800`}>
      {rows.map((row, i) => {
        const rank = i + 1;
        const title = localizeCombinedGameTitle(getCombinedGameTitle(rank), rank, locale);
        return (
          <div
            key={row.user_id}
            className="flex items-center gap-3 px-3.5 py-2.5"
          >
            <span className="flex w-7 flex-shrink-0 justify-center text-sm text-ink-muted">
              <RankBadge rank={rank} />
            </span>
            {isValidAvatar(row.avatarUrl) ? (
              <Image src={row.avatarUrl} alt={row.name} width={28} height={28} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-[10px] font-extrabold text-stone-600 dark:bg-stone-700 dark:text-stone-200">
                {row.name.trim().charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-ink-max">{row.name}</p>
              {title ? (
                <p className="text-[11px] font-semibold text-ink-muted">{title}</p>
              ) : (
                <p className="flex items-center gap-1 text-[11px] text-ink-faint">
                  <Gamepad2 className="w-3 h-3" />
                  {format(cl.gamesPlayed, { played: row.gamesPlayed, total: GAMES.length })}
                </p>
              )}
            </div>
            <span className="flex-shrink-0 font-mono text-sm font-medium tabular-nums text-ink-max">{format(cl.totalXp, { xp: row.totalXp })}</span>
          </div>
        );
      })}
      </div>
    </div>
  );
}
