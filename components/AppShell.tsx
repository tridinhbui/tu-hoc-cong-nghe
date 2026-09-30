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
  // Nền TRẮNG 100% trong app (2026-09-28, theo yêu cầu chủ sản phẩm): giấy
  // ngà chỉ dành cho trang chủ và cửa đăng nhập.
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 lg:pl-64 overflow-x-hidden">
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
