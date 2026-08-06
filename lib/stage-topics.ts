import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";

/** Id chủ đề. KHÔNG phải câu chữ - câu chữ nằm ở t.topics[id] trong từ điển.
 *
 *  Bảng này từng trả thẳng chuỗi tiếng Việt, và chuỗi đó đi hai đường: hiện
 *  lên dashboard, và làm KHÓA để chọn câu khuyên. Đường thứ hai là chỗ vỡ khi
 *  dịch - recommendedActionForTopic() khớp bằng topic.includes("Kế toán" |
 *  "Định giá" | "Rủi ro" | ...), nên dịch nhãn sang tiếng Anh là mọi lời khuyên
 *  rơi hết về câu chung, không lỗi, không test đỏ.
 *
 *  Đây là lần thứ ba trong cùng một tuần: isCareerCategory() kiểm bằng bảng
 *  nhãn, chuỗi if chặng so bằng stage.label, và giờ là lời khuyên khớp bằng tên
 *  chủ đề. Cùng một hình dạng - phép kiểm CẤU TRÚC đọc dữ liệu CÂU CHỮ - và
 *  mỗi lần chỉ lộ ra khi câu chữ đổi. */
export type StageTopicId =
  // Track cá nhân
  | "money-foundations"
  | "tax-payroll"
  | "personal-investing"
  | "bonds-rates"
  | "portfolio-retirement"
  | "housing-protection"
  // Dùng ở cả hai track: track cá nhân Chặng 10, chuyên ngành Chặng 12
  | "investing-psychology"
  // Track chuyên ngành
  | "accounting-reporting"
  | "valuation-corp-finance"
  | "bonds-credit"
  | "risk-portfolio-derivatives"
  | "risk-frm"
  | "banking-compliance"
  | "quant-data"
  | "career-application"
  | "esg"
  | "economics-markets"
  | "vn-market"
  | "private-markets"
  | "wealth-insurance"
  | "real-estate-project"
  | "fintech"
  // Bài không rơi vào chặng nào
  | "personal-finance"
  | "professional-finance"
  | "bonus-cases";

/** Câu khuyên đi kèm chủ đề. Sáu nhánh, đúng sáu nhánh của
 *  recommendedActionForTopic() cũ, nhưng tra bằng id thay vì bằng substring của
 *  câu chữ. Bảng này để lộ ra điều substring che được: 12 trong 23 chủ đề nhận
 *  câu chung, tức bảng lời khuyên giờ là mắt yếu hơn bảng chủ đề. */
export type TopicAdviceId =
  | "accounting"
  | "valuation"
  | "risk"
  | "bonds"
  | "investing"
  | "generic";

export const TOPIC_ADVICE: Record<StageTopicId, TopicAdviceId> = {
  "money-foundations": "generic",
  "tax-payroll": "generic",
  "personal-investing": "investing",
  "bonds-rates": "bonds",
  "portfolio-retirement": "investing",
  "housing-protection": "generic",
  "investing-psychology": "generic",
  "accounting-reporting": "accounting",
  "valuation-corp-finance": "valuation",
  "bonds-credit": "bonds",
  "risk-portfolio-derivatives": "risk",
  "risk-frm": "risk",
  "banking-compliance": "generic",
  "quant-data": "generic",
  "career-application": "generic",
  esg: "generic",
  "economics-markets": "generic",
  "vn-market": "generic",
  // "đầu tư thay thế" là đầu tư; substring cũ không bắt được vì chữ thường.
  "private-markets": "investing",
  "wealth-insurance": "generic",
  "real-estate-project": "generic",
  fintech: "generic",
  "personal-finance": "generic",
  "professional-finance": "generic",
  "bonus-cases": "generic",
};

/** Chủ đề học của một bài, suy ra từ chặng nó nằm trong.
 *
 *  Đây là bản DUY NHẤT. Trước đó logic này tồn tại hai bản riêng - một trong
 *  lib/supabase-analytics.ts, một trong app/(app)/dashboard/actions.ts - và
 *  chuyện đúng như đã lo: khi track cá nhân dời số ("Chặng 0 - Biết mình"
 *  thành Chặng 1, rồi chèn chặng Thuế vào giữa), CHỈ MỘT bản được sửa.
 *
 *  Bản trong analytics được sửa, kèm nguyên chẩn đoán viết trong comment. Bản
 *  trong dashboard thì không, và nó còn giữ nguyên phép so `stage.label ===
 *  "Chặng 0"` - một nhãn đã không còn tồn tại, nên nhánh đó chết hẳn. Hậu quả
 *  không lộ ra ở đâu: mọi bài vẫn có một chủ đề, chỉ là sai chủ đề, và cái sai
 *  đi thẳng vào topicGapSummary ("bạn đang yếu chủ đề gì") cùng
 *  recommendedActionForTopic ("nên làm gì tiếp") trên dashboard. Người học vấp
 *  quiz Thuế TNCN được bảo là yếu "Đầu tư cá nhân" rồi khuyên đi đọc lại một
 *  tình huống đầu tư.
 *
 *  Viết thành BẢNG chứ không phải chuỗi if, vì một mục thiếu ở đây là một nhãn
 *  không có chủ đề - lesson-stage-topics.test.ts thấy ngay - còn một điều kiện
 *  if không khớp thì lặng lẽ rơi xuống dòng return cuối cùng. Đúng cách mà lần
 *  dời số vừa rồi đã thoát được mọi con mắt. */

const PERSONAL_STAGE_TOPIC: Record<string, StageTopicId> = {
  "Chặng 1": "money-foundations",
  "Chặng 2": "tax-payroll",
  "Chặng 3": "money-foundations",
  "Chặng 4": "personal-investing",
  "Chặng 5": "bonds-rates",
  "Chặng 6": "portfolio-retirement",
  "Chặng 7": "personal-investing",
  "Chặng 8": "portfolio-retirement",
  "Chặng 9": "housing-protection",
  "Chặng 10": "investing-psychology",
};

/** Track chuyên ngành, 43 chặng, 16 chủ đề.
 *
 *  Chuỗi if cũ được viết khi track mới có 9 chặng, nên nhánh mặc định gánh
 *  toàn bộ Chặng 10-43: 34 chặng - Kiểm toán, M&A, năm chặng FRM, ESG,
 *  FinTech, Định phí bảo hiểm, Bút toán, TTCK Việt Nam, Private markets - đổ
 *  hết vào một ô "Ứng dụng nghề nghiệp". Chủ đề đó là thứ dashboard dùng để
 *  nói "bạn đang yếu phần nào", nên gộp 34 chặng lại thành một câu trả lời
 *  đúng nghĩa là không trả lời.
 *
 *  Chín chặng đầu giữ nguyên nhãn cũ. 34 chặng còn lại được nhóm theo TÊN
 *  chặng trong track-stages.ts.
 *
 *  Độ mịn chọn theo cách chủ đề được dùng, không theo cảm giác. topicGapSummary
 *  chỉ hiện TOP 4, nên 43 chủ đề riêng biệt sẽ biến "bốn điểm yếu nhất" thành
 *  bốn chặng ngẫu nhiên - mỗi chủ đề một chặng thì không có gì để cộng dồn.
 *  16 chủ đề cho 43 chặng là mức còn cộng dồn được.
 *
 *  Chọn id chủ đề ở đây là đang định tuyến cả lời khuyên, qua TOPIC_ADVICE. Bản
 *  cũ định tuyến bằng topic.includes("Kế toán" | "Định giá" | "Rủi ro" | ...)
 *  trên chính câu chữ hiển thị, và includes phân biệt hoa thường - nên
 *  "Private markets & đầu tư thay thế" trượt câu khuyên về đầu tư chỉ vì chữ
 *  "đầu tư" viết thường. Giờ tra bằng id nên chuyện đó không xảy ra được nữa. */
const PROFESSIONAL_STAGE_TOPIC: Record<string, StageTopicId> = {
  "Chặng 1": "accounting-reporting",
  "Chặng 2": "accounting-reporting",
  "Chặng 3": "accounting-reporting",
  "Chặng 4": "valuation-corp-finance",
  "Chặng 5": "valuation-corp-finance",
  "Chặng 6": "valuation-corp-finance",
  "Chặng 7": "bonds-credit",
  "Chặng 8": "risk-portfolio-derivatives",
  "Chặng 9": "risk-portfolio-derivatives",
  // Chặng 10-43. Nhóm theo tên chặng; tên chặng ghi ngay bên cạnh để lần dời
  // số sau đọc một dòng là biết nó có còn đúng hay không.
  "Chặng 10": "career-application", // Ứng dụng nghề Phân tích & IB
  "Chặng 11": "valuation-corp-finance", // Vận hành tài chính DN hiện đại
  "Chặng 12": "investing-psychology", // Behavioral Finance nâng cao
  "Chặng 13": "career-application", // AI trong tài chính: đọc báo cáo, viết memo
  "Chặng 14": "career-application", // Masterclass gộp: BĐS, trái phiếu, VC, VaR, ESG
  "Chặng 15": "valuation-corp-finance", // Financial Modeling
  "Chặng 16": "esg", // ESG & Climate Finance
  "Chặng 17": "economics-markets", // Kinh tế học cho người làm tài chính
  "Chặng 18": "banking-compliance", // Ngân hàng, tín dụng và tuân thủ
  "Chặng 19": "risk-portfolio-derivatives", // Định giá phái sinh & rủi ro thị trường
  "Chặng 20": "valuation-corp-finance", // Buy-side: nghiên cứu & định giá
  "Chặng 21": "wealth-insurance", // Quản lý gia sản và bảo hiểm
  "Chặng 22": "quant-data", // Quantitative Methods
  "Chặng 23": "quant-data", // Excel và dữ liệu
  "Chặng 24": "accounting-reporting", // Chuẩn mực kế toán & thuế DN Việt Nam
  "Chặng 25": "vn-market", // Thị trường chứng khoán Việt Nam
  "Chặng 26": "economics-markets", // Tài chính quốc tế
  "Chặng 27": "private-markets", // Cấu trúc và hiệu suất quỹ PE/VC
  "Chặng 28": "career-application", // Kỹ năng nghề phân tích tài chính
  "Chặng 29": "quant-data", // Công cụ phân tích dữ liệu
  "Chặng 30": "quant-data", // Tư duy phân tích dữ liệu
  "Chặng 31": "valuation-corp-finance", // Lập kế hoạch tài chính vận hành
  "Chặng 32": "valuation-corp-finance", // Cơ chế thương vụ M&A
  "Chặng 33": "accounting-reporting", // Kiểm toán
  "Chặng 34": "risk-frm", // FRM: nền tảng, vận hành, thanh khoản
  "Chặng 35": "risk-frm", // FRM: rủi ro thị trường
  "Chặng 36": "risk-frm", // FRM: tín dụng nâng cao
  "Chặng 37": "risk-frm", // FRM: định lượng nâng cao
  "Chặng 38": "risk-frm", // FRM: định giá & mô hình rủi ro
  "Chặng 39": "fintech", // Tài chính sản phẩm FinTech
  "Chặng 40": "valuation-corp-finance", // Quan hệ cổ đông (IR)
  "Chặng 41": "accounting-reporting", // Bút toán và sổ sách
  "Chặng 42": "real-estate-project", // Tài chính dự án bất động sản
  "Chặng 43": "wealth-insurance", // Định phí bảo hiểm
};

export const STAGE_TOPIC_TABLES = {
  personal: PERSONAL_STAGE_TOPIC,
  professional: PROFESSIONAL_STAGE_TOPIC,
} as const;

/** Bài không rơi vào chặng nào. Không phải lỗi: bài bonus và bài mới thêm
 *  ngoài khoảng chặng đều tới đây. */
export const TOPIC_FALLBACK = {
  personal: "personal-finance",
  professional: "professional-finance",
} as const satisfies Record<string, StageTopicId>;

export function stageTopicFor(lessonId: number, track: "personal" | "professional"): StageTopicId {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const stage = stages.find((item) => isLessonInRange(lessonId, item));
  if (!stage) return TOPIC_FALLBACK[track];
  return STAGE_TOPIC_TABLES[track][stage.label] ?? TOPIC_FALLBACK[track];
}
