"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { LessonSectionBlock } from "@/lib/lesson-types";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface LessonTableOfContentsProps {
  sections?: LessonSectionBlock[];
}

export default function LessonTableOfContents({ sections }: LessonTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!sections) return;

    const items: TocItem[] = [];
    sections.forEach((section, index) => {
      if (section.type === "heading") {
        items.push({
          id: `heading-${index}`,
          text: section.text,
          level: 1,
        });
      }
    });
    setTocItems(items);
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

  return (
    <div className="hidden xl:block sticky top-24 h-fit">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          <p className="text-xs font-extrabold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Mục lục
          </p>
        </div>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`block w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors ${
                activeId === item.id
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
