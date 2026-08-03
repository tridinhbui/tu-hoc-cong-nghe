import type { FinanceCareer } from "@/lib/finance-careers";

/** Năm nhóm ngành, tên hiển thị và thứ tự.
 *
 *  Trước đây danh sách này nằm bên trong JobSearchClient, nên bất cứ màn hình
 *  nào khác muốn gọi tên một nhóm ngành đều phải chép lại - và một bản chép là
 *  một cơ hội để hai nơi gọi cùng một nhóm bằng hai cái tên. Kiểu Record buộc
 *  mọi nhóm mới khai trong FinanceCareer["category"] phải có tên ở đây, nếu
 *  không thì lỗi biên dịch chứ không phải một ô trống trên giao diện. */

export type CareerCategory = FinanceCareer["category"];

export const CAREER_CATEGORY_LABELS: Record<CareerCategory, string> = {
  investment: "Đầu tư & Nghiên cứu",
  accounting: "Kế toán & Kiểm soát",
  banking: "Ngân hàng & Nguồn vốn",
  advisory: "Dịch vụ & Tư vấn",
  data: "Dữ liệu & Công nghệ",
};

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
export const CAREER_CATEGORY_BLURBS: Record<CareerCategory, string> = {
  investment: "Định giá, chọn cổ phiếu, quản lý danh mục",
  banking: "Thu xếp vốn, tín dụng, nguồn vốn ngân hàng",
  advisory: "Tư vấn khách hàng, hoạch định tài chính",
  accounting: "Ghi nhận, kiểm toán, kiểm soát nội bộ",
  data: "Mô hình, dữ liệu và công nghệ tài chính",
};

/** Chuỗi này có phải một nhóm ngành không.
 *
 *  Cần thiết khi id phòng trong thế giới 3D là hợp của nhiều loại (phố, tháp,
 *  tầng, nhóm ngành): so sánh bằng `in` trên Record cho TypeScript thu hẹp kiểu
 *  đúng chỗ, thay vì ép kiểu và mất luôn lá chắn. */
export function isCareerCategory(id: string): id is CareerCategory {
  return id in CAREER_CATEGORY_LABELS;
}
