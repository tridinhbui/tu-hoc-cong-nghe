"use client";

import { useEffect, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import { getMostMissedQuestions, MIN_WRONG_FOR_MISSED, type MissedQuestion } from "@/lib/interview-weak-areas";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { textLink } from "@/components/ui/system";

// "Những câu tôi hay sai" - mức CHI TIẾT TỪNG CÂU, khác InterviewWeakAreasPanel ngay
// bên cạnh vốn tổng hợp theo chủ đề.
//
// Hai panel không thừa nhau vì chúng trả lời hai câu hỏi khác nhau. "Mạng của
// bạn đang 40%" cho biết nên ôn chủ đề nào; nó không chỉ ra ĐÚNG bốn câu đã
// làm sai hai lần liên tiếp. Bảng user_interview_question_attempts vốn ghi từng câu
// một ngay từ migration đầu - cột question_id nằm sẵn ở đó, chỉ chưa ai đọc.
//
// Không hiện gì khi chưa có câu nào đạt ngưỡng, thay vì hiện một khung rỗng
// ngụ ý tính năng hỏng - cùng cách InterviewWeakAreasPanel đang làm.

interface Props {
  userId: string | null;
  /** Luyện lại đúng những câu này. Trang truyền id xuống API qua `?ids=`. */
  onDrillQuestions: (questionIds: number[]) => void;
  /** Trang tăng sau mỗi lượt xong để panel nạp lại. */
  refreshKey?: number;
  maxItems?: number;
}

export default function InterviewMissedQuestionsPanel({ userId, onDrillQuestions, refreshKey = 0, maxItems = 2 }: Props) {
  const { t } = useI18n();
  const [missed, setMissed] = useState<MissedQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    void (async () => {
      const rows = await getMostMissedQuestions(userId);
      if (cancelled) return;
      setMissed(rows);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, refreshKey]);

  if (!userId) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 border-t border-line-soft pt-4 pb-2 text-xs font-semibold text-stone-400">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        {t.interview.missedLoading}
      </div>
    );
  }

  if (missed.length === 0) return null;

  const shown = missed.slice(0, maxItems);

  return (
    <div className="border-t border-line-soft pt-4 flex flex-col justify-between">
    <div>
    <div className="flex items-center justify-between gap-2 mb-3">
        <div className="min-w-0">
        <p className="eyebrow text-ink-soft">
            {t.interview.missedTitle}
          </p>
        </div>
        <button
        type="button" onClick={() => onDrillQuestions(shown.map((m) => m.questionId))}
        className={`${textLink} !text-[11px] shrink-0 cursor-pointer`}
        >
        <RotateCcw className="h-3 w-3" />
        <span>{format(t.interview.reviewCount, { n: shown.length })} →</span>
        </button>
      </div>

      <div className="divide-y divide-line-soft">
        {shown.map((m) => (
          <div key={m.questionId} className="py-2 flex items-center justify-between gap-3">
            <span className="min-w-0 truncate text-xs font-bold text-ink-heading">
              {m.label}
            </span>
            <span className="shrink-0 font-mono text-[11px] font-medium tabular-nums text-danger">
              {format(t.interview.missedRatio, { wrong: m.wrong, attempted: m.attempted })}
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
