"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { BookOpen, X, Loader2 } from "lucide-react";
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

export default function CfaTrackView({ subjects }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal and Readings state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loadingReadings, setLoadingReadings] = useState(false);

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
      return;
    }

    async function fetchReadingsAndModules() {
      setLoadingReadings(true);
      try {
        const supabase = createClient();
        
        // 1. Fetch Readings
        const { data: readingsData, error: readingsError } = await supabase
          .from("Reading")
          .select("*")
          .eq("bookId", selectedBook.id)
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
              className="relative flex flex-col md:flex-row w-full max-w-4xl max-h-[85vh] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-2xl z-10"
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

              {/* Right Column: Readings List */}
              <div className="md:w-2/3 p-6 overflow-y-auto flex flex-col min-h-[300px]">
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
                              <div key={mod.id} className="flex items-start gap-2.5">
                                <span className="text-[9px] font-bold text-stone-500 dark:text-stone-400 font-mono">
                                  {mod.code}
                                </span>
                                <span className="text-[11px] text-stone-600 dark:text-stone-300 font-medium leading-tight">
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
