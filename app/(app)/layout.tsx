import { requireUser } from "@/lib/require-user";
import AppShell from "@/components/AppShell";

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

  // Vỏ (thanh bên, popup XP, đèn tối) nằm ở components/AppShell.tsx để
  // trang công khai dùng lại được khi người xem đã đăng nhập.
  return <AppShell>{children}</AppShell>;
}
