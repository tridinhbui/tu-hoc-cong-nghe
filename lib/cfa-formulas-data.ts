import { FormulaVariable, FormulaExample } from "@/components/FormulaBlock";
import type { CfaSubjectId } from "@/lib/cfa-track";

export interface CfaFormulaItem {
  id: string;
  subjectId: CfaSubjectId;
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

  // ── Bổ sung đợt 2 ────────────────────────────────────────────────────────
  //
  // Sổ tay trước đó có 54 công thức cho mười môn - 5 tới 8 mỗi môn - trong khi
  // đề Level I hỏi trên một tập rộng hơn nhiều. Đợt này thêm những công thức
  // KINH ĐIỂN còn thiếu chứ không thêm biến thể của cái đã có: mỗi mục dưới
  // đây là một công thức mà bỏ qua thì mất điểm ở một dạng câu hỏi riêng.
  //
  // Ethics vẫn không có mục nào, và đó là đúng: môn đó không có công thức nào
  // để tra.

  {
    id: "q-007",
    subjectId: "quant",
    title: "Lãi Suất Hiệu Dụng Năm (EAR)",
    badge: "Quant • TVM",
    equation: "EAR = (1 + i/m)^m − 1",
    variables: [
      { symbol: "i", name: "Lãi suất danh nghĩa năm" },
      { symbol: "m", name: "Số kỳ ghép lãi trong một năm" },
    ],
    example: {
      calculation: "i = 12%/năm, ghép lãi hằng tháng: (1 + 0.12/12)^12 − 1",
      result: "12.68%",
      explanation: "Ghép lãi càng dày EAR càng cao. So sánh hai khoản vay bằng lãi suất danh nghĩa là so sai khi tần suất ghép lãi khác nhau.",
    },
  },
  {
    id: "q-008",
    subjectId: "quant",
    title: "Giá Trị Hiện Tại của Dòng Tiền Đều (Annuity)",
    badge: "Quant • TVM",
    equation: "PV = A × [1 − (1 + r)^−N] / r",
    variables: [
      { symbol: "A", name: "Khoản tiền đều mỗi kỳ" },
      { symbol: "N", name: "Số kỳ" },
      { symbol: "r", name: "Lãi suất chiết khấu mỗi kỳ" },
    ],
    example: {
      calculation: "A = 10 triệu/năm, N = 5, r = 8%",
      result: "39.93 triệu",
      explanation: "Công thức này là annuity thường - trả cuối kỳ. Trả đầu kỳ (annuity due) thì nhân thêm (1 + r).",
    },
  },
  {
    id: "q-009",
    subjectId: "quant",
    title: "Giá Trị Hiện Tại của Dòng Tiền Vĩnh Viễn (Perpetuity)",
    badge: "Quant • TVM",
    numerator: "A",
    denominator: "r",
    variables: [
      { symbol: "A", name: "Khoản tiền đều nhận mãi mãi mỗi kỳ" },
      { symbol: "r", name: "Lãi suất chiết khấu mỗi kỳ" },
    ],
    example: {
      calculation: "Cổ tức ưu đãi 6.000đ/năm, r = 10%",
      result: "60.000đ",
      explanation: "Là trường hợp N → ∞ của annuity. Chỉ dùng được khi r > 0; đây cũng chính là bộ khung của mô hình Gordon khi g = 0.",
    },
  },
  {
    id: "q-010",
    subjectId: "quant",
    title: "Định Lý Bayes",
    badge: "Quant • Xác suất",
    equation: "P(A|B) = P(B|A) × P(A) / P(B)",
    variables: [
      { symbol: "P(A)", name: "Xác suất tiên nghiệm - niềm tin trước khi có thông tin mới" },
      { symbol: "P(A|B)", name: "Xác suất hậu nghiệm - sau khi biết B đã xảy ra" },
    ],
    example: {
      calculation: "P(vỡ nợ) = 5%, P(bị hạ bậc | vỡ nợ) = 80%, P(bị hạ bậc) = 12%",
      result: "P(vỡ nợ | bị hạ bậc) ≈ 33%",
      explanation: "Sai lầm thường gặp là lẫn P(A|B) với P(B|A). Ở ví dụ trên, 80% và 33% là hai con số hoàn toàn khác nhau.",
    },
  },
  {
    id: "q-011",
    subjectId: "quant",
    title: "Khoảng Tin Cậy cho Trung Bình Tổng Thể",
    badge: "Quant • Suy diễn",
    equation: "x̄ ± t(α/2, n−1) × s / √n",
    variables: [
      { symbol: "x̄", name: "Trung bình mẫu" },
      { symbol: "s", name: "Độ lệch chuẩn mẫu" },
      { symbol: "n", name: "Cỡ mẫu" },
    ],
    example: {
      calculation: "x̄ = 8%, s = 6%, n = 25, t(0.025, 24) = 2.064",
      result: "8% ± 2.48% → [5.52%, 10.48%]",
      explanation: "Dùng t chứ không dùng z khi phương sai tổng thể chưa biết. Cỡ mẫu lớn thì hai phân phối gần trùng nhau, nhưng t luôn là lựa chọn an toàn.",
    },
  },
  {
    id: "q-012",
    subjectId: "quant",
    title: "Hệ Số Tương Quan",
    badge: "Quant • Thống kê",
    numerator: "Cov(X, Y)",
    denominator: "σX × σY",
    variables: [
      { symbol: "ρ", name: "Hệ số tương quan, luôn nằm trong [−1, +1]" },
      { symbol: "Cov", name: "Hiệp phương sai giữa hai biến" },
    ],
    example: {
      calculation: "Cov = 0.0048, σX = 12%, σY = 8%",
      result: "ρ = 0.5",
      explanation: "Tương quan chuẩn hoá hiệp phương sai về thang không đơn vị, nên so sánh được giữa các cặp tài sản khác nhau. Nó chỉ đo quan hệ TUYẾN TÍNH.",
    },
  },
  {
    id: "q-013",
    subjectId: "quant",
    title: "Tỷ Số An Toàn Trước Hết của Roy (Safety-First)",
    badge: "Quant • Rủi ro",
    numerator: "E(Rp) − RL",
    denominator: "σp",
    variables: [
      { symbol: "RL", name: "Ngưỡng lợi nhuận tối thiểu chấp nhận được" },
    ],
    example: {
      calculation: "E(Rp) = 12%, RL = 4%, σp = 16%",
      result: "SFRatio = 0.5",
      explanation: "Chọn danh mục có SFRatio cao nhất là tối thiểu hoá xác suất rơi xuống dưới ngưỡng. Trùng dạng với Sharpe, chỉ khác chỗ RL thay cho lãi suất phi rủi ro.",
    },
  },

  {
    id: "econ-008",
    subjectId: "economics",
    title: "Độ Co Giãn Chéo và Theo Thu Nhập",
    badge: "Econ • Cầu",
    equation: "E_chéo = %ΔQx / %ΔPy   |   E_thu nhập = %ΔQ / %ΔI",
    variables: [
      { symbol: "E_chéo > 0", name: "Hai hàng hoá thay thế nhau" },
      { symbol: "E_chéo < 0", name: "Hai hàng hoá bổ sung cho nhau" },
      { symbol: "E_thu nhập < 0", name: "Hàng hoá thứ cấp" },
    ],
    example: {
      calculation: "Giá cà phê +10%, lượng trà bán ra +4%",
      result: "E_chéo = +0.4",
      explanation: "Dấu quan trọng hơn độ lớn: dấu dương nói trà và cà phê thay thế nhau, và đó là điều quyết định khi phân tích cạnh tranh ngành.",
    },
  },
  {
    id: "econ-009",
    subjectId: "economics",
    title: "GDP Theo Phương Pháp Chi Tiêu",
    badge: "Econ • Vĩ mô",
    equation: "GDP = C + I + G + (X − M)",
    variables: [
      { symbol: "C", name: "Tiêu dùng hộ gia đình" },
      { symbol: "I", name: "Đầu tư tư nhân, gồm cả thay đổi hàng tồn kho" },
      { symbol: "G", name: "Chi tiêu chính phủ cho hàng hoá và dịch vụ" },
      { symbol: "X − M", name: "Xuất khẩu ròng" },
    ],
    example: {
      calculation: "C 600, I 200, G 180, X 250, M 210",
      result: "GDP = 1.020",
      explanation: "G không bao gồm chi chuyển nhượng (lương hưu, trợ cấp) - đó là chuyển tiền chứ không phải mua hàng hoá, và tính vào sẽ đếm trùng khi hộ gia đình tiêu số tiền đó.",
    },
  },
  {
    id: "econ-010",
    subjectId: "economics",
    title: "Tỷ Lệ Thất Nghiệp và Tỷ Lệ Tham Gia Lực Lượng Lao Động",
    badge: "Econ • Vĩ mô",
    equation: "Thất nghiệp = Số thất nghiệp / Lực lượng LĐ   |   Tham gia = Lực lượng LĐ / Dân số trong tuổi LĐ",
    variables: [
      { symbol: "Lực lượng LĐ", name: "Người có việc cộng người thất nghiệp đang tìm việc" },
    ],
    example: {
      calculation: "Có việc 48tr, thất nghiệp 2tr, dân số trong tuổi LĐ 70tr",
      result: "Thất nghiệp 4.0%, tham gia 71.4%",
      explanation: "Người nản chí ngừng tìm việc bị loại khỏi lực lượng lao động, nên tỷ lệ thất nghiệp có thể GIẢM trong lúc kinh tế xấu đi. Phải đọc kèm tỷ lệ tham gia.",
    },
  },
  {
    id: "econ-011",
    subjectId: "economics",
    title: "Chỉ Số Herfindahl-Hirschman (HHI)",
    badge: "Econ • Cấu trúc thị trường",
    equation: "HHI = Σ (thị phần_i × 100)²",
    variables: [
      { symbol: "HHI < 1.500", name: "Thị trường phân tán" },
      { symbol: "HHI > 2.500", name: "Thị trường tập trung cao" },
    ],
    example: {
      calculation: "Bốn doanh nghiệp: 40%, 30%, 20%, 10%",
      result: "1600 + 900 + 400 + 100 = 3.000",
      explanation: "Bình phương làm doanh nghiệp lớn nặng hơn hẳn, nên HHI phân biệt được 'bốn hãng đều nhau' với 'một hãng thống trị' trong khi tỷ lệ tập trung bốn hãng thì không.",
    },
  },
  {
    id: "econ-012",
    subjectId: "economics",
    title: "Điểm Hoà Vốn và Điểm Đóng Cửa của Doanh Nghiệp",
    badge: "Econ • Cung",
    equation: "Hoà vốn: P = ATC (dài hạn)   |   Đóng cửa: P < AVC (ngắn hạn)",
    variables: [
      { symbol: "ATC", name: "Chi phí bình quân toàn phần" },
      { symbol: "AVC", name: "Chi phí biến đổi bình quân" },
    ],
    example: {
      calculation: "P = 18, AVC = 15, ATC = 22",
      result: "Tiếp tục sản xuất trong ngắn hạn",
      explanation: "P nằm giữa AVC và ATC nghĩa là đang lỗ nhưng vẫn phủ được chi phí biến đổi và một phần định phí - đóng cửa ngay sẽ lỗ nhiều hơn.",
    },
  },

  {
    id: "fsa-009",
    subjectId: "fsa",
    title: "EPS Cơ Bản và EPS Pha Loãng",
    badge: "FSA • Lợi nhuận",
    equation: "EPS cơ bản = (LNST − Cổ tức ưu đãi) / Số CP bình quân gia quyền",
    variables: [
      { symbol: "EPS pha loãng", name: "Tính thêm tác động của quyền chọn, trái phiếu chuyển đổi, CP ưu đãi chuyển đổi" },
    ],
    example: {
      calculation: "LNST 500, cổ tức ưu đãi 40, CP bình quân 100",
      result: "EPS cơ bản 4.6",
      explanation: "Chỉ trừ cổ tức ưu đãi ở EPS cơ bản. Ở EPS pha loãng theo phương pháp if-converted, cổ tức ưu đãi chuyển đổi được CỘNG LẠI vì giả định nó đã thành cổ phiếu thường.",
    },
  },
  {
    id: "fsa-010",
    subjectId: "fsa",
    title: "Thuế Suất Hiệu Dụng",
    badge: "FSA • Thuế",
    numerator: "Chi phí thuế TNDN",
    denominator: "Lợi nhuận trước thuế",
    variables: [
      { symbol: "Thuế suất hiệu dụng", name: "Khác thuế suất luật định vì ưu đãi, lỗ chuyển tiếp, thu nhập nước ngoài" },
    ],
    example: {
      calculation: "Chi phí thuế 42, LNTT 240",
      result: "17.5%",
      explanation: "Chênh lệch dai dẳng giữa thuế suất hiệu dụng và luật định là dấu hiệu cần đọc thuyết minh thuế - có thể là ưu đãi sắp hết hạn, tức là lợi nhuận sau thuế sẽ tụt mà doanh thu không đổi.",
    },
  },
  {
    id: "fsa-011",
    subjectId: "fsa",
    title: "Vòng Quay Khoản Phải Thu và Số Ngày Thu Tiền (DSO)",
    badge: "FSA • Hiệu quả",
    equation: "Vòng quay = Doanh thu / Phải thu bình quân   |   DSO = 365 / Vòng quay",
    variables: [
      { symbol: "DSO", name: "Số ngày trung bình từ lúc bán tới lúc thu được tiền" },
    ],
    example: {
      calculation: "Doanh thu 1.460, phải thu bình quân 200 → vòng quay 7.3",
      result: "DSO = 50 ngày",
      explanation: "DSO tăng nhanh hơn doanh thu là dấu hiệu doanh nghiệp đang nới điều khoản bán chịu để giữ tăng trưởng - doanh thu vẫn đẹp trong khi tiền chưa về.",
    },
  },
  {
    id: "fsa-012",
    subjectId: "fsa",
    title: "Vòng Quay Khoản Phải Trả và Số Ngày Trả Tiền (DPO)",
    badge: "FSA • Hiệu quả",
    equation: "Vòng quay = Giá vốn (hoặc mua hàng) / Phải trả bình quân   |   DPO = 365 / Vòng quay",
    variables: [
      { symbol: "DPO", name: "Số ngày trung bình doanh nghiệp giữ được tiền của nhà cung cấp" },
    ],
    example: {
      calculation: "COGS 1.095, phải trả bình quân 150 → vòng quay 7.3",
      result: "DPO = 50 ngày",
      explanation: "DPO dài là nguồn vốn không lãi, nhưng dài bất thường cũng có thể là dấu hiệu thiếu tiền mặt để trả đúng hạn. Đọc cùng DSO và DIO trong chu kỳ tiền mặt.",
    },
  },
  {
    id: "fsa-013",
    subjectId: "fsa",
    title: "Các Biên Lợi Nhuận",
    badge: "FSA • Lợi nhuận",
    equation: "Biên gộp = LN gộp / DT   |   Biên HĐ = EBIT / DT   |   Biên ròng = LNST / DT",
    variables: [
      { symbol: "Biên gộp", name: "Sức mạnh định giá và cấu trúc giá vốn" },
      { symbol: "Biên hoạt động", name: "Thêm hiệu quả chi phí bán hàng và quản lý" },
    ],
    example: {
      calculation: "DT 1.000, LN gộp 380, EBIT 150, LNST 96",
      result: "38% / 15% / 9.6%",
      explanation: "Biên gộp giữ nguyên nhưng biên hoạt động tụt nghĩa là vấn đề nằm ở chi phí bán hàng - quản lý, không phải ở giá bán hay giá vốn.",
    },
  },
  {
    id: "fsa-014",
    subjectId: "fsa",
    title: "Khấu Hao Đường Thẳng và Số Dư Giảm Dần Kép",
    badge: "FSA • Tài sản dài hạn",
    equation: "Đường thẳng = (Nguyên giá − Giá trị thanh lý) / Số năm   |   DDB = (2 / Số năm) × Giá trị còn lại đầu kỳ",
    variables: [
      { symbol: "DDB", name: "Double declining balance - khấu hao nhanh" },
    ],
    example: {
      calculation: "Nguyên giá 100, thanh lý 10, đời 5 năm. Năm 1: đường thẳng (100−10)/5, DDB (2/5)×100",
      result: "18 so với 40",
      explanation: "DDB KHÔNG trừ giá trị thanh lý khi tính, nhưng phải dừng khi giá trị còn lại chạm mức đó. Khấu hao nhanh làm lợi nhuận năm đầu thấp và ROA những năm sau cao - so sánh hai doanh nghiệp khác phương pháp là so sai.",
    },
  },
  {
    id: "fsa-015",
    subjectId: "fsa",
    title: "Dự Phòng LIFO - Quy Đổi Về FIFO",
    badge: "FSA • Hàng tồn kho",
    equation: "Tồn kho_FIFO = Tồn kho_LIFO + Dự phòng LIFO   |   COGS_FIFO = COGS_LIFO − ΔDự phòng LIFO",
    variables: [
      { symbol: "Dự phòng LIFO", name: "Chênh lệch giữa giá trị tồn kho theo FIFO và theo LIFO, công bố trong thuyết minh" },
    ],
    example: {
      calculation: "Tồn kho LIFO 300, dự phòng 80 (tăng 15 trong năm), COGS LIFO 900",
      result: "Tồn kho FIFO 380, COGS FIFO 885",
      explanation: "Bước bắt buộc khi so một doanh nghiệp Mỹ dùng LIFO với một doanh nghiệp theo IFRS - IFRS cấm LIFO, nên không quy đổi là so hai thước đo khác nhau.",
    },
  },

  {
    id: "corp-006",
    subjectId: "corporate",
    title: "Chi Phí Nợ Sau Thuế và Chi Phí Cổ Phần Ưu Đãi",
    badge: "Corporate • Chi phí vốn",
    equation: "r_d sau thuế = r_d × (1 − t)   |   r_p = D_p / P_p",
    variables: [
      { symbol: "t", name: "Thuế suất biên của doanh nghiệp" },
      { symbol: "D_p / P_p", name: "Cổ tức ưu đãi chia giá thị trường cổ phần ưu đãi" },
    ],
    example: {
      calculation: "r_d = 10%, t = 20%; cổ tức ưu đãi 8.000đ, giá 80.000đ",
      result: "r_d sau thuế 8%, r_p 10%",
      explanation: "Chỉ NỢ có lá chắn thuế. Cổ tức ưu đãi trả từ lợi nhuận sau thuế nên không nhân (1 − t) - đây là chỗ hay nhầm nhất khi ráp WACC.",
    },
  },
  {
    id: "corp-007",
    subjectId: "corporate",
    title: "Sản Lượng Hoà Vốn",
    badge: "Corporate • Đòn bẩy",
    numerator: "Định phí",
    denominator: "Giá bán − Biến phí đơn vị",
    variables: [
      { symbol: "Q_BE", name: "Sản lượng để lợi nhuận hoạt động bằng 0" },
    ],
    example: {
      calculation: "Định phí 600tr, giá 50.000đ, biến phí 30.000đ",
      result: "30.000 sản phẩm",
      explanation: "Mẫu số là lãi góp đơn vị. Định phí càng lớn thì Q_BE càng cao và đòn bẩy hoạt động càng mạnh - lãi phóng đại khi vượt điểm hoà vốn, lỗ cũng phóng đại khi hụt.",
    },
  },
  {
    id: "corp-008",
    subjectId: "corporate",
    title: "Đòn Bẩy Tổng (DTL)",
    badge: "Corporate • Đòn bẩy",
    equation: "DTL = DOL × DFL = %ΔLNST / %ΔDoanh thu",
    variables: [
      { symbol: "DOL", name: "Đòn bẩy hoạt động - do định phí sản xuất" },
      { symbol: "DFL", name: "Đòn bẩy tài chính - do lãi vay cố định" },
    ],
    example: {
      calculation: "DOL = 2.0, DFL = 1.5",
      result: "DTL = 3.0",
      explanation: "Doanh thu giảm 10% thì lợi nhuận sau thuế giảm 30%. Doanh nghiệp định phí cao mà lại vay nhiều là chồng hai đòn bẩy lên nhau - đó là dạng vỡ nợ nhanh nhất trong suy thoái.",
    },
  },
  {
    id: "corp-009",
    subjectId: "corporate",
    title: "Chỉ Số Sinh Lời (Profitability Index)",
    badge: "Corporate • Thẩm định dự án",
    equation: "PI = PV dòng tiền tương lai / Vốn đầu tư ban đầu = 1 + NPV / CF₀",
    variables: [
      { symbol: "PI > 1", name: "Tương đương NPV > 0, dự án đáng làm" },
    ],
    example: {
      calculation: "Vốn đầu tư 100, PV dòng tiền 118",
      result: "PI = 1.18",
      explanation: "PI xếp hạng theo giá trị tạo ra trên mỗi đồng vốn, nên hữu ích khi vốn bị giới hạn. Khi hai dự án loại trừ nhau và khác quy mô thì vẫn phải theo NPV, không theo PI.",
    },
  },

  {
    id: "eq-006",
    subjectId: "equity",
    title: "Lợi Nhuận Nắm Giữ (Holding Period Return)",
    badge: "Equity • Lợi nhuận",
    numerator: "P₁ − P₀ + D₁",
    denominator: "P₀",
    variables: [
      { symbol: "D₁", name: "Cổ tức nhận trong kỳ nắm giữ" },
    ],
    example: {
      calculation: "Mua 50.000đ, bán 56.000đ, cổ tức 2.000đ",
      result: "16%",
      explanation: "Bỏ cổ tức ra khỏi tử số là lỗi phổ biến nhất khi so hiệu suất cổ phiếu trả cổ tức cao với cổ phiếu tăng trưởng - so như vậy luôn thiệt cho nhóm đầu.",
    },
  },
  {
    id: "eq-007",
    subjectId: "equity",
    title: "Giá Trị Sổ Sách Mỗi Cổ Phần và P/B",
    badge: "Equity • Bội số",
    equation: "BVPS = Vốn CSH của cổ đông thường / Số CP đang lưu hành   |   P/B = Giá / BVPS",
    variables: [
      { symbol: "Vốn CSH thường", name: "Tổng vốn CSH trừ phần thuộc cổ đông ưu đãi" },
    ],
    example: {
      calculation: "Vốn CSH thường 4.800 tỷ, 400 triệu CP, giá 24.000đ",
      result: "BVPS 12.000đ, P/B 2.0",
      explanation: "P/B chỉ có nghĩa khi tài sản được ghi nhận gần giá trị kinh tế - hợp với ngân hàng, gần như vô nghĩa với doanh nghiệp phần mềm nơi tài sản chính không nằm trên bảng cân đối.",
    },
  },
  {
    id: "eq-008",
    subjectId: "equity",
    title: "Mô Hình Cổ Tức Hai Giai Đoạn",
    badge: "Equity • Định giá",
    equation: "V₀ = Σ Dₜ/(1+r)ᵗ + [D_{n+1}/(r − g_L)] / (1+r)ⁿ",
    variables: [
      { symbol: "g_L", name: "Tốc độ tăng trưởng dài hạn, bắt buộc nhỏ hơn r" },
      { symbol: "n", name: "Số năm của giai đoạn tăng trưởng cao" },
    ],
    example: {
      calculation: "D₁=2, tăng 20%/năm trong 3 năm rồi 5% mãi; r = 12%",
      result: "Giá trị cuối kỳ chiếm phần lớn V₀",
      explanation: "Giá trị cuối kỳ thường chiếm 70-80% tổng giá trị, nên kết quả nhạy với g_L hơn hẳn với dự báo cổ tức ba năm đầu. Đó là chỗ cần kiểm tra độ nhạy, không phải chỗ dự báo chi tiết hơn.",
    },
  },
  {
    id: "eq-009",
    subjectId: "equity",
    title: "Giá Trị Cổ Phần Ưu Đãi",
    badge: "Equity • Định giá",
    numerator: "D_p",
    denominator: "r_p",
    variables: [
      { symbol: "D_p", name: "Cổ tức ưu đãi cố định hằng năm" },
      { symbol: "r_p", name: "Tỷ suất yêu cầu của cổ phần ưu đãi" },
    ],
    example: {
      calculation: "Cổ tức 9.000đ/năm, tỷ suất yêu cầu 12%",
      result: "75.000đ",
      explanation: "Là perpetuity vì cổ tức ưu đãi không tăng trưởng. Giá cổ phần ưu đãi vì thế nhạy với lãi suất gần như trái phiếu, không như cổ phiếu thường.",
    },
  },
  {
    id: "eq-010",
    subjectId: "equity",
    title: "Tỷ Lệ Chi Trả và Tỷ Lệ Giữ Lại",
    badge: "Equity • Chính sách cổ tức",
    equation: "Tỷ lệ chi trả = D / EPS   |   b = 1 − Tỷ lệ chi trả",
    variables: [
      { symbol: "b", name: "Tỷ lệ lợi nhuận giữ lại tái đầu tư" },
    ],
    example: {
      calculation: "EPS 5.000đ, cổ tức 2.000đ",
      result: "Chi trả 40%, b = 60%",
      explanation: "b là mắt nối giữa chính sách cổ tức và tăng trưởng: g = b × ROE. Tăng cổ tức mà ROE không đổi thì tự động hạ tốc độ tăng trưởng bền vững.",
    },
  },

  {
    id: "fi-006",
    subjectId: "fixedIncome",
    title: "Thời Lượng Macaulay và Quan Hệ Với Modified Duration",
    badge: "Fixed Income • Rủi ro lãi suất",
    equation: "MacDur = Σ [t × PV(CFₜ)] / Giá   |   ModDur = MacDur / (1 + y/m)",
    variables: [
      { symbol: "MacDur", name: "Kỳ hạn bình quân gia quyền của dòng tiền, tính bằng năm" },
      { symbol: "m", name: "Số kỳ trả lãi trong năm" },
    ],
    example: {
      calculation: "MacDur = 7.2 năm, y = 6%, trả lãi nửa năm",
      result: "ModDur = 7.2 / 1.03 = 6.99",
      explanation: "MacDur là thời gian, ModDur là độ nhạy giá theo phần trăm. Trái phiếu zero-coupon có MacDur đúng bằng kỳ hạn còn lại - trường hợp duy nhất hai con số trùng nhau về mặt trực giác.",
    },
  },
  {
    id: "fi-007",
    subjectId: "fixedIncome",
    title: "Money Duration và PVBP",
    badge: "Fixed Income • Rủi ro lãi suất",
    equation: "Money duration = ModDur × Giá đầy đủ   |   PVBP = Money duration × 0.0001",
    variables: [
      { symbol: "PVBP", name: "Mức thay đổi giá trị bằng tiền khi lợi suất đổi 1 điểm cơ bản" },
    ],
    example: {
      calculation: "ModDur 6.99, giá đầy đủ 100 tỷ",
      result: "Money duration 699 tỷ, PVBP 69.9 triệu",
      explanation: "Duration nói phần trăm, PVBP nói tiền. Khi phòng hộ một danh mục thì phải khớp PVBP chứ không khớp duration - hai danh mục cùng duration mà khác quy mô thì lỗ lãi khác hẳn nhau.",
    },
  },
  {
    id: "fi-008",
    subjectId: "fixedIncome",
    title: "Thời Lượng Hiệu Dụng (Effective Duration)",
    badge: "Fixed Income • Rủi ro lãi suất",
    numerator: "PV₋ − PV₊",
    denominator: "2 × Δđường cong × PV₀",
    variables: [
      { symbol: "PV₋, PV₊", name: "Giá khi đường cong lợi suất dịch xuống và dịch lên" },
    ],
    example: {
      calculation: "PV₋ = 101.5, PV₊ = 98.7, Δ = 0.25%, PV₀ = 100",
      result: "5.6",
      explanation: "Là thước đo BẮT BUỘC với trái phiếu có quyền chọn kèm theo - dòng tiền của chúng đổi khi lãi suất đổi, nên ModDur tính từ dòng tiền cố định không còn đúng.",
    },
  },
  {
    id: "fi-009",
    subjectId: "fixedIncome",
    title: "Giá Sạch, Lãi Dồn Tích và Giá Đầy Đủ",
    badge: "Fixed Income • Định giá",
    equation: "Giá đầy đủ = Giá sạch + Lãi dồn tích   |   Lãi dồn tích = Coupon × (t / T)",
    variables: [
      { symbol: "t", name: "Số ngày từ lần trả lãi gần nhất" },
      { symbol: "T", name: "Số ngày của cả kỳ trả lãi" },
    ],
    example: {
      calculation: "Coupon nửa năm 4, đã qua 60/180 ngày, giá sạch 98.2",
      result: "Lãi dồn tích 1.33, giá đầy đủ 99.53",
      explanation: "Bảng giá niêm yết là giá SẠCH, nhưng tiền thực trả là giá đầy đủ. Quy ước đếm ngày khác nhau (30/360 với trái phiếu doanh nghiệp, thực tế/thực tế với trái phiếu chính phủ) làm đổi con số lãi dồn tích.",
    },
  },
  {
    id: "fi-010",
    subjectId: "fixedIncome",
    title: "Tổn Thất Tín Dụng Kỳ Vọng",
    badge: "Fixed Income • Rủi ro tín dụng",
    equation: "Tổn thất kỳ vọng = POD × LGD   |   LGD = 1 − Tỷ lệ thu hồi",
    variables: [
      { symbol: "POD", name: "Xác suất vỡ nợ trong kỳ" },
      { symbol: "LGD", name: "Tỷ lệ mất vốn khi vỡ nợ xảy ra" },
    ],
    example: {
      calculation: "POD 3%/năm, tỷ lệ thu hồi 40%",
      result: "Tổn thất kỳ vọng 1.8%/năm",
      explanation: "Chênh lệch lợi suất phải bù được ít nhất con số này thì mới đáng cầm. Một trái phiếu POD cao nhưng có tài sản bảo đảm tốt có thể an toàn hơn trái phiếu POD thấp mà không bảo đảm.",
    },
  },

  {
    id: "der-008",
    subjectId: "derivatives",
    title: "Lợi Nhuận Đáo Hạn của Quyền Chọn",
    badge: "Derivatives • Payoff",
    equation: "Mua call: max(0, Sₜ − X)   |   Mua put: max(0, X − Sₜ)",
    variables: [
      { symbol: "Sₜ", name: "Giá tài sản cơ sở lúc đáo hạn" },
      { symbol: "X", name: "Giá thực hiện" },
    ],
    example: {
      calculation: "X = 100, Sₜ = 118, phí quyền chọn đã trả 6",
      result: "Payoff 18, lãi ròng 12",
      explanation: "Payoff không bao giờ âm với người mua - đó là cả ý nghĩa của quyền chọn. Lãi RÒNG thì âm được, vì phí đã trả không lấy lại. Người bán có payoff đối xứng qua trục 0.",
    },
  },
  {
    id: "der-009",
    subjectId: "derivatives",
    title: "Định Giá Quyền Chọn Bằng Cây Nhị Thức Một Kỳ",
    badge: "Derivatives • Định giá",
    equation: "c = [π·c⁺ + (1−π)·c⁻] / (1 + r)   với   π = (1 + r − d) / (u − d)",
    variables: [
      { symbol: "π", name: "Xác suất trung hoà rủi ro, KHÔNG phải xác suất thực tế" },
      { symbol: "u, d", name: "Hệ số giá tăng và giá giảm" },
    ],
    example: {
      calculation: "S=100, u=1.25, d=0.8, X=100, r=5% → π = (1.05−0.8)/(1.25−0.8) = 0.556",
      result: "c = (0.556 × 25) / 1.05 ≈ 13.2",
      explanation: "Xác suất thực tế của việc giá lên KHÔNG xuất hiện trong công thức. Đó là điểm gây bất ngờ nhất của định giá phái sinh: giá quyền chọn không phụ thuộc vào việc bạn nghĩ cổ phiếu sẽ lên hay xuống.",
    },
  },
  {
    id: "der-010",
    subjectId: "derivatives",
    title: "Chi Phí Nắm Giữ (Cost of Carry)",
    badge: "Derivatives • Kỳ hạn",
    equation: "F₀ = S₀(1 + r)^T + FV(chi phí lưu giữ) − FV(lợi ích nắm giữ)",
    variables: [
      { symbol: "Chi phí lưu giữ", name: "Kho bãi, bảo hiểm - đẩy giá kỳ hạn LÊN" },
      { symbol: "Lợi ích nắm giữ", name: "Cổ tức, lãi coupon, convenience yield - kéo giá kỳ hạn XUỐNG" },
    ],
    example: {
      calculation: "S₀ = 100, r = 5%, T = 1, chi phí lưu kho 3, lợi ích 0",
      result: "F₀ = 108",
      explanation: "Đây là bộ khung giải thích contango và backwardation: hàng hoá có convenience yield cao hơn chi phí lưu kho sẽ có giá kỳ hạn THẤP hơn giá giao ngay.",
    },
  },

  {
    id: "alt-007",
    subjectId: "alternatives",
    title: "Phí Quản Lý và Phí Hiệu Suất '2 và 20'",
    badge: "Alternatives • Phí",
    equation: "Tổng phí = 2% × Tài sản quản lý + 20% × Lợi nhuận (sau ngưỡng)",
    variables: [
      { symbol: "Phí quản lý", name: "Tính trên tài sản, thu cả khi quỹ lỗ" },
      { symbol: "Phí hiệu suất", name: "Tính trên lợi nhuận, thường kèm high-water mark" },
    ],
    example: {
      calculation: "AUM 100 tỷ, lãi gộp 20 tỷ, phí 2/20",
      result: "Phí 2 + 4 = 6 tỷ, lãi ròng 14 tỷ (14%)",
      explanation: "Lãi gộp 20% thành lãi ròng 14% - phí ăn mất 30% thành quả. Phí quản lý thu trên tài sản nên năm quỹ lỗ nhà đầu tư vẫn trả; đó là lý do lãi kép của quỹ phí cao thua xa lãi kép của quỹ chỉ số qua nhiều năm.",
    },
  },
  {
    id: "alt-008",
    subjectId: "alternatives",
    title: "Cấu Phần Lợi Nhuận Đầu Tư Hàng Hoá",
    badge: "Alternatives • Hàng hoá",
    equation: "Tổng lợi nhuận = Lợi nhuận giá giao ngay + Lợi nhuận đảo hợp đồng + Lợi nhuận tài sản thế chấp",
    variables: [
      { symbol: "Đảo hợp đồng", name: "Dương khi thị trường backwardation, âm khi contango" },
      { symbol: "Tài sản thế chấp", name: "Lãi từ khoản tiền ký quỹ, thường là tín phiếu kho bạc" },
    ],
    example: {
      calculation: "Giá giao ngay +5%, đảo hợp đồng −4% (contango), thế chấp +3%",
      result: "Tổng +4%",
      explanation: "Nhà đầu tư hay chỉ nhìn giá giao ngay rồi ngạc nhiên vì quỹ hàng hoá thua xa. Trong thị trường contango kéo dài, riêng phần đảo hợp đồng có thể xoá sạch mức tăng của giá.",
    },
  },
  {
    id: "alt-009",
    subjectId: "alternatives",
    title: "Tỷ Lệ Cho Vay Trên Giá Trị (LTV)",
    badge: "Alternatives • Bất động sản",
    numerator: "Dư nợ vay",
    denominator: "Giá trị tài sản",
    variables: [
      { symbol: "LTV", name: "Càng cao thì đòn bẩy càng lớn và biên an toàn càng mỏng" },
    ],
    example: {
      calculation: "Vay 42 tỷ trên bất động sản trị giá 60 tỷ",
      result: "LTV 70%",
      explanation: "Giá tài sản giảm 30% là vốn chủ về 0. Đọc kèm DSCR: LTV nói về giá trị tài sản, DSCR nói về khả năng trả nợ từ dòng tiền - một khoản vay có thể an toàn ở thước đo này và nguy hiểm ở thước đo kia.",
    },
  },

  {
    id: "port-006",
    subjectId: "portfolio",
    title: "Hệ Số Beta",
    badge: "Portfolio • Rủi ro",
    numerator: "Cov(R_i, R_m)",
    denominator: "σ²_m",
    variables: [
      { symbol: "β = 1", name: "Biến động cùng nhịp thị trường" },
      { symbol: "β > 1", name: "Khuếch đại biến động thị trường" },
    ],
    example: {
      calculation: "Cov = 0.024, σ_m = 15% → σ²_m = 0.0225",
      result: "β = 1.07",
      explanation: "Beta chỉ đo rủi ro HỆ THỐNG - phần không đa dạng hoá được. Phần rủi ro riêng của doanh nghiệp không nằm trong beta và cũng không được thị trường trả công.",
    },
  },
  {
    id: "port-007",
    subjectId: "portfolio",
    title: "Lợi Nhuận Kỳ Vọng và Beta của Danh Mục",
    badge: "Portfolio • Cấu trúc",
    equation: "E(R_p) = Σ wᵢ E(Rᵢ)   |   β_p = Σ wᵢ βᵢ",
    variables: [
      { symbol: "wᵢ", name: "Tỷ trọng tài sản i, tổng bằng 1" },
    ],
    example: {
      calculation: "60% cổ phiếu β=1.2, 40% trái phiếu β=0.2",
      result: "β_p = 0.8",
      explanation: "Lợi nhuận và beta cộng tuyến tính theo tỷ trọng. RỦI RO thì không - phương sai danh mục còn phụ thuộc tương quan, và đó chính là chỗ đa dạng hoá tạo ra giá trị.",
    },
  },
  {
    id: "port-008",
    subjectId: "portfolio",
    title: "Đường Thị Trường Vốn (CML)",
    badge: "Portfolio • Lý thuyết",
    equation: "E(R_p) = R_f + [(E(R_m) − R_f) / σ_m] × σ_p",
    variables: [
      { symbol: "Độ dốc", name: "Chính là hệ số Sharpe của danh mục thị trường - giá thị trường của rủi ro" },
    ],
    example: {
      calculation: "R_f = 4%, E(R_m) = 11%, σ_m = 16%, σ_p = 8%",
      result: "E(R_p) = 7.5%",
      explanation: "CML đo rủi ro bằng σ (TỔNG rủi ro) và chỉ áp dụng cho danh mục hiệu quả. SML đo bằng β (rủi ro hệ thống) và áp dụng cho mọi tài sản - lẫn hai đường này là lỗi kinh điển của Level I.",
    },
  },
  {
    id: "port-009",
    subjectId: "portfolio",
    title: "Hàm Hữu Dụng của Nhà Đầu Tư",
    badge: "Portfolio • Khẩu vị rủi ro",
    equation: "U = E(R) − ½ × A × σ²",
    variables: [
      { symbol: "A", name: "Hệ số ngại rủi ro; càng lớn càng ngại rủi ro" },
    ],
    example: {
      calculation: "E(R) = 12%, σ = 20%, A = 4",
      result: "U = 0.12 − 0.5×4×0.04 = 4%",
      explanation: "A âm là người TÌM rủi ro, A = 0 là trung lập. Cùng một danh mục cho ra mức hữu dụng khác nhau với từng người - đó là lý do không tồn tại một danh mục 'tốt nhất' chung cho mọi nhà đầu tư.",
    },
  },
  {
    id: "port-010",
    subjectId: "portfolio",
    title: "Sai Số Bám Chỉ Số (Tracking Error)",
    badge: "Portfolio • Đánh giá",
    equation: "TE = Độ lệch chuẩn của (R_p − R_b)",
    variables: [
      { symbol: "R_b", name: "Lợi nhuận của chỉ số tham chiếu" },
    ],
    example: {
      calculation: "Chênh lệch hằng năm: +2%, −1%, +3%, 0%, +1%",
      result: "TE ≈ 1.6%",
      explanation: "Quỹ chỉ số tốt có TE dưới 0.5%. TE là mẫu số của Information Ratio, nên một quỹ vượt chỉ số nhờ đặt cược lớn có thể có IR thấp hơn quỹ vượt ít mà đều đặn.",
    },
  },
];
