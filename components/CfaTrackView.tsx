"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { BookOpen } from "lucide-react";
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

interface Props {
  subjects: { subject: CfaSubject; lessons: LessonMeta[] }[];
}

export default function CfaTrackView({ subjects }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("Book")
          .select("*")
          .order("id", { ascending: true });
        if (!error && data) {
          // Filter to show only the 4 primary books starting with 'book-'
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
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
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
    </div>
  );
}
