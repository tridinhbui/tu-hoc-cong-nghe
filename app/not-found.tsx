import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sys, btnPrimary } from "@/components/ui/system";
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
/* i18n-ignore-start: định danh hệ thống, cùng một chuỗi ở mọi ngôn ngữ. */
const SYS_CODE = "THCN://404";
const SYS_STATUS = "HTTP 404";
/* i18n-ignore-end */

export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbfaf7] px-4 dark:bg-stone-950">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-2">
          <Sys className="text-ink-muted">{SYS_CODE}</Sys>
          <Sys className="text-ink-faint">{SYS_STATUS}</Sys>
        </div>
        <p className="mt-6 font-mono text-6xl font-medium tabular-nums text-ink-max">404</p>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-ink-max">{t.finalTwo.notFoundPage.title}</h1>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{t.finalTwo.notFoundPage.body}</p>
        <Link href="/dashboard" className={`${btnPrimary} mt-8`}>
          {t.finalTwo.notFoundPage.backToDashboard}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
