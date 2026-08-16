// Mỗi widget tương tác dạy đúng MỘT chuyện. Bảng này ghi lại chuyện đó bằng
// những từ mà một bài học về đúng chủ đề ấy gần như không thể không dùng.
//
// Lý do cần bảng: `interactiveType` là một chuỗi tự do gắn tay vào từng bài,
// và không có gì đối chiếu nó với nội dung bài. Sai một chữ thì bài về mô hình
// hoá độ biến động GARCH hiện ra biểu đồ so sánh lãi đơn với lãi kép - không
// lỗi, không cảnh báo, chỉ là một khối "Thử nghiệm tương tác" nói chuyện khác.
// Mười bài mới thêm trong một ngày đã dính đúng lỗi đó.
//
// Từ khoá cố ý viết rộng: mục tiêu là chặn bài NGƯỢC HẲN chủ đề, không phải
// ép người viết dùng đúng một cách diễn đạt. Bài về NPV, WACC hay CAPM không
// bao giờ chứa chữ "lãi suất" nhưng widget lãi suất là widget đúng của nó, nên
// "chiết khấu", "npv", "wacc" đều nằm trong danh sách.

/* i18n-ignore-start: đây KHÔNG phải chữ hiển thị. Đó là từ khoá được so khớp
   (`content.includes(term)`, xem `widgetMatchesTopic` ngay dưới) với tiêu đề và
   nội dung bài học tiếng Việt để chọn widget tương tác đúng chủ đề. Không một
   chuỗi nào ở đây được vẽ ra màn hình - `grep -rn WIDGET_TOPIC_TERMS` chỉ ra
   chính tệp này và bộ kiểm của nó.

   Dịch chúng sang tiếng Anh sẽ làm mọi phép so khớp trượt, và triệu chứng đúng
   bằng lỗi mà chú thích đầu tệp mô tả: bài về GARCH hiện ra biểu đồ lãi kép,
   không lỗi, không cảnh báo. */
export const WIDGET_TOPIC_TERMS: Record<string, string[]> = {
  chart: ["lãi kép", "lãi đơn", "compound", "kép", "tăng trưởng", "dài hạn"],
  "profit-calc": ["lợi nhuận", "dòng tiền", "tiền mặt", "doanh thu", "chi phí", "ebitda", "biên", "expense", "net income", "free cash flow", "lỗ", "tồn kho", "cổ tức", "oci", "affiliate"],
  process: ["báo cáo tài chính", "ba báo cáo", "lưu chuyển", "cân đối", "p&l", "tài sản", "nợ", "vốn chủ", "dồn tích"],
  "interest-rate": ["lãi suất", "interest", "chiết khấu", "npv", "wacc", "capm", "hiện tại", "annuity", "perpetuity", "dcf", "chi phí vốn", "terminal value"],
  risk: ["rủi ro", "risk", "lợi nhuận kỳ vọng", "biến động", "danh mục"],
  bond: ["trái phiếu", "coupon", "ytm", "bond", "lợi suất", "tín dụng", "spread", "vỡ nợ", "xếp hạng"],
  payoff: ["quyền chọn", "option", "payoff", "phái sinh", "call", "put", "forward", "future", "swap", "phòng hộ", "chênh lệch giá"],
  "money-vs-asset": ["tài sản", "tiêu sản", "tiền", "thuê", "mua"],
  multiples: ["p/e", "p/b", "bội số", "ev/ebitda", "định giá", "multiple", "market cap", "enterprise value", "cổ phiếu", "giá trị doanh nghiệp"],
  budget: ["ngân sách", "50/30/20", "chi tiêu", "tiết kiệm", "trả nợ", "audit tài chính", "tài sản ròng"],
  prospect: ["tâm lý", "hành vi", "prospect", "mất mát", "thiên kiến", "behavioral", "sai lầm"],
  accretion: ["eps", "m&a", "sáp nhập", "pha loãng", "thâu tóm", "thương vụ"],
  "supply-demand": ["cung", "cầu", "giá cân bằng", "thị trường", "chi phí biên", "sức mua"],
  "inflation-calculator": ["lạm phát", "sức mua"],
  "ethics-case": ["đạo đức", "ethics", "chuẩn mực", "standard", "xung đột lợi ích", "tuân thủ", "aml", "kyc", "gian lận", "công bố", "trọng yếu", "khủng hoảng"],
  "tail-risk": ["var", "đuôi", "tail", "expected shortfall", "biến động", "garch", "phân phối"],
  ratios: ["chỉ số", "tỷ số", "ratio", "cân đối", "thanh toán", "đòn bẩy", "turnover", "vòng quay", "hiệu quả sử dụng"],
  "fee-drag": ["phí", "fee", "chi phí quản lý", "ter", "hiệu suất", "etf", "quỹ mở", "quỹ chỉ số"],
  "esg-score": ["esg", "bền vững", "xếp hạng", "khí hậu", "carbon", "quản trị doanh nghiệp", "governance"],
  "prompt-craft": ["câu lệnh", "prompt", "ai", "chatgpt", "claude", "giao việc", "tài liệu"],
  "ai-verify": ["ai", "kiểm chứng", "bịa", "đối chiếu", "soát", "nguồn"],
  sampling: ["chọn mẫu", "mẫu", "kiểm toán", "kiểm soát", "bằng chứng", "rcsa", "kri", "ba tuyến", "gian lận", "tuân thủ", "phát hiện"],
  regression: ["hồi quy", "regression", "p-value", "giả thuyết", "tương quan", "thống kê", "ngoài mẫu", "backtest", "chuỗi thời gian", "hiệp phương sai", "monte carlo", "bootstrap", "bayes", "hợp lý cực đại", "mẫu"],
  "journal-entry": ["bút toán", "định khoản", "ghi sổ", "sổ cái", "nhật ký", "nợ", "có", "hạch toán", "kế toán", "tài sản", "khoá sổ", "kết chuyển", "đối chiếu"],
  "excel-shortcuts": ["excel", "phím tắt", "bàn phím"],
  "excel-lookup": ["tra cứu", "index", "match", "xlookup", "vlookup", "sumifs"],
  "excel-three-statement": ["mô hình", "ba báo cáo", "vòng lặp", "liên kết"],
  "excel-audit": ["kiểm tra", "dò lỗi", "ô kiểm tra", "số cứng"],
  "excel-power-query": ["power query", "làm sạch", "dữ liệu"],
  "excel-sql": ["sql", "truy vấn", "select", "join"],
};

/** Văn bản của một bài mà phép đối chiếu chủ đề nhìn vào. */
export function topicHaystack(lesson: {
  title: string;
  subtitle?: string;
  whyItMatters?: string;
  keyTakeaways?: string[];
}): string {
  return [lesson.title, lesson.subtitle ?? "", lesson.whyItMatters ?? "", ...(lesson.keyTakeaways ?? [])]
    .join(" ")
    .toLowerCase();
}

/**
 * Bài có nói về đúng chuyện widget của nó dạy không.
 *
 * Trả `true` cho loại widget chưa có trong bảng - bảng thiếu mục là việc phải
 * sửa ở bảng, không phải cái cớ để chặn một bài học.
 */
/* i18n-ignore-end */

export function widgetMatchesTopic(
  type: string,
  lesson: { title: string; subtitle?: string; whyItMatters?: string; keyTakeaways?: string[] },
): boolean {
  const terms = WIDGET_TOPIC_TERMS[type];
  if (!terms) return true;
  const hay = topicHaystack(lesson);
  return terms.some((term) => hay.includes(term));
}
