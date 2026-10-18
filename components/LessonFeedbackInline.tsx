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

  // Một dòng cho tới khi người học chọn sao: tiêu đề và năm ngôi sao. Ô viết
  // và nút gửi chỉ mở ra sau đó. Bản mở sẵn cao 431px ở 390px, đứng giữa thân
  // bài và quiz trên điện thoại, cho một việc mà đa số người học bỏ qua (F-8,
  // lượt bốn). Chọn sao vẫn là bước đầu tiên như trước - chưa chọn thì nút gửi
  // vốn đã bị khoá - nên không có bước nào bị thêm vào.
  const open = rating > 0;

  return (
    <div className={`${panel} p-4 sm:p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-line-strong text-ink-body dark:border-stone-700">
            <MessageSquare aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <h3 className="text-base font-black tracking-tight text-ink-max sm:text-lg">{t.lessonFeedback.title}</h3>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={format(t.lessonFeedback.starAriaLabel, { star })}
              aria-pressed={star <= rating}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:h-10 sm:w-10 sm:text-xl ${
                star <= shownRating
                  ? "border-brand-600 bg-brand-50 text-accent-strong dark:border-brand-400 dark:bg-brand-950/40"
                  : "border-stone-300 text-stone-300 hover:border-stone-400 dark:border-stone-700 dark:text-stone-600"
              }`}
            >
              <span aria-hidden>★</span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="mt-4">
          <p className="mb-3 text-sm leading-6 text-ink-soft">{t.lessonFeedback.subtitle}</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder={t.lessonFeedback.commentPlaceholder}
            className="mb-4 w-full resize-none rounded-sm border border-line-strong bg-white px-3 py-2.5 text-base leading-7 text-ink placeholder:text-stone-500 focus:border-brand-600 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:focus:border-brand-400"
          />

          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className={`${btnPrimary} w-full`}
          >
            {status === "sending" ? t.lessonFeedback.sendingButton : t.lessonFeedback.submitButton}
          </button>
        </div>
      )}
    </div>
  );
}
