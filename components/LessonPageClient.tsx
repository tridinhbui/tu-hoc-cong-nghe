"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Lesson } from "@/lib/lessons-loader";
import LessonPageLayout from "@/components/LessonPageLayout";
import InteractiveWidget from "@/components/InteractiveWidget";
import MidpointInteractive from "@/components/MidpointInteractive";
import LessonSections from "@/components/LessonSections";
import { LessonApplicationCard, LessonQuestionCard, LessonSummaryCard, ReviewLoopCard } from "@/components/LessonLearningBlocks";

function OpeningQuestionBlock({
  question,
  options,
  correct,
  explanation,
}: {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
        Bắt đầu bằng một câu hỏi
      </div>
      <p className="text-stone-800 dark:text-stone-300 font-semibold leading-relaxed text-base">
        {question}
      </p>

      <div className="space-y-2.5">
        {options.map((opt, i) => {
          let btnCls = "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50/30 dark:hover:bg-stone-800/30";
          if (submitted) {
            if (i === correct) btnCls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 font-semibold";
            else if (i === selected) btnCls = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-400";
            else btnCls = "border-stone-100 dark:border-stone-800 bg-stone-50/20 dark:bg-stone-900/20 text-stone-500 dark:text-stone-400 opacity-60";
          } else if (selected === i) {
            btnCls = "border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold border-2";
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 cursor-pointer ${btnCls}`}
            >
              <span className={`w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center border ${
                selected === i ? "bg-white/80 dark:bg-stone-900/80 border-current" : "bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700"
              }`}>
                {["A", "B", "C", "D"][i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && !submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-[0.98]"
        >
          Xác nhận câu trả lời
        </button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 text-xs leading-relaxed border ${
            selected === correct ? "bg-emerald-50/50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900 text-emerald-800 dark:text-emerald-400" : "bg-rose-50/40 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900 text-rose-800 dark:text-rose-400"
          }`}
        >
          <p className="font-semibold mb-1">
            {selected === correct ? "Đúng rồi!" : "Chưa đúng — nhưng không sao!"}
          </p>
          <p>{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

interface Props {
  lesson: Lesson;
  nextLesson?: { id: number; slug: string; title: string };
}

function buildDefaultPracticePrompt(lesson: Lesson) {
  const title = lesson.title.toLowerCase();

  if (title.includes("dòng tiền") || title.includes("cash flow")) {
    return {
      question: `Một doanh nghiệp hoặc cá nhân có thể bị sai lầm gì nếu chỉ nhìn vào lợi nhuận mà bỏ qua dòng tiền?`,
      options: [
        "Một người có thể thấy mình giàu nhưng lại thiếu tiền mặt",
        "Lợi nhuận không bao giờ quan trọng",
        "Dòng tiền không liên quan đến tài chính",
        "Chỉ doanh nghiệp lớn mới cần nhìn dòng tiền",
      ],
      correct: 0,
      explanation: "Lợi nhuận và dòng tiền không phải lúc nào cũng đồng nghĩa. Một người hoặc doanh nghiệp có thể lãi nhưng vẫn thiếu tiền mặt để vận hành.",
    };
  }

  if (title.includes("lãi suất") || title.includes("interest")) {
    return {
      question: `Nếu lãi suất thay đổi, điều nào sau đây thường có ảnh hưởng lớn nhất đến quyết định của bạn?`,
      options: [
        "Chi phí vay và khả năng tiết kiệm",
        "Chỉ màu sắc của báo cáo",
        "Chỉ số dân số",
        "Tên của doanh nghiệp",
      ],
      correct: 0,
      explanation: "Lãi suất ảnh hưởng trực tiếp đến chi phí vay, lợi nhuận đầu tư và sức hấp dẫn của tiền gửi.",
    };
  }

  if (title.includes("nợ") || title.includes("debt") || title.includes("vay")) {
    return {
      question: `Khi nhìn vào một khoản nợ, điều quan trọng nhất cần hỏi là gì?`,
      options: [
        "Khoản nợ này có làm tăng rủi ro và chi phí lâu dài không?",
        "Khoản nợ này có đáng xem trên mạng xã hội không?",
        "Khoản nợ này có phải là phần của lịch sử không?",
        "Khoản nợ này có ở trong báo cáo không?",
      ],
      correct: 0,
      explanation: "Nợ không chỉ là một con số; nó còn ảnh hưởng đến dòng tiền, rủi ro và khả năng đưa ra quyết định tốt hơn.",
    };
  }

  if (title.includes("cổ phiếu") || title.includes("equity") || title.includes("định giá") || title.includes("valuation")) {
    return {
      question: `Khi đánh giá một cơ hội đầu tư, bạn nên ưu tiên điều gì đầu tiên?`,
      options: [
        "Hiểu bản chất doanh nghiệp và cách nó tạo ra giá trị",
        "Lắng nghe tin đồn trên mạng",
        "Chỉ nhìn vào biến động giá ngắn hạn",
        "Chỉ nhìn vào tên công ty",
      ],
      correct: 0,
      explanation: "Định giá và đầu tư hiệu quả bắt đầu từ việc hiểu doanh nghiệp tạo ra giá trị như thế nào.",
    };
  }

  return {
    question: `Tại sao khái niệm "${lesson.title}" lại quan trọng đối với quyết định tài chính của bạn?`,
    options: [
      "Vì giúp bạn hiểu rõ hơn về lựa chọn tiền bạc của mình",
      "Vì chỉ cần đọc là đủ, không cần áp dụng",
      "Vì chỉ phù hợp với chuyên gia tài chính",
      "Vì không liên quan đến đời sống hàng ngày",
    ],
    correct: 0,
    explanation: "Bài học tài chính tốt không chỉ dừng ở hiểu lý thuyết; nó phải giúp bạn đưa ra quyết định tốt hơn trong thực tế.",
  };
}

function buildDefaultSummary(lesson: Lesson) {
  const title = lesson.title.replace(/^Tự học Tài chính Day \d+: /i, "");
  return {
    keyIdea: `Bài này giúp bạn hiểu rõ hơn về ${title.toLowerCase()}.`,
    commonMistake: "Đọc khái niệm như một câu chữ thay vì như một nguyên lý để áp dụng.",
    action: "Hãy nối bài học này với một quyết định nhỏ trong tuần này.",
  };
}

function buildDefaultApplication(lesson: Lesson) {
  return {
    title: "Áp dụng ngay",
    message: `Hãy chọn một tình huống nhỏ trong cuộc sống của bạn để thử áp dụng khái niệm ${lesson.title}.`,
    secondary: "Không cần phải hoàn hảo; điều quan trọng là bắt đầu liên hệ bài học với thực tế.",
  };
}

export default function LessonPageClient({ lesson, nextLesson }: Props) {
  const meta = {
    id: lesson.id,
    day: lesson.id,
    accent: "stone",
    title: lesson.title,
    subtitle: lesson.subtitle,
    duration: lesson.duration,
    difficulty: lesson.difficulty,
    emoji: lesson.emoji,
    slug: lesson.slug,
    nextSlug: nextLesson?.slug,
    nextTitle: nextLesson ? `Day ${nextLesson.id}: ${nextLesson.title}` : undefined,
  };

  // Reuse the first quiz question as the mid-article checkpoint, but only
  // when there's at least one more question left for the sidebar quiz —
  // otherwise the same question would be asked twice in one lesson.
  const hasMidpoint = lesson.quiz && lesson.quiz.length > 1;
  const midpointQuestion = hasMidpoint ? lesson.quiz[0] : null;
  const sidebarQuiz = hasMidpoint ? lesson.quiz.slice(1) : lesson.quiz;

  return (
    <div className="relative">
      <LessonPageLayout lesson={meta} quiz={sidebarQuiz}>
      {/* 1. Opening Question block */}
      {lesson.openingQuestion && (
        <OpeningQuestionBlock
          question={lesson.openingQuestion}
          options={lesson.openingOptions}
          correct={lesson.correctOption}
          explanation={lesson.explanation}
        />
      )}

      {/* 2. Rich hand-written body (preferred) or fallback thin explanation block */}
      {lesson.sections && lesson.sections.length > 0 ? (
        <LessonSections sections={lesson.sections} />
      ) : (
        lesson.explanation && (
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Giải thích chi tiết
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-base">
              {lesson.explanation}
            </p>
          </div>
        )
      )}

      {/* 2.5. Midpoint Interactive Activity (custom question per lesson, at ~50% of content) */}
      {midpointQuestion && <MidpointInteractive question={midpointQuestion} />}

      {/* 3. Diagram block */}
      {lesson.diagram && lesson.diagram.length > 0 && (
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Sơ đồ trực quan
          </div>
          <div className="flex flex-col items-center py-4 bg-stone-50/50 dark:bg-stone-900/50 rounded-2xl border border-stone-100 dark:border-stone-800">
            {lesson.diagram.map((node: { label: string; arrow?: boolean }, i: number) => (
              <React.Fragment key={i}>
                <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-xl px-5 py-3.5 text-stone-700 dark:text-stone-300 font-semibold text-sm text-center w-full max-w-xs shadow-sm">
                  {node.label}
                </div>
                {node.arrow && i < lesson.diagram.length - 1 && (
                  <div className="text-stone-300 dark:text-stone-600 text-lg my-1">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 4. Interactive Simulation block */}
      {lesson.interactiveType && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Thử nghiệm tương tác
          </div>
          <InteractiveWidget type={lesson.interactiveType as "interest-rate" | "supply-demand" | "profit-calc" | "roe" | "bond"} />
        </div>
      )}

      {/* 5. Real-life Example block */}
      {lesson.realWorldExample && lesson.realWorldExample.company && (
        <div className="border border-stone-200 dark:border-stone-800 rounded-2xl p-6 bg-stone-50 dark:bg-stone-900/50 space-y-3">
          <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
            Ví dụ thực tế · {lesson.realWorldExample.company}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-base leading-relaxed">
            {lesson.realWorldExample.description}
          </p>
        </div>
      )}

      {/* 5.5. Practice prompt block */}
      {(() => {
        const practicePrompt = lesson.practicePrompt ?? buildDefaultPracticePrompt(lesson);
        return (
          <LessonQuestionCard
            title="Luyện tập ngay"
            question={practicePrompt.question}
            options={practicePrompt.options}
            correct={practicePrompt.correct}
            explanation={practicePrompt.explanation}
          />
        );
      })()}

      {/* 5.75. Summary block */}
      {(() => {
        const summary = lesson.summary ?? buildDefaultSummary(lesson);
        return <LessonSummaryCard summary={summary} />;
      })()}

      {/* 5.9. Application block */}
      {(() => {
        const application = lesson.application ?? buildDefaultApplication(lesson);
        return (
          <LessonApplicationCard
            title={application.title}
            message={application.message}
            secondary={application.secondary}
          />
        );
      })()}

      {/* 5.95. Review loop card */}
      <ReviewLoopCard
        prompt={`Nếu bạn chỉ nhớ 1 điều từ bài này, hãy nhớ rằng: ${lesson.summary?.keyIdea || lesson.title}.`}
        cta="Ôn lại trong 1 phút trước khi chuyển bài"
      />

      {/* 6. Key Takeaways block */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-stone-900 dark:bg-stone-950 px-6 py-5">
            <p className="text-white font-extrabold text-xl tracking-wide">Ghi nhớ nhanh</p>
          </div>
          <div className="bg-stone-800 divide-y divide-stone-700">
            {lesson.keyTakeaways.map((t: string, i: number) => (
              <div key={i} className="flex items-start gap-4 px-6 py-5">
                <span className="w-8 h-8 rounded-full bg-stone-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-stone-200 text-base leading-relaxed font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </LessonPageLayout>
    </div>
  );
}
