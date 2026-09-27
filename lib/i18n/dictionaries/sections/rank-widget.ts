/** Bảng xếp hạng thu nhỏ ở cột phải dashboard (components/DashboardLeaderboardCard.tsx)
 *  và dòng "vị trí của bạn" dùng chung cho mọi bảng xếp hạng (components/leaderboard/MyRankRow.tsx). */
export const rankWidgetVi = {
  rankWidget: {
    title: "Bảng xếp hạng",
    tabComposite: "Tổng hợp",
    tabXp: "XP",
    tabStreak: "Chuỗi ngày",
    tabLessons: "Số bài",
    tabAvg: "Điểm TB",
    period7: "7 ngày",
    period30: "30 ngày",
    periodAll: "Tất cả",
    you: "Bạn",
    unranked: "Chưa có hạng",
    unrankedHint: "Học xong một bài để có tên trên bảng",
    viewAll: "Xem bảng đầy đủ",
    empty: "Chưa có ai trên bảng.",
    loading: "Đang tải bảng xếp hạng...",
  },
};

export const rankWidgetEn: typeof rankWidgetVi = {
  rankWidget: {
    title: "Leaderboard",
    tabComposite: "Overall",
    tabXp: "XP",
    tabStreak: "Streak",
    tabLessons: "Lessons",
    tabAvg: "Avg score",
    period7: "7 days",
    period30: "30 days",
    periodAll: "All time",
    you: "You",
    unranked: "Not ranked yet",
    unrankedHint: "Finish one lesson to get on the board",
    viewAll: "View full leaderboard",
    empty: "No one on the board yet.",
    loading: "Loading leaderboard...",
  },
};
