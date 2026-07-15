"use server";

import { deleteAiReport } from "@/lib/admin/ai-reports";
import { revalidatePath } from "next/cache";

export async function deleteAiReportAction(id: number) {
  try {
    await deleteAiReport(id);
    revalidatePath("/admin/ai-reports");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Lỗi không xác định" };
  }
}
