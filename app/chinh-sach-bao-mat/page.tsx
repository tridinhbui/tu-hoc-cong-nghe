import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Chính sách bảo mật - Tự học Tài chính",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại
        </Link>

        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Chính sách bảo mật</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">Cập nhật lần cuối: 2026-07-06</p>

        <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">1. Thông tin chúng tôi thu thập</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Email và tên hiển thị khi bạn đăng ký (qua email hoặc đăng nhập Google)</li>
              <li>Tiến độ học tập: bài đã hoàn thành, điểm quiz, thời gian học</li>
              <li>Nội dung bạn chủ động gửi: tin nhắn góp ý, tin nhắn chat với admin</li>
              <li>Thông tin kỹ thuật cơ bản (loại trình duyệt, thời gian truy cập) phục vụ vận hành và debug</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">2. Mục đích sử dụng</h2>
            <p>
              Thông tin trên chỉ được dùng để: vận hành tài khoản và lưu tiến độ học tập của bạn, phản hồi góp ý/hỗ
              trợ, và cải thiện nội dung bài học. Chúng tôi không bán dữ liệu cá nhân của bạn cho bên thứ ba.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">3. Nơi lưu trữ dữ liệu</h2>
            <p>
              Dữ liệu tài khoản và tiến độ học tập được lưu trữ trên hạ tầng của Supabase (nhà cung cấp cơ sở dữ
              liệu/backend). Nếu bạn đăng nhập bằng Google, một phần thông tin (tên, ảnh đại diện, email) được lấy
              từ tài khoản Google của bạn theo sự đồng ý khi đăng nhập.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">4. Quyền của bạn</h2>
            <p>
              Bạn có thể yêu cầu xem, chỉnh sửa, hoặc xóa dữ liệu tài khoản của mình bất cứ lúc nào bằng cách liên
              hệ trực tiếp qua email bên dưới. Xóa tài khoản sẽ xóa toàn bộ tiến độ học tập liên quan.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">5. Bảo mật</h2>
            <p>
              Mật khẩu được mã hóa và quản lý bởi Supabase Auth, chúng tôi không bao giờ nhìn thấy hoặc lưu trữ mật
              khẩu dạng văn bản thuần. Kết nối giữa trình duyệt và máy chủ được mã hóa qua HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">6. Liên hệ</h2>
            <p>
              Mọi câu hỏi về quyền riêng tư hoặc yêu cầu xóa dữ liệu, vui lòng liên hệ{" "}
              <a href="mailto:tribd.tec@gmail.com" className="underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100">
                tribd.tec@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
