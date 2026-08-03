"use client";

import { useMemo } from "react";
import MockExamClient, { type ExamConfig } from "@/components/MockExamClient";
import { CFA_EXAM, scoreBySubject } from "@/lib/cfa-exam";

/** Cấu hình đề CFA Level I cho bộ chạy thi thử dùng chung.
 *
 *  Chỉ còn phần RIÊNG của CFA: 180 câu chia hai ca 135 phút, ba lựa chọn mỗi
 *  câu. Toàn bộ logic đếm giờ, nhảy câu, nộp bài và chấm theo môn nằm ở
 *  `MockExamClient` vì FRM dùng chung. */
export default function CfaMockExamClient() {
  const config = useMemo<ExamConfig>(
    () => ({
      title: "Thi thử CFA Level I",
      subtitle: `${CFA_EXAM.totalQuestions} câu · ${CFA_EXAM.sessions} ca × ${CFA_EXAM.minutesPerSession} phút · 3 lựa chọn`,
      backHref: "/cfa",
      backLabel: "Về trang CFA",
      introHeading: "Thi thử CFA Level I",
      introBlurb:
        "Đúng khuôn đề thật, không rút gọn. Ngồi hết được bài này thì ngày thi không còn gì bất ngờ về sức bền.",
      introFacts: [
        ["Số câu", `${CFA_EXAM.totalQuestions} câu`],
        ["Số ca", `${CFA_EXAM.sessions} ca × ${CFA_EXAM.questionsPerSession} câu`],
        ["Thời gian mỗi ca", `${CFA_EXAM.minutesPerSession} phút`],
        ["Lựa chọn mỗi câu", "3 phương án"],
      ],
      introNote:
        "Tỷ lệ câu hỏi giữa mười môn lấy đúng trọng số CFA Institute công bố - Ethics nặng nhất, rồi FSA, Equity và Fixed Income. Điểm cuối bài tách theo từng môn, vì tổng điểm chỉ nói đỗ hay trượt còn bảng theo môn mới nói phải học lại cái gì.",
      sessions: Array.from({ length: CFA_EXAM.sessions }, (_, i) => ({
        label: `Ca ${i + 1}`,
        count: CFA_EXAM.questionsPerSession,
        minutes: CFA_EXAM.minutesPerSession,
      })),
      passRatio: CFA_EXAM.passRatio,
      passNote:
        "CFA Institute không công bố điểm đỗ; 70% là mốc thận trọng các đơn vị luyện thi dùng, không phải con số chính thức.",
      totalQuestions: CFA_EXAM.totalQuestions,
      fetchUrl: `/api/knowledge-challenge?track=cfa&difficulty=tat-ca&count=${CFA_EXAM.totalQuestions}`,
      submitMode: "cfa-mock",
      submitTrack: "cfa",
      // Mỗi bài CFA chỉ thuộc đúng một môn (đã kiểm trong test), nên tra ngược
      // từ lessonId là đủ - khác FRM, nơi một bài có thể nằm ở nhiều môn.
      scoreBySubject: (rows) => scoreBySubject(rows),
    }),
    []
  );

  return <MockExamClient config={config} />;
}
