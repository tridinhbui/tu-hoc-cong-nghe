import HomePage from "@/components/home/HomePage";

// Trang marketing, kết xuất TĨNH.
//
// Trước đây nó `force-dynamic` và gọi getSession() chỉ để chuyển hướng người
// đã đăng nhập sang /dashboard - nghĩa là mọi lượt xem của khách vãng lai và
// mọi lượt bot quét đều tốn một lần chạy function cộng một vòng mạng ra
// Supabase, cho một quyết định gần như luôn là "không chuyển hướng".
//
// Phép chuyển hướng đó nay nằm ở proxy.ts, chỗ đã biết sẵn câu trả lời:
// request không mang cookie phiên thì thoát sớm, request có cookie thì
// `getUser()` vốn đã chạy. Trang này vì thế không cần biết gì về phiên nữa.
export default function RootPage() {
  return <HomePage />;
}
