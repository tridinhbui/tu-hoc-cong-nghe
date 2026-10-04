import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

/**
 * Vỏ của ứng dụng sau cửa đăng nhập: thanh bên (AppNavbar), popup XP, đèn tối.
 *
 * Chỗ DUY NHẤT dựng <AppNavbar />. Dùng ở app/(app)/layout.tsx cho mọi route
 * riêng tư, và ở những trang công khai khi người xem đã đăng nhập (ví dụ
 * /hoc-theo-nhu-cau/<flow>) - trang công khai không nằm trong nhóm (app) vì
 * khách phải mở được, nhưng người đã vào app mà tới đó mất thanh bên thì
 * không còn đường về.
 *
 * lg:pl-64 chừa chỗ cho thanh bên w-64; overflow-x-hidden chặn cuộn ngang trên
 * mobile. Xem lib/__tests__/app-shell-layout.test.ts.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  // Nền app là `bg-page` - xanh băng rất nhạt (2026-09-30, trước là trắng
  // 100%) - để thẻ trắng nổi thành lớp thay vì chìm vào một mặt trắng liền.
  // Giấy ngà chỉ dành cho trang chủ và cửa đăng nhập.
  return (
    <div className="relative isolate min-h-screen bg-page lg:pl-64 overflow-x-hidden">
      {/* Nền có màu: hai vệt xanh và một vệt hồng đỏ, cố định theo khung nhìn
          để mọi trang bớt nhợt mà không đổi chiều cao hay bố cục. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60rem_32rem_at_85%_-8%,rgba(65,122,205,0.22),transparent),radial-gradient(40rem_28rem_at_-5%_30%,rgba(244,63,94,0.10),transparent),radial-gradient(44rem_30rem_at_60%_110%,rgba(56,189,248,0.18),transparent)] dark:opacity-40"
      />
      <AppNavbar />
      <XpFloatingPopup />
      {children}
      {/* Điện thoại: nút ☰ (ConnectMenu) và avatar Cơ Cơ nổi ở góc dưới phải
          che mất phần cuối mọi trang - "0 bằng chứng", "Bảng nhìn Gọn/Đầy đủ".
          Một khoảng trống cuối trang để cuộn qua được chúng; từ lg trở lên
          nút nằm cạnh nội dung rộng nên không cần. */}
      <div aria-hidden className="h-28 lg:hidden" />
      {/* Renders nothing outside dark mode, and nothing at all until the
          learner turns a lamp on. Last in the tree so its fixed layers sit
          above page content without needing a larger z-index than the navbar. */}
      <WarmLamps />
    </div>
  );
}
