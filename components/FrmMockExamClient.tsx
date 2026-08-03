"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MockExamClient, { type ExamConfig } from "@/components/MockExamClient";
import { FRM_EXAM, FRM_PASS_RATIO, frmScoreBySubject, type FrmPart } from "@/lib/frm-exam";
import type { FrmSubjectId } from "@/lib/frm-track";

/** Thi thử FRM. Khác CFA ở ba chỗ, và cả ba đều nằm trong cấu hình chứ không
 *  trong logic:
 *
 *   - PHẢI CHỌN PHẦN THI trước. Part I và Part II là hai kỳ thi riêng với bộ môn
 *     riêng; không có "đề FRM" chung để mặc định vào.
 *   - Một ca duy nhất mỗi phần, 4 tiếng.
 *   - Bốn lựa chọn, đúng bằng kho câu hỏi, nên không cắt bớt phương án nào. */
export default function FrmMockExamClient() {
  const [part, setPart] = useState<FrmPart | null>(null);

  const config = useMemo<ExamConfig | null>(() => {
    if (!part) return null;
    const spec = FRM_EXAM[part];
    return {
      title: `Thi thử ${spec.label}`,
      subtitle: `${spec.questions} câu · 1 ca × ${spec.minutes} phút · 4 lựa chọn`,
      backHref: "/frm",
      backLabel: "Về trang FRM",
      introHeading: `Thi thử ${spec.label}`,
      introBlurb:
        "Đúng khuôn đề thật, không rút gọn. Bốn tiếng liên tục là một phần lớn của bài thi FRM, và biết mình gãy ở câu bao nhiêu là thứ một đề rút gọn không nói được.",
      introFacts: [
        ["Số câu", `${spec.questions} câu`],
        ["Số ca", "1 ca duy nhất"],
        ["Thời gian", `${spec.minutes} phút`],
        ["Lựa chọn mỗi câu", "4 phương án"],
      ],
      introNote:
        part === "I"
          ? "Tỷ lệ câu hỏi lấy đúng trọng số GARP công bố cho Part I: Financial Markets and Products và Valuation and Risk Models mỗi môn 30%, Foundations và Quantitative Analysis mỗi môn 20%. Điểm cuối bài tách theo từng môn."
          : "Tỷ lệ câu hỏi lấy đúng trọng số GARP công bố cho Part II: Market Risk, Credit Risk và Operational Resilience mỗi môn 20%, Liquidity and Treasury cùng Investment Management mỗi môn 15%, Current Issues 10%.",
      sessions: [{ label: "Bài thi", count: spec.questions, minutes: spec.minutes }],
      passRatio: FRM_PASS_RATIO,
      passNote:
        "GARP không công bố điểm đỗ; 70% là mốc thận trọng các đơn vị luyện thi dùng, không phải con số chính thức.",
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
  }, [part]);

  if (config) return <MockExamClient config={config} />;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-4">
          <Link
            href="/frm"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
            aria-label="Về trang FRM"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Thi thử FRM</h1>
            <p className="mt-0.5 text-xs text-stone-500">Chọn phần thi trước khi bắt đầu</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-6 py-10">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Thi phần nào?</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          FRM là hai kỳ thi riêng, mỗi phần có bộ môn và trọng số riêng. Không có
          đề chung cho cả hai.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(["I", "II"] as const).map((p) => (
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
                {FRM_EXAM[p].questions} câu · {FRM_EXAM[p].minutes} phút
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
                {p === "I"
                  ? "Nền tảng quản trị rủi ro, phân tích định lượng, thị trường và sản phẩm, định giá và mô hình rủi ro."
                  : "Rủi ro thị trường, tín dụng, vận hành, thanh khoản, quản lý đầu tư và các vấn đề đương thời."}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
