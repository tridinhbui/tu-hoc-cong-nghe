// Tên mười lăm bậc trong thang cấp. Nguồn của thang là `LEVELS` trong
// lib/levels.ts, và nó vẫn giữ `name` tiếng Việt: đó là dữ liệu cùng chỗ với
// `minXp`, `color`, `emoji`, được `recalculateUserStats` và `badges.ts` đọc như
// một bảng, không phải một chuỗi hiển thị.
//
// Nên chỗ này khoá theo SỐ CẤP chứ không theo tên. Khoá theo tên tiếng Việt thì
// đổi một chữ trong lib/levels.ts là mất bản dịch mà không có lỗi biên dịch nào
// - đúng hình dạng lỗi mà `sections` bị ghi đè trong lesson override đã gây ra
// một lần. Số cấp thì không đổi được: hạ hay nâng ngưỡng XP vẫn là cấp 7.
//
// Bậc 1-8 là thang nghề tài chính thật, dịch sát nghĩa. Bậc 9 giữ "CFA" nguyên
// vì đó là tên chứng chỉ. Bậc 10-15 là danh hiệu vui, dịch theo hình ảnh chứ
// không theo từ: "Đại Thuyền trưởng Phố Wall" thành "Wall Street Admiral" -
// "Grand Captain" đọc như lỗi dịch máy, còn hình ảnh thì vẫn là người chỉ huy
// hạm đội.
//
// Xem AGENTS.md, mục "Translating the UI".

export const levelTitlesVi = {
  levelTitles: {
    1: "Tò mò",
    2: "Học viên",
    3: "Nhà đầu tư",
    4: "Nhà phân tích",
    5: "Cố vấn Tài chính",
    6: "Thạo thủ Tài chính",
    7: "Chuyên gia Tài chính",
    8: "Bậc thầy Tài chính",
    9: "Chuyên viên CFA",
    10: "Huyền thoại Đầu tư",
    11: "Giám đốc Quỹ Hedge Fund",
    12: "Quản lý Danh mục Chiến lược",
    13: "Bậc thầy Phân tích Thị trường",
    14: "Lãnh đạo Tài chính Tối cao",
    15: "Đại Thuyền trưởng Phố Wall",
  } as Record<number, string>,
};

export const levelTitlesEn: typeof levelTitlesVi = {
  levelTitles: {
    1: "Curious",
    2: "Student",
    3: "Investor",
    4: "Analyst",
    5: "Financial Advisor",
    6: "Finance Adept",
    7: "Finance Specialist",
    8: "Finance Master",
    9: "CFA Candidate",
    10: "Investing Legend",
    11: "Hedge Fund Director",
    12: "Strategic Portfolio Manager",
    13: "Master of Market Analysis",
    14: "Supreme Finance Leader",
    15: "Wall Street Admiral",
  },
};
