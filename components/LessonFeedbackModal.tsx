"use client";

import { useState } from "react";
import Image from "next/image";
import { submitLessonFeedback } from "@/lib/supabase-feedback";

interface Props {
  open: boolean;
  onClose: () => void;
  lessonId: number;
  userId: string | null;
}

export default function LessonFeedbackModal({ open, onClose, lessonId, userId }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  if (!open) return null;

  async function handleSubmit() {
    if (rating === 0) return;
    setStatus("sending");
    await submitLessonFeedback(userId, lessonId, rating, comment);
    setStatus("sent");
    setTimeout(onClose, 1400);
  }

  const shownRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white dark:bg-stone-900 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:w-[420px] sm:max-w-[calc(100vw-2rem)] overflow-hidden animate-[feedbackSlideIn_0.3s_ease-out]">
        <style>{`
          @keyframes feedbackSlideIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="bg-stone-900 dark:bg-stone-950 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
            <Image src="/tai-tai-avatar.png" alt="Tài Tài" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">Tài Tài</p>
            <p className="text-stone-400 text-xs">Xin một chút góp ý nhé!</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-5">
          {status === "sent" ? (
            <div className="text-center py-6 space-y-2">
              <div className="text-4xl">🎉</div>
              <p className="font-bold text-stone-900 dark:text-stone-100">Cảm ơn bạn rất nhiều!</p>
              <p className="text-stone-500 dark:text-stone-400 text-sm">Góp ý của bạn giúp bọn mình cải thiện từng bài học.</p>
            </div>
          ) : (
            <>
              <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed mb-5">
                Bạn vừa hoàn thành xong bài học! Hoàn thành feedback cho chúng mình nhé, chỉ mất 10 giây thôi 🙌
              </p>

              <div className="flex justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${star} sao`}
                    className="text-4xl transition-transform hover:scale-110 cursor-pointer"
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
                rows={3}
                placeholder="Bài học này thế nào? (không bắt buộc)"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 dark:focus:ring-stone-700 transition-all resize-none mb-4"
              />

              <div className="flex gap-2.5">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Để sau
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0 || status === "sending"}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer ${
                    rating > 0 && status !== "sending"
                      ? "bg-stone-900 hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
                      : "bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-600 cursor-not-allowed"
                  }`}
                >
                  {status === "sending" ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
