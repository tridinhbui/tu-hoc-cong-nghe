// Vietnamese is the source dictionary: it defines the shape every other
// locale must satisfy (see en.ts, which is typed as `Dictionary` so a missing
// key is a compile error rather than a blank label in production).
//
// Scope note: this covers UI chrome. Lesson content is translated separately,
// per lesson, under lib/lessons-i18n/<locale>/ - see lib/lesson-translations.js
// and the "Translating lessons" section of AGENTS.md. It is a patch-per-lesson
// rather than a dictionary because it is 715 lessons of finance pedagogy, not
// labels, and it lands in batches: `content.viOnlyBadge` is what an English
// reader sees on a lesson whose turn has not come yet.

import { viSections } from "./sections";

export const vi = {
  ...viSections,
  emails: {
    milestoneMessage: "Chào {name}! 🎉 Bạn vừa đạt chuỗi {days} ngày học liên tục - cảm ơn bạn rất nhiều vì đã kiên trì đồng hành cùng nền tảng. Consistent is key to success - cứ giữ nhịp độ này, thành quả sẽ đến sớm thôi. Đội ngũ luôn ở đây nếu bạn cần hỗ trợ gì nhé! 💪",
    morningReviewTitle: "{count} câu ôn buổi sáng",
    digestSubject: "Tổng kết tuần học tập của bạn",
    digestGreeting: "Chào {name}, đây là tổng kết tuần vừa qua của bạn:",
    digestLessons: "<b>{count}</b> bài học hoàn thành",
    digestXp: "<b>{count}</b> XP tích lũy",
    digestStreak: "Streak hiện tại: <b>{days} ngày</b> (kỷ lục: {record} ngày)",
    digestKeepGoing: "Tiếp tục phát huy nhé!",
    digestNoActivity:
      "Tuần này bạn chưa học bài nào cả - streak hiện tại: <b>{days} ngày</b>. Quay lại học tiếp để không bị gián đoạn nhé!",
    fallbackName: "bạn",
    fallbackMember: "Một thành viên",
    fallbackLearner: "Một bạn học",
    streakAtRiskSubject: "Đừng để mất streak học tập của bạn!",
    streakAtRiskBody: "Streak học tập của bạn sắp bị mất nếu hôm nay không học. Quay lại ngay nhé!",
    streakAtRiskEmail: "Chào {name}, streak học tập của bạn sắp bị mất nếu hôm nay không học. Quay lại ngay nhé!",
    comebackEmail: "Chào {name}, đã vài ngày rồi bạn chưa học bài mới. Quay lại tiếp tục lộ trình của bạn nhé!",
    comebackSubject: "Đã lâu rồi bạn chưa quay lại học tài chính",
    comebackBody: "Đã vài ngày rồi bạn chưa học bài mới. Quay lại tiếp tục lộ trình của bạn nhé!",
    morningReviewBody: "Khoảng 90 giây. Toàn câu bạn từng làm sai, trộn từ nhiều bài.",
  },

  weeklyChallenge: {
    // Nội dung thử thách tuần. Đây KHÔNG phải dữ liệu dự phòng dù mã gọi nó là
    // mock: bảng `weekly_challenges` trên Supabase không có migration nào seed
    // và không chỗ nào trong repo ghi vào, nên nhánh này là thứ mọi người dùng
    // thực sự thấy.
    mockTitle: "Định giá SOTP Tập đoàn FPT",
    mockDescription:
      "Thực hiện định giá từng cấu phần của FPT bao gồm mảng Công nghệ, Viễn thông và Giáo dục để tìm ra giá trị hợp lý.",
    q1Prompt: "Mảng nào đóng góp tỷ trọng doanh thu cao nhất cho FPT năm 2025?",
    q1Options: ["Công nghệ", "Viễn thông", "Giáo dục"],
    q2Prompt: "Biên lợi nhuận gộp mảng Công nghệ của FPT có xu hướng như thế nào?",
    q2Options: ["Tăng trưởng liên tục", "Đi ngang", "Suy giảm nhẹ"],
    q3Prompt:
      "P/E hợp lý áp dụng cho mảng Giáo dục trong mô hình SOTP nên lấy theo mức trung bình khu vực là bao nhiêu?",
    q3Options: ["10x", "18x", "25x"],
    q4Prompt: "Dòng tiền thuần hoạt động kinh doanh (CFO) của FPT năm qua đạt trạng thái nào?",
    q4Options: ["Dương mạnh", "Âm nhẹ do tồn kho", "Không đổi"],
    q5Prompt: "Định giá trị hợp lý của cổ phiếu FPT theo SOTP khoảng bao nhiêu?",
    q5Options: ["120,000 - 130,000 đ/cp", "150,000 - 160,000 đ/cp", "180,000 - 190,000 đ/cp"],
  },

  apiErrors: {
    bossDamageNotRecorded: "Không ghi được sát thương",
    voiceJoinFailed: "Không vào được voice",
    micFailed: "Không bật được micro",
    notOwnMessageEdit: "Bạn chỉ có thể sửa tin nhắn của mình",
    notOwnMessageDelete: "Bạn chỉ có thể thu hồi tin nhắn của mình",
    notInGroup: "Bạn không còn trong nhóm này",
    systemMessageNotEditable: "Không thể chỉnh sửa tin nhắn hệ thống",
    messageLength: "Tin nhắn phải dài từ 1 đến 2000 ký tự",
    notInStudyRoom: "Bạn không ở trong phòng học này",
    voiceNotConfigured: "Voice chưa được cấu hình",
    questNotComplete: "Nhiệm vụ chưa hoàn thành",
  },

  nav: {
    students: "Học viên",
    sectionLearn: "Học tập",
    sectionPractice: "Thực hành",
    sectionCommunity: "Cộng đồng",
    certificates: "Chứng chỉ",
    quiz: "Kiểm tra",
    notes: "Ghi chú",
    learningPath: "Lộ trình học",
    studyGroup: "Học nhóm",
    technicalInterview: "Phỏng vấn kỹ thuật",
    career: "Sự nghiệp",
    stats: "Thống kê",
    openMenu: "Mở menu",
    user: "Người dùng",
    signOut: "Đăng xuất",
    signingOut: "Đang đăng xuất...",
    coinBalanceTitle: "Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh",

    brand: "Tự Học Tài Chính",
    searchPlaceholder: "Tìm kiếm...",
    coins: "Coins",
    // Nhãn nhỏ gắn vào từng mục điều hướng.
    badgeHot: "HOT",
    badge3d: "3D",
    badgeNews: "Tin mới",
    badgeCheckin: "Check-in",
    badgeNoGoal: "Chưa chọn",
    // Menu người dùng: desktop dùng nhãn dài, mobile dùng nhãn gọn.
    //
    // KHÔNG nhồi emoji vào chuỗi. Ba nhãn này từng mở đầu bằng 👤/👥/⚙️ và
    // hàng Ngôn ngữ với Đăng xuất mang 🌐/🚪 viết thẳng trong JSX. Emoji nằm
    // trong chuỗi thì không căn được theo dòng chữ, không nhận màu của mục, và
    // mỗi hệ máy vẽ một kiểu - nên menu trông lạc khỏi navbar, nơi mọi mục đều
    // dùng icon lucide. Icon giờ do component đặt, chuỗi chỉ còn chữ.
    menuProfile: "Hồ sơ cá nhân",
    menuFriends: "Bạn bè & Kết nối",
    menuSettings: "Cài đặt tài khoản",
    menuProfileShort: "Hồ sơ",
    menuFriendsShort: "Bạn bè",
    menuSettingsShort: "Cài đặt",
    docsLong: "Tài liệu Miễn phí",
    docsShort: "Tài liệu",
    levelXp: "Cấp {level} • {xp} XP",
    dailyGiftReady: "Quà đăng nhập hôm nay đã sẵn sàng - mở ở mục Nhiệm vụ & Rương quà!",
  },

  common: {
    save: "Lưu",
    cancel: "Huỷ",
    close: "Đóng",
    confirm: "Xác nhận",
    continue: "Tiếp tục",
    back: "Quay lại",
    retry: "Thử lại",
    loading: "Đang tải...",
    saving: "Đang lưu...",
    search: "Tìm kiếm",
    seeMore: "Xem thêm",
    seeAll: "Xem tất cả",
    done: "Hoàn thành",
    lesson: "bài học",
    lessons: "bài học",
    xp: "XP",
    coins: "Coin",
    level: "Cấp độ",
  },

  language: {
    label: "Ngôn ngữ",
    switchTo: "Chuyển sang {name}",
    current: "Đang dùng {name}",
  },

  content: {
    // Shown to English readers on lesson pages. Deliberately plain: it is a
    // limitation, not a feature, and shouldn't be dressed up as one.
    viOnlyNotice:
      "Nội dung bài học hiện chỉ có tiếng Việt. Giao diện đã chuyển sang tiếng Anh.",
    // Per-lesson version of the notice above, for a lesson that has no
    // translation yet. Short, because it sits inline next to the title.
    viOnlyBadge: "Chỉ có tiếng Việt",
    viOnlyBadgeTitle:
      "Bài này chưa có bản dịch tiếng Anh, nên nội dung đang hiển thị bằng tiếng Việt.",
  },

  // `difficulty` is a Vietnamese string union used as a VALUE across the app
  // (lookup keys, comparisons, the generated lesson index), so a lesson
  // translation must not overwrite it - see LessonTranslation in
  // lib/lesson-types.ts. It is rendered through this table instead, keyed by
  // the canonical Vietnamese value.
  difficulty: {
    "Dễ": "Dễ",
    "Trung bình": "Trung bình",
    "Khó": "Khó",
  },

  // The learner-visible copy from lib/tracks.ts. That file stays the source of
  // structure (`estimatedHours`, `previewSlug`, and the `stages` list that
  // lib/__tests__/stage-numbering.test.ts keeps aligned with
  // lib/track-stages.ts); only the prose moves here. Six files render these
  // three fields, so they are worth translating once rather than per screen.
  tracks: {
    // `stages` and `previewLabel` were left out when this section was first
    // written because nothing rendered them. components/login/TrackPreviewPanel.tsx
    // does. lib/tracks.ts stays the source of the stage COUNT and order, which
    // lib/__tests__/stage-numbering.test.ts holds against lib/track-stages.ts -
    // only the wording lives here.
    personal: {
      tab: "Tài chính cá nhân",
      subtitle: "Dành cho người mới bắt đầu",
      description:
        "Kiểm tra tài chính của chính bạn, kiểm soát chi tiêu, xây quỹ khẩn cấp, trả nợ và đầu tư thông minh - không cần kiến thức ngành.",
      stages: [
        "Chặng 1 - Biết mình: audit, ngân sách, quỹ khẩn cấp, trả nợ",
        "Chặng 2 - Thuế TNCN và lương thực nhận",
        "Chặng 3 - Tư duy tiền bạc và tài chính cơ bản",
        "Chặng 4 - Cổ phiếu, ETF và quỹ đầu tư",
        "Chặng 5 - Trái phiếu và các công cụ cố định",
        "Chặng 6 - Danh mục đầu tư và kế hoạch hưu trí",
        "Chặng 7 - Chiến lược đầu tư cá nhân",
        "Chặng 8 - Quản lý tài sản & hưu trí",
        "Chặng 9 - Nhà ở, bảo vệ tài sản và các quyết định tài chính lớn",
        "Chặng 10 - Tâm lý học tài chính hành vi",
      ],
      previewLabel: "Chặng 1: Bạn đang đứng ở đâu?",
    },
    professional: {
      tab: "Tài chính chuyên ngành",
      subtitle: "Chuyên sâu, cho người đã có nền tài chính",
      description:
        "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục, phái sinh và AI in Finance.",
      stages: [
        "Kế toán, báo cáo tài chính và chỉ số",
        "Giá trị thời gian của tiền, tài chính doanh nghiệp",
        "Định giá cổ phiếu, trái phiếu và tín dụng",
        "Danh mục đầu tư và công cụ phái sinh",
        "Vận hành tài chính doanh nghiệp hiện đại",
        "AI trong tài chính: đọc báo cáo, phân tích tin và viết memo",
      ],
      previewLabel: "Bài mở đầu: Kế toán là ngôn ngữ của kinh doanh",
    },
    cfa: {
      tab: "Tài chính chứng chỉ",
      subtitle: "CFA Level I · đang xây dựng",
      description:
        "Ánh xạ các bài học đã có sang đúng 10 môn thi CFA Level I chính thức - không tạo bài mới, không đổi số ngày của 2 track kia. Môn nào chưa có bài phù hợp sẽ được xây dần.",
      stages: [
        "Ethics and Professional Standards",
        "Quantitative Methods, Economics",
        "Financial Statement Analysis, Corporate Issuers",
        "Equity Investments, Fixed Income",
        "Derivatives, Alternative Investments, Portfolio Management",
      ],
      previewLabel: "Xem lộ trình CFA Level I",
    },
  },

  // components/home/HomePage.tsx - the logged-out landing page, and the only
  // learner-facing screen reachable without a session.
  home: {
    banner: {
      part1: "Cam kết toàn bộ bài học tại đây ",
      freeForever: "miễn phí mãi mãi",
      part2:
        " vì sự phát triển của cộng đồng học tài chính cá nhân, CFA, lập kế hoạch tài chính, đầu tư, và người làm tài chính tại Việt Nam.",
      // Bản một dòng cho màn hình hẹp - câu đầy đủ chiếm bốn dòng ở 375px,
      // đẩy hero xuống gần một phần tư màn hình đầu.
      shortPrefix: "Toàn bộ bài học tại đây ",
      dismiss: "Đóng thông báo",
      facebook: "Tham gia group Facebook",
      facebookShort: "Group Facebook",
    },

    brand: "Tự Học Tài Chính",
    brandBadge: "🇻🇳 VIỆT NAM",
    navCta: "Vào học ngay",

    hero: {
      badge: "Kiến thức chuẩn quốc tế · Bản sắc thực tế Việt Nam 🇻🇳",
      // The headline wraps a coloured <span> and a <br>, so it is split rather
      // than assembled from one string.
      titlePart1: "Bước vào thế giới",
      titleHighlight: "tài chính",
      titlePart2: "cùng bắt đầu từ con số 0",
      sub: "{count}+ bài học - 100% miễn phí vĩnh viễn - giáo trình thiết kế riêng cho người Việt học tài chính cá nhân, CFA, lập kế hoạch tài chính, đầu tư, kế toán và tài chính chuyên nghiệp. Học theo phương pháp Spaced Repetition khoa học.",
      ctaPrimary: "Bắt đầu học miễn phí",
      ctaSecondary: "Xem thử bài học",
      bgAlt: "Bối cảnh tài chính hiện đại",
      liveLabel: "Live cập nhật trực tiếp",
      statLearners: "người học",
      statLessons: "bài học",
      statCompleted: "đã hoàn thành",
    },

    // The mock lesson card in the hero. Illustrative content, not a real
    // lesson - the P/E figures are a worked example.
    card: {
      studyingNow: "Đang học thật",
      lessonNo: "Bài 24",
      todayLabel: "Bài học hôm nay",
      todayTitle: "Đọc chỉ số P/E trong 5 phút",
      comprehension: "72% hiểu bài",
      exampleLabel: "Ví dụ trong bài",
      exampleText: "Công ty A có EPS = 5.000đ, giá cổ phiếu = 75.000đ. P/E bằng bao nhiêu?",
      priceLabel: "Giá",
      priceValue: "75.000đ",
      epsValue: "5.000đ",
      peValue: "15 lần",
      tip1: "P/E thấp chưa chắc rẻ nếu lợi nhuận giảm",
      tip2: "So sánh P/E trong cùng ngành sẽ ý nghĩa hơn",
      tip3: "Kiểm tra chất lượng lợi nhuận bằng dòng tiền",
      metaLesson: "Bài học",
      metaLessonValue: "5 phút",
      metaQuizValue: "5 câu/bài",
      metaReview: "Ôn lại",
      metaReviewValue: "Sau 5 bài",
      quizLabel: "Quiz nhanh",
      quizQuestion: "P/E = Giá / EPS?",
      quizRight: "Đúng: 15 lần",
      quizWrong: "Sai: 0,15 lần",
      flashQuestion: "P/E là gì?",
      flashAnswer: "Số năm lợi nhuận hiện tại cần để hoàn vốn nếu mọi thứ giữ nguyên.",
      noteLabel: "Ghi chú mẫu",
      noteTitle: "Không mua chỉ vì P/E thấp",
      noteBody: "Luôn hỏi: lợi nhuận có bền không, dòng tiền có thật không?",
      bullAlt: "Bò Phố Wall - boss trong Game Kingdom",
    },

    preview: {
      eyebrow: "Xem trước giao diện thật",
      title: "Đây là những gì bạn sẽ dùng mỗi ngày",
      sub: "Không chỉ là bài đọc dài - dashboard theo dõi tiến độ thật, quiz sau mỗi bài, và cấp độ/XP để biết mình đang ở đâu.",
    },

    ticker: {
      liveXp: "Live XP cập nhật",
      weeklyBoard: "Bảng xếp hạng theo tuần",
      spacedRepetition: "Hệ thống ôn tập ngắt quãng",
      gameKingdom: "Game Kingdom mở theo tiến độ",
      finsocial: "FinSocial phản biện ý tưởng",
      studyGroup: "Học nhóm giữ nhịp mỗi ngày",
    },

    social: {
      eyebrow: "Cộng đồng thật",
      title: "Học viên nổi bật đang học mỗi ngày",
      sub: "Đây không phải bảng số liệu trang trí. Người mới vào có thể nhìn ngay ai đang học thật, ai giữ được nhịp đều, và cảm giác tiến bộ trong hệ thống trông ra sao.",
    },

    kingdom: {
      eyebrow: "Xem trước Game Kingdom",
      title: "Một vương quốc tài chính để bạn mở khóa bằng kiến thức",
      sub: "Game Kingdom biến việc học thành nhiệm vụ: hoàn thành bài, làm quiz, chơi mini game và mở dần các công trình tài chính.",
    },

    ecosystem: {
      eyebrow: "Không chỉ là bài học",
      titlePart1: "Học, chơi, hỏi đáp và chia sẻ trong cùng một",
      titleHighlight: "hệ sinh thái tài chính",
      sub: "Sau khi tạo tài khoản, bạn không chỉ đi qua lộ trình bài học. Bạn còn có lộ trình active recall ôn tập chủ động, học nhóm 3D để giữ nhịp, và FinSocial để trao đổi kiến thức với cộng đồng.",
    },

    vision: {
      eyebrow: "Vì sao chúng tôi làm",
      title:
        "Hiểu biết tài chính ở Việt Nam đang cải thiện, nhưng khoảng trống nền tảng vẫn còn rất lớn.",
      stat1Label: "Hiểu biết cơ bản",
      stat1Note: "đạt ngưỡng cơ bản.",
      stat2Label: "Khoảng trống",
      stat2Note: "chưa đạt nền tảng.",
      stat3Label: "Tiếp cận 2024",
      stat3Note: "có tài khoản tài chính.",
      missionLabel: "Tầm nhìn & Sứ mệnh",
      missionBody:
        "Xây dựng giáo trình tài chính 100% miễn phí, rõ ràng và đủ sâu cho người học Việt Nam. Giúp việc tự học tài chính trở nên gần gũi, thực tế và bền vững.",
      cta: "Bắt đầu học miễn phí",
    },

    footer: {
      blurb:
        "Nền tảng tự học tài chính cá nhân, tài chính doanh nghiệp và CFA miễn phí 100%. Giúp người Việt làm chủ tiền bạc bằng phương pháp Spaced Repetition và Game Kingdom.",
      community: "Cộng đồng 430+ bài học & Quiz tương tác",
      tracksTitle: "Lộ trình học",
      trackPersonal: "Tài chính cá nhân",
      trackCorporate: "Tài chính doanh nghiệp",
      trackCfa: "Chứng chỉ CFA Level 1",
      trackGame: "Game Kingdom RPG",
      ecoTitle: "Hệ sinh thái",
      ecoStudyRoom: "Phòng học nhóm (3D)",
      ecoHot: "Hot",
      ecoFinsocial: "FinSocial - feed bài viết",
      ecoCareer: "Bản đồ sự nghiệp tài chính",
      ecoShop: "Cửa hàng Cosmetic & Avatar",
      supportTitle: "Hỗ trợ & Pháp lý",
      terms: "Điều khoản sử dụng",
      privacy: "Chính sách bảo mật",
      login: "Đăng nhập / Đăng ký",
      copyright: "© 2026 Tự Học Tài Chính. Tất cả quyền được bảo lưu.",
      tagline: "Học tài chính miễn phí cho người Việt 🇻🇳",
      sovereignty: "Hoàng Sa & Trường Sa là của Việt Nam!",
    },
  },

  // app/(app)/kiem-tra/page.tsx - the knowledge-check builder.
  quizPage: {
    backAria: "Về Dashboard",
    title: "Kiểm tra kiến thức",
    subtitle: "Thử thách tin tức vĩ mô hôm nay & tạo bài kiểm tra tự chọn",
    xpPerQuestion: "Thưởng +{xp} XP / câu đúng",

    leftEyebrow: "Bên Trái • Tin tức tài chính hôm nay",
    newsTitle: "Thử thách bài kiểm tra tin tức hằng ngày",
    newsDone: "Đã hoàn thành (Menu sạch warning)",
    newsPending: "Chưa làm",
    newsPendingNote: "(Menu có cảnh báo)",
    // Split around the inline <strong> holding the XP.
    newsBodyPart1: "Trả lời chính xác tình huống tin tức vĩ mô hôm nay để nhận ",
    newsXp: "+{xp} XP",
    newsBodyPart2: " và giải tỏa biểu tượng cảnh báo 🔴 trên Navbar.",

    rightEyebrow: "Bên Phải • Tạo bài kiểm tra tự chọn",
    builderTitle: "Tùy chỉnh & bắt đầu kiểm tra",
    step1: "1. Chọn phần kiến thức",
    selecting: "Đang chọn",
    step2: "2. Chọn độ khó",
    // Split around the inline <strong>.
    rewardPart1: "Mỗi câu đúng thưởng ",
    rewardXp: "+{xp} XP",
    rewardPart2: " cộng ngay vào tài khoản!",
    start: "Bắt đầu kiểm tra ngay",

    // TRACKS: the ids stay in the component, the copy lives here.
    trackPersonal: "Tài chính cá nhân",
    trackPersonalDesc: "Tư duy tiền bạc, đầu tư, danh mục, hưu trí",
    trackProfessional: "Tài chính chuyên ngành",
    trackProfessionalDesc: "Kế toán, định giá, trái phiếu, phái sinh",
    trackCfa: "Tài chính chứng chỉ",
    trackCfaDesc: "CFA Level I - 10 môn thi chính thức",
    trackFrm: "Quản trị rủi ro (FRM)",
    trackFrmDesc: "Part I - 4 môn, ra đề theo trọng số GARP",

    diffAll: "Tất cả",
    diffEasy: "Dễ",
    diffMedium: "Trung bình",
    diffHard: "Khó",

    ibEyebrow: "Investment banking interview drill",
    ibTitle: "Technical Interview",
    ibSub: "400 IB Questions · Accounting, Valuation, DCF, M&A, LBO, behavioral",
    ibOpen: "Mở →",

    loadingQuestions: "Đang chuẩn bị câu hỏi...",
    loadFailed: "Không thể tải bài kiểm tra lúc này. Vui lòng thử lại sau.",
    backToTrack: "← Quay lại chọn track",
    noQuestions: "Chưa có câu hỏi nào cho lựa chọn này. Thử track hoặc độ khó khác nhé.",

    questionCounter: "Câu {current} / {total}",
    correctWithXp: "Chính xác! +{xp} XP",
    explanation: "Giải thích:",
    checkAnswer: "Kiểm tra đáp án",
    seeResults: "Xem kết quả →",
    nextQuestion: "Câu tiếp theo →",

    doneTitle: "Hoàn thành bài kiểm tra!",
    doneScore: "{score}/{total} câu đúng",
    donePassed: " · Đạt",
    xpEarned: "XP nhận được",
    reviewWrongLessons: "Ôn lại các bài có câu sai",
    backToDashboard: "Về Dashboard",
    newQuiz: "Kiểm tra mới",
  },

  // components/LessonPageLayout.tsx - the shared frame for every lesson page.
  lessonLayout: {
    reviewQuestion: "Xem lại câu này",
    retryQuestion: "Thử lại câu này",
    saveFailed: "Không thể lưu tiến độ bài học. Vui lòng tải lại trang để thử lại.",
    quizDoneMidpointLeft: "Đã làm xong quiz! Còn trả lời câu hỏi giữa bài để hoàn thành nhé.",
    saved: "Đã lưu tiến độ bài học!",

    backAria: "Về Học bài",
    back: "Quay lại",

    readMinutes: "~{minutes} phút đọc",
    readProgress: "{percent}% · còn ~{minutes} phút",
    readDone: "Đọc xong!",
    notStarted: "Chưa bắt đầu",
    readPercent: "Đã đọc {percent}%",
    durationRead: "{duration} đọc",
    quizCount: "{count} câu quiz",
    // Split around the inline <strong> holding the minutes.
    remainingPart1: "Còn khoảng ",
    remainingMinutes: "~{minutes} phút",
    remainingPart2: " để đọc xong",

    checklistTitle: "Điều kiện hoàn thành & nhận XP",
    checkReadAll: "Đọc hết 100% nội dung bài",
    checkMidpoint: "Trả lời câu hỏi \"Dừng & Kiểm tra\" giữa bài",
    checkQuiz: "Hoàn thành \"Kiểm tra nhanh\" ({done}/{total} câu)",

    videoTitle: "Video bài giảng trực quan",
    videoBadge: "Minh họa trực quan",
    videoNote: "Bài học này hỗ trợ xem video minh họa trực quan trên YouTube.",
    videoCta: "Xem video bài giảng trên YouTube",

    scrollForQuiz: "Cuộn xuống để làm quiz →",
    quickCheck: "Kiểm tra nhanh",
    questionCounter: "Câu {current} / {total}",
    answerRight: "✓ Đúng rồi!",
    answerWrong: "✗ Chưa đúng",
    exactly: "Chính xác!",
    explanation: "Giải thích:",
    youChose: "Bạn chọn:",
    correctIs: "Đáp án đúng:",

    check: "Kiểm tra →",
    tryAgain: "Thử lại →",
    backToResults: "← Quay lại kết quả",
    nextQuestion: "Câu tiếp theo →",
    seeResults: "Xem kết quả →",

    doneTitle: "Hoàn thành!",
    doneScore: "{score}/{total} câu đúng",
    firstAttemptScore: "Điểm ghi nhận: {score}/{total} (lần trả lời đầu)",
    firstAttemptNote:
      "Số ở trên là kết quả sau khi thử lại. Điểm lưu vào hồ sơ lấy lần trả lời đầu, để phần trăm năng lực ở Sự nghiệp phản ánh đúng những gì bạn đã nắm được.",
    reviewMistakes: "Ôn lại câu vừa sai ngay (Flashcard 3D)",
    dashboard: "Dashboard",
    nextLesson: "Bài tiếp →",
    comingSoon: "Sắp ra mắt",
    restart: "↺ Làm lại từ đầu",
    questionList: "Các câu hỏi",
    // Chỉ hiện cho khách đọc bài xem thử (lib/preview-lessons.ts). Nói thứ họ
    // vừa có và sắp mất, không nói tính năng - "tiến độ bài này" là thứ duy
    // nhất người vừa đọc xong đang thực sự cầm trong tay.
    guestSaveTitle: "Bạn vừa học xong bài này 🎉",
    guestSaveBody:
      "Tiến độ này đang nằm trên trình duyệt và sẽ mất khi bạn đổi máy. Tạo tài khoản miễn phí để lưu lại, mở toàn bộ bài học và theo dõi chuỗi ngày học của mình.",
    guestSaveCta: "Đăng ký miễn phí để lưu tiến độ",
  },

  // components/WorldBossRaidWidget.tsx - the weekly server-wide boss raid.
  worldBoss: {
    noQuestions: "Boss tuần này chưa có câu hỏi nào. Thử tải lại, hoặc quay lại sau nhé.",
    counterattack: "Hụt rồi! Boss phản công làm bạn mất 34 HP.",
    loading: "Đang tải dữ liệu World Boss Server...",
    noEvent: "Chưa mở sự kiện World Boss tuần này.",
    eventTitle: "Server world Boss event - hàng tuần",
    guideToggle: "Hướng dẫn săn Boss",
    huntNow: "Săn Boss Server ngay!",

    rulesTitle: "Thể lệ & cách chơi sự kiện săn Boss Server:",
    // Each rule is a <li> with a bolded lead-in, so the label and the body are
    // separate keys rather than one string carrying <strong>.
    rule1Label: "Thanh máu gộp 1,000,000 HP",
    rule1Body: "Toàn bộ học viên trên toàn server cùng tấn công để rút máu World Boss.",
    rule2Label: "Sát thương chiến đấu",
    rule2Body:
      "Mỗi câu trả lời trắc nghiệm đúng gây 5,000 Sát thương + Bonus dựa trên tốc độ trả lời & cấp độ nhân vật.",
    rule3Label: "Phản công của Boss",
    rule3Body:
      "Trả lời sai sẽ bị Boss phản công trừ 25 HP của Nhân vật. Quá 3 câu sai trận đánh sẽ kết thúc.",
    rule4Label: "Phần thưởng bảng xếp hạng",
    rule4BodyPart1: "Top 10 học viên gây sát thương cao nhất tuần nhận ",
    rule4Coins: "+500 Coins",
    rule4BodyPart2: " + ",
    rule4Badge: "Huy hiệu dũng sĩ săn Boss",
    rule4BodyPart3: "!",

    serverHpLabel: "Thanh máu gộp toàn Server:",
    hpLine: "{current} / {max} HP ({percent}%)",

    gearTitle: "Trang bị sẵn sàng săn Boss",
    heroPower: "Sức mạnh nhân vật",
    levelPrefix: "Level: ",
    levelValue: "Lv. {level}",
    damagePerAnswer: "Mỗi đáp án đúng gây ~5,000+ sát thương Server!",
    raidQuestionCount: "Số câu raid",
    questionCount: "{count} câu",
    maxDamagePerQuestion: "Max DMG/câu",

    leaderboardTitle: "Bảng xếp hạng top sát thương tuần",
    refreshTitle: "Làm mới",
    damageValue: "{value} DMG",

    arenaTitle: "BATTLE ARENA - CÂU {current}/{total}",
    exit: "✕ Thoát",
    levelShort: "Lv.{level}",
    heroName: "Chiến Binh",
    heroHp: "{hp}/100 HP",
    vs: "VS",
    sessionDamage: "DMG: +{value}",
    bossAlt: "Wall Street bull boss",
    bossName: "Trâu Phố Wall 3D",
    bossHpPercent: "{percent}% HP",

    doneTitle: "KẾT THÚC ĐỢT SĂN BOSS!",
    donePart1: "Bạn đã đóng góp tổng cộng ",
    doneDamage: "+{value} DMG",
    donePart2: " vào Thanh Máu Server!",
    closeAndSeeBoard: "Đóng & xem bảng xếp hạng",
  },

  // components/FriendsClient.tsx - /ban-be, friends list and direct chat.
  friends: {
    nowFriends: "Đã trở thành bạn bè",
    requestSent: "Đã gửi lời mời kết bạn",
    listLoadFailed: "Không tải được danh sách bạn bè",
    searchFailed: "Không tìm được tài khoản",
    messagesLoadFailed: "Không tải được tin nhắn",
    requestSendFailed: "Không gửi được lời mời",
    requestAccepted: "Đã chấp nhận lời mời",
    requestDeclined: "Đã từ chối lời mời",
    requestUpdateFailed: "Không cập nhật được lời mời",
    messageSendFailed: "Không gửi được tin nhắn",
    viewProfileAria: "Xem hồ sơ của {name}",
    unnamedUser: "người dùng",
    loading: "Đang tải...",
    back: "Quay lại",
    title: "Bạn bè & chat",

    findAccount: "Tìm account",
    searchPlaceholder: "Nhập tên hoặc email...",
    searching: "Đang tìm...",
    viewProfileTitle: "Xem hồ sơ",
    fallbackName: "Người dùng",
    levelXp: "Level {level} · {xp} XP",
    message: "Nhắn tin",
    accept: "Chấp nhận",
    sent: "Đã gửi",
    addFriend: "Kết bạn",
    noResults: "Không tìm thấy tài khoản phù hợp.",
    searchHint: "Nhập ít nhất 2 ký tự để tìm bạn.",

    incoming: "Lời mời đến ({count})",
    noIncoming: "Chưa có lời mời nào.",
    reviewProfileTitle: "Xem hồ sơ trước khi quyết định",
    viewProfile: "Xem hồ sơ",
    decline: "Từ chối",

    friendsList: "Bạn bè ({count})",
    noFriends: "Chưa có bạn bè nào. Tìm và kết bạn để bắt đầu chat.",
    openChatTitle: "Mở cuộc trò chuyện",
    pending: "Đang chờ ({count})",

    pickFriend: "Chọn một người bạn để bắt đầu chat",
    pickFriendHint: "Sau khi hai bên trở thành bạn bè, bạn có thể nhắn tin trực tiếp tại đây.",
    profile: "Hồ sơ",
    loadingMessages: "Đang tải tin nhắn...",
    noMessages: "Chưa có tin nhắn nào. Nhắn lời chào trước đi.",
    messagePlaceholder: "Nhập tin nhắn cho bạn bè...",
  },

  // app/(app)/on-tap-cau-sai/OnTapCauSaiClient.tsx - SM-2 review of wrong answers.
  mistakeReview: {
    morningSession: "Phiên ôn buổi sáng",
    morningSub:
      "{count} câu, trộn từ nhiều bài khác nhau - xen kẽ như vậy nhớ lâu hơn ôn dồn một bài.",
    enoughForToday: "Xong phiên này là đủ cho hôm nay.",
    seeAllMistakes: "Xem toàn bộ câu sai",

    srsBadge: "SPACED REPETITION SM-2",
    title: "Ôn tập câu sai Flashcard 3D",
    subtitle:
      "Tự động phân nhịp sinh học ôn tập theo chu kỳ 1 ngày ➔ 3 ngày ➔ 7 ngày ➔ 30 ngày.",
    tabCards: "Thẻ 3D",
    tabList: "Danh sách",

    loading: "Đang tải dữ liệu câu sai...",
    emptyTitle: "Xuất sắc! Không có câu nào cần ôn!",
    emptyBody:
      "Bạn đã chinh phục toàn bộ câu quiz làm sai. Hãy tiếp tục học bài mới để tích lũy thêm XP nhé!",
    backToDashboard: "Quay lại Dashboard",
    backToDashboardShort: "Về Dashboard",

    cardCounter: "Thẻ {current} / {total} (Cần ôn hôm nay: {due})",
    algorithmActive: "Thuật toán SM-2 Active",

    noneDueTitle: "Hôm nay chưa tới lịch ôn thẻ nào",
    noneDueBody:
      "Bạn còn {count} câu sai đang theo dõi, nhưng lịch lặp lại ngắt quãng xếp chúng vào những ngày sau. Ôn sớm hơn lịch thì nhớ kém hơn - đó là toàn bộ lý do có lịch.",
    reviewAllAnyway: "Vẫn ôn tất cả bây giờ",
    ratedForget: "Cần ôn lại vào ngày mai (+1 ngày)",
    ratedHard: "Đã ghi nhận (+3 ngày)",
    ratedGood: "Nhớ tốt! Lên lịch ôn sau 7 ngày",
    ratedMastered: "Thành thục! Đưa vào bộ nhớ vĩnh viễn (+30 ngày)",

    doneTitle: "Hoàn thành phiên ôn tập spaced repetition!",
    doneBody:
      "Bạn đã xem và đánh giá toàn bộ {count} thẻ ôn tập. Hệ thống đã tự động tính nhịp nhắc nhở lặp lại ngắt quãng tiếp theo!",
    restart: "Ôn lại từ đầu",

    srsLevel: "Level {level} • {days} ngày",
    srsLevelShort: "SRS Lvl {level} ({days}d)",
    pickOrFlip: "Bấm chọn đáp án hoặc lật mặt sau để xem lời giải",
    flipToExplanation: "Lật xem giải thích",
    explanationTitle: "Đáp án đúng & giải thích",
    flipBack: "Lật về mặt câu hỏi",
    correctAnswer: "Đáp án chính xác:",
    financeExplanation: "Giải thích tài chính:",
    noExplanation: "Không có giải thích chi tiết cho câu hỏi này.",

    ratePrompt: "Đánh giá mức độ nhớ để xếp lịch Spaced Repetition tiếp theo:",
    rateForgot: "Chưa nhớ",
    rateOk: "Tương đối",
    rateGood: "Nhớ tốt",
    rateEasy: "Quá dễ",
    plus1Day: "+1 ngày",
    plus3Days: "+3 ngày",
    plus7Days: "+7 ngày",
    plus30Days: "+30 ngày",

    prevCard: "← Thẻ trước",
    nextCard: "Thẻ tiếp theo →",
    totalMistakes: "Tổng số câu sai tích lũy: {count} câu",
    rateSrs: "Đánh giá SRS:",
  },

  // components/tools/ValuationDCFCalculator.tsx
  dcf: {
    tabDcf: "Định giá cổ phiếu DCF",
    tabWacc: "Chi phí vốn WACC",
    standardBadge: "Chuẩn CFA & Corporate Finance",

    resultTitle: "KẾT QUẢ MÔ PHỎNG ĐỊNH GIÁ DCF",
    intrinsicValue: "Giá trị nội tại: {value} VNĐ / CP",
    undervalued: "HẤP DẪN ({sign}{percent}%)",
    overvalued: "ĐỊNH GIÁ CAO ({percent}%)",
    fairValue: "HỢP LÝ ({sign}{percent}%)",

    marketPriceLabel: "Giá thị trường hiện tại",
    currency: "{value} VNĐ",
    evLabel: "Giá trị Doanh nghiệp (EV)",
    billions: "{value} tỷ VNĐ",
    equityLabel: "Giá trị Vốn CSH (Equity)",
    tvShareLabel: "Tỷ trọng Giá trị Cuối (TV)",
    percentOfEv: "{percent}% EV",

    inputsTitle: "Thông số đầu vào Mô hình Chiết khấu Dòng tiền",
    inFcf: "Dòng tiền tự do FCF hiện tại (tỷ VNĐ)",
    inGrowth: "Tốc độ tăng trưởng FCF 5 năm (%)",
    inWacc: "Tỷ lệ chiết khấu WACC (%)",
    inTerminalGrowth: "Tăng trưởng vĩnh viễn g_term (%)",
    inCash: "Tiền mặt & Đầu tư ngắn hạn (tỷ VNĐ)",
    inDebt: "Tổng Nợ vay tài chính (tỷ VNĐ)",
    inShares: "Số lượng cổ phiếu lưu hành (triệu CP)",
    inMarketPrice: "Giá thị trường hiện tại (VNĐ/CP)",

    forecastTitle: "Dự báo Dòng tiền tự do & Hiện giá PV từng năm",
    colYear: "Năm",
    colFcf: "Dòng tiền FCF (tỷ VNĐ)",
    colDiscount: "Hệ số Chiết khấu PV",
    colPv: "Hiện giá PV (tỷ VNĐ)",
    rowYear: "Năm {year}",
    billionsShort: "{value} tỷ",
    total5Years: "Tổng 5 Năm",

    waccResultTitle: "KẾT QUẢ TÍNH CHI PHÍ VỐN BÌNH QUÂN WACC",
    waccValue: "WACC = {value}%",
    equityWeight: "Tỷ trọng Vốn CSH (E/V)",
    debtWeight: "Tỷ trọng Nợ vay (D/V)",
    afterTaxKd: "Chi phí Nợ sau thuế (Kd*)",
    taxShield: "Lá chắn thuế Nợ vay",
    taxShieldValue: "-{rate}% Thuế TNDN",

    waccInputsTitle: "Thông số cấu trúc vốn & chi phí từng thành phần",
    inEquity: "Giá trị Vốn chủ sở hữu E (tỷ VNĐ)",
    inDebtValue: "Giá trị Nợ vay tài chính D (tỷ VNĐ)",
    inKe: "Chi phí vốn CSH Ke (%)",
    inKd: "Lãi suất nợ vay bình quân Kd (%)",
    inTaxRate: "Thuế suất thuế TNDN t (%)",
  },

  // components/FinancialRpgWorldMap.tsx - the Game Kingdom map.
  worldMap: {
    levelShort: "Lv.{level}",
    empireTitle: "Đế chế Wall Street",
    online: "Online",
    empireSub: "Tập sự Phố Wall • 3D RPG Kingdom",
    capitalLabel: "Vốn đầu tư",
    coinsValue: "{count} Coins",
    energyLabel: "Năng Lượng",

    shopTitle: "Tiệm đồ executive",
    shopShort: "Tiệm Đồ",
    cardsTitle: "Bảo tàng thẻ VN30",
    cardsShort: "Bộ Thẻ",

    // Ticker strip. Illustrative figures for the game surface, not market data.
    tickerLabel: "WALL ST. TICKER",
    tickerIndex: "VN-INDEX: 1,285.40 (+1.45%)",
    tickerBoss: "BOSS SÀN NYSE: 850,000 / 1,000,000 HP (85%)",
    tickerCase: "TIMES SQUARE: CASE STUDY CASE #12 HOẠT ĐỘNG",
    tickerClan: "HEDGE FUND CLAN: TOP #1 WALL STREET",
    bgAlt: "Ảnh nền phố Wall",

    zoneMiniGames: "TỔNG HỢP MINI GAME",

    fogTitle: "VÙNG ĐẤT CHƯA GIẢI MÃ",
    fogHint: "Click mở (+5 Coins)",
    fogHintLong: "Click mở sương mù (+5 Coins)",
    underConstruction: "ĐANG THI CÔNG",
    lockedLevel: "Khóa • Yêu cầu Lv.{level}",
    lockedShort: "Khóa Lv.{level}",
    lockedNeedLessons: "Yêu cầu hoàn thành bài học",
    lockedNeedLessonsShort: "Hoàn thành bài học để mở",

    dragHint: "Kéo tự do (Canva Drag & Pan) để di chuyển bản đồ không cần cuộn trang web!",
    zoneCount: "12 VÙNG ĐẤT TÀI CHÍNH",
    dragHintLong: "Canva drag Canvas (Kéo tự do 360° • Xem trọn vẹn 12 vùng đất)",

    gearOpenTitle: "Mở tủ trang bị",
    gearEyebrow: "Tủ trang bị",
    gearTitle: "Executive Gear",
    gearSub: "Cố định ngoài bản đồ nhiệm vụ",
    gearCta: "Mở cửa hàng & tủ đồ",

    bossHp: "BOSS 85% HP",
    hotCase: "HOT CASE STUDY",
    backToMap: "Quay lại bản đồ đấu trường",
    opening: "Đang mở: {name}",
  },

  // components/login/TrackPreviewPanel.tsx
  trackPanel: {
    isNew: "Mới",
    trackPrefix: "Track",
    effortHours: "~{hours} giờ học",
    standardised: "Lộ trình chuẩn hóa 2024",
    xpPerLesson: "+{xp} XP / bài",
    stagesTitle: "Các chặng kiến thức chính:",
    freeTryCompact: "Miễn phí · Xem thử ngay",
    freeTry: "Miễn phí · Xem thử ngay, không cần đăng nhập",
    previewOnly: "Xem trước",
  },

  // app/login/page.tsx - public, so this is one of the few screens an English
  // visitor can reach without an account.
  login: {
    backHome: "Về trang chủ",
    freeForever: "Miễn phí mãi mãi",
    heroTitle: "Học tài chính theo cách gọn, rõ và đủ động lực để theo lâu dài",
    heroBody:
      "Vào lại hành trình của bạn, tiếp tục đúng bài đang học dở và để hệ thống tự giữ nhịp bằng quiz, ghi chú và Spaced Repetition.",

    perk1Title: "Không cần trả phí",
    perk1Body: "Học toàn bộ nội dung mà không cần thẻ.",
    perk2Title: "Tiến độ thật",
    perk2Body: "Lưu bài học, XP, streak và thống kê học tập.",
    perk3Title: "Đi từng chặng",
    perk3Body: "Không bị ngợp vì đã có lộ trình rõ ràng.",

    trackPickTitle: "Chọn lộ trình rồi vào học ngay",
    trackPickBody: "Bạn có thể đổi hướng học sau trong phần cài đặt.",

    brand: "Tự Học Tài Chính",
    lessonCountLine: "Học {count}+ bài, 100% miễn phí, lưu tiến độ thật trên tài khoản của bạn.",

    modeLogin: "Đăng nhập",
    modeSignup: "Tạo tài khoản",
    modeForgot: "Quên mật khẩu",
    subLogin: "Quay lại dashboard, tiếp tục bài đang học và xem lại tiến độ của bạn.",
    subSignup: "Bắt đầu hành trình học tài chính của riêng bạn chỉ trong chưa tới một phút.",
    subForgot: "Nhập email để nhận link đặt lại mật khẩu và quay lại học tiếp.",

    google: "Đăng nhập với Google",
    orEmail: "Hoặc email",
    // Split around the inline <strong> holding the address.
    resetSentPart1: "Đã gửi email tới ",
    resetSentPart2: ". Mở email và bấm vào link để đặt lại mật khẩu.",
    emailLabel: "Địa chỉ email",
    sending: "Đang gửi...",
    sendReset: "Gửi email đặt lại mật khẩu",
    emailNotConfirmed:
      "Tài khoản đã được tạo nhưng email chưa được xác nhận. Mở hộp thư và bấm vào link trong email kích hoạt, rồi quay lại đăng nhập.",
    resendConfirm: "Gửi lại email xác nhận",
    confirmResent: "Đã gửi lại. Kiểm tra cả mục spam nếu vài phút nữa vẫn chưa thấy.",
    nameLabel: "Tên của bạn",
    namePlaceholder: "Nguyễn Văn A",
    passwordLabel: "Mật khẩu",
    forgotLink: "Quên mật khẩu?",
    tooManyAttempts: "Quá nhiều lần thử. Vui lòng đợi {seconds} giây rồi thử lại.",
    genericError: "Có lỗi xảy ra. Vui lòng thử lại.",
    fillAllSignup: "Vui lòng điền đầy đủ tên, email và mật khẩu.",
    passwordTooShort: "Mật khẩu phải ít nhất 6 ký tự.",
    signupNoAutoLogin: "Đã tạo tài khoản nhưng không thể tự động đăng nhập. Vui lòng đăng nhập thủ công.",
    fillEmailPassword: "Vui lòng điền email và mật khẩu.",
    enterEmail: "Vui lòng nhập email của bạn.",
    processing: "Đang xử lý...",
    signUp: "Đăng ký",

    statRating: "Đánh giá",
    statRatingValue: "4.9/5 học viên",
    statLessons: "Bài học",
    statLessonsValue: "{count}+ bài",
    statSupport: "Hỗ trợ",
    statSupportValue: "Hỏi đáp 24/7",

    noAccount: "Chưa có tài khoản?",
    haveAccount: "Đã có tài khoản?",
    // Split around the two policy links.
    termsPart1: "Bằng việc tiếp tục, bạn đồng ý với",
    terms: "Điều khoản sử dụng",
    termsAnd: "và",
    privacy: "Chính sách bảo mật",
  },

  // app/(app)/profile/page.tsx
  profile: {
    loadPartialError: "Không tải được đầy đủ hồ sơ. Vui lòng thử lại.",
    defaultName: "Người dùng",
    titleUpdated: "Đã cập nhật danh hiệu hiển thị!",
    themeUpdated: "Đã cập nhật giao diện hiển thị!",
    loading: "Đang tải...",
    back: "← Quay lại",
    title: "Hồ sơ cá nhân",
    subtitle: "Nơi bạn theo dõi hành trình học, thành tích và những việc nên làm tiếp theo.",

    levelLine: "Level {level} · {name}",
    joinedOn: "Tham gia ngày {date}",
    joinedUnknown: "chưa rõ",
    bioEmpty:
      "Bạn chưa có phần giới thiệu. Hãy thêm vài dòng ngắn về mục tiêu học tập để hồ sơ rõ chất riêng hơn!",
    accountSettings: "Thiết lập tài khoản",
    progressToLevel: "Tiến trình lên Level {level}",
    xpToGo: "Còn {xp} XP",
    maxLevel: "Đã đạt cấp tối đa",
    xpWithPercent: "{xp} XP",

    trackProgressTitle: "Tiến độ lộ trình",
    trackProgressSub: "Tiến độ tổng quát lộ trình học của bạn",
    inProgress: "Đang học",
    lessonsOf: "{done}/{total} bài",
    percentAndHours: "{percent}% · ~{hours} giờ",

    recentTitle: "Bài học hoàn thành gần đây",
    recentSub: "Các bài vừa học xong gần nhất để bạn ôn tập",
    recentEmpty:
      "Chưa có bài hoàn thành nào để hiển thị. Hãy tiếp tục học trên Dashboard để lưu tiến độ nhé!",
    completedOn: "Hoàn thành ngày {date}",
    dateUnknown: "Không rõ ngày",
    readAndQuiz: "Đọc & Quiz",

    journeyTitle: "Hành trình học tập",
    journeySub: "Dòng thời gian các cột mốc quan trọng của bạn",
    journeyEmpty: "Chưa có cột mốc nào để hiển thị. Hãy tiếp tục học để tạo cột mốc đầu tiên nhé!",

    summaryTitle: "Thống kê tóm tắt",
    studyTime: "Thời gian học",
    minutes: "{count} phút",
    lessonsOpened: "{count} bài đã mở",
    weeklyRank: "Xếp hạng tuần",
    unranked: "Chưa xếp hạng",
    rankKeepGoing: "Học tiếp để lên hạng",
    streakLabel: "Nhịp học streak",
    days: "{count} ngày",
    streakRecord: "Kỷ lục {count} ngày",
    notesAndFlags: "Ghi chú & Flag",
    noteCount: "{count} Note",
    flaggedCount: "{count} bài tự đánh dấu",

    badgesTitle: "Huy hiệu & Danh hiệu",
    badgesTotal: "Tổng {count}",
    rankNumber: "Hạng #{rank}",
    badgesEmpty: "Chưa đạt được huy hiệu học tập nào. Hoàn thành thêm bài học nhé!",

    chestItems: "Vật phẩm Rương Quà",
    titlesSection: "Danh hiệu ({count})",
    titlesEmpty: "Chưa mở khóa danh hiệu nào. Mở rương quà ở Dashboard để kiếm danh hiệu!",
    themesSection: "Giao diện ({count})",
    themesEmpty: "Chưa mở khóa giao diện nào.",
    themeGold: "Hoàng Kim",
    themeEmerald: "Ngọc lục bảo",
    themeLabel: "Giao diện {name}",

    savedLessons: "Bài học đã lưu ({count})",
    flaggedLessons: "Bài tự đánh dấu ({count})",
  },

  // app/(app)/phong-van-ky-thuat/page.tsx - the IB interview drill.
  interview: {
    backToDashboard: "Về Dashboard",
    title: "Technical Interview",
    subtitle: "Luyện technical + behavioral như một vòng phỏng vấn analyst thật",
    xpPerQuestion: "Thưởng +{xp} XP / câu đúng",
    technicalCount: "Technical · {count} câu",
    behavioralCount: "Behavioral · {count} câu",

    byRoleTitle: "Luyện theo vị trí bạn nhắm tới",
    sourceBadge: "Nguồn: bộ 400 IB Interview Questions",
    byRoleBody:
      "Bộ câu hỏi này viết cho Ngân hàng Đầu tư, nhưng phần kế toán, định giá và DCF dùng chung được cho nhiều vị trí phân tích khác. Chọn vị trí để chỉ luyện đúng phần liên quan.",
    allWithCount: "Tất cả · {count}",
    changeRole: "Đổi vị trí",
    closeRolePicker: "Thu gọn",
    roleSearchPlaceholder: "Tìm vị trí (gõ không dấu cũng được)…",
    roleSearchEmpty: "Không có vị trí nào khớp \"{query}\".",
    currentRoleLabel: "Đang luyện:",
    uncoveredNote:
      "{uncovered} / {total} vị trí khác chưa có bộ câu hỏi riêng — phần technical của các nghề đó đang được xây dần.",

    drillTitle: "Investment Banking & Finance Drill",
    drillBadge: "Chuẩn bộ \"400 Questions IB Guide\" Phố Wall",
    drillHeading: "Luyện technical interview như một vòng analyst thực chiến",
    // Split around the inline <strong> holding the book title, which stays as
    // it is - it is the name of a published guide.
    drillBodyPart1: "Bộ câu hỏi phỏng vấn biên soạn theo chuẩn cuốn ",
    drillBookTitle: "\"400 questions investment banking interview guide\"",
    drillBodyPart2:
      " truyền thống Phố Wall, trải rộng khắp các chuyên ngành: Kế toán 3 báo cáo, Định giá DCF, M&A, LBO, Tín dụng & Tài chính doanh nghiệp.",

    statBankLabel: "Question bank",
    statBankValue: "{count} câu",
    statPerRoundLabel: "Mỗi lượt",
    statPerRoundValue: "3-5 phút",
    statRewardLabel: "Thưởng",
    statRewardValue: "+XP",

    sectionsForRole: "Các section bạn sẽ được hỏi",
    sectionsAll: "Các section trong bộ câu hỏi",
    pickRound: "Chọn vòng phỏng vấn",
    startDrill: "Bắt đầu IB drill →",
    difficultyHint:
      "Gợi ý: dùng \"Trung bình\" cho mock analyst round, dùng \"Khó\" khi muốn luyện áp lực trước interview.",

    // DIFFICULTIES labels, keyed by the same ids the component uses.
    diffAll: "Tất cả",
    diffEasy: "Dễ",
    diffMedium: "Trung bình",
    diffHard: "Khó",

    loadingQuestions: "Đang chuẩn bị câu hỏi...",
    loadFailed: "Không thể tải bài kiểm tra lúc này. Vui lòng thử lại sau.",
    back: "← Quay lại",
    noQuestions: "Chưa có câu hỏi nào cho độ khó này. Thử độ khó khác nhé.",

    drillHeader: "IB Interview Drill",
    statQuestion: "Câu hỏi",
    statCorrect: "Đúng",
    statRound: "Round",
    interviewerAsks: "Interviewer asks",
    goodAnswer: "Good answer. +{xp} XP",
    explanation: "Giải thích:",
    lockAnswer: "Chốt câu trả lời",
    seeResults: "Xem kết quả →",
    nextQuestion: "Câu tiếp theo →",

    doneTitle: "Hoàn thành IB interview drill!",
    doneScore: "{score}/{total} câu đúng",
    donePassed: " · Đạt",
    readiness: "Interview readiness",
    nextAction: "Next action",
    levelUp: "Lên độ khó",
    reviewMistakes: "Ôn câu sai",
    xpEarned: "XP nhận được",
    sectionsToReview: "Section cần ôn lại",
    missedCount: "· sai {count}",
    sectionsHint: "Bấm một section để luyện lại đúng phần đó.",
    newDrill: "Drill mới",
  },

  // components/home/InteractiveEcosystemShowcase.tsx - the logged-out marketing
  // preview of the three ecosystem surfaces. All of its content is illustrative:
  // the learners, the posts and the quiz are a demo, not live data.
  ecosystem: {
    cheerAll: "{emoji} Cổ vũ cả nhóm học tốt!",
    cheerYou: "Bạn",
    livePreview: "● Đang xem Live Preview",
    tapToTry: "Bấm để xem thử",

    roadmapTab: "Lộ trình ôn cấp",
    roadmapTitle: "Học tài chính theo lộ trình chặng chuẩn hóa",
    roadmapBody:
      "Tích hợp Active Recall chủ động, theo dõi tiến độ từng chặng từ vỡ lòng đến chuyên sâu.",
    groupTab: "Học Nhóm (3D)",
    groupTitle: "Phòng học chung không để bạn tự học 1 mình",
    groupBody:
      "Bàn tròn 3D ảo, ghép nhóm theo chủ đề, check-in nhận XP và khung chat nhóm tương tác.",
    finsocialTab: "FinSocial",
    finsocialTitle: "Mạng xã hội học tài chính chia sẻ bài học",
    finsocialBody:
      "Feed tin tức bài viết ngắn, hỏi đáp thực tế, thảo luận phân tích BCTC và thả cảm xúc.",

    roadmapPanelTitle: "Lộ trình học tài chính cá nhân & CFA",
    roadmapPanelSub: "Thực hành active recall đố nhanh ngay tại chỗ",
    xpEarned: "Điểm tích lũy: +{xp} XP",
    stage1: "Chặng 1",
    stage1Title: "Vỡ lòng Tài chính & Quản lý Tiền mặt",
    stage1Status: "Đã hoàn thành 100%",
    stage2: "Chặng 2",
    stage2Title: "Báo cáo Tài chính & Phân tích Chỉ số ROE/PE",
    stage2Status: "Đang học (80%)",
    stage3: "Chặng 3",
    stage3Title: "Định giá Cổ phiếu & Mô hình DCF",
    stage3Status: "Khóa (Cần đỗ Chặng 2)",

    samplerLabel: "ACTIVE RECALL SAMPLER",
    samplerCounter: "Câu 1/1",
    samplerQuestion:
      "Khi một doanh nghiệp có dòng tiền CFO âm liên tục 3 năm nhưng lợi nhuận ròng vẫn dương, đâu là nguyên nhân chính?",
    samplerOptionA: "Doanh nghiệp bán hàng ghi nhận doanh thu nhưng chưa thu được tiền (Phải thu tăng)",
    samplerOptionB: "Doanh nghiệp vừa nhận khoản đầu tư lớn từ cổ đông",
    samplerOptionC: "Doanh nghiệp chi trả cổ tức quá mức",
    samplerCorrect: "Chính xác! +45 XP. Dòng tiền CFO phản ánh tiền thực về két.",
    samplerWrong: "Chưa chính xác. Đáp án đúng là phải thu gia tăng mạnh!",

    deskLabel: "BÀN HỌC 3D · TÀI CHÍNH CÁ NHÂN",
    cheerLabel: "Cổ Vũ:",
    roomLabel: "BÀN HỌC PHÒNG #102",
    roomXp: "480 / 500 XP",
    xpBonus: "+15% XP BONUS",
    // Demo learner names are left as they are - they are proper nouns. Only the
    // "(you)" marker is translated.
    youSuffix: "(Bạn)",
    memberLessons: "{count} bài",
    cheerHint: "Bấm thử các nút cổ vũ phía trên để gửi tin nhắn tương tác trực tiếp!",
    chatLive: "Trò chuyện nhóm Live",
    online: "Online",
    adminByline: "Tài Tài · Quản lý nhóm",
    adminMessage: "Cập nhật hôm nay: Hà tường vy, hà hồng đã học bài. Cùng cố gắng nhé!",
    chatPlaceholder: "Gửi lời chúc, hỏi bài...",

    feedPanelTitle: "FinSocial feed trực tuyến",
    feedPanelSub: "Bấm thử nút Thả tim ❤️ tương tác với bài viết thực tế",
    feedCta: "Vào FinSocial Feed",
    postStats: "{comments} bình luận · {shares} chia sẻ",

    // The two demo posts. Author names and hashtags stay as they are.
    post1Time: "2 giờ trước",
    post1Topic: "Phân tích BCTC",
    post1Title: "Bí quyết đọc nhanh Báo cáo lưu chuyển tiền tệ (Cash Flow) trong 5 phút",
    post1Content:
      "Nhiều bạn mới học tài chính thường bỏ qua báo cáo lưu chuyển tiền tệ mà chỉ nhìn lợi nhuận trên Báo cáo KQKD. Nhớ quy tắc: Lợi nhuận có thể là sổ sách, nhưng Dòng tiền từ HĐKD (CFO) mới là dòng máu thực sự của doanh nghiệp!",
    post2Time: "4 giờ trước",
    post2Topic: "Tài chính cá nhân",
    post2Title: "Quy tắc 50/30/20 có còn phù hợp với bối cảnh lạm phát hiện tại?",
    post2Content:
      "50% Nhu cầu thiết yếu - 30% Sở thích - 20% Tiết kiệm & Đầu tư. Nếu chi phí sinh hoạt tăng cao, hãy ưu tiên cố định 20% Tiết kiệm trước (Pay Yourself First) rồi mới phân bổ 80% còn lại!",
  },

  // components/LearningAnalytics.tsx - the /analytics dashboard.
  analytics: {
    streakRecordHint: "Kỷ lục {count} ngày liên tiếp",
    lessons30d: "{count} bài trong 30 ngày qua",
    avgMinutesPerLesson: "TB {count} phút cho mỗi bài",
    completionOfStarted: "{percent}% trên {count} bài đã mở",
    lessonsWithNotes: "{count} bài học có lưu note",
    minutesValue: "{count} phút",
    // Nhãn tooltip biểu đồ. Trước là template literal trong thân arrow gọn -
    // hình dạng mà i18n-coverage chỉ thấy được sau khi thêm rule returned-text.
    lessonsUnit: "{count} bài",
    minutesUnit: "{count} phút",
    weekStarting: "Tuần bắt đầu {label}",
    hourBucket: "Khung giờ {hour}",
    noData: "Không có dữ liệu analytics",
    // Khung giờ học đỉnh: tầng dữ liệu trả về ID, câu chữ nằm ở đây.
    peakWindow: {
      unknown: "Chưa đủ dữ liệu",
      lateNight: "Khuya / rất sớm",
      morning: "Buổi sáng",
      afternoon: "Buổi chiều",
      evening: "Buổi tối",
      night: "Đêm muộn",
    },
    insightNoStudy7d: "7 ngày chưa học",
    insightLessons7d: "{count} bài / 7 ngày",
    insightNotes: "{count} ghi chú",
    insightCompletion: "{percent}% hoàn thành",
    minutesDone: "{count} phút hoàn thành",
    trackPersonal: "Cá nhân",
    trackProfessional: "Chuyên ngành",
    hintCompletionRatio: "Tỷ số bài kết thúc / bài đã mở",
    hintSelfMarked: "Các bài tự bấm đánh dấu đã học",
    hintConsistency: "Độ hiện diện đều đặn trong 8 tuần",
    personal: "Cá nhân",
    currentRhythm: "Nhịp học hiện tại",

    // Chart series names, mapped from the raw metric keys.
    seriesLessons: "Bài học",
    seriesMinutes: "Thời gian",

    streakLabel: "Chuỗi",
    streakDays: "{count} ngày",
    streakRecord: "Kỷ lục {count}",
    quizScoreLabel: "Điểm Quiz",
    lessonCount: "{count} bài",
    studyHourLabel: "Giờ Học",
    hourUnknown: "Chưa rõ",

    tabOverview: "Thống kê cá nhân",
    tabKnowledge: "Kiến thức & Kết quả",
    tabMemory: "Ghi chú & Hành động",
    tabCompetency: "Năng lực",
    tabLeaderboard: "Bảng xếp hạng",

    cardStreak: "Chuỗi ngày",
    cardWeekRhythm: "Nhịp 7 ngày",
    cardStudyTime: "Thời gian học",
    cardWeekTrend: "Xu hướng tuần",

    rhythmEyebrow: "Nhịp học 8 tuần gần đây",
    rhythmTitle: "Hoạt động của bạn theo tuần",
    rhythmPeak: "Tuần tốt nhất: {count} bài",

    hoursEyebrow: "Khung giờ học",
    hoursTitle: "Giờ học quen thuộc nhất",
    hoursSub: "Dựa trên thời điểm bạn hoàn thành bài học.",
    hoursEmpty: "Chưa đủ dữ liệu giờ học để vẽ biểu đồ.",

    cardAvgQuiz: "Điểm quiz trung bình",
    cardCompleted: "Bài hoàn thành",
    cardCompletionRate: "Tỷ lệ hoàn thành",

    trackEyebrow: "Cơ cấu track học",
    trackTitle: "Lĩnh vực bạn đang tập trung học",
    trackEmpty: "Chưa có dữ liệu track để hiển thị.",
    total: "Tổng cộng",

    difficultyEyebrow: "Độ khó bài đã học",
    difficultyTitle: "Phân phối độ khó",
    lessonsDone: "{count} bài đã xong",
    lessonsWithPercent: "{count} bài ({percent}%)",

    cardTotalNotes: "Tổng số ghi chú",
    cardManualFlags: "Đánh dấu thủ công",
    cardRhythmStability: "Độ ổn định nhịp học",

    notesEyebrow: "Ghi chú nổi bật",
    notesTitle: "Bài học được note nhiều nhất",
    seeAll: "Xem tất cả",
    notesEmpty:
      "Chưa có ghi chú nào được lưu. Khi bạn note lại ý quan trọng trong bài học, phần này sẽ hiển thị các bài bạn suy ngẫm nhiều nhất.",
    notesSaved: "{count} ghi chú được lưu",

    nextEyebrow: "Gợi ý tiếp theo",
    nextTitle: "Tận dụng dữ liệu học tập",
    tipFinishTitle: "Đóng các bài dang dở",
    tipFinishBody:
      "Tỷ lệ hoàn thành đang là {rate}%. Hãy ưu tiên ôn lại và kết thúc các bài học đã bắt đầu thay vì mở bài mới để ghi nhớ sâu sắc hơn.",
    tipHoursTitle: "Duy trì cấu trúc giờ học",
    tipHoursBody:
      "Bạn có xu hướng học tốt nhất vào lúc {hour}. Thiết lập nhịp học cố định quanh khung giờ đó.",
    tipHoursFallback: "các giờ cố định",
    tipNotesTitle: "Biến ghi chú thành lợi thế ôn tập",
    tipNotesBody:
      "Bạn đang có {count} ghi chú quan trọng. Hãy thường xuyên ôn tập lại các note để lưu trữ kiến thức bền lâu.",
    continueLearning: "Tiếp tục học",
    openNotes: "Mở ghi chú",
  },

  // components/flashcard/FlashcardClient.tsx - the SM2 flashcard box.
  flashcards: {
    mistakeTerm: "[Lỗi sai: {title}] {question}",
    mistakeDefinition: "Đáp án đúng: {answer}. Giải thích: {explanation}",
    noMistakesFound:
      "Không tìm thấy câu trắc nghiệm làm sai chưa giải quyết nào! 🌟 Hãy tiếp tục học bài nhé.",
    mistakesAlreadyMade: "Tất cả câu lỗi sai đã được tạo thẻ trước đó.",
    mistakesScanFailed: "Có lỗi xảy ra khi quét lịch sử lỗi sai.",
    markedForReview: "Đã đánh dấu cần học lại sớm!",
    reviewSaveFailed: "Không thể lưu trạng thái ôn tập.",
    cardAdded: "Đã thêm thẻ mới!",
    cardSaveFailed: "Không thể lưu thẻ mới.",
    bulkParseFailed:
      "Không đọc được dòng nào hợp lệ - mỗi dòng cần dạng \"thuật ngữ | định nghĩa\".",
    bulkSaveFailed: "Không thể lưu các thẻ này.",
    nothingToExport: "Chưa có thẻ nào để xuất.",
    cardDeleted: "Đã xoá thẻ thành công.",
    cardDeleteFailed: "Không thể xoá thẻ.",
    sampleImportFailed: "Lỗi khi nhập thẻ mẫu.",
    generatedFromMistakes: "Đã tự động tạo thành công {count} thẻ ôn tập từ các câu làm sai! ⚡🗂️",
    nextReview: "Đã nhớ! Lần ôn tiếp theo: {days} ngày tới.",
    bulkAdded: "Đã thêm {added} thẻ mới!",
    // Đuôi tuỳ chọn, ghép sau câu chính khi có thẻ bị bỏ qua. Tách thành khoá
    // riêng chứ không nhét vào câu chính: trật tự vế trong câu đổi theo ngôn
    // ngữ, và một chuỗi mang sẵn dấu ngoặc đơn thì không đổi được.
    bulkSkippedSuffix: " (bỏ qua {skipped} thẻ đã có sẵn)",
    bulkAllExisted: "Cả {skipped} thẻ đều đã có sẵn trong hộp thẻ của bạn.",
    copiedToClipboard: "Đã sao chép {count} thẻ vào clipboard.",
    copyToClipboardFailed: "Không sao chép được danh sách thẻ",
    confirmDelete: "Bạn có chắc chắn muốn xoá thẻ \"{term}\"?",
    sampleImported: "Đã nhập thành công {count} thẻ từ vựng mẫu! 🎉",

    // components/flashcard/FlashcardAlbumsGallery.tsx
    albumImported: "Đã nhập {added} thẻ từ \"{title}\" vào bộ của bạn!",
    albumSkippedSuffix: " (bỏ qua {skipped} thẻ đã có)",
    albumAllExisted: "Bạn đã có sẵn toàn bộ {skipped} thẻ trong \"{title}\" rồi.",
    albumBack: "Quay lại danh sách",
    albumCards: "thẻ",
    albumImporting: "Đang nhập...",
    albumImportCta: "Nhập {count} thẻ vào bộ của tôi",

    back: "Quay lại",
    title: "Thẻ ghi nhớ",
    algorithm: "Spaced Repetition · Thuật toán SM2",
    statDue: "Đến hạn",
    statTotal: "Tổng số thẻ",
    statMastered: "Đã thành thạo",

    generating: "Đang tạo...",
    generateFromMistakes: "Tạo từ lỗi sai",
    addCard: "Thêm thẻ mới",
    importExport: "Nhập/Xuất",
    hotDecks: "Bộ thẻ hot",

    bulkTitle: "Nhập/Xuất hàng loạt",
    bulkExport: "Xuất {count} thẻ hiện có",
    bulkLabel: "Dán danh sách - mỗi dòng: thuật ngữ | định nghĩa",
    bulkPlaceholder:
      "Lãi kép | Lãi tính trên cả gốc lẫn lãi tích luỹ trước đó\nWACC | Chi phí vốn bình quân gia quyền",
    bulkParsed: "Đọc được {count} thẻ hợp lệ.",
    exportShort: "Xuất",
    cancel: "Hủy",
    bulkImporting: "Đang nhập...",
    bulkImport: "Nhập thẻ",

    newCardTitle: "Tạo thẻ ghi nhớ mới",
    termLabel: "Thuật ngữ / Từ vựng",
    termPlaceholder: "Ví dụ: Lãi đơn",
    definitionLabel: "Định nghĩa / Giải nghĩa",
    definitionPlaceholder: "Giải thích ngắn gọn để bạn dễ ôn tập và ghi nhớ...",
    saving: "Đang lưu...",
    saveCard: "Lưu thẻ",

    loading: "Đang tải hộp thẻ của bạn...",
    emptyTitle: "Hộp thẻ trống",
    emptyBody:
      "Bạn chưa có thẻ ghi nhớ nào trong hệ thống. Hãy tự tạo một số thẻ từ vựng mới hoặc nhập danh sách mẫu bên dưới để học ngay!",
    importSamples: "Nhập 8 thẻ mẫu",
    quickFromMistakes: "Tạo nhanh từ lỗi sai ⚡",

    reviewing: "Đang ôn tập",
    cardsLeft: "Còn {count} thẻ",
    rememberedShort: "Nhớ 👍",
    forgotShort: "Quên ❌",
    faceDefinition: "Định nghĩa",
    faceTerm: "Thuật ngữ",
    flipToTerm: "Chạm để xem thuật ngữ",
    flipToDefinition: "Chạm để lật mặt sau",
    gradeForgot: "Quên",
    gradeMedium: "Vừa phải",
    gradeEasy: "Dễ nhớ",

    doneTitle: "Tuyệt vời! Đã hoàn thành ôn tập hôm nay!",
    doneBody:
      "Các thuật ngữ đã được giãn cách khoa học. Hãy quay lại vào ngày mai để tiếp tục ghi nhớ kiến thức nhé!",

    listTitle: "Danh sách từ vựng hiện tại",
    cardCount: "{count} thẻ",
    badgeDue: "Đến hạn",
    badgeReviewed: "Đã ôn",
    badgeMastered: "Thành thạo",
    deleteCardTitle: "Xoá thẻ",
  },

  // components/FinancialGuildWidget.tsx - the VN30 fund simulator.
  guild: {
    stopLossTitle: "Bài học nguyên tắc cắt lỗ stop-loss ({ticker} {percent}%)",
    stopLossDesc:
      "Mã {ticker} đã vi phạm mốc cắt lỗ chuẩn -8%. Bài học: Kỷ luật cắt lỗ sớm giúp bảo vệ quy mô vốn Quỹ để tái cơ cấu vào các cơ hội mới tốt hơn!",
    takeProfitTitle: "Bài học chốt lời take-profit ({ticker} +{percent}%)",
    takeProfitDesc:
      "Mã {ticker} đang đạt mức sinh lời ấn tượng! Bài học: Chốt lời từng phần (Scaling Out) giúp hiện thực hóa lợi nhuận thực tế thay vì chỉ nắm giữ lãi trên giấy.",
    concentrationTitle: "Cảnh báo tập trung vốn (Concentration risk)",
    concentrationDesc:
      "Bạn đang dồn hơn 80% giá trị danh mục vào duy nhất 1 mã cổ phiếu. Bài học: Đa dạng hóa danh mục (Diversification) giúp giảm thiểu rủi ro phi hệ thống khi doanh nghiệp gặp tin xấu!",
    insufficientCash: "Không đủ sức mua tiền mặt khả dụng!",
    insufficientShares: "Số lượng cổ phiếu trong danh mục không đủ để BÁN!",
    rebalanced: "Đã tái cơ cấu đưa Quỹ về trạng thái vốn ban đầu 1 Tỷ VNĐ.",

    clanTitle: "Wall Street Hedge Fund Clan",
    universe: "VN30 Top 30 Stocks",
    subtitle: "Mô phỏng quỹ đầu tư cổ phiếu việt nam",
    hideGuide: "Ẩn hướng dẫn",
    showGuide: "Hướng dẫn cách chơi",
    advance7: "Tua +7 Ngày",
    advance30: "Tua +30 Ngày",
    rebalanceTitle: "Tái cơ cấu về 1 Tỷ VNĐ",

    guideTitle: "Hướng dẫn chi tiết cách chơi mô phỏng quỹ đầu tư",
    close: "✕ Đóng",
    // Each step's body wraps inline <strong> emphasis, so it is split into
    // segments rather than carrying markup through the dictionary.
    step1Title: "1️⃣ vốn ban đầu 1 tỷ",
    step1Part1: "Bạn được cấp ",
    step1Amount: "1,000,000,000 VNĐ",
    step1Part2: " tiền mặt ban đầu để đóng vai quản lý quỹ Hedge Fund chuyên nghiệp.",
    step2Title: "2️⃣ Mua / Bán VN30",
    step2Part1: "Chọn các mã cổ phiếu đầu ngành (",
    step2Tickers: "FPT, VNM, HPG, TCB...",
    step2Part2: ") bấm ",
    step2Part3: " giải ngân hoặc ",
    step2Part4: " chốt lời.",
    step3Title: "3️⃣ tua thời gian & tin tức",
    step3Part1: "Bấm ",
    step3Part2: " hoặc ",
    step3Advance30Short: "+30 Ngày",
    step3Part3: " để theo dõi biến động giá cổ phiếu & phản ứng với các tin vĩ mô.",
    step4Title: "4️⃣ Đua Top BXH & Thưởng",
    step4Part1: "Tăng trưởng giá trị tổng quỹ để leo Top trên ",
    step4Board: "BXH Quỹ Server",
    step4Part2: " + tích lũy XP & Coin thưởng.",

    totalAssets: "Tổng tài sản quỹ",
    currency: "VNĐ",
    percentOfFund: "% Tổng Quỹ",
    availableCash: "Tiền mặt khả dụng",
    buyingPowerLeft: "Sức mua còn lại",
    stockValue: "Giá trị cổ phiếu",
    holdingsCount: "{count} mã đang nắm giữ",
    simulatedTime: "Thời gian mô phỏng",
    dayNumber: "Ngày thứ {day}",
    leaderboardTitle: "BXH quỹ mô phỏng",
    lessonFromPortfolio: "Bài học tài chính rút ra từ danh mục của bạn:",
    allVn30: "Tất cả 30 Mã VN30",

    colTicker: "Mã CK / Doanh Nghiệp",
    colSector: "Ngành Nghề",
    colPrice: "Giá thị trường (VnĐ)",
    colChange: "Thay Đổi",
    colHolding: "Nắm Giữ (Cổ phiếu)",
    colPnl: "Lãi/Lỗ Tạm Tính",
    colAction: "Hành Động",
    costBasis: "Giá vốn:",
    buy: "MUA",
    sell: "BÁN",

    buyOrderTitle: "Lệnh mua cổ phiếu",
    sellOrderTitle: "Lệnh bán cổ phiếu",
    currentPrice: "Giá hiện tại:",
    shareCount: "Số lượng cổ phiếu:",
    orderTotal: "Tổng giá trị giao dịch:",
    cashAvailable: "Tiền mặt khả dụng:",
    confirmPrefix: "Xác Nhận",
    confirmSuffix: "Cổ Phiếu",
  },

  // components/CommunityFeedClient.tsx - the FinSocial feed (/finsocial).
  feed: {
    sentimentPost: "#PhanTich #MarketSentiment Hôm nay mình nhận định thị trường {view}. Khảo sát cộng đồng: {bull}% Bullish · {bear}% Bearish.",
    voteBullish: "Biển Xanh (Bullish - Tăng trưởng)",
    voteBearish: "Biển Đỏ (Bearish - Thận trọng)",
    spotlightQuestion: "Câu hỏi cần trả lời",
    spotlightDiscussed: "Đang được bàn nhiều",
    spotlightAnalysis: "Phân tích đáng đọc",
    anonMember: "Thành viên",
    anonYou: "Bạn",
    sentimentBullish: "Đã ghi nhận nhận định biển xanh bullish của bạn!",
    sentimentBearish: "Đã ghi nhận nhận định biển đỏ bearish của bạn!",
    postFailed: "Không đăng được bài. Vui lòng thử lại.",
    postEditFailed: "Không sửa được bài viết",
    commentFailed: "Không gửi được bình luận.",
    commentEditFailed: "Không sửa được bình luận",
    composerPlaceholder: "{name} ơi, bạn đang nghĩ gì thế?",
    pollOptionPlaceholder: "Lựa chọn {index}",
    editedAt: "Chỉnh sửa {when}",

    // Nhãn của lựa chọn "không chọn loại nào" trong ô soạn bài. Không dùng
    // `topics.all` được: ở bộ lọc "Tất cả" nghĩa là xem mọi bài, còn ở ô soạn
    // bài cùng chữ đó lại đọc thành "đăng vào mục Tất cả", tức một mục có thật.
    topicNone: "Không phân loại",

    // MarketSentimentWidget
    // TOPICS labels. `id`, `tag`, `icon` and `tone` stay in the component: the
    // hashtag is functional - getPostCategory classifies a post by looking for
    // it in the stored content - so it must never be translated.
    //
    // Chủ đề Thành tựu đã bỏ khỏi bảng này: nó gần như toàn bộ là bài do hệ
    // thống tự đăng, nên nó là một luồng máy sinh ra được cho một cái nhãn chứ
    // không phải một chủ đề người ta viết vào.
    topics: {
      all: { label: "Tất cả", short: "Tất cả" },
      "meo-tai-chinh": { label: "Mẹo tài chính", short: "Mẹo" },
      "phan-tich": { label: "Phân tích", short: "Phân tích" },
      "thanh-tuu": { label: "Thành tựu", short: "Thành tựu" },
      "hoi-dap": { label: "Hỏi đáp", short: "Hỏi đáp" },
      "tin-nong": { label: "Tin nóng", short: "Tin nóng" },
      "ai-finance": { label: "AI tài chính", short: "AI Finance" },
    },


    // getUserBadge - a plain function, so the dictionary is passed in.
    badgeStreak: "Giữ streak",
    badgeDiscussed: "Đang được bàn luận",
    badgeFeatured: "Bài viết nổi bật",

    sentimentTitle: "THỊ TRƯỜNG & VĨ MÔ HÔM NAY",
    sentimentQuestion: "Cộng đồng nhận định xu hướng VN-Index & Vĩ mô hôm nay thế nào?",
    sentimentShare: "Đăng nhận định",
    bullishTitle: "Biển Xanh (Bullish)",
    bullishSub: "Tích cực & Khả quan",
    bearishTitle: "Biển Đỏ (Bearish)",
    bearishSub: "Thận trọng & Quan sát",
    bullishVotes: "{count} phiếu ({percent}%)",
    bearishVotes: "{count} phiếu ({percent}%)",
    totalVotes: "Tổng số lượt vote: {count}",

    // InteractivePollCard
    pollTitle: "THĂM DÒ Ý KIẾN CỘNG ĐỒNG",
    pollVoteCount: "{count} lượt bình chọn",
    pollVoted: "Đã ghi nhận bình chọn của bạn!",

    // Composer
    signInToPost: "Vui lòng đăng nhập để đăng bài.",
    emptyPost: "Vui lòng nhập nội dung, chọn hình ảnh hoặc điền thông tin thăm dò ý kiến.",
    posted: "Đã đăng bài thành công!",
    postedShare: "Đã đăng bài chia sẻ!",
    composerPrompt: "{name} ơi, bạn đang nghĩ gì thế?",
    composerFallbackName: "Bạn",
    addMedia: "Ảnh / Video",
    addTopic: "Chủ đề",
    addFeeling: "Cảm xúc",
    createPost: "Tạo bài viết",
    memberRole: "Thành viên FinSocial",
    visibilityPublic: "Công khai",
    previewAlt: "Preview",
    createPoll: "Tạo bình chọn / Thăm dò ý kiến",
    cancel: "Hủy",
    pollQuestionPlaceholder:
      "Nhập câu hỏi thăm dò ý kiến (Ví dụ: Fed sẽ hạ bao nhiêu bps lãi suất?)",
    addPollOption: "+ Thêm lựa chọn",
    addToPost: "Thêm vào bài viết của bạn",
    addImageTitle: "Thêm ảnh",
    addPollTitle: "Thêm thăm dò ý kiến",
    posting: "Đang đăng...",
    post: "Đăng bài",

    // Header
    bgAlt: "Saigon Skyline background",
    backToDashboard: "Về Dashboard",
    eyebrow: "Mạng xã hội học tài chính",
    title: "FinSocial Feed",
    subtitle:
      "Nơi cộng đồng chia sẻ bản tin ngắn, câu hỏi, phân tích BCTC thực tế và ăn mừng thành tựu học tập mỗi ngày.",
    statPosts: "Bài viết",
    statReactions: "Cảm xúc",
    statComments: "Bình luận",

    // Highlights + filters
    highlightsTitle: "Nổi bật hôm nay",
    highlightsSub: "Các bài đáng mở đầu để bắt nhịp nhanh",
    postWithImage: "Bài viết có hình ảnh",
    reactionsSuffix: "cảm xúc",
    commentsSuffix: "bình luận",
    authorReactions: "{name} · {count} cảm xúc",
    searchPlaceholder: "Tìm bài viết, người đăng, chủ đề...",
    refresh: "Làm mới",
    feedEmpty: "Chưa có bài chia sẻ nào phù hợp bộ lọc này.",
    // Hai trạng thái rỗng KHÁC NHAU, và gộp chúng là chỗ đã làm người dùng
    // tưởng mất bài: `feedEmpty` nói "không khớp bộ lọc" - đúng khi có bộ lọc
    // hoặc từ khoá, nhưng khi đang xem tất cả mà không có bài nào thì câu đó
    // đọc như "bài của bạn đâu rồi". Trường hợp thứ hai cần một lời mời viết.
    feedEmptyNoPosts: "Chưa ai chia sẻ gì hôm nay. Bạn viết dòng đầu tiên nhé?",
    feedEmptyWrite: "Viết bài đầu tiên",

    // Post card
    streak: "Streak",
    edited: "· đã chỉnh sửa",
    cancelEdit: "Huỷ",
    saving: "Đang lưu...",
    save: "Lưu",
    levelCertTitle: "Chứng nhận thăng cấp",
    levelCertLevel: "Cấp {level}: {name}",
    // Split around the inline <strong> holding the score.
    levelCertBodyPart1: "Đạt thành tích vượt qua Bài thi thăng cấp khắt khe với kết quả chính xác ",
    levelCertBodyPart2: "!",
    postImageAlt: "Bài đăng của người dùng",
    reacted: "Đã thả cảm xúc",
    react: "Thả cảm xúc",

    // Comments
    comment: "Bình luận",
    editComment: "Sửa",
    deleteComment: "Xoá",
    commentPlaceholder: "Viết bình luận ngắn, kiểu status reply...",
    emojiHint: "Gợi ý emoji",
    send: "Gửi",
    commentsLoading: "Đang tải bình luận...",
    commentsEmpty: "Chưa có bình luận nào. Mở hàng câu đầu tiên đi.",
    editCommentAria: "Sửa bình luận",
    deleteCommentAria: "Xoá bình luận",
    loading: "Đang tải...",
    loadMore: "Tải thêm",

    // Sidebar
    rulesTitle: "Luật feed",
    rule1: "• Hữu ích, tích cực, tôn trọng nhau.",
    rule2: "• Không khuyến nghị chắc chắn, không chia sẻ dữ liệu mật.",
    rule3: "• Ưu tiên bài viết chi tiết, có ví dụ hoặc nguồn cần kiểm chứng.",
    streakBoardTitle: "Chuỗi ngày hôm nay",
    streakBoardEmpty: "Hôm nay chưa ai giữ được chuỗi.",
    trendingTitle: "Đang nổi bật",
    trendingEmpty: "Chưa có bài nổi bật.",
    rankTitle: "Bảng xếp hạng",
    rankSub: "Top XP tuần này",
    rankEmpty: "Chưa có ai trên bảng.",
    rankViewAll: "Xem bảng đầy đủ",
    rankXpUnit: "XP",
    promptsTitle: "Gợi ý đăng bài",
    prompt1: "Hôm nay mình hiểu ra...",
    prompt2: "Mình đang kẹt ở câu hỏi...",
    prompt3: "Một mẹo học BCTC của mình là...",
    prompt4: "Ảnh thành quả/streak hôm nay:",
  },

  // components/ResumeLearningButton.tsx - the "continue learning" hero card.
  resume: {
    greeting1: "Chào{name}! Sách đã mở, kiến thức đã sẵn sàng. Cùng chinh phục bài tiếp theo để nhận XP nào! 🔥",
    greeting2: "Tuyệt vời{name}! Bạn đã hoàn thành {count} bài học. Cùng duy trì đà tiến bộ này ngay nhé! 🌟",
    greeting3: "Chào{name}! Hôm nay mục tiêu là lên cấp tiếp theo. Học ngay bài học dưới đây thôi nào! 🏆",
    greeting4: "Năng lượng lên nào{name}! Thêm một bài học là thêm một phần kiến thức thực chiến vững chắc! 💪",
    criteriaQuizLeft: "{count} câu Kiểm tra nhanh",
    criteriaReadAll: "đọc hết bài",
    congrats: "Chúc mừng{name}!",
    allDone: "Bạn đã hoàn thành tất cả bài học",
    study: "Học",

    quickGuideTitle: "Hướng dẫn nhanh 3 bước",
    quickGuideIntro:
      "\"Chào{name}! Lần đầu học tài chính đúng không? Đi theo 3 bước này là bạn có nền ngay.\"",
    step1Title: "Chọn lộ trình phù hợp",
    step1Body: "Cá nhân hay chuyên ngành - chọn đúng ngay từ đầu",
    step2Title: "Học bài đầu tiên: {lesson}",
    step2Body: "{duration} thôi - đủ để tạo đà",
    step2Cta: "Vào học",
    step3Title: "Xem bảng xếp hạng & giữ streak",
    step3Body: "Học đều mỗi ngày để leo hạng",

    heroBanner: "ĐANG HỌC DỞ",
    xpIfNow: "+{xp} XP NẾU HỌC NGAY",
    trackProgress: "Tiến độ lộ trình ({done}/{total} bài)",
    continuingLesson: "Bài học đang tiếp tục",
    minutesStudied: "Đã học {minutes} phút",
    readyToStart: "Sẵn sàng khởi động bài học ngay",
    continueNow: "TIẾP TỤC HỌC NGAY",

    feedbackTitle: "Phản hồi học tập",
    reviewOnTime: "Tổng ôn đúng lúc",
    coachReminder: "Tài Tài nhắc bạn: {message}",
    openStage: "Mở {stage}: {lesson}",
    gapsLeaning: "Lỗ hổng kiến thức hiện tại của bạn đang nghiêng về:",
    stumblingMost: "Bạn đang vấp nhiều nhất ở: {topic}",
    wrongCount: "Đã sai {count} lần trong bài “{lesson}”",
    coachSuggestion: "Gợi ý của Tài Tài: {action}",
    // Câu dự phòng khi câu quiz không có explanation. Trước đây server action
    // tự ghép câu này rồi trả về, tức server sinh câu chữ; giờ nó trả
    // explanation: null và chỗ này lo phần câu chữ.
    explanationFallback: "Bạn đang vấp lại đúng một ý cốt lõi của bài này.",
    stageReviewMessage:
      "Bạn đã đi gần hết {stage}. Đây là lúc làm bài tổng ôn để khóa lại các ý chính trước khi học tiếp.",
    reviewThisLesson: "Ôn lại bài này",
    makeFlashcard: "Tạo flashcard",
    recallTitle: "Ôn tập",
  },

  // Chủ đề học, tra bằng StageTopicId (lib/stage-topics.ts). Server action trả
  // id chứ không trả câu chữ, vì id còn là khóa cộng dồn topicCounts và khóa
  // chọn câu khuyên - một khóa đổi theo ngôn ngữ thì hai người học cùng một
  // điểm yếu sẽ cộng vào hai ô khác nhau.
  // Tên và "còn thiếu gì" của 14 mảng kiến thức, tra bằng SkillDomainId.
  //
  // SKILL_DOMAINS trong lib/career-competency.ts giờ chỉ giữ id và lessonIds.
  // Câu chữ ra đây vì nó đi qua một API route (app/api/career-profile) tới một
  // client component: route trả id, client tra từ điển. Trả câu chữ từ route thì
  // ngôn ngữ do server chọn chứ không do người đọc chọn.
  skillDomains: {
    personal_finance: { label: "Tài chính cá nhân", gapHint: "ngân sách, quỹ khẩn cấp, kế hoạch tài chính cá nhân" },
    accounting: { label: "Kế toán & Báo cáo tài chính", gapHint: "kế toán, đọc 3 báo cáo tài chính, chỉ số tài chính" },
    valuation: { label: "Định giá (Valuation)", gapHint: "DCF, comps, precedent transactions, terminal value" },
    corporate_finance: { label: "Tài chính doanh nghiệp", gapHint: "cấu trúc vốn, WACC, chính sách cổ tức, quyết định đầu tư" },
    modeling_excel: { label: "Excel & Mô hình tài chính", gapHint: "dựng mô hình 3 báo cáo, LBO, bảng độ nhạy, dashboard Excel" },
    ma: { label: "M&A", gapHint: "M&A, synergy, deal structure, due diligence, LBO" },
    fixed_income: { label: "Trái phiếu & Tín dụng", gapHint: "trái phiếu, YTM, duration, credit spread, xếp hạng tín nhiệm" },
    equity_portfolio: { label: "Cổ phiếu & Danh mục", gapHint: "phân tích cổ phiếu, xây danh mục, đo lường rủi ro - lợi nhuận" },
    derivatives_risk: { label: "Phái sinh & Quản trị rủi ro", gapHint: "phái sinh, phòng hộ, VaR, stress testing, Basel" },
    fpa_budgeting: { label: "FP&A & Ngân sách", gapHint: "lập ngân sách, rolling forecast, phân tích variance, KPI" },
    ethics: { label: "Đạo đức nghề nghiệp", gapHint: "Code of Ethics, Standards of Conduct, GIPS, AML/KYC, đạo đức dữ liệu" },
    economics: { label: "Kinh tế học", gapHint: "chu kỳ kinh tế, chính sách tiền tệ - tài khóa, tỷ giá" },
    quant: { label: "Phương pháp định lượng", gapHint: "giá trị thời gian của tiền, NPV/IRR, xác suất - thống kê, suy diễn từ dữ liệu" },
    ai_tools: { label: "AI trong tài chính", gapHint: "giao việc cho AI, đọc báo cáo và viết memo có kiểm chứng" },
  },

  // Ba mức đọc ra chữ của TopicMasteryWidget. Trước nằm trong hàm band() nên
  // không script nào thấy: chúng là literal trong THÂN HÀM, không phải trong
  // data ở module scope, cũng không ở vị trí hiển thị.
  masteryBands: {
    high: "Vững",
    mid: "Đang đi",
    low: "Mới bắt đầu",
  },

  topics: {
    "money-foundations": "Nền tảng tiền bạc & rủi ro",
    "tax-payroll": "Thuế & lương thực nhận",
    "personal-investing": "Đầu tư cá nhân",
    "bonds-rates": "Trái phiếu & lãi suất",
    "portfolio-retirement": "Danh mục & hưu trí",
    "housing-protection": "Nhà ở & bảo vệ tài sản",
    "investing-psychology": "Tâm lý đầu tư",
    "accounting-reporting": "Kế toán & báo cáo tài chính",
    "valuation-corp-finance": "Định giá & tài chính doanh nghiệp",
    "bonds-credit": "Trái phiếu & tín dụng",
    "risk-portfolio-derivatives": "Rủi ro, danh mục & phái sinh",
    "risk-frm": "Rủi ro & FRM",
    "banking-compliance": "Ngân hàng, tín dụng & tuân thủ",
    "quant-data": "Định lượng & phân tích dữ liệu",
    "career-application": "Ứng dụng nghề nghiệp",
    esg: "ESG & tài chính bền vững",
    "economics-markets": "Kinh tế học & thị trường",
    "vn-market": "Thị trường Việt Nam",
    "private-markets": "Private markets & đầu tư thay thế",
    "wealth-insurance": "Gia sản & bảo hiểm",
    "real-estate-project": "Bất động sản & tài chính dự án",
    fintech: "FinTech & sản phẩm tài chính",
    "personal-finance": "Tài chính cá nhân",
    "professional-finance": "Tài chính chuyên ngành",
    "bonus-cases": "Bài case & ứng dụng",
  },

  // Câu khuyên theo chủ đề, tra bằng TopicAdviceId. Sáu nhánh cho 25 chủ đề,
  // nên phần lớn chủ đề nhận câu "generic" - bảng này giờ là mắt yếu hơn bảng
  // chủ đề, và đó là điều bản cũ khớp bằng substring che được.
  topicAdvice: {
    accounting: "Ôn lại cách đọc báo cáo và làm lại 1-2 câu quiz ngay khi vừa đọc xong.",
    valuation: "Xem lại giả định chính và thử tự giải thích công thức bằng lời của bạn.",
    risk: "Ôn lại ví dụ thực tế trong bài rồi tự trả lời lại câu hỏi sai không nhìn đáp án.",
    bonds: "Tự viết lại mối quan hệ giữa lãi suất, giá trái phiếu và rủi ro tín dụng.",
    investing: "Đọc lại bài và so sánh ngay với một tình huống đầu tư cá nhân thực tế của bạn.",
    generic: "Học lại bài gốc rồi làm lại ngay câu quiz sai để khóa kiến thức.",
  },

  // components/RigorousLevelExamModal.tsx - the level-up exam.
  levelExam: {
    shareText: "Tôi vừa xuất sắc vượt qua bài thi thăng cấp khắt khe - cấp độ {level}: {name} với điểm số {percent}%! 🔥 #levelup",
    loadFailed: "Không tải được đề thi.",
    passedToast: "Chúc mừng! Bạn đã thi đỗ xuất sắc Cấp độ {level} ({percent}%)!",
    timedOutToast: "Đã quá thời gian làm bài nên kết quả không được tính. Bạn có thể thi lại.",
    failedToast: "Rất tiếc! Bạn đạt {percent}% (Yêu cầu thi đỗ: ≥ {required}%). Vui lòng ôn lại và thử lại!",

    titleRetake: "Thi ôn cấp định kỳ",
    title: "Bài thi thăng cấp khắt khe",
    passRequirement: "Yêu cầu đỗ: ≥ {percent}% chính xác",
    reloadExam: "Tải lại đề thi",
    loading: "Đang tải đề thi từ máy chủ...",

    resultPassed: "Xác nhận đạt bằng cấp thành công!",
    resultFailed: "Chưa đạt yêu cầu thi cấp!",
    // Split around the inline <span> holding the score.
    resultPart1: "Kết quả: ",
    resultScore: "{correct}/{total}",
    resultPart2: " câu đúng ({percent}%)",
    timedOutNote: "Bài thi được nộp sau khi hết thời gian nên không được tính là đỗ.",
    promotedTitle: "Bạn chính thức thăng thâm niên Cấp độ {level} ({name})!",
    promotedBody:
      "Trạng thái thi đỗ đã được ghi nhận trong hồ sơ và duy trì chứng nhận trong 14 ngày tới.",
    sharedToast: "Đã chia sẻ thành tích lên FinSocial! (+10 XP)",
    shareCta: "Chia sẻ chiến tích lên FinSocial (+10 XP)",
    reviewTitle: "Bạn cần ôn lại các khái niệm chưa nắm vững",
    reviewBody:
      "Đừng nản lòng! Đọc kỹ giải thích đáp án bên dưới để củng cố kiến thức trước khi làm bài thi lại.",

    answerAnalysis: "Phân tích đáp án chi tiết",
    questionLine: "Câu {index}: {question}",
    markCorrect: "Đúng ✓",
    markWrong: "Sai ✗",
    youChose: "• Bạn chọn: ",
    correctAnswer: "• Đáp án đúng: ",
    explanationLabel: "Giải thích:",

    answered: "Đã trả lời {done}/{total} câu",
    grading: "Đang chấm bài...",
    submit: "Nộp bài thi cấp",
    retakeNow: "Thi lại ngay",
    finish: "Hoàn Tất",
    passRequirementCount: " ({correct}/{total} câu)",
    resultRequired: " — Yêu cầu đỗ: ≥ {percent}%",
    notChosen: "Chưa chọn",
    submitError: "Không nộp được bài thi.",
    shareError: "Không thể chia sẻ bài đăng lúc này.",
  },

  // components/home/InteractiveKingdomPreview.tsx - logged-out Game Kingdom demo.
  kingdomPreview: {
    tabMap: "Bản đồ vương quốc",
    tabMinigame: "Chơi thử Mini Game",
    tabBoss: "Săn Boss NYSE",
    bgAlt: "Ảnh nền sàn giao dịch phố Wall",
    eyebrow: "VƯƠNG QUỐC GAME TÀI CHÍNH INTERACTIVE",
    headingMap: "Bản đồ nhiệm vụ & Công trình",
    headingMinigame: "Thử phản xạ active recall trực tiếp",
    headingBoss: "Đấu trường săn Boss Phố Wall",
    xpLabel: "XP Tích lũy",
    xpValue: "+{xp} XP",

    unlockAtLevel: "Mở khóa ở Lv.{level}",
    xpRewardValue: "+{xp} XP",
    buildingDetail: "Chi tiết công trình",
    skillsUnlocked: "Kỹ năng mở khóa:",
    unlockBuilding: "Mở khóa công trình này",

    samplerQuestion: "Câu hỏi thử nghiệm #{index}",
    samplerXp: "+50 XP nếu chọn đúng",
    samplerCorrect: "Chính xác! Bạn nhận được +50 XP thưởng!",
    samplerWrong: "Chưa chính xác rồi!",
    tryAnother: "Thử câu hỏi khác",
    doAllQuizzes: "Vào làm trọn bộ 430+ Quiz →",

    bossAlt: "Boss bò Phố Wall NYSE",
    bossRaidLabel: "WORLD BOSS RAID · 1,000,000 HP",
    bossName: "Bò tót Phố Wall tăng trưởng",
    bossBody:
      "Toàn bộ người học trên hệ thống cùng tham gia đánh Boss mỗi ngày bằng cách trả lời đúng các câu hỏi tài chính.",
    bossHpLabel: "Máu Boss hiện tại",
    bossHpValue: "742,500 / 1,000,000 HP",
    damageToday: "Sát thương hôm nay",
    damageValue: "1,250 DMG",
    bossReward: "Phần thưởng hạ Boss",
    bossRewardValue: "+500 XP & Vàng",
    joinBoss: "Tham gia Săn Boss NYSE Ngay",
    ongoing: "Đang diễn ra: Mở khóa vương quốc tài chính bằng bài học thật",
    playFull: "Vào chơi thử Game Kingdom đầy đủ",

    // KINGDOM_BUILDINGS: ids, images, levels and rewards stay in the component.
    // Building NAMES are proper nouns and stay too; only the copy is here.
    goldmanSubtitle: "Đấu trường Định giá & Mô hình DCF",
    goldmanDescription:
      "Thực hành phân tích định giá doanh nghiệp, P/E, P/B và mô hình chiết khấu dòng tiền DCF.",
    goldmanTag1: "Định giá P/E",
    goldmanTag2: "Mô hình DCF",
    goldmanTag3: "Đọc BCTC",
    fedSubtitle: "Thử thách Lãi suất & Ngân hàng Trung ương",
    fedDescription:
      "Dự đoán động thái lãi suất Fed, lạm phát và ảnh hưởng đến thị trường chứng khoán.",
    fedTag1: "Tỷ lệ Lãi suất",
    fedTag2: "Lạm phát",
    fedTag3: "Chính sách tiền tệ",
    singaporeSubtitle: "Cảng Dòng tiền & Thương mại Quốc tế",
    singaporeDescription:
      "Quản lý dòng tiền lưu chuyển, xuất nhập khẩu và chu kỳ tiền mặt doanh nghiệp.",
    singaporeTag1: "Dòng tiền Cashflow",
    singaporeTag2: "Vốn lưu động",
    singaporeTag3: "Tỷ giá",
    pvpName: "Đấu trường kiến thức solo",
    pvpSubtitle: "Đánh Boss bằng câu hỏi Active Recall",
    pvpDescription:
      "Thử thách phản xạ kiến thức tài chính qua các hiệp quiz 1v1 dồn dập tích lũy điểm XP.",
    pvpTag1: "Active Recall",
    pvpTag2: "Thách đấu 1v1",
    pvpTag3: "Kho quiz 430+ bài",

    // SAMPLER_QUESTIONS
    q1: "Tài sản nào sau đây được xếp vào 'Tài sản Ngắn hạn'?",
    q1a: "Tiền mặt & Tiền gửi ngân hàng",
    q1b: "Nhà xưởng máy móc thiết bị",
    q1c: "Thương hiệu & Bằng sáng chế",
    q1explanation:
      "Chính xác! Tiền mặt & các khoản tương đương tiền có tính thanh khoản cao nhất, thuộc tài sản ngắn hạn.",
    q2: "Chỉ số P/E (Price to Earnings) phản ánh điều gì?",
    q2a: "Số năm nhà đầu tư hòa vốn nếu lợi nhuận giữ nguyên",
    q2b: "Tổng nợ vay trên tổng vốn chủ sở hữu",
    q2c: "Tỷ lệ trả cổ tức bằng tiền mặt",
    q2explanation:
      "Đúng rồi! P/E = Giá cổ phiếu / EPS, thể hiện mức giá nhà đầu tư chấp nhận trả cho 1 đồng lợi nhuận.",
  },

  // components/WeeklyChallengeWidget.tsx - the Times Square case-study arena.
  caseArena: {
    rankS: "Hạng S - huyền thoại phân tích Wall Street 🏆",
    rankA: "Hạng A - chuyên gia phân tích doanh nghiệp 🥇",
    rankB: "Hạng B - học viên Phố Wall 🥈",
    rankC: "Hạng C - cần ôn tập",
    correctToast: "Chính xác! +{score} điểm (Combo x{multiplier}) 🔥",
    wrongToast: "Chưa chính xác! Thất thoát Combo.",

    hubTitle: "Trung tâm tài chính Times Square",
    badge: "Case Study thực tế",
    title: "Đấu trường Case Study doanh nghiệp",
    totalScore: "Tổng điểm game",
    combo: "Combo",
    leaderboardTitle: "BXH Case Study",

    xpReward: "Thưởng XP",
    coins: "Coins",
    questions: "Câu hỏi",
    questionCount: "{count} câu",
    status: "Trạng thái",
    ready: "Sẵn sàng",
    remaining: "{count} còn lại",
    difficulty: "Độ khó: {level}",
    maxReward: "Thưởng tối đa: +{xp} XP",
    coinReward: "+{coins} Coins",
    analysisQuestions: "{count} Câu hỏi phân tích",
    start: "Bắt đầu trận đấu Case Study",

    questionCounter: "Câu hỏi phân tích {current}/{total}",
    currentScore: "Điểm hiện tại",
    currentCombo: "Combo hiện tại",
    currentCorrect: "Đúng hiện tại",
    analysisAngle: "Góc nhìn phân tích",
    questionsAfterThis: "{count} câu sau câu này",
    expertExplanation: "Giải thích chuyên môn:",
    nextQuestion: "Câu tiếp theo",
    seeSummary: "Xem tổng kết điểm game",

    doneTitle: "Hoàn thành Case Study!",
    correctCount: "Số câu đúng",
    correctOf: "{correct}/{total} câu",
    totalGameScore: "Tổng điểm game",
    maxCombo: "Max Combo",
    maxComboValue: "x{combo}",
    reward: "Phần thưởng",
    rewardXp: "+{xp} XP",
    lessonHintTitle: "Gợi ý bài học ôn tập tương ứng:",
    lessonHintBody:
      "Để thành thạo hơn khi phân tích các doanh nghiệp thực tế, bạn nên đọc lại các bài học sau:",
    replayCase: "Chơi lại case này",
    pickAnotherCase: "Chọn Case Study khác",
  },

  // components/CareerProfilePanel.tsx
  careerProfile: {
    claimed: "Đã nhận +{xp} XP · +{coins} xu",
    claimFailed: "Không nhận được thưởng",
    bulletSaveFailed: "Không lưu được bullet",
    bulletDeleteFailed: "Không xoá được bullet",
    requirementMet: "Đã đạt yêu cầu về {hint}.",
    requirementGap: "Còn thiếu {hint} · học thêm ~{count} bài.",
    bulletSaved: "Đã lưu CV bullet",

    signInPrompt: "Đăng nhập để xem hồ sơ năng lực nghề nghiệp của bạn.",
    signIn: "Đăng nhập",
    computing: "Đang tính hồ sơ năng lực...",
    loadFailed: "Không tải được hồ sơ năng lực.",
    retry: "Thử lại",

    title: "Hồ sơ năng lực",
    lessonsCompleted: "{count} bài đã hoàn thành",
    mockInterview: "Làm mock interview (10 câu, có tính giờ)",

    gapTitle: "Job skill gap",
    groupCertifications: "Chứng chỉ",
    groupCareers: "Nghề nghiệp",
    pickGoal: "Chọn một mục tiêu ở trên để xem bạn còn thiếu gì.",
    readinessBody:
      "mức sẵn sàng cho mục tiêu này. Các nhóm còn thiếu được xếp trên cùng - đó là việc đáng làm tiếp theo.",
    required: "bắt buộc",

    missionsTitle: "Nhiệm vụ nghề nghiệp tuần này",
    missionReward: "+{xp} XP · +{coins} xu",
    alreadyClaimed: "Đã nhận",
    claim: "Nhận thưởng",
    claiming: "Đang nhận...",
    perfectWeek: "Tuần hoàn hảo · +{xp} XP · +{coins} xu",
    perfectWeekBody: "Hoàn thành cả {count} nhiệm vụ trong tuần.",

    bulletsTitle: "CV bullets",
    // Split around the inline <strong> holding the formula.
    bulletsHintPart1: "Mỗi bullet theo công thức ",
    bulletsFormula: "Hành động - Con số - Kết quả",
    bulletsHintPart2:
      ". Ví dụ: \"Dựng mô hình DCF 3 báo cáo cho 5 công ty niêm yết, rút ngắn thời gian định giá từ 3 ngày xuống 1 ngày.\"",
    bulletPlaceholder: "Viết một bullet cho CV của bạn...",
    bulletCounter: "{count}/{max} · tối thiểu {min}",
    savingBullet: "Đang lưu...",
    addBullet: "Thêm bullet",
    bulletsEmpty: "Chưa có bullet nào. Viết 3 bullet trong tuần để hoàn thành nhiệm vụ.",
    deleteBulletAria: "Xoá bullet",
  },

  // Message-action vocabulary shared by all three chat surfaces:
  // components/StudyGroupsClient.tsx, components/FloatingStudyGroupChat.tsx and
  // components/ChatWithAdminWidget.tsx. Kept in one place rather than three
  // copies - "Ghim tin nhắn" appearing in three sections is three chances for
  // them to drift apart.
  chat: {
    copied: "Đã sao chép tin nhắn",
    copyFailed: "Không sao chép được tin nhắn",
    edited: "Đã chỉnh sửa tin nhắn",
    recalled: "Đã thu hồi tin nhắn thành công!",
    recallFailed: "Không thể thu hồi tin nhắn này",
    reactionFailed: "Không lưu được cảm xúc. Vui lòng thử lại.",

    optionsTitle: "Tùy chọn tin nhắn",
    reply: "Trả lời tin nhắn",
    pin: "Ghim tin nhắn",
    unpin: "Bỏ ghim tin nhắn",
    copy: "Sao chép",
    edit: "Sửa tin nhắn",
    recall: "Thu hồi tin nhắn",

    sending: "Đang gửi...",
    seen: "Đã xem",
    sent: "Đã gửi",
    replyingTo: "Đang trả lời {name}:",
    cancelReply: "Hủy trả lời",
    editing: "Đang sửa tin nhắn:",
    cancelEdit: "Hủy sửa",
    sendAria: "Gửi tin nhắn",
    attachImage: "Đính kèm ảnh",
    attachFile: "Đính kèm tệp",
    attachmentAlt: "Đính kèm",
    previewAlt: "Preview",
    dropImage: "Thả ảnh vào đây để đính kèm 📂",
    imagePlaceholder: "[Hình ảnh]",
    filePlaceholder: "[Tệp: {name}]",
    deleted: "Tin nhắn đã bị xoá",
    you: "Bạn",
    member: "Thành viên",
    admin: "Tài Tài",

    // Bốn màn hình chat trong repo này - ChatWithAdminWidget,
    // FloatingStudyGroupChat, CommunityFeedClient và StudyGroupsClient - viết
    // lại cùng một nhúm câu. Để ở đây một lần thay vì bốn lần trong bốn section.
    pinned: "Đã ghim tin nhắn",
    unpinned: "Đã bỏ ghim tin nhắn",
    pinFailed: "Không cập nhật được ghim",
    editFailed: "Không sửa được tin nhắn",
    sendFailed: "Không gửi được tin nhắn",
    sendFailedRetry: "Không gửi được tin nhắn. Vui lòng thử lại.",
    taitaiFailed: "Không gọi được tài tài",
    reactionTitle: "Thả {emoji}",
    editPlaceholder: "Chỉnh lại nội dung tin nhắn...",
    // alt của ảnh đại diện khi người dùng chưa có tên. Trước là "User" viết
    // cứng ở ba file - tiếng Anh, nên i18n-scan không bao giờ thấy.
    userAlt: "Thành viên",
  },

  // components/ChatWithAdminWidget.tsx
  adminChat: {
    openAria: "Admin Chatbot",
    dragTitle: "Admin Chatbot (Kéo thả để di chuyển)",
    resizeHandle: "Kéo để đổi bề rộng",
    collapseChat: "Thu nhỏ chat",
    expandChat: "Phóng to chat",
    inputPlaceholder: "Nhập tin nhắn, dán ảnh...",
    title: "Tài tài chatbot",
    status: "Đang hoạt động • Phản hồi siêu tốc",
    closeAria: "Đóng chat",
    pinnedBy: "Tin nhắn đã ghim ({who})",
    unpinTitle: "Bỏ ghim",
    loading: "Đang tải cuộc trò chuyện...",
    emptyPart1: "Gửi tin nhắn để bắt đầu trò chuyện với admin.",
    emptyPart2: "Admin thường phản hồi trong vòng 24 giờ.",
    adminName: "Admin",
    recalledToast: "Đã thu hồi tin nhắn thành công!",
  },

  // components/FloatingStudyGroupChat.tsx
  groupChat: {
    you: "bạn",
    openAria: "Chat nhóm học",
    resizeHandle: "Kéo để đổi bề rộng",
    inputPlaceholder: "Nhắn gì đó cho nhóm... hoặc /taitai",
    roomTitle: "Nhóm {topic}",
    dragTitle: "Nhóm {topic} (Kéo thả để di chuyển)",
    joinTitle: "Tham gia Nhóm Học",
    matchedToast: "Bạn vừa được ghép vào nhóm học mới: {topic}! Chào mọi người trong nhóm nhé.",
    roomFallback: "Học tập",
    memberCount: "{count}/{max} thành viên hoạt động",
    closeAria: "Đóng",
    pinnedByAdmin: "Tài Tài • Quản lý nhóm • Đã ghim",
    byAdmin: "Tài Tài • Quản lý nhóm",

    // Tin nhắn bot: lưu dưới dạng SỰ KIỆN trong study_room_messages.content
    // (xem lib/study-room-bot-messages.ts) rồi dựng câu ở đây, nên mỗi người
    // đọc thấy tiếng của mình kể cả với dòng ghi trước khi họ đổi ngôn ngữ.
    botDailyNone: "Cập nhật hôm nay: chưa ai trong nhóm học bài nào cả 👀 Ai học đầu tiên hôm nay nào?",
    botDailyAll: "Cập nhật hôm nay: cả {count} thành viên đều đã học ít nhất 1 bài! Nhóm đang giữ nhịp rất tốt 🔥",
    botDailyPartial: "Cập nhật hôm nay: {names} đã học rồi. Còn {notYet} bạn chưa học hôm nay - đừng để mai dồn nhé!",
    botDailyExtra: " +{extra} bạn nữa",
    botRules: "Tài tài đây 👋 nhóm này đang học theo hướng {topic}, hiện có khoảng {count} bài để cả nhóm cùng cày. Luật ngắn gọn: mỗi người cố giữ nhịp tối thiểu 3 bài/tuần, đạt chỉ tiêu thì nhóm được giữ tiếp, và giữ được 3 tuần liên tiếp thì lên nhóm vĩnh viễn.",
    botTopicPersonal: "Tài chính cá nhân",
    botTopicProfessional: "Tài chính chuyên ngành",
    botTopicCfa: "CFA Level I",
    dropImage: "Thả ảnh vào đây để gửi 📂",
    emptyPart1: "Chưa có tin nhắn nào.",
    emptyPart2: "Nhắn gì đó chào các bạn trong nhóm nhé!",
    uploading: "{name} · Đang tải lên...",
  },

  // components/StudyGroupsClient.tsx - the 3D study room (/nhom-hoc).
  studyGroups: {
    loading: "Đang tải...",
    back: "Quay lại",
    title: "Học cùng nhóm",
    subtitle:
      "Ghép ngẫu nhiên với người lạ hoặc tự chọn phòng để cùng học chung một chủ đề, đua mục tiêu XP mỗi tuần.",

    roomHeader: "Phòng {topic} · {count}/{max} thành viên",
    xpProgress: "{current}/{goal} XP",
    weeklyGoalTitle: "Mục tiêu tuần",
    weeklyGoalXp: "{current} / {goal} XP",

    // Pomodoro
    pomodoroFocus: "25m",
    pomodoroBreak: "5m",
    pomodoroPause: "Tạm dừng",
    pomodoroStart: "Bắt đầu",
    breakStarted:
      "Hết 25 phút học tập! Cả nhóm nghỉ giải lao 5 phút (+15 XP Tập trung nhóm)! 🎉",
    focusStarted: "Hết giờ nghỉ! Bắt đầu phiên 25 phút tập trung tiếp theo!",

    // Lofi + voice
    lofiOn: "Đã bật nhạc Focus [{track}] Chill!",
    stationLit: "Trạm [{name}] đã được thắp sáng trong phiên này.",
    stationActivated: "Đã kích hoạt trạm 3D [{name}]! +15% XP cho cả phòng.",
    quizScoreGood: "Quiz nhóm đạt {score}%. Đã cộng tiến độ nhiệm vụ tuần!",
    quizScoreKeepGoing: "Quiz nhóm đạt {score}%. Cứ làm tiếp, tiến độ quiz tuần vẫn được ghi nhận.",
    lofiToggleTitle: "Bật/Tắt nhạc Lofi Chill tập trung",
    lofiPlaying: "Nhạc Lofi: Đang phát",
    lofiIdle: "Nhạc lofi chill",
    lofiOff: "Đã tắt nhạc Focus Lofi",
    lofiFailed: "Không thể khởi chạy nhạc Lofi",
    micToggleTitle: "Bật/Tắt Micro",
    micOn: "Mic: Mở",
    micOff: "Mic: Tắt",
    leaveVoiceTitle: "Rời voice",
    leaveVoice: "Rời voice ({count})",
    autoplayBlockedTitle: "Trình duyệt đang chặn tự phát âm thanh",
    autoplayBlocked: "Bấm để nghe",
    voiceJoining: "Đang vào...",
    voiceDisabled: "Voice chưa bật",
    voiceJoin: "Vào voice",
    inVoiceTitle: "Đang ở trong voice",

    tab3d: "Bàn 3D",
    tabChat: "Chat",
    leaveRoom: "Rời phòng",

    questsTitle: "Nhiệm vụ tuần của phòng học",
    permanentGroup: "Nhóm vĩnh viễn",
    streakWeeks: "{weeks}/3 tuần streak",
    questsHint:
      "Hoàn thành 3 nhiệm vụ để mở rương nhóm. Nhắn chat, dán note, làm quiz hoặc bật Pomodoro đều được tính là hoạt động nhóm.",
    checkInNow: "Bấm điểm danh ngay",
    checkedIn: "Đã điểm danh hôm nay. Tiến độ nhiệm vụ nhóm đã cập nhật!",
    questsEmpty:
      "Chưa có dữ liệu nhiệm vụ tuần. Sau khi chạy migration mới, tiến độ sẽ tự lấy từ Supabase.",

    chestOpened: "Rương đã mở",
    chestOpening: "Đang mở...",
    chestClaim: "Nhận Rương",

    // 3D room
    modeWalk: "PHÒNG ĐI LẠI",
    modeDesk: "BÀN HỌC 3D",
    viewDesk: "Xem bàn học",
    viewWalk: "Vào phòng đi lại",
    resetViewTitle: "Đặt lại góc 3D và độ Zoom",
    resetView: "Góc & Zoom ({zoom}%)",
    cheerLabel: "Cổ vũ:",
    cheerSent: "Đã gửi lời cổ vũ đến cả nhóm! 🎉",
    cheerFailed: "Không thể gửi lời cổ vũ",
    boostAria: "Nạp năng lượng 3D Spatial Boost cho cả phòng",
    boostDone: "Đã nạp năng lượng 3D Spatial Boost cho cả phòng!",
    justJoined: "Vừa vào phòng",
    levelShort: "Lv.{level}",
    memberRole: "Thành viên",
    you: " (Bạn)",
    topLessonTitle: "Top 1 bài học tuần này",
    emptySeat: "Ghế trống",
    hint3dDesktop:
      "Kéo chuột để xoay phòng 360° · 🔍 Lăn chuột để Zoom · ⌨️ Phím mũi tên / +− / 0 · Bấm 🔄 để về góc gốc",
    hint3dMobile:
      "Vuốt ngang để xoay (vẩy mạnh để quay tiếp) · vuốt dọc để cuộn trang",

    // Chat
    chatTab: "Trò chuyện",
    notesTab: "Ghi chú ({count})",
    quizTab: "Quiz Nhóm",
    live: "Live",
    chatCheckinHint:
      "Nhắn 1 tin nhắn bất kỳ lên chat để tự động ghi nhận điểm danh nhóm hôm nay!",
    pinnedByAdmin: "Tài Tài · Quản lý nhóm · Đã ghim",
    byAdmin: "Tài Tài · Quản lý nhóm",
    loadOlder: "↑ Xem tin nhắn cũ hơn",
    loadOlderFailed: "Không tải được tin nhắn cũ",
    chatEmpty: "Chưa có tin nhắn nào. Chào các thành viên trong nhóm nhé!",
    sendFailed: "Gửi không thành công",
    retry: "Thử lại",
    discard: "Bỏ",
    newMessages: "↓ Tin nhắn mới",

    // Sticky notes
    notePlaceholder: "Dán ghi chú công thức hoặc mẹo học cho cả nhóm...",
    noteAdd: "+ dán ghi chú",
    noteAdded: "Đã dán ghi chú mới lên bảng nhóm!",
    noteDeleted: "Đã xóa ghi chú",
    notesEmpty:
      "Chưa có ghi chú nào. Dán công thức, checklist hoặc câu hỏi để cả phòng cùng thấy.",
    noteAuthorYou: "Bạn",
    noteDelete: "Xóa",

    // Group quiz
    quizChallengeTitle: "THỬ THÁCH 3 PHÚT NHÓM HÔM NAY",
    quizReward: "Thưởng Rương +150 XP",
    quizHint:
      "Mỗi lần làm quiz sẽ ghi điểm từng thành viên và cộng tiến độ nhiệm vụ quiz tuần.",
    quizLoading: "Đang lấy câu hỏi cho phòng...",
    quizEmpty: "Chưa có câu hỏi phù hợp cho chủ đề này.",
    quizQuestion: "Câu {index}: {question}",
    quizSubmit: "Nộp bài thi nhóm",
    quizResult: "Kết quả Quiz Nhóm: {score}%",
    quizResultGood: "Điểm rất ổn. Lượt này đã được lưu vào bảng quiz nhóm.",
    quizResultRetry:
      "Lượt này vẫn được tính vào nhiệm vụ quiz tuần, làm lại để cải thiện accuracy nhé.",
    quizRetry: "Thử Lại",
    quizWeeklyScores: "Điểm quiz tuần này",

    roomGoalTitle: "MỤC TIÊU CẢ PHÒNG TUẦN NÀY",
    roomGoalRemaining: " — còn {count} bài",
    roomGoalDone: " — đã xong",
    roomTopic: "Chủ đề phòng: {topic}",
    studyNow: "Vào học ngay",

    // Lobby
    matchRandom: "Ghép ngẫu nhiên",
    matchRandomHint:
      "Chọn chủ đề, hệ thống sẽ ghép bạn vào một phòng còn trống hoặc tạo phòng mới nếu chưa có.",
    matched: "Đã ghép bạn vào một phòng học ngẫu nhiên!",
    orPickRoom: "Hoặc tự chọn phòng",
    roomsLoading: "Đang tải danh sách phòng...",
    roomsEmpty:
      "Chưa có phòng nào còn trống cho chủ đề này - bấm \"Ghép ngẫu nhiên\" ở trên để tạo phòng đầu tiên.",
    roomCard: "Phòng #{id} · {count}/{max} thành viên",
    roomCardXp: "{current}/{goal} XP tuần này",
    join: "Tham gia",
    joined: "Đã tham gia phòng học!",
    left: "Đã rời phòng học",

    // Ai vừa vào phòng. Một toast gộp, không phải một toast mỗi người: lần
    // ghép lại thứ Hai có thể xếp bốn người lạ vào cùng lúc.
    arrivedOne: "{name} vừa vào phòng học!",
    arrivedMany: "{count} thành viên vừa vào phòng: {names}",

    // Nhãn vai trong danh sách thành viên. Nhánh thứ tư đã đọc từ điển
    // (memberRole) từ trước, ba nhánh này thì chưa.
    roleLeader: "Trưởng nhóm",
    roleMentor: "Mentor",
    roleActive: "Tích cực",

    // Chữ chỉ hiện ra khi trỏ chuột hoặc khi đọc bằng trình đọc màn hình.
    // Không thấy trên ảnh chụp, nên là chỗ chữ cứng sống lâu nhất.
    voiceUnavailableTitle: "Voice chưa được cấu hình trên máy chủ",
    voiceJoinTitle: "Vào kênh thoại của phòng (mic tắt sẵn)",
    stageAriaWalk:
      "Phòng học 3D đi lại được. Dùng W và S để đi, A và D để xoay người, hoặc bốn nút mũi tên ở góc dưới bên phải.",
    stageAriaDesk:
      "Phòng học 3D. Dùng phím mũi tên để xoay phòng, phím cộng và trừ để phóng to thu nhỏ, phím số 0 để đặt lại góc nhìn.",
    viewDeskTitle: "Chuyển về bàn học nhìn từ ngoài",
    viewWalkTitle: "Vào phòng và đi lại được",
    resetViewAria: "Đặt lại góc nhìn 3D và độ phóng, hiện tại {zoom} phần trăm",
    cheerAria: "Gửi lời cổ vũ: {label}",
    pylonAriaLit: "Trạm {name} đã kích hoạt",
    pylonAriaUnlit: "Kích hoạt trạm {name} để cộng 15% XP cho phòng",
    reactionTitle: "Thả {emoji}",

    editPlaceholder: "Chỉnh lại nội dung tin nhắn...",
    replyPlaceholder: "Viết câu trả lời cho {name}...",
    chatPlaceholder: "Nhắn gì đó cho nhóm... hoặc /taitai",

    pinned: "Đã ghim tin nhắn",
    unpinned: "Đã bỏ ghim tin nhắn",
    pomodoroSyncOn: "Đã bắt đầu Pomodoro sync cho cả phòng",
    pomodoroSyncOff: "Đã tạm dừng Pomodoro nhóm",

    // Câu dự phòng của toast lỗi: chỉ hiện khi thứ bắt được KHÔNG phải một
    // Error, nên chúng gần như không bao giờ hiện - và cũng vì thế mà không ai
    // thấy chúng còn là tiếng Việt.
    roomsLoadFailed: "Không tải được danh sách phòng học",
    pinFailed: "Không cập nhật được ghim",
    reactionFailed: "Không thả reaction được",
    checkinFailed: "Không điểm danh được lúc này",
    pomodoroSyncFailed: "Không cập nhật được Pomodoro nhóm",
    chestFailed: "Không mở được rương nhóm",
    noteSaveFailed: "Không lưu được ghi chú",
    noteDeleteFailed: "Không xóa được ghi chú",
    quizScoreSaveFailed: "Không lưu được điểm quiz nhóm",
    messageEditFailed: "Không sửa được tin nhắn",
    taitaiFailed: "Không gọi được tài tài",
    matchFailed: "Không thể ghép nhóm lúc này",
    joinFailed: "Không thể tham gia phòng này",
    leaveFailed: "Không thể rời phòng lúc này",
  },

  // components/JobSearchClient.tsx - the finance job map (/pho-nghe).
  // Renders twice, desktop and mobile, so several labels appear in two places
  // with different styling; they share one key.
  jobs: {
    quizDone: "Đã hoàn thành khảo sát",
    // Bốn nhóm nghề của bài khảo sát. `topType` là ID nội bộ, câu chữ ở đây.
    quizTypeLabel: {
      Analytical: "Phân tích & Đầu tư (Analytical)",
      Compliance: "Kế toán & Kiểm toán (Compliance)",
      "Client-facing": "Quan hệ Khách hàng & Giao dịch (Client-facing)",
      Quantitative: "Nguồn vốn & Định lượng (Quantitative)",
    },
    quizTypeRoles: {
      Analytical: "Phân tích Tài chính, Investment Banking, FP&A, Đầu tư (CFA Track).",
      Compliance: "Kế toán viên, Kiểm toán viên, Kế toán trưởng / CFO Track.",
      "Client-facing": "Chuyên viên Tín dụng, Chuyên viên Môi giới Chứng khoán.",
      Quantitative: "Quản lý Quỹ, Quản lý Rủi ro, Chuyên viên Nguồn vốn.",
    },
    quizResultLine: "{type} - Gợi ý: {roles}",
    careerAlt: "Nghề nghiệp",
    examWeightTitle: "Tỷ trọng đề thi: {weight}",
    cfaRelated: "Liên quan CFA:",

    // Career-path step copy. Four seniority bands, in a full and a compact
    // form because the desktop and mobile panels have different room.
    goalSet: "Đã đặt làm Mục tiêu",
    goalSetAction: "Đặt làm Mục tiêu sự nghiệp",
    goalSetShort: "Đã đặt mục tiêu",
    goalSetActionShort: "Đặt Mục tiêu sự nghiệp",

    tabDuties: "Nhiệm vụ & Một ngày",
    tabAdvice: "Lời khuyên & Ưu/Nhược",
    tabPath: "Lộ trình & Chứng chỉ",
    tabSkills: "Kỹ năng & Công cụ",
    tabProfile: "Hồ sơ năng lực",
    tabFindJobs: "Tìm việc ngay",
    tabDutiesShort: "Nhiệm vụ",
    tabAdviceShort: "Lời khuyên",
    tabPathShort: "Lộ trình",
    tabSkillsShort: "Kỹ năng",
    tabProfileShort: "Hồ sơ",
    tabFindJobsShort: "Tìm việc",

    ladderStart: "Khởi đầu",
    ladderMiddle: "Nấc thang phát triển",
    ladderEnd: "Mục tiêu dài hạn",

    years0: "0 - 2 năm",
    years1: "2 - 5 năm",
    years2: "5 - 8 năm",
    years3: "8+ năm",
    years0Short: "0-2 năm",
    years1Short: "2-5 năm",
    years2Short: "5-8 năm",
    years3Short: "8+ năm",

    focus0: "Học hỏi quy trình, xử lý số liệu thô, thực thi các nghiệp vụ cơ bản dưới sự kèm cặp sát sao.",
    focus1: "Làm chủ nghiệp vụ, quản lý dự án độc lập, bắt đầu tư vấn trực tiếp và hướng dẫn thực tập sinh.",
    focus2: "Lập kế hoạch, quản lý nhóm hoặc phòng ban, chịu trách nhiệm chính về hiệu quả hoạt động tài chính.",
    focus3: "Quyết định tối cao, làm việc trực tiếp với HĐQT/Cổ đông ngoại, định đoạt cấu trúc dòng vốn toàn tập đoàn.",
    focus0Short: "Học hỏi quy trình, xử lý số liệu thô, thực thi các nghiệp vụ cơ bản.",
    focus1Short: "Làm chủ nghiệp vụ, quản lý độc lập, hướng dẫn thực tập sinh.",
    focus2Short: "Lập kế hoạch, quản lý nhóm/phòng ban, chịu trách nhiệm tài chính chính.",
    focus3Short: "Quyết định tối cao, làm việc với HĐQT/Cổ đông, định đoạt cấu trúc vốn.",

    tip0: "Cẩn thận tuyệt đối trong tính toán, không ngại việc nhỏ, nâng cao tối đa Excel và hoàn thành CFA/ACCA Level 1.",
    tip1: "Chủ động đề xuất giải pháp thay vì chỉ báo cáo vấn đề, rèn luyện kỹ năng thuyết trình & đàm phán với khách hàng.",
    tip2: "Học cách ủy quyền hiệu quả, rèn luyện kỹ năng quản trị cảm xúc và thấu hiểu chính trị nội bộ doanh nghiệp.",
    tip3: "Tầm nhìn vĩ mô toàn cầu, giữ vững uy tín tối thượng và duy trì mối quan hệ cấp cao với các tổ chức tài chính lớn.",
    tip0Short: "Cẩn thận tuyệt đối, không ngại việc nhỏ, nâng cao Excel, học CFA/ACCA Level 1.",
    tip1Short: "Chủ động đề xuất giải pháp thay vì báo cáo vấn đề, rèn kỹ năng slide & đàm phán.",
    tip2Short: "Học cách ủy quyền, rèn quản trị cảm xúc & chính trị nội bộ doanh nghiệp.",
    tip3Short: "Tầm nhìn vĩ mô toàn cầu, giữ vững chữ tín tối thượng, quan hệ cấp cao.",

    studyTheseLessons: "Học các bài này để chuẩn bị cho nghề này",
    loading: "Đang tải...",
    signInForProgress: "Đăng nhập để xem tiến độ học các bài liên quan.",
    fullTrackLink: "Xem lộ trình học đầy đủ theo nghề",

    radarTitle: "Biểu đồ phẩm chất",
    radarOverlayTitle: "So sánh Phẩm chất năng lực (Overlay Radar)",
    // Axis labels on the radar chart. The short form exists because the
    // single-position chart has less room than the overlay.
    axisAnalysis: "PHÂN TÍCH",
    axisQuantShort: "Đ.LƯỢNG",
    axisQuant: "ĐỊNH LƯỢNG",
    axisCommunication: "GIAO TIẾP",
    axisCompliance: "TUÂN THỦ",

    compareTitle: "So sánh vị trí công việc",
    compareShort: "So sánh vị trí",
    compareShortest: "So sánh",
    current: "Hiện tại",
    pickToCompare: "Chọn vị trí để so sánh",
    pickPlaceholder: "-- Chọn một vị trí --",
    pickSecond: "Chọn vị trí thứ hai để đối chiếu",

    difficulty: "Độ khó",
    pressure: "Áp lực",
    balance: "Cân bằng",
    difficultyFull: "Độ khó đầu vào",
    pressureFull: "Mức độ áp lực",
    balanceFull: "Cân bằng (WLB)",
    expectedSalary: "Mức lương dự kiến",
    mainCertificates: "Chứng chỉ chính",
    mainTools: "Công cụ chính",

    goalCleared: "Đã hủy theo dõi mục tiêu sự nghiệp.",
    goalClearedLocalOnly: "Đã hủy trên máy này, nhưng chưa lưu được lên server - thử lại sau.",
    goalSaveFailed: "Chưa lưu được mục tiêu lên server - hiện chỉ áp dụng trên máy này.",

    backToDashboard: "Quay lại Dashboard",
    pageTitle: "Bản đồ việc làm tài chính",
    walk3d: "Đi dạo Phố nghề 3D",
    pageSubtitle:
      "Khám phá chi tiết công việc (JD), lộ trình thăng tiến sự nghiệp, yêu cầu kỹ năng và kết nối tuyển dụng trực tuyến.",

    goalChosen: "Mục tiêu sự nghiệp bạn đã chọn",
    goalOutsider: "Học viên ngoài ngành",
    goalDetailLink: "Xem lộ trình chi tiết →",
    goalClear: "Bỏ chọn mục tiêu",
    noGoalTitle: "Bạn chưa chọn Mục tiêu Sự nghiệp!",
    // Split around the inline <strong> quoting the outsider option.
    noGoalPart1: "Hãy bấm chọn 1 vị trí bên dưới (hoặc chọn ",
    noGoalOptionName: "\"Học viên / Người ngoài ngành 🌱\"",
    noGoalPart2:
      " nếu bạn học để quản lý tài chính cá nhân) để hệ thống theo dõi tiến độ dành riêng cho bạn.",

    searchPlaceholder: "Tìm kiếm vị trí tài chính...",
    scrollLeft: "Cuộn sang trái",
    scrollRight: "Cuộn sang phải",
    noResults: "Không tìm thấy vị trí phù hợp",
    noResultsHint: "Hãy thử tìm kiếm với từ khóa khác.",

    quizTitle: "Trắc nghiệm Hướng nghiệp",
    // Split around the inline <strong>+50 XP</strong>.
    quizBlurbPart1:
      "Trả lời 5 câu hỏi để định hướng xem bạn phù hợp nhất với vị trí tài chính nào và nhận ngay ",
    quizBlurbShortPart1: "Trả lời nhanh 5 câu hỏi nhận ngay ",
    quizXpReward: "+50 XP",
    quizBlurbPart2: ".",
    quizStart: "Bắt đầu trắc nghiệm (+50 XP)",
    quizResultTitle: "Hướng nghiệp của bạn",
    quizBestMatch: "Phù hợp nhất:",
    quizRetake: "Làm lại trắc nghiệm",
    quizQuestionCounter: "Câu hỏi {current}/{total}",

    salaryRange: "• Dải lương: {range}",
    salaryDisclaimer:
      "* Mức lương chỉ mang tính ước tính tham khảo, thay đổi theo công ty, khu vực và kinh nghiệm thực tế - không phải số liệu khảo sát chính thức.",

    prepProgress: "Tiến độ chuẩn bị sự nghiệp",
    prepProgressHint:
      "Đánh dấu các kỹ năng và chứng chỉ bạn đã tích lũy được để theo sát lộ trình sự nghiệp này:",

    typicalDay: "Một ngày làm việc điển hình:",
    typicalDayShort: "Một ngày điển hình:",
    jobDescription: "Nhiệm vụ chính (Job Description)",
    jobDescriptionShort: "Nhiệm vụ chính",
    pros: "Ưu điểm chính",
    prosShort: "ƯU ĐIỂM",
    cons: "Nhược điểm & Thách thức",
    consShort: "NHƯỢC ĐIỂM",
    applyTips: "Bí quyết ứng tuyển & Lời khuyên sự nghiệp:",
    applyTipsShort: "Lời khuyên tuyển dụng:",

    careerPath: "Lộ trình thăng tiến (Career Path)",
    careerPathShort: "Lộ trình thăng tiến",
    careerPathHint: "(Nhấp vào từng cấp độ để xem bí quyết thăng tiến)",
    careerPathHintShort: "(Nhấp vào từng cấp độ để xem bí quyết)",
    pathStep: "Bậc {step}: {name}",
    pathFocus: "Trọng tâm: ",
    pathTip: "Bí quyết: ",

    certifications: "Chứng chỉ khuyên học (Certifications)",
    certificationsShort: "Chứng chỉ khuyên học",
    skills: "Kỹ năng chuyên môn & Mềm",
    tools: "Hệ thống & Công cụ chuyên ngành",
    toolsShort: "Hệ thống & Công cụ",

    keywordsTitle: "Từ khóa tìm kiếm gợi ý:",
    keywordsHint:
      "Hệ thống sẽ tự động tìm kiếm trực tiếp trên các nền tảng tuyển dụng lớn theo từ khóa này.",
    findJobs: "Tìm việc trên các nền tảng lớn",
    findJobsShort: "Tìm kiếm trực tiếp trên các nền tảng:",
    otherPositions: "Hoặc tìm nhanh vị trí khác",
    otherPositionsShort: "Hoặc tìm nhanh vị trí khác:",
    cvReminder:
      "* Lưu ý: Hãy cập nhật đầy đủ các kỹ năng & chứng chỉ trên CV trước khi bắt đầu ứng tuyển.",
  },

  // components/DashboardClient.tsx
  dashboard: {
    stageLabel: "Chặng {n}",
    // Nhãn thời lượng trên thẻ bài học. Trước là template literal trong một
    // hàm ở module scope, ngoài tầm mọi rule cho tới khi thêm returned-text.
    minutesShort: "{count} phút",
    markedRead: "Đã đánh dấu {count} bài là bạn đã học.",
    unmarkedRead: "Đã bỏ đánh dấu {count} bài.",
    offlineSynced: "Tiến độ học tập offline đã được đồng bộ thành công! 🌟",
    lessonLocked: "Bài học này đang bị khoá. Hoàn thành các bài trước để mở khoá.",
    defaultUserName: "Người học",
    // Fallback bucket for a bonus lesson with no category in BONUS_CATEGORIES.
    bonusOther: "Khác",
    caseStudies: "Case chuyên sâu",
    searchPlaceholder: "Tìm bài học trong lộ trình này...",
    searchClear: "Xoá tìm kiếm",
    scrollLeft: "Cuộn sang trái",
    scrollRight: "Cuộn sang phải",
    gameBoss: "Tiến vào vương quốc game - săn Boss",
    gameSolo: "Tiến vào vương quốc game - đấu trường kiến thức solo",

    // Badge marking the current learner's own row in a leaderboard strip.
    youBadge: "Bạn",
    savedTitle: "Bài đã lưu",
    savedSubtitle: "Quay lại nhanh những bài bạn muốn đọc tiếp",

    buildingTitle: "Đang xây dựng",
    buildingSubtitle: "Bài học sắp được hoàn thiện",

    stageLockedTitle: "Chặng này bị khoá",
    stageLockedHint: "Hoàn thành chặng trước để mở",
    stageLockedBadge: "Chặng này đang bị khoá 🔒",
    unlockByChallenge: "Vượt qua thử thách kiến thức để mở khoá",
    unlockByRequest: "Yêu cầu hoàn thành bài trước - nhấn để nhắn admin mở khoá",

    markLearned: {
      button: "Đánh dấu đã học",
      help: "Giải thích cách đánh dấu đã học",
      confirm: "Xác nhận đánh dấu",
      saving: "Đang lưu...",
      selectAria: "Chọn để tự đánh dấu đã học",
      flaggedSubtitle: "Bạn đã tự đánh dấu đã học bài này",
      flaggedBadge: "Tự đánh dấu",
      // No diacritics, so scripts/i18n-scan.mjs never flagged this one. Found
      // by reading the ternary it sits in, not by the scanner.
      doneBadge: "Xong",
      alreadyCounted: "Các bài này đã được hệ thống tính tiến độ rồi.",
      confirmPrompt:
        "Bạn xác nhận đã học các bài này nhé, nhưng sẽ không được nhận kinh nghiệm trừ khi bạn đọc hết và làm hết.",
      updated: "Đã cập nhật các đánh dấu đã học.",
      updateFailed: "Không thể cập nhật đánh dấu. Vui lòng thử lại.",

      // Split around the inline <strong> and the coloured <span>, so the
      // markup stays in JSX instead of being smuggled through a dictionary
      // string. The colour words are separate keys because they are what the
      // span wraps.
      autoPart1: "Cuộn hết 100% nội dung bài ",
      autoAnd: "và",
      autoPart2: " làm xong hết quiz → bài chuyển ",
      autoColour: "xanh lá",
      autoPart3: " và được cộng XP.",
      manualPart1: "Chỉ bấm \"Tự đánh dấu\" vì tự biết mình đã học rồi → bài chuyển ",
      manualColour: "xanh dương",
      manualPart2: " để ghi nhớ tiến độ, nhưng không cộng XP.",
    },

    // Everything below was invisible to scripts/i18n-scan.mjs until its JSX
    // pattern learned to cross newlines - prose wrapped by the formatter, or a
    // line carrying an {interpolation}, matched nothing. The dashboard read as
    // fully translated with 35 strings still hard-coded.
    loading: "Đang tải",
    libraryEnter: "Bước vào thư viện · Phòng đọc sài gòn",
    librarySubtitle:
      "Không gian 3D đi lại được - ngồi vào bàn, thấy ai đang học cùng giờ với bạn",
    libraryPresence: "Thư viện là nơi duy nhất trong app có người khác đang hiện diện",
    libraryEnterCta: "Vào",

    learningPathCardSub: "Bắt đầu từ đâu, mỗi ngày bao nhiêu bài, bao giờ thì xong",

    presetLabel: "Bảng nhìn",
    presetCompact: "Gọn",
    presetFull: "Đầy đủ",
    presetCompactHint: "Chỉ giữ việc học hôm nay",
    presetFullHint: "Hiện thêm thưởng, cộng đồng và thử thách",
    streakFeedTitle: "Chuỗi ngày học hôm nay",
    streakFeedSub: "Người khác cũng đang giữ nhịp",
    streakFeedDays: "{days} ngày",
    lessonProgressLabel: "Bài học · {done}/{total}",
    levelMapTab: "Bản đồ cấp độ",
    learningPathTab: "Lộ trình học",
    learningPathTitle: "Lộ trình học của bạn",
    learningPathNote: "Bốn lộ trình, từ tài chính cá nhân tới CFA và FRM - vào học tiếp từ đúng chỗ đang dở",
    levelMapTitle: "Bản đồ cấp độ học viên",
    levelMapNote:
      "XP là tiến độ học; sát hạch và điểm kiểm tra mới xác nhận năng lực thật",
    levelMembers: "Thành viên Cấp {level} - {name} ({count})",
    levelNoMembers: "Chưa có thành viên ở cấp này.",
    levelAndOthers: "và {count} người khác...",
    fightBoss: "Đánh Boss",

    enterLessons: "Vào Học bài",
    enterLessonsSubtitle:
      "Toàn bộ lộ trình, bài học và case chuyên sâu nằm ở một chỗ duy nhất",
    lessonsCompletedOf: "{done}/{total} bài đã hoàn thành",
    trackCount: "4 lộ trình",
    seeAll: "Xem tất cả",
    bookmarkedOn: "Lưu ngày {date}",
    foundationHours: "~{hours} giờ học nền tảng",
    advancedLessons: "180 bài chuyên sâu",
    selectedCount: "{count} bài chọn",
    cancel: "Hủy",
    lockedCount: "{count} khoá",
    lessonRange: "Bài {from}-{to}",
    learnerCount: "{count} người đã học",
    appeal: "Khiếu nại",
    isNew: "MỚI",

    milestone: {
      passed: "Đã vượt ải",
      certificate: "Nhận chứng chỉ",
      awaiting: "Chờ vượt ải",
      eligible: "Đã đủ điều kiện thi vượt ải {stage}",
      // Split around the inline <strong>+50 XP</strong>.
      eligibleBodyPart1:
        "Chúc mừng bạn đã học xong tất cả bài học trong chặng này! Hãy vượt qua bài thi trắc nghiệm cột mốc (15 câu) để nhận ",
      eligibleBodyPart2: " và mở khóa chặng sau.",
      start: "Bắt đầu thi 🏆",
      // Split around the inline <strong>Kỳ thi Vượt ải {stage}</strong>.
      lockedPart1: "Bạn cần hoàn thành toàn bộ bài học và vượt qua ",
      lockedExamName: "Kỳ thi Vượt ải {stage}",
      lockedPart2: " để mở khoá chặng tiếp theo!",
    },

    // Boss-battle content passed to components/BossBattleModal.tsx. Scored:
    // a victory writes a game_sessions row and grants XP and coins. The
    // modal calls shuffleQuiz, so `correct: 0` leaks nothing - but option
    // LENGTH survives shuffling, which is why the English options below are
    // written to the AGENTS.md rules rather than as a literal translation of
    // the Vietnamese ones. (The Vietnamese side has the length tell and is
    // tracked separately, along with 190 other unaudited questions.)
    boss: {
      name: "Boss bẫy nợ nần & lạm phát",
      q1: "Để chống chọi với Lạm Phát 8%, danh mục đầu tư cần có tỷ suất sinh lời tối thiểu là bao nhiêu?",
      q2: "Bẫy nợ tín dụng nguy hiểm nhất ở điểm nào?",
      q2o1: "Lãi suất thả nổi cao & Lãi nhập gốc",
      q2o2: "Không cho gia hạn",
      q2o3: "Không có chiết khấu",
      q3: "Tỷ lệ Nợ/Vốn chủ sở hữu (D/E) an toàn tuyệt đối thường nằm dưới mức nào?",
    },
  },

  // app/(app)/settings/page.tsx
  settings: {
    back: "← Quay lại",
    title: "Cài đặt",
    subtitle: "Tùy chỉnh hồ sơ, trải nghiệm học và bảo mật tài khoản.",
    loading: "Đang tải...",

    profile: {
      title: "Hồ sơ cá nhân",
      description:
        "Cập nhật tên hiển thị, ảnh đại diện và phần giới thiệu ngắn để người khác nhận ra bạn dễ hơn.",
      avatarLabel: "Avatar",
      avatarAlt: "Ảnh đại diện của bạn",
      avatarPick: "Chọn ảnh mới",
      avatarUploading: "Đang upload...",
      avatarHint: "Tối đa 2MB, ưu tiên JPG hoặc PNG vuông.",
      nameLabel: "Tên hiển thị",
      namePlaceholder: "Tên bạn muốn mọi người nhìn thấy",
      bioLabel: "Giới thiệu ngắn",
      bioPlaceholder:
        "Ví dụ: Mình đang học để hiểu tiền của bản thân tốt hơn và bắt đầu đầu tư bài bản.",
      bioCount: "{count}/240 ký tự",
      save: "Lưu hồ sơ",
      saving: "Đang lưu hồ sơ...",
      saved: "Đã cập nhật hồ sơ cá nhân.",
      saveFailed: "Có lỗi xảy ra khi lưu hồ sơ.",
      avatarSaved: "Đã cập nhật avatar.",
      avatarFailed: "Có lỗi xảy ra khi upload avatar.",
      avatarTooLarge: "Lỗi: Kích thước file không được quá 2MB.",
      avatarNotImage: "Lỗi: Chỉ chấp nhận file hình ảnh.",
      // Prefixes for a message that ends in an error string from Supabase,
      // which is always English. Kept as a prefix rather than an interpolated
      // sentence so the untranslated tail reads as quoted detail.
      errorPrefix: "Lỗi: {message}",
      uploadErrorPrefix: "Lỗi upload: {message}",
      updateErrorPrefix: "Lỗi cập nhật: {message}",
    },

    appearance: {
      title: "Giao diện & lộ trình",
      description:
        "Chọn trải nghiệm hiển thị và hướng học ưu tiên để dashboard sát với mục tiêu của bạn hơn.",
      darkMode: "Chế độ tối",
      current: "Hiện tại: {mode}",
      dark: "Tối",
      light: "Sáng",
      switchToLight: "Chuyển sang chế độ sáng",
      switchToDark: "Chuyển sang chế độ tối",
      preferredTrack: "Lộ trình ưu tiên",
      save: "Lưu tùy chọn",
      saving: "Đang lưu tùy chọn...",
      saved: "Đã lưu tùy chọn học tập và giao diện.",
      saveFailed: "Không lưu được tùy chọn. Vui lòng thử lại.",
    },

    reminders: {
      title: "Nhắc nhở học tập",
      description: "Bật email nhắc nhở để không bỏ lỡ streak hoặc bài ôn tập đến hạn.",

      email: "Nhắc nhở qua email",
      emailHint: "Khi sắp mất streak hoặc có bài ôn tập đến hạn",
      emailOn: "Bật nhắc nhở qua email",
      emailOff: "Tắt nhắc nhở qua email",
      emailEnabled: "Đã bật nhắc nhở qua email.",
      emailDisabled: "Đã tắt nhắc nhở qua email.",
      emailFailed: "Không lưu được tùy chọn nhắc nhở. Vui lòng thử lại.",
      emailFootnote:
        "Email sẽ được gửi tối đa 1 lần/ngày, chỉ khi thực sự cần (sắp mất streak hoặc có bài ôn tập đến hạn).",

      weekly: "Tổng kết tuần qua email",
      weeklyHint: "Số bài đã học, XP tích lũy và streak hiện tại - gửi mỗi tuần",
      weeklyOn: "Bật tổng kết tuần qua email",
      weeklyOff: "Tắt tổng kết tuần qua email",
      weeklyEnabled: "Đã bật tổng kết tuần qua email.",
      weeklyDisabled: "Đã tắt tổng kết tuần qua email.",
      weeklyFailed: "Không lưu được tùy chọn tổng kết tuần. Vui lòng thử lại.",

      browser: "Thông báo trình duyệt",
      browserHint: "Nhận thông báo đẩy ngay trên trình duyệt khi sắp mất streak",
      browserOn: "Bật thông báo trình duyệt",
      browserOff: "Tắt thông báo trình duyệt",
      browserEnabled: "Đã bật thông báo trình duyệt.",
      browserDisabled: "Đã tắt thông báo trình duyệt.",
      browserFailed: "Không bật được thông báo trình duyệt.",

      morning: "10 câu ôn buổi sáng",
      morningHint:
        "7:30 mỗi sáng, một phiên ~90 giây gồm các câu bạn từng làm sai, trộn từ nhiều bài",
      morningOn: "Bật phiên ôn buổi sáng",
      morningOff: "Tắt phiên ôn buổi sáng",
      morningEnabled: "Đã bật phiên ôn 7:30 sáng.",
      morningDisabled: "Đã tắt phiên ôn buổi sáng.",
      morningFailed: "Không bật được phiên ôn buổi sáng.",
    },

    quickActions: {
      title: "Tác vụ nhanh",
      description: "Những nơi người dùng hay quay lại nhất sau khi chỉnh cài đặt.",
      analytics: "Thống kê học tập",
      analyticsHint: "Xem tiến độ và thời gian học",
      notes: "Ghi chú của tôi",
      notesHint: "Ôn lại các ý đã note",
      friends: "Bạn bè & chat",
      friendsHint: "Tìm bạn học và nhắn tin",
      documents: "Tài liệu miễn phí",
      documentsHint: "Mở kho tài nguyên học thêm",
    },

    security: {
      title: "Bảo mật tài khoản",
      description: "Quản lý email đăng nhập và gửi link đổi mật khẩu khi cần.",
      emailLabel: "Email đăng nhập",
      joinedLabel: "Ngày tham gia",
      joinedUnknown: "Chưa cập nhật",
      sendReset: "Gửi email đổi mật khẩu",
      sendingReset: "Đang gửi email...",
      resetSent: "Đã gửi email đổi mật khẩu tới {email}.",
      resetFailed: "Không gửi được email đổi mật khẩu: {message}",
      resetError: "Có lỗi xảy ra khi gửi email đổi mật khẩu.",
      resetFootnote: "Hệ thống sẽ gửi link an toàn tới email hiện tại của bạn.",
    },

    session: {
      title: "Phiên làm việc & tài khoản",
      description: "Thoát khỏi tài khoản khi dùng máy lạ hoặc sau khi hoàn tất phiên học.",
      statusTitle: "Trạng thái hiện tại",
      statusBody:
        "Bạn đang đăng nhập bằng tài khoản Supabase và mọi thay đổi tại đây được lưu trực tiếp vào hệ thống.",
      signOut: "Đăng xuất",
      signingOut: "Đang đăng xuất...",
    },
  },

  errors: {
    generic: "Có lỗi xảy ra. Vui lòng thử lại.",
    network: "Không kết nối được máy chủ. Kiểm tra đường truyền rồi thử lại.",
    notFound: "Không tìm thấy nội dung bạn cần.",
    unauthorized: "Bạn cần đăng nhập để tiếp tục.",
  },

  // components/Leaderboard.tsx. Scope note: the per-rank nicknames and badge
  // names (LEADERBOARD_TITLES, the byMetric honor tables - "Sói Biển Đầu Tư",
  // "Trùm Sàn NYSE", etc.) are deliberately NOT covered here. Those are
  // Vietnamese wordplay/finance-meme flavor text, not UI strings - a literal
  // translation would read as nonsense in English, and a good one is a
  // separate creative-writing pass, not a mechanical dictionary lookup.
  leaderboard: {
    compositeScore: "Điểm tổng hợp",
    totalXp: "XP Tổng",
    lessonsCount: "Số bài",
    avgScore: "Điểm TB",
    streakDays: "Chuỗi ngày",
    career: "Sự nghiệp",
    cfaArena: "Đấu trường CFA",
    contribution: "Đóng góp",
    badgesLabel: "Huy hiệu",
    gamer: "Game thủ",

    scrollLeft: "Cuộn sang trái",
    scrollRight: "Cuộn sang phải",

    // alt text cho ba cúp 3D trên bục vinh danh. Trình đọc màn hình đọc
    // chúng, nên đây là chữ hiển thị chứ không phải tên tệp.
    trophyGoldAlt: "Cúp vàng 3D",
    trophySilverAlt: "Cúp bạc 3D",
    trophyBronzeAlt: "Cúp đồng 3D",

    eyebrowCompact: "BXH",
    titleCompact: "Bảng xếp hạng",
    eyebrowFull: "Vinh Danh BXH",
    titleFull: "Top 5 nổi bật",

    loadingCompact: "Đang tải BXH...",
    loadingFull: "Đang tải danh sách vinh danh...",
    empty: "Chưa có đủ dữ liệu xếp hạng.",

    nextRanks: "Các vị trí vinh danh tiếp theo",
    rangeCompact: "TOP 6 - 20",
    rangeFull: "BẢNG VINH DANH #6 - #20",

    yourRank: "Hạng của bạn",
    byMetricCompact: "Chỉ số {metric}",
    byMetricFull: "Theo chỉ số {metric}",

    compositeTitle: "Đánh giá toàn diện, nặng về kiến thức",
    compositeDescPrefix: "Thang 1000 điểm, gồm:",
    compositeDescXp: "XP học hàng ngày (không tính điểm danh),",
    compositeDescExam: "bài thi thăng cấp,",
    compositeDescAccuracy: "điểm kiểm tra trung bình,",
    compositeDescStreak: "chuỗi ngày học. Chỉ tính bài thi được máy chủ chấm.",
    compositeLearningXp: "XP học",
    compositeExamPoints: "Thi thăng cấp",
    compositeAccuracy: "Điểm TB",
    compositeStreak: "Chuỗi ngày",


    // Unit suffixes appended to a raw number by TABS[].format(). Kept short
    // since they render inline right after the digits ("1.234 XP", "82%").
    units: {
      outOf1000: "/1000",
      xp: "XP",
      points: "điểm",
      lessons: "bài",
      percent: "%",
      days: "ngày",
      interactions: "tương tác",
      honors: "danh hiệu",
    },
  },
  // app/(app)/nguoi-hoc/[userId]/page.tsx - another learner's public profile.
  publicProfile: {
    backToLeaderboard: "← Quay lại bảng xếp hạng",
    heading: "Hồ sơ người học",
    yourProfile: "Hồ sơ của bạn",
    eyebrow: "Người học trên BXH",
    joinedAt: "Tham gia từ {date}",
    noBio: "Chưa có phần giới thiệu cá nhân.",
    followers: "người theo dõi",
    following: "đang theo dõi",

    statLevel: "Level",
    statXp: "XP",
    statXpHint: "Tổng kinh nghiệm",
    statCompleted: "Hoàn thành",
    statCompletedHint: "Bài học đã xong",
    statQuiz: "Điểm quiz",
    statQuizHint: "Điểm trung bình",

    progressTitle: "Tiến độ học tập",
    currentPriority: "Ưu tiên hiện tại: {track}",
    trackPersonal: "Tài chính cá nhân",
    trackProfessional: "Tài chính chuyên ngành",
    studyMinutes: "{minutes} phút học",
    currentStreakLine: "{days} ngày streak hiện tại",
    percentComplete: "{percent}% hoàn thành",

    quickSummary: "Tóm tắt nhanh",
    currentStreak: "Chuỗi hiện tại",
    longestStreak: "Chuỗi dài nhất",
    days: "{days} ngày",
    studyTime: "Thời gian học",
    minutes: "{minutes} phút",

    recentLessons: "Bài học gần đây",
    noLessons: "Người học này chưa có bài hoàn thành nào để hiển thị.",
    unknownDate: "Chưa rõ ngày",
    quizScore: "{percent}% quiz",
    noQuiz: "Không có quiz",

    recentPosts: "Bài đăng gần đây",
    viewFinsocial: "Xem FinSocial →",
  },
  // components/lobby/LobbyClient.tsx - the shared 3D library lobby.
  lobby: {
    plateDoneToday: "hôm nay",
    plateNotYet: "chưa học",
    building: "Đang dựng thư viện…",
    connectFailed: "Không kết nối được. Thử tải lại trang.",
    opening: "Đang mở cửa thư viện…",
    title: "Thư viện · Phòng đọc sài gòn",
    studiedToday: "Hôm nay bạn đã ngồi học {minutes} phút",
    peersHere: "{count} người đang ở trong sảnh",
    alone: "Bạn đang ở đây một mình",
    nextLessonLabel: "Bài kế tiếp của bạn",
    startLesson: "Vào học",
    sitDown: "Ngồi xuống học · phiên 25 phút",
    sessionDone: "Xong!",
    standUp: "Đứng dậy",
    enterRoom: "Vào phòng →",
    // components/lobby/LobbyDirectory.tsx - bảng chỉ đường trên HUD.
    directoryToggle: "Đi đâu bây giờ?",
    directoryTitle: "Có gì trong thư viện",
    directoryClose: "Thu gọn",
    directoryUpstairs: "Ban công tầng hai · thang ở đầu bắc",
    directoryGates: "Cổng ở tầng trệt",
    directoryHint: "Bấm để vào thẳng, hoặc tự đi bộ tới cửa trong phòng.",
    chatPlaceholder: "Nói gì đó với cả sảnh…",
    send: "Gửi",
    // Split around the <kbd> keys, which are not translatable.
    hintPart1: "Chạm vào chỗ muốn tới, hoặc bấm ",
    hintKeys: "W A S D",
    hintPart2: " · kéo chuột để đổi góc nhìn, lăn để phóng · tin nhắn không được lưu lại",
    hintTouch: "Kéo cần điều khiển để đi · kéo màn hình để đổi góc nhìn",
  },
  // components/LessonRecallWidget.tsx - the spaced-repetition due list.
  recallWidget: {
    noQuizFound: "Không tìm thấy câu hỏi trắc nghiệm cho bài này.",
    passedToast: "Tuyệt vời! Bạn đã vượt qua chu kỳ ôn tập và nhận +10 XP học thuật! 🔄🏆",
    partialToast:
      "Ôn tập hoàn tất. Một số câu chưa đúng, bài học sẽ hiển thị lại sớm hơn để bạn ôn luyện.",
    updateFailed: "Không thể cập nhật tiến độ ôn tập.",
    heading: "CẦN ÔN LẠI GÌ",
    headingCount: " ({count})",
    warningSubtitle: "Có bài học cần ôn tập ngay",
    normalSubtitle: "Các bài học đã đến chu kỳ ôn tập",
    stageLine: "Chu kỳ: Chặng {stage}/4",
    reviewNow: "Ôn ngay",
    moreWaiting: "Còn {count} bài khác đang chờ ôn tập",
    reviewingLesson: "Ôn tập: {title}",
    questionCounter: "Câu {index}/{total}",
    confirm: "Xác nhận",
    correct: "Đúng rồi! 🎉",
    wrong: "Chưa đúng!",
    finish: "Hoàn tất",
    nextQuestion: "Câu tiếp theo",
  },
  // components/MockInterviewModal.tsx - the timed IB mock interview.
  mockInterview: {
    fallbackCategory: "Phỏng vấn",
    saveFailed: "Không lưu được kết quả phỏng vấn, nhưng bạn vẫn xem được phần chấm điểm.",
    title: "Mock Interview",
    questionMeta: "Câu {index}/{total} · {category}",
    subtitle: "Phỏng vấn thử có tính giờ",
    closeAria: "Đóng phỏng vấn thử",
    preparing: "Đang chuẩn bị bộ câu hỏi...",
    empty: "Chưa có câu hỏi phỏng vấn nào khả dụng.",
    loadError: "Không tải được bộ câu hỏi.",
    retry: "Thử lại",
    grading: "Đang chấm điểm buổi phỏng vấn...",
    answeredCount: "Đã trả lời {done}/{total} · không có gợi ý giữa chừng",
    submit: "Nộp bài phỏng vấn",
    next: "Câu tiếp theo →",
    resultTitle: "Kết quả phỏng vấn thử",
    xpEarned: "+{xp} XP",
    goodAnswerLabel: "Cách trả lời tốt: ",
    retryInterview: "Phỏng vấn lại",
    done: "Xong",
  },
  // components/BehavioralPrepPanel.tsx - the unscored behavioural question drill.
  behavioralPrep: {
    loading: "Đang tải câu hỏi behavioral...",
    loadError: "Không tải được bộ câu hỏi behavioral.",
    retry: "Thử lại",
    // Split around the <strong> in the middle of the sentence.
    notePart1: "Nhóm câu hỏi này ",
    noteBold: "không có đáp án đúng/sai",
    notePart2:
      " nên không chấm điểm. Cách dùng: đọc câu hỏi, tự trả lời thành tiếng như đang phỏng vấn thật, rồi mới mở khung gợi ý để đối chiếu.",
    allCategories: "Tất cả · {count}",
    frameworkHeading: "Khung trả lời gợi ý",
    revealFramework: "Xem khung trả lời",
    previous: "Câu trước",
    next: "Câu tiếp theo",
  },

  // components/UserProfile.tsx - the avatar dropdown.
  userProfile: {
    fallbackName: "User",
    level: "Cấp độ",
    xp: "XP",
    lessons: "Bài học",
    customizeAvatar: "Tùy chỉnh Avatar 2.5D",
    analytics: "Thống kê học tập",
    documents: "Tài liệu miễn phí",
    profile: "Hồ sơ",
    settings: "Cài đặt",
    signingOut: "Đang đăng xuất...",
    signOut: "Đăng xuất",
  },

  // components/QuietCornerClient.tsx - góc yên tĩnh, màn hình duy nhất trong
  // app cố ý không thưởng gì cả.
  quietCorner: {
    home: "Về trang chủ",
    breatheTitle: "Một phút thở",
    breatheBlurb:
      "Nhịp 4-4-4-4, bốn vòng. Không tính điểm, không lưu lại, không ai biết bạn có làm hay không.",
    burdenTitle: "Đặt xuống một gánh nặng",
    burdenBlurb:
      "Chọn nỗi lo đang nằm trong đầu bạn để xem một góc nhìn khác. Đây là cách nghĩ, không phải lời khuyên nên mua gì hay tiêu bao nhiêu.",
    noXp: "Không có XP nào ở trang này. Đó là chủ ý.",
  },

  // components/BreathingCircle.tsx
  breathing: {
    round: "Vòng",
    inhale: "Hít vào",
    hold: "Giữ",
    exhale: "Thở ra",
    doneTitle: "Xong rồi. Không có điểm nào cả — chỉ là một phút của bạn.",
    idleBlurb: "Bốn nhịp thở, khoảng một phút",
    again: "Thở thêm một phút",
    start: "Bắt đầu thở",
    stop: "Dừng lại",
  },

  // components/WarmLamps.tsx - đèn đọc kéo thả được.
  warmLamps: {
    title: "Đèn ấm",
    close: "Đóng bảng điều khiển đèn",
    intensity: "Độ đậm",
    addLamp: "Thêm đèn",
    lamp: "Đèn",
    hint:
      "Kéo chấm sáng để soi chỗ khác, bấm vào nó để đổi cỡ. Đèn càng đậm thì xung quanh càng chìm vào bóng tối.",
    lampTitle: "{size} · kéo để soi chỗ khác, bấm để đổi cỡ",
    lampAria: "{size}. Phím mũi tên để di chuyển, enter để đổi cỡ.",
    turnOff: "Tắt đèn ấm",
    turnOn: "Bật đèn ấm",
  },

  // components/ReadingProgress.tsx
  readingProgress: {
    open: "Mở thanh tiến độ",
    reading: "Đang đọc",
    closeTitle: "Đóng thanh tiến độ",
    close: "Đóng",
    finished: "Hoàn thành chặng đua!",
    congrats: "Chúc mừng! Bạn đã đọc {percent}%",
    keepGoing: "Hãy tiếp tục - bạn đang làm rất tốt!",
  },

  // components/FontSizeControl.tsx
  fontSize: {
    decrease: "Giảm cỡ chữ",
    increase: "Tăng cỡ chữ",
    // Ký hiệu, không phải câu chữ: "A-" và "A+" đọc như nhau ở mọi ngôn ngữ,
    // nên hai giá trị này trùng nhau ở cả hai từ điển một cách hợp lệ.
    smaller: "A-",
    larger: "A+",
  },

  // components/TextHighlightMenu.tsx - menu hiện khi bôi đen một đoạn.
  textHighlight: {
    needLogin: "Bạn cần đăng nhập để đánh dấu đoạn văn.",
    saveFailed: "Không thể lưu đánh dấu. Vui lòng thử lại.",
    savedImportant: "Đã tô highlight đoạn quan trọng!",
    savedFlag: "Đã báo cáo đoạn văn này!",
    title: "Đánh dấu văn bản",
    characters: "ký tự",
    highlight: "Tô highlight quan trọng",
    reportAi: "Báo đoạn này do AI viết",
  },


  // components/LessonAppealModal.tsx - khiếu nại khi bài không tự đánh dấu xong.
  lessonAppeal: {
    sent: "Đã gửi khiếu nại - admin sẽ kiểm tra và duyệt sớm nhất có thể.",
    sendFailed: "Không thể gửi khiếu nại. Vui lòng thử lại.",
    title: "Khiếu nại hoàn thành",
    // Dấu ngoặc kép quanh hai nhãn nút trong câu này là chữ, không phải mã:
    // trong JSX chúng phải viết &quot;, ở đây thì viết thẳng được.
    blurb:
      "Nếu bạn đã thực sự đọc hết, làm xong quiz và câu hỏi giữa bài (nếu có) nhưng bài vẫn hiện \"Tự đánh dấu\" thay vì \"Xong\", gửi khiếu nại để admin kiểm tra và duyệt thủ công.",
    notePlaceholder:
      "Mô tả thêm (tuỳ chọn) - VD: đã làm xong 4/4 câu quiz và câu hỏi giữa bài lúc 20h...",
    sending: "Đang gửi...",
    submit: "Gửi khiếu nại",
  },

  // components/ManualLessonFlagButton.tsx - tự đánh dấu đã học.
  manualLessonFlag: {
    confirmNoXp:
      "Bạn xác nhận đã học bài này nhé, nhưng sẽ không được nhận kinh nghiệm trừ khi bạn đọc hết và làm hết.",
    alreadyCountedTitle: "Bài này đã được hệ thống tính tiến độ",
    unflagTitle: "Bỏ đánh dấu tự xác nhận",
    flagTitle: "Tự đánh dấu đã học",
    alreadyCounted: "Bài này đã được hệ thống tính rồi trên bảng xếp hạng.",
    alreadyCountedNote: "Bạn đã hoàn thành quiz hoặc đọc đủ, nên không cần tự đánh dấu nữa.",
    needLogin: "Bạn cần đăng nhập để tự đánh dấu bài đã học.",
    marked: "Đã đánh dấu bài này là bạn đã học.",
    unmarked: "Đã bỏ đánh dấu tự xác nhận.",
    failed: "Không thể cập nhật đánh dấu. Vui lòng thử lại.",
    ariaLabel: "Tự đánh dấu đã học",
  },


  // components/RecallCard.tsx - câu ôn lại bài cũ trên dashboard.
  recallCard: {
    // Câu hỏi có thẻ <span> tô màu số ngày ở giữa, nên nó bị cắt làm ba mảnh
    // thay vì nhét HTML vào một giá trị - trật tự ba mảnh khác nhau theo ngôn
    // ngữ, và một chuỗi mang thẻ HTML thì phải dựng bằng
    // dangerouslySetInnerHTML mới hiện ra được.
    fromLabel: "Từ",
    defaultTitle: "Nhớ lại trước khi học tiếp",
    dayLabel: "Day {day}",
    questionSuffix: "({title}) - ý nào dưới đây đúng?",
    correct: "Chính xác - kiến thức đang được củng cố.",
    wrong: "Chưa đúng - không sao, đây chính là lúc ôn lại phát huy tác dụng.",
  },

  // components/StreakReminderManager.tsx - lời mời bật thông báo trình duyệt.
  streakReminder: {
    title: "Bật nhắc nhở để không quên streak và bài ôn tập",
    note: "Chỉ nhắc khi bạn đang mở hoặc quay lại tab này.",
    enable: "Bật thông báo",
    later: "Để sau",
    close: "Đóng",
  },

  // components/TopicMasteryWidget.tsx
  topicMastery: {
    title: "Độ phủ theo mảng kiến thức",
    subtitle: "Tính trên số bài đã hoàn thành · mảng đi xa nhất xếp trước",
    byCareer: "Theo nghề",
    done: "Đã học {done} / {total} bài",
  },

  // components/NotificationBell.tsx
  notifications: {
    ariaLabel: "Thông báo",
    title: "Thông báo",
    markAllRead: "Đánh dấu đã đọc tất cả",
    loading: "Đang tải...",
    empty:
      "Chưa có thông báo nào. Đăng bài hoặc bình luận trên FinSocial để bắt đầu nhận thông báo khi có người tương tác.",
    comment: "{actor} đã bình luận vào bài viết của bạn",
    reaction: "{actor} đã thả {emoji} vào bài viết của bạn",
    reactionFallback: "cảm xúc",
    appealApproved: "Khiếu nại của bạn đã được duyệt - bài học đã được ghi nhận hoàn thành.",
    appealRejected: "Khiếu nại của bạn chưa được chấp nhận.",
    aiReportResolved: "Cảm ơn bạn - đoạn nội dung bạn báo sai đã được sửa.",
  },

  // components/CareerGoalWidget.tsx
  jobKeywords: {
    financialAnalysis: "Phân tích tài chính",
    accounting: "Kế toán",
    audit: "Kiểm toán",
    investmentBanking: "Ngân hàng đầu tư",
    creditOfficer: "Chuyên viên tín dụng",
    fpa: "FP&A",
    fundManagement: "Quản lý quỹ đầu tư",
    investmentOfficer: "Chuyên viên đầu tư",
    chiefAccountant: "Kế toán trưởng",
    riskAnalyst: "Chuyên viên phân tích rủi ro",
    financialPlanning: "Hoạch định tài chính",
    quant: "Quantitative Analyst",
    valuation: "Định giá tài sản",
    investorRelations: "Quan hệ cổ đông",
  },
  connectMenu: {
    title: "Kết nối",
    open: "Mở menu kết nối",
    dragTitle: "Kéo để dời nút",
    close: "Đóng",
    friends: "Bạn bè & kết nối",
    friendsSub: "Lời mời, tin nhắn riêng",
    invite: "Mời bạn",
    inviteSub: "Nhận thưởng khi bạn bè tham gia",
    group: "Nhóm học",
    groupSub: "Trò chuyện với nhóm của bạn",
    feedback: "Góp ý",
    feedbackSub: "Nhắn thẳng cho đội ngũ",
  },
  careerGoalWidget: {
    title: "Mục tiêu sự nghiệp",
    progress: "Đã học {completed}/{total} bài liên quan",
    continue: "Học tiếp: {title}",
    allDone: "Đã học hết bài liên quan - xem lại mục tiêu",
  },


  // Bốn trang chứng chỉ: CFA thẻ thuật ngữ, CFA sổ tay công thức, FRM, và
  // khối "chặng sau" dưới lộ trình CFA.
  certPages: {
    tabsAria: "Chuyển giữa hai chứng chỉ",
    tabCfa: "CFA Level I",
    tabCfaHint: "10 môn nền tảng",
    tabFrm: "FRM",
    tabFrmHint: "Quản trị rủi ro",
    frmTipLabel: "Bẫy hay gặp",
    frmAllLabel: "Tất cả (10 Môn FRM)",
    frmLearnedToast: "✓ Đã đánh dấu thuộc thuật ngữ FRM!",
    // metadata của trang. Dịch được vì các trang này vốn đã dựng động (layout
    // gốc đọc cookie ngôn ngữ), và bọ tìm kiếm không mang cookie nên vẫn nhận
    // bản tiếng Việt mặc định - đúng thứ mình muốn cho một site tiếng Việt.
    flashcardsMetaTitle: "Bộ thẻ thuật ngữ CFA song ngữ en-vi | Tuhoctaichinh.org",
    flashcardsMetaDesc:
      "Bộ thẻ Flashcard 3D thuật ngữ tiếng Anh chuyên ngành CFA Level 1 kèm định nghĩa tiếng Việt chuẩn và công thức liên quan.",
    formulasMetaTitle: "Sổ tay công thức CFA level 1 | Tuhoctaichinh.org",
    formulasMetaDesc:
      "Sổ tay công thức CFA Level 1: thẻ phân số tầng trực quan, giải thích từng biến số và ví dụ tính toán bằng số thực tế cho cả mười môn thi.",

    backToCfa: "Về trang CFA Track",
    backToDashboard: "Về Dashboard",
    flashcardsTitle: "Bộ thẻ thuật ngữ CFA level 1",
    flashcardsSubtitle: "Flashcard song ngữ anh - việt & công thức liên quan",
    formulasTitle: "Sổ tay công thức CFA level 1",
    formulasSubtitle: "Công thức trọng yếu cả mười môn, kèm ví dụ tính bằng số thực tế",

    frmMockExam: "Thi thử",
    // Tên riêng của chứng chỉ, giữ nguyên ở mọi ngôn ngữ - đã khai trong
    // INTENTIONALLY_UNTRANSLATED của dictionary-parity.test.ts.
    frmTitle: "FRM",
    frmSubtitle: "Financial risk manager - GARP part I & part II",
    frmGlossary: "Thẻ thuật ngữ",
    frmFormulas: "Sổ tay công thức",

    frmFlashcardsMetaTitle: "Bộ thẻ thuật ngữ FRM song ngữ en-vi | Tuhoctaichinh.org",
    frmFlashcardsMetaDesc:
      "Thẻ ghi nhớ thuật ngữ FRM Part I và Part II - VaR, Expected Shortfall, CVA, LCR, NSFR, PD/LGD/EAD - kèm định nghĩa tiếng Việt và cái bẫy hay gặp ở từng khái niệm.",
    frmFormulasMetaTitle: "Sổ tay công thức FRM part I & II | Tuhoctaichinh.org",
    frmFormulasMetaDesc:
      "Công thức thi FRM theo mười môn của GARP: VaR, Expected Shortfall, EL, LCR, NSFR, DV01, Greeks - kèm giải thích ký hiệu và ví dụ tính bằng số.",
    backToFrm: "Về trang FRM Track",
    backToFrmTrack: "Về lộ trình FRM",
    frmFlashcardsTitle: "Bộ thẻ thuật ngữ FRM",
    frmFlashcardsSubtitle: "Part I & Part II - song ngữ Anh - Việt kèm bẫy hay gặp",
    frmFormulasTitle: "Sổ tay công thức FRM",
    frmFormulasSubtitle: "Part I & II - kèm ví dụ tính bằng số",

    noLessonsYet: "chưa có bài",
    pickTrack: "Chọn một hướng chuyên sâu:",
    examWeight: "Trọng số đề thi",
    scaleTo: "thang 0–",
    nextStages: "Chặng sau: Level II và Level III",
    nextStagesBlurb:
      "Bài học của TuHocTaiChinh hiện dừng ở Level I. Phần dưới là đề cương chính thức của hai cấp còn lại - trọng số và cấu trúc lấy từ trang candidate resources của CFA Institute - để bạn biết mình đang leo một cái thang cao bao nhiêu.",
  },


  // lib/career-categories.ts - tên và mô tả năm nhóm ngành. Dùng ở phố nghề,
  // mục lục phòng, và bộ lọc trang việc làm.
  careerCategories: {
    labels: {
      investment: "Đầu tư & Nghiên cứu",
      accounting: "Kế toán & Kiểm soát",
      banking: "Ngân hàng & Nguồn vốn",
      advisory: "Dịch vụ & Tư vấn",
      data: "Dữ liệu & Công nghệ",
    },
    // Một dòng nói nhóm ngành này làm gì, cho biển hiệu ngoài cửa.
    blurbs: {
      investment: "Định giá, chọn cổ phiếu, quản lý danh mục",
      banking: "Thu xếp vốn, tín dụng, nguồn vốn ngân hàng",
      advisory: "Tư vấn khách hàng, hoạch định tài chính",
      accounting: "Ghi nhận, kiểm toán, kiểm soát nội bộ",
      data: "Mô hình, dữ liệu và công nghệ tài chính",
    },
  },

};

export type Dictionary = typeof vi;
