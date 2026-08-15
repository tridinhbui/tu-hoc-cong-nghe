import AppNavbar from "@/components/AppNavbar";
import WarmLamps from "@/components/WarmLamps";
import XpFloatingPopup from "@/components/XpFloatingPopup";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  // Nền trắng, theo yêu cầu trực tiếp.
  //
  // Chỗ này từng là giấy ngà #fbfaf7 - cùng giá trị `.band-paper` của trang chủ
  // và FinSocial - và lý lẽ khi ấy là giữ một mạch màu liền từ trang giới thiệu
  // sang sản phẩm, để bước qua cửa đăng nhập không thấy như đổi sang một sản
  // phẩm khác. Lý lẽ đó không sai, nó chỉ không phải lựa chọn được giữ.
  //
  // Hệ quả cần biết trước khi ai đó đổi tiếp: nền ngà từng là thứ TÁCH các thẻ
  // `bg-white` bên trong ra khỏi nền, tức chiều sâu đến từ sắc độ chứ không từ
  // đổ bóng. Với nền trắng thì thẻ trắng nằm trên nền trắng, và ranh giới của
  // chúng CHỈ còn nhờ đường viền. Nên nếu sau này có ai bỏ viền của thẻ cho
  // "phẳng hơn", các thẻ sẽ tan vào nền - đừng bỏ viền mà không thay bằng một
  // cách phân tách khác.
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
