"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { readPace, weeksFor, minutesPerDay, type Pace, DEFAULT_PACE } from "@/lib/learning-pace";

/**
 * Bản rút gọn của /lo-trinh, đứng đúng chỗ thẻ "Chào mừng quay lại" trước đây
 * chiếm trên /hoc-bai.
 *
 * VÌ SAO RÚT GỌN chứ không nhúng cả LearningPathClient: trang kia là 6 thẻ
 * hướng dẫn - chọn hướng, đặt nhịp, ba bước mỗi bài, lo lắng thường gặp, mốc
 * kiểm, điều chỉnh. Đó là thứ đọc MỘT lần lúc mới vào. Đặt nguyên cụm đó lên
 * đầu /hoc-bai là đẩy danh sách bài xuống dưới sáu thẻ ở mọi lần vào học, kể
 * cả lần thứ hai trăm.
 *
 * Khối này chỉ trả lời phần người quay lại còn cần: đang đi hướng nào, nhịp
 * bao nhiêu, còn bao nhiêu bài, và mất khoảng bao lâu nữa. Muốn đọc lại hướng
 * dẫn thì có một đường sang trang đầy đủ.
 *
 * Không tự lấy dữ liệu: track, số bài đã học và tổng số bài đều đã có sẵn ở
 * DashboardClient nên nhận qua props. Thêm một truy vấn Supabase ở đây là trả
 * tiền lần thứ hai cho con số đang nằm ngay trên cùng một màn hình.
 */
export default function LearningPathSummary({
  track,
  done,
  total,
}: {
  track: "personal" | "professional";
  done: number;
  total: number;
}) {
  const { t } = useI18n();
  const p = t.learningPath;

  // localStorage chỉ đọc được sau khi mount. Bắt đầu bằng nhịp mặc định để bản
  // dựng ở server và lượt render đầu ở client khớp nhau - đọc thẳng trong
  // useState initializer sẽ lệch và React sẽ than hydration mismatch.
  const [pace, setPace] = useState<Pace>(DEFAULT_PACE);
  useEffect(() => setPace(readPace()), []);

  const remaining = Math.max(0, total - done);
  const weeks = weeksFor(remaining, pace.perDay, pace.daysPerWeek);
  const trackName = track === "professional" ? p.trackProfessionalName : p.trackPersonalName;

  return (
    <div className="rounded-[24px] border-2 border-emerald-500/60 bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-emerald-950/40 dark:to-stone-900 p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
          <Compass className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
            {p.summaryEyebrow}
          </p>

          <p className="mt-1 text-base font-bold text-stone-900 dark:text-stone-100">{trackName}</p>

          <p className="mt-0.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
            {format(p.summaryDone, { done, total })}
            {" · "}
            {format(p.summaryPace, { perDay: pace.perDay, days: pace.daysPerWeek })}
          </p>

          {/* Câu duy nhất người quay lại thực sự cần: còn bao nhiêu, bao lâu.
              Dùng chung chuỗi paceEstimate với trang /lo-trinh nên hai nơi
              không thể nói hai con số khác nhau. */}
          {remaining > 0 && (
            <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {format(p.paceEstimate, { count: remaining, weeks })}
            </p>
          )}
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            {format(p.paceMinutes, { minutes: minutesPerDay(pace) })}
          </p>

          <Link
            href="/lo-trinh"
            className="mt-3 inline-block text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            {p.summaryFull}
          </Link>
        </div>
      </div>
    </div>
  );
}
