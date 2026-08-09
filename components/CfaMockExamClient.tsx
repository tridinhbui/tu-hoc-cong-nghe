"use client";

import { useMemo } from "react";
import MockExamClient, { type ExamConfig } from "@/components/MockExamClient";
import { CFA_EXAM, scoreBySubject } from "@/lib/cfa-exam";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Cấu hình đề CFA Level I cho bộ chạy thi thử dùng chung.
 *
 *  Chỉ còn phần RIÊNG của CFA: 180 câu chia hai ca 135 phút, ba lựa chọn mỗi
 *  câu. Toàn bộ logic đếm giờ, nhảy câu, nộp bài và chấm theo môn nằm ở
 *  `MockExamClient` vì FRM dùng chung. */
export default function CfaMockExamClient() {
  const { t } = useI18n();
  const m = t.mockExam;
  const config = useMemo<ExamConfig>(
    () => ({
      title: m.cfaTitle,
      subtitle: format(m.cfaSubtitle, {
        questions: CFA_EXAM.totalQuestions,
        sessions: CFA_EXAM.sessions,
        minutes: CFA_EXAM.minutesPerSession,
      }),
      backHref: "/cfa",
      backLabel: m.cfaBackLabel,
      introHeading: m.cfaTitle,
      introBlurb: m.cfaIntroBlurb,
      introFacts: [
        [m.cfaFactQuestions, format(m.cfaFactQuestionsValue, { count: CFA_EXAM.totalQuestions })],
        [
          m.cfaFactSessions,
          format(m.cfaFactSessionsValue, {
            sessions: CFA_EXAM.sessions,
            perSession: CFA_EXAM.questionsPerSession,
          }),
        ],
        [m.cfaFactMinutes, format(m.cfaFactMinutesValue, { minutes: CFA_EXAM.minutesPerSession })],
        [m.cfaFactChoices, m.cfaFactChoicesValue],
      ],
      introNote: m.cfaIntroNote,
      sessions: Array.from({ length: CFA_EXAM.sessions }, (_, i) => ({
        label: format(m.cfaSessionLabel, { n: i + 1 }),
        count: CFA_EXAM.questionsPerSession,
        minutes: CFA_EXAM.minutesPerSession,
      })),
      passRatio: CFA_EXAM.passRatio,
      passNote: m.cfaPassNote,
      totalQuestions: CFA_EXAM.totalQuestions,
      fetchUrl: `/api/knowledge-challenge?track=cfa&difficulty=tat-ca&count=${CFA_EXAM.totalQuestions}`,
      submitMode: "cfa-mock",
      submitTrack: "cfa",
      // Mỗi bài CFA chỉ thuộc đúng một môn (đã kiểm trong test), nên tra ngược
      // từ lessonId là đủ - khác FRM, nơi một bài có thể nằm ở nhiều môn.
      scoreBySubject: (rows) => scoreBySubject(rows),
    }),
    [m]
  );

  return <MockExamClient config={config} />;
}
