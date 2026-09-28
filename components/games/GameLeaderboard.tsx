"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RankBadge from "@/components/games/RankBadge";
import { getGameLeaderboard, getGameTitle, type GameLeaderboardRow, type GameType } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { panel } from "@/components/ui/system";
import { localizeGameTitle } from "@/lib/games-i18n";

export default function GameLeaderboard({ gameType }: { gameType: GameType }) {
  const { t, locale } = useI18n();
  const gl = t.games.gameLeaderboard;
  const [rows, setRows] = useState<GameLeaderboardRow[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  // `loading` suy ra từ chỗ dữ liệu đã tải xong cho khoá nào, không phải một
  // cờ riêng bật lên ở đầu effect. Cờ riêng có hai nhược điểm: nó là setState
  // đồng bộ trong effect - đúng thứ React khuyên tránh - và nó tách rời khỏi
  // dữ liệu, nên mọi nhánh thoát mới phải nhớ tắt nó đi.
  const loading = loadedKey !== gameType;

  useEffect(() => {
    let cancelled = false;
    getGameLeaderboard(gameType, 10)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((error) => console.error("Error loading game leaderboard:", error))
      .finally(() => {
        if (!cancelled) setLoadedKey(gameType);
      });
    return () => {
      cancelled = true;
    };
  }, [gameType]);

  if (loading) {
    return <div className="py-10 text-center text-sm text-ink-faint">{gl.loading}</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-ink-muted">
        {gl.empty}
      </div>
    );
  }

  return (
    <div className={`${panel} divide-y divide-stone-200 dark:divide-stone-800`}>
      {rows.map((row, i) => {
        const rank = i + 1;
        const title = localizeGameTitle(getGameTitle(gameType, rank), gameType, rank, locale);
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
              {title && (
                <p className="text-[11px] font-semibold text-ink-muted">{title}</p>
              )}
            </div>
            <span className="flex-shrink-0 font-mono text-sm font-medium tabular-nums text-ink-max">
              {row.bestScore}/{row.bestTotal}
            </span>
          </div>
        );
      })}
    </div>
  );
}
