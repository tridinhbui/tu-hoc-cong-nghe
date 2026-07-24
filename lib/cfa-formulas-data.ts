import { FormulaVariable, FormulaExample } from "@/components/FormulaBlock";

export interface CfaFormulaItem {
  id: string;
  subjectId: "quant" | "fsa" | "corporate" | "equity" | "fixed-income" | "derivatives" | "portfolio" | "econ" | "ethics" | "alt";
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
    subjectId: "fixed-income",
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
    subjectId: "fixed-income",
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
];
