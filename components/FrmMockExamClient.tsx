"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MockExamClient, { type ExamConfig } from "@/components/MockExamClient";
import { FRM_EXAM, FRM_PASS_RATIO, frmScoreBySubject, type FrmPart } from "@/lib/frm-exam";
import type { FrmSubjectId } from "@/lib/frm-track";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Thi thử FRM. Khác CFA ở ba chỗ, và cả ba đều nằm trong cấu hình chứ không
 *  trong logic:
 *
 *   - PHẢI CHỌN PHẦN THI trước. Part I và Part II là hai kỳ thi riêng với bộ môn
 *     riêng; không có "đề FRM" chung để mặc định vào.
 *   - Một ca duy nhất mỗi phần, 4 tiếng.
 *   - Bốn lựa chọn, đúng bằng kho câu hỏi, nên không cắt bớt phương án nào. */
// The two FRM parts, as data rather than inline in the JSX. They are FrmPart
// enum values - the button's visible label comes from FRM_EXAM[p].label - and
// inline they read to the i18n coverage script as a display string.
const FRM_PARTS = ["I", "II"] as const;

export default function FrmMockExamClient() {
  const { t } = useI18n();
  const [part, setPart] = useState<FrmPart | null>(null);

  const config = useMemo<ExamConfig | null>(() => {
    if (!part) return null;
    const spec = FRM_EXAM[part];
    return {
      title: format(t.frmMockExam.examTitle, { label: spec.label }),
      subtitle: format(t.frmMockExam.examSubtitle, { questions: spec.questions, minutes: spec.minutes }),
      backHref: "/frm",
      backLabel: t.frmMockExam.backHref,
      introHeading: format(t.frmMockExam.examTitle, { label: spec.label }),
      introBlurb: t.frmMockExam.introBlurb,
      introFacts: [
        [t.frmMockExam.introFactCount, format(t.frmMockExam.introFactCountValue, { questions: spec.questions })],
        [t.frmMockExam.introFactSessions, t.frmMockExam.introFactSessionsValue],
        [t.frmMockExam.introFactTime, format(t.frmMockExam.introFactTimeValue, { minutes: spec.minutes })],
        [t.frmMockExam.introFactOptions, t.frmMockExam.introFactOptionsValue],
      ],
      introNote: part === "I" ? t.frmMockExam.introNotePartI : t.frmMockExam.introNotePartII,
      sessions: [{ label: t.frmMockExam.sessionLabel, count: spec.questions, minutes: spec.minutes }],
      passRatio: FRM_PASS_RATIO,
      passNote: t.frmMockExam.passNote,
      totalQuestions: spec.questions,
      fetchUrl: `/api/knowledge-challenge?track=frm&part=${part}&difficulty=tat-ca&count=${spec.questions}`,
      submitMode: "frm-mock",
      submitTrack: "frm",
      // Chấm theo Ô MÔN mà đường ra đề đã gắn vào từng câu, KHÔNG tra ngược từ
      // lessonId: 16 bài FRM nằm ở nhiều môn cùng lúc và tra ngược sẽ gán bừa.
      scoreBySubject: (rows) =>
        frmScoreBySubject(
          rows
            .filter((r) => !!r.subjectId)
            .map((r) => ({ subject: r.subjectId as FrmSubjectId, correct: r.correct }))
        ),
    };
  }, [part, t]);

  if (config) return <MockExamClient config={config} />;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <Link
            href="/frm"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            aria-label={t.frmMockExam.backHref}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">{t.frmMockExam.pageTitle}</h1>
            <p className="mt-0.5 text-xs text-stone-500">{t.frmMockExam.choosePartSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-6 py-10">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{t.frmMockExam.choosePartTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {t.frmMockExam.choosePartBlurb}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {FRM_PARTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPart(p)}
              className="rounded-2xl border-2 border-stone-200 p-5 text-left transition hover:border-stone-900 dark:border-stone-800 dark:hover:border-stone-100"
            >
              <p className="text-base font-bold text-stone-900 dark:text-stone-100">
                {FRM_EXAM[p].label}
              </p>
              <p className="mt-1 text-xs text-stone-500">
                {format(t.frmMockExam.partQuestionsTime, { questions: FRM_EXAM[p].questions, minutes: FRM_EXAM[p].minutes })}
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                {p === "I" ? t.frmMockExam.partIDesc : t.frmMockExam.partIIDesc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
