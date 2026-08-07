/**
 * Kiểu dữ liệu và phép gộp cho hàng đợi báo lỗi nội dung AI.
 *
 * Tách khỏi `lib/admin/ai-reports.ts` vì file đó mở đầu bằng
 * `import "server-only"` (nó dùng service-role client), còn phép gộp thì
 * `AiReportsClient` phải chạy lại ở phía client sau mỗi lần đóng một cụm.
 * Không có gì ở đây chạm database.
 */

export interface AdminAiReportRow {
  id: number;
  user_id: string;
  lesson_id: number;
  lesson_slug: string;
  lesson_title: string;
  quote: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

/** Một đoạn văn bị báo lỗi, kèm mọi lần báo cáo trùng nội dung đó. */
export interface AdminAiReportQuote {
  quote: string;
  count: number;
  ids: number[];
  reporters: string[];
  latest_at: string;
}

/** Toàn bộ báo cáo của một bài học, gộp thành một thẻ duy nhất. */
export interface AdminAiReportGroup {
  lesson_id: number;
  lesson_slug: string;
  lesson_title: string;
  total: number;
  latest_at: string;
  quotes: AdminAiReportQuote[];
}

/**
 * Gộp danh sách báo cáo phẳng thành một thẻ mỗi bài học, và trong mỗi thẻ
 * gộp tiếp những lần báo cáo trùng đoạn văn.
 *
 * Bản chất của hàng đợi này là "bài nào hỏng", không phải "có bao nhiêu sự
 * cố lẻ": 30 người flag cùng một đoạn là *một* việc cần sửa, không phải 30.
 * Khoá gộp là `lesson_id` chứ không phải slug - `listAiReports` có thể trả
 * về slug rỗng khi hàng cũ chưa có `lesson_slug` và bài đó cũng không còn
 * trong `getLessonsMeta()`, gộp theo slug sẽ dồn mọi bài như vậy vào một
 * thẻ "" duy nhất.
 */
export function groupAiReportsByLesson(rows: AdminAiReportRow[]): AdminAiReportGroup[] {
  const byLesson = new Map<number, AdminAiReportRow[]>();
  for (const row of rows) {
    const bucket = byLesson.get(row.lesson_id);
    if (bucket) bucket.push(row);
    else byLesson.set(row.lesson_id, [row]);
  }

  const groups: AdminAiReportGroup[] = [];
  for (const [lessonId, lessonRows] of byLesson) {
    // Gộp trùng theo nội dung đã chuẩn hoá khoảng trắng (cùng một đoạn được
    // bôi đen lệch vài ký tự trắng vẫn là cùng một lỗi), nhưng hiển thị
    // nguyên văn bản đầu tiên.
    const byQuote = new Map<string, AdminAiReportQuote>();
    for (const row of lessonRows) {
      const key = row.quote.trim().replace(/\s+/g, " ");
      const existing = byQuote.get(key);
      if (existing) {
        existing.count += 1;
        existing.ids.push(row.id);
        if (row.user_name && !existing.reporters.includes(row.user_name)) {
          existing.reporters.push(row.user_name);
        }
        if (row.created_at > existing.latest_at) existing.latest_at = row.created_at;
      } else {
        byQuote.set(key, {
          quote: row.quote,
          count: 1,
          ids: [row.id],
          reporters: row.user_name ? [row.user_name] : [],
          latest_at: row.created_at,
        });
      }
    }

    const quotes = Array.from(byQuote.values()).sort(
      (a, b) => b.count - a.count || b.latest_at.localeCompare(a.latest_at)
    );

    groups.push({
      lesson_id: lessonId,
      lesson_slug: lessonRows[0].lesson_slug,
      lesson_title: lessonRows[0].lesson_title,
      total: lessonRows.length,
      latest_at: lessonRows.reduce(
        (max, r) => (r.created_at > max ? r.created_at : max),
        lessonRows[0].created_at
      ),
      quotes,
    });
  }

  // Bài bị báo nhiều nhất lên đầu - đó là bài đáng sửa trước, chứ không phải
  // bài vừa có người báo gần nhất.
  return groups.sort((a, b) => b.total - a.total || b.latest_at.localeCompare(a.latest_at));
}
