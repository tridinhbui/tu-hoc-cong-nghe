"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Lesson, LocalizedLesson } from "@/lib/lesson-types";
import LessonPageLayout from "@/components/LessonPageLayout";
import LessonTranslationBadge from "@/components/LessonTranslationBadge";
import OpeningQuestionBlock from "@/components/OpeningQuestionBlock";
import InteractiveWidget, { hasInteractiveWidget } from "@/components/InteractiveWidget";
import MidpointInteractive from "@/components/MidpointInteractive";
import FreeRecallCard from "@/components/FreeRecallCard";
import LessonSections from "@/components/LessonSections";
import LessonVideoPlayer from "@/components/LessonVideoPlayer";
import { highlightGlossaryTerms } from "@/components/GlossaryTerm";
import { LessonApplicationCard, LessonQuestionCard, LessonSummaryCard, ReviewLoopCard } from "@/components/LessonLearningBlocks";
import { getLessonDisplayLabel, getLessonRecallDay } from "@/lib/lesson-labels";
import TypingText from "@/components/TypingText";
import LessonRoomCard from "@/components/LessonRoomCard";
import { trackFeatureClick } from "@/lib/feature-events";

interface Props {
  // LocalizedLesson when it came through the locale-aware loader, plain Lesson
  // from the hand-authored static pages that build their object inline. The
  // badge treats a missing `translated` the same as untranslated, which is
  // right: those pages have no translation layer at all.
  lesson: Lesson | LocalizedLesson;
  nextLesson?: { id: number; slug: string; title: string };
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

  // Đầu phễu bài học.
  //
  // Khúc giữa và khúc cuối đã đo được từ trước: FreeRecallCard ghi
  // lesson_free_recall_start/skip/done, và bài hoàn thành nằm trong
  // user_progress. Thiếu đúng mảnh này - bao nhiêu người MỞ bài ra - nên
  // không tính được tỉ lệ bỏ dở của bất kỳ bài nào, và mọi câu hỏi kiểu "bài
  // nào cần viết lại trước" cho tới nay đều chỉ là phỏng đoán.
  //
  // Phụ thuộc theo slug chứ không phải mảng rỗng: đi từ bài này sang bài kế
  // tiếp không unmount component, nên mảng rỗng sẽ chỉ đếm bài đầu tiên của
  // cả phiên đọc.
  useEffect(() => {
    trackFeatureClick("lesson_open", { label: lesson.slug });
  }, [lesson.slug]);

  const meta = {
    id: lesson.id,
    day: lesson.id,
    track: lesson.track,
    label: lessonLabel,
    recallDay: getLessonRecallDay(lesson),
    accent: "stone",
    title: lesson.title,
    subtitle: lesson.subtitle,
    duration: lesson.duration,
    readingMinutes: lesson.readingMinutes,
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

  const checkpointNode = midpointQuestion ? (
    <MidpointInteractive question={midpointQuestion} lessonId={lesson.id} />
  ) : null;

  // Where the check actually goes. It used to render after the entire body
  // despite being described as "at ~50% of content" - which put it at ~90%
  // of the article, so the people it exists to catch (the ones who quit
  // partway) never reached it. `checkpointIndex` is precomputed per lesson
  // by scripts/generate-lesson-data.mjs from the body's estimated reading
  // time; it is -1 for lessons too short to be worth interrupting, and those
  // keep the old after-the-body placement so their completion gate (which
  // requires the midpoint check) is unchanged.
  const inlineCheckpointIndex = lesson.checkpointIndex ?? -1;
  const hasInlineCheckpoint =
    checkpointNode !== null &&
    inlineCheckpointIndex >= 0 &&
    Boolean(lesson.sections && lesson.sections.length > 0);

  return (
    <div className="relative">
      <LessonPageLayout lesson={meta} quiz={sidebarQuiz}>
      <LessonTranslationBadge translated={"translated" in lesson ? lesson.translated : undefined} />

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
        <LessonSections
          sections={lesson.sections}
          checkpoint={hasInlineCheckpoint ? checkpointNode : undefined}
          checkpointAfterIndex={inlineCheckpointIndex}
        />
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

      {/* 2.5. Midpoint check - only reached here for lessons short enough
          that findCheckpointIndex declined to interrupt them, or that have
          no `sections` body to interrupt. Otherwise it was already rendered
          inline at the halfway mark above. */}
      {!hasInlineCheckpoint && checkpointNode}

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

      {/* 4. Interactive Simulation block
          Điều kiện là "có widget cho loại này", không phải "có khai loại".
          Trước đây nó chỉ kiểm tra trường có giá trị rồi ép kiểu, nên 150 bài
          khai chart/process/risk/budget - bốn loại chưa có widget - vẫn dựng
          tiêu đề mục và bỏ trống bên dưới. Cast `as` là thứ giấu đi đúng sự
          không khớp đó khỏi TypeScript. */}
      {hasInteractiveWidget(lesson.interactiveType) && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Thử nghiệm tương tác
          </div>
          <InteractiveWidget type={lesson.interactiveType} />
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

      {/* 5.5. Câu luyện tập - chỉ khi bài THẬT SỰ có một câu.
          Hàm dựng thay thế cũ bịa ra một câu cho 97 bài không có, và câu nó
          bịa vi phạm đúng luật 4 của AGENTS.md: phương án "Vì chỉ cần đọc là
          đủ, không cần áp dụng" và "Vì không liên quan đến đời sống hàng ngày"
          là khoảng trống, loại được ngay từ cái nhìn đầu tiên, nên câu bốn
          phương án thành câu hai phương án.

          Nó KHÔNG ghi điểm đi đâu cả - LessonQuestionCard không đụng tới
          avg_quiz_score - nên đây là chuyện lãng phí thời gian người học, chứ
          không phải chuyện làm sai các con số. Vẫn phải gỡ. */}
      {lesson.practicePrompt && (
        <LessonQuestionCard
          title="Luyện tập ngay"
          question={lesson.practicePrompt.question}
          options={lesson.practicePrompt.options}
          correct={lesson.practicePrompt.correct}
          explanation={lesson.practicePrompt.explanation}
        />
      )}

      {/* 5.75 - 6. Everything that summarises the lesson, gated behind the
          60-second free-recall exercise. The gate has to start here rather
          than immediately above "Ghi nhớ nhanh": the summary card, the
          application card and the review-loop card all restate the lesson's
          key idea, so leaving them outside would hand the learner the
          answers before asking them to recall anything. */}
      <FreeRecallCard
        lessonId={lesson.id}
        lessonSlug={lesson.slug}
        takeaways={lesson.keyTakeaways ?? []}
      >
      {/* 5.75 - 5.95. Tóm tắt, áp dụng, và vòng ôn lại.
          Cả ba CHỈ dựng khi bài thật sự có nội dung cho chúng.

          Trước đây có hai hàm dựng thay thế, và thứ chúng sinh ra là chữ rỗng:
          keyIdea là "Bài này giúp bạn hiểu rõ hơn về <tên bài>", còn
          commonMistake và action thì giống hệt nhau ở mọi bài. Hậu quả không
          phải một tấm thẻ xấu mà là một tấm thẻ NÓI DỐI: nó trông y hệt tấm
          thẻ của 689 bài có tóm tắt thật, chiếm cùng chỗ, mang cùng tiêu đề,
          và không chứa một chữ nào về bài đang đọc. Vì có hàm thay thế nên
          không ai thấy - 26 bài đã ở tình trạng đó.

          Không có thẻ thì tốt hơn một cái thẻ rỗng: chỗ trống nhìn thấy được,
          còn chữ rỗng thì không. Bài nào thiếu sẽ hiện trong npm run
          audit:lessons. */}
      {lesson.summary && <LessonSummaryCard summary={lesson.summary} />}

      {lesson.application && (
        <LessonApplicationCard
          title={lesson.application.title}
          message={lesson.application.message}
          secondary={lesson.application.secondary}
        />
      )}

      {lesson.summary?.keyIdea && (
        <ReviewLoopCard
          prompt={`Nếu bạn chỉ nhớ 1 điều từ bài này, hãy nhớ rằng: ${lesson.summary.keyIdea}.`}
          cta="Ôn lại trong 1 phút trước khi chuyển bài"
        />
      )}

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
      {/* 6.5. Đường sang căn phòng 3D dạy đúng điều này, nếu bài có một
          căn. Sau phần ghi nhớ chứ không phải đầu bài: ở đầu bài nó rủ người
          ta bỏ dở, ở đây nó là bước tiếp theo của người vừa tóm tắt xong. */}
      <LessonRoomCard slug={lesson.slug} />
      </FreeRecallCard>
    </LessonPageLayout>
    </div>
  );
}
