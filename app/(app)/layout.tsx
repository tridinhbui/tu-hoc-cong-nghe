import { requireUser } from "@/lib/require-user";
import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default async function AppShellLayout({ children }: { children: React.ReactNode }) {
  // Cổng xác thực cho toàn bộ 19 route trong nhóm này. Trước đây `proxy.ts` gác
  // hộ bằng một cổng mặc-định-từ-chối phủ cả ứng dụng; nó phải đi vì Workers
  // chưa chạy được Node middleware, thứ mà Next 16 bắt buộc với tệp Proxy.
  //
  // Đặt ở layout chứ không ở từng trang: một trang mới thêm vào nhóm này được
  // gác ngay, không phải chờ ai nhớ. Đó là phần tính mặc-định-từ-chối giữ lại
  // được ở cấp nhóm; phần ở cấp ứng dụng do route-auth-coverage.test.ts gác.
  await requireUser();

  // Giấy ngà #fbfaf7, cùng đúng giá trị `.band-paper` dùng ở trang chủ và
  // Bảng tin - KHÔNG phải bg-white.
  //
  // Đây là đường nối rõ nhất giữa trang giới thiệu và sản phẩm: bên ngoài là
  // giấy ngà ấm, bước qua cửa đăng nhập thì thành trắng tinh, và mắt đọc ra
  // hai sản phẩm khác nhau trước khi kịp đọc chữ nào.
  //
  // Đặt màu thẳng thay vì gắn lớp `.band`: lớp đó dựng pseudo-element và ép
  // `position: relative` lên mọi con trực tiếp, thứ không nên áp lên một khung
  // bố cục có thanh bên cố định. Ở đây chỉ cần MÀU.
  //
  // Các thẻ bên trong vẫn `bg-white`, và trên nền ngà chúng nổi lên thành mặt
  // giấy trắng - độ sâu có được từ sắc độ chứ không từ đổ bóng.
  return (
    <div className="min-h-screen bg-[#fbfaf7] dark:bg-stone-950 lg:pl-64 overflow-x-hidden">
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
