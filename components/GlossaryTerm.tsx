"use client";

import React, { useEffect, useRef, useState } from "react";
import { findGlossaryMatches } from "@/lib/finance-glossary";
import { createClient } from "@/lib/supabase";
import { saveFlashcard } from "@/lib/supabase-flashcards";
import { toast } from "sonner";

// Dotted-underline term with a CSS-only (no JS/state needed) tooltip showing
// the English translation on hover/focus - server-renderable since it's
// plain markup, no client component required.
function GlossaryTermSpan({ term, en }: { term: string; en: string }) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  const handleSaveFlashcard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saveState === "saving" || saveState === "saved") return;
    if (!userId) {
      toast.error("Vui lòng đăng nhập để lưu thẻ!");
      return;
    }
    setSaveState("saving");
    const card = {
      term,
      definition: `Thuật ngữ tiếng Anh: ${en}. Được lưu từ bài học hệ thống.`,
      interval: 1,
      ease_factor: 2.5,
      repetitions: 0,
      next_review_at: new Date().toISOString(),
    };
    const ok = await saveFlashcard(userId, card);
    if (ok) {
      toast.success(`Đã thêm "${term}" vào Flashcards! 🗂️`);
      setSaveState("saved");
      // Keep the tooltip open a moment so the "✓ Đã lưu" confirmation is
      // actually seen at the point of interaction, instead of closing
      // immediately and relying solely on a toast the user's attention
      // (still on the mid-paragraph tooltip) may not be on.
      setTimeout(() => setOpen(false), 900);
    } else {
      setSaveState("error");
      toast.error("Không thể lưu thẻ.");
    }
  };

  return (
    <span ref={rootRef} className="relative inline-block group/term">
      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          setSaveState("idle");
        }}
        onFocus={() => {
          setOpen(true);
          setSaveState("idle");
        }}
        className="border-b border-dotted border-stone-400 dark:border-stone-500 cursor-help focus:outline-none"
      >
        {term}
      </button>
      <span className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 rounded-xl bg-stone-900 dark:bg-stone-850 text-white text-xs font-semibold p-2.5 transition-opacity z-20 shadow-lg flex flex-col items-center gap-1.5 border border-stone-800 ${
        open ? "opacity-100" : "pointer-events-none opacity-0 group-hover/term:opacity-100 group-focus-within/term:opacity-100"
      }`}>
        <span className="font-extrabold whitespace-nowrap">{en}</span>
        <button
          type="button"
          onClick={handleSaveFlashcard}
          disabled={saveState === "saving" || saveState === "saved"}
          className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded shadow-sm active:scale-95 transition-all ${
            saveState === "saved"
              ? "bg-emerald-700 text-white cursor-default"
              : saveState === "error"
                ? "bg-rose-500 hover:bg-rose-600 text-white cursor-pointer"
                : "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
          }`}
        >
          {saveState === "saving"
            ? "Đang lưu..."
            : saveState === "saved"
              ? "✓ Đã lưu"
              : saveState === "error"
                ? "⚠ Thử lại"
                : "+ 🗂️ Lưu Flashcard"}
        </button>
      </span>
    </span>
  );
}

// Splits `text` on the first occurrence of each not-yet-seen glossary term
// and wraps those with GlossaryTermSpan. `seen` should be a Set shared
// across an entire lesson body so the same term isn't highlighted twice.
export function highlightGlossaryTerms(text: string, seen: Set<string>): React.ReactNode {
  const matches = findGlossaryMatches(text, seen);
  if (matches.length === 0) return text;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, idx) => {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(
      <GlossaryTermSpan key={idx} term={text.slice(m.start, m.end)} en={m.en} />
    );
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
