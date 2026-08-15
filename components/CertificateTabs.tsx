"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";

/** Chuyển giữa hai chứng chỉ, đặt ở đầu cả /cfa lẫn /frm.
 *
 *  VÌ SAO CÓ. Hai track này từng là hai dòng riêng trong navbar, và ai đang ở
 *  giữa trang CFA muốn xem FRM phải mở menu ra chọn lại. Navbar giờ chỉ còn một
 *  dòng "Chứng chỉ"; cặp tab này là đường đi giữa hai bên sau khi đã vào trong.
 *
 *  HAI TRANG THẬT, KHÔNG PHẢI HAI TAB TRONG MỘT TRANG. Cả hai đều là Server
 *  Component tự lấy dữ liệu riêng (CFA đọc `CFA_LEVEL_1_SUBJECTS` và tiến độ,
 *  FRM đọc bộ môn của nó), nên gộp vào một route sẽ bắt mỗi lượt vào tải cả hai
 *  bộ dữ liệu để rồi giấu đi một nửa. `<Link>` giữ nguyên hai route và Next vẫn
 *  điều hướng phía client, nên cảm giác vẫn là đổi tab.
 *
 *  KHỚP TIỀN TỐ chứ không so bằng: /cfa còn có /cfa/flashcards, /cfa/formulas,
 *  /cfa/thi-thu và /cfa/[moduleId]. Đứng ở trang công thức FRM mà tab FRM không
 *  sáng thì cặp tab này nói sai chỗ người đọc đang đứng.
 *
 *  MỘT màu nhấn, không phải màu riêng mỗi bên. Bản trước dùng hổ phách cho CFA
 *  và đỏ cho FRM, với lý lẽ rằng đó là màu hai trang ấy vốn dùng. Lý lẽ đó đúng
 *  lúc mỗi trang là một thế giới riêng, nhưng ở đây chúng là hai mục của cùng
 *  một danh sách - và hai màu mạnh cạnh nhau làm cặp tab trông như hai nút quảng
 *  cáo chứ không như một bộ chọn. Trạng thái đang chọn giờ nói bằng chữ đậm cộng
 *  một gạch chân; mục còn lại vẫn đọc được nhưng lặng.
 */
export default function CertificateTabs() {
  const { t } = useI18n();
  const pathname = usePathname();
  const p = t.certPages;

  const tabs = [
    { href: "/cfa", prefix: "/cfa", label: p.tabCfa, hint: p.tabCfaHint },
    { href: "/frm", prefix: "/frm", label: p.tabFrm, hint: p.tabFrmHint },
  ];

  return (
    <nav aria-label={p.tabsAria} className="flex items-end gap-7 border-b border-stone-200 dark:border-stone-800">
      {tabs.map(({ href, prefix, label, hint }) => {
        const active = pathname === prefix || pathname.startsWith(`${prefix}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 pb-2.5 transition-colors ${
              active
                ? "border-emerald-600 dark:border-emerald-500"
                : "border-transparent hover:border-stone-300 dark:hover:border-stone-700"
            }`}
          >
            <span
              className={`block text-sm font-black leading-tight ${
                active ? "text-stone-900 dark:text-stone-100" : "text-stone-500 dark:text-stone-400"
              }`}
            >
              {label}
            </span>
            <span className="mt-0.5 block text-[11px] text-stone-500 dark:text-stone-400">{hint}</span>
          </Link>
        );
      })}
    </nav>
  );
}
