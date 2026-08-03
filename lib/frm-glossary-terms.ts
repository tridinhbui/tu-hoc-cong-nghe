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
  {
    id: "frm-fou-006",
    termEn: "Enterprise Risk Management (ERM)",
    termVi: "Quản trị rủi ro toàn doanh nghiệp",
    subjectId: "foundations",
    definitionVi:
      "Cách nhìn rủi ro trên toàn tổ chức thay vì quản riêng từng loại trong từng bộ phận.",
    frmTip:
      "Giá trị của ERM nằm ở chỗ nhìn thấy tương quan giữa các loại rủi ro. Quản rời rạc thì tổng rủi ro luôn bị đánh giá thấp, vì phần chúng cùng xấu đi không thuộc về bảng nào.",
  },
  {
    id: "frm-fou-007",
    termEn: "Risk-Adjusted Return on Capital (RAROC)",
    termVi: "Lợi nhuận điều chỉnh rủi ro trên vốn",
    subjectId: "foundations",
    definitionVi:
      "Lợi nhuận sau khi trừ tổn thất kỳ vọng, chia cho vốn kinh tế của hoạt động đó.",
    formula: { equation: "(Lợi nhuận − EL) / Vốn kinh tế" },
    frmTip:
      "So với chi phí vốn mới ra kết luận. Lợi nhuận tuyệt đối luôn thưởng cho mảng gánh nhiều rủi ro nhất, nên nó là thước đo sai khi phân bổ vốn.",
  },
  {
    id: "frm-fou-008",
    termEn: "Economic Capital",
    termVi: "Vốn kinh tế",
    subjectId: "foundations",
    definitionVi:
      "Lượng vốn cần để hấp thụ tổn thất ngoài dự kiến ở một mức tin cậy đã chọn.",
    frmTip:
      "Đừng lẫn với vốn pháp định. Vốn kinh tế do chính tổ chức mô hình hoá theo khẩu vị của mình; vốn pháp định do cơ quan quản lý áp. Hai con số thường khác nhau đáng kể.",
  },
  {
    id: "frm-fou-009",
    termEn: "Three Lines of Defence",
    termVi: "Ba tuyến phòng vệ",
    subjectId: "foundations",
    definitionVi:
      "Đơn vị kinh doanh sở hữu rủi ro, bộ phận rủi ro giám sát độc lập, kiểm toán nội bộ đảm bảo cả hai.",
    frmTip:
      "Tuyến một là đơn vị kinh doanh chứ không phải phòng rủi ro. Hiểu ngược chỗ này sinh ra văn hoá coi rủi ro là việc của người khác.",
  },
  {
    id: "frm-qua-005",
    termEn: "Stationarity",
    termVi: "Tính dừng",
    subjectId: "quant-analysis",
    definitionVi:
      "Chuỗi có trung bình và phương sai không đổi theo thời gian, hiệp phương sai chỉ phụ thuộc độ trễ.",
    frmTip:
      "Hồi quy hai chuỗi không dừng cho R² rất cao mà không có quan hệ nào - đó là hồi quy giả mạo. Kiểm tra tính dừng là bước đầu tiên, không phải bước kiểm tra cuối.",
  },
  {
    id: "frm-qua-006",
    termEn: "Maximum Likelihood Estimation (MLE)",
    termVi: "Ước lượng hợp lý cực đại",
    subjectId: "quant-analysis",
    definitionVi:
      "Chọn bộ tham số làm cho dữ liệu quan sát được trở nên khả dĩ nhất.",
    frmTip:
      "MLE hiệu quả về mặt tiệm cận nhưng rất nhạy với việc chọn sai dạng phân phối. Chọn nhầm họ phân phối thì tham số vẫn hội tụ - hội tụ về một câu trả lời sai.",
  },
  {
    id: "frm-qua-007",
    termEn: "Heteroskedasticity",
    termVi: "Phương sai sai số thay đổi",
    subjectId: "quant-analysis",
    definitionVi:
      "Phương sai của sai số hồi quy không đồng nhất giữa các quan sát.",
    frmTip:
      "Nó KHÔNG làm hệ số bị chệch, chỉ làm sai số chuẩn sai - nên kiểm định t và p-value mới là thứ hỏng. Đây là điểm hay bị hiểu ngược nhất.",
  },
  {
    id: "frm-qua-008",
    termEn: "Bootstrapping",
    termVi: "Tái chọn mẫu bootstrap",
    subjectId: "quant-analysis",
    definitionVi:
      "Lấy mẫu có hoàn lại từ chính dữ liệu để dựng phân phối của một ước lượng.",
    frmTip:
      "Bootstrap không tạo thêm thông tin. Nó chỉ đo được độ bất định trong phạm vi dữ liệu đã có, nên với phần đuôi hiếm nó vẫn im lặng như phương pháp gốc.",
  },
  {
    id: "frm-qua-009",
    termEn: "Principal Component Analysis (PCA)",
    termVi: "Phân tích thành phần chính",
    subjectId: "quant-analysis",
    definitionVi:
      "Rút một tập nhân tố trực giao giải thích phần lớn biến động của nhiều biến tương quan.",
    frmTip:
      "Với đường cong lợi suất, ba thành phần đầu thường là mức, độ dốc và độ cong - và chúng giải thích gần hết biến động. Đó là cơ sở của phòng hộ theo key rate.",
  },
  {
    id: "frm-fmp-005",
    termEn: "Forward vs Futures",
    termVi: "Kỳ hạn và tương lai",
    subjectId: "financial-markets-products",
    definitionVi:
      "Forward là hợp đồng tuỳ chỉnh giao dịch OTC; futures chuẩn hoá, niêm yết, có thanh toán bù trừ hàng ngày.",
    frmTip:
      "Khác biệt quan trọng nhất là thanh toán hàng ngày của futures tạo ra dòng tiền trung gian - nên khi lãi suất tương quan với giá tài sản, giá futures và giá forward không còn bằng nhau.",
  },
  {
    id: "frm-fmp-006",
    termEn: "Put-Call Parity",
    termVi: "Cân bằng quyền chọn mua - bán",
    subjectId: "financial-markets-products",
    definitionVi:
      "Quan hệ bắt buộc giữa giá quyền mua, quyền bán, tài sản cơ sở và trái phiếu phi rủi ro.",
    formula: { equation: "c + K·e^(−rT) = p + S₀" },
    frmTip:
      "Chỉ đúng với quyền chọn kiểu châu Âu trên tài sản không trả cổ tức. Vi phạm nó là có cơ hội arbitrage, nên trên thực tế nó gần như luôn giữ.",
  },
  {
    id: "frm-fmp-007",
    termEn: "Option Greeks",
    termVi: "Các hệ số Greeks",
    subjectId: "financial-markets-products",
    definitionVi:
      "Bộ đo độ nhạy của giá quyền chọn: delta theo giá, gamma theo delta, vega theo biến động, theta theo thời gian.",
    frmTip:
      "Vị thế bán quyền chọn có gamma âm: delta thay đổi ngược hướng có lợi cho bạn, nên phải mua cao bán thấp liên tục để phòng hộ.",
  },
  {
    id: "frm-fmp-008",
    termEn: "Covered Interest Rate Parity",
    termVi: "Ngang giá lãi suất có phòng hộ",
    subjectId: "financial-markets-products",
    definitionVi:
      "Chênh lệch lãi suất giữa hai đồng tiền phải bằng chênh lệch giữa tỷ giá kỳ hạn và giao ngay.",
    formula: { equation: "F = S · (1 + r_trong nước) / (1 + r_nước ngoài)" },
    frmTip:
      "Sau 2008, cross-currency basis khác 0 kéo dài cho thấy quan hệ này có thể lệch khi vốn bị ràng buộc - một arbitrage tồn tại nhưng không ai đủ bảng cân đối để làm.",
  },
  {
    id: "frm-fmp-009",
    termEn: "Exchange-Traded Fund (ETF)",
    termVi: "Quỹ hoán đổi danh mục",
    subjectId: "financial-markets-products",
    definitionVi:
      "Quỹ niêm yết, giao dịch như cổ phiếu, có cơ chế tạo lập và hoàn đổi giữ giá bám sát NAV.",
    frmTip:
      "Cơ chế tạo - hoàn của các Authorized Participant là thứ giữ giá khớp NAV. Khi tài sản cơ sở mất thanh khoản, cơ chế đó nghẽn và chênh lệch giá - NAV mới nới ra.",
  },
  {
    id: "frm-fmp-010",
    termEn: "Commodity Roll Yield",
    termVi: "Lợi suất đảo hợp đồng hàng hoá",
    subjectId: "financial-markets-products",
    definitionVi:
      "Phần lãi hoặc lỗ phát sinh khi đảo hợp đồng tương lai sắp đáo hạn sang kỳ hạn xa hơn.",
    frmTip:
      "Contango kéo dài tạo roll yield âm, bào mòn lợi suất của ETF hàng hoá ngay cả khi giá giao ngay đứng yên. Đây là lý do ETF hàng hoá hay thua chính giá hàng hoá.",
  },
  {
    id: "frm-fmp-011",
    termEn: "Mortgage-Backed Security (MBS)",
    termVi: "Chứng khoán bảo đảm bằng thế chấp",
    subjectId: "financial-markets-products",
    definitionVi:
      "Chứng khoán hoá một rổ khoản vay thế chấp, dòng tiền trả cho nhà đầu tư từ tiền gốc và lãi người vay trả.",
    frmTip:
      "Rủi ro đặc trưng là trả trước: lãi suất giảm thì người vay tái tài trợ và nhà đầu tư nhận lại vốn đúng lúc chỉ tái đầu tư được ở lãi suất thấp hơn.",
  },
  {
    id: "frm-fmp-012",
    termEn: "Negative Convexity",
    termVi: "Độ lồi âm",
    subjectId: "financial-markets-products",
    definitionVi:
      "Giá tăng chậm lại khi lợi suất giảm, thay vì tăng nhanh như trái phiếu thường.",
    frmTip:
      "MBS có độ lồi âm vì quyền trả trước thuộc về người vay. Hệ quả: được ít khi lãi suất giảm nhưng mất đủ khi lãi suất tăng - bất đối xứng theo hướng bất lợi.",
  },
  {
    id: "frm-fmp-013",
    termEn: "Central Counterparty (CCP)",
    termVi: "Trung tâm thanh toán bù trừ",
    subjectId: "financial-markets-products",
    definitionVi:
      "Tổ chức đứng giữa hai bên giao dịch, trở thành đối tác của cả hai.",
    frmTip:
      "CCP đổi mạng lưới phơi nhiễm song phương lấy cấu trúc hình sao - giảm lây lan nhưng dồn rủi ro vào chính nó, nên quỹ bảo đảm và ký quỹ của CCP thành điểm hệ thống.",
  },
  {
    id: "frm-fmp-014",
    termEn: "Initial vs Variation Margin",
    termVi: "Ký quỹ ban đầu và ký quỹ biến động",
    subjectId: "financial-markets-products",
    definitionVi:
      "Ký quỹ ban đầu là đệm cho tổn thất tương lai; ký quỹ biến động bù phần lãi lỗ đã phát sinh.",
    frmTip:
      "Ký quỹ biến động chuyển tiền theo giá thị trường mỗi ngày; ký quỹ ban đầu nằm yên cho tới khi đóng vị thế. Lẫn hai thứ này là lỗi hay gặp ở phần phái sinh.",
  },
  {
    id: "frm-vrm-006",
    termEn: "Historical Simulation VaR",
    termVi: "VaR mô phỏng lịch sử",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Áp lại các biến động lịch sử lên danh mục hôm nay rồi lấy phân vị của chuỗi lãi lỗ.",
    frmTip:
      "Không giả định phân phối nên giữ được đuôi dày thật. Đổi lại nó không sinh ra được kịch bản chưa từng có trong cửa sổ quan sát.",
  },
  {
    id: "frm-vrm-007",
    termEn: "Monte Carlo VaR",
    termVi: "VaR mô phỏng Monte Carlo",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Sinh hàng loạt kịch bản từ một mô hình phân phối rồi định giá lại danh mục ở từng kịch bản.",
    frmTip:
      "Linh hoạt nhất trong ba phương pháp và cũng tốn kém nhất. Rủi ro của nó là rủi ro mô hình: kết quả chỉ tốt bằng phân phối được giả định.",
  },
  {
    id: "frm-vrm-008",
    termEn: "Delta-Normal VaR",
    termVi: "VaR tham số delta-normal",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Giả định lợi suất phân phối chuẩn và quan hệ giá tuyến tính, tính VaR từ độ lệch chuẩn danh mục.",
    formula: { equation: "VaR = z × σ × V" },
    frmTip:
      "Với danh mục có quyền chọn, giả định tuyến tính hỏng: gamma làm khoản lỗ tăng nhanh hơn tuyến tính đúng ở phần đuôi cần đo.",
  },
  {
    id: "frm-vrm-009",
    termEn: "Marginal VaR",
    termVi: "VaR biên",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Mức thay đổi của VaR danh mục khi tăng thêm một đơn vị nhỏ vào một vị thế.",
    frmTip:
      "Dùng cho quyết định điều chỉnh nhỏ. Với việc nhận hay bỏ cả một thương vụ thì phải dùng incremental VaR, vì quan hệ không tuyến tính.",
  },
  {
    id: "frm-vrm-010",
    termEn: "Component VaR",
    termVi: "VaR thành phần",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Phần đóng góp của một vị thế vào VaR tổng, có tính chất cộng lại đúng bằng tổng thể.",
    frmTip:
      "Đây là thước đo duy nhất trong nhóm dùng được để phân bổ vốn: các phần cộng lại vừa khít nên không phần rủi ro nào bị tính hai lần hay bỏ sót.",
  },
  {
    id: "frm-vrm-011",
    termEn: "Binomial Tree Model",
    termVi: "Mô hình cây nhị thức",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Định giá quyền chọn bằng cách dựng cây các trạng thái giá rời rạc và quy ngược về hiện tại.",
    frmTip:
      "Ưu thế lớn nhất so với Black-Scholes là định giá được quyền chọn kiểu Mỹ, vì ở mỗi nút đều so được giữa thực hiện sớm và giữ tiếp.",
  },
  {
    id: "frm-vrm-012",
    termEn: "Risk-Neutral Probability",
    termVi: "Xác suất trung tính rủi ro",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Xác suất giả định dùng để định giá, dưới đó mọi tài sản đều sinh lợi bằng lãi suất phi rủi ro.",
    formula: { equation: "p = (e^(rΔt) − d) / (u − d)" },
    frmTip:
      "Đây không phải xác suất thật của thị trường. Nó là công cụ tính toán, và lẫn nó với xác suất thực tế là hiểu nhầm cốt lõi ở phần định giá.",
  },
  {
    id: "frm-vrm-013",
    termEn: "DV01",
    termVi: "Giá trị một điểm cơ bản",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Mức thay đổi giá trị của một vị thế khi lợi suất dịch một điểm cơ bản.",
    frmTip:
      "Phòng hộ theo DV01 chỉ trung hoà dịch chuyển song song. Đường cong xoay hay gãy thì phần rủi ro còn lại không được che - đó là basis risk của chính phép phòng hộ.",
  },
  {
    id: "frm-vrm-014",
    termEn: "Model Risk",
    termVi: "Rủi ro mô hình",
    subjectId: "valuation-risk-models",
    definitionVi:
      "Rủi ro thiệt hại do mô hình sai, dùng sai mục đích, hoặc được cho ăn dữ liệu sai.",
    frmTip:
      "Ba nguồn khác nhau cần ba cách chữa khác nhau: kiểm định độc lập cho mô hình sai, quản trị sử dụng cho dùng sai chỗ, và chất lượng dữ liệu cho nguồn thứ ba.",
  },
  {
    id: "frm-mkt-004",
    termEn: "FRTB",
    termVi: "Khung vốn rủi ro thị trường mới",
    subjectId: "market-risk",
    definitionVi:
      "Bộ chuẩn Basel viết lại toàn bộ cách tính vốn cho sổ giao dịch sau khủng hoảng 2008.",
    frmTip:
      "Bốn thay đổi lớn đều trỏ vào một thứ đã hỏng: ranh giới hai sổ bị lợi dụng, VaR mù ở đuôi, giả định thanh khoản đồng nhất, và mô hình nội bộ duyệt ở cấp toàn ngân hàng.",
  },
  {
    id: "frm-mkt-005",
    termEn: "Liquidity Horizon",
    termVi: "Chân trời thanh khoản",
    subjectId: "market-risk",
    definitionVi:
      "Thời gian giả định để thoát hoặc phòng hộ một nhân tố rủi ro, phân theo nhóm nhân tố.",
    frmTip:
      "Khung cũ dùng 10 ngày cho tất cả. FRTB chia từ 10 tới 120 ngày, vì bài học 2008 là thanh khoản không biến mất đều nhau giữa các thị trường.",
  },
  {
    id: "frm-mkt-006",
    termEn: "P&L Attribution Test",
    termVi: "Kiểm định quy kết lãi lỗ",
    subjectId: "market-risk",
    definitionVi:
      "So mức khớp giữa lãi lỗ mà mô hình rủi ro dự báo và lãi lỗ thực tế của một bàn giao dịch.",
    frmTip:
      "Chạy ở cấp BÀN chứ không cấp ngân hàng. Trượt thì bàn đó về phương pháp chuẩn hoá với vốn cao hơn - hệ quả là kinh tế, không phải cấm đoán.",
  },
  {
    id: "frm-mkt-007",
    termEn: "Key Rate Duration",
    termVi: "Kỳ hạn theo từng điểm lãi suất",
    subjectId: "market-risk",
    definitionVi:
      "Độ nhạy của giá với thay đổi lãi suất tại một điểm kỳ hạn riêng, giữ các điểm khác cố định.",
    frmTip:
      "Tổng các key rate duration xấp xỉ duration hiệu dụng, vì cộng chúng lại chính là mô phỏng dịch song song. Đó cũng là phép kiểm tra nhanh xem bộ số có đúng không.",
  },
  {
    id: "frm-mkt-008",
    termEn: "Risk Factor Mapping",
    termVi: "Ánh xạ nhân tố rủi ro",
    subjectId: "market-risk",
    definitionVi:
      "Quy hàng nghìn vị thế về một tập nhân tố nhỏ hơn để ma trận hiệp phương sai ước lượng được.",
    frmTip:
      "Ánh xạ càng thô thì VaR càng bị ước lượng thấp, vì gộp nhiều vị thế vào một nhân tố là ngầm giả định chúng tương quan hoàn hảo và bù trừ nhau trọn vẹn.",
  },
  {
    id: "frm-mkt-009",
    termEn: "Basel Traffic Light Approach",
    termVi: "Ba vùng đèn giao thông của Basel",
    subjectId: "market-risk",
    definitionVi:
      "Phân loại kết quả backtesting VaR trên 250 ngày thành vùng xanh, vàng, đỏ theo số lần vượt ngưỡng.",
    frmTip:
      "Vào vùng vàng hay đỏ thì hệ số nhân vốn tăng lên. Đây là cơ chế buộc ngân hàng tự giữ mô hình cho chuẩn: khai VaR thấp sẽ bị lấy lại nhiều hơn phần vừa tiết kiệm.",
  },
  {
    id: "frm-cre-006",
    termEn: "Close-Out Netting",
    termVi: "Bù trừ khi chấm dứt",
    subjectId: "credit-risk",
    definitionVi:
      "Điều khoản gộp mọi hợp đồng với một đối tác thành một nghĩa vụ ròng duy nhất khi họ vỡ nợ.",
    frmTip:
      "Không có nó, bên phá sản sẽ cherry-picking: đòi đủ ở hợp đồng bạn đang nợ và để khoản họ nợ bạn xếp hàng chung. Tính hiệu lực pháp lý ở từng quốc gia là câu hỏi đầu tiên.",
  },
  {
    id: "frm-cre-007",
    termEn: "Haircut",
    termVi: "Tỷ lệ chiết khấu tài sản bảo đảm",
    subjectId: "credit-risk",
    definitionVi:
      "Phần giá trị tài sản bảo đảm không được tính vào khoản vay, làm đệm cho rủi ro giá giảm.",
    frmTip:
      "Haircut tăng cho tất cả cùng lúc khi thị trường căng, buộc mọi bên cùng bán một loại tài sản trong một ngày - và chính việc bán đó lại đẩy haircut lên nữa.",
  },
  {
    id: "frm-cre-008",
    termEn: "Unexpected Loss (UL)",
    termVi: "Tổn thất ngoài dự kiến",
    subjectId: "credit-risk",
    definitionVi:
      "Độ lệch của tổn thất tín dụng quanh mức kỳ vọng, phần mà vốn phải gánh.",
    frmTip:
      "EL vào dự phòng và vào giá khoản vay; chỉ UL mới cần vốn. Lẫn hai thứ này là lỗi khái niệm hay gặp nhất ở phần tín dụng.",
  },
  {
    id: "frm-cre-009",
    termEn: "Concentration Risk",
    termVi: "Rủi ro tập trung",
    subjectId: "credit-risk",
    definitionVi:
      "Rủi ro phát sinh khi nhiều khoản vay cùng chịu tác động của một nhân tố chung.",
    frmTip:
      "Tổn thất kỳ vọng cộng tuyến tính nên MÙ hoàn toàn với tập trung. Toàn bộ hiệu ứng nằm ở phần đuôi, tức ở vốn chứ không ở dự phòng.",
  },
  {
    id: "frm-ope-005",
    termEn: "Basel Event Types",
    termVi: "Bảy nhóm sự kiện Basel",
    subjectId: "operational-resilience",
    definitionVi:
      "Phân loại chuẩn cho sự kiện rủi ro hoạt động, từ gian lận nội bộ tới lỗi thực thi và quy trình.",
    frmTip:
      "Phân loại theo NGUYÊN NHÂN GỐC, không theo kênh mà khoản lỗ đi qua. Lỗ hiện ra qua giá thị trường vẫn là rủi ro hoạt động nếu gốc là kiểm soát nội bộ thất bại.",
  },
  {
    id: "frm-ope-006",
    termEn: "Standardised Measurement Approach (SMA)",
    termVi: "Phương pháp chuẩn hoá đo rủi ro hoạt động",
    subjectId: "operational-resilience",
    definitionVi:
      "Cách tính vốn rủi ro hoạt động của Basel dựa trên chỉ số kinh doanh và lịch sử tổn thất nội bộ.",
    frmTip:
      "SMA thay thế các phương pháp mô hình nội bộ cũ. Đánh đổi: bớt nhạy với hồ sơ rủi ro riêng của từng ngân hàng để đổi lấy khả năng so sánh giữa các ngân hàng.",
  },
  {
    id: "frm-ope-007",
    termEn: "Impact Tolerance",
    termVi: "Ngưỡng chịu đựng tác động",
    subjectId: "operational-resilience",
    definitionVi:
      "Thời gian gián đoạn tối đa của một dịch vụ trọng yếu trước khi gây hại không chấp nhận được.",
    frmTip:
      "Phải đặt từ mức hại cho khách hàng, không từ năng lực khôi phục hiện có. Đặt theo năng lực thì bài kiểm tra luôn tự qua và cả quy trình thành thủ tục.",
  },
  {
    id: "frm-ope-008",
    termEn: "Third-Party Risk",
    termVi: "Rủi ro bên thứ ba",
    subjectId: "operational-resilience",
    definitionVi:
      "Rủi ro từ việc phụ thuộc nhà cung cấp bên ngoài cho các hoạt động trọng yếu.",
    frmTip:
      "Thuê ngoài chuyển được công việc nhưng không chuyển được trách nhiệm. Rủi ro tập trung còn nặng hơn: nhiều tổ chức cùng dùng một nhà cung cấp đám mây.",
  },
  {
    id: "frm-ope-009",
    termEn: "Segregation of Duties",
    termVi: "Phân tách nhiệm vụ",
    subjectId: "operational-resilience",
    definitionVi:
      "Tách các bước tạo lập, phê duyệt và đối chiếu cho những người khác nhau.",
    frmTip:
      "Nó nâng rào cản gian lận từ một người quyết định lên thành phải có thông đồng. Kiểm soát nội bộ gần như chỉ tác động được vào cạnh CƠ HỘI của tam giác gian lận.",
  },
  {
    id: "frm-liq-004",
    termEn: "Funding vs Market Liquidity",
    termVi: "Thanh khoản tài trợ và thanh khoản thị trường",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Tài trợ là khả năng huy động tiền; thị trường là khả năng bán tài sản mà không ép giá.",
    frmTip:
      "Hai loại này nuôi nhau thành vòng xoáy: thiếu tiền buộc phải bán, bán đồng loạt làm giá giảm, giá giảm làm tài sản bảo đảm mất giá và càng khó huy động.",
  },
  {
    id: "frm-liq-005",
    termEn: "Funds Transfer Pricing (FTP)",
    termVi: "Giá vốn điều chuyển nội bộ",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Cơ chế tính giá vốn nội bộ giữa các đơn vị huy động và các đơn vị cho vay trong một ngân hàng.",
    frmTip:
      "FTP đặt sai làm chi phí thanh khoản trở nên vô hình với đơn vị kinh doanh - và khi đó họ sẽ cho vay dài bằng nguồn ngắn mà không thấy mình đang làm gì.",
  },
  {
    id: "frm-liq-006",
    termEn: "Cash Flow Ladder",
    termVi: "Thang dòng tiền",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Bảng xếp dòng tiền vào và ra theo từng dải kỳ hạn để lộ khe hở thanh khoản.",
    frmTip:
      "Khe hở ở một dải có thể được che bởi thặng dư ở dải khác nếu chỉ nhìn tổng. Thang tồn tại để không cho phép việc gộp đó xảy ra.",
  },
  {
    id: "frm-liq-007",
    termEn: "Intraday Liquidity Risk",
    termVi: "Rủi ro thanh khoản nội ngày",
    subjectId: "liquidity-treasury",
    definitionVi:
      "Rủi ro không thanh toán được đúng thời điểm trong ngày dù cuối ngày vẫn đủ thanh khoản.",
    frmTip:
      "LCR đo theo 30 ngày, NSFR theo một năm - cả hai mù với lệch pha trong vài giờ. Tiền một ngân hàng chưa trả chính là tiền ngân hàng khác đang chờ để trả tiếp.",
  },
  {
    id: "frm-inv-004",
    termEn: "Alpha",
    termVi: "Alpha",
    subjectId: "investment-management",
    definitionVi:
      "Phần lợi suất vượt trên mức mà rủi ro hệ thống của danh mục lẽ ra phải mang lại.",
    formula: { equation: "α = Rp − [Rf + β(Rm − Rf)]" },
    frmTip:
      "Beta cao tự nó tạo ra phần vượt trong thị trường tăng mà không cần kỹ năng nào. Phải trừ phần thưởng cho rủi ro trước mới nói tới kỹ năng được.",
  },
  {
    id: "frm-inv-005",
    termEn: "Performance Attribution",
    termVi: "Phân tích quy kết hiệu quả",
    subjectId: "investment-management",
    definitionVi:
      "Tách phần chênh lệch so với chỉ số thành hiệu ứng phân bổ, hiệu ứng chọn mã và phần tương tác.",
    frmTip:
      "Con số tổng có thể che hai câu chuyện ngược nhau. Quỹ tự nhận giỏi chọn cổ phiếu mà toàn bộ phần vượt đến từ phân bổ ngành thì thứ họ bán không phải thứ tạo ra lợi nhuận.",
  },
  {
    id: "frm-inv-006",
    termEn: "Survivorship Bias",
    termVi: "Thiên lệch sống sót",
    subjectId: "investment-management",
    definitionVi:
      "Lệch phát sinh khi dữ liệu chỉ còn lại những quỹ vẫn đang hoạt động và vẫn báo cáo.",
    frmTip:
      "Đi kèm hai thiên lệch khác trong dữ liệu quỹ phòng hộ: điền ngược lịch sử đẹp khi gia nhập, và tự chọn thời điểm bắt đầu báo cáo. Cả ba cùng đẩy lợi suất trung bình lên.",
  },
  {
    id: "frm-inv-007",
    termEn: "Return Smoothing",
    termVi: "Làm mượt lợi suất",
    subjectId: "investment-management",
    definitionVi:
      "Hiện tượng lợi suất báo cáo ít biến động hơn thực tế do tài sản được định giá theo mô hình.",
    frmTip:
      "Dấu hiệu rẻ nhất để phát hiện là tự tương quan dương bất thường trong chuỗi lợi suất. Giá thị trường thật gần như không có tự tương quan đáng kể.",
  },
  {
    id: "frm-cur-003",
    termEn: "Artificial Intelligence Risk",
    termVi: "Rủi ro từ trí tuệ nhân tạo",
    subjectId: "current-issues",
    definitionVi:
      "Rủi ro phát sinh khi mô hình học máy được dùng cho quyết định tài chính.",
    frmTip:
      "Ba chế độ hỏng khác mô hình truyền thống: khớp quá mức, rò rỉ dữ liệu về thời gian, và một mô hình chính xác mà không giải thích được - thứ không dùng được cho quyết định tín dụng.",
  },
  {
    id: "frm-cur-004",
    termEn: "Digital Assets and Stablecoins",
    termVi: "Tài sản số và stablecoin",
    subjectId: "current-issues",
    definitionVi:
      "Nhóm tài sản dựa trên sổ cái phân tán, trong đó stablecoin neo giá vào một tài sản tham chiếu.",
    frmTip:
      "Rủi ro chính của stablecoin không phải công nghệ mà là chất lượng dự trữ và khả năng quy đổi - tức đúng bài toán rút tiền hàng loạt cổ điển trong một lớp vỏ mới.",
  },
  {
    id: "frm-cur-005",
    termEn: "Central Bank Digital Currency (CBDC)",
    termVi: "Tiền số ngân hàng trung ương",
    subjectId: "current-issues",
    definitionVi:
      "Tiền pháp định dạng số do ngân hàng trung ương phát hành trực tiếp.",
    frmTip:
      "Rủi ro hệ thống lớn nhất là phi trung gian hoá: trong khủng hoảng, người gửi có thể chuyển thẳng sang CBDC, làm rút tiền khỏi ngân hàng thương mại nhanh hơn bao giờ hết.",
  },
];
