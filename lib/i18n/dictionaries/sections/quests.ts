// Bảy nhiệm vụ hằng ngày, khoá theo `id` - cùng `id` mà `lib/supabase-quests.ts`
// dùng để ghi tiến độ, nên nó ổn định theo đúng nghĩa cần thiết ở đây.
//
// Chuỗi của chúng nằm trong THÂN HÀM `getDailyQuests()` chứ không phải một
// `const` ở đầu tệp, nên luật `[data]` của scripts/i18n-coverage.mjs không thấy:
// `node scripts/i18n-coverage.mjs lib/supabase-quests.ts` báo 0 trong khi bảy
// nhiệm vụ hiện tiếng Việt trên dashboard. Đó là điểm mù thứ ba mà AGENTS.md đã
// đoán trước ("display strings that pass through a local variable"), và nó có
// thật - không tìm ra bằng thước đo, tìm ra bằng ảnh chụp màn hình.
//
// Tên khoá là `questCopy` chứ không phải `dailyQuests`: khoá kia đã thuộc về
// phần chữ của giao diện widget (nút nhận thưởng, thông báo). Trùng tên thì
// spread trong sections/index.ts sẽ nuốt gọn một trong hai, im lặng.
//
// Xem AGENTS.md, mục "Translating the UI".

export const questsVi = {
  questCopy: {
    daily_1: { title: "Khởi động ngày mới", description: "Hoàn thành 1 bài học bất kỳ" },
    daily_study_group: {
      title: "Điểm danh Học Nhóm",
      description: "Vào học nhóm & gửi 1 tin nhắn check-in hôm nay",
    },
    daily_2: { title: "Thạo thủ trò chơi", description: "Chơi ít nhất 1 ván mini game bất kỳ" },
    daily_3: { title: "Trí tuệ hoàn hảo", description: "Đạt điểm số 100% trong bất kỳ mini game nào" },
    daily_4: { title: "Đăng nhập mỗi ngày", description: "Ghé thăm nền tảng hôm nay" },
    daily_focus: {
      title: "Ngồi học trong thành phố",
      description: "Ngồi học 15 phút ở thư viện hoặc phòng nhóm 3D",
    },
    daily_game: {
      title: "Khám phá Vương Quốc Game",
      description: "Tiến vào thế giới Game Tài Chính hôm nay",
    },
  } as Record<string, { title: string; description: string }>,
};

export const questsEn: typeof questsVi = {
  questCopy: {
    daily_1: { title: "Start the day", description: "Finish any one lesson" },
    daily_study_group: {
      title: "Check in with your study group",
      description: "Join a study group and post one check-in message today",
    },
    daily_2: { title: "Game handler", description: "Play at least one round of any mini game" },
    daily_3: { title: "Flawless run", description: "Score 100% in any mini game" },
    daily_4: { title: "Daily sign-in", description: "Visit the platform today" },
    daily_focus: {
      title: "Study in the city",
      description: "Sit and study for 15 minutes in the 3D library or a group room",
    },
    daily_game: {
      title: "Explore the Game Kingdom",
      description: "Step into the Finance Game world today",
    },
  },
};
