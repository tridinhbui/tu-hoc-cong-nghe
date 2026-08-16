import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  // Giấy ngà #fbfaf7, cùng đúng giá trị `.band-paper` dùng ở trang chủ và
  // FinSocial - KHÔNG phải bg-white.
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
