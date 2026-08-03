import { redirect } from "next/navigation";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { getCompletedLessons } from "@/lib/supabase-progress";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { colorForUser } from "@/lib/supabase-lobby";
import { getUserStreak } from "@/lib/supabase-streak";
import { getEquippedGear } from "@/lib/supabase-equipment";
import DistrictWorld, { type DistrictLesson } from "@/components/career-district/DistrictWorld";
import { allDistrictLessonSlugs, buildStageIndex } from "@/components/career-district/district-content";

export const dynamic = "force-dynamic";

// Phố nghề: khu phố 3D đi lại được, mỗi căn nhà là một nhóm ngành và mỗi cái
// bàn bên trong là một nghề, kèm lộ trình bài học của nghề đó.
//
// Tên bài học được tra Ở ĐÂY chứ không ở client: danh sách bài là dữ liệu server
// (lib/lessons-data), và gửi cả 1.500 bài xuống trình duyệt chỉ để hiện vài chục
// cái tên là đủ nặng để thấy được trên mạng di động. Trang chỉ gửi đúng những
// bài mà khu phố nhắc tới.
export default async function PhoNghePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pho-nghe");

  const [allLessons, completedIds] = await Promise.all([
    getLessonsMeta(),
    getCompletedLessons(user.id, supabase),
  ]);
  const done = new Set(completedIds);
  const bySlug = new Map(allLessons.map((l) => [l.slug, l]));

  const lessons: Record<string, DistrictLesson> = {};
  for (const slug of allDistrictLessonSlugs()) {
    const lesson = bySlug.get(slug);
    // Slug trỏ tới bài không còn tồn tại thì bỏ qua, không dựng một cái tên
    // rỗng trên kệ sách.
    if (!lesson) continue;
    lessons[slug] = { id: lesson.id, slug, title: lesson.title, done: done.has(lesson.id) };
  }

  // Chặng học đổ ra danh sách bài ở đây: chặng khai bằng dải id, và đổi id ra
  // slug cần cả bảng bài học - thứ chỉ có ở server.
  const stages = buildStageIndex(allLessons);
  for (const stage of stages) {
    for (const slug of stage.slugs) {
      const lesson = bySlug.get(slug);
      if (lesson && !lessons[slug]) {
        lessons[slug] = { id: lesson.id, slug, title: lesson.title, done: done.has(lesson.id) };
      }
    }
  }

  // Chuỗi ngày nằm ở bảng riêng và "hôm nay đã học chưa" suy từ
  // last_activity_date - không có cột nào nói thẳng. Thiếu nó không chặn vào
  // phố, chỉ là biển tên bớt một dòng.
  let streak = 0;
  let doneToday = false;
  try {
    const s = await getUserStreak(user.id);
    streak = s?.current_streak ?? 0;
    if (s?.last_activity_date) {
      doneToday = s.last_activity_date.slice(0, 10) === new Date().toISOString().slice(0, 10);
    }
  } catch {
    // giữ mặc định
  }

  const gear = await getEquippedGear(user.id, supabase);

  let name = user.user_metadata?.full_name || user.email?.split("@")[0] || "Người học";
  let avatarUrl: string | null = user.user_metadata?.avatar_url || null;
  let level = 1;
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name, avatar_url, current_level")
    .eq("id", user.id)
    .single();
  if (profile?.full_name) name = profile.full_name;
  if (profile?.avatar_url) avatarUrl = profile.avatar_url;
  if (profile?.current_level) level = profile.current_level;

  return (
    <DistrictWorld
      userId={user.id}
      streak={streak}
      doneToday={doneToday}
      gear={gear}
      name={name}
      color={colorForUser(user.id)}
      avatarUrl={avatarUrl}
      level={level}
      lessons={lessons}
      stages={stages}
    />
  );
}
