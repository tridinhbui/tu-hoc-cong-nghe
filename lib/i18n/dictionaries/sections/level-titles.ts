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
// Bậc 1-8 là thang nghề kỹ sư phần mềm thật, dịch sát nghĩa. Bậc 9 giữ "AWS" nguyên
// vì đó là tên chứng chỉ. Bậc 10-15 là danh hiệu vui, dịch theo hình ảnh chứ
// không theo từ: "Đại thuyền trưởng Silicon Valley" thành "Silicon Valley Admiral" -
// "Grand Captain" đọc như lỗi dịch máy, còn hình ảnh thì vẫn là người chỉ huy
// hạm đội.
//
// Xem AGENTS.md, mục "Translating the UI".

export const levelTitlesVi = {
  levelTitles: {
    1: "Tò mò",
    2: "Học viên",
    3: "Lập trình viên tập sự",
    4: "Kỹ sư phần mềm",
    5: "Kỹ sư chính",
    6: "Kỹ sư cao cấp",
    7: "Chuyên gia hệ thống",
    8: "Kiến trúc sư phần mềm",
    9: "Ứng viên chứng chỉ AWS",
    10: "Huyền thoại mã nguồn mở",
    11: "Giám đốc kỹ thuật",
    12: "Kiến trúc sư trưởng nền tảng",
    13: "Bậc thầy thiết kế hệ thống",
    14: "Lãnh đạo công nghệ tối cao",
    15: "Đại thuyền trưởng Silicon Valley",
  } as Record<number, string>,
};

export const levelTitlesEn: typeof levelTitlesVi = {
  levelTitles: {
    1: "Curious",
    2: "Student",
    3: "Junior Developer",
    4: "Software Engineer",
    5: "Senior Engineer",
    6: "Staff Engineer",
    7: "Systems Specialist",
    8: "Software Architect",
    9: "AWS Certification Candidate",
    10: "Open Source Legend",
    11: "Engineering Director",
    12: "Chief Platform Architect",
    13: "Master of System Design",
    14: "Supreme Technology Leader",
    15: "Silicon Valley Admiral",
  },
};
