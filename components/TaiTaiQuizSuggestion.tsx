"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import type { QuizTrack, QuizDifficulty } from "@/lib/supabase-quiz-sessions";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface Suggestion {
  lessonTitle: string;
  lessonSlug: string;
  track: QuizTrack;
  difficulty: QuizDifficulty;
  totalCompleted: number;
}

function trackLabels(t: Dictionary): Record<QuizTrack, string> {
  return {
    personal: t.quizSuggestion.trackPersonal,
    professional: t.quizSuggestion.trackProfessional,
    cfa: t.quizSuggestion.trackCfa,
    frm: t.quizSuggestion.trackFrm,
    ib: t.quizSuggestion.trackIb,
    "mock-interview": t.quizSuggestion.trackMockInterview,
  };
}

function difficultyLabels(t: Dictionary): Record<QuizDifficulty, string> {
  return {
    "tat-ca": t.quizSuggestion.difficultyAll,
    de: t.quizSuggestion.difficultyEasy,
    "trung-binh": t.quizSuggestion.difficultyMedium,
    kho: t.quizSuggestion.difficultyHard,
  };
}

interface TaiTaiQuizSuggestionProps {
  userId: string;
  onSelect: (track: QuizTrack, difficulty: QuizDifficulty) => void;
}

export default function TaiTaiQuizSuggestion({ userId, onSelect }: TaiTaiQuizSuggestionProps) {
  const { t } = useI18n();
  const TRACK_LABEL = useMemo(() => trackLabels(t), [t]);
  const DIFFICULTY_LABEL = useMemo(() => difficultyLabels(t), [t]);
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
              {t.quizSuggestion.greeting}
            </p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t.quizSuggestion.noSuggestionMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Gợi ý, không phải mệnh lệnh. Trước đây đây là một khối nền xanh có viền
    // xanh và đổ bóng, đặt ngay đầu cột thiết lập - tức thứ NỔI NHẤT trên cột
    // lại là một đề xuất tự động, đứng trên chính hai bước mà người dùng vào
    // đây để làm. Giờ nó là một khối chữ trên nền trang, ngăn bằng nét kẻ dưới,
    // và avatar hạ từ 44px xuống 28px.
    <section className="pb-4 border-b border-stone-200/80 dark:border-stone-800">
      <div className="flex items-start gap-2.5">
        <TaiTaiAvatar size={28} />
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-stone-400 dark:text-stone-500">{t.quizSuggestion.suggestionLabel}</p>
          <p className="mt-1.5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {t.quizSuggestion.messagePart1} <span className="font-bold text-stone-900 dark:text-stone-100">{t.quizSuggestion.quoteOpen}{suggestion.lessonTitle}{t.quizSuggestion.quoteClose}</span> {t.quizSuggestion.messagePart2}{" "}
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{TRACK_LABEL[suggestion.track]}</span>
            {" "}({DIFFICULTY_LABEL[suggestion.difficulty]}) {t.quizSuggestion.messagePart3}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => onSelect(suggestion.track, suggestion.difficulty)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 decoration-emerald-300 hover:decoration-emerald-500 cursor-pointer transition-colors dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              {t.quizSuggestion.ctaButton}
            </button>
            <button
              onClick={() => void loadSuggestion()}
              className="p-1.5 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
              aria-label={t.quizSuggestion.refreshAria}
              title={t.quizSuggestion.refreshAria}
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
