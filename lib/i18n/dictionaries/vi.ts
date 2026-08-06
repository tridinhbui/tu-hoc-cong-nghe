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

export const vi = {
  nav: {
    students: "Học viên",
    sectionLearn: "Học tập",
    sectionPractice: "Thực hành",
    sectionCommunity: "Cộng đồng",
    sectionProgress: "Tiến độ",
    sectionResources: "Tài nguyên",
    quiz: "Kiểm tra",
    notes: "Ghi chú",
    skillTree: "Cây kỹ năng",
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
    // Menu người dùng: bản desktop có emoji, bản mobile gọn hơn.
    menuProfile: "👤 Hồ sơ cá nhân",
    menuFriends: "👥 Bạn bè & Kết nối",
    menuSettings: "⚙️ Cài đặt tài khoản",
    menuProfileShort: "Hồ sơ",
    menuFriendsShort: "Bạn bè",
    menuSettingsShort: "Cài đặt",
    docsLong: "Tài liệu Miễn phí",
    docsShort: "Tài liệu",
    levelXp: "Cấp {level} • {xp} XP",
    dailyGiftReady: "🎁 Quà đăng nhập hôm nay đã sẵn sàng - mở ở mục Nhiệm vụ & Rương quà!",
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
    personal: {
      tab: "Tài chính cá nhân",
      subtitle: "Dành cho người mới bắt đầu",
      description:
        "Kiểm tra tài chính của chính bạn, kiểm soát chi tiêu, xây quỹ khẩn cấp, trả nợ và đầu tư thông minh - không cần kiến thức ngành.",
    },
    professional: {
      tab: "Tài chính chuyên ngành",
      subtitle: "Chuyên sâu, cho người đã có nền tài chính",
      description:
        "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục, phái sinh và AI in Finance.",
    },
    cfa: {
      tab: "Tài chính chứng chỉ",
      subtitle: "CFA Level I · đang xây dựng",
      description:
        "Ánh xạ các bài học đã có sang đúng 10 môn thi CFA Level I chính thức - không tạo bài mới, không đổi số ngày của 2 track kia. Môn nào chưa có bài phù hợp sẽ được xây dần.",
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
      facebook: "Tham gia group Facebook",
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
      sub: "Sau khi tạo tài khoản, bạn không chỉ đi qua lộ trình bài học. Bạn còn có Lộ trình Active Recall ôn tập chủ động, Học nhóm 3D để giữ nhịp, và FinSocial để trao đổi kiến thức với cộng đồng.",
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
      ecoStudyRoom: "Phòng Học Nhóm (3D)",
      ecoHot: "Hot",
      ecoFinsocial: "FinSocial - Feed Bài Viết",
      ecoCareer: "Bản Đồ Sự Nghiệp Tài Chính",
      ecoShop: "Cửa Hàng Cosmetic & Avatar",
      supportTitle: "Hỗ trợ & Pháp lý",
      terms: "Điều khoản sử dụng",
      privacy: "Chính sách bảo mật",
      login: "Đăng nhập / Đăng ký",
      copyright: "© 2026 Tự Học Tài Chính. Tất cả quyền được bảo lưu.",
      tagline: "Học tài chính miễn phí cho người Việt 🇻🇳",
    },
  },

  // components/FinancialRpgWorldMap.tsx - the Game Kingdom map.
  worldMap: {
    levelShort: "Lv.{level}",
    empireTitle: "Đế Chế Wall Street",
    online: "Online",
    empireSub: "Tập sự Phố Wall • 3D RPG Kingdom",
    capitalLabel: "Vốn Đầu Tư",
    coinsValue: "{count} Coins",
    energyLabel: "Năng Lượng",

    shopTitle: "Tiệm Đồ Executive",
    shopShort: "Tiệm Đồ",
    cardsTitle: "Bảo Tàng Thẻ VN30",
    cardsShort: "Bộ Thẻ",

    // Ticker strip. Illustrative figures for the game surface, not market data.
    tickerLabel: "WALL ST. TICKER",
    tickerIndex: "📈 VN-INDEX: 1,285.40 (+1.45%)",
    tickerBoss: "🐂 BOSS SÀN NYSE: 850,000 / 1,000,000 HP (85%)",
    tickerCase: "🏙️ TIMES SQUARE: CASE STUDY CASE #12 HOẠT ĐỘNG",
    tickerClan: "💼 HEDGE FUND CLAN: TOP #1 WALL STREET",
    bgAlt: "Wall Street Background",

    zoneMiniGames: "🔥 TỔNG HỢP MINI GAME",

    fogTitle: "VÙNG ĐẤT CHƯA GIẢI MÃ",
    fogHint: "Click mở (+5 Coins)",
    fogHintLong: "Click mở sương mù (+5 Coins)",
    underConstruction: "ĐANG THI CÔNG",
    lockedLevel: "Khóa • Yêu cầu Lv.{level}",
    lockedShort: "Khóa Lv.{level}",
    lockedNeedLessons: "Yêu cầu hoàn thành bài học",
    lockedNeedLessonsShort: "Hoàn thành bài học để mở",

    dragHint: "💡 Kéo tự do (Canva Drag & Pan) để di chuyển bản đồ không cần cuộn trang web!",
    zoneCount: "12 VÙNG ĐẤT TÀI CHÍNH",
    dragHintLong: "🖐️ Canva Drag Canvas (Kéo tự do 360° • Xem trọn vẹn 12 vùng đất)",

    gearOpenTitle: "Mở tủ trang bị",
    gearEyebrow: "Tủ trang bị",
    gearTitle: "Executive Gear",
    gearSub: "Cố định ngoài bản đồ nhiệm vụ",
    gearCta: "Mở cửa hàng & tủ đồ",

    bossHp: "BOSS 85% HP",
    hotCase: "HOT CASE STUDY",
    backToMap: "Quay Lại Bản Đồ Đấu Trường",
    opening: "Đang mở: {name}",
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
    nameLabel: "Tên của bạn",
    namePlaceholder: "Nguyễn Văn A",
    passwordLabel: "Mật khẩu",
    forgotLink: "Quên mật khẩu?",
    tooManyAttempts: "Quá nhiều lần thử. Vui lòng đợi {seconds} giây rồi thử lại.",
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

    trackProgressTitle: "Tiến độ Lộ trình",
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
    themeEmerald: "Ngọc Lục Bảo",
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
    uncoveredNote:
      "{uncovered} / {total} vị trí khác chưa có bộ câu hỏi riêng — phần technical của các nghề đó đang được xây dần.",

    drillTitle: "Investment Banking & Finance Drill",
    drillBadge: "✨ Chuẩn bộ \"400 Questions IB Guide\" Phố Wall",
    drillHeading: "Luyện technical interview như một vòng analyst thực chiến",
    // Split around the inline <strong> holding the book title, which stays as
    // it is - it is the name of a published guide.
    drillBodyPart1: "Bộ câu hỏi phỏng vấn biên soạn theo chuẩn cuốn ",
    drillBookTitle: "\"400 Questions Investment Banking Interview Guide\"",
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
    livePreview: "● Đang xem Live Preview",
    tapToTry: "Bấm để xem thử",

    roadmapTab: "Lộ Trình Ôn Cấp",
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

    roadmapPanelTitle: "Lộ Trình Học Tài Chính Cá Nhân & CFA",
    roadmapPanelSub: "Thực hành Active Recall đố nhanh ngay tại chỗ",
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

    samplerLabel: "⚡ ACTIVE RECALL SAMPLER",
    samplerCounter: "Câu 1/1",
    samplerQuestion:
      "❓ Khi một doanh nghiệp có dòng tiền CFO âm liên tục 3 năm nhưng lợi nhuận ròng vẫn dương, đâu là nguyên nhân chính?",
    samplerOptionA: "Doanh nghiệp bán hàng ghi nhận doanh thu nhưng chưa thu được tiền (Phải thu tăng)",
    samplerOptionB: "Doanh nghiệp vừa nhận khoản đầu tư lớn từ cổ đông",
    samplerOptionC: "Doanh nghiệp chi trả cổ tức quá mức",
    samplerCorrect: "🎉 Chính xác! +45 XP. Dòng tiền CFO phản ánh tiền thực về két.",
    samplerWrong: "❌ Chưa chính xác. Đáp án đúng là Phải thu gia tăng mạnh!",

    deskLabel: "🛋️ BÀN HỌC 3D · TÀI CHÍNH CÁ NHÂN",
    cheerLabel: "Cổ Vũ:",
    roomLabel: "BÀN HỌC PHÒNG #102",
    roomXp: "480 / 500 XP",
    xpBonus: "⚡ +15% XP BONUS",
    // Demo learner names are left as they are - they are proper nouns. Only the
    // "(you)" marker is translated.
    youSuffix: "(Bạn)",
    memberLessons: "🔥 {count} bài",
    cheerHint: "💡 Bấm thử các nút cổ vũ phía trên để gửi tin nhắn tương tác trực tiếp!",
    chatLive: "💬 Trò chuyện nhóm Live",
    online: "Online",
    adminByline: "Tài Tài · Quản lý nhóm",
    adminMessage: "Cập nhật hôm nay: Hà Tường Vy, Hà Hồng đã học bài. Cùng cố gắng nhé!",
    chatPlaceholder: "Gửi lời chúc, hỏi bài...",

    feedPanelTitle: "FinSocial Feed Trực Tuyến",
    feedPanelSub: "Bấm thử nút Thả tim ❤️ tương tác với bài viết thực tế",
    feedCta: "Vào FinSocial Feed",
    postStats: "{comments} bình luận · {shares} chia sẻ",

    // The two demo posts. Author names and hashtags stay as they are.
    post1Time: "2 giờ trước",
    post1Topic: "Phân tích BCTC",
    post1Title: "💡 Bí quyết đọc nhanh Báo cáo lưu chuyển tiền tệ (Cash Flow) trong 5 phút",
    post1Content:
      "Nhiều bạn mới học tài chính thường bỏ qua báo cáo lưu chuyển tiền tệ mà chỉ nhìn lợi nhuận trên Báo cáo KQKD. Nhớ quy tắc: Lợi nhuận có thể là sổ sách, nhưng Dòng tiền từ HĐKD (CFO) mới là dòng máu thực sự của doanh nghiệp!",
    post2Time: "4 giờ trước",
    post2Topic: "Tài chính cá nhân",
    post2Title: "📊 Quy tắc 50/30/20 có còn phù hợp với bối cảnh lạm phát hiện tại?",
    post2Content:
      "50% Nhu cầu thiết yếu - 30% Sở thích - 20% Tiết kiệm & Đầu tư. Nếu chi phí sinh hoạt tăng cao, hãy ưu tiên cố định 20% Tiết kiệm trước (Pay Yourself First) rồi mới phân bổ 80% còn lại!",
  },

  // components/LearningAnalytics.tsx - the /analytics dashboard.
  analytics: {
    noData: "Không có dữ liệu analytics",
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
    flipToTerm: "↩ Chạm để xem thuật ngữ",
    flipToDefinition: "↪ Chạm để lật mặt sau",
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
    insufficientCash: "Không đủ sức mua tiền mặt khả dụng!",
    insufficientShares: "Số lượng cổ phiếu trong danh mục không đủ để BÁN!",
    rebalanced: "Đã tái cơ cấu đưa Quỹ về trạng thái vốn ban đầu 1 Tỷ VNĐ.",

    clanTitle: "🏛️ Wall Street Hedge Fund Clan",
    universe: "VN30 Top 30 Stocks",
    subtitle: "Mô Phỏng Quỹ Đầu Tư Cổ Phiếu Việt Nam",
    hideGuide: "Ẩn hướng dẫn",
    showGuide: "📖 Hướng dẫn cách chơi",
    advance7: "Tua +7 Ngày",
    advance30: "Tua +30 Ngày",
    rebalanceTitle: "Tái cơ cấu về 1 Tỷ VNĐ",

    guideTitle: "Hướng Dẫn Chi Tiết Cách Chơi Mô Phỏng Quỹ Đầu Tư",
    close: "✕ Đóng",
    // Each step's body wraps inline <strong> emphasis, so it is split into
    // segments rather than carrying markup through the dictionary.
    step1Title: "1️⃣ Vốn Ban Đầu 1 Tỷ",
    step1Part1: "Bạn được cấp ",
    step1Amount: "1,000,000,000 VNĐ",
    step1Part2: " tiền mặt ban đầu để đóng vai Quản lý Quỹ Hedge Fund chuyên nghiệp.",
    step2Title: "2️⃣ Mua / Bán VN30",
    step2Part1: "Chọn các mã cổ phiếu đầu ngành (",
    step2Tickers: "FPT, VNM, HPG, TCB...",
    step2Part2: ") bấm ",
    step2Part3: " giải ngân hoặc ",
    step2Part4: " chốt lời.",
    step3Title: "3️⃣ Tua Thời Gian & Tin Tức",
    step3Part1: "Bấm ",
    step3Part2: " hoặc ",
    step3Advance30Short: "+30 Ngày",
    step3Part3: " để theo dõi biến động giá cổ phiếu & phản ứng với các tin vĩ mô.",
    step4Title: "4️⃣ Đua Top BXH & Thưởng",
    step4Part1: "Tăng trưởng giá trị tổng quỹ để leo Top trên ",
    step4Board: "BXH Quỹ Server",
    step4Part2: " + tích lũy XP & Coin thưởng.",

    totalAssets: "Tổng Tài Sản Quỹ",
    currency: "VNĐ",
    percentOfFund: "% Tổng Quỹ",
    availableCash: "Tiền Mặt Khả Dụng",
    buyingPowerLeft: "Sức mua còn lại",
    stockValue: "Giá Trị Cổ Phiếu",
    holdingsCount: "{count} mã đang nắm giữ",
    simulatedTime: "Thời Gian Mô Phỏng",
    dayNumber: "Ngày thứ {day}",
    leaderboardTitle: "BXH Quỹ Mô Phỏng",
    lessonFromPortfolio: "Bài học tài chính rút ra từ danh mục của bạn:",
    allVn30: "Tất cả 30 Mã VN30",

    colTicker: "Mã CK / Doanh Nghiệp",
    colSector: "Ngành Nghề",
    colPrice: "Giá Thị Trường (VNĐ)",
    colChange: "Thay Đổi",
    colHolding: "Nắm Giữ (Cổ phiếu)",
    colPnl: "Lãi/Lỗ Tạm Tính",
    colAction: "Hành Động",
    costBasis: "Giá vốn:",
    buy: "MUA",
    sell: "BÁN",

    buyOrderTitle: "🛒 Lệnh Mua Cổ Phiếu",
    sellOrderTitle: "💰 Lệnh Bán Cổ Phiếu",
    currentPrice: "Giá hiện tại:",
    shareCount: "Số lượng cổ phiếu:",
    orderTotal: "Tổng giá trị giao dịch:",
    cashAvailable: "Tiền mặt khả dụng:",
    confirmPrefix: "Xác Nhận",
    confirmSuffix: "Cổ Phiếu",
  },

  // components/CommunityFeedClient.tsx - the FinSocial feed (/finsocial).
  feed: {
    // MarketSentimentWidget
    // TOPICS labels. `id`, `tag`, `icon` and `tone` stay in the component: the
    // hashtag is functional - getPostCategory classifies a post by looking for
    // it in the stored content - so it must never be translated.
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
    sentimentShare: "💬 Đăng nhận định",
    bullishTitle: "Biển Xanh (Bullish)",
    bullishSub: "Tích cực & Khả quan",
    bearishTitle: "Biển Đỏ (Bearish)",
    bearishSub: "Thận trọng & Quan sát",
    bullishVotes: "🐂 {count} phiếu ({percent}%)",
    bearishVotes: "🐻 {count} phiếu ({percent}%)",
    totalVotes: "Tổng số lượt vote: {count}",

    // InteractivePollCard
    pollTitle: "📊 THĂM DÒ Ý KIẾN CỘNG ĐỒNG",
    pollVoteCount: "{count} lượt bình chọn",
    pollVoted: "🎉 Đã ghi nhận bình chọn của bạn!",

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
    visibilityPublic: "🌐 Công khai",
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
    eyebrow: "Mạng Xã Hội Học Tài Chính",
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

    // Post card
    streak: "Streak",
    edited: "· đã chỉnh sửa",
    cancelEdit: "Huỷ",
    saving: "Đang lưu...",
    save: "Lưu",
    levelCertTitle: "Chứng Nhận Thăng Cấp",
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
    trendingTitle: "Đang nổi bật",
    trendingEmpty: "Chưa có bài nổi bật.",
    promptsTitle: "Gợi ý đăng bài",
    prompt1: "Hôm nay mình hiểu ra...",
    prompt2: "Mình đang kẹt ở câu hỏi...",
    prompt3: "Một mẹo học BCTC của mình là...",
    prompt4: "Ảnh thành quả/streak hôm nay:",
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
    weeklyGoalTitle: "🔮 Mục tiêu tuần",
    weeklyGoalXp: "{current} / {goal} XP",

    // Pomodoro
    pomodoroFocus: "🎯 25m",
    pomodoroBreak: "☕ 5m",
    pomodoroPause: "Tạm dừng",
    pomodoroStart: "Bắt đầu",
    breakStarted:
      "☕ Hết 25 phút học tập! Cả nhóm nghỉ giải lao 5 phút (+15 XP Tập trung nhóm)! 🎉",
    focusStarted: "🎯 Hết giờ nghỉ! Bắt đầu phiên 25 phút tập trung tiếp theo!",

    // Lofi + voice
    lofiToggleTitle: "Bật/Tắt nhạc Lofi Chill tập trung",
    lofiPlaying: "Nhạc Lofi: Đang phát",
    lofiIdle: "Nhạc Lofi Chill",
    lofiOff: "🔇 Đã tắt nhạc Focus Lofi",
    lofiFailed: "Không thể khởi chạy nhạc Lofi",
    micToggleTitle: "Bật/Tắt Micro",
    micOn: "Mic: Mở",
    micOff: "Mic: Tắt",
    leaveVoiceTitle: "Rời voice",
    leaveVoice: "Rời voice ({count})",
    autoplayBlockedTitle: "Trình duyệt đang chặn tự phát âm thanh",
    autoplayBlocked: "🔈 Bấm để nghe",
    voiceJoining: "Đang vào...",
    voiceDisabled: "Voice chưa bật",
    voiceJoin: "Vào voice",
    inVoiceTitle: "Đang ở trong voice",

    tab3d: "🛋️ Bàn 3D",
    tabChat: "💬 Chat",
    leaveRoom: "Rời phòng",

    questsTitle: "Nhiệm vụ tuần của phòng học",
    permanentGroup: "Nhóm vĩnh viễn",
    questsHint:
      "Hoàn thành 3 nhiệm vụ để mở rương nhóm. Nhắn chat, dán note, làm quiz hoặc bật Pomodoro đều được tính là hoạt động nhóm.",
    checkInNow: "👋 Bấm điểm danh ngay",
    checkedIn: "Đã điểm danh hôm nay. Tiến độ nhiệm vụ nhóm đã cập nhật!",
    questsEmpty:
      "Chưa có dữ liệu nhiệm vụ tuần. Sau khi chạy migration mới, tiến độ sẽ tự lấy từ Supabase.",

    chestOpened: "👑 Rương Đã Mở",
    chestOpening: "Đang mở...",
    chestClaim: "🎁 Nhận Rương",

    // 3D room
    modeWalk: "🚶 PHÒNG ĐI LẠI",
    modeDesk: "🌐 BÀN HỌC 3D",
    viewDesk: "🪑 Xem bàn học",
    viewWalk: "🚶 Vào phòng đi lại",
    resetViewTitle: "Đặt lại góc 3D và độ Zoom",
    resetView: "🔄 Góc & Zoom ({zoom}%)",
    cheerLabel: "Cổ vũ:",
    cheerSent: "Đã gửi lời cổ vũ đến cả nhóm! 🎉",
    cheerFailed: "Không thể gửi lời cổ vũ",
    boostAria: "Nạp năng lượng 3D Spatial Boost cho cả phòng",
    boostDone: "🔮 Đã nạp năng lượng 3D Spatial Boost cho cả phòng!",
    justJoined: "✨ Vừa vào phòng",
    levelShort: "Lv.{level}",
    memberRole: "Thành viên",
    you: " (Bạn)",
    topLessonTitle: "Top 1 bài học tuần này",
    emptySeat: "Ghế trống",
    hint3dDesktop:
      "🖐️ Kéo chuột để xoay phòng 360° · 🔍 Lăn chuột để Zoom · ⌨️ Phím mũi tên / +− / 0 · Bấm 🔄 để về góc gốc",
    hint3dMobile:
      "👉 Vuốt ngang để xoay (vẩy mạnh để quay tiếp) · vuốt dọc để cuộn trang",

    // Chat
    chatTab: "💬 Trò chuyện",
    notesTab: "📌 Ghi chú ({count})",
    quizTab: "⚡ Quiz Nhóm",
    live: "Live",
    chatCheckinHint:
      "Nhắn 1 tin nhắn bất kỳ lên chat để tự động ghi nhận điểm danh nhóm hôm nay!",
    pinnedByAdmin: "Tài Tài · Quản lý nhóm · Đã ghim",
    byAdmin: "Tài Tài · Quản lý nhóm",
    adminName: "Tài Tài",
    loadOlder: "↑ Xem tin nhắn cũ hơn",
    loadOlderFailed: "Không tải được tin nhắn cũ",
    chatEmpty: "Chưa có tin nhắn nào. Chào các thành viên trong nhóm nhé!",
    imagePlaceholder: "[Hình ảnh]",
    messageDeleted: "↩️ Tin nhắn đã bị xoá",
    messageOptionsTitle: "Tùy chọn tin nhắn",
    reply: "Trả lời tin nhắn",
    unpin: "Bỏ ghim tin nhắn",
    pin: "Ghim tin nhắn",
    copy: "Sao chép",
    copied: "Đã sao chép tin nhắn",
    copyFailed: "Không sao chép được tin nhắn",
    edit: "Sửa tin nhắn",
    edited: "Đã chỉnh sửa tin nhắn",
    recall: "Thu hồi tin nhắn",
    recalled: "Đã thu hồi tin nhắn thành công!",
    recallFailed: "Không thể thu hồi tin nhắn này",
    sendFailed: "Gửi không thành công",
    retry: "Thử lại",
    discard: "Bỏ",
    sending: "Đang gửi...",
    seen: "Đã xem",
    sent: "Đã gửi",
    newMessages: "↓ Tin nhắn mới",
    replyingTo: "💬 Đang trả lời {name}:",
    cancelReplyTitle: "Hủy trả lời",
    editingMessage: "Đang sửa tin nhắn:",
    cancelEditTitle: "Hủy sửa",
    sendAria: "Gửi tin nhắn",

    // Sticky notes
    notePlaceholder: "Dán ghi chú công thức hoặc mẹo học cho cả nhóm...",
    noteAdd: "+ Dán Ghi Chú",
    noteAdded: "Đã dán ghi chú mới lên bảng nhóm!",
    noteDeleted: "Đã xóa ghi chú",
    notesEmpty:
      "Chưa có ghi chú nào. Dán công thức, checklist hoặc câu hỏi để cả phòng cùng thấy.",
    noteAuthorYou: "Bạn",
    noteDelete: "Xóa",

    // Group quiz
    quizChallengeTitle: "⚡ THỬ THÁCH 3 PHÚT NHÓM HÔM NAY",
    quizReward: "Thưởng Rương +150 XP",
    quizHint:
      "Mỗi lần làm quiz sẽ ghi điểm từng thành viên và cộng tiến độ nhiệm vụ quiz tuần.",
    quizLoading: "Đang lấy câu hỏi cho phòng...",
    quizEmpty: "Chưa có câu hỏi phù hợp cho chủ đề này.",
    quizQuestion: "Câu {index}: {question}",
    quizSubmit: "Nộp Bài Thi Nhóm",
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
  },

  // components/JobSearchClient.tsx - the finance job map (/pho-nghe).
  // Renders twice, desktop and mobile, so several labels appear in two places
  // with different styling; they share one key.
  jobs: {
    cfaRelated: "Liên quan CFA:",

    // Career-path step copy. Four seniority bands, in a full and a compact
    // form because the desktop and mobile panels have different room.
    goalSet: "Đã đặt làm Mục tiêu",
    goalSetAction: "Đặt làm Mục tiêu sự nghiệp",
    goalSetShort: "Đã đặt Mục tiêu",
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

    radarTitle: "Biểu đồ Phẩm chất",
    radarOverlayTitle: "So sánh Phẩm chất năng lực (Overlay Radar)",
    // Axis labels on the radar chart. The short form exists because the
    // single-position chart has less room than the overlay.
    axisAnalysis: "PHÂN TÍCH",
    axisQuantShort: "Đ.LƯỢNG",
    axisQuant: "ĐỊNH LƯỢNG",
    axisCommunication: "GIAO TIẾP",
    axisCompliance: "TUÂN THỦ",

    compareTitle: "⚖️ So sánh vị trí công việc",
    compareShort: "⚖️ So sánh vị trí",
    compareShortest: "⚖️ So sánh",
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
    pageTitle: "Bản Đồ Việc Làm Tài Chính",
    walk3d: "🏙️ Đi dạo Phố nghề 3D",
    pageSubtitle:
      "Khám phá chi tiết công việc (JD), lộ trình thăng tiến sự nghiệp, yêu cầu kỹ năng và kết nối tuyển dụng trực tuyến.",

    goalChosen: "🎯 Mục tiêu sự nghiệp bạn đã chọn",
    goalOutsider: "🌱 Học viên ngoài ngành",
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
    gameBoss: "Tiến vào Vương Quốc Game - Săn Boss",
    gameSolo: "Tiến vào Vương Quốc Game - Đấu Trường Kiến Thức Solo",

    // Badge marking the current learner's own row in a leaderboard strip.
    youBadge: "Bạn",
    savedTitle: "Bài đã lưu",
    savedSubtitle: "Quay lại nhanh những bài bạn muốn đọc tiếp",

    buildingTitle: "Đang xây dựng",
    buildingSubtitle: "Bài học sắp được hoàn thiện",

    stageLockedTitle: "Chặng này bị khoá",
    stageLockedHint: "Hoàn thành chặng trước để mở",
    stageLockedBadge: "Chặng này đang bị khoá 🔒",
    unlockByChallenge: "🎯 Vượt qua thử thách kiến thức để mở khoá",
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
    libraryEnter: "Bước vào Thư viện · Phòng đọc Sài Gòn",
    librarySubtitle:
      "Không gian 3D đi lại được - ngồi vào bàn, thấy ai đang học cùng giờ với bạn",
    libraryPresence: "Thư viện là nơi duy nhất trong app có người khác đang hiện diện",
    libraryEnterCta: "Vào",

    levelMapTitle: "Bản đồ Cấp độ Học viên",
    levelMapNote:
      "XP là tiến độ học; sát hạch và điểm kiểm tra mới xác nhận năng lực thật",
    levelMembers: "Thành viên Cấp {level} - {name} ({count})",
    levelNoMembers: "Chưa có thành viên ở cấp này.",
    levelAndOthers: "và {count} người khác...",
    fightBoss: "⚔️ Đánh Boss",

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
    learnerCount: "👥 {count} người đã học",
    appeal: "Khiếu nại",
    isNew: "MỚI",

    milestone: {
      passed: "Đã vượt ải",
      certificate: "📜 Nhận Chứng Chỉ",
      awaiting: "Chờ vượt ải",
      eligible: "🏆 Đã đủ điều kiện Thi Vượt Ải {stage}",
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
      name: "Boss Bẫy Nợ Nần & Lạm Phát",
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
};

export type Dictionary = typeof vi;
