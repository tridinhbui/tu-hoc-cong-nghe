// Dictionary section for the last tail of components/pages picked up in the
// i18n sweep: CFA item-set practice, the financial guild trading widget, the
// mistake-review widget, the opening-question block, the analytics
// competency stats card, the reading-mode control, the lobby room fixtures'
// gate labels, the CFA content renderer's YouTube embed title, the character
// avatar level tag, the lesson-sections concept-table default subtitle, the
// profile wall empty state, the Roadmap card title, and a handful of
// page-level titles/subtitles/metadata across app/(app)/* and app/*. See
// "Translating the UI" in AGENTS.md.

export const finalTwoVi = {
  finalTwo: {
    cfaItemSetPractice: {
      optionsAria: "Các lựa chọn cho câu {index}",
      readingModeAria: "Chế độ đọc: {mode}",
      scenarioLabel: "Tình huống · {topic}",
      title: "Luyện item set - dạng đề Level II",
      subtitle:
        "Mỗi bộ là một tình huống dài kèm bốn câu hỏi cùng dựa vào nó. Tình huống cố ý chứa nhiều dữ kiện hơn số cần dùng - chọn đúng số là một nửa bài thi. Không tính điểm và không lưu lại: bốn câu không nói được gì về mức sẵn sàng thi.",
      emptyHint: "Chọn một môn ở trên để mở tình huống.",
    },
    financialGuildWidget: {
      advancedDays: "📈 Đã tua +{numDays} ngày giao dịch thị trường!",
      boughtShares: "Đã MUA {shares} cổ phiếu {ticker} tại giá {price} VNĐ",
      soldProfit: "Đã BÁN {shares} {ticker}. Lãi thực tế: +{pnl} VNĐ! 🎉",
      soldLoss: "Đã BÁN {shares} {ticker}. Lỗ thực tế: {pnl} VNĐ!",
    },
    mistakeReviewWidget: {
      title: "Câu sai cần ôn tập",
      countSuffix: "{count} câu",
      body: "Bạn có {count} câu hỏi trắc nghiệm đã làm sai cần ôn lại để củng cố kiến thức.",
    },
    openingQuestionBlock: {
      header: "Bắt đầu bằng một câu hỏi",
      confirmButton: "Xác nhận câu trả lời",
      correctFeedback: "Đúng rồi!",
      incorrectFeedback: "Chưa đúng - nhưng không sao!",
    },
    competencyStatsSection: {
      loading: "Đang tải...",
      failed: "Không tải được dữ liệu năng lực.",
      title: "Năng lực tài chính",
      lessonsCompletedSuffix: "{count} bài đã hoàn thành",
    },
    readingModeControl: {
      light: "Sáng",
      sepia: "Dịu nhẹ",
      dark: "Tối",
    },
    roomFixturesGates: {
      studyLabel: "Bước qua cổng → vào Nhóm học",
      districtLabel: "Bước qua cổng → ra Phố nghề",
      // Cùng cặp `x` / `xShort`: nhãn dài là lời mời hiện khi ĐANG đứng trước
      // cổng, nên nó phải nói ra hành động. Bảng chỉ đường đã có tiêu đề "Cổng
      // ở tầng trệt" ngay trên, nên nhắc lại "bước qua cổng" ở mỗi dòng là
      // thừa - ở đó chỉ cần tên nơi đến, kèm một dòng mô tả cho cân với tám
      // phòng học phía trên.
      studyShort: "Nhóm học",
      studyBlurb: "Phòng học chung, ngồi cùng bạn bè theo thời gian thực",
      districtShort: "Phố nghề",
      districtBlurb: "Thành phố nghề tài chính ngay ngoài cửa thư viện",
    },
    cfaContentRenderer: {
      youtubeTitle: "YouTube video",
    },
    financeCharacterAvatar: {
      levelPrefix: "Lv.",
    },
    lessonSections: {
      defaultConceptTableSubtitle: "Chạm hoặc di chuột vào từng dòng",
    },
    profileWallPosts: {
      noPosts: "Người học này chưa đăng bài nào trên FinSocial.",
    },
    roadmap: {
      title: "Roadmap",
    },
    analyticsPage: {
      loadingAnalytics: "Đang tải phân tích học tập...",
      loading: "Đang tải...",
      backToDashboard: "← Quay lại Dashboard",
      statsAndLeaderboard: "Thống kê & BXH",
    },
    phongVanKyThuatDifficulty: {
      fullMixedDrill: "Full mixed drill",
      foundationScreen: "Foundation screen",
      analystRound: "Analyst round",
      pressureRound: "Pressure round",
    },
    cfaPage: {
      backToDashboardAria: "Về Dashboard",
      title: "Chứng chỉ công nghệ",
      subtitle: "CFA Level I - 10 môn thi chính thức",
    },
    gamePage: {
      metaTitle: "Thế Giới Game Tài Chính | TuHocTaiChinh.org",
      metaDescription:
        "Bản đồ thị trấn RPG Tài chính nhập vai với các chế độ săn boss máy chủ, Bang Hội và Đấu Trường 1v1 PvP.",
      loading: "Đang tải Thế Giới Game...",
    },
    ghiChuPage: {
      title: "Ghi chú",
      subtitle: "Ghi chú theo bài học và thẻ ghi nhớ ôn tập, nằm cạnh nhau trong một khung",
      backLabel: "Quay lại",
    },
    cfaThiThuPage: {
      metaTitle: "Thi thử CFA Level I",
      metaDescription:
        "Bài thi thử đúng khuôn đề thật: 180 câu, hai ca 135 phút, ba lựa chọn mỗi câu, chấm điểm tách theo từng môn.",
    },
    congDongPage: {
      metaTitle: "Thư viện cộng đồng",
      metaDescription: "Bước vào phòng đọc 3D giữa Sài Gòn cùng những người đang học khác.",
    },
    frmThiThuPage: {
      metaTitle: "Thi thử FRM",
      metaDescription:
        "Bài thi thử đúng khuôn đề GARP: Part I 100 câu, Part II 80 câu, mỗi phần một ca 4 tiếng, chấm điểm tách theo từng môn.",
    },
    loiNhanPage: {
      metaTitle: "Góc yên tĩnh",
      metaDescription: "Lời nhắn hôm nay, một phút thở, và một góc nhìn khác cho những nỗi lo về tiền.",
    },
    notFoundPage: {
      title: "Không tìm thấy trang này",
      body: "Trang bạn tìm không tồn tại, hoặc đường dẫn bài học đã thay đổi.",
      backToDashboard: "Về Dashboard",
    },
    rootLayout: {
      siteTitle: "Tự học Công nghệ Mỗi Ngày",
    },
    privacyPolicyPage: {
      metaTitle: "Chính sách bảo mật - Tự học Công nghệ",
    },
    termsPage: {
      metaTitle: "Điều khoản sử dụng - Tự học Công nghệ",
    },
    uistatsPreview: {
      sidebarTrueLabel: "sidebar=true (screenshot case)",
      sidebarFalseLabel: "sidebar=false",
      maxLevelLabel: "max level",
    },
    logo: {
      productName: "Tự Học Công Nghệ",
    },
  },
};

export const finalTwoEn: typeof finalTwoVi = {
  finalTwo: {
    cfaItemSetPractice: {
      optionsAria: "Options for question {index}",
      readingModeAria: "Reading mode: {mode}",
      scenarioLabel: "Scenario · {topic}",
      title: "Item set practice - Level II style",
      subtitle:
        "Each set is one long vignette with four questions that all rely on it. The vignette deliberately holds more data than any single question needs - picking the right numbers is half the exam. Unscored and not saved: four questions say nothing about exam readiness.",
      emptyHint: "Pick a subject above to open a vignette.",
    },
    financialGuildWidget: {
      advancedDays: "📈 Advanced +{numDays} market trading day(s)!",
      boughtShares: "BOUGHT {shares} shares of {ticker} at {price} VND",
      soldProfit: "SOLD {shares} {ticker}. Realized gain: +{pnl} VND! 🎉",
      soldLoss: "SOLD {shares} {ticker}. Realized loss: {pnl} VND!",
    },
    mistakeReviewWidget: {
      title: "Mistakes to review",
      countSuffix: "{count} question(s)",
      body: "You have {count} quiz question(s) answered incorrectly that need review to reinforce your understanding.",
    },
    openingQuestionBlock: {
      header: "Start with a question",
      confirmButton: "Confirm answer",
      correctFeedback: "That's right!",
      incorrectFeedback: "Not quite - but that's okay!",
    },
    competencyStatsSection: {
      loading: "Loading...",
      failed: "Couldn't load competency data.",
      title: "Financial competency",
      lessonsCompletedSuffix: "{count} lesson(s) completed",
    },
    readingModeControl: {
      light: "Light",
      sepia: "Sepia",
      dark: "Dark",
    },
    roomFixturesGates: {
      studyLabel: "Step through the gate → to Study Group",
      districtLabel: "Step through the gate → to the Career District",
      studyShort: "Study Group",
      studyBlurb: "A shared study room, sitting with your friends in real time",
      districtShort: "Career District",
      districtBlurb: "The finance career city just outside the library door",
    },
    cfaContentRenderer: {
      youtubeTitle: "YouTube video",
    },
    financeCharacterAvatar: {
      levelPrefix: "Lv.",
    },
    lessonSections: {
      defaultConceptTableSubtitle: "Tap or hover over each row",
    },
    profileWallPosts: {
      noPosts: "This learner hasn't posted anything on FinSocial yet.",
    },
    roadmap: {
      title: "Roadmap",
    },
    analyticsPage: {
      loadingAnalytics: "Loading learning analytics...",
      loading: "Loading...",
      backToDashboard: "← Back to Dashboard",
      statsAndLeaderboard: "Stats & Leaderboard",
    },
    phongVanKyThuatDifficulty: {
      fullMixedDrill: "Full mixed drill",
      foundationScreen: "Foundation screen",
      analystRound: "Analyst round",
      pressureRound: "Pressure round",
    },
    cfaPage: {
      backToDashboardAria: "Back to Dashboard",
      title: "Certificate track",
      subtitle: "CFA Level I - 10 official exam topics",
    },
    gamePage: {
      metaTitle: "Financial Game World | TuHocTaiChinh.org",
      metaDescription:
        "An RPG town map with Server Boss Hunt, Guild, and 1v1 PvP Arena modes for finance role-play.",
      loading: "Loading the Game World...",
    },
    ghiChuPage: {
      title: "Notes",
      subtitle: "Lesson notes and review flashcards, side by side in one panel",
      backLabel: "Back",
    },
    cfaThiThuPage: {
      metaTitle: "CFA Level I mock exam",
      metaDescription:
        "A mock exam matching the real format: 180 questions, two 135-minute sessions, three options per question, scored separately by topic.",
    },
    congDongPage: {
      metaTitle: "Community library",
      metaDescription: "Step into a 3D reading room set in Saigon, alongside other people currently studying.",
    },
    frmThiThuPage: {
      metaTitle: "FRM mock exam",
      metaDescription:
        "A mock exam matching the real GARP format: Part I 100 questions, Part II 80 questions, one 4-hour session each, scored separately by topic.",
    },
    loiNhanPage: {
      metaTitle: "Quiet corner",
      metaDescription: "Today's message, a minute to breathe, and a different perspective on money worries.",
    },
    notFoundPage: {
      title: "Page not found",
      body: "The page you're looking for doesn't exist, or the lesson link has changed.",
      backToDashboard: "Back to Dashboard",
    },
    rootLayout: {
      siteTitle: "Learn Technology Every Day",
    },
    privacyPolicyPage: {
      metaTitle: "Privacy Policy - Learn Finance",
    },
    termsPage: {
      metaTitle: "Terms of Use - Learn Finance",
    },
    uistatsPreview: {
      sidebarTrueLabel: "sidebar=true (screenshot case)",
      sidebarFalseLabel: "sidebar=false",
      maxLevelLabel: "max level",
    },
    logo: {
      productName: "Tự Học Công Nghệ",
    },
  },
};
