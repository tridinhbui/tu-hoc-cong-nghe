"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Compass } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { readPace, weeksFor, minutesPerDay, type Pace, DEFAULT_PACE } from "@/lib/learning-pace";
import { useCollapsibleCard } from "@/lib/use-collapsible-card";

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

  // Gấp lại thì còn đúng phần trả lời "mình đang đi hướng nào" - tên chặng.
  // Phần nhịp, số bài còn lại và ước lượng thời gian là thứ đọc lúc muốn biết,
  // không phải thứ cần nhìn ở mọi lần vào học.
  const { collapsed, hydrated, toggle } = useCollapsibleCard("thtcdn:card-collapsed:learning-path");

  const remaining = Math.max(0, total - done);
  const weeks = weeksFor(remaining, pace.perDay, pace.daysPerWeek);
  const trackName = track === "professional" ? p.trackProfessionalName : p.trackPersonalName;

  return (
    // KHÔNG có khung riêng. Thẻ này và NotesShortcutCard giờ là hai HÀNG trong
    // cùng một bảng ở cột phải, và bảng cha giữ viền/nền/bo góc - xem chỗ dựng
    // trong DashboardClient.tsx. Trả khung lại cho chỗ này là dựng lại thẻ lồng
    // thẻ: một khung 2px nằm trong một khung nữa, đúng thứ vừa dọn đi.
    //
    // Màu nhận dạng chuyển hết vào ô biểu tượng bên dưới. Nó vẫn phân biệt được
    // hai hàng mà không cần tới hai cái viền.
    //
    // `self-start` đã bỏ cùng lúc: nó tồn tại để thoát khỏi `items-stretch` của
    // lưới hai cột cũ, mà lưới ấy không còn.
    <div className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        {/* Biểu tượng nét, không phải huy hiệu.
            Ô 40px nền đặc bo góc kèm shadow là hình dạng của một NÚT - nó hứa
            một hành động riêng, trong khi cả hàng mới là thứ bấm được. Ở kích
            thước đó nó cũng nặng ngang tiêu đề, nên mắt dừng ở màu trước rồi
            mới đọc chữ. Nét 16px giữ nguyên chức năng phân biệt hai hàng (xanh
            / hổ phách) mà không tranh phần với dòng chữ nó đang chú thích. */}
        <Compass className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

        <div className="min-w-0 flex-1">
          {/* Nhãn mào lùi về màu trung tính và bỏ font-black: hai hàng này
              trước đây có tới ba mức nhấn (nhãn mào đậm màu, tiêu đề đậm, ô
              biểu tượng đặc màu) nên không mức nào còn nhấn được gì. Giữ đúng
              một: tiêu đề. */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400 dark:text-stone-500">
            {p.summaryEyebrow}
          </p>

          <p className="mt-0.5 text-[17px] font-black tracking-tight text-stone-900 dark:text-stone-100">{trackName}</p>

          {/* Phần gấp được. `grid-rows-[0fr]` → `[1fr]` chứ không phải max-height:
              chiều cao thật do nội dung quyết định, nên không phải đoán một con
              số đủ lớn rồi để hiệu ứng chạy hụt khi nội dung dài hơn dự tính.
              `min-h-0` trên con là bắt buộc - thiếu nó thì ô lưới không co
              xuống dưới kích thước nội dung và thẻ không gấp được chút nào. */}
          <div
            className={`grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
              collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
          >
            {/* `inert` khi gấp. Nội dung vẫn nằm trong DOM - đó là điều kiện để
                hiệu ứng cao 0fr→1fr chạy được - nên nếu không chặn thì phím Tab
                vẫn nhảy vào liên kết "Xem lộ trình đầy đủ" đang vô hình, và
                trình đọc màn hình vẫn đọc cả đoạn người dùng vừa thu gọn. Một
                thuộc tính lo cả hai; React 19 nhận nó như boolean. */}
            <div className="min-h-0 overflow-hidden" inert={collapsed}>
              <p className="mt-0.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
                {format(p.summaryDone, { done, total })}
                {" · "}
                {format(p.summaryPace, { perDay: pace.perDay, days: pace.daysPerWeek })}
              </p>

              {/* Câu duy nhất người quay lại thực sự cần: còn bao nhiêu, bao lâu.
                  Dùng chung chuỗi paceEstimate với trang /lo-trinh nên hai nơi
                  không thể nói hai con số khác nhau. */}
              {remaining > 0 && (
                <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {format(p.paceEstimate, { count: remaining, weeks })}
                </p>
              )}
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                {format(p.paceMinutes, { minutes: minutesPerDay(pace) })}
              </p>

              <Link
                href="/lo-trinh"
                className="mt-2.5 inline-block text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                {p.summaryFull}
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          title={collapsed ? p.cardExpand : p.cardCollapse}
          aria-label={collapsed ? p.cardExpand : p.cardCollapse}
          className="-mr-1 -mt-1 shrink-0 cursor-pointer rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} />
        </button>
      </div>
    </div>
  );
}
