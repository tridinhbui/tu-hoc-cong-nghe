"use client";

import { useEffect, useState } from "react";
import { getGameHistory, type GameSession, type GameType } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { panel } from "@/components/ui/system";

export default function GameHistory({ userId, gameType }: { userId: string; gameType: GameType }) {
  const { t, locale } = useI18n();
  const gh = t.games.gameHistory;
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
    return <div className="py-10 text-center text-sm text-ink-faint">{gh.loading}</div>;
  }

  if (sessions.length === 0) {
    return <div className="py-10 text-center text-sm text-ink-muted">{gh.empty}</div>;
  }

  return (
    <div className={`${panel} divide-y divide-stone-200 dark:divide-stone-800`}>
      {sessions.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between gap-3 px-3.5 py-2.5"
        >
          <div>
            <p className="text-sm font-bold text-ink-max">
              {format(gh.scoreCorrect, { score: s.score, total: s.total })}
            </p>
            <p className="font-mono text-[11px] tabular-nums text-ink-muted">
              {new Date(s.created_at).toLocaleString(intlLocale(locale), { dateStyle: "short", timeStyle: "short" })}
            </p>
          </div>
          <span
            className={`rounded-xs border px-1.5 py-0.5 font-mono text-xs font-medium tabular-nums ${
              s.xp_earned > 0
                ? "border-brand-300 text-brand-700 dark:border-brand-700 dark:text-brand-300"
                : "border-stone-300 text-ink-muted dark:border-stone-700"
            }`}
          >
            {s.xp_earned > 0 ? format(gh.xpEarned, { xp: s.xp_earned }) : gh.noXp}
          </span>
        </div>
      ))}
    </div>
  );
}
