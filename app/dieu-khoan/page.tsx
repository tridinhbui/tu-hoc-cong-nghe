import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Điều khoản sử dụng — Tự học Tài chính",
};

export default function TermsPage() {
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

        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">Điều khoản sử dụng</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">Cập nhật lần cuối: 2026-07-06</p>

        <div className="space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">1. Về sản phẩm này</h2>
            <p>
              Tự học Tài chính là một dự án giáo dục cá nhân, phi thương mại, được xây dựng để giúp người Việt Nam
              tiếp cận kiến thức tài chính cá nhân và tài chính chuyên ngành theo lộ trình từng ngày. Nội dung do
              một cá nhân biên soạn, không phải sản phẩm của một tổ chức tài chính, công ty tư vấn đầu tư, hay cơ
              quan được cấp phép hành nghề tư vấn tài chính.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">2. Không phải lời khuyên đầu tư</h2>
            <p>
              Toàn bộ nội dung bài học, ví dụ, số liệu minh họa trên trang này chỉ nhằm mục đích giáo dục. Đây
              không phải lời khuyên đầu tư, khuyến nghị mua/bán tài sản tài chính cụ thể, hay tư vấn thuế/pháp lý.
              Bạn tự chịu trách nhiệm với các quyết định tài chính của mình và nên tham khảo chuyên gia được cấp
              phép cho các quyết định quan trọng.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">3. Tài khoản của bạn</h2>
            <p>
              Bạn cần tạo tài khoản (qua email hoặc Google) để lưu tiến độ học tập. Bạn chịu trách nhiệm bảo mật
              thông tin đăng nhập của mình. Chúng tôi có thể tạm khóa tài khoản nếu phát hiện hành vi lạm dụng hệ
              thống (spam, cố tình khai thác lỗ hổng, v.v).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">4. Nội dung & tài liệu tải về</h2>
            <p>
              Nội dung bài học và tài liệu ở mục "Tài liệu miễn phí" được cung cấp miễn phí cho mục đích học tập cá
              nhân. Vui lòng không sao chép, phân phối lại với mục đích thương mại mà không xin phép.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">5. Giới hạn trách nhiệm</h2>
            <p>
              Sản phẩm được cung cấp "nguyên trạng", không đảm bảo không có lỗi hay luôn sẵn sàng 100% thời gian.
              Chúng tôi không chịu trách nhiệm cho các thiệt hại phát sinh từ việc sử dụng thông tin trên trang vào
              quyết định tài chính thực tế.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">6. Thay đổi điều khoản</h2>
            <p>
              Điều khoản này có thể được cập nhật khi sản phẩm phát triển thêm. Phiên bản mới nhất luôn được đăng
              tại trang này.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2">7. Liên hệ</h2>
            <p>
              Mọi câu hỏi về điều khoản sử dụng, vui lòng liên hệ{" "}
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
