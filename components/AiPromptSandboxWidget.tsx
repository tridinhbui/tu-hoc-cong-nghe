"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Play, Bot, RefreshCw, FileText, BarChart3, AlertTriangle, MessageSquareCode } from "lucide-react";
import { toast } from "sonner";

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  icon: typeof Sparkles;
  promptText: string;
  simulatedResponse: string;
}

const PRESET_TEMPLATES: PromptTemplate[] = [
  {
    id: "rcto-dcf",
    name: "Định Giá DCF Cổ Phiếu (R-C-T-O + CoT)",
    category: "Định giá",
    icon: BarChart3,
    promptText: `[ROLE]: Bạn là Giám đốc Đầu tư Quỹ (CFO/CIO).
[CONTEXT]: Doanh nghiệp FPT có Dòng tiền tự do FCF = 5.000 tỷ VNĐ năm 2025. Giả định WACC = 10%, tốc độ tăng trưởng dài hạn g = 3.5%.
[TASK]: Hãy áp dụng mô hình DCF để định giá giá trị hợp lý của doanh nghiệp. Hãy suy luận và thực hiện tính toán chi tiết từng bước một (Chain-of-Thought).
[OUTPUT]: Xuất ra kết quả dạng bảng gồm 3 bước: (1) Chiết khấu dòng tiền 5 năm; (2) Giá trị còn lại Terminal Value; (3) Tổng giá trị doanh nghiệp.`,
    simulatedResponse: `🤖 AI RESPONSE (Phản hồi mô phỏng từng bước):

Step 1: Tính Giá trị hiện tại (PV) dòng tiền 5 năm tới (2026-2030) với tốc độ tăng trưởng dự kiến 12%/năm và WACC = 10%.
- PV 5 năm = 5.000 + 5.090 + 5.183 + 5.277 + 5.372 = 25.922 tỷ VNĐ.

Step 2: Tính Giá trị còn lại (Terminal Value - TV) sau năm 5:
- TV = FCF_5 * (1 + g) / (WACC - g) = 5.920 * 1.035 / (0.10 - 0.035) = 94.264 tỷ VNĐ.
- PV của TV = 94.264 / (1 + 0.10)^5 = 58.530 tỷ VNĐ.

Step 3: Tổng Giá Trị Doanh Nghiệp (Enterprise Value):
- Tổng EV = 25.922 + 58.530 = 84.452 tỷ VNĐ.

💡 Đánh giá: Mức định giá hợp lý cho FPT dựa trên các giả định đầu vào là 84.452 tỷ VNĐ.`
  },
  {
    id: "bctc-risk",
    name: "Bóc Tách Rủi Ro Thuyết Minh BCTC",
    category: "Đọc BCTC",
    icon: FileText,
    promptText: `[ROLE]: Bạn là Trưởng bộ phận Thẩm định Rủi ro Tín dụng Ngân hàng.
[CONTEXT]: Tôi tải lên file Báo cáo tài chính năm 2025 của Công ty X.
[TASK]: Quét toàn bộ mục Thuyết minh BCTC và lọc ra Top 3 điểm bất thường rủi ro nhất về:
1. Các khoản Phải thu ngắn hạn quá hạn và nợ xấu nghi ngờ.
2. Dòng tiền hoạt động kinh doanh (OCF) so với Lợi nhuận sau thuế.
3. Các khoản cam kết bảo lĩnh / nợ tiềm tàng ngoài bảng cân đối.
[OUTPUT]: Trình bày dưới dạng 3 mục cảnh báo rủi ro màu đỏ, mỗi mục không quá 3 dòng.`,
    simulatedResponse: `🤖 AI RESPONSE (Cảnh báo rủi ro BCTC):

🚨 CẢNH BÁO 1: Phải thu ngắn hạn tăng 45% so với cùng kỳ, chiếm 62% tổng tài sản ngắn hạn. Thuyết minh số 8 cho thấy 350 tỷ là nợ quá hạn trên 12 tháng chưa trích lập dự phòng đầy đủ.

🚨 CẢNH BÁO 2: Lợi nhuận sau thuế báo cáo đạt 200 tỷ nhưng Dòng tiền hoạt động kinh doanh (OCF) âm -150 tỷ VNĐ do tiền bị ứ đọng tại hàng tồn kho và các khoản trả trước.

🚨 CẢNH BÁO 3: Thuyết minh số 24 tiết kiệm khoản bảo lãnh nợ vay 500 tỷ VNĐ cho công ty liên kết mà không ghi nhận trong nợ phải trả chính thức.`
  },
  {
    id: "news-sentiment",
    name: "Đánh Giá Sentiment Tin Tức Thị Trường",
    category: "Tin tức",
    icon: MessageSquareCode,
    promptText: `[ROLE]: Bạn là Chuyên viên Phân tích Định lượng (Quant Analyst).
[CONTEXT]: Dưới đây là 3 bài báo mới nhất về ngành Ngân hàng: [Dán 3 liên kết / đoạn văn bài báo].
[TASK]: Hãy phân tích sắc thái cảm xúc truyền thông (News Sentiment) và chấm điểm từ -10 (Cực kỳ Bi quan) đến +10 (Cực kỳ Lạc quan).
[OUTPUT]: 
1. Điểm Sentiment Index tổng hợp.
2. 2 Động lực tăng giá (Bullish Drivers).
3. 2 Rủi ro giảm giá (Bearish Risks).`,
    simulatedResponse: `🤖 AI RESPONSE (Phân tích Sentiment Tin Tức):

📊 SENTIMENT INDEX: +6.5 / 10 (Lạc quan vừa phải)

🟢 Bullish Drivers (Động lực tích cực):
1. Ngân hàng Nhà nước hạ lãi suất điều hành 0.5%, hỗ trợ chi phí vốn đầu vào.
2. Tăng trưởng tín dụng toàn ngành đạt 14.2%, vượt kế hoạch năm.

🔴 Bearish Risks (Rủi ro cần theo dõi):
1. Tỷ lệ nợ xấu nhóm 3-5 tăng nhẹ 0.3% tại các ngân hàng quy mô nhỏ.
2. Thị trường Trái phiếu doanh nghiệp tiếp tục chịu áp lực đáo hạn quý 3.`
  },
  {
    id: "fact-check",
    name: "Khẩu Quyết Chống 'Ảo Giác AI' (Fact-Check)",
    category: "An toàn",
    icon: AlertTriangle,
    promptText: `[CÂU LỆNH CHỐNG BỊA SỐ LIỆU]:
"Chỉ sử dụng thông tin và con số tài chính có sẵn trong tài liệu được đính kèm. 
NẾU KHÔNG CÓ TRONG TÀI LIỆU, hãy ghi rõ 'Không tìm thấy thông tin trong dữ liệu được cung cấp' thay vì tự suy đoán hoặc bịa ra con số. 
Với mỗi con số trích dẫn, hãy ghi rõ số Trang và số Dòng tương ứng."`,
    simulatedResponse: `🤖 AI RESPONSE (Chế độ An toàn 100%):

✅ Đã kích hoạt Chế độ Kiểm chứng Số liệu (Fact-checking mode).
Tất cả câu trả lời tiếp theo sẽ chỉ trích xuất từ dữ liệu gốc của bạn và luôn đính kèm vị trí [Trang, Dòng]. AI sẽ chủ động từ chối nếu dữ liệu không có sẵn!`
  }
];

export default function AiPromptSandboxWidget() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(PRESET_TEMPLATES[0]);
  const [userPromptText, setUserPromptText] = useState(PRESET_TEMPLATES[0].promptText);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const handleSelectTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setUserPromptText(template.promptText);
    setShowOutput(true);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(userPromptText);
      setCopied(true);
      toast.success("📋 Đã sao chép Prompt vào bộ nhớ tạm! Bạn có thể dán vào ChatGPT / Claude ngay.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép tự động");
    }
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsSimulating(false);
      setShowOutput(true);
      toast.success("✨ Đã chạy thử Prompt thành công!");
    }, 600);
  };

  return (
    <div className="rounded-3xl border-2 border-emerald-300 dark:border-emerald-800/80 bg-white dark:bg-stone-900 p-6 shadow-xl space-y-5 my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                AI Prompt Sandbox
              </span>
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400">Non-Tech Friendly ⚡</span>
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 mt-0.5">
              Thử Nghiệm & Sao Chép Prompt Tài Chính Thực Chiến
            </h3>
          </div>
        </div>

        <button
          onClick={handleCopyPrompt}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Đã sao chép!" : "📋 Copy Prompt Dùng Ngay"}</span>
        </button>
      </div>

      {/* Preset Category Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRESET_TEMPLATES.map((tmpl) => {
          const Icon = tmpl.icon;
          const isSelected = selectedTemplate.id === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-extrabold shadow-2xs"
                  : "border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/40 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"}`} />
              <span className="text-xs truncate">{tmpl.name}</span>
            </button>
          );
        })}
      </div>

      {/* Editor & Interactive Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Input Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-emerald-500" />
              Khung Câu Lệnh Prompt (Có Thể Chỉnh Sửa)
            </label>
            <button
              onClick={() => setUserPromptText(selectedTemplate.promptText)}
              className="text-[11px] font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Đặt lại mẫu gốc
            </button>
          </div>
          <textarea
            value={userPromptText}
            onChange={(e) => setUserPromptText(e.target.value)}
            rows={10}
            className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 p-3.5 text-xs text-stone-900 dark:text-stone-100 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
            placeholder="Nhập hoặc chỉnh sửa Prompt tài chính của bạn tại đây..."
          />
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-extrabold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? "Đang chạy thử nghiệm..." : "⚡ Chạy Thử Prompt Mô Phỏng"}</span>
          </button>
        </div>

        {/* Right Output Viewer */}
        <div className="space-y-2 flex flex-col">
          <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-500" />
            Kết Quả Mô Phỏng Từ AI
          </label>
          <div className="flex-1 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-stone-950 p-4 overflow-y-auto max-h-[300px] text-xs font-mono leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-wrap">
            {isSimulating ? (
              <div className="h-full flex items-center justify-center text-stone-400 gap-2 py-10">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                <span>AI đang phân tích và tính toán kết quả...</span>
              </div>
            ) : showOutput ? (
              selectedTemplate.simulatedResponse
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
