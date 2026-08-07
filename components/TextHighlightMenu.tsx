"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { toast } from "sonner";
import { Highlighter, Flag, Check, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { createHighlight, type LessonHighlight } from "@/lib/lesson-highlights";
import { useI18n } from "@/lib/i18n/context";

interface TextHighlightMenuProps {
  containerRef: RefObject<HTMLElement | null>;
  lessonId: number;
  lessonSlug: string;
  onCreated: (highlight: LessonHighlight) => void;
}

const MIN_SELECTION_LENGTH = 3;

/** Khoảng hở giữa menu và mép vùng bôi đen, tính bằng px. Đủ để không dính vào
 *  chữ, không đủ để chuột đi lạc ra ngoài trên đường tới nút. */
const MENU_GAP = 10;

/** Cần bấy nhiêu chỗ phía trên vùng chọn thì mới mở menu lên trên; ít hơn thì
 *  lật xuống dưới. Đây là ƯỚC LƯỢNG và chỉ dùng để chọn hướng - vị trí chính
 *  xác do translateY(-100%) lo, nên ước lượng sai thì cùng lắm là menu mở phía
 *  bên kia, vẫn dùng được. */
const MENU_CLEARANCE = 170;
const MAX_SELECTION_LENGTH = 1000;

export default function TextHighlightMenu({ containerRef, lessonId, lessonSlug, onCreated }: TextHighlightMenuProps) {
  const { t } = useI18n();
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    quote: string;
    isRightClick: boolean;
    /** "above" đặt đáy menu ở trên y, "below" đặt đỉnh menu ở dưới y. */
    place: "above" | "below";
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openTimeRef = useRef<number>(0);

  useEffect(() => {
    // 1. Show menu on Right-Click contextmenu
    function handleContextMenu(e: MouseEvent) {
      const selection = window.getSelection();
      const quote = selection?.toString().trim() ?? "";
      if (!quote || quote.length < MIN_SELECTION_LENGTH) return;

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      e.preventDefault();
      setMenu({
        x: Math.max(10, Math.min(e.clientX, window.innerWidth - 270)),
        y: Math.max(10, Math.min(e.clientY, window.innerHeight - 130)),
        quote: quote.slice(0, MAX_SELECTION_LENGTH),
        isRightClick: true,
        // Chuột phải: menu mở ngay dưới con trỏ, đúng quy ước menu ngữ cảnh.
        place: "below",
      });
      openTimeRef.current = Date.now();
    }

    // 2. Show floating menu on MouseUp (Left-click selection release)
    function handleMouseUp(e: MouseEvent) {
      // Ignore if clicking inside our own highlight menu
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        return;
      }

      setTimeout(() => {
        const selection = window.getSelection();
        const quote = selection?.toString().trim() ?? "";
        if (!quote || quote.length < MIN_SELECTION_LENGTH) return;

        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            // Menu phải nằm HẲN ngoài vùng bôi đen.
            //
            // Bản trước đặt đỉnh menu ở `rect.top - 58` và chú thích là "float
            // comfortably above selection", nhưng menu cao hơn 58px nên nó phủ
            // lên chính đoạn vừa bôi đen và mấy dòng dưới - người đọc bấm
            // trúng nút trong khi tưởng mình đang bấm vào chữ, nên có ghi chú
            // và báo cáo ở những chỗ không định làm.
            //
            // Không đoán chiều cao menu: đặt `y` ở mép vùng chọn rồi để CSS
            // `translateY(-100%)` tự đẩy menu lên đúng bằng chiều cao thật của
            // nó. Một hằng số chiều cao sẽ sai lại ngay lần đổi nội dung menu.
            const above = rect.top > MENU_CLEARANCE;
            setMenu({
              x: Math.max(10, Math.min(rect.left + rect.width / 2, window.innerWidth - 10)),
              y: above ? rect.top - MENU_GAP : rect.bottom + MENU_GAP,
              quote: quote.slice(0, MAX_SELECTION_LENGTH),
              isRightClick: false,
              place: above ? "above" : "below",
            });
            openTimeRef.current = Date.now();
          }
        }
      }, 50);
    }

    // 3. Stably close menu on outside pointerdown ONLY after grace period (350ms)
    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (Date.now() - openTimeRef.current < 350) return;

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  async function handleChoose(kind: "important" | "ai_flag") {
    if (!menu || saving) return;
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(t.textHighlight.needLogin);
        return;
      }
      const highlight = await createHighlight(user.id, lessonId, lessonSlug, menu.quote, kind);
      onCreated(highlight);
      toast.success(kind === "important" ? t.textHighlight.savedImportant : t.textHighlight.savedFlag);
    } catch (error) {
      console.error("Error saving highlight:", error);
      toast.error(t.textHighlight.saveFailed);
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
      style={{
        position: "fixed",
        left: menu.x,
        top: menu.y,
        // Căn giữa theo chiều ngang bằng translate thay vì trừ tay nửa chiều
        // rộng: bản trước trừ 120 trong khi menu rộng 256 (w-64), nên nó lệch
        // 8px và lệch thêm nữa nếu ai đổi w-64.
        transform: menu.isRightClick
          ? undefined
          : `translate(-50%, ${menu.place === "above" ? "-100%" : "0"})`,
        zIndex: 9999,
      }}
      className="w-64 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-2xl overflow-hidden p-1.5 animate-in fade-in zoom-in-95 duration-150 select-none"
    >
      <div className="px-3 py-1.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {t.textHighlight.title}
        </span>
        <span className="text-[9px] text-stone-400 font-medium">
          {menu.quote.length} {t.textHighlight.characters}
        </span>
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={() => void handleChoose("important")}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-stone-900 dark:text-stone-100 hover:bg-amber-50 dark:hover:bg-amber-950/40 disabled:opacity-50 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
            <Highlighter className="w-3.5 h-3.5" />
          </div>
          <span>{t.textHighlight.highlight}</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-amber-400" />
      </button>

      <button
        type="button"
        disabled={saving}
        onClick={() => void handleChoose("ai_flag")}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-50 transition-all cursor-pointer group mt-0.5"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
            <Flag className="w-3.5 h-3.5" />
          </div>
          <span>{t.textHighlight.reportAi}</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-rose-400" />
      </button>
    </div>
  );
}
