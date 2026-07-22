"use client";

import { useEffect, useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import type { QuizTrack, QuizDifficulty } from "@/lib/supabase-quiz-sessions";

interface Suggestion {
  lessonTitle: string;
  lessonSlug: string;
  track: QuizTrack;
  difficulty: QuizDifficulty;
  totalCompleted: number;
}

const TRACK_LABEL: Record<QuizTrack, string> = {
  personal: "Tài chính cá nhân",
  professional: "Tài chính chuyên ngành",
  cfa: "Tài chính chứng chỉ",
};

const DIFFICULTY_LABEL: Record<QuizDifficulty, string> = {
  "tat-ca": "tất cả độ khó",
  de: "độ khó Dễ",
  "trung-binh": "độ khó Trung bình",
  kho: "độ khó Khó",
};

interface TaiTaiQuizSuggestionProps {
  userId: string;
  onSelect: (track: QuizTrack, difficulty: QuizDifficulty) => void;
}

export default function TaiTaiQuizSuggestion({ userId, onSelect }: TaiTaiQuizSuggestionProps) {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSuggestion = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kiem-tra-suggestion");
      const data = await res.json();
      setSuggestion(data.suggestion ?? null);
    } catch (error) {
      console.error("Error loading kiểm tra suggestion:", error);
      setSuggestion(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSuggestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 flex-1 rounded-full bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  if (!suggestion) {
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <TaiTaiAvatar size={40} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Chào bạn! Tớ là Tài Tài 👋
            </p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Học xong vài bài rồi quay lại đây, tớ sẽ gợi ý ngay một bài kiểm tra phù hợp cho bạn nhé!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <TaiTaiAvatar size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">Tài Tài gợi ý</p>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            Bạn đã học xong <span className="font-bold text-stone-900 dark:text-stone-100">&ldquo;{suggestion.lessonTitle}&rdquo;</span> rồi đó! Thử làm một bài kiểm tra{" "}
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{TRACK_LABEL[suggestion.track]}</span>
            {" "}({DIFFICULTY_LABEL[suggestion.difficulty]}) để ôn lại xem còn nhớ không nhé!
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => onSelect(suggestion.track, suggestion.difficulty)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wide cursor-pointer transition-colors"
            >
              Kiểm tra ngay →
            </button>
            <button
              onClick={() => void loadSuggestion()}
              className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-900 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
              aria-label="Gợi ý bài khác"
              title="Gợi ý bài khác"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
