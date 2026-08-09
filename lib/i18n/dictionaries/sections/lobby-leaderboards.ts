// Năm bảng xếp hạng ở tầng trệt sảnh thư viện 3D
// (components/lobby/RoomFixtures.tsx). Xem AGENTS.md, mục "Translating the UI".
//
// Đơn vị tách riêng khỏi tiêu đề vì nó đứng sau một con số đã được định dạng
// theo locale: `format()` không dùng được ở đây, chuỗi được ghép trong vòng
// dựng hàng của bảng.

export const lobbyLeaderboardsVi = {
  lobbyLeaderboards: {
    xpTitle: "BXH · Điểm kinh nghiệm",
    lessonsTitle: "BXH · Số bài đã học",
    avgScoreTitle: "BXH · Điểm quiz trung bình",
    streakTitle: "BXH · Chuỗi ngày học",
    badgesTitle: "BXH · Huy hiệu",
    unitXp: "XP",
    unitLessons: "bài",
    unitStreak: "ngày",
    unitBadges: "huy hiệu",
    empty: "Chưa có ai trên bảng này",
  },
};

export const lobbyLeaderboardsEn: typeof lobbyLeaderboardsVi = {
  lobbyLeaderboards: {
    xpTitle: "Leaderboard · Experience points",
    lessonsTitle: "Leaderboard · Lessons completed",
    avgScoreTitle: "Leaderboard · Average quiz score",
    streakTitle: "Leaderboard · Learning streak",
    badgesTitle: "Leaderboard · Badges",
    unitXp: "XP",
    unitLessons: "lessons",
    unitStreak: "days",
    unitBadges: "badges",
    empty: "Nobody on this board yet",
  },
};
