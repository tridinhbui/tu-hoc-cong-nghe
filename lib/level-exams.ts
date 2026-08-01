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
    timeLimitSeconds: 720,
    penaltyXpIfOverdue: 220,
    questions: [
      {
        id: "l6_q1",
        question: "Quyền chọn mua (Call Option) cho phép người nắm giữ điều gì?",
        options: [
          "Quyền mua tài sản cơ sở tại mức giá thực hiện đã định trước",
          "Nghĩa vụ phải bán tài sản cơ sở khi bên mua yêu cầu thực hiện",
          "Quyền bán tài sản cơ sở theo giá thị trường tại ngày đáo hạn",
          "Quyền nhận cổ tức cố định từ doanh nghiệp phát hành cổ phiếu",
        ],
        correctIndex: 0,
        explanation: "Điểm mấu chốt là quyền chứ không phải nghĩa vụ: nếu giá thị trường thấp hơn giá thực hiện, người nắm giữ chỉ việc không thực hiện.",
      },
      {
        id: "l6_q2",
        question: "Mô hình CAPM dùng để tính đại lượng nào?",
        options: [
          "Tỷ suất sinh lời đòi hỏi của vốn chủ sở hữu",
          "Giá vốn hàng bán trong kỳ của doanh nghiệp",
          "Thuế suất thực tế mà doanh nghiệp phải nộp",
          "Lợi nhuận ròng dự phóng cho năm tài chính kế tiếp",
        ],
        correctIndex: 0,
        explanation: "CAPM cho ra chi phí vốn chủ: lãi suất phi rủi ro cộng phần bù rủi ro thị trường nhân với beta của cổ phiếu.",
      },
      {
        id: "l6_q3",
        question: "Trái phiếu giao dịch cao hơn mệnh giá khi nào?",
        options: [
          "Khi lãi suất coupon cao hơn lợi suất đáo hạn của thị trường",
          "Khi lãi suất coupon thấp hơn lợi suất đáo hạn của thị trường",
          "Khi tổ chức phát hành sắp mất khả năng thanh toán nợ gốc",
          "Khi doanh nghiệp phát hành báo lỗ trong kỳ gần nhất",
        ],
        correctIndex: 0,
        explanation: "Coupon cao hơn mặt bằng nghĩa là dòng tiền lãi hấp dẫn hơn trái phiếu mới, nên nhà đầu tư sẵn sàng trả cao hơn mệnh giá.",
      },
      {
        id: "l6_q4",
        question: "Đồng nội tệ tăng giá mạnh ảnh hưởng thế nào tới doanh nghiệp xuất khẩu?",
        options: [
          "Hàng hoá trở nên đắt hơn với người mua nước ngoài",
          "Doanh thu quy đổi ra nội tệ tăng lên đáng kể so với trước",
          "Không ảnh hưởng gì vì hợp đồng đã chốt giá bằng ngoại tệ",
          "Biên lợi nhuận được cải thiện nhờ chi phí nhập nguyên liệu giảm",
        ],
        correctIndex: 0,
        explanation: "Nội tệ mạnh làm hàng xuất khẩu đắt lên theo mắt người mua nước ngoài, đồng thời mỗi đồng ngoại tệ thu về quy đổi được ít nội tệ hơn.",
      },
      {
        id: "l6_q5",
        question: "EV/EBITDA có ưu điểm gì so với P/E khi so sánh giữa các doanh nghiệp?",
        options: [
          "Trung lập với cấu trúc vốn và chính sách khấu hao khác nhau",
          "Luôn cho ra mức định giá thấp hơn nên an toàn hơn cho nhà đầu tư",
          "Chỉ dùng được cho doanh nghiệp công nghệ đang lỗ kế toán",
          "Không chịu ảnh hưởng bởi quy mô doanh thu của doanh nghiệp",
        ],
        correctIndex: 0,
        explanation: "EBITDA nằm trước lãi vay và khấu hao, còn EV gồm cả nợ, nên hai doanh nghiệp vay nhiều và vay ít vẫn so được với nhau.",
      },
      {
        id: "l6_q6",
        question: "Lợi nhuận giữ lại nằm ở phần nào của bảng cân đối kế toán?",
        options: [
          "Nợ ngắn hạn phải trả trong vòng mười hai tháng tới",
          "Vốn chủ sở hữu, cùng nhóm với vốn góp của cổ đông",
          "Tài sản cố định hữu hình đã trừ khấu hao luỹ kế",
          "Dòng tiền từ hoạt động kinh doanh trong kỳ báo cáo",
        ],
        correctIndex: 1,
        explanation: "Đây là phần lợi nhuận luỹ kế chưa chia cho cổ đông, nên nó thuộc về chủ sở hữu chứ không phải nghĩa vụ với bên ngoài.",
      },
      {
        id: "l6_q7",
        question: "Người mua quyền chọn bán (Put Option) có lợi trong tình huống nào?",
        options: [
          "Khi giá tài sản cơ sở giảm xuống dưới giá thực hiện",
          "Khi giá tài sản cơ sở tăng vượt qua mức giá thực hiện đã định",
          "Khi độ biến động của tài sản cơ sở giảm mạnh trước ngày đáo hạn",
          "Khi tổ chức phát hành tăng mức cổ tức chi trả cho cổ đông",
        ],
        correctIndex: 0,
        explanation: "Quyền bán ở giá cao hơn thị trường mới có giá trị, nên put sinh lời khi giá cơ sở đi xuống - nó hoạt động như một hợp đồng bảo hiểm.",
      },
      {
        id: "l6_q8",
        question: "WACC được cấu thành từ những thành phần nào?",
        options: [
          "Chi phí vốn chủ và chi phí nợ sau thuế, lấy trọng số theo giá thị trường",
          "Lãi suất ngân hàng bình quân cộng với tỷ lệ lạm phát dự kiến trong kỳ",
          "Tỷ suất sinh lời trung bình của ngành trong năm năm gần nhất",
          "Chi phí vốn chủ sở hữu trừ đi phần lá chắn thuế từ lãi vay",
        ],
        correctIndex: 0,
        explanation: "Lãi vay được trừ khi tính thuế nên chi phí nợ phải tính sau thuế. Trọng số dùng giá trị thị trường chứ không phải giá trị sổ sách.",
      },
      {
        id: "l6_q9",
        question: "Vốn lưu động ròng tăng mạnh tác động thế nào tới dòng tiền kinh doanh?",
        options: [
          "Làm giảm dòng tiền vì vốn bị giữ lại trong khoản phải thu và kho",
          "Làm tăng dòng tiền vì doanh nghiệp có thêm tài sản ngắn hạn",
          "Không tác động vì vốn lưu động là khoản mục của bảng cân đối",
          "Chỉ tác động tới dòng tiền đầu tư chứ không tới kinh doanh",
        ],
        correctIndex: 0,
        explanation: "Bán được hàng mà chưa thu tiền, hoặc trữ thêm kho, đều là tiền đã bỏ ra nhưng chưa quay về - lợi nhuận vẫn tăng còn dòng tiền thì không.",
      },
      {
        id: "l6_q10",
        question: "Doanh nghiệp có đòn bẩy hoạt động cao mang đặc điểm gì?",
        options: [
          "Chi phí cố định lớn, nên lợi nhuận nhạy mạnh với biến động doanh thu",
          "Tỷ lệ nợ vay trên vốn chủ sở hữu cao hơn trung bình của ngành",
          "Chi phí biến đổi chiếm phần lớn trong cơ cấu giá thành sản phẩm",
          "Vòng quay hàng tồn kho nhanh hơn so với các đối thủ cùng ngành",
        ],
        correctIndex: 0,
        explanation: "Đòn bẩy hoạt động nói về cơ cấu chi phí cố định và biến đổi. Lựa chọn thứ hai mô tả đòn bẩy tài chính, một khái niệm khác.",
      },
      {
        id: "l6_q11",
        question: "Doanh nghiệp mua lại cổ phiếu quỹ tác động thế nào tới EPS, nếu lợi nhuận không đổi?",
        options: [
          "EPS tăng lên do số cổ phiếu lưu hành giảm xuống",
          "EPS giảm xuống vì doanh nghiệp phải chi tiền mặt để mua lại",
          "EPS không đổi vì mua cổ phiếu quỹ không ảnh hưởng lợi nhuận",
          "EPS chỉ thay đổi khi cổ phiếu quỹ được huỷ bỏ hoàn toàn",
        ],
        correctIndex: 0,
        explanation: "Mẫu số giảm nên EPS tăng, dù doanh nghiệp không kiếm thêm được đồng nào. Đây là lý do EPS tăng không tự động nghĩa là kinh doanh tốt lên.",
      },
      {
        id: "l6_q12",
        question: "Giả thuyết thị trường hiệu quả dạng bán mạnh phát biểu điều gì?",
        options: [
          "Giá đã phản ánh mọi thông tin công khai, kể cả báo cáo tài chính",
          "Giá chỉ phản ánh dữ liệu giá và khối lượng trong quá khứ",
          "Giá phản ánh cả thông tin nội bộ chưa được công bố ra thị trường",
          "Giá luôn bằng đúng giá trị nội tại trong mọi điều kiện thị trường",
        ],
        correctIndex: 0,
        explanation: "Dạng yếu chỉ gồm dữ liệu giá quá khứ, dạng mạnh gồm cả thông tin nội bộ. Dạng bán mạnh nằm giữa và hàm ý phân tích cơ bản công khai khó tạo lợi thế bền vững.",
      },
    ],
  },

  7: {
    level: 7,
    title: "Bài Thi Chuyên Gia - Cấp 7: Chuyên Gia Tài Chính",
    badgeEmoji: "🔥",
    minPassPercentage: 85,
    timeLimitSeconds: 780,
    penaltyXpIfOverdue: 280,
    questions: [
      {
        id: "l7_q1",
        question: "Đường cong lãi suất bị đảo ngược (Inverted Yield Curve) thường dự báo điều gì?",
        options: [
          "Nền kinh tế sắp bước vào một giai đoạn tăng trưởng bùng nổ",
          "Rủi ro suy thoái trong khoảng mười hai tới mười tám tháng tới",
          "Lạm phát sẽ về mức bằng không trong vòng một năm tới",
          "Thị trường cổ phiếu sẽ liên tục lập đỉnh mới trong ngắn hạn",
        ],
        correctIndex: 1,
        explanation: "Lãi suất ngắn hạn vượt dài hạn phản ánh kỳ vọng ngân hàng trung ương sẽ phải hạ lãi suất, tức là kinh tế được dự báo yếu đi.",
      },
      {
        id: "l7_q2",
        question: "Sharpe Ratio đo lường điều gì trong quản trị danh mục?",
        options: [
          "Lợi nhuận vượt trội trên mỗi đơn vị độ lệch chuẩn của danh mục",
          "Mức lợi nhuận đạt được trên mỗi đồng vốn vay ký quỹ đã sử dụng",
          "Tỷ lệ tổng nợ vay so với tổng tài sản mà danh mục đang nắm giữ",
          "Mức trượt giá bình quân khi khớp các lệnh mua có khối lượng lớn",
        ],
        correctIndex: 0,
        explanation: "Sharpe = (Lợi suất danh mục - Lợi suất phi rủi ro) chia cho độ lệch chuẩn, tức là lợi nhuận tính trên rủi ro tổng thể phải gánh.",
      },
      {
        id: "l7_q3",
        question: "Sortino Ratio cải tiến Sharpe Ratio ở điểm cốt lõi nào?",
        options: [
          "Chỉ tính phần biến động theo chiều giảm vào mẫu số",
          "Loại bỏ hoàn toàn lãi suất phi rủi ro khỏi phần tử số",
          "Chỉ áp dụng được cho danh mục trái phiếu và tín dụng",
          "Đưa thêm biến động của giá vàng vào công thức tính toán",
        ],
        correctIndex: 0,
        explanation: "Sharpe phạt cả biến động tăng lẫn giảm. Sortino chỉ phạt phần đi xuống, hợp lý hơn vì nhà đầu tư không sợ danh mục tăng mạnh.",
      },
      {
        id: "l7_q4",
        question: "Bẫy giá trị trong đầu tư cổ phiếu là hiện tượng gì?",
        options: [
          "Định giá trông rẻ nhưng nội tại doanh nghiệp suy giảm kéo dài",
          "Cổ phiếu tăng giá nhiều lần chỉ trong vòng một năm giao dịch",
          "Doanh nghiệp bị huỷ niêm yết do chia cổ tức ở mức quá cao",
          "Nhà đầu tư mua cổ phiếu chào bán lần đầu ở mức giá quá đắt",
        ],
        correctIndex: 0,
        explanation: "P/E thấp có thể phản ánh thị trường đã định giá đúng một doanh nghiệp đang xấu đi, chứ không phải cơ hội bị bỏ sót.",
      },
      {
        id: "l7_q5",
        question: "FCFE được suy ra từ FCFF bằng cách nào?",
        options: [
          "Trừ lãi vay sau thuế rồi cộng phần vay nợ ròng trong kỳ",
          "Cộng thêm toàn bộ chi đầu tư tài sản cố định phát sinh trong kỳ",
          "Trừ đi doanh thu thuần rồi chia cho số cổ phiếu đang lưu hành",
          "Chia FCFF cho tổng số cổ phiếu lưu hành bình quân trong kỳ",
        ],
        correctIndex: 0,
        explanation: "FCFE là phần còn lại cho cổ đông sau khi đã phục vụ chủ nợ, nên phải trừ lãi sau thuế và cộng lại phần vay ròng mới huy động.",
      },
      {
        id: "l7_q6",
        question: "Thắt chặt định lượng của ngân hàng trung ương thực chất là gì?",
        options: [
          "Thu hẹp bảng cân đối bằng cách để trái phiếu đáo hạn hoặc bán ra",
          "In thêm tiền để mua vào cổ phiếu trên thị trường thứ cấp",
          "Giảm thuế thu nhập doanh nghiệp nhằm kích thích đầu tư tư nhân",
          "Nâng hạn mức tín dụng cho các ngân hàng thương mại trong hệ thống",
        ],
        correctIndex: 0,
        explanation: "Thắt chặt định lượng rút thanh khoản khỏi hệ thống, ngược với nới lỏng định lượng vốn bơm tiền ra bằng cách mua tài sản.",
      },
      {
        id: "l7_q7",
        question: "Chênh lệch tín dụng nới rộng đột ngột thường báo hiệu điều gì?",
        options: [
          "Thị trường đòi hỏi phần bù cao hơn cho rủi ro vỡ nợ",
          "Ngân hàng trung ương vừa quyết định hạ lãi suất điều hành",
          "Doanh nghiệp phát hành vừa được nâng bậc xếp hạng tín nhiệm",
          "Thanh khoản trên thị trường trái phiếu đang được cải thiện rõ rệt",
        ],
        correctIndex: 0,
        explanation: "Chênh lệch tín dụng là giá của rủi ro vỡ nợ. Nó nới rộng khi nhà đầu tư lo ngại, và thường đi trước các đợt suy giảm kinh tế.",
      },
      {
        id: "l7_q8",
        question: "Alpha của một danh mục đo lường điều gì?",
        options: [
          "Phần lợi suất vượt trên mức mà rủi ro hệ thống giải thích được",
          "Tổng lợi suất tuyệt đối danh mục đạt được trong kỳ đánh giá",
          "Mức độ biến động của danh mục so với chỉ số tham chiếu chung",
          "Tỷ trọng của các cổ phiếu vốn hoá lớn có trong danh mục đó",
        ],
        correctIndex: 0,
        explanation: "Beta giải thích phần lợi suất đến từ việc chấp nhận rủi ro thị trường. Alpha là phần còn lại, tức đóng góp thực sự của người quản lý.",
      },
      {
        id: "l7_q9",
        question: "Mô hình tăng trưởng Gordon nhạy cảm nhất với giả định nào?",
        options: [
          "Chênh lệch giữa suất chiết khấu và tốc độ tăng trưởng dài hạn",
          "Mức cổ tức mà doanh nghiệp đã chi trả trong kỳ gần nhất",
          "Số lượng cổ phiếu đang lưu hành tại thời điểm định giá",
          "Tỷ lệ lợi nhuận giữ lại của doanh nghiệp trong năm hiện tại",
        ],
        correctIndex: 0,
        explanation: "Mẫu số là hiệu của hai đại lượng gần nhau, nên khi tốc độ tăng trưởng tiến sát suất chiết khấu, kết quả định giá bùng nổ vô lý.",
      },
      {
        id: "l7_q10",
        question: "Chiến lược phòng hộ delta của một vị thế quyền chọn nhằm mục đích gì?",
        options: [
          "Trung hoà tác động từ biến động nhỏ của giá tài sản cơ sở",
          "Loại bỏ hoàn toàn mọi rủi ro của vị thế cho tới ngày đáo hạn",
          "Tối đa hoá lợi nhuận khi giá tài sản cơ sở biến động thật mạnh",
          "Cố định mức phí quyền chọn phải trả tại thời điểm ký hợp đồng",
        ],
        correctIndex: 0,
        explanation: "Delta chỉ đúng cho thay đổi nhỏ. Khi giá dịch chuyển mạnh, gamma làm delta thay đổi và vị thế phải được cân bằng lại liên tục.",
      },
      {
        id: "l7_q11",
        question: "Doanh nghiệp có ROIC cao hơn WACC trong dài hạn nghĩa là gì?",
        options: [
          "Mỗi đồng vốn đầu tư thêm đều tạo ra giá trị cho chủ sở hữu",
          "Doanh nghiệp đang vay nợ với chi phí thấp hơn mặt bằng thị trường",
          "Doanh nghiệp không cần huy động thêm vốn để tiếp tục mở rộng",
          "Biên lợi nhuận gộp của doanh nghiệp cao hơn trung bình ngành",
        ],
        correctIndex: 0,
        explanation: "Đây là định nghĩa của việc tạo giá trị. Doanh nghiệp có ROIC dưới WACC càng tăng trưởng thì càng phá huỷ giá trị của cổ đông.",
      },
      {
        id: "l7_q12",
        question: "Vì sao dòng tiền từ hoạt động kinh doanh khó bị điều chỉnh hơn lợi nhuận?",
        options: [
          "Vì nó phản ánh tiền thực đã thu và chi, ít chỗ cho ước tính kế toán",
          "Vì nó được kiểm toán độc lập kỹ hơn so với các chỉ tiêu còn lại",
          "Vì chuẩn mực kế toán cấm doanh nghiệp điều chỉnh khoản mục này",
          "Vì nó luôn được công bố trước lợi nhuận trong báo cáo tài chính",
        ],
        correctIndex: 0,
        explanation: "Lợi nhuận chứa nhiều ước tính như dự phòng, khấu hao, thời điểm ghi nhận doanh thu. Tiền vào tài khoản thì khó bịa hơn nhiều.",
      },
    ],
  },

  8: {
    level: 8,
    title: "Bài Thi Bậc Thầy - Cấp 8: Bậc Thầy Tài Chính",
    badgeEmoji: "💎",
    minPassPercentage: 85,
    timeLimitSeconds: 840,
    penaltyXpIfOverdue: 340,
    questions: [
      {
        id: "l8_q1",
        question: "Độ nhạy giá trái phiếu trước thay đổi lãi suất được đo bằng chỉ số nào?",
        options: [
          "Duration, tức thời lượng bình quân của dòng tiền",
          "Lợi suất đáo hạn tính tại thời điểm nhà đầu tư mua trái phiếu",
          "Lãi suất coupon được ấn định trên hợp đồng lúc phát hành",
          "Xếp hạng tín nhiệm do tổ chức đánh giá độc lập công bố",
        ],
        correctIndex: 0,
        explanation: "Duration cho biết giá thay đổi bao nhiêu phần trăm khi lãi suất đổi một điểm phần trăm. Ba lựa chọn còn lại mô tả đặc tính khác của trái phiếu.",
      },
      {
        id: "l8_q2",
        question: "Thương vụ mua lại bằng đòn bẩy có đặc trưng gì?",
        options: [
          "Phần lớn giá mua tài trợ bằng nợ, thế chấp bằng chính tài sản mục tiêu",
          "Quỹ chỉ mua một tỷ lệ nhỏ cổ phần trên sàn giao dịch tập trung",
          "Toàn bộ giá mua được thanh toán bằng tiền mặt của các nhà đầu tư",
          "Chỉ nhắm vào doanh nghiệp công nghệ mới thành lập chưa có doanh thu",
        ],
        correctIndex: 0,
        explanation: "Dòng tiền của chính doanh nghiệp mục tiêu được dùng để trả nợ, nên mục tiêu lý tưởng là doanh nghiệp có dòng tiền ổn định và ít cần đầu tư thêm.",
      },
      {
        id: "l8_q3",
        question: "Rủi ro phi hệ thống có đặc điểm gì?",
        options: [
          "Loại bỏ được phần lớn thông qua việc đa dạng hoá danh mục đầu tư",
          "Không thể loại bỏ dù danh mục nắm giữ bao nhiêu mã cổ phiếu",
          "Bị chi phối chủ yếu bởi chính sách tiền tệ của các nền kinh tế lớn",
          "Tác động đồng thời lên toàn bộ cổ phiếu đang niêm yết trên thị trường",
        ],
        correctIndex: 0,
        explanation: "Rủi ro riêng của doanh nghiệp triệt tiêu lẫn nhau khi danh mục đủ rộng. Ba lựa chọn còn lại đều mô tả rủi ro hệ thống.",
      },
      {
        id: "l8_q4",
        question: "Trong hợp đồng hoán đổi lãi suất, hai bên trao đổi điều gì?",
        options: [
          "Dòng tiền lãi cố định đổi lấy dòng tiền lãi thả nổi",
          "Quyền sở hữu cổ phần tại hai doanh nghiệp khác nhau",
          "Trái phiếu chính phủ đổi lấy vàng vật chất theo giá thị trường",
          "Nghĩa vụ trả nợ gốc của hai khoản vay có cùng kỳ hạn còn lại",
        ],
        correctIndex: 0,
        explanation: "Chỉ dòng tiền lãi được hoán đổi, nợ gốc vẫn ở nguyên chỗ cũ. Đây là công cụ chuyển đổi cấu trúc lãi suất mà không phải tái cấu trúc khoản vay.",
      },
      {
        id: "l8_q5",
        question: "Con hào kinh tế của một doanh nghiệp là gì?",
        options: [
          "Lợi thế cạnh tranh bền vững ngăn đối thủ bào mòn biên lợi nhuận",
          "Lượng tiền mặt lớn giúp doanh nghiệp vượt qua giai đoạn khó khăn",
          "Tỷ lệ nợ vay ngắn hạn thấp hơn nhiều so với trung bình toàn ngành",
          "Danh mục bằng sáng chế sắp hết hạn bảo hộ trong vài năm tới",
        ],
        correctIndex: 0,
        explanation: "Hào có thể đến từ thương hiệu, hiệu ứng mạng lưới, chi phí chuyển đổi hoặc lợi thế chi phí. Điểm chung là nó bền, không phải một lợi thế nhất thời.",
      },
      {
        id: "l8_q6",
        question: "Beta điều chỉnh theo Blume nhằm mục đích gì?",
        options: [
          "Kéo beta lịch sử về gần mức trung bình thị trường là một",
          "Nhân đôi hệ số beta để phản ánh rủi ro một cách thận trọng hơn",
          "Triệt tiêu hoàn toàn ảnh hưởng của beta khỏi mô hình định giá",
          "Ước lượng chi phí nợ vay thay cho chi phí vốn chủ sở hữu",
        ],
        correctIndex: 0,
        explanation: "Beta của doanh nghiệp có xu hướng tiến dần về một theo thời gian, nên beta lịch sử thuần tuý thường phóng đại độ lệch so với thị trường.",
      },
      {
        id: "l8_q7",
        question: "Giá trị doanh nghiệp được tính theo công thức nào?",
        options: [
          "Vốn hoá thị trường cộng tổng nợ vay rồi trừ đi tiền mặt",
          "Vốn hoá thị trường trừ đi toàn bộ nợ vay đang có trên bảng cân đối",
          "Doanh thu thuần trong kỳ nhân với hệ số giá trên lợi nhuận",
          "Vốn chủ sở hữu cộng với giá trị hàng tồn kho cuối kỳ",
        ],
        correctIndex: 0,
        explanation: "Đây là số tiền thực để mua đứt doanh nghiệp: trả cho cổ đông, gánh nợ thay, nhưng nhận lại tiền mặt sẵn có trên bảng cân đối.",
      },
      {
        id: "l8_q8",
        question: "Convexity bổ sung điều gì mà Duration không nắm bắt được?",
        options: [
          "Quan hệ giữa giá và lãi suất là đường cong chứ không phải đường thẳng",
          "Xác suất tổ chức phát hành mất khả năng thanh toán khi lãi suất tăng",
          "Ảnh hưởng của lạm phát kỳ vọng lên lợi suất thực của trái phiếu",
          "Mức chênh lệch giữa giá chào mua và giá chào bán trên thị trường",
        ],
        correctIndex: 0,
        explanation: "Duration là xấp xỉ tuyến tính nên sai số lớn dần khi lãi suất biến động mạnh. Convexity là số hạng bậc hai bù lại phần sai số đó.",
      },
      {
        id: "l8_q9",
        question: "Trong LBO, nguồn tạo ra lợi nhuận nào KHÔNG phụ thuộc vào cải thiện hoạt động?",
        options: [
          "Trả bớt nợ bằng dòng tiền, làm phần vốn chủ lớn dần lên",
          "Cắt giảm chi phí vận hành và tinh gọn lại bộ máy quản lý",
          "Mở rộng doanh thu sang thị trường và nhóm khách hàng mới",
          "Cải thiện biên lợi nhuận gộp nhờ đàm phán lại với nhà cung cấp",
        ],
        correctIndex: 0,
        explanation: "Trả nợ chuyển giá trị từ chủ nợ sang chủ sở hữu mà không cần doanh nghiệp tốt lên. Ba lựa chọn còn lại đều đòi hỏi vận hành thực sự cải thiện.",
      },
      {
        id: "l8_q10",
        question: "Chi phí chìm nên được xử lý thế nào khi ra quyết định đầu tư?",
        options: [
          "Bỏ qua hoàn toàn vì nó không thay đổi theo quyết định sắp tới",
          "Cộng vào tổng vốn đầu tư để tính đúng tỷ suất sinh lời của dự án",
          "Phân bổ đều cho các năm còn lại trong vòng đời của dự án",
          "Trừ khỏi dòng tiền năm đầu tiên khi lập bảng thẩm định dự án",
        ],
        correctIndex: 0,
        explanation: "Tiền đã tiêu không lấy lại được dù chọn phương án nào, nên nó không thuộc về phép so sánh. Đưa nó vào là mắc bẫy chi phí chìm.",
      },
      {
        id: "l8_q11",
        question: "Hợp đồng tương lai khác hợp đồng kỳ hạn ở điểm nào?",
        options: [
          "Hợp đồng tương lai chuẩn hoá, niêm yết và thanh toán bù trừ hằng ngày",
          "Hợp đồng tương lai không yêu cầu bên tham gia phải ký quỹ ban đầu",
          "Hợp đồng kỳ hạn luôn có thanh khoản cao hơn trên thị trường thứ cấp",
          "Hợp đồng kỳ hạn được bảo đảm bởi trung tâm thanh toán bù trừ",
        ],
        correctIndex: 0,
        explanation: "Thanh toán bù trừ hằng ngày và trung tâm bù trừ đứng giữa làm rủi ro đối tác gần như biến mất - cái giá là mất tính linh hoạt trong điều khoản.",
      },
      {
        id: "l8_q12",
        question: "Vì sao dùng bội số của doanh nghiệp cùng ngành để định giá có hạn chế?",
        options: [
          "Nó giả định thị trường đang định giá đúng nhóm doanh nghiệp so sánh",
          "Nó đòi hỏi phải dự phóng dòng tiền chi tiết cho ít nhất năm năm tới",
          "Nó chỉ áp dụng được cho doanh nghiệp chưa niêm yết trên thị trường",
          "Nó không tính tới quy mô doanh thu của doanh nghiệp được định giá",
        ],
        correctIndex: 0,
        explanation: "Định giá tương đối cho biết doanh nghiệp rẻ hay đắt so với nhóm cùng ngành, không cho biết cả nhóm đó có đang bị định giá sai hay không.",
      },
      {
        id: "l8_q13",
        question: "Lá chắn thuế từ lãi vay tạo ra giá trị bằng cách nào?",
        options: [
          "Lãi vay được trừ khi tính thuế nên doanh nghiệp nộp thuế ít đi",
          "Lãi vay làm giảm lợi nhuận kế toán nên cổ đông đòi hỏi ít cổ tức hơn",
          "Nợ vay có chi phí danh nghĩa luôn thấp hơn chi phí vốn chủ sở hữu",
          "Chủ nợ chịu một phần rủi ro kinh doanh thay cho các cổ đông hiện hữu",
        ],
        correctIndex: 0,
        explanation: "Giá trị đến từ khoản thuế tiết kiệm được, không phải từ việc nợ rẻ hơn vốn chủ. Lợi ích này bị giới hạn bởi chi phí kiệt quệ tài chính khi vay quá nhiều.",
      },
    ],
  },

  9: {
    level: 9,
    title: "Bài Thi CFA - Cấp 9: Chuyên Viên CFA",
    badgeEmoji: "🎓",
    minPassPercentage: 85,
    timeLimitSeconds: 900,
    penaltyXpIfOverdue: 400,
    questions: [
      {
        id: "l9_q1",
        question: "Chuẩn mực Fair Dealing trong bộ quy tắc đạo đức CFA quy định điều gì?",
        options: [
          "Đối xử công bằng với mọi khách hàng khi đưa ra khuyến nghị đầu tư",
          "Ưu tiên thực hiện lệnh của nhóm khách hàng có tài sản lớn nhất",
          "Ưu tiên lệnh cá nhân của nhà phân tích trước lệnh của khách hàng",
          "Áp dụng mức phí quản lý ưu đãi cho người thân trong gia đình",
        ],
        correctIndex: 0,
        explanation: "Công bằng không có nghĩa là đồng nhất: được phép phân nhóm dịch vụ, nhưng không được để một nhóm hưởng lợi trước từ cùng một khuyến nghị.",
      },
      {
        id: "l9_q2",
        question: "Thị trường hiệu quả dạng bán mạnh khẳng định giá đã phản ánh những gì?",
        options: [
          "Toàn bộ dữ liệu quá khứ và mọi thông tin đã công bố công khai",
          "Chỉ riêng dữ liệu giá và khối lượng giao dịch trong quá khứ",
          "Mọi thông tin kể cả thông tin nội bộ chưa được công bố ra ngoài",
          "Không phản ánh bất kỳ loại thông tin nào một cách đáng tin cậy",
        ],
        correctIndex: 0,
        explanation: "Hệ quả thực tiễn: phân tích cơ bản dựa trên thông tin công khai khó tạo lợi thế bền vững, nhưng thông tin nội bộ thì vẫn còn giá trị."
      },
      {
        id: "l9_q3",
        question: "Biến số nào chi phối mạnh nhất giá quyền chọn trong mô hình Black-Scholes?",
        options: [
          "Độ biến động của tài sản cơ sở trong thời gian còn lại",
          "Số lượng cổ đông hiện hữu của doanh nghiệp phát hành cổ phiếu",
          "Mức lạm phát mục tiêu mà ngân hàng trung ương đang theo đuổi",
          "Doanh thu thuần mà doanh nghiệp ghi nhận trong quý gần nhất",
        ],
        correctIndex: 0,
        explanation: "Biến động là biến duy nhất trong mô hình không quan sát trực tiếp được, nên nó vừa quan trọng nhất vừa là nguồn tranh cãi lớn nhất."
      },
      {
        id: "l9_q4",
        question: "VaR một ngày ở mức 10 triệu đô với độ tin cậy 95% nghĩa là gì?",
        options: [
          "Có 5% số ngày khoản lỗ sẽ vượt quá mức 10 triệu đô la",
          "Khoản lỗ tối đa của danh mục trong một ngày là 10 triệu đô la",
          "Danh mục chắc chắn sinh lời 10 triệu đô trong 95% số ngày còn lại",
          "Có 95% xác suất khoản lỗ rơi đúng vào mức 10 triệu đô la",
        ],
        correctIndex: 0,
        explanation: "VaR là ngưỡng chứ không phải mức trần. Nó hoàn toàn không nói gì về việc khi vượt ngưỡng thì lỗ sâu tới đâu - đó là việc của Expected Shortfall."
      },
      {
        id: "l9_q5",
        question: "Giao dịch chênh lệch giá cash and carry thu lợi nhuận từ đâu?",
        options: [
          "Lệch giá tạm thời giữa thị trường giao ngay và hợp đồng tương lai",
          "Dự đoán chính xác hướng đi của thị trường trong ngắn hạn sắp tới",
          "Nắm giữ cổ phiếu tăng trưởng trong khoảng thời gian đủ dài",
          "Mua vào cổ phiếu ngay trước ngày chốt quyền nhận cổ tức tiền mặt",
        ],
        correctIndex: 0,
        explanation: "Mua giao ngay và bán hợp đồng tương lai cùng lúc khoá lại khoản chênh, nên lợi nhuận không phụ thuộc vào hướng đi của giá."
      },
      {
        id: "l9_q6",
        question: "Beta không đòn bẩy loại bỏ ảnh hưởng của yếu tố nào?",
        options: [
          "Cấu trúc nợ vay trong nguồn vốn của doanh nghiệp",
          "Biên lợi nhuận gộp mà doanh nghiệp đạt được trong kỳ báo cáo",
          "Mặt bằng lãi suất cho vay của hệ thống ngân hàng thương mại",
          "Quy mô nhân sự và cơ cấu tổ chức của doanh nghiệp được xét",
        ],
        correctIndex: 0,
        explanation: "Bỏ đòn bẩy ra để còn lại rủi ro kinh doanh thuần tuý, nhờ đó so được beta giữa các doanh nghiệp có cấu trúc vốn rất khác nhau."
      },
      {
        id: "l9_q7",
        question: "Thị trường hàng hoá ở trạng thái contango nghĩa là gì?",
        options: [
          "Giá hợp đồng tương lai cao hơn giá giao ngay hiện tại",
          "Giá hợp đồng tương lai thấp hơn giá giao ngay hiện tại",
          "Giá hợp đồng tương lai và giá giao ngay bằng nhau tuyệt đối",
          "Thị trường tạm ngừng giao dịch do biến động giá quá lớn",
        ],
        correctIndex: 0,
        explanation: "Contango phản ánh chi phí lưu kho và chi phí vốn khi giữ hàng. Quỹ đầu tư hàng hoá bị bào mòn lợi nhuận khi phải đảo hợp đồng trong trạng thái này."
      },
      {
        id: "l9_q8",
        question: "Chuẩn mực về Thông tin trọng yếu chưa công bố yêu cầu người nắm giữ làm gì?",
        options: [
          "Không giao dịch và không mách nước cho người khác giao dịch",
          "Được phép giao dịch nếu đã báo cáo trước với bộ phận tuân thủ",
          "Được phép giao dịch sau khi đã nắm giữ thông tin quá bảy ngày",
          "Chỉ cần công bố khoản đầu tư cá nhân trong báo cáo cuối năm",
        ],
        correctIndex: 0,
        explanation: "Mách nước cũng vi phạm ngang với tự giao dịch. Cách xử lý đúng là khuyến khích tổ chức công bố thông tin ra thị trường."
      },
      {
        id: "l9_q9",
        question: "Thước đo hiệu quả nào phù hợp khi danh mục chỉ là một phần trong tổng tài sản của nhà đầu tư?",
        options: [
          "Treynor Ratio, vì nó chia cho beta thay vì cho độ lệch chuẩn",
          "Sharpe Ratio, vì nó tính trên toàn bộ rủi ro tổng thể của danh mục",
          "Tỷ suất sinh lời tuyệt đối đạt được trong kỳ đánh giá vừa qua",
          "Mức sụt giảm tối đa mà danh mục từng trải qua trong lịch sử",
        ],
        correctIndex: 0,
        explanation: "Khi danh mục chỉ là một phần, rủi ro riêng đã được đa dạng hoá ở cấp tổng thể, nên chỉ phần rủi ro hệ thống là đáng tính - tức beta."
      },
      {
        id: "l9_q10",
        question: "Đường biên hiệu quả trong lý thuyết danh mục biểu diễn điều gì?",
        options: [
          "Tập danh mục cho lợi suất cao nhất ứng với từng mức rủi ro",
          "Tập danh mục có mức rủi ro thấp nhất mà nhà đầu tư chấp nhận được",
          "Đường thể hiện quan hệ giữa lãi suất phi rủi ro và thời gian nắm giữ",
          "Ranh giới giữa các danh mục cổ phiếu và các danh mục trái phiếu",
        ],
        correctIndex: 0,
        explanation: "Mọi danh mục nằm dưới đường biên đều bị chi phối: luôn tồn tại một danh mục khác cho lợi suất cao hơn ở cùng mức rủi ro."
      },
      {
        id: "l9_q11",
        question: "Trong GIPS, yêu cầu về danh mục hợp thành nhằm ngăn hành vi nào?",
        options: [
          "Chỉ trình bày những danh mục có kết quả tốt và giấu phần còn lại",
          "Tính phí quản lý cao hơn mức đã cam kết trong hợp đồng với khách",
          "Thay đổi chiến lược đầu tư mà không thông báo trước cho khách hàng",
          "Sử dụng đòn bẩy vượt quá giới hạn cho phép trong bản cáo bạch quỹ",
        ],
        correctIndex: 0,
        explanation: "Mọi danh mục cùng chiến lược phải nằm trong cùng một nhóm hợp thành, nên tổ chức không thể chọn lọc kết quả đẹp để trưng ra."
      },
      {
        id: "l9_q12",
        question: "Quyền chọn kiểu Mỹ có giá không thấp hơn quyền chọn kiểu Âu cùng điều kiện vì sao?",
        options: [
          "Vì nó cho thêm quyền thực hiện sớm mà không kèm nghĩa vụ nào",
          "Vì nó luôn có thời gian đáo hạn dài hơn quyền chọn kiểu Âu",
          "Vì nó được giao dịch trên các thị trường có thanh khoản cao hơn",
          "Vì nó không yêu cầu người mua phải ký quỹ ban đầu khi mở vị thế",
        ],
        correctIndex: 0,
        explanation: "Thêm quyền mà không thêm nghĩa vụ thì giá trị không thể giảm. Với quyền chọn mua trên tài sản không trả cổ tức, quyền đó lại hiếm khi đáng dùng."
      },
      {
        id: "l9_q13",
        question: "Quy tắc suitability yêu cầu nhà tư vấn làm gì trước khi khuyến nghị đầu tư?",
        options: [
          "Tìm hiểu tình hình tài chính, mục tiêu và khẩu vị rủi ro của khách",
          "Đưa ra khuyến nghị giống nhau cho mọi khách hàng để bảo đảm công bằng",
          "Ưu tiên các sản phẩm do chính tổ chức của mình phát hành ra thị trường",
          "Bảo đảm khoản đầu tư sinh lời cao hơn lãi suất tiền gửi ngân hàng",
        ],
        correctIndex: 0,
        explanation: "Một khuyến nghị hợp lý với người này có thể hoàn toàn không hợp với người khác, nên hồ sơ khách hàng phải có trước khuyến nghị chứ không phải sau."
      },
    ],
  },

  10: {
    level: 10,
    title: "Bài Thi Huyền Thoại - Cấp 10: Huyền Thoại Đầu Tư",
    badgeEmoji: "🦁",
    minPassPercentage: 85,
    timeLimitSeconds: 960,
    penaltyXpIfOverdue: 500,
    questions: [
      {
        id: "l10_q1",
        question: "Chiến lược đầu tư theo Mô hình Factor Investing (Fama-French 3-Factor Model) bổ sung 2 yếu tố nào ngoài Thị trường?",
        options: [
          "Quy mô doanh nghiệp và mức định giá so với giá trị sổ sách",
          "Tỷ lệ lạm phát kỳ vọng và biến động của tỷ giá hối đoái",
          "Giá dầu thô thế giới và giá vàng trên thị trường quốc tế",
          "Tỷ suất cổ tức chi trả và mặt bằng lãi suất điều hành",
        ],
        correctIndex: 0,
        explanation: "Fama-French bổ sung yếu tố quy mô và yếu tố giá trị vào phần bù rủi ro thị trường của mô hình một nhân tố ban đầu.",
      },
      {
        id: "l10_q2",
        question: "Hợp đồng hoán đổi rủi ro tín dụng hoạt động tương tự sản phẩm nào?",
        options: [
          "Một hợp đồng bảo hiểm cho rủi ro vỡ nợ của trái phiếu",
          "Một khoản vay thế chấp bằng chính bất động sản đang sở hữu",
          "Cổ phiếu ưu đãi được hưởng mức cổ tức cố định hằng năm",
          "Khoản tiền gửi tiết kiệm có kỳ hạn tại ngân hàng thương mại",
        ],
        correctIndex: 0,
        explanation: "Bên mua trả phí định kỳ và được đền bù nếu tổ chức phát hành vỡ nợ. Khác bảo hiểm ở chỗ người mua không cần sở hữu trái phiếu đó.",
      },
      {
        id: "l10_q3",
        question: "Biến cố thiên nga đen theo Nassim Taleb có đặc điểm gì?",
        options: [
          "Rất hiếm, tác động cực lớn, và chỉ nghe hợp lý sau khi đã xảy ra",
          "Có thể dự báo được chính xác theo một chu kỳ lặp lại đều đặn",
          "Chỉ xảy ra tại các nền kinh tế mới nổi và đang phát triển",
          "Gây biến động giá mạnh nhưng không tạo ra rủi ro tài chính thật",
        ],
        correctIndex: 0,
        explanation: "Yếu tố thứ ba mới là điểm sắc bén: sau biến cố, ai cũng dựng được một câu chuyện khiến nó có vẻ tất yếu, và điều đó che mất việc ta đã không lường trước.",
      },
      {
        id: "l10_q4",
        question: "Đường biên hiệu quả Markowitz đại diện cho tập danh mục nào?",
        options: [
          "Danh mục cho lợi suất cao nhất ứng với mỗi mức rủi ro xác định",
          "Danh mục phân bổ toàn bộ vào cổ phiếu có mức rủi ro cao nhất",
          "Danh mục chỉ nắm giữ tiền mặt và các tài sản phi rủi ro khác",
          "Danh mục có tỷ trọng bằng nhau giữa tất cả các loại tài sản",
        ],
        correctIndex: 0,
        explanation: "Mọi danh mục nằm dưới đường biên đều bị chi phối: luôn có một danh mục khác cho lợi suất cao hơn ở cùng mức rủi ro.",
      },
      {
        id: "l10_q5",
        question: "Giao dịch chênh lệch lãi suất tiền tệ là chiến lược gì?",
        options: [
          "Vay đồng tiền lãi suất thấp để đầu tư vào đồng tiền lãi suất cao",
          "Mua bán vàng vật chất giữa các thị trường ở những quốc gia khác nhau",
          "Vay ngắn hạn để đầu tư vào bất động sản có dòng tiền cho thuê",
          "Chuyển tiền kiều hối về nước qua các kênh chính thức của ngân hàng",
        ],
        correctIndex: 0,
        explanation: "Lợi nhuận đến từ chênh lệch lãi suất, và rủi ro nằm ở tỷ giá: một cú biến động tỷ giá có thể xoá sạch nhiều năm chênh lệch tích luỹ.",
      },
      {
        id: "l10_q6",
        question: "Treynor Ratio khác Sharpe Ratio ở mẫu số như thế nào?",
        options: [
          "Dùng beta thay cho độ lệch chuẩn của toàn bộ danh mục đầu tư",
          "Dùng doanh thu của danh mục thay cho phần lợi nhuận đạt được",
          "Bỏ hoàn toàn phần rủi ro ra khỏi công thức tính toán hiệu quả",
          "Chỉ tính riêng phần cổ tức nhận được trong kỳ đánh giá hiệu quả",
        ],
        correctIndex: 0,
        explanation: "Sharpe tính trên rủi ro tổng thể, Treynor chỉ tính trên rủi ro hệ thống - nên Treynor phù hợp khi danh mục là một phần của tổng tài sản."
      },
      {
        id: "l10_q7",
        question: "Phân kỳ âm của RSI cảnh báo điều gì?",
        options: [
          "Giá lập đỉnh mới nhưng động lượng suy yếu dần phía sau",
          "Giá sắp bước vào một nhịp tăng mạnh và dứt khoát hơn trước",
          "Xu hướng tăng hiện tại đang được củng cố và sẽ tiếp diễn lâu dài",
          "Thị trường sẽ đi ngang trong một biên độ hẹp suốt thời gian dài",
        ],
        correctIndex: 0,
        explanation: "Phân kỳ là tín hiệu cảnh báo chứ không phải tín hiệu vào lệnh: động lượng có thể suy yếu rất lâu trước khi giá thực sự đảo chiều.",
      },
      {
        id: "l10_q8",
        question: "Mô hình ba nhân tố Fama-French thách thức CAPM ở điểm nào?",
        options: [
          "Beta một mình không giải thích hết chênh lệch lợi suất giữa các cổ phiếu",
          "Lợi suất phi rủi ro không tồn tại trên thực tế nên mô hình vô nghĩa",
          "Nhà đầu tư trên thực tế không hề quan tâm tới rủi ro khi ra quyết định",
          "Thị trường luôn hiệu quả nên mọi mô hình định giá đều cho kết quả như nhau",
        ],
        correctIndex: 0,
        explanation: "Dữ liệu thực nghiệm cho thấy cổ phiếu quy mô nhỏ và cổ phiếu giá trị sinh lời cao hơn mức beta dự báo, nên cần thêm nhân tố."
      },
      {
        id: "l10_q9",
        question: "Rủi ro thanh khoản của một danh mục thể hiện rõ nhất ở đâu?",
        options: [
          "Chi phí và thời gian phải chấp nhận để thoát vị thế khi cần bán gấp",
          "Mức biến động giá hằng ngày của các tài sản đang có trong danh mục",
          "Tỷ trọng tiền mặt mà danh mục duy trì tại thời điểm cuối mỗi tháng",
          "Số lượng mã tài sản khác nhau mà danh mục đang phân bổ vốn vào",
        ],
        correctIndex: 0,
        explanation: "Tài sản có thể được định giá rất cao trên sổ sách mà vẫn không bán được ở mức giá đó, và khoảng cách ấy chỉ lộ ra đúng lúc thị trường căng."
      },
      {
        id: "l10_q10",
        question: "Vì sao lợi suất bình quân hình học thấp hơn bình quân số học?",
        options: [
          "Vì biến động làm hao hụt giá trị tích luỹ qua nhiều kỳ liên tiếp",
          "Vì bình quân hình học đã trừ đi phần chi phí giao dịch phát sinh",
          "Vì bình quân số học tính cả phần cổ tức còn hình học thì không tính",
          "Vì bình quân hình học chỉ dùng cho các kỳ có lợi suất dương",
        ],
        correctIndex: 0,
        explanation: "Lỗ 50% rồi lãi 50% cho bình quân số học bằng 0 nhưng thực tế mất 25%. Càng biến động thì khoảng cách giữa hai con số càng rộng."
      },
      {
        id: "l10_q11",
        question: "Chiến lược phòng hộ bằng quyền chọn bán bảo vệ có đặc điểm gì?",
        options: [
          "Giới hạn mức lỗ tối đa nhưng phải trả phí quyền chọn ngay từ đầu",
          "Loại bỏ hoàn toàn rủi ro mà không tốn bất kỳ khoản chi phí nào",
          "Tăng lợi nhuận khi thị trường đi lên nhờ đòn bẩy của quyền chọn",
          "Chuyển toàn bộ rủi ro sang bên bán mà không giới hạn phần lợi nhuận",
        ],
        correctIndex: 0,
        explanation: "Đây là bảo hiểm danh mục: phí quyền chọn là chi phí bảo hiểm, và nó bào mòn lợi suất trong những giai đoạn thị trường không sụt giảm."
      },
      {
        id: "l10_q12",
        question: "Thiên kiến sống sót ảnh hưởng thế nào tới thống kê hiệu suất quỹ đầu tư?",
        options: [
          "Làm hiệu suất trung bình đẹp hơn thực tế vì quỹ kém đã biến mất",
          "Làm hiệu suất trung bình xấu đi vì các quỹ tốt thường đóng sớm hơn",
          "Không ảnh hưởng gì nếu mẫu thống kê có đủ số lượng quỹ tham gia",
          "Chỉ ảnh hưởng tới quỹ đầu tư mạo hiểm chứ không tới quỹ mở thông thường",
        ],
        correctIndex: 0,
        explanation: "Quỹ hoạt động kém bị đóng hoặc sáp nhập và rời khỏi cơ sở dữ liệu, nên mẫu còn lại chỉ gồm bên sống sót - chênh lệch thường trên một điểm phần trăm mỗi năm."
      },
      {
        id: "l10_q13",
        question: "Chi phí giao dịch ẩn lớn nhất với lệnh khối lượng lớn là gì?",
        options: [
          "Tác động giá do chính lệnh của mình đẩy thị trường đi ngược lại",
          "Phí môi giới mà công ty chứng khoán thu trên mỗi lần khớp lệnh",
          "Thuế thu nhập phải nộp trên phần lãi vốn thu được khi bán ra",
          "Chi phí lưu ký chứng khoán tính theo giá trị tài sản đang nắm giữ",
        ],
        correctIndex: 0,
        explanation: "Phí và thuế đều nhìn thấy được trên sao kê. Tác động giá không xuất hiện ở đâu cả nhưng thường lớn hơn cả hai với quỹ có quy mô lớn."
      },
      {
        id: "l10_q14",
        question: "Vì sao tái cân bằng danh mục có thể tạo ra lợi suất tăng thêm?",
        options: [
          "Vì nó buộc bán bớt tài sản đã tăng và mua thêm tài sản đã giảm",
          "Vì nó làm giảm tổng chi phí giao dịch phát sinh trong suốt cả năm",
          "Vì nó cho phép danh mục luôn bám sát chỉ số tham chiếu đã chọn",
          "Vì nó giúp nhà đầu tư tránh phải nộp thuế trên phần lãi vốn đã thực hiện",
        ],
        correctIndex: 0,
        explanation: "Hiệu ứng này chỉ xuất hiện khi các tài sản có xu hướng quay về mức trung bình. Với tài sản có xu hướng kéo dài, tái cân bằng lại làm giảm lợi suất."
      },
    ],
  },
};

// Cấp 11 và 12 có đề riêng ngay dưới đây. Cấp 13-15 vẫn dùng chung bộ câu
// hỏi sinh bằng vòng lặp - đó là hiện trạng cần sửa tiếp, không phải thiết kế:
// ba cấp cuối hiện phát cho người thi đúng cùng một đề, chỉ khác tiêu đề.
LEVEL_EXAMS[11] = {
  level: 11,
  title: "Bài Thi Giám Đốc Quỹ Hedge Fund (Level 11)",
  badgeEmoji: "🏛️",
  minPassPercentage: 90,
  timeLimitSeconds: 1020,
  penaltyXpIfOverdue: 780,
  questions: [
    {
      id: "l11_q1",
      question: "Chiến lược market neutral duy trì trạng thái danh mục thế nào?",
      options: [
        "Cân bằng vị thế mua và bán để đưa beta danh mục về gần bằng không",
        "Chỉ nắm giữ vị thế mua với tỷ trọng toàn bộ vốn của quỹ",
        "Chỉ giao dịch hợp đồng phái sinh trên vàng và kim loại quý",
        "Giữ toàn bộ tài sản bằng tiền mặt và không mở vị thế nào",
      ],
      correctIndex: 0,
      explanation: "Triệt tiêu beta để lợi nhuận chỉ còn đến từ chênh lệch giữa mã mua và mã bán, tức từ kỹ năng chọn lọc chứ không phải từ hướng thị trường.",
    },
    {
      id: "l11_q2",
      question: "Mô hình Black-Litterman cải tiến lý thuyết danh mục hiện đại bằng cách nào?",
      options: [
        "Kết hợp phân bổ cân bằng của thị trường với quan điểm riêng của nhà quản lý",
        "Loại bỏ hoàn toàn yếu tố rủi ro ra khỏi bài toán tối ưu hoá danh mục đầu tư",
        "Chỉ áp dụng được cho danh mục gồm các loại tiền mã hoá",
        "Luôn phân bổ toàn bộ vốn vào trái phiếu chính phủ dài hạn",
      ],
      correctIndex: 0,
      explanation: "Markowitz thuần tuý cực nhạy với lợi suất kỳ vọng đầu vào, cho ra tỷ trọng cực đoan. Neo vào phân bổ cân bằng thị trường làm kết quả ổn định hơn nhiều.",
    },
    {
      id: "l11_q3",
      question: "Kiểm soát đường cong lợi suất của ngân hàng trung ương là gì?",
      options: [
        "Mua bán trái phiếu để ghim lợi suất kỳ hạn mục tiêu ở một mức định trước",
        "Tăng thuế đánh vào tài sản nhằm hạ nhiệt thị trường bất động sản",
        "Cấm giao dịch cổ phiếu ngành ngân hàng trong giai đoạn biến động",
        "Ấn định giá vàng trong nước theo một mức cố định do nhà nước công bố",
      ],
      correctIndex: 0,
      explanation: "Khác với nới lỏng định lượng vốn ấn định khối lượng mua, kiểm soát đường cong ấn định mức giá và mua bao nhiêu tuỳ thị trường đòi hỏi.",
    },
    {
      id: "l11_q4",
      question: "Jensen's Alpha dương nói lên điều gì về nhà quản lý quỹ?",
      options: [
        "Quỹ sinh lời vượt mức mà rủi ro hệ thống của nó giải thích được",
        "Quỹ đang thua lỗ nếu so sánh với chỉ số tham chiếu của thị trường",
        "Quỹ đang sử dụng đòn bẩy vượt quá giới hạn cho phép trong quy chế",
        "Quỹ không thu bất kỳ khoản phí quản lý nào từ nhà đầu tư góp vốn",
      ],
      correctIndex: 0,
      explanation: "Alpha là phần còn lại sau khi trừ đi lợi suất đáng ra có được chỉ nhờ chấp nhận rủi ro thị trường, nên nó là thước đo kỹ năng thật.",
    },
    {
      id: "l11_q5",
      question: "Giao dịch tần suất cao khai thác lợi thế nào?",
      options: [
        "Tốc độ khớp lệnh tính bằng phần triệu giây và thuật toán tự động",
        "Phân tích cơ bản chuyên sâu về doanh nghiệp trong nhiều năm liền",
        "Đọc và tổng hợp tin tức tài chính công bố hằng ngày trên báo chí",
        "Vẽ và phân tích thủ công các mẫu hình nến trên đồ thị kỹ thuật",
      ],
      correctIndex: 0,
      explanation: "Lợi thế là hạ tầng chứ không phải nhận định: đặt máy chủ sát sàn, đường truyền riêng, và thuật toán phản ứng trước khi người kịp nhìn thấy giá.",
    },
    {
      id: "l11_q6",
      question: "Chiến lược global macro tập trung vào điều gì?",
      options: [
        "Dự báo biến động vĩ mô toàn cầu để giao dịch trên nhiều lớp tài sản",
        "Chỉ mua cổ phiếu của các doanh nghiệp bán lẻ trong thị trường nội địa",
        "Phân tích thật sâu báo cáo tài chính của đúng một doanh nghiệp",
        "Giao dịch ngắn hạn các cổ phiếu có thị giá rất thấp trên sàn",
      ],
      correctIndex: 0,
      explanation: "Lãi suất, tỷ giá, hàng hoá và chính trị đều là biến số, và quỹ thể hiện quan điểm qua bất kỳ công cụ nào phản ánh nó rẻ nhất.",
    },
    {
      id: "l11_q7",
      question: "Maximum Drawdown đo lường điều gì?",
      options: [
        "Mức sụt giảm sâu nhất từ đỉnh xuống đáy trong một giai đoạn",
        "Mức lợi nhuận cao nhất mà quỹ từng đạt được trong lịch sử hoạt động",
        "Số lượng nhà đầu tư đã rút vốn khỏi quỹ trong kỳ báo cáo gần nhất",
        "Tổng chi phí vận hành mà quỹ phải chi trả trong một năm tài chính",
      ],
      correctIndex: 0,
      explanation: "Đây là thước đo nỗi đau thực tế: nó trả lời câu hỏi người mua đúng đỉnh đã phải chịu đựng tới mức nào trước khi hồi lại.",
    },
    {
      id: "l11_q8",
      question: "Tổng vị thế và vị thế ròng của quỹ long/short khác nhau thế nào?",
      options: [
        "Tổng cộng cả hai chiều, còn ròng là hiệu số giữa vị thế mua và bán",
        "Tổng tính theo giá thị trường còn ròng tính theo giá vốn ban đầu",
        "Tổng chỉ gồm vị thế mua còn ròng chỉ gồm các vị thế bán khống",
        "Hai đại lượng luôn bằng nhau với quỹ có sử dụng đòn bẩy tài chính",
      ],
      correctIndex: 0,
      explanation: "Vị thế ròng cho biết mức phơi nhiễm với hướng thị trường; tổng vị thế cho biết quy mô đòn bẩy thật. Một quỹ ròng bằng không vẫn có thể rất rủi ro.",
    },
    {
      id: "l11_q9",
      question: "Rủi ro lớn nhất của chiến lược giao dịch theo cặp là gì?",
      options: [
        "Mối quan hệ lịch sử giữa hai mã có thể đứt gãy vĩnh viễn",
        "Chi phí giao dịch tăng lên do phải mở cùng lúc hai vị thế đối ứng",
        "Lợi nhuận bị giới hạn ở mức chênh lệch giữa hai mã tại lúc mở vị thế",
        "Không thể áp dụng cho các cổ phiếu niêm yết trên cùng một sàn",
      ],
      correctIndex: 0,
      explanation: "Chiến lược đặt cược vào việc chênh lệch sẽ thu hẹp lại. Khi một trong hai doanh nghiệp thay đổi về bản chất, chênh lệch có thể giãn ra mãi mãi.",
    },
    {
      id: "l11_q10",
      question: "Điều khoản mốc cao nhất trong cơ cấu phí quỹ có tác dụng gì?",
      options: [
        "Ngăn quỹ thu phí hiệu quả hai lần trên cùng một phần lợi nhuận",
        "Bảo đảm nhà đầu tư luôn nhận được mức lợi suất tối thiểu đã cam kết",
        "Giới hạn tổng mức phí quản lý mà quỹ được thu trong một năm",
        "Cho phép nhà quản lý rút vốn góp của mình trước các nhà đầu tư khác",
      ],
      correctIndex: 0,
      explanation: "Sau một năm lỗ, quỹ phải leo lại về đỉnh cũ rồi mới được tính phí hiệu quả tiếp, nếu không nhà đầu tư trả phí cho cùng một khoản lãi hai lần.",
    },
    {
      id: "l11_q11",
      question: "Vì sao chiến lược thành công thường bị giới hạn về quy mô vốn?",
      options: [
        "Vốn càng lớn thì tác động giá khi vào và ra vị thế càng bào mòn lợi nhuận",
        "Cơ quan quản lý đặt trần cho quy mô tài sản mà một quỹ được huy động",
        "Chi phí vận hành tăng theo cấp số nhân khi quy mô quỹ vượt ngưỡng",
        "Nhà đầu tư tổ chức không được phép rót quá một tỷ lệ nhất định vào quỹ",
      ],
      correctIndex: 0,
      explanation: "Cơ hội trên thị trường có kích thước hữu hạn. Đây là lý do nhiều quỹ tốt chủ động đóng cửa nhận vốn mới thay vì nhận thêm rồi kém đi.",
    },
    {
      id: "l11_q12",
      question: "Vòng xoáy ký quỹ trong khủng hoảng vận hành thế nào?",
      options: [
        "Giá giảm buộc bán giải chấp, việc bán lại đẩy giá giảm sâu thêm",
        "Ngân hàng đồng loạt hạ lãi suất cho vay ký quỹ để hỗ trợ thị trường",
        "Nhà đầu tư nộp thêm tiền ký quỹ khiến thanh khoản thị trường tăng lên",
        "Cơ quan quản lý tạm dừng giao dịch cho tới khi giá trở lại mức cũ",
      ],
      correctIndex: 0,
      explanation: "Đây là cơ chế phản hồi dương biến một cú giảm bình thường thành sụp đổ, và là lý do đòn bẩy làm rủi ro tăng phi tuyến chứ không tuyến tính.",
    },
    {
      id: "l11_q13",
      question: "Chiến lược đầu tư theo sự kiện kiếm lời từ đâu?",
      options: [
        "Chênh lệch giá quanh các sự kiện doanh nghiệp như sáp nhập hay tái cấu trúc",
        "Xu hướng dài hạn của toàn thị trường cổ phiếu trong nhiều năm liền",
        "Chênh lệch lãi suất giữa các quốc gia có chính sách tiền tệ khác nhau",
        "Biến động giá hàng hoá cơ bản theo chu kỳ mùa vụ trong năm",
      ],
      correctIndex: 0,
      explanation: "Rủi ro chính không phải hướng thị trường mà là sự kiện đổ vỡ: thương vụ bị bác bỏ thì khoảng chênh đang thu hẹp sẽ bung ra tức thì.",
    },
    {
      id: "l11_q14",
      question: "Vì sao quỹ phòng hộ phải quan tâm tới điều khoản với môi giới chính?",
      options: [
        "Môi giới chính có thể đổi điều kiện ký quỹ đúng lúc thị trường căng nhất",
        "Môi giới chính quyết định chiến lược đầu tư mà quỹ được phép thực hiện",
        "Môi giới chính chịu trách nhiệm bồi thường khi quỹ thua lỗ vượt ngưỡng",
        "Môi giới chính là bên duy nhất được phép định giá tài sản của quỹ",
      ],
      correctIndex: 0,
      explanation: "Nguồn tài trợ có thể bị rút đúng lúc cần nhất. Nhiều quỹ sụp không phải vì đặt cược sai mà vì mất nguồn vốn trước khi luận điểm kịp đúng.",
    },
  ],
};

LEVEL_EXAMS[12] = {
  level: 12,
  title: "Bài Thi Quản Lý Danh Mục Chiến Lược (Level 12)",
  badgeEmoji: "🌐",
  minPassPercentage: 90,
  timeLimitSeconds: 1080,
  penaltyXpIfOverdue: 810,
  questions: [
    {
      id: "l12_q1",
      question: "Phân bổ tài sản chiến lược khác phân bổ chiến thuật ở điểm nào?",
      options: [
        "Chiến lược là tỷ trọng dài hạn, chiến thuật là lệch tạm thời quanh nó",
        "Chiến lược áp dụng cho cổ phiếu còn chiến thuật áp dụng cho trái phiếu",
        "Chiến lược do nhà đầu tư quyết định còn chiến thuật do cơ quan quản lý",
        "Chiến lược chỉ xem xét lại mỗi quý còn chiến thuật thì cố định cả năm",
      ],
      correctIndex: 0,
      explanation: "Nghiên cứu cho thấy phần lớn biến động lợi suất dài hạn đến từ tỷ trọng chiến lược, không phải từ các điều chỉnh chiến thuật.",
    },
    {
      id: "l12_q2",
      question: "Đầu tư theo nghĩa vụ phải trả đặt mục tiêu gì lên trước?",
      options: [
        "Khớp dòng tiền và độ nhạy lãi suất của tài sản với nghĩa vụ tương lai",
        "Tối đa hoá lợi suất tuyệt đối của danh mục trong từng năm tài chính",
        "Giảm chi phí quản lý xuống mức thấp nhất so với các quỹ cùng loại",
        "Bám sát càng gần càng tốt một chỉ số tham chiếu đã được chọn trước",
      ],
      correctIndex: 0,
      explanation: "Với quỹ hưu trí hay công ty bảo hiểm, rủi ro thật là chênh lệch giữa tài sản và nghĩa vụ, chứ không phải biến động của riêng tài sản.",
    },
    {
      id: "l12_q3",
      question: "Biên độ tái cân bằng theo ngưỡng có ưu điểm gì so với tái cân bằng theo lịch?",
      options: [
        "Chỉ giao dịch khi tỷ trọng thực sự lệch xa, nên tốn ít chi phí hơn",
        "Bảo đảm danh mục luôn khớp tuyệt đối với tỷ trọng mục tiêu mọi thời điểm",
        "Loại bỏ hoàn toàn nhu cầu theo dõi danh mục giữa các kỳ đánh giá",
        "Giúp danh mục luôn vượt trội hơn chỉ số tham chiếu trong dài hạn",
      ],
      correctIndex: 0,
      explanation: "Tái cân bằng theo lịch có thể giao dịch khi chưa cần, hoặc bỏ lỡ một cú lệch lớn giữa hai kỳ. Ngưỡng gắn hành động với mức lệch thật.",
    },
    {
      id: "l12_q4",
      question: "Sai số theo dõi của một danh mục đo lường điều gì?",
      options: [
        "Độ lệch chuẩn của chênh lệch lợi suất giữa danh mục và chỉ số tham chiếu",
        "Khoảng cách tuyệt đối giữa lợi suất danh mục và lãi suất phi rủi ro",
        "Tần suất mà danh mục phải thực hiện tái cân bằng trong một năm",
        "Mức chênh lệch giữa giá trị sổ sách và giá thị trường của danh mục",
      ],
      correctIndex: 0,
      explanation: "Sai số theo dõi thấp nghĩa là danh mục bám sát chỉ số. Nó không nói gì về việc danh mục tốt hay xấu, chỉ nói nó khác chỉ số bao nhiêu.",
    },
    {
      id: "l12_q5",
      question: "Information Ratio khác Sharpe Ratio ở chỗ nào?",
      options: [
        "Nó đo lợi suất vượt chỉ số trên sai số theo dõi thay vì trên tổng rủi ro",
        "Nó bỏ qua hoàn toàn phần rủi ro trong công thức tính toán hiệu quả",
        "Nó chỉ áp dụng cho các danh mục đầu tư thụ động theo chỉ số",
        "Nó tính trên lợi suất trước phí còn Sharpe tính trên lợi suất sau phí",
      ],
      correctIndex: 0,
      explanation: "Sharpe hỏi danh mục có đáng so với tiền gửi không. Information Ratio hỏi nhà quản lý chủ động có đáng so với việc mua chỉ số không.",
    },
    {
      id: "l12_q6",
      question: "Chiến lược cân bằng rủi ro phân bổ vốn theo nguyên tắc nào?",
      options: [
        "Mỗi lớp tài sản đóng góp phần rủi ro ngang nhau vào danh mục",
        "Mỗi lớp tài sản nhận được tỷ trọng vốn bằng nhau tính theo giá trị",
        "Ưu tiên tuyệt đối cho lớp tài sản có lợi suất kỳ vọng cao nhất",
        "Phân bổ theo đúng tỷ trọng vốn hoá của từng lớp tài sản trên thị trường",
      ],
      correctIndex: 0,
      explanation: "Danh mục 60/40 truyền thống trông cân bằng về vốn nhưng rủi ro gần như đến hết từ cổ phiếu. Cân bằng rủi ro sửa đúng điểm đó, thường bằng đòn bẩy trái phiếu.",
    },
    {
      id: "l12_q7",
      question: "Phần bù thanh khoản trong đầu tư tư nhân đến từ đâu?",
      options: [
        "Nhà đầu tư đòi hỏi lợi suất cao hơn để bù cho việc vốn bị khoá nhiều năm",
        "Doanh nghiệp chưa niêm yết luôn tăng trưởng nhanh hơn doanh nghiệp niêm yết",
        "Quỹ tư nhân được miễn phần lớn nghĩa vụ thuế trên lợi nhuận đầu tư",
        "Định giá tài sản tư nhân được cập nhật theo thị trường hằng ngày",
      ],
      correctIndex: 0,
      explanation: "Một phần lợi suất vượt trội của tài sản tư nhân cũng chỉ là ảo giác thống kê: định giá thưa thớt làm biến động đo được thấp giả tạo.",
    },
    {
      id: "l12_q8",
      question: "Quyết định phòng hộ tỷ giá cho danh mục quốc tế nên dựa trên gì?",
      options: [
        "Tỷ giá có làm tăng rủi ro mà không mang lại lợi suất kỳ vọng tương ứng không",
        "Dự báo của bộ phận phân tích về hướng đi của tỷ giá trong năm tới",
        "Mức phí phòng hộ mà ngân hàng đối tác đang chào cho hợp đồng kỳ hạn",
        "Tỷ trọng tài sản nước ngoài đã vượt quá một nửa danh mục hay chưa",
      ],
      correctIndex: 0,
      explanation: "Với trái phiếu nước ngoài, biến động tỷ giá thường lớn hơn cả lợi suất nên phòng hộ gần như bắt buộc; với cổ phiếu thì lập luận yếu hơn nhiều.",
    },
    {
      id: "l12_q9",
      question: "Phân tích quy kết hiệu quả trả lời câu hỏi nào?",
      options: [
        "Phần vượt chỉ số đến từ chọn ngành, chọn mã hay từ yếu tố nào khác",
        "Danh mục có đạt mức lợi suất tuyệt đối đã cam kết với nhà đầu tư không",
        "Chi phí giao dịch đã chiếm bao nhiêu phần trăm tổng tài sản trong kỳ",
        "Nhà quản lý đã tuân thủ đầy đủ các giới hạn đầu tư trong quy chế chưa",
      ],
      correctIndex: 0,
      explanation: "Không có quy kết thì không phân biệt được nhà quản lý giỏi chọn mã với người chỉ tình cờ nặng tay ở đúng ngành đang thắng.",
    },
    {
      id: "l12_q10",
      question: "Lộ trình giảm rủi ro trong quỹ hưu trí theo vòng đời hoạt động thế nào?",
      options: [
        "Giảm dần tỷ trọng cổ phiếu khi thời điểm nghỉ hưu tới gần",
        "Tăng dần tỷ trọng cổ phiếu để bù lại phần lợi suất đã mất trước đó",
        "Giữ nguyên tỷ trọng các lớp tài sản trong suốt toàn bộ vòng đời quỹ",
        "Chuyển toàn bộ sang tiền mặt ngay khi người tham gia đủ năm mươi tuổi",
      ],
      correctIndex: 0,
      explanation: "Người còn nhiều năm đi làm chịu được biến động vì còn thời gian hồi phục và còn thu nhập bổ sung. Người sắp nghỉ hưu thì không có cả hai.",
    },
    {
      id: "l12_q11",
      question: "Thu hoạch lỗ để giảm thuế mang lại lợi ích gì?",
      options: [
        "Hiện thực hoá khoản lỗ để bù trừ vào lãi vốn phải chịu thuế trong kỳ",
        "Giảm mức phí quản lý mà nhà đầu tư phải trả cho công ty quản lý quỹ",
        "Tăng lợi suất trước thuế của danh mục nhờ tái cơ cấu các vị thế đang lỗ",
        "Loại bỏ hoàn toàn nghĩa vụ thuế đối với phần lãi vốn trong dài hạn",
      ],
      correctIndex: 0,
      explanation: "Đây là hoãn thuế chứ không phải xoá thuế: giá vốn mới thấp hơn nên khoản thuế sẽ quay lại khi bán sau này.",
    },
    {
      id: "l12_q12",
      question: "Vì sao chọn chỉ số tham chiếu phù hợp lại quan trọng?",
      options: [
        "Chỉ số sai làm alpha đo được phản ánh lệch phong cách chứ không phải kỹ năng",
        "Chỉ số quyết định mức phí quản lý tối đa mà quỹ được phép thu của nhà đầu tư",
        "Chỉ số xác định danh sách tài sản mà quỹ bắt buộc phải nắm giữ",
        "Chỉ số ảnh hưởng trực tiếp tới nghĩa vụ thuế của nhà đầu tư cuối",
      ],
      correctIndex: 0,
      explanation: "Quỹ đầu tư cổ phiếu nhỏ so với chỉ số cổ phiếu lớn sẽ trông như có alpha trong mọi giai đoạn cổ phiếu nhỏ thắng, dù không có kỹ năng nào.",
    },
    {
      id: "l12_q13",
      question: "Rủi ro tập trung trong danh mục thể hiện ở đâu ngoài số lượng mã?",
      options: [
        "Các mã khác nhau nhưng cùng phơi nhiễm một yếu tố rủi ro chung",
        "Số lượng giao dịch mà danh mục thực hiện trong mỗi tháng hoạt động",
        "Tỷ trọng tiền mặt được duy trì thường xuyên trong danh mục đầu tư",
        "Chênh lệch giữa giá mua và giá bán của các tài sản đang nắm giữ",
      ],
      correctIndex: 0,
      explanation: "Ba mươi cổ phiếu cùng nhạy với lãi suất không đa dạng hơn năm cổ phiếu. Đa dạng hoá phải tính theo yếu tố rủi ro, không theo số mã.",
    },
    {
      id: "l12_q14",
      question: "Vì sao lợi suất của nhà đầu tư thường thấp hơn lợi suất của chính quỹ họ mua?",
      options: [
        "Vì dòng tiền vào ra sai thời điểm: mua sau khi tăng và bán sau khi giảm",
        "Vì quỹ tính phí quản lý trước khi công bố con số lợi suất ra bên ngoài",
        "Vì lợi suất của quỹ luôn được tính trước thuế còn nhà đầu tư sau thuế",
        "Vì nhà đầu tư cá nhân phải chịu mức phí giao dịch cao hơn tổ chức",
      ],
      correctIndex: 0,
      explanation: "Khoảng cách này được đo nhiều lần và thường vài điểm phần trăm mỗi năm - nó là cái giá của hành vi, không phải của sản phẩm.",
    },
    {
      id: "l12_q15",
      question: "Khi chọn nhà quản lý quỹ, hiệu suất quá khứ nên được dùng thế nào?",
      options: [
        "Như một dữ kiện cần giải thích được bằng quy trình, không phải bằng chứng kỹ năng",
        "Như tiêu chí quan trọng nhất vì nó phản ánh trực tiếp năng lực đã chứng minh",
        "Bỏ qua hoàn toàn vì hiệu suất quá khứ không mang bất kỳ thông tin nào",
        "Chỉ dùng khi khoảng thời gian đánh giá ngắn hơn ba năm gần nhất",
      ],
      correctIndex: 0,
      explanation: "Với mức nhiễu của thị trường, cần rất nhiều năm dữ liệu để tách kỹ năng khỏi may mắn. Hiểu quy trình tạo ra kết quả nhanh hơn nhiều.",
    },
  ],
};

LEVEL_EXAMS[13] = {
  level: 13,
  title: "Bài Thi Bậc Thầy Thị Trường (Level 13)",
  badgeEmoji: "🚀",
  minPassPercentage: 90,
  timeLimitSeconds: 1140,
  penaltyXpIfOverdue: 840,
  questions: [
    {
      id: "l13_q1",
      question: "Chênh lệch giá mua bán trên sổ lệnh phản ánh chi phí gì?",
      options: [
        "Chi phí tức thời phải trả nếu muốn khớp lệnh ngay lập tức",
        "Khoản phí môi giới mà công ty chứng khoán thu trên mỗi giao dịch",
        "Thuế thu nhập phải nộp trên phần lãi vốn khi bán chứng khoán ra",
        "Chi phí lưu ký tính theo giá trị danh mục nắm giữ trong kỳ",
      ],
      correctIndex: 0,
      explanation: "Người đặt lệnh thị trường trả khoản chênh này cho người tạo lập; người đặt lệnh giới hạn thì nhận nó nhưng đánh đổi bằng rủi ro không được khớp.",
    },
    {
      id: "l13_q2",
      question: "Rủi ro tồn kho của nhà tạo lập thị trường là gì?",
      options: [
        "Giá dịch chuyển bất lợi khi họ đang giữ vị thế từ việc khớp lệnh khách",
        "Khách hàng huỷ lệnh trước khi lệnh kịp được khớp trên hệ thống",
        "Chi phí thuê hạ tầng máy chủ đặt gần sàn giao dịch tăng lên",
        "Cơ quan quản lý yêu cầu công bố toàn bộ vị thế đang nắm giữ",
      ],
      correctIndex: 0,
      explanation: "Đây là lý do chênh lệch giá nới rộng khi biến động tăng: nhà tạo lập đòi bù đắp nhiều hơn cho rủi ro ôm hàng trong thị trường khó đoán.",
    },
    {
      id: "l13_q3",
      question: "Bề mặt biến động cho thấy điều gì mà Black-Scholes không giả định?",
      options: [
        "Biến động hàm ý thay đổi theo giá thực hiện và theo kỳ hạn",
        "Giá quyền chọn luôn cao hơn giá trị nội tại tại mọi thời điểm",
        "Lãi suất phi rủi ro biến động liên tục trong suốt vòng đời hợp đồng",
        "Tài sản cơ sở không trả cổ tức trong thời gian nắm giữ quyền chọn",
      ],
      correctIndex: 0,
      explanation: "Mô hình giả định một mức biến động duy nhất. Thị trường lại định giá quyền chọn xa tiền cao hơn, tạo ra nụ cười biến động - bằng chứng đuôi dày.",
    },
    {
      id: "l13_q4",
      question: "Chiến lược mua đồng thời quyền mua và quyền bán cùng giá thực hiện đặt cược vào điều gì?",
      options: [
        "Giá biến động mạnh, bất kể theo chiều lên hay chiều xuống",
        "Giá đi lên một cách ổn định trong suốt thời gian nắm giữ vị thế",
        "Giá gần như đứng yên cho tới ngày hợp đồng đáo hạn",
        "Biến động hàm ý sẽ giảm xuống dưới mức biến động thực tế",
      ],
      correctIndex: 0,
      explanation: "Vị thế này thắng khi giá chạy xa theo bất kỳ hướng nào, và thua khi giá đứng yên vì giá trị thời gian của cả hai quyền chọn cùng bào mòn.",
    },
    {
      id: "l13_q5",
      question: "Gamma scalping tạo ra lợi nhuận từ đâu?",
      options: [
        "Cân bằng lại vị thế liên tục để thu lời từ dao động của giá cơ sở",
        "Nắm giữ quyền chọn tới đáo hạn để hưởng toàn bộ giá trị nội tại",
        "Chênh lệch giữa giá quyền chọn niêm yết ở hai sàn giao dịch khác nhau",
        "Phí quyền chọn thu được khi bán khống hợp đồng cho nhà đầu tư khác",
      ],
      correctIndex: 0,
      explanation: "Người mua quyền chọn có gamma dương nên mỗi lần cân bằng lại đều mua thấp bán cao. Lợi nhuận đó phải lớn hơn giá trị thời gian mất đi mỗi ngày.",
    },
    {
      id: "l13_q6",
      question: "Vì sao tương quan giữa các lớp tài sản thay đổi theo chế độ thị trường?",
      options: [
        "Trong khủng hoảng, nhu cầu tiền mặt chi phối giá hơn đặc tính riêng tài sản",
        "Các sở giao dịch điều chỉnh biên độ dao động khi thị trường biến động mạnh",
        "Nhà đầu tư tổ chức bị buộc phải nắm giữ cùng một rổ tài sản theo quy định",
        "Chỉ số tham chiếu được tính lại theo tỷ trọng mới vào cuối mỗi quý",
      ],
      correctIndex: 0,
      explanation: "Khi lý do bán không còn liên quan tới bản thân tài sản, mọi thứ cùng bị bán - và đa dạng hoá biến mất đúng lúc người ta cần nó nhất.",
    },
    {
      id: "l13_q7",
      question: "Hiện tượng ép mua khống xảy ra khi nào?",
      options: [
        "Người bán khống buộc phải mua lại, và chính lệnh mua đó đẩy giá lên tiếp",
        "Doanh nghiệp phát hành thêm cổ phiếu làm pha loãng tỷ lệ sở hữu hiện hữu",
        "Cơ quan quản lý tạm dừng cho phép bán khống trên toàn bộ thị trường",
        "Nhà đầu tư tổ chức đồng loạt bán ra khiến thanh khoản cạn kiệt nhanh",
      ],
      correctIndex: 0,
      explanation: "Bán khống có mức lỗ không giới hạn, nên áp lực buộc đóng vị thế tạo ra vòng phản hồi dương đẩy giá lên xa khỏi giá trị cơ bản.",
    },
    {
      id: "l13_q8",
      question: "Vì sao cổ phiếu thường biến động mạnh quanh ngày cơ cấu chỉ số?",
      options: [
        "Quỹ chỉ số buộc phải mua bán theo tỷ trọng mới trong cùng thời điểm",
        "Doanh nghiệp thường công bố kết quả kinh doanh vào đúng ngày đó",
        "Sở giao dịch nới rộng biên độ dao động giá trong phiên cơ cấu",
        "Nhà đầu tư cá nhân có xu hướng giao dịch nhiều hơn vào cuối quý",
      ],
      correctIndex: 0,
      explanation: "Nhu cầu mua bán đến từ ràng buộc chứ không từ quan điểm về giá trị, nên nó tạo ra áp lực giá tạm thời mà các quỹ khác tìm cách khai thác.",
    },
    {
      id: "l13_q9",
      question: "Chiến lược đầu tư theo đà và theo giá trị khác nhau ở giả định nền tảng nào?",
      options: [
        "Đà giả định xu hướng tiếp diễn, giá trị giả định giá quay về mức hợp lý",
        "Đà chỉ dùng cho cổ phiếu còn giá trị chỉ dùng cho trái phiếu doanh nghiệp",
        "Đà dựa trên báo cáo tài chính còn giá trị dựa trên dữ liệu giá quá khứ",
        "Đà yêu cầu nắm giữ dài hạn còn giá trị yêu cầu giao dịch thường xuyên",
      ],
      correctIndex: 0,
      explanation: "Hai giả định trái ngược nhau nhưng cùng có bằng chứng thực nghiệm, và chúng thường thắng ở những giai đoạn khác nhau - nên nhiều quỹ giữ cả hai.",
    },
    {
      id: "l13_q10",
      question: "Cơ chế ngắt mạch trên thị trường nhằm mục đích gì?",
      options: [
        "Tạm dừng giao dịch để người tham gia có thời gian đánh giá lại thông tin",
        "Bảo đảm giá cổ phiếu không giảm xuống dưới giá trị sổ sách của doanh nghiệp",
        "Ngăn nhà đầu tư nước ngoài bán ròng vượt quá một tỷ lệ nhất định",
        "Buộc các quỹ đầu tư phải công bố vị thế nắm giữ ngay trong phiên",
      ],
      correctIndex: 0,
      explanation: "Lập luận ủng hộ là nó chặn vòng xoáy bán tháo do hoảng loạn; lập luận phản đối là nó chỉ dồn áp lực bán sang phiên sau và làm thanh khoản tệ hơn.",
    },
    {
      id: "l13_q11",
      question: "Định vị thị trường quá nghiêng về một phía tạo ra rủi ro gì?",
      options: [
        "Một tin nhỏ ngược chiều cũng đủ kích hoạt làn sóng đóng vị thế đồng loạt",
        "Thanh khoản trên thị trường tăng lên khiến chênh lệch giá bị thu hẹp",
        "Chi phí vay chứng khoán để bán khống giảm xuống mức thấp bất thường",
        "Biến động hàm ý của quyền chọn giảm mạnh so với biến động thực tế",
      ],
      correctIndex: 0,
      explanation: "Khi ai cũng đã ở cùng một phía thì không còn người mua mới, và mọi chuyển động ngược chiều đều bị khuếch đại bởi chính việc thoát vị thế.",
    },
    {
      id: "l13_q12",
      question: "Cấu trúc kỳ hạn của biến động hàm ý dốc lên nói lên điều gì?",
      options: [
        "Thị trường kỳ vọng biến động sẽ cao hơn ở các kỳ hạn xa hơn",
        "Giá quyền chọn kỳ hạn ngắn đang cao hơn quyền chọn kỳ hạn dài",
        "Tài sản cơ sở sẽ tăng giá trong khoảng thời gian còn lại tới đáo hạn",
        "Lãi suất phi rủi ro dự kiến giảm dần trong các kỳ hạn tương lai",
      ],
      correctIndex: 0,
      explanation: "Trạng thái này thường gặp lúc thị trường yên ả. Nó đảo ngược trong khủng hoảng, khi biến động ngắn hạn vọt lên trên mức dài hạn.",
    },
    {
      id: "l13_q13",
      question: "Vì sao thanh khoản vĩ mô ảnh hưởng tới định giá mọi loại tài sản?",
      options: [
        "Nó thay đổi suất chiết khấu và khẩu vị rủi ro của toàn bộ thị trường",
        "Nó tác động trực tiếp tới lợi nhuận kế toán của các doanh nghiệp niêm yết",
        "Nó quyết định tỷ trọng mà các quỹ chỉ số phải phân bổ vào từng ngành",
        "Nó ấn định mức chênh lệch giá mua bán tối thiểu trên các sàn giao dịch",
      ],
      correctIndex: 0,
      explanation: "Cùng một dòng tiền tương lai sẽ có giá trị hiện tại khác hẳn khi lãi suất và phần bù rủi ro thay đổi, và điều đó áp cho mọi lớp tài sản cùng lúc.",
    },
    {
      id: "l13_q14",
      question: "Lệnh giới hạn khác lệnh thị trường ở đánh đổi nào?",
      options: [
        "Chắc chắn về giá nhưng không chắc chắn lệnh sẽ được khớp",
        "Chắc chắn được khớp nhưng phải trả mức phí giao dịch cao hơn",
        "Được ưu tiên khớp trước mọi lệnh khác trong cùng một mức giá",
        "Chỉ có hiệu lực trong phiên khớp lệnh định kỳ đầu và cuối ngày",
      ],
      correctIndex: 0,
      explanation: "Rủi ro không được khớp là có thật và tốn kém: bỏ lỡ một chuyển động lớn thường đắt hơn nhiều so với khoản chênh lệch mà lệnh giới hạn tiết kiệm.",
    },
    {
      id: "l13_q15",
      question: "Vì sao biến động hàm ý thường cao hơn biến động thực tế sau đó?",
      options: [
        "Người bán quyền chọn đòi phần bù cho rủi ro họ gánh thay người mua",
        "Mô hình định giá quyền chọn có sai số hệ thống theo một chiều cố định",
        "Nhà đầu tư cá nhân luôn ước lượng biến động cao hơn nhà đầu tư tổ chức",
        "Sở giao dịch quy định mức biến động tối thiểu khi niêm yết quyền chọn",
      ],
      correctIndex: 0,
      explanation: "Đây là phần bù rủi ro biến động, và nó là lý do chiến lược bán quyền chọn có kỳ vọng dương - đổi lại là những cú lỗ hiếm nhưng rất sâu.",
    },
  ],
};

LEVEL_EXAMS[14] = {
  level: 14,
  title: "Bài Thi Lãnh Đạo Tài Chính Tối Cao (Level 14)",
  badgeEmoji: "🔱",
  minPassPercentage: 90,
  timeLimitSeconds: 1200,
  penaltyXpIfOverdue: 870,
  questions: [
    {
      id: "l14_q1",
      question: "Nguyên tắc nền tảng của phân bổ vốn trong doanh nghiệp là gì?",
      options: [
        "Vốn chảy về nơi có suất sinh lời vượt chi phí vốn cao nhất",
        "Phân bổ đều cho các bộ phận để bảo đảm công bằng trong nội bộ",
        "Ưu tiên tuyệt đối cho bộ phận đang đóng góp doanh thu lớn nhất",
        "Giữ nguyên tỷ lệ phân bổ của năm trước để duy trì tính ổn định",
      ],
      correctIndex: 0,
      explanation: "Phân bổ theo lịch sử hoặc theo quyền lực nội bộ là cách phổ biến nhất mà doanh nghiệp phá huỷ giá trị mà không ai nhận ra.",
    },
    {
      id: "l14_q2",
      question: "Khi nào mua lại cổ phiếu tạo giá trị hơn chia cổ tức?",
      options: [
        "Khi cổ phiếu đang giao dịch dưới giá trị nội tại theo đánh giá của ban điều hành",
        "Khi doanh nghiệp muốn phát tín hiệu cam kết chi trả đều đặn cho cổ đông",
        "Khi doanh nghiệp cần giữ lại tiền mặt để đầu tư mở rộng sản xuất",
        "Khi tỷ lệ sở hữu của cổ đông lớn cần được duy trì ở mức hiện tại",
      ],
      correctIndex: 0,
      explanation: "Mua lại ở giá cao hơn giá trị nội tại là chuyển giá trị từ cổ đông ở lại sang cổ đông bán ra - điều xảy ra thường xuyên vì doanh nghiệp hay mua khi tiền dồi dào.",
    },
    {
      id: "l14_q3",
      question: "Doanh nghiệp nhắm mục tiêu giữ hạng tín nhiệm nhất định đánh đổi điều gì?",
      options: [
        "Bỏ qua một phần lá chắn thuế để giữ chi phí vay và khả năng tiếp cận vốn",
        "Chấp nhận chi phí vốn chủ cao hơn để đổi lấy mức nợ vay thấp hơn",
        "Giảm tỷ lệ chi trả cổ tức xuống mức thấp nhất có thể trong nhiều năm",
        "Từ bỏ hoàn toàn khả năng thực hiện các thương vụ mua bán sáp nhập",
      ],
      correctIndex: 0,
      explanation: "Cấu trúc vốn tối ưu về lý thuyết thường ngụ ý vay nhiều hơn mức mà một hạng tín nhiệm an toàn cho phép - đây là đánh đổi có ý thức, không phải sai lầm.",
    },
    {
      id: "l14_q4",
      question: "Vì sao ngưỡng sinh lời tối thiểu nội bộ thường cao hơn WACC?",
      options: [
        "Để bù cho việc dự phóng của bộ phận đề xuất thường lạc quan có hệ thống",
        "Vì cơ quan quản lý yêu cầu doanh nghiệp áp dụng mức chiết khấu tối thiểu",
        "Vì WACC chỉ áp dụng cho các dự án đầu tư tài sản cố định hữu hình",
        "Để bảo đảm mọi dự án đều hoàn vốn trong vòng dưới ba năm hoạt động",
      ],
      correctIndex: 0,
      explanation: "Đặt ngưỡng quá cao lại loại bỏ những dự án tốt. Cách xử lý sạch hơn là sửa quy trình dự phóng thay vì bù bằng một con số tuỳ ý.",
    },
    {
      id: "l14_q5",
      question: "Doanh nghiệp có ROIC thấp hơn WACC nên làm gì?",
      options: [
        "Thu hẹp lại thay vì tăng trưởng, vì tăng trưởng làm mất thêm giá trị",
        "Đẩy mạnh tăng trưởng doanh thu để đạt lợi thế quy mô và cải thiện biên",
        "Vay thêm nợ giá rẻ để hạ chi phí vốn bình quân xuống dưới mức ROIC",
        "Chia toàn bộ lợi nhuận cho cổ đông và ngừng mọi hoạt động đầu tư",
      ],
      correctIndex: 0,
      explanation: "Mỗi đồng đầu tư thêm vào hoạt động sinh lời dưới chi phí vốn đều làm cổ đông nghèo đi, nên tăng trưởng ở đây là phá huỷ giá trị nhanh hơn.",
    },
    {
      id: "l14_q6",
      question: "Vốn lưu động là đòn bẩy tài chính bị đánh giá thấp vì sao?",
      options: [
        "Cải thiện nó giải phóng tiền mặt mà không cần huy động vốn bên ngoài",
        "Nó không xuất hiện trên báo cáo tài chính nên không bị nhà đầu tư soi",
        "Nó được cơ quan thuế cho phép khấu trừ toàn bộ khi tính thu nhập chịu thuế",
        "Nó luôn tăng tự động theo doanh thu mà không cần bất kỳ can thiệp nào",
      ],
      correctIndex: 0,
      explanation: "Rút ngắn số ngày thu tiền và kéo dài số ngày trả tiền có thể giải phóng số tiền tương đương một đợt gọi vốn, và không phải trả lãi hay pha loãng.",
    },
    {
      id: "l14_q7",
      question: "Chính sách phòng hộ tỷ giá của doanh nghiệp nên xuất phát từ đâu?",
      options: [
        "Mức độ phơi nhiễm thật của dòng tiền và khả năng chịu đựng biến động",
        "Dự báo của bộ phận tài chính về xu hướng tỷ giá trong mười hai tháng tới",
        "Mức phí mà ngân hàng đối tác chào cho các hợp đồng kỳ hạn hiện hành",
        "Thông lệ phòng hộ mà các doanh nghiệp cùng ngành đang áp dụng",
      ],
      correctIndex: 0,
      explanation: "Phòng hộ dựa trên dự báo tỷ giá thực chất là đầu cơ có tổ chức. Chính sách tốt xuất phát từ việc doanh nghiệp chịu được biến động tới đâu.",
    },
    {
      id: "l14_q8",
      question: "Vì sao quản trị điều khoản ràng buộc trong hợp đồng vay lại quan trọng?",
      options: [
        "Vi phạm một điều khoản có thể khiến toàn bộ khoản vay đến hạn ngay",
        "Điều khoản ràng buộc quyết định mức lãi suất mà doanh nghiệp phải trả",
        "Chúng cho phép ngân hàng tham gia trực tiếp vào hội đồng quản trị",
        "Chúng xác định thứ tự ưu tiên thanh toán khi doanh nghiệp phá sản",
      ],
      correctIndex: 0,
      explanation: "Điều khoản chéo giữa các hợp đồng khiến một vi phạm nhỏ ở một khoản vay có thể kéo theo toàn bộ cấu trúc nợ đến hạn cùng lúc.",
    },
    {
      id: "l14_q9",
      question: "Kỷ luật trong mua bán sáp nhập thể hiện rõ nhất ở đâu?",
      options: [
        "Sẵn sàng rút lui khi giá vượt quá mức mà luận điểm đầu tư chống đỡ được",
        "Hoàn tất thương vụ đúng tiến độ đã cam kết với thị trường và cổ đông",
        "Chọn được đơn vị tư vấn tài chính có uy tín nhất trên thị trường",
        "Bảo đảm thương vụ làm tăng thu nhập trên mỗi cổ phần ngay năm đầu",
      ],
      correctIndex: 0,
      explanation: "Chi phí chìm của quá trình thẩm định và áp lực đã công bố khiến việc rút lui rất khó về mặt tâm lý, và đó chính là lúc kỷ luật có giá trị nhất.",
    },
    {
      id: "l14_q10",
      question: "Truyền thông với nhà đầu tư nên xử lý tin xấu thế nào?",
      options: [
        "Công bố sớm và đầy đủ, kèm theo kế hoạch xử lý cụ thể",
        "Trì hoãn tới khi có đủ thông tin để trình bày một bức tranh trọn vẹn",
        "Công bố cùng lúc với một tin tốt khác để cân bằng phản ứng thị trường",
        "Chỉ trao đổi riêng với các cổ đông lớn trước khi công bố rộng rãi",
      ],
      correctIndex: 0,
      explanation: "Lựa chọn cuối còn vi phạm nguyên tắc công bằng thông tin. Uy tín xây trong nhiều năm nhưng mất trong một lần thị trường phát hiện bị giấu.",
    },
    {
      id: "l14_q11",
      question: "Thiết kế đãi ngộ ban điều hành gắn với EPS có rủi ro gì?",
      options: [
        "Khuyến khích mua lại cổ phiếu và vay nợ thay vì tạo giá trị thật",
        "Làm ban điều hành quá thận trọng và bỏ lỡ các cơ hội tăng trưởng",
        "Khiến chi phí lương thưởng vượt quá khả năng chi trả của doanh nghiệp",
        "Buộc doanh nghiệp phải công bố lợi nhuận theo quý thay vì theo năm",
      ],
      correctIndex: 0,
      explanation: "EPS tăng được bằng cách giảm mẫu số hoặc vay rẻ, không cần kinh doanh tốt lên. Gắn đãi ngộ với ROIC hoặc giá trị kinh tế gia tăng khó lách hơn nhiều.",
    },
    {
      id: "l14_q12",
      question: "Lập kế hoạch theo kịch bản khác dự báo điểm ở chỗ nào?",
      options: [
        "Nó chuẩn bị cho nhiều tương lai thay vì đặt cược vào một con số",
        "Nó sử dụng nhiều dữ liệu lịch sử hơn nên cho kết quả chính xác hơn",
        "Nó chỉ áp dụng cho kế hoạch dài hạn trên năm năm chứ không cho ngân sách",
        "Nó loại bỏ nhu cầu phải đưa ra bất kỳ giả định nào về tương lai",
      ],
      correctIndex: 0,
      explanation: "Giá trị nằm ở chỗ chuẩn bị sẵn hành động cho từng kịch bản, để quyết định được đưa ra trước khi áp lực thời gian và cảm xúc xuất hiện.",
    },
    {
      id: "l14_q13",
      question: "Vai trò cốt lõi của hội đồng quản trị trong quản trị doanh nghiệp là gì?",
      options: [
        "Giám sát ban điều hành thay mặt cổ đông, không phải điều hành thay họ",
        "Tham gia trực tiếp vào các quyết định vận hành hằng ngày của doanh nghiệp",
        "Đại diện cho lợi ích của nhóm cổ đông lớn nhất trong cơ cấu sở hữu",
        "Phê duyệt toàn bộ hợp đồng có giá trị vượt ngưỡng quy định nội bộ",
      ],
      correctIndex: 0,
      explanation: "Hội đồng lấn sang điều hành thì mất khả năng giám sát chính mình. Thành viên độc lập tồn tại đúng để bảo vệ ranh giới đó.",
    },
    {
      id: "l14_q14",
      question: "Chi phí vốn cho một dự án ở lĩnh vực khác với hoạt động chính nên tính thế nào?",
      options: [
        "Theo rủi ro của chính lĩnh vực đó, không theo WACC của doanh nghiệp",
        "Theo WACC của doanh nghiệp vì đó là chi phí vốn thực tế đang gánh",
        "Theo lãi suất vay ngân hàng áp dụng cho khoản vay tài trợ dự án",
        "Theo mức sinh lời trung bình mà doanh nghiệp đạt được trong quá khứ",
      ],
      correctIndex: 0,
      explanation: "Dùng WACC chung sẽ chấp nhận mọi dự án rủi ro cao và từ chối mọi dự án rủi ro thấp - sai lệch tích luỹ dần thành một danh mục lệch hẳn khỏi ý định.",
    },
    {
      id: "l14_q15",
      question: "Chính sách quản lý tiền mặt của tập đoàn nên cân bằng điều gì?",
      options: [
        "Khả năng chống chịu cú sốc và chi phí cơ hội của tiền để không sinh lời",
        "Lợi suất tiền gửi ngắn hạn và mức thuế phải nộp trên khoản lãi đó",
        "Số dư tiền mặt và giá trị hàng tồn kho vào thời điểm cuối mỗi quý",
        "Tỷ lệ tiền mặt so với vốn chủ sở hữu theo thông lệ chung của ngành",
      ],
      correctIndex: 0,
      explanation: "Giữ quá nhiều tiền bị nhà đầu tư phạt vì nó sinh lời dưới chi phí vốn; giữ quá ít thì một cú sốc thanh khoản có thể kết thúc doanh nghiệp.",
    },
    {
      id: "l14_q16",
      question: "Chỉ tiêu nào phù hợp nhất để đánh giá ban điều hành trong dài hạn?",
      options: [
        "Suất sinh lời trên vốn đầu tư so với chi phí vốn qua nhiều chu kỳ",
        "Tốc độ tăng trưởng doanh thu đạt được so với các doanh nghiệp cùng ngành",
        "Giá cổ phiếu tại thời điểm kết thúc mỗi năm tài chính của doanh nghiệp",
        "Thu nhập trên mỗi cổ phần được công bố trong báo cáo tài chính quý",
      ],
      correctIndex: 0,
      explanation: "Giá cổ phiếu chịu ảnh hưởng lớn từ thị trường chung, còn doanh thu và EPS đều tăng được mà không tạo giá trị. Khoảng cách ROIC với WACC thì không lách được.",
    },
  ],
};

LEVEL_EXAMS[15] = {
  level: 15,
  title: "Bài Thi Đại Thuyền Trưởng Phố Wall (Level 15)",
  badgeEmoji: "🔱",
  minPassPercentage: 90,
  timeLimitSeconds: 1260,
  penaltyXpIfOverdue: 900,
  questions: [
    {
      id: "l15_q1",
      question: "Rủi ro hệ thống trong nghĩa ổn định tài chính là gì?",
      options: [
        "Rủi ro đổ vỡ của một định chế lan ra làm tê liệt cả hệ thống",
        "Rủi ro thị trường chung mà đa dạng hoá danh mục không loại bỏ được",
        "Rủi ro một doanh nghiệp mất khả năng thanh toán các khoản nợ đến hạn",
        "Rủi ro biến động lãi suất tác động lên giá trị danh mục trái phiếu",
      ],
      correctIndex: 0,
      explanation: "Đây là một trong những cặp thuật ngữ hay bị lẫn nhất: rủi ro hệ thống trong lý thuyết danh mục là lựa chọn thứ hai, hoàn toàn khác khái niệm ở đây.",
    },
    {
      id: "l15_q2",
      question: "Vốn cấp một trong khung Basel dùng để làm gì?",
      options: [
        "Hấp thụ thua lỗ trong khi ngân hàng vẫn tiếp tục hoạt động bình thường",
        "Chi trả cho người gửi tiền trong trường hợp ngân hàng bị phá sản",
        "Bảo đảm ngân hàng luôn đáp ứng được nhu cầu rút tiền trong ngắn hạn",
        "Tài trợ cho hoạt động cho vay dài hạn của ngân hàng thương mại",
      ],
      correctIndex: 0,
      explanation: "Phân biệt quan trọng: vốn hấp thụ lỗ khi còn sống, còn lựa chọn thứ ba mô tả các tỷ lệ thanh khoản - hai công cụ giải quyết hai vấn đề khác nhau.",
    },
    {
      id: "l15_q3",
      question: "Vì sao ngân hàng dễ bị tổn thương một cách có cấu trúc?",
      options: [
        "Họ huy động ngắn hạn để cho vay dài hạn, tạo ra lệch kỳ hạn cố hữu",
        "Họ bị cơ quan quản lý giới hạn mức lãi suất được phép huy động",
        "Họ phải nắm giữ tỷ lệ trái phiếu chính phủ cao trong tổng tài sản",
        "Họ không được phép sử dụng công cụ phái sinh để phòng hộ rủi ro",
      ],
      correctIndex: 0,
      explanation: "Chuyển hoá kỳ hạn là chức năng kinh tế của ngân hàng chứ không phải sai sót. Nhưng nó cũng khiến một ngân hàng lành mạnh vẫn có thể sụp vì mất niềm tin.",
    },
    {
      id: "l15_q4",
      question: "Thanh toán bù trừ tập trung với phái sinh làm gì với rủi ro đối tác?",
      options: [
        "Chuyển nó về một đầu mối duy nhất, đổi lấy việc đầu mối đó thành trọng yếu",
        "Loại bỏ hoàn toàn rủi ro đối tác khỏi hệ thống tài chính",
        "Chuyển rủi ro sang cho cơ quan quản lý nhà nước gánh chịu",
        "Chia đều rủi ro đó cho toàn bộ các thành viên đang tham gia thị trường phái sinh",
      ],
      correctIndex: 0,
      explanation: "Trung tâm bù trừ giảm mạng lưới chằng chịt các nghĩa vụ song phương, nhưng chính nó trở thành điểm mà nếu đổ vỡ thì hậu quả không thể hình dung.",
    },
    {
      id: "l15_q5",
      question: "Ngân hàng ngầm gây lo ngại vì lý do gì?",
      options: [
        "Nó thực hiện chức năng như ngân hàng nhưng ngoài phạm vi giám sát",
        "Nó cho vay với lãi suất cao hơn nhiều so với ngân hàng thương mại",
        "Nó chỉ phục vụ nhóm khách hàng có mức tín nhiệm thấp trên thị trường",
        "Nó hoạt động chủ yếu ở các quốc gia có hệ thống pháp lý chưa hoàn thiện",
      ],
      correctIndex: 0,
      explanation: "Chuyển hoá kỳ hạn và đòn bẩy vẫn diễn ra, nhưng không có bảo hiểm tiền gửi, không có người cho vay cuối cùng, và thường không có yêu cầu vốn.",
    },
    {
      id: "l15_q6",
      question: "Kênh lây lan qua bảng cân đối hoạt động thế nào?",
      options: [
        "Một định chế bán tháo tài sản, giá giảm làm bảng cân đối bên khác xấu theo",
        "Một ngân hàng phá sản khiến người gửi tiền ở ngân hàng khác rút tiền hàng loạt",
        "Cơ quan quản lý siết quy định đồng loạt sau khi một định chế gặp vấn đề",
        "Các định chế cùng nắm giữ cổ phần chéo của nhau trong cơ cấu sở hữu",
      ],
      correctIndex: 0,
      explanation: "Đây là lây lan không cần bất kỳ quan hệ hợp đồng nào giữa hai bên: chỉ cần họ nắm giữ cùng loại tài sản và cùng phải định giá theo thị trường.",
    },
    {
      id: "l15_q7",
      question: "Vai trò người cho vay cuối cùng nên áp dụng theo nguyên tắc nào?",
      options: [
        "Cho vay tự do với lãi suất phạt, đổi lấy tài sản bảo đảm chất lượng tốt",
        "Cho vay không giới hạn với lãi suất ưu đãi cho mọi định chế gặp khó khăn",
        "Chỉ cho vay đối với các ngân hàng có quy mô lớn nhất trong hệ thống",
        "Mua lại toàn bộ tài sản xấu của định chế đang gặp vấn đề thanh khoản",
      ],
      correctIndex: 0,
      explanation: "Nguyên tắc Bagehot phân biệt mất thanh khoản với mất khả năng thanh toán: hỗ trợ bên thứ nhất, để bên thứ hai đổ vỡ - trong khủng hoảng thì rất khó phân biệt.",
    },
    {
      id: "l15_q8",
      question: "Rủi ro đạo đức trong cứu trợ tài chính biểu hiện thế nào?",
      options: [
        "Định chế chấp nhận rủi ro lớn hơn vì tin sẽ được cứu nếu đổ vỡ",
        "Ban điều hành che giấu thông tin bất lợi khỏi cơ quan quản lý nhà nước",
        "Người gửi tiền rút tiền hàng loạt khi nghe tin đồn về ngân hàng của mình",
        "Cổ đông bán tháo cổ phiếu ngay khi có dấu hiệu định chế gặp khó khăn",
      ],
      correctIndex: 0,
      explanation: "Đây là chi phí dài hạn của mọi cuộc cứu trợ, và là lý do các khung xử lý hiện đại cố gắng buộc chủ nợ chịu lỗ thay vì dùng tiền ngân sách.",
    },
    {
      id: "l15_q9",
      question: "Chính sách an toàn vĩ mô khác an toàn vi mô ở chỗ nào?",
      options: [
        "Nó nhắm vào sự ổn định của cả hệ thống, không chỉ từng định chế riêng lẻ",
        "Nó chỉ áp dụng cho các ngân hàng có quy mô lớn nhất trong nền kinh tế",
        "Nó do ngân hàng trung ương ban hành còn an toàn vi mô do bộ tài chính",
        "Nó tập trung vào rủi ro thanh khoản còn an toàn vi mô vào rủi ro tín dụng",
      ],
      correctIndex: 0,
      explanation: "Hành vi hợp lý với từng ngân hàng có thể tai hại cho cả hệ thống: mọi ngân hàng cùng bán tài sản để cải thiện tỷ lệ vốn sẽ làm giá sụp cho tất cả.",
    },
    {
      id: "l15_q10",
      question: "Đệm vốn phản chu kỳ hoạt động theo nguyên lý nào?",
      options: [
        "Tích luỹ thêm vốn thời kỳ tăng trưởng để giải phóng khi suy thoái",
        "Yêu cầu vốn tăng lên trong suy thoái để bảo vệ người gửi tiền tốt hơn",
        "Giữ nguyên mức vốn qua mọi giai đoạn của chu kỳ kinh tế để ổn định",
        "Cho phép ngân hàng tự quyết định mức vốn dựa trên mô hình nội bộ",
      ],
      correctIndex: 0,
      explanation: "Nó chống lại xu hướng tự nhiên của tín dụng là bùng nổ lúc tốt và co lại lúc xấu, tức làm chu kỳ sâu thêm ở cả hai chiều.",
    },
    {
      id: "l15_q11",
      question: "Thiết kế bài kiểm tra sức chịu đựng có điểm yếu cố hữu nào?",
      options: [
        "Ngân hàng có thể tối ưu để vượt qua đúng kịch bản đã được công bố",
        "Kết quả không được công bố ra công chúng nên thiếu tính răn đe",
        "Nó chỉ áp dụng cho rủi ro tín dụng chứ không xét rủi ro thị trường",
        "Chi phí thực hiện quá lớn nên chỉ tiến hành được vài năm một lần",
      ],
      correctIndex: 0,
      explanation: "Đây là định luật Goodhart ở cấp hệ thống: khi kịch bản trở thành mục tiêu, nó thôi đo lường được khả năng chống chịu thật.",
    },
    {
      id: "l15_q12",
      question: "Thị trường mua lại có kỳ hạn giữ vai trò gì trong hệ thống tài chính?",
      options: [
        "Là kênh tài trợ ngắn hạn có bảo đảm cho phần lớn các định chế lớn",
        "Là nơi các ngân hàng trung ương phát hành tiền cơ sở ra nền kinh tế",
        "Là thị trường sơ cấp để chính phủ huy động vốn qua phát hành trái phiếu",
        "Là cơ chế thanh toán bù trừ cho các giao dịch chứng khoán niêm yết",
      ],
      correctIndex: 0,
      explanation: "Nó là hệ thống ống nước của tài chính hiện đại: gần như vô hình cho tới khi tắc, và khi tắc thì mọi thứ phía trên dừng lại cùng lúc.",
    },
    {
      id: "l15_q13",
      question: "Chuỗi tái sử dụng tài sản bảo đảm tạo ra rủi ro gì?",
      options: [
        "Cùng một tài sản chống đỡ nhiều nghĩa vụ, nên đứt một khâu là lan cả chuỗi",
        "Giá trị tài sản bảo đảm bị định giá thấp hơn giá thị trường thực tế",
        "Người sở hữu ban đầu mất quyền đòi lại tài sản trong mọi tình huống",
        "Cơ quan quản lý không thể xác định được chủ sở hữu hợp pháp của tài sản",
      ],
      correctIndex: 0,
      explanation: "Chuỗi này làm tăng hiệu quả sử dụng vốn trong thời bình và biến thành kênh lây lan trong khủng hoảng, khi ai cũng đồng loạt đòi lại tài sản của mình.",
    },
    {
      id: "l15_q14",
      question: "Chênh lệch quy định giữa các thị trường dẫn tới hệ quả gì?",
      options: [
        "Rủi ro dịch chuyển sang nơi bị giám sát ít nhất thay vì biến mất",
        "Các quốc gia buộc phải áp dụng cùng một bộ quy định như nhau",
        "Chi phí tuân thủ của định chế tài chính tăng lên ở mọi thị trường",
        "Nhà đầu tư nhỏ lẻ được bảo vệ tốt hơn nhờ cạnh tranh giữa các nước",
      ],
      correctIndex: 0,
      explanation: "Đây là lý do phối hợp quốc tế là điều kiện để quy định có hiệu lực, và cũng là lý do nó khó đạt được khi lợi ích các nước khác nhau.",
    },
    {
      id: "l15_q15",
      question: "Cơ chế xử lý định chế đổ vỡ hiện đại nhắm tới mục tiêu gì?",
      options: [
        "Cho định chế đổ vỡ mà không làm gián đoạn dịch vụ thiết yếu của nó",
        "Bảo đảm mọi định chế lớn đều được cứu để tránh gây hoảng loạn thị trường",
        "Chuyển toàn bộ tài sản của định chế sang sở hữu của nhà nước",
        "Bồi thường đầy đủ cho cổ đông và chủ nợ của định chế bị đổ vỡ",
      ],
      correctIndex: 0,
      explanation: "Ý tưởng là tách phần dịch vụ thiết yếu khỏi phần cổ đông và chủ nợ: nghiệp vụ tiếp tục chạy, còn người chấp nhận rủi ro thì chịu lỗ.",
    },
    {
      id: "l15_q16",
      question: "Đánh đổi cốt lõi của quy định tài chính là gì?",
      options: [
        "Ổn định hệ thống đổi lấy khả năng phân bổ vốn và chấp nhận rủi ro",
        "Bảo vệ nhà đầu tư nhỏ đổi lấy lợi nhuận của các định chế tài chính lớn",
        "Minh bạch thông tin đổi lấy tốc độ xử lý giao dịch trên thị trường",
        "Chi phí tuân thủ đổi lấy mức thuế thấp hơn cho ngành tài chính",
      ],
      correctIndex: 0,
      explanation: "Một hệ thống không bao giờ đổ vỡ cũng là hệ thống không cấp vốn cho rủi ro đáng chấp nhận. Câu hỏi thật luôn là mức đánh đổi nào, không phải có hay không.",
    },
  ],
};

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
