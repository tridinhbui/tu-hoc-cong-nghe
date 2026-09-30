"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/cloudflare-user";
import RankTable from "@/components/analytics/RankTable";
import { APP_SYS } from "@/components/analytics/system-codes";
import { SectionHead, panel, textLink } from "@/components/ui/system";
import { useI18n } from "@/lib/i18n/context";

/** Bảng xếp hạng thu nhỏ ở cột phải của Bảng tin.
 *
 *  Đọc qua `getLeaderboardByMetric` - cùng RPC `get_leaderboard` mà trang /bxh
 *  dùng, nên hai chỗ không thể nói hai thứ tự khác nhau. Không truy vấn
 *  `user_stats` join `user_profiles` từ trình duyệt: RLS của `user_profiles`
 *  chỉ cho `auth.uid() = id`, và embed của PostgREST là inner join, nên câu ấy
 *  sẽ lặng lẽ trả về đúng một hàng của chính người đang xem. Chú thích ở
 *  lib/cloudflare-user.ts kể lại đúng lần mắc ấy.
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
    <section className={`${panel} p-4`}>
      <SectionHead code={APP_SYS.feedRank} title={t.feed.rankTitle} sub={t.feed.rankSub} size="sm" />

      {/* Hạng bằng SỐ trong rãnh mono; ba hạng đầu giữ chấm RankBadge nhỏ.
          Hàng không bấm được, như bản trước - đây là thẻ dẫn sang bảng đầy đủ. */}
      <div className="mt-3">
        <RankTable
          rows={rows}
          formatValue={(v) => `${v.toLocaleString()} ${t.feed.rankXpUnit}`}
          dense
          linkRows={false}
        />
      </div>

      {/* `/analytics`, KHÔNG phải `/bxh`. Bảng đầy đủ vừa được gộp vào trang
          phân tích và thư mục app/(app)/bxh/ đã bị xoá - trỏ sang đó là dẫn
          người đọc vào 404. */}
      <Link href="/analytics" className={`mt-3 ${textLink}`}>
        {t.feed.rankViewAll}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </section>
  );
}
