"use client";

import { useState } from "react";
import { Check, MessageSquare } from "lucide-react";
import { btnPrimary, panel } from "@/components/ui/system";
import { submitLessonFeedback } from "@/lib/cloudflare-feedback";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface Props {
  lessonId: number;
  userId: string | null;
}

export default function LessonFeedbackInline({ lessonId, userId }: Props) {
  const { t } = useI18n();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit() {
    if (rating === 0) return;
    setStatus("sending");
    await submitLessonFeedback(userId, lessonId, rating, comment);
    setStatus("sent");
  }

  const shownRating = hoverRating || rating;

  if (status === "sent") {
    return (
      <div className="border-l-2 border-brand-600 py-1 pl-4 dark:border-brand-400">
        <p className="flex items-center gap-2 text-lg font-black tracking-tight text-ink-max">
          <Check aria-hidden className="h-5 w-5 text-accent-strong" strokeWidth={2.5} />
          {t.lessonFeedback.thanksTitle}
        </p>
        <p className="mt-1 text-sm leading-6 text-ink-soft">{t.lessonFeedback.thanksSubtitle}</p>
      </div>
    );
  }

  return (
    <div className={`${panel} p-5 sm:p-6`}>
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-line-strong text-ink-body dark:border-stone-700">
          <MessageSquare aria-hidden className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-black tracking-tight text-ink-max">{t.lessonFeedback.title}</h3>
          <p className="text-sm leading-6 text-ink-soft">
            {t.lessonFeedback.subtitle}
          </p>
        </div>
      </div>

      <div className="mb-5 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={format(t.lessonFeedback.starAriaLabel, { star })}
            aria-pressed={star <= rating}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              star <= shownRating
                ? "border-brand-600 bg-brand-50 text-accent-strong dark:border-brand-400 dark:bg-brand-950/40"
                : "border-stone-300 text-stone-300 hover:border-stone-950 dark:border-stone-700 dark:text-stone-600"
            }`}
          >
            <span aria-hidden>★</span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder={t.lessonFeedback.commentPlaceholder}
        className="mb-4 w-full resize-none rounded-sm border border-line-strong bg-white px-3 py-2.5 text-base leading-7 text-ink placeholder:text-stone-500 focus:border-brand-600 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400"
      />

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || status === "sending"}
        className={`${btnPrimary} w-full`}
      >
        {status === "sending" ? t.lessonFeedback.sendingButton : t.lessonFeedback.submitButton}
      </button>
    </div>
  );
}
