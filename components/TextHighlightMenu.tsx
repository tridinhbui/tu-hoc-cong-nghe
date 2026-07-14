"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { toast } from "sonner";
import { Highlighter, Flag } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { createHighlight, type LessonHighlight } from "@/lib/lesson-highlights";

interface TextHighlightMenuProps {
  containerRef: RefObject<HTMLElement | null>;
  lessonId: number;
  lessonSlug: string;
  onCreated: (highlight: LessonHighlight) => void;
}

const MIN_SELECTION_LENGTH = 3;
const MAX_SELECTION_LENGTH = 1000;

// Right-click a selected passage inside the lesson article to either
// highlight it (personal "important" marker, rendered yellow) or flag it as
// suspected AI-generated content. Quote-based, not DOM-range-based - lesson
// content is rendered by two different pipelines (data-driven sections vs.
// freeform case-study JSX), so "the exact text that was selected" is the
// only anchor that works across both without brittle position bookkeeping.
export default function TextHighlightMenu({ containerRef, lessonId, lessonSlug, onCreated }: TextHighlightMenuProps) {
  const [menu, setMenu] = useState<{ x: number; y: number; quote: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleContextMenu(e: MouseEvent) {
      const selection = window.getSelection();
      const quote = selection?.toString().trim() ?? "";
      if (!quote || quote.length < MIN_SELECTION_LENGTH) return;
      if (!container!.contains(selection!.anchorNode)) return;

      e.preventDefault();
      setMenu({
        x: Math.min(e.clientX, window.innerWidth - 260),
        y: e.clientY,
        quote: quote.slice(0, MAX_SELECTION_LENGTH),
      });
    }

    function handleClickAway(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    }

    container.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClickAway);
    document.addEventListener("scroll", () => setMenu(null), { passive: true });
    return () => {
      container.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClickAway);
    };
  }, [containerRef]);

  async function handleChoose(kind: "important" | "ai_flag") {
    if (!menu || saving) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Bạn cần đăng nhập để đánh dấu đoạn văn.");
        return;
      }
      const highlight = await createHighlight(user.id, lessonId, lessonSlug, menu.quote, kind);
      onCreated(highlight);
      toast.success(kind === "important" ? "Đã đánh dấu quan trọng" : "Đã báo đoạn này - cảm ơn bạn!");
    } catch (error) {
      console.error("Error saving highlight:", error);
      toast.error("Không thể lưu. Vui lòng thử lại.");
    } finally {
      setSaving(false);
      setMenu(null);
      window.getSelection()?.removeAllRanges();
    }
  }

  if (!menu) return null;

  return (
    <div
      ref={menuRef}
      style={{ position: "fixed", left: menu.x, top: menu.y, zIndex: 200 }}
      className="w-60 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xl overflow-hidden"
    >
      <button
        type="button"
        disabled={saving}
        onClick={() => handleChoose("important")}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-amber-950/30 disabled:opacity-50 transition-colors"
      >
        <Highlighter className="w-4 h-4 text-amber-500 flex-shrink-0" />
        Đánh dấu quan trọng
      </button>
      <button
        type="button"
        disabled={saving}
        onClick={() => handleChoose("ai_flag")}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-50 transition-colors border-t border-stone-100 dark:border-stone-800"
      >
        <Flag className="w-4 h-4 text-rose-500 flex-shrink-0" />
        Báo đoạn này do AI viết
      </button>
    </div>
  );
}
