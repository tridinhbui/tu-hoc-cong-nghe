"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, ShieldQuestion } from "lucide-react";
import { submitLessonAppeal } from "@/lib/lesson-appeals";

interface LessonAppealModalProps {
  userId: string;
  lesson: { id: number; slug: string; title: string };
  onClose: () => void;
}

// Safety net for the "self-marked but not actually recognized as complete"
// gap: a learner who genuinely did the reading/quiz but the automatic
// checklist still shows "Tự đánh dấu" can ask an admin to manually convert
// it, instead of being stuck re-doing an already-finished lesson.
export default function LessonAppealModal({ userId, lesson, onClose }: LessonAppealModalProps) {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    setSending(true);
    try {
      await submitLessonAppeal(userId, lesson.id, lesson.slug, note);
      toast.success("Đã gửi khiếu nại - admin sẽ kiểm tra và duyệt sớm nhất có thể.");
      onClose();
    } catch (error) {
      console.error("Error submitting lesson appeal:", error);
      toast.error(error instanceof Error ? error.message : "Không thể gửi khiếu nại. Vui lòng thử lại.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 w-full max-w-sm p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <ShieldQuestion className="w-4.5 h-4.5" />
            </span>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Khiếu nại hoàn thành</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">{lesson.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Nếu bạn đã thực sự đọc hết, làm xong quiz và câu hỏi giữa bài (nếu có) nhưng bài vẫn hiện &quot;Tự đánh dấu&quot;
          thay vì &quot;Xong&quot;, gửi khiếu nại để admin kiểm tra và duyệt thủ công.
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Mô tả thêm (tuỳ chọn) - VD: đã làm xong 4/4 câu quiz và câu hỏi giữa bài lúc 20h..."
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 resize-none"
        />

        <button
          onClick={() => void handleSubmit()}
          disabled={sending}
          className="w-full py-3 rounded-xl font-bold text-sm bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 disabled:opacity-60 transition-colors"
        >
          {sending ? "Đang gửi..." : "Gửi khiếu nại"}
        </button>
      </div>
    </div>
  );
}
