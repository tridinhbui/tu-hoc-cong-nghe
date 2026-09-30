import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/d1/server";
import { getLessonById, getNextLesson } from "@/lib/lessons-loader";
import { getServerLocale } from "@/lib/i18n/server";

/* "Hôm qua bạn thử chưa?" - việc nhỏ của bài học xong gần nhất.
 *
 * Mỗi bài kết thúc bằng một thẻ "Làm ngay" (`application`): một việc cụ thể
 * làm được trong ngày, với email, bảng tính, biên bản họp của chính người học.
 * Nhưng thẻ ấy chỉ sống đúng lúc đọc bài - hôm sau quay lại, dashboard mở ra
 * bằng bài KẾ TIẾP, và việc hôm qua biến mất như chưa từng được giao. Người
 * mới không thiếu bài để đọc; cái họ thiếu là lý do để quay lại, và "bạn thử
 * chưa, ra sao?" là lý do có sẵn trong chính nội dung.
 *
 * Cửa sổ 6-72 giờ: dưới 6 giờ thì người học vẫn đang ở phiên vừa học xong
 * (hỏi "hôm qua" là sai), quá ba ngày thì việc ấy đã nguội. Ngoài cửa sổ trả
 * `null` và thẻ không hiện. */
const MIN_AGE_MS = 6 * 60 * 60 * 1000;
const MAX_AGE_MS = 72 * 60 * 60 * 1000;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "unauthenticated" }, { status: 401 });

  const row = await getDb()
    .prepare(
      `select lesson_id, completed_at from user_progress
       where user_id = ? and completed = 1 and completed_at is not null
       order by completed_at desc limit 1`
    )
    .bind(user.id)
    .first<{ lesson_id: number; completed_at: string }>();

  if (!row) return Response.json({ task: null });
  const age = Date.now() - new Date(row.completed_at).getTime();
  if (!(age >= MIN_AGE_MS && age <= MAX_AGE_MS)) return Response.json({ task: null });

  const locale = await getServerLocale();
  const lesson = await getLessonById(Number(row.lesson_id), locale);
  if (!lesson?.application?.message) return Response.json({ task: null });
  const next = await getNextLesson(lesson.id, locale);

  return Response.json({
    task: {
      lessonId: lesson.id,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      message: lesson.application.message,
      nextSlug: next?.slug ?? null,
      nextTitle: next?.title ?? null,
    },
  });
}
