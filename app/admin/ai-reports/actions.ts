"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { ignoreAiReport, resolveAiReportsForLesson } from "@/lib/admin/ai-reports";

// requireAdmin() ở mọi action: server action là endpoint gọi được từ ngoài,
// và cả hai hàm dưới đây ghi bằng service-role client (bỏ qua RLS). Thiếu nó
// thì bất kỳ tài khoản đăng nhập nào cũng đóng được hàng đợi của admin.

export async function ignoreAiReportAction(id: number) {
  try {
    const session = await requireAdmin();
    await ignoreAiReport(id, session.userId);
    revalidatePath("/admin/appeals");
    return { success: true };
  } catch (error) {
    /* i18n-ignore-start: chỗ dự phòng khi một giá trị ném ra không phải Error
       và không có `message` để đọc. Chuỗi này về tới màn hình quản trị, cạnh
       thông báo lỗi thô của Supabase - dịch nó không làm câu bên cạnh dễ đọc
       hơn. */
    return { success: false, error: error instanceof Error ? error.message : "Lỗi không xác định" };
    /* i18n-ignore-end */
  }
}

export async function resolveAiReportsForLessonAction(lessonId: number) {
  try {
    const session = await requireAdmin();
    await resolveAiReportsForLesson(lessonId, session.userId);
    revalidatePath("/admin/appeals");
    return { success: true };
  } catch (error) {
    /* i18n-ignore-start: chỗ dự phòng khi một giá trị ném ra không phải Error
       và không có `message` để đọc. Chuỗi này về tới màn hình quản trị, cạnh
       thông báo lỗi thô của Supabase - dịch nó không làm câu bên cạnh dễ đọc
       hơn. */
    return { success: false, error: error instanceof Error ? error.message : "Lỗi không xác định" };
    /* i18n-ignore-end */
  }
}
