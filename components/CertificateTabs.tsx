"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, ShieldAlert } from "lucide-react";
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
 *  Màu theo từng bên - hổ phách cho CFA, đỏ cho FRM - vì đó là màu hai trang
 *  ấy vốn đã dùng cho nút và huy hiệu của chúng. Một màu chung cho cả hai sẽ
 *  làm tab đang chọn trông như một trạng thái thứ ba. */
export default function CertificateTabs() {
  const { t } = useI18n();
  const pathname = usePathname();
  const p = t.certPages;

  const tabs = [
    {
      href: "/cfa",
      prefix: "/cfa",
      label: p.tabCfa,
      hint: p.tabCfaHint,
      icon: Award,
      activeClass:
        "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50/70 text-amber-900 dark:border-amber-500/60 dark:from-amber-950/50 dark:to-stone-900 dark:text-amber-200",
      iconClass: "bg-amber-500",
    },
    {
      href: "/frm",
      prefix: "/frm",
      label: p.tabFrm,
      hint: p.tabFrmHint,
      icon: ShieldAlert,
      activeClass:
        "border-red-400 bg-gradient-to-br from-red-50 to-rose-50/70 text-red-900 dark:border-red-500/60 dark:from-red-950/50 dark:to-stone-900 dark:text-red-200",
      iconClass: "bg-red-600",
    },
  ];

  return (
    <nav aria-label={p.tabsAria} className="grid grid-cols-2 gap-3">
      {tabs.map(({ href, prefix, label, hint, icon: Icon, activeClass, iconClass }) => {
        const active = pathname === prefix || pathname.startsWith(`${prefix}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-[20px] border-2 px-4 py-3.5 transition duration-200 ease-out ${
              active
                ? `${activeClass} shadow-sm`
                : "border-stone-200 bg-white text-stone-500 hover:-translate-y-0.5 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${
                active ? iconClass : "bg-stone-300 dark:bg-stone-700"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-black leading-tight">{label}</span>
              <span className="block truncate text-xs font-medium opacity-70">{hint}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
