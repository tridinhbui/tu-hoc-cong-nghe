"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, XCircle, ChevronLeft, Lock, Check, Trophy, Target, ArrowRight, Monitor, GitBranch, Code2, Globe, Braces, Layers, Server, Database, Cloud, type LucideIcon } from "lucide-react";
import { recalculateUserStats } from "@/lib/cloudflare-user";
import {
  STAGE_EXAM_PASS_RATIO,
  STAGE_EXAM_QUESTION_COUNT,
  STAGE_EXAM_RETRY_COOLDOWN_MS,
  stageExamPassMark,
  formatCooldown,
  type StageExamEligibility,
  type StageExamTrack,
} from "@/lib/stage-exam";
import { useI18n } from "@/lib/i18n/context";
import { useQuizKeys } from "@/lib/use-quiz-keys";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { Sys, panel, btnPrimary, btnSecondary, tabClass } from "@/components/ui/system";

/** Biểu tượng từng chặng trong danh sách thi vượt.
 *
 *  Hình bên trong đổi theo chủ đề công nghệ, xoay vòng chín kiểu theo thứ tự
 *  lộ trình Nền tảng. Mỗi chặng từng mang một màu nền riêng (hổ phách, cam,
 *  tím, xanh ngọc...) - màu ấy không nói gì về trạng thái của chặng, nên giờ
 *  mọi ô cùng một tông đá: xanh chỉ dành cho "đã xong" và "đang thi". */
const STAGE_ICONS: LucideIcon[] = [Monitor, GitBranch, Code2, Globe, Braces, Layers, Server, Database, Cloud];

type StageTone = "active" | "done" | "idle" | "locked";

const STAGE_ICON_TONE: Record<StageTone, string> = {
  active: "bg-brand-600 text-white dark:bg-brand-400 dark:text-stone-950",
  done: "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300",
  idle: "bg-surface-raised text-ink-soft",
  locked: "bg-surface-sunken/60 text-ink-faint",
};

function StageThemedIcon({ index, tone, size = "sm" }: { index: number; tone: StageTone; size?: "sm" | "lg" }) {
  const Icon = STAGE_ICONS[index % STAGE_ICONS.length];
  return (
    <div
      className={`${size === "lg" ? "h-11 w-11" : "h-7 w-7"} ${STAGE_ICON_TONE[tone]} rounded-sm flex items-center justify-center shrink-0`}
    >
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.75} />
    </div>
  );
}

/** Đủ bài đã học thì chặng tính là đã vượt - cùng điều kiện server dùng. */
function isStageCleared(s: StageExamEligibility) {
  return s.lessonCount > 0 && s.completedCount >= s.lessonCount;
}

// "Thi vượt chặng" - one exam credits an entire chặng as complete, for
// learners who already know the material and don't want to click through
// twenty lessons to prove it.
//
// Grading and crediting both happen in app/api/stage-exam; this component
// never decides whether someone passed. It shows questions, collects the
// signed tokens back, and renders whatever the server returns.

function getTracks(t: Dictionary): { id: StageExamTrack; label: string }[] {
  return [
    { id: "personal", label: t.stageSkip.trackPersonal },
    { id: "professional", label: t.stageSkip.trackProfessional },
  ];
}

interface ExamQuestion {
  lessonId: number;
  questionIndex: number;
  question: string;
  options: string[];
  explanation: string;
  token: string;
}

interface Result {
  score: number;
  total: number;
  passed: boolean;
  creditedLessons: number;
  alreadyCompleted?: number;
  /** Chấm từng câu, do /api/stage-exam trả về: chỉ số đáp án đúng nằm trong
   *  token đã ký nên client không tự suy ra được. Tuỳ chọn để một máy chủ chưa
   *  cập nhật vẫn không làm trắng màn kết quả. */
  details?: { token: string; correct: number; selected: number }[];
}

type View = "pick" | "loading" | "exam" | "result";

/** `fullPage`: khối này ĐANG LÀ cả trang, không phải một tab nhúng trong
 *  trang khác.
 *
 *  Trước đây prop này tên `hideHeading` và có hẳn đoạn chú thích giải thích nó
 *  bỏ dòng tiêu đề trùng với thanh đầu trang - nhưng JSX chưa từng đọc tới nó.
 *  Prop được khai báo, được truyền vào, và không làm gì; tiêu đề vẫn in hai
 *  lần cách nhau ba mươi pixel.
 *
 *  Đổi tên vì giờ nó quyết định ba thứ chứ không riêng dòng tiêu đề: bỏ tiêu
 *  đề trùng, bỏ banner cuối (lần thứ ba cùng một câu), và cho khối thẻ tự cuộn
 *  bên trong một khung đứng yên thay vì cuộn cả trang. Cả ba đều là hệ quả của
 *  cùng một sự thật - đứng một mình thì không cần tự giới thiệu ba lần.
 *
 *  Đoạn mô tả trong hero thì GIỮ: nó chứa mốc điểm đạt tính từ
 *  STAGE_EXAM_PASS_RATIO, tức là thông tin chứ không phải nhãn. */
export default function StageSkipExamPanel({ userId, fullPage = false }: { userId: string | null; fullPage?: boolean }) {
  const { t } = useI18n();
  const TRACKS = useMemo(() => getTracks(t), [t]);
  const [track, setTrack] = useState<StageExamTrack>("personal");
  const [stages, setStages] = useState<StageExamEligibility[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [view, setView] = useState<View>("pick");

  const [activeStage, setActiveStage] = useState<StageExamEligibility | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [activeQ, setActiveQ] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const loadStages = useCallback(async () => {
    if (!userId) {
      setListLoading(false);
      return;
    }
    setListLoading(true);
    try {
      /* locale-refetch-skip: hai lời gọi này KHÔNG cần `locale`. Danh sách
         chặng không mang chữ nào của bài học - tên chặng đọc từ từ điển ở
         `stageNameOf`. Còn đề thi thì được rút lúc người học bấm "Thi vượt",
         nên nó luôn lấy đúng ngôn ngữ tại thời điểm đó; gọi lại giữa chừng sẽ
         rút một BỘ ĐỀ KHÁC và xoá sạch câu đã trả lời. */
      const res = await fetch(`/api/stage-exam?track=${track}`, { cache: "no-store" });
      const data = await res.json();
      setStages(data.stages ?? []);
    } catch (error) {
      console.error("Error loading stage exams:", error);
      setStages([]);
    } finally {
      setListLoading(false);
    }
  }, [userId, track]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tải danh sách chặng từ API khi đổi track; không có nguồn nào khác để đọc lúc render
    void loadStages();
  }, [loadStages]);

  async function startExam(stage: StageExamEligibility) {
    setView("loading");
    setActiveStage(stage);
    setResult(null);
    setActiveQ(0);
    try {
      /* locale-refetch-skip: xem lý do ở `loadStages` phía trên. */
      const res = await fetch(
        `/api/stage-exam?track=${track}&stage=${encodeURIComponent(stage.stageLabel)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (res.status === 429) {
        // Cooldown after a failed attempt - the server won't hand out a fresh
        // draw yet, which is what stops re-rolling until an easy set appears.
        // Câu chờ dựng Ở ĐÂY từ `cooldownMs`, không dùng `data.message`: route API
        // ghép sẵn một câu tiếng Việt và gửi xuống, nên người đọc tiếng Anh nhận
        // một dòng tiếng Việt giữa giao diện tiếng Anh.
        toast.error(
          typeof data.cooldownMs === "number" && data.cooldownMs > 0
            ? format(t.stageSkip.cooldownRetry, { time: formatCooldown(data.cooldownMs, t.cooldown) })
            : t.stageSkip.cooldownDefault
        );
        setView("pick");
        return;
      }
      if (!data.questions?.length) {
        toast.error(t.stageSkip.notEnoughQuestions);
        setView("pick");
        return;
      }
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
      setView("exam");
    } catch (error) {
      console.error("Error starting stage exam:", error);
      toast.error(t.stageSkip.loadFailed);
      setView("pick");
    }
  }

  /** "Chọn chặng khác" hiện SUỐT lúc thi, và nó bỏ cả bài đang làm.
   *
   *  Trước đây một cú bấm là mất tới mười lăm câu đã trả lời mà không hỏi lại -
   *  cùng chỗ với nút "Câu trước" và cách nó vài chục pixel. Chỉ hỏi khi đã có
   *  câu trả lời: chưa trả lời gì thì không có gì để mất. */
  function leaveExam() {
    if (
      view === "exam" &&
      answeredCount > 0 &&
      !window.confirm(format(t.stageSkip.discardConfirm, { answered: answeredCount }))
    ) {
      return;
    }
    setView("pick");
  }

  async function submitExam() {
    if (!activeStage || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/stage-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          stageLabel: activeStage.stageLabel,
          // Unanswered questions submit an out-of-range index so they count
          // as wrong rather than shrinking the denominator.
          answers: questions.map((q, i) => ({ token: q.token, selected: answers[i] ?? -1 })),
        }),
      });
      const data: Result & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "failed");
      setResult(data);
      setView("result");
      if (data.passed) {
        toast.success(format(t.stageSkip.passToast, { creditedLessons: data.creditedLessons }));
        if (userId) void recalculateUserStats(userId).catch(() => {});
        void loadStages();
      }
    } catch (error) {
      console.error("Error submitting stage exam:", error);
      toast.error(t.stageSkip.submitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  /* Cuộn khối thẻ tới một chặng. Tính tay trên CHÍNH vùng cuộn, không dùng
     `scrollIntoView`: hàm đó cuộn cả những tổ tiên `overflow-hidden`, và khung
     trang ở đây cố ý không cuộn - nó sẽ đẩy hero ra khỏi màn hình. */
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToStage = useCallback((label: string, onlyIfHidden = false) => {
    const box = scrollRef.current;
    const el = Array.from(box?.querySelectorAll<HTMLElement>("[data-stage]") ?? []).find((n) => n.dataset.stage === label);
    if (!box || !el) return;
    const boxRect = box.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (onlyIfHidden && elRect.bottom <= boxRect.bottom) return;
    const top = elRect.top - boxRect.top + box.scrollTop - 4;
    if (onlyIfHidden || typeof box.scrollTo !== "function") box.scrollTop = top;
    else box.scrollTo({ top, behavior: "smooth" });
  }, []);

  /* Chặng hiện tại luôn nằm trong khung lúc mở trang: với người đã vượt mười
     chặng, nó ở dưới hàng thứ tư, và thứ đầu tiên họ thấy sẽ là những chặng
     đã xong thay vì chặng đang chờ mình. */
  useEffect(() => {
    if (listLoading || view !== "pick") return;
    const current = stages.find((s) => s.eligible && !isStageCleared(s));
    if (current) scrollToStage(current.stageLabel, true);
  }, [listLoading, stages, view, scrollToStage]);

  // 1-4 chọn phương án, Enter sang câu sau (câu cuối thì nộp). Gọi TRƯỚC mọi
  // `return` sớm: hook không được nằm sau một nhánh thoát.
  useQuizKeys({
    optionCount: questions[activeQ]?.options.length ?? 0,
    enabled: view === "exam" && !!questions[activeQ],
    onPick: (oi) =>
      setAnswers((a) => {
        const n = [...a];
        n[activeQ] = oi;
        return n;
      }),
    onEnter: () => {
      if (activeQ < questions.length - 1) setActiveQ((i) => i + 1);
      else void submitExam();
    },
  });

  if (!userId) return null;

  /* Tên chặng đọc từ TỪ ĐIỂN theo vị trí, không lấy thẳng từ API.
   *
   *  `stageName` mà /api/stage-exam trả về là `stage.name` trong
   *  lib/track-stages.ts, và tệp đó cố ý không dịch tại chỗ - `label` còn là
   *  khoá của cột `stage_label` đã ghi xuống Supabase. Cả app đọc
   *  `t.trackStages[track].stages[i].name` theo vị trí, và bộ kiểm
   *  track-stages-i18n gác cho hai danh sách khớp nhau cả số lượng lẫn thứ tự.
   *  Panel này trước đây in thẳng chuỗi từ API, nên người đọc tiếng Anh thấy
   *  tên chặng tiếng Việt giữa một khối đã dịch hết. Rơi về `s.stageName` khi
   *  từ điển thiếu mục, đúng cách ResumeLearningButton đang làm. */
  const stageNameOf = (s: StageExamEligibility, index: number) =>
    t.trackStages[track]?.stages[index]?.name ?? s.stageName;

  const answeredCount = answers.filter((a) => a !== null).length;
  const passPercent = Math.round(STAGE_EXAM_PASS_RATIO * 100);
  /* Mốc đúng tối thiểu lấy từ `stageExamPassMark`, cùng hàm server dùng để
     chấm. Trong lúc thi thì đếm theo số câu thực nhận - đề có thể ngắn hơn
     hằng số nếu chặng thiếu câu. */
  const passMark = stageExamPassMark(questions.length || STAGE_EXAM_QUESTION_COUNT);
  /** Số câu đề sẽ thực sự có: tối đa hằng số, nhưng ngắn hơn nếu chặng thiếu. */
  const examLength = (s: StageExamEligibility) => Math.min(STAGE_EXAM_QUESTION_COUNT, s.questionCount);

  const clearedStages = stages.filter(isStageCleared).length;
  /** Chặng thi được đầu tiên chưa xong - thứ duy nhất trên lưới được nổi xanh. */
  const nextStageLabel = stages.find((s) => s.eligible && !isStageCleared(s))?.stageLabel;
  const allCleared = stages.length > 0 && clearedStages === stages.length;
  const campaignPercent = stages.length > 0 ? Math.round((clearedStages / stages.length) * 100) : 0;
  /** Số chặng hai chữ số, lấy từ nhãn ("Chặng 3" -> "03"), rơi về vị trí. */
  const stageNoOf = (s: StageExamEligibility, index: number) =>
    (s.stageLabel.match(/\d+/)?.[0] ?? String(index + 1)).padStart(2, "0");

  return (
    // Nền khối vẫn trắng: màu ở đây luôn gắn với một TRẠNG THÁI chứ không tô
    // cả một vùng. Lục rừng là "đã xong" hoặc "đang chọn", hổ phách là "phần
    // thưởng" hoặc "còn thiếu bấy nhiêu", xám là "chưa mở", đen là hành động
    // chính. Đổ màu cả khối thì bốn nghĩa ấy chìm vào nền, và chặng chưa đủ
    // điều kiện trông cũng rực rỡ như chặng đang mời vào thi.
    //
    // TÍM ĐÃ ĐI HẲN. Khối này từng lấy tím-chàm làm màu chủ đạo - hộp tiến độ
    // chuyển sắc, nút chuyển sắc kèm hiệu ứng loé sáng `cta-sheen`, vạch tiến
    // độ tím→hồng sen - trong khi không chỗ nào khác của sản phẩm dùng tím.
    <div className={fullPage ? "flex h-full min-h-0 flex-col gap-5" : "space-y-5"}>
      {view !== "pick" && (
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={leaveExam}
            className={`${btnSecondary} px-3 py-1.5 text-xs cursor-pointer`}
          >
            <ChevronLeft className="w-4 h-4" />
            {t.stageSkip.chooseAnotherStage}
          </button>
        </div>
      )}

      {view === "pick" && (
        <>
          {/* ── 1. MỐC TIẾN TRÌNH ──
              Con số "đã vượt" và thanh chặng giờ đứng trên một mặt xanh rất
              nhạt thay vì nằm trơn trên nền: đây là thứ người học quay lại
              trang này để nhìn, nên nó cần đọc như một cột mốc chứ không như
              một dòng thống kê. Mỗi đoạn của thanh là một nút - bấm vào là
              cuộn tới đúng thẻ chặng đó. */}
          <div className="relative flex flex-col gap-3 shrink-0">
            <div>
              {!fullPage && (
                <h2 className="text-xl sm:text-2xl font-black leading-[1.15] text-ink-max tracking-tight">
                  {t.stageSkip.title}
                </h2>
              )}
              <p className="max-w-[68ch] text-sm text-ink-soft mt-1 leading-7">
                {format(t.stageSkip.descriptionPart1, { questionCount: STAGE_EXAM_QUESTION_COUNT })}{" "}
                {passPercent}
                {t.stageSkip.descriptionPart2}
              </p>
            </div>

            <div className="rounded-card bg-accent-soft px-4 py-3.5 sm:px-5">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-3xl sm:text-4xl font-medium tabular-nums leading-none tracking-tight">
                    {/* Tổng chặng chỉ hiện khi đã tải xong: trước đây là một
                        số 27 viết cứng làm giá trị chờ, tức một con số bịa
                        đứng thay cho con số thật trong lúc tải. */}
                    <span className="text-accent-strong">{clearedStages}</span>
                    <span className="text-ink-faint">/{listLoading ? "–" : stages.length}</span>
                  </span>
                  <span className="text-xs font-bold text-ink-soft">
                    {t.stageSkip.campaignLabel}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold tabular-nums">
                  {!listLoading && stages.length > 0 && (
                    <span className="text-accent-strong">
                      {format(t.stageSkip.campaignPercent, { percent: campaignPercent })}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-ink-muted">
                    <Target className="h-3 w-3" />
                    {format(t.stageSkip.passMark, { need: stageExamPassMark(STAGE_EXAM_QUESTION_COUNT), total: STAGE_EXAM_QUESTION_COUNT })}
                  </span>
                </div>
              </div>

              {/* Thanh chặng: đặc xanh là đã vượt, đoạn có viền và cao hơn là
                  chặng hiện tại, xám là chưa tới, chìm hẳn là chưa đủ câu để thi. */}
              <div className="mt-3.5 flex h-3 items-center gap-[3px]">
                {stages.map((s, i) => {
                  const cleared = isStageCleared(s);
                  const current = s.stageLabel === nextStageLabel;
                  const label = format(t.stageSkip.jumpToStage, { no: stageNoOf(s, i), name: stageNameOf(s, i) });
                  return (
                    <button
                      key={s.stageLabel}
                      type="button"
                      onClick={() => scrollToStage(s.stageLabel)}
                      aria-label={label}
                      title={label}
                      aria-current={current ? "step" : undefined}
                      className={`flex-1 rounded-[1px] cursor-pointer motion-safe:transition-colors motion-safe:duration-500 ${
                        current
                          ? "h-3 bg-brand-300 outline outline-2 outline-offset-1 outline-brand-600 dark:bg-brand-700 dark:outline-brand-400"
                          : cleared
                          ? "h-2 bg-brand-600 hover:bg-brand-700 dark:bg-brand-400"
                          : s.eligible
                          ? "h-2 bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/70 dark:hover:bg-brand-800"
                          : "h-1.5 bg-surface-sunken"
                      }`}
                    />
                  );
                })}
              </div>
              {allCleared && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-accent-strong">
                  <Trophy className="h-3.5 w-3.5" />
                  {t.stageSkip.allCleared}
                </p>
              )}
            </div>
          </div>

          {/* ── 2. TRACK SELECTOR PILLS ── */}
          <div role="tablist" className="flex shrink-0 items-center gap-5 border-b border-stone-200 pt-1 dark:border-stone-800">
            {TRACKS.map((trackOption) => {
              const active = track === trackOption.id;
              return (
                <button
                  key={trackOption.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrack(trackOption.id)}
                  className={`${tabClass(active)} cursor-pointer`}
                >
                  {trackOption.label}
                </button>
              );
            })}
          </div>

          {/* Chỉ KHỐI THẺ cuộn, hero và hai viên chọn hướng đứng yên.
              Trước đây cả ba cùng nằm trong một vùng cuộn, nên cuộn xuống thẻ
              thứ mười là mất luôn con số 0/27 và cặp nút đổi hướng - hai thứ
              người ta quay lại đây để nhìn. */}
          <div ref={scrollRef} className={fullPage ? "flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin]" : ""}>
            {listLoading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-ink-muted">
                <Loader2 className="w-6 h-6 animate-spin text-ink-muted" />
                <span className="text-xs font-bold">{t.stageSkip.loadingStages}</span>
              </div>
            ) : (
              /* ── 3. CÁC CHẶNG ──
                 Bốn trạng thái, bốn độ nổi khác nhau - không còn chín thẻ giống
                 hệt nhau. Chặng hiện tại chiếm trọn một hàng ngay tại vị trí
                 của nó trong lộ trình; chặng đã vượt nằm trên mặt xanh nhạt với
                 dấu "Đã vượt"; chặng sắp tới là thẻ trắng viền mảnh với nút chữ;
                 chặng chưa đủ câu lùi hẳn xuống nền xám. */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pb-1">
                {stages.map((s, i) => {
                  const isCurrent = s.stageLabel === nextStageLabel;
                  const done = isStageCleared(s);
                  const no = stageNoOf(s, i);
                  const name = stageNameOf(s, i);
                  const remaining = Math.max(0, s.lessonCount - s.completedCount);
                  const pct = s.lessonCount > 0 ? Math.round((s.completedCount / s.lessonCount) * 100) : 0;

                  if (isCurrent) {
                    const upNext = stages[i + 1];
                    return (
                      <div
                        key={s.stageLabel}
                        data-stage={s.stageLabel}
                        className="thcn-rise relative overflow-hidden rounded-card border-2 border-accent bg-accent-soft p-4 sm:p-5 md:col-span-2 lg:col-span-3"
                      >
                        {/* Số chặng cỡ lớn chìm vào nền: nhận diện "chặng 03"
                            từ xa mà không thêm một hộp nào. Vẽ bằng CSS
                            `content`, không phải chữ trong DOM - để trình đọc
                            màn hình không đọc số chặng thêm lần nữa. */}
                        <span
                          aria-hidden
                          data-no={no}
                          className="pointer-events-none absolute -bottom-6 right-60 hidden select-none font-mono text-[8.5rem] font-medium leading-none tracking-tighter text-brand-600/[0.08] before:content-[attr(data-no)] md:block dark:text-brand-400/[0.1]"
                        />

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                          <div className="min-w-0 flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2" aria-hidden>
                                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600 dark:bg-brand-500" />
                              </span>
                              <span className="text-[11px] font-black uppercase tracking-[0.08em] text-accent-strong">
                                {t.stageSkip.currentStage}
                              </span>
                              <Sys className="tabular-nums">
                                <span className="text-accent-strong">{no}</span>
                                <span className="text-ink-faint">/{stageNoOf(stages[stages.length - 1], stages.length - 1)}</span>
                              </Sys>
                            </div>

                            <div className="flex items-center gap-3">
                              <StageThemedIcon index={i} tone="active" size="lg" />
                              <h3 className="text-lg font-black leading-snug tracking-tight text-ink-max sm:text-xl">
                                {name}
                              </h3>
                            </div>

                            <div className="max-w-md space-y-1.5">
                              <div className="flex items-center justify-between gap-3 text-[11px] font-bold tabular-nums">
                                <span className="text-ink-muted">
                                  {format(t.stageSkip.lessonsProgress, { completed: s.completedCount, total: s.lessonCount })}
                                </span>
                                {remaining > 0 && (
                                  <span className="text-accent-strong">
                                    {format(t.stageSkip.rewardLessons, { count: remaining })}
                                  </span>
                                )}
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-[1px] bg-surface dark:bg-stone-900">
                                <div
                                  className="h-full bg-brand-600 motion-safe:transition-all motion-safe:duration-500 dark:bg-brand-400"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                            <button
                              onClick={() => void startExam(s)}
                              className={`${btnPrimary} thcn-glitch px-6 py-3 text-sm cursor-pointer`}
                            >
                              <span>{t.stageSkip.takeExam}</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <span className="text-center text-[11px] font-bold tabular-nums text-ink-muted sm:text-right">
                              {format(t.stageSkip.examMeta, { count: examLength(s), need: stageExamPassMark(examLength(s)) })}
                            </span>
                            {upNext && (
                              <span className="flex max-w-[16rem] items-center justify-center gap-1.5 text-[11px] font-semibold text-ink-soft sm:justify-end">
                                <span className="shrink-0 text-ink-muted">{t.stageSkip.nextUp}</span>
                                <Sys className="shrink-0 text-ink-faint">{stageNoOf(upNext, i + 1)}</Sys>
                                <span className="truncate">{stageNameOf(upNext, i + 1)}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (done) {
                    return (
                      <div
                        key={s.stageLabel}
                        data-stage={s.stageLabel}
                        className="flex flex-col gap-2.5 rounded-card bg-accent-soft p-3.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <StageThemedIcon index={i} tone="done" />
                            <Sys className="text-accent-strong tabular-nums">{no}</Sys>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 py-0.5 pl-1.5 pr-2 text-[10.5px] font-black uppercase tracking-wide text-white dark:bg-brand-400 dark:text-stone-950">
                            <Check className="h-3 w-3" strokeWidth={3} />
                            {t.stageSkip.clearedLabel}
                          </span>
                        </div>
                        <h4 className="line-clamp-2 min-h-[2.5rem] text-sm font-black leading-snug tracking-tight text-ink-max">
                          {name}
                        </h4>
                        <div className="flex items-center gap-2.5">
                          <div className="h-1 flex-1 rounded-[1px] bg-brand-600 dark:bg-brand-500" />
                          <span className="text-[11px] font-bold tabular-nums text-accent-strong">
                            {format(t.stageSkip.lessonsProgress, { completed: s.completedCount, total: s.lessonCount })}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  if (!s.eligible) {
                    /* KHÔNG mờ thẻ chưa mở. `opacity-60` chồng lên chữ nhạt
                       trên nền xám cho ra khoảng 1,9:1 - dưới xa mức đọc được.
                       Lùi bằng nền và cỡ chữ, không bằng độ trong suốt. */
                    return (
                      <div
                        key={s.stageLabel}
                        data-stage={s.stageLabel}
                        className="flex flex-col gap-2.5 rounded-card bg-surface-raised/60 p-3.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <StageThemedIcon index={i} tone="locked" />
                            <Sys className="text-ink-faint tabular-nums">{no}</Sys>
                          </div>
                          <Lock className="h-3.5 w-3.5 text-ink-faint" />
                        </div>
                        <h4 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug tracking-tight text-ink-soft">
                          {name}
                        </h4>
                        <span className="text-[11px] font-bold text-ink-muted">
                          {t.stageSkip.lockedLabel} · {t.stageSkip.notReadyHint}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={s.stageLabel}
                      data-stage={s.stageLabel}
                      className="group/stage flex flex-col gap-2.5 rounded-card border border-line-soft bg-surface p-3.5 transition-colors hover:border-accent-line"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <StageThemedIcon index={i} tone="idle" />
                          <Sys className="text-ink-muted tabular-nums">{no}</Sys>
                        </div>
                        {remaining > 0 && (
                          <span className="text-[11px] font-bold tabular-nums text-ink-muted">
                            {format(t.stageSkip.rewardLessons, { count: remaining })}
                          </span>
                        )}
                      </div>
                      <h4 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug tracking-tight text-ink-body">
                        {name}
                      </h4>
                      <div className="h-1 w-full overflow-hidden rounded-[1px] bg-surface-sunken">
                        <div
                          className="h-full bg-stone-400 motion-safe:transition-all motion-safe:duration-500 dark:bg-stone-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold tabular-nums text-ink-muted">
                          {format(t.stageSkip.lessonsProgress, { completed: s.completedCount, total: s.lessonCount })}
                        </span>
                        <button
                          onClick={() => void startExam(s)}
                          className="-mr-1 inline-flex items-center gap-1 rounded-control px-1.5 py-1 text-xs font-bold text-ink-soft transition-colors cursor-pointer hover:bg-accent-soft hover:text-accent-strong group-hover/stage:text-accent-strong"
                        >
                          {t.stageSkip.takeExam}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Banner cuối chỉ còn ở chế độ nhúng. Trên trang riêng nó là
              LẦN THỨ BA cùng một câu: thanh đầu trang đã ghi "vượt cả một
              chặng bằng một bài thi", hero ngay dưới nhắc lại kèm mốc 80%,
              rồi banner này nói lại lần nữa - mà nó nằm SAU 27 tấm thẻ, tức
              chỗ không còn ai cần được thuyết phục nữa. */}
          {!fullPage && (
            <div className={`${panel} p-5 flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-sm bg-surface-raised text-ink-soft flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight text-ink-max">
                    {t.dashCards.stageExamTitle}
                  </h4>
                  <p className="text-xs text-ink-soft mt-0.5 font-medium">
                    {t.dashCards.stageExamSub}
                  </p>
                </div>
              </div>

            </div>
          )}
        </>
      )}

      {/* Ba view dưới đây mỗi cái tự mang vùng cuộn khi `fullPage`: khung
          ngoài đã `overflow-hidden`, nên thứ gì không tự cuộn được thì bị cắt
          cụt - và một đề 15 câu thì chắc chắn dài hơn một màn hình. */}
      {view === "loading" && (
        <div className={`${fullPage ? "flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] " : ""}py-10 flex items-center justify-center gap-2 text-ink-muted`}>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-bold">{t.stageSkip.preparingExam}</span>
        </div>
      )}

      {view === "exam" && questions[activeQ] && (
        <div className={`${fullPage ? "flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] " : ""}space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-ink-muted">
            <span className="font-black tabular-nums text-ink-max">
              {format(t.stageSkip.questionCounter, { stageLabel: activeStage?.stageLabel ?? "", current: activeQ + 1, total: questions.length })}
            </span>
            <span className="inline-flex items-center gap-2 tabular-nums">
              <span>{format(t.stageSkip.answeredCount, { answered: answeredCount, total: questions.length })}</span>
              {/* Mốc phải đạt hiện SUỐT lúc thi, không chỉ ở phần mô tả trên
                  cùng. Người học cuộn xuống làm bài thì dòng mô tả đã ra khỏi
                  màn hình, và "cần đúng 12/15" là thứ quyết định còn được sai
                  mấy câu nữa. */}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tabular-nums text-ink-muted">
                <Target className="h-3 w-3" />
                {format(t.stageSkip.passMark, { need: passMark, total: questions.length })}
              </span>
            </span>
          </div>
          <div className="h-1 bg-surface-sunken overflow-hidden">
            <div
              // Thanh này nói "đang thi, tới đâu rồi" - một trạng thái, không
              // phải trang trí.
              className="h-full bg-cyan-600 dark:bg-cyan-400 motion-safe:transition-all motion-safe:duration-300"
              style={{ width: `${((activeQ + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Một ô cho mỗi câu, bấm được để nhảy tới. Bài thi mười lăm câu
              không có phản hồi từng câu, nên nếu không có dãy này thì cách duy
              nhất kiểm lại câu số bốn là bấm "Câu trước" mười một lần. */}
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, qi) => {
              const answered = answers[qi] !== null;
              const current = qi === activeQ;
              return (
                <button
                  key={qi}
                  onClick={() => setActiveQ(qi)}
                  aria-label={format(t.stageSkip.jumpToQuestion, { index: qi + 1 })}
                  aria-current={current ? "step" : undefined}
                  /* 36px, không phải 24: đây là nút bị bấm nhiều nhất trên điện
                     thoại và 24px nằm dưới hẳn mức chạm tối thiểu. */
                  className={`h-9 w-9 rounded-sm border font-mono text-xs font-medium tabular-nums transition-colors cursor-pointer ${
                    current
                      ? "border-brand-600 bg-brand-600 font-bold text-white dark:border-brand-400 dark:bg-brand-400 dark:text-stone-950"
                      : answered
                      ? "border-transparent bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200"
                      : "border-transparent bg-surface-raised/60 text-ink-faint hover:bg-surface-raised hover:text-ink"
                  }`}
                >
                  {qi + 1}
                </button>
              );
            })}
          </div>

          <p className="font-bold text-base leading-7 text-ink-max">
            {questions[activeQ].question}
          </p>

          {/* No per-question feedback: this is an exam, not a practice drill.
              Showing the answer as you go would let someone restart until
              they'd seen every question. */}
          <div className="space-y-2">
            {questions[activeQ].options.map((opt, oi) => {
              const picked = answers[activeQ] === oi;
              return (
                <button
                  key={oi}
                  onClick={() =>
                    setAnswers((a) => {
                      const n = [...a];
                      n[activeQ] = oi;
                      return n;
                    })
                  }
                  className={`grid w-full grid-cols-[1.5rem_minmax(0,1fr)] items-baseline rounded-sm border-2 px-3 py-2.5 text-left text-sm leading-6 transition-colors cursor-pointer ${
                    picked
                      ? "border-accent bg-accent-soft font-semibold text-ink-max"
                      : "border-transparent bg-surface-raised/60 text-ink-soft hover:bg-surface-raised hover:text-ink"
                  }`}
                >
                  <Sys className={picked ? "text-accent-strong" : "text-ink-faint"}>{String.fromCharCode(65 + oi)}</Sys>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => setActiveQ((i) => Math.max(0, i - 1))}
              disabled={activeQ === 0}
              className={`${btnSecondary} px-3.5 py-2 text-xs cursor-pointer`}
            >
              {t.stageSkip.previousQuestion}
            </button>
            {activeQ < questions.length - 1 ? (
              <button
                onClick={() => setActiveQ((i) => i + 1)}
                className={`${btnPrimary} px-4 py-2 text-xs cursor-pointer`}
              >
                {t.stageSkip.nextQuestion}
              </button>
            ) : (
              <button
                onClick={() => void submitExam()}
                disabled={submitting}
                className={`${btnPrimary} px-4 py-2 text-xs cursor-pointer`}
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {t.stageSkip.submitExam}
              </button>
            )}
          </div>
        </div>
      )}

      {view === "result" && result && (
        <div className={`${fullPage ? "flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] " : ""}text-center py-4 space-y-3`}>
          {/* Vòng điểm thay cho một dấu tích: nó nói luôn đúng bao nhiêu phần
              trên tổng, và khi chưa đạt thì thấy được mình cách mốc bao xa -
              thông tin mà một biểu tượng đỏ không mang. */}
          <div className="score-pop relative mx-auto h-28 w-28">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" className="stroke-stone-200 dark:stroke-stone-800" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="9"
                strokeLinecap="butt"
                className={result.passed ? "stroke-brand-700 dark:stroke-brand-500" : "stroke-amber-600 dark:stroke-amber-500"}
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - (result.total > 0 ? result.score / result.total : 0))}
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-2xl font-medium tabular-nums text-ink-max">
                {result.score}/{result.total}
              </span>
            </div>
            {/* Biểu tượng neo vào ĐÁY vòng, không đẩy bằng lề trong ô canh
                giữa: đặt bằng `mt-11` thì nó vẫn là phần tử được canh giữa và
                chen vào con số ngay khi cỡ chữ hoặc số chữ số đổi. */}
            <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
              {result.passed ? (
                <Trophy className="h-4 w-4 text-accent-strong" />
              ) : (
                <XCircle className="h-4 w-4 text-warn" />
              )}
            </span>
          </div>
          {/* Chưa đạt thì nói THIẾU MẤY CÂU, không chỉ nói mốc phần trăm. Trước
              đây người học phải tự nhân 80% với tổng rồi trừ điểm của mình. */}
          {!result.passed && result.total > 0 && (
            <p className="text-xs font-extrabold text-warn">
              {format(t.stageSkip.shortBy, { count: Math.max(1, stageExamPassMark(result.total) - result.score) })}
            </p>
          )}
          {result.passed ? (
            <p className="text-sm font-bold text-accent-strong">
              {t.stageSkip.passedResultPart1} {result.creditedLessons} {t.stageSkip.passedResultPart2}
              {result.alreadyCompleted ? format(t.stageSkip.alreadyCompletedSuffix, { count: result.alreadyCompleted }) : ""}.
            </p>
          ) : (
            <p className="text-sm font-bold text-ink-soft">
              {t.stageSkip.failedResultPart1} {passPercent}
              {t.stageSkip.failedResultPart2}{" "}
              {formatCooldown(STAGE_EXAM_RETRY_COOLDOWN_MS, t.cooldown)} {t.stageSkip.failedResultPart3}
            </p>
          )}
          {/* NHỮNG CÂU LÀM SAI, kèm lời giải.
              Màn này trước đây chỉ có vòng điểm "12/15" và một dòng "thiếu 1
              câu nữa" - trượt xong không biết mình sai ở đâu, nên lần thi lại
              cũng không khác gì lần đầu. Chỉ số đáp án đúng đến từ `details`
              của /api/stage-exam; thiếu nó thì khối này không hiện, chứ không
              đoán. */}
          {(result.details?.length ?? 0) > 0 && (() => {
            const byToken = new Map(questions.map((q) => [q.token, q]));
            const missed = (result.details ?? []).filter((d) => d.correct !== d.selected);
            if (missed.length === 0) return null;
            return (
              <div className="space-y-3 text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
                  {t.stageSkip.reviewMissedTitle}
                </p>
                {missed.map((d) => {
                  const q = byToken.get(d.token);
                  if (!q) return null;
                  const picked = q.options[d.selected];
                  return (
                    <div
                      key={d.token}
                      className={`${panel} p-4 space-y-2`}
                    >
                      <p className="text-sm font-bold text-ink">{q.question}</p>
                      <p className="text-xs font-bold text-alert-strong">
                        {picked === undefined
                          ? t.stageSkip.reviewNotAnswered
                          : `${t.stageSkip.reviewYourAnswer} ${picked}`}
                      </p>
                      <p className="text-xs font-bold text-accent-strong">
                        {t.stageSkip.reviewCorrectAnswer} {q.options[d.correct]}
                      </p>
                      <p className="max-w-[68ch] border-l-2 border-stone-300 pl-4 text-sm leading-7 text-ink-soft dark:border-stone-700">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })()}
          <button
            onClick={() => setView("pick")}
            className={`${btnPrimary} px-4 py-2 text-xs cursor-pointer`}
          >
            {t.stageSkip.backToStageList}
          </button>
        </div>
      )}
    </div>
  );
}
