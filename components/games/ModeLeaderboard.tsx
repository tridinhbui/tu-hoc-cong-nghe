"use client";

import { useEffect, useState } from "react";
import { getGameLeaderboard, type AnyGameType, type GameLeaderboardRow } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import RankBadge from "@/components/games/RankBadge";
import { Frame } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị. */
const leaderboardPath = (gameType: string) => `leaderboard/${gameType}`;
/* i18n-ignore-end */

interface ModeLeaderboardProps {
  gameType: AnyGameType;
  title: string;
  emptyLabel?: string;
  formatter?: (entry: GameLeaderboardRow) => string;
}

export default function ModeLeaderboard({
  gameType,
  title,
  emptyLabel,
  formatter,
}: ModeLeaderboardProps) {
  const { t } = useI18n();
  const resolvedEmptyLabel = emptyLabel ?? t.games.modeLeaderboard.emptyDefault;
  const [rows, setRows] = useState<GameLeaderboardRow[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  // `loading` suy ra từ chỗ dữ liệu đã tải xong cho khoá nào, không phải một
  // cờ riêng bật lên ở đầu effect. Cờ riêng có hai nhược điểm: nó là setState
  // đồng bộ trong effect - đúng thứ React khuyên tránh - và nó tách rời khỏi
  // dữ liệu, nên mọi nhánh thoát mới phải nhớ tắt nó đi.
  const loading = loadedKey !== gameType;

  useEffect(() => {
    let cancelled = false;

    getGameLeaderboard(gameType, 5)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((error) => {
        console.error(`Error loading leaderboard for ${gameType}:`, error);
        if (!cancelled) setRows([]);
      })
      .finally(() => {
        if (!cancelled) setLoadedKey(gameType);
      });

    return () => {
      cancelled = true;
    };
  }, [gameType]);

  return (
    <Frame title={leaderboardPath(gameType)} bodyClassName="p-4">
      <h4 className="mb-3 text-sm font-black text-ink-max">{title}</h4>

      {loading ? (
        <p className="text-xs font-semibold text-ink-faint">{t.games.modeLeaderboard.loading}</p>
      ) : rows.length === 0 ? (
        <p className="text-xs font-semibold text-ink-muted">{resolvedEmptyLabel}</p>
      ) : (
        <div className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {rows.map((row, idx) => (
            <div
              key={`${row.user_id}-${idx}`}
              className="flex items-center justify-between gap-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex w-6 justify-center text-xs text-ink-muted">
                  <RankBadge rank={idx + 1} />
                </span>
                <span className="max-w-[180px] truncate text-sm font-semibold text-ink">{row.name}</span>
              </div>
              <span className="font-mono text-sm font-medium tabular-nums text-ink-max">
                {formatter ? formatter(row) : `${row.bestScore}/${row.bestTotal}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </Frame>
  );
}
