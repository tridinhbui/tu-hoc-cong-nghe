"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Highlighter,
  StickyNote,
  Trash2,
  X,
} from "lucide-react";
import CfaContentRenderer, { renderInlineStyles } from "@/components/CfaContentRenderer";
import CfaQuizSidebar, { type CfaQuizQuestion } from "@/components/CfaQuizSidebar";
import OpeningQuestionBlock from "@/components/OpeningQuestionBlock";
import { LessonSummaryCard, ReviewLoopCard } from "@/components/LessonLearningBlocks";
import InteractiveWidget, { type WidgetType } from "@/components/InteractiveWidget";
import FontSizeControl, { loadFontScale } from "@/components/FontSizeControl";
import ReadingModeControl, { loadReadingMode, type ReadingMode } from "@/components/ReadingModeControl";
import { setTheme } from "@/lib/theme";
import { toTitleCase, extractYouTubeId } from "@/lib/cfa-format";
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
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

const INTERACTIVE_WIDGET_TYPES = new Set<string>([
  "interest-rate",
  "supply-demand",
  "profit-calc",
  "roe",
  "bond",
  "money-vs-asset",
  "cash-flow-simulator",
  "inflation-calculator",
]);

interface ModuleRow {
  id: string;
  readingId: string;
  code: string;
  title: string;
  order: number | null;
  videoUrl: string | null;
  interactiveType: string | null;
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

interface QuizQuestionRow {
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
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [mod, setMod] = useState<ModuleRow | null>(null);
  const [reading, setReading] = useState<ReadingRow | null>(null);
  const [book, setBook] = useState<BookRow | null>(null);
  const [siblingModules, setSiblingModules] = useState<ModuleRow[]>([]);

  const [content, setContent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionRow[]>([]);

  const [previouslyCompleted, setPreviouslyCompleted] = useState(false);
  const [previousScore, setPreviousScore] = useState<{ score: number; total: number } | null>(null);
  const [quizJustFinished, setQuizJustFinished] = useState(false);

  // Reading toolbar - identical controls/storage keys to components/LessonPageLayout.tsx
  // so a preference set on a regular lesson carries over here, and vice versa.
  const [fontScale, setFontScale] = useState(() => (typeof window === "undefined" ? 1.125 : loadFontScale()));
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => (typeof window === "undefined" ? "light" : loadReadingMode()));
  useEffect(() => {
    setTheme(readingMode === "dark" ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      // ~8 Supabase round trips grouped into parallel waves instead of one
      // after another - only serialized where a query's filter genuinely
      // depends on a prior result (Reading needs modData.readingId; Book/
      // siblings need readingData; quiz questions need the header's id).
      const [{ data: user }, { data: modData, error: modError }] = await Promise.all([
        supabase.auth.getUser().then((r) => ({ data: r.data.user })),
        supabase.from("Module").select("*").eq("id", moduleId).maybeSingle(),
      ]);
      if (!cancelled) setUserId(user?.id ?? null);

      if (modError || !modData) {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
        return;
      }
      if (cancelled) return;
      setMod(modData);

      const [{ data: readingData }, { data: contentData }, { data: headerData }] = await Promise.all([
        supabase.from("Reading").select("*").eq("id", modData.readingId).maybeSingle(),
        supabase.from("LessonContent").select("content").eq("moduleId", moduleId).maybeSingle(),
        supabase.from("ModuleQuizHeader").select("*").eq("moduleId", moduleId).maybeSingle(),
      ]);
      if (cancelled) return;
      if (readingData) setReading(readingData);
      setContent(contentData ? contentData.content : t.cfaModule.noDetailedContent);

      const followUps: PromiseLike<void>[] = [];

      if (readingData) {
        followUps.push(
          supabase
            .from("Book")
            .select("id, title")
            .eq("id", readingData.bookId)
            .maybeSingle()
            .then(({ data: bookData }) => {
              if (!cancelled && bookData) setBook(bookData);
            }),
          supabase
            .from("Module")
            .select("*")
            .eq("readingId", readingData.id)
            .order("order", { ascending: true })
            .then(({ data: siblings }) => {
              if (!cancelled && siblings) setSiblingModules(siblings);
            })
        );
      }

      if (headerData) {
        followUps.push(
          supabase
            .from("ModuleQuizQuestion")
            .select("*")
            .eq("headerId", headerData.id)
            .order("questionNo", { ascending: true })
            .then(({ data: qData }) => {
              if (!cancelled) setQuizQuestions(qData || []);
            })
        );
      }

      if (user?.id) {
        followUps.push(
          getCfaModuleProgress(user.id, moduleId)
            .then((progress) => {
              if (!cancelled && progress?.completed) {
                setPreviouslyCompleted(true);
                if (progress.quiz_score != null && progress.quiz_total != null) {
                  setPreviousScore({ score: progress.quiz_score, total: progress.quiz_total });
                }
              }
            })
            .catch((err) => console.error("Error loading CFA module progress:", err)),
          Promise.all([
            isCfaModuleBookmarked(user.id, moduleId),
            getCfaModuleNotes(user.id, moduleId),
            getCfaModuleHighlights(user.id, moduleId),
          ])
            .then(([isBookmarked, moduleNotes, moduleHighlights]) => {
              if (!cancelled) {
                setBookmarked(isBookmarked);
                setNotes(moduleNotes);
                setHighlights(moduleHighlights);
              }
            })
            .catch((err) => console.error("Error loading CFA module bookmark/notes/highlights:", err))
        );
      }

      await Promise.all(followUps);
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  // Converts ModuleQuizQuestion's optionA/B/C + a correct letter into the
  // {question, options, correct, explanation} shape CfaQuizSidebar shares
  // with the regular lesson page's quiz - rendered through CfaContentRenderer/
  // renderInlineStyles (not raw strings) so formatting in the source content
  // (bold, formulas, etc.) still shows up like it did in the old quiz block.
  const normalizedQuiz: CfaQuizQuestion[] = useMemo(
    () =>
      quizQuestions.map((q) => ({
        question: <CfaContentRenderer content={q.prompt} />,
        options: [renderInlineStyles(q.optionA), renderInlineStyles(q.optionB), renderInlineStyles(q.optionC)],
        correct: ["A", "B", "C"].indexOf(q.correct),
        explanation: <CfaContentRenderer content={q.explanation || ""} />,
      })),
    [quizQuestions]
  );

  // Mirrors the regular lesson page: pull one question out as an opening
  // challenge shown before the reading content, leaving the rest for the
  // end-of-module quiz sidebar - only when there's more than one question,
  // so a module with just a single question doesn't lose its only quiz item.
  const hasOpeningQuestion = normalizedQuiz.length > 1;
  const openingQuestion = hasOpeningQuestion ? normalizedQuiz[0] : null;
  const sidebarQuiz = hasOpeningQuestion ? normalizedQuiz.slice(1) : normalizedQuiz;

  // End-of-module summary card, generated the same generic way regular
  // lessons fall back to buildDefaultSummary() when no hand-authored summary
  // exists - CFA modules have no authored summary field, so this is always
  // the synthesized version rather than special-cased per module.
  const moduleSummary = useMemo(() => {
    const title = toTitleCase(mod?.title ?? "");
    return {
      keyIdea: format(t.cfaModule.summaryKeyIdea, { title }),
      commonMistake: t.cfaModule.summaryCommonMistake,
      action: t.cfaModule.summaryAction,
    };
  }, [mod?.title, t]);

  async function handleQuizFinish(score: number, total: number) {
    setQuizJustFinished(true);
    if (!userId) return;
    try {
      await markCfaModuleComplete(userId, moduleId, score, total);
      await updateStreak(userId);
    } catch (err) {
      console.error("Error saving CFA module progress:", err);
    }
  }

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
  const videoId = mod?.videoUrl ? extractYouTubeId(mod.videoUrl) : null;
  const widgetType =
    mod?.interactiveType && INTERACTIVE_WIDGET_TYPES.has(mod.interactiveType) ? (mod.interactiveType as WidgetType) : null;

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
        <p className="text-sm text-stone-500 dark:text-stone-400">{t.cfaModule.notFoundMessage}</p>
        <Link href="/cfa" className="text-sm font-bold text-stone-900 dark:text-stone-100 underline">
          {t.cfaModule.notFoundBackLink}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Sticky header - mirrors components/LessonPageLayout.tsx's header (same
          FontSizeControl/ReadingModeControl components, same bookmark button
          styling) so CFA reads as part of the same product, not a bolted-on
          section. */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-50">
        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: previouslyCompleted || quizJustFinished ? "100%" : "0%" }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/cfa"
              aria-label={t.cfaModule.backAriaLabel}
              className="inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap w-9 h-9 sm:w-auto sm:px-4 sm:py-2 justify-center rounded-full sm:rounded-lg border-2 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-900 dark:hover:text-stone-100 bg-white dark:bg-stone-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{t.cfaModule.backLabel}</span>
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
            <FontSizeControl scale={fontScale} onChange={setFontScale} />
            <ReadingModeControl mode={readingMode} onChange={setReadingMode} />
            {userId && (
              <button
                onClick={handleToggleBookmark}
                disabled={togglingBookmark}
                title={bookmarked ? t.cfaModule.bookmarkTitleOn : t.cfaModule.bookmarkTitleOff}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  bookmarked
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                } ${togglingBookmark ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
              >
                {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            )}
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 inline-flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              {t.cfaModule.levelBadge}
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
          {t.cfaModule.highlightButton}
        </button>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {previouslyCompleted && (
          <div className="mb-6 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {t.cfaModule.completedBanner}
            {previousScore ? format(t.cfaModule.completedScoreSuffix, { score: previousScore.score, total: previousScore.total }) : ""}
          </div>
        )}

        <span className="text-[10px] font-extrabold text-stone-900 dark:text-white bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded uppercase">
          {format(t.cfaModule.moduleLabel, { code: mod.code })}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-3 mb-6">{toTitleCase(mod.title)}</h1>

        {/* Opening question - same UI regular lessons use to open with a
            question before the reading content, built from this module's
            own first quiz question instead of separately-authored content. */}
        {openingQuestion && (
          <div className="mb-8 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 bg-stone-50/50 dark:bg-stone-900/30">
            <OpeningQuestionBlock
              question={openingQuestion.question}
              options={openingQuestion.options}
              correct={openingQuestion.correct}
              explanation={openingQuestion.explanation}
            />
          </div>
        )}

        {videoId && (
          <div className="mb-6 aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={toTitleCase(mod.title)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Lesson content - `zoom` (not fontSize) so the reading-size control
            rescales the whole subtree uniformly, same technique as
            LessonPageLayout. Select any passage to highlight it. */}
        <section
          className={`mb-6 ${readingMode === "sepia" ? "reading-sepia" : ""}`}
          style={{ zoom: fontScale }}
          ref={contentRef}
          onMouseUp={handleTextSelection}
        >
          {content ? <CfaContentRenderer content={content} /> : null}
        </section>

        {widgetType && (
          <div className="mb-6">
            <InteractiveWidget type={widgetType} />
          </div>
        )}

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
                {t.cfaModule.notesHeader}
                {notes.length > 0 && format(t.cfaModule.notesCount, { count: notes.length })}
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
                    placeholder={t.cfaModule.notePlaceholder}
                    rows={2}
                    className="flex-1 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400 resize-none"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!noteDraft.trim() || savingNote}
                    className="px-3 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 text-white rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    {t.cfaModule.saveButton}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary + review-loop cards - same end-of-lesson recap regular
            lessons show, placed before the quiz sidebar to mirror
            LessonPageClient's layout order. */}
        <div className="mb-8 space-y-4">
          <LessonSummaryCard summary={moduleSummary} />
          <ReviewLoopCard
            prompt={format(t.cfaModule.reviewLoopPrompt, { keyIdea: moduleSummary.keyIdea })}
            cta={t.cfaModule.reviewLoopCta}
          />
        </div>

        {/* Quiz - visually identical to the regular lesson page's sidebar
            quiz (components/CfaQuizSidebar.tsx mirrors
            components/LessonPageLayout.tsx's quiz block). */}
        {sidebarQuiz.length > 0 && (
          <section className="border-t border-stone-200 dark:border-stone-800 pt-8">
            <h2 className="text-sm font-extrabold text-stone-900 dark:text-white uppercase tracking-wider mb-5">
              {format(t.cfaModule.practiceHeader, { count: sidebarQuiz.length })}
            </h2>
            <CfaQuizSidebar quiz={sidebarQuiz} onFinish={handleQuizFinish} nextModuleId={nextModule?.id ?? null} />
          </section>
        )}

        {sidebarQuiz.length === 0 && nextModule && (
          <div className="border-t border-stone-200 dark:border-stone-800 pt-6 flex justify-end">
            <Link
              href={`/cfa/${nextModule.id}`}
              className="px-4 py-2 text-xs font-bold border-2 border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {t.cfaModule.nextModuleLink}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
