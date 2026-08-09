import { NextResponse } from "next/server";
import { getLessonsMeta } from "@/lib/lessons-loader";

// Public, unauthenticated endpoint backing the homepage hero's live lesson
// count - reads the same generated lesson index the dashboard uses, so it
// always reflects the real current lesson count (no manual copy update
// needed when lessons are added/removed). No user data involved, so no
// auth check needed here.
// Con số này chỉ đổi khi deploy: nó đếm chính tệp chỉ mục sinh ra lúc build.
// Nhưng trước đây route chạy động, nên MỌI lượt vào trang chủ - kể cả bot -
// là một lần chạy function để trả về đúng một số nguyên không đổi.
//
// `force-static` đưa nó về CDN; `revalidate` là hàng rào cho trường hợp chỉ
// mục đổi mà không qua một lần build mới.
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const lessons = await getLessonsMeta();
  return NextResponse.json({ count: lessons.length });
}
