"use client";

import { useState, useEffect } from "react";

const STAGE_TIPS: string[][] = [
  // Stage 1 — Tư duy tiền bạc (ids 1–20)
  [
    "Bí quyết tài chính đơn giản nhất: chi tiêu ít hơn thu nhập. Nghe hiển nhiên, nhưng 70% người trưởng thành không làm được điều này mỗi tháng.",
    "Người giàu không nhất thiết kiếm nhiều hơn; họ giữ được nhiều hơn. Net worth bằng tài sản trừ nợ, không phải thu nhập hàng tháng.",
    "Dòng tiền âm là kẻ thù thầm lặng. Theo dõi chi tiêu 30 ngày và bạn sẽ ngạc nhiên tiền biến đi đâu.",
    "Quy tắc 50/30/20: 50% nhu cầu thiết yếu, 30% muốn, 20% tiết kiệm và đầu tư.",
  ],
  // Stage 2 — Kế toán nền tảng (ids 21–40)
  [
    "Kế toán là ngôn ngữ kinh doanh, Warren Buffett gọi như vậy. Đọc được báo cáo tài chính là kỹ năng quan trọng nhất của người làm tài chính.",
    "Accrual accounting: doanh thu ghi nhận khi bán, không khi thu tiền. Đây là lý do P&L đẹp nhưng tài khoản ngân hàng trống.",
    "Phương trình kế toán: Tài sản bằng Nợ cộng Vốn chủ. Ba chữ này giải thích mọi giao dịch tài chính, không có ngoại lệ.",
    "Debit và Credit không phải tốt hay xấu, chỉ là hai phía của cùng một giao dịch kép.",
  ],
  // Stage 3 — 3 báo cáo tài chính (ids 41–60)
  [
    "Ba báo cáo tài chính là ba góc nhìn: P&L nói doanh nghiệp kiếm gì, Balance Sheet nói có gì, Cash Flow nói tiền đi đâu.",
    "Nếu chỉ đọc một báo cáo, hãy đọc Cash Flow Statement. Lợi nhuận có thể giả tạo, nhưng tiền mặt trong tài khoản thì không.",
    "Gross Margin là chỉ số đầu tiên cần nhìn khi phân tích P&L; nó tiết lộ pricing power và moat thực sự của doanh nghiệp.",
    "Balance Sheet luôn phải cân. Nếu không cân, kế toán đã sai. Đây là quy luật không thể vi phạm.",
  ],
  // Stage 4 — Chỉ số tài chính (ids 61–80)
  [
    "ROE cao chưa chắc tốt nếu đến từ đòn bẩy. DuPont tách ROE thành 3 phần: Margin nhân Turnover nhân Leverage, mới hiểu chất lượng thực.",
    "So sánh P/E giữa ngành khác nhau như so sánh táo với cam, vô nghĩa. Luôn so trong cùng ngành và so với lịch sử.",
    "EV/EBITDA tốt hơn P/E khi so sánh công ty có cơ cấu vốn khác nhau vì loại bỏ ảnh hưởng thuế, lãi vay và khấu hao.",
    "Một chỉ số đơn độc không nói lên gì. Ý nghĩa nằm ở xu hướng theo thời gian và so sánh với peers.",
  ],
  // Stage 5 — Giá trị thời gian của tiền (ids 81–100)
  [
    "1 triệu hôm nay đáng giá hơn 1 triệu năm sau vì bạn có thể đầu tư nó. Đây là nền tảng mọi quyết định tài chính định lượng.",
    "Compound interest: 100 triệu tăng 10% mỗi năm, sau 30 năm thành 1.7 tỷ. Bắt đầu sớm 5 năm quan trọng hơn đầu tư thêm 50%.",
    "NPV lớn hơn 0: đầu tư tạo giá trị. NPV nhỏ hơn 0: phá hủy giá trị. Mọi quyết định đầu tư đều đưa được về câu hỏi này.",
    "IRR là rate làm NPV bằng 0. Nếu IRR lớn hơn WACC: đầu tư. Nếu IRR nhỏ hơn WACC: từ chối. Đây là cách CEO nghĩ khi xem xét dự án.",
  ],
  // Stage 6 — Tài chính doanh nghiệp (ids 101–120)
  [
    "Ba quyết định của CFO: Đầu tư vào đâu, Tài trợ bằng gì, Trả lại cổ đông thế nào. Tất cả hướng đến tối đa hóa giá trị.",
    "Nợ có tax shield vì lãi vay được khấu trừ thuế. Nhưng quá nhiều nợ khiến chi phí phá sản tăng. Optimal structure là điểm cân bằng giữa hai yếu tố này.",
    "70% M&A không đạt kỳ vọng: synergy ảo, culture clash, integration thất bại. Người mua thường trả quá nhiều.",
    "LTV/CAC từ 3 trở lên là benchmark tối thiểu cho startup. Dưới 1 nghĩa là mua khách hàng với giá lỗ.",
  ],
  // Stage 7 — Cổ phiếu và Định giá (ids 121–140)
  [
    "Intrinsic value khác giá thị trường. Giá là cái bạn trả, giá trị là cái bạn nhận; khoảng chênh lệch là margin of safety.",
    "DCF rất nhạy với WACC và g. Thay đổi 1% có thể khiến định giá thay đổi 20 đến 30%. Luôn làm sensitivity analysis.",
    "Moat rộng bằng ROIC cao bền vững nhiều năm. Tìm công ty ROIC lớn hơn WACC ổn định 10 năm, đó là moat thực sự.",
    "Earnings quality: NI tăng nhưng OCF giảm là dấu hiệu đỏ cần điều tra. Lợi nhuận có thể điều chỉnh, tiền mặt thì không.",
  ],
  // Stage 8 — Trái phiếu và Lãi suất (ids 141–160)
  [
    "Giá trái phiếu và lãi suất quan hệ nghịch đảo, quy luật sắt của fixed income. Fed tăng lãi dẫn đến toàn bộ danh mục bond mất giá.",
    "Duration đo độ nhạy giá bond với lãi suất. Duration 7 có nghĩa lãi suất tăng 1% thì giá giảm khoảng 7%. Quản lý duration là quản lý risk.",
    "Investment Grade vs High Yield: HY spreads nới rộng trước suy thoái 6 đến 12 tháng, là chỉ báo kinh tế quan trọng.",
    "Yield curve đảo ngược đã dự báo mọi cuộc suy thoái Mỹ kể từ 1955, tỷ lệ chính xác khoảng 80%.",
  ],
  // Stage 9 — Danh mục và Rủi ro (ids 161–180)
  [
    "Asset allocation quyết định 90% lợi nhuận danh mục, không phải stock picking hay market timing.",
    "Đa dạng hóa loại bỏ unsystematic risk nhưng không loại bỏ systematic risk. 20 đến 30 cổ phiếu là đủ.",
    "Loss aversion: đau khi mất 1 triệu gấp đôi niềm vui khi lãi 1 triệu, dẫn đến quyết định đầu tư sai.",
    "80% active fund managers không đánh bại index sau 15 năm. ETF chi phí thấp cộng DCA hàng tháng là giải pháp.",
  ],
  // Stage 10 — Phái sinh (ids 181–200)
  [
    "Phái sinh không tự nhiên rủi ro; rủi ro nằm ở cách dùng. Hedge giá nhiên liệu là giảm rủi ro. Đầu cơ đòn bẩy là tăng rủi ro.",
    "Options cho phép mua bảo hiểm cho danh mục: protective put là quyền bán cổ phiếu ở giá cố định khi thị trường giảm.",
    "Interest Rate Swap: hoán đổi lãi thả nổi sang cố định. Doanh nghiệp loại bỏ rủi ro biến động lãi suất.",
    "Sau 200 bài, tài chính là bộ mental models. DCF cho giá trị, WACC cho chi phí cơ hội, Portfolio theory cho rủi ro và tương quan.",
  ],
];

function getTip(lessonId: number): string {
  const stageIdx = Math.min(Math.floor((lessonId - 1) / 20), 9);
  const tips = STAGE_TIPS[stageIdx];
  return tips[lessonId % tips.length];
}

interface Props {
  lessonId: number;
  lessonTitle: string;
}

export default function TaiTaiLesson({ lessonId }: Props) {
  const tip = getTip(lessonId);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "done">("waiting");

  useEffect(() => {
    const delay = setTimeout(() => setPhase("typing"), 700);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(tip.slice(0, i));
      if (i >= tip.length) {
        clearInterval(id);
        setPhase("done");
      }
    }, 20);
    return () => clearInterval(id);
  }, [phase, tip]);

  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 overflow-hidden">
      <div className="bg-stone-900 px-5 py-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          T
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-white font-bold text-sm">Tài Tài</span>
          <span className="text-stone-400 text-xs ml-2">· nhận xét về bài này</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-stone-400 text-xs">live</span>
        </div>
      </div>

      <div className="px-5 py-5">
        <p className="text-stone-800 text-lg leading-relaxed font-medium min-h-[2.5rem]">
          {phase === "waiting" ? (
            <span className="inline-flex gap-1 align-middle mt-1">
              <span className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "160ms" }} />
              <span className="w-2 h-2 rounded-full bg-stone-300 animate-bounce" style={{ animationDelay: "320ms" }} />
            </span>
          ) : (
            <>
              {displayed}
              {phase === "typing" && (
                <span className="inline-flex gap-1 ml-1 align-middle">
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "160ms" }} />
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "320ms" }} />
                </span>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
