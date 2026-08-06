"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Thời gian đã ngồi học trong thế giới 3D.
 *
 *  Bảng focus_sessions ghi từng phiên với hai mốc thời gian do server đặt, và
 *  cho tới giờ KHÔNG màn hình nào đọc nó - nên mọi câu hỏi về thế giới 3D đều
 *  phải đoán: người ta có đi bộ thật không hay chỉ bấm "vào thẳng phòng"?
 *  Phòng nào không ai vào? Bảng này là chỗ trả lời, và nó đọc dữ liệu của
 *  chính người đang xem (RLS chỉ cho đọc dòng của mình).
 *
 *  Không có biểu đồ: bảy con số và một dãy cột là đủ để thấy xu hướng, còn một
 *  thư viện biểu đồ nữa trong bundle thì không đáng cho một tấm thẻ. */

interface SessionRow {
  world: string;
  seconds: number | null;
  started_at: string;
}

function dayKey(d: Date) {
  return d.toLocaleDateString("sv-SE");
}

export default function FocusTimePanel({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [rows, setRows] = useState<SessionRow[] | null>(null);

  // World ids ("thu-vien" / "nhom-hoc" / "pho-nghe") are the storage keys
  // written by the 3D world - kept byte-identical here, only the displayed
  // label is translated.
  const WORLD_LABELS: Record<string, string> = {
    "thu-vien": t.focusTime.worldLibrary,
    "nhom-hoc": t.focusTime.worldGroupRoom,
    "pho-nghe": t.focusTime.worldCareerStreet,
  };

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    // 30 ngày gần nhất: đủ để thấy thói quen, và đủ ít để không phải phân trang.
    const since = new Date();
    since.setDate(since.getDate() - 29);
    since.setHours(0, 0, 0, 0);
    void createClient()
      .from("focus_sessions")
      .select("world, seconds, started_at")
      .eq("user_id", userId)
      .gte("started_at", since.toISOString())
      .then(({ data }) => {
        if (!cancelled) setRows((data as SessionRow[]) ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const stats = useMemo(() => {
    if (!rows) return null;
    const byDay = new Map<string, number>();
    const byWorld = new Map<string, number>();
    let total = 0;
    let sessions = 0;
    for (const r of rows) {
      const secs = r.seconds ?? 0;
      // Phiên chưa đóng (seconds null) không tính: nó có thể là một tab đang mở
      // ngay lúc này, và cộng nó vào tổng sẽ ra con số nhảy mỗi lần tải trang.
      if (secs <= 0) continue;
      total += secs;
      sessions += 1;
      const key = dayKey(new Date(r.started_at));
      byDay.set(key, (byDay.get(key) ?? 0) + secs);
      byWorld.set(r.world, (byWorld.get(r.world) ?? 0) + secs);
    }
    const days: Array<{ key: string; minutes: number }> = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      days.push({ key, minutes: Math.round((byDay.get(key) ?? 0) / 60) });
    }
    return {
      totalMinutes: Math.round(total / 60),
      sessions,
      averageMinutes: sessions > 0 ? Math.round(total / sessions / 60) : 0,
      days,
      worlds: [...byWorld.entries()]
        .map(([world, secs]) => ({ world, minutes: Math.round(secs / 60) }))
        .sort((a, b) => b.minutes - a.minutes),
    };
  }, [rows]);

  if (!stats) return null;

  // Chưa từng ngồi học lần nào thì không hiện một tấm thẻ toàn số 0 - nó không
  // nói gì ngoài việc trách người đọc.
  if (stats.sessions === 0) return null;

  const peak = Math.max(1, ...stats.days.map((d) => d.minutes));

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
            {t.focusTime.cardTitle}
          </h3>
          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            {t.focusTime.cardSubtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: t.focusTime.statTotal, value: format(t.focusTime.statTotalValue, { minutes: stats.totalMinutes }) },
          { label: t.focusTime.statSessions, value: String(stats.sessions) },
          { label: t.focusTime.statAverage, value: format(t.focusTime.statAverageValue, { minutes: stats.averageMinutes }) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-stone-50 px-3 py-2 dark:bg-stone-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {s.label}
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900 dark:text-stone-100">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {t.focusTime.last7DaysTitle}
        </p>
        <div className="flex h-20 items-end gap-1.5">
          {stats.days.map((d) => (
            <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-emerald-500/80 transition-all"
                style={{ height: `${Math.max(2, (d.minutes / peak) * 100)}%` }}
                title={format(t.focusTime.barTooltip, { day: d.key, minutes: d.minutes })}
              />
              <span className="text-[9px] tabular-nums text-stone-400">{d.minutes}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {t.focusTime.whereSatTitle}
        </p>
        <div className="space-y-1">
          {stats.worlds.map((w) => (
            <div key={w.world} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0 font-bold text-stone-700 dark:text-stone-300">
                {WORLD_LABELS[w.world] ?? w.world}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.round((w.minutes / Math.max(1, stats.totalMinutes)) * 100)}%` }}
                />
              </div>
              <span className="w-14 shrink-0 text-right tabular-nums text-stone-500 dark:text-stone-400">
                {format(t.focusTime.minutesSuffix, { minutes: w.minutes })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
