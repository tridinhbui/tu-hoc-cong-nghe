"use client";

import Link from "next/link";
import Avatar from "@/components/Avatar";
import RankBadge from "@/components/games/RankBadge";
import { APP_SYS } from "@/components/analytics/system-codes";

export type RankTableRow = {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  value: number;
  /** Dòng phụ dưới tên - chỉ dữ liệu thật (vd. chức danh nghề người học tự đặt). */
  sub?: string | null;
};

/**
 * Bảng xếp hạng theo ngôn ngữ bảng hệ thống của trang chủ: các hàng chia bằng
 * đường kẻ 1px, hạng nằm trong một rãnh mono bên trái, giá trị mono
 * tabular-nums căn phải thẳng cột. Hàng của người đang xem nền brand-50 -
 * xanh ở đây là chức năng ("đây là bạn"), không phải trang trí.
 *
 * Ba hạng đầu giữ RankBadge (chấm tô màu kim loại nhỏ) - thứ duy nhất được
 * phép khác màu trong bảng. Không bục, không cúp, không vầng sáng.
 */
export default function RankTable({
  rows,
  userId,
  formatValue,
  startRank = 1,
  youLabel,
  dense = false,
  linkRows = true,
}: {
  rows: RankTableRow[];
  userId?: string;
  formatValue: (v: number) => string;
  startRank?: number;
  /** Nếu có, hàng của người đang xem hiện chữ này thay cho tên. */
  youLabel?: string;
  dense?: boolean;
  linkRows?: boolean;
}) {
  return (
    <ol className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
      {rows.map((row, i) => {
        const rank = startRank + i;
        const isMe = !!userId && row.user_id === userId;
        const inner = (
          <>
            <span className="flex w-7 shrink-0 justify-center">
              {rank <= 3 ? (
                <RankBadge rank={rank} className="font-mono" />
              ) : (
                <span className="font-mono text-xs tabular-nums text-ink-muted">{APP_SYS.rank(rank)}</span>
              )}
            </span>
            <Avatar key={row.avatarUrl ?? row.user_id} name={row.name} url={row.avatarUrl} size={dense ? 24 : 28} />
            <span className="min-w-0 flex-1">
              <span
                className={`block truncate text-sm ${isMe ? "font-black text-accent-strong" : "font-semibold text-ink"}`}
              >
                {isMe && youLabel ? youLabel : row.name}
              </span>
              {row.sub && <span className="block truncate text-[11px] font-medium text-ink-muted">{row.sub}</span>}
            </span>
            <span
              className={`shrink-0 text-right font-mono text-sm font-medium tabular-nums ${
                isMe ? "text-accent-strong" : "text-ink-max"
              }`}
            >
              {formatValue(row.value)}
            </span>
          </>
        );
        const rowClass = `flex items-center gap-3 px-2 ${dense ? "py-1.5" : "py-2.5"} transition-colors ${
          isMe ? "bg-brand-50 dark:bg-brand-950/40" : "hover:bg-[#f3f1ec] dark:hover:bg-stone-800/60"
        }`;
        return (
          <li key={row.user_id}>
            {linkRows ? (
              <Link href={isMe ? "/profile" : `/nguoi-hoc/${row.user_id}`} className={rowClass}>
                {inner}
              </Link>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
