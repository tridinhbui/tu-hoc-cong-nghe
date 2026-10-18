"use client";

import { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { getXpLeaderboardSince, type LeaderboardRow } from "@/lib/cloudflare-user";
import { LiveDot } from "@/components/LiveNumber";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Tên trên trang công khai: tên gọi + chữ cái đầu của họ ("Bùi Đình Trí" ->
 *  "Trí B."). Trang này ai cũng mở được, kể cả người không có tài khoản, nên
 *  không hiện họ tên đầy đủ. Tên một chữ thường là phần trước @ của email
 *  (DISPLAY_NAME trong lib/d1/rpc.ts rơi về đó khi chưa đặt tên) - chỉ giữ ba
 *  ký tự đầu. */
export function publicLearnerName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return `${words[words.length - 1]} ${words[0].charAt(0).toUpperCase()}.`;
  const one = words[0] ?? "";
  return one.length > 3 ? `${one.slice(0, 3)}…` : one;
}

/**
 * "Bảng xếp hạng tuần này" ở cột trái trang đăng nhập: năm người có nhiều XP
 * nhất trong 7 ngày qua, vẽ thành thanh ngang - lý do để vào học hôm nay chứ
 * không phải một danh sách để đọc. Số thật từ `get_xp_leaderboard_since`, cùng
 * phép tính với bảng xếp hạng tuần trong app. Chưa ai có XP tuần này thì không
 * hiện gì, thay vì một bảng trống.
 */
export default function LoginLeaderboard() {
  const { t, locale } = useI18n();
  const l = t.login;
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getXpLeaderboardSince(new Date(Date.now() - WEEK_MS), 5)
      .then((data) => {
        if (cancelled) return;
        setRows(data.filter((r) => r.value > 0));
        // Một khung hình sau khi dựng thì thanh mới dài ra: transition chạy
        // từ 0 tới độ dài thật thay vì hiện sẵn.
        requestAnimationFrame(() => !cancelled && setGrown(true));
      })
      .catch(() => !cancelled && setRows([]));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!rows || rows.length === 0) return null;
  const max = rows[0].value;

  return (
    <section className="mt-7 max-w-xl border-2 border-line-strong bg-white/60 dark:bg-white/[0.04]">
      <header className="flex items-center justify-between gap-3 border-b border-line-strong px-4 py-2.5">
        <h2 className="flex items-center gap-2.5 text-[13px] font-black uppercase tracking-wide">
          <LiveDot />
          {l.leaderboardTitle}
        </h2>
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted">{l.leaderboardSub}</span>
      </header>
      <ol className="space-y-2.5 px-4 py-3.5">
        {rows.map((r, i) => {
          const pct = max > 0 ? Math.max(8, Math.round((r.value / max) * 100)) : 0;
          const first = i === 0;
          return (
            <li key={r.user_id} className="grid grid-cols-[1.5rem_6.5rem_1fr] items-center gap-3 sm:grid-cols-[1.5rem_8rem_1fr]">
              <span className={`text-center font-mono text-sm font-black ${first ? "text-accent-strong" : "text-ink-muted"}`}>
                {first ? <Crown className="mx-auto h-4 w-4" aria-label="1" /> : i + 1}
              </span>
              <span className="truncate text-[13px] font-bold">{publicLearnerName(r.name)}</span>
              <span className="relative flex h-7 items-center overflow-hidden bg-surface-sunken">
                <span
                  className={`absolute inset-y-0 left-0 ${first ? "bg-brand-600" : "bg-brand-400/70"} transition-[width] duration-1000 ease-out motion-reduce:transition-none`}
                  style={{ width: grown ? `${pct}%` : "0%", transitionDelay: `${i * 120}ms` }}
                />
                <span className={`relative z-10 px-2 font-mono text-[12px] font-black tabular-nums ${first ? "text-white" : "text-ink-max"}`}>
                  {format(l.leaderboardXp, { xp: r.value.toLocaleString(intlLocale(locale)) })}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line-strong px-4 py-2.5 text-[12px] font-semibold text-accent-strong">{l.leaderboardCta}</p>
    </section>
  );
}
