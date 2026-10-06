"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
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
import { trackFeatureClick } from "@/lib/feature-events";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { Sys, panel } from "@/components/ui/system";

// Nhãn mục kiểu bảng hệ thống - chữ hoa sans, vì đó là chữ tiếng Việt đã
// dịch chứ không phải định danh máy (luật 4 ở components/ui/system.tsx).
const blockLabel = "border-b border-line-strong pb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted";

interface Props {
  // LocalizedLesson when it came through the locale-aware loader, plain Lesson
  // from the hand-authored static pages that build their object inline. The
  // badge treats a missing `translated` the same as untranslated, which is
  // right: those pages have no translation layer at all.
  lesson: Lesson | LocalizedLesson;
  nextLesson?: { id: number; slug: string; title: string };
}

/** Chọn ví von cho bài học - trả về ID, không trả câu chữ.
 *
 *  Chín câu ví von từng là literal trong thân hàm này, và đó là hình dạng mà
 *  i18n-coverage chỉ thấy được sau khi thêm rule returned-text: file này báo 0
 *  chuỗi trong khi mỗi bài học đều hiện một câu ví von tiếng Việt.
 *
 *  Danh sách từ khoá thì GIỮ NGUYÊN và không dịch: chúng dò trên tiêu đề bài,
 *  và mỗi khoá đã có sẵn cả bản tiếng Việt lẫn tiếng Anh ("vòng lặp" ||
 *  "loop"), nên bộ dò vẫn khớp khi bài đã được dịch. Đây là toán hạng so
 *  sánh, không phải câu chữ. */
type MetaphorId =
  | "commandLine"
  | "fileSystem"
  | "version"
  | "algorithm"
  | "database"
  | "cache"
  | "api"
  | "debug"
  | "operatingSystem";

/** Chủ đề nào thì hiện câu ví von nào, đoán từ tiêu đề bài.
 *
 *  Thứ tự các nhánh là thứ tự ưu tiên, không phải ngẫu nhiên: một bài tên
 *  "Chỉ mục trong cơ sở dữ liệu" khớp cả `database` lẫn `cache` nếu nó nhắc tới
 *  bộ nhớ đệm, nên nhánh hẹp hơn phải đứng trước. Mỗi nhánh mang cả từ khoá
 *  tiếng Việt lẫn tiếng Anh vì tiêu đề bài trộn hai thứ tiếng - "Big-O",
 *  "commit", "API" không có bản Việt nào được dùng thật. */
function getMetaphorForLesson(title: string): MetaphorId | null {
  const t = title.toLowerCase();
  if (t.includes("hệ điều hành") || t.includes("operating system")) return "operatingSystem";
  if (t.includes("dòng lệnh") || t.includes("terminal") || t.includes("shell")) return "commandLine";
  if (t.includes("thư mục") || t.includes("đường dẫn") || t.includes("tệp") || t.includes("directory") || t.includes("path"))
    return "fileSystem";
  if (t.includes("git") || t.includes("commit") || t.includes("nhánh") || t.includes("phiên bản")) return "version";
  if (t.includes("thuật toán") || t.includes("big-o") || t.includes("độ phức tạp") || t.includes("sắp xếp"))
    return "algorithm";
  if (t.includes("bộ nhớ đệm") || t.includes("cache")) return "cache";
  if (t.includes("cơ sở dữ liệu") || t.includes("truy vấn") || t.includes("chỉ mục") || t.includes("sql"))
    return "database";
  // `\bapi\b` chứ không phải `includes("api")`: "api" là chuỗi con của
  // "capital", nên bản dùng includes gán ẩn dụ API cho "Venture Capital",
  // "Working Capital" và "Cost of Capital". Ba từ khoá kia đủ hiếm để dùng
  // includes, riêng từ này thì không.
  if (/\bapi\b/.test(t) || t.includes("endpoint") || t.includes("http")) return "api";
  if (t.includes("gỡ lỗi") || t.includes("debug") || t.includes("kiểm thử") || t.includes("test")) return "debug";
  // Không khớp gì thì KHÔNG có câu ví von. Từng có một câu dự phòng - "giống
  // như học đi xe đạp" - và nó rơi vào mọi bài không trúng từ khoá nào, kể cả
  // bài hệ điều hành. Người mới đọc thấy một phép so sánh chẳng dính gì tới
  // bài là biết ngay đây là khuôn đúc sẵn, và mất luôn lòng tin vào phần còn
  // lại của thẻ. Thà không ví von còn hơn ví von sai.
  return null;
}

/** Câu ví von cho thẻ Feynman: lấy từ khối `feynman` của CHÍNH bài nếu có -
 *  người viết bài chọn nó cho đúng nội dung này - rồi mới tới bộ dò theo
 *  tiêu đề. */
function metaphorOf(lesson: Props["lesson"], metaphors: Record<MetaphorId, string>): { text: string; ownSentence: boolean } | null {
  const block = (lesson.sections ?? []).find((s) => s.type === "feynman");
  if (block && "intro" in block && typeof block.intro === "string" && block.intro) {
    return { text: block.intro, ownSentence: true };
  }
  const id = getMetaphorForLesson(lesson.title);
  return id ? { text: `${metaphors[id]}.`, ownSentence: false } : null;
}

export default function LessonPageClient({ lesson, nextLesson }: Props) {
  const { t } = useI18n();
  const [feynmanMode, setFeynmanMode] = useState(false);
  // Staged reveal for the "Cơ Cơ giải thích" card, like a chatbot response:
  // the metaphor line types itself out first, then the takeaways/mistake
  // warning fade in - instead of the whole card appearing at once.
  const [metaphorTyped, setMetaphorTyped] = useState(false);
  const lessonLabel = getLessonDisplayLabel(lesson, t.lessonLabel);
  const metaphor = metaphorOf(lesson, t.lessonPage.metaphors);

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
        <div className="border-l border-line-strong pl-4 sm:pl-5">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
            {t.lessonPage.whyItMattersTitle}
          </p>
          <p className="max-w-[68ch] text-base leading-8 text-ink-max sm:text-lg">
            {lesson.whyItMatters}
          </p>
        </div>
      )}

      {/* Feynman ELI5 Mode Toggle */}
      <div className={`${panel} flex items-center justify-between gap-4 p-4`}>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-black tracking-tight text-ink-max">
            {t.lessonPage.feynmanTitle}
          </h4>
          <p className="mt-1 text-xs leading-5 text-ink-soft">
            {t.lessonPage.feynmanSubtitle}
          </p>
        </div>
        <button
          onClick={() => {
            setFeynmanMode(!feynmanMode);
            setMetaphorTyped(false);
          }}
          aria-pressed={feynmanMode}
          className={`shrink-0 cursor-pointer rounded-sm border px-3 py-2 text-xs font-bold transition-colors ${
            feynmanMode
              ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
              : "border-line-strong text-ink-muted hover:border-line-firm hover:text-ink"
          }`}
        >
          {feynmanMode ? t.lessonPage.feynmanOn : t.lessonPage.feynmanOff}
        </button>
      </div>

      {feynmanMode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${panel} space-y-4 p-5`}
        >
          <div className="flex items-center gap-3 border-b border-line-strong pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-surface text-ink-muted">
              <Lightbulb aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <h5 className="text-sm font-black tracking-tight text-ink-max">{t.lessonPage.feynmanCardTitle}</h5>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.lessonPage.feynmanCardSubtitle}</p>
            </div>
          </div>
          <div className="max-w-[68ch] space-y-3 text-sm leading-7 text-ink-body">
            {/* Câu dẫn hứa "một phép so sánh", nên nó chỉ đứng đó khi có. */}
            {metaphor && (
              <p>
                {t.lessonPage.feynmanIntroPart1} <strong>&quot;{lesson.title}&quot;</strong> {t.lessonPage.feynmanIntroPart2}
              </p>
            )}
            {metaphor && (
              <div className="rounded-sm bg-surface p-3.5 font-semibold text-ink-max">
                {!metaphor.ownSentence && <>{t.lessonPage.feynmanMetaphorLeadIn} </>}
                <TypingText text={metaphor.text} onDone={() => setMetaphorTyped(true)} />
              </div>
            )}
            {(metaphorTyped || !metaphor) && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <p className="font-bold text-ink-max">{t.lessonPage.feynmanTakeawaysTitle}</p>
                <ul className="list-disc pl-4 space-y-1.5 text-ink-body">
                  {(lesson.keyTakeaways ?? []).slice(0, 3).map((takeaway: string, idx: number) => {
                    /* "Ý chính - giải thích" thì in đậm vế đầu. Ý không có
                       dấu gạch thì in nguyên câu: bản cũ in `vế đầu: cả câu`,
                       tức cùng một câu hai lần liền nhau. */
                    const [head, ...rest] = takeaway.split(" - ");
                    return (
                      <li key={idx}>
                        {rest.length > 0 ? (
                          <>
                            <strong>{head}</strong>: {rest.join(" - ")}
                          </>
                        ) : (
                          takeaway
                        )}
                      </li>
                    );
                  })}
                </ul>
                {lesson.summary?.commonMistake && (
                  <p className="border-l-2 border-red-500 pl-3 text-sm font-semibold text-danger">
                    {t.lessonPage.feynmanMistakePrefix} {lesson.summary.commonMistake}
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
          lessonId={lesson.id}
        />
      ) : (
        lesson.explanation && (
          <div className="space-y-3">
            <div className={blockLabel}>
              {t.lessonPage.explanationTitle}
            </div>
            <p className="max-w-[68ch] text-lg leading-8 text-ink-body">
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
          <div className={blockLabel}>
            {t.lessonPage.diagramTitle}
          </div>
          <div className="flex flex-col items-center rounded-md bg-surface px-4 py-5">
            {lesson.diagram.map((node: { label: string; arrow?: boolean }, i: number) => (
              <React.Fragment key={i}>
                <div className="flex w-full max-w-sm items-baseline gap-3 rounded-sm border border-line-strong bg-white px-4 py-3 text-sm font-semibold text-ink-max dark:bg-stone-900">
                  <Sys className="text-ink-muted">{String(i + 1).padStart(2, "0")}</Sys>
                  <span className="flex-1">{node.label}</span>
                </div>
                {node.arrow && i < lesson.diagram.length - 1 && (
                  <div aria-hidden className="my-1 h-4 w-px bg-stone-400 dark:bg-stone-600" />
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
          <div className={blockLabel}>
            {t.lessonPage.interactiveTitle}
          </div>
          <InteractiveWidget type={lesson.interactiveType} />
        </div>
      )}

      {/* 4.5. Visual summary image (optional hand-crafted infographic recap) */}
      {lesson.summaryImage && (
        <div className="space-y-3">
          <div className={blockLabel}>
            {t.lessonPage.summaryImageTitle}
          </div>
          <div className="overflow-hidden rounded-md border border-line-strong">
            <Image
              src={lesson.summaryImage}
              alt={format(t.lessonPage.summaryImageAlt, { title: lesson.title })}
              width={1024}
              height={1536}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* 5. Real-life Example block */}
      {lesson.realWorldExample && lesson.realWorldExample.company && (
        <div className="space-y-2 border-l border-line-strong pl-4 sm:pl-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
            {format(t.lessonPage.realWorldExampleTitle, { company: lesson.realWorldExample.company })}
          </p>
          <p className="max-w-[68ch] text-base leading-8 text-ink-body sm:text-lg">
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
          title={t.lessonPage.practicePromptTitle}
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
          prompt={`${t.lessonPage.reviewLoopPromptPart1} ${lesson.summary.keyIdea}.`}
          cta={t.lessonPage.reviewLoopCta}
        />
      )}

      {/* 6. Key Takeaways block */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className={`${panel} overflow-hidden`}>
          <div className="border-b border-line-strong px-4 py-3 sm:px-5">
            <p className="text-lg font-black tracking-tight text-ink-max">{t.lessonPage.keyTakeawaysTitle}</p>
          </div>
          <ol className="divide-y divide-line">
            {lesson.keyTakeaways.map((takeaway: string, i: number) => (
              <li key={i} className="flex items-baseline gap-4 px-4 py-4 sm:px-5">
                <Sys className="flex-shrink-0 text-ink-muted">{String(i + 1).padStart(2, "0")}</Sys>
                <p className="max-w-[68ch] text-base leading-7 text-ink-body">{takeaway}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      {/* 6.5. Đường sang căn phòng 3D dạy đúng điều này, nếu bài có một
          căn. Sau phần ghi nhớ chứ không phải đầu bài: ở đầu bài nó rủ người
          ta bỏ dở, ở đây nó là bước tiếp theo của người vừa tóm tắt xong. */}
      </FreeRecallCard>
    </LessonPageLayout>
    </div>
  );
}
