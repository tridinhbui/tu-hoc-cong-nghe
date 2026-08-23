import { requireUserReturningTo } from "@/lib/require-user";

// Trang bài học VIẾT TAY. Next giải route tĩnh trước route động, nên trang này
// được phục vụ thay cho app/bai-hoc/[slug]/ - và do đó KHÔNG hưởng cổng đặt ở
// layout của [slug]. Không có tệp này thì nó công khai.
//
// Không có điều kiện xem thử: slug này không nằm trong PREVIEW_LESSON_SLUGS.
// Thêm một trang viết tay mới thì phải thêm layout như thế này; bài test
// lib/__tests__/route-auth-coverage.test.ts làm CI đỏ nếu quên.
export default async function HandAuthoredLessonLayout({ children }: { children: React.ReactNode }) {
  await requireUserReturningTo("/bai-hoc/nguon-luc-cho-mot-lan-ra-mat");
  return children;
}
