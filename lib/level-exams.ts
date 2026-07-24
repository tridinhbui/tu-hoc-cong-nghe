/* ─── Level Exams & Periodic Recertification Engine ──────────────── */

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LevelExamConfig {
  level: number;
  title: string;
  badgeEmoji: string;
  minPassPercentage: number; // 85% or 90%
  timeLimitSeconds: number;
  penaltyXpIfOverdue: number; // Penalty deducted if recertification test is overdue (>14 days)
  questions: ExamQuestion[];
}

export const RECERTIFICATION_DAYS = 14;

// Question Bank for Level Exams (Level 2 to Level 15)
export const LEVEL_EXAMS: Record<number, LevelExamConfig> = {
  2: {
    level: 2,
    title: "Bài Thi Thâm Nhập - Cấp 2: Học Viên Tài Chính",
    badgeEmoji: "🎒",
    minPassPercentage: 85,
    timeLimitSeconds: 180,
    penaltyXpIfOverdue: 30,
    questions: [
      {
        id: "l2_q1",
        question: "Tài sản nào sau đây có tính thanh khoản cao nhất trong Bảng cân đối kế toán?",
        options: ["Nhà xưởng máy móc", "Tiền mặt & Tiền gửi ngân hàng", "Hàng tồn kho", "Bất động sản đầu tư"],
        correctIndex: 1,
        explanation: "Tiền mặt có tính thanh khoản tức thì (Liquid), không cần tốn thời gian chuyển đổi.",
      },
      {
        id: "l2_q2",
        question: "Quy tắc 50/30/20 trong tài chính cá nhân khuyên bạn dành 20% thu nhập cho mục đích gì?",
        options: ["Chi tiêu giải trí xa xỉ", "Tiết kiệm & Đầu tư dài hạn", "Trả tiền thuê nhà cố định", "Mua sắm quần áo"],
        correctIndex: 1,
        explanation: "20% thu nhập nên được trích ngay lập tức cho Quỹ khẩn cấp, Tiết kiệm và Đầu tư.",
      },
      {
        id: "l2_q3",
        question: "Lợi nhuận gộp (Gross Profit) được tính bằng công thức nào?",
        options: ["Doanh thu thuần - Giá vốn hàng bán", "Doanh thu - Chi phí bán hàng", "Lợi nhuận ròng + Thuế", "Doanh thu - Chi phí quản lý"],
        correctIndex: 0,
        explanation: "Lợi nhuận gộp = Doanh thu thuần - COGS (Giá vốn hàng bán).",
      },
    ],
  },
  3: {
    level: 3,
    title: "Bài Thi Thấu Hiểu - Cấp 3: Nhà Đầu Tư Thực Chiến",
    badgeEmoji: "💼",
    minPassPercentage: 85,
    timeLimitSeconds: 240,
    penaltyXpIfOverdue: 60,
    questions: [
      {
        id: "l3_q1",
        question: "Chỉ số P/E = 15 có nghĩa là gì?",
        options: [
          "Doanh nghiệp lỗ 15%",
          "Nhà đầu tư chấp nhận trả 15 đồng cho 1 đồng lợi nhuận",
          "Giá cổ phiếu bằng 15% mệnh giá",
          "Cổ tức đạt 15% mỗi năm",
        ],
        correctIndex: 1,
        explanation: "P/E = Price / EPS, thể hiện số tiền nhà đầu tư bỏ ra cho 1 đồng lợi nhuận của công ty.",
      },
      {
        id: "l3_q2",
        question: "Lãi suất kép (Compound Interest) hoạt động dựa trên nguyên lý nào?",
        options: [
          "Lãi tính trên vốn gốc ban đầu duy nhất",
          "Lãi tính trên cả vốn gốc lẫn số tiền lãi tích lũy từ các kỳ trước",
          "Lãi suất giảm dần theo thời gian",
          "Lãi suất bằng 0 sau 5 năm",
        ],
        correctIndex: 1,
        explanation: "Lãi kép là tiền lãi của tiền lãi (Interest on interest), giúp tài sản tăng trưởng mũ.",
      },
      {
        id: "l3_q3",
        question: "Tỷ lệ Nợ/Vốn chủ sở hữu (D/E) quá cao cảnh báo rủi ro gì?",
        options: ["Rủi ro lạm phát", "Rủi ro thanh khoản & kiệt quệ tài chính", "Doanh nghiệp tăng trưởng quá nhanh", "Doanh nghiệp thừa tiền mặt"],
        correctIndex: 1,
        explanation: "D/E cao phản ánh gánh nặng nợ vay lớn, rủi ro vỡ nợ nếu dòng tiền suy giảm.",
      },
    ],
  },
  4: {
    level: 4,
    title: "Bài Thi Chuyên Sâu - Cấp 4: Nhà Phân Tích Tài Chính",
    badgeEmoji: "📊",
    minPassPercentage: 85,
    timeLimitSeconds: 300,
    penaltyXpIfOverdue: 100,
    questions: [
      {
        id: "l4_q1",
        question: "Trong phương pháp định giá DCF, WACC đóng vai trò gì?",
        options: [
          "Tỷ lệ tăng trưởng doanh thu",
          "Tỷ lệ chiết khấu dòng tiền về giá trị hiện tại",
          "Tỷ lệ chia cổ tức",
          "Giá vốn hàng bán",
        ],
        correctIndex: 1,
        explanation: "WACC (Chi phí vốn bình quân gia quyền) được dùng làm chiết khấu FCFE/FCFF về hiện tại.",
      },
      {
        id: "l4_q2",
        question: "Chỉ số ROE (Return on Equity) phản ánh điều gì?",
        options: [
          "Hiệu quả sử dụng vốn chủ sở hữu để sinh lời",
          "Tổng doanh thu trên tổng tài sản",
          "Khả năng thanh toán nợ ngắn hạn",
          "Tỷ lệ nợ trên tài sản",
        ],
        correctIndex: 0,
        explanation: "ROE = Lợi nhuận ròng / Vốn chủ sở hữu, thể hiện khả năng sinh lời trên 1 đồng vốn cổ đông.",
      },
      {
        id: "l4_q3",
        question: "Hệ số Beta của cổ phiếu = 1.5 phản ánh điều gì?",
        options: [
          "Cổ phiếu biến động ít hơn thị trường 50%",
          "Cổ phiếu biến động cùng chiều và mạnh hơn thị trường 50%",
          "Cổ phiếu luôn giảm giá 1.5%",
          "Cổ phiếu không có rủi ro",
        ],
        correctIndex: 1,
        explanation: "Beta > 1 chỉ ra cổ phiếu có mức độ biến động giá nhạy hơn thị trường chung.",
      },
    ],
  },
  5: {
    level: 5,
    title: "Bài Thi Khắt Khe - Cấp 5: Cố Vấn Tài Chính Sành Sỏi",
    badgeEmoji: "🛡️",
    minPassPercentage: 90,
    timeLimitSeconds: 300,
    penaltyXpIfOverdue: 150,
    questions: [
      {
        id: "l5_q1",
        question: "Báo cáo lưu chuyển tiền tệ (Cash Flow) gồm 3 dòng tiền chính nào?",
        options: [
          "Dòng tiền Kinh doanh, Đầu tư, Tài chính",
          "Dòng tiền Vay nợ, Mua bán, Thuế",
          "Dòng tiền Cổ tức, Trái phiếu, Tiền mặt",
          "Dòng tiền Ngắn hạn, Trung hạn, Dài hạn",
        ],
        correctIndex: 0,
        explanation: "Operating (CFO), Investing (CFI) và Financing (CFF) cấu thành báo cáo LCTT.",
      },
      {
        id: "l5_q2",
        question: "Chính sách thắt chặt tiền tệ của Fed (Tăng lãi suất) thường dẫn đến kết quả nào?",
        options: [
          "Lạm phát gia tăng dồn dập",
          "Chi phí borrowing tăng, hút tiền về, kiềm chế lạm phát",
          "Thị trường chứng khoán lập đỉnh liên tục",
          "Đồng USD mất giá mạnh",
        ],
        correctIndex: 1,
        explanation: "Tăng lãi suất làm tăng chi phí vay vốn, làm giảm tổng cầu để hạ nhiệt lạm phát.",
      },
      {
        id: "l5_q3",
        question: "Công thức Mô hình Dupont chia tách ROE thành 3 nhân tố nào?",
        options: [
          "Biên lợi nhuận ròng x Vòng quay tài sản x Bòn lót nợ",
          "Biên lợi nhuận ròng x Vòng quay tổng tài sản x Đòn đẩy tài chính (Asset Turnover x Net Margin x Equity Multiplier)",
          "Doanh thu x Chi phí x Thuế",
          "P/E x P/B x EPS",
        ],
        correctIndex: 1,
        explanation: "Dupont 3 yếu tố: Net Margin x Asset Turnover x Financial Leverage (Equity Multiplier).",
      },
    ],
  },
  6: {
    level: 6,
    title: "Bài Thi Đỉnh Cao - Cấp 6: Thạo Thủ Tài Chính",
    badgeEmoji: "👑",
    minPassPercentage: 90,
    timeLimitSeconds: 360,
    penaltyXpIfOverdue: 220,
    questions: [
      {
        id: "l6_q1",
        question: "Nợ ngắn hạn vượt quá Tài sản ngắn hạn (Hệ số thanh toán hiện hành < 1) cảnh báo rủi ro gì?",
        options: ["Rủi ro lạm phát", "Rủi ro mất khả năng thanh khoản ngắn hạn (Liquidity crunch)", "Rủi ro thuế", "Doanh nghiệp kinh doanh quá tốt"],
        correctIndex: 1,
        explanation: "Current Ratio < 1 đồng nghĩa tài sản ngắn hạn không đủ bù đắp nợ phải trả trong vòng 12 tháng.",
      },
      {
        id: "l6_q2",
        question: "Trong hợp đồng Quyền chọn (Options), Call Option mang lại quyền gì cho người sở hữu?",
        options: ["Quyền MUA tài sản cơ sở ở mức giá Strike Price", "Bắt buộc BÁN tài sản", "Quyền BÁN tài sản ở giá Strike", "Bắt buộc giao dịch ngay"],
        correctIndex: 0,
        explanation: "Call option trao quyền MUA (nhưng không bắt buộc) ở mức giá thực hiện strike price.",
      },
    ],
  },
};

// Fill default fallback exams for Levels 7 to 15
for (let lvl = 7; lvl <= 15; lvl++) {
  if (!LEVEL_EXAMS[lvl]) {
    LEVEL_EXAMS[lvl] = {
      level: lvl,
      title: `Bài Thi Tối Cao - Cấp ${lvl}: Thách Thấu Định Cấp Tài Chính`,
      badgeEmoji: lvl >= 13 ? "🪐" : lvl >= 10 ? "💎" : "🔥",
      minPassPercentage: 90,
      timeLimitSeconds: 360,
      penaltyXpIfOverdue: 100 + lvl * 40,
      questions: [
        {
          id: `l${lvl}_q1`,
          question: `Chỉ số Sharpe Ratio đo lường điều gì trong quản lý danh mục đầu tư Cấp ${lvl}?`,
          options: [
            "Lợi nhuận thặng dư trên mỗi đơn vị rủi ro tổng thể (Volatility)",
            "Tổng nợ trên tổng nguồn vốn",
            "Tỷ lệ cổ tức trả bằng cổ phiếu",
            "Mức độ trượt giá giao dịch",
          ],
          correctIndex: 0,
          explanation: "Sharpe Ratio = (R_p - R_f) / StdDev_p, đánh giá hiệu quả đầu tư so với rủi ro gánh chịu.",
        },
        {
          id: `l${lvl}_q2`,
          question: "Đường cong lãi suất bị đảo ngược (Inverted Yield Curve) là tín hiệu dự báo điều gì?",
          options: ["Thị trường sắp bùng nổ bull run", "Nguy cơ suy thoái kinh tế (Recession) trong 12-18 tháng tới", "Lạm phát trở về 0%", "Đồng nội tệ tăng giá"],
          correctIndex: 1,
          explanation: "Lãi suất ngắn hạn cao hơn dài hạn thường là tín hiệu kinh điển của nguy cơ suy thoái kinh tế.",
        },
      ],
    };
  }
}

// Storage helpers
export interface UserExamRecord {
  passedLevel: number;
  passedAt: number; // Timestamp
  score: number;
}

export function getUserPassedExams(userId?: string): Record<number, UserExamRecord> {
  if (typeof window === "undefined" || !userId) return {};
  try {
    const raw = localStorage.getItem(`thtcdn_user_level_exams_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUserPassedExam(userId: string, record: UserExamRecord) {
  if (typeof window === "undefined" || !userId) return;
  try {
    const existing = getUserPassedExams(userId);
    existing[record.passedLevel] = record;
    localStorage.setItem(`thtcdn_user_level_exams_${userId}`, JSON.stringify(existing));
  } catch (err) {
    console.error("Error saving level exam record:", err);
  }
}

export function checkExamOverdue(record?: UserExamRecord): boolean {
  if (!record) return false;
  const daysDiff = (Date.now() - record.passedAt) / (1000 * 60 * 60 * 24);
  return daysDiff > RECERTIFICATION_DAYS;
}
