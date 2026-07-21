"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Highlighter,
  StickyNote,
  Trash2,
  X,
} from "lucide-react";
import CfaContentRenderer, { renderInlineStyles } from "@/components/CfaContentRenderer";
import { toTitleCase } from "@/lib/cfa-format";
import { getCfaModuleProgress, markCfaModuleComplete } from "@/lib/supabase-cfa-progress";
import { updateStreak } from "@/lib/supabase-streak";
import {
  isCfaModuleBookmarked,
  toggleCfaModuleBookmark,
  getCfaModuleNotes,
  createCfaModuleNote,
  deleteCfaModuleNote,
  getCfaModuleHighlights,
  createCfaModuleHighlight,
  deleteCfaModuleHighlight,
  type CfaModuleNote,
  type CfaModuleHighlight,
} from "@/lib/supabase-cfa-features";

interface ModuleRow {
  id: string;
  readingId: string;
  code: string;
  title: string;
  order: number | null;
}

interface ReadingRow {
  id: string;
  bookId: string;
  code: string;
  title: string;
  order: number | null;
}

interface BookRow {
  id: string;
  title: string;
}

interface QuizQuestion {
  id: string;
  headerId: string;
  questionNo: number;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correct: string;
  explanation: string | null;
}

export default function CfaModulePageClient({ moduleId }: { moduleId: string }) {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [mod, setMod] = useState<ModuleRow | null>(null);
  const [reading, setReading] = useState<ReadingRow | null>(null);
  const [book, setBook] = useState<BookRow | null>(null);
  const [siblingModules, setSiblingModules] = useState<ModuleRow[]>([]);

  const [content, setContent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const [previouslyCompleted, setPreviouslyCompleted] = useState(false);
  const [previousScore, setPreviousScore] = useState<{ score: number; total: number } | null>(null);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [saving, setSaving] = useState(false);

  // Bookmark
  const [bookmarked, setBookmarked] = useState(false);
  const [togglingBookmark, setTogglingBookmark] = useState(false);

  // Notes
  const [notes, setNotes] = useState<CfaModuleNote[]>([]);
  const [noteDraft, setNoteDraft] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Highlights (select text in the lesson content, then click the popup button)
  const [highlights, setHighlights] = useState<CfaModuleHighlight[]>([]);
  const [selectionPopup, setSelectionPopup] = useState<{ x: number; y: number; quote: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) setUserId(user?.id ?? null);

      const { data: modData, error: modError } = await supabase
        .from("Module")
        .select("*")
        .eq("id", moduleId)
        .maybeSingle();

      if (modError || !modData) {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
        return;
      }
      if (cancelled) return;
      setMod(modData);

      const { data: readingData } = await supabase
        .from("Reading")
        .select("*")
        .eq("id", modData.readingId)
        .maybeSingle();
      if (!cancelled && readingData) setReading(readingData);

      if (readingData) {
        const { data: bookData } = await supabase
          .from("Book")
          .select("id, title")
          .eq("id", readingData.bookId)
          .maybeSingle();
        if (!cancelled && bookData) setBook(bookData);

        const { data: siblings } = await supabase
          .from("Module")
          .select("*")
          .eq("readingId", readingData.id)
          .order("order", { ascending: true });
        if (!cancelled && siblings) setSiblingModules(siblings);
      }

      const { data: contentData } = await supabase
        .from("LessonContent")
        .select("content")
        .eq("moduleId", moduleId)
        .maybeSingle();
      if (!cancelled) setContent(contentData ? contentData.content : "Bài học này chưa có nội dung chi tiết.");

      const { data: headerData } = await supabase
        .from("ModuleQuizHeader")
        .select("*")
        .eq("moduleId", moduleId)
        .maybeSingle();

      if (headerData) {
        const { data: qData } = await supabase
          .from("ModuleQuizQuestion")
          .select("*")
          .eq("headerId", headerData.id)
          .order("questionNo", { ascending: true });
        if (!cancelled) setQuizQuestions(qData || []);
      }

      if (user?.id) {
        try {
          const progress = await getCfaModuleProgress(user.id, moduleId);
          if (!cancelled && progress?.completed) {
            setPreviouslyCompleted(true);
            if (progress.quiz_score != null && progress.quiz_total != null) {
              setPreviousScore({ score: progress.quiz_score, total: progress.quiz_total });
            }
          }
        } catch (err) {
          console.error("Error loading CFA module progress:", err);
        }

        try {
          const [isBookmarked, moduleNotes, moduleHighlights] = await Promise.all([
            isCfaModuleBookmarked(user.id, moduleId),
            getCfaModuleNotes(user.id, moduleId),
            getCfaModuleHighlights(user.id, moduleId),
          ]);
          if (!cancelled) {
            setBookmarked(isBookmarked);
            setNotes(moduleNotes);
            setHighlights(moduleHighlights);
          }
        } catch (err) {
          console.error("Error loading CFA module bookmark/notes/highlights:", err);
        }
      }

      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const handleCheckAnswer = useCallback(() => {
    if (!selectedOption || showAnswer) return;
    const currentQuestion = quizQuestions[currentQIndex];
    if (selectedOption === currentQuestion.correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    setShowAnswer(true);
  }, [selectedOption, showAnswer, quizQuestions, currentQIndex]);

  const handleNextQuestion = useCallback(async () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      return;
    }

    setQuizFinished(true);
    if (userId) {
      setSaving(true);
      try {
        await markCfaModuleComplete(userId, moduleId, correctAnswersCount, quizQuestions.length);
        await updateStreak(userId);
      } catch (err) {
        console.error("Error saving CFA module progress:", err);
      } finally {
        setSaving(false);
      }
    }
  }, [currentQIndex, quizQuestions.length, userId, moduleId, correctAnswersCount]);

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setQuizFinished(false);
    setCorrectAnswersCount(0);
  };

  const handleToggleBookmark = async () => {
    if (!userId || !mod || togglingBookmark) return;
    setTogglingBookmark(true);
    try {
      const result = await toggleCfaModuleBookmark(userId, moduleId, toTitleCase(mod.title));
      setBookmarked(result);
    } catch (err) {
      console.error("Error toggling CFA bookmark:", err);
    } finally {
      setTogglingBookmark(false);
    }
  };

  const handleAddNote = async () => {
    if (!userId || !noteDraft.trim() || savingNote) return;
    setSavingNote(true);
    try {
      const note = await createCfaModuleNote(userId, moduleId, noteDraft.trim());
      setNotes((prev) => [...prev, note]);
      setNoteDraft("");
    } catch (err) {
      console.error("Error saving CFA note:", err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteCfaModuleNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Error deleting CFA note:", err);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !contentRef.current) {
      setSelectionPopup(null);
      return;
    }
    const quote = selection.toString().trim();
    if (!quote || !contentRef.current.contains(selection.anchorNode)) {
      setSelectionPopup(null);
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionPopup({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 10, quote });
  };

  const handleAddHighlight = async () => {
    if (!userId || !selectionPopup) return;
    try {
      const highlight = await createCfaModuleHighlight(userId, moduleId, selectionPopup.quote);
      setHighlights((prev) => [...prev, highlight]);
    } catch (err) {
      console.error("Error saving CFA highlight:", err);
    } finally {
      setSelectionPopup(null);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleDeleteHighlight = async (id: number) => {
    try {
      await deleteCfaModuleHighlight(id);
      setHighlights((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Error deleting CFA highlight:", err);
    }
  };

  const currentIndexInReading = siblingModules.findIndex((m) => m.id === moduleId);
  const nextModule = currentIndexInReading >= 0 ? siblingModules[currentIndexInReading + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-stone-950">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (notFound || !mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white dark:bg-stone-950">
        <p className="text-sm text-stone-500 dark:text-stone-400">Không tìm thấy bài học CFA này.</p>
        <Link href="/cfa" className="text-sm font-bold text-stone-900 dark:text-stone-100 underline">
          Về trang CFA
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Sticky header - mirrors components/LessonPageLayout.tsx's header so CFA reads as part of the same product, not a bolted-on section. */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-50">
        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: quizQuestions.length > 0 ? `${((currentQIndex + (quizFinished ? 1 : 0)) / Math.max(quizQuestions.length, 1)) * 100}%` : "0%" }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/cfa"
              aria-label="Về CFA"
              className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap w-9 h-9 sm:w-auto sm:px-4 sm:py-2 justify-center rounded-full sm:rounded-lg border-2 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-900 dark:hover:text-stone-100 bg-white dark:bg-stone-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Quay lại</span>
            </Link>
            <div className="min-w-0">
              <p className="font-extrabold text-stone-900 dark:text-stone-100 text-base sm:text-lg leading-tight line-clamp-1">
                {toTitleCase(mod.title)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400 hidden sm:block font-semibold line-clamp-1">
                {book ? toTitleCase(book.title) : ""} {reading ? `· ${reading.code}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {userId && (
              <button
                onClick={handleToggleBookmark}
                disabled={togglingBookmark}
                title={bookmarked ? "Bỏ đánh dấu" : "Đánh dấu bài học"}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  bookmarked
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                } ${togglingBookmark ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            )}
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 inline-flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              CFA Level I
            </span>
          </div>
        </div>
      </header>

      {/* Floating "highlight this" popup, shown while a text selection exists inside the lesson content */}
      {selectionPopup && userId && (
        <button
          onClick={handleAddHighlight}
          style={{ position: "absolute", left: selectionPopup.x, top: selectionPopup.y, transform: "translate(-50%, -100%)" }}
          className="z-[60] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold shadow-lg"
        >
          <Highlighter className="w-3.5 h-3.5" />
          Đánh dấu
        </button>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {previouslyCompleted && (
          <div className="mb-6 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Bạn đã hoàn thành bài này{previousScore ? ` · ${previousScore.score}/${previousScore.total} câu đúng` : ""}
          </div>
        )}

        <span className="text-[10px] font-extrabold text-stone-900 dark:text-white bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded uppercase">
          Module {mod.code}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-3 mb-6">{toTitleCase(mod.title)}</h1>

        {/* Lesson content - select any passage to highlight it */}
        <section className="mb-6" ref={contentRef} onMouseUp={handleTextSelection}>
          {content ? <CfaContentRenderer content={content} /> : null}
        </section>

        {highlights.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span
                key={h.id}
                className="group inline-flex items-center gap-1.5 max-w-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900 rounded-full pl-3 pr-1.5 py-1"
              >
                <Highlighter className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[220px]">{h.quote}</span>
                <button
                  onClick={() => handleDeleteHighlight(h.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {userId && (
          <div className="mb-10 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowNotes((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-stone-900/50 text-xs font-extrabold text-stone-700 dark:text-stone-300 uppercase tracking-wider"
            >
              <span className="inline-flex items-center gap-2">
                <StickyNote className="w-3.5 h-3.5" />
                Ghi chú của bạn {notes.length > 0 && `(${notes.length})`}
              </span>
              <span className="text-stone-400">{showNotes ? "−" : "+"}</span>
            </button>
            {showNotes && (
              <div className="p-4 space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-start gap-2 bg-stone-50 dark:bg-stone-900/40 rounded-lg p-3">
                    <p className="flex-1 text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{note.content}</p>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <div className="flex items-start gap-2">
                  <textarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Viết ghi chú cho bài này..."
                    rows={2}
                    className="flex-1 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400 resize-none"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!noteDraft.trim() || savingNote}
                    className="px-3 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 text-white rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz */}
        {quizQuestions.length > 0 && (
          <section className="border-t border-stone-200 dark:border-stone-800 pt-8">
            <h2 className="text-sm font-extrabold text-stone-900 dark:text-white uppercase tracking-wider mb-5">
              Luyện tập ({quizQuestions.length} câu)
            </h2>

            {quizFinished ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 px-4 text-center border border-stone-200 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-900/10 rounded-2xl"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-white uppercase tracking-wider mb-2">
                  Luyện tập hoàn thành!
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                  Bạn đã trả lời đúng <strong className="text-emerald-500">{correctAnswersCount}</strong> trên tổng số{" "}
                  <strong>{quizQuestions.length}</strong> câu hỏi.
                  {saving && " Đang lưu..."}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-4 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 text-white rounded-lg transition-colors shadow-sm"
                  >
                    Luyện tập lại
                  </button>
                  {nextModule && (
                    <Link
                      href={`/cfa/${nextModule.id}`}
                      className="px-4 py-2 text-xs font-bold border-2 border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      Bài tiếp theo →
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-[10px] text-stone-450 dark:text-stone-500 font-bold uppercase tracking-wider">
                  <span>Câu hỏi {currentQIndex + 1}/{quizQuestions.length}</span>
                  <span className="text-emerald-500">Đúng: {correctAnswersCount}</span>
                </div>
                <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-950 dark:bg-white transition-all duration-300"
                    style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <div className="text-sm font-extrabold text-stone-900 dark:text-white leading-relaxed space-y-4">
                  <CfaContentRenderer content={quizQuestions[currentQIndex].prompt} />
                </div>

                <div className="space-y-3">
                  {(["A", "B", "C"] as const).map((opt) => {
                    const currentQ = quizQuestions[currentQIndex];
                    const optVal = opt === "A" ? currentQ.optionA : opt === "B" ? currentQ.optionB : currentQ.optionC;
                    const isSelected = selectedOption === opt;
                    const isCorrect = currentQ.correct === opt;

                    let optStyle = "border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40";
                    if (isSelected) {
                      optStyle = "border-stone-900 dark:border-white bg-stone-50/50 dark:bg-stone-800/50";
                    }
                    if (showAnswer) {
                      if (isCorrect) {
                        optStyle = "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/15 text-emerald-700 dark:text-emerald-400";
                      } else if (isSelected) {
                        optStyle = "border-rose-500 bg-rose-50/20 dark:bg-rose-950/15 text-rose-700 dark:text-rose-400";
                      } else {
                        optStyle = "border-stone-150 dark:border-stone-850 opacity-60 pointer-events-none";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={showAnswer}
                        onClick={() => setSelectedOption(opt)}
                        className={`w-full flex items-start gap-3 p-3.5 border rounded-xl text-left text-sm font-medium leading-relaxed transition-all ${optStyle}`}
                      >
                        <span className="font-extrabold font-mono flex-shrink-0 text-stone-450 dark:text-stone-500 mt-0.5">
                          {opt}.
                        </span>
                        <span>{renderInlineStyles(optVal)}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-3">
                  {!showAnswer ? (
                    <button
                      disabled={!selectedOption}
                      onClick={handleCheckAnswer}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                        selectedOption
                          ? "bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 text-white shadow-sm cursor-pointer"
                          : "bg-stone-100 text-stone-400 dark:bg-stone-850 dark:text-stone-600 cursor-not-allowed"
                      }`}
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 text-white rounded-lg transition-colors shadow-sm"
                    >
                      {currentQIndex + 1 < quizQuestions.length ? "Câu tiếp theo" : "Hoàn thành"}
                    </button>
                  )}
                </div>

                {showAnswer && quizQuestions[currentQIndex].explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 rounded-xl space-y-2 mt-4"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">
                      <AlertCircle className="w-3.5 h-3.5 text-stone-450" />
                      <span>Giải thích chi tiết</span>
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-normal space-y-4">
                      <CfaContentRenderer content={quizQuestions[currentQIndex].explanation || ""} />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </section>
        )}

        {!quizFinished && nextModule && quizQuestions.length === 0 && (
          <div className="border-t border-stone-200 dark:border-stone-800 pt-6 flex justify-end">
            <Link
              href={`/cfa/${nextModule.id}`}
              className="px-4 py-2 text-xs font-bold border-2 border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Bài tiếp theo →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
