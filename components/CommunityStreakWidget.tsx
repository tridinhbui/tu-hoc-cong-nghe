"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { getCommunityFeed, type CommunityFeedPost } from "@/lib/supabase-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { extractStreakDays } from "@/lib/streak-post-days";

/** Chuỗi ngày học của người khác, một góc nhỏ trên dashboard.
 *
 *  Bài chuỗi ngày là loại bài đông nhất trong feed cộng đồng và cũng là loại
 *  ít ai mở /finsocial để đọc - nên nó nằm ở nơi có nhiều người qua lại nhất
 *  thay vì chờ người ta đi tìm. Ở đây nó làm được đúng việc mà một dòng
 *  "đã học 7 ngày liên tiếp" làm tốt nhất: cho thấy có người khác đang học,
 *  hôm nay, cùng lúc với bạn.
 *
 *  Chỉ đọc, không nút thả cảm xúc: mọi hành động vẫn nằm ở /finsocial, và một
 *  góc nhỏ mọc thêm nút bấm sẽ thành một feed thứ hai phải bảo trì song song.
 */
const MAX_ROWS = 4;

export default function CommunityStreakWidget() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<CommunityFeedPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getCommunityFeed(undefined, 30)
      .then((feed) => {
        if (cancelled) return;
        setPosts(feed.filter((post) => post.kind === "streak").slice(0, MAX_ROWS));
      })
      // Đây là một góc phụ trên dashboard. Feed hỏng thì nó biến mất, không
      // kéo theo thông báo lỗi nào - người học vào dashboard để học, không
      // phải để biết một widget vừa không tải được.
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Chưa tải xong, hoặc hôm nay không ai đạt chuỗi nào: không dựng khung rỗng.
  // Một tấm thẻ ghi "chưa có ai" nói đúng cái ngược với điều nó sinh ra để nói.
  if (!posts || posts.length === 0) return null;

  return (
    <div className="rounded-[24px] border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            <Flame className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-extrabold text-stone-900 dark:text-stone-100">
              {t.dashboard.streakFeedTitle}
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">
              {t.dashboard.streakFeedSub}
            </p>
          </div>
        </div>
        <Link
          href="/finsocial"
          className="shrink-0 text-[11px] font-bold text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          {t.dashboard.seeAll}
        </Link>
      </div>

      <ul className="space-y-1.5">
        {posts.map((post) => {
          const days = extractStreakDays(post);
          return (
            <li key={post.id} className="flex items-center gap-2.5 rounded-xl bg-stone-50 px-2.5 py-2 dark:bg-stone-950/50">
              {isValidAvatar(post.user_avatar) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.user_avatar!} alt={post.user_name} className="h-7 w-7 shrink-0 rounded-full object-cover" />
              ) : (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[11px] font-black text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  {post.user_name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-xs font-bold text-stone-800 dark:text-stone-200">
                {post.user_name}
              </span>
              {days !== null && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                  <Flame className="h-2.5 w-2.5" />
                  {format(t.dashboard.streakFeedDays, { days })}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
