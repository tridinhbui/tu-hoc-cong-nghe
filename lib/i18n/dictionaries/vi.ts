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
};

export type Dictionary = typeof vi;
