import Link from "next/link";
import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";

// Ngôn ngữ mặc định, KHÔNG đọc cookie - cùng lập luận mà `generateMetadata`
// trong app/layout.tsx đã ghi, chỉ là chưa từng áp cho file này.
//
// `not-found.tsx` ở gốc nằm trong cây của root layout, nên nó chạm `cookies()`
// là kéo cả "/" và "/_not-found" sang kết xuất động. Đo được: gỡ
// `force-dynamic` khỏi app/page.tsx xong "/" VẪN động, và dòng này là thứ còn
// lại giữ nó.
//
// Cái giá là trang 404 luôn tiếng Việt. Chấp nhận được, và cùng mức chấp nhận
// mà tiêu đề trang đã chọn: đây là ngôn ngữ nguồn của toàn bộ nội dung, còn
// trang chủ tĩnh thì mọi khách vãng lai và mọi lượt bot đều được hưởng.
export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-sm">
        <p className="text-6xl font-extrabold text-stone-900 dark:text-stone-100">404</p>
        <div className="space-y-2">
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{t.finalTwo.notFoundPage.title}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.finalTwo.notFoundPage.body}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-block bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          {t.finalTwo.notFoundPage.backToDashboard}
        </Link>
      </div>
    </div>
  );
}
