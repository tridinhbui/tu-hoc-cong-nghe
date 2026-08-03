import { FormulaVariable, FormulaExample } from "@/components/FormulaBlock";
import type { FrmSubjectId } from "@/lib/frm-track";

// Sổ tay công thức FRM, đối xứng với lib/cfa-formulas-data.ts.
//
// `subjectId` dùng đúng id của lib/frm-track.ts, nhờ vậy bộ lọc trên trang
// /frm/formulas không phải giữ một bản sao danh sách môn thứ hai.
//
// Bài học rút từ sổ tay CFA: một môn không có công thức nào hiển thị y hệt
// một môn có công thức nhưng bộ lọc không khớp - trang trông vẫn chạy. Vì vậy
// lib/__tests__/frm-formulas.test.ts chặn ngay từ đầu: mọi môn tính toán được
// phải có tối thiểu ba công thức. Hai môn được miễn là operational-resilience
// và current-issues, vốn là môn khung và môn thời sự.

export interface FrmFormulaItem {
  id: string;
  subjectId: FrmSubjectId;
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

export const FRM_FORMULAS_DATA: FrmFormulaItem[] = [
  // ─── FOUNDATIONS OF RISK MANAGEMENT ──────────────────────────────────
  {
    id: "f-001",
    subjectId: "foundations",
    title: "Tỷ số Sharpe (Sharpe Ratio)",
    badge: "Foundations • Hiệu quả điều chỉnh rủi ro",
    numerator: "Lợi suất danh mục (Rp) − Lãi suất phi rủi ro (Rf)",
    denominator: "Độ lệch chuẩn của danh mục (σp)",
    variables: [
      { symbol: "Rp", name: "Lợi suất danh mục" },
      { symbol: "Rf", name: "Lãi suất phi rủi ro" },
      { symbol: "σp", name: "Độ lệch chuẩn - đo TOÀN BỘ rủi ro, cả hệ thống lẫn riêng lẻ" },
    ],
    example: {
      title: "So hai quỹ",
      calculation: "Quỹ A: (18% − 4%) / 20% · Quỹ B: (11% − 4%) / 7%",
      result: "A = 0,70 · B = 1,00",
      explanation: "Quỹ A lãi cao hơn hẳn nhưng Sharpe thấp hơn - phần lớn lợi suất tăng thêm đến từ việc gánh thêm rủi ro, không phải từ kỹ năng.",
    },
  },
  {
    id: "f-002",
    subjectId: "foundations",
    title: "Tỷ số Treynor (Treynor Ratio)",
    badge: "Foundations • Hiệu quả điều chỉnh rủi ro",
    numerator: "Lợi suất danh mục (Rp) − Lãi suất phi rủi ro (Rf)",
    denominator: "Beta của danh mục (βp)",
    variables: [
      { symbol: "βp", name: "Beta - chỉ đo phần rủi ro hệ thống, không đo rủi ro riêng lẻ" },
    ],
    example: {
      title: "Khi nào dùng thay Sharpe",
      calculation: "Danh mục là một mảnh trong tổng tài sản đã đa dạng hoá tốt",
      result: "Dùng Treynor",
      explanation: "Mẫu số là beta nên nó ngầm giả định rủi ro riêng lẻ đã bị đa dạng hoá đi. Áp cho một danh mục dồn vào vài mã sẽ cho con số đẹp giả tạo.",
    },
  },
  {
    id: "f-003",
    subjectId: "foundations",
    title: "Jensen's Alpha",
    badge: "Foundations • Kỹ năng quản lý",
    equation: "α = Rp − [Rf + β × (Rm − Rf)]",
    variables: [
      { symbol: "α", name: "Phần lợi suất vượt trên mức CAPM dự báo cho đúng beta đó" },
      { symbol: "Rm", name: "Lợi suất danh mục thị trường" },
    ],
    example: {
      title: "Đọc alpha dương",
      calculation: "Rp = 14%, Rf = 4%, β = 1,2, Rm = 11% → 14% − [4% + 1,2 × 7%]",
      result: "α = +1,6%",
      explanation: "Thắng được cả sau khi đã trừ phần giải thích được bằng mức phơi nhiễm rủi ro thị trường - đây là ứng viên gần nhất cho khái niệm kỹ năng.",
    },
  },
  {
    id: "f-004",
    subjectId: "foundations",
    title: "Information Ratio",
    badge: "Foundations • Quản lý chủ động",
    numerator: "Lợi suất danh mục − Lợi suất chỉ số tham chiếu",
    denominator: "Sai số theo dõi (tracking error)",
    variables: [
      { symbol: "Tracking error", name: "Độ lệch chuẩn của phần chênh lệch so với chỉ số tham chiếu" },
    ],
    example: {
      title: "Ý nghĩa",
      calculation: "Vượt chuẩn 3%/năm với sai số theo dõi 6% → 3 / 6",
      result: "IR = 0,5",
      explanation: "Mỗi đơn vị dám lệch khỏi chuẩn đổi được bao nhiêu lợi suất vượt chuẩn. Với quỹ thụ động thì cả tử lẫn mẫu đều gần 0 nên thước đo mất nghĩa.",
    },
  },
  {
    id: "f-005",
    subjectId: "foundations",
    title: "CAPM - Lợi suất kỳ vọng",
    badge: "Foundations • Mô hình định giá tài sản",
    equation: "E(Ri) = Rf + βi × [E(Rm) − Rf]",
    variables: [
      { symbol: "βi", name: "Độ nhạy của tài sản i với danh mục thị trường" },
      { symbol: "E(Rm) − Rf", name: "Phần bù rủi ro thị trường" },
    ],
    example: {
      title: "Lập luận nền",
      calculation: "Rf = 4%, β = 1,3, phần bù thị trường = 6% → 4% + 1,3 × 6%",
      result: "11,8%",
      explanation: "Chỉ rủi ro hệ thống được đền bù: thị trường không trả tiền cho phần rủi ro mà nhà đầu tư tự loại bỏ được miễn phí bằng đa dạng hoá.",
    },
  },

  // ─── QUANTITATIVE ANALYSIS ───────────────────────────────────────────
  {
    id: "q-001",
    subjectId: "quant-analysis",
    title: "Định lý Bayes",
    badge: "Quant • Xác suất có điều kiện",
    numerator: "P(B|A) × P(A)",
    denominator: "P(B)",
    variables: [
      { symbol: "P(A)", name: "Xác suất tiên nghiệm - niềm tin trước khi có dữ liệu mới" },
      { symbol: "P(A|B)", name: "Xác suất hậu nghiệm - con số thực sự cần biết" },
    ],
    example: {
      title: "Nghịch lý báo động sai",
      calculation: "Hệ thống đúng 99%, tỷ lệ gian lận thật 1‰. Trong 1 triệu giao dịch: 990 ca bắt đúng, ~9.990 báo nhầm",
      result: "≈ 9% báo động là thật",
      explanation: "Xác suất nền thấp chi phối kết quả mạnh hơn độ chính xác của hệ thống - đây là lý do bộ phận tuân thủ ngập trong cảnh báo sai.",
    },
  },
  {
    id: "q-002",
    subjectId: "quant-analysis",
    title: "Sai số chuẩn của mô phỏng Monte Carlo",
    badge: "Quant • Mô phỏng",
    numerator: "Độ lệch chuẩn của kết quả mô phỏng (σ)",
    denominator: "Căn bậc hai số lần chạy (√N)",
    variables: [
      { symbol: "N", name: "Số lần mô phỏng" },
    ],
    example: {
      title: "Vì sao cần kỹ thuật giảm phương sai",
      calculation: "Muốn sai số giảm một nửa → N phải tăng gấp 4",
      result: "Chi phí tính toán gấp 4 lần",
      explanation: "Tốc độ hội tụ theo căn bậc hai là giới hạn cơ bản. Với danh mục mà mỗi lần định giá đã tốn kém, đây là lý do biến đối ngẫu và lấy mẫu quan trọng tồn tại.",
    },
  },
  {
    id: "q-003",
    subjectId: "quant-analysis",
    title: "Hệ số tương quan (Correlation)",
    badge: "Quant • Phụ thuộc",
    numerator: "Hiệp phương sai giữa X và Y - Cov(X,Y)",
    denominator: "σX × σY",
    variables: [
      { symbol: "Cov(X,Y)", name: "Hiệp phương sai" },
      { symbol: "σX, σY", name: "Độ lệch chuẩn của từng biến" },
    ],
    example: {
      title: "Cạm bẫy lớn nhất",
      calculation: "Tương quan ước lượng giai đoạn bình thường ≈ 0,3",
      result: "Trong khủng hoảng tiến về 1",
      explanation: "Lợi ích đa dạng hoá tính từ tương quan quá khứ bốc hơi đúng lúc cần nhất, khi mọi người cùng bán mọi thứ để lấy tiền mặt.",
    },
  },
  {
    id: "q-004",
    subjectId: "quant-analysis",
    title: "Số tham số của ma trận hiệp phương sai",
    badge: "Quant • Rút gọn chiều",
    equation: "Số tham số = n + n × (n − 1) / 2",
    variables: [
      { symbol: "n", name: "Số yếu tố rủi ro" },
    ],
    example: {
      title: "Vì sao cần PCA",
      calculation: "n = 100 → 100 + 100 × 99 / 2",
      result: "5.050 tham số",
      explanation: "Ước lượng 5.050 tham số từ ~500 quan sát ngày (hai năm dữ liệu) cho ra ma trận đầy nhiễu - đây là lý do các kỹ thuật co rút và PCA được dùng.",
    },
  },

  // ─── FINANCIAL MARKETS AND PRODUCTS ──────────────────────────────────
  {
    id: "m-001",
    subjectId: "financial-markets-products",
    title: "Giá kỳ hạn (Forward Price)",
    badge: "Markets • Không chênh lệch giá",
    equation: "F₀ = S₀ × e^(r × T)",
    variables: [
      { symbol: "S₀", name: "Giá giao ngay hiện tại" },
      { symbol: "r", name: "Lãi suất phi rủi ro ghép liên tục" },
      { symbol: "T", name: "Thời gian tới đáo hạn (năm)" },
    ],
    example: {
      title: "Lập luận không chênh lệch giá",
      calculation: "S₀ = 100, r = 5%, T = 1 → 100 × e^0,05",
      result: "F₀ ≈ 105,13",
      explanation: "Nếu giá kỳ hạn khác con số này, ta mua rẻ bán đắt đồng thời hai thị trường và khoá lãi phi rủi ro - nên nó không tồn tại lâu.",
    },
  },
  {
    id: "m-002",
    subjectId: "financial-markets-products",
    title: "Cân bằng quyền chọn mua - bán (Put-Call Parity)",
    badge: "Markets • Phái sinh",
    equation: "C + K × e^(−r×T) = P + S₀",
    variables: [
      { symbol: "C, P", name: "Giá quyền chọn mua và quyền chọn bán, cùng K và cùng T" },
      { symbol: "K", name: "Giá thực hiện" },
    ],
    example: {
      title: "Vì sao nó phải đúng",
      calculation: "Hai vế cho đúng cùng một dòng tiền ở mọi kịch bản đáo hạn",
      result: "Lệch = cơ hội chênh lệch giá",
      explanation: "Đây là ứng dụng trực tiếp nhất của nguyên lý không chênh lệch giá, và là cách nhanh nhất kiểm tra một bảng giá quyền chọn có hợp lý không.",
    },
  },
  {
    id: "m-003",
    subjectId: "financial-markets-products",
    title: "Tỷ lệ phòng hộ tối ưu (Optimal Hedge Ratio)",
    badge: "Markets • Phòng hộ",
    numerator: "ρ × σS",
    denominator: "σF",
    variables: [
      { symbol: "ρ", name: "Tương quan giữa thay đổi giá giao ngay và giá hợp đồng tương lai" },
      { symbol: "σS, σF", name: "Độ lệch chuẩn của thay đổi giá giao ngay và giá tương lai" },
    ],
    example: {
      title: "Rủi ro nền tảng",
      calculation: "ρ = 0,9, σS = 12%, σF = 10% → 0,9 × 12 / 10",
      result: "h* = 1,08",
      explanation: "Tương quan dưới 1 nghĩa là phòng hộ không bao giờ hoàn hảo - phần chênh còn lại chính là rủi ro nền tảng.",
    },
  },
  {
    id: "m-004",
    subjectId: "financial-markets-products",
    title: "Số hợp đồng tương lai cần để phòng hộ danh mục cổ phiếu",
    badge: "Markets • Phòng hộ beta",
    numerator: "(β_mục tiêu − β_hiện tại) × Giá trị danh mục",
    denominator: "Giá trị một hợp đồng tương lai",
    variables: [
      { symbol: "β_mục tiêu", name: "Beta muốn đạt tới; bằng 0 nếu muốn trung hoà hoàn toàn" },
    ],
    example: {
      title: "Trung hoà beta",
      calculation: "Danh mục 100 tỷ, β = 1,2, muốn về 0, mỗi hợp đồng trị giá 2 tỷ → (0 − 1,2) × 100 / 2",
      result: "Bán 60 hợp đồng",
      explanation: "Cách rẻ và nhanh hơn nhiều so với bán từng cổ phiếu, và đảo lại được khi muốn khôi phục vị thế.",
    },
  },

  // ─── VALUATION AND RISK MODELS ───────────────────────────────────────
  {
    id: "v-001",
    subjectId: "valuation-risk-models",
    title: "Delta trong cây nhị thức một bước",
    badge: "Valuation • Định giá quyền chọn",
    numerator: "Cu − Cd",
    denominator: "Su − Sd",
    variables: [
      { symbol: "Cu, Cd", name: "Giá trị quyền chọn ở nhánh tăng và nhánh giảm" },
      { symbol: "Su, Sd", name: "Giá tài sản cơ sở ở nhánh tăng và nhánh giảm" },
    ],
    example: {
      title: "Dựng danh mục sao chép",
      calculation: "S = 100 → 120 hoặc 80; quyền chọn mua K = 100 → 20 hoặc 0 → (20 − 0)/(120 − 80)",
      result: "Δ = 0,5",
      explanation: "Nửa cổ phiếu cộng một khoản vay sao chép đúng quyền chọn đó. Chi phí dựng danh mục chính là giá quyền chọn - không cần biết xác suất thật.",
    },
  },
  {
    id: "v-002",
    subjectId: "valuation-risk-models",
    title: "Xác suất trung tính rủi ro",
    badge: "Valuation • Định giá quyền chọn",
    numerator: "e^(r×Δt) − d",
    denominator: "u − d",
    variables: [
      { symbol: "u, d", name: "Hệ số nhân của nhánh tăng và nhánh giảm" },
      { symbol: "Δt", name: "Độ dài một bước" },
    ],
    example: {
      title: "Không phải xác suất thật",
      calculation: "u = 1,2, d = 0,8, r = 5%, Δt = 1 → (e^0,05 − 0,8) / (1,2 − 0,8)",
      result: "p ≈ 0,628",
      explanation: "Đây là bộ trọng số toán học gộp sẵn phần bù rủi ro, nhờ đó ta được phép chiết khấu bằng lãi suất phi rủi ro. Nó không phải niềm tin của ai về khả năng tăng giá.",
    },
  },
  {
    id: "v-003",
    subjectId: "valuation-risk-models",
    title: "Ước lượng giá trái phiếu hai bậc",
    badge: "Valuation • Duration & Convexity",
    equation: "%ΔP ≈ − Duration × Δr + ½ × Convexity × (Δr)²",
    variables: [
      { symbol: "Δr", name: "Mức thay đổi của lợi suất" },
      { symbol: "Convexity", name: "Phần cong bậc hai, luôn cộng thêm khi convexity dương" },
    ],
    example: {
      title: "Vì sao cần bậc hai",
      calculation: "Duration 6, convexity 80, lãi suất tăng 2% → −6 × 2% + ½ × 80 × 0,02²",
      result: "−12% + 1,6% = −10,4%",
      explanation: "Chỉ dùng duration sẽ ước lượng lỗ nặng hơn thực tế. Phần convexity có lợi ở cả hai chiều, nên trái phiếu convexity cao thường phải trả giá bằng lợi suất thấp hơn.",
    },
  },
  {
    id: "v-004",
    subjectId: "valuation-risk-models",
    title: "DV01 (Dollar Value of one basis point)",
    badge: "Valuation • Rủi ro lãi suất",
    equation: "DV01 = Duration hiệu dụng × Giá trị vị thế × 0,0001",
    variables: [
      { symbol: "0,0001", name: "Một điểm cơ bản" },
    ],
    example: {
      title: "Vì sao bàn giao dịch thích DV01",
      calculation: "Vị thế 500 tỷ, duration 7 → 7 × 500 tỷ × 0,0001",
      result: "350 triệu/điểm cơ bản",
      explanation: "Quy ra tiền nên cộng được giữa các vị thế khác kỳ hạn và khác quy mô - thứ mà duration tính bằng phần trăm không làm được.",
    },
  },

  // ─── MARKET RISK ─────────────────────────────────────────────────────
  {
    id: "mr-001",
    subjectId: "market-risk",
    title: "VaR tham số (Parametric VaR)",
    badge: "Market Risk • Đo lường",
    equation: "VaR = V × (z × σ − μ)",
    variables: [
      { symbol: "V", name: "Giá trị danh mục" },
      { symbol: "z", name: "Phân vị chuẩn: 1,645 ở mức tin cậy 95%; 2,326 ở 99%" },
      { symbol: "σ, μ", name: "Độ lệch chuẩn và lợi suất kỳ vọng trong kỳ" },
    ],
    example: {
      title: "VaR một ngày 99%",
      calculation: "V = 100 tỷ, σ ngày = 1,5%, μ ≈ 0 → 100 × 2,326 × 1,5%",
      result: "≈ 3,49 tỷ",
      explanation: "Đọc đúng là: chỉ 1% số ngày lỗ vượt 3,49 tỷ. Nó KHÔNG nói lỗ bao nhiêu trong 1% ngày đó - đấy là việc của Expected Shortfall.",
    },
  },
  {
    id: "mr-002",
    subjectId: "market-risk",
    title: "Quy đổi VaR theo thời gian (Square Root of Time)",
    badge: "Market Risk • Quy đổi",
    equation: "VaR_T ngày = VaR_1 ngày × √T",
    variables: [
      { symbol: "T", name: "Số ngày" },
    ],
    example: {
      title: "Giả định ngầm",
      calculation: "VaR 1 ngày = 3 tỷ, T = 10 → 3 × √10",
      result: "≈ 9,49 tỷ",
      explanation: "Chỉ đúng khi lợi suất độc lập và cùng phân phối qua các ngày. Biến động dồn cụm trên thị trường thật khiến phép quy đổi này đánh giá thấp rủi ro nhiều ngày.",
    },
  },
  {
    id: "mr-003",
    subjectId: "market-risk",
    title: "Expected Shortfall (Conditional VaR)",
    badge: "Market Risk • Thước đo nhất quán",
    equation: "ES = E[ Lỗ | Lỗ > VaR ]",
    variables: [
      { symbol: "E[·|·]", name: "Kỳ vọng có điều kiện, lấy trên phần đuôi vượt ngưỡng VaR" },
    ],
    example: {
      title: "Vì sao Basel chuyển sang ES",
      calculation: "Hai danh mục cùng VaR = 3 tỷ nhưng đuôi khác nhau",
      result: "ES phân biệt được, VaR thì không",
      explanation: "VaR chỉ nói ngưỡng, không nói vượt qua rồi thì tệ tới đâu. ES còn là thước đo nhất quán - gộp hai danh mục không bao giờ ra rủi ro lớn hơn tổng hai phần.",
    },
  },
  {
    id: "mr-004",
    subjectId: "market-risk",
    title: "Ước lượng biến động EWMA",
    badge: "Market Risk • Mô hình biến động",
    equation: "σ²ₜ = λ × σ²ₜ₋₁ + (1 − λ) × r²ₜ₋₁",
    variables: [
      { symbol: "λ", name: "Hệ số suy giảm; RiskMetrics dùng 0,94 cho dữ liệu ngày" },
      { symbol: "rₜ₋₁", name: "Lợi suất kỳ trước" },
    ],
    example: {
      title: "Vì sao không dùng độ lệch chuẩn thường",
      calculation: "λ = 0,94 → quan sát cách đây 30 ngày chỉ còn trọng số ≈ 0,94³⁰ ≈ 16%",
      result: "Phản ứng nhanh với cú sốc mới",
      explanation: "Độ lệch chuẩn thường coi mọi ngày trong cửa sổ là như nhau, nên nó phản ứng chậm khi thị trường vừa chuyển sang chế độ biến động cao.",
    },
  },

  // ─── CREDIT RISK ─────────────────────────────────────────────────────
  {
    id: "c-001",
    subjectId: "credit-risk",
    title: "Tổn thất kỳ vọng (Expected Loss)",
    badge: "Credit • Cấu phần rủi ro",
    equation: "EL = PD × LGD × EAD",
    variables: [
      { symbol: "PD", name: "Xác suất vỡ nợ trong kỳ" },
      { symbol: "LGD", name: "Tỷ lệ mất vốn khi vỡ nợ = 1 − tỷ lệ thu hồi" },
      { symbol: "EAD", name: "Dư nợ tại thời điểm vỡ nợ" },
    ],
    example: {
      title: "Ba cấu phần",
      calculation: "PD = 2%, LGD = 45%, EAD = 100 tỷ → 0,02 × 0,45 × 100",
      result: "EL = 0,9 tỷ",
      explanation: "Tổn thất kỳ vọng được tính vào giá khoản vay như một chi phí. Phần vốn tồn tại cho tổn thất NGOÀI kỳ vọng, không phải cho con số này.",
    },
  },
  {
    id: "c-002",
    subjectId: "credit-risk",
    title: "Xác suất vỡ nợ hàm ý từ chênh lệch tín dụng",
    badge: "Credit • Định giá",
    numerator: "Chênh lệch tín dụng (spread)",
    denominator: "LGD",
    variables: [
      { symbol: "spread", name: "Chênh lệch lợi suất so với trái phiếu phi rủi ro cùng kỳ hạn" },
    ],
    example: {
      title: "Xấp xỉ nhanh",
      calculation: "Spread = 300 điểm cơ bản, LGD = 60% → 3% / 0,6",
      result: "PD ≈ 5%/năm",
      explanation: "Đây là PD trung tính rủi ro nên luôn cao hơn PD thực tế - phần chênh là phần bù rủi ro và phần bù thanh khoản mà nhà đầu tư đòi thêm.",
    },
  },
  {
    id: "c-003",
    subjectId: "credit-risk",
    title: "Điều chỉnh định giá tín dụng (CVA)",
    badge: "Credit • Rủi ro đối tác",
    equation: "CVA ≈ Σ [ PD(t) × LGD × EE(t) × DF(t) ]",
    variables: [
      { symbol: "EE(t)", name: "Phơi nhiễm kỳ vọng tại thời điểm t" },
      { symbol: "DF(t)", name: "Hệ số chiết khấu" },
    ],
    example: {
      title: "Ý nghĩa",
      calculation: "Giá trị hợp đồng phái sinh trừ đi CVA",
      result: "Giá trị đã tính rủi ro đối tác",
      explanation: "CVA là khoản giảm giá phản ánh khả năng đối tác không thực hiện nghĩa vụ. Nó biến rủi ro tín dụng đối tác thành một con số ghi được vào sổ.",
    },
  },
  {
    id: "c-004",
    subjectId: "credit-risk",
    title: "Tỷ lệ thu hồi và LGD",
    badge: "Credit • Thu hồi",
    equation: "LGD = 1 − Tỷ lệ thu hồi (Recovery Rate)",
    variables: [
      { symbol: "Recovery Rate", name: "Phần thu hồi được sau xử lý tài sản bảo đảm và thủ tục phá sản" },
    ],
    example: {
      title: "Tương quan xấu",
      calculation: "Suy thoái → PD tăng VÀ tỷ lệ thu hồi giảm cùng lúc",
      result: "EL tăng nhanh hơn tuyến tính",
      explanation: "Giả định PD và LGD độc lập sẽ đánh giá thấp rủi ro đuôi: đúng lúc nhiều người vay vỡ nợ thì giá tài sản bảo đảm cũng đang sụp.",
    },
  },

  // ─── LIQUIDITY AND TREASURY RISK ─────────────────────────────────────
  {
    id: "l-001",
    subjectId: "liquidity-treasury",
    title: "Tỷ lệ bao phủ thanh khoản (LCR)",
    badge: "Liquidity • Basel III",
    numerator: "Tài sản thanh khoản chất lượng cao (HQLA)",
    denominator: "Dòng tiền ra thuần trong 30 ngày căng thẳng",
    variables: [
      { symbol: "HQLA", name: "Tài sản bán được nhanh gần đúng giá, chủ yếu là trái phiếu chính phủ" },
    ],
    example: {
      title: "Ngưỡng tối thiểu",
      calculation: "HQLA = 120 tỷ, dòng ra thuần 30 ngày = 100 tỷ → 120/100",
      result: "LCR = 120% (≥ 100%)",
      explanation: "Đây là chuẩn về thanh khoản chứ không phải về vốn: nó hỏi ngân hàng có sống qua được một tháng khủng hoảng mà không cần thị trường liên ngân hàng hay không.",
    },
  },
  {
    id: "l-002",
    subjectId: "liquidity-treasury",
    title: "Tỷ lệ nguồn vốn ổn định ròng (NSFR)",
    badge: "Liquidity • Basel III",
    numerator: "Nguồn vốn ổn định sẵn có (ASF)",
    denominator: "Nguồn vốn ổn định cần thiết (RSF)",
    variables: [
      { symbol: "ASF", name: "Vốn và nợ dài hạn, tiền gửi bán lẻ có trọng số cao vì bám dai" },
      { symbol: "RSF", name: "Nhu cầu vốn ổn định tương ứng với tài sản đang nắm giữ" },
    ],
    example: {
      title: "Khác LCR ở chân trời",
      calculation: "LCR nhìn 30 ngày · NSFR nhìn 1 năm",
      result: "Cả hai đều phải ≥ 100%",
      explanation: "LCR chặn cú sốc ngắn hạn; NSFR chặn mô hình kinh doanh lệch kỳ hạn về mặt cấu trúc - vay ngắn tài trợ tài sản dài một cách bền vững.",
    },
  },
  {
    id: "l-003",
    subjectId: "liquidity-treasury",
    title: "Chi phí thanh khoản của một vị thế",
    badge: "Liquidity • Thanh khoản thị trường",
    equation: "Chi phí ≈ ½ × Chênh lệch giá mua bán × Giá trị vị thế + Tác động giá",
    variables: [
      { symbol: "Tác động giá", name: "Phần trượt giá phát sinh thêm khi khối lượng vượt độ sâu sổ lệnh" },
    ],
    example: {
      title: "Với vị thế lớn",
      calculation: "Chênh lệch mua bán chỉ là phần nhỏ; phần lớn chi phí đến từ tác động giá",
      result: "Thành phần thứ hai chi phối",
      explanation: "Đây là lý do VaR điều chỉnh thanh khoản tồn tại: bán một vị thế lớn ở giá niêm yết là điều không xảy ra trong thực tế.",
    },
  },
  {
    id: "l-004",
    subjectId: "liquidity-treasury",
    title: "Khe hở thanh khoản dồn tích",
    badge: "Liquidity • Thang dòng tiền",
    equation: "Khe hở dồn tích(T) = Σ (Dòng vào − Dòng ra) qua các dải tới T",
    variables: [
      { symbol: "T", name: "Dải kỳ hạn: qua đêm, 1 tuần, 1 tháng, 3 tháng, 1 năm" },
    ],
    example: {
      title: "Con số quyết định",
      calculation: "Dải nào có dồn tích chuyển sang âm",
      result: "Đó là lúc tổ chức cạn tiền",
      explanation: "Khe hở của một dải riêng lẻ có thể được bù bởi thặng dư dải trước. Chỉ con số dồn tích mới trả lời được câu hỏi thực sự quan trọng.",
    },
  },

  // ─── RISK MANAGEMENT AND INVESTMENT MANAGEMENT ───────────────────────
  {
    id: "i-001",
    subjectId: "investment-management",
    title: "Sortino Ratio",
    badge: "Investment • Rủi ro một chiều",
    numerator: "Lợi suất danh mục − Ngưỡng mục tiêu (MAR)",
    denominator: "Độ lệch chuẩn của phần lợi suất DƯỚI ngưỡng",
    variables: [
      { symbol: "MAR", name: "Minimum acceptable return - ngưỡng nhà đầu tư coi là chấp nhận được" },
    ],
    example: {
      title: "Cải tiến so với Sharpe",
      calculation: "Sharpe phạt cả biến động tăng lẫn giảm",
      result: "Sortino chỉ phạt phần giảm",
      explanation: "Nhà đầu tư không sợ danh mục tăng mạnh. Với chiến lược có lời lỗ bất đối xứng, Sortino phản ánh trải nghiệm thật hơn.",
    },
  },
  {
    id: "i-002",
    subjectId: "investment-management",
    title: "Sai số theo dõi (Tracking Error)",
    badge: "Investment • Quản lý chủ động",
    equation: "TE = Độ lệch chuẩn của (Rp − Rb)",
    variables: [
      { symbol: "Rb", name: "Lợi suất chỉ số tham chiếu" },
    ],
    example: {
      title: "Đọc con số",
      calculation: "TE = 2% → quỹ bám sát chuẩn · TE = 10% → đặt cược chủ động lớn",
      result: "Đo mức dám lệch",
      explanation: "TE không phải thước đo tốt xấu mà là thước đo mức độ chủ động. Một quỹ thu phí chủ động nhưng TE gần 0 là quỹ chỉ số trá hình.",
    },
  },
  {
    id: "i-003",
    subjectId: "investment-management",
    title: "Mức sụt giảm tối đa và tỷ số Calmar",
    badge: "Investment • Rủi ro trải nghiệm",
    numerator: "Lợi suất bình quân năm",
    denominator: "Mức sụt giảm tối đa (Maximum Drawdown)",
    variables: [
      { symbol: "Max Drawdown", name: "Mức giảm sâu nhất từ đỉnh xuống đáy trong kỳ quan sát" },
    ],
    example: {
      title: "Vì sao đo bằng drawdown",
      calculation: "Lợi suất 15%/năm, drawdown tối đa 30% → 15/30",
      result: "Calmar = 0,5",
      explanation: "Thứ khiến nhà đầu tư bỏ cuộc là mức sụt sâu nhất họ phải ngồi qua, không phải độ lệch chuẩn - Calmar đặt lợi suất bên cạnh đúng nỗi đau đó.",
    },
  },
  {
    id: "i-004",
    subjectId: "investment-management",
    title: "Lợi suất bình quân hình học",
    badge: "Investment • Đo lợi suất",
    equation: "Rg = [ (1+r₁)(1+r₂)...(1+rₙ) ]^(1/n) − 1",
    variables: [
      { symbol: "rᵢ", name: "Lợi suất từng kỳ" },
    ],
    example: {
      title: "Vì sao luôn thấp hơn bình quân số học",
      calculation: "Năm 1: +50%, năm 2: −50% → số học = 0%, hình học = √(1,5 × 0,5) − 1",
      result: "Hình học = −13,4%",
      explanation: "Bình quân số học nói 0% nhưng 100 đồng còn 75 đồng. Chỉ hình học phản ánh đúng thứ nhà đầu tư thực sự nhận được.",
    },
  },

  // ─── OPERATIONAL RESILIENCE ──────────────────────────────────────────
  {
    id: "o-001",
    subjectId: "operational-resilience",
    title: "Cấu phần vốn rủi ro hoạt động (SMA)",
    badge: "Operational • Basel III",
    equation: "Vốn = BIC × ILM",
    variables: [
      { symbol: "BIC", name: "Business Indicator Component - quy mô hoạt động từ báo cáo tài chính" },
      { symbol: "ILM", name: "Internal Loss Multiplier - hệ số từ lịch sử tổn thất 10 năm của chính ngân hàng" },
    ],
    example: {
      title: "Vì sao bỏ mô hình nội bộ",
      calculation: "Hai ngân hàng hồ sơ rủi ro tương tự ra mức vốn rất khác nhau",
      result: "Đổi độ nhạy lấy tính so sánh",
      explanation: "Dữ liệu đuôi cực thưa cộng động cơ giảm vốn khiến mô hình nội bộ mất tính so sánh, nên Basel quay lại một công thức chuẩn cho tất cả.",
    },
  },
  {
    id: "o-002",
    subjectId: "operational-resilience",
    title: "Phân phối tổn thất tổng hợp (LDA)",
    badge: "Operational • Mô hình tổn thất",
    equation: "Tổn thất năm = Σ Xᵢ , với i = 1..N",
    variables: [
      { symbol: "N", name: "Số sự kiện trong năm - mô hình tần suất, thường dùng Poisson" },
      { symbol: "Xᵢ", name: "Mức độ thiệt hại mỗi sự kiện - mô hình mức độ, thường lognormal" },
    ],
    example: {
      title: "Hai phân phối tách biệt",
      calculation: "Ghép tần suất và mức độ bằng mô phỏng → phân phối tổn thất năm",
      result: "Lấy phân vị 99,9% ra vốn",
      explanation: "Tách hai chiều cho phép mô hình hoá riêng chuyện xảy ra bao nhiêu lần và mỗi lần mất bao nhiêu - hai thứ có động lực rất khác nhau.",
    },
  },
  {
    id: "o-003",
    subjectId: "operational-resilience",
    title: "Rủi ro cố hữu và rủi ro còn lại (RCSA)",
    badge: "Operational • Tự đánh giá",
    equation: "Rủi ro còn lại = Rủi ro cố hữu × (1 − Hiệu lực kiểm soát)",
    variables: [
      { symbol: "Rủi ro cố hữu", name: "Mức rủi ro khi chưa tính tới bất kỳ kiểm soát nào" },
    ],
    example: {
      title: "Khoảng cách là giá trị của kiểm soát",
      calculation: "Cố hữu cao, còn lại thấp → hệ thống kiểm soát đang làm việc",
      result: "Cố hữu ≈ còn lại → kiểm soát vô dụng",
      explanation: "Đánh giá cả hai mức mới trả lời được câu hỏi quản trị: kiểm soát này có đáng chi phí duy trì không, và bỏ đi thì phơi nhiễm tới đâu.",
    },
  },

  // ─── CURRENT ISSUES ──────────────────────────────────────────────────
  {
    id: "ci-001",
    subjectId: "current-issues",
    title: "Lỗ chưa thực hiện trên danh mục giữ tới đáo hạn",
    badge: "Current Issues • Bất ổn 2023",
    equation: "Lỗ chưa thực hiện = Giá trị hợp lý − Giá trị ghi sổ",
    variables: [
      { symbol: "Giá trị ghi sổ", name: "Giá gốc phân bổ; nhóm giữ tới đáo hạn không đánh giá lại theo thị trường" },
    ],
    example: {
      title: "Con số cần tìm trong thuyết minh",
      calculation: "So khoản lỗ này với vốn chủ sở hữu công bố",
      result: "Có thể vượt cả vốn",
      explanation: "Giữ tới đáo hạn là một ý định, không phải một khả năng. Khi người gửi rút tiền đồng loạt, ngân hàng buộc phải bán và khoản lỗ trên giấy thành lỗ thật.",
    },
  },
  {
    id: "ci-002",
    subjectId: "current-issues",
    title: "Tỷ lệ tiền gửi không được bảo hiểm",
    badge: "Current Issues • Rủi ro tháo chạy",
    numerator: "Tiền gửi vượt hạn mức bảo hiểm",
    denominator: "Tổng tiền gửi",
    variables: [
      { symbol: "Hạn mức bảo hiểm", name: "Mức tối đa được cơ quan bảo hiểm tiền gửi chi trả" },
    ],
    example: {
      title: "Vì sao đây là chỉ số cảnh báo",
      calculation: "Tỷ lệ càng cao → càng nhiều người gửi có động cơ rút trước",
      result: "Cơ chế hãm tháo chạy biến mất",
      explanation: "Bảo hiểm tiền gửi tồn tại để triệt tiêu động cơ chạy trước. Khi phần lớn số dư vượt hạn mức, tháo chạy trở thành phản ứng hợp lý của từng cá nhân.",
    },
  },
  {
    id: "ci-003",
    subjectId: "current-issues",
    title: "Chênh lệch điều chỉnh khi chuyển đổi khỏi LIBOR",
    badge: "Current Issues • Hậu LIBOR",
    equation: "Lãi suất thay thế = Lãi suất tham chiếu mới + Chênh lệch điều chỉnh",
    variables: [
      { symbol: "Chênh lệch điều chỉnh", name: "Bù phần rủi ro tín dụng ngân hàng có trong LIBOR mà lãi suất mới không có" },
    ],
    example: {
      title: "Vì sao không chuyển thẳng được",
      calculation: "LIBOR là lãi vay không bảo đảm giữa các ngân hàng; lãi suất mới gần như phi rủi ro",
      result: "Thiếu chênh lệch = chuyển giao giá trị",
      explanation: "Chuyển thẳng mà không cộng chênh lệch sẽ dịch chuyển giá trị kinh tế từ bên này sang bên kia của mọi hợp đồng đang có.",
    },
  },
];
