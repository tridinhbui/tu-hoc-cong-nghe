"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { PublicActivity } from "@/lib/public-activity";

/**
 * Nhịp học của cộng đồng: đồ thị số bài hoàn thành mỗi ngày + dòng hoạt động
 * ẩn danh. Dữ liệu thật từ /api/public/activity - route đó đã bỏ mọi thông tin
 * định danh trước khi gửi, nên ở đây không có gì để giấu.
 *
 * Cùng ngôn ngữ với phần còn lại của trang chủ: góc vuông, viền 1px, số và thời
 * gian bằng mono, dữ liệu bằng màu xanh. Không có số giả khi đang tải - chỉ có
 * khung trống nhạt, và một câu nói thật khi không có hoạt động nào.
 */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** "14:32" nếu là hôm nay, "25/09 14:32" nếu là ngày khác - giờ trên máy người xem. */
function stamp(iso: string, now: Date) {
  const d = new Date(iso);
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const sameDay =
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  return sameDay ? time : `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${time}`;
}

function dayLabel(date: string) {
  const [, m, d] = date.split("-");
  return `${d}/${m}`;
}

export default function ActivityPanel() {
  const { t, locale } = useI18n();
  const s = t.home.social;
  const [data, setData] = useState<PublicActivity | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/public/activity?locale=${locale}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: PublicActivity) => !cancelled && setData(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Lỗi mạng thì dải này biến mất gọn, không để lại khung trống nói dối là
  // "đang tải" mãi.
  if (failed) return null;

  const daily = data?.daily ?? [];
  const max = Math.max(1, ...daily.map((x) => x.count));
  const total = daily.reduce((n, x) => n + x.count, 0);
  const now = new Date();

  return (
    <div className="mt-8 space-y-8">
      {/* Đồ thị cột */}
      <figure>
        <figcaption className="flex items-baseline justify-between gap-3 border-b border-stone-300 pb-1.5 dark:border-stone-700">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{s.chartTitle}</span>
          <span className="text-[11px] font-semibold text-ink-muted">
            {s.chartRange}
            {data && (
              <>
                {" · "}
                <span className="font-mono tabular-nums text-accent-strong">{format(s.chartTotal, { n: total })}</span>
              </>
            )}
          </span>
        </figcaption>
        <div
          role="img"
          aria-label={`${s.chartTitle}, ${s.chartRange}: ${format(s.chartTotal, { n: total })}`}
          className="mt-3 flex h-24 items-end gap-[3px]"
        >
          {(data ? daily : Array.from({ length: 14 }, () => null)).map((x, i) => (
            <div key={i} className="group relative flex h-full flex-1 items-end">
              <div
                title={x ? format(s.chartDayAria, { date: dayLabel(x.date), n: x.count }) : undefined}
                className={`w-full transition-colors ${
                  x
                    ? i === daily.length - 1
                      ? "bg-brand-700 dark:bg-brand-300"
                      : "bg-brand-600/70 group-hover:bg-brand-700 dark:bg-brand-400/70 dark:group-hover:bg-brand-300"
                    : "bg-surface-sunken"
                }`}
                // Cột bằng 0 vẫn cao 1px: một ngày không ai học là dữ liệu thật,
                // phải nhìn thấy được chứ không phải một khoảng trống.
                // Lúc chờ tải: cột ĐỀU nhau. Cột cao thấp khác nhau khi chưa có
                // dữ liệu là vẽ ra một hình dạng giả vờ là số liệu.
                style={{ height: x ? `${Math.max(1, (x.count / max) * 100)}%` : "12%" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between border-t border-stone-300 pt-1 dark:border-stone-700">
          <span className="font-mono text-[10.5px] tabular-nums text-ink-faint">{daily[0] ? dayLabel(daily[0].date) : " "}</span>
          <span className="font-mono text-[10.5px] tabular-nums text-ink-faint">
            {daily.length ? dayLabel(daily[daily.length - 1].date) : " "}
          </span>
        </div>
      </figure>

      {/* Dòng hoạt động */}
      <div>
        <div className="flex items-baseline justify-between gap-3 border-b border-stone-300 pb-1.5 dark:border-stone-700">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{s.activityTitle}</span>
        </div>
        {!data ? (
          <ul aria-hidden className="divide-y divide-stone-200 dark:divide-stone-800">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-3 py-2.5">
                <span className="h-2.5 w-10 bg-surface-sunken" />
                <span className="h-2.5 flex-1 bg-surface-sunken" />
              </li>
            ))}
          </ul>
        ) : data.items.length === 0 ? (
          <p className="py-3 text-[13px] text-ink-muted">{s.activityEmpty}</p>
        ) : (
          <ol className="divide-y divide-stone-200 dark:divide-stone-800">
            {data.items.slice(0, 6).map((item, i) => (
              <li key={`${item.at}-${i}`} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 py-2">
                <time dateTime={item.at} className="font-mono text-[11px] tabular-nums text-ink-faint">
                  {stamp(item.at, now)}
                </time>
                <span className="min-w-0 truncate text-[13px] text-ink-body">
                  <span className="text-ink-muted">{s.activityCompleted} </span>
                  <Link href={`/bai-hoc/${item.lessonSlug}`} className="font-semibold text-ink-max hover:text-accent-strong hover:underline">
                    {item.lessonTitle}
                  </Link>
                </span>
                {item.streak > 0 && (
                  <span className="whitespace-nowrap text-[11px] font-semibold text-ink-muted">
                    {format(s.activityStreak, { n: item.streak })}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
        <p className="mt-2 text-[11px] leading-snug text-ink-faint">{s.activityNote}</p>
      </div>
    </div>
  );
}
