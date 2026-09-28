/**
 * Dòng hoạt động học công khai cho trang chủ - ẨN DANH ở phía máy chủ.
 *
 * Nguồn là RPC get_community_learning_now, vốn trả về user_id, tên và ảnh đại
 * diện của người thật kèm bài họ vừa học và lúc nào. Trong ứng dụng (đã đăng
 * nhập) điều đó ổn. Trên trang chủ công khai thì không: gọi thẳng RPC từ trình
 * duyệt sẽ gửi tên + lịch học của người thật tới BẤT KỲ khách vãng lai nào, và
 * giấu chúng khỏi giao diện không giúp gì - tab Network vẫn hiện đủ.
 *
 * Nên việc chọn trường diễn ra ở đây, bằng DANH SÁCH TRẮNG: một mục đi ra chỉ
 * có đúng bốn trường dưới đây, dựng mới từng trường một. Không spread hàng gốc,
 * không `delete` trường nhạy cảm - xoá theo danh sách đen thì một cột mới thêm
 * vào RPC sau này sẽ lọt ra mà không ai hay.
 */

export type PublicActivityItem = {
  /** Thời điểm hoàn thành, ISO. */
  at: string;
  /** Độ dài chuỗi ngày của người học - không định danh ai. */
  streak: number;
  lessonTitle: string;
  lessonSlug: string;
};

export type PublicActivity = {
  items: PublicActivityItem[];
  /** Số bài hoàn thành mỗi ngày, 14 ngày gần nhất, cũ -> mới. Ngày trống = 0. */
  daily: { date: string; count: number }[];
  generatedAt: string;
};

type RawLearner = Record<string, unknown>;
type LessonLookup = Map<number, { title: string; slug: string }>;

/** Chuẩn hoá chuỗi thời gian SQLite ("2026-09-27 10:00:00") thành ISO UTC. */
function toIso(v: unknown): string | null {
  if (typeof v !== "string" || !v) return null;
  const s = /T/.test(v) ? v : v.replace(" ", "T") + "Z";
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function toPublicItems(rows: RawLearner[], lessons: LessonLookup, limit = 8): PublicActivityItem[] {
  const out: PublicActivityItem[] = [];
  for (const r of rows) {
    const lessonId = typeof r.lesson_id === "number" ? r.lesson_id : Number(r.lesson_id);
    const lesson = Number.isFinite(lessonId) ? lessons.get(lessonId) : undefined;
    const at = toIso(r.completed_at);
    // Không có bài hoặc không có thời điểm thì không có gì để kể - bỏ qua,
    // đừng bịa ra "đang học" cho một dòng trống.
    if (!lesson || !at) continue;
    out.push({
      at,
      streak: Math.max(0, Math.floor(Number(r.current_streak) || 0)),
      lessonTitle: lesson.title,
      lessonSlug: lesson.slug,
    });
  }
  out.sort((a, b) => (a.at < b.at ? 1 : -1));
  return out.slice(0, limit);
}

/** Lấp đủ 14 ngày, kể cả ngày không ai học - một cột bằng 0 là thông tin thật. */
export function fillDaily(rows: { d: string; n: number }[], days = 14, now = new Date()): { date: string; count: number }[] {
  const byDay = new Map(rows.map((r) => [r.d, Number(r.n) || 0]));
  const out: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: byDay.get(key) ?? 0 });
  }
  return out;
}
