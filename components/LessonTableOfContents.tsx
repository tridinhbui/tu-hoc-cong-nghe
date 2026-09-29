"use client";

import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";
import { useI18n } from "@/lib/i18n/context";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface LessonTableOfContentsProps {
  sections?: LessonSectionBlock[];
}

export default function LessonTableOfContents({ sections }: LessonTableOfContentsProps) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string>("");

  // Suy ra trong lúc render thay vì state + effect: mục lục là một hàm thuần
  // của `sections`, không có gì bất đồng bộ. Bản cũ vẽ một lượt với mục lục
  // RỖNG rồi mới điền - và vì `if (tocItems.length < 3) return null` ngay dưới,
  // lượt đầu tiên đó luôn trả null, nên mục lục nhấp nháy vào chỗ trống ở mỗi
  // lần mở bài.
  const tocItems = useMemo<TocItem[]>(() => {
    if (!sections) return [];
    return sections.flatMap((section, index) =>
      section.type === "heading"
        ? [{ id: `heading-${index}`, text: section.text, level: 1 }]
        : []
    );
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length < 3) return null; // Only show TOC if there are at least 3 headings

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mục đang đọc là thứ duy nhất có màu; mục đã qua lùi về chữ thường nhạt,
  // mục phía sau xám hơn nữa - mắt tìm thấy "mình đang ở đâu" trước tiên.
  const activeIndex = tocItems.findIndex((item) => item.id === activeId);

  return (
    <div className="hidden xl:block sticky top-24 h-fit">
      <div className="pl-1">
        <div className="flex items-center gap-2 mb-3">
          <List className="w-3.5 h-3.5 text-ink-faint" />
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-faint">
            {t.miscUi.lessonTableOfContents.title}
          </p>
        </div>
        <nav className="space-y-0.5 border-l border-line">
          {tocItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = activeIndex >= 0 && index < activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px block w-full border-l-2 py-1.5 pl-3 pr-2 text-left text-xs leading-5 transition-colors ${
                  isActive
                    ? "border-brand-600 font-bold text-accent-strong dark:border-brand-400"
                    : isPast
                      ? "border-transparent font-medium text-ink-muted hover:text-ink"
                      : "border-transparent font-medium text-ink-faint hover:text-ink"
                }`}
              >
                {item.text}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
