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
        valuation: "Kiến Trúc",
        trading: "Triển Khai",
        cashflow: "Dữ Liệu",
        fed: "Hiệu Năng",
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
          name: "Nền tảng & dòng lệnh",
          desc: "Cách máy tính chạy, dùng dòng lệnh, quản mã bằng Git.",
        },
        basicInvesting: {
          name: "Web và sản phẩm đầu tiên",
          desc: "HTML, CSS, JavaScript, gọi API và triển khai một trang chạy thật.",
        },
        corporateFinance: {
          name: "Hệ thống & hiệu năng",
          desc: "Đọc mã người khác, thiết kế API, đo độ trễ và quản trị sự cố.",
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
          title: "Dòng lệnh & cấu trúc tập tin",
          desc: "Điều hướng, quyền truy cập và những lệnh dùng mỗi ngày.",
        },
        {
          id: "l-2",
          title: "Git: commit, nhánh và pull request",
          desc: "Lịch sử thay đổi, nhánh làm việc và cách gộp mã.",
        },
        {
          id: "l-3",
          title: "Thiết kế API và hợp đồng dịch vụ",
          desc: "REST, mã lỗi và cách đánh phiên bản cho một API.",
        },
        {
          id: "l-4",
          title: "Độ phức tạp Big-O và chi phí tính toán",
          desc: "Số bước tăng ra sao khi dữ liệu lớn dần.",
        },
      ],
      sampleGlossary: [
        {
          id: "g-dcf",
          title: "Idempotency",
          desc: "Thao tác lặp lại bao nhiêu lần cũng cho cùng một kết quả - điều kiện để thử lại an toàn.",
        },
        {
          id: "g-wacc",
          title: "SLO (Service Level Objective)",
          desc: "Mức độ tin cậy đã cam kết, kèm ngân sách lỗi được phép tiêu.",
        },
        {
          id: "g-pe",
          title: "p99",
          desc: "Ngưỡng độ trễ mà 99% request nằm dưới nó.",
        },
        {
          id: "g-roe",
          title: "Cache hit ratio",
          desc: "Tỷ lệ yêu cầu được phục vụ từ bộ nhớ đệm thay vì đi tới nguồn dữ liệu.",
        },
      ],
      sampleTools: [
        {
          id: "t-networth",
          title: "Máy tính độ phức tạp",
          desc: "Ước lượng số bước của một thuật toán theo cỡ dữ liệu.",
        },
        {
          id: "t-budget",
          title: "Định mức dung lượng máy chủ",
          desc: "Chia đỉnh tải cho dung lượng mỗi node, nhân hệ số dự phòng.",
        },
        {
          id: "t-fire",
          title: "Ngân sách hạ tầng hàng tháng",
          desc: "Ước tính chi phí máy chủ, băng thông và lưu trữ theo quy mô.",
        },
        {
          id: "t-dcf",
          title: "Máy tính độ trễ & thông lượng",
          desc: "Mô phỏng độ trễ đuôi và số request mỗi giây một dịch vụ chịu được.",
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
        valuation: "Architecture",
        trading: "Deployment",
        cashflow: "Data",
        fed: "Performance",
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
          name: "Fundamentals & the command line",
          desc: "How a machine works, using the shell, managing code with Git.",
        },
        basicInvesting: {
          name: "The web and a first product",
          desc: "HTML, CSS, JavaScript, calling APIs and deploying something real.",
        },
        corporateFinance: {
          name: "Systems & performance",
          desc: "Reading other people's code, API design, measuring latency and handling incidents.",
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
          title: "The command line & file tree",
          desc: "Navigation, permissions and the commands you use every day.",
        },
        {
          id: "l-2",
          title: "Git: commits, branches and pull requests",
          desc: "Change history, working branches and how code gets merged.",
        },
        {
          id: "l-3",
          title: "API design and service contracts",
          desc: "REST, error codes and how to version an API.",
        },
        {
          id: "l-4",
          title: "Big-O complexity and the cost of computation",
          desc: "How the step count grows as the data gets bigger.",
        },
      ],
      sampleGlossary: [
        {
          id: "g-dcf",
          title: "Idempotency",
          desc: "An operation that gives the same result however many times it repeats - the precondition for safe retries.",
        },
        {
          id: "g-wacc",
          title: "SLO (Service Level Objective)",
          desc: "The reliability level you committed to, with an error budget you are allowed to spend.",
        },
        {
          id: "g-pe",
          title: "p99",
          desc: "The latency threshold that 99% of requests come in under.",
        },
        {
          id: "g-roe",
          title: "Cache hit ratio",
          desc: "The share of requests served from cache instead of going to the data source.",
        },
      ],
      sampleTools: [
        {
          id: "t-networth",
          title: "Complexity calculator",
          desc: "Estimate an algorithm's step count against the size of the data.",
        },
        {
          id: "t-budget",
          title: "Server capacity sizing",
          desc: "Divide peak load by per-node capacity, times a headroom multiple.",
        },
        {
          id: "t-fire",
          title: "Monthly infrastructure budget",
          desc: "Estimate server, bandwidth and storage cost against your scale.",
        },
        {
          id: "t-dcf",
          title: "Latency & throughput calculator",
          desc: "Model tail latency and how many requests per second a service can take.",
        },
      ],
    },
  },
};
