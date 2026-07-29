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
  minPassPercentage: number; // 75% to 90%
  timeLimitSeconds: number;
  penaltyXpIfOverdue: number;
  questions: ExamQuestion[];
}

export const RECERTIFICATION_DAYS = 14;

/** Hàm hỗ trợ trộn ngẫu nhiên mảng (Fisher-Yates Shuffle) */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Lấy ngẫu nhiên N câu hỏi từ ngân hàng câu hỏi của Level, đồng thời xáo trộn thứ tự các lựa chọn A, B, C, D */
export function getRandomizedExamQuestions(level: number, sampleCount: number = 5): ExamQuestion[] {
  const config = LEVEL_EXAMS[level];
  if (!config || !config.questions || config.questions.length === 0) return [];

  const sampled = shuffleArray(config.questions).slice(0, sampleCount);

  return sampled.map((q) => {
    const originalOptions = q.options;
    const correctText = originalOptions[q.correctIndex];

    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIndex = shuffledOptions.indexOf(correctText);

    return {
      ...q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}

// Ngân hàng câu hỏi bài thi thăng cấp khắt khe đầy đủ từ Level 2 đến Level 15
export const LEVEL_EXAMS: Record<number, LevelExamConfig> = {
  2: {
    level: 2,
    title: "Bài Thi Thâm Nhập - Cấp 2: Học Viên Tài Chính",
    badgeEmoji: "🎒",
    minPassPercentage: 80,
    timeLimitSeconds: 300,
    penaltyXpIfOverdue: 30,
    questions: [
      {
        id: "l2_q1",
        question: "Tài sản nào sau đây có tính thanh khoản cao nhất trong Bảng cân đối kế toán?",
        options: ["Nhà xưởng máy móc", "Tiền mặt & Tiền gửi ngân hàng không kỳ hạn", "Hàng tồn kho", "Bất động sản đầu tư"],
        correctIndex: 1,
        explanation: "Tiền mặt có tính thanh khoản tuyệt đối (Instant liquidity), có thể sử dụng giao dịch ngay lập tức.",
      },
      {
        id: "l2_q2",
        question: "Quy tắc 50/30/20 trong tài chính cá nhân khuyên bạn dành 20% thu nhập cho mục đích gì?",
        options: ["Chi tiêu giải trí & du lịch xa xỉ", "Tiết kiệm, Tích sản & Đầu tư dài hạn", "Trả tiền thuê nhà cố định", "Mua sắm thiết bị công nghệ"],
        correctIndex: 1,
        explanation: "20% thu nhập nên trích lập tự động cho Quỹ dự phòng khẩn cấp và các khoản đầu tư sinh lời.",
      },
      {
        id: "l2_q3",
        question: "Lợi nhuận gộp (Gross Profit) được tính bằng công thức nào?",
        options: ["Doanh thu thuần - Giá vốn hàng bán (COGS)", "Doanh thu - Chi phí bán hàng", "Lợi nhuận ròng + Thuế TNDN", "Doanh thu - Chi phí quản lý doanh nghiệp"],
        correctIndex: 0,
        explanation: "Lợi nhuận gộp = Doanh thu thuần - COGS.",
      },
      {
        id: "l2_q4",
        question: "Quỹ dự phòng khẩn cấp (Emergency Fund) chuẩn nên duy trì ở mức tối thiểu bao nhiêu tháng chi tiêu?",
        options: ["1 - 2 tuần", "3 - 6 tháng", "3 - 5 năm", "Không cần trích lập"],
        correctIndex: 1,
        explanation: "Quỹ khẩn cấp từ 3 - 6 tháng chi tiêu giúp bạn bảo vệ tài chính trước biến cố thất nghiệp hoặc bệnh tật.",
      },
      {
        id: "l2_q5",
        question: "Lạm phát (Inflation) làm ảnh hưởng thế nào đến sức mua của tiền mặt?",
        options: ["Tăng sức mua", "Giảm sức mua theo thời gian", "Không ảnh hưởng", "Biến tiền mặt thành tài sản cố định"],
        correctIndex: 1,
        explanation: "Lạm phát làm giảm giá trị thực của đồng tiền, làm giảm số lượng hàng hóa/dịch vụ mua được.",
      },
    ],
  },

  3: {
    level: 3,
    title: "Bài Thi Thấu Hiểu - Cấp 3: Nhà Đầu Tư Thực Chiến",
    badgeEmoji: "💼",
    minPassPercentage: 80,
    timeLimitSeconds: 360,
    penaltyXpIfOverdue: 60,
    questions: [
      {
        id: "l3_q1",
        question: "Chỉ số P/E (Price to Earnings) = 15x có ý nghĩa gì?",
        options: [
          "Doanh nghiệp đang bị lỗ 15%",
          "Nhà đầu tư chấp nhận trả 15 đồng cho 1 đồng lợi nhuận ròng của công ty",
          "Giá cổ phiếu bằng 15% so với giá trị sổ sách",
          "Tỷ lệ cổ tức nhận được là 15%/năm",
        ],
        correctIndex: 1,
        explanation: "P/E = Price / EPS, phản ánh số năm nhà đầu tư hòa vốn nếu lợi nhuận giữ nguyên.",
      },
      {
        id: "l3_q2",
        question: "Sức mạnh của Lãi suất kép (Compound Interest) phát huy tối đa dựa trên yếu tố nào?",
        options: ["Số vốn ban đầu thật lớn", "Thời gian duy trì và lãi tái đầu tư liên tục", "Lựa chọn cổ phiếu lướt sóng T+2", "Vay nợ margin tối đa"],
        correctIndex: 1,
        explanation: "Công thức $A = P(1+r)^t$ thể hiện hàm số mũ phụ thuộc mạnh mẽ vào số kỳ gian $t$.",
      },
      {
        id: "l3_q3",
        question: "Tỷ lệ Nợ/Vốn chủ sở hữu (D/E Ratio) quá cao phản ánh điều gì?",
        options: ["Rủi ro lạm phát gia tăng", "Rủi ro đòn bẩy cao & nguy cơ kiệt quệ tài chính khi lãi suất tăng", "Doanh nghiệp không có nợ vay", "Doanh nghiệp có dòng tiền tự do dồi dào"],
        correctIndex: 1,
        explanation: "D/E cao cho thấy công ty phụ thuộc lớn vào vốn vay, chịu áp lực trả lãi vay nợ.",
      },
      {
        id: "l3_q4",
        question: "Hành vi 'FOMO' (Fear of Missing Out) trong đầu tư thường dẫn tới hậu quả nào?",
        options: ["Mua cổ phiếu ở vùng đỉnh do tâm lý đám đông", "Bán tháo cổ phiếu ở vùng đáy", "Quản trị rủi ro quá nghiêm ngặt", "Tăng hiệu quả định giá cổ phiếu"],
        correctIndex: 0,
        explanation: "FOMO khiến nhà đầu tư đua lệnh mua đuổi cổ phiếu nóng đã tăng nóng.",
      },
      {
        id: "l3_q5",
        question: "Chỉ số P/B (Price to Book Value) phù hợp nhất để định giá nhóm ngành nào?",
        options: ["Công ty Công nghệ SaaS", "Ngân hàng & Bất động sản / Tài chính", "Công ty truyền thông mạng xã hội", "Startup sinh học"],
        correctIndex: 1,
        explanation: "P/B phù hợp với các doanh nghiệp có tài sản cố định/tài sản tài chính chiếm đa số như Ngân hàng.",
      },
    ],
  },

  4: {
    level: 4,
    title: "Bài Thi Chuyên Sâu - Cấp 4: Nhà Phân Tích Tài Chính",
    badgeEmoji: "📊",
    minPassPercentage: 80,
    timeLimitSeconds: 420,
    penaltyXpIfOverdue: 100,
    questions: [
      {
        id: "l4_q1",
        question: "Trong chiết khấu dòng tiền DCF, WACC (Weighted Average Cost of Capital) đóng vai trò gì?",
        options: [
          "Tỷ lệ tăng trưởng doanh thu dự phóng",
          "Tỷ lệ chiết khấu dòng tiền về giá trị hiện tại (Discount Rate)",
          "Tỷ lệ chia cổ tức cho cổ đông phổ thông",
          "Chi phí quản lý doanh nghiệp",
        ],
        correctIndex: 1,
        explanation: "WACC đại diện cho chi phí sử dụng vốn bình quân, dùng làm suất chiết khấu trong định giá DCF.",
      },
      {
        id: "l4_q2",
        question: "Chỉ số ROE (Return on Equity) bằng 25% cho biết điều gì?",
        options: [
          "Mỗi 100 đồng vốn chủ sở hữu tạo ra 25 đồng lợi nhuận ròng",
          "Doanh thu tăng trưởng 25%",
          "Nợ phải trả chiếm 25% tổng tài sản",
          "Công ty chi trả cổ tức 25%",
        ],
        correctIndex: 0,
        explanation: "ROE = Net Income / Shareholder's Equity, đo lường mức độ hiệu quả của vốn chủ sở hữu.",
      },
      {
        id: "l4_q3",
        question: "Hệ số Beta ($\beta$) của cổ phiếu = 1.5 mang ý nghĩa gì?",
        options: [
          "Cổ phiếu ít biến động hơn thị trường 50%",
          "Cổ phiếu biến động cùng chiều và mạnh hơn thị trường 50%",
          "Cổ phiếu có cổ tức cao hơn thị trường 1.5 lần",
          "Cổ phiếu hoàn toàn phi rủi ro",
        ],
        correctIndex: 1,
        explanation: "Beta = 1.5 nghĩa là khi VN-Index tăng/giảm 1%, cổ phiếu có xu hướng tăng/giảm khoảng 1.5%.",
      },
      {
        id: "l4_q4",
        question: "Dòng tiền tự do cho doanh nghiệp (FCFF) khác FCFE ở điểm nào?",
        options: [
          "FCFF là dòng tiền cho cả nhà cung cấp nợ & chủ sở hữu; FCFE chỉ dành cho chủ sở hữu",
          "FCFF không trừ chi phí vốn CAPEX",
          "FCFE bao gồm cả doanh thu chưa thực hiện",
          "FCFF chỉ tính dòng tiền từ hoạt động đầu tư",
        ],
        correctIndex: 0,
        explanation: "FCFF = Cash flow available to all capital providers (Debt + Equity). FCFE = Free cash flow to Equity.",
      },
      {
        id: "l4_q5",
        question: "Chỉ số Current Ratio (Hệ số thanh toán hiện hành) < 1.0 cảnh báo rủi ro gì?",
        options: ["Thừa tiền mặt ngắn hạn", "Rủi ro thanh khoản ngắn hạn (Không đủ TSNH để trả nợ đến hạn)", "Rủi ro lạm phát", "Công ty đang hoạt động siêu hiệu quả"],
        correctIndex: 1,
        explanation: "Current Ratio = Current Assets / Current Liabilities < 1 chứng tỏ nợ ngắn hạn vượt quá tài sản ngắn hạn.",
      },
    ],
  },

  5: {
    level: 5,
    title: "Bài Thi Khắt Khe - Cấp 5: Cố Vấn Tài Chính Sành Sỏi",
    badgeEmoji: "🛡️",
    minPassPercentage: 80,
    timeLimitSeconds: 450,
    penaltyXpIfOverdue: 150,
    questions: [
      {
        id: "l5_q1",
        question: "Báo cáo lưu chuyển tiền tệ (Cash Flow Statement) bao gồm 3 cấu phần dòng tiền nào?",
        options: [
          "Dòng tiền Kinh doanh (CFO), Đầu tư (CFI), Tài chính (CFF)",
          "Dòng tiền Ngắn hạn, Trung hạn, Dài hạn",
          "Dòng tiền Cổ tức, Trái phiếu, Tiền gửi",
          "Dòng tiền Thuế, Doanh thu, Chi phí",
        ],
        correctIndex: 0,
        explanation: "3 hoạt động cốt lõi của BCLCTT bao gồm Operating, Investing và Financing Cash Flows.",
      },
      {
        id: "l5_q2",
        question: "Chính sách thắt chặt tiền tệ của Ngân hàng Trung ương (Tăng lãi suất điều hành) nhằm mục đích chính gì?",
        options: [
          "Kích thích tăng trưởng chứng khoán",
          "Tăng chi phí vay vốn, giảm tổng cầu để kiềm chế lạm phát",
          "Làm yếu đồng nội tệ",
          "Tăng chi tiêu Chính phủ",
        ],
        correctIndex: 1,
        explanation: "Tăng lãi suất thu hẹp thanh khoản thị trường, hạ nhiệt nền kinh tế đang quá nóng.",
      },
      {
        id: "l5_q3",
        question: "Mô hình DuPont 3 yếu tố phân rã chỉ số ROE thành các thành phần nào?",
        options: [
          "Net Profit Margin $\\times$ Asset Turnover $\\times$ Financial Leverage (Equity Multiplier)",
          "P/E $\\times$ P/B $\\times$ EPS",
          "Doanh thu $\\times$ Lợi nhuận $\\times$ Vốn",
          "Gross Margin $\\times$ Operating Margin $\\times$ Net Margin",
        ],
        correctIndex: 0,
        explanation: "DuPont 3-way: Biên lợi nhuận ròng x Vòng quay tài sản x Đòn bẩy tài chính.",
      },
      {
        id: "l5_q4",
        question: "Khái niệm 'Margin Call' xảy ra khi nào?",
        options: [
          "Thị trường chứng khoán đóng cửa",
          "Tỷ lệ ký quỹ tài khoản giảm xuống dưới mức ký quỹ duy trì (Maintenance Margin)",
          "Công ty trả cổ tức bằng tiền",
          "NĐT rút tiền mặt về tài khoản ngân hàng",
        ],
        correctIndex: 1,
        explanation: "Khi giá trị tài khoản giảm sâu do dùng đòn bẩy, CTCK sẽ ra lệnh Margin Call yêu cầu nộp thêm tiền hoặc bán giải chấp.",
      },
      {
        id: "l5_q5",
        question: "Khái niệm NPV (Net Present Value) dương ($NPV > 0$) trong thẩm định dự án có nghĩa là gì?",
        options: [
          "Dự án hòa vốn",
          "Giá trị hiện tại của dòng tiền vào lớn hơn giá trị hiện tại của vốn đầu tư ban đầu",
          "Dự án không có rủi ro",
          "Tỷ lệ lạm phát của dự án bằng 0",
        ],
        correctIndex: 1,
        explanation: "NPV > 0 đồng nghĩa dự án tạo thêm giá trị thặng dư cho doanh nghiệp sau khi đã tính đến chi phí cơ hội của vốn.",
      },
    ],
  },

  6: {
    level: 6,
    title: "Bài Thi Đỉnh Cao - Cấp 6: Thạo Thủ Tài Chính",
    badgeEmoji: "👑",
    minPassPercentage: 85,
    timeLimitSeconds: 480,
    penaltyXpIfOverdue: 220,
    questions: [
      {
        id: "l6_q1",
        question: "Trong giao dịch Hợp đồng Quyền chọn (Options), Call Option (Quyền chọn mua) cho phép người mua điều gì?",
        options: [
          "Quyền MUA tài sản cơ sở ở mức giá Strike Price xác định trước thời điểm đáo hạn",
          "Nghĩa vụ bắt buộc phải BÁN tài sản",
          "Quyền BÁN tài sản ở giá thị trường",
          "Nhận cổ tức cố định từ công ty",
        ],
        correctIndex: 0,
        explanation: "Call Option cho người sở hữu QUYỀN MUA (không bắt buộc) ở giá strike price.",
      },
      {
        id: "l6_q2",
        question: "Khái niệm 'Capital Asset Pricing Model' (CAPM) dùng để tính toán chỉ số nào?",
        options: [
          "Tỷ suất sinh lời đòi hỏi của Vốn chủ sở hữu ($K_e$)",
          "Giá vốn hàng bán COGS",
          "Thuế suất doanh nghiệp thực tế",
          "Lợi nhuận ròng của doanh nghiệp",
        ],
        correctIndex: 0,
        explanation: "CAPM: $E(R_i) = R_f + \\beta_i(E(R_m) - R_f)$, tính chi phí vốn chủ sở hữu $K_e$.",
      },
      {
        id: "l6_q3",
        question: "Một Trái phiếu đang giao dịch ở mức giá Cao hơn Mệnh giá (Trading at a Premium) khi nào?",
        options: [
          "Lãi suất danh nghĩa (Coupon Rate) cao hơn Lãi suất thị trường (Yield to Maturity - YTM)",
          "Coupon Rate thấp hơn YTM",
          "Trái phiếu sắp bị vỡ nợ",
          "Doanh nghiệp phát hành thua lỗ",
        ],
        correctIndex: 0,
        explanation: "Khi Coupon > YTM, trái phiếu mang lại dòng tiền lãi hấp dẫn hơn thị trường nên giá giao dịch sẽ cao hơn mệnh giá.",
      },
      {
        id: "l6_q4",
        question: "Biến động tỷ giá (Exchange Rate Risk) ảnh hưởng thế nào tới doanh nghiệp Xuất khẩu?",
        options: [
          "Đồng nội tệ tăng giá mạnh làm giảm tính cạnh tranh của hàng xuất khẩu",
          "Đồng nội tệ giảm giá làm giảm doanh thu nội tệ",
          "Tỷ giá không ảnh hưởng đến doanh nghiệp xuất khẩu",
          "Xuất khẩu luôn có lợi khi nội tệ tăng giá",
        ],
        correctIndex: 0,
        explanation: "Nội tệ tăng giá khiến hàng xuất khẩu trở nên đắt đỏ hơn đối với người mua nước ngoài.",
      },
      {
        id: "l6_q5",
        question: "Định giá theo phương pháp EV/EBITDA có ưu điểm gì vượt trội so với P/E?",
        options: [
          "Bỏ qua ảnh hưởng của cấu trúc vốn (Nợ/Vốn) và chính sách khấu hao khác nhau giữa các DN",
          "Chỉ áp dụng được cho công ty công nghệ lỗ",
          "Không phụ thuộc vào doanh thu",
          "Luôn cho kết quả định giá thấp hơn",
        ],
        correctIndex: 0,
        explanation: "EV/EBITDA dùng Enterprise Value và EBITDA giúp so sánh các DN có cấu trúc nợ vay và chi phí D&A khác nhau.",
      },
      {
        id: "l6_q6",
        question: "Lợi nhuận giữ lại (Retained Earnings) trên Bảng cân đối kế toán thuộc phần nào?",
        options: ["Nợ ngắn hạn", "Vốn chủ sở hữu (Equity)", "Tài sản cố định", "Dòng tiền kinh doanh"],
        correctIndex: 1,
        explanation: "Retained Earnings là phần lợi nhuận ròng lũy kế giữ lại tái đầu tư, nằm trong Vốn chủ sở hữu.",
      },
    ],
  },

  7: {
    level: 7,
    title: "Bài Thi Chuyên Gia - Cấp 7: Chuyên Gia Tài Chính",
    badgeEmoji: "🔥",
    minPassPercentage: 85,
    timeLimitSeconds: 500,
    penaltyXpIfOverdue: 280,
    questions: [
      {
        id: "l7_q1",
        question: "Đường cong lãi suất bị đảo ngược (Inverted Yield Curve) thường dự báo điều gì?",
        options: [
          "Kinh tế sắp bước vào giai đoạn bùng nổ",
          "Tín hiệu kinh điển dự báo rủi ro suy thoái kinh tế (Recession) trong 12 - 18 tháng tới",
          "Lạm phát về mức 0%",
          "Thị trường chứng khoán lập đỉnh liên tục",
        ],
        correctIndex: 1,
        explanation: "Lãi suất ngắn hạn cao hơn dài hạn phản ánh kỳ vọng kinh tế suy yếu và Ngân hàng Trung ương phải cắt giảm lãi suất tương lai.",
      },
      {
        id: "l7_q2",
        question: "Trong quản trị danh mục, Sharpe Ratio đo lường điều gì?",
        options: [
          "Mức lợi nhuận thặng dư trên mỗi đơn vị rủi ro tổng thể (Độ lệch chuẩn - Standard Deviation)",
          "Mức lợi nhuận trên đòn bẩy margin",
          "Tổng vốn nợ trên tổng tài sản",
          "Mức trượt giá của lệnh mua",
        ],
        correctIndex: 0,
        explanation: "Sharpe Ratio = $(R_p - R_f) / \\sigma_p$, đo lường hiệu quả điều chỉnh theo rủi ro biến động.",
      },
      {
        id: "l7_q3",
        question: "Chỉ số Sortino Ratio cải tiến Sharpe Ratio ở điểm cốt lõi nào?",
        options: [
          "Chỉ tính rủi ro biến động chiều giảm (Downside Deviation)",
          "Bỏ qua lãi suất phi rủi ro $R_f$",
          "Chỉ dùng cho thị trường trái phiếu",
          "Tính cả biến động của vàng",
        ],
        correctIndex: 0,
        explanation: "Sortino Ratio phạt rủi ro sụt giảm (downside volatility) thay vì phạt cả biến động tăng như Sharpe.",
      },
      {
        id: "l7_q4",
        question: "Bẫy giá trị (Value Trap) là hiện tượng gì trong đầu tư cổ phiếu?",
        options: [
          "Cổ phiếu có vẻ định giá P/E, P/B rất rẻ nhưng triển vọng kinh doanh đi xuống liên tục",
          "Cổ phiếu tăng giá 10 lần trong 1 năm",
          "Doanh nghiệp bị hủy niêm yết do chia cổ tức quá cao",
          "Mua cổ phiếu IPO bị đắt",
        ],
        correctIndex: 0,
        explanation: "Value Trap khiến nhà đầu tư mắc bẫy cổ phiếu rẻ nhưng đằng sau là nội tại suy ngoái kéo dài.",
      },
      {
        id: "l7_q5",
        question: "Thuật ngữ 'Free Cash Flow to Equity' (FCFE) được tính từ FCFF bằng cách nào?",
        options: [
          "FCFE = FCFF - Chi trả lãi vay $\\times (1-t)$ + Vay nợ ròng (Net Borrowing)",
          "FCFE = FCFF + CAPEX",
          "FCFE = FCFF - Doanh thu",
          "FCFE = FCFF / Số lượng cổ phiếu",
        ],
        correctIndex: 0,
        explanation: "FCFE là dòng tiền sau khi đã chi trả nghĩa vụ nợ (lãi + nợ gốc ròng) còn lại cho cổ đông.",
      },
      {
        id: "l7_q6",
        question: "Hiện tượng 'Thắt chặt định lượng' (Quantitative Tightening - QT) của Fed thực chất là gì?",
        options: [
          "Bán bớt trái phiếu trên bảng cân đối kế toán để rút tiền mặt khỏi hệ thống tài chính",
          "In thêm tiền mua cổ phiếu",
          "Giảm thuế doanh nghiệp",
          "Tăng hạn mức tín dụng ngân hàng",
        ],
        correctIndex: 0,
        explanation: "QT thu hẹp quy mô BCLKT của Fed, trực tiếp giảm thanh khoản đồng USD trên thị trường cầu.",
      },
    ],
  },

  8: {
    level: 8,
    title: "Bài Thi Bậc Thầy - Cấp 8: Bậc Thầy Tài Chính",
    badgeEmoji: "💎",
    minPassPercentage: 85,
    timeLimitSeconds: 540,
    penaltyXpIfOverdue: 340,
    questions: [
      {
        id: "l8_q1",
        question: "Độ nhạy giá trái phiếu đối với sự thay đổi của lãi suất được đo lường bằng chỉ số nào?",
        options: ["Duration (Thời lượng Macaulay/Modified Duration)", "Yield to Maturity", "Coupon Rate", "Credit Rating"],
        correctIndex: 0,
        explanation: "Duration đo lường phần trăm thay đổi giá trái phiếu ứng với 1% thay đổi của lãi suất.",
      },
      {
        id: "l8_q2",
        question: "Cơ chế Mua bán & Sáp nhập (LBO - Leveraged Buyout) của các quỹ Private Equity đặc trưng bởi điều gì?",
        options: [
          "Dùng phần lớn vốn vay nợ (60-80%) thế chấp bằng chính tài sản công ty mục tiêu để mua lại",
          "Chỉ mua 1% cổ phần trên sàn",
          "Dùng 100% tiền mặt của cổ đông",
          "Chỉ đầu tư vào công ty công nghệ mới thành lập",
        ],
        correctIndex: 0,
        explanation: "LBO tận dụng đòn bẩy tài chính cao để thâu tóm và dùng dòng tiền công ty target trả nợ.",
      },
      {
        id: "l8_q3",
        question: "Rủi ro phi hệ thống (Unsystematic / Idiosyncratic Risk) có đặc điểm nào?",
        options: [
          "Có thể loại bỏ gần như toàn bộ thông qua Đa dạng hóa danh mục đầu tư (Diversification)",
          "Không thể loại bỏ bằng đa dạng hóa",
          "Chi phối bởi chính sách tiền tệ toàn cầu",
          "Ảnh hưởng tới tất cả cổ phiếu cùng lúc",
        ],
        correctIndex: 0,
        explanation: "Rủi ro riêng biệt của doanh nghiệp (như rủi ro lãnh đạo, rủi ro sản phẩm) triệt tiêu khi đa dạng hóa.",
      },
      {
        id: "l8_q4",
        question: "Trong hợp đồng Hoán đổi lãi suất (Interest Rate Swap), hai bên thực hiện điều gì?",
        options: [
          "Trao đổi dòng tiền lãi suất cố định lấy dòng tiền lãi suất thả nổi",
          "Trao đổi quyền sở hữu cổ phiếu",
          "Bán trái phiếu Chính phủ lấy vàng",
          "Hủy bỏ hợp đồng vay nợ hiện tại",
        ],
        correctIndex: 0,
        explanation: "Interest Rate Swap giúp quản trị rủi ro lãi suất bằng cách hoán đổi Fixed-for-Floating rate.",
      },
      {
        id: "l8_q5",
        question: "Khái niệm 'Con hào kinh tế' (Economic Moat) của Warren Buffett đề cập tới:",
        options: [
          "Lợi thế cạnh tranh bền vững bảo vệ công ty trước đối thủ",
          "Công ty có đất đai bao quanh bởi sông ngòi",
          "Số tiền vay nợ ngắn hạn thấp",
          "Công ty có nhiều bằng sáng chế sắp hết hạn",
        ],
        correctIndex: 0,
        explanation: "Economic Moat bảo vệ biên lợi nhuận và thị phần doanh nghiệp trước sự thâm nhập của đối thủ.",
      },
      {
        id: "l8_q6",
        question: "Hệ số Beta điều chỉnh Blume (Blume's Adjusted Beta) nhằm mục đích gì?",
        options: [
          "Hồi quy hệ số Beta lịch sử về mức trung bình thị trường bằng 1.0 trong dài hạn",
          "Tăng Beta lên gấp đôi",
          "Triệt tiêu hoàn toàn hệ số Beta",
          "Tính toán chi phí nợ vay",
        ],
        correctIndex: 0,
        explanation: "Adjusted Beta = $0.67 \\times \\beta_{historical} + 0.33 \\times 1.0$, phản ánh xu hướng Beta tiến về 1 theo thời gian.",
      },
      {
        id: "l8_q7",
        question: "Giá trị doanh nghiệp (Enterprise Value - EV) được tính theo công thức nào?",
        options: [
          "EV = Market Cap + Total Debt - Cash & Cash Equivalents",
          "EV = Market Cap - Total Debt",
          "EV = Doanh thu $\\times$ P/E",
          "EV = Vốn chủ sở hữu + Hàng tồn kho",
        ],
        correctIndex: 0,
        explanation: "EV = Vốn hóa + Tổng nợ - Tiền mặt (giá trị thực tế để thâu tóm toàn bộ doanh nghiệp).",
      },
    ],
  },

  9: {
    level: 9,
    title: "Bài Thi CFA - Cấp 9: Chuyên Viên CFA",
    badgeEmoji: "🎓",
    minPassPercentage: 85,
    timeLimitSeconds: 600,
    penaltyXpIfOverdue: 400,
    questions: [
      {
        id: "l9_q1",
        question: "Trong Tiêu chuẩn Đạo đức CFA (CFA Institute Code of Ethics), nguyên tắc 'Fair Dealing' quy định điều gì?",
        options: [
          "Phải đối xử công bằng và khách quan với TẤT CẢ khách hàng khi đưa ra khuyến nghị hoặc hành động đầu tư",
          "Ưu tiên lệnh của khách hàng lớn trước",
          "Ưu tiên lệnh cá nhân của Nhà phân tích trước",
          "Chiết khấu phí quản lý cho người thân",
        ],
        correctIndex: 0,
        explanation: "Standard III(B) Fair Dealing yêu cầu không phân biệt đối xử hoặc ưu tiên bất kỳ nhóm khách hàng nào.",
      },
      {
        id: "l9_q2",
        question: "Giả thuyết Thị trường Hiệu quả dạng Vừa (Semi-Strong Form EMH) khẳng định giá cổ phiếu đã phản ánh:",
        options: [
          "Tất cả thông tin quá khứ VÀ tất cả thông tin công khai trên thị trường",
          "Chỉ thông tin giá quá khứ",
          "Tất cả thông tin bao gồm cả thông tin nội bộ (Insider info)",
          "Không phản ánh thông tin nào",
        ],
        correctIndex: 0,
        explanation: "Semi-strong form: Giá phản ánh Past data + Publicly available information.",
      },
      {
        id: "l9_q3",
        question: "Mô hình định giá Black-Scholes-Merton (BSM) tính giá quyền chọn phụ thuộc vào biến số nào quan trọng nhất?",
        options: [
          "Độ biến động ngầm định (Implied Volatility $\\sigma$)",
          "Số lượng cổ đông công ty",
          "Tỷ lệ lạm phát mục tiêu",
          "Doanh thu thuần quý gần nhất",
        ],
        correctIndex: 0,
        explanation: "Volatility $\\sigma$ là yếu tố quan trọng nhất chi phối giá trị thời gian (Time value) của Option.",
      },
      {
        id: "l9_q4",
        question: "Chỉ số VaR (Value at Risk) ở mức $10 triệu USD với độ tin cậy 95% trong 1 ngày nghĩa là:",
        options: [
          "Có 5% xác suất tổn thất trong 1 ngày vượt quá $10 triệu USD",
          "Tối đa danh mục chỉ lỗ $10 triệu",
          "Chắc chắn danh mục lời $10 triệu",
          "95% xác suất lỗ đúng $10 triệu",
        ],
        correctIndex: 0,
        explanation: "VaR 95% = 1 day nghĩa là có 5% khả năng khoản lỗ trong ngày sẽ lớn hơn ngưỡng VaR đưa ra.",
      },
      {
        id: "l9_q5",
        question: "Chiến lược Arbitrage cổ phiếu (Cash and Carry Arbitrage) thu lợi nhuận từ đâu?",
        options: [
          "Chênh lệch giá giữa thị trường cơ sở và thị trường Hợp đồng Tương lai (Futures) khi có sự lệch định giá",
          "Dự đoán xu hướng thị trường lên hay xuống",
          "Đầu tư cổ phiếu tăng trưởng dài hạn",
          "Mua cổ tức tiền mặt",
        ],
        correctIndex: 0,
        explanation: "Arbitrage tận dụng định giá sai lầm tạm thời giữa hai thị trường liên quan để kinh doanh chênh lệch phi rủi ro.",
      },
      {
        id: "l9_q6",
        question: "Hệ số Beta tài sản (Asset Beta / Unlevered Beta) loại bỏ ảnh hưởng của yếu tố nào?",
        options: ["Đòn bẩy tài chính (Cấu trúc nợ vay)", "Biên lợi nhuận gộp", "Lãi suất ngân hàng", "Số lượng nhân sự"],
        correctIndex: 0,
        explanation: "Unlevering Beta loại bỏ tác động của nợ vay để đo lường rủi ro kinh doanh thuần túy của doanh nghiệp.",
      },
      {
        id: "l9_q7",
        question: "Thuật ngữ 'Contango' trong thị trường Hợp đồng Tương lai Hàng hóa có nghĩa là gì?",
        options: [
          "Giá Futures cao hơn Giá Giao ngay (Spot Price)",
          "Giá Futures thấp hơn Giá Giao ngay",
          "Giá Futures bằng đúng 0",
          "Thị trường ngừng giao dịch",
        ],
        correctIndex: 0,
        explanation: "Contango xảy ra khi giá hợp đồng tương lai cao hơn giá giao ngay do chi phí lưu kho và bảo quản (Cost of carry).",
      },
    ],
  },

  10: {
    level: 10,
    title: "Bài Thi Huyền Thoại - Cấp 10: Huyền Thoại Đầu Tư",
    badgeEmoji: "🦁",
    minPassPercentage: 85,
    timeLimitSeconds: 600,
    penaltyXpIfOverdue: 500,
    questions: [
      {
        id: "l10_q1",
        question: "Chiến lược đầu tư theo Mô hình Factor Investing (Fama-French 3-Factor Model) bổ sung 2 yếu tố nào ngoài Thị trường?",
        options: [
          "Quy mô doanh nghiệp (SMB - Small Minus Big) và Định giá (HML - High Minus Low)",
          "Lạm phát và Tỷ giá",
          "Giá dầu và Giá vàng",
          "Cổ tức và Lãi suất",
        ],
        correctIndex: 0,
        explanation: "Fama-French 3 yếu tố: Market Risk Premium + SMB (Size factor) + HML (Value factor).",
      },
      {
        id: "l10_q2",
        question: "Cơ chế 'Credit Default Swap' (CDS) hoạt động tương tự như sản phẩm nào?",
        options: [
          "Một hợp đồng bảo hiểm rủi ro vỡ nợ cho Trái phiếu",
          "Hợp đồng vay thế chấp nhà",
          "Cổ phiếu ưu đãi cổ tức",
          "Tiền gửi tiết kiệm",
        ],
        correctIndex: 0,
        explanation: "CDS là công cụ phái sinh tín dụng bảo vệ bên mua trước rủi ro vỡ nợ của tổ chức phát hành trái phiếu.",
      },
      {
        id: "l10_q3",
        question: "Biến cố 'Thảm họa Thiên Nga Đen' (Black Swan Event) theo Nassim Taleb có đặc điểm gì?",
        options: [
          "Cực kỳ hiếm gặp, tác động siêu lớn và chỉ được giải thích hợp lý sau khi nó đã xảy ra (Hindsight bias)",
          "Có thể dự báo chính xác theo lịch",
          "Chỉ xảy ra ở các nước đang phát triển",
          "Không gây rủi ro tài chính",
        ],
        correctIndex: 0,
        explanation: "Black Swan là sự kiện bất ngờ ngoài dự đoán có tác động nghiêm trọng tới thị trường tài chính.",
      },
      {
        id: "l10_q4",
        question: "Đường biên hiệu quả Markowitz (Efficient Frontier) đại diện cho tập hợp danh mục nào?",
        options: [
          "Các danh mục đạt tỷ suất sinh lời tối đa cho mỗi mức rủi ro xác định",
          "Các danh mục 100% cổ phiếu rủi ro nhất",
          "Các danh mục chỉ nắm giữ tiền mặt",
        ],
        correctIndex: 0,
        explanation: "Efficient Frontier tối ưu hóa tỷ lệ Risk-Return theo Lý thuyết Danh mục Hiện đại (MPT).",
      },
      {
        id: "l10_q5",
        question: "Khái niệm 'Carry Trade' trong tài chính quốc tế có nghĩa là gì?",
        options: [
          "Vay đồng tiền có lãi suất thấp và đầu tư vào đồng tiền có lãi suất cao hơn để ăn chênh lệch",
          "Mua bán vàng vật chất qua biên giới",
          "Vay nợ ngắn hạn mua bất động sản",
          "Chuyển tiền kiều hối",
        ],
        correctIndex: 0,
        explanation: "Carry Trade tận dụng chênh lệch lãi suất giữa 2 quốc gia (ví dụ: Vay Yên Nhật JPY lãi suất 0% đầu tư USD).",
      },
      {
        id: "l10_q6",
        question: "Chỉ số Treynor Ratio khác Sharpe Ratio ở điểm nào trong mẫu số?",
        options: [
          "Sử dụng Beta (Rủi ro hệ thống) thay vì Standard Deviation (Rủi ro tổng thể)",
          "Sử dụng Doanh thu thay vì Lợi nhuận",
          "Bỏ qua rủi ro",
          "Chỉ tính cổ tức",
        ],
        correctIndex: 0,
        explanation: "Treynor Ratio = $(R_p - R_f) / \\beta_p$, đo lường hiệu quả trên mỗi đơn vị rủi ro thị trường.",
      },
      {
        id: "l10_q7",
        question: "Trong phân tích kỹ thuật nâng cao, chỉ số RSI phân kỳ âm (Negative Divergence) cảnh báo điều gì?",
        options: [
          "Giá tạo đỉnh mới nhưng RSI tạo đỉnh thấp hơn $\\rightarrow$ Động lực tăng giá suy yếu, nguy cơ đảo chiều giảm",
          "Giá sắp bùng nổ tăng trần",
          "Xu hướng tăng tiếp diễn mạnh mẽ",
          "Thị trường đi ngang vĩnh viễn",
        ],
        correctIndex: 0,
        explanation: "Phân kỳ âm cảnh báo đà tăng của giá không còn được hỗ trợ bởi khối lượng/dòng tiền mạnh.",
      },
    ],
  },
};

// Điền các bài thi nâng cao đầy đủ cho Cấp 11 đến 15 nếu chưa định nghĩa
for (let lvl = 11; lvl <= 15; lvl++) {
  if (!LEVEL_EXAMS[lvl]) {
    LEVEL_EXAMS[lvl] = {
      level: lvl,
      title: lvl === 11 ? "Bài Thi Giám Đốc Quỹ Hedge Fund (Level 11)" : lvl === 12 ? "Bài Thi Quản Lý Danh Mục Chiến Lược (Level 12)" : lvl === 13 ? "Bài Thi Bậc Thầy Thị Trường (Level 13)" : lvl === 14 ? "Bài Thi Lãnh Đạo Tài Chính Tối Cao (Level 14)" : "Bài Thi Đại Thuyền Trưởng Phố Wall (Level 15)",
      badgeEmoji: lvl >= 14 ? "🔱" : lvl >= 13 ? "🚀" : lvl >= 12 ? "🌐" : "🏛️",
      minPassPercentage: 90,
      timeLimitSeconds: 600,
      penaltyXpIfOverdue: 450 + lvl * 30,
      questions: [
        {
          id: `l${lvl}_q1`,
          question: "Chiến lược Hedge Fund 'Market Neutral' duy trì trạng thái đầu tư thế nào?",
          options: [
            "Cân bằng vị thế Long và Short để triệt tiêu hoàn toàn rủi ro xu hướng thị trường (Beta = 0)",
            "Chỉ giữ 100% cổ phiếu Long",
            "Chỉ giao dịch hợp đồng vàng phái sinh",
            "Không giao dịch bất kỳ tài sản nào",
          ],
          correctIndex: 0,
          explanation: "Market Neutral loại bỏ rủi ro thị trường chung và kiếm lời từ Alpha chọn lọc cặp cổ phiếu.",
        },
        {
          id: `l${lvl}_q2`,
          question: "Mô hình Black-Litterman nâng cao lý thuyết MPT bằng cách nào?",
          options: [
            "Kết hợp phân bổ thị trường cân bằng (Market Equilibrium) với quan điểm riêng (Investor Views) của nhà quản lý",
            "Bỏ qua rủi ro danh mục",
            "Chỉ áp dụng cho tiền điện tử",
            "Luôn phân bổ 100% vào Trái phiếu Chính phủ",
          ],
          correctIndex: 0,
          explanation: "Black-Litterman khắc phục nhược điểm nhạy cảm quá mức với dữ liệu đầu vào của mô hình Markowitz.",
        },
        {
          id: `l3_q3_l${lvl}`,
          question: "Khái niệm 'Yield Curve Control' (YCC) do Ngân hàng Trung ương thực hiện là gì?",
          options: [
            "Mua/Bán trái phiếu chính phủ để ấn định lãi suất trái phiếu dài hạn ở một mức mục tiêu cụ thể",
            "Tăng thuế tài sản",
            "Cấm giao dịch cổ phiếu ngân hàng",
            "Định giá cố định giá vàng",
          ],
          correctIndex: 0,
          explanation: "YCC mua lượng trái phiếu không giới hạn để giữ lợi suất mục tiêu không vượt trần quy định.",
        },
        {
          id: `l${lvl}_q4`,
          question: "Chỉ số Jensen's Alpha ($\alpha$) dương ($\\alpha > 0$) thể hiện điều gì ở Quản lý quỹ?",
          options: [
            "Nhà quản lý tạo ra lợi nhuận thặng dư vượt kỳ vọng của mô hình CAPM",
            "Quỹ bị thua lỗ so với thị trường",
            "Quỹ sử dụng đòn bẩy quá mức",
            "Quỹ không thu phí quản lý",
          ],
          correctIndex: 0,
          explanation: "Jensen's Alpha đo lường năng lực tạo lợi nhuận thực sự từ kỹ năng chọn cổ phiếu thay vì ăn theo thị trường.",
        },
        {
          id: `l${lvl}_q5`,
          question: "Khái niệm 'High-Frequency Trading' (HFT) tận dụng lợi thế nào?",
          options: [
            "Tốc độ khớp lệnh siêu nhanh tính bằng microgiây (Latency) và thuật toán tự động",
            "Đầu tư phân tích cơ bản 10 năm",
            "Đọc báo chí hằng ngày",
            "Phân tích biểu đồ nến thủ công",
          ],
          correctIndex: 0,
          explanation: "HFT sử dụng hạ tầng mạng siêu tốc độ để kinh doanh chênh lệch giá nhỏ trong phân đoạn giây.",
        },
        {
          id: `l${lvl}_q6`,
          question: "Chiến lược 'Global Macro' của các siêu quỹ đầu tư tập trung vào yếu tố nào?",
          options: [
            "Dự báo biến động vĩ mô toàn cầu (Lãi suất, Tỷ giá, Hàng hóa, Chính trị) để giao dịch đa tài sản",
            "Chỉ mua cổ phiếu ngành bán lẻ nội địa",
            "Phân tích báo cáo tài chính 1 công ty duy nhất",
            "Lướt sóng penny stock",
          ],
          correctIndex: 0,
          explanation: "Global Macro giao dịch quy mô lớn trên các thị trường tiền tệ, trái phiếu, hàng hóa toàn cầu.",
        },
        {
          id: `l${lvl}_q7`,
          question: "Chỉ số Maximum Drawdown (MDD) đo lường điều gì trong lịch sử quỹ?",
          options: [
            "Mức sụt giảm tài sản lớn nhất từ đỉnh xuống đáy trong một khoảng thời gian xác định",
            "Lợi nhuận cao nhất quỹ từng đạt được",
            "Số lượng cổ đông rút vốn",
            "Tổng chi phí vận hành quỹ",
          ],
          correctIndex: 0,
          explanation: "MDD đo lường mức độ rủi ro thua lỗ nặng nề nhất mà nhà đầu tư phải chịu đựng nếu mua ở đỉnh.",
        },
      ],
    };
  }
}

// Storage helpers
export interface UserExamRecord {
  passedLevel: number;
  passedAt: number;
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
