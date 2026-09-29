"use client";

import type { ReactNode } from "react";
import CoCoAvatar from "@/components/CoCoAvatar";
import { pickLine } from "@/components/CoCoSays";
import { useI18n } from "@/lib/i18n/context";

/**
 * Cơ Cơ phản hồi ngay sau một câu trả lời: avatar nhỏ + một câu ngắn.
 *
 * Khác CoCoSays ở chỗ KHÔNG có nhịp "đang gõ": phản hồi đúng/sai phải hiện
 * tức thì, người học đang chờ biết kết quả chứ không chờ xem hiệu ứng. Phần
 * lập luận đầy đủ vẫn nằm ngay dưới, do chỗ gọi tự vẽ - câu này chỉ là lời
 * dẫn, không thay cho giải thích.
 *
 * Chỉ dựng sau một tương tác (hoặc sau effect đọc localStorage), nên
 * `pickLine` - đọc ngày của trình duyệt - không chạm tới lúc render phía server.
 */
export default function CoCoFeedback({
  lines,
  tone,
  salt = 0,
  vars,
  trailing,
}: {
  lines: readonly string[];
  /** Quyết định màu viền bong bóng: cyan khi đúng, đỏ khi sai. */
  tone: "correct" | "wrong";
  salt?: number;
  vars?: Record<string, string | number>;
  /** Thứ đứng cuối dòng, thường là nhãn XP. */
  trailing?: ReactNode;
}) {
  const { t } = useI18n();
  let line = pickLine(lines, salt);
  for (const [k, v] of Object.entries(vars ?? {})) line = line.split(`{${k}}`).join(String(v));

  return (
    <div className="flex items-start gap-2.5" aria-live="polite">
      <CoCoAvatar size={26} />
      <div
        className={`min-w-0 flex-1 border-l-2 pl-3 ${
          tone === "correct" ? "border-cyan-600 dark:border-cyan-400" : "border-red-600 dark:border-red-400"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[9.5px] font-bold tracking-wider text-ink-faint">{t.coco.name}</p>
          {trailing}
        </div>
        <p className="mt-0.5 text-sm leading-relaxed text-ink">{line}</p>
      </div>
    </div>
  );
}
