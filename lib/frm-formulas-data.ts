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

/* i18n-ignore-start: `title`, `badge`, phần tử/mẫu viết bằng lời, tên biến và
   `example` là bản gốc tiếng Việt, đã có lớp phủ đủ 92/92 trong
   lib/frm-formulas-i18n/en.ts. FrmFormulaCheatSheet gọi
   `mergeFormulas(FRM_FORMULAS_DATA, locale)` TRƯỚC bộ lọc tìm kiếm.
   lib/__tests__/frm-formulas-translations.test.ts làm đỏ build khi thêm công
   thức mà quên bản Anh, khi thiếu `title`, khi mảng `variables` lệch độ dài, và
   khi thừa khoá. */
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
  {
    id: "q-005",
    subjectId: "quant-analysis",
    title: "Mô hình GARCH(1,1)",
    badge: "Quantitative • Biến động có điều kiện",
    equation: "σ²ₜ = ω + α·u²ₜ₋₁ + β·σ²ₜ₋₁",
    variables: [
      { symbol: "ω", name: "Hằng số, gắn với phương sai dài hạn qua ω / (1 − α − β)" },
      { symbol: "α", name: "Trọng số cho cú sốc hôm qua - càng lớn thì mô hình phản ứng càng nhanh" },
      { symbol: "β", name: "Trọng số cho phương sai hôm qua - càng lớn thì cú sốc càng dai dẳng" },
    ],
    example: {
      title: "Điều kiện dừng",
      calculation: "α + β = 0,05 + 0,94 = 0,99",
      result: "Dừng, nhưng sát ngưỡng",
      explanation: "Phải có α + β < 1 thì phương sai mới quay về mức dài hạn. Bằng 1 thì mô hình thành EWMA và không còn mức dài hạn nào để quay về; càng gần 1 thì cú sốc càng lâu tan.",
    },
  },
  {
    id: "q-006",
    subjectId: "quant-analysis",
    title: "Phương sai dài hạn của GARCH",
    badge: "Quantitative • Biến động có điều kiện",
    numerator: "ω",
    denominator: "1 − α − β",
    variables: [
      { symbol: "VL", name: "Phương sai dài hạn mà mô hình kéo về theo thời gian" },
    ],
    example: {
      title: "Tính mức neo",
      calculation: "ω = 0,000002 · α = 0,05 · β = 0,94 → 0,000002 / 0,01",
      result: "VL = 0,0002 → σ ≈ 1,41%/ngày",
      explanation: "Đây là mức biến động mà mọi dự báo GARCH dài hạn hội tụ về, bất kể hôm nay thị trường đang yên hay đang loạn.",
    },
  },
  {
    id: "q-007",
    subjectId: "quant-analysis",
    title: "Thống kê kiểm định hồi tố Kupiec",
    badge: "Quantitative • Kiểm định mô hình",
    equation: "LR = −2·ln[(1−p)^(T−N)·p^N] + 2·ln[(1−N/T)^(T−N)·(N/T)^N]",
    variables: [
      { symbol: "N", name: "Số lần lỗ thực tế vượt VaR" },
      { symbol: "T", name: "Số quan sát" },
      { symbol: "p", name: "Tỷ lệ vượt kỳ vọng, bằng 1 trừ mức tin cậy" },
    ],
    example: {
      title: "Vì sao 250 ngày là ít",
      calculation: "VaR 99% trên 250 ngày: kỳ vọng 2,5 lần vượt",
      result: "Khoảng chấp nhận rất rộng",
      explanation: "Với mẫu nhỏ, kiểm định không phân biệt được mô hình tốt và mô hình kém - đây là lý do backtesting một năm hiếm khi bác bỏ được gì, và vì sao Basel dùng thêm vùng đèn giao thông.",
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
  {
    id: "m-005",
    subjectId: "financial-markets-products",
    title: "Giá kỳ hạn khi tài sản có chi phí lưu kho",
    badge: "Markets & Products • Hàng hoá",
    equation: "F₀ = S₀ · e^((r + u − y)·T)",
    variables: [
      { symbol: "u", name: "Chi phí lưu kho quy theo tỷ lệ, cộng vào chi phí nắm giữ" },
      { symbol: "y", name: "Convenience yield - lợi ích của việc giữ hàng thật thay vì giữ hợp đồng" },
    ],
    example: {
      title: "Khi nào thị trường vào backwardation",
      calculation: "y > r + u",
      result: "F₀ < S₀",
      explanation: "Convenience yield lớn hơn tổng chi phí nắm giữ nghĩa là hàng thật đang khan - và đó chính là lúc giá tương lai rơi xuống dưới giá giao ngay.",
    },
  },
  {
    id: "m-006",
    subjectId: "financial-markets-products",
    title: "Hệ số quy đổi và giá hoá đơn hợp đồng tương lai trái phiếu",
    badge: "Markets & Products • Trái phiếu",
    equation: "Giá hoá đơn = (Giá kết toán × Hệ số quy đổi) + Lãi tích luỹ",
    variables: [
      { symbol: "CF", name: "Hệ số quy đổi, chuẩn hoá các trái phiếu giao được về cùng một mặt bằng" },
    ],
    example: {
      title: "Chọn trái phiếu rẻ nhất để giao",
      calculation: "Chọn trái phiếu tối thiểu hoá: Giá thị trường − (Giá kết toán × CF)",
      result: "Đó là CTD",
      explanation: "Quyền chọn giao thuộc về bên bán, nên bên bán luôn chọn trái phiếu có lợi nhất cho mình - và chính quyền chọn đó kéo giá hợp đồng tương lai xuống một chút.",
    },
  },
  {
    id: "m-007",
    subjectId: "financial-markets-products",
    title: "Định giá hoán đổi lãi suất",
    badge: "Markets & Products • Phái sinh",
    equation: "V_swap (bên nhận cố định) = B_cố định − B_thả nổi",
    variables: [
      { symbol: "B_cố định", name: "Giá trị hiện tại của nhánh cố định, chiết khấu theo đường cong" },
      { symbol: "B_thả nổi", name: "Ngay sau ngày ấn định lãi, luôn bằng đúng vốn danh nghĩa" },
    ],
    example: {
      title: "Vì sao giá trị ban đầu bằng 0",
      calculation: "Lúc ký, lãi cố định được chọn sao cho hai nhánh bằng nhau",
      result: "V = 0",
      explanation: "Hoán đổi không tốn phí lúc ký; giá trị chỉ khác 0 khi lãi suất đã dịch chuyển sau đó. Vốn danh nghĩa không bao giờ được trao đổi nên phơi nhiễm tín dụng nhỏ hơn nhiều con số danh nghĩa.",
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
  {
    id: "v-005",
    subjectId: "valuation-risk-models",
    title: "Xấp xỉ giá trái phiếu bằng duration và convexity",
    badge: "Valuation • Độ nhạy lãi suất",
    equation: "ΔP/P ≈ −D·Δy + ½·C·(Δy)²",
    variables: [
      { symbol: "D", name: "Modified duration - độ nhạy bậc nhất" },
      { symbol: "C", name: "Convexity - hiệu chỉnh bậc hai cho phần cong của đường giá" },
    ],
    example: {
      title: "Lãi suất tăng 200 điểm cơ bản",
      calculation: "D = 7 · C = 90 · Δy = 0,02 → −0,14 + 0,018",
      result: "≈ −12,2% thay vì −14%",
      explanation: "Chỉ dùng duration sẽ luôn ước lượng giá thấp hơn thực tế theo cả hai chiều, vì convexity dương luôn cộng thêm vào giá. Sai số càng lớn khi lãi suất dịch càng mạnh.",
    },
  },
  {
    id: "v-006",
    subjectId: "valuation-risk-models",
    title: "Khoảng cách tới điểm vỡ nợ trong mô hình Merton",
    badge: "Valuation • Mô hình cấu trúc",
    numerator: "ln(V₀/K) + (μ − σ²/2)·T",
    denominator: "σ·√T",
    variables: [
      { symbol: "V₀", name: "Giá trị tài sản doanh nghiệp" },
      { symbol: "K", name: "Mệnh giá nợ - đóng vai giá thực hiện" },
      { symbol: "σ", name: "Biến động của giá trị tài sản, không phải của cổ phiếu" },
    ],
    example: {
      title: "Từ khoảng cách sang xác suất",
      calculation: "PD = N(−DD)",
      result: "DD = 2,5 → PD ≈ 0,62%",
      explanation: "Vì đầu vào là giá thị trường, PD nhảy ngay khi cổ phiếu biến động - sớm hơn nhiều so với xếp hạng tín nhiệm, đổi lại là nhiễu hơn.",
    },
  },
  {
    id: "v-007",
    subjectId: "valuation-risk-models",
    title: "Gamma và hiệu chỉnh delta-gamma",
    badge: "Valuation • Quyền chọn",
    equation: "ΔV ≈ δ·ΔS + ½·Γ·(ΔS)²",
    variables: [
      { symbol: "δ", name: "Delta - độ nhạy bậc nhất theo giá tài sản cơ sở" },
      { symbol: "Γ", name: "Gamma - tốc độ thay đổi của delta" },
    ],
    example: {
      title: "Vì sao VaR delta-normal hỏng với quyền chọn",
      calculation: "Danh mục bán quyền chọn có Γ âm lớn",
      result: "VaR bị ước lượng thấp",
      explanation: "Xấp xỉ chỉ có delta giả định quan hệ tuyến tính. Với gamma âm, khoản lỗ tăng nhanh hơn tuyến tính theo cả hai chiều - đúng phần đuôi mà VaR cần đo.",
    },
  },
  {
    id: "v-008",
    subjectId: "valuation-risk-models",
    title: "Duration của danh mục và phòng hộ theo DV01",
    badge: "Valuation • Phòng hộ",
    equation: "Số hợp đồng = − (DV01_danh mục / DV01_công cụ phòng hộ)",
    variables: [
      { symbol: "DV01", name: "Mức thay đổi giá trị khi lợi suất dịch 1 điểm cơ bản" },
    ],
    example: {
      title: "Phòng hộ bằng hợp đồng tương lai trái phiếu",
      calculation: "DV01 danh mục 42.000 · DV01 hợp đồng 68 → 42.000 / 68",
      result: "Bán khoảng 618 hợp đồng",
      explanation: "Phòng hộ theo DV01 chỉ trung hoà dịch chuyển song song của đường cong. Đường cong xoay hay gãy thì phần rủi ro còn lại không được che - đó là basis risk của chính phép phòng hộ này.",
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
  {
    id: "mr-005",
    subjectId: "market-risk",
    title: "VaR mô phỏng lịch sử",
    badge: "Market Risk • Phi tham số",
    equation: "VaR = phân vị thứ (1−c) của chuỗi lãi lỗ mô phỏng lại",
    variables: [
      { symbol: "c", name: "Mức tin cậy" },
      { symbol: "n", name: "Số quan sát lịch sử được áp lại lên danh mục hôm nay" },
    ],
    example: {
      title: "500 ngày ở mức 99%",
      calculation: "Sắp xếp 500 kết quả, lấy quan sát xấu thứ 5",
      result: "Đó là VaR",
      explanation: "Không giả định phân phối nên giữ được đuôi dày và độ lệch thật của dữ liệu. Đổi lại nó không thể sinh ra kịch bản chưa từng xuất hiện trong cửa sổ quan sát.",
    },
  },
  {
    id: "mr-006",
    subjectId: "market-risk",
    title: "VaR gia tăng và VaR biên",
    badge: "Market Risk • Phân rã rủi ro",
    equation: "Incremental VaR = VaR(có vị thế) − VaR(không có vị thế)",
    variables: [
      { symbol: "Marginal VaR", name: "Đạo hàm của VaR theo tỷ trọng vị thế - dùng để phân bổ rủi ro" },
    ],
    example: {
      title: "Vì sao tổng các phần không bằng tổng thể",
      calculation: "Cộng VaR riêng của từng bàn giao dịch",
      result: "Lớn hơn VaR toàn ngân hàng",
      explanation: "Phần chênh là lợi ích đa dạng hoá. Phân bổ vốn theo VaR riêng lẻ sẽ tính phí quá tay cho mọi bàn - Component VaR mới là thước đo cộng lại đúng bằng tổng thể.",
    },
  },
  {
    id: "mr-007",
    subjectId: "market-risk",
    title: "Hệ số nhân vốn thị trường theo Basel",
    badge: "Market Risk • Yêu cầu vốn",
    equation: "Vốn = max[VaRₜ₋₁ , m × VaR trung bình 60 ngày] + phần stressed VaR",
    variables: [
      { symbol: "m", name: "Hệ số nhân, tối thiểu 3 và tăng theo số lần vượt trong backtesting" },
    ],
    example: {
      title: "Vùng đèn giao thông trên 250 ngày",
      calculation: "0-4 lần vượt: m = 3 · 5 lần: 3,4 · 9 lần: 3,85 · từ 10: 4",
      result: "Mô hình kém thì vốn đắt lên",
      explanation: "Đây là cơ chế buộc ngân hàng tự giữ mô hình cho chuẩn: khai VaR thấp để nhẹ vốn sẽ làm số lần vượt tăng, và hệ số nhân sẽ lấy lại nhiều hơn phần vừa tiết kiệm được.",
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
  {
    id: "c-005",
    subjectId: "credit-risk",
    title: "Xác suất vỡ nợ biên và tích luỹ",
    badge: "Credit Risk • Cấu trúc kỳ hạn",
    equation: "PD tích luỹ (n năm) = 1 − (1 − PD₁)(1 − PD₂)…(1 − PDₙ)",
    variables: [
      { symbol: "PDₖ", name: "Xác suất vỡ nợ biên của năm thứ k, với điều kiện đã sống sót tới đó" },
    ],
    example: {
      title: "Ba năm ở PD 2% mỗi năm",
      calculation: "1 − 0,98³",
      result: "≈ 5,88%",
      explanation: "Cộng thẳng 2% ba lần ra 6% - gần đúng nhưng luôn cao hơn thực tế, và sai số phình ra nhanh khi PD lớn hoặc kỳ hạn dài.",
    },
  },
  {
    id: "c-006",
    subjectId: "credit-risk",
    title: "Tổn thất ngoài dự kiến",
    badge: "Credit Risk • Vốn kinh tế",
    equation: "UL = EAD × √(PD·σ²_LGD + LGD²·PD·(1−PD))",
    variables: [
      { symbol: "UL", name: "Độ lệch chuẩn của tổn thất tín dụng quanh mức kỳ vọng" },
    ],
    example: {
      title: "Vì sao vốn không dùng để bù EL",
      calculation: "EL vào dự phòng và vào giá khoản vay",
      result: "Vốn chỉ gánh UL",
      explanation: "Lẫn hai khoản này là lỗi khái niệm hay gặp nhất phần tín dụng: tổn thất trung bình là chi phí kinh doanh đã tính vào lãi suất cho vay, còn vốn tồn tại cho phần vượt ngoài trung bình.",
    },
  },
  {
    id: "c-007",
    subjectId: "credit-risk",
    title: "Phơi nhiễm kỳ vọng và phơi nhiễm tương lai tiềm tàng",
    badge: "Credit Risk • Rủi ro đối tác",
    equation: "EE(t) = E[max(V(t), 0)] · PFE(t) = phân vị thứ α của max(V(t), 0)",
    variables: [
      { symbol: "EE", name: "Phơi nhiễm kỳ vọng - giá trị trung bình khi dương" },
      { symbol: "PFE", name: "Phơi nhiễm tiềm tàng - phân vị đuôi, thường 95% hoặc 97,5%" },
    ],
    example: {
      title: "Cái nào dùng cho hạn mức, cái nào cho định giá",
      calculation: "Hạn mức đối tác đặt trên PFE; CVA tính từ EE",
      result: "Hai mục đích khác nhau",
      explanation: "Chỉ giá trị dương mới tạo phơi nhiễm - nếu hợp đồng đang âm với bạn thì đối tác vỡ nợ không làm bạn mất gì. Đó là lý do cả hai công thức đều có max(·, 0).",
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
  {
    id: "f-006",
    subjectId: "foundations",
    title: "Vốn kinh tế từ phân vị tổn thất",
    badge: "Foundations • Vốn",
    equation: "EC = Phân vị tổn thất tại mức tin cậy − Tổn thất kỳ vọng",
    variables: [
      { symbol: "EC", name: "Vốn kinh tế - chỉ gánh phần tổn thất NGOÀI dự kiến" },
      { symbol: "EL", name: "Tổn thất kỳ vọng, đã nằm trong dự phòng và trong giá" },
    ],
    example: {
      title: "Vì sao trừ EL",
      calculation: "EC = Phân vị 99,9% của tổn thất − EL",
      result: "Chỉ phần vượt trung bình",
      explanation: "Tổn thất trung bình là chi phí kinh doanh đã tính vào lãi suất cho vay. Vốn tồn tại cho phần không biết trước bao giờ đến.",
    },
  },
  {
    id: "f-007",
    subjectId: "foundations",
    title: "RAROC",
    badge: "Foundations • Phân bổ vốn",
    numerator: "Lợi nhuận − Tổn thất kỳ vọng",
    denominator: "Vốn kinh tế",
    variables: [
      { symbol: "Hurdle rate", name: "Chi phí vốn cổ đông đòi - ngưỡng phân xử tạo hay huỷ giá trị" },
    ],
    example: {
      title: "Hai bàn giao dịch",
      calculation: "A: 100/1.000 = 10% · B: 40/250 = 16% · chi phí vốn 12%",
      result: "B tạo giá trị, A huỷ",
      explanation: "Bàn A lãi gấp hai lần rưỡi nhưng ngốn vốn tới mức không bù nổi cái giá cổ đông đòi cho số vốn ấy.",
    },
  },
  {
    id: "f-008",
    subjectId: "foundations",
    title: "Tỷ lệ vốn cấp 1 theo Basel",
    badge: "Foundations • Vốn pháp định",
    numerator: "Vốn cấp 1 (Tier 1)",
    denominator: "Tài sản có rủi ro (RWA)",
    variables: [
      { symbol: "RWA", name: "Tài sản đã nhân hệ số rủi ro của từng nhóm" },
    ],
    example: {
      title: "Vì sao hai ngân hàng cùng quy mô cần vốn khác nhau",
      calculation: "100 tỷ trái phiếu chính phủ (0%) + 100 tỷ cho vay DN (100%)",
      result: "RWA = 100 tỷ",
      explanation: "Cấu trúc tài sản quyết định yêu cầu vốn, không phải tổng tài sản.",
    },
  },
  {
    id: "f-009",
    subjectId: "foundations",
    title: "Hệ số đòn bẩy Basel",
    badge: "Foundations • Đòn bẩy",
    numerator: "Vốn cấp 1",
    denominator: "Tổng phơi nhiễm, không nhân hệ số rủi ro",
    variables: [
      { symbol: "Ngưỡng", name: "Tối thiểu 3% theo Basel III" },
    ],
    example: {
      title: "Vì sao cần thêm chỉ số này",
      calculation: "RWA phụ thuộc mô hình; tổng phơi nhiễm thì không",
      result: "Chốt chặn không phụ thuộc mô hình",
      explanation: "Nó tồn tại để bắt trường hợp ngân hàng hạ RWA bằng cách chọn mô hình chứ không bằng cách giảm rủi ro thật.",
    },
  },
  {
    id: "q-008",
    subjectId: "quant-analysis",
    title: "Sai số chuẩn của trung bình mẫu",
    badge: "Quantitative • Suy diễn",
    numerator: "Độ lệch chuẩn mẫu (s)",
    denominator: "Căn bậc hai cỡ mẫu (√n)",
    variables: [
      { symbol: "n", name: "Cỡ mẫu - sai số giảm theo căn bậc hai, không theo n" },
    ],
    example: {
      title: "Muốn giảm một nửa sai số",
      calculation: "Phải tăng cỡ mẫu gấp bốn lần",
      result: "√4 = 2",
      explanation: "Đây là lý do thêm dữ liệu cho lợi ích giảm dần rất nhanh, và vì sao ba năm lợi suất quỹ nói được rất ít về kỹ năng.",
    },
  },
  {
    id: "q-009",
    subjectId: "quant-analysis",
    title: "Hồi quy tuyến tính - hệ số beta",
    badge: "Quantitative • Hồi quy",
    numerator: "Hiệp phương sai(X, Y)",
    denominator: "Phương sai(X)",
    variables: [
      { symbol: "β", name: "Độ dốc - mức thay đổi kỳ vọng của Y khi X tăng một đơn vị" },
    ],
    example: {
      title: "Beta của cổ phiếu",
      calculation: "Cov(Ri, Rm) / Var(Rm)",
      result: "Chính là beta CAPM",
      explanation: "Beta trong CAPM đúng là hệ số dốc của hồi quy lợi suất cổ phiếu theo lợi suất thị trường - không phải một khái niệm riêng.",
    },
  },
  {
    id: "m-008",
    subjectId: "financial-markets-products",
    title: "Các Greeks của quyền chọn",
    badge: "Markets & Products • Phái sinh",
    equation: "ΔV ≈ δ·ΔS + ½·Γ·(ΔS)² + ν·Δσ + θ·Δt",
    variables: [
      { symbol: "δ", name: "Độ nhạy theo giá tài sản cơ sở" },
      { symbol: "Γ", name: "Tốc độ thay đổi của delta" },
      { symbol: "ν", name: "Vega - độ nhạy theo biến động" },
      { symbol: "θ", name: "Theta - hao mòn theo thời gian" },
    ],
    example: {
      title: "Vị thế bán quyền chọn",
      calculation: "Γ âm và θ dương",
      result: "Ăn theo thời gian, chịu rủi ro biến động",
      explanation: "Bán quyền chọn là thu phí đều mỗi ngày và gánh phần đuôi - lợi nhuận ổn định cho tới lúc không ổn định nữa.",
    },
  },
  {
    id: "m-009",
    subjectId: "financial-markets-products",
    title: "Ngang giá lãi suất có phòng hộ",
    badge: "Markets & Products • Ngoại hối",
    equation: "F = S · (1 + r_trong nước · T) / (1 + r_nước ngoài · T)",
    variables: [
      { symbol: "F", name: "Tỷ giá kỳ hạn" },
      { symbol: "S", name: "Tỷ giá giao ngay" },
    ],
    example: {
      title: "Vì sao quan hệ này giữ",
      calculation: "Lệch khỏi nó là một arbitrage không rủi ro",
      result: "Thị trường kéo về ngay",
      explanation: "Sau 2008, cross-currency basis khác 0 kéo dài - arbitrage vẫn tồn tại nhưng không ai đủ bảng cân đối để thực hiện.",
    },
  },
  {
    id: "m-010",
    subjectId: "financial-markets-products",
    title: "Giá trị hợp đồng kỳ hạn sau khi ký",
    badge: "Markets & Products • Phái sinh",
    equation: "f = (F_hiện tại − F_lúc ký) · e^(−rT)",
    variables: [
      { symbol: "f", name: "Giá trị hiện tại của hợp đồng với bên mua" },
    ],
    example: {
      title: "Lúc ký thì bằng bao nhiêu",
      calculation: "F_hiện tại = F_lúc ký",
      result: "f = 0",
      explanation: "Hợp đồng kỳ hạn không tốn phí lúc ký; giá trị chỉ khác 0 khi giá kỳ hạn đã dịch chuyển sau đó.",
    },
  },
  {
    id: "m-011",
    subjectId: "financial-markets-products",
    title: "Chi phí nắm giữ tổng quát",
    badge: "Markets & Products • Hàng hoá",
    equation: "F₀ = S₀ · e^((r + u − q − y)·T)",
    variables: [
      { symbol: "u", name: "Chi phí lưu kho" },
      { symbol: "q", name: "Lợi tức tài sản trả ra, ví dụ cổ tức" },
      { symbol: "y", name: "Convenience yield" },
    ],
    example: {
      title: "Khi nào backwardation",
      calculation: "y > r + u − q",
      result: "F₀ < S₀",
      explanation: "Convenience yield vượt tổng chi phí nắm giữ nghĩa là hàng thật đang khan - và đó là lúc giá tương lai rơi xuống dưới giá giao ngay.",
    },
  },
  {
    id: "m-012",
    subjectId: "financial-markets-products",
    title: "Duration hiệu dụng",
    badge: "Markets & Products • Trái phiếu",
    numerator: "P(y−Δy) − P(y+Δy)",
    denominator: "2 · P₀ · Δy",
    variables: [
      { symbol: "Duration hiệu dụng", name: "Dùng được cả cho trái phiếu có quyền chọn kèm theo" },
    ],
    example: {
      title: "Vì sao không dùng Macaulay cho MBS",
      calculation: "Dòng tiền MBS thay đổi theo lãi suất",
      result: "Phải định giá lại hai chiều",
      explanation: "Công thức này đo bằng cách thực sự định giá lại ở hai mức lợi suất, nên nó bắt được cả phần dòng tiền tự thay đổi.",
    },
  },
  {
    id: "m-013",
    subjectId: "financial-markets-products",
    title: "Chênh lệch mua - bán và chi phí vòng",
    badge: "Markets & Products • Vi cấu trúc",
    numerator: "Giá bán − Giá mua",
    denominator: "Giá giữa",
    variables: [
      { symbol: "Chi phí vòng", name: "Chi phí mua rồi bán ngay, xấp xỉ bằng cả chênh lệch" },
    ],
    example: {
      title: "Vì sao dùng nửa chênh lệch cho một chiều",
      calculation: "Thoát một vị thế chỉ đi qua một nửa",
      result: "Nửa chênh lệch",
      explanation: "Đây là con số đi vào LVaR: phần chi phí thanh lý cộng thêm lên VaR chuẩn.",
    },
  },
  {
    id: "m-014",
    subjectId: "financial-markets-products",
    title: "Lợi suất tương đương trái phiếu từ giá chiết khấu",
    badge: "Markets & Products • Thị trường tiền tệ",
    numerator: "(Mệnh giá − Giá) · 365",
    denominator: "Giá · Số ngày còn lại",
    variables: [
      { symbol: "BEY", name: "Bond-equivalent yield, quy về cơ sở 365 ngày" },
    ],
    example: {
      title: "Vì sao khác lợi suất chiết khấu",
      calculation: "Lợi suất chiết khấu chia cho MỆNH GIÁ và dùng 360 ngày",
      result: "BEY luôn cao hơn",
      explanation: "Hai quy ước khác nhau trên cùng một công cụ - so thẳng hai con số là lỗi hay gặp ở phần thị trường tiền tệ.",
    },
  },
  {
    id: "v-009",
    subjectId: "valuation-risk-models",
    title: "Công thức Black-Scholes-Merton",
    badge: "Valuation • Quyền chọn",
    equation: "c = S₀·N(d₁) − K·e^(−rT)·N(d₂)",
    variables: [
      { symbol: "N(d₂)", name: "Xác suất trung tính rủi ro rằng quyền chọn kết thúc có lãi" },
      { symbol: "N(d₁)", name: "Delta của quyền chọn mua" },
    ],
    example: {
      title: "Giả định bị vi phạm nhiều nhất",
      calculation: "Biến động cố định theo thời gian và theo giá thực hiện",
      result: "Nụ cười biến động",
      explanation: "Chính vì giả định đó sai mà thị trường quy ra các mức biến động hàm ý khác nhau cho từng giá thực hiện.",
    },
  },
  {
    id: "v-010",
    subjectId: "valuation-risk-models",
    title: "d₁ và d₂ trong Black-Scholes",
    equation: "d₁ = [ln(S₀/K) + (r + σ²/2)T] / (σ√T) · d₂ = d₁ − σ√T",
    variables: [
      { symbol: "σ√T", name: "Độ lệch chuẩn của lợi suất tích luỹ tới ngày đáo hạn" },
    ],
    example: {
      title: "Quan hệ giữa hai giá trị",
      calculation: "d₂ luôn nhỏ hơn d₁ đúng σ√T",
      result: "Khoảng cách tăng theo kỳ hạn",
      explanation: "Kỳ hạn càng dài và biến động càng lớn thì hai xác suất càng tách xa nhau.",
    },
  },
  {
    id: "v-011",
    subjectId: "valuation-risk-models",
    title: "Định giá quyền chọn bằng cây nhị thức nhiều bước",
    badge: "Valuation • Quyền chọn",
    equation: "f = e^(−rΔt)·[p·f_u + (1−p)·f_d]",
    variables: [
      { symbol: "p", name: "Xác suất trung tính rủi ro" },
      { symbol: "f_u, f_d", name: "Giá trị quyền chọn ở hai nhánh của bước sau" },
    ],
    example: {
      title: "Quyền chọn kiểu Mỹ",
      calculation: "So giá trị giữ tiếp với giá trị thực hiện ngay tại mỗi nút",
      result: "Lấy giá trị lớn hơn",
      explanation: "Đây là lý do cây nhị thức định giá được quyền chọn Mỹ trong khi Black-Scholes thì không.",
    },
  },
  {
    id: "v-012",
    subjectId: "valuation-risk-models",
    title: "Duration của danh mục trái phiếu",
    badge: "Valuation • Danh mục",
    equation: "D_danh mục = Σ wᵢ · Dᵢ",
    variables: [
      { symbol: "wᵢ", name: "Tỷ trọng theo GIÁ TRỊ THỊ TRƯỜNG, không theo mệnh giá" },
    ],
    example: {
      title: "Bẫy hay gặp",
      calculation: "Dùng tỷ trọng mệnh giá thay vì giá trị thị trường",
      result: "Sai khi giá lệch xa mệnh giá",
      explanation: "Với trái phiếu chiết khấu sâu hoặc phụ trội lớn, hai cách tính tỷ trọng cho ra hai con số duration khác nhau đáng kể.",
    },
  },
  {
    id: "v-013",
    subjectId: "valuation-risk-models",
    title: "Lợi suất tới đáo hạn xấp xỉ",
    badge: "Valuation • Trái phiếu",
    numerator: "Coupon + (Mệnh giá − Giá) / Số năm",
    denominator: "(Mệnh giá + Giá) / 2",
    variables: [
      { symbol: "YTM", name: "Lợi suất giả định giữ tới đáo hạn và tái đầu tư coupon ở cùng mức" },
    ],
    example: {
      title: "Giả định ẩn",
      calculation: "Coupon được tái đầu tư ở đúng YTM",
      result: "Hiếm khi đúng",
      explanation: "Đây là lý do lợi suất thực nhận khác YTM khi lãi suất tái đầu tư thay đổi - rủi ro tái đầu tư.",
    },
  },
  {
    id: "v-014",
    subjectId: "valuation-risk-models",
    title: "Hệ số phòng hộ theo beta cho danh mục cổ phiếu",
    badge: "Valuation • Phòng hộ",
    numerator: "(β_mục tiêu − β_hiện tại) · Giá trị danh mục",
    denominator: "Giá trị một hợp đồng tương lai",
    variables: [
      { symbol: "β_mục tiêu", name: "Beta muốn đạt tới; bằng 0 nghĩa là trung hoà thị trường" },
    ],
    example: {
      title: "Trung hoà hoàn toàn",
      calculation: "β_mục tiêu = 0",
      result: "Bán hợp đồng",
      explanation: "Phòng hộ theo beta chỉ trung hoà rủi ro hệ thống; phần rủi ro riêng của các mã trong danh mục vẫn còn nguyên.",
    },
  },
  {
    id: "mr-008",
    subjectId: "market-risk",
    title: "Component VaR",
    badge: "Market Risk • Phân bổ",
    equation: "CVaRᵢ = wᵢ × Marginal VaRᵢ",
    variables: [
      { symbol: "CVaRᵢ", name: "Phần đóng góp của vị thế i - cộng lại đúng bằng VaR tổng" },
    ],
    example: {
      title: "Vì sao dùng cái này để chia vốn",
      calculation: "Tổng các Component VaR = VaR danh mục",
      result: "Không tính hai lần",
      explanation: "VaR riêng lẻ cộng lại vượt tổng thể đúng bằng lợi ích đa dạng hoá, nên thu phí theo nó là thu cho rủi ro không tồn tại.",
    },
  },
  {
    id: "mr-009",
    subjectId: "market-risk",
    title: "Chân trời thanh khoản theo FRTB",
    badge: "Market Risk • Vốn",
    equation: "ES = √( Σ (ES_j)² ) theo từng nhóm chân trời thanh khoản",
    variables: [
      { symbol: "LH", name: "Từ 10 ngày cho tỷ giá thanh khoản cao tới 120 ngày cho tín dụng khó bán" },
    ],
    example: {
      title: "Vì sao bỏ giả định 10 ngày",
      calculation: "2008 cho thấy thanh khoản biến mất không đều nhau",
      result: "Chia theo nhóm nhân tố",
      explanation: "Một số thị trường tín dụng không có giá nào suốt nhiều tuần trong khi tỷ giá lớn vẫn giao dịch bình thường.",
    },
  },
  {
    id: "c-008",
    subjectId: "credit-risk",
    title: "Phơi nhiễm sau bù trừ và tài sản bảo đảm",
    badge: "Credit Risk • Rủi ro đối tác",
    equation: "Phơi nhiễm = max(0, Giá trị ròng sau bù trừ − Tài sản bảo đảm × (1 − haircut))",
    variables: [
      { symbol: "Haircut", name: "Phần giá trị tài sản bảo đảm bị chiết khấu để phòng giá giảm" },
    ],
    example: {
      title: "Ví dụ",
      calculation: "Phơi nhiễm ròng 60, tài sản bảo đảm 50, haircut 10%",
      result: "60 − 45 = 15 tỷ",
      explanation: "Bỏ qua haircut sẽ đánh giá thấp phần rủi ro còn lại đúng ở những trường hợp tài sản bảo đảm kém chất lượng nhất.",
    },
  },
  {
    id: "c-009",
    subjectId: "credit-risk",
    title: "Tương quan tài sản trong mô hình một nhân tố",
    badge: "Credit Risk • Danh mục",
    equation: "Aᵢ = √ρ · Z + √(1−ρ) · εᵢ",
    variables: [
      { symbol: "ρ", name: "Tương quan tài sản - đến từ nhân tố hệ thống chung, không từ quan hệ giữa các bên vay" },
      { symbol: "Z", name: "Nhân tố hệ thống chung" },
      { symbol: "εᵢ", name: "Phần riêng của từng bên vay" },
    ],
    example: {
      title: "Vì sao vỡ nợ dồn cục",
      calculation: "ρ cao thì nhiều bên cùng vượt ngưỡng một lúc",
      result: "Đuôi dày hơn",
      explanation: "Tổn thất kỳ vọng không đổi theo ρ; chỉ phần đuôi đổi - nên tập trung hiện ra ở vốn chứ không ở dự phòng.",
    },
  },
  {
    id: "o-004",
    subjectId: "operational-resilience",
    title: "Tổn thất kỳ vọng hàng năm từ một kịch bản",
    badge: "Operational • Kịch bản",
    numerator: "Mức tổn thất của kịch bản",
    denominator: "Số năm giữa hai lần xảy ra",
    variables: [
      { symbol: "Tần suất", name: "Nghịch đảo của chu kỳ lặp lại" },
    ],
    example: {
      title: "Kịch bản 1 lần trong 20 năm, tổn thất 500 tỷ",
      calculation: "500 ÷ 20",
      result: "25 tỷ/năm",
      explanation: "Đừng đọc thành dự báo: 19 năm tổn thất là 0 và một năm là 500 tỷ, không năm nào bằng 25.",
    },
  },
  {
    id: "o-005",
    subjectId: "operational-resilience",
    title: "Quy đổi tổn thất bên ngoài theo quy mô",
    badge: "Operational • Dữ liệu ngành",
    equation: "Tổn thất quy đổi = Tổn thất gốc × (Quy mô mình / Quy mô nơi xảy ra)^λ",
    variables: [
      { symbol: "λ", name: "Hệ số mũ, thường nhỏ hơn 1 - quan hệ dưới tuyến tính" },
    ],
    example: {
      title: "Vì sao không tuyến tính",
      calculation: "Tổ chức lớn có nhiều lớp kiểm soát và phát hiện sớm hơn",
      result: "λ < 1",
      explanation: "Chọn λ ảnh hưởng tới kết quả mạnh hơn phần lớn lựa chọn kỹ thuật khác, và hiếm khi được giải thích.",
    },
  },
  {
    id: "o-006",
    subjectId: "operational-resilience",
    title: "Phân phối tần suất Poisson",
    badge: "Operational • LDA",
    equation: "P(N = k) = e^(−λ) · λ^k / k!",
    variables: [
      { symbol: "λ", name: "Số sự kiện kỳ vọng trong một năm - vừa là trung bình vừa là phương sai" },
    ],
    example: {
      title: "Vì sao dùng Poisson cho tần suất",
      calculation: "Sự kiện hiếm, độc lập, xảy ra với tốc độ ổn định",
      result: "Khớp giả định rủi ro hoạt động",
      explanation: "Mức độ tổn thất thì dùng phân phối khác, thường lognormal - tách hai chiều là điểm cốt lõi của LDA.",
    },
  },
  {
    id: "o-007",
    subjectId: "operational-resilience",
    title: "Chỉ số kinh doanh trong SMA",
    badge: "Operational • Vốn",
    equation: "BI = Cấu phần lãi và cho thuê + Cấu phần dịch vụ + Cấu phần tài chính",
    variables: [
      { symbol: "BI", name: "Business Indicator - gộp ba cấu phần lãi, dịch vụ và tài chính" },
    ],
    example: {
      title: "Vì sao dựa trên quy mô kinh doanh",
      calculation: "Không có mô hình nội bộ nào được duyệt nữa",
      result: "So sánh được giữa các ngân hàng",
      explanation: "Đánh đổi: bớt nhạy với hồ sơ rủi ro riêng để đổi lấy khả năng đối chiếu giữa các tổ chức.",
    },
  },
  {
    id: "o-008",
    subjectId: "operational-resilience",
    title: "Hệ số nhân tổn thất nội bộ",
    badge: "Operational • Vốn",
    equation: "ILM = ln( e − 1 + (Cấu phần tổn thất / Cấu phần chỉ số kinh doanh)^0,8 )",
    variables: [
      { symbol: "ILM", name: "Internal Loss Multiplier - kéo vốn lên hoặc xuống theo lịch sử tổn thất thật" },
    ],
    example: {
      title: "Ý nghĩa",
      calculation: "Ngân hàng có lịch sử tổn thất nhẹ hơn trung bình thì ILM < 1",
      result: "Vốn thấp hơn",
      explanation: "Đây là chỗ duy nhất trong SMA mà hồ sơ rủi ro riêng của ngân hàng còn ảnh hưởng tới con số vốn.",
    },
  },
  {
    id: "o-009",
    subjectId: "operational-resilience",
    title: "Rủi ro còn lại sau kiểm soát",
    badge: "Operational • RCSA",
    equation: "Rủi ro còn lại = Rủi ro cố hữu × (1 − Hiệu quả kiểm soát)",
    variables: [
      { symbol: "Rủi ro cố hữu", name: "Mức rủi ro khi chưa có chốt kiểm soát nào" },
    ],
    example: {
      title: "Vì sao phải đo cả hai",
      calculation: "Chỉ đo rủi ro còn lại thì không thấy kiểm soát đang gánh bao nhiêu",
      result: "Kiểm soát hỏng là lộ hết",
      explanation: "Một rủi ro còn lại thấp nhờ một chốt kiểm soát duy nhất là rủi ro rất khác với một rủi ro cố hữu vốn đã thấp.",
    },
  },
  {
    id: "l-005",
    subjectId: "liquidity-treasury",
    title: "VaR điều chỉnh thanh khoản",
    badge: "Liquidity • Đo lường",
    equation: "LVaR = VaR + ½ · Chênh lệch mua-bán × Giá trị vị thế",
    variables: [
      { symbol: "½ chênh lệch", name: "Chi phí thoát một chiều, tính từ giá giữa" },
    ],
    example: {
      title: "Vì sao VaR chuẩn chưa đủ",
      calculation: "Nó giả định thoát ở giá giữa và thoát được ngay",
      result: "Với vị thế lớn thì sai",
      explanation: "Ở thị trường mỏng, riêng phần chi phí thanh lý đã có thể vượt cả con số VaR gốc.",
    },
  },
  {
    id: "l-006",
    subjectId: "liquidity-treasury",
    title: "Tỷ lệ cho vay trên tiền gửi",
    badge: "Liquidity • Cấu trúc nguồn vốn",
    numerator: "Tổng dư nợ cho vay",
    denominator: "Tổng tiền gửi",
    variables: [
      { symbol: "LDR", name: "Vượt 100% nghĩa là phần chênh phải tài trợ bằng nguồn bán buôn" },
    ],
    example: {
      title: "Vì sao đáng lo khi vượt 100%",
      calculation: "Nguồn bán buôn biến mất nhanh hơn tiền gửi dân cư",
      result: "Rủi ro đảo nguồn",
      explanation: "Đối tác bán buôn không cần rút - họ chỉ cần không đảo hợp đồng vào sáng hôm sau.",
    },
  },
  {
    id: "l-007",
    subjectId: "liquidity-treasury",
    title: "Nhu cầu thanh khoản nội ngày",
    badge: "Liquidity • Thanh toán",
    equation: "Nhu cầu đỉnh = max qua các giờ của (Dòng ra tích luỹ − Dòng vào tích luỹ)",
    variables: [
      { symbol: "Nhu cầu đỉnh", name: "Lượng đệm phải có để không bị nghẽn thanh toán giữa ngày" },
    ],
    example: {
      title: "Vì sao LCR không bắt được",
      calculation: "LCR đo theo 30 ngày, không theo giờ",
      result: "Cần chỉ số riêng",
      explanation: "Ngân hàng đủ thanh khoản cuối ngày vẫn có thể không thanh toán nổi lúc mười giờ sáng.",
    },
  },
  {
    id: "i-005",
    subjectId: "investment-management",
    title: "Rủi ro thặng dư của quỹ hưu trí",
    badge: "Investment • Tài sản và nghĩa vụ",
    equation: "Surplus at Risk = z × σ(Tài sản − Nghĩa vụ) × Giá trị thặng dư",
    variables: [
      { symbol: "σ(A − L)", name: "Biến động của phần chênh giữa tài sản và nghĩa vụ, không phải của riêng tài sản" },
    ],
    example: {
      title: "Vì sao đo riêng bên tài sản là sai",
      calculation: "Lãi suất giảm → giá trị hiện tại của nghĩa vụ phình ra",
      result: "Thâm hụt ngay trong năm tài sản tăng giá",
      explanation: "Quỹ có thể lãi trên danh mục và vẫn tệ đi về khả năng chi trả. Chỉ đo rủi ro bên tài sản là bỏ sót đúng nửa bài toán mà quỹ hưu trí tồn tại để giải.",
    },
  },
  {
    id: "i-006",
    subjectId: "investment-management",
    title: "Hiệu ứng phân bổ trong quy kết",
    badge: "Investment • Quy kết",
    equation: "Hiệu ứng phân bổ = Σ (w_danh mục − w_chỉ số) × (R_ngành − R_chỉ số)",
    variables: [
      { symbol: "w", name: "Tỷ trọng ngành trong danh mục và trong chỉ số" },
    ],
    example: {
      title: "Tách khỏi chọn mã",
      calculation: "Hiệu ứng chọn mã dùng chênh lệch lợi suất TRONG ngành",
      result: "Hai kỹ năng khác nhau",
      explanation: "Tổng dương có thể che hai câu chuyện ngược nhau - phân bổ tốt và chọn mã kém, hoặc ngược lại.",
    },
  },
  {
    id: "i-007",
    subjectId: "investment-management",
    title: "Beta của danh mục",
    badge: "Investment • Rủi ro hệ thống",
    equation: "β_danh mục = Σ wᵢ · βᵢ",
    variables: [
      { symbol: "wᵢ", name: "Tỷ trọng theo giá trị thị trường" },
    ],
    example: {
      title: "Vì sao cần trước khi nói tới alpha",
      calculation: "Beta cao tự tạo phần vượt trong thị trường tăng",
      result: "Không phải kỹ năng",
      explanation: "Phải trừ phần thưởng cho rủi ro trước, phần còn lại mới là chỗ có thể nói tới kỹ năng.",
    },
  },
  {
    id: "ci-004",
    subjectId: "current-issues",
    title: "Tổn thất kỳ vọng theo kịch bản khí hậu",
    badge: "Current Issues • Khí hậu",
    equation: "EL_khí hậu = Σ P(kịch bản) × Tổn thất(kịch bản)",
    variables: [
      { symbol: "Kịch bản", name: "Thường theo các lộ trình nhiệt độ chuẩn, không theo phân phối thống kê" },
    ],
    example: {
      title: "Vì sao dùng kịch bản",
      calculation: "Không có chuỗi lịch sử nào cho thứ chưa xảy ra",
      result: "Giống rủi ro hoạt động",
      explanation: "Rủi ro vật lý và rủi ro chuyển đổi đánh đổi nhau: hành động quyết liệt giảm cái đầu và tăng cái sau.",
    },
  },
  {
    id: "ci-005",
    subjectId: "current-issues",
    title: "Tổn thất kỳ vọng từ sự cố an ninh mạng",
    badge: "Current Issues • Rủi ro mạng",
    equation: "EL = Tần suất × Mức độ trung bình",
    variables: [
      { symbol: "Tần suất", name: "Số vụ kỳ vọng mỗi năm" },
      { symbol: "Mức độ", name: "Tổn thất trung bình mỗi vụ, gồm cả chi phí gián đoạn và pháp lý" },
    ],
    example: {
      title: "Trở ngại lớn nhất",
      calculation: "Sự cố nghiêm trọng hiếm và ít được công bố",
      result: "Đuôi không ước lượng được",
      explanation: "Dữ liệu nội bộ gần như không có quan sát nào ở vùng nghiêm trọng nhất - buộc phải dựa vào kịch bản.",
    },
  },
];

/* i18n-ignore-end */
