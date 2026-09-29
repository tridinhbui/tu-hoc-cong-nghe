"use client";

import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { Newspaper, Calculator, BookOpen, Scale, BarChart3, CheckCircle2, XCircle, Award, Flame, ChevronDown, Maximize2, X, ArrowRight, Send, Check } from "lucide-react";
import CoCoFeedback from "@/components/CoCoFeedback";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";
import { claimQuestReward } from "@/lib/cloudflare-quests";
import { shuffleOptionOrder } from "@/lib/shuffle-options";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import { StatusDot, Sys, btnPrimary, panel } from "@/components/ui/system";

interface DailyNewsQuizWidgetProps {
  userId: string;
  compact?: boolean;
  /** `card` (mặc định): thẻ gập được ở bảng điều khiển. `signal`: cột DAILY
   *  SIGNAL của /kiem-tra - tiêu đề ngày, trạng thái hoàn thành, phản hồi của
   *  Cơ Cơ kèm lập luận, không tự gập. */
  variant?: "card" | "signal";
}

const subscribeNoop = () => () => {};

/** dd.mm.yy theo ngôn ngữ đang chọn. Lấy từng phần qua Intl rồi nối bằng dấu
 *  chấm, để thứ tự ngày-tháng đi theo `intlLocale` chứ không cứng trong mã. */
function signalDate(locale: Parameters<typeof intlLocale>[0]): string {
  const parts = new Intl.DateTimeFormat(intlLocale(locale), { day: "2-digit", month: "2-digit", year: "2-digit" }).formatToParts(new Date());
  return parts
    .filter((p) => p.type === "day" || p.type === "month" || p.type === "year")
    .map((p) => p.value)
    .join(".");
}

/** Khối này khởi đầu chỉ có tin tức, nên tên component và các khoá từ điển
* vẫn mang chữ "news". Giờ nó mang năm dạng câu hỏi: một người học vào mỗi
* ngày sẽ gặp lần lượt tin tức, một phép tính, một thuật ngữ, một quyết
* định cá nhân và một mẩu dữ liệu. */
type QuizKind = "news" | "calc" | "term" | "decision" | "data";

interface NewsQuiz {
  day: number;
  kind: QuizKind;
  promptTitle: string;
  promptBody: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Chờ bao lâu rồi mới tự gập sau khi trả lời.
 *
 * Bốn giây: đủ đọc hết một đoạn giải thích ngắn và thấy đúng/sai, chưa đủ
 * lâu để khối này chiếm chỗ cột phải cho một việc đã xong. */
const AUTO_COLLAPSE_MS = 4000;

/** Mỗi dạng có biểu tượng riêng, để người học nhận ra ngay hôm nay phải làm
* gì trước khi đọc chữ. Màu thì KHÔNG riêng: theo luật 3 của hệ thiết kế
* (components/ui/system.tsx), xanh chỉ dành cho chức năng, nên năm dạng
* cùng một bộ màu trung tính và phân biệt nhau bằng biểu tượng + nhãn. */
const KIND_STYLES: Record<QuizKind, { Icon: typeof Newspaper; tint: string; badge: string }> = {
  news: {
    Icon: Newspaper,
    tint: "text-ink-muted",
    badge: "border-stone-300 text-ink-soft dark:border-stone-700",
  },
  calc: {
    Icon: Calculator,
    tint: "text-ink-muted",
    badge: "border-stone-300 text-ink-soft dark:border-stone-700",
  },
  term: {
    Icon: BookOpen,
    tint: "text-ink-muted",
    badge: "border-stone-300 text-ink-soft dark:border-stone-700",
  },
  decision: {
    Icon: Scale,
    tint: "text-ink-muted",
    badge: "border-stone-300 text-ink-soft dark:border-stone-700",
  },
  data: {
    Icon: BarChart3,
    tint: "text-ink-muted",
    badge: "border-stone-300 text-ink-soft dark:border-stone-700",
  },
};

export default function DailyNewsQuizWidget({ userId, compact = false, variant = "card" }: DailyNewsQuizWidgetProps) {
  const { t, locale } = useI18n();
  const isSignal = variant === "signal";
  // Ngày chỉ tính sau khi gắn: giờ phía server có thể khác trình duyệt.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  // NEWS_QUIZZES below is a hand-authored, fixed set of scenarios (not a live
  // news feed) sourced from the dictionary so it renders in the reader's
  // language - see t.newsQuiz.quizzes in
  // lib/i18n/dictionaries/sections/certificate-quests.ts.
  /* XÁO THỨ TỰ PHƯƠNG ÁN, và đây là một lỗi đã đo chứ không phải phòng xa.
   *
   *  Kho 26 tình huống có đáp án đúng nằm ở ô ĐẦU TIÊN trong 21 câu - 81%.
   *  Widget này không xáo gì cả, nó đọc thẳng `correctIndex` từ từ điển, nên
   *  bấm phương án A mà không đọc là đúng bốn trên năm câu. Câu này có chấm
   *  điểm: nó trả 8 XP qua nhiệm vụ `daily_news_quiz`.
   *
   *  Đúng họ với hai lỗi AGENTS.md đã ghi và đã dọn - 47,9% đáp án ở index 1
   *  trong kho bài học, và 73% ở phương án B trong game Triệu phú - nên cách
   *  sửa cũng giống hệt: XÁO LÚC CHẠY bằng `shuffleOptionOrder`, không soạn
   *  lại chỉ số bằng tay. Sửa tay thì đúng cho 26 câu hôm nay và sai lại ngay
   *  khi ai đó viết câu thứ 27.
   *
   *  Xáo một lần cho mỗi lượt tải (useMemo theo `t`), không xáo lại mỗi lần
   *  render: xáo lại giữa chừng sẽ đổi chỗ phương án ngay dưới con trỏ người
   *  học đang định bấm. */
  const NEWS_QUIZZES: NewsQuiz[] = useMemo(
    // `kind` từ từ điển là string, nên gõ sai một dạng sẽ lọt qua tsc. Quy về
    // "news" khi không nhận ra, để câu vẫn hiện đủ thay vì mất biểu tượng và
    // nhãn dạng.
    () =>
      t.newsQuiz.quizzes.map((q) => {
        const shuffled = shuffleOptionOrder(q.options, q.correctIndex);
        // Kho câu hỏi công nghệ viết theo khuôn cũ `newsTitle`/`newsBody` và
        // chưa có `kind`: mọi câu là một mẩu tin, nên quy về dạng "news".
        const kind = (q as { kind?: string }).kind;
        return {
          ...q,
          promptTitle: q.newsTitle,
          promptBody: q.newsBody,
          kind: kind && kind in KIND_STYLES ? (kind as QuizKind) : "news",
          options: shuffled.options,
          correctIndex: shuffled.correctIndex,
        };
      }),
    [t],
  );
  // Câu của hôm nay tính một lần lúc gắn component (khởi tạo lười), không
  // đặt lại trong effect: nó chỉ phụ thuộc ngày và kho câu hỏi.
  const [quiz] = useState<NewsQuiz | null>(() => {
    /* CHỌN THEO NGÀY TUYỆT ĐỐI, KHÔNG THEO THỨ TRONG TUẦN.
     *
     * Bản cũ: `NEWS_QUIZZES.find(q => q.day === new Date().getDay())`. Nó
     * khoá mỗi tin vào một thứ, nên kho có bao nhiêu tin cũng chỉ dùng được
     * bảy - và người học vào hai ba buổi mỗi tuần thì gặp đúng hai ba tin ấy
     * lặp lại vĩnh viễn. Một người dùng đã báo đúng điều này.
     *
     * Đếm số ngày kể từ mốc epoch rồi lấy dư theo ĐỘ DÀI KHO: thêm tin thứ
     * tám là chu kỳ thành tám ngày, thêm bốn mươi tin là bốn mươi ngày. Tức
     * là viết thêm tin có tác dụng ngay, không cần sửa mã lần nữa.
     *
     * Dùng ngày địa phương chứ không phải UTC: `new Date(y, m, d)` dựng mốc
     * nửa đêm theo múi giờ máy, nên người ở Việt Nam đổi tin lúc nửa đêm giờ
     * Việt Nam chứ không phải 7 giờ sáng. */
    const now = new Date();
    const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysSinceEpoch = Math.floor(localMidnight.getTime() / 86_400_000);
    const resolvedQuiz =
      NEWS_QUIZZES[((daysSinceEpoch % NEWS_QUIZZES.length) + NEWS_QUIZZES.length) % NEWS_QUIZZES.length] ??
      NEWS_QUIZZES[0];
    return resolvedQuiz;
  });
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  // On the dashboard sidebar this is now treated as a "today in tech"
  // block rather than an optional challenge, so it starts open by default.
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // "Unlimited" continuous practice mode: cycles through the same fixed
  // question pool (NEWS_QUIZZES is hand-authored, not a live feed - there's
  // no real news source wired up) without the once-a-day XP claim, so
  // someone can keep drilling past today's single question without it
  // looking like an exploit of the daily reward.
  /** Mốc thời gian vừa trả lời, để hẹn giờ tự gập. Lưu mốc chứ không lưu
  * cờ boolean: mốc mới ghi đè mốc cũ nên bấm lại sẽ dời hạn thay vì xếp
  * chồng hai hẹn giờ. */
  const [autoCollapseAt, setAutoCollapseAt] = useState<number | null>(null);

  useEffect(() => {
    if (autoCollapseAt === null) return;
    const timer = window.setTimeout(() => setCollapsed(true), AUTO_COLLAPSE_MS);
    return () => window.clearTimeout(timer);
  }, [autoCollapseAt]);

  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceQuiz, setPracticeQuiz] = useState<NewsQuiz | null>(null);
  const [practiceSelectedOpt, setPracticeSelectedOpt] = useState<number | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);
  /** Số câu đã làm trong phiên luyện tập, để cửa sổ lớn có gì đó đếm được
   * ngoài chuỗi đúng - chuỗi về 0 mỗi lần sai, còn cái này thì không. */
  const [practiceCount, setPracticeCount] = useState(0);

  /* CỬA SỔ LỚN.
   *
   * Thẻ này sống ở cột phải bảng điều khiển, rộng khoảng 330px, và với một
   * câu bốn phương án mỗi phương án hai dòng thì đó là chỗ vừa đủ để trả lời
   * MỘT câu. Luyện tập không giới hạn chạy trong đúng khung ấy là làm câu thứ
   * năm trong một khe cửa.
   *
   * Nên mở rộng là một trạng thái riêng chứ không phải một biến thể của
   * `collapsed`: thẻ vẫn đứng nguyên chỗ cũ trong luồng trang, còn nội dung
   * được vẽ thêm một lần nữa trong lớp phủ. Cùng một state, cùng một hàm
   * dựng - đổi mỗi cỡ chữ và khoảng đệm. */
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    // Khoá cuộn nền: lớp phủ có vùng cuộn riêng, để nền cuộn theo là con trỏ
    // rời khỏi câu hỏi mà không ai bấm gì.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const todayKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const localAnsweredKey = `news_quiz_answered_${userId}_${todayKey}`;

  useEffect(() => {

    // Check if already answered today
    if (typeof window !== "undefined") {
      const answered = window.localStorage.getItem(localAnsweredKey);
      if (answered) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- đọc localStorage sau khi gắn: server không có nó, nên không đọc được lúc render
        setIsAnswered(true);
        setIsCorrect(answered === "correct");
        setSelectedOpt(Number(window.localStorage.getItem(`${localAnsweredKey}_opt`) ?? "-1"));
        // Đã trả lời hôm nay thì mở trang lên là gập sẵn. Câu hỏi trong ngày
        // chỉ làm được một lần, nên để nó bung ra là chiếm chỗ cột phải cho
        // một việc đã xong.
        setCollapsed(true);
      }
    }
  }, [localAnsweredKey, NEWS_QUIZZES]);

  const handleSubmit = async () => {
    if (selectedOpt === null || !quiz) return;

    const correct = selectedOpt === quiz.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    /* TỰ GẬP SAU KHI TRẢ LỜI - nhưng CÓ ĐỘ TRỄ, không gập ngay.
     *
     * Gập ngay lúc bấm thì người học không kịp thấy mình đúng hay sai, và
     * phần giải thích - thứ duy nhất biến một câu đoán thành một điều học
     * được - biến mất trước khi đọc. Bốn giây đủ để đọc hết một đoạn giải
     * thích ngắn.
     *
     * Hẹn giờ được dọn ở effect bên dưới: nếu người học tự gập tay, hoặc rời
     * trang trước khi hết bốn giây, thì `setCollapsed` không được gọi trên
     * một component đã tháo. */
    setAutoCollapseAt(Date.now());

    if (typeof window !== "undefined") {
      window.localStorage.setItem(localAnsweredKey, correct ? "correct" : "incorrect");
      window.localStorage.setItem(`${localAnsweredKey}_opt`, String(selectedOpt));
      
      // Dispatch custom event so AppNavbar warning badge disappears immediately
      window.dispatchEvent(new CustomEvent("thtcdn:daily-news-quiz-answered", { detail: { date: todayKey, userId } }));
    }

    if (correct) {
      // Reuses the same user_quest_completions table + claim flow already
      // proven for daily quests (unique(user_id, quest_type, day_key) stops
      // double claims, missing-table fallback to localStorage, and it calls
      // recalculateUserStats() itself) - previously this just called
      // recalculateUserStats() directly with nothing written anywhere for
      // "news quiz", so the total_xp formula had no term for it and the
      // "+15 XP" toast never actually added anything.
      try {
        // xpEarned (not the hardcoded 15) is what actually landed. Trần XP
        // tuần đã bỏ (lib/quest-rewards.ts), nên claimed mà 0 XP chỉ còn xảy
        // ra nếu phần thưởng của nhiệm vụ bị đặt về 0 - khi ấy chỉ báo đúng.
        const { claimed, xpEarned } = await claimQuestReward(userId, "daily_news_quiz", todayKey);
        if (claimed && xpEarned > 0) {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: t.newsQuiz.xpGainedLabel } }));
          }
          toast.success(format(t.newsQuiz.toastCorrectXp, { xp: xpEarned }));
        } else if (claimed) {
          toast.success(t.newsQuiz.toastCorrectCapped);
        } else {
          toast.success(t.newsQuiz.toastCorrectAlready);
        }
      } catch (err) {
        console.error("Error rewarding news quiz XP:", err);
        toast.success(t.newsQuiz.toastCorrectFallback);
      }
    } else {
      toast.error(t.newsQuiz.toastIncorrect);
    }
  };

  function startPractice() {
    setPracticeMode(true);
    setPracticeStreak(0);
    setPracticeCount(0);
    // Bấm "luyện tập không giới hạn" là mở luôn cửa sổ lớn: người bấm nút đó
    // đang nói họ muốn làm tiếp, và làm tiếp trong khe 330px là chỗ họ sẽ bỏ
    // dở. Vẫn thu nhỏ lại được, và thu nhỏ không thoát khỏi phiên luyện tập.
    setExpanded(true);
    pickNextPracticeQuiz();
  }

  function pickNextPracticeQuiz() {
    // So sánh bằng CHÍNH ĐỐI TƯỢNG, không bằng `q.day`. Trước đây `day` là
    // khoá duy nhất nên nó dùng được làm định danh; giờ kho có thể có nhiều
    // tin cùng `day`, và lọc theo nó sẽ loại nhầm cả nhóm.
    const pool = NEWS_QUIZZES.filter((q) => q !== practiceQuiz);
    const next = pool[Math.floor(Math.random() * pool.length)] ?? NEWS_QUIZZES[0];
    setPracticeQuiz(next);
    setPracticeSelectedOpt(null);
    setPracticeAnswered(false);
    setPracticeCorrect(false);
  }

  function submitPractice() {
    if (practiceSelectedOpt === null || !practiceQuiz) return;
    const correct = practiceSelectedOpt === practiceQuiz.correctIndex;
    setPracticeCorrect(correct);
    setPracticeAnswered(true);
    setPracticeCount((n) => n + 1);
    if (correct) setPracticeStreak((s) => s + 1);
    else setPracticeStreak(0);
  }

  if (!quiz) return null;

  const activeQuiz = practiceMode ? practiceQuiz : quiz;
  const activeSelectedOpt = practiceMode ? practiceSelectedOpt : selectedOpt;
  const activeIsAnswered = practiceMode ? practiceAnswered : isAnswered;
  const activeIsCorrect = practiceMode ? practiceCorrect : isCorrect;

  if (!activeQuiz) return null;

  const kindStyle = KIND_STYLES[activeQuiz.kind] ?? KIND_STYLES.news;
  const KindIcon = kindStyle.Icon;
  const kindLabel =
    activeQuiz.kind === "calc"
      ? t.newsQuiz.kindCalc
      : activeQuiz.kind === "term"
      ? t.newsQuiz.kindTerm
      : activeQuiz.kind === "decision"
      ? t.newsQuiz.kindDecision
      : activeQuiz.kind === "data"
      ? t.newsQuiz.kindData
      : t.newsQuiz.badgeToday;

  const dailyXp = QUEST_XP_REWARDS.daily_news_quiz;
  const letterOf = (i: number) => String.fromCharCode(65 + i);

  /** Phản hồi của biến thể signal: Cơ Cơ nói một câu ngắn (kèm XP của câu
   *  này), rồi LẬP LUẬN - đáp án đúng viết ra nguyên văn, sau đó "vì sao".
   *  Bản thẻ cũ chỉ nói "đáp án đúng là A" và để người học tự dò lại chữ A là
   *  gì; ở đây câu đúng đứng ngay trên phần giải thích nó. */
  const renderSignalFeedback = (big: boolean) => {
    const correctText = activeQuiz.options[activeQuiz.correctIndex];
    const picked = activeSelectedOpt ?? -1;
    return (
      <div className="space-y-3 border-t border-line pt-3 animate-[fadeIn_0.3s_ease-out]">
        <CoCoFeedback
          lines={activeIsCorrect ? t.revampQuiz.feedbackCorrect : t.revampQuiz.feedbackWrong}
          tone={activeIsCorrect ? "correct" : "wrong"}
          salt={practiceMode ? practiceCount : 0}
          trailing={
            practiceMode ? null : activeIsCorrect ? (
              <span className="font-mono text-xs font-bold tabular-nums text-warn-strong">
                {format(t.revampQuiz.xpThisQuestion, { xp: dailyXp })}
              </span>
            ) : (
              <span className="font-mono text-xs font-bold tabular-nums text-ink-faint">{t.revampQuiz.noXpThisQuestion}</span>
            )
          }
        />
        <div className={`space-y-2 ${big ? "text-sm" : "text-[13px]"}`}>
          {!activeIsCorrect && picked >= 0 && activeQuiz.options[picked] !== undefined && (
            <p className="text-danger">
              <span className="font-bold">{format(t.revampQuiz.yourPick, { letter: letterOf(picked) })}</span>
              <span className="text-ink-muted"> - {activeQuiz.options[picked]}</span>
            </p>
          )}
          <div className="border-l-2 border-cyan-600 pl-3 dark:border-cyan-400">
            <Sys className="text-cyan-700 dark:text-cyan-400">{format(t.revampQuiz.answerHead, { letter: letterOf(activeQuiz.correctIndex) })}</Sys>
            <p className="mt-0.5 font-bold leading-snug text-ink-max">{correctText}</p>
          </div>
          <div className="pl-3.5">
            <Sys className="text-ink-muted">{t.revampQuiz.whyHead}</Sys>
            <p className="mt-0.5 leading-relaxed text-ink-soft">{activeQuiz.explanation}</p>
          </div>
        </div>
      </div>
    );
  };

  /** Thân câu hỏi được vẽ ở hai chỗ: trong thẻ ở cột phải, và trong lớp phủ.
   * Cùng một state, khác mỗi cỡ chữ và khoảng đệm - nên nó là một hàm nhận
   * `big` chứ không phải hai khối JSX chép đôi, thứ sẽ lệch nhau ở lần sửa
   * tiếp theo. */
  const renderQuiz = (big: boolean) => (
    <div className={big ? "space-y-5" : isSignal ? "mt-4 space-y-4" : "mt-4 space-y-4 pt-3.5 border-t border-line relative z-10"}>
      {/* Tag / Category Badge */}
      <div className="flex items-center gap-2">
        <span className={`eyebrow inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border ${kindStyle.badge}`}>
          <KindIcon className="w-3 h-3" aria-hidden />
          {practiceMode ? t.newsQuiz.badgePractice : kindLabel}
        </span>
        {activeQuiz.kind === "news" && (
          <span className="text-[9px] font-bold text-ink-faint">
            {t.newsQuiz.simulatedNotice}
          </span>
        )}
      </div>

      {/* Prompt Title & Sub-question */}
      <div className="space-y-1">
        {/* Ở biến thể signal, tiêu đề tình huống đã là dòng tiêu đề lớn của
            cột - vẽ lại ở đây là in hai lần cách nhau vài chục pixel. */}
        {(big || !isSignal) && (
          <p className={`font-black text-ink-max leading-snug ${big ? "text-base" : "text-sm sm:text-[15px]"}`}>
            {activeQuiz.promptTitle}
          </p>
        )}
        <p className={`font-bold text-ink-body leading-relaxed ${big ? "text-sm" : "text-xs sm:text-[13px]"}`}>
          {activeQuiz.question}
        </p>
      </div>

      {/* Question Options */}
      <div className="space-y-2.5">
        {activeQuiz.options.map((opt, idx) => {
          const isSelected = activeSelectedOpt === idx;
          const showSuccess = activeIsAnswered && idx === activeQuiz.correctIndex;
          const showFailure = activeIsAnswered && isSelected && !activeIsCorrect;

          return (
            /* `focus:outline-none` KHÔNG kèm gì thay thế đã gỡ khỏi cả sáu chỗ
               trong tệp này, bốn trong số đó là bốn phương án trả lời: người
               dùng bàn phím tab qua bốn nút mà không có dấu hiệu nào cho biết
               con trỏ đang ở nút nào, tức câu quiz có chấm điểm này không trả
               lời được bằng bàn phím. Vòng `focus-visible` chứ không phải
               `focus`: nó không hiện lên khi bấm chuột. */
            <button
              key={idx}
              disabled={activeIsAnswered}
              onClick={() => (practiceMode ? setPracticeSelectedOpt(idx) : setSelectedOpt(idx))}
              className={`w-full text-left rounded-sm border leading-relaxed transition-colors flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900 cursor-pointer ${
                big ? "p-4 text-sm" : "p-3.5 text-xs sm:text-[13px]"
              } ${
                showSuccess
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-950/40 text-brand-950 dark:text-brand-100 font-bold"
                  : showFailure
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100"
                  : isSelected
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-950/30 text-ink-max font-bold"
                  : "border-line-strong hover:border-line-firm bg-white dark:bg-stone-900 text-ink-heading"
              }`}
            >
              <span className="shrink-0">
                {showSuccess ? (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                ) : showFailure ? (
                  <XCircle className="w-6 h-6 text-rose-500" />
                ) : (
                  <span className={`w-7 h-7 rounded-sm border flex items-center justify-center font-mono text-xs font-medium transition-colors ${
                    isSelected
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-stone-300 bg-surface-raised text-ink-body dark:border-stone-700 dark:bg-stone-950"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                )}
              </span>
              <span className="flex-1 font-medium text-ink-heading">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Submit or Explanation block */}
      {!activeIsAnswered ? (
        <button
          onClick={practiceMode ? submitPractice : handleSubmit}
          disabled={activeSelectedOpt === null}
          className={`${btnPrimary} w-full cursor-pointer ${big ? "py-3" : ""}`}
        >
          <Send className="w-4 h-4" aria-hidden />
          <span>{t.newsQuiz.submitAnswer}</span>
        </button>
      ) : isSignal ? (
        renderSignalFeedback(big)
      ) : (
        <div className={`rounded-sm bg-page dark:bg-stone-950 border border-line-strong animate-[fadeIn_0.35s_ease-out] ${big ? "p-4" : "p-3.5"}`}>
          <h5 className="eyebrow flex items-center gap-1.5 text-ink-body mb-1.5">
            <Award className={`w-4 h-4 ${activeIsCorrect ? "text-accent" : "text-ink-faint"}`} />
            <span>{activeIsCorrect ? t.newsQuiz.correctAnswerLabel : format(t.newsQuiz.wrongAnswerLabel, { letter: String.fromCharCode(65 + activeQuiz.correctIndex) })}</span>
          </h5>
          <p className={`text-ink-soft leading-relaxed ${big ? "text-sm" : "text-[11px]"}`}>
            {activeQuiz.explanation}
          </p>
        </div>
      )}

      {/* Unlimited practice mode toggle/continue inside the card */}
      {practiceMode && (
        <div className="flex items-center gap-2 pt-2">
          {practiceStreak > 1 && (
            <span className="text-[10px] font-extrabold text-warn flex items-center gap-1 shrink-0">
              <Flame className="w-3.5 h-3.5" />
              {format(t.newsQuiz.streakLabel, { count: practiceStreak })}
            </span>
          )}
          {practiceAnswered && (
            <button
              onClick={pickNextPracticeQuiz}
              className={`${btnPrimary} flex-1 cursor-pointer ${big ? "" : "py-2 text-xs"}`}
            >
              {t.newsQuiz.nextQuestion}
            </button>
          )}
          <button
            onClick={() => {
              setPracticeMode(false);
              setExpanded(false);
            }}
            className="text-ink-muted hover:text-ink-heading font-bold shrink-0 text-xs underline-offset-4 hover:underline"
          >
            {t.newsQuiz.exitPractice}
          </button>
        </div>
      )}
    </div>
  );

  const dialog = expanded ? (
      <div
        className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-stone-950/60 animate-[fadeIn_0.15s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label={practiceMode ? t.newsQuiz.expandedTitle : t.newsQuiz.titleFull}
        onClick={() => setExpanded(false)}
      >
        <div
          className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-md border border-line-strong bg-white dark:bg-stone-900 p-5 sm:p-7 font-sans"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3 mb-5 border-b border-line-strong pb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-sm border border-line-strong bg-surface-raised text-ink-body dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-black tracking-tight text-ink-max text-lg leading-tight">
                  {practiceMode ? t.newsQuiz.expandedTitle : t.newsQuiz.titleFull}
                </h3>
                <p className="text-[11px] font-bold text-ink-muted mt-0.5">
                  {practiceMode
                    ? practiceCount > 0
                      ? format(t.newsQuiz.answeredCount, { n: practiceCount })
                      : t.newsQuiz.expandedHint
                    : t.newsQuiz.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                title={t.newsQuiz.minimize}
                aria-label={t.newsQuiz.closeDialog}
                className="p-2 rounded-sm text-ink-muted hover:text-ink hover:bg-surface-raised dark:hover:bg-stone-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
          {renderQuiz(true)}
        </div>
      </div>
  ) : null;

  if (isSignal) {
    const answeredToday = isAnswered;
    return (
      <>
        <section className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3">
            <Sys className="text-accent-strong">
              {format(t.revampQuiz.signalHeading, { date: mounted ? signalDate(locale) : "" })}
            </Sys>
            <div className="flex items-center gap-2">
              {answeredToday ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  {t.revampQuiz.signalDone}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-body">
                  <StatusDot />
                  {t.revampQuiz.signalPending}
                </span>
              )}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                title={t.revampQuiz.signalExpand}
                aria-label={t.revampQuiz.signalExpand}
                className="p-1.5 text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <h2 className="mt-2 text-lg sm:text-xl font-black leading-snug tracking-tight text-ink-max">
            {activeQuiz.promptTitle}
          </h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-xs tabular-nums text-ink-muted">
            <span>{t.revampQuiz.signalCount}</span>
            <span aria-hidden className="h-1 w-1 bg-stone-400 dark:bg-stone-600" />
            <span className="font-bold text-warn-strong">{format(t.revampQuiz.signalXp, { xp: dailyXp })}</span>
            <span aria-hidden className="h-1 w-1 bg-stone-400 dark:bg-stone-600" />
            <span>{t.revampQuiz.signalTime}</span>
          </p>

          {renderQuiz(false)}

          {answeredToday && !practiceMode && (
            <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs font-bold">
              {isCorrect ? (
                <span className="font-mono tabular-nums text-warn-strong">
                  {format(t.revampQuiz.signalXpEarned, { xp: dailyXp })}
                </span>
              ) : (
                <span className="font-mono tabular-nums text-ink-faint">{t.revampQuiz.signalXpMissed}</span>
              )}
              <span className="font-medium text-ink-muted">{t.revampQuiz.signalNextHint}</span>
            </p>
          )}

          {!practiceMode && (
            <button
              type="button"
              onClick={startPractice}
              className="group mt-auto flex w-full items-center justify-between gap-3 border-t border-line pt-3 text-left text-xs font-bold text-ink-body transition-colors hover:text-accent-strong cursor-pointer"
            >
              <span>{t.dashCards.practiceUnlimited}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent-strong transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </section>
        {dialog}
      </>
    );
  }

  return (
    <>
      <div className={`${panel} p-5 sm:p-6 relative overflow-hidden font-sans`}>
        {/* Header */}
        <div className="w-full flex items-center justify-between gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
          >
            <div className="w-10 h-10 rounded-sm border border-line-strong bg-surface-raised text-ink-body dark:border-stone-700 dark:bg-stone-950 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-black tracking-tight text-ink-max flex items-center gap-2 text-sm sm:text-base min-w-0">
              <span>{t.newsQuiz.titleFull}</span>
              {!activeIsAnswered ? (
                <StatusDot />
              ) : (
                <span
                  className={`text-xs font-black shrink-0 ${
                    activeIsCorrect
                      ? "text-accent"
                      : "text-alert"
                  }`}
                  aria-label={activeIsCorrect ? t.newsQuiz.resultCorrect : t.newsQuiz.resultWrong}
                >
                  {activeIsCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </span>
              )}
            </h3>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              title={t.newsQuiz.expand}
              aria-label={t.newsQuiz.expand}
              className="p-1.5 rounded-sm text-ink-muted hover:text-ink hover:bg-surface-raised dark:hover:bg-stone-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-bold text-ink-soft hover:bg-surface-raised dark:hover:bg-stone-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
            >
              <span>{collapsed ? t.newsQuiz.collapseOpen.replace(/[▾▴]/g, "").trim() : t.newsQuiz.collapseClose.replace(/[▾▴]/g, "").trim()}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${collapsed ? "" : "rotate-180"}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        {!collapsed && renderQuiz(false)}
      </div>

      {/* Unlimited Practice Bottom Card */}
      {!practiceMode && (
        <button
          type="button"
          onClick={startPractice}
          className={`${panel} w-full mt-4 p-3 sm:p-4 flex items-center justify-between gap-3 group cursor-pointer transition-colors hover:border-line-firm text-left`}
        >
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-black text-ink">
              {t.dashCards.practiceUnlimited}
            </span>
          </div>

          <div className="shrink-0 pr-1 text-accent-strong group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      )}

      {dialog}
    </>
  );
}
