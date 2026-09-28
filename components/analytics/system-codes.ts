/* i18n-ignore-start: định danh hệ thống (đường dẫn kiểu THCN://) cho các màn
   hình cộng đồng / thống kê / hồ sơ - cùng một chuỗi ở mọi ngôn ngữ, như tên
   tệp hay đường dẫn, không phải chữ để dịch. Cùng khuôn với SYS ở
   components/home/HomePage.tsx và FLOWS_SYS ở components/learning-flows. */
export const APP_SYS = {
  leaderboard: "THCN://COMMUNITY/LEADERBOARD",
  rankings: "THCN://COMMUNITY/RANKINGS",
  feed: "THCN://COMMUNITY/FEED",
  feedRank: "THCN://COMMUNITY/TOP-XP",
  friends: "THCN://COMMUNITY/FRIENDS",
  groupChat: "THCN://COMMUNITY/GROUP-CHAT",
  adminChat: "THCN://SUPPORT/CHAT",
  analytics: "THCN://APP/ANALYTICS",
  focus: "THCN://APP/FOCUS-TIME",
  profile: "THCN://APP/PROFILE",
  settings: "THCN://APP/SETTINGS",
  learner: (id: string) => `THCN://LEARNERS/${id.slice(0, 8).toUpperCase()}`,
  notes: "THCN://APP/NOTES",
  documents: "THCN://APP/DOCUMENTS",
  rank: (n: number) => String(n).padStart(2, "0"),
};
/* i18n-ignore-end */
