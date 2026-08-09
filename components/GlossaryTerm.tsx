"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { findGlossaryMatches } from "@/lib/finance-glossary";
import { createClient } from "@/lib/supabase";
import { saveFlashcard, getFlashcards } from "@/lib/supabase-flashcards";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

// Global cache of saved terms for the active user to avoid redundant fetches
let cachedSavedTerms: Set<string> | null = null;
let activeUserId: string | null = null;

async function checkIsTermSaved(userId: string, term: string): Promise<boolean> {
  if (activeUserId !== userId || !cachedSavedTerms) {
    activeUserId = userId;
    const cards = await getFlashcards(userId).catch(() => []);
    cachedSavedTerms = new Set(cards.map((c) => c.term));
  }
  return cachedSavedTerms.has(term);
}

function updateSavedTermCache(userId: string, term: string) {
  if (activeUserId !== userId) {
    activeUserId = userId;
    cachedSavedTerms = new Set([term]);
  } else if (cachedSavedTerms) {
    cachedSavedTerms.add(term);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("thtcdn:flashcards-updated", { detail: { term } }));
  }
}

// Dotted-underline term with an interactive tooltip showing English translation & instant Flashcard saving
function GlossaryTermSpan({ term, en }: { term: string; en: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        checkIsTermSaved(session.user.id, term).then((saved) => {
          if (saved) {
            setIsSaved(true);
            setSaveState("saved");
          }
        });
      }
    });
  }, [term]);

  useEffect(() => {
    function handleFlashcardsUpdated(e: Event) {
      const detail = (e as CustomEvent<{ term?: string }>).detail;
      if (!detail?.term || detail.term === term) {
        if (userId) {
          checkIsTermSaved(userId, term).then((saved) => {
            if (saved) {
              setIsSaved(true);
              setSaveState("saved");
            }
          });
        }
      }
    }
    window.addEventListener("thtcdn:flashcards-updated", handleFlashcardsUpdated);
    return () => {
      window.removeEventListener("thtcdn:flashcards-updated", handleFlashcardsUpdated);
    };
  }, [userId, term]);

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
    if (saveState === "saving" || isSaved) return;

    let currentUserId = userId;
    if (!currentUserId) {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        currentUserId = user.id;
        setUserId(user.id);
      }
    }

    if (!currentUserId) {
      toast.error(t.glossaryTerm.loginRequired);
      return;
    }

    setSaveState("saving");
    const card = {
      term,
      definition: format(t.glossaryTerm.definitionTemplate, { en }),
      interval: 1,
      ease_factor: 2.5,
      repetitions: 0,
      next_review_at: new Date().toISOString(),
    };

    const ok = await saveFlashcard(currentUserId, card);
    if (ok) {
      updateSavedTermCache(currentUserId, term);
      setIsSaved(true);
      setSaveState("saved");
      // The toast used to just say the card was added, without saying where
      // "bộ Flashcards của bạn" actually is - and the review page lives at
      // /cfa/flashcards, which has no navbar entry, so a learner saving terms
      // from a lesson had no way to find them again. A reader asked exactly
      // that: "làm sao để ôn tập những từ đã lưu ạ". The action makes the
      // toast the answer instead of a dead end.
      toast.success(format(t.glossaryTerm.savedToast, { term }), {
        action: {
          label: t.glossaryTerm.reviewNowAction,
          onClick: () => router.push("/cfa/flashcards"),
        },
      });

      // KHÔNG bắn "thtcdn:xp-gained" ở đây. Hiệu ứng đó là hoạt ảnh "+5 XP"
      // bay lên góc màn hình, và lưu một flashcard không ghi dòng nào vào bất
      // kỳ sổ cái nào mà recalculateUserStats đọc - nên tổng XP không nhúc
      // nhích, đúng cái khoảng cách giữa lời hứa và sổ sách đã sinh ra phản
      // hồi "làm mà không có XP". Muốn nó cộng XP thật thì phải có sổ cái
      // trước, rồi mới tới hoạt ảnh.
      setTimeout(() => setOpen(false), 1200);
    } else {
      setSaveState("error");
      toast.error(t.glossaryTerm.saveErrorToast);
    }
  };

  return (
    <span ref={rootRef} className="relative inline-block group/term">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        className="border-b border-dotted border-amber-500 dark:border-amber-400 font-medium cursor-help focus:outline-none hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
      >
        {term}
      </button>

      {/* Lớp bọc định vị. Khoảng cách 8px tới từ gạch chân là `pb-2` (padding)
          chứ không phải `mb-2` (margin): padding nằm TRONG hộp của phần tử nên
          hover được, margin thì không. Trước đây popover chỉ mở nhờ
          `group-hover/term`, mà chuột đi từ chữ lên nút Lưu phải băng qua đúng
          8px margin đó - không thuộc về phần tử nào, hover tắt, card biến mất
          giữa chừng. Padding biến khoảng trống ấy thành một phần của popover,
          nên đường đi từ chữ tới nút liền mạch. */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full pb-2 z-40 ${
          open ? "pointer-events-auto" : "pointer-events-none group-hover/term:pointer-events-auto"
        }`}
      >
        <span
          className={`rounded-2xl bg-stone-900 dark:bg-stone-900 text-white text-xs font-semibold p-3 transition-all duration-200 shadow-2xl flex flex-col items-center gap-2 border border-stone-700/80 min-w-[150px] origin-bottom ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 group-hover/term:opacity-100 group-hover/term:scale-100"
          }`}
        >
          <span className="font-bold text-amber-300 text-sm tracking-wide whitespace-nowrap">{en}</span>

          <button
            type="button"
            onClick={handleSaveFlashcard}
            disabled={saveState === "saving" || isSaved}
            className={`w-full text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isSaved || saveState === "saved"
                ? "bg-emerald-600 text-white cursor-default"
                : saveState === "error"
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white font-bold"
            }`}
          >
            {saveState === "saving"
              ? t.glossaryTerm.savingButton
              : isSaved || saveState === "saved"
                ? t.glossaryTerm.savedButton
                : saveState === "error"
                  ? t.glossaryTerm.retryButton
                  : t.glossaryTerm.saveButton}
          </button>
        </span>
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
