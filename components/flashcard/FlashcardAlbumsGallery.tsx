"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download, ArrowLeft } from "lucide-react";
import { FLASHCARD_ALBUMS, type FlashcardAlbum } from "@/lib/flashcard-albums";
import { saveFlashcardsBulk } from "@/lib/supabase-flashcards";

interface FlashcardAlbumsGalleryProps {
  userId: string;
  onImported: () => void; // caller refetches its own card list
}

// Gallery of curated "hot" preset decks - browse a gradient+emoji cover
// (see lib/flashcard-albums.ts for why there's no uploaded image), open one
// to preview every card inside, then import the whole thing into your own
// deck in one tap. Import reuses saveFlashcardsBulk's existing
// insert-only-skip-existing behavior, so importing the same album twice (or
// an album that overlaps with cards you already added yourself) never
// overwrites anything you're already reviewing.
export default function FlashcardAlbumsGallery({ userId, onImported }: FlashcardAlbumsGalleryProps) {
  const [openAlbum, setOpenAlbum] = useState<FlashcardAlbum | null>(null);
  const [importing, setImporting] = useState(false);

  async function handleImport(album: FlashcardAlbum) {
    setImporting(true);
    try {
      const { added, skipped } = await saveFlashcardsBulk(userId, album.cards);
      if (added > 0) {
        toast.success(`Đã nhập ${added} thẻ từ "${album.title}" vào bộ của bạn!${skipped > 0 ? ` (bỏ qua ${skipped} thẻ đã có)` : ""}`);
        onImported();
        setOpenAlbum(null);
      } else {
        toast.info(`Bạn đã có sẵn toàn bộ ${skipped} thẻ trong "${album.title}" rồi.`);
      }
    } finally {
      setImporting(false);
    }
  }

  if (openAlbum) {
    return (
      <div className="mb-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div className={`bg-gradient-to-br ${openAlbum.gradient} p-5 text-white relative`}>
          <button
            onClick={() => setOpenAlbum(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 hover:text-white mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách
          </button>
          <div className="flex items-start gap-3">
            <span className="text-4xl flex-shrink-0">{openAlbum.emoji}</span>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold">{openAlbum.title}</h3>
              <p className="text-sm text-white/85 mt-0.5">{openAlbum.description}</p>
              <p className="text-xs text-white/70 mt-1.5 font-bold uppercase tracking-wide">{openAlbum.cards.length} thẻ</p>
            </div>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
          {openAlbum.cards.map((c, i) => (
            <div key={i} className="px-5 py-3">
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{c.term}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">{c.definition}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => handleImport(openAlbum)}
            disabled={importing}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {importing ? "Đang nhập..." : `Nhập ${openAlbum.cards.length} thẻ vào bộ của tôi`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="grid sm:grid-cols-2 gap-3">
        {FLASHCARD_ALBUMS.map((album) => (
          <button
            key={album.id}
            onClick={() => setOpenAlbum(album)}
            className="group text-left rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`bg-gradient-to-br ${album.gradient} h-20 flex items-center justify-center relative overflow-hidden`}>
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{album.emoji}</span>
              <span className="absolute top-2 right-2 text-[10px] font-extrabold text-white/90 bg-black/20 rounded-full px-2 py-0.5">
                {album.cards.length} thẻ
              </span>
            </div>
            <div className="p-3.5">
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{album.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2">{album.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
