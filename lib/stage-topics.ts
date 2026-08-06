import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange } from "@/lib/track-stages";

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

const PERSONAL_STAGE_TOPIC: Record<string, string> = {
  "Chặng 1": "Nền tảng tiền bạc & rủi ro",
  "Chặng 2": "Thuế & lương thực nhận",
  "Chặng 3": "Nền tảng tiền bạc & rủi ro",
  "Chặng 4": "Đầu tư cá nhân",
  "Chặng 5": "Trái phiếu & lãi suất",
  "Chặng 6": "Danh mục & hưu trí",
  "Chặng 7": "Đầu tư cá nhân",
  "Chặng 8": "Danh mục & hưu trí",
  "Chặng 9": "Nhà ở & bảo vệ tài sản",
  "Chặng 10": "Tâm lý đầu tư",
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
 *  MỘT RÀNG BUỘC DỄ VẤP: recommendedActionForTopic() trong dashboard chọn câu
 *  khuyên bằng topic.includes("Kế toán" | "Định giá" | "Rủi ro" | "Trái phiếu"
 *  | "Đầu tư"), và includes PHÂN BIỆT HOA THƯỜNG. Nên "Rủi ro & FRM" nhận đúng
 *  câu khuyên về rủi ro, còn nếu viết "Quản trị rủi ro (FRM)" thì chữ "rủi ro"
 *  thường không khớp và cả năm chặng FRM rơi về câu khuyên chung. Đặt tên chủ
 *  đề ở đây là đang định tuyến cả lời khuyên. */
const PROFESSIONAL_STAGE_TOPIC: Record<string, string> = {
  "Chặng 1": "Kế toán & báo cáo tài chính",
  "Chặng 2": "Kế toán & báo cáo tài chính",
  "Chặng 3": "Kế toán & báo cáo tài chính",
  "Chặng 4": "Định giá & tài chính doanh nghiệp",
  "Chặng 5": "Định giá & tài chính doanh nghiệp",
  "Chặng 6": "Định giá & tài chính doanh nghiệp",
  "Chặng 7": "Trái phiếu & tín dụng",
  "Chặng 8": "Rủi ro, danh mục & phái sinh",
  "Chặng 9": "Rủi ro, danh mục & phái sinh",
  // Chặng 10-43. Nhóm theo tên chặng; tên chặng ghi ngay bên cạnh để lần dời
  // số sau đọc một dòng là biết nó có còn đúng hay không.
  "Chặng 10": "Ứng dụng nghề nghiệp", // Ứng dụng nghề Phân tích & IB
  "Chặng 11": "Định giá & tài chính doanh nghiệp", // Vận hành tài chính DN hiện đại
  "Chặng 12": "Tâm lý đầu tư", // Behavioral Finance nâng cao
  "Chặng 13": "Ứng dụng nghề nghiệp", // AI trong tài chính: đọc báo cáo, viết memo
  "Chặng 14": "Ứng dụng nghề nghiệp", // Masterclass gộp: BĐS, trái phiếu, VC, VaR, ESG
  "Chặng 15": "Định giá & tài chính doanh nghiệp", // Financial Modeling
  "Chặng 16": "ESG & tài chính bền vững", // ESG & Climate Finance
  "Chặng 17": "Kinh tế học & thị trường", // Kinh tế học cho người làm tài chính
  "Chặng 18": "Ngân hàng, tín dụng & tuân thủ", // Ngân hàng, tín dụng và tuân thủ
  "Chặng 19": "Rủi ro, danh mục & phái sinh", // Định giá phái sinh & rủi ro thị trường
  "Chặng 20": "Định giá & tài chính doanh nghiệp", // Buy-side: nghiên cứu & định giá
  "Chặng 21": "Gia sản & bảo hiểm", // Quản lý gia sản và bảo hiểm
  "Chặng 22": "Định lượng & phân tích dữ liệu", // Quantitative Methods
  "Chặng 23": "Định lượng & phân tích dữ liệu", // Excel và dữ liệu
  "Chặng 24": "Kế toán & báo cáo tài chính", // Chuẩn mực kế toán & thuế DN Việt Nam
  "Chặng 25": "Thị trường Việt Nam", // Thị trường chứng khoán Việt Nam
  "Chặng 26": "Kinh tế học & thị trường", // Tài chính quốc tế
  "Chặng 27": "Private markets & đầu tư thay thế", // Cấu trúc và hiệu suất quỹ PE/VC
  "Chặng 28": "Ứng dụng nghề nghiệp", // Kỹ năng nghề phân tích tài chính
  "Chặng 29": "Định lượng & phân tích dữ liệu", // Công cụ phân tích dữ liệu
  "Chặng 30": "Định lượng & phân tích dữ liệu", // Tư duy phân tích dữ liệu
  "Chặng 31": "Định giá & tài chính doanh nghiệp", // Lập kế hoạch tài chính vận hành
  "Chặng 32": "Định giá & tài chính doanh nghiệp", // Cơ chế thương vụ M&A
  "Chặng 33": "Kế toán & báo cáo tài chính", // Kiểm toán
  "Chặng 34": "Rủi ro & FRM", // FRM: nền tảng, vận hành, thanh khoản
  "Chặng 35": "Rủi ro & FRM", // FRM: rủi ro thị trường
  "Chặng 36": "Rủi ro & FRM", // FRM: tín dụng nâng cao
  "Chặng 37": "Rủi ro & FRM", // FRM: định lượng nâng cao
  "Chặng 38": "Rủi ro & FRM", // FRM: định giá & mô hình rủi ro
  "Chặng 39": "FinTech & sản phẩm tài chính", // Tài chính sản phẩm FinTech
  "Chặng 40": "Định giá & tài chính doanh nghiệp", // Quan hệ cổ đông (IR)
  "Chặng 41": "Kế toán & báo cáo tài chính", // Bút toán và sổ sách
  "Chặng 42": "Bất động sản & tài chính dự án", // Tài chính dự án bất động sản
  "Chặng 43": "Gia sản & bảo hiểm", // Định phí bảo hiểm
};

export const STAGE_TOPIC_TABLES = {
  personal: PERSONAL_STAGE_TOPIC,
  professional: PROFESSIONAL_STAGE_TOPIC,
} as const;

/** Bài không rơi vào chặng nào. Không phải lỗi: bài bonus và bài mới thêm
 *  ngoài khoảng chặng đều tới đây. */
export const TOPIC_FALLBACK = {
  personal: "Tài chính cá nhân",
  professional: "Tài chính chuyên ngành",
} as const;

export function stageTopicFor(lessonId: number, track: "personal" | "professional"): string {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const stage = stages.find((item) => isLessonInRange(lessonId, item));
  if (!stage) return TOPIC_FALLBACK[track];
  return STAGE_TOPIC_TABLES[track][stage.label] ?? TOPIC_FALLBACK[track];
}
