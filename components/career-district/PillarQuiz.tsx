"use client";

import { useCallback, useEffect, useState } from "react";
import { processRecallAttempt } from "@/lib/supabase-recalls";
import { useI18n } from "@/lib/i18n/context";

/** Trả lời một câu ôn ngay tại cột, không rời hành lang.
 *
 *  Đây là tính năng duy nhất trong thế giới 3D được DỰNG LẠI thay vì mở cổng
 *  sang màn hình thật, và lý do là quãng đường: đi tới đúng cột của một bài rồi
 *  phải rời cả căn phòng để trả lời một câu là đủ để không ai làm lần thứ hai.
 *
 *  Nhưng nó KHÔNG tự chấm điểm. Câu hỏi lấy từ /api/knowledge-challenge (kèm
 *  token đã ký cho từng câu) và bài làm gửi về /api/knowledge-challenge/submit
 *  - đúng đường mà /kiem-tra và cổng mở khoá bài đang dùng. Tự chấm ở client
 *  thì vừa sửa được bằng devtools, vừa đẻ ra nơi thứ hai định nghĩa "thế nào
 *  là đúng", và nơi thứ hai đó sẽ lệch khỏi nơi thứ nhất ngay lần sửa đầu. */

interface Question {
  lessonId: number;
  lessonTitle: string;
  question: string;
  options: string[];
  explanation: string;
  token: string;
}

interface Props {
  lessonId: number;
  accent: string;
  /** Bài này đang tới hạn ôn - đổi lời mời và ghi lại kết quả vào lịch ôn. */
  due?: boolean;
  userId: string;
  onClose: () => void;
  /** Trả lời đúng thì báo ra ngoài để cột sáng thêm. */
  onCorrect: () => void;
}

type Phase =
  | { kind: "loading" }
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | { kind: "asking"; q: Question }
  | { kind: "grading"; q: Question; picked: number }
  | { kind: "done"; q: Question; picked: number; correct: boolean };

export default function PillarQuiz({ lessonId, accent, due = false, userId, onClose, onCorrect }: Props) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });

  // Đổi sang bài khác thì quay về "đang tải" NGAY lúc render, không đợi effect.
  // Bản trước gọi setPhase thẳng trong thân effect, nên có đúng một khung hình
  // hiện câu hỏi của bài CŨ dưới tiêu đề bài mới trước khi nó bị thay.
  const [lastLesson, setLastLesson] = useState(lessonId);
  if (lastLesson !== lessonId) {
    setLastLesson(lessonId);
    setPhase({ kind: "loading" });
  }

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/knowledge-challenge?lesson=${lessonId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { questions?: Question[] }) => {
        if (cancelled) return;
        const q = data.questions?.[0];
        // Bài chưa có quiz thì nói thẳng, đừng dựng một câu hỏi giả.
        setPhase(q ? { kind: "asking", q } : { kind: "empty" });
      })
      .catch((e: Error) => {
        if (!cancelled) setPhase({ kind: "error", message: e.message });
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  /** Nhận câu hỏi qua tham số chứ không đọc lại từ state: setPhase là bất đồng
   *  bộ, nên đọc `phase` ngay sau khi gọi nó sẽ lấy về giá trị cũ - đúng trong
   *  trường hợp này nhưng sai ngay khi có ai đó thêm một bước nữa vào giữa. */
  const answer = useCallback(
    async (q: Question, picked: number) => {
      setPhase({ kind: "grading", q, picked });
      try {
        const res = await fetch("/api/knowledge-challenge/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            track: "personal",
            difficulty: "tat-ca",
            answers: [{ token: q.token, selected: picked }],
          }),
        });
        const data: { score?: number } = res.ok ? await res.json() : {};
        // Điểm do SERVER trả về, không phải so sánh ở đây: client không biết
        // đáp án đúng, và đó là điều kiện để con số này đáng tin.
        const correct = (data.score ?? 0) > 0;
        setPhase({ kind: "done", q, picked, correct });
        // Đẩy lịch ôn ngắt quãng theo kết quả: đúng thì giãn ra, sai thì kéo
        // về đầu. Gọi đúng hàm mà màn hình ôn tập đang dùng - một cách tính
        // lịch thứ hai sẽ khiến hai nơi hẹn hai ngày khác nhau cho cùng bài.
        void processRecallAttempt(userId, lessonId, correct).catch(() => {});
        if (correct) onCorrect();
      } catch {
        // Chấm điểm hỏng thì không được coi là sai: người học vẫn cần đọc lời
        // giải, và một câu bị tính sai vì mạng rớt là điều tệ nhất ở đây.
        setPhase({ kind: "error", message: t.careerDistrict.pillarQuiz.submitFailed });
      }
    },
    [onCorrect, t]
  );

  return (
    <section
      aria-label={t.careerDistrict.pillarQuiz.sectionLabel}
      className="pointer-events-auto absolute inset-x-3 bottom-36 z-20 mx-auto max-w-md rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-3 sm:left-4 sm:w-96"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
          {due ? `⏰ ${t.careerDistrict.pillarQuiz.dueTitle}` : `❓ ${t.careerDistrict.pillarQuiz.quickTitle}`}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.careerDistrict.pillarQuiz.closeLabel}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          {t.careerDistrict.pillarQuiz.close}
        </button>
      </div>

      {phase.kind === "loading" && <p className="text-[11px] text-stone-400">{t.careerDistrict.pillarQuiz.loading}</p>}
      {phase.kind === "empty" && (
        <p className="text-[11px] text-stone-400">{t.careerDistrict.pillarQuiz.noQuestions}</p>
      )}
      {phase.kind === "error" && (
        <p className="text-[11px] text-rose-300">{t.careerDistrict.pillarQuiz.fetchFailed}</p>
      )}

      {(phase.kind === "asking" || phase.kind === "grading" || phase.kind === "done") && (
        <>
          <p className="text-[13px] font-bold leading-snug text-white">{phase.q.question}</p>
          {/* Nhóm lại và đặt tên: bốn nút không nhãn cạnh nhau chỉ đọc ra bốn
              đoạn văn bản, không đọc ra "đây là các lựa chọn của một câu hỏi". */}
          <div className="mt-2 space-y-1" role="group" aria-label={t.careerDistrict.pillarQuiz.optionsGroupLabel}>
            {phase.q.options.map((opt, i) => {
              const chosen = phase.kind !== "asking" && phase.picked === i;
              const revealed = phase.kind === "done";
              return (
                <button
                  key={i}
                  type="button"
                  disabled={phase.kind !== "asking"}
                  onClick={() => void answer(phase.q, i)}
                  className={`block w-full rounded-xl border px-3 py-2 text-left text-[11px] leading-snug transition ${
                    phase.kind === "asking"
                      ? "cursor-pointer border-stone-700 bg-stone-800/60 text-stone-200 hover:border-stone-500 hover:bg-stone-800"
                      : chosen
                      ? revealed && phase.correct
                        ? "border-emerald-400 bg-emerald-950/70 text-emerald-100"
                        : revealed
                        ? "border-rose-400 bg-rose-950/60 text-rose-100"
                        : "border-stone-500 bg-stone-800 text-stone-200"
                      : "border-stone-800 bg-stone-900/60 text-stone-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {phase.kind === "grading" && (
            <p role="status" className="mt-2 text-[11px] text-stone-400">{t.careerDistrict.pillarQuiz.grading}</p>
          )}
          {phase.kind === "done" && (
            <div className="mt-2.5 rounded-xl bg-stone-950/70 p-2.5">
              <p className={`text-[11px] font-black ${phase.correct ? "text-emerald-300" : "text-rose-300"}`}>
                {phase.correct ? `✓ ${t.careerDistrict.pillarQuiz.correct}` : `✗ ${t.careerDistrict.pillarQuiz.incorrect}`}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-stone-300">{phase.q.explanation}</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
