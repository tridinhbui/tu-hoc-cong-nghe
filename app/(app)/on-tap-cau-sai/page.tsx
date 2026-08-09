import { Suspense } from "react";
import OnTapCauSaiClient from "./OnTapCauSaiClient";

// Vỏ tĩnh: trang này không đọc gì ở phía server - mọi dữ liệu do client
// component bên trong tự lấy từ Supabase sau khi tải. Không có `force-static`
// thì nó bị dựng lại ở server cho MỖI lượt xem, để trả về đúng một khung HTML
// không đổi.
//
// Vẫn được proxy chặn trước khi tới đây, nên tĩnh không có nghĩa là công khai.
export const dynamic = "force-static";



export default function OnTapCauSaiPage() {
  // OnTapCauSaiClient reads `?phien=sang` (the deep link in the 7:30 review
  // push) via useSearchParams, which Next requires to sit under a Suspense
  // boundary.
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
        </div>
      }
    >
      <OnTapCauSaiClient />
    </Suspense>
  );
}
