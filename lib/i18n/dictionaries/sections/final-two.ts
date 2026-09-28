// Dictionary section for the last tail of components/pages picked up in the
// i18n sweep: the reading-mode control's aria label, the
// mistake-review widget, the opening-question block, the analytics
// competency stats card, the reading-mode control, the lobby room fixtures'
// gate labels, the character
// avatar level tag, the lesson-sections concept-table default subtitle, the
// profile wall empty state, the Roadmap card title, and a handful of
// page-level titles/subtitles/metadata across app/(app)/* and app/*. See
// "Translating the UI" in AGENTS.md.

export const finalTwoVi = {
  finalTwo: {
    readingModeControlLabels: {
      readingModeAria: "Chế độ đọc: {mode}",
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
      title: "Năng lực công nghệ",
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
      districtBlurb: "Thành phố nghề công nghệ ngay ngoài cửa thư viện",
    },
    characterAvatar: {
      levelPrefix: "Lv.",
    },
    lessonSections: {
      defaultConceptTableSubtitle: "Chạm hoặc di chuột vào từng dòng",
    },
    profileWallPosts: {
      noPosts: "Người học này chưa đăng bài nào trên  the feed.",
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
    gamePage: {
      metaTitle: "Thế Giới Game Công Nghệ | Tự học Công nghệ",
      metaDescription:
        "Bản đồ thị trấn RPG Công nghệ nhập vai với các chế độ săn boss máy chủ, Bang Hội và Đấu Trường 1v1 PvP.",
      loading: "Đang tải Thế Giới Game...",
    },
    ghiChuPage: {
      title: "Ghi chú",
      subtitle: "Ghi chú theo bài học và thẻ ghi nhớ ôn tập, nằm cạnh nhau trong một khung",
      backLabel: "Quay lại",
    },
    congDongPage: {
      metaTitle: "Thư viện cộng đồng",
      metaDescription: "Bước vào phòng đọc 3D giữa Sài Gòn cùng những người đang học khác.",
    },
    loiNhanPage: {
      metaTitle: "Góc yên tĩnh",
      metaDescription: "Lời nhắn hôm nay, một phút thở, và một góc nhìn khác cho những nỗi lo khi học và làm nghề.",
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
    readingModeControlLabels: {
      readingModeAria: "Reading mode: {mode}",
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
      title: "Technology competency",
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
      districtBlurb: "The technology career city just outside the library door",
    },
    characterAvatar: {
      levelPrefix: "Lv.",
    },
    lessonSections: {
      defaultConceptTableSubtitle: "Tap or hover over each row",
    },
    profileWallPosts: {
      noPosts: "This learner hasn't posted anything on the feed yet.",
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
    gamePage: {
      metaTitle: "Tech Game World | Learn Technology",
      metaDescription:
        "An RPG town map with Server Boss Hunt, Guild, and 1v1 PvP Arena modes for technology role-play.",
      loading: "Loading the Game World...",
    },
    ghiChuPage: {
      title: "Notes",
      subtitle: "Lesson notes and review flashcards, side by side in one panel",
      backLabel: "Back",
    },
    congDongPage: {
      metaTitle: "Community library",
      metaDescription: "Step into a 3D reading room set in Saigon, alongside other people currently studying.",
    },
    loiNhanPage: {
      metaTitle: "Quiet corner",
      metaDescription: "Today's message, a minute to breathe, and a different perspective on the worries that come with learning and working in tech.",
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
      metaTitle: "Privacy Policy - Learn Technology",
    },
    termsPage: {
      metaTitle: "Terms of Use - Learn Technology",
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
