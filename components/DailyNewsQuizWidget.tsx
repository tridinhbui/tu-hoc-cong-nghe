"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Newspaper, HelpCircle, CheckCircle2, XCircle, Award, Flame } from "lucide-react";
import { claimQuestReward } from "@/lib/supabase-quests";

interface DailyNewsQuizWidgetProps {
  userId: string;
  compact?: boolean;
}

interface NewsQuiz {
  day: number;
  newsTitle: string;
  newsBody: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const NEWS_QUIZZES: NewsQuiz[] = [
  // Sunday (0)
  {
    day: 0,
    newsTitle: "CPI Mỹ tăng vượt kỳ vọng, Fed kéo dài thời gian neo lãi suất cao",
    newsBody: "Chỉ số giá tiêu dùng (CPI) tháng qua của Mỹ công bố tăng 3.5% so với cùng kỳ năm ngoái, vượt qua dự báo của giới phân tích. Fed báo hiệu có thể lùi thời điểm hạ lãi suất điều hành để kiểm soát triệt để lạm phát.",
    question: "Tác động gián tiếp từ sự kiện này lên thị trường tài chính Việt Nam là gì?",
    options: [
      "Đồng USD mạnh lên gây áp lực tỷ giá USD/VND, buộc Ngân hàng Nhà nước phải cẩn trọng hơn trong việc nới lỏng tiền tệ.",
      "Lượng vốn ngoại (FII) sẽ đổ xô mua ròng trên sàn chứng khoán Việt Nam ngay lập tức.",
      "Ngân hàng Nhà nước Việt Nam sẽ nới lỏng tiền tệ và hạ lãi suất VND về mức tối thiểu.",
      "Đồng VND tự động tăng giá mạnh so với USD do chênh lệch lạm phát."
    ],
    correctIndex: 0,
    explanation: "Khi Fed neo lãi suất USD ở mức cao, dòng vốn có xu hướng chảy ngược về Mỹ để tìm kiếm lợi nhuận an toàn. Điều này làm tăng sức mạnh đồng USD (DXY), gây áp lực mất giá lên đồng VND (tỷ giá USD/VND tăng). Do đó, Ngân hàng Nhà nước Việt Nam buộc phải giữ lãi suất ở mức hợp lý để giữ chân dòng vốn và bảo vệ tỷ giá, thay vì thoải mái nới lỏng tiền tệ."
  },
  // Monday (1)
  {
    day: 1,
    newsTitle: "Tỷ giá USD/VND trung tâm liên tục lập đỉnh mới",
    newsBody: "Ngân hàng Nhà nước liên tiếp điều chỉnh tăng tỷ giá trung tâm USD/VND lên mức cao nhất năm nay. Trên thị trường tự do, giá USD giao dịch áp sát mốc 25.500 VND.",
    question: "Doanh nghiệp có đặc điểm cấu trúc tài chính nào sẽ bị ảnh hưởng TIÊU CỰC nhất bởi xu hướng này?",
    options: [
      "Doanh nghiệp xuất khẩu nông sản thu hoàn toàn ngoại tệ USD.",
      "Doanh nghiệp trong nước không phát sinh giao dịch xuất nhập khẩu.",
      "Doanh nghiệp nhập khẩu nguyên vật liệu bằng USD và gánh khoản nợ vay bằng USD lớn.",
      "Doanh nghiệp bất động sản sở hữu nhiều quỹ đất sạch nội địa."
    ],
    correctIndex: 2,
    explanation: "Doanh nghiệp nhập khẩu bằng USD và gánh nợ USD chịu tác động kép tiêu cực khi tỷ giá tăng: vừa phải chi nhiều VND hơn để mua USD thanh toán nguyên vật liệu (tăng chi phí sản xuất), vừa phải chịu lỗ chênh lệch tỷ giá do đánh giá lại số dư nợ vay bằng ngoại tệ cuối kỳ (tăng chi phí tài chính)."
  },
  // Tuesday (2)
  {
    day: 2,
    newsTitle: "Giá vàng SJC tăng phi mã, chênh lệch lớn với thế giới",
    newsBody: "Giá vàng miếng SJC trong nước liên tục tăng vọt, bỏ xa giá vàng thế giới quy đổi hơn 15 triệu đồng/lượng. Người dân xếp hàng dài tại các tiệm vàng lớn để mua tích trữ.",
    question: "Từ góc độ quản trị tài chính cá nhân bền vững, hành vi nào dưới đây là hợp lý nhất?",
    options: [
      "Vay tiền ngân hàng hoặc người thân để mua vàng lướt sóng ngắn hạn ăn chênh lệch.",
      "Bán toàn bộ danh mục cổ phiếu và đất đai hiện có để mua vàng tích trữ 100%.",
      "Mua vàng theo kỷ luật dài hạn, chỉ phân bổ tỷ lệ nhỏ (5-10% tài sản) để phòng vệ lạm phát.",
      "Bỏ qua vàng hoàn toàn vì vàng là tài sản không sinh dòng tiền cổ tức nên không bao giờ có giá trị."
    ],
    correctIndex: 2,
    explanation: "Vàng là công cụ phòng thủ, bảo toàn giá trị tốt chống lại lạm phát và bất ổn vĩ mô. Tuy nhiên, vàng không tạo ra dòng tiền nội tại (như cổ tức hay tiền thuê nhà). Do đó, chỉ nên phân bổ một tỷ lệ nhỏ (5-10%) tài sản vào vàng để đa dạng hóa rủi ro, tránh mua đuổi bằng đòn bẩy ngắn hạn khi giá đang ở vùng đỉnh sốt đất/vàng."
  },
  // Wednesday (3)
  {
    day: 3,
    newsTitle: "Vietcombank hạ lãi suất tiền gửi tiết kiệm 12 tháng xuống còn 4.7%",
    newsBody: "Ngân hàng Vietcombank vừa công bố biểu lãi suất mới, hạ lãi suất huy động kỳ hạn 12 tháng xuống mức thấp lịch sử 4.7%/năm. Các ngân hàng thương mại cổ phần khác dự kiến sẽ hạ theo.",
    question: "Trong dài hạn, xu hướng hạ lãi suất tiết kiệm thường dẫn đến sự dịch chuyển dòng tiền như thế nào?",
    options: [
      "Người dân rút tiền mua sắm tiêu dùng hoang phí hết lập tức.",
      "Dòng tiền nhàn rỗi dịch chuyển dần sang các tài sản đầu tư có tiềm năng sinh lời cao hơn như cổ phiếu, quỹ mở, bất động sản.",
      "Thanh khoản hệ thống ngân hàng bị sụp đổ vì người dân hoàn toàn không gửi tiền nữa.",
      "Lạm phát (CPI) sẽ giảm ngay lập tức về mức 0%."
    ],
    correctIndex: 1,
    explanation: "Khi lãi suất tiết kiệm giảm xuống quá thấp, hiệu suất sinh lời sau khi trừ đi lạm phát thực tế trở nên kém hấp dẫn. Điều này thúc đẩy dòng tiền nhàn rỗi của nhà đầu tư tìm kiếm các kênh có tỷ suất sinh lời kỳ vọng cao hơn (như thị trường chứng khoán, bất động sản hoặc chứng chỉ quỹ), kích thích đầu tư và tiêu dùng phát triển."
  },
  // Thursday (4)
  {
    day: 4,
    newsTitle: "Giá dầu Brent vượt mốc 85 USD/thùng do rủi ro nguồn cung",
    newsBody: "Giá dầu thô Brent thế giới tiếp tục xu hướng tăng mạnh, vượt mốc 85 USD/thùng do căng thẳng chính trị gia tăng tại Trung Đông và kế hoạch cắt giảm sản lượng kéo dài của OPEC+.",
    question: "Sự kiện này gây áp lực vĩ mô tiêu cực nào lớn nhất lên nền kinh tế thực trong nước?",
    options: [
      "Gây áp lực tăng CPI (lạm phát) do xăng dầu tăng giá làm đội chi phí logistics, vận chuyển và sản xuất hàng hóa.",
      "Làm giảm ngay lập tức thuế xuất nhập khẩu của tất cả các mặt hàng tiêu dùng.",
      "Khiến tất cả các doanh nghiệp vận tải trong nước thu lời kỷ lục.",
      "Làm giảm tỷ giá USD/VND một cách nhanh chóng."
    ],
    correctIndex: 0,
    explanation: "Xăng dầu là đầu vào quan trọng của hầu hết các hoạt động sản xuất và vận chuyển trong nền kinh tế. Khi giá dầu thế giới tăng, giá xăng dầu trong nước tăng theo, đẩy chi phí vận tải, logistics, sản xuất lên cao. Chi phí này cuối cùng sẽ chuyển dịch vào giá bán hàng hóa tiêu dùng, trực tiếp gây áp lực tăng chỉ số giá tiêu dùng CPI (lạm phát vĩ mô)."
  },
  // Friday (5)
  {
    day: 5,
    newsTitle: "GDP Việt Nam tăng trưởng vượt dự báo trong quý vừa qua",
    newsBody: "Tổng cục Thống kê công bố GDP quý vừa qua tăng trưởng ấn tượng đạt 6.93% nhờ sự phục hồi mạnh mẽ của khu vực chế biến chế tạo và kim ngạch xuất khẩu.",
    question: "Nhóm lĩnh vực nào thường nhạy cảm và hưởng lợi trực tiếp từ đà phục hồi kinh tế vĩ mô này?",
    options: [
      "Các ngành dịch vụ tiện ích phòng thủ (điện, nước sinh hoạt) có doanh thu cố định.",
      "Nhóm ngành bán lẻ tiêu dùng, ngân hàng thương mại, sản xuất xuất khẩu và dịch vụ logistics.",
      "Chỉ các hoạt động đầu cơ tiền mã hóa ngắn hạn được hưởng lợi.",
      "Kinh tế tăng trưởng không ảnh hưởng gì tới hoạt động kinh doanh thực tế của doanh nghiệp."
    ],
    correctIndex: 1,
    explanation: "Tăng trưởng GDP phản ánh tổng cầu và hoạt động sản xuất kinh doanh toàn nền kinh tế đang mở rộng. Các nhóm ngành như bán lẻ (người dân tiêu dùng nhiều hơn), ngân hàng (nhu cầu vay vốn sản xuất tăng), xuất khẩu và logistics (hàng hóa luân chuyển nhiều hơn) sẽ trực tiếp cảm nhận đà tăng trưởng này thông qua doanh thu và lợi nhuận cải thiện."
  },
  // Saturday (6)
  {
    day: 6,
    newsTitle: "Tập đoàn địa ốc lớn đàm phán gia hạn thành công lô trái phiếu 3.000 tỷ",
    newsBody: "Một tập đoàn bất động sản lớn vừa đạt được thỏa thuận với các trái chủ để gia hạn thêm 2 năm thời gian đáo hạn của lô trái phiếu trị giá 3.000 tỷ đồng sắp đến hạn thanh toán.",
    question: "Việc gia hạn/tái cơ cấu nợ trái phiếu thành công mang lại ý nghĩa cốt lõi gì cho doanh nghiệp lúc này?",
    options: [
      "Giúp doanh nghiệp được xóa nợ hoàn toàn, không cần hoàn trả gốc và lãi nữa.",
      "Giải phóng áp lực thanh khoản ngắn hạn, tránh rủi ro vỡ nợ kỹ thuật, tạo thời gian hoàn thiện dự án để bán thu dòng tiền thực.",
      "Làm cho cổ phiếu doanh nghiệp tăng giá trần liên tục không bao giờ giảm.",
      "Khiến doanh nghiệp không được phép huy động thêm bất kỳ khoản vay nào trong tương lai."
    ],
    correctIndex: 1,
    explanation: "Gia hạn trái phiếu thành công bản chất là mua thêm thời gian. Nó giúp doanh nghiệp tạm thời thoát khỏi sức ép phải trả tiền mặt ngay lập tức (tránh nguy cơ mất thanh khoản dẫn đến phá sản hoặc bị siết nợ), để tập trung hoàn thiện dự án, bàn giao nhà cho khách hàng nhằm thu dòng tiền thực tế về trả nợ dần trong tương lai."
  }
];

export default function DailyNewsQuizWidget({ userId, compact = false }: DailyNewsQuizWidgetProps) {
  const [quiz, setQuiz] = useState<NewsQuiz | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  // On the dashboard sidebar this is now treated as a "today in finance"
  // block rather than an optional challenge, so it starts open by default.
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // "Unlimited" continuous practice mode: cycles through the same fixed
  // question pool (NEWS_QUIZZES is hand-authored, not a live feed - there's
  // no real news source wired up) without the once-a-day XP claim, so
  // someone can keep drilling past today's single question without it
  // looking like an exploit of the daily reward.
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceQuiz, setPracticeQuiz] = useState<NewsQuiz | null>(null);
  const [practiceSelectedOpt, setPracticeSelectedOpt] = useState<number | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);

  const todayKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const localAnsweredKey = `news_quiz_answered_${userId}_${todayKey}`;

  useEffect(() => {
    // Resolve quiz based on current day of the week
    const currentDay = new Date().getDay();
    const resolvedQuiz = NEWS_QUIZZES.find((q) => q.day === currentDay) || NEWS_QUIZZES[0];
    setQuiz(resolvedQuiz);

    // Check if already answered today
    if (typeof window !== "undefined") {
      const answered = window.localStorage.getItem(localAnsweredKey);
      if (answered) {
        setIsAnswered(true);
        setIsCorrect(answered === "correct");
        setSelectedOpt(Number(window.localStorage.getItem(`${localAnsweredKey}_opt`) ?? "-1"));
      }
    }
  }, [localAnsweredKey]);

  const handleSubmit = async () => {
    if (selectedOpt === null || !quiz) return;

    const correct = selectedOpt === quiz.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

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
        // xpEarned (not the hardcoded 15) is what actually landed - the
        // weekly quest XP cap can clamp this lower, even to 0, once the
        // week's budget is spent. See the matching fix in
        // components/DailyQuestsWidget.tsx for the full story.
        const { claimed, xpEarned } = await claimQuestReward(userId, "daily_news_quiz", todayKey);
        if (claimed && xpEarned > 0) {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("thtcdn:xp-gained", { detail: { xp: xpEarned, label: "Thử thách tin tức hàng ngày!" } }));
          }
          toast.success(`Chúc mừng! Bạn đã trả lời chính xác tình huống tin tức hôm nay và nhận +${xpEarned} XP! 🏆📰`);
        } else if (claimed) {
          toast.success("Chính xác! (Đã đạt giới hạn XP nhiệm vụ trong tuần này) 🏆📰");
        } else {
          toast.success("Chính xác! (XP hôm nay đã được ghi nhận trước đó) 🏆📰");
        }
      } catch (err) {
        console.error("Error rewarding news quiz XP:", err);
        toast.success("Chính xác! Đáp án đúng rồi. 🏆📰");
      }
    } else {
      toast.error("Đáp án chưa chính xác. Đọc lại tin tức và thử suy luận lại nhé! 🧐");
    }
  };

  function startPractice() {
    setPracticeMode(true);
    setPracticeStreak(0);
    pickNextPracticeQuiz();
  }

  function pickNextPracticeQuiz() {
    const pool = NEWS_QUIZZES.filter((q) => q.day !== practiceQuiz?.day);
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
    if (correct) setPracticeStreak((s) => s + 1);
    else setPracticeStreak(0);
  }

  if (!quiz) return null;

  const activeQuiz = practiceMode ? practiceQuiz : quiz;
  const activeSelectedOpt = practiceMode ? practiceSelectedOpt : selectedOpt;
  const activeIsAnswered = practiceMode ? practiceAnswered : isAnswered;
  const activeIsCorrect = practiceMode ? practiceCorrect : isCorrect;

  if (!activeQuiz) return null;

  return (
    <div className={`bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm ${compact ? "rounded-2xl" : "rounded-3xl"}`}>
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center justify-between cursor-pointer text-left focus:outline-none ${
          collapsed ? "" : "border-b border-stone-100 dark:border-stone-800"
        } ${compact ? "px-4 py-3" : "px-6 py-4"}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 w-8 h-8">
            <Newspaper className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-base">
              {compact ? "Tin tức tài chính hôm nay" : "Thử thách Tin tức Tài chính"}
              {!activeIsAnswered && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </h3>
            {!compact && (
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">
                Kiểm tra nhanh mức độ nhạy bén vĩ mô hàng ngày
              </p>
            )}
          </div>
        </div>
        <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0">
          {collapsed ? "Mở ▾" : "Thu gọn ▴"}
        </span>
      </button>

      {/* Content */}
      {!collapsed && (
        <div className={compact ? "p-4 space-y-3" : "p-6 space-y-4"}>
          {/* News snippet box */}
          <div className={`bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800/80 ${compact ? "rounded-xl p-3" : "rounded-2xl p-4"}`}>
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className="text-[9px] font-extrabold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-400 px-2 py-0.5 rounded uppercase">
                {practiceMode ? "Tình huống luyện tập" : "Điểm tin hôm nay"}
              </span>
              {/* NEWS_QUIZZES above is a hand-authored, fixed set of scenarios
                  (not a live news feed) - flagging that explicitly so the
                  specific-looking numbers (CPI %, tỷ giá, lãi suất...) never
                  get mistaken for real reported news. */}
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500">
                📰 Tình huống mô phỏng để luyện tư duy - không phải tin thật
              </span>
            </div>
            <h4 className={`font-black text-stone-900 dark:text-stone-100 leading-snug ${compact ? "text-[11px]" : "text-xs"}`}>
              {activeQuiz.newsTitle}
            </h4>
            {!compact && (
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-2 leading-relaxed italic">
                "{activeQuiz.newsBody}"
              </p>
            )}
          </div>

          {/* Question and Options */}
          <div className={compact ? "space-y-2" : "space-y-3"}>
            <h4 className={`font-black text-stone-900 dark:text-stone-100 flex items-start gap-1.5 ${compact ? "text-[11px]" : "text-xs"}`}>
              <HelpCircle className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-0.5 shrink-0" />
              <span>{activeQuiz.question}</span>
            </h4>

            <div className={compact ? "grid gap-1.5" : "grid gap-2"}>
              {activeQuiz.options.map((opt, idx) => {
                const isSelected = activeSelectedOpt === idx;
                const showSuccess = activeIsAnswered && idx === activeQuiz.correctIndex;
                const showFailure = activeIsAnswered && isSelected && !activeIsCorrect;

                return (
                  <button
                    key={idx}
                    disabled={activeIsAnswered}
                    onClick={() => (practiceMode ? setPracticeSelectedOpt(idx) : setSelectedOpt(idx))}
                    className={`w-full text-left rounded-xl border leading-relaxed transition-all flex items-start gap-2.5 focus:outline-none ${
                      compact ? "p-2.5 text-[11px]" : "p-3.5 text-xs"
                    } ${
                      showSuccess
                        ? "border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-400 font-bold"
                        : showFailure
                        ? "border-rose-500 bg-rose-500/[0.04] dark:bg-rose-950/20 text-rose-900 dark:text-rose-400"
                        : isSelected
                        ? "border-sky-500 bg-sky-500/[0.02] text-sky-900 dark:text-sky-400 font-bold"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">
                      {showSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : showFailure ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${
                          isSelected ? "border-sky-500 text-sky-500" : "border-stone-300 dark:border-stone-700 text-stone-400"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit or Explanation block */}
          {!activeIsAnswered ? (
            <button
              onClick={practiceMode ? submitPractice : handleSubmit}
              disabled={activeSelectedOpt === null}
              className={`w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 dark:bg-stone-100 dark:hover:bg-stone-200 dark:disabled:bg-stone-800 text-white dark:text-stone-900 disabled:text-stone-400 rounded-xl font-extrabold tracking-wider uppercase transition-colors cursor-pointer ${
                compact ? "py-2.5 text-[10px]" : "py-3 text-xs"
              }`}
            >
              Gửi câu trả lời
            </button>
          ) : (
            <div className={`rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200/60 dark:border-stone-800/80 animate-[fadeIn_0.35s_ease-out] ${compact ? "p-3" : "p-4.5"}`}>
              <h5 className="text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-stone-700 dark:text-stone-300 mb-2">
                <Award className={`w-4 h-4 ${activeIsCorrect ? "text-emerald-500" : "text-stone-400"}`} />
                <span>{activeIsCorrect ? "Trả lời chính xác!" : `Đáp án đúng là ${String.fromCharCode(65 + activeQuiz.correctIndex)}`}</span>
              </h5>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {activeQuiz.explanation}
              </p>
            </div>
          )}

          {/* Unlimited practice mode toggle/continue */}
          {practiceMode ? (
            <div className="flex items-center gap-2">
              {practiceStreak > 1 && (
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                  <Flame className="w-3.5 h-3.5" />
                  Chuỗi đúng: {practiceStreak}
                </span>
              )}
              {practiceAnswered && (
                <button
                  onClick={pickNextPracticeQuiz}
                  className={`flex-1 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-extrabold tracking-wider uppercase transition-colors cursor-pointer ${compact ? "py-2 text-[10px]" : "py-2.5 text-xs"}`}
                >
                  Câu tiếp theo →
                </button>
              )}
              <button
                onClick={() => setPracticeMode(false)}
                className={`text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-bold shrink-0 ${compact ? "text-[10px]" : "text-xs"}`}
              >
                Thoát
              </button>
            </div>
          ) : (
            <button
              onClick={startPractice}
              className={`w-full border-2 border-dashed border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-400 rounded-xl font-bold hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors cursor-pointer ${compact ? "py-2 text-[10px]" : "py-2.5 text-xs"}`}
            >
              🔁 Luyện tập không giới hạn (không tính XP)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
