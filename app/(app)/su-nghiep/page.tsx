import { redirect } from "next/navigation";

// Trang này đã được gộp vào /nghe-nghiep-hoc ("Học theo nghề"): chọn nghề ở
// trên, toàn bộ nội dung sự nghiệp nằm ngay bên dưới, cùng một trang.
//
// Giữ lại đúng cú chuyển hướng chứ không xoá route: đường dẫn này nằm trong
// menu cũ, trong lịch sử trình duyệt của người học, và trong các liên kết rải
// khắp app (thẻ nghề nghiệp ở dashboard, chân trang, thông báo). Xoá hẳn là
// biến tất cả những chỗ đó thành 404.
export default function SuNghiepPage() {
  redirect("/nghe-nghiep-hoc");
}
