/**
 * Những câu behavioral người học ĐÃ CHUẨN BỊ, giữ trên máy.
 *
 * VÌ SAO KHÔNG PHẢI ĐIỂM, VÀ VÌ SAO KHÔNG LƯU LÊN MÁY CHỦ.
 *
 * Phần behavioral cố ý không chấm - chú thích đầu BehavioralPrepPanel.tsx nói
 * rõ vì sao: "Kể tôi nghe về bản thân bạn" không có đáp án đúng, nên trắc
 * nghiệm hoá nó là chấm việc đoán mò, và trả XP cho một cú bấm "xem khung trả
 * lời" là huy hiệu tham dự. Ràng buộc đó vẫn giữ nguyên ở đây.
 *
 * Nên thứ đo được không phải NĂNG LỰC mà là ĐỘ PHỦ: đã đi qua bao nhiêu câu
 * trong bộ. Đó là một con số thật và hữu ích ("còn 107 câu chưa xem"), miễn là
 * gọi đúng tên nó. Chỗ này rất dễ trượt thành "mức sẵn sàng behavioral 12%",
 * và con số ấy sẽ là bịa - xem AGENTS.md, mục về quiz module CFA, cho đúng cái
 * lỗi này ở một kho khác.
 *
 * localStorage chứ không phải Supabase vì đúng lý do đó: một con số độ phủ
 * không chảy vào avg_quiz_score, không vào XP, không vào xếp hạng nào. Dựng
 * một bảng, một migration và một đường ghi cho nó là trả giá của dữ liệu có
 * chấm điểm để mua một dấu tick. Hệ quả phải nói thẳng trên giao diện: đổi
 * máy là mất, và đó là đánh đổi chấp nhận được cho thứ này.
 */

const STORAGE_KEY = "thtcdn:ib-behavioral-prepared";

/** Đọc tập id câu đã chuẩn bị. Trả về tập rỗng ở phía máy chủ và khi dữ liệu
 *  hỏng - một khoá localStorage bị viết đè bởi thứ khác không nên làm nổ trang. */
export function readPreparedBehavioral(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is number => typeof id === "number"));
  } catch {
    return new Set();
  }
}

/** Ghi nhận một câu đã được mở khung trả lời. Trả về tập MỚI sau khi ghi, để
 *  chỗ gọi cập nhật state mà không phải đọc lại đĩa. */
export function markBehavioralPrepared(questionId: number): Set<number> {
  const next = readPreparedBehavioral();
  next.add(questionId);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // Chế độ riêng tư hoặc hết dung lượng. Mất con số độ phủ không đáng để
      // chặn việc người học đang làm, nên nuốt lỗi và đi tiếp.
    }
  }
  return next;
}
