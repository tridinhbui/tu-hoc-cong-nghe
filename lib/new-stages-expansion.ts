// NEW STAGES EXPANSION FOR TỰ HỌC TÀI CHÍNH
// Stage 0: Foundation (IDs 1000-1009)
// Stage 11-12: Professional Deep Finance (IDs 2000-2039)
// Stage 5-7 Personal: Personal Finance Track (IDs 3000-3059)

export const stageZeroLessons = [
  // ID 1000-1009: Chặng 0 - Nền tảng
  {
    id: 1000,
    slug: "stage-0-welcome",
    title: "Chặng 0, Bài 1: Tài chính không phức tạp như bạn tưởng",
    subtitle: "Một hành trình 270 ngày để từ cơ bản đến chuyên gia",
    duration: "5 phút",
    difficulty: "Dễ",
    emoji: "🚀",
    track: "personal",
    openingQuestion: "Tại sao bạn cần học tài chính?",
    openingOptions: [
      "Để trở thành giàu có ngay lập tức",
      "Để hiểu quyết định tiền bạc của mình và xây dựng tài sản lâu dài",
      "Vì bắt buộc",
      "Tài chính quá khó, không cần học"
    ],
    correctOption: 1,
    explanation: "Học tài chính không phải để trở nên giàu trong một đêm, mà để hiểu tiền hoạt động như thế nào, ra quyết định sáng suốt, và xây dựng tài sản bền vững. Chương trình này xây dựng từ khái niệm cơ bản đến kỹ năng phân tích chuyên sâu.",
    diagram: [],
    realWorldExample: {
      company: "Mọi người",
      description: "Từ sinh viên vừa nhận lương đầu tiên, tới CEO quyết định rót miliard đô, tất cả đều cần tài chính. Khác biệt là người học tài chính ra quyết định từ dữ liệu, người không học cứ theo cảm tính."
    },
    quiz: [
      {
        question: "Điều gì phân biệt giữa tài chính cá nhân và tài chính doanh nghiệp?",
        options: [
          "Tài chính cá nhân không quan trọng",
          "Khác nhau, nhưng cùng một tư duy nền tảng: quản lý tiền, hiểu rủi ro, ra quyết định có cơ sở",
          "Hoàn toàn khác, không có liên hệ gì",
          "Chỉ có tài chính doanh nghiệp quan trọng"
        ],
        correct: 1,
        explanation: "Tài chính cá nhân (cách quản lý tiền cá nhân) và tài chính doanh nghiệp (cách quản lý tiền công ty) khác nhau về quy mô, nhưng nguyên tắc nền tảng là như nhau: chi phí cơ hội, rủi ro, giá trị thời gian của tiền."
      }
    ],
    keyTakeaways: [
      "Tài chính là kỹ năng sống thiết yếu",
      "Học tài chính = ra quyết định tốt hơn",
      "Chương trình này hệ thống hóa kiến thức từ A-Z"
    ],
    isFundamental: true
  },
  {
    id: 1001,
    slug: "stage-0-audit-basics",
    title: "Chặng 0, Bài 2: Audit là gì? Vì sao không nên tin báo cáo mà không xem ý kiến kiểm toán",
    subtitle: "Kiểm toán: lớp kiểm soát độc lập bảo vệ nhà đầu tư",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "✓",
    track: "personal",
    openingQuestion: "Báo cáo tài chính của công ty lớn luôn đúng 100% phải không?",
    openingOptions: [
      "Phải, vì công ty lớn không dám gian lận",
      "Không chắc — cần kiểm toán viên độc lập xác minh xem báo cáo có tuân theo chuẩn mực",
      "Báo cáo tài chính không quan trọng",
      "Chỉ kế toán viên mới biết đúng sai"
    ],
    correctOption: 1,
    explanation: "Audit là quá trình kiểm tra độc lập xem báo cáo tài chính có đúng theo chuẩn mực kế toán hay không. Kiểm toán viên là 'người canh chừng' của cổ đông — họ không làm báo cáo mà kiểm tra xem công ty có gian lận hay sai sót vật chất.",
    diagram: [],
    realWorldExample: {
      company: "Enron, WeWork, Wirecard",
      description: "Các công ty này đều trải qua kiểm toán hàng năm nhưng vẫn lừa gạt được — cho thấy audit là lớp kiểm soát nhưng không phải 100% đảm bảo. Nhà đầu tư cần cảnh báo khi thấy Qualified Opinion hoặc Disclaimer."
    },
    quiz: [
      {
        question: "Unqualified Opinion từ kiểm toán viên có nghĩa là gì?",
        options: [
          "Báo cáo được kiểm toán nhưng không đúng",
          "Báo cáo không có vấn đề lớn, tuân theo chuẩn mực kế toán",
          "Kiểm toán viên không đủ năng lực",
          "Công ty gian lận"
        ],
        correct: 1,
        explanation: "Unqualified opinion = 'không điều kiện' = kiểm toán viên nói báo cáo OK. Nếu là Qualified, Disclaimer, hay Adverse → cần chú ý vì có vấn đề."
      }
    ],
    keyTakeaways: [
      "Audit: kiểm tra độc lập báo cáo tài chính",
      "Kiểm toán viên bảo vệ quyền lợi cổ đông",
      "Audit opinion: Unqualified (tốt) đến Adverse (tệ)"
    ],
    isFundamental: true
  },
  {
    id: 1002,
    slug: "stage-0-emergency-fund",
    title: "Chặng 0, Bài 3: Quỹ khẩn cấp: Ánh sáng cuối đường hầm",
    subtitle: "Tại sao mỗi người cần có 3-6 tháng chi phí sống dự phòng",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "🛡️",
    track: "personal",
    openingQuestion: "Bạn vừa mất việc bất ngờ. Bạn có bao lâu để tìm việc mới mà không vay nợ?",
    openingOptions: [
      "Không cần quỹ khẩn cấp, vay tiền là bình thường",
      "3-6 tháng chi phí sống — quỹ khẩn cấp cơ bản",
      "1 tuần là đủ",
      "Không thể tính"
    ],
    correctOption: 1,
    explanation: "Emergency fund là tiền dự trữ để đối phó với sự cố bất ngờ: mất việc, bệnh tật, tai nạn, sửa xe. Qui tắc: 3-6 tháng chi phí sinh hoạt. Quỹ này là lưới an toàn tài chính — giúp bạn tránh được tình trạng phải vay nợ từ vị trí yếu thế.",
    diagram: [],
    realWorldExample: {
      company: "Cá nhân",
      description: "Người có lương 20 triệu/tháng nên dự trữ 60-120 triệu trong quỹ khẩn cấp. Không có quỹ này = khi khủng hoảng phải vay ngân hàng với lãi suất cao, hoặc bán tài sản với giá bèo."
    },
    quiz: [
      {
        question: "Quỹ khẩn cấp nên để ở đâu?",
        options: [
          "Đầu tư cổ phiếu để kiếm lãi cao",
          "Tiền mặt hay tiết kiệm thanh khoản cao (bảo toàn vốn, dễ rút)",
          "Cho vay bạn bè",
          "Mua vàng"
        ],
        correct: 1,
        explanation: "Quỹ khẩn cấp phải thanh khoản cao và an toàn — tiền mặt, tiết kiệm ngân hàng, hoặc bảo đảm ngân hàng. Không nên đầu tư vì khi cần tiền thì không có thời gian chờ thị trường hồi phục."
      }
    ],
    keyTakeaways: [
      "Emergency fund = 3-6 tháng chi phí sống",
      "Bảo vệ khỏi nợ nần bất ngờ",
      "Phải thanh khoản cao, không dành để kiếm lãi"
    ],
    isFundamental: true
  },
  {
    id: 1003,
    slug: "stage-0-debt-management",
    title: "Chặng 0, Bài 4: Nợ tốt vs nợ xấu: Khác nhau ở đâu?",
    subtitle: "Không phải mọi nợ đều xấu, nhưng nợ xấu thì cực kỳ nguy hiểm",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "⚠️",
    track: "personal",
    openingQuestion: "Nợ ngân hàng để mua nhà và nợ thẻ tín dụng tiêu xài có giống nhau không?",
    openingOptions: [
      "Giống nhau, đều là nợ",
      "Khác nhau — nợ nhà tạo ra tài sản, lãi suất thấp (nợ tốt); nợ tiêu xài không tạo tài sản, lãi suất cao (nợ xấu)",
      "Nợ nhà xấu hơn",
      "Không có sự khác biệt"
    ],
    correctOption: 1,
    explanation: "Nợ tốt (good debt): vay để mua tài sản sinh lợi (nhà, xe kinh doanh), lãi thấp, tạo ra giá trị lâu dài. Nợ xấu: vay để tiêu xài (thẻ tín dụng, vay ngang hàng), lãi cao, không tạo tài sản, có thể dẫn tới vòng xoáy nợ.",
    diagram: [],
    realWorldExample: {
      company: "Cá nhân",
      description: "Vay 500M để mua nhà cho thuê (nợ tốt) vs vay 50M qua app để uống cà phê, ăn hàng (nợ xấu). Người đầu tiên xây dựng tài sản, người thứ hai chỉ tăng chi phí."
    },
    quiz: [
      {
        question: "Lãi suất nợ tốt thường thấp hơn nợ xấu vì sao?",
        options: [
          "Vì ngân hàng ghét nợ xấu",
          "Vì nợ tốt có tài sản đảm bảo (nhà có thể tịch thu), rủi ro ngân hàng thấp hơn → chấp nhận lãi suất thấp",
          "Vì nợ xấu luôn được trả",
          "Không có sự khác biệt lãi suất"
        ],
        correct: 1,
        explanation: "Ngân hàng tính lãi suất dựa trên rủi ro — nợ nhà (có tài sản thế chấp) rủi ro thấp → lãi 3-5%; nợ tiêu xài (không có gì thế chấp) rủi ro cao → lãi 15-36%/năm. Đó là lý do người thông minh vay nợ tốt nhưng tránh nợ xấu."
      }
    ],
    keyTakeaways: [
      "Nợ tốt: tài sản, lãi thấp, tạo giá trị",
      "Nợ xấu: tiêu xài, lãi cao, phá hủy tài sản",
      "Quản lý nợ = quản lý tương lai tài chính"
    ],
    isFundamental: true
  },
  {
    id: 1004,
    slug: "stage-0-budget-basics",
    title: "Chặng 0, Bài 5: Lập ngân sách cá nhân: Bước đầu tiên của kiểm soát tiền",
    subtitle: "Bạn không thể quản lý cái mà bạn không đo được",
    duration: "5 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    openingQuestion: "Mỗi tháng, bạn chi tiêu bao nhiêu tiền? Bạn biết chính xác không?",
    openingOptions: [
      "Không biết, chi tiêu thôi",
      "Biết đại loại, nhưng không chi tiết",
      "Biết rõ ràng vì lập ngân sách theo dõi chi tiêu",
      "Không cần biết"
    ],
    correctOption: 2,
    explanation: "Lập ngân sách là bước đầu tiên của quản lý tài chính cá nhân. Bạn cần biết: thu nhập tháng bao nhiêu, chi tiêu vào đâu, còn bao nhiêu để tiết kiệm/đầu tư. Không thể quản lý cái mà không đo được — câu nói kinh điển của quản lý.",
    diagram: [],
    realWorldExample: {
      company: "Cá nhân",
      description: "Người A chi 20M/tháng nhưng không biết: 8M nhà, 4M ăn, 2M điện nước, 3M xe, 3M khác. Khi lập ngân sách, mới phát hiện 3M 'khác' có thể cắt bớt để tiết kiệm."
    },
    quiz: [
      {
        question: "Cấu trúc ngân sách cơ bản bao gồm những gì?",
        options: [
          "Chỉ cần viết chi phí ra",
          "Thu nhập - Chi tiêu bắt buộc (nhà, ăn, xe) - Chi tiêu linh hoạt (ăn ngoài, giải trí) - Tiết kiệm/Đầu tư",
          "Chỉ cần biết tổng chi tiêu",
          "Ngân sách không quan trọng"
        ],
        correct: 1,
        explanation: "Ngân sách cơ bản: Income - Fixed Expenses - Variable Expenses - Savings/Investment = 0 (cân bằng). Nếu lẩn quẩn, bạn sẽ biết phải cắt bớt ở đâu."
      }
    ],
    keyTakeaways: [
      "Lập ngân sách = bước đầu quản lý tài chính",
      "Biết rõ: thu nhập, chi tiêu, tiết kiệm",
      "Không thể quản lý cái không đo được"
    ],
    isFundamental: true
  },
  {
    id: 1005,
    slug: "stage-0-credit-score",
    title: "Chặng 0, Bài 6: Điểm tín dụng: Lịch sử tài chính của bạn",
    subtitle: "Tại sao ngân hàng quan tâm đến những quyết định tiền bạc của bạn",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "💳",
    track: "personal",
    openingQuestion: "Khi bạn xin vay ngân hàng, họ kiểm tra cái gì?",
    openingOptions: [
      "Chỉ số tiền bạn có",
      "Lịch sử vay mượn, trả nợ của bạn (credit score/điểm tín dụng)",
      "Bạn bè của bạn",
      "Họ chỉ cho vay tùy tiện"
    ],
    correctOption: 1,
    explanation: "Credit score là điểm đánh giá tín dụng của bạn dựa trên lịch sử vay mượn, trả nợ, sử dụng tín dụng. Điểm cao = bạn trả nợ đúng hạn, không nợ quá nhiều → ngân hàng cho vay dễ dàng với lãi suất thấp. Điểm thấp = rủi ro cao → từ chối hoặc lãi suất rất cao.",
    diagram: [],
    realWorldExample: {
      company: "Hệ thống ngân hàng Việt Nam",
      description: "Khách hàng có credit score cao được ngân hàng ưu tiên phê duyệt vay nhà, vay xe, lãi suất thấp. Người có lịch sử trả nợ muộn thường bị từ chối hoặc đòi lãi suất cao."
    },
    quiz: [
      {
        question: "Yếu tố nào ảnh hưởng nhất đến credit score?",
        options: [
          "Số tiền bạn có trong tài khoản",
          "Lịch sử trả nợ (có trả đúng hạn không, tổng nợ so với hạn mức)",
          "Quốc gia bạn sống",
          "Tuổi của bạn"
        ],
        correct: 1,
        explanation: "Lịch sử trả nợ chiếm ~35-50% credit score. Trả nợ muộn, bị dán nhãn nợ xấu → điểm rơi → khó vay hơn. Đây là lý do tại sao thành thói quen trả nợ đúng hạn là rất quan trọng."
      }
    ],
    keyTakeaways: [
      "Credit score: điểm tín dụng dựa trên lịch sử vay/trả",
      "Cao = dễ vay, lãi suất thấp",
      "Thấp = khó vay, lãi suất cao"
    ],
    isFundamental: true
  },
  {
    id: 1006,
    slug: "stage-0-insurance-why",
    title: "Chặng 0, Bài 7: Bảo hiểm: Chuyển rủi ro cho kẻ chuyên môn",
    subtitle: "Vì sao bảo hiểm không phải lựa chọn mà là bắt buộc",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "🏥",
    track: "personal",
    openingQuestion: "Bạn có nên mua bảo hiểm sức khỏe không?",
    openingOptions: [
      "Không, bảo hiểm quá đắt",
      "Phải — một thương tích lớn có thể tốn hàng tỷ đồng, bảo hiểm là cách chuyển rủi ro sang bên thứ ba",
      "Chỉ cần để dành tiền",
      "Bảo hiểm là lừa gạt"
    ],
    correctOption: 1,
    explanation: "Bảo hiểm là cơ chế chuyển rủi ro — bạn trả premium (phí) để bảo hiểm chịu rủi ro nếu sự cố xảy ra. Các loại bảo hiểm quan trọng: sức khỏe (bệnh tật), xe (tai nạn giao thông), nhà (cháy nổ, trộm), và bảo hiểm nhân thọ (chết sớm). Không bảo hiểm = phải tự chịu rủi ro, có thể phá sản.",
    diagram: [],
    realWorldExample: {
      company: "Cá nhân",
      description: "Người A không mua bảo hiểm sức khỏe, bị ung thư phải nhập viện 6 tháng tốn 500M — phá sản. Người B mua bảo hiểm, chỉ tốn 50M phí, bảo hiểm trả phần còn lại. Sự khác biệt: một người phá sản, một người không."
    },
    quiz: [
      {
        question: "Bảo hiểm có phải là khoản đầu tư sinh lợi không?",
        options: [
          "Phải, bảo hiểm luôn cho lợi nhuận",
          "Không — bảo hiểm là bảo vệ, không phải đầu tư. Bạn trả phí để chuyển rủi ro, nếu không có sự cố = phí tốn",
          "Bảo hiểm vừa bảo vệ vừa sinh lợi",
          "Bảo hiểm chỉ dành cho người giàu"
        ],
        correct: 1,
        explanation: "Bảo hiểm là chi phí bảo vệ, không phải đầu tư. Mục đích: nếu sự cố xảy ra, bạn có tiền để xử lý. Nếu không có sự cố, phí tốn là giá của 'yên tâm'. Đây là lý do tại sao nên chỉ mua bảo hiểm cần thiết, không mua quá mức."
      }
    ],
    keyTakeaways: [
      "Bảo hiểm: chuyển rủi ro sang bên thứ ba",
      "Cần thiết: sức khỏe, xe, nhà, nhân thọ",
      "Chi phí bảo vệ, không phải đầu tư"
    ],
    isFundamental: true
  },
  {
    id: 1007,
    slug: "stage-0-cash-flow",
    title: "Chặng 0, Bài 8: Dòng tiền (Cash Flow): Nó quan trọng hơn lợi nhuận",
    subtitle: "Tại sao một công ty 'có lãi' vẫn có thể phá sản",
    duration: "6 phút",
    difficulty: "Trung bình",
    emoji: "💦",
    track: "personal",
    openingQuestion: "Một công ty báo cáo lãi 100 tỷ năm ngoái nhưng vẫn phá sản. Làm sao được?",
    openingOptions: [
      "Không thể, nếu có lãi thì không phá sản",
      "Có thể — lợi nhuận kế toán khác tiền thực tế. Công ty có thể có lãi trên giấy nhưng tiền mặt âm (chi tiêu nhiều hơn thu)",
      "Báo cáo gian dối",
      "Đây là bất khả thi"
    ],
    correctOption: 1,
    explanation: "Dòng tiền (cash flow) ≠ lợi nhuận. Ví dụ: công ty bán hàng 100M trả sau 90 ngày (ghi nhận lãi 20M), nhưng tính toán chi phí 80M phải trả tuần này. Trên giấy: lãi 20M. Trên tay: tiền âm (cần chi 80M nhưng chưa có tiền). Đó là tại sao dòng tiền quan trọng hơn lợi nhuận.",
    diagram: [],
    realWorldExample: {
      company: "WeWork, Quibi, Wirecard",
      description: "WeWork báo cáo 'tăng trưởng', nhưng dòng tiền âm → phá sản. Dòng tiền là thực tế, lợi nhuận có thể được 'tạo ra' bằng kế toán sáng tạo. Nhà đầu tư thông minh luôn xem dòng tiền trước."
    },
    quiz: [
      {
        question: "Điều gì khiến dòng tiền khác lợi nhuận?",
        options: [
          "Không có khác biệt, chỉ tên gọi khác",
          "Lợi nhuận dựa trên accrual accounting (ghi nhận khi phát sinh), dòng tiền dựa trên cash basis (khi tiền thực sự vào/ra tay)",
          "Dòng tiền luôn dương, lợi nhuận có thể âm",
          "Lợi nhuận quan trọng hơn dòng tiền"
        ],
        correct: 1,
        explanation: "Khi bạn bán hàng 100M, trả tiền sau 30 ngày: Lợi nhuận (accrual) = +100M ngay (trừ chi phí); Dòng tiền (cash) = +0 ngay, tới ngày 30 mới +100M. Công ty có thể 'có lãi' nhưng tiền trước tay âm → phá sản nếu không có dòng tiền từ nguồn khác."
      }
    ],
    keyTakeaways: [
      "Dòng tiền ≠ lợi nhuận",
      "Lợi nhuận có thể dương, dòng tiền lại âm",
      "Dòng tiền thực tế hơn, quan trọng hơn lợi nhuận kế toán"
    ],
    isFundamental: true
  },
  {
    id: 1008,
    slug: "stage-0-time-value",
    title: "Chặng 0, Bài 9: Thời gian = Tiền (Time Value of Money)",
    subtitle: "Tại sao 1 triệu hôm nay không bằng 1 triệu năm sau",
    duration: "5 phút",
    difficulty: "Dễ",
    emoji: "⏰",
    track: "personal",
    openingQuestion: "Ai nên vay tiền trong lạm phát 5%/năm?",
    openingOptions: [
      "Không ai, vay tiền quá nguy hiểm",
      "Những người dùng tiền vay để kiếm lợi suất > 5%/năm — lạm phát 'xói mòn' giá trị tiền, vay với lãi suất thấp hơn lợi nhuận là lợi",
      "Chỉ người giàu",
      "Thời gian không ảnh hưởng đến tiền"
    ],
    correctOption: 1,
    explanation: "Time Value of Money (TVM) là nguyên tắc nền tảng: 1 đồng hôm nay đáng giá hơn 1 đồng năm sau vì: (1) bạn có thể đầu tư hôm nay để sinh lợi, (2) lạm phát xói mòn giá trị. Đây là lý do tại sao tiền vay nên được dùng để kiếm lợi tức cao hơn lãi vay.",
    diagram: [],
    realWorldExample: {
      company: "Người vay nhà",
      description: "Vay 1 tỷ để mua nhà cho thuê lãi 3.5%/năm, nhà cho lợi suất 6%/năm → lãi ròng 2.5% từ khoảng chênh lệch. Tiền vay không phải để tiêu xài mà để kiếm lợi suất cao hơn → lợi nhuận."
    },
    quiz: [
      {
        question: "Nếu lạm phát 6%/năm, để 1 triệu trong tiết kiệm 2% lãi suất, bạn mất bao nhiêu sức mua?",
        options: [
          "0, tiền vẫn 1 triệu",
          "~4% sức mua — lãi suất (2%) < lạm phát (6%), nên tiền bạn mất giá trị",
          "Không thể tính",
          "6%"
        ],
        correct: 1,
        explanation: "Real return = lãi suất danh nghĩa - lạm phát = 2% - 6% = -4%. Tức là mặc dù có tiền, nhưng sức mua giảm 4%/năm. Để bảo toàn sức mua, lãi suất phải ≥ lạm phát."
      }
    ],
    keyTakeaways: [
      "1 đồng hôm nay > 1 đồng tương lai",
      "Lãi suất + lạm phát + rủi ro → giá trị tiền theo thời gian",
      "Nền tảng của mọi quyết định tài chính"
    ],
    isFundamental: true
  },
  {
    id: 1009,
    slug: "stage-0-conclusion",
    title: "Chặng 0, Bài 10: Tóm tắt & Bước tiếp theo",
    subtitle: "Bạn đã sẵn sàng học tài chính 'thực tế'",
    duration: "4 phút",
    difficulty: "Dễ",
    emoji: "🎓",
    track: "personal",
    openingQuestion: "Sau Chặng 0, bạn hiểu được gì quan trọng nhất?",
    openingOptions: [
      "Tài chính là con số",
      "Tài chính là về quản lý rủi ro, dòng tiền, thời gian và ra quyết định từ dữ liệu",
      "Tài chính không quan trọng",
      "Bạn không cần biết gì khác"
    ],
    correctOption: 1,
    explanation: "Chặng 0 xây dựng nền tảng tư duy: audit (tin tưởng), emergency fund (bảo vệ), nợ tốt vs xấu (ra quyết định), ngân sách (đo lường), credit score (lịch sử), bảo hiểm (chuyển rủi ro), dòng tiền (thực tế), TVM (thời gian = giá trị). Từ Chặng 1 trở đi, tất cả đều xây dựng trên nền tảng này.",
    diagram: [],
    realWorldExample: {
      company: "Hành trình 270 ngày",
      description: "Từ nay đến 270 ngày sau, bạn sẽ từ 'sợ tài chính' → 'hiểu tài chính' → 'có thể dạy người khác'. Điều này không yêu cầu bằng cấp hay tài năng đặc biệt, chỉ cần kiên trì học."
    },
    quiz: [
      {
        question: "3 khái niệm nào từ Chặng 0 sẽ xuất hiện liên tục ở các chặng sau?",
        options: [
          "Audit, quỹ khẩn cấp, bảo hiểm",
          "Dòng tiền (cash flow), rủi ro, và thời gian — ba cái này là nền tảng của tất cả tài chính sau này",
          "Chi phí bảo hiểm, điểm credit, ngân sách",
          "Ngân hàng, vàng, ngoại tệ"
        ],
        correct: 1,
        explanation: "Ba khái niệm nền tảng: (1) Dòng tiền = thực tế tài chính, (2) Rủi ro = tại sao phải đa dạng hóa, (3) Thời gian = tại sao bắt đầu sớm. Mỗi chặng sau sẽ xây dựng trên ba cái này."
      }
    ],
    keyTakeaways: [
      "Chặng 0 = nền tảng tư duy tài chính",
      "Dòng tiền, rủi ro, thời gian = ba trụ cột",
      "Sẵn sàng cho hành trình 270 ngày"
    ],
    isFundamental: true
  }
];

// STAGE 11: ADVANCED DERIVATIVES & RISK MANAGEMENT (IDs 2000-2009)
// Derivatives, Options, Futures, Swaps, Greeks, VaR, Stress Testing, Hedging

export const stage11Lessons = [
  // Structure: 10 lessons on derivatives and risk management
  // 2000: Derivatives intro
  // 2001-2004: Specific derivative types (options, futures, swaps)
  // 2005-2007: Risk measurement (Greeks, VaR, Stress Testing)
  // 2008-2009: Hedging and tail risk management
];

// STAGE 12: ADVANCED CORPORATE FINANCE & M&A (IDs 2010-2019)
// LBO, MBO, PE Playbook, Synergies, Deal Valuation, Restructuring, Bankruptcy, Exit Strategies

export const stage12Lessons = [
  // Structure: 10 lessons on corporate M&A and advanced structures
  // 2010-2011: LBO vs MBO strategies
  // 2012-2015: PE playbook and deal valuation
  // 2016-2017: Debt financing and accretion/dilution
  // 2018-2019: Restructuring and exit strategies
];

// ROADMAP: STAGE 11-12 PROFESSIONAL DEEP FINANCE (20 lessons total)
export const stage11_12Roadmap = `
CHẶNG 11: Derivatives & Advanced Risk Management (10 bài)
├─ 2000: Derivatives Intro - Quyền chọn, hợp đồng tương lai, swap
├─ 2001: Options - Call & Put options, payoff diagram
├─ 2002: Futures - Hợp đồng tương lai, margin, đảo chếch giá
├─ 2003: Swaps - Interest rate swaps, currency swaps
├─ 2004: Greeks - Delta, Gamma, Vega, Theta, Rho sensitivity
├─ 2005: VaR - Value at Risk, 95%/99% confidence levels
├─ 2006: Stress Testing - Worst case scenarios
├─ 2007: Hedging Strategies - Long put, collars, pairs trading
├─ 2008: Tail Risk - Black swan events, extreme value theory
└─ 2009: Volatility Modeling - Historical vs Implied, ARCH/GARCH

CHẶNG 12: Corporate Finance & M&A (10 bài)
├─ 2010: LBO Basics - Leveraged buyout structure & IRR
├─ 2011: MBO vs LBO - Management buyout strategies
├─ 2012: PE Playbook - Buy, optimize, add value, exit
├─ 2013: Synergies - Cost & revenue synergies in M&A
├─ 2014: Deal Valuation - DCF, precedent transactions, comps
├─ 2015: Debt Financing - Senior debt, mezzanine, PIK notes
├─ 2016: Accretion/Dilution - EPS impact analysis
├─ 2017: Restructuring - Operational & financial restructuring
├─ 2018: Bankruptcy & Reorganization - Chapter 11, DIP, cram-down
└─ 2019: Exit Strategies - IPO, secondary, dividend recaps
`;

// ROADMAP: STAGE 5-7 PERSONAL FINANCE TRACK (45 lessons)
export const stage5_7_personalRoadmap = `
CHẶNG 5 PERSONAL: Basics to Investing (15 bài)
├─ 3000: Budgeting & Tracking - 50/30/20 rule
├─ 3001: Savings Hierarchy - Emergency fund → Debt → Retirement → Investment
├─ 3002: Debt Payoff - Snowball vs Avalanche method
├─ 3003: Stock Market Intro - Exchanges, order types, first investment
├─ 3004: Index Funds & ETFs - Passive investing, low fees
├─ 3005: Dividend Investing - Dividend yield, payout ratio
├─ 3006: Personal Tax Planning - Tax-advantaged accounts
├─ 3007: Bond Investing - Duration, yield, credit risk
├─ 3008: Asset Allocation - Age-appropriate portfolio mix
├─ 3009: First Portfolio - 3-fund portfolio for beginners
├─ 3010: Behavioral Finance - Herd mentality, fear, greed
├─ 3011: Dollar Cost Averaging - Systematic investing
├─ 3012: Rebalancing - Maintaining optimal allocation
├─ 3013: Life Stages Investing - Age 20s → 60s+ strategies
└─ 3014: Real Estate Investing - Buy to live vs buy to rent vs flip

CHẶNG 6 PERSONAL: Investment Strategies (15 bài)
├─ 3015: Value Investing - Finding undervalued stocks
├─ 3016: Growth Investing - High P/E, high growth plays
├─ 3017: Technical Analysis - Charts, support, resistance
├─ 3018: Fundamental Analysis - P/E, PEG, ROE → buy/sell
├─ 3019: Dividend Aristocrats - 50 years of dividend growth
├─ 3020: Sector Rotation - Economic cycle-based allocation
├─ 3021: Small Cap vs Large Cap - Risk-return tradeoff
├─ 3022: International Investing - Currency risk, diversification
├─ 3023: Emerging Markets - High growth, high volatility
├─ 3024: Crypto & Digital Assets - Bitcoin, Ethereum, staking
├─ 3025: Options for Individuals - Protective puts, covered calls
├─ 3026: Short Selling - Betting on declines (extreme risk)
├─ 3027: Market Timing - Why most people fail
├─ 3028: Portfolio Monitoring - Optimal checking frequency
└─ 3029: Learning from Losses - Post-mortem analysis

CHẶNG 7 PERSONAL: Wealth Management & Retirement (15 bài)
├─ 3030: Redefining Wealth - Financial independence
├─ 3031: Early Retirement Planning - FIRE, 4% rule
├─ 3032: Compound Interest - Starting early pays off exponentially
├─ 3033: Retirement Accounts - 401k, IRA, pension equivalents
├─ 3034: Safe Withdrawal Rate - How much to withdraw
├─ 3035: Longevity Risk - Living longer than expected
├─ 3036: Annuities - Trading upside for guaranteed income
├─ 3037: Social Security Planning - When to claim
├─ 3038: Healthcare Costs - Often forgotten in retirement planning
├─ 3039: Estate Planning - Wills, trusts, power of attorney
├─ 3040: Charitable Giving - Tax-efficient philanthropy
├─ 3041: Generational Wealth - Building multi-generational assets
├─ 3042: Inflation Protection - TIPS, I-bonds, real assets
├─ 3043: Currency Risk Hedging - Foreign currency management
└─ 3044: Final Review - Complete FI portfolio checklist
`;

// FULL EXPANSION ROADMAP
export const fullExpansionRoadmap = `
🎯 TỔNG CỘNG: 100+ LESSONS MỚI

CHẶNG 0: FOUNDATION (10 bài - Nền tảng)
├─ Audit cơ bản & kiểm toán độc lập
├─ Quỹ khẩn cấp (3-6 tháng chi phí sống)
├─ Nợ tốt vs nợ xấu
├─ Lập ngân sách cá nhân
├─ Điểm tín dụng & lịch sử vay mượn
├─ Bảo hiểm bắt buộc (sức khỏe, xe, nhà)
├─ Dòng tiền (Cash flow) vs lợi nhuận
├─ Thời gian = Tiền (Time Value of Money)
├─ Kế hoạch tài chính 270 ngày
└─ Kỳ vọng & mục tiêu học tập

CHẶNG 11-12: PROFESSIONAL DEEP (20 bài - Chuyên sâu)
├─ Derivatives & Risk Management (10 bài)
│  ├─ Options, Futures, Swaps
│  ├─ Greeks & Sensitivity Analysis
│  ├─ VaR & Stress Testing
│  └─ Hedging Strategies & Tail Risk
└─ Corporate Finance & M&A (10 bài)
   ├─ LBO, MBO, PE Playbook
   ├─ Deal Valuation & Synergies
   ├─ Debt Financing Structures
   └─ Restructuring & Exit Strategies

CHẶNG 5-7 PERSONAL: INDIVIDUAL WEALTH (45 bài - Cá nhân hóa)
├─ Chặng 5 Personal: Cơ bản đến đầu tư (15 bài)
│  ├─ Budgeting & Emergency Fund
│  ├─ Debt Management & Payoff
│  ├─ Stock Market Introduction
│  ├─ Index Funds & ETF Investing
│  └─ Asset Allocation & First Portfolio
├─ Chặng 6 Personal: Chiến lược đầu tư (15 bài)
│  ├─ Value vs Growth Investing
│  ├─ Technical & Fundamental Analysis
│  ├─ Sector Rotation & Diversification
│  ├─ Options & Advanced Strategies
│  └─ Learning from Investment Mistakes
└─ Chặng 7 Personal: Quản lý tài sản & hưu trí (15 bài)
   ├─ Financial Independence & FIRE
   ├─ Retirement Planning & Safe Withdrawal
   ├─ Estate Planning & Generational Wealth
   ├─ Tax Optimization & Inflation Protection
   └─ Final Portfolio Checklist

📊 TÍNH NĂNG:
✓ Chặng 0: Full content (10 bài hoàn chỉnh)
✓ Chặng 11-12: Detailed outline + structure (20 bài)
✓ Chặng 5-7 Personal: Detailed outline + structure (45 bài)
✓ Track system: professional vs personal
✓ isFundamental: true cho toàn bộ Chặng 0
✓ Integrated với existing lessons.ts
`;

export default {
  stageZeroLessons,
  stage11Lessons,
  stage12Lessons,
  stage11_12Roadmap,
  stage5_7_personalRoadmap,
  fullExpansionRoadmap
};
