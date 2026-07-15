"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { BookOpen, X, Loader2 } from "lucide-react";
import katex from "katex";
import type { LessonMeta } from "@/lib/lesson-types";
import type { CfaSubject } from "@/lib/cfa-track";

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  level: string;
  createdAt: string;
}

interface Reading {
  id: string;
  bookId: string;
  code: string;
  title: string;
  order: number | null;
  pageStart: number | null;
  pageEnd: number | null;
  modules?: Module[];
}

interface Module {
  id: string;
  readingId: string;
  code: string;
  title: string;
  order: number | null;
}

interface Props {
  subjects: { subject: CfaSubject; lessons: LessonMeta[] }[];
}

// Renders inline math $...$ and bold **...**
function renderInlineStyles(text: string): React.ReactNode[] {
  const parts = text.split(/\$([^$]+?)\$/g);
  return parts.map((part, i) => {
    // Odd indices are math segments
    if (i % 2 === 1) {
      try {
        const html = katex.renderToString(part, { throwOnError: false, displayMode: false });
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch (err) {
        return <code key={i} className="font-mono text-xs bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">{part}</code>;
      }
    }

    // Even indices are plain text. We handle bold **...**
    const boldParts = part.split(/\*\*([^*]+?)\*\*/g);
    return boldParts.map((subPart, j) => {
      if (j % 2 === 1) {
        return (
          <strong key={`${i}-${j}`} className="font-extrabold text-stone-900 dark:text-white">
            {subPart}
          </strong>
        );
      }
      return <span key={`${i}-${j}`}>{subPart}</span>;
    });
  });
}

// Custom Markdown & Math Renderer
function LessonContentRenderer({ content }: { content: string }) {
  const blocks = content.split(/\$\$([\s\S]+?)\$\$/g);

  return (
    <div className="space-y-4 text-sm text-stone-750 dark:text-stone-300 leading-relaxed font-normal">
      {blocks.map((block, index) => {
        // Odd indices are block math
        if (index % 2 === 1) {
          try {
            const html = katex.renderToString(block, { throwOnError: false, displayMode: true });
            return (
              <div key={index} className="my-5 overflow-x-auto py-3 bg-stone-50 dark:bg-stone-900/30 rounded-xl px-4 border border-stone-200/50 dark:border-stone-800 shadow-inner">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            );
          } catch (err) {
            return (
              <pre key={index} className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-x-auto text-xs font-mono">
                {block}
              </pre>
            );
          }
        }

        // Even indices are standard lines
        const lines = block.split("\n");
        let listItems: string[] = [];
        let tableRows: string[][] = [];
        const renderedElements: React.ReactNode[] = [];

        const flushList = (key: string) => {
          if (listItems.length > 0) {
            renderedElements.push(
              <ul key={key} className="list-disc pl-5 space-y-1.5 my-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-stone-700 dark:text-stone-300">
                    {renderInlineStyles(item)}
                  </li>
                ))}
              </ul>
            );
            listItems = [];
          }
        };

        const flushTable = (key: string) => {
          if (tableRows.length > 0) {
            // First row is header
            const headerCols = tableRows[0];
            // Second row is separator (e.g. |:---|:---|), skip it
            const bodyRows = tableRows.slice(2);

            renderedElements.push(
              <div key={key} className="my-4 overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 text-xs text-left">
                  <thead className="bg-stone-50 dark:bg-stone-900/60 text-stone-700 dark:text-stone-300 font-extrabold uppercase tracking-wider">
                    <tr>
                      {headerCols.map((col, idx) => (
                        <th key={idx} className="px-4 py-3 font-extrabold">
                          {renderInlineStyles(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-850 bg-white dark:bg-stone-900">
                    {bodyRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition-colors odd:bg-white even:bg-stone-50/30 dark:odd:bg-stone-900 dark:even:bg-stone-900/30">
                        {row.map((col, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-stone-600 dark:text-stone-400">
                            {renderInlineStyles(col)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            tableRows = [];
          }
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmed = line.trim();

          if (!trimmed) {
            flushList(`list-flush-${i}`);
            flushTable(`table-flush-${i}`);
            continue;
          }

          // Detect table lines starting with |
          if (trimmed.startsWith("|")) {
            flushList(`list-table-${i}`);
            const cols = line.split("|").map(c => c.trim());
            if (line.trim().startsWith("|")) cols.shift();
            if (line.trim().endsWith("|")) cols.pop();
            tableRows.push(cols);
            continue;
          } else {
            flushTable(`table-flush-${i}`);
          }

          // Headings
          if (trimmed.startsWith("# ")) {
            flushList(`list-h1-${i}`);
            renderedElements.push(
              <h1 key={i} className="text-lg font-extrabold text-stone-900 dark:text-white mt-6 mb-3 border-b border-stone-200 dark:border-stone-800 pb-1.5 first:mt-0">
                {renderInlineStyles(trimmed.slice(2))}
              </h1>
            );
          } else if (trimmed.startsWith("## ")) {
            flushList(`list-h2-${i}`);
            renderedElements.push(
              <h2 key={i} className="text-base font-extrabold text-stone-900 dark:text-white mt-5 mb-2">
                {renderInlineStyles(trimmed.slice(3))}
              </h2>
            );
          } else if (trimmed.startsWith("### ")) {
            flushList(`list-h3-${i}`);
            renderedElements.push(
              <h3 key={i} className="text-sm font-extrabold text-stone-850 dark:text-stone-200 mt-4 mb-1.5">
                {renderInlineStyles(trimmed.slice(4))}
              </h3>
            );
          }
          // Blockquotes / Callouts
          else if (trimmed.startsWith("> ")) {
            flushList(`list-bq-${i}`);
            renderedElements.push(
              <blockquote key={i} className="pl-4 border-l-4 border-stone-300 dark:border-stone-700 italic text-stone-600 dark:text-stone-400 my-3">
                {renderInlineStyles(trimmed.slice(2))}
              </blockquote>
            );
          }
          // Lists
          else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
            listItems.push(trimmed.slice(2));
          }
          // Numbered Lists
          else if (/^\d+\.\s+/.test(trimmed)) {
            flushList(`list-num-${i}`);
            const text = trimmed.replace(/^\d+\.\s+/, "");
            renderedElements.push(
              <div key={i} className="flex gap-2 pl-1 my-2 text-stone-700 dark:text-stone-300">
                <span className="font-bold text-stone-900 dark:text-white font-mono">{trimmed.match(/^\d+/)?.[0]}.</span>
                <div className="flex-1">{renderInlineStyles(text)}</div>
              </div>
            );
          }
          // Paragraphs
          else {
            flushList(`list-p-${i}`);
            renderedElements.push(
              <p key={i} className="my-2 text-stone-700 dark:text-stone-300">
                {renderInlineStyles(line)}
              </p>
            );
          }
        }

        flushList(`list-final-${index}`);
        flushTable(`table-final-${index}`);
        return <div key={index}>{renderedElements}</div>;
      })}
    </div>
  );
}

export default function CfaTrackView({ subjects }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal and Readings/Modules state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loadingReadings, setLoadingReadings] = useState(false);

  // Selected Module details state
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [lessonContent, setLessonContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("Book")
          .select("*")
          .order("id", { ascending: true });
        if (!error && data) {
          const primaryBooks = data.filter((b: Book) => b.id.startsWith("book-"));
          setBooks(primaryBooks);
        }
      } catch (err) {
        console.error("Error loading books:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Fetch readings & modules when a book is selected
  useEffect(() => {
    if (!selectedBook) {
      setReadings([]);
      setActiveModule(null);
      return;
    }

    const bookId = selectedBook.id;

    async function fetchReadingsAndModules() {
      setLoadingReadings(true);
      try {
        const supabase = createClient();
        
        // 1. Fetch Readings
        const { data: readingsData, error: readingsError } = await supabase
          .from("Reading")
          .select("*")
          .eq("bookId", bookId)
          .order("order", { ascending: true });

        if (readingsError) throw readingsError;

        if (readingsData && readingsData.length > 0) {
          const readingIds = readingsData.map(r => r.id);

          // 2. Fetch Modules for these Readings
          const { data: modulesData, error: modulesError } = await supabase
            .from("Module")
            .select("*")
            .in("readingId", readingIds)
            .order("order", { ascending: true });

          if (modulesError) throw modulesError;

          // 3. Map Modules to their parent Readings
          const readingsWithModules = readingsData.map(reading => ({
            ...reading,
            modules: (modulesData || []).filter(m => m.readingId === reading.id)
          }));

          setReadings(readingsWithModules);
        } else {
          setReadings([]);
        }
      } catch (err) {
        console.error("Error loading readings and modules:", err);
      } finally {
        setLoadingReadings(false);
      }
    }

    fetchReadingsAndModules();
  }, [selectedBook]);

  // Fetch lesson content when a module is selected
  useEffect(() => {
    if (!activeModule) {
      setLessonContent(null);
      return;
    }

    const moduleId = activeModule.id;

    async function fetchLessonContent() {
      setLoadingContent(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("LessonContent")
          .select("content")
          .eq("moduleId", moduleId)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setLessonContent(data.content);
        } else {
          setLessonContent("Bài học này chưa có nội dung chi tiết.");
        }
      } catch (err) {
        console.error("Error loading lesson content:", err);
        setLessonContent("Không thể tải nội dung bài học. Vui lòng thử lại sau.");
      } finally {
        setLoadingContent(false);
      }
    }

    fetchLessonContent();
  }, [activeModule]);

  return (
    <div className="py-2">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 p-4 animate-pulse">
              <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800 rounded-lg mb-3" />
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-2" />
              <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onClick={() => setSelectedBook(book)}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="aspect-[3/4] overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
                  {book.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-extrabold text-stone-900 dark:text-white line-clamp-1 mb-1">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1">
                <span className="text-[9px] font-bold text-stone-900 dark:text-stone-900 bg-stone-200 dark:bg-stone-100 px-2 py-0.5 rounded uppercase">
                  {book.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-xs text-stone-400 dark:text-stone-500 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-900/20">
          Chưa có giáo trình nào được lưu.
        </div>
      )}

      {/* Book Readings Details Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col md:flex-row w-full max-w-4xl h-[85vh] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Book Details */}
              <div className="md:w-1/3 p-6 flex flex-col items-center bg-stone-50 dark:bg-stone-900/40 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 overflow-y-auto">
                <div className="w-36 aspect-[3/4] rounded-lg overflow-hidden shadow-md bg-stone-200 dark:bg-stone-800 relative flex-shrink-0">
                  {selectedBook.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-white text-center mt-4 leading-snug">
                  {selectedBook.title}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center mt-2 leading-relaxed">
                  {selectedBook.description}
                </p>
                <span className="mt-4 text-[9px] font-bold text-stone-900 dark:text-stone-900 bg-stone-200 dark:bg-stone-100 px-2.5 py-0.5 rounded uppercase">
                  {selectedBook.level}
                </span>
              </div>

              {/* Right Column: Readings List OR Active Module Content */}
              <div className="md:w-2/3 p-6 overflow-y-auto flex flex-col min-h-[300px]">
                {activeModule ? (
                  // MODULE CONTENT VIEW
                  <div className="flex-1 flex flex-col">
                    {/* Back Header */}
                    <div className="flex items-center gap-2 mb-4 border-b border-stone-150 dark:border-stone-800 pb-3">
                      <button
                        onClick={() => setActiveModule(null)}
                        className="text-xs font-extrabold text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
                      >
                        ← Danh sách bài đọc
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-extrabold text-stone-900 dark:text-white bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded uppercase flex-shrink-0">
                        Module {activeModule.code}
                      </span>
                      <h4 className="text-sm font-extrabold text-stone-900 dark:text-white">
                        {activeModule.title}
                      </h4>
                    </div>

                    {/* Lesson Content Body */}
                    <div className="flex-1">
                      {loadingContent ? (
                        <div className="h-full min-h-[200px] flex flex-col justify-center items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-stone-500 dark:text-stone-400" />
                          <span className="text-xs text-stone-500 dark:text-stone-400">Đang tải nội dung bài học...</span>
                        </div>
                      ) : lessonContent ? (
                        <LessonContentRenderer content={lessonContent} />
                      ) : (
                        <div className="text-xs text-stone-450 dark:text-stone-500 text-center py-10">
                          Bài học này chưa có nội dung chi tiết.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // READINGS LIST VIEW
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-200 uppercase tracking-widest mb-4">
                      Danh sách Reading ({readings.length})
                    </h4>

                    {loadingReadings ? (
                      <div className="flex-1 flex flex-col justify-center items-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-stone-500 dark:text-stone-400" />
                        <span className="text-xs text-stone-500 dark:text-stone-400">Đang tải bài đọc...</span>
                      </div>
                    ) : readings.length > 0 ? (
                      <div className="space-y-4 divide-y divide-stone-100 dark:divide-stone-800">
                        {readings.map((reading) => (
                          <div
                            key={reading.id}
                            className="pt-4 first:pt-0 flex flex-col gap-2"
                          >
                            {/* Reading Header */}
                            <div className="flex items-start gap-3">
                              <span className="text-[10px] font-extrabold text-stone-900 dark:text-white bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded flex-shrink-0">
                                {reading.code}
                              </span>
                              <span className="text-xs text-stone-900 dark:text-stone-100 font-extrabold leading-relaxed">
                                {reading.title}
                              </span>
                            </div>

                            {/* Nested Modules */}
                            {reading.modules && reading.modules.length > 0 && (
                              <div className="ml-8 pl-3 border-l border-stone-200 dark:border-stone-800 space-y-2 py-1">
                                {reading.modules.map((mod) => (
                                  <div
                                    key={mod.id}
                                    onClick={() => setActiveModule(mod)}
                                    className="flex items-start gap-2.5 hover:bg-stone-100/50 dark:hover:bg-stone-800/40 p-1.5 rounded-lg cursor-pointer transition-colors group"
                                  >
                                    <span className="text-[9px] font-bold text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                                      {mod.code}
                                    </span>
                                    <span className="text-[11px] text-stone-600 dark:text-stone-300 font-medium leading-tight group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                                      {mod.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-xs text-stone-400 dark:text-stone-500 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl p-6">
                        Chưa có Reading nào trong cuốn sách này.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
