"use client";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/admin/Modal";
import { createClient } from "@/lib/supabase";

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
  const supabase = createClient();
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("lesson_unlock_requests").insert({
      user_id: userId,
      lesson_id: lesson.id,
      note: note.trim() || null,
      status: "pending",
    });
    setSubmitting(false);

    if (error) {
      toast.error("Không gửi được yêu cầu, vui lòng thử lại.");
      return;
    }

    toast.success("Đã gửi yêu cầu mở khoá tới admin.");
    setSent(true);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Bài học đang bị khoá"
      footer={
        sent ? (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold"
          >
            Đóng
          </button>
        ) : (
          <>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-700 dark:text-stone-300"
            >
              Huỷ
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </>
        )
      }
    >
      {sent ? (
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Yêu cầu của bạn đã được gửi. Admin sẽ xem xét và mở khoá bài học sớm nhất có thể.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-stone-700 dark:text-stone-300">
            Bài <strong>{lesson.title}</strong> yêu cầu bạn hoàn thành
            {prerequisiteLesson ? (
              <>
                {" "}
                bài <strong>{prerequisiteLesson.title}</strong> trước.
              </>
            ) : (
              " bài học trước đó."
            )}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Nếu bạn muốn học bài này ngay, hãy gửi yêu cầu để admin xem xét mở khoá riêng cho bạn.
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Lý do muốn mở khoá (không bắt buộc)"
            rows={3}
            className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
          />
        </div>
      )}
    </Modal>
  );
}
