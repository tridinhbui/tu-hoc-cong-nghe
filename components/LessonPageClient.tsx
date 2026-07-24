"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Lesson } from "@/lib/lesson-types";
import LessonPageLayout from "@/components/LessonPageLayout";
import OpeningQuestionBlock from "@/components/OpeningQuestionBlock";
import InteractiveWidget from "@/components/InteractiveWidget";
import MidpointInteractive from "@/components/MidpointInteractive";
import LessonSections from "@/components/LessonSections";
import LessonVideoPlayer from "@/components/LessonVideoPlayer";
import { highlightGlossaryTerms } from "@/components/GlossaryTerm";
import { LessonApplicationCard, LessonQuestionCard, LessonSummaryCard, ReviewLoopCard } from "@/components/LessonLearningBlocks";
import { getLessonDisplayLabel, getLessonRecallDay } from "@/lib/lesson-labels";
import TypingText from "@/components/TypingText";

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

function getMetaphorForLesson(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("lãi kép") || t.includes("compound")) return "quả cầu tuyết lăn từ đỉnh núi: càng lăn xa càng hút thêm tuyết và phình to khổng lồ";
  if (t.includes("dòng tiền") || t.includes("cash flow")) return "nguồn nước chảy trong sinh hoạt: dù bể nhà bạn to (tài sản lớn) nhưng nếu đường ống bị tắc (thiếu tiền mặt), bạn vẫn không có nước tắm rửa";
  if (t.includes("lãi suất") || t.includes("interest")) return "phí thuê một chiếc xe máy: bạn mượn xe người khác đi thì cuối ngày phải trả một số tiền nhỏ gọi là tiền thuê";
  if (t.includes("nợ") || t.includes("debt") || t.includes("vay")) return "một chiếc ba lô chứa đá: giúp bạn lao dốc nhanh hơn nhờ quán tính nếu mang vừa sức, nhưng sẽ đè bẹp bạn nếu quá nặng";
  if (t.includes("cổ tức") || t.includes("dividend")) return "vườn táo chung: bạn góp vốn mua cây con, khi cây ra trái ngọt, chủ vườn hái chia đều cho mỗi người vài trái mang về";
  if (t.includes("lạm phát") || t.includes("inflation")) return "cục nước đá để ngoài nắng: cứ mỗi giờ trôi qua nó lại bị chảy bớt đi một chút giá trị mua sắm";
  if (t.includes("định giá") || t.includes("valuation")) return "mua một món đồ cũ: bạn phải soi kỹ đường may, chất liệu để xem mức giá người bán nói có bị đắt quá không";
  if (t.includes("tài sản") || t.includes("asset")) return "con gà đẻ trứng vàng: mỗi ngày nó đẻ ra một quả trứng vàng để bạn đem bán kiếm tiền";
  return "trò chơi trao đổi sticker ở trường: để đổi được sticker hiếm, bạn phải hiểu rõ giá trị của những tấm sticker mình đang sở hữu";
}

export default function LessonPageClient({ lesson, nextLesson }: Props) {
  const [feynmanMode, setFeynmanMode] = useState(false);
  // Staged reveal for the "Tài Tài giải thích" card, like a chatbot response:
  // the metaphor line types itself out first, then the takeaways/mistake
  // warning fade in - instead of the whole card appearing at once.
  const [metaphorTyped, setMetaphorTyped] = useState(false);
  const lessonLabel = getLessonDisplayLabel(lesson);

  const meta = {
    id: lesson.id,
    day: lesson.id,
    label: lessonLabel,
    recallDay: getLessonRecallDay(lesson),
    accent: "stone",
    title: lesson.title,
    subtitle: lesson.subtitle,
    duration: lesson.duration,
    difficulty: lesson.difficulty,
    emoji: lesson.emoji,
    slug: lesson.slug,
    nextSlug: nextLesson?.slug,
    nextTitle: nextLesson ? nextLesson.title : undefined,
  };

  // Pull a middle question out as the mid-article checkpoint, leaving the
  // sidebar's own "Câu 1" intact - previously this always took quiz[0], which
  // made the sidebar quiz start at a question that used to be "first" and
  // read as if the mid-article check and the sidebar were splitting the same
  // quiz rather than being two distinct checks.
  const hasMidpoint = lesson.quiz && lesson.quiz.length > 1;
  const midpointIndex = hasMidpoint ? Math.floor(lesson.quiz.length / 2) : -1;
  const midpointQuestion = hasMidpoint ? lesson.quiz[midpointIndex] : null;
  const sidebarQuiz = hasMidpoint
    ? lesson.quiz.filter((_, i) => i !== midpointIndex)
    : lesson.quiz;

  return (
    <div className="relative">
      <LessonPageLayout lesson={meta} quiz={sidebarQuiz}>
      {/* 0. Why this lesson matters - one or two sentences up front on what
          problem it solves and what the learner can do after, so the value
          is obvious before they invest time reading. Only lessons written
          with this field show it; older lessons already state their gist in
          the subtitle shown in the hero above, so there's nothing to
          duplicate here. */}
      {lesson.whyItMatters && (
        <div className="rounded-xl border-2 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-500 mb-2">
            Vì sao bài này quan trọng
          </p>
          <p className="text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed font-medium">
            {lesson.whyItMatters}
          </p>
        </div>
      )}

      {/* Feynman ELI5 Mode Toggle */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/80 p-4.5 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            💡 Chế độ Feynman (Giải thích siêu đơn giản)
          </h4>
          <p className="text-[10px] text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
            Tài Tài giải thích bài học này theo cách dễ nhớ nhất cho học sinh lớp 5!
          </p>
        </div>
        <button
          onClick={() => {
            setFeynmanMode(!feynmanMode);
            setMetaphorTyped(false);
          }}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl shadow-sm hover:scale-[1.03] active:scale-95 transition-all cursor-pointer ${
            feynmanMode
              ? "bg-amber-500 text-white"
              : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
          }`}
        >
          {feynmanMode ? "Đang bật 💡" : "Dùng ELI5 ⚡"}
        </button>
      </div>

      {feynmanMode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/40 p-5 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-bounce">🦖</span>
            <div>
              <h5 className="text-xs font-extrabold text-amber-700 dark:text-amber-300">Tài Tài giải thích (dành cho học sinh lớp 5)</h5>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider">Học theo phép so sánh ẩn dụ</p>
            </div>
          </div>
          <div className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 space-y-3 font-medium">
            <p>
              Chào bạn! Để giúp bạn ghi nhớ bài <strong>&quot;{lesson.title}&quot;</strong> nhanh nhất, Tài Tài xin đưa ra một phép so sánh siêu bình dân:
            </p>
            <div className="bg-amber-100/60 dark:bg-amber-950/50 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 font-bold">
              💡 Hãy tưởng tượng khái niệm này giống như{" "}
              <TypingText text={`${getMetaphorForLesson(lesson.title)}.`} onDone={() => setMetaphorTyped(true)} />
            </div>
            {metaphorTyped && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <p className="font-semibold text-stone-900 dark:text-stone-100">3 điểm mấu chốt dễ nhớ nhất:</p>
                <ul className="list-disc pl-4 space-y-1.5 text-stone-700 dark:text-stone-300">
                  {(lesson.keyTakeaways ?? []).slice(0, 3).map((takeaway: string, idx: number) => (
                    <li key={idx}>
                      <strong>{takeaway.split(" - ")[0]}</strong>: {takeaway.split(" - ")[1] || takeaway}
                    </li>
                  ))}
                </ul>
                {lesson.summary?.commonMistake && (
                  <p className="text-[11px] text-red-600 dark:text-red-300 bg-red-50/60 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200/60 dark:border-red-900/40 font-bold">
                    ⚠️ Sai lầm hay gặp: {lesson.summary.commonMistake}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Video Player - if available */}
      {lesson.videoUrl && (
        <LessonVideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />
      )}

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
              {highlightGlossaryTerms(lesson.explanation, new Set())}
            </p>
          </div>
        )
      )}

      {/* 2.5. Midpoint Interactive Activity (custom question per lesson, at ~50% of content) */}
      {midpointQuestion && <MidpointInteractive question={midpointQuestion} lessonId={lesson.id} />}

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

      {/* 4.5. Visual summary image (optional hand-crafted infographic recap) */}
      {lesson.summaryImage && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Tóm tắt trực quan
          </div>
          <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-lg">
            <Image
              src={lesson.summaryImage}
              alt={`Tóm tắt trực quan ${lesson.title}`}
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
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
