"use client";

import { useState, useEffect } from "react";
import { getTotalCompletedLessonsCount } from "@/lib/cloudflare-user";
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
    // Thẻ riêng, con số to: đây là thứ duy nhất trên dashboard cho thấy người
    // khác cũng đang học NGAY LÚC NÀY. Bản trước hạ nó xuống một dòng chữ mờ
    // cuối cột và nó biến mất giữa các hàng phụ (yêu cầu 2026-10-21: "cho con
    // số live trực tiếp rõ hơn"). Vẫn một khung, không lồng thẻ.
    <section className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(41,97,184,0.18)] ring-1 ring-brand-100/70 dark:bg-stone-900 dark:ring-white/5">
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">{t.recommendations.liveTitle}</p>
        <p className="mt-0.5 flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-black tabular-nums tracking-tight text-ink-max">
            {liveCompletedCount.toLocaleString(intlLocale(locale))}
          </span>
          <span className="text-sm font-semibold text-ink-soft">{t.recommendations.lessonsUnit}</span>
        </p>
        <p className="truncate text-xs text-ink-muted">{t.recommendations.liveSubtitle}</p>
      </div>
    </section>
  );
}
