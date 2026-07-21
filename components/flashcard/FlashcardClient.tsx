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
  DEFAULT_FINANCIAL_GLOSSARY,
  type Flashcard,
} from "@/lib/supabase-flashcards";
import { getUnresolvedMistakeRows } from "@/lib/quiz-mistakes";
import { trackFeatureClick } from "@/lib/feature-events";
import { getMistakeFlashcardCandidates } from "@/app/actions/flashcard-actions";
import FlashcardAlbumsGallery from "@/components/flashcard/FlashcardAlbumsGallery";

interface FlashcardClientProps {
  userId?: string;
  initialCards?: Flashcard[];
  embedded?: boolean;
}

export default function FlashcardClient({ userId: propUserId, initialCards, embedded = false }: FlashcardClientProps = {}) {
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
        toast.info("Không tìm thấy câu trắc nghiệm làm sai chưa giải quyết nào! 🌟 Hãy tiếp tục học bài nhé.");
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
        toast.success(`Đã tự động tạo thành công ${count} thẻ ôn tập từ các câu làm sai! ⚡🗂️`);
        const list = await getFlashcards(userId);
        setCards(list);
      } else {
        toast.info("Tất cả câu lỗi sai đã được tạo thẻ trước đó.");
      }
    } catch {
      toast.error("Có lỗi xảy ra khi quét lịch sử lỗi sai.");
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
        toast.success(`Đã nhớ! Lần ôn tiếp theo: ${interval} ngày tới.`);
      } else {
        toast.info("Đã đánh dấu cần học lại sớm!");
      }
    } else {
      toast.error("Không thể lưu trạng thái ôn tập.");
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
      toast.success("Đã thêm thẻ mới!");
      setCards((prev) => [...prev, newCard]);
      setNewTerm("");
      setNewDef("");
      setShowAddForm(false);
    } else {
      toast.error("Không thể lưu thẻ mới.");
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
      toast.error('Không đọc được dòng nào hợp lệ - mỗi dòng cần dạng "thuật ngữ | định nghĩa".');
      return;
    }
    setBulkImporting(true);
    try {
      const { added, skipped } = await saveFlashcardsBulk(userId, parsed);
      if (added > 0) {
        toast.success(`Đã thêm ${added} thẻ mới!${skipped > 0 ? ` (bỏ qua ${skipped} thẻ đã có sẵn)` : ""}`);
        const list = await getFlashcards(userId);
        setCards(list);
        setBulkText("");
        setShowBulkPanel(false);
      } else if (skipped > 0) {
        toast.info(`Cả ${skipped} thẻ đều đã có sẵn trong hộp thẻ của bạn.`);
      } else {
        toast.error("Không thể lưu các thẻ này.");
      }
    } finally {
      setBulkImporting(false);
    }
  };

  function handleExport() {
    if (cards.length === 0) {
      toast.info("Chưa có thẻ nào để xuất.");
      return;
    }
    const text = cards.map((c) => `${c.term} | ${c.definition}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`Đã sao chép ${cards.length} thẻ vào clipboard.`);
    });
  }

  const handleDeleteCard = async (term: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xoá thẻ "${term}"?`)) return;
    const ok = await deleteFlashcard(userId, term);
    if (ok) {
      toast.success("Đã xoá thẻ thành công.");
      setCards((prev) => prev.filter((c) => c.term !== term));
    } else {
      toast.error("Không thể xoá thẻ.");
    }
  };

  const bootstrapDefaultGlossary = async () => {
    setLoading(true);
    try {
      let count = 0;
      for (const item of DEFAULT_FINANCIAL_GLOSSARY) {
        const card: Flashcard = {
          term: item.term,
          definition: item.definition,
          interval: 1,
          ease_factor: 2.5,
          repetitions: 0,
          next_review_at: new Date().toISOString(),
        };
        const ok = await saveFlashcard(userId, card);
        if (ok) count++;
      }
      toast.success(`Đã nhập thành công ${count} thẻ từ vựng mẫu! 🎉`);
      const list = await getFlashcards(userId);
      setCards(list);
    } catch {
      toast.error("Lỗi khi nhập thẻ mẫu.");
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
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-105 hover:bg-stone-100 dark:hover:bg-stone-850 rounded-xl px-3 py-2 -ml-3 mb-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>
        )}

        {/* Hero header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 dark:from-emerald-800 dark:via-emerald-850 dark:to-teal-900 p-5 sm:p-7 mb-6 shadow-lg">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 shadow-inner">
              <Layers className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="min-w-0">
              {embedded ? (
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">Thẻ ghi nhớ</h2>
              ) : (
                <h1 className="text-lg sm:text-xl font-extrabold text-white leading-tight">Thẻ ghi nhớ</h1>
              )}
              <p className="text-[11px] sm:text-xs text-emerald-100/90 font-semibold">Spaced Repetition · Thuật toán SM2</p>
            </div>
          </div>

          {/* Stat pills */}
          <div className="relative grid grid-cols-3 gap-2.5 mb-5">
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-200 mb-0.5">
                <Target className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{dueCards.length}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">Đến hạn</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-white mb-0.5">
                <Layers className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{cards.length}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">Tổng số thẻ</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-200 mb-0.5">
                <Trophy className="w-3.5 h-3.5" />
                <span className="text-lg sm:text-xl font-extrabold text-white">{masteredCount}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-100/80 uppercase tracking-wider">Đã thành thạo</p>
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex flex-wrap gap-2">
            <button
              onClick={handleGenerateFromMistakes}
              disabled={generatingFromMistakes}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-white px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" /> {generatingFromMistakes ? "Đang tạo..." : "Tạo từ lỗi sai"}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-emerald-700 px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm thẻ mới
            </button>
            <button
              onClick={() => setShowBulkPanel(!showBulkPanel)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 border border-white/20 text-white px-3.5 py-2.5 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Nhập/Xuất
            </button>
            <button
              onClick={() => setShowAlbums(!showAlbums)}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-rose-500 to-orange-500 text-white px-3.5 py-2.5 rounded-xl hover:scale-[1.03] active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" /> Bộ thẻ hot
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
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-150">Nhập/Xuất hàng loạt</h3>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Xuất {cards.length} thẻ hiện có
              </button>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">
                Dán danh sách - mỗi dòng: thuật ngữ | định nghĩa
              </label>
              <textarea
                rows={6}
                placeholder={"Lãi kép | Lãi tính trên cả gốc lẫn lãi tích luỹ trước đó\nWACC | Chi phí vốn bình quân gia quyền"}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
              {bulkText.trim() && (
                <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
                  Đọc được {parseBulkLines(bulkText).length} thẻ hợp lệ.
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors sm:hidden"
              >
                <Copy className="w-3.5 h-3.5" /> Xuất
              </button>
              <button
                type="button"
                onClick={() => setShowBulkPanel(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={bulkImporting || !bulkText.trim()}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition-colors"
              >
                {bulkImporting ? "Đang nhập..." : "Nhập thẻ"}
              </button>
            </div>
          </div>
        )}

        {showAddForm && (
          <form onSubmit={handleAddCard} className="mb-6 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-150">Tạo thẻ ghi nhớ mới</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">Thuật ngữ / Từ vựng</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lãi đơn"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1.5">Định nghĩa / Giải nghĩa</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Giải thích ngắn gọn để bạn dễ ôn tập và ghi nhớ..."
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-850 bg-stone-50/40 dark:bg-stone-950/30 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 transition-colors"
              >
                {saving ? "Đang lưu..." : "Lưu thẻ"}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-stone-500">Đang tải hộp thẻ của bạn...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm max-w-md mx-auto">
            <span className="text-4xl mb-4 block animate-pulse">🗂️</span>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-50">Hộp thẻ trống</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 leading-relaxed">
              Bạn chưa có thẻ ghi nhớ nào trong hệ thống. Hãy tự tạo một số thẻ từ vựng mới hoặc nhập danh sách mẫu bên dưới để học ngay!
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={bootstrapDefaultGlossary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" /> Nhập 8 thẻ mẫu
              </button>
              <button
                onClick={handleGenerateFromMistakes}
                disabled={generatingFromMistakes}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" /> Tạo nhanh từ lỗi sai ⚡
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Spaced Repetition Practice Zone */}
            <div className="flex flex-col items-center">
              {currentCard && (
                <div className="w-full max-w-sm mb-3">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-stone-450 dark:text-stone-500 uppercase tracking-wider mb-1.5 px-0.5">
                    <span>Đang ôn tập</span>
                    <span>Còn {dueCards.length} thẻ</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-150 dark:bg-stone-800 overflow-hidden">
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
                    className={`relative w-full max-w-sm min-h-[300px] rounded-[28px] border-2 p-6 flex flex-col items-center justify-center text-center transition-shadow select-none bg-white dark:bg-stone-900 shadow-xl ${
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
                        Nhớ 👍
                      </div>
                    )}
                    {swipeOffset < -60 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        Quên ❌
                      </div>
                    )}

                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest absolute top-6 px-2.5 py-1 rounded-full ${
                        isFlipped
                          ? "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40"
                          : "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40"
                      }`}
                    >
                      {isFlipped ? "Định nghĩa" : "Thuật ngữ"}
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
                      {isFlipped ? "↩ Chạm để xem thuật ngữ" : "↪ Chạm để lật mặt sau"}
                    </span>
                  </div>

                  {/* Manual SM-2 Action Buttons */}
                  <div className="grid grid-cols-3 gap-2.5 mt-6 w-full max-w-sm">
                    <button
                      onClick={() => handleSM2Action(1)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">❌</span> Quên
                    </button>
                    <button
                      onClick={() => handleSM2Action(3)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-stone-250 dark:border-stone-850 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">👍</span> Vừa phải
                    </button>
                    <button
                      onClick={() => handleSM2Action(5)}
                      className="flex flex-col items-center gap-1 py-3 text-xs font-bold rounded-2xl border border-emerald-250 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:scale-[1.04] hover:shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-lg leading-none">⭐️</span> Dễ nhớ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center py-10 px-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm">
                  <span className="text-3xl mb-2.5 block animate-bounce">🎉</span>
                  <p className="text-base font-extrabold text-stone-900 dark:text-stone-50">Tuyệt vời! Đã hoàn thành ôn tập hôm nay!</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                    Các thuật ngữ đã được giãn cách khoa học. Hãy quay lại vào ngày mai để tiếp tục ghi nhớ kiến thức nhé!
                  </p>
                </div>
              )}
            </div>

            {/* Manage Cards Zone */}
            <div className="border-t border-stone-150 dark:border-stone-800/80 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">Danh sách từ vựng hiện tại</h3>
                <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500">{cards.length} thẻ</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((c) => {
                  const isDue = new Date(c.next_review_at) <= now;
                  const mastery = Math.min(100, Math.round((c.repetitions / 5) * 100));
                  return (
                    <div
                      key={c.term}
                      className="group p-4 rounded-2xl border border-stone-200 dark:border-stone-850 bg-white dark:bg-stone-900 shadow-sm hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all"
                    >
                      <div className="flex justify-between gap-4 items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{c.term}</p>
                            {isDue ? (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50">Đến hạn</span>
                            ) : (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-stone-50 dark:bg-stone-950/40 text-stone-500 border border-stone-150">Đã ôn</span>
                            )}
                            {c.repetitions >= 5 && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 flex items-center gap-0.5">
                                <Trophy className="w-2.5 h-2.5" /> Thành thạo
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">{c.definition}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCard(c.term)}
                          className="text-stone-400 hover:text-red-500 p-1.5 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg transition-colors shrink-0 opacity-0 group-hover:opacity-100 sm:opacity-100"
                          title="Xoá thẻ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Mastery progress (repetitions towards 5 = "mastered") */}
                      <div className="h-1 rounded-full bg-stone-100 dark:bg-stone-850 overflow-hidden mt-3">
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
