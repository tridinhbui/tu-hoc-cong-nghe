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
        className="p-2 border border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg transition flex-shrink-0"
      >
        <Smile className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-64 max-h-48 overflow-y-auto grid grid-cols-8 gap-1 p-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl z-10">
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
