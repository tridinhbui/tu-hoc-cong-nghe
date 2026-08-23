import { requireUserReturningTo } from "@/lib/require-user";
import { isPreviewLessonSlug } from "@/lib/preview-lessons";

// Cổng cho route bài học dữ liệu. Khác các cổng còn lại ở chỗ nó CÓ ĐIỀU KIỆN:
// bốn bài xem thử phải mở cho khách chưa đăng nhập, vì đó là thứ duy nhất người
// chưa có tài khoản xem được trước khi quyết định đăng ký.
//
// Danh sách trắng theo TỪNG SLUG chứ không theo tiền tố - xem lib/preview-lessons.ts.
// Đặt ở layout chứ không trong page.tsx vì layout chạy trước khi trang dựng, nên
// không có mẩu nội dung nào kịp gửi đi trước lúc chuyển hướng.
export default async function LessonRouteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isPreviewLessonSlug(slug)) {
    await requireUserReturningTo(`/bai-hoc/${slug}`);
  }
  return children;
}
