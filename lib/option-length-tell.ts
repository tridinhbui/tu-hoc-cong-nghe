/** Phát hiện mách nước độ dài ngay lúc soạn câu hỏi.
 *
 *  VÌ SAO CHECK NÀY Ở ĐÂY CHỨ KHÔNG Ở MỘT BỘ KIỂM.
 *
 *  Mọi cổng chất lượng câu hỏi trong repo này - luật 1-6 của AGENTS.md,
 *  MAX_LENGTH_BIAS_Z, MAX_TELL_SHARE, cổng của ngân hàng IB - đều là script
 *  hoặc test đọc file trong repo. Quiz của module CFA không nằm trong repo: nó
 *  được gõ qua /admin/cfa-library và lưu thẳng vào bảng `ModuleQuizQuestion`
 *  trên Supabase. Không bộ kiểm tĩnh nào với tới được nó.
 *
 *  Điểm của nó KHÔNG chảy vào `avg_quiz_score` và không vào `cfa_readiness` -
 *  cái sau đếm số module hoàn thành, mà hoàn thành được ghi ngay khi làm xong
 *  quiz, không có điểm sàn. Nên đây là kho hình thành, giống `practicePrompt`:
 *  một câu đoán được không làm sai con số nào, nó chỉ lấy mất của người học
 *  phép thử duy nhất họ có để biết mình đã hiểu hay chưa.
 *
 *  Nội dung sống trong cơ sở dữ liệu thì chỗ duy nhất chặn được là ĐƯỜNG GHI.
 *
 *  CẢNH BÁO, KHÔNG CHẶN. Đáp án đúng NÊN là phương án dài nhất ở khoảng một
 *  phần ba số câu ba phương án - đó là mức may rủi, và một kho mà đáp án đúng
 *  không bao giờ dài nhất cũng đoán được y như kho ngược lại. Chặn lưu sẽ ép
 *  người soạn viết lệch sang chiều kia. Việc của hàm này là làm mách nước hiện
 *  ra lúc còn sửa được, không phải quyết định thay.
 *
 *  NGƯỠNG HẸP CÓ CHỦ Ý. AGENTS.md ghi lại vài lần dựng bộ dò quá rộng rồi phải
 *  bỏ: "một cổng kêu oan là một cổng người ta học cách bỏ qua". Nên nó chỉ kêu
 *  khi HAI điều cùng đúng - đáp án đúng dài nhất DUY NHẤT, và nó vượt ra ngoài
 *  dải ±20% quanh trung bình của luật 6. Một câu mà đáp án đúng dài nhất nhưng
 *  cả ba phương án vẫn sát nhau thì không kêu, vì nó không phải mách nước. */

export type OptionLengthTell = {
  /** Chỉ số phương án gây ra cảnh báo. */
  index: number;
  /** Độ dài của nó, tính bằng ký tự. */
  length: number;
  /** Độ dài trung bình của tất cả phương án, làm tròn. */
  mean: number;
};

/** Dải ±20% quanh trung bình - luật 6 của AGENTS.md. */
const BAND = 0.2;

/**
 * Trả về mô tả mách nước nếu đáp án đúng là phương án dài nhất DUY NHẤT và nó
 * nằm ngoài dải ±20%; ngược lại trả về null.
 *
 * Số phương án không cố định: câu CFA có ba, quiz bài học có bốn. Mức may rủi
 * khác nhau giữa hai loại, nhưng phép kiểm này không dùng tới mức may rủi - nó
 * chỉ hỏi câu ĐANG SOẠN có lộ đáp án qua độ dài hay không.
 */
export function findCorrectAnswerLengthTell(
  options: string[],
  correct: number
): OptionLengthTell | null {
  if (options.length < 2) return null;
  if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) return null;

  const lengths = options.map((option) => option.trim().length);
  if (lengths.some((length) => length === 0)) return null; // câu chưa gõ xong

  const longest = Math.max(...lengths);
  // Hoà thì không có phương án dài nhất duy nhất để nhắm vào, nên không mách
  // nước gì - cùng quy ước với kỳ vọng có tính tới hoà trong các cổng z.
  if (lengths.filter((length) => length === longest).length !== 1) return null;
  if (lengths[correct] !== longest) return null;

  const mean = lengths.reduce((sum, length) => sum + length, 0) / lengths.length;
  if (lengths[correct] <= mean * (1 + BAND)) return null;

  return { index: correct, length: lengths[correct], mean: Math.round(mean) };
}
