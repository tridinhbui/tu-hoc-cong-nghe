import { FINANCE_CAREERS, type FinanceCareer } from "@/lib/finance-careers";
import type { CareerCoverage } from "@/lib/ib-question-careers";
import { CAREER_CATEGORY_ORDER, type CareerCategory } from "@/lib/career-categories";

/** Sắp xếp bộ chọn vị trí ở /phong-van-ky-thuat.
 *
 *  Trang đó dựng 45 nút lọc trên một hàng cuộn dài - "Tất cả" cộng 44 nghề,
 *  xếp thuần theo số câu - và đó là thứ đầu tiên người dùng gặp. Hai vấn đề đo
 *  được, cả hai đều không phải chuyện thẩm mỹ:
 *
 *  1. MỘT NÚT KHÔNG LỌC GÌ. Kho technical có 276 câu, và `investment-banking`
 *     cũng có đúng 276 - vì kho này VỐN là bộ câu hỏi Ngân hàng Đầu tư. Nên
 *     "Ngân hàng Đầu tư · 276" và "Tất cả · 276" cho ra cùng một tập. Người
 *     dùng thấy hai lựa chọn và thực tế có một.
 *
 *  2. ĐUÔI DÀI KHÔNG QUÉT ĐƯỢC. 19 trong 44 nghề có từ 10 câu trở xuống, và
 *     phần cuối danh sách là một dãy 10, 10, 9, 9, 8 không có cấu trúc nào để
 *     mắt bám vào.
 *
 *  Gom theo đúng năm nhóm nghề mà /nghe-nghiep-hoc đã dùng, từ cùng một nguồn
 *  `FINANCE_CAREERS`, nên hai màn hình không thể lệch nhau. */

// `CareerCategory` từng được KHAI BÁO LẠI ở đây trong khi đầu tệp đã import
// nó, và xung đột ấy làm đỏ `tsc` của cả kho.
//
// Hai định nghĩa giống hệt nhau (`FinanceCareer["category"]`) nên chỉ cần một
// nguồn: lib/career-categories.ts. Nhưng KHÔNG xoá hẳn được. Phép grep đầu
// tiên của tôi tìm `CareerCategory ... from "@/lib/ib-career-picker"` trên
// MỘT dòng và báo không ai dùng, trong khi phong-van-ky-thuat/page.tsx import
// nó qua một câu import nhiều dòng - xoá xong tsc đỏ ngay ở đúng chỗ đó.
//
// Nên tái xuất: một nguồn sự thật, mà bề mặt công khai của tệp không đổi.
export type { CareerCategory };

// Đọc THẲNG thứ tự nhóm ngành từ lib/career-categories.ts, không giữ bản chép.
//
// Chỗ này từng là một mảng khai tay, kèm đúng lời cảnh báo rằng nó là
// `readonly CareerCategory[]` chứ không phải Record - nên thiếu một nhóm KHÔNG
// gây lỗi biên dịch, chỉ lặng lẽ làm mọi nghề nhóm ấy biến mất khỏi bộ chọn.
// Lượt tách 5 nhóm thành 7 đã rơi vào bẫy đó một lần (11 nghề mất hút), và lượt
// thêm bảy nhóm này rơi vào đúng bẫy ấy lần thứ hai - cùng một bài kiểm bắt
// được, cùng một cách sửa.
//
// Lần này sửa bằng cách bỏ bản chép đi. Bẫy chỉ tồn tại chừng nào còn hai danh
// sách; một danh sách thì không có gì để lệch.
export const PICKER_CATEGORY_ORDER: readonly CareerCategory[] = CAREER_CATEGORY_ORDER;

export interface CoverageGroup<T extends CareerCoverage = CareerCoverage> {
  category: CareerCategory;
  careers: T[];
}

/**
 * Bỏ những nghề mà chọn chúng cũng ra đúng cả kho.
 *
 * Generic chứ không nhận thẳng `CareerCoverage[]`: trang gọi nó đã gắn thêm
 * `title` đã dịch vào từng phần tử, và một chữ ký thu hẹp về kiểu gốc sẽ vứt
 * trường đó đi ngay tại biên.
 *
 * Không nhắm vào một id cụ thể: luật là "lọc mà không lọc được gì thì không
 * phải một bộ lọc". Nếu sau này kho được mở rộng và Ngân hàng Đầu tư thôi bằng
 * 100%, nút của nó tự quay lại mà không ai phải nhớ gỡ dòng loại trừ.
 */
export function withoutWholeBankCareers<T extends CareerCoverage>(
  coverage: readonly T[],
  totalQuestions: number
): T[] {
  if (totalQuestions <= 0) return [...coverage];
  return coverage.filter((c) => c.questionCount < totalQuestions);
}

/**
 * Gom theo nhóm nghề, giữ nguyên thứ tự nhóm và thứ tự nghề bên trong nhóm.
 *
 * Nhóm không còn nghề nào thì không xuất hiện - một tiêu đề nhóm trống chỉ tốn
 * thêm một dòng để người đọc phải bỏ qua.
 */
export function groupCoverageByCategory<T extends CareerCoverage>(
  coverage: readonly T[]
): CoverageGroup<T>[] {
  const categoryOf = new Map(FINANCE_CAREERS.map((c) => [c.id, c.category]));

  const groups: CoverageGroup<T>[] = [];
  for (const category of PICKER_CATEGORY_ORDER) {
    const careers = coverage.filter((c) => categoryOf.get(c.careerId) === category);
    if (careers.length > 0) groups.push({ category, careers });
  }
  return groups;
}
