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
  | "networking-protocols"
  | "portfolio-retirement"
  | "housing-protection"
  // Chặng 12: ngân hàng và tiền gửi. Tách khỏi "money-foundations" vì gộp vào
  // đó sẽ khiến một chủ đề gánh 4 trong 12 chặng của track - stage-topics.test
  // chặn ở mức 1/4.
  | "banking-deposits"
  | "gold-fx"
  | "vn-tech-market"
  | "digital-assets-risk"
  | "fraud-safety"
  | "mobile-apps-vn"
  | "career-projects"
  | "health-risk"
  | "career-stage"
  | "personal-ops"
  // Dùng ở cả hai track: track cá nhân Chặng 10, chuyên ngành Chặng 12
  | "investing-psychology"
  // Track chuyên ngành
  | "accounting-reporting"
  | "system-design-backend"
  | "queues-messaging"
  | "risk-portfolio-derivatives"
  | "banking-compliance"
  | "quant-data"
  | "career-application"
  | "vn-product"
  | "private-markets"
  | "wealth-insurance"
  | "infra-project"
  | "ai-products"
  // Bài không rơi vào chặng nào
  | "tech-foundations"
  | "advanced-tech"
  // Track cá nhân, Chặng 30-66 (giáo trình AI thực tế cho công việc)
  | "ai-work-people"
  | "ai-work-service"
  | "ai-work-ops"
  | "ai-tools"
  | "ai-automation"
  | "ai-building"
  | "ai-data"
  | "ai-safe-foundations"
  | "bonus-cases";

/** Câu khuyên đi kèm chủ đề. Sáu nhánh, đúng sáu nhánh của
 *  recommendedActionForTopic() cũ, nhưng tra bằng id thay vì bằng substring của
 *  câu chữ. Bảng này để lộ ra điều substring che được: 12 trong 23 chủ đề nhận
 *  câu chung, tức bảng lời khuyên giờ là mắt yếu hơn bảng chủ đề. */
export type TopicAdviceId =
  | "accounting"
  | "valuation"
  | "risk"
  | "networking"
  | "investing"
  | "generic";

export const TOPIC_ADVICE: Record<StageTopicId, TopicAdviceId> = {
  "money-foundations": "generic",
  "tax-payroll": "generic",
  "personal-investing": "investing",
  "networking-protocols": "networking",
  "portfolio-retirement": "investing",
  "housing-protection": "generic",
  "banking-deposits": "generic",
  "gold-fx": "generic",
  "vn-tech-market": "generic",
  "digital-assets-risk": "generic",
  "fraud-safety": "generic",
  "mobile-apps-vn": "generic",
  "career-projects": "generic",
  "health-risk": "generic",
  "career-stage": "generic",
  "personal-ops": "generic",
  "investing-psychology": "generic",
  "accounting-reporting": "accounting",
  "system-design-backend": "valuation",
  "queues-messaging": "networking",
  "risk-portfolio-derivatives": "risk",
  "banking-compliance": "generic",
  "quant-data": "generic",
  "career-application": "generic",
  "vn-product": "generic",
  "private-markets": "investing",
  "wealth-insurance": "generic",
  "infra-project": "generic",
  "ai-products": "generic",
  "tech-foundations": "generic",
  "advanced-tech": "generic",
  "bonus-cases": "generic",
  "ai-work-people": "generic",
  "ai-work-service": "generic",
  "ai-work-ops": "generic",
  "ai-tools": "generic",
  "ai-automation": "generic",
  "ai-building": "generic",
  "ai-data": "generic",
  "ai-safe-foundations": "generic",
};

/** Chủ đề học của một bài, suy ra từ chặng nó nằm trong.
 *
 *  Đây là bản DUY NHẤT. Trước đó logic này tồn tại hai bản riêng - một trong
 *  lib/cloudflare-analytics.ts, một trong app/(app)/dashboard/actions.ts - và
 *  chuyện đúng như đã lo: khi track cá nhân dời số ("Chặng 0 - Biết mình"
 *  thành Chặng 1, rồi chèn chặng Thuế vào giữa), CHỈ MỘT bản được sửa.
 *
 *  Bản trong analytics được sửa, kèm nguyên chẩn đoán viết trong comment. Bản
 *  trong dashboard thì không, và nó còn giữ nguyên phép so `stage.label ===
 *  "Chặng 0"` - một nhãn đã không còn tồn tại, nên nhánh đó chết hẳn. Hậu quả
 *  không lộ ra ở đâu: mọi bài vẫn có một chủ đề, chỉ là sai chủ đề, và cái sai
 *  đi thẳng vào topicGapSummary ("bạn đang yếu chủ đề gì") cùng
 *  recommendedActionForTopic ("nên làm gì tiếp") trên dashboard. Người học vấp
 *  quiz một chặng được bảo là yếu một chủ đề khác hẳn.
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
  "Chặng 5": "networking-protocols",
  "Chặng 6": "portfolio-retirement",
  "Chặng 7": "personal-investing",
  "Chặng 8": "portfolio-retirement",
  "Chặng 9": "housing-protection",
  "Chặng 10": "investing-psychology",
  "Chặng 11": "money-foundations",
  "Chặng 12": "banking-deposits",
  "Chặng 13": "gold-fx",
  "Chặng 14": "vn-tech-market",
  "Chặng 15": "digital-assets-risk",
  "Chặng 16": "fraud-safety",
  "Chặng 17": "mobile-apps-vn",
  "Chặng 18": "career-projects",
  "Chặng 19": "health-risk",
  "Chặng 20": "career-stage",
  "Chặng 21": "personal-ops",
  // Marketing với AI - cùng chủ đề với chặng AI trong sản phẩm: cả hai dạy
  // cách giao việc cho AI và kiểm lại kết quả của nó.
  "Chặng 22": "ai-products",
  "Chặng 23": "ai-products",
  "Chặng 24": "ai-products",
  "Chặng 25": "ai-products",
  "Chặng 26": "quant-data",
  "Chặng 27": "personal-ops",
  "Chặng 28": "ai-products",
  "Chặng 29": "fraud-safety",
  // Chặng 30-66: 12 chặng nghề chia ba chủ đề, còn lại theo cụm (công cụ, tự động hoá,
  // làm sản phẩm, dữ liệu, an toàn) để không chủ đề nào vượt trần 1/4 của track.
  "Chặng 30": "ai-work-people",
  "Chặng 31": "ai-work-people",
  "Chặng 32": "ai-work-people",
  "Chặng 33": "ai-work-people",
  "Chặng 34": "ai-work-service",
  "Chặng 35": "ai-work-service",
  "Chặng 36": "ai-work-service",
  "Chặng 37": "ai-work-service",
  "Chặng 38": "ai-work-ops",
  "Chặng 39": "ai-work-ops",
  "Chặng 40": "ai-work-ops",
  "Chặng 41": "ai-work-ops",
  "Chặng 42": "ai-tools",
  "Chặng 43": "ai-tools",
  "Chặng 44": "ai-tools",
  "Chặng 45": "ai-tools",
  "Chặng 46": "ai-tools",
  "Chặng 47": "ai-tools",
  "Chặng 48": "ai-tools",
  "Chặng 49": "ai-tools",
  "Chặng 50": "ai-tools",
  "Chặng 51": "ai-automation",
  "Chặng 52": "ai-automation",
  "Chặng 53": "ai-automation",
  "Chặng 54": "ai-automation",
  "Chặng 55": "ai-automation",
  "Chặng 56": "ai-building",
  "Chặng 57": "ai-building",
  "Chặng 58": "ai-building",
  "Chặng 59": "ai-building",
  "Chặng 60": "ai-building",
  "Chặng 61": "ai-data",
  "Chặng 62": "ai-data",
  "Chặng 63": "ai-data",
  "Chặng 64": "ai-safe-foundations",
  "Chặng 65": "ai-safe-foundations",
  "Chặng 66": "ai-safe-foundations",
};

/** Track chuyên ngành, 43 chặng, 16 chủ đề.
 *
 *  Chuỗi if cũ được viết khi track mới có 9 chặng, nên nhánh mặc định gánh
 *  toàn bộ Chặng 10-43: 34 chặng đổ
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
 *  trên chính câu chữ hiển thị, và includes phân biệt hoa thường - nên một
 *  nhãn viết thường là trượt câu khuyên. Giờ tra bằng id nên chuyện đó không xảy ra được nữa. */
const PROFESSIONAL_STAGE_TOPIC: Record<string, StageTopicId> = {
  "Chặng 1": "accounting-reporting",
  "Chặng 2": "accounting-reporting",
  "Chặng 3": "accounting-reporting",
  "Chặng 4": "system-design-backend",
  "Chặng 5": "system-design-backend",
  "Chặng 6": "system-design-backend",
  "Chặng 7": "queues-messaging",
  "Chặng 8": "risk-portfolio-derivatives",
  "Chặng 9": "risk-portfolio-derivatives",
  // Chặng 10-43. Nhóm theo tên chặng; tên chặng ghi ngay bên cạnh để lần dời
  // số sau đọc một dòng là biết nó có còn đúng hay không.
  "Chặng 10": "career-application", // Ứng dụng nghề Kỹ sư nền tảng & hệ thống lớn
  "Chặng 11": "system-design-backend", // Vận hành sản phẩm công nghệ hiện đại
  "Chặng 12": "investing-psychology", // Tâm lý người dùng nâng cao
  "Chặng 13": "career-application", // AI trong sản phẩm: đọc mã, rà lỗi, viết tài liệu
  "Chặng 14": "banking-compliance", // Ngân hàng, tín dụng và tuân thủ
  "Chặng 15": "risk-portfolio-derivatives", // Định giá phái sinh & rủi ro thị trường
  "Chặng 16": "system-design-backend", // Buy-side: nghiên cứu & định giá
  "Chặng 17": "wealth-insurance", // Quản lý gia sản và bảo hiểm
  "Chặng 18": "quant-data", // Quantitative Methods
  "Chặng 19": "quant-data", // Excel và dữ liệu
  "Chặng 20": "accounting-reporting", // Chuẩn mực kế toán & thuế DN Việt Nam
  "Chặng 21": "vn-product", // Thị trường chứng khoán Việt Nam
  "Chặng 22": "private-markets", // Cấu trúc và hiệu suất quỹ PE/VC
  "Chặng 23": "career-application", // Kỹ năng nghề kỹ sư phần mềm
  "Chặng 24": "quant-data", // Công cụ phân tích dữ liệu
  "Chặng 25": "quant-data", // Tư duy phân tích dữ liệu
  "Chặng 26": "system-design-backend", // Lập kế hoạch dung lượng và vận hành
  "Chặng 27": "system-design-backend", // Cơ chế thương vụ M&A
  "Chặng 28": "accounting-reporting", // Kiểm toán
  "Chặng 29": "system-design-backend", // Quan hệ cổ đông (IR)
  "Chặng 30": "accounting-reporting", // Bút toán và sổ sách
  "Chặng 31": "infra-project", // Dự án hạ tầng và trung tâm dữ liệu
  "Chặng 32": "wealth-insurance", // Định phí bảo hiểm
  "Chặng 33": "ai-products",
  "Chặng 34": "ai-products",
  "Chặng 35": "ai-products",
  "Chặng 36": "ai-products",
  "Chặng 37": "ai-products",
  "Chặng 38": "ai-products",
  "Chặng 39": "system-design-backend", // Docker và container
  "Chặng 40": "system-design-backend", // CI/CD
  "Chặng 41": "system-design-backend", // Gỡ lỗi có phương pháp
};

export const STAGE_TOPIC_TABLES = {
  personal: PERSONAL_STAGE_TOPIC,
  professional: PROFESSIONAL_STAGE_TOPIC,
} as const;

/** Bài không rơi vào chặng nào. Không phải lỗi: bài bonus và bài mới thêm
 *  ngoài khoảng chặng đều tới đây. */
export const TOPIC_FALLBACK = {
  personal: "tech-foundations",
  professional: "advanced-tech",
} as const satisfies Record<string, StageTopicId>;

export function stageTopicFor(lessonId: number, track: "personal" | "professional"): StageTopicId {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const stage = stages.find((item) => isLessonInRange(lessonId, item));
  if (!stage) return TOPIC_FALLBACK[track];
  return STAGE_TOPIC_TABLES[track][stage.label] ?? TOPIC_FALLBACK[track];
}
