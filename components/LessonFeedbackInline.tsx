"use client";

import { useState } from "react";
import { submitLessonFeedback } from "@/lib/supabase-feedback";

interface Props {
  lessonId: number;
  userId: string | null;
}

export default function LessonFeedbackInline({ lessonId, userId }: Props) {
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
      <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-[20px] p-6 text-center shadow-[0_10px_24px_-24px_rgba(16,185,129,0.18)]">
        <div className="text-4xl mb-3">🎉</div>
        <p className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-2">Cảm ơn bạn rất nhiều!</p>
        <p className="text-emerald-700 dark:text-emerald-500 text-sm">Góp ý của bạn giúp bọn mình cải thiện từng bài học.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-[20px] p-6 shadow-[0_10px_24px_-24px_rgba(15,23,42,0.18)]">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">💬</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">Góp ý bài học</h3>
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Bài học này thế nào? Đánh giá giúp chúng mình cải thiện nội dung nhé!
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${star} sao`}
            className="text-4xl transition-transform duration-200 ease-out hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/10 rounded-full"
          >
            <span className={star <= shownRating ? "text-amber-400" : "text-stone-200 dark:text-stone-700"}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Bạn có góp ý gì về bài học này? (không bắt buộc)"
        className="input-premium w-full px-4 py-3 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:bg-stone-800 resize-none mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || status === "sending"}
        className={`button-premium w-full py-3 rounded-[18px] text-sm font-bold text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-stone-900/5 ${
          rating > 0 && status !== "sending"
            ? "bg-stone-900 hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            : "bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-600 cursor-not-allowed"
        }`}
      >
        {status === "sending" ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </div>
  );
}
