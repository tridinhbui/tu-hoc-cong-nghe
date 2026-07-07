"use client";

import { useState, useEffect } from "react";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";

// Keyed by "<track>-<chặng label>" so tips always match the lesson's actual
// topic. Previously this bucketed by Math.floor((lessonId-1)/20), capped at
// index 9 — correct only for the original 200-day professional curriculum.
// Every lesson added since (personal Chặng 0/2-6, professional Chặng 10,
// bonus case studies) fell through to index 9 and got derivatives/phái sinh
// tips regardless of what the lesson was actually about.
const STAGE_TIPS: Record<string, string[]> = {
  "personal-Chặng 1": [
    "Bí quyết tài chính đơn giản nhất: chi tiêu ít hơn thu nhập. Nghe hiển nhiên, nhưng 70% người trưởng thành không làm được điều này mỗi tháng.",
    "Người giàu không nhất thiết kiếm nhiều hơn; họ giữ được nhiều hơn. Net worth bằng tài sản trừ nợ, không phải thu nhập hàng tháng.",
    "Dòng tiền âm là kẻ thù thầm lặng. Theo dõi chi tiêu 30 ngày và bạn sẽ ngạc nhiên tiền biến đi đâu.",
    "Quy tắc 50/30/20: 50% nhu cầu thiết yếu, 30% muốn, 20% tiết kiệm và đầu tư.",
  ],
  "personal-Chặng 0": [
    "Nhiều người audit lần đầu mới phát hiện mình quên cộng khoản nợ trả góp điện thoại hay vay bạn bè — tài sản ròng thường thấp hơn cảm giác chủ quan vì hay bỏ sót đúng những khoản nợ nhỏ, rải rác.",
    "Một nghiên cứu hành vi hay được nhắc: người dùng Snowball (trả nợ nhỏ trước) có tỷ lệ kiên trì đến cùng cao hơn Avalanche, dù Avalanche tối ưu hơn về tiền — kỷ luật thắng tối ưu nếu bạn dễ bỏ cuộc.",
    "Sai lầm phổ biến nhất về khẩu vị rủi ro: đánh giá nó lúc thị trường đang yên ả. Câu hỏi thật chỉ lộ ra khi tài khoản đỏ 20% — lúc đó mới biết mình đã tự đánh giá đúng hay sai.",
    "Sinking fund và quỹ khẩn cấp hay bị nhầm là một — khác nhau ở chỗ sinking fund dành cho khoản chi BIẾT TRƯỚC (Tết, học phí), quỹ khẩn cấp dành cho thứ KHÔNG lường trước được.",
  ],
  "personal-Chặng 2": [
    "ETF chỉ số theo dõi cả thị trường thay vì cược vào một công ty — chi phí thấp, đa dạng hóa sẵn, phù hợp phần lớn nhà đầu tư cá nhân.",
    "FOMO khiến bạn mua đúng lúc giá đã tăng mạnh vì sợ bỏ lỡ — thường là gần đỉnh, không phải lúc tốt để vào.",
    "DCA (đầu tư định kỳ) không phải phép màu, chỉ là cách giảm rủi ro timing sai bằng kỷ luật chia nhỏ khoản đầu tư theo thời gian.",
    "Thuế trên lợi nhuận đầu tư và kỷ luật chốt lời/cắt lỗ quan trọng không kém việc chọn đúng cổ phiếu.",
  ],
  "personal-Chặng 3": [
    "Giá trái phiếu và lãi suất luôn đi ngược chiều nhau — lãi suất thị trường tăng, giá trái phiếu bạn đang cầm sẽ giảm.",
    "Trái phiếu chính phủ thường an toàn hơn trái phiếu doanh nghiệp, đổi lại lợi suất thấp hơn — đánh đổi rủi ro và lợi nhuận không có ngoại lệ.",
    "Duration đo độ nhạy của trái phiếu với lãi suất — duration càng cao, giá càng biến động mạnh khi lãi suất thay đổi.",
    "Trái phiếu không phải tài sản 'miễn rủi ro' — vẫn có rủi ro lãi suất, rủi ro tín dụng, và rủi ro lạm phát ăn mòn lợi suất thực.",
  ],
  "personal-Chặng 4": [
    "Phân bổ tài sản (asset allocation) quyết định phần lớn kết quả danh mục dài hạn — quan trọng hơn việc chọn đúng một mã cổ phiếu.",
    "Càng gần tuổi nghỉ hưu, danh mục nên nghiêng dần sang tài sản ổn định hơn — vì không còn nhiều thời gian để hồi phục sau một cú giảm mạnh.",
    "Tái cân bằng danh mục định kỳ về bản chất là bán bớt thứ đã tăng nhiều, mua thêm thứ đang yếu hơn — kỷ luật ngược với bản năng.",
    "Bảo hiểm đi trước đầu tư trong thứ tự ưu tiên: một sự kiện y tế không có bảo hiểm có thể xóa sổ nhiều năm tích lũy chỉ trong vài tháng.",
  ],
  "personal-Chặng 5": [
    "Warren Buffett từng nói ông thà mua một công ty tuyệt vời với giá hợp lý còn hơn một công ty tầm thường với giá rẻ — đầu tư giá trị không có nghĩa là cứ rẻ là mua.",
    "Một dấu hiệu dễ bỏ qua khi đánh giá đa dạng hóa: hỏi 'nếu tin xấu ập vào NGÀNH này, bao nhiêu % danh mục của tôi bị ảnh hưởng cùng lúc', không chỉ đếm số mã.",
    "Cách đơn giản để tự kiểm tra thiên kiến xác nhận: trước khi mua, thử viết ra 2 lý do KHÔNG nên mua cổ phiếu đó. Nếu không nghĩ ra được lý do nào, có thể bạn chưa nhìn đủ góc.",
    "Một chỉ số tốt ở một công ty vẫn có thể là tín hiệu xấu nếu đến từ nguồn không bền vững — ROE cao nhờ vay nợ nhiều khác hẳn ROE cao nhờ vận hành hiệu quả.",
  ],
  "personal-Chặng 6": [
    "FIRE (Financial Independence, Retire Early) là một cộng đồng thực tế đã tính toán chi tiết con số tự do tài chính của họ — không phải khái niệm mơ hồ, mà là một phép tính ai cũng làm được.",
    "Sequence of returns risk là rủi ro ít người để ý: thị trường giảm mạnh ngay 2-3 năm đầu nghỉ hưu nguy hiểm hơn nhiều so với giảm mạnh ở năm thứ 20, dù mức giảm % là như nhau.",
    "Cách nhanh nhất để nhận ra lừa đảo tài chính: hỏi 'nếu chiến lược này thật sự hiệu quả và an toàn, tại sao họ cần rủ thêm người thay vì tự âm thầm làm giàu'.",
    "Ở nhiều gia đình, tranh chấp thừa kế không phải vì thiếu tiền mà vì thiếu một cuộc trò chuyện rõ ràng từ sớm — giấy tờ pháp lý chỉ là một nửa câu chuyện.",
  ],
  "professional-Chặng 1": [
    "Kế toán là ngôn ngữ kinh doanh, Warren Buffett gọi như vậy. Đọc được báo cáo tài chính là kỹ năng quan trọng nhất của người làm tài chính.",
    "Accrual accounting: doanh thu ghi nhận khi bán, không khi thu tiền. Đây là lý do P&L đẹp nhưng tài khoản ngân hàng trống.",
    "Phương trình kế toán: Tài sản bằng Nợ cộng Vốn chủ. Ba chữ này giải thích mọi giao dịch tài chính, không có ngoại lệ.",
    "Debit và Credit không phải tốt hay xấu, chỉ là hai phía của cùng một giao dịch kép.",
  ],
  "professional-Chặng 2": [
    "Ba báo cáo tài chính là ba góc nhìn: P&L nói doanh nghiệp kiếm gì, Balance Sheet nói có gì, Cash Flow nói tiền đi đâu.",
    "Nếu chỉ đọc một báo cáo, hãy đọc Cash Flow Statement. Lợi nhuận có thể giả tạo, nhưng tiền mặt trong tài khoản thì không.",
    "Gross Margin là chỉ số đầu tiên cần nhìn khi phân tích P&L; nó tiết lộ pricing power và moat thực sự của doanh nghiệp.",
    "Balance Sheet luôn phải cân. Nếu không cân, kế toán đã sai. Đây là quy luật không thể vi phạm.",
  ],
  "professional-Chặng 3": [
    "ROE cao chưa chắc tốt nếu đến từ đòn bẩy. DuPont tách ROE thành 3 phần: Margin nhân Turnover nhân Leverage, mới hiểu chất lượng thực.",
    "So sánh P/E giữa ngành khác nhau như so sánh táo với cam, vô nghĩa. Luôn so trong cùng ngành và so với lịch sử.",
    "EV/EBITDA tốt hơn P/E khi so sánh công ty có cơ cấu vốn khác nhau vì loại bỏ ảnh hưởng thuế, lãi vay và khấu hao.",
    "Một chỉ số đơn độc không nói lên gì. Ý nghĩa nằm ở xu hướng theo thời gian và so sánh với peers.",
  ],
  "professional-Chặng 4": [
    "1 triệu hôm nay đáng giá hơn 1 triệu năm sau vì bạn có thể đầu tư nó. Đây là nền tảng mọi quyết định tài chính định lượng.",
    "Compound interest: 100 triệu tăng 10% mỗi năm, sau 30 năm thành 1.7 tỷ. Bắt đầu sớm 5 năm quan trọng hơn đầu tư thêm 50%.",
    "NPV lớn hơn 0: đầu tư tạo giá trị. NPV nhỏ hơn 0: phá hủy giá trị. Mọi quyết định đầu tư đều đưa được về câu hỏi này.",
    "IRR là rate làm NPV bằng 0. Nếu IRR lớn hơn WACC: đầu tư. Nếu IRR nhỏ hơn WACC: từ chối. Đây là cách CEO nghĩ khi xem xét dự án.",
  ],
  "professional-Chặng 5": [
    "Ba quyết định của CFO: Đầu tư vào đâu, Tài trợ bằng gì, Trả lại cổ đông thế nào. Tất cả hướng đến tối đa hóa giá trị.",
    "Nợ có tax shield vì lãi vay được khấu trừ thuế. Nhưng quá nhiều nợ khiến chi phí phá sản tăng. Optimal structure là điểm cân bằng giữa hai yếu tố này.",
    "70% M&A không đạt kỳ vọng: synergy ảo, culture clash, integration thất bại. Người mua thường trả quá nhiều.",
    "LTV/CAC từ 3 trở lên là benchmark tối thiểu cho startup. Dưới 1 nghĩa là mua khách hàng với giá lỗ.",
  ],
  "professional-Chặng 6": [
    "Intrinsic value khác giá thị trường. Giá là cái bạn trả, giá trị là cái bạn nhận; khoảng chênh lệch là margin of safety.",
    "DCF rất nhạy với WACC và g. Thay đổi 1% có thể khiến định giá thay đổi 20 đến 30%. Luôn làm sensitivity analysis.",
    "Moat rộng bằng ROIC cao bền vững nhiều năm. Tìm công ty ROIC lớn hơn WACC ổn định 10 năm, đó là moat thực sự.",
    "Earnings quality: NI tăng nhưng OCF giảm là dấu hiệu đỏ cần điều tra. Lợi nhuận có thể điều chỉnh, tiền mặt thì không.",
  ],
  "professional-Chặng 7": [
    "Giá trái phiếu và lãi suất quan hệ nghịch đảo, quy luật sắt của fixed income. Fed tăng lãi dẫn đến toàn bộ danh mục bond mất giá.",
    "Duration đo độ nhạy giá bond với lãi suất. Duration 7 có nghĩa lãi suất tăng 1% thì giá giảm khoảng 7%. Quản lý duration là quản lý risk.",
    "Investment Grade vs High Yield: HY spreads nới rộng trước suy thoái 6 đến 12 tháng, là chỉ báo kinh tế quan trọng.",
    "Yield curve đảo ngược đã dự báo mọi cuộc suy thoái Mỹ kể từ 1955, tỷ lệ chính xác khoảng 80%.",
  ],
  "professional-Chặng 8": [
    "Asset allocation quyết định 90% lợi nhuận danh mục, không phải stock picking hay market timing.",
    "Đa dạng hóa loại bỏ unsystematic risk nhưng không loại bỏ systematic risk. 20 đến 30 cổ phiếu là đủ.",
    "Loss aversion: đau khi mất 1 triệu gấp đôi niềm vui khi lãi 1 triệu, dẫn đến quyết định đầu tư sai.",
    "80% active fund managers không đánh bại index sau 15 năm. ETF chi phí thấp cộng DCA hàng tháng là giải pháp.",
  ],
  "professional-Chặng 9": [
    "Phái sinh không tự nhiên rủi ro; rủi ro nằm ở cách dùng. Hedge giá nhiên liệu là giảm rủi ro. Đầu cơ đòn bẩy là tăng rủi ro.",
    "Options cho phép mua bảo hiểm cho danh mục: protective put là quyền bán cổ phiếu ở giá cố định khi thị trường giảm.",
    "Interest Rate Swap: hoán đổi lãi thả nổi sang cố định. Doanh nghiệp loại bỏ rủi ro biến động lãi suất.",
    "Sau 200 bài, tài chính là bộ mental models. DCF cho giá trị, WACC cho chi phí cơ hội, Portfolio theory cho rủi ro và tương quan.",
  ],
  "professional-Chặng 10": [
    "LBO dùng đòn bẩy nợ để khuếch đại lợi nhuận vốn chủ — nếu doanh nghiệp sinh lời tốt, ROE tăng mạnh; nếu không, rủi ro phá sản cũng tăng theo.",
    "Synergy trong M&A thường bị thổi phồng lúc đàm phán và hiếm khi đạt đủ trong thực tế — phần lớn giá trị thương vụ mất đi ở khâu tích hợp hậu sáp nhập.",
    "Accretion/dilution analysis trả lời câu hỏi: thương vụ M&A này làm EPS công ty mua tăng hay giảm — phụ thuộc cách tài trợ (tiền mặt, nợ, hay phát hành cổ phiếu).",
    "Exit strategy (IPO, bán lại, chia cổ tức đặc biệt) phải được nhà đầu tư private equity nghĩ đến ngay từ ngày đầu tư, không phải lúc sắp thoái vốn.",
  ],
  bonus: [
    "Case study thực tế là nơi lý thuyết gặp thực tế lộn xộn — số liệu công ty thật hiếm khi gọn gàng như ví dụ trong sách giáo khoa.",
    "Đọc báo cáo tài chính của một công ty thật khác hẳn đọc ví dụ minh họa — luôn có ngữ cảnh ngành, chu kỳ kinh tế, và quyết định quản trị ẩn phía sau con số.",
    "Phân tích một thương vụ hay một công ty cụ thể là cách tốt nhất để kiểm tra xem bạn đã thực sự hiểu khái niệm hay chỉ mới thuộc lòng định nghĩa.",
    "Không có công ty nào hoàn hảo để phân tích — mỗi case đều có điểm mù riêng, quan trọng là nhận ra được điểm mù đó là gì.",
  ],
};

function findStageLabel(lessonId: number): { track: "personal" | "professional"; label: string } | null {
  for (const stage of TRACK_PERSONAL.stages) {
    if (lessonId >= stage.days[0] && lessonId <= stage.days[1]) {
      return { track: "personal", label: stage.label };
    }
  }
  for (const stage of TRACK_PROFESSIONAL.stages) {
    if (lessonId >= stage.days[0] && lessonId <= stage.days[1]) {
      return { track: "professional", label: stage.label };
    }
  }
  return null;
}

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const STOPWORDS = new Set([
  "tu", "hoc", "tai", "chinh", "day", "bai", "chang", "la", "gi", "va", "cua",
  "trong", "cho", "khi", "voi", "mot", "nhung", "duoc", "khong", "de", "nao",
  "vi", "sao", "sao", "cac", "nhu", "the",
]);

function keywords(text: string): string[] {
  return stripAccents(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}

// Pick the tip whose text shares the most keywords with the lesson's own
// title/subtitle — previously this just used lessonId % pool.length, which
// picks tips arbitrarily within a Chặng's pool and often surfaces a tip about
// a completely different lesson in the same Chặng (e.g. a "khẩu vị rủi ro"
// tip under the "quỹ khẩn cấp" lesson). Falls back to the old modulo when no
// tip shares any keyword, so every lesson still gets a tip.
function getTip(lessonId: number, lessonTitle: string): string {
  const match = findStageLabel(lessonId);
  const tips = match ? STAGE_TIPS[`${match.track}-${match.label}`] : undefined;
  const pool = tips ?? STAGE_TIPS.bonus;

  const titleWords = new Set(keywords(lessonTitle));
  if (titleWords.size > 0) {
    let bestIndex = -1;
    let bestScore = 0;
    pool.forEach((tip, i) => {
      const tipWords = keywords(tip);
      const score = tipWords.filter((w) => titleWords.has(w)).length;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    });
    if (bestIndex >= 0) return pool[bestIndex];
  }

  return pool[lessonId % pool.length];
}

interface Props {
  lessonId: number;
  lessonTitle: string;
}

export default function StageTipsBanner({ lessonId, lessonTitle }: Props) {
  const tip = getTip(lessonId, lessonTitle);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "done">("waiting");

  useEffect(() => {
    const delay = setTimeout(() => setPhase("typing"), 700);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setDisplayed(tip.slice(0, i));
      if (i >= tip.length) {
        window.clearInterval(id);
        setPhase("done");
      }
    }, 20);
    return () => window.clearInterval(id);
  }, [phase, tip]);

  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 overflow-hidden">
      <div className="bg-stone-900 px-5 py-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          T
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-white font-bold text-sm">Tài Tài</span>
          <span className="text-stone-500 text-xs ml-2">· mẹo tự động cho bài này</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 text-xs uppercase tracking-wide">Tự động</span>
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
