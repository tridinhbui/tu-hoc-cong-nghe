// Curated "hot" preset flashcard decks a learner can browse and import into
// their own deck in one click - static content (same pattern as
// DEFAULT_FINANCIAL_GLOSSARY in lib/supabase-flashcards.ts), no admin UI or
// extra table needed for a first version. Each album gets a gradient +
// emoji "cover" instead of an uploaded image - consistent with how mini-game
// cards and level badges already represent themselves visually elsewhere in
// this app, and it never needs asset hosting/upload plumbing.
export interface FlashcardAlbumCard {
  term: string;
  definition: string;
}

export interface FlashcardAlbum {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string; // Tailwind gradient classes for the cover
  cards: FlashcardAlbumCard[];
}

export const FLASHCARD_ALBUMS: FlashcardAlbum[] = [
  {
    id: "cfa-level-1-terms",
    title: "CFA Level I - Thuật ngữ & Công thức",
    description: "Bộ thuật ngữ En-Vi chuẩn thi CFA Level 1 (FSA, Quant, Corporate, Ethics, Equity, Derivatives...)",
    emoji: "🎓",
    gradient: "from-amber-500 via-orange-500 to-indigo-600",
    cards: [
      { term: "Return on Equity (ROE)", definition: "Net Income / Average Equity - Đo lường hiệu quả sử dụng vốn cổ đông để tạo ra lợi nhuận ròng." },
      { term: "Free Cash Flow to Firm (FCFF)", definition: "Dòng tiền tự do sẵn sàng trả cho cả chủ nợ & cổ đông sau chi phí hoạt động và đầu tư CapEx (FCFF = NI + NCC + Int(1-T) - FCInv - WCInv)." },
      { term: "DuPont Analysis (3-step)", definition: "ROE = Net Profit Margin × Asset Turnover × Financial Leverage - Phân tách ROE để tìm động lực sinh lời." },
      { term: "Time Value of Money (TVM)", definition: "Giá trị thời gian của tiền - Một đồng hôm nay luôn có giá trị hơn một đồng trong tương lai do khả năng sinh lời." },
      { term: "Capital Asset Pricing Model (CAPM)", definition: "E(R) = Rf + Beta × [E(Rm) - Rf] - Mô hình định giá tài sản vốn tính tỷ suất sinh lời đòi hỏi theo rủi ro hệ thống." },
      { term: "Weighted Average Cost of Capital (WACC)", definition: "WACC = (Wd × Rd × (1-T)) + (Wp × Rp) + (We × Re) - Chi phí vốn bình quân gia quyền tối thiểu cần đạt." },
      { term: "Ethical & Professional Standards (Code of Ethics)", definition: "Bộ quy tắc đạo đức nghề nghiệp CFA bắt buộc đối với các nhà phân tích tài chính trên toàn cầu." },
      { term: "Modigliani-Miller Theorem", definition: "Định lý MM: Trong thị trường hoàn hảo (không thuế, không chi phí phá sản), giá trị doanh nghiệp không phụ thuộc cấu trúc vốn." },
      { term: "Duration (Macaulay / Modified)", definition: "Độ nhạy giá trái phiếu trước sự thay đổi của lãi suất - Duration càng cao, giá trái phiếu càng nhạy cảm với lãi suất." },
      { term: "Sharpe Ratio", definition: "(Rp - Rf) / StdDev(p) - Tỷ số đo lường hiệu quả đầu tư trên một đơn vị rủi ro tổng thể." },
    ],
  },
  {
    id: "ke-toan-co-ban",
    title: "Kế toán cơ bản",
    description: "Thuật ngữ nền tảng để đọc hiểu 3 báo cáo tài chính",
    emoji: "📊",
    gradient: "from-sky-500 to-blue-600",
    cards: [
      { term: "Tài sản (Assets)", definition: "Những gì doanh nghiệp sở hữu và có giá trị kinh tế - tiền mặt, hàng tồn kho, tài sản cố định..." },
      { term: "Nợ phải trả (Liabilities)", definition: "Nghĩa vụ tài chính doanh nghiệp phải thanh toán cho bên khác trong tương lai." },
      { term: "Vốn chủ sở hữu (Equity)", definition: "Phần tài sản còn lại thuộc về chủ sở hữu sau khi trừ hết nợ phải trả." },
      { term: "Doanh thu (Revenue)", definition: "Giá trị hàng hóa/dịch vụ đã cung cấp cho khách hàng, ghi nhận khi hoàn thành nghĩa vụ, không phải khi nhận tiền." },
      { term: "Giá vốn hàng bán (COGS)", definition: "Chi phí trực tiếp để sản xuất/mua hàng hóa đã bán trong kỳ." },
      { term: "Lợi nhuận gộp (Gross Profit)", definition: "Doanh thu trừ giá vốn hàng bán - đo hiệu quả sản xuất/kinh doanh cốt lõi." },
      { term: "Khấu hao (Depreciation)", definition: "Phân bổ dần giá trị tài sản cố định thành chi phí qua nhiều kỳ, phản ánh hao mòn theo thời gian." },
      { term: "Dòng tiền (Cash Flow)", definition: "Số tiền thực tế ra/vào doanh nghiệp - khác với lợi nhuận kế toán vì không phụ thuộc nguyên tắc dồn tích." },
      { term: "Vốn lưu động (Working Capital)", definition: "Tài sản ngắn hạn trừ nợ ngắn hạn - đo khả năng thanh toán các nghĩa vụ gần hạn." },
      { term: "EBITDA", definition: "Lợi nhuận trước lãi vay, thuế, khấu hao - dùng để so sánh hiệu quả vận hành giữa các công ty có cấu trúc vốn khác nhau." },
    ],
  },
  {
    id: "dinh-gia-dau-tu",
    title: "Định giá & Đầu tư",
    description: "Bộ công cụ dân đầu tư nào cũng cần thuộc nằm lòng",
    emoji: "💹",
    gradient: "from-emerald-500 to-teal-600",
    cards: [
      { term: "P/E (Price-to-Earnings)", definition: "Giá cổ phiếu chia lợi nhuận mỗi cổ phần - đo thị trường đang trả bao nhiêu cho mỗi đồng lợi nhuận." },
      { term: "P/B (Price-to-Book)", definition: "Giá cổ phiếu chia giá trị sổ sách mỗi cổ phần - so sánh giá thị trường với giá trị tài sản ròng." },
      { term: "NPV (Net Present Value)", definition: "Giá trị hiện tại ròng của dòng tiền tương lai trừ chi phí đầu tư ban đầu - dương nghĩa là khoản đầu tư sinh lời." },
      { term: "IRR (Internal Rate of Return)", definition: "Tỷ suất chiết khấu làm NPV bằng 0 - tỷ suất sinh lời thực tế của khoản đầu tư." },
      { term: "WACC", definition: "Chi phí vốn bình quân gia quyền - mức sinh lời tối thiểu cần đạt để làm hài lòng cả chủ nợ và cổ đông." },
      { term: "Dòng tiền tự do (FCF)", definition: "Tiền mặt còn lại sau khi trừ chi phí đầu tư (CapEx) - phần doanh nghiệp thực sự tự do sử dụng." },
      { term: "ROE (Return on Equity)", definition: "Lợi nhuận ròng trên vốn chủ sở hữu - đo hiệu quả sinh lời trên tiền của cổ đông." },
      { term: "ROIC", definition: "Lợi nhuận trên vốn đầu tư - đo hiệu quả sử dụng toàn bộ vốn (nợ + vốn chủ) để tạo ra lợi nhuận." },
      { term: "Đa dạng hóa (Diversification)", definition: "Phân bổ vốn vào nhiều tài sản không tương quan để giảm rủi ro tổng thể của danh mục." },
      { term: "Beta", definition: "Đo mức biến động của một cổ phiếu so với thị trường chung - beta > 1 nghĩa là biến động mạnh hơn thị trường." },
    ],
  },
  {
    id: "chi-so-tai-chinh-hot",
    title: "Chỉ số tài chính hot",
    description: "Các tỷ số nhà phân tích dùng để chấm điểm một doanh nghiệp",
    emoji: "🧮",
    gradient: "from-amber-500 to-orange-600",
    cards: [
      { term: "Current Ratio", definition: "Tài sản ngắn hạn / Nợ ngắn hạn - đo khả năng thanh toán nợ ngắn hạn bằng tài sản dễ chuyển đổi." },
      { term: "Quick Ratio", definition: "(Tài sản ngắn hạn - Hàng tồn kho) / Nợ ngắn hạn - thước đo thanh khoản chặt chẽ hơn Current Ratio." },
      { term: "Debt-to-Equity", definition: "Tổng nợ / Vốn chủ sở hữu - đo mức độ doanh nghiệp dùng đòn bẩy tài chính." },
      { term: "Interest Coverage", definition: "EBIT / Chi phí lãi vay - đo khả năng trả lãi vay từ lợi nhuận hoạt động." },
      { term: "Vòng quay hàng tồn kho", definition: "Giá vốn hàng bán / Hàng tồn kho bình quân - đo tốc độ luân chuyển hàng hóa." },
      { term: "Vòng quay khoản phải thu", definition: "Doanh thu / Khoản phải thu bình quân - đo tốc độ thu tiền từ khách hàng." },
      { term: "Biên lợi nhuận ròng (Net Margin)", definition: "Lợi nhuận ròng / Doanh thu - phần trăm doanh thu thực sự trở thành lợi nhuận sau cùng." },
      { term: "Dupont Analysis", definition: "Phân tách ROE thành 3 cấu phần: biên lợi nhuận, vòng quay tài sản, đòn bẩy tài chính - để biết ROE đến từ đâu." },
    ],
  },
  {
    id: "tai-chinh-ca-nhan",
    title: "Tài chính cá nhân",
    description: "Nền tảng để quản lý tiền của chính mình trước khi đầu tư",
    emoji: "💰",
    gradient: "from-violet-500 to-purple-600",
    cards: [
      { term: "Quỹ khẩn cấp (Emergency Fund)", definition: "Khoản tiết kiệm đủ 3-6 tháng chi phí sinh hoạt, dùng cho tình huống bất ngờ (mất việc, ốm đau)." },
      { term: "Lãi kép (Compound Interest)", definition: "Lãi tính trên cả gốc lẫn lãi tích lũy trước đó - càng để lâu, tốc độ tăng trưởng càng nhanh." },
      { term: "Nợ tốt vs Nợ xấu", definition: "Nợ tốt tạo ra tài sản/thu nhập trong tương lai (vay mua nhà, học phí); nợ xấu chỉ phục vụ tiêu dùng và mất giá ngay." },
      { term: "Quy tắc 50/30/20", definition: "Phân bổ thu nhập: 50% nhu cầu thiết yếu, 30% mong muốn cá nhân, 20% tiết kiệm/trả nợ." },
      { term: "Lạm phát (Inflation)", definition: "Mức giá hàng hóa tăng theo thời gian, làm giảm sức mua của cùng một số tiền." },
      { term: "Đa dạng hóa thu nhập", definition: "Có nhiều nguồn thu nhập độc lập thay vì chỉ phụ thuộc một nguồn duy nhất, giảm rủi ro tài chính cá nhân." },
    ],
  },
];

export function getFlashcardAlbumById(id: string): FlashcardAlbum | undefined {
  return FLASHCARD_ALBUMS.find((a) => a.id === id);
}
