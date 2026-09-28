"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, ShieldQuestion } from "lucide-react";
import { submitLessonAppeal } from "@/lib/lesson-appeals";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary } from "@/components/ui/system";

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
  const { t } = useI18n();
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    setSending(true);
    try {
      await submitLessonAppeal(userId, lesson.id, lesson.slug, note);
      toast.success(t.lessonAppeal.sent);
      onClose();
    } catch (error) {
      console.error("Error submitting lesson appeal:", error);
      toast.error(error instanceof Error ? error.message : t.lessonAppeal.sendFailed);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-stone-900 rounded-md border border-line-strong w-full max-w-sm my-auto p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-sm border border-line-strong bg-[#f3f1ec] dark:bg-stone-950 text-ink-body flex items-center justify-center flex-shrink-0">
              <ShieldQuestion className="w-4.5 h-4.5" />
            </span>
            <div>
              <h3 className="font-black tracking-tight text-ink-max text-sm">{t.lessonAppeal.title}</h3>
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">{lesson.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-ink-body flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-ink-soft leading-7">
          {t.lessonAppeal.blurb}
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.lessonAppeal.notePlaceholder}
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2.5 rounded-sm border border-line-strong bg-white dark:bg-stone-900 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-brand-600 dark:focus:border-brand-400 resize-none"
        />

        <button
          onClick={() => void handleSubmit()}
          disabled={sending}
          className={`${btnPrimary} w-full`}
        >
          {sending ? t.lessonAppeal.sending : t.lessonAppeal.submit}
        </button>
      </div>
    </div>
  );
}
