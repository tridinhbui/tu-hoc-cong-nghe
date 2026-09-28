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
      loTrinh: "Bắt đầu từ đâu",
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
        "Trên máy tính, hai mục này nằm ở đây. Trên điện thoại, bấm vào biểu tượng menu () để mở.",
      resumeLearningTitle: "Học tiếp từ đâu",
      resumeLearningText:
        "Bấm vào đây để quay lại đúng bài học tiếp theo trong lộ trình, không cần tự tìm.",
      trackSelectorTitle: "Chọn lộ trình",
      trackSelectorText:
        "Bạn có 2 lộ trình: Nền tảng công nghệ (ngắn hơn, cho người mới) và Công nghệ chuyên sâu (sâu hơn). Có thể đổi qua lại bất cứ lúc nào.",
      stageListTitle: "Lộ trình học",
      stageListText:
        "Toàn bộ bài học được chia theo từng Chặng, mở khoá tuần tự. Bấm vào một Chặng để xem danh sách bài bên trong.",
    },
    studyGroupsClient: {
      rewardClaim: {
        missions_incomplete: "Nhóm chưa hoàn thành đủ 3 nhiệm vụ tuần.",
        already_claimed: "Tuần này nhóm đã nhận thưởng rồi.",
        chest_opened: "Đã mở rương nhóm: mỗi thành viên nhận +25 coin và 1 rương.",
      },
      quickCheers: {
        clap: { label: "Đập tay", message: "Đập tay cổ vũ mọi người cùng học bài nào!" },
        heart: { label: "Bắn tim", message: "Bắn tim yêu thương tiếp năng lượng học tập!" },
        reminder: { label: "Nhắc học", message: "Ới ời cả nhóm ơi vào làm bài thôi nào!" },
        boost: { label: "Tiếp sức", message: "Tiếp sức cháy hết mình hôm nay!" },
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
        foundations: {
          name: "Nền tảng & dòng lệnh",
          desc: "Cách máy tính chạy, dùng dòng lệnh, quản mã bằng Git.",
        },
        webProduct: {
          name: "Web và sản phẩm đầu tiên",
          desc: "HTML, CSS, JavaScript, gọi API và triển khai một trang chạy thật.",
        },
        systemsPerformance: {
          name: "Hệ thống & hiệu năng",
          desc: "Đọc mã người khác, thiết kế API, đo độ trễ và quản trị sự cố.",
        },
      },
      updatedToast: "Đã cập nhật lộ trình học: {goal}!",
      currentGoalLabel: "Mục tiêu hiện tại của bạn",
      changeButton: "Thay đổi",
      selectorTitle: "Chọn mục tiêu học tập của bạn",
      selectorSubtitle:
        "Hệ thống sẽ điều chỉnh lộ trình gợi ý và ưu tiên các bài học phù hợp nhất với mục tiêu của bạn.",
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
          id: "g-idempotency",
          title: "Idempotency",
          desc: "Thao tác lặp lại bao nhiêu lần cũng cho cùng một kết quả - điều kiện để thử lại an toàn.",
        },
        {
          id: "g-slo",
          title: "SLO (Service Level Objective)",
          desc: "Mức độ tin cậy đã cam kết, kèm ngân sách lỗi được phép tiêu.",
        },
        {
          id: "g-p99",
          title: "p99",
          desc: "Ngưỡng độ trễ mà 99% request nằm dưới nó.",
        },
        {
          id: "g-cache-hit",
          title: "Cache hit ratio",
          desc: "Tỷ lệ yêu cầu được phục vụ từ bộ nhớ đệm thay vì đi tới nguồn dữ liệu.",
        },
      ],
      sampleTools: [
        {
          id: "t-big-o",
          title: "Máy tính độ phức tạp",
          desc: "Ước lượng số bước của một thuật toán theo cỡ dữ liệu.",
        },
        {
          id: "t-capacity",
          title: "Định mức dung lượng máy chủ",
          desc: "Chia đỉnh tải cho dung lượng mỗi node, nhân hệ số dự phòng.",
        },
        {
          id: "t-infra-budget",
          title: "Ngân sách hạ tầng hàng tháng",
          desc: "Ước tính chi phí máy chủ, băng thông và lưu trữ theo quy mô.",
        },
        {
          id: "t-latency",
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
      loTrinh: "Where to start",
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
        "On desktop, these two entries live here. On mobile, tap the menu icon () to open them.",
      resumeLearningTitle: "Where to continue",
      resumeLearningText:
        "Click here to jump straight to the next lesson in your track, no need to search for it.",
      trackSelectorTitle: "Choose a track",
      trackSelectorText:
        "You have 2 tracks: Tech Foundations (shorter, for beginners) and Advanced Technology (deeper). You can switch between them any time.",
      stageListTitle: "Learning path",
      stageListText:
        "All lessons are split into Stages, unlocked in order. Click a Stage to see the lessons inside it.",
    },
    studyGroupsClient: {
      rewardClaim: {
        missions_incomplete: "The group has not finished all 3 weekly missions yet.",
        already_claimed: "The group has already claimed this week's reward.",
        chest_opened: "Group chest opened: every member gets +25 coins and 1 chest.",
      },
      quickCheers: {
        clap: { label: "Clap", message: "Give everyone a clap to cheer them on!" },
        heart: { label: "Heart", message: "Send a heart to boost the study energy!" },
        reminder: { label: "Reminder", message: "Hey everyone, come do your lesson!" },
        boost: { label: "Boost", message: "Bring the energy today!" },
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
        foundations: {
          name: "Fundamentals & the command line",
          desc: "How a machine works, using the shell, managing code with Git.",
        },
        webProduct: {
          name: "The web and a first product",
          desc: "HTML, CSS, JavaScript, calling APIs and deploying something real.",
        },
        systemsPerformance: {
          name: "Systems & performance",
          desc: "Reading other people's code, API design, measuring latency and handling incidents.",
        },
      },
      updatedToast: "Track updated: {goal}!",
      currentGoalLabel: "Your current goal",
      changeButton: "Change",
      selectorTitle: "Choose your learning goal",
      selectorSubtitle:
        "The system will adjust its recommended track and prioritize the lessons that best fit your goal.",
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
          id: "g-idempotency",
          title: "Idempotency",
          desc: "An operation that gives the same result however many times it repeats - the precondition for safe retries.",
        },
        {
          id: "g-slo",
          title: "SLO (Service Level Objective)",
          desc: "The reliability level you committed to, with an error budget you are allowed to spend.",
        },
        {
          id: "g-p99",
          title: "p99",
          desc: "The latency threshold that 99% of requests come in under.",
        },
        {
          id: "g-cache-hit",
          title: "Cache hit ratio",
          desc: "The share of requests served from cache instead of going to the data source.",
        },
      ],
      sampleTools: [
        {
          id: "t-big-o",
          title: "Complexity calculator",
          desc: "Estimate an algorithm's step count against the size of the data.",
        },
        {
          id: "t-capacity",
          title: "Server capacity sizing",
          desc: "Divide peak load by per-node capacity, times a headroom multiple.",
        },
        {
          id: "t-infra-budget",
          title: "Monthly infrastructure budget",
          desc: "Estimate server, bandwidth and storage cost against your scale.",
        },
        {
          id: "t-latency",
          title: "Latency & throughput calculator",
          desc: "Model tail latency and how many requests per second a service can take.",
        },
      ],
    },
  },
};
