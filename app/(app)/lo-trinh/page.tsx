import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { isLessonIdInTrack } from "@/lib/track-stages";
import { stageTopicFor, type StageTopicId } from "@/lib/stage-topics";
import { paceFromParts, type Pace } from "@/lib/learning-pace";
import LearningPathClient from "@/components/LearningPathClient";

// Đọc Supabase lúc render, nên không prerender tĩnh.
export const dynamic = "force-dynamic";

type Track = "personal" | "professional";

/**
 * Lộ trình học - chỗ người mới đến TRƯỚC khi học bài nào.
 *
 * Trước trang này, việc chọn lộ trình chỉ nằm ở hai thẻ track trên dashboard,
 * không kèm một chữ hướng dẫn nào: người mới mở app ra thấy 722 bài chia hai
 * track và không có gì nói nên bắt đầu từ đâu, mỗi ngày bao nhiêu, hay bao giờ
 * thì được đi tiếp.
 *
 * KHÔNG làm thành tab dashboard. DASHBOARD_TABS còn vài giá trị tàn dư từ lần
 * dải tab bị gỡ (c3f7ec9) - lưu được vào localStorage mà không nút nào chọn
 * lại - nên thêm một cái nữa là tạo thêm đúng loại bẫy đó. Một route riêng cộng
 * một mục navbar là khuôn /nghe-nghiep-hoc đã dùng: mọi lối học song song nằm
 * ở navbar, dashboard chỉ giữ hai track đánh số theo ngày.
 *
 * Số bài mỗi track đếm tại đây chứ không viết cứng: hai con số đó xuất hiện
 * trong hướng dẫn ("khoảng bao lâu thì xong"), và một hằng số viết cứng sẽ lệch
 * ngay lần thêm bài tiếp theo mà không có gì báo.
 *
 * HAI LỰA CHỌN CỦA TRANG ĐỌC TỪ SERVER, không từ localStorage. Chúng từng chỉ
 * sống trong trình duyệt, nên đổi máy là mất - xem
 * supabase/migrations/20260912_learning_path_prefs.sql. Client vẫn ghi
 * localStorage song song, vì dashboard đọc `activeTrack` từ đó.
 */
export default async function LearningPathPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [lessonsMeta, { data: progressRows }, { data: profile }] = await Promise.all([
    getLessonsMeta(),
    supabase.from("user_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
    supabase
      .from("user_profiles")
      .select("learning_track, learning_pace_per_day, learning_pace_days_per_week")
      .eq("id", user.id)
      .maybeSingle(),
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

  /** Chủ đề yếu -> bài CHƯA HỌC đầu tiên của chủ đề đó.
   *
   *  Khối "chủ đề yếu nhất" trước đây là mấy viên chữ đỏ không bấm được: nó nêu
   *  đúng vấn đề rồi dừng ở đó, và người đọc không có đường nào đi tiếp ngoài
   *  việc tự đi tìm. Đây là chỗ tệ nhất để làm vậy, vì nó là phần duy nhất trên
   *  trang nói về điểm yếu của riêng họ.
   *
   *  Tính ở server, cho CẢ HAI hướng: hướng đang chọn nằm ở client (localStorage
   *  hoặc cột vừa đọc), và chờ biết hướng rồi mới đi lấy sẽ thành một vòng gọi
   *  nữa cho một bảng tra 25 mục.
   *
   *  Bài đầu tiên chưa học, không phải bài "dễ nhất" hay "liên quan nhất": thứ
   *  tự trong track đã là thứ tự sư phạm, và một phép chọn thông minh hơn ở đây
   *  sẽ mâu thuẫn với chính thứ tự mà mọi phần khác của app đang đi theo. */
  const topicEntry = {} as Record<Track, Partial<Record<StageTopicId, { slug: string; title: string }>>>;
  for (const track of ["personal", "professional"] as const) {
    const map: Partial<Record<StageTopicId, { slug: string; title: string }>> = {};
    for (const lesson of visible) {
      if (completedIds.has(lesson.id)) continue;
      if (!isLessonIdInTrack(lesson.id, track)) continue;
      const topic = stageTopicFor(lesson.id, track);
      if (map[topic]) continue;
      map[topic] = { slug: lesson.slug, title: lesson.title };
    }
    topicEntry[track] = map;
  }

  const savedTrack: Track | null =
    profile?.learning_track === "personal" || profile?.learning_track === "professional"
      ? profile.learning_track
      : null;
  const savedPace: Pace | null = paceFromParts(
    profile?.learning_pace_per_day,
    profile?.learning_pace_days_per_week,
  );

  return (
    <LearningPathClient
      counts={counts}
      done={done}
      userId={user.id}
      topicEntry={topicEntry}
      savedTrack={savedTrack}
      savedPace={savedPace}
    />
  );
}
