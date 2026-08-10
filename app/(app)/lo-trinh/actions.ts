"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";

/** Ghi hai lựa chọn của /lo-trinh lên user_profiles.
 *
 *  VÌ SAO LÀ SERVER ACTION chứ không phải một lần `.update()` từ client: id
 *  người dùng phải lấy từ phiên ở phía server. Nhận `userId` từ client rồi ghi
 *  theo nó nghĩa là bất kỳ ai cũng sửa được nhịp học của người khác bằng một
 *  lời gọi thẳng - RLS chặn được, nhưng chỉ khi chính sách được viết đúng, và
 *  không nên để một dòng chính sách là thứ duy nhất đứng giữa.
 *
 *  KHÔNG revalidatePath: trang đọc hai giá trị này để dựng trạng thái ban đầu,
 *  còn sau đó chính client giữ trạng thái. Làm mới đường dẫn sẽ dựng lại cả
 *  trang sau mỗi lần bấm một viên nhịp - tức mỗi lần đổi từ 3 sang 4 ngày là
 *  một vòng gọi Supabase cộng một lần dựng lại RSC, để hiển thị đúng thứ màn
 *  hình đã hiển thị.
 *
 *  Trả về `ok` để giao diện nói được "đã lưu" một cách trung thực. Trước đây
 *  không có tín hiệu nào: viên nhịp đổi màu ngay lập tức dù việc ghi có thành
 *  công hay không, nên một lần lưu hỏng trông y hệt một lần lưu được. */
export async function saveLearningPathPrefs(input: {
  track?: "personal" | "professional";
  perDay?: 1 | 2;
  daysPerWeek?: number;
}): Promise<{ ok: boolean }> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const patch: Record<string, string | number> = {};

  if (input.track === "personal" || input.track === "professional") {
    patch.learning_track = input.track;
  }
  if (input.perDay === 1 || input.perDay === 2) {
    patch.learning_pace_per_day = input.perDay;
  }
  // Kiểm lại ở đây dù cột đã có CHECK: một giá trị ngoài khoảng ném lỗi từ
  // Postgres, và lỗi đó đi ra dưới dạng "lưu hỏng" chung chung thay vì bị chặn
  // ở chỗ đọc được. Ràng buộc ở cột là lưới cuối, không phải lưới đầu.
  if (typeof input.daysPerWeek === "number") {
    const d = Math.trunc(input.daysPerWeek);
    if (d >= 1 && d <= 7) patch.learning_pace_days_per_week = d;
  }

  if (Object.keys(patch).length === 0) return { ok: false };

  const { error } = await supabase.from("user_profiles").update(patch).eq("id", user.id);
  return { ok: !error };
}
