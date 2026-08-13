"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";
import Avatar from "@/components/Avatar";
import { useI18n } from "@/lib/i18n/context";

/** Bảng xếp hạng thu nhỏ ở cột phải của FinSocial.
 *
 *  Đọc qua `getLeaderboardByMetric` - cùng RPC `get_leaderboard` mà trang /bxh
 *  dùng, nên hai chỗ không thể nói hai thứ tự khác nhau. Không truy vấn
 *  `user_stats` join `user_profiles` từ trình duyệt: RLS của `user_profiles`
 *  chỉ cho `auth.uid() = id`, và embed của PostgREST là inner join, nên câu ấy
 *  sẽ lặng lẽ trả về đúng một hàng của chính người đang xem. Chú thích ở
 *  lib/supabase-user.ts kể lại đúng lần mắc ấy.
 *
 *  KHỐI TỰ ẨN khi bảng rỗng, giống CommunityLearningNow: một thẻ xếp hạng
 *  không có ai trong đó chỉ chiếm chỗ ở cột vốn đã dài.
 *
 *  Năm dòng, không cuộn. Đây là thẻ DẪN SANG bảng đầy đủ chứ không phải bản sao
 *  thu nhỏ của nó - ai muốn xem đủ thì bấm dòng cuối.
 *
 *  Bảng đầy đủ nằm ở /analytics. Chú thích này từng ghi /bxh, và cái tên đó đã
 *  sai ngay trong chính commit thêm thẻ: phần `href` bên dưới trỏ /analytics
 *  kèm lý do, còn dòng này thì không được sửa theo. Hai chỗ nói hai đường dẫn
 *  khác nhau trong cùng một tệp, và chỉ một trong hai là thứ trình duyệt đi. */
export default function FeedLeaderboardCard() {
  const { t } = useI18n();
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLeaderboardByMetric("xp", 5)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch(() => {
        if (!cancelled) setRows([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // `null` là chưa tải xong, `[]` là tải xong và không có ai - gộp lại thì lần
  // dựng đầu nào cũng nháy một thẻ rỗng.
  if (rows === null || rows.length === 0) return null;

  return (
    <div className="rounded-[22px] bg-white p-4.5 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.18)] ring-1 ring-stone-100/70 dark:bg-stone-900/80 dark:ring-stone-800/60">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-500" />
        <div className="min-w-0">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">
            {t.feed.rankTitle}
          </h2>
          <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">{t.feed.rankSub}</p>
        </div>
      </div>

      <div className="mt-3.5 space-y-2">
        {rows.map((row, index) => (
          <div
            key={row.user_id}
            className="flex items-center gap-2.5 rounded-[16px] bg-stone-50 px-3 py-2 dark:bg-stone-950/60"
          >
            {/* Hạng bằng SỐ chứ không bằng huy chương: cột này hẹp, và ba màu
                huy chương cạnh nhau ở cỡ 20px đọc ra như nhau. */}
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                index === 0
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                  : "bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
              }`}
            >
              {index + 1}
            </span>
            <Avatar key={row.avatarUrl ?? row.user_id} name={row.name} url={row.avatarUrl} size={28} />
            <p className="min-w-0 flex-1 truncate text-xs font-bold text-stone-900 dark:text-stone-100">
              {row.name}
            </p>
            <span className="shrink-0 text-[11px] font-black tabular-nums text-emerald-600 dark:text-emerald-400">
              {row.value.toLocaleString()} {t.feed.rankXpUnit}
            </span>
          </div>
        ))}
      </div>

      {/* `/analytics`, KHÔNG phải `/bxh`. Bảng đầy đủ vừa được gộp vào trang
          phân tích và thư mục app/(app)/bxh/ đã bị xoá - trỏ sang đó là dẫn
          người đọc vào 404. */}
      <Link
        href="/analytics"
        className="mt-3 block rounded-[16px] border border-stone-200 px-3 py-2 text-center text-xs font-bold text-stone-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-amber-950/20"
      >
        {t.feed.rankViewAll}
      </Link>
    </div>
  );
}
