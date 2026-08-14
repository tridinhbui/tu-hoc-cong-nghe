"use client";

import { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { getTotalCompletedLessonsCount } from "@/lib/supabase-user";
import { useI18n } from "@/lib/i18n/context";
import { intlLocale } from "@/lib/i18n";

// Topic titles are copy, slugs/icons/colors are structure - so these are
// built from `t` rather than kept as a static module-scope array. See
// lib/i18n/dictionaries/sections/quests-referral.ts (`recommendations`).

// Pools are intentionally larger than what's shown at once - "Đang hot tuần
// này" picks a rotating 4-item window out of each pool (see
// pickRotatingWindow/getWeekSeed below), so the same handful of slugs
// doesn't sit there unchanged forever the way a single fixed 4-item list
// would. The window shifts once per ISO week, wrapping back to the start
// once it cycles through the whole pool.

/** Bộ đếm LIVE của cộng đồng.
 *
 *  Component này từng là "Gợi ý hôm nay": một băng chuyền thẻ chủ đề, một thẻ
 *  mini game, và một khối "Đang hot tuần này". Cả ba đã lần lượt được gỡ - khối
 *  "hot" vì nó xếp hạng theo một con số người học SINH RA tại chỗ, thẻ chủ đề
 *  vì chúng lặp lại danh sách chặng bên cột trái, thẻ mini game theo yêu cầu.
 *
 *  Còn lại đúng phần không trùng gì cả: tổng số bài đã hoàn thành trên hệ
 *  thống, đọc thật từ getTotalCompletedLessonsCount. Nó không cần prop nào -
 *  ba prop cũ (lessonsMeta, completed, userId) đều chỉ nuôi phần đã gỡ. */
export default function DashboardRecommendations() {
  const { t, locale } = useI18n();

  const [liveCompletedCount, setLiveCompletedCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCompletedCount = async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (!cancelled && typeof count === "number") {
          setLiveCompletedCount(count);
        }
      } catch (error) {
        console.error("Error loading live completed lessons count:", error);
      }
    };

    void loadCompletedCount();

    // Không có vòng lặp 30 giây ở đây nữa. Hai listener ngay dưới đã làm đúng
    // việc đó và làm chính xác hơn: chúng chạy khi con số THẬT SỰ đổi, còn
    // vòng lặp thì gọi một RPC đếm toàn bảng hai lần mỗi phút cho mọi tab
    // dashboard đang mở, phần lớn là để nhận về đúng con số cũ.
    window.addEventListener("thtcdn:xp-gained", loadCompletedCount);
    window.addEventListener("thtcdn_weekly_quests_updated", loadCompletedCount);

    return () => {
      cancelled = true;
      window.removeEventListener("thtcdn:xp-gained", loadCompletedCount);
      window.removeEventListener("thtcdn_weekly_quests_updated", loadCompletedCount);
    };
  }, []);

  // Determine active topics and trending slugs based on user's target goal.
  // "Đang hot tuần này" picks a rotating window out of a larger pool (see
  // DEFAULT_TRENDING_POOL's comment) so it actually changes week to week -
  // seeded once per render off the current ISO week, not randomized per
  // visitor, so everyone sees the same "hot this week" set.
  // Không còn gợi ý nào để dựng: thẻ chủ đề đã bỏ ở lượt trước, và giờ tới
  // lượt thẻ mini game. Cái còn lại là bộ đếm LIVE - một con số thật, đọc từ
  // getTotalCompletedLessonsCount, không trùng với bất kỳ khối nào khác trên
  // dashboard - nên component này thu về đúng nó.
  //
  // Băng chuyền, hai mũi tên, chấm chỉ vị trí, hai ref cuộn và handleScroll
  // xoá theo. Một băng chuyền không còn gì để chuyền là mã chết vẫn biên dịch
  // được, và lần đọc sau không phân biệt nổi nó với mã đang chạy. Muốn dựng
  // lại thì xem git history của file này.
  if (liveCompletedCount === null) return null;

  return (
    <div className="w-full rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-4 shadow-sm">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-3 dark:border-emerald-900/60 dark:from-emerald-950/35 dark:to-teal-950/20">
        {/* Con số đứng TRƯỚC phần chữ, tức bên trái.
            Đổi chỗ bằng thứ tự DOM chứ không phải bằng `text-left`: hai khối
            này nằm trong một flex, nên `text-right`/`text-left` chỉ quyết định
            chữ nằm đâu BÊN TRONG khối, không quyết định khối nằm đâu trong
            hàng. Đổi mỗi lớp căn chữ thì con số vẫn ở nguyên mép phải.

            `justify-between` bỏ đi và phần chữ nhận `flex-1`: giữ
            justify-between với thứ tự mới sẽ ghim số ở mép trái, chữ ở mép
            phải và moi ra một khoảng trống giữa hai bên. `flex-1` cho khối chữ
            ăn hết phần còn lại, nên số đứng sát trái và chữ chạy liền ngay
            cạnh. */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 text-left">
            <p className="text-2xl font-black tabular-nums leading-none text-stone-950 dark:text-stone-50">
              {liveCompletedCount.toLocaleString(intlLocale(locale))}
            </p>
            <p className="mt-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{t.recommendations.lessonsUnit}</p>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200 dark:bg-stone-950/50 dark:text-emerald-300 dark:ring-emerald-900">
                <Radio className="h-3 w-3 animate-pulse" />
                {t.recommendations.liveBadge}
              </span>
              <p className="truncate text-[11px] font-black uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                {t.recommendations.liveTitle}
              </p>
            </div>
            <p className="mt-1 text-xs font-semibold text-stone-600 dark:text-stone-400">
              {t.recommendations.liveSubtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
