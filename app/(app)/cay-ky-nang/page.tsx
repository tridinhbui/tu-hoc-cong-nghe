import { redirect } from "next/navigation";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { SKILL_TREE } from "@/lib/gamification";
import SkillTreeWidget from "@/components/SkillTreeWidget";
import TopicMasteryWidget from "@/components/TopicMasteryWidget";
import { computeDomainCoverage } from "@/lib/career-competency";

// Auth-gated and reads Supabase env vars at render time - never prerender statically.
export const dynamic = "force-dynamic";

// SkillTreeWidget từng chỉ render bên trong dashboard, ở tab "skill-tree".
// Dải tab đó bị gỡ khi career path dọn ra /nghe-nghiep-hoc (c3f7ec9), nhưng
// component thì ở lại - không nút nào chọn được giá trị tab ấy nữa, nên cây kỹ
// năng thành một màn hình không có đường vào. Khác với thẻ, cosmetics và
// weekly challenge - ba cái đó còn bản thứ hai trong RPG hub - cây kỹ năng chỉ
// tồn tại ở đúng một chỗ, nên gỡ tab đi là mất hẳn.
//
// Theo đúng cách /nghe-nghiep-hoc đã xử lý: một route riêng, một mục navbar.
// Dashboard giữ lại hai thứ thực sự là track đánh số theo ngày, mọi lối học
// song song nằm ở navbar.
export default async function SkillTreePage() {
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

  // Chỉ bảy bài mà cây kỹ năng thực sự trỏ tới, không phải cả 715 - widget là
  // client component nên mọi thứ truyền vào đây đều đi qua payload RSC.
  const lessonSlugById: Record<number, string> = {};
  for (const node of SKILL_TREE) {
    const meta = lessonsMeta.find((l) => l.id === node.requiredLessonId);
    if (meta) lessonSlugById[node.requiredLessonId] = meta.slug;
  }

  const completedLessonIds = (progressRows ?? []).map((r) => r.lesson_id as number);

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-8">
      {/* Hai cách nhìn cùng một câu hỏi "tôi đang ở đâu", nên chúng đứng cạnh
          nhau: cây kỹ năng đi theo THỨ TỰ TIÊN QUYẾT (học xong cái này mới mở
          cái kia), còn bảng độ phủ đi theo MẢNG KIẾN THỨC (mảng nào còn mỏng).
          Cây trả lời "kế tiếp là gì", bảng trả lời "đang hổng ở đâu". */}
      <SkillTreeWidget completedLessonIds={completedLessonIds} lessonSlugById={lessonSlugById} />
      <TopicMasteryWidget coverage={computeDomainCoverage(completedLessonIds)} />
    </div>
  );
}
