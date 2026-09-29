"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RefreshCcw } from "lucide-react";
import type { QuizTrack, QuizDifficulty } from "@/lib/cloudflare-quiz-sessions";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { Sys } from "@/components/ui/system";

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
    interview: t.quizSuggestion.trackInterview,
    "mock-interview": t.quizSuggestion.trackMockInterview,
    cert: t.nav.certificates,
  };
}

function difficultyLabels(t: Dictionary): Record<QuizDifficulty, string> {
  return {
    "tat-ca": t.quizPage.diffAll,
    de: t.quizPage.diffEasy,
    "trung-binh": t.quizPage.diffMedium,
    kho: t.quizPage.diffHard,
  };
}

interface CoCoQuizSuggestionProps {
  userId: string;
  onSelect: (track: QuizTrack, difficulty: QuizDifficulty) => void;
}

/** Gợi ý một phiên luyện theo bài vừa học.
 *
 *  Nằm trong TRAINING LAB, ngay dưới lời chào của Cơ Cơ - nên nó không vẽ
 *  thêm avatar thứ hai, chỉ là một dòng cấu hình dựng sẵn: bài gốc, mảng, độ
 *  khó, và một nút chạy. Bấm là chạy luôn với đúng cấu hình ấy. */
export default function CoCoQuizSuggestion({ userId, onSelect }: CoCoQuizSuggestionProps) {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tải gợi ý từ API khi đổi người dùng; không có nguồn nào để đọc lúc render
    void loadSuggestion();
  }, [userId]);

  if (loading) {
    return <div className="h-12 border-l-2 border-line bg-surface-sunken/60 motion-safe:animate-pulse" aria-hidden />;
  }

  if (!suggestion) {
    return (
      <p className="border-l-2 border-line pl-3 text-xs leading-relaxed text-ink-muted">
        {t.revampQuiz.suggestionEmpty}
      </p>
    );
  }

  return (
    <section className="flex items-center gap-3 border-l-2 border-accent-line pl-3">
      <div className="min-w-0 flex-1">
        <Sys className="text-ink-muted">{t.revampQuiz.suggestionLabel}</Sys>
        <p className="mt-0.5 truncate text-sm font-bold text-ink-max" title={suggestion.lessonTitle}>
          {t.quizSuggestion.quoteOpen}
          {suggestion.lessonTitle}
          {t.quizSuggestion.quoteClose}
        </p>
        <p className="text-xs text-ink-muted">
          <span className="font-semibold text-ink-body">{TRACK_LABEL[suggestion.track]}</span>
          <span aria-hidden className="mx-1.5 inline-block h-1 w-1 translate-y-[-2px] bg-stone-400 dark:bg-stone-600" />
          <span>{DIFFICULTY_LABEL[suggestion.difficulty]}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => onSelect(suggestion.track, suggestion.difficulty)}
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-bold text-accent-strong transition-colors hover:bg-accent-soft cursor-pointer"
      >
        {t.revampQuiz.suggestionRun}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => void loadSuggestion()}
        className="shrink-0 p-1.5 text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink-body cursor-pointer"
        aria-label={t.quizSuggestion.refreshAria}
        title={t.quizSuggestion.refreshAria}
      >
        <RefreshCcw className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
