import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * Cổng xác thực phía máy chủ cho một nhánh route.
 *
 * Trước đây việc này do `proxy.ts` làm cho TOÀN BỘ ứng dụng bằng một cổng
 * mặc-định-từ-chối: mọi đường dẫn cần phiên đăng nhập trừ danh sách trắng, nên
 * một trang mới thêm vào là riêng tư ngay, không phải chờ ai nhớ gắn phép kiểm.
 *
 * Proxy phải đi vì Next 16 chạy nó ở runtime Node - `runtime` không phải tuỳ
 * chọn trong tệp Proxy và đặt nó sẽ ném lỗi - còn Workers thì chưa chạy được
 * Node middleware. Đây không phải hạ cấp: tài liệu của chính Next khuyến nghị
 * "always verify authentication and authorization inside each Server Function
 * rather than relying on Proxy alone", vì một thay đổi matcher hay một lần dời
 * Server Function sang route khác có thể lặng lẽ gỡ mất lớp phủ của proxy.
 *
 * Cái MẤT khi bỏ proxy là tính mặc-định-từ-chối: một route mới nằm ngoài mọi
 * layout có cổng sẽ công khai trở lại, đúng lỗi mà proxy sinh ra để chặn. Bù
 * lại bằng `lib/__tests__/route-auth-coverage.test.ts`, bài test bắt CI đỏ khi
 * có route cấp một không nằm trong danh sách công khai cũng không nằm dưới một
 * layout có cổng. Danh sách ở đó là bản dịch một-đối-một của PUBLIC_PATHS và
 * PUBLIC_PREFIXES trong proxy.ts cũ.
 */
export async function requireUser() {
  const supabase = await createServerSupabaseClient();

  // getUser() chứ không phải getSession(): getSession() chỉ đọc cookie và tin
  // những gì đọc được, nên một cookie bịa ra cũng qua được. getUser() hỏi
  // Supabase để xác thực chữ ký. Ở một cổng thì phải là getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return user;
}

/**
 * Như trên nhưng giữ lại đường dẫn đang tới, để sau khi đăng nhập quay về đúng
 * chỗ. Proxy cũ gắn `?next=<pathname>` vào /login và trang đăng nhập đọc nó.
 */
export async function requireUserReturningTo(pathname: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const next = encodeURIComponent(pathname);
    redirect(`/login?next=${next}`);
  }
  return user;
}
