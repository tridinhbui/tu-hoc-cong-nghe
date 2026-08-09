"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, GraduationCap, Sparkles, Upload, Download, Copy, Flame, Layers, Target, Trophy } from "lucide-react";
import Link from "next/link";
import { useAuthGate } from "@/lib/use-auth-gate";
import {
  getFlashcards,
  saveFlashcard,
  saveFlashcardsBulk,
  deleteFlashcard,
  calculateSM2,
  type Flashcard,
} from "@/lib/supabase-flashcards";
import { getUnresolvedMistakeRows } from "@/lib/quiz-mistakes";
import { trackFeatureClick } from "@/lib/feature-events";
import { getMistakeFlashcardCandidates } from "@/app/actions/flashcard-actions";
import FlashcardAlbumsGallery from "@/components/flashcard/FlashcardAlbumsGallery";
import { useI18n } from "@/lib/i18n/context";
import { localizedDefaultGlossary } from "@/lib/supabase-flashcards-i18n";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { format } from "@/lib/i18n";

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
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
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
    <div className={embedded ? "w-full" : "min-h-screen bg-stone-50 dark:bg-stone-950"}>
      <div className={embedded ? "w-full py-4" : "max-w-3xl mx-auto px-4 sm:px-6 py-8"}>
        {!embedded && (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl px-3 py-2 -ml-3 mb-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> {t.flashcards.back}
          </Link>
        )}

        {/* Hero header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-800 dark:via-emerald-800 dark:to-teal-900 p-5 sm:p-7 mb-6 shadow-lg">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 shadow-inner">
              <Layers className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="min-w-0">
              {embedded ? (
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">{t.flashcards.title}</h2>
              ) : (
                <h1 className="text-lg sm:text-xl font-extrabold text-white leading-tight">{t.flashcards.title}</h1>
              )}
              <p className="text-[11px] sm:text-xs text-emerald-100/90 font-semibold">{t.flashcards.algorithm}</p>
            </div>
          </div>

          {/* Stat pills */}
          <div className="relative grid grid-cols-3 gap-2.5 mb-5">
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-200 mb-0.5">
                <Target className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{dueCards.length}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">{t.flashcards.statDue}</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-white mb-0.5">
                <Layers className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{cards.length}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">{t.flashcards.statTotal}</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-200 mb-0.5">
                <Trophy className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{masteredCount}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">{t.flashcards.statMastered}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex flex-wrap gap-2">
            <button
              onClick={handleGenerateFromMistakes}
              disabled={generatingFromMistakes}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-white px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" /> {generatingFromMistakes ? t.flashcards.generating : t.flashcards.generateFromMistakes}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-emerald-700 px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> {t.flashcards.addCard}
            </button>
            <button
              onClick={() => setShowBulkPanel(!showBulkPanel)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 text-white px-3.5 py-2.5 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> {t.flashcards.importExport}
            </button>
            <button
              onClick={() => setShowAlbums(!showAlbums)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-rose-500 to-orange-500 text-white px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer"
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
          <div className="mb-6 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{t.flashcards.bulkTitle}</h3>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> {format(t.flashcards.bulkExport, { count: cards.length })}
              </button>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">
                {t.flashcards.bulkLabel}
              </label>
              <textarea
                rows={6}
                placeholder={t.flashcards.bulkPlaceholder}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
              {bulkText.trim() && (
                <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
                  {format(t.flashcards.bulkParsed, { count: parseBulkLines(bulkText).length })}
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors sm:hidden"
              >
                <Copy className="w-3.5 h-3.5" /> {t.flashcards.exportShort}
              </button>
              <button
                type="button"
                onClick={() => setShowBulkPanel(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                {t.flashcards.cancel}
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={bulkImporting || !bulkText.trim()}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition-colors"
              >
                {bulkImporting ? t.flashcards.bulkImporting : t.flashcards.bulkImport}
              </button>
            </div>
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleAddCard} className="mb-6 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{t.flashcards.newCardTitle}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">{t.flashcards.termLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.flashcards.termPlaceholder}
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">{t.flashcards.definitionLabel}</label>
                <textarea
                  required
                  rows={3}
                  placeholder={t.flashcards.definitionPlaceholder}
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                {t.flashcards.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition-colors"
              >
                {saving ? t.flashcards.saving : t.flashcards.saveCard}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-stone-500">{t.flashcards.loading}</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm max-w-md mx-auto">
            <span className="text-4xl mb-4 block animate-pulse">🗂️</span>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-50">{t.flashcards.emptyTitle}</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              {t.flashcards.emptyBody}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={bootstrapDefaultGlossary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" /> {t.flashcards.importSamples}
              </button>
              <button
                onClick={handleGenerateFromMistakes}
                disabled={generatingFromMistakes}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
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
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1.5 px-0.5">
                    <span>{t.flashcards.reviewing}</span>
                    <span>{format(t.flashcards.cardsLeft, { count: dueCards.length })}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{
                        width: cards.length > 0 ? `${Math.round(((cards.length - dueCards.length) / cards.length) * 100)}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              )}

              {currentCard ? (
                <div className="w-full relative min-h-[340px] flex flex-col items-center justify-center">
                  {/* Ambient glow behind the card */}
                  <div className="absolute w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

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
                    className={`relative w-full max-w-sm min-h-[300px] rounded-[28px] border-2 p-6 flex flex-col items-center justify-center text-center transition-shadow select-none bg-white/95 dark:bg-stone-900 shadow-xl ${
                      swipeOffset > 40
                        ? "border-emerald-400 bg-emerald-50/[0.04] dark:bg-emerald-950/[0.05]"
                        : swipeOffset < -40
                        ? "border-red-400 bg-red-50/[0.04] dark:bg-red-950/[0.05]"
                        : isFlipped
                          ? "border-teal-300 dark:border-teal-800"
                          : "border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    {/* Swipe Overlay Hints */}
                    {swipeOffset > 60 && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {t.flashcards.rememberedShort}
                      </div>
                    )}
                    {swipeOffset < -60 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {t.flashcards.forgotShort}
                      </div>
                    )}

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest absolute top-6 px-2.5 py-1 rounded-full ${
                        isFlipped
                          ? "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40"
                          : "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40"
                      }`}
                    >
                      {isFlipped ? t.flashcards.faceDefinition : t.flashcards.faceTerm}
                    </span>

                    {/* Card Content with 3D Flip feel */}
                    <div className="my-auto px-4">
                      {isFlipped ? (
                        <p className="text-sm sm:text-base font-medium text-stone-700 dark:text-stone-200 leading-relaxed max-h-[160px] overflow-y-auto">
                          {currentCard.definition}
                        </p>
                      ) : (
                        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50">
                          {currentCard.term}
                        </h2>
                      )}
                    </div>

                    <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 absolute bottom-6 hover:text-emerald-500 transition-colors flex items-center gap-1">
                      {isFlipped ? t.flashcards.flipToTerm : t.flashcards.flipToDefinition}
                    </span>
                  </div>

                  {/* Manual SM-2 Action Buttons */}
                  <div className="grid grid-cols-3 gap-2.5 mt-6 w-full max-w-sm">
                    <button
                      onClick={() => handleSM2Action(1)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">❌</span> {t.flashcards.gradeForgot}
                    </button>
                    <button
                      onClick={() => handleSM2Action(3)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">👍</span> {t.flashcards.gradeMedium}
                    </button>
                    <button
                      onClick={() => handleSM2Action(5)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">⭐️</span> {t.flashcards.gradeEasy}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center py-10 px-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm">
                  <span className="text-3xl mb-2.5 block animate-bounce">🎉</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-50">{t.flashcards.doneTitle}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                    {t.flashcards.doneBody}
                  </p>
                </div>
              )}
            </div>

            {/* Manage Cards Zone */}
            <div className="border-t border-stone-100 dark:border-stone-800/80 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">{t.flashcards.listTitle}</h3>
                <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500">{format(t.flashcards.cardCount, { count: cards.length })}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((c) => {
                  const isDue = new Date(c.next_review_at) <= now;
                  const mastery = Math.min(100, Math.round((c.repetitions / 5) * 100));
                  return (
                    <div
                      key={c.term}
                      className="group p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all"
                    >
                      <div className="flex justify-between gap-4 items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{c.term}</p>
                            {isDue ? (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50">{t.flashcards.badgeDue}</span>
                            ) : (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-stone-50 dark:bg-stone-950/40 text-stone-500 border border-stone-100">{t.flashcards.badgeReviewed}</span>
                            )}
                            {c.repetitions >= 5 && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 flex items-center gap-0.5">
                                <Trophy className="w-2.5 h-2.5" /> {t.flashcards.badgeMastered}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">{c.definition}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCard(c.term)}
                          className="text-stone-400 hover:text-red-500 p-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition-colors shrink-0 opacity-0 group-hover:opacity-100 sm:opacity-100"
                          title={t.flashcards.deleteCardTitle}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Mastery progress (repetitions towards 5 = "mastered") */}
                      <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mt-3">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${mastery >= 100 ? "bg-emerald-500" : "bg-teal-400"}`}
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
