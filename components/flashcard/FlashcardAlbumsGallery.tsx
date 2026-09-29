"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, ArrowLeft } from "lucide-react";
import Glyph from "@/components/Glyph";
import { FLASHCARD_ALBUMS, type FlashcardAlbum } from "@/lib/flashcard-albums";
import { saveFlashcardsBulk } from "@/lib/cloudflare-flashcards";
import { useI18n } from "@/lib/i18n/context";
import { mergeFlashcardAlbums } from "@/lib/flashcard-albums-i18n";
import { format } from "@/lib/i18n";
import { Sys, btnPrimary, textLink } from "@/components/ui/system";

interface FlashcardAlbumsGalleryProps {
  userId: string;
  onImported: () => void; // caller refetches its own card list
}

// Gallery of curated "hot" preset decks - browse an emoji cover (see
// lib/flashcard-albums.ts for why there's no uploaded image), open one
// to preview every card inside, then import the whole thing into your own
// deck in one tap. Import reuses saveFlashcardsBulk's existing
// insert-only-skip-existing behavior, so importing the same album twice (or
// an album that overlaps with cards you already added yourself) never
// overwrites anything you're already reviewing.
export default function FlashcardAlbumsGallery({ userId, onImported }: FlashcardAlbumsGalleryProps) {
  const { t, locale } = useI18n();
  // Album đã dịch. Thẻ mang thêm `alsoKnownAs` là tên tiếng Việt của chính nó,
  // để đường nhập nhận ra thẻ người học đã có từ trước khi họ đổi ngôn ngữ.
  const albums = useMemo(() => mergeFlashcardAlbums(FLASHCARD_ALBUMS, locale), [locale]);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  // Giữ `id` trong state, không giữ cả object: giữ object thì đổi ngôn ngữ lúc
  // đang mở một album sẽ để lại bản tiếng Việt trên màn hình cho tới khi đóng.
  const openAlbum = openAlbumId ? (albums.find((a) => a.id === openAlbumId) ?? null) : null;
  const [importing, setImporting] = useState(false);

  async function handleImport(album: FlashcardAlbum) {
    setImporting(true);
    try {
      const { added, skipped } = await saveFlashcardsBulk(userId, album.cards);
      if (added > 0) {
        toast.success(
          format(t.flashcards.albumImported, { added, title: album.title }) +
            (skipped > 0 ? format(t.flashcards.albumSkippedSuffix, { skipped }) : "")
        );
        onImported();
        setOpenAlbumId(null);
      } else {
        toast.info(format(t.flashcards.albumAllExisted, { skipped, title: album.title }));
      }
    } finally {
      setImporting(false);
    }
  }

  if (openAlbum) {
    return (
      <div className="mb-6 overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
        {/* Bìa album: trước là dải gradient + emoji. Giờ là thanh tiêu đề giấy
            ngà như mọi khung khác - `album.gradient` vẫn nằm trong dữ liệu
            nhưng không còn được tô ở đây (luật 2: không gradient trang trí). */}
        <div className="border-b border-stone-300 bg-surface-raised p-5 dark:border-stone-700 dark:bg-stone-950">
          <button onClick={() => setOpenAlbumId(null)} className={`${textLink} mb-3 text-xs`}>
            <ArrowLeft className="w-3.5 h-3.5" /> {t.flashcards.albumBack}
          </button>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 rounded-sm border border-line-strong bg-white p-2 text-ink-body dark:border-stone-700 dark:bg-stone-900">
              <Glyph emoji={openAlbum.emoji} className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-black tracking-tight text-ink-max">{openAlbum.title}</h3>
              <p className="mt-0.5 max-w-[68ch] text-sm leading-6 text-ink-soft">{openAlbum.description}</p>
              <p className="mt-1.5 text-xs font-bold text-ink-muted">
                <span className="font-mono tabular-nums">{openAlbum.cards.length}</span> {t.flashcards.albumCards}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-stone-200 dark:divide-stone-800">
          {openAlbum.cards.map((c, i) => (
            <div key={i} className="grid grid-cols-[2.25rem_minmax(0,1fr)] px-5 py-3">
              <Sys className="pt-0.5 text-ink-faint tabular-nums">{String(i + 1).padStart(2, "0")}</Sys>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink">{c.term}</p>
                <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{c.definition}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-line">
          <button onClick={() => handleImport(openAlbum)} disabled={importing} className={`${btnPrimary} w-full`}>
            <Download className="w-4 h-4" />
            {importing
              ? t.flashcards.albumImporting
              : format(t.flashcards.albumImportCta, { count: openAlbum.cards.length })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="grid sm:grid-cols-2 gap-3">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setOpenAlbumId(album.id)}
            className="group overflow-hidden rounded-md border border-line-strong bg-white text-left transition-colors hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600"
          >
            <div className="flex h-9 items-center justify-between gap-3 border-b border-stone-300 bg-surface-raised px-3 dark:border-stone-700 dark:bg-stone-950">
              <span className="text-ink-body">
                <Glyph emoji={album.emoji} className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-[11px] font-semibold text-ink-muted">
                <span className="font-mono tabular-nums">{album.cards.length}</span> {t.flashcards.albumCards}
              </span>
            </div>
            <div className="p-3.5">
              <p className="text-sm font-bold text-ink group-hover:text-accent-strong">{album.title}</p>
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{album.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
