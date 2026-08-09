/**
 * Điểm quiz bài học được chấm trên LẦN TRẢ LỜI ĐẦU của mỗi câu.
 *
 * Tách khỏi LessonPageLayout vì hai lý do. Thứ nhất, con số này chảy vào
 * `user_progress.quiz_score`, từ đó vào `avg_quiz_score`, phần trăm năng lực ở
 * /su-nghiep và cổng mở bài - nên nó đáng có một bài kiểm riêng thay vì chỉ
 * tồn tại bên trong một component 1.300 dòng.
 *
 * Thứ hai, và đây mới là lý do thật: cùng một phép tính chạy ở HAI chỗ - chỗ
 * hiển thị cho người học và chỗ ghi xuống Supabase. Hai bản chép tay của cùng
 * một biểu thức là cách chắc chắn nhất để một ngày nào đó người học đọc một
 * con số còn hệ thống lưu một con số khác.
 *
 * Bối cảnh: trước đây điểm lấy thẳng từ trạng thái cuối cùng, mà nút "Thử lại"
 * cho phép mở lại câu sai đến khi đúng - nên gần như mọi bài đều được lưu
 * 100%, và mọi con số dựng trên nó đo đúng một thứ: người học có bấm thử lại
 * hay không.
 */

/**
 * @param results      trạng thái hiện tại của từng câu (sau khi thử lại)
 * @param firstResults kết quả lần trả lời đầu; `null`/`undefined` = chưa có
 *                     bản ghi (bài làm từ máy khác, hoặc bản ghi lưu trước khi
 *                     trường này tồn tại) - khi đó rơi về `results` của chính
 *                     câu đó, tức không tệ hơn hành vi cũ.
 */
export function firstAttemptResults(
  results: boolean[],
  firstResults: (boolean | null | undefined)[]
): boolean[] {
  return results.map((r, i) => firstResults[i] ?? r);
}

/** Số câu đúng ở lần trả lời đầu. */
export function firstAttemptScore(
  results: boolean[],
  firstResults: (boolean | null | undefined)[]
): number {
  return firstAttemptResults(results, firstResults).filter(Boolean).length;
}
