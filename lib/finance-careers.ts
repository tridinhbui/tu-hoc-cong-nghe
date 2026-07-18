// Curated "chân dung nghề nghiệp" (career profile) content for the /viec-lam
// page - JD summary + required skills per finance career family, aimed at
// this app's audience (personal finance learners, professional/corporate +
// investment branches, CFA candidates). Hand-written from general knowledge
// of how these roles are typically described in the Vietnamese job market,
// not sourced from any single real posting - salaryHint is deliberately a
// broad illustrative range with an explicit disclaimer in the UI, not a
// precise statistic, since presenting a fabricated specific figure as real
// market data would be misleading.
export interface FinanceCareer {
  id: string;
  title: string;
  englishTitle: string;
  emoji: string;
  accentFrom: string;
  accentTo: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  entryLevel: string;
  salaryHint: string;
  searchKeyword: string;
}

export const FINANCE_CAREERS: FinanceCareer[] = [
  {
    id: "financial-analyst",
    title: "Chuyên viên Phân tích Tài chính",
    englishTitle: "Financial Analyst",
    emoji: "📊",
    accentFrom: "#34d399",
    accentTo: "#0d9488",
    summary: "Phân tích báo cáo tài chính, xây dựng mô hình định giá và đưa ra khuyến nghị đầu tư/kinh doanh dựa trên số liệu.",
    responsibilities: [
      "Xây dựng và cập nhật mô hình tài chính (DCF, comps, sensitivity analysis)",
      "Phân tích báo cáo tài chính doanh nghiệp, phát hiện xu hướng và rủi ro",
      "Chuẩn bị báo cáo, thuyết trình khuyến nghị cho ban lãnh đạo/nhà đầu tư",
      "Theo dõi biến động thị trường và tác động đến danh mục/dự án đang phân tích",
    ],
    skills: ["Excel/mô hình tài chính", "Đọc hiểu BCTC", "Định giá doanh nghiệp", "Tư duy phản biện", "PowerPoint"],
    entryLevel: "Fresh/Junior - cần nền tảng kế toán, tài chính doanh nghiệp",
    salaryHint: "~10-25 triệu (fresher-junior), 25-50+ triệu (senior)",
    searchKeyword: "Phân tích tài chính",
  },
  {
    id: "accountant",
    title: "Kế toán viên",
    englishTitle: "Accountant",
    emoji: "🧾",
    accentFrom: "#38bdf8",
    accentTo: "#2563eb",
    summary: "Ghi nhận, kiểm soát và tổng hợp các nghiệp vụ tài chính - kế toán, đảm bảo sổ sách tuân thủ chuẩn mực và pháp luật.",
    responsibilities: [
      "Hạch toán các nghiệp vụ kinh tế phát sinh hàng ngày",
      "Lập báo cáo tài chính, báo cáo thuế định kỳ",
      "Đối chiếu công nợ, kiểm soát chứng từ, hóa đơn",
      "Phối hợp kiểm toán nội bộ/độc lập khi cần",
    ],
    skills: ["Nguyên lý kế toán", "Phần mềm kế toán (Misa, Fast...)", "Luật thuế", "Tỉ mỉ, chính xác", "Excel"],
    entryLevel: "Fresh/Junior - phù hợp sinh viên mới ra trường ngành kế toán/tài chính",
    salaryHint: "~8-15 triệu (fresher-junior), 15-30+ triệu (senior/kế toán tổng hợp)",
    searchKeyword: "Kế toán",
  },
  {
    id: "auditor",
    title: "Kiểm toán viên",
    englishTitle: "Auditor",
    emoji: "🔍",
    accentFrom: "#a78bfa",
    accentTo: "#7c3aed",
    summary: "Kiểm tra, đánh giá tính trung thực và hợp lý của báo cáo tài chính doanh nghiệp theo chuẩn mực kiểm toán.",
    responsibilities: [
      "Thu thập bằng chứng kiểm toán, kiểm tra chứng từ và số liệu",
      "Đánh giá hệ thống kiểm soát nội bộ của khách hàng",
      "Lập báo cáo kiểm toán, trao đổi phát hiện với khách hàng",
      "Cập nhật chuẩn mực kế toán/kiểm toán (VAS, IFRS) liên tục",
    ],
    skills: ["Chuẩn mực kế toán/kiểm toán", "Phân tích rủi ro", "Giao tiếp với khách hàng", "Chịu áp lực mùa kiểm toán", "Excel"],
    entryLevel: "Fresh/Junior - các công ty Big4/kiểm toán trong nước tuyển ồ ạt hàng năm",
    salaryHint: "~10-18 triệu (fresher-junior), 20-40+ triệu (senior/manager)",
    searchKeyword: "Kiểm toán",
  },
  {
    id: "investment-banking",
    title: "Ngân hàng Đầu tư",
    englishTitle: "Investment Banking",
    emoji: "🏦",
    accentFrom: "#fbbf24",
    accentTo: "#d97706",
    summary: "Tư vấn M&A, huy động vốn (IPO/trái phiếu), định giá doanh nghiệp cho khách hàng doanh nghiệp/tổ chức.",
    responsibilities: [
      "Xây dựng mô hình định giá phức tạp cho thương vụ M&A/IPO",
      "Chuẩn bị tài liệu chào bán (pitch book, information memorandum)",
      "Hỗ trợ due diligence, làm việc với luật sư/kiểm toán trong thương vụ",
      "Nghiên cứu ngành, đối thủ cạnh tranh phục vụ tư vấn chiến lược",
    ],
    skills: ["Định giá nâng cao", "Excel/PowerPoint chuyên sâu", "Tiếng Anh tốt", "Chịu áp lực cao", "CFA là lợi thế lớn"],
    entryLevel: "Junior - cạnh tranh cao, thường ưu tiên CFA Level I-II hoặc kinh nghiệm thực tập liên quan",
    salaryHint: "~15-30 triệu (analyst), 40-80+ triệu (associate trở lên)",
    searchKeyword: "Investment Banking",
  },
  {
    id: "fund-manager",
    title: "Quản lý Quỹ Đầu tư",
    englishTitle: "Fund/Portfolio Manager",
    emoji: "📈",
    accentFrom: "#f472b6",
    accentTo: "#db2777",
    summary: "Xây dựng và quản lý danh mục đầu tư (cổ phiếu, trái phiếu, tài sản khác) nhằm đạt mục tiêu sinh lời cho quỹ/khách hàng.",
    responsibilities: [
      "Nghiên cứu, lựa chọn tài sản đầu tư phù hợp chiến lược quỹ",
      "Theo dõi, tái cân bằng danh mục theo diễn biến thị trường",
      "Quản trị rủi ro danh mục, tuân thủ giới hạn đầu tư",
      "Báo cáo hiệu suất định kỳ cho nhà đầu tư/ban lãnh đạo",
    ],
    skills: ["Phân tích đầu tư", "Quản trị rủi ro danh mục", "CFA/CIIA là lợi thế lớn", "Ra quyết định dưới áp lực", "Vĩ mô & thị trường"],
    entryLevel: "Senior - thường yêu cầu vài năm kinh nghiệm phân tích đầu tư trước khi quản lý danh mục",
    salaryHint: "~25-50 triệu (junior PM), 60-150+ triệu (senior, gắn với hiệu suất)",
    searchKeyword: "Quản lý quỹ đầu tư",
  },
  {
    id: "credit-officer",
    title: "Chuyên viên Tín dụng",
    englishTitle: "Credit Officer",
    emoji: "💳",
    accentFrom: "#60a5fa",
    accentTo: "#1d4ed8",
    summary: "Thẩm định hồ sơ vay vốn của khách hàng cá nhân/doanh nghiệp, quản lý danh mục cho vay tại ngân hàng/tổ chức tín dụng.",
    responsibilities: [
      "Thu thập, thẩm định hồ sơ vay và khả năng trả nợ của khách hàng",
      "Đánh giá tài sản đảm bảo, lập tờ trình tín dụng",
      "Theo dõi, nhắc nợ và xử lý nợ quá hạn trong danh mục phụ trách",
      "Tư vấn sản phẩm tín dụng phù hợp nhu cầu khách hàng",
    ],
    skills: ["Thẩm định tín dụng", "Đọc hiểu BCTC khách hàng doanh nghiệp", "Giao tiếp, tư vấn", "Chịu chỉ tiêu (KPI)", "Quản trị rủi ro"],
    entryLevel: "Fresh/Junior - một trong những ngả vào ngân hàng phổ biến nhất cho sinh viên mới ra trường",
    salaryHint: "~8-15 triệu + thưởng KPI (fresher-junior), 20-35+ triệu (senior)",
    searchKeyword: "Chuyên viên tín dụng",
  },
  {
    id: "fpa",
    title: "FP&A (Kế hoạch & Phân tích Tài chính)",
    englishTitle: "Financial Planning & Analysis",
    emoji: "🧮",
    accentFrom: "#2dd4bf",
    accentTo: "#0891b2",
    summary: "Lập kế hoạch ngân sách, dự báo tài chính và phân tích hiệu quả kinh doanh để hỗ trợ ra quyết định nội bộ doanh nghiệp.",
    responsibilities: [
      "Xây dựng ngân sách, dự báo doanh thu - chi phí theo kỳ",
      "Phân tích chênh lệch thực tế so với kế hoạch (variance analysis)",
      "Hỗ trợ ban lãnh đạo ra quyết định đầu tư, cắt giảm chi phí",
      "Xây dựng báo cáo quản trị (dashboard, KPI tài chính)",
    ],
    skills: ["Lập ngân sách & dự báo", "Excel nâng cao/BI tools", "Phân tích chi phí - lợi ích", "Giao tiếp với các phòng ban", "Tư duy kinh doanh"],
    entryLevel: "Junior đến Senior - thường tuyển từ kế toán/kiểm toán chuyển hướng sau vài năm",
    salaryHint: "~15-25 triệu (junior), 30-60+ triệu (senior/manager)",
    searchKeyword: "FP&A",
  },
  {
    id: "risk-management",
    title: "Chuyên viên Quản lý Rủi ro",
    englishTitle: "Risk Management",
    emoji: "🛡️",
    accentFrom: "#f87171",
    accentTo: "#b91c1c",
    summary: "Nhận diện, đo lường và kiểm soát các loại rủi ro (tín dụng, thị trường, vận hành) trong ngân hàng/tổ chức tài chính.",
    responsibilities: [
      "Xây dựng và giám sát các mô hình đo lường rủi ro",
      "Thiết lập hạn mức rủi ro, cảnh báo sớm khi vượt ngưỡng",
      "Phối hợp các phòng ban để giảm thiểu rủi ro vận hành",
      "Báo cáo rủi ro định kỳ theo yêu cầu quản trị/quy định",
    ],
    skills: ["Thống kê/định lượng", "Hiểu biết quy định (Basel, NHNN)", "Excel/SQL cơ bản", "Tư duy hệ thống", "CFA/FRM là lợi thế"],
    entryLevel: "Junior đến Senior - phổ biến tại ngân hàng và công ty chứng khoán",
    salaryHint: "~15-25 triệu (junior), 35-70+ triệu (senior)",
    searchKeyword: "Quản lý rủi ro",
  },
  {
    id: "investment-analyst",
    title: "Chuyên viên Đầu tư (CFA Track)",
    englishTitle: "Investment Analyst",
    emoji: "🎯",
    accentFrom: "#c084fc",
    accentTo: "#9333ea",
    summary: "Nghiên cứu ngành/doanh nghiệp, xây dựng luận điểm đầu tư và khuyến nghị mua/bán cho công ty chứng khoán, quỹ đầu tư.",
    responsibilities: [
      "Nghiên cứu chuyên sâu một hoặc vài ngành phụ trách",
      "Xây dựng báo cáo phân tích, khuyến nghị đầu tư (research report)",
      "Cập nhật mô hình định giá theo kết quả kinh doanh mới nhất",
      "Trình bày luận điểm đầu tư trước hội đồng đầu tư/khách hàng",
    ],
    skills: ["Phân tích ngành & doanh nghiệp", "Định giá (DCF, P/E, EV/EBITDA...)", "Viết báo cáo phân tích", "CFA là lợi thế rất lớn", "Tiếng Anh"],
    entryLevel: "Junior - nhiều công ty chứng khoán tuyển fresh CFA Level I/II candidate",
    salaryHint: "~12-22 triệu (junior), 30-60+ triệu (senior analyst)",
    searchKeyword: "Chuyên viên phân tích đầu tư",
  },
  {
    id: "cfo-track",
    title: "Kế toán trưởng / CFO Track",
    englishTitle: "Chief Accountant / CFO Track",
    emoji: "👔",
    accentFrom: "#fb923c",
    accentTo: "#c2410c",
    summary: "Quản lý toàn bộ hoạt động tài chính - kế toán doanh nghiệp, tham mưu chiến lược tài chính cho ban điều hành.",
    responsibilities: [
      "Giám sát, chịu trách nhiệm tính chính xác của báo cáo tài chính",
      "Xây dựng chiến lược tài chính, huy động vốn cho doanh nghiệp",
      "Quản lý dòng tiền, kiểm soát rủi ro tài chính tổng thể",
      "Tư vấn ban điều hành các quyết định đầu tư, M&A lớn",
    ],
    skills: ["Quản trị tài chính doanh nghiệp", "Lãnh đạo đội ngũ", "CMA/ACCA/CFA là lợi thế", "Tư duy chiến lược", "Đàm phán với ngân hàng/nhà đầu tư"],
    entryLevel: "Senior - đích đến sau 7-10+ năm kinh nghiệm kế toán/tài chính",
    salaryHint: "~40-80 triệu (kế toán trưởng), 100+ triệu (CFO công ty lớn)",
    searchKeyword: "Kế toán trưởng",
  },
];
