// New module-scope data tables discovered by scripts/i18n-coverage.mjs after
// it started reporting strings inside const arrays/objects, not just JSX.
// One sub-object per component, named after the file it comes from.
//
// This file is deliberately NOT wired into vi.ts / en.ts / sections/index.ts
// yet - see AGENTS.md "Translating the UI". Until it is wired, `tsc` reports
// every key referenced under `t.dataRest...` as missing on the Vietnamese
// Dictionary type; that is expected, not a sign something here is wrong.

export const dataRestVi = {
  dataRest: {
    appNavbar: {
      library: "Thư viện",
      // "Học bài" / "Học theo nghề" have no existing dictionary key
      // (t.nav only covers the entries that already went through labelKey).
      hocBai: "Học bài",
      hocTheoNghe: "Học theo nghề",
      // Parity exemptions: proper noun / symbol, identical in both languages.
      gameKingdomLabel: "Game Kingdom",
      cmdKHint: "⌘K",
    },
    dashboardTour: {
      hocBaiCtaTitle: "Chỗ học bài",
      hocBaiCtaText:
        'Toàn bộ lộ trình và bài học nằm ở trang Học bài. Bấm vào đây (hoặc mục "Học bài" ở menu bên trái) mỗi khi bạn muốn học.',
      userStatsTitle: "Tiến độ của bạn",
      userStatsText: "Theo dõi XP, cấp độ và số ngày học liên tiếp ở đây.",
      freeDocsTitle: "Tài liệu miễn phí & Thống kê",
      freeDocsText:
        "Trên máy tính, hai mục này nằm ở đây. Trên điện thoại, bấm vào biểu tượng menu (☰) để mở.",
      resumeLearningTitle: "Học tiếp từ đâu",
      resumeLearningText:
        "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình, không cần tự tìm.",
      trackSelectorTitle: "Chọn lộ trình",
      trackSelectorText:
        "Bạn có 2 lộ trình: Tài chính cá nhân (ngắn hơn, cho người mới) và Tài chính chuyên ngành (sâu hơn). Có thể đổi qua lại bất cứ lúc nào.",
      stageListTitle: "Lộ trình học",
      stageListText:
        "Toàn bộ bài học được chia theo từng Chặng, mở khoá tuần tự. Bấm vào một Chặng để xem danh sách bài bên trong.",
    },
    studyGroupsClient: {
      quickCheers: {
        clap: { label: "Đập tay", message: "👋 Đập tay cổ vũ mọi người cùng học bài nào!" },
        heart: { label: "Bắn tim", message: "❤️ Bắn tim yêu thương tiếp năng lượng học tập!" },
        reminder: { label: "Nhắc học", message: "🔔 Ới ời cả nhóm ơi vào làm bài thôi nào!" },
        boost: { label: "Tiếp sức", message: "🔥 Tiếp sức cháy hết mình hôm nay!" },
      },
      holoPylons: {
        valuation: "Định Giá",
        trading: "Giao Dịch",
        cashflow: "Dòng Tiền",
        fed: "Lãi Suất",
      },
    },
    lessonTour: {
      progressTitle: "Tiến độ đọc bài",
      progressText:
        "Thanh này theo dõi bạn đã đọc đến đâu - tự động lưu lại, quay lại bài học lúc nào cũng thấy đúng chỗ cũ.",
      bookmarkTitle: "Lưu bài để đọc sau",
      bookmarkText: "Bấm vào đây để đánh dấu bài học này, xem lại nhanh trong danh sách đã lưu của bạn.",
      taiTaiTitle: "Tài Tài - mẹo tự động",
      taiTaiText: "Mỗi bài đều có một mẹo ngắn liên quan đến nội dung, tự động chọn cho bạn - không cần hỏi.",
      quizTitle: "Kiểm tra nhanh",
      quizText:
        "Làm quiz ở đây để tự kiểm tra mình đã hiểu bài chưa - kết quả được lưu lại vào tiến độ học của bạn.",
    },
    goalSelectionBanner: {
      goals: {
        personalFinance: {
          name: "Tài chính Cá nhân & Thoát nợ",
          desc: "Cách quản lý chi tiêu, quản lý nợ tốt/xấu, thiết lập quỹ khẩn cấp.",
        },
        basicInvesting: {
          name: "Tích lũy & Đầu tư cơ bản",
          desc: "Học về sức mạnh lãi kép, lạm phát, chứng chỉ quỹ mở, vàng.",
        },
        corporateFinance: {
          name: "Phân tích Doanh nghiệp & Cổ phiếu",
          desc: "Đọc báo cáo tài chính, mô hình phân tích Dupont, dòng tiền FCF, chỉ số ROIC.",
        },
      },
      updatedToast: "Đã cập nhật lộ trình học: {goal}! 🎯",
      currentGoalLabel: "Mục tiêu hiện tại của bạn",
      changeButton: "Thay đổi",
      selectorTitle: "Chọn mục tiêu học tập của bạn 🎯",
      selectorSubtitle:
        "Hệ thống sẽ điều chỉnh lộ trình gợi ý và ưu tiên các bài học phù hợp nhất với mục tiêu của bạn.",
    },
    jobSearchClient: {
      // Career-fit quiz: 5 questions x 4 options. Each option's `type`
      // (Analytical / Compliance / Client-facing / Quantitative) is
      // structural - it drives scoring - and stays in the component.
      quizQuestions: [
        {
          question: "Phong cách xử lý thông tin ưa thích của bạn là gì?",
          options: [
            "Phân tích số liệu, lập mô hình dự báo tương lai",
            "Kiểm tra tính chính xác, rà soát tính tuân thủ quy trình",
            "Giao tiếp, tư vấn, xây dựng và kết nối mối quan hệ khách hàng",
            "Phân tích thống kê định lượng, tính toán xác suất rủi ro",
          ],
        },
        {
          question: "Môi trường làm việc lý tưởng trong mơ của bạn là:",
          options: [
            "Các quỹ đầu tư lớn, công ty chứng khoán năng động",
            "Phòng kế toán tập đoàn lớn, hoặc công ty kiểm toán Big4 chuyên nghiệp",
            "Các chi nhánh ngân hàng thương mại, sàn giao dịch nhộn nhịp",
            "Phòng nguồn vốn, ban quản trị rủi ro ở hội sở ngân hàng lớn",
          ],
        },
        {
          question: "Bạn đối diện thế nào với áp lực và cân bằng cuộc sống (WLB)?",
          options: [
            "Sẵn sàng OT khuya, chịu áp lực tiến độ để đạt thu nhập vượt trội",
            "Muốn giờ giấc hành chính rõ ràng, công việc ổn định ít đột xuất",
            "Chấp nhận áp lực chạy doanh số (KPI) để nhận hoa hồng không giới hạn",
            "Muốn công việc thiên về kỹ thuật chuyên sâu, ít áp lực doanh số",
          ],
        },
        {
          question: "Điểm mạnh nhất mà bạn tự tin muốn phát huy là gì?",
          options: [
            "Lập mô hình Excel, phân tích chi phí - lợi ích chiến lược",
            "Sự cẩn thận, chi tiết tỉ mỉ, tuân thủ nguyên tắc tuyệt đối",
            "Khả năng ăn nói thuyết phục, đồng cảm và mở rộng quan hệ",
            "Tư duy toán học logic, lập trình mô phỏng định lượng (SQL/Python)",
          ],
        },
        {
          question: "Nhóm chứng chỉ nghề nghiệp nào thu hút bạn nhất?",
          options: [
            "CFA (Phân tích đầu tư) / CMA (Quản trị tài chính)",
            "ACCA (Kế toán công chứng) / CPA (Kiểm toán viên)",
            "Chứng chỉ hành nghề Môi giới chứng khoán hoặc Tín dụng ngân hàng",
            "FRM (Quản lý rủi ro) / Chứng chỉ nguồn vốn ACI",
          ],
        },
      ],
      // Label for the synthetic "all categories" filter tab. Every other tab
      // label comes from careerCategoryLabelsOf() (lib/career-categories.ts).
      allCategoriesLabel: "Tất cả",
    },
    globalSearchModal: {
      // Stub search-result data (the real corpus isn't wired in yet - a
      // separate task tracks replacing these). Translated anyway so the
      // English UI doesn't show Vietnamese while that lands; id/category/url
      // stay structural.
      sampleLessons: [
        {
          id: "l-1",
          title: "Audit Tài chính Cá nhân & Tích sản",
          desc: "Đánh giá bức tranh tài sản ròng và dòng tiền cá nhân.",
        },
        {
          id: "l-2",
          title: "Đọc Bảng Cân Đối Kế Toán Doanh Nghiệp",
          desc: "Tài sản = Nợ phải trả + Vốn chủ sở hữu.",
        },
        {
          id: "l-3",
          title: "Phân tích Định giá Cổ phiếu DCF",
          desc: "Chiết khấu dòng tiền tự do FCF về hiện tại.",
        },
        {
          id: "l-4",
          title: "Chi phí vốn WACC & Cấu trúc Nợ",
          desc: "Tính toán chi phí vốn bình quân gia quyền.",
        },
      ],
      sampleGlossary: [
        {
          id: "g-dcf",
          title: "DCF (Discounted Cash Flow)",
          desc: "Phương pháp chiết khấu dòng tiền tự do về hiện tại để định giá doanh nghiệp.",
        },
        {
          id: "g-wacc",
          title: "WACC (Weighted Average Cost of Capital)",
          desc: "Chi phí vốn bình quân gia quyền đại diện cho tỷ lệ sinh lời tối thiểu cần đạt.",
        },
        {
          id: "g-pe",
          title: "P/E (Price to Earnings)",
          desc: "Hệ số giữa giá cổ phiếu và lợi nhuận trên mỗi cổ phiếu.",
        },
        {
          id: "g-roe",
          title: "ROE (Return on Equity)",
          desc: "Tỷ suất lợi nhuận trên vốn chủ sở hữu đo lường hiệu quả sử dụng vốn.",
        },
      ],
      sampleTools: [
        {
          id: "t-networth",
          title: "Máy tính Tài sản ròng",
          desc: "Theo dõi tổng tài sản trừ đi tổng nợ vay cá nhân.",
        },
        {
          id: "t-budget",
          title: "Ngân sách 50/30/20",
          desc: "Phân bổ thu nhập thành Thiết yếu - Mong muốn - Tích sản.",
        },
        {
          id: "t-fire",
          title: "Kế hoạch Tự do tài chính FIRE",
          desc: "Tính số tiền cần tích lũy để nghỉ hưu sớm.",
        },
        {
          id: "t-dcf",
          title: "Máy tính Định giá DCF & WACC",
          desc: "Mô phỏng chiết khấu dòng tiền & tính chi phí vốn doanh nghiệp.",
        },
      ],
    },
  },
};

export const dataRestEn: typeof dataRestVi = {
  dataRest: {
    appNavbar: {
      library: "Library",
      hocBai: "Lessons",
      hocTheoNghe: "Learn by career",
      gameKingdomLabel: "Game Kingdom",
      cmdKHint: "⌘K",
    },
    dashboardTour: {
      hocBaiCtaTitle: "Where to study",
      hocBaiCtaText:
        'The full track and all lessons live on the Lessons page. Click here (or "Lessons" in the left menu) any time you want to study.',
      userStatsTitle: "Your progress",
      userStatsText: "Track your XP, level, and study streak here.",
      freeDocsTitle: "Free resources & Stats",
      freeDocsText:
        "On desktop, these two entries live here. On mobile, tap the menu icon (☰) to open them.",
      resumeLearningTitle: "Where to continue",
      resumeLearningText:
        "Click here to jump straight to the next lesson in your track, no need to search for it.",
      trackSelectorTitle: "Choose a track",
      trackSelectorText:
        "You have 2 tracks: Personal Finance (shorter, for beginners) and Professional Finance (deeper). You can switch between them any time.",
      stageListTitle: "Learning path",
      stageListText:
        "All lessons are split into Stages, unlocked in order. Click a Stage to see the lessons inside it.",
    },
    studyGroupsClient: {
      quickCheers: {
        clap: { label: "Clap", message: "👋 Give everyone a clap to cheer them on!" },
        heart: { label: "Heart", message: "❤️ Send a heart to boost the study energy!" },
        reminder: { label: "Reminder", message: "🔔 Hey everyone, come do your lesson!" },
        boost: { label: "Boost", message: "🔥 Bring the energy today!" },
      },
      holoPylons: {
        valuation: "Valuation",
        trading: "Trading",
        cashflow: "Cash Flow",
        fed: "Interest Rates",
      },
    },
    lessonTour: {
      progressTitle: "Reading progress",
      progressText:
        "This bar tracks how far you've read - saved automatically, so you always come back to the same spot.",
      bookmarkTitle: "Save for later",
      bookmarkText: "Click here to bookmark this lesson, so you can quickly find it in your saved list.",
      taiTaiTitle: "Tài Tài - automatic tip",
      taiTaiText: "Every lesson has a short tip related to its content, picked automatically for you - no need to ask.",
      quizTitle: "Quick check",
      quizText: "Take the quiz here to check your own understanding - the result is saved to your learning progress.",
    },
    goalSelectionBanner: {
      goals: {
        personalFinance: {
          name: "Personal Finance & Getting Out of Debt",
          desc: "How to manage spending, good vs bad debt, and set up an emergency fund.",
        },
        basicInvesting: {
          name: "Saving & Basic Investing",
          desc: "Learn about the power of compound interest, inflation, mutual funds, and gold.",
        },
        corporateFinance: {
          name: "Corporate & Stock Analysis",
          desc: "Read financial statements, Dupont analysis, FCF, and ROIC.",
        },
      },
      updatedToast: "Track updated: {goal}! 🎯",
      currentGoalLabel: "Your current goal",
      changeButton: "Change",
      selectorTitle: "Choose your learning goal 🎯",
      selectorSubtitle:
        "The system will adjust its recommended track and prioritize the lessons that best fit your goal.",
    },
    jobSearchClient: {
      quizQuestions: [
        {
          question: "Which style of processing information do you prefer?",
          options: [
            "Analyzing numbers, building forecast models",
            "Checking accuracy, reviewing process compliance",
            "Communicating, advising, building client relationships",
            "Quantitative statistical analysis, calculating risk probabilities",
          ],
        },
        {
          question: "Your dream ideal work environment is:",
          options: [
            "Large investment funds, fast-moving securities firms",
            "A large corporate accounting department, or a professional Big4 audit firm",
            "Busy commercial bank branches, trading floors",
            "A treasury or risk management division at a large bank's head office",
          ],
        },
        {
          question: "How do you handle pressure and work-life balance (WLB)?",
          options: [
            "Ready to work late, handle deadline pressure for outsized income",
            "Want clear office hours, a stable job with few surprises",
            "Accept sales-quota (KPI) pressure for unlimited commission",
            "Want deep technical work, with less sales pressure",
          ],
        },
        {
          question: "What is the strongest skill you'd want to put to use?",
          options: [
            "Building Excel models, strategic cost-benefit analysis",
            "Careful attention to detail, absolute adherence to rules",
            "Persuasive communication, empathy and relationship-building",
            "Logical math thinking, quantitative simulation programming (SQL/Python)",
          ],
        },
        {
          question: "Which group of professional certifications appeals to you most?",
          options: [
            "CFA (Investment Analysis) / CMA (Management Accounting)",
            "ACCA (Chartered Accounting) / CPA (Auditor)",
            "Securities Brokerage or Bank Credit practicing certificate",
            "FRM (Risk Management) / ACI treasury certificate",
          ],
        },
      ],
      allCategoriesLabel: "All",
    },
    globalSearchModal: {
      sampleLessons: [
        {
          id: "l-1",
          title: "Personal Finance & Net Worth Audit",
          desc: "Assess your personal net worth and cash flow picture.",
        },
        {
          id: "l-2",
          title: "Reading a Corporate Balance Sheet",
          desc: "Assets = Liabilities + Shareholders' Equity.",
        },
        {
          id: "l-3",
          title: "DCF Stock Valuation Analysis",
          desc: "Discounting free cash flow (FCF) back to the present.",
        },
        {
          id: "l-4",
          title: "WACC & Debt Structure",
          desc: "Calculating the weighted average cost of capital.",
        },
      ],
      sampleGlossary: [
        {
          id: "g-dcf",
          title: "DCF (Discounted Cash Flow)",
          desc: "A method of discounting future free cash flow to the present to value a business.",
        },
        {
          id: "g-wacc",
          title: "WACC (Weighted Average Cost of Capital)",
          desc: "The weighted average cost of capital, representing the minimum required rate of return.",
        },
        {
          id: "g-pe",
          title: "P/E (Price to Earnings)",
          desc: "The ratio between a stock's price and its earnings per share.",
        },
        {
          id: "g-roe",
          title: "ROE (Return on Equity)",
          desc: "Return on equity, measuring how efficiently capital is used.",
        },
      ],
      sampleTools: [
        {
          id: "t-networth",
          title: "Net Worth Calculator",
          desc: "Track total assets minus total personal debt.",
        },
        {
          id: "t-budget",
          title: "50/30/20 Budget",
          desc: "Split income into Needs - Wants - Savings.",
        },
        {
          id: "t-fire",
          title: "FIRE Plan",
          desc: "Calculate how much you need to save to retire early.",
        },
        {
          id: "t-dcf",
          title: "DCF & WACC Valuation Calculator",
          desc: "Simulate discounted cash flow and calculate a business's cost of capital.",
        },
      ],
    },
  },
};
