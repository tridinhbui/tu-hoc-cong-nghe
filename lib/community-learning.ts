import { createClient } from "@/lib/supabase";

/** Người học thật đang có chuỗi ngày, để màn hình "Học bài" nói được cộng đồng
 *  đang học gì bằng người thay vì bằng một con số băm ra từ slug.
 *
 *  Đường đọc là RPC `get_community_learning_now` (SECURITY DEFINER, xem
 *  supabase/migrations/20260903_community_learning_now.sql). Không thể thay bằng
 *  một câu select từ trình duyệt: RLS của `user_profiles` chỉ cho
 *  `auth.uid() = id`, nên câu join sẽ trả về đúng một dòng - của chính người
 *  đang đăng nhập - mà không báo lỗi gì. Đó là lỗi mà bảng xếp hạng đã mắc một
 *  lần rồi. */

export type CommunityLearner = {
  userId: string;
  /** `full_name` đã cắt khoảng trắng; null khi người dùng chưa đặt tên. Chỗ
   *  hiển thị tự quyết định gọi họ là gì - đây là tầng dữ liệu, không phải chỗ
   *  đặt chuỗi "Người học" mà rồi tiếng Anh đọc ra tiếng Việt. */
  name: string | null;
  avatarUrl: string | null;
  streak: number;
  /** Bài hoàn thành gần nhất. null khi người này có chuỗi ngày nhưng chưa có
   *  bản ghi `user_progress` nào hoàn thành - đo trên dữ liệu thật là 2/40, nên
   *  đây là ca có thật chứ không phải phòng xa. */
  lessonId: number | null;
  completedAt: string | null;
};

type Row = {
  user_id: string;
  name: string | null;
  avatar_url: string | null;
  current_streak: number | null;
  lesson_id: number | null;
  completed_at: string | null;
};

/** `PGRST202` là "không tìm thấy function" - tức migration chưa chạy trên môi
 *  trường này. Migration trong repo này được chạy TAY qua SQL Editor (xem
 *  scripts/check-migrations.mjs), nên khoảng thời gian giữa lúc deploy code và
 *  lúc ai đó chạy SQL là chuyện thường, không phải sự cố. Trả về mảng rỗng để
 *  khối này không hiện, thay vì làm sập cả trang Học bài. */
function isMissingFunction(error: { code?: string } | null): boolean {
  return error?.code === "PGRST202" || error?.code === "PGRST205" || error?.code === "42P01";
}

export async function getCommunityLearningNow(
  limit = 24,
  days = 7
): Promise<CommunityLearner[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_community_learning_now", {
    p_limit: limit,
    p_days: days,
  });

  if (error) {
    if (isMissingFunction(error)) return [];
    // Không ném lỗi: đây là một dải trang trí ở cuối màn hình học bài. Một lỗi
    // mạng ở đây không đáng đổi lấy việc người dùng không đọc được bài nào.
    console.error("get_community_learning_now:", error.message);
    return [];
  }

  return ((data ?? []) as Row[]).map((row) => ({
    userId: row.user_id,
    name: row.name?.trim() || null,
    avatarUrl: row.avatar_url || null,
    streak: row.current_streak ?? 0,
    lessonId: row.lesson_id ?? null,
    completedAt: row.completed_at ?? null,
  }));
}

/** Tên gọi ngắn để hiện trên thẻ: chỉ lấy từ ĐẦU.
 *
 *  Không lấy từ cuối như quy ước tên người Việt, vì cột này có cả tên tiếng
 *  Anh, cả biệt danh một từ, cả địa chỉ email bị dán vào. Từ đầu luôn là một
 *  thứ đọc được; từ cuối của "Nguyễn Văn A" là "A".
 *
 *  Cắt ở 14 ký tự vì thẻ hẹp, và cắt bằng cách đếm ký tự chứ không phải bằng
 *  `truncate` của CSS: chuỗi ngày đứng ngay cạnh tên, nên một cái tên dài sẽ
 *  đẩy nó ra khỏi thẻ thay vì bị cắt gọn. */
export function shortLearnerName(name: string | null, fallback: string): string {
  const first = (name ?? "").trim().split(/\s+/)[0] ?? "";
  if (!first) return fallback;
  return first.length > 14 ? `${first.slice(0, 13)}…` : first;
}
