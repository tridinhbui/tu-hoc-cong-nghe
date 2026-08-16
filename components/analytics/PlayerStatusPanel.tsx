"use client";

import Link from "next/link";
import { Flame, Target, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { LearningAnalytics } from "@/lib/supabase-analytics";
import type { Pace } from "@/lib/learning-pace";

/**
 * Cột trái của /analytics: một khối "trạng thái người chơi" thay cho dãy thẻ
 * KPI rời.
 *
 * VÌ SAO GỘP. Bản cũ dựng sáu thẻ ngang hàng nhau - chuỗi ngày, thời gian học,
 * xu hướng tuần, nhịp, số ghi chú, tỷ lệ hoàn thành - mỗi thẻ một viền, một
 * tiêu đề, một con số. Sáu thứ cùng cỡ chữ và cùng trọng lượng thị giác thì
 * không cái nào là câu trả lời cho "tôi đang thế nào"; người đọc phải tự xếp
 * hạng chúng. Ở đây bốn chỉ số nằm trong MỘT khối, và khối đó có một thứ hạng
 * rõ: mục tiêu tuần ở trên cùng, bốn chỉ số đỡ bên dưới.
 *
 * MỤC TIÊU TUẦN LÀ SỐ THẬT, KHÔNG PHẢI SỐ TRANG TRÍ. Nó bằng
 * `perDay × daysPerWeek` - đúng nhịp người dùng tự đặt ở /lo-trinh và đã lưu
 * lên user_profiles (20260912). Không đặt nhịp thì khối này KHÔNG bịa một mục
 * tiêu mặc định; nó nói chưa đặt và trỏ sang chỗ đặt. Một thanh tiến độ chạy
 * tới một con số người dùng chưa từng chọn là thứ trông như trò chơi nhưng đo
 * bằng không.
 *
 * VÌ SAO KHÔNG CÓ "MÙA GIẢI". get_leaderboard không lọc thời gian - bảng xếp
 * hạng là luỹ kế toàn thời gian, không có mùa nào để đếm ngược. Một đồng hồ
 * đếm ngược đặt lên đó sẽ chạy hết rồi không có gì xảy ra: bảng không reset,
 * thứ hạng không đổi. Con số tuần duy nhất có thật ở đây là nhịp học của chính
 * người dùng, nên đó là thứ được đếm.
 */
export default function PlayerStatusPanel({
  analytics,
  pace,
  weekLessons,
}: {
  analytics: LearningAnalytics;
  pace: Pace | null;
  /** Số bài đã hoàn thành trong 7 ngày gần nhất. */
  weekLessons: number;
}) {
  const { t } = useI18n();
  const a = t.analytics;

  const target = pace ? pace.perDay * pace.daysPerWeek : null;
  const pct = target ? Math.min(100, Math.round((weekLessons / target) * 100)) : 0;
  const remaining = target ? Math.max(0, target - weekLessons) : 0;

  // Số ngày còn lại của tuần, tính theo thứ Hai đầu tuần. `getDay()` trả 0 cho
  // Chủ nhật, nên phải dịch: Chủ nhật là ngày THỨ BẢY của tuần, không phải
  // ngày đầu. Nhầm chỗ này thì Chủ nhật hiện "còn 6 ngày" trong khi tuần sắp
  // hết.
  const dow = (new Date().getDay() + 6) % 7; // 0 = thứ Hai … 6 = Chủ nhật
  const daysLeft = 6 - dow;

  const trend = analytics.recentMomentum.weeklyTrendPercent;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 dark:border-stone-800 dark:bg-stone-900">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
        {a.psEyebrow}
      </p>

      {/* Mục tiêu tuần đứng TRÊN các chỉ số, vì nó là thứ duy nhất ở đây có
          thể hành động được. Bốn con số bên dưới mô tả quá khứ; dòng này nói
          còn phải làm gì. */}
      <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3.5 dark:border-stone-800 dark:bg-stone-950/50">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-black text-stone-900 dark:text-stone-100">{a.psWeekTitle}</p>
          {target !== null && (
            <p className="shrink-0 text-xs font-bold text-stone-500 dark:text-stone-400">
              {daysLeft > 0 ? format(a.psWeekLeft, { days: daysLeft }) : a.psWeekLastDay}
            </p>
          )}
        </div>

        {target === null ? (
          <>
            <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{a.psWeekNoTarget}</p>
            <Link
              href="/lo-trinh"
              className="mt-2 inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {a.psWeekSetTarget}
            </Link>
          </>
        ) : (
          <>
            <p className="mt-1 text-2xl font-black tabular-nums text-stone-900 dark:text-stone-100">
              {format(a.psWeekProgress, { done: weekLessons, target })}
            </p>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={target}
              aria-valuenow={Math.min(weekLessons, target)}
              aria-label={format(a.psWeekProgress, { done: weekLessons, target })}
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  remaining === 0 ? "bg-emerald-500" : "bg-stone-900 dark:bg-stone-100"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-stone-600 dark:text-stone-400">
              {remaining === 0 ? a.psWeekDone : format(a.psWeekBehind, { count: remaining })}
            </p>
          </>
        )}
      </div>

      {/* Bốn chỉ số, cùng một cỡ, không thẻ riêng cho từng cái. Chúng là nền
          cho dòng trên chứ không phải sáu câu trả lời cạnh tranh nhau. */}
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        <Metric
          icon={<Flame className="h-3.5 w-3.5 text-orange-500" />}
          label={a.psStreak}
          value={format(a.psStreakUnit, { count: analytics.streakDays })}
          hint={format(a.psStreakBest, { count: analytics.longestStreak })}
        />
        <Metric
          icon={<Target className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />}
          label={a.psAccuracy}
          value={`${Math.round(analytics.averageQuizScore)}%`}
          hint={a.psAccuracyHint}
        />
        <Metric
          icon={<Clock className="h-3.5 w-3.5 text-stone-500" />}
          label={a.psTime}
          value={format(a.psTimeUnit, { count: analytics.totalTimeSpent })}
          hint={format(a.psTimeWeek, { count: analytics.recentMomentum.last7DaysMinutes })}
        />
        <Metric
          icon={<TrendingUp className="h-3.5 w-3.5 text-stone-500" />}
          label={a.psMomentum}
          // Dấu cộng phải viết tay: `toLocaleString` không thêm dấu cho số
          // dương, nên "12%" và "-12%" trông như hai loại đại lượng khác nhau.
          value={`${trend > 0 ? "+" : ""}${trend}%`}
          hint={format(a.psMomentumHint, { count: analytics.recentMomentum.last7DaysLessons })}
        />
      </dl>
    </section>
  );
}

function Metric({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500">
        {icon}
        <span className="truncate">{label}</span>
      </dt>
      <dd className="mt-0.5">
        <p className="text-lg font-black tabular-nums leading-none text-stone-900 dark:text-stone-100">{value}</p>
        <p className="mt-1 truncate text-[11px] font-medium text-stone-500 dark:text-stone-400">{hint}</p>
      </dd>
    </div>
  );
}
