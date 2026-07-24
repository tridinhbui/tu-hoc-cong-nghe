export interface CfaGlossaryTerm {
  id: string;
  termEn: string;
  termVi: string;
  subjectId: "ethics" | "quant" | "econ" | "fsa" | "corporate" | "equity" | "fixed-income" | "derivatives" | "alt" | "portfolio";
  definitionVi: string;
  definitionEn?: string;
  formula?: {
    numerator?: string;
    denominator?: string;
    multiplier?: string;
    equation?: string;
  };
  example?: string;
  cfaTip?: string;
}

export const CFA_GLOSSARY_TERMS: CfaGlossaryTerm[] = [
  // 1. FINANCIAL STATEMENT ANALYSIS (FSA)
  {
    id: "fsa-001",
    termEn: "Return on Equity (ROE)",
    termVi: "Tỷ suất lợi nhuận trên vốn chủ sở hữu",
    subjectId: "fsa",
    definitionVi: "Đo lường mức độ hiệu quả của doanh nghiệp trong việc sử dụng vốn của cổ đông để tạo ra lợi nhuận ròng.",
    definitionEn: "Measures a corporation's profitability by revealing how much profit a company generates with the money shareholders have invested.",
    formula: {
      numerator: "Lợi nhuận ròng (Net Income)",
      denominator: "Vốn chủ sở hữu bình quân (Average Equity)",
      multiplier: "100%",
    },
    example: "Nếu Net Income = 150 tỷ và Average Equity = 1,000 tỷ, ROE = 15%.",
    cfaTip: "Phân tích DuPont 3 bước: ROE = Net Profit Margin × Asset Turnover × Financial Leverage.",
  },
  {
    id: "fsa-002",
    termEn: "Free Cash Flow to Firm (FCFF)",
    termVi: "Dòng tiền tự do cho toàn bộ doanh nghiệp",
    subjectId: "fsa",
    definitionVi: "Dòng tiền sẵn sàng chi trả cho tất cả các nhà cung cấp vốn (cả chủ nợ và cổ đông) sau khi đã trừ chi phí hoạt động và đầu tư tài sản cố định.",
    formula: {
      equation: "FCFF = NI + NCC + Int(1 - T) - FCInv - WCInv",
    },
    cfaTip: "NI: Net Income, NCC: Non-Cash Charges (Khấu hao), Int: Interest Expense, FCInv: Capital Expenditures, WCInv: Change in Working Capital.",
  },
  {
    id: "fsa-003",
    termEn: "DuPont Analysis (5-step)",
    termVi: "Phân tích DuPont 5 bước",
    subjectId: "fsa",
    definitionVi: "Mô hình phân tách ROE thành 5 thành phần: Tax Burden, Interest Burden, Operating Margin, Asset Turnover, và Equity Multiplier.",
    formula: {
      equation: "ROE = (NI/EBT) × (EBT/EBIT) × (EBIT/Rev) × (Rev/Asset) × (Asset/Equity)",
    },
  },
  {
    id: "fsa-004",
    termEn: "Gross Profit Margin",
    termVi: "Biên lợi nhuận gộp",
    subjectId: "fsa",
    definitionVi: "Tỷ lệ phần trăm doanh thu còn lại sau khi đã trừ đi Giá vốn bán hàng (COGS).",
    formula: {
      numerator: "Doanh thu thuần - Giá vốn bán hàng (COGS)",
      denominator: "Doanh thu thuần (Revenue)",
      multiplier: "100%",
    },
  },
  {
    id: "fsa-005",
    termEn: "Inventory Turnover",
    termVi: "Vòng quay hàng tồn kho",
    subjectId: "fsa",
    definitionVi: "Tần suất hàng tồn kho được bán và thay thế trong một khoảng thời gian.",
    formula: {
      numerator: "Giá vốn bán hàng (COGS)",
      denominator: "Hàng tồn kho bình quân (Average Inventory)",
    },
  },
  {
    id: "fsa-006",
    termEn: "Days Sales Outstanding (DSO)",
    termVi: "Số ngày thu tiền bình quân",
    subjectId: "fsa",
    definitionVi: "Số ngày trung bình cần thiết để doanh nghiệp thu hồi tiền từ các khoản phải thu khách hàng.",
    formula: {
      numerator: "365",
      denominator: "Vòng quay khoản phải thu (Receivables Turnover)",
    },
  },
  {
    id: "fsa-007",
    termEn: "Current Ratio",
    termVi: "Hệ số thanh toán hiện hành",
    subjectId: "fsa",
    definitionVi: "Đo lường khả năng của doanh nghiệp trong việc dùng tài sản ngắn hạn để thanh toán các khoản nợ ngắn hạn.",
    formula: {
      numerator: "Tài sản ngắn hạn (Current Assets)",
      denominator: "Nợ ngắn hạn (Current Liabilities)",
    },
  },
  {
    id: "fsa-008",
    termEn: "Quick Ratio (Acid-Test Ratio)",
    termVi: "Hệ số thanh toán nhanh",
    subjectId: "fsa",
    definitionVi: "Đánh giá khả năng thanh toán tức thời bằng các tài sản có thanh khoản cao nhất (loại bỏ Hàng tồn kho).",
    formula: {
      numerator: "Tiền + Khoản tương đương tiền + Chứng khoán ngắn hạn + Phải thu",
      denominator: "Nợ ngắn hạn (Current Liabilities)",
    },
  },

  // 2. ETHICS & PROFESSIONAL STANDARDS
  {
    id: "eth-001",
    termEn: "Code of Ethics",
    termVi: "Quy tắc Đạo đức Nghề nghiệp CFA",
    subjectId: "ethics",
    definitionVi: "Bộ 6 nguyên tắc đạo đức cốt lõi mà mọi thành viên và thí sinh CFA phải tuân thủ nghiêm ngặt trong mọi hoạt động đầu tư.",
  },
  {
    id: "eth-002",
    termEn: "Standard I(A): Knowledge of the Law",
    termVi: "Tiêu chuẩn I(A): Phổ cập kiến thức Pháp luật",
    subjectId: "ethics",
    definitionVi: "Yêu cầu thành viên phải hiểu và tuân thủ tất cả luật pháp hiện hành. Khi có sự xung đột giữa luật địa phương và Quy tắc CFA, phải áp dụng luật nghiêm ngặt nhất.",
  },
  {
    id: "eth-003",
    termEn: "Standard II(A): Material Nonpublic Information",
    termVi: "Tiêu chuẩn II(A): Thông tin nội bộ quan trọng",
    subjectId: "ethics",
    definitionVi: "Cấm sử dụng hoặc giao dịch dựa trên thông tin trọng yếu chưa được công bố công khai (Insider Trading). Mosaic Theory được phép sử dụng.",
    cfaTip: "Mosaic Theory: Kết hợp thông tin phi trọng yếu công khai và phi công khai để đưa ra phân tích là HỢP LỆ.",
  },
  {
    id: "eth-004",
    termEn: "Standard III(A): Loyalty, Prudence, and Care",
    termVi: "Tiêu chuẩn III(A): Trách nhiệm Trung thành & Cẩn trọng với Khách hàng",
    subjectId: "ethics",
    definitionVi: "Thành viên có nghĩa vụ ủy thác (Fiduciary Duty) luôn đặt lợi ích của khách hàng lên trên lợi ích của bản thân và công ty tuyển dụng.",
  },

  // 3. EQUITY INVESTMENTS
  {
    id: "eq-001",
    termEn: "Price-to-Earnings Ratio (P/E)",
    termVi: "Hệ số Giá trên Thu nhập",
    subjectId: "equity",
    definitionVi: "Tỷ lệ giữa giá thị trường của cổ phiếu và thu nhập trên mỗi cổ phần (EPS).",
    formula: {
      numerator: "Giá cổ phiếu (Market Price Per Share)",
      denominator: "Thu nhập trên mỗi cổ phần (EPS)",
    },
  },
  {
    id: "eq-002",
    termEn: "Dividend Discount Model (DDM)",
    termVi: "Mô hình Chiết khấu Cổ tức (Gordon Growth Model)",
    subjectId: "equity",
    definitionVi: "Định giá cổ phiếu dựa trên tổng giá trị hiện tại của toàn bộ cổ tức trong tương lai với tốc độ tăng trưởng cổ tức g không đổi.",
    formula: {
      numerator: "D1 = D0 × (1 + g)",
      denominator: "r - g",
    },
    cfaTip: "r: Tỷ suất sinh lời yêu cầu, g: Tốc độ tăng trưởng cổ tức dời dài (g < r).",
  },
  {
    id: "eq-003",
    termEn: "Enterprise Value (EV)",
    termVi: "Giá trị Doanh nghiệp",
    subjectId: "equity",
    definitionVi: "Tổng giá trị kinh tế toàn bộ của doanh nghiệp, đại diện cho số tiền thực tế cần chi để mua lại toàn bộ công ty.",
    formula: {
      equation: "EV = Vốn hóa thị trường + Tổng nợ + Cổ phiếu ưu đãi - Tiền & Tương đương tiền",
    },
  },

  // 4. FIXED INCOME
  {
    id: "fi-001",
    termEn: "Macaulay Duration",
    termVi: "Thời lượng Macaulay",
    subjectId: "fixed-income",
    definitionVi: "Thời gian bình quân gia quyền mà nhà đầu tư phải chờ để nhận lại toàn bộ dòng tiền của trái phiếu.",
  },
  {
    id: "fi-002",
    termEn: "Modified Duration",
    termVi: "Thời lượng Điều chỉnh",
    subjectId: "fixed-income",
    definitionVi: "Đo lường độ nhạy phần trăm thay đổi giá trái phiếu trước sự thay đổi 1% của lãi suất hoàn vốn (YTM).",
    formula: {
      numerator: "Macaulay Duration",
      denominator: "1 + Yield per Period",
    },
  },
  {
    id: "fi-003",
    termEn: "Yield to Maturity (YTM)",
    termVi: "Lãi suất hoàn vốn đến hạn",
    subjectId: "fixed-income",
    definitionVi: "Tỷ suất sinh lời nội hạn (IRR) nhận được nếu nhà đầu tư giữ trái phiếu cho đến ngày đáo hạn và tái đầu tư toàn bộ coupon với cùng mức lãi suất.",
  },

  // 5. CORPORATE ISSUERS
  {
    id: "corp-001",
    termEn: "Weighted Average Cost of Capital (WACC)",
    termVi: "Chi phí sử dụng vốn bình quân gia quyền",
    subjectId: "corporate",
    definitionVi: "Mức chi phí sử dụng vốn trung bình mà doanh nghiệp phải trả cho tất cả các nguồn vốn tài trợ (Nợ vay, Cổ phần ưu đãi, Cổ phần phổ thông).",
    formula: {
      equation: "WACC = (Wd × Rd × (1 - Tc)) + (Wp × Rp) + (We × Re)",
    },
  },
  {
    id: "corp-002",
    termEn: "Net Present Value (NPV)",
    termVi: "Giá trị hiện tại ròng",
    subjectId: "corporate",
    definitionVi: "Tổng giá trị hiện tại của tất cả các dòng tiền vào trong tương lai trừ đi chi phí đầu tư ban đầu.",
    formula: {
      equation: "NPV = Σ [CFt / (1 + r)^t] - Initial Outlay",
    },
    cfaTip: "Quy tắc quyết định: NPV > 0 thì chấp nhận dự án.",
  },
  {
    id: "corp-003",
    termEn: "Internal Rate of Return (IRR)",
    termVi: "Tỷ suất sinh lời nội bộ",
    subjectId: "corporate",
    definitionVi: "Mức chiết khấu làm cho NPV của dự án bằng chính xác 0.",
  },

  // 6. QUANTITATIVE METHODS
  {
    id: "quant-001",
    termEn: "Time Value of Money (TVM)",
    termVi: "Giá trị thời gian của tiền",
    subjectId: "quant",
    definitionVi: "Nguyên lý cho rằng một đồng tiền nhận được hôm nay có giá trị cao hơn một đồng tiền nhận được trong tương lai do khả năng sinh lời.",
    formula: {
      equation: "FV = PV × (1 + r)^n",
    },
  },
  {
    id: "quant-002",
    termEn: "Sharpe Ratio",
    termVi: "Hệ số Sharpe",
    subjectId: "quant",
    definitionVi: "Đo lường mức thù lao sinh lời vượt trội (Excess Return) trên mỗi đơn vị rủi ro tổng thể (Standard Deviation).",
    formula: {
      numerator: "Tỷ suất sinh lời danh mục (Rp) - Lãi suất phi rủi ro (Rf)",
      denominator: "Độ lệch chuẩn danh mục (σp)",
    },
  },

  // 7. ECONOMICS
  {
    id: "econ-001",
    termEn: "Gross Domestic Product (GDP)",
    termVi: "Tổng sản phẩm quốc nội",
    subjectId: "econ",
    definitionVi: "Tổng giá trị thị trường của tất cả hàng hóa và dịch vụ thành phẩm được sản xuất trong phạm vi lãnh thổ một quốc gia trong một khoảng thời gian.",
    formula: {
      equation: "GDP = C + I + G + (X - M)",
    },
  },
  {
    id: "econ-002",
    termEn: "Purchasing Power Parity (PPP)",
    termVi: "Ngang giá sức mua",
    subjectId: "econ",
    definitionVi: "Lý thuyết tỷ giá hối đoái cho rằng tỷ giá giữa hai đồng tiền sẽ điều chỉnh để giá của một giỏ hàng hóa ở hai quốc gia là như nhau.",
  },

  // 8. DERIVATIVES
  {
    id: "der-001",
    termEn: "Forward Contract",
    termVi: "Hợp đồng kỳ hạn",
    subjectId: "derivatives",
    definitionVi: "Thỏa thuận tư nhân giữa hai bên để mua hoặc bán một tài sản cơ sở tại một thời điểm trong tương lai với mức giá xác định trước hôm nay.",
  },
  {
    id: "der-002",
    termEn: "European Option vs American Option",
    termVi: "Quyền chọn kiểu Châu Âu và kiểu Mỹ",
    subjectId: "derivatives",
    definitionVi: "Quyền chọn kiểu Mỹ có thể thực hiện quyền bất kỳ lúc nào trước hoặc vào ngày đáo hạn; Quyền chọn kiểu Châu Âu chỉ được thực hiện vào đúng ngày đáo hạn.",
  },

  // 9. ALTERNATIVE INVESTMENTS
  {
    id: "alt-001",
    termEn: "Private Equity (PE)",
    termVi: "Quỹ đầu tư tư nhân",
    subjectId: "alt",
    definitionVi: "Hình thức đầu tư vốn trực tiếp vào các công ty tư nhân chưa niêm yết trên sàn chứng khoán.",
  },

  // 10. PORTFOLIO MANAGEMENT
  {
    id: "port-001",
    termEn: "Capital Asset Pricing Model (CAPM)",
    termVi: "Mô hình định giá tài sản vốn",
    subjectId: "portfolio",
    definitionVi: "Mô hình xác định tỷ suất sinh lời đòi hỏi của một tài sản dựa trên mức độ rủi ro hệ thống (Beta) của nó so với toàn bộ thị trường.",
    formula: {
      equation: "E(Ri) = Rf + βi × [E(Rm) - Rf]",
    },
  },
];
