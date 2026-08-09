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
  competencyParts: {
    accounting: "Kế toán & BCTC",
    equityPortfolio: "Cổ phiếu & danh mục",
    fixedIncome: "Trái phiếu",
    modeling: "Mô hình tài chính",
    budgeting: "Ngân sách & dự báo",
    valuationLessons: "Bài định giá",
    ma: "M&A",
    ibQuestions: "Câu hỏi IB đã làm",
    ibAccuracy: "Độ chính xác IB",
    mockInterview: "Mock interview",
    cfaLessons: "Bài thuộc 10 môn CFA",
    cfaModules: "Module CFA",
    cfaQuiz: "Quiz CFA",
    frmLessons: "Bài thuộc 10 môn FRM",
    derivativesRisk: "Phái sinh & rủi ro",
    quant: "Định lượng",
    valuation: "Định giá",
    technicalsDrilled: "Technicals đã luyện",
  } as Record<string, string>,
  competencyUnits: {
    lessons: "bài",
    questions: "câu",
    sessions: "lần",
  } as Record<string, string>,
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
  competencies: {
    finance_knowledge: {
      label: "Kiến thức tài chính",
      blurb: "Nền tảng kế toán, doanh nghiệp, cổ phiếu, trái phiếu và tài chính cá nhân",
      actionLabel: "Học tiếp bài mới",
    },
    excel_modeling: {
      blurb: "Dựng mô hình tài chính, bảng độ nhạy, ngân sách và dự báo",
      actionLabel: "Luyện mô hình",
    },
    valuation: {
      blurb: "DCF, comps, precedent transactions và báo cáo định giá",
      actionLabel: "Học bài định giá",
    },
    interview_readiness: {
      blurb: "Mức sẵn sàng cho vòng phỏng vấn technical + behavioral",
      actionLabel: "Luyện phỏng vấn",
    },
    cfa_readiness: {
      blurb: "Độ phủ 10 môn thi CFA Level I và kết quả quiz CFA",
      actionLabel: "Vào lộ trình CFA",
    },
    frm_readiness: {
      blurb: "Độ phủ 10 môn thi FRM Part I & II - đo lường và quản trị rủi ro",
      actionLabel: "Vào lộ trình FRM",
    },
    ib_readiness: {
      blurb: "Accounting - valuation - M&A - technical interview cho Investment Banking",
      actionLabel: "Luyện IB technicals",
    },
  } as Record<string, { label?: string; blurb: string; actionLabel: string }>,
};

export const badgesCompetencyEn: typeof badgesCompetencyVi = {
  competencyParts: {
    accounting: "Accounting & statements",
    equityPortfolio: "Equities & portfolios",
    fixedIncome: "Fixed income",
    modeling: "Financial modelling",
    budgeting: "Budgeting & forecasting",
    valuationLessons: "Valuation lessons",
    ma: "M&A",
    ibQuestions: "IB questions answered",
    ibAccuracy: "IB accuracy",
    mockInterview: "Mock interviews",
    cfaLessons: "Lessons across the 10 CFA subjects",
    cfaModules: "CFA modules",
    cfaQuiz: "CFA quiz",
    frmLessons: "Lessons across the 10 FRM subjects",
    derivativesRisk: "Derivatives & risk",
    quant: "Quantitative",
    valuation: "Valuation",
    technicalsDrilled: "Technicals drilled",
  },
  competencyUnits: {
    lessons: "lessons",
    questions: "questions",
    sessions: "sessions",
  },
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
  competencies: {
    finance_knowledge: {
      label: "Finance knowledge",
      blurb: "The foundations: accounting, corporates, equities, bonds and personal finance",
      actionLabel: "Continue with a new lesson",
    },
    excel_modeling: {
      blurb: "Building financial models, sensitivity tables, budgets and forecasts",
      actionLabel: "Practise modelling",
    },
    valuation: {
      blurb: "DCF, comps, precedent transactions and the valuation write-up",
      actionLabel: "Study valuation",
    },
    interview_readiness: {
      blurb: "How ready you are for the technical and behavioural rounds",
      actionLabel: "Practise interviews",
    },
    cfa_readiness: {
      blurb: "Coverage of the ten CFA Level I subjects, and your CFA quiz results",
      actionLabel: "Open the CFA path",
    },
    frm_readiness: {
      blurb: "Coverage of the ten FRM Part I & II subjects - risk measurement and management",
      actionLabel: "Open the FRM path",
    },
    ib_readiness: {
      blurb: "Accounting, valuation, M&A and technical interviews for Investment Banking",
      actionLabel: "Practise IB technicals",
    },
  },
};
