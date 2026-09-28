"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/admin/Modal";
import { createClient } from "@/lib/cloudflare";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary } from "@/components/ui/system";

interface LessonInfo {
  id: number;
  title: string;
}

interface UnlockRequestModalProps {
  userId: string;
  lesson: LessonInfo;
  prerequisiteLesson?: LessonInfo;
  onClose: () => void;
}

export default function UnlockRequestModal({ userId, lesson, prerequisiteLesson, onClose }: UnlockRequestModalProps) {
  const { t } = useI18n();
  const cloudflare = createClient();
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await cloudflare.from("lesson_unlock_requests").insert({
      user_id: userId,
      lesson_id: lesson.id,
      note: note.trim() || null,
      status: "pending",
    });
    setSubmitting(false);

    if (error) {
      toast.error(t.unlockRequest.submitError);
      return;
    }

    toast.success(t.unlockRequest.submitSuccess);
    setSent(true);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={t.unlockRequest.modalTitle}
      footer={
        sent ? (
          <button onClick={onClose} className={btnPrimary}>
            {t.unlockRequest.close}
          </button>
        ) : (
          <>
            <button onClick={onClose} className={btnSecondary}>
              {t.unlockRequest.cancel}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={btnPrimary}
            >
              {submitting ? t.unlockRequest.submittingButton : t.unlockRequest.submitButton}
            </button>
          </>
        )
      }
    >
      {sent ? (
        <p className="text-sm text-ink-soft">
          {t.unlockRequest.sentMessage}
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm leading-7 text-ink-body">
            {t.unlockRequest.requiresPrereqPart1} <strong>{lesson.title}</strong> {t.unlockRequest.requiresPrereqPart2}
            {prerequisiteLesson ? (
              <>
                {" "}
                {t.unlockRequest.prereqLessonPart1} <strong>{prerequisiteLesson.title}</strong> {t.unlockRequest.prereqLessonPart2}
              </>
            ) : (
              <> {t.unlockRequest.requiresPreviousLesson}</>
            )}
          </p>
          <p className="text-sm text-ink-soft">
            {t.unlockRequest.unlockHint}
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.unlockRequest.notePlaceholder}
            rows={3}
            className="w-full rounded-sm border border-line-strong bg-white dark:bg-stone-900 px-3 py-2 text-sm text-ink placeholder:text-stone-400"
          />
        </div>
      )}
    </Modal>
  );
}
