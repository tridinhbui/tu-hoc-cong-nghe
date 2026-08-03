export interface CfaGlossaryTerm {
  id: string;
  termEn: string;
  termVi: string;
  subjectId: "ethics" | "quant" | "economics" | "fsa" | "corporate" | "equity" | "fixedIncome" | "derivatives" | "alternatives" | "portfolio";
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
    subjectId: "fixedIncome",
    definitionVi: "Thời gian bình quân gia quyền mà nhà đầu tư phải chờ để nhận lại toàn bộ dòng tiền của trái phiếu.",
  },
  {
    id: "fi-002",
    termEn: "Modified Duration",
    termVi: "Thời lượng Điều chỉnh",
    subjectId: "fixedIncome",
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
    subjectId: "fixedIncome",
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
    subjectId: "economics",
    definitionVi: "Tổng giá trị thị trường của tất cả hàng hóa và dịch vụ thành phẩm được sản xuất trong phạm vi lãnh thổ một quốc gia trong một khoảng thời gian.",
    formula: {
      equation: "GDP = C + I + G + (X - M)",
    },
  },
  {
    id: "econ-002",
    termEn: "Purchasing Power Parity (PPP)",
    termVi: "Ngang giá sức mua",
    subjectId: "economics",
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
    subjectId: "alternatives",
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

  // ── ALTERNATIVE INVESTMENTS ──────────────────────────────────────────────
  {
    id: "alt-002",
    termEn: "Committed Capital",
    termVi: "Vốn cam kết",
    subjectId: "alternatives",
    definitionVi: "Số vốn nhà đầu tư cam kết góp vào quỹ, được GP gọi dần trong nhiều năm chứ không chuyển ngay một lần.",
    example: "Cam kết 100 tỷ nhưng năm đầu chỉ bị gọi 20 tỷ.",
    cfaTip: "Phần chưa gọi vẫn là nghĩa vụ - và thường bị gọi mạnh nhất đúng lúc thị trường giảm.",
  },
  {
    id: "alt-003",
    termEn: "Capital Call",
    termVi: "Lệnh gọi vốn",
    subjectId: "alternatives",
    definitionVi: "Thông báo của GP yêu cầu LP chuyển một phần vốn đã cam kết, thường có thời hạn rất ngắn.",
    cfaTip: "LP không kiểm soát thời điểm, nên phải giữ sẵn thanh khoản cho phần cam kết chưa gọi.",
  },
  {
    id: "alt-004",
    termEn: "J-Curve",
    termVi: "Đường cong chữ J",
    subjectId: "alternatives",
    definitionVi: "Mô hình lợi nhuận đặc trưng của quỹ PE: âm ở những năm đầu vì phí và chi phí đi trước lợi nhuận, rồi dương dần khi thoái vốn.",
    cfaTip: "IRR của một quỹ PE ở năm thứ ba gần như luôn xấu, và điều đó không nói gì về kết quả cuối.",
  },
  {
    id: "alt-005",
    termEn: "Carried Interest",
    termVi: "Phần chia lợi nhuận",
    subjectId: "alternatives",
    definitionVi: "Phần lợi nhuận GP được hưởng sau khi LP nhận đủ vốn gốc và mức lợi nhuận ưu tiên, thường 20%.",
    cfaTip: "Carry chỉ phát sinh sau hurdle - đây là chỗ hay bị nhầm với phí quản lý.",
  },
  {
    id: "alt-006",
    termEn: "Hurdle Rate",
    termVi: "Ngưỡng lợi nhuận ưu tiên",
    subjectId: "alternatives",
    definitionVi: "Mức lợi nhuận LP phải nhận được trước khi GP bắt đầu được chia carry.",
    example: "Hurdle 8%: quỹ lãi 6% thì GP không nhận carry.",
  },
  {
    id: "alt-007",
    termEn: "Vintage Year",
    termVi: "Năm gọi vốn đầu",
    subjectId: "alternatives",
    definitionVi: "Năm quỹ bắt đầu triển khai vốn, dùng để so sánh các quỹ cùng điều kiện thị trường.",
    cfaTip: "So hai quỹ khác vintage là so hai chu kỳ kinh tế khác nhau, không phải so kỹ năng.",
  },
  {
    id: "alt-008",
    termEn: "Lock-up Period",
    termVi: "Thời gian khóa vốn",
    subjectId: "alternatives",
    definitionVi: "Khoảng thời gian nhà đầu tư không được rút vốn khỏi quỹ.",
    cfaTip: "Đây là thứ tạo ra phần bù kém thanh khoản - và cũng là rủi ro thật khi bạn cần tiền.",
  },
  {
    id: "alt-009",
    termEn: "Contango và Backwardation",
    termVi: "Bù hoãn mua và bù hoãn bán",
    subjectId: "alternatives",
    definitionVi: "Trạng thái đường cong giá tương lai hàng hóa: contango là giá tương lai cao hơn giao ngay, backwardation thì ngược lại.",
    cfaTip: "Quỹ hàng hóa phải đảo hợp đồng liên tục, nên contango kéo dài bào mòn lợi nhuận dù giá giao ngay không đổi.",
  },

  // ── PORTFOLIO MANAGEMENT ─────────────────────────────────────────────────
  {
    id: "port-002",
    termEn: "Efficient Frontier",
    termVi: "Đường biên hiệu quả",
    subjectId: "portfolio",
    definitionVi: "Tập hợp các danh mục cho lợi nhuận cao nhất ứng với mỗi mức rủi ro.",
    cfaTip: "Mọi danh mục nằm dưới đường này đều có thể cải thiện mà không cần gánh thêm rủi ro.",
  },
  {
    id: "port-003",
    termEn: "Systematic Risk",
    termVi: "Rủi ro hệ thống",
    subjectId: "portfolio",
    definitionVi: "Rủi ro của toàn thị trường, không loại bỏ được bằng đa dạng hóa.",
    cfaTip: "Chỉ rủi ro hệ thống mới được thị trường trả công - đó là toàn bộ lập luận của CAPM.",
  },
  {
    id: "port-004",
    termEn: "Unsystematic Risk",
    termVi: "Rủi ro đặc thù",
    subjectId: "portfolio",
    definitionVi: "Rủi ro riêng của một doanh nghiệp hoặc ngành, loại bỏ được bằng đa dạng hóa.",
    cfaTip: "Gánh rủi ro này là chịu thiệt mà không được bù - vì bạn có thể loại nó đi miễn phí.",
  },
  {
    id: "port-005",
    termEn: "Capital Allocation Line",
    termVi: "Đường phân bổ vốn",
    subjectId: "portfolio",
    definitionVi: "Đường nối tài sản phi rủi ro với một danh mục rủi ro, thể hiện mọi tổ hợp có thể của hai thứ đó.",
    cfaTip: "Khi danh mục rủi ro là danh mục thị trường thì đường này thành Capital Market Line.",
  },
  {
    id: "port-006",
    termEn: "Rebalancing",
    termVi: "Tái cân bằng",
    subjectId: "portfolio",
    definitionVi: "Đưa tỷ trọng danh mục về mức mục tiêu sau khi giá thị trường làm nó lệch đi.",
    cfaTip: "Nó buộc bán phần đã tăng và mua phần đã giảm - đúng điều tâm lý phản đối.",
  },
  {
    id: "port-007",
    termEn: "Strategic vs Tactical Asset Allocation",
    termVi: "Phân bổ chiến lược và chiến thuật",
    subjectId: "portfolio",
    definitionVi: "Chiến lược là tỷ trọng dài hạn theo mục tiêu; chiến thuật là lệch tạm thời khỏi mức đó theo nhận định thị trường.",
    cfaTip: "Phần lớn biến động lợi nhuận dài hạn đến từ phân bổ chiến lược, không từ chọn thời điểm.",
  },
  {
    id: "port-008",
    termEn: "Investment Policy Statement (IPS)",
    termVi: "Bản tuyên bố chính sách đầu tư",
    subjectId: "portfolio",
    definitionVi: "Tài liệu ghi mục tiêu, ràng buộc, khẩu vị rủi ro và chuẩn tham chiếu của một danh mục.",
    cfaTip: "IPS là thứ được viết lúc bình tĩnh để tuân theo lúc hoảng loạn.",
  },

  // ── QUANTITATIVE METHODS ─────────────────────────────────────────────────
  {
    id: "quant-003",
    termEn: "Time-Weighted Return",
    termVi: "Lợi nhuận theo thời gian",
    subjectId: "quant",
    definitionVi: "Đo hiệu suất chiến lược bằng cách nhân dồn lợi nhuận từng kỳ, không phụ thuộc thời điểm nạp rút vốn.",
    cfaTip: "Quỹ công bố TWR vì họ không kiểm soát việc nhà đầu tư nạp rút lúc nào.",
  },
  {
    id: "quant-004",
    termEn: "Money-Weighted Return",
    termVi: "Lợi nhuận theo trọng số tiền",
    subjectId: "quant",
    definitionVi: "Chính là IRR của toàn bộ dòng tiền, phản ánh trải nghiệm thực tế của nhà đầu tư.",
    cfaTip: "Nạp nhiều tiền ngay trước một đợt giảm sẽ kéo MWRR xuống thấp hơn hẳn TWR quỹ công bố.",
  },
  {
    id: "quant-005",
    termEn: "Type I và Type II Error",
    termVi: "Sai lầm loại I và loại II",
    subjectId: "quant",
    definitionVi: "Loại I là bác bỏ giả thuyết H0 khi nó đúng; loại II là không bác bỏ H0 khi nó sai.",
    cfaTip: "Giảm loại I bằng cách hạ mức ý nghĩa sẽ làm tăng loại II - hai sai lầm đánh đổi nhau.",
  },
  {
    id: "quant-006",
    termEn: "Central Limit Theorem",
    termVi: "Định lý giới hạn trung tâm",
    subjectId: "quant",
    definitionVi: "Phân phối của trung bình mẫu tiến về phân phối chuẩn khi cỡ mẫu đủ lớn, bất kể phân phối gốc.",
    cfaTip: "Đây là lý do phần lớn kiểm định thống kê dùng được cho dữ liệu tài chính không chuẩn.",
  },
  {
    id: "quant-007",
    termEn: "Skewness và Kurtosis",
    termVi: "Độ lệch và độ nhọn",
    subjectId: "quant",
    definitionVi: "Độ lệch đo tính bất đối xứng của phân phối; độ nhọn đo mức độ dày của phần đuôi.",
    cfaTip: "Lợi nhuận tài chính lệch trái và đuôi dày, nên độ lệch chuẩn luôn đánh giá thấp rủi ro thật.",
  },
  {
    id: "quant-008",
    termEn: "Sampling Bias",
    termVi: "Thiên lệch mẫu",
    subjectId: "quant",
    definitionVi: "Sai lệch phát sinh khi mẫu không đại diện cho tổng thể cần suy luận.",
    example: "Chỉ số hedge fund chỉ gồm quỹ còn sống và tự nguyện báo cáo.",
    cfaTip: "Thiên lệch sống sót là dạng gặp nhiều nhất trong dữ liệu hiệu suất.",
  },

  // ── ECONOMICS ────────────────────────────────────────────────────────────
  {
    id: "econ-003",
    termEn: "Business Cycle",
    termVi: "Chu kỳ kinh doanh",
    subjectId: "economics",
    definitionVi: "Dao động của sản lượng quanh xu hướng dài hạn, qua bốn giai đoạn mở rộng, đỉnh, thu hẹp và đáy.",
    cfaTip: "Mỗi giai đoạn ưu ái một nhóm ngành khác nhau - đó là cơ sở của phân bổ theo chu kỳ.",
  },
  {
    id: "econ-004",
    termEn: "Leading Indicator",
    termVi: "Chỉ báo dẫn dắt",
    subjectId: "economics",
    definitionVi: "Chỉ số thay đổi trước khi nền kinh tế đổi chiều, ví dụ PMI hay số đơn hàng mới.",
    cfaTip: "Đối lập với chỉ báo trễ như thất nghiệp, vốn chỉ xác nhận sau khi mọi chuyện đã xảy ra.",
  },
  {
    id: "econ-005",
    termEn: "Crowding Out",
    termVi: "Hiệu ứng lấn át",
    subjectId: "economics",
    definitionVi: "Việc chính phủ vay nhiều đẩy lãi suất lên và làm giảm đầu tư tư nhân.",
    cfaTip: "Đây là lập luận chính chống lại việc mở rộng tài khóa khi nền kinh tế đã gần toàn dụng.",
  },
  {
    id: "econ-006",
    termEn: "Stagflation",
    termVi: "Đình lạm",
    subjectId: "economics",
    definitionVi: "Lạm phát cao đi cùng tăng trưởng trì trệ, thường do cú sốc phía cung.",
    cfaTip: "Tình huống khó xử nhất với ngân hàng trung ương vì hai mục tiêu kéo ngược nhau.",
  },
  {
    id: "econ-007",
    termEn: "Balance of Payments",
    termVi: "Cán cân thanh toán",
    subjectId: "economics",
    definitionVi: "Ghi chép toàn bộ giao dịch kinh tế giữa một nước với phần còn lại của thế giới.",
    cfaTip: "Thặng dư tài khoản vãng lai luôn đi kèm thâm hụt tài khoản vốn - hai vế bù nhau theo định nghĩa.",
  },
  {
    id: "econ-008",
    termEn: "Comparative Advantage",
    termVi: "Lợi thế so sánh",
    subjectId: "economics",
    definitionVi: "Khả năng sản xuất một hàng hóa với chi phí cơ hội thấp hơn nước khác.",
    cfaTip: "Khác lợi thế tuyệt đối: một nước kém hơn ở mọi mặt vẫn có lợi thế so sánh ở đâu đó.",
  },

  // ── DERIVATIVES ──────────────────────────────────────────────────────────
  {
    id: "der-003",
    termEn: "Moneyness",
    termVi: "Trạng thái giá thực hiện",
    subjectId: "derivatives",
    definitionVi: "Quan hệ giữa giá cơ sở và giá thực hiện: in-the-money, at-the-money hay out-of-the-money.",
    cfaTip: "Quyền chọn ATM có giá trị thời gian lớn nhất, vì đó là chỗ bất định nhất.",
  },
  {
    id: "der-004",
    termEn: "Delta",
    termVi: "Delta",
    subjectId: "derivatives",
    definitionVi: "Mức thay đổi giá quyền chọn khi giá tài sản cơ sở đổi một đơn vị.",
    cfaTip: "Delta của call nằm giữa 0 và 1, của put giữa -1 và 0 - và nó cũng xấp xỉ xác suất kết thúc trong tiền.",
  },
  {
    id: "der-005",
    termEn: "Gamma",
    termVi: "Gamma",
    subjectId: "derivatives",
    definitionVi: "Mức thay đổi của delta khi giá cơ sở đổi - tức độ cong của quan hệ giá.",
    cfaTip: "Gamma lớn nhất ở gần giá thực hiện và gần đáo hạn, đúng lúc phòng hộ khó nhất.",
  },
  {
    id: "der-006",
    termEn: "Vega",
    termVi: "Vega",
    subjectId: "derivatives",
    definitionVi: "Mức nhạy của giá quyền chọn với thay đổi của độ biến động ngầm định.",
    cfaTip: "Mua quyền chọn là mua biến động - nên giá có thể tăng dù giá cơ sở đứng yên.",
  },
  {
    id: "der-007",
    termEn: "Implied Volatility",
    termVi: "Độ biến động ngầm định",
    subjectId: "derivatives",
    definitionVi: "Mức biến động mà thị trường đang định giá vào quyền chọn, suy ngược từ giá thị trường.",
    cfaTip: "Đây là đầu vào duy nhất của Black-Scholes không quan sát trực tiếp được.",
  },
  {
    id: "der-008",
    termEn: "Basis Risk",
    termVi: "Rủi ro chênh lệch cơ sở",
    subjectId: "derivatives",
    definitionVi: "Rủi ro công cụ phòng hộ không di chuyển khớp với tài sản cần phòng hộ.",
    example: "Phòng hộ dầu Brent bằng hợp đồng WTI.",
    cfaTip: "Phòng hộ không hoàn hảo là chuẩn mực, và basis risk là phần còn lại sau khi phòng hộ.",
  },

  // ── CORPORATE, EQUITY, FIXED INCOME, ETHICS (bổ sung) ────────────────────
  {
    id: "corp-004",
    termEn: "Optimal Capital Structure",
    termVi: "Cấu trúc vốn tối ưu",
    subjectId: "corporate",
    definitionVi: "Tỷ lệ nợ trên vốn chủ làm WACC thấp nhất, cân giữa lá chắn thuế và chi phí kiệt quệ tài chính.",
    cfaTip: "Lá chắn thuế chỉ có giá trị khi doanh nghiệp còn lợi nhuận để khấu trừ.",
  },
  {
    id: "corp-005",
    termEn: "Agency Cost",
    termVi: "Chi phí đại diện",
    subjectId: "corporate",
    definitionVi: "Chi phí phát sinh khi người quản lý theo đuổi lợi ích riêng thay vì lợi ích cổ đông.",
    cfaTip: "Nợ vay làm giảm chi phí này bằng cách buộc doanh nghiệp phải trả tiền mặt định kỳ.",
  },
  {
    id: "corp-006",
    termEn: "Working Capital Management",
    termVi: "Quản trị vốn lưu động",
    subjectId: "corporate",
    definitionVi: "Điều hành tồn kho, phải thu và phải trả để tối thiểu tiền bị khóa trong vận hành.",
    cfaTip: "Vốn lưu động âm là lợi thế với bán lẻ và mô hình thuê bao, không phải dấu hiệu xấu.",
  },
  {
    id: "corp-007",
    termEn: "Breakeven Point",
    termVi: "Điểm hòa vốn",
    subjectId: "corporate",
    definitionVi: "Mức doanh thu tại đó lợi nhuận hoạt động bằng không.",
    formula: {
      numerator: "Chi phí cố định",
      denominator: "Biên lợi nhuận đóng góp trên mỗi đơn vị",
    },
  },
  {
    id: "eq-004",
    termEn: "Economic Moat",
    termVi: "Hào kinh tế",
    subjectId: "equity",
    definitionVi: "Lợi thế cạnh tranh bền vững giúp doanh nghiệp duy trì ROIC cao hơn chi phí vốn lâu dài.",
    cfaTip: "Không có hào thì cạnh tranh kéo ROIC về WACC, và tăng trưởng không còn tạo giá trị.",
  },
  {
    id: "eq-005",
    termEn: "Cyclical vs Defensive",
    termVi: "Cổ phiếu chu kỳ và phòng thủ",
    subjectId: "equity",
    definitionVi: "Chu kỳ biến động mạnh theo nền kinh tế; phòng thủ có cầu ổn định bất kể chu kỳ.",
    cfaTip: "P/E thấp nhất của cổ phiếu chu kỳ thường xuất hiện ngay trước khi lợi nhuận đảo chiều xuống.",
  },
  {
    id: "eq-006",
    termEn: "Free Float",
    termVi: "Tỷ lệ cổ phiếu tự do chuyển nhượng",
    subjectId: "equity",
    definitionVi: "Phần cổ phiếu thực sự giao dịch được trên thị trường, không bị nắm giữ cố định.",
    cfaTip: "Free float thấp làm giá dễ bị đẩy và làm chỉ số kém đại diện.",
  },
  {
    id: "fi-004",
    termEn: "Yield Curve",
    termVi: "Đường cong lợi suất",
    subjectId: "fixedIncome",
    definitionVi: "Quan hệ giữa lợi suất và kỳ hạn của trái phiếu cùng chất lượng tín dụng.",
    cfaTip: "Đảo ngược thường được đọc là tín hiệu thị trường kỳ vọng kinh tế giảm tốc.",
  },
  {
    id: "fi-005",
    termEn: "Reinvestment Risk",
    termVi: "Rủi ro tái đầu tư",
    subjectId: "fixedIncome",
    definitionVi: "Rủi ro phải tái đầu tư coupon hoặc vốn gốc ở mức lãi suất thấp hơn.",
    cfaTip: "Ngược chiều với rủi ro giá - đó là lý do trái phiếu zero-coupon không có rủi ro tái đầu tư.",
  },
  {
    id: "fi-006",
    termEn: "Callable và Putable Bond",
    termVi: "Trái phiếu có quyền mua lại và quyền bán lại",
    subjectId: "fixedIncome",
    definitionVi: "Callable cho bên phát hành quyền mua lại sớm; putable cho trái chủ quyền bán lại.",
    cfaTip: "Quyền nằm trong tay ai thì bên đó có lợi - nên callable phải trả lợi suất cao hơn để bù.",
  },
  {
    id: "eth-006",
    termEn: "Mosaic Theory",
    termVi: "Lý thuyết ghép mảnh",
    subjectId: "ethics",
    definitionVi: "Kết luận trọng yếu rút ra từ việc ghép nhiều mảnh thông tin không trọng yếu là hợp pháp.",
    cfaTip: "Chỉ cần một mảnh là thông tin nội bộ trọng yếu thì cả chuỗi mất tính hợp pháp.",
  },
  {
    id: "eth-007",
    termEn: "Material Nonpublic Information",
    termVi: "Thông tin trọng yếu chưa công bố",
    subjectId: "ethics",
    definitionVi: "Thông tin mà nhà đầu tư hợp lý sẽ dùng để ra quyết định và chưa được công bố rộng rãi.",
    cfaTip: "Trọng yếu đo bằng ảnh hưởng tới quyết định, không bằng cấp bậc người nắm thông tin.",
  },
  {
    id: "eth-008",
    termEn: "Fiduciary Duty",
    termVi: "Nghĩa vụ ủy thác",
    subjectId: "ethics",
    definitionVi: "Nghĩa vụ pháp lý đặt lợi ích của bên được phục vụ lên trên lợi ích của chính mình.",
    cfaTip: "Cao hơn chuẩn phù hợp (suitability): không chỉ là sản phẩm hợp lý mà phải là lựa chọn tốt nhất.",
  },
];
