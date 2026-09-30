"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/cloudflare";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { SectionHead, panel } from "@/components/ui/system";
import { APP_SYS } from "@/components/analytics/system-codes";

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

  const eyebrow = "text-[11px] font-bold uppercase tracking-[0.08em] text-accent-strong";

  return (
    <section className={`${panel} p-4 sm:p-5`}>
      <SectionHead code={APP_SYS.focus} title={t.focusTime.cardTitle} sub={t.focusTime.cardSubtitle} size="sm" />

      {/* Ba số: ô băng nhạt thay cho bảng chia đường kẻ xám. */}
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: t.focusTime.statTotal, value: format(t.focusTime.statTotalValue, { minutes: stats.totalMinutes }) },
          { label: t.focusTime.statSessions, value: String(stats.sessions) },
          { label: t.focusTime.statAverage, value: format(t.focusTime.statAverageValue, { minutes: stats.averageMinutes }) },
        ].map((s) => (
          <div key={s.label} className="min-w-0 rounded-control bg-surface-raised px-3 py-2">
            <dt className="truncate text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-muted">{s.label}</dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold tabular-nums text-ink-max">{s.value}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-4">
        <figcaption className={`mb-2 ${eyebrow}`}>{t.focusTime.last7DaysTitle}</figcaption>
        <div className="flex h-20 items-end gap-[3px]">
          {stats.days.map((d, i) => (
            <div key={d.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div
                className={`w-full rounded-t-[3px] ${i === stats.days.length - 1 ? "bg-brand-700 dark:bg-brand-300" : "bg-brand-300 dark:bg-brand-700"}`}
                style={{ height: `${Math.max(2, (d.minutes / peak) * 100)}%` }}
                title={format(t.focusTime.barTooltip, { day: d.key, minutes: d.minutes })}
              />
              <span className="font-mono text-[10px] tabular-nums text-ink-faint">{d.minutes}</span>
            </div>
          ))}
        </div>
      </figure>

      <div className="mt-4">
        <p className={`mb-1 ${eyebrow}`}>{t.focusTime.whereSatTitle}</p>
        <dl className="divide-y divide-line-soft">
          {stats.worlds.map((w) => (
            <div key={w.world} className="flex items-center gap-3 py-1.5 text-xs">
              <dt className="w-24 shrink-0 font-semibold text-ink-body">{WORLD_LABELS[w.world] ?? w.world}</dt>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunken" aria-hidden>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 dark:from-brand-400 dark:to-sky-300"
                  style={{ width: `${Math.round((w.minutes / Math.max(1, stats.totalMinutes)) * 100)}%` }}
                />
              </div>
              <dd className="w-16 shrink-0 text-right font-mono tabular-nums text-ink-max">
                {format(t.focusTime.minutesSuffix, { minutes: w.minutes })}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
