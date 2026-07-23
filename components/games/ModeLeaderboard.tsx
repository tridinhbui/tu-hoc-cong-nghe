"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getGameLeaderboard, type AnyGameType, type GameLeaderboardRow } from "@/lib/games";

interface ModeLeaderboardProps {
  gameType: AnyGameType;
  title: string;
  emptyLabel?: string;
  formatter?: (entry: GameLeaderboardRow) => string;
}

export default function ModeLeaderboard({
  gameType,
  title,
  emptyLabel = "Chưa có dữ liệu xếp hạng.",
  formatter,
}: ModeLeaderboardProps) {
  const [rows, setRows] = useState<GameLeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getGameLeaderboard(gameType, 5)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((error) => {
        console.error(`Error loading leaderboard for ${gameType}:`, error);
        if (!cancelled) setRows([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameType]);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-500" />
        <h4 className="text-xs font-black uppercase tracking-[0.16em] text-stone-700">{title}</h4>
      </div>

      {loading ? (
        <p className="text-xs font-semibold text-stone-400">Đang tải BXH...</p>
      ) : rows.length === 0 ? (
        <p className="text-xs font-semibold text-stone-400">{emptyLabel}</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row, idx) => (
            <div
              key={`${row.user_id}-${idx}`}
              className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/80 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-700">
                  {idx + 1}
                </span>
                <span className="max-w-[150px] truncate text-xs font-bold text-stone-800">{row.name}</span>
              </div>
              <span className="text-xs font-black text-emerald-600">
                {formatter ? formatter(row) : `${row.bestScore}/${row.bestTotal}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
