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
    timeLimitSeconds: 480,
    penaltyXpIfOverdue: 30,
    questions: [
      {
        id: "l2_q1",
        question: "Tài sản nào sau đây có tính thanh khoản cao nhất trên bảng cân đối kế toán?",
        options: [
          "Hàng tồn kho thành phẩm đã sẵn sàng giao cho khách",
          "Tiền gửi ngân hàng không kỳ hạn, rút ra là dùng được ngay",
          "Khoản phải thu khách hàng đến hạn trong vòng 30 ngày",
          "Bất động sản đầu tư đang cho thuê ổn định",
        ],
        correctIndex: 1,
        explanation: "Tiền gửi không kỳ hạn dùng được tức thì, không phải chờ bán hay chờ thu. Hàng tồn kho và bất động sản đều cần thời gian để chuyển thành tiền.",
      },
      {
        id: "l2_q2",
        question: "Quy tắc 50/30/20 khuyên dành 20% thu nhập cho mục đích gì?",
        options: [
          "Các khoản chi cho mong muốn như giải trí và du lịch",
          "Tiết kiệm và đầu tư cho các mục tiêu dài hạn",
          "Chi phí thiết yếu gồm tiền nhà, ăn uống và đi lại",
          "Trả lãi cho các khoản vay tiêu dùng đang có",
        ],
        correctIndex: 1,
        explanation: "50% cho nhu cầu thiết yếu, 30% cho mong muốn, 20% cho tiết kiệm và đầu tư. Phần 20% nên được trích tự động ngay khi nhận lương.",
      },
      {
        id: "l2_q3",
        question: "Lợi nhuận gộp được tính bằng công thức nào?",
        options: [
          "Doanh thu thuần trừ đi giá vốn hàng bán phát sinh trong kỳ",
          "Doanh thu thuần trừ toàn bộ chi phí bán hàng phát sinh",
          "Lợi nhuận trước thuế cộng lại phần thuế thu nhập doanh nghiệp",
          "Doanh thu thuần trừ chi phí quản lý doanh nghiệp",
        ],
        correctIndex: 0,
        explanation: "Lợi nhuận gộp = Doanh thu thuần - Giá vốn hàng bán. Nó đo hiệu quả của khâu sản xuất hoặc mua bán, trước mọi chi phí vận hành khác.",
      },
      {
        id: "l2_q4",
        question: "Quỹ dự phòng khẩn cấp nên duy trì ở mức bao nhiêu tháng chi tiêu?",
        options: [
          "Khoảng một đến hai tuần chi tiêu là đủ dùng",
          "Từ ba đến sáu tháng chi tiêu thiết yếu của gia đình",
          "Tối thiểu ba năm chi tiêu để thật sự an toàn",
          "Bằng đúng một tháng thu nhập của bản thân",
        ],
        correctIndex: 1,
        explanation: "Ba đến sáu tháng đủ để vượt qua giai đoạn mất việc hoặc ốm đau mà không phải bán tài sản đầu tư đúng lúc thị trường xấu.",
      },
      {
        id: "l2_q5",
        question: "Lạm phát ảnh hưởng thế nào tới sức mua của tiền mặt?",
        options: [
          "Làm tăng sức mua vì giá trị danh nghĩa tăng lên",
          "Làm giảm sức mua của đồng tiền theo thời gian trôi qua",
          "Không ảnh hưởng nếu tiền được gửi tiết kiệm ngân hàng",
          "Chỉ ảnh hưởng tới người đi vay chứ không tới người giữ tiền",
        ],
        correctIndex: 1,
        explanation: "Cùng một số tiền mua được ít hàng hoá hơn theo thời gian. Gửi tiết kiệm chỉ giúp nếu lãi suất cao hơn lạm phát.",
      },
      {
        id: "l2_q6",
        question: "Khác biệt cốt lõi giữa lãi đơn và lãi kép là gì?",
        options: [
          "Lãi kép tính lãi trên cả phần lãi đã sinh ra trước đó",
          "Lãi kép luôn có lãi suất danh nghĩa cao hơn lãi đơn",
          "Lãi đơn chỉ dùng cho tiền gửi còn lãi kép chỉ dùng cho khoản vay",
          "Lãi đơn trả vào cuối kỳ còn lãi kép được trả hằng tháng",
        ],
        correctIndex: 0,
        explanation: "Lãi đơn luôn tính trên vốn gốc ban đầu. Lãi kép cộng lãi vào gốc rồi tính tiếp, nên khoảng cách giữa hai cách giãn rất nhanh theo thời gian.",
      },
      {
        id: "l2_q7",
        question: "Chiếc xe mua trả góp để đi lại cá nhân thuộc nhóm nào?",
        options: [
          "Tài sản, vì nó có giá trị và bán lại được khi cần tiền",
          "Tiêu sản, vì nó liên tục tạo ra dòng tiền chi ra hằng tháng",
          "Tài sản, vì nó được ghi nhận trên bảng cân đối cá nhân",
          "Không thuộc nhóm nào cho tới khi trả hết khoản vay",
        ],
        correctIndex: 1,
        explanation: "Xe mang lại tiện ích nhưng liên tục lấy tiền ra: trả góp, xăng, bảo dưỡng, bảo hiểm - đồng thời mất giá dần theo thời gian.",
      },
      {
        id: "l2_q8",
        question: "Phương trình kế toán cơ bản phát biểu thế nào?",
        options: [
          "Tài sản bằng Nợ phải trả cộng với Vốn chủ sở hữu",
          "Tài sản bằng Doanh thu trừ đi toàn bộ chi phí trong kỳ",
          "Vốn chủ sở hữu bằng Tài sản cộng với Nợ phải trả",
          "Nợ phải trả bằng Tài sản cộng với Vốn chủ sở hữu",
        ],
        correctIndex: 0,
        explanation: "Mọi đồng tài sản đều có nguồn hình thành: hoặc đi vay, hoặc do chủ sở hữu bỏ vào. Đó là lý do hai vế luôn cân bằng.",
      },
      {
        id: "l2_q9",
        question: "Doanh nghiệp báo lãi nhưng không có tiền trả lương. Nguyên nhân khả dĩ nhất?",
        options: [
          "Doanh thu đã ghi nhận nhưng khách hàng chưa trả tiền",
          "Lợi nhuận trên báo cáo chắc chắn đã bị ghi nhận sai",
          "Doanh nghiệp đã chia hết lợi nhuận cho cổ đông trong kỳ",
          "Chi phí khấu hao trong kỳ được ghi nhận quá thấp",
        ],
        correctIndex: 0,
        explanation: "Kế toán ghi nhận doanh thu khi phát sinh nghĩa vụ chứ không phải khi tiền về. Lãi là một ý kiến kế toán, tiền trong tài khoản mới là sự thật.",
      },
      {
        id: "l2_q10",
        question: "Phương pháp trả nợ lăn cầu tuyết ưu tiên trả khoản nào trước?",
        options: [
          "Khoản có lãi suất cao nhất để tiết kiệm tiền lãi",
          "Khoản có số dư còn lại nhỏ nhất trong danh sách",
          "Khoản có thời hạn còn lại dài nhất trong danh sách",
          "Khoản vay ngân hàng thay vì khoản vay từ người thân",
        ],
        correctIndex: 1,
        explanation: "Lăn cầu tuyết trả khoản nhỏ nhất trước để tạo động lực. Phương pháp tuyết lở mới ưu tiên lãi suất cao nhất và tiết kiệm tiền hơn về số học.",
      },
    ],
  },

  3: {
    level: 3,
    title: "Bài Thi Thấu Hiểu - Cấp 3: Nhà Đầu Tư Thực Chiến",
    badgeEmoji: "💼",
    minPassPercentage: 80,
    timeLimitSeconds: 540,
    penaltyXpIfOverdue: 60,
    questions: [
      {
        id: "l3_q1",
        question: "Chỉ số P/E bằng 15x có ý nghĩa gì?",
        options: [
          "Doanh nghiệp đang lỗ 15% trên vốn chủ sở hữu trong kỳ",
          "Nhà đầu tư trả 15 đồng cho mỗi đồng lợi nhuận ròng",
          "Giá cổ phiếu đang bằng 15% giá trị sổ sách mỗi cổ phần",
          "Tỷ suất cổ tức nhà đầu tư nhận được là 15% mỗi năm",
        ],
        correctIndex: 1,
        explanation: "P/E = Giá / EPS. Hiểu theo cách khác, đó là số năm hoà vốn nếu lợi nhuận giữ nguyên.",
      },
      {
        id: "l3_q2",
        question: "Sức mạnh của lãi kép phát huy tối đa nhờ yếu tố nào?",
        options: [
          "Quy mô vốn ban đầu càng lớn thì hiệu ứng càng mạnh",
          "Thời gian nắm giữ dài và lãi được tái đầu tư liên tục",
          "Tần suất mua bán trong phiên càng nhiều càng tốt",
          "Sử dụng đòn bẩy ký quỹ ở mức tối đa được phép",
        ],
        correctIndex: 1,
        explanation: "Công thức A = P(1+r)^t là hàm mũ theo số kỳ t, nên thời gian tác động mạnh hơn hẳn quy mô vốn ban đầu.",
      },
      {
        id: "l3_q3",
        question: "Tỷ lệ Nợ trên Vốn chủ sở hữu quá cao phản ánh điều gì?",
        options: [
          "Doanh nghiệp đang chịu áp lực lạm phát cao hơn mặt bằng",
          "Rủi ro đòn bẩy lớn và dễ kiệt quệ khi lãi suất tăng",
          "Doanh nghiệp gần như không sử dụng vốn vay bên ngoài",
          "Dòng tiền tự do của doanh nghiệp đang rất dồi dào",
        ],
        correctIndex: 1,
        explanation: "D/E cao nghĩa là phụ thuộc nhiều vào vốn vay, nên chi phí lãi bào mòn lợi nhuận nhanh khi lãi suất đi lên.",
      },
      {
        id: "l3_q4",
        question: "Hành vi FOMO trong đầu tư thường dẫn tới hậu quả nào?",
        options: [
          "Mua đuổi ở vùng giá đỉnh do chạy theo tâm lý đám đông",
          "Bán tháo toàn bộ danh mục ngay khi thị trường chạm đáy",
          "Quản trị rủi ro trở nên quá thận trọng và bỏ lỡ cơ hội",
          "Định giá cổ phiếu chính xác hơn nhờ theo sát thị trường",
        ],
        correctIndex: 0,
        explanation: "FOMO khiến nhà đầu tư mua đuổi cổ phiếu vừa tăng nóng, tức trả giá cao nhất đúng lúc rủi ro lớn nhất.",
      },
      {
        id: "l3_q5",
        question: "Chỉ số P/B phù hợp nhất để định giá nhóm ngành nào?",
        options: [
          "Công ty phần mềm với tài sản chủ yếu là con người",
          "Ngân hàng và các định chế tài chính có tài sản dễ định giá",
          "Doanh nghiệp truyền thông sống bằng doanh thu quảng cáo",
          "Startup công nghệ sinh học chưa có doanh thu ổn định",
        ],
        correctIndex: 1,
        explanation: "P/B hợp với doanh nghiệp mà giá trị nằm ở tài sản ghi nhận được trên bảng cân đối, điển hình là ngân hàng.",
      },
      {
        id: "l3_q6",
        question: "ROE đo lường điều gì?",
        options: [
          "Khả năng sinh lời trên mỗi đồng vốn chủ sở hữu bỏ ra",
          "Tỷ lệ lợi nhuận trên tổng tài sản doanh nghiệp nắm giữ",
          "Phần trăm doanh thu còn lại sau khi trừ hết mọi chi phí",
          "Tốc độ tăng lợi nhuận ròng so với cùng kỳ năm trước",
        ],
        correctIndex: 0,
        explanation: "ROE = Lợi nhuận ròng / Vốn chủ sở hữu. Lựa chọn thứ hai mô tả ROA, lựa chọn thứ ba là biên lợi nhuận ròng.",
      },
      {
        id: "l3_q7",
        question: "Đa dạng hoá danh mục làm giảm được loại rủi ro nào?",
        options: [
          "Rủi ro hệ thống tác động lên toàn bộ thị trường chung",
          "Rủi ro riêng của từng doanh nghiệp cụ thể trong danh mục",
          "Cả rủi ro hệ thống lẫn rủi ro riêng của từng doanh nghiệp",
          "Rủi ro lạm phát làm giảm sức mua của cả danh mục",
        ],
        correctIndex: 1,
        explanation: "Đa dạng hoá triệt tiêu phần rủi ro riêng lẻ. Rủi ro hệ thống không loại bỏ được dù nắm bao nhiêu mã.",
      },
      {
        id: "l3_q8",
        question: "Khi lãi suất thị trường tăng, giá trái phiếu đang lưu hành thay đổi ra sao?",
        options: [
          "Tăng lên vì trái phiếu trở nên hấp dẫn hơn với nhà đầu tư",
          "Giảm xuống, và giảm càng mạnh nếu kỳ hạn còn lại càng dài",
          "Không đổi vì lãi coupon đã ấn định từ lúc phát hành",
          "Biến động cùng chiều lãi suất theo tỷ lệ một đối một",
        ],
        correctIndex: 1,
        explanation: "Trái phiếu cũ trả coupon thấp hơn mặt bằng mới, nên giá phải giảm để lợi suất khi mua ngang với trái phiếu mới phát hành.",
      },
      {
        id: "l3_q9",
        question: "Khác biệt chính giữa quỹ ETF chỉ số và quỹ chủ động là gì?",
        options: [
          "ETF mô phỏng một chỉ số nên phí quản lý thấp hơn nhiều",
          "ETF luôn mang lại tỷ suất sinh lời cao hơn quỹ chủ động",
          "Quỹ chủ động không được phép nắm giữ cổ phiếu niêm yết",
          "ETF chỉ giao dịch được một lần vào cuối mỗi phiên",
        ],
        correctIndex: 0,
        explanation: "ETF bám rổ có sẵn nên chi phí vận hành thấp. Không có gì bảo đảm nó sinh lời cao hơn quỹ chủ động.",
      },
      {
        id: "l3_q10",
        question: "Vào ngày giao dịch không hưởng quyền, giá tham chiếu được điều chỉnh thế nào?",
        options: [
          "Giữ nguyên vì cổ tức trả bằng tiền của doanh nghiệp",
          "Giảm tương ứng với phần cổ tức sắp được chi trả",
          "Tăng đúng bằng phần cổ tức mà cổ đông sắp được nhận",
          "Do sở giao dịch quyết định tuỳ thanh khoản của mã đó",
        ],
        correctIndex: 1,
        explanation: "Tiền cổ tức rời khỏi doanh nghiệp nên giá trị mỗi cổ phần giảm tương ứng. Nhà đầu tư không giàu lên chỉ vì nhận cổ tức.",
      },
    ],
  },

  4: {
    level: 4,
    title: "Bài Thi Chuyên Sâu - Cấp 4: Nhà Phân Tích Tài Chính",
    badgeEmoji: "📊",
    minPassPercentage: 80,
    timeLimitSeconds: 600,
    penaltyXpIfOverdue: 100,
    questions: [
      {
        id: "l4_q1",
        question: "Trong mô hình DCF, WACC đóng vai trò gì?",
        options: [
          "Tỷ lệ chiết khấu đưa dòng tiền tương lai về hiện tại",
          "Tốc độ tăng trưởng dài hạn dùng cho giá trị cuối cùng",
          "Biên lợi nhuận mục tiêu mà doanh nghiệp cần đạt được",
          "Tỷ suất sinh lời thực tế cổ đông đã nhận trong kỳ",
        ],
        correctIndex: 0,
        explanation: "WACC là chi phí vốn bình quân của cả nợ và vốn chủ, nên nó là suất chiết khấu đúng cho dòng tiền thuộc về cả doanh nghiệp.",
      },
      {
        id: "l4_q2",
        question: "Chỉ số ROE bằng 25% cho biết điều gì?",
        options: [
          "Doanh nghiệp giữ lại 25% lợi nhuận để tái đầu tư",
          "Mỗi 100 đồng vốn chủ tạo ra 25 đồng lợi nhuận ròng",
          "Doanh nghiệp tăng trưởng doanh thu 25% so với cùng kỳ",
          "Biên lợi nhuận ròng trên doanh thu thuần đạt mức 25%",
        ],
        correctIndex: 1,
        explanation: "ROE = Lợi nhuận ròng / Vốn chủ sở hữu, đo hiệu quả sử dụng phần vốn thuộc về cổ đông.",
      },
      {
        id: "l4_q3",
        question: "Hệ số Beta bằng 1,5 mang ý nghĩa gì?",
        options: [
          "Cổ phiếu biến động cùng chiều nhưng mạnh hơn thị trường",
          "Cổ phiếu chắc chắn sinh lời cao hơn thị trường 50% mỗi năm",
          "Cổ phiếu biến động ngược chiều với chỉ số chung",
          "Rủi ro riêng của doanh nghiệp cao gấp rưỡi trung bình ngành",
        ],
        correctIndex: 0,
        explanation: "Beta đo độ nhạy với thị trường: chỉ số biến động 1% thì cổ phiếu có xu hướng biến động khoảng 1,5% cùng chiều. Nó không hứa hẹn mức sinh lời.",
      },
      {
        id: "l4_q4",
        question: "FCFF khác FCFE ở điểm nào?",
        options: [
          "FCFF thuộc về cả chủ nợ lẫn cổ đông, FCFE chỉ thuộc cổ đông",
          "FCFF tính trước khấu hao còn FCFE tính sau khấu hao tài sản",
          "FCFF dùng cho doanh nghiệp niêm yết, FCFE cho chưa niêm yết",
          "FCFF luôn nhỏ hơn FCFE do đã trừ toàn bộ chi phí lãi vay",
        ],
        correctIndex: 0,
        explanation: "FCFF là dòng tiền cho mọi bên cấp vốn nên chiết khấu bằng WACC. FCFE đã trừ nghĩa vụ nợ nên chiết khấu bằng chi phí vốn chủ.",
      },
      {
        id: "l4_q5",
        question: "Hệ số thanh toán hiện hành nhỏ hơn 1,0 cảnh báo điều gì?",
        options: [
          "Doanh nghiệp đang thua lỗ trong hoạt động kinh doanh chính",
          "Tài sản ngắn hạn không đủ trang trải nợ ngắn hạn đến hạn",
          "Doanh nghiệp dùng quá ít đòn bẩy so với trung bình ngành",
          "Hàng tồn kho chiếm tỷ trọng quá lớn trong tổng tài sản",
        ],
        correctIndex: 1,
        explanation: "Current Ratio = Tài sản ngắn hạn / Nợ ngắn hạn. Dưới 1 nghĩa là nghĩa vụ trong 12 tháng tới vượt nguồn lực sẵn có để trả.",
      },
      {
        id: "l4_q6",
        question: "Giá trị cuối cùng thường chiếm bao nhiêu phần giá trị trong một mô hình DCF?",
        options: [
          "Dưới 10% vì nó chỉ là phần dư sau giai đoạn dự phóng",
          "Thường trên một nửa, nên giả định của nó chi phối kết quả",
          "Đúng bằng tổng dòng tiền chiết khấu của giai đoạn dự phóng",
          "Không đáng kể nếu giai đoạn dự phóng kéo dài từ năm năm",
        ],
        correctIndex: 1,
        explanation: "Đây là lý do một thay đổi nhỏ ở tốc độ tăng trưởng dài hạn hoặc bội số thoát ra lại làm định giá thay đổi rất mạnh.",
      },
      {
        id: "l4_q7",
        question: "Quan hệ giữa Giá trị doanh nghiệp và Giá trị vốn chủ sở hữu là gì?",
        options: [
          "Giá trị doanh nghiệp bằng vốn chủ cộng nợ vay trừ tiền mặt",
          "Giá trị doanh nghiệp bằng vốn chủ cộng toàn bộ tài sản ngắn hạn",
          "Hai đại lượng này bằng nhau với doanh nghiệp đã niêm yết",
          "Giá trị vốn chủ bằng giá trị doanh nghiệp cộng với nợ vay",
        ],
        correctIndex: 0,
        explanation: "Người mua cả doanh nghiệp phải trả cho cổ đông và gánh nợ, nhưng nhận lại tiền mặt trên bảng cân đối.",
      },
      {
        id: "l4_q8",
        question: "EBITDA bỏ qua khoản mục nào khiến nó dễ gây hiểu nhầm?",
        options: [
          "Chi phí bán hàng và chi phí quản lý doanh nghiệp trong kỳ",
          "Chi phí đầu tư tài sản cố định để duy trì hoạt động",
          "Doanh thu tài chính và các khoản thu nhập bất thường",
          "Giá vốn của toàn bộ sản phẩm đã tiêu thụ trong kỳ",
        ],
        correctIndex: 1,
        explanation: "EBITDA cộng ngược khấu hao, nên với doanh nghiệp thâm dụng vốn nó che mất phần tiền phải bỏ ra liên tục để tài sản tiếp tục vận hành.",
      },
      {
        id: "l4_q9",
        question: "Vòng quay hàng tồn kho tăng mạnh so với cùng kỳ thường cho thấy điều gì?",
        options: [
          "Hàng bán nhanh hơn nên vốn bị chôn trong kho ít đi",
          "Doanh nghiệp đang tích trữ thêm hàng để đón mùa cao điểm",
          "Giá vốn hàng bán trong kỳ đã giảm đáng kể so với trước",
          "Doanh nghiệp kéo dài thời gian trả tiền cho nhà cung cấp",
        ],
        correctIndex: 0,
        explanation: "Cần đọc kèm bối cảnh: vòng quay tăng cũng có thể do xả hàng giảm giá, nên phải soi thêm biên lợi nhuận gộp.",
      },
      {
        id: "l4_q10",
        question: "Tăng chi phí khấu hao trong kỳ tác động thế nào tới dòng tiền?",
        options: [
          "Làm giảm dòng tiền đúng bằng phần khấu hao tăng thêm",
          "Làm tăng dòng tiền nhờ khoản thuế tiết kiệm được",
          "Không tác động vì đây là khoản mục phi tiền tệ",
          "Làm giảm dòng tiền do lợi nhuận sau thuế giảm tương ứng",
        ],
        correctIndex: 1,
        explanation: "Khấu hao là chi phí phi tiền tệ nhưng được trừ khi tính thuế, nên nó tạo lá chắn thuế và làm dòng tiền thực tế tăng lên.",
      },
      {
        id: "l4_q11",
        question: "So sánh P/E giữa hai doanh nghiệp có mức đòn bẩy rất khác nhau có vấn đề gì?",
        options: [
          "Không có vấn đề gì vì P/E đã chuẩn hoá theo lợi nhuận",
          "P/E chịu ảnh hưởng của chi phí lãi vay nên khó so trực tiếp",
          "P/E chỉ dùng được cho doanh nghiệp hoàn toàn không vay nợ",
          "P/E của doanh nghiệp vay nhiều luôn cao hơn một cách hệ thống",
        ],
        correctIndex: 1,
        explanation: "Lợi nhuận ròng nằm sau chi phí lãi vay nên đòn bẩy bóp méo mẫu số. Với hai cấu trúc vốn khác nhau, EV/EBITDA là phép so công bằng hơn.",
      },
    ],
  },

  5: {
    level: 5,
    title: "Bài Thi Khắt Khe - Cấp 5: Cố Vấn Tài Chính Sành Sỏi",
    badgeEmoji: "🛡️",
    minPassPercentage: 80,
    timeLimitSeconds: 660,
    penaltyXpIfOverdue: 150,
    questions: [
      {
        id: "l5_q1",
        question: "Báo cáo lưu chuyển tiền tệ gồm ba cấu phần nào?",
        options: [
          "Dòng tiền từ kinh doanh, từ đầu tư và từ tài chính",
          "Dòng tiền ngắn hạn, dòng tiền trung hạn và dòng tiền dài hạn",
          "Dòng tiền từ doanh thu, từ chi phí và từ thuế phải nộp",
          "Dòng tiền thực thu, dòng tiền thực chi và số dư cuối kỳ",
        ],
        correctIndex: 0,
        explanation: "Ba hoạt động cốt lõi: Operating, Investing và Financing. Cách chia này cho biết tiền đến từ việc kinh doanh hay từ đi vay.",
      },
      {
        id: "l5_q2",
        question: "Ngân hàng trung ương tăng lãi suất điều hành nhằm mục đích chính gì?",
        options: [
          "Tăng chi phí vay vốn và hạ tổng cầu để kiềm chế lạm phát",
          "Kích thích doanh nghiệp mở rộng đầu tư sản xuất kinh doanh",
          "Làm suy yếu đồng nội tệ để hỗ trợ hoạt động xuất khẩu",
          "Bơm thêm thanh khoản cho hệ thống ngân hàng thương mại",
        ],
        correctIndex: 0,
        explanation: "Lãi suất cao làm vay đắt hơn và gửi tiết kiệm hấp dẫn hơn, nên tiêu dùng và đầu tư giảm, kéo áp lực giá xuống.",
      },
      {
        id: "l5_q3",
        question: "Mô hình DuPont ba yếu tố phân rã ROE thành những thành phần nào?",
        options: [
          "Biên lợi nhuận ròng, vòng quay tài sản và đòn bẩy tài chính",
          "Doanh thu, chi phí hoạt động và thuế thu nhập doanh nghiệp",
          "Tài sản ngắn hạn, tài sản dài hạn và tổng vốn chủ sở hữu",
          "Tăng trưởng doanh thu, biên lợi nhuận gộp và chi phí lãi vay",
        ],
        correctIndex: 0,
        explanation: "Phân rã này cho biết ROE cao đến từ bán có lãi, dùng tài sản hiệu quả, hay chỉ đơn giản là vay nhiều - ba nguyên nhân rất khác nhau.",
      },
      {
        id: "l5_q4",
        question: "Margin call xảy ra khi nào?",
        options: [
          "Khi tỷ lệ ký quỹ tụt xuống dưới mức duy trì bắt buộc",
          "Khi nhà đầu tư chủ động xin tăng thêm hạn mức vay ký quỹ",
          "Khi công ty chứng khoán hạ lãi suất cho vay ký quỹ",
          "Khi cổ phiếu trong danh mục bị đưa vào diện cảnh báo",
        ],
        correctIndex: 0,
        explanation: "Giá giảm làm phần vốn tự có co lại. Khi tỷ lệ ký quỹ thủng ngưỡng duy trì, công ty chứng khoán yêu cầu nộp thêm tiền hoặc bán giải chấp.",
      },
      {
        id: "l5_q5",
        question: "NPV dương của một dự án có nghĩa là gì?",
        options: [
          "Dự án hoàn vốn nhanh hơn thời gian kỳ vọng ban đầu",
          "Giá trị hiện tại dòng tiền vào vượt vốn đầu tư bỏ ra",
          "Dự án chắc chắn sinh lời trong mọi kịch bản thị trường",
          "Tỷ suất hoàn vốn nội bộ của dự án lớn hơn tốc độ lạm phát",
        ],
        correctIndex: 1,
        explanation: "NPV > 0 nghĩa là dự án tạo thêm giá trị sau khi đã tính đủ chi phí cơ hội của vốn thông qua suất chiết khấu.",
      },
      {
        id: "l5_q6",
        question: "Nhược điểm chính của IRR so với NPV là gì?",
        options: [
          "IRR không tính được cho dự án có vòng đời trên mười năm",
          "IRR có thể cho nhiều nghiệm khi dòng tiền đổi dấu nhiều lần",
          "IRR luôn cho kết quả thấp hơn NPV nên quá thận trọng",
          "IRR chỉ áp dụng cho dự án đầu tư tài sản cố định hữu hình",
        ],
        correctIndex: 1,
        explanation: "IRR còn ngầm giả định tái đầu tư dòng tiền tại chính mức IRR, thường phi thực tế. NPV cộng dồn giá trị nên xếp hạng dự án đáng tin hơn.",
      },
      {
        id: "l5_q7",
        question: "Duration của trái phiếu đo lường điều gì?",
        options: [
          "Số năm còn lại cho tới ngày đáo hạn của trái phiếu",
          "Độ nhạy của giá trái phiếu trước thay đổi của lãi suất",
          "Tổng tiền lãi coupon nhận được cho tới khi đáo hạn",
          "Xác suất tổ chức phát hành mất khả năng trả nợ gốc",
        ],
        correctIndex: 1,
        explanation: "Duration càng cao thì giá càng nhạy với lãi suất. Nó chỉ trùng với kỳ hạn còn lại ở trái phiếu không trả coupon.",
      },
      {
        id: "l5_q8",
        question: "Tỷ số Sharpe đo lường điều gì?",
        options: [
          "Lợi nhuận vượt trội trên mỗi đơn vị rủi ro phải gánh chịu",
          "Mức lợi nhuận tuyệt đối danh mục đạt được trong một năm",
          "Tỷ trọng cổ phiếu so với trái phiếu trong danh mục",
          "Chênh lệch lợi suất giữa danh mục và lãi suất phi rủi ro",
        ],
        correctIndex: 0,
        explanation: "Sharpe = (Lợi suất danh mục - Lợi suất phi rủi ro) / Độ lệch chuẩn. Lựa chọn cuối chỉ là tử số, thiếu phần chia cho rủi ro.",
      },
      {
        id: "l5_q9",
        question: "Ghép hai tài sản có tương quan âm vào danh mục tạo hiệu ứng gì?",
        options: [
          "Tổng rủi ro giảm xuống dưới bình quân của hai tài sản",
          "Lợi suất kỳ vọng tăng lên so với từng tài sản riêng lẻ",
          "Rủi ro danh mục bằng đúng trung bình rủi ro hai tài sản",
          "Cả hai tài sản sẽ cùng tăng và cùng giảm theo một nhịp",
        ],
        correctIndex: 0,
        explanation: "Tương quan âm nghĩa là một tài sản có xu hướng tăng khi tài sản kia giảm, nên biến động của tổng danh mục được san phẳng bớt.",
      },
      {
        id: "l5_q10",
        question: "Tái cân bằng danh mục định kỳ có tác dụng gì?",
        options: [
          "Đưa tỷ trọng về mục tiêu, tức bán bớt phần đã tăng mạnh",
          "Bảo đảm danh mục luôn sinh lời cao hơn chỉ số tham chiếu",
          "Loại bỏ hoàn toàn rủi ro thị trường khỏi danh mục nắm giữ",
          "Giảm chi phí giao dịch nhờ số lần mua bán trong năm ít đi",
        ],
        correctIndex: 0,
        explanation: "Tái cân bằng giữ mức rủi ro đúng khẩu vị đã chọn. Nó không hứa hẹn vượt chỉ số và cũng không xoá được rủi ro thị trường.",
      },
      {
        id: "l5_q11",
        question: "Chi phí cơ hội của vốn trong thẩm định dự án nghĩa là gì?",
        options: [
          "Lãi suất ngân hàng đang áp cho khoản vay của doanh nghiệp",
          "Tỷ suất sinh lời của phương án tốt nhất bị bỏ qua",
          "Toàn bộ chi phí thực tế đã bỏ ra để triển khai dự án",
          "Mức lạm phát dự kiến trong suốt vòng đời của dự án",
        ],
        correctIndex: 1,
        explanation: "Vốn luôn có phương án thay thế. Suất chiết khấu phải phản ánh mức sinh lời đó, nếu không dự án sẽ trông hấp dẫn hơn thực tế.",
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
