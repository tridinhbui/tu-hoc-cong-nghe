/** Cấu trúc và trọng số chính thức của CFA Level II và Level III.
 *
 *  Vì sao có file này: trang CFA của chúng ta chỉ nói về Level I, nên một người
 *  đang cân nhắc theo đuổi chứng chỉ không có chỗ nào biết Level II và III thi
 *  cái gì, dài bao lâu, hỏi theo kiểu nào. Đó là khoảng trống về THÔNG TIN, và
 *  lấp nó không cần viết một bài học nào.
 *
 *  Mọi con số dưới đây lấy từ trang candidate resources của CFA Institute,
 *  không phải từ trí nhớ:
 *    https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam
 *    https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-iii-exam
 *  Đây là chỗ dễ sai nhất và sai thì không ai phát hiện: một bảng trọng số bịa
 *  trông y hệt một bảng trọng số đúng. Có test kiểm trung điểm cộng lại đúng
 *  100% - phép kiểm đó bắt được phần lớn kiểu gõ nhầm.
 *
 *  KHÔNG có đề thi thử cho hai cấp này, và đó là chủ ý. Level II hỏi theo
 *  item set: một tình huống dài kèm nhiều câu hỏi phụ thuộc vào nó, và cái khó
 *  nằm chính ở chỗ phải đọc tình huống. Level III còn có phần tự luận chấm
 *  bằng lập luận. Kho câu hỏi của ta là câu đơn lẻ; ghép chúng lại rồi gọi là
 *  "thi thử Level II" sẽ luyện sai đúng kỹ năng mà kỳ thi đó kiểm tra. */

export interface CfaLevelTopic {
  name: string;
  /** Dải trọng số chính thức, phần trăm. */
  lo: number;
  hi: number;
}

export interface CfaLevelSpec {
  level: "II" | "III";
  label: string;
  /** Mô tả dạng đề bằng một câu, vì đây mới là khác biệt lớn nhất giữa các cấp. */
  format: string;
  /** Các dòng thông số hiện thành bảng. */
  facts: Array<[string, string]>;
  topics: CfaLevelTopic[];
  /** Vì sao chưa có đề thi thử cho cấp này. */
  noMockReason: string;
  /** Ba hướng chuyên sâu của Level III; Level II không có. */
  pathways?: string[];
}

export const CFA_LEVEL_2: CfaLevelSpec = {
  level: "II",
  label: "CFA Level II",
  format:
    "Hỏi theo item set: mỗi tình huống (vignette) là một đoạn dữ liệu dài, kèm nhiều câu hỏi cùng dựa vào nó.",
  facts: [
    ["Số item set", "22 bộ (20 bộ tính điểm, 2 bộ thử nghiệm)"],
    ["Số câu", "88 câu trắc nghiệm"],
    ["Số ca", "2 ca"],
    ["Thời gian mỗi ca", "2 giờ 12 phút"],
  ],
  topics: [
    { name: "Ethical and Professional Standards", lo: 10, hi: 15 },
    { name: "Quantitative Methods", lo: 5, hi: 10 },
    { name: "Economics", lo: 5, hi: 10 },
    { name: "Financial Statement Analysis", lo: 10, hi: 15 },
    { name: "Corporate Issuers", lo: 5, hi: 10 },
    { name: "Equity Investments", lo: 10, hi: 15 },
    { name: "Fixed Income", lo: 10, hi: 15 },
    { name: "Derivatives", lo: 5, hi: 10 },
    { name: "Alternative Investments", lo: 5, hi: 10 },
    { name: "Portfolio Management", lo: 10, hi: 15 },
  ],
  noMockReason:
    "Chưa có đề thi thử Level II. Cái khó của cấp này nằm ở việc đọc một tình huống dài rồi trả lời nhiều câu cùng dựa vào nó - ghép các câu đơn lẻ của chúng ta lại và gọi là đề Level II sẽ luyện sai đúng kỹ năng kỳ thi kiểm tra.",
};

export const CFA_LEVEL_3: CfaLevelSpec = {
  level: "III",
  label: "CFA Level III",
  format:
    "Nửa item set, nửa tự luận. Phần tự luận chấm cả cách lập luận, không chỉ đáp số.",
  facts: [
    ["Cấu trúc", "11 bộ item set + 11 bộ tự luận"],
    ["Tính điểm", "20 bộ tính điểm, 2 bộ thử nghiệm"],
    ["Số ca", "2 ca"],
    ["Thời gian mỗi ca", "2 giờ 12 phút"],
  ],
  topics: [
    { name: "Asset Allocation", lo: 15, hi: 20 },
    { name: "Portfolio Construction", lo: 15, hi: 20 },
    { name: "Performance Measurement", lo: 5, hi: 10 },
    { name: "Derivatives and Risk Management", lo: 10, hi: 15 },
    { name: "Ethical and Professional Standards", lo: 10, hi: 15 },
    { name: "Hướng chuyên sâu đã chọn", lo: 30, hi: 35 },
  ],
  pathways: ["Portfolio Management", "Private Markets", "Private Wealth"],
  noMockReason:
    "Chưa có đề thi thử Level III, và sẽ không có bằng cùng một cơ chế: một nửa bài thi là tự luận, chấm bằng lập luận chứ không bằng đáp án đúng - trắc nghiệm không mô phỏng được phần đó.",
};

export const CFA_LEVELS: CfaLevelSpec[] = [CFA_LEVEL_2, CFA_LEVEL_3];

/** Tổng trung điểm các dải trọng số, để kiểm nhanh một bảng có hợp lệ không. */
export function weightMidpointTotal(spec: CfaLevelSpec): number {
  return spec.topics.reduce((n, t) => n + (t.lo + t.hi) / 2, 0);
}
