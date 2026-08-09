import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { isLessonIdInTrack } from "@/lib/track-stages";
import LearningPathClient from "@/components/LearningPathClient";

// Đọc Supabase lúc render, nên không prerender tĩnh.
export const dynamic = "force-dynamic";

/**
 * Lộ trình học - chỗ người mới đến TRƯỚC khi học bài nào.
 *
 * Trước trang này, việc chọn lộ trình chỉ nằm ở hai thẻ track trên dashboard,
 * không kèm một chữ hướng dẫn nào: người mới mở app ra thấy 722 bài chia hai
 * track và không có gì nói nên bắt đầu từ đâu, mỗi ngày bao nhiêu, hay bao giờ
 * thì được đi tiếp.
 *
 * KHÔNG làm thành tab dashboard. DASHBOARD_TABS còn bốn giá trị tàn dư từ lần
 * dải tab bị gỡ (c3f7ec9) - lưu được vào localStorage mà không nút nào chọn
 * lại - nên thêm cái thứ bảy là tạo thêm đúng loại bẫy đó. Một route riêng cộng
 * một mục navbar là khuôn /nghe-nghiep-hoc đã dùng: mọi lối học song song nằm
 * ở navbar, dashboard chỉ giữ hai track đánh số theo ngày.
 *
 * Số bài mỗi track đếm tại đây chứ không viết cứng: hai con số đó xuất hiện
 * trong hướng dẫn ("khoảng bao lâu thì xong"), và một hằng số viết cứng sẽ lệch
 * ngay lần thêm bài tiếp theo mà không có gì báo.
 */
export default async function LearningPathPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [lessonsMeta, { data: progressRows }] = await Promise.all([
    getLessonsMeta(),
    supabase.from("user_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
  ]);

  const visible = lessonsMeta.filter((l) => l.isVisible !== false);
  const counts = {
    personal: visible.filter((l) => isLessonIdInTrack(l.id, "personal")).length,
    professional: visible.filter((l) => isLessonIdInTrack(l.id, "professional")).length,
  };

  const completedIds = new Set((progressRows ?? []).map((r) => r.lesson_id as number));
  const done = {
    personal: visible.filter((l) => isLessonIdInTrack(l.id, "personal") && completedIds.has(l.id)).length,
    professional: visible.filter((l) => isLessonIdInTrack(l.id, "professional") && completedIds.has(l.id)).length,
  };

  return <LearningPathClient counts={counts} done={done} userId={user.id} />;
}
