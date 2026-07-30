// Vietnamese is the source dictionary: it defines the shape every other
// locale must satisfy (see en.ts, which is typed as `Dictionary` so a missing
// key is a compile error rather than a blank label in production).
//
// Scope note: this covers UI chrome only. Lesson content (~3M characters of
// Vietnamese finance material in lib/lessons-data) is deliberately NOT
// translated - machine-translating specialised finance pedagogy would produce
// confidently wrong teaching material. `content.viOnlyNotice` is what an
// English reader sees instead.

export const vi = {
  nav: {
    students: "Học viên",
    quiz: "Kiểm tra",
    notes: "Ghi chú",
    studyGroup: "Học nhóm",
    technicalInterview: "Phỏng vấn kỹ thuật",
    career: "Sự nghiệp",
    stats: "Thống kê",
    openMenu: "Mở menu",
    user: "Người dùng",
    signOut: "Đăng xuất",
    signingOut: "Đang đăng xuất...",
    coinBalanceTitle: "Số dư Coin tích lũy - Bấm để mở Cửa hàng Nhanh",
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
