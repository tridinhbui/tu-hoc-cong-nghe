"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { getGameLeaderboard, getGameTitle, type GameLeaderboardRow, type GameType } from "@/lib/games";
import { isValidAvatar } from "@/lib/avatar-utils";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function GameLeaderboard({ gameType }: { gameType: GameType }) {
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
    return <div className="py-10 text-center text-sm text-stone-400">Đang tải bảng xếp hạng...</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-stone-500">
        Chưa có ai chơi game này. Chơi ngay để chiếm vị trí đầu tiên!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {rows.map((row, i) => {
        const rank = i + 1;
        const title = getGameTitle(gameType, rank);
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
              {title && (
                <p className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {title}
                </p>
              )}
            </div>
            <span className="text-sm font-extrabold text-stone-900 flex-shrink-0">
              {row.bestScore}/{row.bestTotal}
            </span>
          </div>
        );
      })}
    </div>
  );
}
