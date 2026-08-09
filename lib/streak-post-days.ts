import type { CommunityFeedPost } from "@/lib/supabase-community";

/** Số ngày trên huy hiệu chuỗi ngày, đọc từ một bài feed `kind = "streak"`.
 *
 *  Tách khỏi components/CommunityStreakWidget.tsx vì component là `"use client"`
 *  và kéo theo React, next/link, lucide - bộ kiểm không cần thứ nào trong đó để
 *  kiểm một phép đọc số.
 *
 *  ĐỌC `metadata.streak_days` TRƯỚC. app/api/cron/send-streak-milestones ghi cả
 *  `content` lẫn `metadata` trong cùng một lệnh insert, nên con số đã có sẵn
 *  dưới dạng dữ liệu.
 *
 *  Bản đầu chỉ có nhánh regex `/(\d+)\s*ngày/i` chạy trên `content`, tức là nó
 *  suy ngược con số ra từ CÂU HIỂN THỊ mà một tệp khác dựng ("... vừa đạt chuỗi
 *  7 ngày học liên tục! 🔥"). Sửa lời câu đó, hoặc dịch nó, là huy hiệu biến
 *  mất - không lỗi, không cảnh báo, và người sửa câu không có lý do gì để nghĩ
 *  tới một widget trên dashboard.
 *
 *  Regex ở lại làm nhánh dự phòng cho những bài đã lưu trước khi có `metadata`,
 *  không phải làm đường chính. lib/__tests__/streak-widget-days.test.ts giữ cả
 *  hai nhánh và giữ thứ tự ưu tiên giữa chúng. */
export function extractStreakDays(
  post: Pick<CommunityFeedPost, "content" | "metadata">
): number | null {
  const raw = post.metadata?.streak_days;
  // jsonb có thể trả số về dưới dạng chuỗi, nên ép kiểu thay vì đòi `typeof`.
  const fromMetadata = typeof raw === "number" ? raw : Number(raw);
  if (Number.isFinite(fromMetadata) && fromMetadata > 0) return Math.floor(fromMetadata);

  const match = (post.content ?? "").match(/(\d+)\s*ngày/i);
  if (!match) return null;
  const days = Number(match[1]);
  return Number.isFinite(days) && days > 0 ? days : null;
}
