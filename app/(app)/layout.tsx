import { requireUser } from "@/lib/require-user";
import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default async function AppShellLayout({ children }: { children: React.ReactNode }) {
  // Cổng xác thực cho toàn bộ route trong nhóm này. Trước đây `proxy.ts` gác
  // hộ bằng một cổng mặc-định-từ-chối phủ cả ứng dụng; nó phải đi vì Workers
  // chưa chạy được Node middleware, thứ mà Next 16 bắt buộc với tệp Proxy.
  //
  // Từng bị gỡ ở bfee4b0 để build không phụ thuộc biến môi trường của hệ cũ -
  // cái giá là 19 route riêng tư thành công khai. Giờ requireUser() đọc phiên
  // D1 qua cookie (lib/auth/current-user.ts), không còn phụ thuộc gì bên ngoài,
  // nên cổng quay lại.
  await requireUser();

  // Nền TRẮNG 100% trong app (2026-09-28, theo yêu cầu chủ sản phẩm): giấy
  // ngà chỉ dành cho trang chủ và cửa đăng nhập. Phần còn lại của ngôn ngữ
  // biên tập - nét mực, góc vuông, xanh brand làm tín hiệu - vẫn đi theo
  // token trong app/globals.css, nên đi qua cửa đăng nhập vẫn là một sản phẩm.
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 lg:pl-64 overflow-x-hidden">
      <AppNavbar />
      <XpFloatingPopup />
      {children}
      {/* Renders nothing outside dark mode, and nothing at all until the
          learner turns a lamp on. Last in the tree so its fixed layers sit
          above page content without needing a larger z-index than the navbar. */}
      <WarmLamps />
    </div>
  );
}
