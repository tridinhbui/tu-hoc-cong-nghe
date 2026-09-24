import HomePage from "@/components/home/HomePage";
import RedirectSignedIn from "@/components/home/RedirectSignedIn";

// Trang marketing, kết xuất TĨNH.
//
// Trước đây nó `force-dynamic` và gọi getSession() chỉ để chuyển hướng người
// đã đăng nhập sang /dashboard - nghĩa là mọi lượt xem của khách vãng lai và
// mọi lượt bot quét đều tốn một lần chạy function cộng một vòng mạng ra
// Supabase, cho một quyết định gần như luôn là "không chuyển hướng".
//
// Phép chuyển hướng đó từng nằm ở proxy.ts, chỗ đã biết sẵn câu trả lời miễn
// phí. Proxy đã đi cùng cuộc chuyển sang Workers, nên giờ nó nằm phía trình
// duyệt trong RedirectSignedIn - xem tệp đó về lý do không dùng quy tắc cookie
// trong next.config. Trang này vẫn không cần biết gì về phiên, và vẫn TĨNH.
export default function RootPage() {
  return (
    <>
      <RedirectSignedIn />
      <HomePage />
    </>
  );
}
