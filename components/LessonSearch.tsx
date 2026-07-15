"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { searchLessonsAction, type LessonSearchResult } from "@/lib/lesson-search";

const TRACK_LABEL: Record<string, string> = {
  personal: "Cá nhân",
  professional: "Chuyên nghiệp",
  bonus: "Case chuyên sâu",
};

// Reachable from every signed-in page via AppNavbar. Debounced search over
// the full lesson catalog (server-side, via a Server Action - the ~1.3MB
// lesson dataset never reaches the client, only the handful of matches).
export default function LessonSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LessonSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      searchLessonsAction(query)
        .then(setResults)
        .catch((err) => console.error("Error searching lessons:", err))
        .finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSelect(slug: string) {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(`/bai-hoc/${slug}`);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title="Tìm bài học"
        aria-label="Tìm bài học"
        className="flex items-center justify-center w-9 h-9 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
      >
        <Search className="w-[18px] h-[18px]" />
      </button>

      {open && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-[60px] sm:top-full sm:mt-2 sm:w-96 z-50 space-y-2">
          <div className="flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-3 py-2.5 shadow-lg">
            <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
                if (e.key === "Enter" && results[0]) handleSelect(results[0].slug);
              }}
              placeholder="Tìm bài học (VD: ROE, lãi kép...)"
              className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none min-w-0"
            />
            {loading ? (
              <Loader2 className="w-4 h-4 text-stone-400 animate-spin flex-shrink-0" />
            ) : (
              <button onClick={() => setOpen(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {query.trim().length >= 2 && (
            <div className="max-h-96 overflow-y-auto bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-lg">
              {results.length === 0 && !loading ? (
                <p className="px-4 py-6 text-sm text-center text-stone-400 dark:text-stone-500">
                  Không tìm thấy bài học nào khớp &quot;{query}&quot;.
                </p>
              ) : (
                <ul className="py-1.5">
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => handleSelect(r.slug)}
                        className="w-full text-left px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                      >
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{r.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {r.track && (
                            <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                              {TRACK_LABEL[r.track] ?? r.track}
                            </span>
                          )}
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{r.subtitle}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
