import { FormulaVariable, FormulaExample } from "@/components/FormulaBlock";

export interface CfaFormulaItem {
  id: string;
  subjectId: "quant" | "fsa" | "corporate" | "equity" | "fixedIncome" | "derivatives" | "portfolio" | "economics" | "ethics" | "alternatives";
  title: string;
  label?: string;
  badge?: string;
  numerator?: string;
  denominator?: string;
  multiplier?: string;
  equation?: string;
  variables?: FormulaVariable[];
  example?: FormulaExample;
}

export const CFA_FORMULAS_DATA: CfaFormulaItem[] = [
  // 1. QUANTITATIVE METHODS
  {
    id: "q-001",
    subjectId: "quant",
    title: "Giá Trị Tương Lai của Tiền (Future Value - TVM)",
    badge: "Quant • TVM",
    equation: "FV = PV × (1 + r)^n",
    variables: [
      { symbol: "FV", name: "Giá trị tương lai (Future Value)" },
      { symbol: "PV", name: "Giá trị hiện tại (Present Value)" },
      { symbol: "r", name: "Lãi suất chiết khấu theo kỳ (Discount Rate)" },
      { symbol: "n", name: "Số kỳ đầu tư (Number of Periods)" },
    ],
    example: {
      title: "Ví dụ tính TVM",
      calculation: "PV = 100M, r = 8%/năm, n = 3 năm -> FV = 100 × (1 + 0.08)^3",
      result: "125.97 Triệu VNĐ",
      explanation: "Gửi 100 triệu sau 3 năm với lãi suất kép 8%/năm thu về 125.97 triệu.",
    },
  },
  {
    id: "q-002",
    subjectId: "quant",
    title: "Hệ Số Sharpe (Sharpe Ratio)",
    badge: "Quant • Risk",
    numerator: "Tỷ suất sinh lời danh mục (Rp) - Lãi suất phi rủi ro (Rf)",
    denominator: "Độ lệch chuẩn danh mục (σp)",
    variables: [
      { symbol: "Rp", name: "Portfolio Return" },
      { symbol: "Rf", name: "Risk-free Rate (Lãi suất trái phiếu chính phủ)" },
      { symbol: "σp", name: "Standard Deviation (Độ lệch chuẩn rủi ro)" },
    ],
    example: {
      calculation: "(15% - 4%) / 10%",
      result: "1.10",
      explanation: "Mỗi 1% rủi ro gánh chịu mang lại 1.10% lợi nhuận vượt trội.",
    },
  },

  // 2. FINANCIAL STATEMENT ANALYSIS (FSA)
  {
    id: "fsa-001",
    subjectId: "fsa",
    title: "Tỷ Suất Lợi Nhuận Trên Vốn Chủ Sở Hữu (ROE)",
    badge: "FSA • Profitability",
    numerator: "Lợi nhuận ròng (Net Income)",
    denominator: "Vốn chủ sở hữu bình quân (Average Equity)",
    multiplier: "100%",
    variables: [
      { symbol: "Net Income", name: "Lợi nhuận sau thuế của cổ đông" },
      { symbol: "Average Equity", name: "(Vốn CSH đầu kỳ + cuối kỳ) / 2" },
    ],
    example: {
      calculation: "(150 tỷ / 1,000 tỷ) × 100%",
      result: "15.0%",
    },
  },
  {
    id: "fsa-002",
    subjectId: "fsa",
    title: "Phân Tích DuPont 3 Bước (DuPont 3-Step)",
    badge: "FSA • DuPont",
    equation: "ROE = Net Profit Margin × Asset Turnover × Financial Leverage",
    variables: [
      { symbol: "Net Profit Margin", name: "Net Income / Revenue (Biên lợi nhuận ròng)" },
      { symbol: "Asset Turnover", name: "Revenue / Average Total Assets (Vòng quay tài sản)" },
      { symbol: "Financial Leverage", name: "Average Total Assets / Average Equity (Đòn bẩy tài chính)" },
    ],
    example: {
      calculation: "10% (NPM) × 1.2 (Asset Turnover) × 1.5 (Leverage)",
      result: "18.0% ROE",
    },
  },
  {
    id: "fsa-003",
    subjectId: "fsa",
    title: "Phân Tích DuPont 5 Bước (DuPont 5-Step)",
    badge: "FSA • DuPont",
    equation: "ROE = Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Financial Leverage",
    variables: [
      { symbol: "Tax Burden", name: "Net Income / EBT" },
      { symbol: "Interest Burden", name: "EBT / EBIT" },
      { symbol: "EBIT Margin", name: "EBIT / Revenue" },
      { symbol: "Asset Turnover", name: "Revenue / Average Total Assets" },
      { symbol: "Financial Leverage", name: "Average Assets / Average Equity" },
    ],
  },
  {
    id: "fsa-004",
    subjectId: "fsa",
    title: "Dòng Tiền Tự Do Cho Doanh Nghiệp (FCFF)",
    badge: "FSA • Cash Flow",
    equation: "FCFF = NI + NCC + Int(1 - T) - FCInv - WCInv",
    variables: [
      { symbol: "NI", name: "Net Income" },
      { symbol: "NCC", name: "Non-Cash Charges (Khấu hao & Chi phí phi tiền mặt)" },
      { symbol: "Int", name: "Interest Expense (Chi phí lãi vay)" },
      { symbol: "T", name: "Tax Rate (Thuế suất)" },
      { symbol: "FCInv", name: "Capital Expenditures (Chi đầu tư TSCĐ)" },
      { symbol: "WCInv", name: "Working Capital Investment (Tăng giảm vốn lưu động)" },
    ],
  },
  {
    id: "fsa-005",
    subjectId: "fsa",
    title: "Dòng Tiền Tự Do Cho Cổ Đông (FCFE)",
    badge: "FSA • Cash Flow",
    equation: "FCFE = CFO - FCInv + Net Borrowing",
    variables: [
      { symbol: "CFO", name: "Cash Flow from Operations (Dòng tiền thuần từ hoạt động kinh doanh)" },
      { symbol: "FCInv", name: "Capital Expenditures (Chi đầu tư TSCĐ)" },
      { symbol: "Net Borrowing", name: "Nợ vay mới phát hành - Nợ vay trả gốc" },
    ],
  },

  // 3. CORPORATE ISSUERS
  {
    id: "corp-001",
    subjectId: "corporate",
    title: "Chi Phí Sử Dụng Vốn Bình Quân Gia Quyền (WACC)",
    badge: "Corporate • WACC",
    equation: "WACC = (Wd × Rd × (1 - Tc)) + (Wp × Rp) + (We × Re)",
    variables: [
      { symbol: "Wd, Wp, We", name: "Tỷ trọng vốn Nợ, Cổ phần ưu đãi, Cổ phần phổ thông" },
      { symbol: "Rd", name: "Chi phí sử dụng nợ vay trước thuế" },
      { symbol: "Tc", name: "Thuế suất thuế TNDN" },
      { symbol: "Re", name: "Chi phí sử dụng vốn cổ phần phổ thông" },
    ],
    example: {
      calculation: "(40% × 8% × (1 - 20%)) + (60% × 12%)",
      result: "9.76% WACC",
    },
  },
  {
    id: "corp-002",
    subjectId: "corporate",
    title: "Giá Trị Hiện Tại Ròng (NPV)",
    badge: "Corporate • Capital Budgeting",
    equation: "NPV = Σ [CFt / (1 + r)^t] - Initial Outlay",
    variables: [
      { symbol: "CFt", name: "Dòng tiền ròng tại năm t" },
      { symbol: "r", name: "Chiết khấu rủi ro (WACC)" },
      { symbol: "Initial Outlay", name: "Chi phí đầu tư ban đầu" },
    ],
  },

  // 4. EQUITY INVESTMENTS
  {
    id: "eq-001",
    subjectId: "equity",
    title: "Mô Hình Chiết Khấu Cổ Tức Gordon (Gordon Growth DDM)",
    badge: "Equity • Valuation",
    numerator: "Cổ tức dự kiến năm tới (D1 = D0 × (1 + g))",
    denominator: "Tỷ suất sinh lời yêu cầu (r) - Tốc độ tăng trưởng cổ tức (g)",
    variables: [
      { symbol: "D0", name: "Cổ tức vừa trả kỳ gần nhất" },
      { symbol: "g", name: "Tốc độ tăng trưởng cổ tức dài hạn" },
      { symbol: "r", name: "Required return on equity (CAPM)" },
    ],
    example: {
      calculation: "(2,000 × (1 + 0.05)) / (0.12 - 0.05)",
      result: "30,000 VNĐ / Cổ phiếu",
    },
  },
  {
    id: "eq-002",
    subjectId: "equity",
    title: "Tốc Độ Tăng Trưởng Bền Vững (Sustainable Growth Rate - g)",
    badge: "Equity • Valuation",
    equation: "g = ROE × b",
    variables: [
      { symbol: "ROE", name: "Return on Equity" },
      { symbol: "b", name: "Retention Rate (Tỷ lệ giữ lại lợi nhuận = 1 - Payout Ratio)" },
    ],
  },

  // 5. FIXED INCOME
  {
    id: "fi-001",
    subjectId: "fixedIncome",
    title: "Thời Lượng Điều Chỉnh (Modified Duration)",
    badge: "Fixed Income • Risk",
    numerator: "Macaulay Duration",
    denominator: "1 + Yield per Period",
    variables: [
      { symbol: "ModDur", name: "Độ nhạy phần trăm giá trái phiếu khi lãi suất thay đổi 1%" },
    ],
    example: {
      calculation: "Macaulay Duration = 5.2 năm, YTM = 5% -> ModDur = 5.2 / 1.05",
      result: "4.95 năm",
      explanation: "Nếu YTM tăng 1%, giá trái phiếu giảm khoảng 4.95%.",
    },
  },
  {
    id: "fi-002",
    subjectId: "fixedIncome",
    title: "Phần Trăm Thay Đổi Giá Trái Phiếu (Duration & Convexity)",
    badge: "Fixed Income • Risk",
    equation: "ΔP/P ≈ -ModDur × ΔYTM + [0.5 × Convexity × (ΔYTM)^2]",
  },

  // 6. PORTFOLIO MANAGEMENT
  {
    id: "port-001",
    subjectId: "portfolio",
    title: "Mô Hình Định Giá Tài Sản Vốn (CAPM)",
    badge: "Portfolio • CAPM",
    equation: "E(Ri) = Rf + βi × [E(Rm) - Rf]",
    variables: [
      { symbol: "Rf", name: "Risk-free rate" },
      { symbol: "βi", name: "Hệ số Beta (Rủi ro hệ thống của cổ phiếu i)" },
      { symbol: "E(Rm) - Rf", name: "Market Risk Premium (Phần bù rủi ro thị trường)" },
    ],
    example: {
      calculation: "Rf = 4%, Beta = 1.2, E(Rm) = 11% -> 4% + 1.2 × (11% - 4%)",
      result: "12.4%",
    },
  },

  // 7. DERIVATIVES
  {
    id: "der-001",
    subjectId: "derivatives",
    title: "Quan Hệ Năng Giá Quyền Chọn Mua - Bán (Put-Call Parity)",
    badge: "Derivatives • Options",
    equation: "C + K / (1 + r)^T = P + S0",
    variables: [
      { symbol: "C", name: "Giá quyền chọn mua (Call Price)" },
      { symbol: "P", name: "Giá quyền chọn bán (Put Price)" },
      { symbol: "K", name: "Giá thực hiện (Strike Price)" },
      { symbol: "S0", name: "Giá tài sản cơ sở hôm nay (Spot Price)" },
    ],
  },

  // ── DERIVATIVES (bổ sung) ────────────────────────────────────────────────
  {
    id: "der-002",
    subjectId: "derivatives",
    title: "Giá Kỳ Hạn của Tài Sản Không Sinh Lợi Tức",
    badge: "Derivatives • Forward",
    equation: "F0 = S0 × (1 + r)^T",
    variables: [
      { symbol: "F0", name: "Giá kỳ hạn thỏa thuận hôm nay" },
      { symbol: "S0", name: "Giá giao ngay hiện tại" },
      { symbol: "r", name: "Lãi suất phi rủi ro" },
      { symbol: "T", name: "Thời gian tới đáo hạn (năm)" },
    ],
    example: {
      calculation: "S0 = 100, r = 5%, T = 1 -> F0 = 100 × 1.05",
      result: "105",
      explanation: "Giá kỳ hạn không phải dự báo giá tương lai - nó chỉ là giá giao ngay cộng chi phí giữ tài sản tới đáo hạn.",
    },
  },
  {
    id: "der-003",
    subjectId: "derivatives",
    title: "Giá Kỳ Hạn Khi Tài Sản Có Lợi Tức",
    badge: "Derivatives • Forward",
    equation: "F0 = (S0 - PV(I)) × (1 + r)^T",
    variables: [
      { symbol: "PV(I)", name: "Hiện giá của lợi tức nhận được trước đáo hạn" },
      { symbol: "S0", name: "Giá giao ngay" },
      { symbol: "r", name: "Lãi suất phi rủi ro" },
      { symbol: "T", name: "Thời gian tới đáo hạn" },
    ],
    example: {
      calculation: "S0 = 100, PV cổ tức = 2, r = 5%, T = 1",
      result: "102.90",
      explanation: "Lợi tức thuộc về người nắm tài sản chứ không thuộc bên mua kỳ hạn, nên nó bị trừ khỏi giá kỳ hạn.",
    },
  },
  {
    id: "der-004",
    subjectId: "derivatives",
    title: "Giá Trị Hợp Đồng Kỳ Hạn Trước Đáo Hạn",
    badge: "Derivatives • Forward",
    equation: "Vt = (Ft - F0) / (1 + r)^(T-t)",
    variables: [
      { symbol: "Vt", name: "Giá trị hợp đồng với bên mua tại thời điểm t" },
      { symbol: "Ft", name: "Giá kỳ hạn hiện hành cho cùng ngày đáo hạn" },
      { symbol: "F0", name: "Giá kỳ hạn đã khóa lúc ký" },
    ],
    example: {
      calculation: "Ft = 110, F0 = 105, r = 5%, còn 0.5 năm",
      result: "4.88",
      explanation: "Hợp đồng kỳ hạn có giá trị bằng 0 lúc ký, rồi lệch dần khi giá kỳ hạn hiện hành rời khỏi mức đã khóa.",
    },
  },
  {
    id: "der-005",
    subjectId: "derivatives",
    title: "Giá Trị Nội Tại của Quyền Chọn",
    badge: "Derivatives • Options",
    equation: "Call: max(S - X, 0)   |   Put: max(X - S, 0)",
    variables: [
      { symbol: "S", name: "Giá tài sản cơ sở hiện tại" },
      { symbol: "X", name: "Giá thực hiện (strike)" },
    ],
    example: {
      calculation: "S = 120, X = 100 -> Call = max(20, 0); Put = max(-20, 0)",
      result: "Call 20, Put 0",
      explanation: "Giá trị nội tại không bao giờ âm - người nắm quyền chọn có quyền không thực hiện, nên phần bất lợi dừng ở 0.",
    },
  },
  {
    id: "der-006",
    subjectId: "derivatives",
    title: "Giá Trị Thời Gian của Quyền Chọn",
    badge: "Derivatives • Options",
    equation: "Giá quyền chọn = Giá trị nội tại + Giá trị thời gian",
    variables: [
      { symbol: "Giá trị thời gian", name: "Phần trả cho khả năng giá cơ sở còn dịch chuyển có lợi trước đáo hạn" },
    ],
    example: {
      calculation: "Call giá 25, S = 120, X = 100 -> nội tại 20",
      result: "Giá trị thời gian = 5",
      explanation: "Giá trị thời gian giảm dần về 0 khi tới đáo hạn, và giảm nhanh nhất ở giai đoạn cuối.",
    },
  },
  {
    id: "der-007",
    subjectId: "derivatives",
    title: "Lãi Suất Cố Định của Hợp Đồng Hoán Đổi Lãi Suất",
    badge: "Derivatives • Swaps",
    numerator: "1 - Hệ số chiết khấu kỳ cuối",
    denominator: "Tổng các hệ số chiết khấu của mọi kỳ thanh toán",
    variables: [
      { symbol: "Hệ số chiết khấu", name: "Hiện giá của 1 đồng nhận ở mỗi kỳ" },
    ],
    example: {
      calculation: "Hệ số: 0.97, 0.94, 0.90 -> (1 - 0.90) / 2.81",
      result: "3.56%",
      explanation: "Lãi suất cố định của swap là mức làm hiện giá hai vế bằng nhau, nên giá trị swap lúc ký luôn bằng 0.",
    },
  },

  // ── ECONOMICS ────────────────────────────────────────────────────────────
  {
    id: "econ-001",
    subjectId: "economics",
    title: "Quan Hệ Fisher - Lãi Suất Thực và Danh Nghĩa",
    badge: "Econ • Lãi suất",
    equation: "(1 + i) = (1 + r) × (1 + π)   ≈   i ≈ r + π",
    variables: [
      { symbol: "i", name: "Lãi suất danh nghĩa" },
      { symbol: "r", name: "Lãi suất thực" },
      { symbol: "π", name: "Lạm phát kỳ vọng" },
    ],
    example: {
      calculation: "i = 8%, π = 5% -> r = 1.08/1.05 - 1",
      result: "2.86%",
      explanation: "Phép cộng trừ xấp xỉ cho 3%; công thức nhân cho 2.86%. Chênh lệch lớn dần khi lạm phát cao.",
    },
  },
  {
    id: "econ-002",
    subjectId: "economics",
    title: "Ngang Giá Lãi Suất Có Bảo Hiểm (Covered Interest Rate Parity)",
    badge: "Econ • Tỷ giá",
    equation: "F/S = (1 + i_nội tệ) / (1 + i_ngoại tệ)",
    variables: [
      { symbol: "F", name: "Tỷ giá kỳ hạn" },
      { symbol: "S", name: "Tỷ giá giao ngay" },
      { symbol: "i", name: "Lãi suất tương ứng mỗi đồng tiền" },
    ],
    example: {
      calculation: "S = 25,000, i_VND = 5%, i_USD = 2% -> F = 25,000 × 1.05/1.02",
      result: "25,735",
      explanation: "Tỷ giá kỳ hạn phản ánh chênh lệch lãi suất, không phải dự báo tỷ giá tương lai.",
    },
  },
  {
    id: "econ-003",
    subjectId: "economics",
    title: "Ngang Giá Sức Mua Tương Đối",
    badge: "Econ • Tỷ giá",
    equation: "%ΔS ≈ π_nội tệ - π_ngoại tệ",
    variables: [
      { symbol: "%ΔS", name: "Phần trăm thay đổi tỷ giá" },
      { symbol: "π", name: "Lạm phát của mỗi nền kinh tế" },
    ],
    example: {
      calculation: "π_VN = 4%, π_Mỹ = 2% -> VND mất giá khoảng 2%/năm",
      result: "≈ 2%",
      explanation: "Đây là neo dài hạn của tỷ giá; trong ngắn hạn dòng vốn chi phối mạnh hơn nhiều.",
    },
  },
  {
    id: "econ-004",
    subjectId: "economics",
    title: "Tỷ Giá Thực",
    badge: "Econ • Tỷ giá",
    equation: "Tỷ giá thực = Tỷ giá danh nghĩa × (P_ngoại / P_nội)",
    variables: [
      { symbol: "P", name: "Mặt bằng giá của mỗi nền kinh tế" },
    ],
    example: {
      calculation: "Danh nghĩa tăng 5%, giá trong nước tăng 6%, nước ngoài 2%",
      result: "Tỷ giá thực gần như không đổi",
      explanation: "Tỷ giá thực mới quyết định sức cạnh tranh hàng xuất khẩu, không phải con số danh nghĩa.",
    },
  },
  {
    id: "econ-005",
    subjectId: "economics",
    title: "Độ Co Giãn của Cầu Theo Giá",
    badge: "Econ • Cung cầu",
    numerator: "Phần trăm thay đổi lượng cầu",
    denominator: "Phần trăm thay đổi giá",
    variables: [
      { symbol: "|E| > 1", name: "Cầu co giãn - giảm giá làm tăng tổng doanh thu" },
      { symbol: "|E| < 1", name: "Cầu ít co giãn - tăng giá làm tăng tổng doanh thu" },
    ],
    example: {
      calculation: "Giá tăng 10%, lượng cầu giảm 25% -> E = -2.5",
      result: "Co giãn",
      explanation: "Doanh nghiệp có cầu ít co giãn mới có quyền định giá; đó là điều nhà phân tích tìm khi đánh giá lợi thế cạnh tranh.",
    },
  },
  {
    id: "econ-006",
    subjectId: "economics",
    title: "Số Nhân Tiền",
    badge: "Econ • Tiền tệ",
    numerator: "1",
    denominator: "Tỷ lệ dự trữ bắt buộc",
    variables: [
      { symbol: "Tỷ lệ dự trữ bắt buộc", name: "Phần tiền gửi ngân hàng phải giữ lại" },
    ],
    example: {
      calculation: "Tỷ lệ dự trữ 10% -> số nhân = 1/0.10",
      result: "10 lần",
      explanation: "Đây là mức trần lý thuyết; số nhân thực tế thấp hơn vì ngân hàng giữ dự trữ vượt mức và người dân giữ tiền mặt.",
    },
  },
  {
    id: "econ-007",
    subjectId: "economics",
    title: "GDP Deflator",
    badge: "Econ • Sản lượng",
    numerator: "GDP danh nghĩa",
    denominator: "GDP thực",
    multiplier: "× 100",
    variables: [
      { symbol: "GDP danh nghĩa", name: "Tính theo giá hiện hành" },
      { symbol: "GDP thực", name: "Tính theo giá năm gốc" },
    ],
    example: {
      calculation: "GDP danh nghĩa 110, GDP thực 100",
      result: "110",
      explanation: "Khác CPI ở chỗ deflator bao trùm mọi hàng hóa sản xuất trong nước, còn CPI chỉ theo rổ tiêu dùng cố định.",
    },
  },

  // ── ALTERNATIVE INVESTMENTS ──────────────────────────────────────────────
  {
    id: "alt-001",
    subjectId: "alternatives",
    title: "Lợi Nhuận Vận Hành Ròng và Giá Trị Bất Động Sản",
    badge: "Alt • Bất động sản",
    numerator: "NOI (Lợi nhuận vận hành ròng)",
    denominator: "Cap Rate",
    variables: [
      { symbol: "NOI", name: "Doanh thu cho thuê trừ chi phí vận hành, chưa trừ lãi vay và thuế" },
      { symbol: "Cap Rate", name: "Lợi suất thị trường đòi hỏi cho tài sản đó" },
    ],
    example: {
      calculation: "NOI = 700 triệu, cap rate 7%",
      result: "10 tỷ",
      explanation: "Cap rate nằm ở mẫu số nên quan hệ là nghịch: lãi suất tăng đẩy cap rate lên và kéo giá trị xuống dù tiền thuê không đổi.",
    },
  },
  {
    id: "alt-002",
    subjectId: "alternatives",
    title: "Bội Số Vốn Đầu Tư (MOIC)",
    badge: "Alt • Private Equity",
    numerator: "Tổng giá trị đã phân phối + Giá trị còn lại",
    denominator: "Tổng vốn đã gọi",
    variables: [
      { symbol: "MOIC", name: "Multiple on Invested Capital - bao nhiêu lần vốn gốc" },
    ],
    example: {
      calculation: "Phân phối 150, còn lại 90, vốn gọi 100",
      result: "2.4x",
      explanation: "MOIC bỏ qua yếu tố thời gian, nên luôn phải đọc cùng IRR - 2.4x trong 4 năm khác hẳn 2.4x trong 12 năm.",
    },
  },
  {
    id: "alt-003",
    subjectId: "alternatives",
    title: "DPI, RVPI và TVPI của Quỹ PE/VC",
    badge: "Alt • Private Equity",
    equation: "DPI = Đã phân phối / Vốn gọi   |   RVPI = Giá trị còn lại / Vốn gọi   |   TVPI = DPI + RVPI",
    variables: [
      { symbol: "DPI", name: "Tiền đã thực về tay nhà đầu tư" },
      { symbol: "RVPI", name: "Phần còn nằm trong quỹ, mới chỉ là định giá" },
      { symbol: "TVPI", name: "Tổng hai phần trên" },
    ],
    example: {
      calculation: "DPI = 1.5, RVPI = 0.9",
      result: "TVPI = 2.4",
      explanation: "DPI là tiền thật, RVPI là con số do chính GP định giá - nên một quỹ TVPI cao mà DPI thấp vẫn chưa chứng minh được gì.",
    },
  },
  {
    id: "alt-004",
    subjectId: "alternatives",
    title: "Phí Hiệu Suất Với Ngưỡng và High-Water Mark",
    badge: "Alt • Phí quỹ",
    equation: "Phí hiệu suất = Tỷ lệ chia × max(0, NAV cuối kỳ - max(High-water mark, NAV đầu kỳ × (1 + ngưỡng)))",
    variables: [
      { symbol: "High-water mark", name: "Đỉnh NAV cao nhất từng đạt, chặn thu phí hai lần trên cùng khoản lãi" },
      { symbol: "Ngưỡng", name: "Mức lợi nhuận tối thiểu trước khi được chia" },
    ],
    example: {
      calculation: "NAV 100 -> 120, ngưỡng 8%, chia 20% -> 20% × (120 - 108)",
      result: "2.4",
      explanation: "Không có high-water mark thì một quỹ lãi rồi lỗ rồi lãi lại vẫn thu phí hai lần trong khi nhà đầu tư gần như hòa vốn.",
    },
  },
  {
    id: "alt-005",
    subjectId: "alternatives",
    title: "Tỷ Suất Trên Vốn Tự Có Của Bất Động Sản Có Vay",
    badge: "Alt • Đòn bẩy",
    numerator: "NOI - Chi phí lãi vay",
    denominator: "Vốn tự có đã bỏ ra",
    variables: [
      { symbol: "NOI", name: "Lợi nhuận vận hành ròng" },
      { symbol: "Vốn tự có", name: "Giá mua trừ phần vay ngân hàng" },
    ],
    example: {
      calculation: "NOI 700tr, lãi vay 480tr, vốn tự có 3 tỷ",
      result: "7.33%",
      explanation: "Đòn bẩy chỉ khuếch đại lợi nhuận khi cap rate cao hơn lãi vay; ngược lại thì mỗi đồng vay thêm làm dòng tiền xấu đi.",
    },
  },
  {
    id: "alt-006",
    subjectId: "alternatives",
    title: "Tỷ Số Bao Phủ Nợ (DSCR)",
    badge: "Alt • Bất động sản",
    numerator: "NOI",
    denominator: "Tổng nghĩa vụ trả nợ trong năm",
    variables: [
      { symbol: "DSCR < 1", name: "Tài sản không tự nuôi nổi khoản vay" },
      { symbol: "DSCR ≥ 1.2", name: "Mức đệm ngân hàng tài trợ dự án thường đòi hỏi" },
    ],
    example: {
      calculation: "NOI 700tr, nghĩa vụ nợ 820tr",
      result: "0.85",
      explanation: "Dưới 1 nghĩa là mỗi năm chủ tài sản phải bù thêm từ nguồn khác - và đó là lúc một quý trống khách trở thành khủng hoảng.",
    },
  },

  // ── PORTFOLIO MANAGEMENT (bổ sung) ───────────────────────────────────────
  {
    id: "port-002",
    subjectId: "portfolio",
    title: "Phương Sai Danh Mục Hai Tài Sản",
    badge: "Portfolio • Rủi ro",
    equation: "σp² = w1²σ1² + w2²σ2² + 2·w1·w2·ρ·σ1·σ2",
    variables: [
      { symbol: "w", name: "Tỷ trọng mỗi tài sản" },
      { symbol: "σ", name: "Độ lệch chuẩn mỗi tài sản" },
      { symbol: "ρ", name: "Hệ số tương quan giữa hai tài sản" },
    ],
    example: {
      calculation: "w = 50/50, σ1 = σ2 = 20%, ρ = 0.2",
      result: "σp ≈ 15.5%",
      explanation: "Toàn bộ lợi ích đa dạng hóa nằm ở số hạng cuối: ρ càng thấp thì rủi ro danh mục càng nhỏ hơn trung bình rủi ro từng phần.",
    },
  },
  {
    id: "port-003",
    subjectId: "portfolio",
    title: "Tỷ Số Treynor",
    badge: "Portfolio • Hiệu suất",
    numerator: "Rp - Rf",
    denominator: "Beta danh mục (βp)",
    variables: [
      { symbol: "βp", name: "Độ nhạy của danh mục với thị trường chung" },
    ],
    example: {
      calculation: "Rp = 14%, Rf = 4%, β = 1.25",
      result: "8.0%",
      explanation: "Treynor chia cho rủi ro hệ thống, nên nó phù hợp khi danh mục đã đa dạng hóa tốt; Sharpe chia cho tổng rủi ro.",
    },
  },
  {
    id: "port-004",
    subjectId: "portfolio",
    title: "Alpha Jensen",
    badge: "Portfolio • Hiệu suất",
    equation: "α = Rp - [Rf + βp × (Rm - Rf)]",
    variables: [
      { symbol: "Rm", name: "Lợi nhuận thị trường" },
      { symbol: "βp", name: "Beta danh mục" },
    ],
    example: {
      calculation: "Rp = 14%, Rf = 4%, β = 1.0, Rm = 12%",
      result: "α = 2%",
      explanation: "Alpha là phần lợi nhuận còn lại sau khi trừ đi phần CAPM giải thích được - tức phần thực sự đến từ kỹ năng.",
    },
  },
  {
    id: "port-005",
    subjectId: "portfolio",
    title: "Tỷ Số Thông Tin (Information Ratio)",
    badge: "Portfolio • Hiệu suất",
    numerator: "Rp - R_benchmark",
    denominator: "Tracking error",
    variables: [
      { symbol: "Tracking error", name: "Độ lệch chuẩn của phần chênh lệch so với chỉ số tham chiếu" },
    ],
    example: {
      calculation: "Vượt chỉ số 3%, tracking error 5%",
      result: "0.60",
      explanation: "Đo mức nhất quán của phần vượt chỉ số - trả lời câu hỏi người quản lý chủ động có đáng phí không.",
    },
  },

  // ── QUANTITATIVE METHODS (bổ sung) ───────────────────────────────────────
  {
    id: "q-003",
    subjectId: "quant",
    title: "Hệ Số Biến Thiên (Coefficient of Variation)",
    badge: "Quant • Rủi ro",
    numerator: "Độ lệch chuẩn (σ)",
    denominator: "Giá trị trung bình (μ)",
    variables: [
      { symbol: "CV", name: "Rủi ro trên mỗi đơn vị lợi nhuận kỳ vọng" },
    ],
    example: {
      calculation: "σ = 12%, μ = 8%",
      result: "1.5",
      explanation: "CV cho phép so sánh rủi ro giữa hai khoản đầu tư có quy mô lợi nhuận rất khác nhau, điều mà độ lệch chuẩn đơn lẻ không làm được.",
    },
  },
  {
    id: "q-004",
    subjectId: "quant",
    title: "Trung Bình Hình Học của Lợi Nhuận",
    badge: "Quant • Lợi nhuận",
    equation: "Rg = [(1 + R1)(1 + R2)...(1 + Rn)]^(1/n) - 1",
    variables: [
      { symbol: "Rg", name: "Lợi nhuận kép trung bình mỗi kỳ" },
    ],
    example: {
      calculation: "Lãi 50% rồi lỗ 50% -> [(1.5)(0.5)]^0.5 - 1",
      result: "-13.4%",
      explanation: "Trung bình cộng cho ra 0%, che mất việc nhà đầu tư đã mất 25% vốn. Trung bình hình học mới mô tả đúng kết quả tích lũy.",
    },
  },
  {
    id: "q-005",
    subjectId: "quant",
    title: "Sai Số Chuẩn của Trung Bình Mẫu",
    badge: "Quant • Thống kê",
    numerator: "Độ lệch chuẩn mẫu (s)",
    denominator: "Căn bậc hai của cỡ mẫu (√n)",
    variables: [
      { symbol: "n", name: "Số quan sát trong mẫu" },
    ],
    example: {
      calculation: "s = 20%, n = 36 -> 20/6",
      result: "3.33%",
      explanation: "Muốn giảm sai số một nửa thì phải tăng cỡ mẫu gấp bốn - lý do dữ liệu hiệu suất ngắn hạn không kết luận được nhiều.",
    },
  },
  {
    id: "q-006",
    subjectId: "quant",
    title: "Lợi Nhuận Có Trọng Số Theo Tiền (MWRR) và Theo Thời Gian (TWR)",
    badge: "Quant • Hiệu suất",
    equation: "TWR: nhân dồn lợi nhuận từng kỳ con   |   MWRR: chính là IRR của toàn bộ dòng tiền",
    variables: [
      { symbol: "TWR", name: "Đo hiệu suất chiến lược, bỏ qua thời điểm nạp rút" },
      { symbol: "MWRR", name: "Đo trải nghiệm thực tế của nhà đầu tư" },
    ],
    example: {
      calculation: "Quỹ công bố TWR 15%, nhà đầu tư nạp mạnh trước đợt giảm",
      result: "MWRR thấp hơn nhiều",
      explanation: "Quỹ công bố TWR vì người quản lý không kiểm soát thời điểm nạp rút; nhà đầu tư nên tự tính MWRR cho chính mình.",
    },
  },

  // ── CORPORATE ISSUERS (bổ sung) ──────────────────────────────────────────
  {
    id: "corp-003",
    subjectId: "corporate",
    title: "Đòn Bẩy Hoạt Động (DOL)",
    badge: "Corporate • Đòn bẩy",
    numerator: "Phần trăm thay đổi lợi nhuận hoạt động",
    denominator: "Phần trăm thay đổi doanh thu",
    variables: [
      { symbol: "DOL", name: "Mức khuếch đại của chi phí cố định lên lợi nhuận" },
    ],
    example: {
      calculation: "DOL = 3, doanh thu giảm 10%",
      result: "Lợi nhuận hoạt động giảm 30%",
      explanation: "Khuếch đại chạy cả hai chiều, và nó mạnh nhất đúng lúc doanh nghiệp cần đệm nhất.",
    },
  },
  {
    id: "corp-004",
    subjectId: "corporate",
    title: "Đòn Bẩy Tài Chính (DFL)",
    badge: "Corporate • Đòn bẩy",
    numerator: "Lợi nhuận trước lãi vay và thuế (EBIT)",
    denominator: "EBIT - Chi phí lãi vay",
    variables: [
      { symbol: "DFL", name: "Mức khuếch đại của lãi vay cố định lên lợi nhuận cho cổ đông" },
    ],
    example: {
      calculation: "EBIT = 100, lãi vay = 40",
      result: "1.67",
      explanation: "DOL nhân DFL cho ra đòn bẩy tổng - hai tầng khuếch đại chồng lên nhau là công thức của kiệt quệ tài chính trong suy thoái.",
    },
  },
  {
    id: "corp-005",
    subjectId: "corporate",
    title: "Chu Kỳ Chuyển Đổi Tiền Mặt (CCC)",
    badge: "Corporate • Vốn lưu động",
    equation: "CCC = Số ngày tồn kho + Số ngày phải thu - Số ngày phải trả",
    variables: [
      { symbol: "DIO", name: "Số ngày hàng nằm trong kho" },
      { symbol: "DSO", name: "Số ngày thu tiền khách" },
      { symbol: "DPO", name: "Số ngày trả tiền nhà cung cấp" },
    ],
    example: {
      calculation: "DIO 60 + DSO 45 - DPO 30",
      result: "75 ngày",
      explanation: "CCC âm nghĩa là nhà cung cấp tài trợ vốn lưu động cho bạn - đặc điểm của bán lẻ và mô hình thuê bao.",
    },
  },

  // ── EQUITY & FIXED INCOME (bổ sung) ──────────────────────────────────────
  {
    id: "eq-003",
    subjectId: "equity",
    title: "Giá Trị Doanh Nghiệp (Enterprise Value)",
    badge: "Equity • Định giá",
    equation: "EV = Vốn hóa thị trường + Nợ vay - Tiền mặt",
    variables: [
      { symbol: "EV", name: "Chi phí thực để sở hữu toàn bộ hoạt động kinh doanh" },
    ],
    example: {
      calculation: "Vốn hóa 100, nợ 30, tiền mặt 10",
      result: "120",
      explanation: "Tiền mặt bị trừ vì bên mua nhận lại được nó ngay sau khi mua - EV đo phần hoạt động kinh doanh, không đo bảng cân đối.",
    },
  },
  {
    id: "eq-004",
    subjectId: "equity",
    title: "P/E Hợp Lý Theo Mô Hình Gordon",
    badge: "Equity • Định giá",
    numerator: "Tỷ lệ chi trả cổ tức (1 - b)",
    denominator: "r - g",
    variables: [
      { symbol: "b", name: "Tỷ lệ lợi nhuận giữ lại" },
      { symbol: "r", name: "Tỷ suất sinh lời đòi hỏi" },
      { symbol: "g", name: "Tốc độ tăng trưởng dài hạn" },
    ],
    example: {
      calculation: "Chi trả 40%, r = 10%, g = 4%",
      result: "6.67 lần",
      explanation: "Cho biết mức P/E nào là hợp lý với một bộ giả định - dùng để kiểm tra ngược xem thị trường đang giả định điều gì.",
    },
  },
  {
    id: "eq-005",
    subjectId: "equity",
    title: "Tỷ Suất Sinh Lời Trên Vốn Đầu Tư (ROIC)",
    badge: "Equity • Hiệu quả",
    numerator: "NOPAT (Lợi nhuận hoạt động sau thuế)",
    denominator: "Vốn đầu tư (Nợ vay + Vốn chủ sở hữu)",
    variables: [
      { symbol: "NOPAT", name: "EBIT × (1 - thuế suất)" },
    ],
    example: {
      calculation: "NOPAT 120, vốn đầu tư 800",
      result: "15%",
      explanation: "Doanh nghiệp chỉ tạo giá trị khi ROIC vượt WACC; tăng trưởng với ROIC dưới WACC là phá hủy giá trị nhanh hơn.",
    },
  },
  {
    id: "fi-003",
    subjectId: "fixedIncome",
    title: "Giá Trái Phiếu Trả Lãi Định Kỳ",
    badge: "Fixed Income • Định giá",
    equation: "P = Σ [C / (1 + y)^t] + [Mệnh giá / (1 + y)^n]",
    variables: [
      { symbol: "C", name: "Tiền lãi coupon mỗi kỳ" },
      { symbol: "y", name: "Lợi suất đáo hạn theo kỳ" },
      { symbol: "n", name: "Số kỳ còn lại" },
    ],
    example: {
      calculation: "Coupon 8, mệnh giá 100, y = 10%, n = 3",
      result: "95.03",
      explanation: "Coupon thấp hơn lợi suất thị trường thì trái phiếu giao dịch dưới mệnh giá - và ngược lại.",
    },
  },
  {
    id: "fi-004",
    subjectId: "fixedIncome",
    title: "Lợi Suất Hiện Hành và Lợi Suất Đáo Hạn",
    badge: "Fixed Income • Lợi suất",
    equation: "Current yield = Coupon năm / Giá thị trường",
    variables: [
      { symbol: "YTM", name: "Gồm cả coupon lẫn lãi/lỗ vốn khi đáo hạn về mệnh giá" },
    ],
    example: {
      calculation: "Coupon 8, giá 95 -> current yield = 8/95",
      result: "8.42%",
      explanation: "Current yield bỏ qua phần lãi vốn, nên nó luôn thấp hơn YTM với trái phiếu mua dưới mệnh giá.",
    },
  },
  {
    id: "fi-005",
    subjectId: "fixedIncome",
    title: "Lãi Suất Kỳ Hạn Ngầm Định Từ Lãi Suất Giao Ngay",
    badge: "Fixed Income • Đường cong",
    equation: "(1 + s2)² = (1 + s1) × (1 + f1,1)",
    variables: [
      { symbol: "s1, s2", name: "Lãi suất giao ngay kỳ hạn 1 và 2 năm" },
      { symbol: "f1,1", name: "Lãi suất kỳ hạn 1 năm bắt đầu sau 1 năm" },
    ],
    example: {
      calculation: "s1 = 4%, s2 = 5% -> f = 1.05²/1.04 - 1",
      result: "6.01%",
      explanation: "Lãi suất kỳ hạn ngầm định là mức làm hai chiến lược đầu tư cho cùng kết quả, không phải dự báo lãi suất tương lai.",
    },
  },

  // ── FSA (bổ sung) ────────────────────────────────────────────────────────
  {
    id: "fsa-006",
    subjectId: "fsa",
    title: "Tỷ Số Thanh Toán Hiện Hành và Nhanh",
    badge: "FSA • Thanh khoản",
    equation: "Hiện hành = Tài sản ngắn hạn / Nợ ngắn hạn   |   Nhanh = (Tài sản ngắn hạn - Tồn kho) / Nợ ngắn hạn",
    variables: [
      { symbol: "Tỷ số nhanh", name: "Loại tồn kho vì đó là khoản khó chuyển thành tiền nhanh nhất" },
    ],
    example: {
      calculation: "TSNH 300, tồn kho 120, nợ NH 200",
      result: "Hiện hành 1.5, Nhanh 0.9",
      explanation: "Khoảng cách lớn giữa hai tỷ số là dấu hiệu doanh nghiệp phụ thuộc vào việc bán được hàng tồn để trả nợ.",
    },
  },
  {
    id: "fsa-007",
    subjectId: "fsa",
    title: "Hệ Số Khả Năng Thanh Toán Lãi Vay",
    badge: "FSA • Đòn bẩy",
    numerator: "EBIT",
    denominator: "Chi phí lãi vay",
    variables: [
      { symbol: "Interest coverage", name: "Số lần lợi nhuận hoạt động phủ được nghĩa vụ lãi" },
    ],
    example: {
      calculation: "EBIT 240, lãi vay 80",
      result: "3.0 lần",
      explanation: "Dưới 1.5 lần thường là ngưỡng cảnh báo; với doanh nghiệp chu kỳ thì phải thử lại ở mức EBIT của năm tệ nhất chu kỳ trước.",
    },
  },
  {
    id: "fsa-008",
    subjectId: "fsa",
    title: "Vòng Quay Hàng Tồn Kho và Số Ngày Tồn Kho",
    badge: "FSA • Hiệu quả",
    equation: "Vòng quay = COGS / Tồn kho bình quân   |   DIO = 365 / Vòng quay",
    variables: [
      { symbol: "COGS", name: "Giá vốn hàng bán" },
      { symbol: "DIO", name: "Số ngày trung bình hàng nằm trong kho" },
    ],
    example: {
      calculation: "COGS 720, tồn kho bình quân 120 -> vòng quay 6",
      result: "DIO ≈ 61 ngày",
      explanation: "DIO tăng cùng lúc biên lợi nhuận gộp giảm là dấu hiệu doanh nghiệp đang giảm giá để đẩy hàng chậm luân chuyển.",
    },
  },
];
