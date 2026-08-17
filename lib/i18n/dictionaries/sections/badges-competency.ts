// Huy hiệu (`lib/badges.ts`) và bảy trục năng lực nghề nghiệp
// (`lib/career-competency.ts`), khoá theo `key` / `id`.
//
// Khoá ổn định: `badge.key` được ghi xuống bảng huy hiệu của người dùng trên
// Supabase, và `competency.id` là khoá của điểm năng lực trong
// `computeCompetencyScores`. Cả hai không đổi vì một lần sửa chữ.
//
// HUY HIỆU CẤP ĐỘ dùng lại `t.levelTitles`, không chép tên cấp vào đây: huy
// hiệu `level_2` tên là "Học viên" đúng bằng tên cấp 2 trong lib/levels.ts. Hai
// nguồn cho cùng một chuỗi thì sẽ lệch nhau, và ở đây lệch nghĩa là người học
// thấy huy hiệu tên khác với cấp mà nó vừa trao. Chỉ phần `description` -
// "Đạt level 2" - mới nằm ở đây, dưới dạng một mẫu có tham số.
//
// `label` là TUỲ CHỌN, và sáu trong bảy trục KHÔNG có nó: "Valuation",
// "Interview readiness", "CFA/FRM/IB readiness", "Excel / Modeling" vốn đã là
// tiếng Anh trong dữ liệu gốc - đó là từ nghề nghiệp người học gặp trong tin
// tuyển dụng thật. Chép chúng sang đây tạo ra một cặp giá trị giống hệt nhau
// giữa hai ngôn ngữ, mà lib/__tests__/dictionary-parity.test.ts không phân
// biệt được với một bản dịch bị bỏ quên - nó đã bắt đúng trường hợp này. Chỗ
// gọi rơi về `competency.label`.
//
// Xem AGENTS.md, mục "Translating the UI".

export const badgesCompetencyVi = {
  // Phần chi tiết dưới mỗi thanh năng lực. `computeCompetencyScores` chạy ở
  // route API rồi gửi chuỗi xuống client, nên nó gửi kèm `key` và giao diện tra
  // ở đây; `label` tiếng Việt trong lib/career-competency.ts chỉ là dự phòng.
  badgeLevelDescription: "Đạt level {level}",
  badges: {
    leaderboard_xp_top_10: {
      name: "Top 10 XP",
      description: "Lọt top 10 bảng xếp hạng XP",
    },
    leaderboard_lessons_top_10: {
      name: "Top 10 Số bài",
      description: "Lọt top 10 bảng xếp hạng số bài học",
    },
    leaderboard_avg_score_top_10: {
      name: "Top 10 Điểm TB",
      description: "Lọt top 10 bảng xếp hạng điểm trung bình",
    },
    leaderboard_streak_top_10: {
      name: "Top 10 Chuỗi ngày",
      description: "Lọt top 10 bảng xếp hạng chuỗi ngày",
    },
    career_goal_set: {
      name: "Đã đặt Mục tiêu Sự nghiệp",
      description: "Đặt một vị trí trong Bản đồ Việc làm làm mục tiêu sự nghiệp",
    },
    career_quiz_done: {
      name: "Đã hoàn thành Trắc nghiệm Hướng nghiệp",
      description: "Hoàn thành bài trắc nghiệm hướng nghiệp 5 câu hỏi",
    },
    career_path_complete: {
      name: "Hoàn thành Lộ trình Sự nghiệp",
      description: "Học xong toàn bộ bài học liên quan tới mục tiêu sự nghiệp đang theo dõi",
    },
  } as Record<string, { name: string; description: string }>,
};

export const badgesCompetencyEn: typeof badgesCompetencyVi = {
  badgeLevelDescription: "Reached level {level}",
  badges: {
    leaderboard_xp_top_10: {
      name: "Top 10 XP",
      description: "Reached the top 10 on the XP leaderboard",
    },
    leaderboard_lessons_top_10: {
      name: "Top 10 Lessons",
      description: "Reached the top 10 on the lessons-completed leaderboard",
    },
    leaderboard_avg_score_top_10: {
      name: "Top 10 Average Score",
      description: "Reached the top 10 on the average score leaderboard",
    },
    leaderboard_streak_top_10: {
      name: "Top 10 Streak",
      description: "Reached the top 10 on the streak leaderboard",
    },
    career_goal_set: {
      name: "Career Goal Set",
      description: "Set a role from the Job Map as your career goal",
    },
    career_quiz_done: {
      name: "Career Quiz Completed",
      description: "Completed the five-question career direction quiz",
    },
    career_path_complete: {
      name: "Career Path Completed",
      description: "Finished every lesson tied to the career goal you are tracking",
    },
  },
};
