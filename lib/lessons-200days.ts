export type Difficulty = "Dễ" | "Trung bình" | "Khó";

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: Difficulty;
  emoji: string;
  openingQuestion: string;
  openingOptions: string[];
  correctOption: number;
  explanation: string;
  diagram: any[];
  interactiveType: string;
  realWorldExample: {
    company: string;
    description: string;
  };
  quiz: any[];
  keyTakeaways: string[];
}

// Helper function to create stub lessons for content under development
const stubLesson = (id: number, title: string, subtitle: string): Lesson => ({
  id,
  slug: title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
  title: `Tự học Tài chính Day ${id}: ${title}`,
  subtitle,
  duration: "6 phút",
  difficulty: "Dễ",
  emoji: "🔨",
  openingQuestion: "Bài này đang được xây dựng",
  openingOptions: ["Quay lại sau"],
  correctOption: 0,
  explanation: "Nội dung đang được hoàn thiện. Vui lòng quay lại sau.",
  diagram: [],
  interactiveType: "balance-sheet",
  realWorldExample: { company: "Đang xây", description: "Nội dung sắp tới" },
  quiz: [],
  keyTakeaways: ["Đang chuẩn bị"],
});

export const lessons200Days: Lesson[] = [
  // ━━━ CHẶNG 1: TƯ DUY TIỀN BẠC VÀ TÀI CHÍNH CƠ BẢN (NGÀY 1-20) ━━━
  stubLesson(1, "Tài chính là gì? Vì sao tài chính không chỉ là tiền", "Tài chính là khoa học phân bổ nguồn lực khan hiếm theo thời gian"),
  stubLesson(2, "Tiền là gì? Tiền khác tài sản như thế nào", "Tiền là phương tiện trao đổi, nhưng không phải tất cả tài sản"),
  stubLesson(3, "Thu nhập, chi phí, tiết kiệm và đầu tư", "Thu nhập bạn kiếm đi đâu: chi tiêu hay tích lũy"),
  stubLesson(4, "Dòng tiền là gì? Vì sao người giàu nhìn dòng tiền trước lợi nhuận", "Dòng tiền là máu chảy của mọi doanh nghiệp"),
  stubLesson(5, "Tài sản và tiêu sản: hiểu đúng, không cực đoan", "Điều gì là tài sản, điều gì là tiêu sản trong tài chính"),
  stubLesson(6, "Lãi suất là gì? Vì sao lãi suất ảnh hưởng mọi thứ", "Lãi suất là giá của tiền theo thời gian"),
  stubLesson(7, "Lãi đơn và lãi kép", "Sức mạnh lãi kép trong đầu tư"),
  stubLesson(8, "Sức mạnh của thời gian trong tài chính", "Thời gian là vốn của nhà đầu tư"),
  stubLesson(9, "Lạm phát là gì? Vì sao tiền mất giá", "Lạm phát và cách nó ăn mòn giá trị tiền"),
  stubLesson(10, "Giá trị thời gian của tiền: 1 triệu hôm nay khác 1 triệu năm sau", "Tại sao tiền hôm nay có giá trị hơn tiền mai"),
  stubLesson(11, "Rủi ro là gì? Không có lợi nhuận nào miễn phí", "Rủi ro và lợi nhuận kỳ vọng"),
  stubLesson(12, "Lợi nhuận kỳ vọng là gì", "Cách tính và hiểu lợi nhuận kỳ vọng"),
  stubLesson(13, "Thanh khoản là gì? Tài sản dễ bán và khó bán", "Tại sao một số tài sản dễ bán hơn"),
  stubLesson(14, "Nợ tốt và nợ xấu", "Không phải nợ nào cũng xấu"),
  stubLesson(15, "Đòn bẩy tài chính là gì", "Sử dụng nợ để khuếch đại lợi nhuận"),
  stubLesson(16, "Vì sao người vay tiền có thể giàu lên hoặc phá sản", "Đòn bẩy là con dao hai lưỡi"),
  stubLesson(17, "Cá nhân, doanh nghiệp và chính phủ quản lý tiền khác nhau ra sao", "Ba tầng của nền kinh tế tài chính"),
  stubLesson(18, "Hệ thống tài chính gồm những ai: ngân hàng, quỹ, công ty, nhà đầu tư", "Các tác nhân chính trong thị trường tài chính"),
  stubLesson(19, "Thị trường tài chính là gì", "Nơi tiền tìm thấy cơ hội, cơ hội tìm thấy tiền"),
  stubLesson(20, "Tổng ôn chặng 1: tiền, thời gian, rủi ro, dòng tiền", "Tóm tắt 10 khái niệm nền tảng"),

  // ━━━ CHẶNG 2: KỂ TOÁN NỀN TẢNG (NGÀY 21-40) ━━━
  stubLesson(21, "Kế toán là ngôn ngữ của kinh doanh", "Tại sao mọi người kinh doanh phải biết kế toán"),
  stubLesson(22, "Doanh thu là gì? Khi nào được ghi nhận doanh thu", "Revenue recognition principle"),
  stubLesson(23, "Chi phí là gì? Chi phí khác dòng tiền ra như thế nào", "Expense vs Cash Outflow"),
  stubLesson(24, "Lợi nhuận gộp, lợi nhuận hoạt động, lợi nhuận ròng", "Những tầng lợi nhuận trên Income Statement"),
  stubLesson(25, "Tài sản là gì trong kế toán", "Assets trong báo cáo tài chính"),
  stubLesson(26, "Nợ phải trả là gì", "Liabilities là những cam kết trả nợ"),
  stubLesson(27, "Vốn chủ sở hữu là gì", "Shareholders' Equity là quyền sở hữu thật sự"),
  stubLesson(28, "Công thức kế toán cơ bản: Tài sản = Nợ + Vốn chủ", "The fundamental accounting equation"),
  stubLesson(29, "Vì sao bảng cân đối kế toán luôn phải cân", "Balance Sheet luôn cân bằng"),
  stubLesson(30, "Khấu hao là gì? Vì sao mua máy móc không tính hết vào chi phí ngay", "Depreciation principle"),
  stubLesson(31, "Hàng tồn kho là gì", "Inventory trong kế toán"),
  stubLesson(32, "Khoản phải thu là gì", "Accounts Receivable"),
  stubLesson(33, "Khoản phải trả là gì", "Accounts Payable"),
  stubLesson(34, "Tiền mặt trên báo cáo tài chính", "Cash vs Accrual"),
  stubLesson(35, "Nợ ngắn hạn và nợ dài hạn", "Short-term vs Long-term Debt"),
  stubLesson(36, "Vốn lưu động là gì", "Working Capital = Current Assets - Current Liabilities"),
  stubLesson(37, "Working capital vận hành doanh nghiệp như thế nào", "Tầm quan trọng của working capital"),
  stubLesson(38, "Accrual accounting: kế toán dồn tích là gì", "Matching Principle"),
  stubLesson(39, "Cash accounting: kế toán tiền mặt là gì", "Cash basis accounting"),
  stubLesson(40, "Tổng ôn chặng 2: đọc ngôn ngữ kế toán cơ bản", "20 khái niệm kế toán thiết yếu"),

  // ━━━ CHẶNG 3: ĐỌC 3 BÁO CÁO TÀI CHÍNH (NGÀY 41-60) ━━━
  stubLesson(41, "Bộ 3 báo cáo tài chính gồm gì", "Income Statement, Balance Sheet, Cash Flow Statement"),
  stubLesson(42, "Income Statement: báo cáo kết quả kinh doanh", "Cách đọc báo cáo lợi nhuận lỗ"),
  stubLesson(43, "Revenue, COGS và Gross Profit", "Ba dòng đầu tiên của Income Statement"),
  stubLesson(44, "Operating Expense: chi phí bán hàng, quản lý, R&D", "OpEx là gì"),
  stubLesson(45, "EBIT và Operating Income", "Lợi nhuận trước lãi và thuế"),
  stubLesson(46, "Interest Expense và Tax Expense", "Lãi vay và thuế"),
  stubLesson(47, "Net Income: lợi nhuận cuối cùng có ý nghĩa gì", "Bottom line là gì"),
  stubLesson(48, "Balance Sheet: bảng cân đối kế toán", "Ảnh chụp tài chính tại một thời điểm"),
  stubLesson(49, "Current Assets và Non-current Assets", "Tài sản ngắn hạn và dài hạn"),
  stubLesson(50, "Current Liabilities và Long-term Liabilities", "Nợ ngắn hạn và dài hạn"),
  stubLesson(51, "Shareholders' Equity gồm những gì", "Vốn chủ sở hữu gồm những gì"),
  stubLesson(52, "Cash Flow Statement: báo cáo lưu chuyển tiền tệ", "Nơi tiền đi đâu"),
  stubLesson(53, "Operating Cash Flow là gì", "Tiền từ hoạt động kinh doanh"),
  stubLesson(54, "Investing Cash Flow là gì", "Tiền từ mua bán tài sản dài hạn"),
  stubLesson(55, "Financing Cash Flow là gì", "Tiền từ vay nợ và cổ tức"),
  stubLesson(56, "Vì sao công ty có lãi nhưng vẫn thiếu tiền", "Profits vs Cash"),
  stubLesson(57, "Vì sao công ty lỗ nhưng vẫn còn tiền sống tiếp", "Cash is King"),
  stubLesson(58, "Free Cash Flow là gì", "FCF = Operating CF - CapEx"),
  stubLesson(59, "Case nhỏ: đọc báo cáo tài chính Apple/Samsung/Vinamilk ở mức cơ bản", "Thực hành đọc báo cáo thực tế"),
  stubLesson(60, "Tổng ôn chặng 3: nhìn một doanh nghiệp qua 3 báo cáo", "Tóm tắt chặng 3"),

  // ━━━ CHẶNG 4: CHỈ SỐ TÀI CHÍNH CƠ BẢN (NGÀY 61-80) ━━━
  stubLesson(61, "Financial ratios là gì? Vì sao cần chỉ số", "Tại sao cần chỉ số tài chính"),
  stubLesson(62, "Gross Margin: biên lợi nhuận gộp", "Gross Profit / Revenue"),
  stubLesson(63, "Operating Margin: biên lợi nhuận hoạt động", "EBIT / Revenue"),
  stubLesson(64, "Net Profit Margin: biên lợi nhuận ròng", "Net Income / Revenue"),
  stubLesson(65, "ROA: lợi nhuận trên tài sản", "Net Income / Total Assets"),
  stubLesson(66, "ROE: lợi nhuận trên vốn chủ", "Net Income / Shareholders' Equity"),
  stubLesson(67, "ROIC: lợi nhuận trên vốn đầu tư", "Hiệu quả sử dụng vốn"),
  stubLesson(68, "Current Ratio: khả năng thanh toán ngắn hạn", "Current Assets / Current Liabilities"),
  stubLesson(69, "Quick Ratio: thanh toán nhanh", "Current Assets - Inventory / Current Liabilities"),
  stubLesson(70, "Debt-to-Equity: nợ trên vốn chủ", "Total Debt / Shareholders' Equity"),
  stubLesson(71, "Interest Coverage: khả năng trả lãi vay", "EBIT / Interest Expense"),
  stubLesson(72, "Asset Turnover: hiệu quả sử dụng tài sản", "Revenue / Total Assets"),
  stubLesson(73, "Inventory Turnover: vòng quay hàng tồn kho", "COGS / Average Inventory"),
  stubLesson(74, "Receivables Turnover: vòng quay khoản phải thu", "Revenue / Average Accounts Receivable"),
  stubLesson(75, "Cash Conversion Cycle: chu kỳ chuyển đổi tiền mặt", "DIO + DSO - DPO"),
  stubLesson(76, "EPS: lợi nhuận trên mỗi cổ phiếu", "Net Income / Number of Shares"),
  stubLesson(77, "P/E là gì", "Price / EPS"),
  stubLesson(78, "P/B là gì", "Price / Book Value per Share"),
  stubLesson(79, "EV/EBITDA là gì", "Enterprise Value / EBITDA"),
  stubLesson(80, "Tổng ôn chặng 4: dùng chỉ số để so sánh doanh nghiệp", "Tóm tắt 20 chỉ số quan trọng"),

  // ━━━ CHẶNG 5: GIÁ TRỊ THỜI GIAN CỦA TIỀN (NGÀY 81-100) ━━━
  stubLesson(81, "Present Value: giá trị hiện tại", "Tiền mai giá bao nhiêu hôm nay"),
  stubLesson(82, "Future Value: giá trị tương lai", "Tiền hôm nay giá bao nhiêu mai"),
  stubLesson(83, "Discount rate: tỷ lệ chiết khấu", "Lãi suất để chiết khấu tiền"),
  stubLesson(84, "Compounding: lãi kép trong đầu tư", "Lãi sinh lãi"),
  stubLesson(85, "Discounting: kéo tiền tương lai về hiện tại", "Quá trình ngược lại của lãi kép"),
  stubLesson(86, "Annuity: dòng tiền đều", "Dòng tiền cố định mỗi kỳ"),
  stubLesson(87, "Perpetuity: dòng tiền vĩnh viễn", "Dòng tiền mãi mãi"),
  stubLesson(88, "NPV: giá trị hiện tại ròng", "Net Present Value"),
  stubLesson(89, "IRR: tỷ suất hoàn vốn nội bộ", "Internal Rate of Return"),
  stubLesson(90, "Payback Period: thời gian hoàn vốn", "Bao lâu thì lấy lại vốn"),
  stubLesson(91, "Vì sao NPV thường tốt hơn Payback", "NPV vs Payback Period"),
  stubLesson(92, "Cost of Capital: chi phí vốn", "Giá của vốn"),
  stubLesson(93, "WACC là gì", "Weighted Average Cost of Capital"),
  stubLesson(94, "Cost of Debt: chi phí nợ", "Lãi suất vay"),
  stubLesson(95, "Cost of Equity: chi phí vốn chủ", "Lợi nhuận kỳ vọng của cổ đông"),
  stubLesson(96, "Beta là gì trong tài chính", "Độ nhạy so với thị trường"),
  stubLesson(97, "CAPM là gì", "Capital Asset Pricing Model"),
  stubLesson(98, "Risk-free rate và market risk premium", "Hai thành phần của CAPM"),
  stubLesson(99, "Case nhỏ: tính NPV một dự án đơn giản", "Thực hành NPV"),
  stubLesson(100, "Tổng ôn chặng 5: tiền tương lai đáng giá bao nhiêu hôm nay", "Tóm tắt chặng 5"),

  // ━━━ CHẶNG 6: TÀI CHÍNH DOANH NGHIỆP (NGÀY 101-120) ━━━
  stubLesson(101, "Corporate Finance là gì", "Tài chính doanh nghiệp là gì"),
  stubLesson(102, "Doanh nghiệp ra quyết định tài chính như thế nào", "Ba quyết định tài chính chính"),
  stubLesson(103, "Capital Budgeting: chọn dự án đầu tư", "Quyết định 1: Đầu tư gì"),
  stubLesson(104, "Capital Structure: cơ cấu vốn", "Quyết định 2: Vay bao nhiêu"),
  stubLesson(105, "Debt vs Equity: vay nợ hay phát hành cổ phần", "Cách tài trợ doanh nghiệp"),
  stubLesson(106, "Vì sao nợ rẻ hơn vốn chủ", "Vì sao công ty dùng nợ"),
  stubLesson(107, "Lá chắn thuế từ lãi vay", "Tax shield của nợ"),
  stubLesson(108, "Rủi ro phá sản khi dùng quá nhiều nợ", "Bankruptcy risk của nợ"),
  stubLesson(109, "Dividend: cổ tức là gì", "Quyết định 3: Chia cổ tức bao nhiêu"),
  stubLesson(110, "Share Buyback: mua lại cổ phiếu là gì", "Cách khác để trả lợi nhuận cho cổ đông"),
  stubLesson(111, "Tăng trưởng doanh nghiệp đến từ đâu", "Growth sources"),
  stubLesson(112, "Organic growth và inorganic growth", "Tăng trưởng nội sinh vs M&A"),
  stubLesson(113, "M&A là gì", "Mergers and Acquisitions"),
  stubLesson(114, "Synergy trong M&A là gì", "Lợi thế của M&A"),
  stubLesson(115, "Vì sao nhiều thương vụ M&A thất bại", "M&A risks"),
  stubLesson(116, "Unit economics: kinh tế học trên mỗi đơn vị sản phẩm", "Chi phí và doanh thu trên mỗi unit"),
  stubLesson(117, "CAC, LTV và payback trong startup", "Customer Acquisition Cost, Lifetime Value"),
  stubLesson(118, "Burn rate và runway", "Startup metrics"),
  stubLesson(119, "Case nhỏ: phân tích tài chính một startup đơn giản", "Startup finance example"),
  stubLesson(120, "Tổng ôn chặng 6: doanh nghiệp dùng tiền để tạo giá trị như thế nào", "Tóm tắt chặng 6"),

  // ━━━ CHẶNG 7: CỔ PHIẾU VÀ ĐỊNH GIÁ DOANH NGHIỆP (NGÀY 121-140) ━━━
  stubLesson(121, "Cổ phiếu là gì", "Stock là gì"),
  stubLesson(122, "Khi mua cổ phiếu, thực chất mình sở hữu gì", "Ownership in corporation"),
  stubLesson(123, "Giá cổ phiếu và giá trị doanh nghiệp khác nhau thế nào", "Price vs Value"),
  stubLesson(124, "Market Cap là gì", "Market Capitalization"),
  stubLesson(125, "Enterprise Value là gì", "EV = Market Cap + Debt - Cash"),
  stubLesson(126, "Equity Value vs Enterprise Value", "Sự khác biệt"),
  stubLesson(127, "P/E dùng khi nào", "Price to Earnings ratio"),
  stubLesson(128, "P/B dùng khi nào", "Price to Book ratio"),
  stubLesson(129, "EV/EBITDA dùng khi nào", "Enterprise Value to EBITDA"),
  stubLesson(130, "Revenue multiple dùng khi nào", "Revenue multiples"),
  stubLesson(131, "Comparable Company Analysis là gì", "Comps valuation"),
  stubLesson(132, "Precedent Transaction là gì", "Precedent M&A valuation"),
  stubLesson(133, "DCF là gì", "Discounted Cash Flow"),
  stubLesson(134, "FCFF là gì", "Free Cash Flow to Firm"),
  stubLesson(135, "FCFE là gì", "Free Cash Flow to Equity"),
  stubLesson(136, "Terminal Value là gì", "Giá trị ở cuối dự phóng"),
  stubLesson(137, "Gordon Growth Method", "Terminal Value calculation"),
  stubLesson(138, "Exit Multiple Method", "Terminal Value alternative"),
  stubLesson(139, "Sensitivity Analysis là gì", "Phân tích nhạy cảm"),
  stubLesson(140, "Case nhỏ: định giá một công ty bằng P/E và DCF đơn giản", "Valuation practice"),

  // ━━━ CHẶNG 8: TRÁI PHIẾU, LÃI SUẤT VÀ TÍN DỤNG (NGÀY 141-160) ━━━
  stubLesson(141, "Trái phiếu là gì", "Bonds"),
  stubLesson(142, "Người mua trái phiếu đang cho ai vay tiền", "Bond buyer is a lender"),
  stubLesson(143, "Coupon là gì", "Coupon payment"),
  stubLesson(144, "Face Value và Market Price", "Par value and market price"),
  stubLesson(145, "Yield là gì", "Yield on bonds"),
  stubLesson(146, "YTM: lợi suất đáo hạn", "Yield to Maturity"),
  stubLesson(147, "Vì sao giá trái phiếu giảm khi lãi suất tăng", "Inverse relationship"),
  stubLesson(148, "Duration là gì", "Bond duration"),
  stubLesson(149, "Convexity là gì", "Bond convexity"),
  stubLesson(150, "Credit Risk: rủi ro tín dụng", "Default risk"),
  stubLesson(151, "Credit rating: xếp hạng tín nhiệm", "Rating agencies"),
  stubLesson(152, "Investment Grade vs High Yield", "Bond grades"),
  stubLesson(153, "Default là gì", "Bond default"),
  stubLesson(154, "Spread là gì", "Credit spread"),
  stubLesson(155, "Treasury bond là gì", "Government bonds"),
  stubLesson(156, "Corporate bond là gì", "Company bonds"),
  stubLesson(157, "Municipal bond là gì", "Local government bonds"),
  stubLesson(158, "Yield curve là gì", "The yield curve"),
  stubLesson(159, "Case nhỏ: đọc đường cong lợi suất", "Yield curve analysis"),
  stubLesson(160, "Tổng ôn chặng 8: trái phiếu là thế giới của lãi suất và niềm tin", "Bonds summary"),

  // ━━━ CHẶNG 9: DANH MỤC ĐẦU TƯ VÀ QUẢN TRỊ RỦI RO (NGÀY 161-180) ━━━
  stubLesson(161, "Portfolio là gì", "Investment portfolio"),
  stubLesson(162, "Vì sao không nên nhìn từng khoản đầu tư riêng lẻ", "Portfolio thinking"),
  stubLesson(163, "Diversification: đa dạng hóa", "Spreading risk"),
  stubLesson(164, "Correlation: tương quan giữa tài sản", "Asset correlation"),
  stubLesson(165, "Volatility: biến động", "Price volatility"),
  stubLesson(166, "Standard Deviation trong đầu tư", "Statistical measure"),
  stubLesson(167, "Expected Return của danh mục", "Portfolio return"),
  stubLesson(168, "Risk-return tradeoff", "Quy đổi giữa rủi ro và lợi nhuận"),
  stubLesson(169, "Modern Portfolio Theory là gì", "MPT"),
  stubLesson(170, "Efficient Frontier là gì", "Efficient frontier"),
  stubLesson(171, "Sharpe Ratio là gì", "Risk-adjusted return"),
  stubLesson(172, "Alpha là gì", "Excess return"),
  stubLesson(173, "Beta trong danh mục", "Portfolio beta"),
  stubLesson(174, "Tracking Error là gì", "Deviation from benchmark"),
  stubLesson(175, "Active vs Passive Investing", "Active vs Passive"),
  stubLesson(176, "ETF là gì", "Exchange Traded Funds"),
  stubLesson(177, "Mutual Fund là gì", "Mutual funds"),
  stubLesson(178, "Hedge Fund là gì", "Hedge funds"),
  stubLesson(179, "Case nhỏ: xây danh mục 3 tài sản", "Portfolio construction"),
  stubLesson(180, "Tổng ôn chặng 9: đầu tư là quản lý rủi ro, không chỉ săn lợi nhuận", "Portfolio summary"),

  // ━━━ CHẶNG 10: PHÁI SINH VÀ CÔNG CỤ TÀI CHÍNH NÂNG CAO (NGÀY 181-200) ━━━
  stubLesson(181, "Derivatives là gì", "What are derivatives"),
  stubLesson(182, "Forward contract là gì", "Forward contracts"),
  stubLesson(183, "Futures contract là gì", "Futures contracts"),
  stubLesson(184, "Option là gì", "Options"),
  stubLesson(185, "Call option là gì", "Call options"),
  stubLesson(186, "Put option là gì", "Put options"),
  stubLesson(187, "Strike price và expiration date", "Option terms"),
  stubLesson(188, "Intrinsic Value và Time Value", "Option value components"),
  stubLesson(189, "Hedging là gì", "Risk hedging"),
  stubLesson(190, "Speculation là gì", "Speculation with derivatives"),
  stubLesson(191, "Swap là gì", "Swaps"),
  stubLesson(192, "Interest Rate Swap", "IRS"),
  stubLesson(193, "Currency Swap", "FX swap"),
  stubLesson(194, "Vì sao doanh nghiệp dùng phái sinh để phòng hộ", "Corporate hedging"),
  stubLesson(195, "Vì sao phái sinh có thể rất nguy hiểm", "Derivatives risks"),
  stubLesson(196, "Case nhỏ: hãng hàng không phòng hộ giá dầu", "Airline hedging"),
  stubLesson(197, "Case nhỏ: doanh nghiệp xuất khẩu phòng hộ tỷ giá", "Exporter FX hedging"),
  stubLesson(198, "Tổng ôn công cụ phái sinh", "Derivatives summary"),
  stubLesson(199, "Kết nối tất cả: báo cáo tài chính, định giá, rủi ro, thị trường", "Connecting all topics"),
  stubLesson(200, "Bài cuối: tự phân tích một doanh nghiệp hoàn chỉnh từ A đến Z", "Complete company analysis"),
];

// Helper function to get lesson by slug
export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons200Days.find((l) => l.slug === slug);
}

// Helper function to get lesson by ID
export function getLessonById(id: number): Lesson | undefined {
  return lessons200Days.find((l) => l.id === id);
}
