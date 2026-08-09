import type { Locale } from "@/lib/i18n/locales";

/** Chỉ cần hai trường này, nên nhận cả `FinanceCareer` lẫn bản rút gọn. */
type TitledCareer = { title: string; englishTitle: string };

// KHÔNG DÙNG CHO CODE MỚI. Đường chính thức để lấy chữ của một nghề là
// `mergeCareer(career, locale)` / `mergeCareers(...)` trong
// lib/finance-careers-i18n - nó dịch cả 16 trường (`summary`,
// `responsibilities`, `dayInLife`, `pros`, `cons`, …), còn hai hàm ở đây chỉ
// chạm tới cái tên.
//
// Hai hàm này ra đời trước `finance-careers-i18n` và hiện chỉ còn
// components/JobSearchClient.tsx dùng, ở 27 chỗ. Trong tệp đó danh sách nghề đã
// đi qua `mergeCareers`, nên `career.title` vốn đã là tiếng Anh và
// `careerTitle` trả về đúng chuỗi ấy qua `englishTitle` - trùng lặp chứ không
// sai. Bốn component còn lại (CareerGoalWidget, CareerRoadmapMap,
// CareerLearningPathClient, CareerProfilePanel) đã chuyển sang `mergeCareer`.
//
// Cách gỡ hẳn: thay 27 chỗ trong JobSearchClient bằng `career.title` /
// `career.englishTitle` rồi xoá tệp này.
export function careerTitle(career: TitledCareer, locale: Locale): string {
  return locale === "en" ? career.englishTitle : career.title;
}

// Cặp tên/phụ đề phải xử lý cùng nhau: ở tiếng Việt là "Kiểm toán viên" to và
// "Auditor" nhỏ bên dưới; nếu tiếng Anh in cả hai thì thành "Auditor" hai lần
// chồng nhau. Trả về null để chỗ gọi bỏ hẳn dòng phụ.
export function careerSubtitle(career: TitledCareer, locale: Locale): string | null {
  return locale === "en" ? null : career.englishTitle;
}
