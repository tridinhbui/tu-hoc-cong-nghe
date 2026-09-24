"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

/**
 * Người ĐÃ đăng nhập vào "/" thì đưa sang /dashboard.
 *
 * Ba chỗ đã từng giữ phép chuyển hướng này, và mỗi lần dời đi đều vì cùng một
 * sức ép - giữ trang marketing kết xuất TĨNH:
 *
 *  1. `app/page.tsx` với `force-dynamic` + getSession(). Mọi lượt khách vãng
 *     lai và mọi lượt bot quét đều tốn một function và một vòng mạng ra Supabase
 *     cho một quyết định gần như luôn là "không chuyển hướng".
 *  2. `proxy.ts`, nơi câu trả lời có sẵn miễn phí. Đó là chỗ đúng, và nó đã đi
 *     cùng proxy vì Workers không chạy được Node middleware.
 *  3. Ở đây, phía trình duyệt.
 *
 * Vì sao không đưa vào `next.config` với `has: [{ type: "cookie" }]`, thứ chạy
 * ở tầng định tuyến và không tốn gì: @supabase/ssr tách cookie phiên thành
 * `sb-<ref>-auth-token.0` và `.1` khi phiên dài quá một cookie, mà `has` chỉ
 * khớp tên CHÍNH XÁC. Quy tắc ấy sẽ chạy đúng với phần lớn người dùng và im
 * lặng bỏ sót đúng những người có phiên lớn - hỏng theo kiểu không ai báo.
 *
 * Cái giá của chỗ này là một nhịp nháy trang marketing trước khi chuyển. Đổi
 * lại "/" vẫn tĩnh và vẫn phục vụ được từ biên. Đây là đánh đổi có chủ ý, không
 * phải bỏ sót.
 */
export default function RedirectSignedIn() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    // MÃ OAUTH RƠI XUỐNG TRANG CHỦ. Supabase chỉ dùng `redirect_to` khi URL ấy
    // khớp danh sách Redirect URLs của dự án; không khớp thì nó lặng lẽ rơi về
    // "Site URL" - trang chủ - và gắn `?code=` vào đó. Không lỗi nào hiện ra,
    // chỉ là người dùng đứng ở `/?code=<uuid>` mà chưa đăng nhập.
    //
    // THỨ TỰ LÀ PHẦN DỄ HỎNG, và nó vẫn dễ hỏng ở đây: nhánh này phải chạy
    // TRƯỚC phép kiểm phiên, vì người vừa đăng nhập bằng Google chưa có phiên
    // nào cả - đó chính là thứ họ đang cố lấy. Kiểm phiên trước thì hàm thoát
    // ra ở nhánh "chưa đăng nhập" và mã không bao giờ được đổi lấy phiên.
    //
    // Vì sao ở phía trình duyệt chứ không phải `redirects()` của next.config,
    // nơi nó từng nằm và đúng ra là chỗ tốt nhất: `@opennextjs/cloudflare`
    // BỎ QUA điều kiện `has` của quy tắc chuyển hướng. Đo trực tiếp trên cùng
    // một routes-manifest: `next dev` trả 200 cho `/` và 307 cho `/?code=x`;
    // Worker trả 307 cho CẢ HAI, tức trang chủ bị đá sang /auth/callback ở mọi
    // lượt vào. Đừng đưa lại vào next.config cho tới khi adapter sửa và bạn đã
    // tự đo lại - lỗi này làm sập trang chủ chứ không phải hỏng nhẹ.
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      router.replace(`/auth/callback${window.location.search}`);
      return;
    }

    // createClient() trả về một thực thể dùng chung - xem lib/supabase.ts về lý
    // do không được tạo client mới ở mỗi component.
    createClient().auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) router.replace("/dashboard");
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
