"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";

// Small public teaser of the real leaderboard, shown to signed-out visitors
// on the homepage - social proof that real people are actively using the
// site, not just a claim in the hero copy. Degrades to nothing if the data
// isn't available yet (fresh install, RPC not migrated) rather than showing
// an empty/broken card to a cold visitor.
export default function PublicLeaderboardPreview() {
  const [top, setTop] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric("xp", 9)
      .then((rows) => {
        if (!cancelled) setTop(rows);
      })
      .catch((error) => console.error("Error loading public leaderboard preview:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  if (top.length === 0) return null;

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-3">
      <div className="flex items-center gap-1.5 mb-2.5 text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
        <span className="relative flex w-1.5 h-1.5">
          <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
        </span>
        Học viên nổi bật · số liệu thật, cập nhật trực tiếp
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3">
        {top.map((entry, idx) => (
          <div key={entry.user_id} className="flex items-center gap-2 min-w-0 rounded-2xl border border-stone-100 bg-stone-50/70 px-2.5 py-2 dark:border-stone-800 dark:bg-stone-800/40">
            <div className="relative flex-shrink-0">
              {entry.avatarUrl ? (
                <Image
                  src={entry.avatarUrl}
                  alt={entry.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                />
              ) : (
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-extrabold">
                  {entry.name.trim().charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-extrabold border border-white dark:border-stone-900 ${
                  idx === 0
                    ? "bg-amber-300 text-amber-900"
                    : idx === 1
                      ? "bg-gray-300 text-gray-900"
                      : "bg-amber-100 text-amber-800"
                }`}
              >
                {idx + 1}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {entry.name}
              </p>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">{entry.value} XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
