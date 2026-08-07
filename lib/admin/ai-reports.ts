import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";
import { getLessonsMeta } from "@/lib/lessons-loader";
import type { AdminAiReportRow } from "@/lib/admin/ai-report-grouping";

// Gộp/kiểu dữ liệu nằm ở ai-report-grouping.ts để client component dùng lại
// được; re-export ở đây để chỗ gọi cũ không phải đổi đường dẫn import.
export type {
  AdminAiReportRow,
  AdminAiReportQuote,
  AdminAiReportGroup,
} from "@/lib/admin/ai-report-grouping";

export type AiReportStatus = "open" | "resolved" | "ignored";

/**
 * `report_status` đến từ migration 20260826_ai_report_status.sql. Môi trường
 * nào chưa chạy migration đó thì Postgres trả 42703 (undefined_column) và
 * PostgREST trả PGRST204 - phân biệt được với lỗi thật để phần đọc còn chạy
 * tiếp thay vì làm rỗng cả tab.
 */
function isMissingReportStatusColumn(error: { code?: string } | null): boolean {
  return error?.code === "42703" || error?.code === "PGRST204";
}

const REPORT_SELECT = `
  id,
  user_id,
  lesson_id,
  lesson_slug,
  quote,
  created_at,
  user_profiles (
    email,
    full_name
  )
`;

export async function listAiReports(
  status: AiReportStatus | "all" = "open"
): Promise<AdminAiReportRow[]> {
  const supabase = createAdminClient();

  function baseQuery() {
    return supabase
      .from("lesson_highlights")
      .select(REPORT_SELECT)
      .eq("kind", "ai_flag")
      .order("created_at", { ascending: false });
  }

  let query = baseQuery();
  if (status !== "all") query = query.eq("report_status", status);
  let { data, error } = await query;

  // Chưa chạy migration thì mọi hàng vẫn là "chưa xử lý" theo nghĩa cũ (xoá
  // là cách đóng duy nhất), nên đọc lại không kèm bộ lọc vẫn ra đúng hàng đợi.
  if (error && isMissingReportStatusColumn(error)) {
    console.warn(
      "lesson_highlights.report_status chưa tồn tại - chạy migration 20260826_ai_report_status.sql. Tạm liệt kê toàn bộ báo cáo."
    );
    ({ data, error } = await baseQuery());
  }

  if (error) {
    console.error("Error fetching AI reports:", error);
    return [];
  }

  // Fetch lesson metadata to resolve missing slugs and titles
  const lessonsMeta = await getLessonsMeta().catch(() => []);
  const lessonSlugMap = new Map(lessonsMeta.map((l) => [l.id, l.slug]));
  const lessonTitleMap = new Map(lessonsMeta.map((l) => [l.id, l.title]));

  /** Hàng báo cáo kèm quan hệ hồ sơ người dùng; chỉ khai phần hàm này đọc. */
  interface ReportRow {
    id: number;
    user_id: string;
    lesson_id: number;
    lesson_slug: string | null;
    quote: string;
    created_at: string;
    user_profiles?: { email?: string | null; full_name?: string | null } | null;
  }

  return ((data ?? []) as unknown as ReportRow[]).map((row) => {
    const resolvedSlug = row.lesson_slug || lessonSlugMap.get(row.lesson_id) || "";
    const resolvedTitle = lessonTitleMap.get(row.lesson_id) || `Bài học #${row.lesson_id}`;

    return {
      id: row.id,
      user_id: row.user_id,
      lesson_id: row.lesson_id,
      lesson_slug: resolvedSlug,
      lesson_title: resolvedTitle,
      quote: row.quote,
      created_at: row.created_at,
      user_email: row.user_profiles?.email ?? "Không rõ",
      user_name: row.user_profiles?.full_name ?? "Ẩn danh",
    };
  });
}

const MIGRATION_REQUIRED =
  "Chưa chạy migration 20260826_ai_report_status.sql trên môi trường này, " +
  "nên không đóng được báo cáo. Chạy migration rồi thử lại.";

/**
 * Đóng cả cụm báo cáo của một bài học sau khi nội dung đã được sửa.
 *
 * Lọc thêm `kind = "ai_flag"` vì `lesson_highlights` còn chứa highlight
 * "important" do chính người học tự lưu cho mình - cập nhật theo `lesson_id`
 * trần sẽ chạm cả ghi chú cá nhân của mọi người trong bài đó.
 *
 * Lọc `report_status = "open"` để không ghi đè `resolved_by`/`resolved_at`
 * của những báo cáo đã đóng từ trước ở cùng bài.
 */
export async function resolveAiReportsForLesson(lessonId: number, adminId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_highlights")
    .update({ report_status: "resolved", resolved_at: new Date().toISOString(), resolved_by: adminId })
    .eq("lesson_id", lessonId)
    .eq("kind", "ai_flag")
    .eq("report_status", "open");

  if (error) {
    // Với thao tác ghi thì im lặng bỏ qua là sai: admin sẽ tưởng đã đóng
    // xong trong khi hàng đợi không đổi. Báo rõ nguyên nhân thật.
    throw new Error(isMissingReportStatusColumn(error) ? MIGRATION_REQUIRED : error.message);
  }
}

/** Bỏ qua một báo cáo lẻ: đã xem, không phải lỗi, không cần sửa nội dung. */
export async function ignoreAiReport(id: number, adminId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("lesson_highlights")
    .update({ report_status: "ignored", resolved_at: new Date().toISOString(), resolved_by: adminId })
    .eq("id", id)
    .eq("kind", "ai_flag");

  if (error) {
    throw new Error(isMissingReportStatusColumn(error) ? MIGRATION_REQUIRED : error.message);
  }
}
