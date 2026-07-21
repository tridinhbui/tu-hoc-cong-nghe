"use client";

import { useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";

const EMOJIS = [
  "😀", "😂", "😊", "😍", "🥰", "😎", "🤔", "😅",
  "😢", "😭", "😡", "🙏", "👍", "👎", "👏", "🙌",
  "💪", "🔥", "✨", "🎉", "❤️", "💯", "✅", "❌",
  "📈", "📉", "💰", "💸", "🏦", "🚀", "⚠️", "❓",
];

export default function EmojiPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Chọn emoji"
        className="p-2 border border-stone-105 dark:border-stone-850/50 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-xl transition flex-shrink-0 active:scale-95"
      >
        <Smile className="w-4.5 h-4.5" />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-64 max-h-48 overflow-y-auto grid grid-cols-8 gap-1 p-2 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl shadow-xl z-20">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                onSelect(emoji);
                setOpen(false);
              }}
              className="text-lg hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md p-1 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
