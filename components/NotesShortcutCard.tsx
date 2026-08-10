"use client";

import Link from "next/link";
import { ChevronDown, StickyNote } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useCollapsibleCard } from "@/lib/use-collapsible-card";

/** Lối vào sổ tay, đứng cạnh LearningPathSummary trên /hoc-bai.
 *
 *  VÌ SAO Ở ĐÂY CHỨ KHÔNG Ở NAVBAR. Ghi chú là việc làm TRONG lúc học, ngay sau
 *  khi hiểu ra một điều - không phải một đích đến người ta chọn từ menu trước
 *  khi bắt đầu. Một dòng menu đặt nó ngang hàng với Thống kê và Tài liệu, tức
 *  ngang hàng với những thứ ghé lại sau; đặt cạnh lộ trình thì nó nằm đúng chỗ
 *  mắt đang nhìn lúc chuẩn bị vào bài.
 *
 *  KHÔNG TRUY VẤN GÌ. Thẻ này cố ý không đếm số ghi chú: nó nằm trên màn hình
 *  mà mọi lượt tải đều dựng, nên một truy vấn ở đây là một truy vấn nhân với
 *  toàn bộ lưu lượng /hoc-bai - cùng lý lẽ mà chú thích của LearningPathSummary
 *  dùng để từ chối tự lấy dữ liệu. Con số ghi chú không đổi được quyết định
 *  "có mở sổ tay hay không", nên nó không đáng một vòng mạng.
 *
 *  VÙNG BẤM VẪN LÀ TOÀN BỘ THẺ, nhưng cách dựng đã đổi. Trước đây cả thẻ là một
 *  thẻ <Link>; giờ có thêm nút gấp/mở, mà một <button> nằm trong <a> vừa là
 *  HTML không hợp lệ vừa khiến mọi cú bấm vào nút cũng điều hướng luôn. Nên
 *  <Link> trở thành một lớp phủ `absolute inset-0` nằm TRÊN phần chữ - chữ vốn
 *  không bấm được nên bị phủ cũng không mất gì - còn nút gấp đứng ở lớp cao hơn
 *  để thoát khỏi lớp phủ đó. Đây là lý do thứ tự z ở dưới không phải tuỳ tiện:
 *  đổi nó là hoặc mất vùng bấm của thẻ, hoặc mất cái nút. */
export default function NotesShortcutCard() {
  const { t } = useI18n();
  const p = t.learningPath;

  const { collapsed, hydrated, toggle } = useCollapsibleCard("thtcdn:card-collapsed:notes");

  return (
    <div className="group relative flex h-full flex-col rounded-[24px] border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50/60 p-4 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-amber-500/70 sm:p-5 dark:border-amber-500/40 dark:from-amber-950/30 dark:to-stone-900">
      <Link href="/ghi-chu" aria-label={p.notesTitle} className="absolute inset-0 z-10 rounded-[24px]" />

      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
          <StickyNote className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-400">
            {p.notesEyebrow}
          </p>
          <h2 className="mt-0.5 text-lg font-black text-stone-900 dark:text-stone-100">{p.notesTitle}</h2>

          {/* Cùng cách gấp với LearningPathSummary - xem chú thích ở đó về lý do
              dùng grid-rows thay cho max-height. */}
          <div
            className={`grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
              collapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="mt-1.5 text-sm font-medium text-stone-600 dark:text-stone-300">{p.notesHint}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          title={collapsed ? p.cardExpand : p.cardCollapse}
          aria-label={collapsed ? p.cardExpand : p.cardCollapse}
          className="relative z-20 -mr-1 -mt-1 shrink-0 cursor-pointer rounded-xl p-1.5 text-amber-700 transition hover:bg-amber-500/10 dark:text-amber-400"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "-rotate-90" : ""}`} />
        </button>
      </div>

      <div
        className={`grid ${hydrated ? "transition-all duration-200 ease-out" : ""} ${
          collapsed ? "mt-0 grid-rows-[0fr] opacity-0" : "mt-auto grid-rows-[1fr] opacity-100"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <span className="block pt-3 text-sm font-black text-amber-700 group-hover:underline dark:text-amber-400">
            {p.notesCta}
          </span>
        </div>
      </div>
    </div>
  );
}
