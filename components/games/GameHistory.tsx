"use client";

import { useEffect, useState } from "react";
import { getGameHistory, type GameSession, type GameType } from "@/lib/games";

export default function GameHistory({ userId, gameType }: { userId: string; gameType: GameType }) {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  // `loading` suy ra từ chỗ dữ liệu đã tải xong cho khoá nào, không phải một
  // cờ riêng bật lên ở đầu effect. Cờ riêng có hai nhược điểm: nó là setState
  // đồng bộ trong effect - đúng thứ React khuyên tránh - và nó tách rời khỏi
  // dữ liệu, nên mọi nhánh thoát mới phải nhớ tắt nó đi.
  const loadedFor = `${userId}::${gameType}`;
  const loading = loadedKey !== loadedFor;

  useEffect(() => {
    let cancelled = false;
    getGameHistory(userId, gameType)
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .catch((error) => console.error("Error loading game history:", error))
      .finally(() => {
        if (!cancelled) setLoadedKey(loadedFor);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, gameType, loadedFor]);

  if (loading) {
    return <div className="py-10 text-center text-sm text-stone-400">Đang tải lịch sử...</div>;
  }

  if (sessions.length === 0) {
    return <div className="py-10 text-center text-sm text-stone-500">Bạn chưa chơi game này lần nào.</div>;
  }

  return (
    <div className="space-y-2">
      {sessions.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3.5 py-2.5"
        >
          <div>
            <p className="text-sm font-bold text-stone-900">
              {s.score}/{s.total} đúng
            </p>
            <p className="text-xs text-stone-500">
              {new Date(s.created_at).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}
            </p>
          </div>
          <span
            className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
              s.xp_earned > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {s.xp_earned > 0 ? `+${s.xp_earned} XP` : "Không đạt XP"}
          </span>
        </div>
      ))}
    </div>
  );
}
