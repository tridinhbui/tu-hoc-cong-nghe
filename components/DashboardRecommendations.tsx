"use client";

import { useState, useEffect } from "react";
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
    // MỘT khung, không phải hai. Bản trước là một thẻ trắng bọc một thẻ xanh
    // viền gradient - hai lớp bo góc lồng nhau cho đúng một con số, và cái
    // khung trong tự nó đã trông như một thông báo cần xử lý.
    //
    // Bố cục dọc thay cho hàng ngang: con số là thứ duy nhất đáng nhìn ở đây,
    // và đặt nó cạnh ba dòng chữ thì nó phải nhỏ lại vừa chiều cao của chúng.
    // Xếp dọc, nó được cỡ chữ của một tiêu đề, còn nhãn và câu giải thích lùi
    // xuống làm chú thích - đúng thứ tự đọc mà khối này muốn.
    <section className="w-full rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      {/* Màu xanh còn đúng một chấm 6px. Huy hiệu "LIVE" trước đây là chữ hoa,
          giãn chữ, viền, nền và một biểu tượng nhấp nháy - năm thứ trang trí
          cho một thông tin mà cái chấm nói xong. */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" aria-hidden />
        <p className="truncate text-[11px] font-semibold tracking-wide text-stone-500 dark:text-stone-400">
          {t.recommendations.liveTitle}
        </p>
      </div>

      <p className="mt-2.5 flex items-baseline gap-1.5">
        <span className="text-[34px] font-black leading-none tracking-tight tabular-nums text-stone-900 dark:text-stone-50">
          {liveCompletedCount.toLocaleString(intlLocale(locale))}
        </span>
        <span className="text-xs font-semibold text-stone-400 dark:text-stone-500">
          {t.recommendations.lessonsUnit}
        </span>
      </p>

      <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        {t.recommendations.liveSubtitle}
      </p>
    </section>
  );
}
