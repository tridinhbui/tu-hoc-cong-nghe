"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, GraduationCap, Sparkles, Upload, Download, Copy, Flame, Layers, Target, Trophy, FolderOpen, X, ThumbsUp, Star, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useAuthGate } from "@/lib/use-auth-gate";
import {
  getFlashcards,
  saveFlashcard,
  saveFlashcardsBulk,
  deleteFlashcard,
  calculateSM2,
  type Flashcard,
} from "@/lib/cloudflare-flashcards";
import { getUnresolvedMistakeRows } from "@/lib/quiz-mistakes";
import { trackFeatureClick } from "@/lib/feature-events";
import { getMistakeFlashcardCandidates } from "@/app/actions/flashcard-actions";
import FlashcardAlbumsGallery from "@/components/flashcard/FlashcardAlbumsGallery";
import { useI18n } from "@/lib/i18n/context";
import { localizedDefaultGlossary } from "@/lib/cloudflare-flashcards-i18n";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { format } from "@/lib/i18n";
import { StatTable, panel, btnPrimary, btnSecondary, textLink } from "@/components/ui/system";

interface FlashcardClientProps {
  userId?: string;
  initialCards?: Flashcard[];
  embedded?: boolean;
}

export default function FlashcardClient({ userId: propUserId, initialCards, embedded = false }: FlashcardClientProps = {}) {
  const { t, locale } = useI18n();
  const authGate = useAuthGate();
  const userId = propUserId || authGate.userId;
  const checking = propUserId ? false : authGate.checking;
  const [cards, setCards] = useState<Flashcard[]>(initialCards ?? []);
  const [loading, setLoading] = useState(initialCards === undefined);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Form for adding new card
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTerm, setNewTerm] = useState("");
  const [newDef, setNewDef] = useState("");
  const [saving, setSaving] = useState(false);
  const [generatingFromMistakes, setGeneratingFromMistakes] = useState(false);

  // Bulk import/export: paste/parse many "thuật ngữ | định nghĩa" lines at
  // once instead of the one-card-at-a-time form above.
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkImporting, setBulkImporting] = useState(false);

  // Curated "hot" preset deck gallery (lib/flashcard-albums.ts).
  const [showAlbums, setShowAlbums] = useState(false);

  const handleGenerateFromMistakes = async () => {
    if (!userId || generatingFromMistakes) return;
    setGeneratingFromMistakes(true);
    try {
      const mistakeRows = await getUnresolvedMistakeRows(userId);
      const candidates = await getMistakeFlashcardCandidates(mistakeRows);
      if (candidates.length === 0) {
        toast.info(t.flashcards.noMistakesFound);
        return;
      }
      let count = 0;
      for (const cand of candidates) {
        const exists = cards.some((c) => c.term === cand.term);
        if (exists) continue;

        const card: Flashcard = {
          term: cand.term,
          definition: cand.definition,
          interval: 1,
          ease_factor: 2.5,
          repetitions: 0,
          next_review_at: new Date().toISOString(),
        };
        const ok = await saveFlashcard(userId, card);
        if (ok) count++;
      }
      if (count > 0) {
        toast.success(format(t.flashcards.generatedFromMistakes, { count }));
        const list = await getFlashcards(userId);
        setCards(list);
      } else {
        toast.info(t.flashcards.mistakesAlreadyMade);
      }
    } catch {
      toast.error(t.flashcards.mistakesScanFailed);
    } finally {
      setGeneratingFromMistakes(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    if (initialCards !== undefined) return;
    const loadCards = async () => {
      try {
        const list = await getFlashcards(userId);
        setCards(list);
      } catch (error) {
        console.error("Error loading flashcards:", error);
      } finally {
        setLoading(false);
      }
    };
    void loadCards();
    // Only re-run for a different userId; initialCards is a first-render-only seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (checking || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin" />
      </div>
    );
  }

  // Filter cards due for review (next_review_at <= now)
  const now = new Date();
  const dueCards = cards.filter((c) => new Date(c.next_review_at) <= now);
  const currentCard = dueCards[0] ?? null;

  const handleSM2Action = async (quality: number) => {
    if (!currentCard) return;
    trackFeatureClick("flashcard_review", { label: String(quality) });

    const { repetitions, easeFactor, interval, nextReviewAt } = calculateSM2(
      quality,
      currentCard.repetitions,
      currentCard.ease_factor,
      currentCard.interval
    );

    const updatedCard: Flashcard = {
      ...currentCard,
      repetitions,
      ease_factor: easeFactor,
      interval,
      next_review_at: nextReviewAt,
    };

    // Optimistic UI update
    setCards((prev) => prev.map((c) => (c.term === currentCard.term ? updatedCard : c)));
    setIsFlipped(false);
    setSwipeOffset(0);

    const ok = await saveFlashcard(userId, updatedCard);
    if (ok) {
      if (quality >= 3) {
        toast.success(format(t.flashcards.nextReview, { days: interval }));
      } else {
        toast.info(t.flashcards.markedForReview);
      }
    } else {
      toast.error(t.flashcards.reviewSaveFailed);
    }
  };

  // Drag and Swipe Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    // Cap diff to avoid too much dragging
    setSwipeOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Swipe threshold (120px)
    if (swipeOffset > 120) {
      // Swiped Right -> Remember (quality = 4)
      void handleSM2Action(4);
    } else if (swipeOffset < -120) {
      // Swiped Left -> Forgot (quality = 1)
      void handleSM2Action(1);
    } else {
      // Reset position
      setSwipeOffset(0);
    }
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim() || !newDef.trim() || saving) return;
    setSaving(true);

    const newCard: Flashcard = {
      term: newTerm.trim(),
      definition: newDef.trim(),
      interval: 1,
      ease_factor: 2.5,
      repetitions: 0,
      next_review_at: new Date().toISOString(),
    };

    const ok = await saveFlashcard(userId, newCard);
    setSaving(false);
    if (ok) {
      toast.success(t.flashcards.cardAdded);
      setCards((prev) => [...prev, newCard]);
      setNewTerm("");
      setNewDef("");
      setShowAddForm(false);
    } else {
      toast.error(t.flashcards.cardSaveFailed);
    }
  };

  // Each line: "thuật ngữ | định nghĩa" (also accepts a tab as the
  // separator, in case someone pastes straight out of a spreadsheet).
  function parseBulkLines(text: string): { term: string; definition: string }[] {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        // Split on the FIRST separator only - a definition containing
        // another "|" (e.g. a ratio or "A | B" phrase) used to get
        // silently mangled: rejoining the remaining parts checked whether
        // the term (never the separator itself) contained "|", which is
        // never true, so it always rejoined with a tab instead of "|".
        const sepIndex = line.includes("|") ? line.indexOf("|") : line.indexOf("\t");
        if (sepIndex === -1) return null; // no recognized separator on this line - not a valid card
        const term = line.slice(0, sepIndex).trim();
        const definition = line.slice(sepIndex + 1).trim();
        return { term, definition };
      })
      .filter((c): c is { term: string; definition: string } => c !== null && !!c.term && !!c.definition);
  }

  const handleBulkImport = async () => {
    const parsed = parseBulkLines(bulkText);
    if (parsed.length === 0) {
      toast.error(t.flashcards.bulkParseFailed);
      return;
    }
    setBulkImporting(true);
    try {
      const { added, skipped } = await saveFlashcardsBulk(userId, parsed);
      if (added > 0) {
        toast.success(
          format(t.flashcards.bulkAdded, { added }) +
            (skipped > 0 ? format(t.flashcards.bulkSkippedSuffix, { skipped }) : "")
        );
        const list = await getFlashcards(userId);
        setCards(list);
        setBulkText("");
        setShowBulkPanel(false);
      } else if (skipped > 0) {
        toast.info(format(t.flashcards.bulkAllExisted, { skipped }));
      } else {
        toast.error(t.flashcards.bulkSaveFailed);
      }
    } finally {
      setBulkImporting(false);
    }
  };

  async function handleExport() {
    if (cards.length === 0) {
      toast.info(t.flashcards.nothingToExport);
      return;
    }
    const text = cards.map((c) => `${c.term} | ${c.definition}`).join("\n");
    // Đây là đường duy nhất để lấy bộ thẻ ra khỏi app, nên một lần hỏng im
    // lặng là người dùng tưởng đã xuất xong rồi đóng trang.
    if (!(await copyToClipboard(text))) {
      toast.error(t.flashcards.copyToClipboardFailed);
      return;
    }
    toast.success(format(t.flashcards.copiedToClipboard, { count: cards.length }));
  }

  const handleDeleteCard = async (term: string) => {
    if (!confirm(format(t.flashcards.confirmDelete, { term }))) return;
    const ok = await deleteFlashcard(userId, term);
    if (ok) {
      toast.success(t.flashcards.cardDeleted);
      setCards((prev) => prev.filter((c) => c.term !== term));
    } else {
      toast.error(t.flashcards.cardDeleteFailed);
    }
  };

  const bootstrapDefaultGlossary = async () => {
    setLoading(true);
    try {
      // `saveFlashcardsBulk` thay cho vòng lặp `saveFlashcard`, và không phải để
      // tiết kiệm tám lượt gọi. Bộ thẻ mặc định giờ có bản dịch, nên `term` đổi
      // theo ngôn ngữ - mà `saveFlashcard` upsert theo `(user_id, term)`, tức
      // tên đã dịch là một khoá KHÁC. Người bấm nút này lúc dùng tiếng Việt rồi
      // bấm lại sau khi đổi sang tiếng Anh sẽ nhận 16 thẻ trùng nội dung.
      //
      // Bản bulk bỏ qua thẻ đã có ở BẤT KỲ ngôn ngữ nào, qua `alsoKnownAs`.
      const { added: count } = await saveFlashcardsBulk(
        userId,
        localizedDefaultGlossary(locale)
      );
      toast.success(format(t.flashcards.sampleImported, { count }));
      const list = await getFlashcards(userId);
      setCards(list);
    } catch {
      toast.error(t.flashcards.sampleImportFailed);
    } finally {
      setLoading(false);
    }
  };

  const masteredCount = cards.filter((c) => c.repetitions >= 5).length;

  return (
    <div className={embedded ? "w-full" : "min-h-screen bg-surface"}>
      <div className={embedded ? "w-full py-4" : "max-w-3xl mx-auto px-4 sm:px-6 py-8"}>
        {!embedded && (
          <Link
            href="/dashboard"
            className={`${textLink} mb-3`}
          >
            <ArrowLeft className="w-4 h-4" /> {t.flashcards.back}
          </Link>
        )}

        {/* Đầu khu: eyebrow + tiêu đề, bảng số liệu, hàng hành động. Trước là
            một khối gradient xanh có đốm sáng mờ và ba viên kính mờ. */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-2">
            <span className="eyebrow inline-flex items-center gap-1.5 text-ink-soft">
              <Layers className="w-3.5 h-3.5" /> {t.flashcards.algorithm}
            </span>
          </div>
          {embedded ? (
            <h2 className="mt-3 text-xl sm:text-2xl font-black leading-[1.15] tracking-tight text-ink-max">{t.flashcards.title}</h2>
          ) : (
            <h1 className="mt-3 text-xl sm:text-2xl font-black leading-[1.15] tracking-tight text-ink-max">{t.flashcards.title}</h1>
          )}

          <div className={`${panel} mt-4 px-4 py-1`}>
            <StatTable
              rows={[
                {
                  label: (
                    <span className="inline-flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-ink-muted" /> {t.flashcards.statDue}
                    </span>
                  ),
                  value: <span className={dueCards.length > 0 ? "text-accent-strong" : ""}>{dueCards.length}</span>,
                },
                {
                  label: (
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-ink-muted" /> {t.flashcards.statTotal}
                    </span>
                  ),
                  value: cards.length,
                },
                {
                  label: (
                    <span className="inline-flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-ink-muted" /> {t.flashcards.statMastered}
                    </span>
                  ),
                  value: masteredCount,
                },
              ]}
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setShowAddForm(!showAddForm)} className={`${btnPrimary} px-3.5 py-2 text-xs cursor-pointer`}>
              <Plus className="w-3.5 h-3.5" /> {t.flashcards.addCard}
            </button>
            <button
              onClick={handleGenerateFromMistakes}
              disabled={generatingFromMistakes}
              className={`${btnSecondary} px-3.5 py-2 text-xs cursor-pointer`}
            >
              <Sparkles className="w-3.5 h-3.5" /> {generatingFromMistakes ? t.flashcards.generating : t.flashcards.generateFromMistakes}
            </button>
            <button
              onClick={() => setShowBulkPanel(!showBulkPanel)}
              aria-expanded={showBulkPanel}
              className={`${btnSecondary} px-3.5 py-2 text-xs cursor-pointer`}
            >
              <Upload className="w-3.5 h-3.5" /> {t.flashcards.importExport}
            </button>
            <button
              onClick={() => setShowAlbums(!showAlbums)}
              aria-expanded={showAlbums}
              className={`${btnSecondary} px-3.5 py-2 text-xs cursor-pointer`}
            >
              <Flame className="w-3.5 h-3.5" /> {t.flashcards.hotDecks}
            </button>
          </div>
        </div>

        {showAlbums && userId && (
          <FlashcardAlbumsGallery
            userId={userId}
            onImported={() => {
              getFlashcards(userId).then(setCards);
            }}
          />
        )}

        {showBulkPanel && (
          <div className={`${panel} mb-6 p-5 space-y-4`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-black tracking-tight text-ink-max">{t.flashcards.bulkTitle}</h3>
              <button
                onClick={handleExport}
                className={`${textLink} text-[11px]`}
              >
                <Download className="w-3.5 h-3.5" /> {format(t.flashcards.bulkExport, { count: cards.length })}
              </button>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-[0.08em] mb-1.5">
                {t.flashcards.bulkLabel}
              </label>
              <textarea
                rows={6}
                placeholder={t.flashcards.bulkPlaceholder}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-sm border border-stone-300 bg-[#fbfaf7] text-ink focus:outline-none focus:border-brand-600 dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400 font-mono"
              />
              {bulkText.trim() && (
                <p className="text-[11px] text-ink-faint mt-1.5">
                  {format(t.flashcards.bulkParsed, { count: parseBulkLines(bulkText).length })}
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleExport}
                className={`${btnSecondary} px-4 py-2 text-xs sm:hidden`}
              >
                <Copy className="w-3.5 h-3.5" /> {t.flashcards.exportShort}
              </button>
              <button
                type="button"
                onClick={() => setShowBulkPanel(false)}
                className={`${btnSecondary} px-4 py-2 text-xs`}
              >
                {t.flashcards.cancel}
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={bulkImporting || !bulkText.trim()}
                className={`${btnPrimary} px-4 py-2 text-xs`}
              >
                {bulkImporting ? t.flashcards.bulkImporting : t.flashcards.bulkImport}
              </button>
            </div>
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleAddCard} className={`${panel} mb-6 p-5 space-y-4`}>
            <h3 className="text-sm font-black tracking-tight text-ink-max">{t.flashcards.newCardTitle}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-[0.08em] mb-1.5">{t.flashcards.termLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.flashcards.termPlaceholder}
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-sm border border-stone-300 bg-[#fbfaf7] text-ink focus:outline-none focus:border-brand-600 dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-ink-muted uppercase tracking-[0.08em] mb-1.5">{t.flashcards.definitionLabel}</label>
                <textarea
                  required
                  rows={3}
                  placeholder={t.flashcards.definitionPlaceholder}
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-sm border border-stone-300 bg-[#fbfaf7] text-ink focus:outline-none focus:border-brand-600 dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className={`${btnSecondary} px-4 py-2 text-xs`}
              >
                {t.flashcards.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`${btnPrimary} px-4 py-2 text-xs`}
              >
                {saving ? t.flashcards.saving : t.flashcards.saveCard}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-stone-500">{t.flashcards.loading}</p>
          </div>
        ) : cards.length === 0 ? (
          <div className={`${panel} text-center py-16 px-6 max-w-md mx-auto`}>
            <span className="mx-auto mb-4 flex w-fit rounded-sm border border-stone-300 p-2.5 text-ink-muted dark:border-stone-700">
              <FolderOpen aria-hidden className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <h2 className="text-lg font-black tracking-tight text-ink-max">{t.flashcards.emptyTitle}</h2>
            <p className="text-sm text-ink-muted mt-2 leading-7">
              {t.flashcards.emptyBody}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={bootstrapDefaultGlossary}
                className={`${btnPrimary} w-full sm:w-auto text-xs cursor-pointer`}
              >
                <GraduationCap className="w-4 h-4" /> {t.flashcards.importSamples}
              </button>
              <button
                onClick={handleGenerateFromMistakes}
                disabled={generatingFromMistakes}
                className={`${btnSecondary} w-full sm:w-auto text-xs cursor-pointer`}
              >
                <Sparkles className="w-4 h-4" /> {t.flashcards.quickFromMistakes}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Spaced Repetition Practice Zone */}
            <div className="flex flex-col items-center">
              {currentCard && (
                <div className="w-full max-w-sm mb-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-ink-muted mb-1.5 px-0.5">
                    <span className="uppercase tracking-[0.08em]">{t.flashcards.reviewing}</span>
                    <span className="tabular-nums">{format(t.flashcards.cardsLeft, { count: dueCards.length })}</span>
                  </div>
                  <div className="h-1 bg-surface-sunken overflow-hidden">
                    <div
                      className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-500"
                      style={{
                        width: cards.length > 0 ? `${Math.round(((cards.length - dueCards.length) / cards.length) * 100)}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              )}

              {currentCard ? (
                <div className="w-full relative min-h-[340px] flex flex-col items-center justify-center">
                  {/* Spaced Repetition Card Wrapper */}
                  <div
                    onMouseDown={(e) => handleDragStart(e.clientX)}
                    onMouseMove={(e) => handleDragMove(e.clientX)}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleDragEnd}
                    onClick={() => {
                      if (Math.abs(swipeOffset) < 10) {
                        setIsFlipped(!isFlipped);
                      }
                    }}
                    style={{
                      transform: `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.05}deg)`,
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    className={`relative w-full max-w-sm min-h-[300px] rounded-md border p-6 flex flex-col items-center justify-center text-center transition-colors select-none ${
                      swipeOffset > 40
                        ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                        : swipeOffset < -40
                        ? "border-red-600 bg-red-50 dark:border-red-400 dark:bg-red-950/40"
                        : isFlipped
                          ? "border-stone-950 bg-white dark:border-stone-300 dark:bg-stone-900"
                          : "border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900"
                    }`}
                  >
                    {/* Swipe Overlay Hints */}
                    {swipeOffset > 60 && (
                      <div className="absolute top-4 right-4 rounded-sm border border-brand-600 bg-white text-brand-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-[0.08em] dark:border-brand-400 dark:bg-stone-900 dark:text-brand-300">
                        {t.flashcards.rememberedShort}
                      </div>
                    )}
                    {swipeOffset < -60 && (
                      <div className="absolute top-4 left-4 rounded-sm border border-red-600 bg-white text-red-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-[0.08em] dark:border-red-400 dark:bg-stone-900 dark:text-red-300">
                        {t.flashcards.forgotShort}
                      </div>
                    )}

                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] absolute top-6 text-ink-muted">
                      {isFlipped ? t.flashcards.faceDefinition : t.flashcards.faceTerm}
                    </span>

                    {/* Card Content with 3D Flip feel */}
                    <div className="my-auto px-4">
                      {isFlipped ? (
                        <p className="text-sm sm:text-base font-medium text-ink-body leading-7 max-h-[160px] overflow-y-auto">
                          {currentCard.definition}
                        </p>
                      ) : (
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ink-max">
                          {currentCard.term}
                        </h2>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold text-ink-faint absolute bottom-6 flex items-center gap-1">
                      {isFlipped ? t.flashcards.flipToTerm : t.flashcards.flipToDefinition}
                    </span>
                  </div>

                  {/* Manual SM-2 Action Buttons */}
                  <div className="grid grid-cols-3 gap-2.5 mt-6 w-full max-w-sm">
                    <button
                      onClick={() => handleSM2Action(1)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-sm border border-red-300 bg-white text-red-700 transition-colors hover:border-red-600 dark:border-red-900 dark:bg-stone-900 dark:text-red-300 dark:hover:border-red-400 cursor-pointer"
                    >
                      <X aria-hidden className="h-5 w-5" strokeWidth={2} /> {t.flashcards.gradeForgot}
                    </button>
                    <button
                      onClick={() => handleSM2Action(3)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-sm border border-stone-300 bg-white text-ink-body transition-colors hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300 cursor-pointer"
                    >
                      <ThumbsUp aria-hidden className="h-5 w-5" strokeWidth={1.75} /> {t.flashcards.gradeMedium}
                    </button>
                    <button
                      onClick={() => handleSM2Action(5)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-sm border border-brand-300 bg-white text-accent-strong transition-colors hover:border-brand-600 dark:border-brand-900 dark:bg-stone-900 dark:hover:border-brand-400 cursor-pointer"
                    >
                      <Star aria-hidden className="h-5 w-5" strokeWidth={1.75} /> {t.flashcards.gradeEasy}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`${panel} w-full text-center py-10 px-6`}>
                  <span className="mx-auto mb-2.5 flex w-fit rounded-sm border border-stone-300 p-2 text-ink-muted dark:border-stone-700">
                    <PartyPopper aria-hidden className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <p className="text-base font-black tracking-tight text-ink-max">{t.flashcards.doneTitle}</p>
                  <p className="text-sm leading-7 text-ink-muted mt-1 max-w-sm mx-auto">
                    {t.flashcards.doneBody}
                  </p>
                </div>
              )}
            </div>

            {/* Manage Cards Zone */}
            <div className="border-t border-line pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-bold text-ink-muted uppercase tracking-[0.08em]">{t.flashcards.listTitle}</h3>
                <span className="text-[11px] font-bold tabular-nums text-ink-faint">{format(t.flashcards.cardCount, { count: cards.length })}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((c) => {
                  const isDue = new Date(c.next_review_at) <= now;
                  const mastery = Math.min(100, Math.round((c.repetitions / 5) * 100));
                  return (
                    <div
                      key={c.term}
                      className={`${panel} group p-4 transition-colors hover:border-stone-950 dark:hover:border-stone-300`}
                    >
                      <div className="flex justify-between gap-4 items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-xs sm:text-sm text-ink-max">{c.term}</p>
                            {isDue ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-warn-strong border border-warn-line-mid">{t.flashcards.badgeDue}</span>
                            ) : (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-ink-muted border border-line">{t.flashcards.badgeReviewed}</span>
                            )}
                            {c.repetitions >= 5 && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm text-accent-strong border border-accent-line-mid flex items-center gap-0.5">
                                <Trophy className="w-2.5 h-2.5" /> {t.flashcards.badgeMastered}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-ink-muted mt-1.5 line-clamp-2 leading-5">{c.definition}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCard(c.term)}
                          className="text-stone-400 hover:text-red-600 p-1.5 rounded-sm transition-colors shrink-0 opacity-0 group-hover:opacity-100 sm:opacity-100"
                          title={t.flashcards.deleteCardTitle}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Mastery progress (repetitions towards 5 = "mastered") */}
                      <div className="h-1 bg-surface-sunken overflow-hidden mt-3">
                        <div
                          className={`h-full transition-all duration-300 ${mastery >= 100 ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-500 dark:bg-stone-400"}`}
                          style={{ width: `${mastery}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
