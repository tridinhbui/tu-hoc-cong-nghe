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
    return { success: false, error: error instanceof Error ? error.message : "Lỗi không xác định" };
  }
}

export async function resolveAiReportsForLessonAction(lessonId: number) {
  try {
    const session = await requireAdmin();
    await resolveAiReportsForLesson(lessonId, session.userId);
    revalidatePath("/admin/appeals");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Lỗi không xác định" };
  }
}
