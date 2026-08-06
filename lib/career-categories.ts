import type { FinanceCareer } from "@/lib/finance-careers";

/** Năm nhóm ngành, tên hiển thị và thứ tự.
 *
 *  Trước đây danh sách này nằm bên trong JobSearchClient, nên bất cứ màn hình
 *  nào khác muốn gọi tên một nhóm ngành đều phải chép lại - và một bản chép là
 *  một cơ hội để hai nơi gọi cùng một nhóm bằng hai cái tên. Kiểu Record buộc
 *  mọi nhóm mới khai trong FinanceCareer["category"] phải có tên ở đây, nếu
 *  không thì lỗi biên dịch chứ không phải một ô trống trên giao diện. */

export type CareerCategory = FinanceCareer["category"];

/** Tên năm nhóm ngành, đọc từ từ điển.
 *
 *  Là HÀM chứ không phải hằng số vì câu chữ phải theo ngôn ngữ đang chọn -
 *  cùng khuôn với districtRoomsOf(t). Thứ tự và MÀU thì vẫn là hằng số ở dưới:
 *  chúng là cấu trúc, không phải câu chữ, và một bảng màu đổi theo ngôn ngữ là
 *  thứ không ai muốn gỡ về sau. */
export function careerCategoryLabelsOf(
  t: { careerCategories: { labels: Record<CareerCategory, string> } }
): Record<CareerCategory, string> {
  return t.careerCategories.labels;
}

/** Thứ tự trưng bày, cũng là thứ tự các căn nhà dọc phố nghề. */
export const CAREER_CATEGORY_ORDER: CareerCategory[] = [
  "investment",
  "banking",
  "advisory",
  "accounting",
  "data",
];

/** Màu nhận dạng của từng nhóm: biển hiệu ngoài phố, đèn trong phòng và thẻ
 *  giới thiệu đều lấy ở đây, để đi từ ngoài vào trong vẫn thấy cùng một màu. */
export const CAREER_CATEGORY_COLORS: Record<CareerCategory, string> = {
  investment: "#5eead4",
  banking: "#93c5fd",
  advisory: "#fdba74",
  accounting: "#c4b5fd",
  data: "#f0abfc",
};

/** Một dòng nói nhóm ngành này làm gì, cho biển hiệu ngoài cửa. */
export function careerCategoryBlurbsOf(
  t: { careerCategories: { blurbs: Record<CareerCategory, string> } }
): Record<CareerCategory, string> {
  return t.careerCategories.blurbs;
}

const CAREER_CATEGORY_SET: ReadonlySet<string> = new Set(CAREER_CATEGORY_ORDER);

/** Chuỗi này có phải một nhóm ngành không.
 *
 *  Cần thiết khi id phòng trong thế giới 3D là hợp của nhiều loại (phố, tháp,
 *  tầng, nhóm ngành): hàm này cho TypeScript thu hẹp kiểu đúng chỗ, thay vì ép
 *  kiểu và mất luôn lá chắn.
 *
 *  Dùng Set chứ KHÔNG dùng `id in RECORD`. Hai lý do, và cả hai đều thật:
 *
 *  1. `in` đi cả chuỗi nguyên mẫu, nên isCareerCategory("constructor") và
 *     ("toString") trả về true - đúng lỗ đã bắt được ở proxy.ts khi kiểm tham
 *     số ?phong=. Ở đây nó nghĩa là một id phòng bịa ra có thể lọt qua lá chắn
 *     kiểu rồi đi thẳng vào chỗ chờ một nhóm ngành.
 *  2. Bản cũ kiểm trên BẢNG NHÃN, tức một phép kiểm cấu trúc đọc dữ liệu câu
 *     chữ. Giờ nhãn đi theo ngôn ngữ đang chọn, nên nếu để nguyên thì lá chắn
 *     kiểu sẽ phụ thuộc vào từ điển. */
export function isCareerCategory(id: string): id is CareerCategory {
  return CAREER_CATEGORY_SET.has(id);
}
