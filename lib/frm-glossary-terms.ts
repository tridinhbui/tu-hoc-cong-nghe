import type { FrmSubjectId } from "@/lib/frm-track";

/**
 * Bộ thẻ thuật ngữ FRM song ngữ.
 *
 * CFA có 76 thẻ; FRM có 0 - trong khi FRM mới là kỳ thi nặng thuật ngữ hơn.
 * Gần như mọi thứ trong đề đều là một từ viết tắt đứng cho một định nghĩa
 * chính xác: VaR, ES, CVA, PFE, LCR, NSFR, PD/LGD/EAD, RWA, SA-CCR. Nhớ sai
 * một chữ trong định nghĩa là làm sai cả câu, và đó đúng là loại nội dung mà
 * lặp lại ngắt quãng xử lý tốt nhất.
 *
 * Mỗi thẻ mang theo cái bẫy của chính nó - `frmTip` là chỗ ghi lỗi mà người
 * học hay mắc, không phải chỗ nhắc lại định nghĩa lần hai.
 */

export interface FrmGlossaryTerm {
  id: string;
  termEn: string;
  termVi: string;
  subjectId: FrmSubjectId;
  definitionVi: string;
  definitionEn?: string;
  formula?: {
    equation?: string;
    numerator?: string;
    denominator?: string;
  };
  example?: string;
  /** Cái bẫy quanh thuật ngữ này, không phải định nghĩa nói lại lần nữa. */
  frmTip?: string;
}

export const FRM_GLOSSARY_TERMS: FrmGlossaryTerm[] = [
  // --- Foundations of Risk Management ---
  {
    id: "frm-fou-001",
    termEn: "Risk Appetite",
    termVi: "Khẩu vị rủi ro",
    subjectId: "foundations",
    definitionVi:
      "Mức rủi ro tổng thể mà một tổ chức chủ động chấp nhận gánh để theo đuổi mục tiêu chiến lược của mình.",
    definitionEn: "The aggregate level of risk an organisation is willing to assume to pursue its strategic objectives.",
    frmTip:
      "Đừng lẫn với risk capacity. Capacity là mức tối đa tổ chức CHỊU ĐƯỢC trước khi mất khả năng hoạt động; appetite là mức nó CHỌN nhận, và luôn phải nằm dưới capacity.",
  },
  {
    id: "frm-fou-002",
    termEn: "Risk Capacity",
    termVi: "Sức chịu đựng rủi ro",
    subjectId: "foundations",
    definitionVi:
      "Mức tổn thất tối đa một tổ chức có thể hấp thụ mà vẫn còn đủ vốn và thanh khoản để tiếp tục hoạt động.",
    frmTip:
      "Capacity là ràng buộc khách quan tính từ vốn và thanh khoản; appetite là lựa chọn của hội đồng quản trị. Đề hay cho một tình huống appetite vượt capacity - đó luôn là câu trả lời sai.",
  },
  {
    id: "frm-fou-003",
    termEn: "Sharpe Ratio",
    termVi: "Tỷ số Sharpe",
    subjectId: "foundations",
    definitionVi:
      "Lợi nhuận vượt trên lãi phi rủi ro tính trên mỗi đơn vị tổng rủi ro, đo bằng độ lệch chuẩn.",
    formula: { equation: "(E[Rp] − Rf) / σp" },
    frmTip:
      "Mẫu số là TỔNG rủi ro. Treynor dùng beta, tức chỉ rủi ro hệ thống - nên với danh mục đã đa dạng hoá tốt hai chỉ số xếp hạng giống nhau, còn với danh mục tập trung thì không.",
  },
  {
    id: "frm-fou-004",
    termEn: "Information Ratio",
    termVi: "Tỷ số thông tin",
    subjectId: "foundations",
    definitionVi:
      "Lợi nhuận vượt so với chỉ số tham chiếu chia cho tracking error - đo kỹ năng chủ động của người quản lý.",
    formula: { equation: "(Rp − Rb) / σ(Rp − Rb)" },
    frmTip:
      "Khác Sharpe ở chỗ mốc so sánh là benchmark chứ không phải lãi phi rủi ro. Một quỹ bám sát chỉ số có thể có Sharpe đẹp và Information Ratio gần 0 - tức không tạo ra giá trị chủ động nào.",
  },
  {
    id: "frm-fou-005",
    termEn: "BCBS 239",
    termVi: "Nguyên tắc tổng hợp dữ liệu rủi ro",
    subjectId: "foundations",
    definitionVi:
      "Bộ nguyên tắc của Basel về năng lực tổng hợp dữ liệu rủi ro và báo cáo, ra đời sau khi khủng hoảng 2008 cho thấy nhiều ngân hàng cần vài ngày mới trả lời được tổng phơi nhiễm với một đối tác.",
    frmTip:
      "Đây là chuẩn về HẠ TẦNG DỮ LIỆU, không phải về mô hình. Mô hình đúng chạy trên dữ liệu không tổng hợp kịp vẫn cho ra con số đến quá muộn.",
  },

  // --- Quantitative Analysis ---
  {
    id: "frm-qua-001",
    termEn: "Type I / Type II Error",
    termVi: "Sai lầm loại I / loại II",
    subjectId: "quant-analysis",
    definitionVi:
      "Loại I là bác bỏ giả thuyết gốc khi nó đúng; loại II là không bác bỏ khi nó sai.",
    frmTip:
      "Trong backtesting VaR, loại I là kết luận mô hình hỏng trong khi nó ổn. Hạ mức ý nghĩa để giảm loại I sẽ tự động làm tăng loại II - hai loại sai không thể cùng giảm nếu cỡ mẫu giữ nguyên.",
  },
  {
    id: "frm-qua-002",
    termEn: "GARCH(1,1)",
    termVi: "Mô hình phương sai có điều kiện",
    subjectId: "quant-analysis",
    definitionVi:
      "Mô hình ước lượng phương sai hôm nay từ phương sai dài hạn, phương sai hôm qua và bình phương lợi suất hôm qua.",
    formula: { equation: "σ²ₜ = ω + α·u²ₜ₋₁ + β·σ²ₜ₋₁" },
    frmTip:
      "Điều kiện dừng là α + β < 1. Càng gần 1 thì cú sốc càng dai dẳng; bằng 1 thì mô hình thành EWMA và không còn phương sai dài hạn để quay về.",
  },
  {
    id: "frm-qua-003",
    termEn: "EWMA",
    termVi: "Trung bình trượt có trọng số mũ",
    subjectId: "quant-analysis",
    definitionVi:
      "Cách ước lượng phương sai cho trọng số giảm dần theo cấp số nhân về quá khứ, điều khiển bởi tham số λ.",
    formula: { equation: "σ²ₜ = λ·σ²ₜ₋₁ + (1 − λ)·u²ₜ₋₁" },
    frmTip:
      "EWMA là GARCH(1,1) với ω = 0. RiskMetrics dùng λ = 0,94 cho dữ liệu ngày - λ càng nhỏ thì mô hình phản ứng càng nhanh và càng nhiễu.",
  },
  {
    id: "frm-qua-004",
    termEn: "Copula",
    termVi: "Hàm nối phân phối",
    subjectId: "quant-analysis",
    definitionVi:
      "Công cụ ghép các phân phối biên riêng lẻ thành một phân phối đồng thời, tách cấu trúc phụ thuộc ra khỏi phân phối từng biến.",
    frmTip:
      "Gaussian copula có phụ thuộc đuôi bằng 0: nó ngầm giả định các biến cố cực đoan không xảy ra cùng lúc. Đó chính là giả định đã sụp trong khủng hoảng nhà đất 2007-2008.",
  },

  // --- Financial Markets and Products ---
  {
    id: "frm-fmp-001",
    termEn: "Contango / Backwardation",
    termVi: "Bù hoãn mua / bù hoãn bán",
    subjectId: "financial-markets-products",
    definitionVi:
      "Contango là giá tương lai cao hơn giá giao ngay; backwardation là thấp hơn.",
    frmTip:
      "Quỹ ETF hàng hoá phải đảo hợp đồng liên tục, nên contango kéo dài bào mòn lợi suất qua roll yield âm ngay cả khi giá giao ngay đứng yên.",
  },
  {
    id: "frm-fmp-002",
    termEn: "Cheapest-to-Deliver (CTD)",
    termVi: "Trái phiếu rẻ nhất để giao",
    subjectId: "financial-markets-products",
    definitionVi:
      "Trái phiếu mà bên bán hợp đồng tương lai trái phiếu chọn giao vì mang lại chi phí thấp nhất cho họ.",
    frmTip:
      "Quyền chọn trái phiếu giao thuộc về BÊN BÁN, nên nó luôn làm giá hợp đồng tương lai thấp đi một chút so với khi không có quyền đó.",
  },
  {
    id: "frm-fmp-003",
    termEn: "Basis Risk",
    termVi: "Rủi ro cơ sở",
    subjectId: "financial-markets-products",
    definitionVi:
      "Rủi ro giá tài sản cần phòng hộ và giá công cụ phòng hộ không di chuyển cùng nhau đúng như giả định.",
    formula: { equation: "Basis = Giá giao ngay − Giá tương lai" },
    frmTip:
      "Phòng hộ không xoá rủi ro, nó ĐỔI rủi ro giá lấy rủi ro cơ sở. Câu hỏi đúng không phải còn rủi ro không, mà là rủi ro còn lại có nhỏ hơn và dễ đoán hơn không.",
  },
  {
    id: "frm-fmp-004",
    termEn: "Interest Rate Swap",
    termVi: "Hoán đổi lãi suất",
    subjectId: "financial-markets-products",
    definitionVi:
      "Hợp đồng hai bên trao đổi dòng tiền lãi, thường một bên cố định đổi lấy một bên thả nổi, trên cùng một vốn danh nghĩa.",
    frmTip:
      "Vốn danh nghĩa không bao giờ được trao đổi, nên phơi nhiễm tín dụng nhỏ hơn nhiều so với con số danh nghĩa - đây là chỗ đề hay gài.",
  },

  // --- Valuation and Risk Models ---
  {
    id: "frm-vrm-001",
    termEn: "Value at Risk (VaR)",
    termVi: "Giá trị chịu rủi ro",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Mức tổn thất mà xác suất bị vượt qua trong một khoảng thời gian cho trước đúng bằng một mức đã chọn.",
    example: "VaR 1 ngày ở 95% bằng 3 triệu USD: khoảng 5% số ngày, khoản lỗ sẽ lớn hơn 3 triệu.",
    frmTip:
      "VaR là một NGƯỠNG PHÂN VỊ, không phải mức lỗ tối đa. Nó im lặng hoàn toàn về phần đuôi bên kia ngưỡng - đọc nó thành lỗ tối đa là hiểu nhầm đã khiến nhiều tổ chức bất ngờ năm 2008.",
  },
  {
    id: "frm-vrm-002",
    termEn: "Expected Shortfall (ES)",
    termVi: "Tổn thất kỳ vọng phần đuôi",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Giá trị kỳ vọng của khoản lỗ VỚI ĐIỀU KIỆN nó đã vượt ngưỡng VaR - tức trung bình của phần đuôi.",
    frmTip:
      "ES là thước đo nhất quán (coherent), VaR thì không: VaR có thể vi phạm tính cộng dưới, nghĩa là gộp hai danh mục lại cho ra VaR lớn hơn tổng hai VaR riêng. Đây là lý do Basel chuyển sang ES.",
  },
  {
    id: "frm-vrm-003",
    termEn: "Coherent Risk Measure",
    termVi: "Thước đo rủi ro nhất quán",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Thước đo thoả bốn tính chất: đơn điệu, bất biến tịnh tiến, thuần nhất dương và cộng dưới.",
    frmTip:
      "Tính chất VaR vi phạm là cộng dưới - đúng cái tính chất nói rằng đa dạng hoá không được làm rủi ro tăng lên.",
  },
  {
    id: "frm-vrm-004",
    termEn: "Duration / Convexity",
    termVi: "Kỳ hạn hiệu dụng / độ lồi",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Duration là độ nhạy bậc nhất của giá trái phiếu với lãi suất; convexity là hiệu chỉnh bậc hai cho phần cong.",
    formula: { equation: "ΔP/P ≈ −D·Δy + ½·C·(Δy)²" },
    frmTip:
      "Chỉ dùng duration sẽ luôn ƯỚC LƯỢNG THẤP giá khi lãi suất thay đổi mạnh theo cả hai chiều, vì convexity dương luôn cộng thêm vào giá.",
  },
  {
    id: "frm-vrm-005",
    termEn: "Merton Model",
    termVi: "Mô hình Merton",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Mô hình coi vốn chủ sở hữu như một quyền chọn mua trên tài sản doanh nghiệp, với giá thực hiện là mệnh giá nợ.",
    frmTip:
      "Vì là mô hình cấu trúc, nó cho PD nội suy từ giá cổ phiếu và biến động - nên PD nhảy ngay khi thị trường cổ phiếu biến động, kể cả khi báo cáo tài chính chưa đổi.",
  },

  // --- Market Risk ---
  {
    id: "frm-mkt-001",
    termEn: "Backtesting",
    termVi: "Kiểm định hồi tố",
    subjectId: "market-risk",
    definitionVi:
      "So số lần lỗ thực tế vượt VaR với số lần lý thuyết cho phép, để kiểm tra mô hình có còn đúng không.",
    frmTip:
      "Basel dùng ba vùng đèn giao thông trên 250 ngày: xanh 0-4 lần vượt, vàng 5-9, đỏ từ 10. Vào vùng vàng hay đỏ thì hệ số nhân vốn tăng lên.",
  },
  {
    id: "frm-mkt-002",
    termEn: "Square-Root-of-Time Rule",
    termVi: "Quy tắc căn bậc hai thời gian",
    subjectId: "market-risk",
    definitionVi: "Cách quy đổi VaR từ chân trời ngắn sang chân trời dài hơn.",
    formula: { equation: "VaR(T ngày) = VaR(1 ngày) × √T" },
    frmTip:
      "Chỉ đúng khi lợi suất độc lập và cùng phân phối. Có tự tương quan hoặc phương sai co cụm - tức gần như mọi thị trường thật - thì quy tắc này ước lượng THẤP rủi ro.",
  },
  {
    id: "frm-mkt-003",
    termEn: "Stressed VaR",
    termVi: "VaR trong kịch bản căng thẳng",
    subjectId: "market-risk",
    definitionVi:
      "VaR tính lại bằng dữ liệu từ một giai đoạn khủng hoảng thật trong quá khứ thay vì dữ liệu gần đây.",
    frmTip:
      "Sinh ra để chữa tính thuận chu kỳ: giai đoạn thị trường yên ả kéo VaR thường xuống thấp, làm yêu cầu vốn giảm đúng lúc rủi ro đang tích tụ.",
  },

  // --- Credit Risk ---
  {
    id: "frm-cre-001",
    termEn: "Expected Loss (EL)",
    termVi: "Tổn thất kỳ vọng",
    subjectId: "credit-risk",
    definitionVi: "Tổn thất trung bình dự kiến của một khoản tín dụng trong một năm.",
    formula: { equation: "EL = PD × LGD × EAD" },
    frmTip:
      "EL được bù bằng DỰ PHÒNG và tính vào giá khoản vay. Vốn chỉ dùng để hấp thụ phần tổn thất NGOÀI dự kiến - lẫn hai thứ này là lỗi khái niệm hay gặp nhất ở phần tín dụng.",
  },
  {
    id: "frm-cre-002",
    termEn: "Loss Given Default (LGD)",
    termVi: "Tổn thất khi vỡ nợ",
    subjectId: "credit-risk",
    definitionVi: "Tỷ lệ phần trăm dư nợ bị mất thật sau khi đã thu hồi tài sản bảo đảm.",
    formula: { equation: "LGD = 1 − Tỷ lệ thu hồi" },
    frmTip:
      "LGD có tương quan dương với PD: khủng hoảng vừa làm nhiều bên vỡ nợ vừa làm giá tài sản bảo đảm rơi, nên hai yếu tố xấu đi cùng lúc chứ không độc lập.",
  },
  {
    id: "frm-cre-003",
    termEn: "Credit Valuation Adjustment (CVA)",
    termVi: "Điều chỉnh định giá do rủi ro đối tác",
    subjectId: "credit-risk",
    definitionVi:
      "Phần giá trị bị trừ đi khỏi một hợp đồng phái sinh để phản ánh khả năng đối tác không thực hiện nghĩa vụ.",
    frmTip:
      "DVA là mặt gương của CVA tính trên rủi ro vỡ nợ của CHÍNH MÌNH - và nó tạo ra nghịch lý là chất lượng tín dụng của bạn xấu đi thì báo cáo lãi lại đẹp lên.",
  },
  {
    id: "frm-cre-004",
    termEn: "Wrong-Way Risk",
    termVi: "Rủi ro tương quan ngược",
    subjectId: "credit-risk",
    definitionVi:
      "Tình huống phơi nhiễm với một đối tác tăng lên đúng lúc chất lượng tín dụng của đối tác đó xấu đi.",
    example: "Mua CDS bảo vệ cho trái phiếu chính phủ một nước từ chính ngân hàng lớn nhất nước đó.",
    frmTip:
      "Phân biệt specific (do cấu trúc giao dịch cụ thể) với general (do yếu tố vĩ mô chung). SA-CCR áp hệ số phạt riêng cho phần specific.",
  },
  {
    id: "frm-cre-005",
    termEn: "Potential Future Exposure (PFE)",
    termVi: "Phơi nhiễm tương lai tiềm tàng",
    subjectId: "credit-risk",
    definitionVi:
      "Mức phơi nhiễm tối đa với một đối tác ở một phân vị tin cậy, tại một thời điểm trong tương lai.",
    frmTip:
      "Khác Expected Exposure ở chỗ EE là trung bình còn PFE là phân vị đuôi. Hạn mức tín dụng đối tác thường đặt trên PFE chứ không trên EE.",
  },

  // --- Operational Resilience ---
  {
    id: "frm-ope-001",
    termEn: "Loss Distribution Approach (LDA)",
    termVi: "Phương pháp phân phối tổn thất",
    subjectId: "operational-resilience",
    definitionVi:
      "Cách mô hình hoá rủi ro hoạt động bằng cách ghép riêng phân phối TẦN SUẤT và phân phối MỨC ĐỘ tổn thất.",
    frmTip:
      "Tần suất thường dùng Poisson, mức độ dùng lognormal. Tách hai chiều là điểm cốt lõi: một loại sự cố có thể hiếm mà nặng, loại khác thường xuyên mà nhẹ.",
  },
  {
    id: "frm-ope-002",
    termEn: "Key Risk Indicator (KRI)",
    termVi: "Chỉ báo rủi ro chính",
    subjectId: "operational-resilience",
    definitionVi:
      "Chỉ số theo dõi được dùng để cảnh báo sớm rằng mức rủi ro hoạt động đang tăng lên.",
    frmTip:
      "KRI nhìn TỚI TRƯỚC, KPI nhìn LẠI SAU. Một KRI chỉ động đậy sau khi tổn thất đã xảy ra thì thực chất là KPI đội lốt.",
  },
  {
    id: "frm-ope-003",
    termEn: "RCSA",
    termVi: "Tự đánh giá rủi ro và kiểm soát",
    subjectId: "operational-resilience",
    definitionVi:
      "Quy trình để chính đơn vị kinh doanh tự nhận diện rủi ro của mình và đánh giá hiệu quả các chốt kiểm soát đang có.",
    frmTip:
      "Điểm yếu cố hữu là tự chấm điểm mình. Nó phải được đối chiếu với dữ liệu tổn thất thật, nếu không sẽ trở thành bài tập điền form.",
  },
  {
    id: "frm-ope-004",
    termEn: "Fraud Triangle",
    termVi: "Tam giác gian lận",
    subjectId: "operational-resilience",
    definitionVi: "Ba yếu tố thường phải cùng có mặt để gian lận xảy ra: áp lực, cơ hội và sự biện minh.",
    frmTip:
      "Kiểm soát nội bộ gần như chỉ tác động được vào CƠ HỘI. Áp lực đến từ đời sống riêng và biện minh nằm trong đầu người ta - tổ chức chạm vào rất hạn chế.",
  },

  // --- Liquidity and Treasury ---
  {
    id: "frm-liq-001",
    termEn: "Liquidity Coverage Ratio (LCR)",
    termVi: "Tỷ lệ bao phủ thanh khoản",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Tài sản thanh khoản chất lượng cao chia cho dòng tiền ra ròng dự kiến trong 30 ngày căng thẳng, tối thiểu 100%.",
    formula: { numerator: "HQLA", denominator: "Dòng tiền ra ròng trong 30 ngày" },
    frmTip:
      "LCR là chuẩn NGẮN HẠN, 30 ngày. NSFR mới là chuẩn dài hạn một năm - đề rất hay hoán đổi chân trời của hai tỷ lệ này.",
  },
  {
    id: "frm-liq-002",
    termEn: "Net Stable Funding Ratio (NSFR)",
    termVi: "Tỷ lệ nguồn vốn ổn định ròng",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Nguồn vốn ổn định sẵn có chia cho nguồn vốn ổn định bắt buộc trên chân trời một năm, tối thiểu 100%.",
    frmTip:
      "NSFR nhắm vào lệch kỳ hạn cấu trúc - vay ngắn cho vay dài. LCR nhắm vào cú sốc rút tiền cấp tính. Hai bệnh khác nhau, hai thuốc khác nhau.",
  },
  {
    id: "frm-liq-003",
    termEn: "Liquidity-Adjusted VaR (LVaR)",
    termVi: "VaR có điều chỉnh thanh khoản",
    subjectId: "liquidity-treasury",
    definitionVi:
      "VaR cộng thêm chi phí thanh lý vị thế, thường ước bằng nửa chênh lệch giá mua - giá bán.",
    frmTip:
      "VaR chuẩn ngầm giả định thoát vị thế ở giá giữa và thoát được ngay. Với vị thế lớn ở thị trường mỏng, riêng phần chi phí thanh lý đã có thể vượt cả con số VaR gốc.",
  },

  // --- Risk Management and Investment Management ---
  {
    id: "frm-inv-001",
    termEn: "Tracking Error",
    termVi: "Sai số bám chỉ số",
    subjectId: "investment-management",
    definitionVi: "Độ lệch chuẩn của phần chênh lệch lợi suất giữa danh mục và chỉ số tham chiếu.",
    frmTip:
      "Tracking error thấp không có nghĩa là quản lý giỏi - nó chỉ có nghĩa là bám sát chỉ số. Phải đọc cùng Information Ratio mới biết phần chệch khỏi chỉ số có sinh lời hay không.",
  },
  {
    id: "frm-inv-002",
    termEn: "Risk Budgeting",
    termVi: "Phân bổ ngân sách rủi ro",
    subjectId: "investment-management",
    definitionVi:
      "Cách phân bổ danh mục theo phần đóng góp vào tổng rủi ro thay vì theo tỷ trọng vốn.",
    frmTip:
      "Một danh mục 60/40 theo vốn thường là khoảng 90/10 theo rủi ro, vì cổ phiếu biến động mạnh hơn trái phiếu rất nhiều. Đây chính là lập luận nền của risk parity.",
  },
  {
    id: "frm-inv-003",
    termEn: "Surplus at Risk",
    termVi: "Thặng dư chịu rủi ro",
    subjectId: "investment-management",
    definitionVi:
      "VaR áp lên phần chênh lệch giữa tài sản và nghĩa vụ của một quỹ hưu trí hoặc công ty bảo hiểm.",
    frmTip:
      "Chỉ đo rủi ro bên tài sản là bỏ sót nửa bài toán: lãi suất giảm làm giá trị hiện tại của nghĩa vụ phình ra, và quỹ có thể thâm hụt ngay trong năm tài sản tăng giá.",
  },

  // --- Current Issues ---
  {
    id: "frm-cur-001",
    termEn: "Climate Risk: Physical vs Transition",
    termVi: "Rủi ro khí hậu: vật lý và chuyển đổi",
    subjectId: "current-issues",
    definitionVi:
      "Rủi ro vật lý đến từ chính các hiện tượng thời tiết và khí hậu; rủi ro chuyển đổi đến từ chính sách, công nghệ và thay đổi hành vi trên đường chuyển sang kinh tế carbon thấp.",
    frmTip:
      "Hai loại này đánh đổi nhau: hành động khí hậu quyết liệt làm giảm rủi ro vật lý dài hạn nhưng làm TĂNG rủi ro chuyển đổi ngắn hạn cho các ngành phát thải cao.",
  },
  {
    id: "frm-cur-002",
    termEn: "Cyber Risk Quantification",
    termVi: "Lượng hoá rủi ro an ninh mạng",
    subjectId: "current-issues",
    definitionVi:
      "Việc quy đổi rủi ro tấn công mạng thành tổn thất tiền tệ để đưa được vào cùng khung với các loại rủi ro khác.",
    frmTip:
      "Trở ngại lớn nhất là dữ liệu: sự cố nghiêm trọng hiếm và ít được công bố, nên phân phối phần đuôi gần như không ước lượng được từ dữ liệu nội bộ.",
  },
];
