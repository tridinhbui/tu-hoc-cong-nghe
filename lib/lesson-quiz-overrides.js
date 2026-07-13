const d = (...labels) => labels.map((label, index) => ({ label, arrow: index < labels.length - 1 }));

const q = (question, options, correct, explanation) => ({
  question,
  options,
  correct,
  explanation,
});

const patch = (lesson) => lesson;

export const lessonOverrides = {
  "discontinued-operations": patch({
    openingQuestion: "Net Income = 50 tỷ, trong đó Discontinued Ops gain = 80 tỷ. Continuing Operations thực chất là bao nhiêu?",
    openingOptions: ["-30 tỷ", "0 tỷ", "50 tỷ", "130 tỷ"],
    correctOption: 0,
    explanation: "50 = Continuing + 80, nên Continuing Operations = -30 tỷ. Core business đang lỗ dù Net Income nhìn có vẻ dương.",
    diagram: d("Net Income tổng", "Tách discontinued ops", "Ra continuing operations", "Chỉ nhìn phần continuing để đánh giá core business"),
    realWorldExample: {
      company: "Vingroup",
      description: "Khi một doanh nghiệp thoái vốn lớn hoặc bán mảng kinh doanh, khoản lãi/lỗ một lần có thể đẩy Net Income lên rất đẹp nhưng không nói gì nhiều về sức khỏe của hoạt động lõi.",
    },
    quiz: [
      q(
        "Điều nào nên làm đầu tiên khi thấy một khoản lợi nhuận đột biến trong báo cáo?",
        ["Cộng luôn vào giá trị doanh nghiệp", "Tách xem là continuing hay discontinued", "Bỏ qua vì chỉ là kế toán", "Dùng ngay để dự báo năm sau"],
        1,
        "Bài học quan trọng nhất là tách lợi nhuận lõi khỏi khoản một lần để tránh bị Net Income đánh lừa."
      ),
      q(
        "Nếu một công ty liên tục có discontinued gains mỗi năm, tín hiệu đó thường nói gì?",
        ["Doanh nghiệp rất khỏe", "Chỉ là may mắn ngẫu nhiên", "Cần soi lại chất lượng capital allocation và tính bền vững của lợi nhuận", "Không có ý nghĩa gì"],
        2,
        "Khoản một lần lặp lại nhiều kỳ thường không còn là 'one-off' nữa, mà là dấu hiệu cần đọc kỹ mô hình kinh doanh."
      ),
    ],
    keyTakeaways: [
      "Luôn tách Continuing Operations khi phân tích",
      "Discontinued ops là khoản một lần, không dùng để value core business",
      "Lợi nhuận đột biến lặp lại nhiều kỳ là red flag",
    ],
    summary: {
      keyIdea: "Đọc lợi nhuận lõi trước khi tin vào Net Income.",
      commonMistake: "Nhìn số lãi cuối cùng mà quên hỏi lãi đó đến từ đâu.",
      action: "Mở báo cáo tài chính và so sánh Net Income với Continuing Operations trong 2-3 kỳ gần nhất.",
    },
    application: {
      title: "Đọc báo cáo thật",
      message: "Lấy một báo cáo tài chính gần nhất, tìm dòng continuing vs discontinued operations rồi đánh dấu khoản nào là lõi, khoản nào là một lần.",
      secondary: "Nếu khoản một lần quá lớn so với core business, đừng dự báo tương lai dựa trên Net Income tổng.",
    },
  }),

  "on-tap-wacc": patch({
    openingQuestion: "WACC = Ke × We + Kd × (1−t) × Wd. Vì sao chi phí nợ phải nhân (1−t)?",
    openingOptions: ["Vì nợ không có rủi ro", "Vì lãi vay được trừ thuế", "Vì nợ luôn rẻ hơn vốn chủ", "Vì kế toán yêu cầu"],
    correctOption: 1,
    explanation: "Lãi vay tạo ra tax shield, làm chi phí nợ thực tế thấp hơn lãi suất danh nghĩa.",
    diagram: d("Chi phí vốn cổ phần", "Chi phí nợ sau thuế", "Trọng số vốn", "Ra WACC"),
    realWorldExample: {
      company: "Doanh nghiệp có đòn bẩy",
      description: "Một công ty có thể vay rẻ hơn phát hành thêm cổ phiếu, nhưng nếu nợ quá cao thì chi phí vốn lại tăng vì rủi ro phá sản và áp lực dòng tiền.",
    },
    quiz: [
      q(
        "WACC thường được dùng như gì trong định giá?",
        ["Lợi nhuận tối đa cần đạt", "Hurdle rate tối thiểu", "Lãi suất ngân hàng", "Biên lợi nhuận gộp"],
        1,
        "WACC là mức lợi nhuận tối thiểu dự án phải vượt qua để tạo giá trị."
      ),
      q(
        "Điều nào có thể làm WACC tăng?",
        ["Fed tăng lãi suất", "Công ty giữ nhiều tiền mặt hơn", "ROIC cao hơn WACC", "Tăng tax shield vô hạn"],
        0,
        "Khi risk-free rate tăng, cost of equity và chi phí vốn thường tăng theo."
      ),
    ],
    keyTakeaways: [
      "WACC là hurdle rate tối thiểu",
      "Debt rẻ hơn equity vì tax shield, nhưng nợ quá cao làm rủi ro tăng",
      "WACC không cố định, nó thay đổi theo lãi suất và cấu trúc vốn",
    ],
    summary: {
      keyIdea: "WACC là giá vốn bình quân của toàn bộ nguồn vốn.",
      commonMistake: "Nhầm chi phí nợ danh nghĩa với chi phí nợ sau thuế.",
      action: "Thử tính WACC sơ bộ cho một công ty bạn đang theo dõi.",
    },
    application: {
      title: "Thử tính ngay",
      message: "Chọn một công ty bạn biết, ước lượng tỷ trọng nợ/vốn chủ, rồi tính sơ bộ WACC bằng lãi suất nợ sau thuế và cost of equity.",
      secondary: "Dù chỉ là ước lượng, bạn sẽ thấy vì sao nợ rẻ hơn equity nhưng không phải lúc nào cũng tốt hơn.",
    },
  }),

  "roic": patch({
    openingQuestion: "ROIC = NOPAT / Invested Capital. Vì sao ROIC tốt hơn ROE để đánh giá hiệu quả?",
    openingOptions: ["ROIC luôn cao hơn ROE", "ROIC không bị bóp méo bởi leverage", "ROIC dễ tính hơn", "ROIC chỉ dùng cho ngân hàng"],
    correctOption: 1,
    explanation: "ROE có thể tăng chỉ nhờ vay nợ nhiều hơn. ROIC đo hiệu quả trên toàn bộ vốn đầu tư nên nhìn được chất lượng tạo giá trị thật.",
    diagram: d("NOPAT", "Chia cho invested capital", "So với WACC", "Ra giá trị tạo thêm"),
    realWorldExample: {
      company: "Vinamilk",
      description: "Những doanh nghiệp có ROIC cao và ổn định thường được thị trường định giá premium vì mỗi đồng vốn bỏ vào tạo ra dòng lợi nhuận chất lượng hơn.",
    },
    quiz: [
      q(
        "ROIC > WACC thường hàm ý gì?",
        ["Doanh nghiệp đang phá hủy giá trị", "Doanh nghiệp tạo giá trị", "Doanh nghiệp chắc chắn sẽ tăng giá cổ phiếu", "Doanh nghiệp không cần tăng trưởng"],
        1,
        "Khi lợi nhuận trên vốn đầu tư lớn hơn chi phí vốn, công ty đang tạo thêm giá trị."
      ),
      q(
        "ROIC tăng nhưng tăng trưởng không đổi thường kéo theo gì?",
        ["FCF thấp hơn", "FCF cao hơn", "Nợ tăng tự động", "Biên lợi nhuận gộp giảm"],
        1,
        "ROIC cao hơn đồng nghĩa cần tái đầu tư ít hơn để đạt cùng tăng trưởng, nên free cash flow tăng."
      ),
    ],
    keyTakeaways: [
      "ROIC đo hiệu quả trên toàn bộ capital, không chỉ equity",
      "ROIC > WACC = tạo value",
      "ROIC cao thường đi cùng valuation premium",
    ],
    summary: {
      keyIdea: "ROIC là thước đo tốt hơn ROE để nhìn chất lượng tạo giá trị.",
      commonMistake: "Bị ROE cao đánh lừa mà quên đòn bẩy nợ.",
      action: "So sánh ROIC và WACC của một công ty trước khi kết luận nó đáng mua.",
    },
    application: {
      title: "Đọc báo cáo thật",
      message: "Lấy một công ty bạn quen, ước lượng NOPAT và invested capital rồi so với WACC để xem doanh nghiệp đó đang tạo hay phá hủy giá trị.",
      secondary: "Nếu ROIC thấp hơn WACC, tăng trưởng chưa chắc là tốt.",
    },
  }),

  "roic-phan-2": patch({
    openingQuestion: "Nếu ROIC tăng còn growth giữ nguyên, điều gì xảy ra với FCF?",
    openingOptions: ["FCF giảm", "FCF tăng", "FCF không đổi", "FCF âm ngay"],
    correctOption: 1,
    explanation: "FCF = NOPAT − Reinvestment, mà Reinvestment ≈ Growth / ROIC. ROIC tăng thì cần tái đầu tư ít hơn, nên FCF tăng.",
    diagram: d("ROIC", "Cần ít tái đầu tư hơn", "FCF tăng", "Valuation premium"),
    realWorldExample: {
      company: "Google vs airlines",
      description: "Doanh nghiệp có ROIC cao thường tạo cash tốt hơn cùng mức tăng trưởng, nên được thị trường trả bội số cao hơn các mô hình phải bơm vốn liên tục.",
    },
    quiz: [
      q(
        "Mối liên hệ gần nhất giữa ROIC và valuation là gì?",
        ["ROIC cao thường hỗ trợ FCF cao hơn", "ROIC cao làm doanh nghiệp kém hấp dẫn hơn", "ROIC không liên quan đến định giá", "ROIC chỉ quan trọng ở bank"],
        0,
        "ROIC cao giúp công ty tạo cash tốt hơn trên cùng mức tăng trưởng."
      ),
      q(
        "Khi ROIC < WACC mà công ty vẫn cố tăng trưởng nhanh, rủi ro là gì?",
        ["Value creation", "Giá trị tăng tự động", "Phá hủy giá trị", "Không có rủi ro gì"],
        2,
        "Tăng trưởng dưới mức chi phí vốn thường làm giá trị doanh nghiệp đi xuống."
      ),
    ],
    keyTakeaways: [
      "ROIC cao giúp tăng FCF",
      "ROIC < WACC là tăng trưởng phá hủy value",
      "Đọc ROIC phải đi cùng growth và reinvestment",
    ],
    summary: {
      keyIdea: "ROIC cao làm mỗi đồng tăng trưởng ít tốn vốn hơn.",
      commonMistake: "Chỉ nhìn tốc độ tăng doanh thu mà quên chất lượng của tăng trưởng.",
      action: "Thử ước tính tỷ lệ tái đầu tư của một công ty bạn đang theo dõi.",
    },
    application: {
      title: "Thử tính ngay",
      message: "Lấy một công ty đang tăng trưởng mạnh, ước tính growth và ROIC để xem công ty đó cần tái đầu tư bao nhiêu cho mỗi đồng tăng trưởng.",
      secondary: "Càng ít phải bơm vốn để tăng trưởng, FCF càng khỏe.",
    },
  }),

  "commodity-phan-2": patch({
    openingQuestion: "Khi inventory tăng liên tục còn demand yếu, giá commodity thường đi hướng nào?",
    openingOptions: ["Tăng", "Giảm", "Không đổi", "Tăng rồi giảm"],
    correctOption: 1,
    explanation: "Tồn kho dư là tín hiệu supply vượt demand, tạo áp lực giảm giá lên hàng hóa.",
    diagram: d("Supply", "Demand", "Inventory", "Giá commodity"),
    realWorldExample: {
      company: "Dầu, thép, nông sản",
      description: "Ở các thị trường hàng hóa, chỉ cần inventory thay đổi nhẹ cũng đủ làm giá phản ứng mạnh vì hàng hóa là thị trường chu kỳ và rất nhạy với cung cầu ngắn hạn.",
    },
    quiz: [
      q(
        "Chỉ báo ngắn hạn quan trọng nhất với commodity thường là gì?",
        ["Earnings per share", "Inventory", "Dividend yield", "Book value"],
        1,
        "Hàng tồn kho cho thấy cán cân cung cầu đang thừa hay thiếu."
      ),
      q(
        "Vì sao commodity thường biến động mạnh hơn sản phẩm dịch vụ?",
        ["Vì khó đo supply-demand hơn", "Vì giá hoàn toàn cố định", "Vì không có chu kỳ", "Vì không cần inventory"],
        0,
        "Chu kỳ cung chậm, kho dự trữ và đầu cơ khiến giá commodity dễ dao động mạnh."
      ),
    ],
    keyTakeaways: [
      "Commodity phản ứng mạnh với supply/demand và inventory",
      "Hàng hóa có tính chu kỳ cao do độ trễ cung ứng",
      "Hedging là quản trị rủi ro, không phải đầu cơ",
    ],
    summary: {
      keyIdea: "Inventory là tín hiệu nhanh nhất của commodity.",
      commonMistake: "Chỉ nhìn giá hiện tại mà bỏ qua tín hiệu tồn kho.",
      action: "Tra dữ liệu inventory của một commodity bạn quan tâm và so với vài kỳ trước.",
    },
    application: {
      title: "Tra cứu ngay",
      message: "Chọn một commodity như dầu, thép hoặc nông sản, kiểm tra inventory gần nhất rồi ghi lại xu hướng tăng hay giảm.",
      secondary: "Tồn kho đổi chiều thường báo trước biến động giá.",
    },
  }),

  "market-fair-value": patch({
    openingQuestion: "Cổ phiếu tăng mạnh nhưng P/E cũng tăng nhanh, làm sao biết còn đang ở fair value hay đã quá đắt?",
    openingOptions: ["Nhìn giá cao là biết đắt", "Chỉ cần P/E thấp là mua", "Phải so growth, biên lợi nhuận và discount rate", "Không thể biết"],
    correctOption: 2,
    explanation: "Fair value là một vùng giá hợp lý dựa trên tăng trưởng kỳ vọng, chất lượng lợi nhuận và chi phí vốn - không phải một con số cố định.",
    diagram: d("Growth", "Profit quality", "Discount rate", "Fair value range"),
    realWorldExample: {
      company: "Công ty tăng trưởng",
      description: "Những doanh nghiệp tăng doanh thu nhanh nhưng margin và cash flow chưa theo kịp thường cần được định giá như một dải giá trị, không phải một điểm số cứng.",
    },
    quiz: [
      q(
        "Khi nào multiple cao vẫn có thể hợp lý?",
        ["Khi growth và ROIC đủ mạnh để tạo cash tương lai", "Khi giá cổ phiếu đã tăng mạnh", "Khi báo chí khen nhiều", "Khi công ty không có nợ"],
        0,
        "Multiple cao có thể hợp lý nếu doanh nghiệp có khả năng tăng trưởng bền vững và tạo cash mạnh."
      ),
    ],
    keyTakeaways: [
      "Fair value là một vùng, không phải một điểm",
      "P/E phải đọc cùng growth và chất lượng lợi nhuận",
      "Margin of safety vẫn quan trọng ngay cả với công ty tốt",
    ],
    summary: {
      keyIdea: "Giá hợp lý phụ thuộc vào tăng trưởng và chất lượng cash flow.",
      commonMistake: "Chỉ nhìn một multiple rồi kết luận rẻ/đắt.",
      action: "So sánh một công ty tăng trưởng với 2-3 công ty cùng ngành bằng cùng một bội số.",
    },
  }),

  "vingroup-cash-flow": patch({
    openingQuestion: "Doanh thu tăng nhưng operating cash flow lại âm, điều đó nói gì về chất lượng kinh doanh?",
    openingOptions: ["Doanh nghiệp chắc chắn yếu", "Có thể đang kẹt vốn lưu động hoặc CapEx lớn", "Luôn là tín hiệu tốt", "Không liên quan"],
    correctOption: 1,
    explanation: "Lợi nhuận và cash flow khác nhau vì doanh thu có thể ghi nhận trước tiền, hoặc tiền bị khóa vào tồn kho, phải thu, capex.",
    diagram: d("Lợi nhuận kế toán", "Working capital", "CapEx", "Operating cash flow"),
    realWorldExample: {
      company: "Vingroup",
      description: "Ở các doanh nghiệp lớn, đặc biệt bất động sản - bán lẻ, dòng tiền có thể biến động mạnh vì tiền được gom vào tồn kho, dự án dở dang và khoản phải thu.",
    },
    quiz: [
      q(
        "Điều gì thường làm OCF yếu hơn Net Income?",
        ["Working capital tăng mạnh", "Doanh thu tăng", "Lãi suất giảm", "Biên gộp cao"],
        0,
        "Khi phải bỏ tiền vào tồn kho và khoản phải thu, OCF có thể yếu dù lợi nhuận kế toán vẫn đẹp."
      ),
    ],
    keyTakeaways: [
      "OCF mới cho thấy tiền mặt thật sinh ra từ hoạt động",
      "Working capital và CapEx là hai nguồn lệch lớn nhất",
      "Không nên định giá chỉ bằng Net Income",
    ],
    summary: {
      keyIdea: "Cash flow trả lời câu hỏi công ty thật sự tạo ra bao nhiêu tiền.",
      commonMistake: "Nhầm lợi nhuận kế toán với tiền mặt.",
      action: "So sánh OCF với Net Income của công ty bạn đang theo dõi trong 3 năm gần nhất.",
    },
  }),

  "enterprise-value": patch({
    openingQuestion: "Vì sao khi mua đứt một công ty, người mua không chỉ trả Market Cap?",
    openingOptions: ["Vì phải gánh cả nợ và nhận lại tiền mặt", "Vì luật luôn cộng thêm phí", "Vì Market Cap là giá tài sản cố định", "Vì vậy EV luôn nhỏ hơn market cap"],
    correctOption: 0,
    explanation: "Enterprise Value = Market Cap + Debt − Cash, phản ánh chi phí thực để mua toàn bộ hoạt động kinh doanh.",
    diagram: d("Market cap", "+ Debt", "− Cash", "Enterprise value"),
    realWorldExample: {
      company: "M&A thực tế",
      description: "Trong thương vụ mua lại, bên mua quan tâm đến toàn bộ cấu trúc vốn của doanh nghiệp mục tiêu chứ không chỉ giá trị vốn hóa cổ phiếu.",
    },
    quiz: [
      q(
        "Công ty A có market cap 100, debt 30, cash 10. EV là bao nhiêu?",
        ["90", "100", "120", "130"],
        2,
        "EV = 100 + 30 − 10 = 120."
      ),
    ],
    keyTakeaways: [
      "EV là giá mua đứt toàn bộ business",
      "Nợ làm EV tăng, cash làm EV giảm",
      "EV thường là nền tảng cho nhiều bội số định giá",
    ],
  }),

  "cap-rate": patch({
    openingQuestion: "Cap rate trong BĐS cho biết điều gì quan trọng nhất?",
    openingOptions: ["Giá thuê cao hay thấp", "Tỷ lệ NOI trên giá trị tài sản", "Tỷ lệ đòn bẩy", "Tỷ lệ trống mặt bằng"],
    correctOption: 1,
    explanation: "Cap rate = NOI / Property Value, là thước đo lợi suất thô của một tài sản bất động sản.",
    diagram: d("Net operating income", "Chia cho property value", "Ra cap rate", "So sánh các tài sản BĐS"),
    realWorldExample: {
      company: "REIT / tòa nhà cho thuê",
      description: "Hai tòa nhà có NOI giống nhau nhưng cap rate khác sẽ dẫn đến giá trị định giá khác nhau rất lớn.",
    },
    quiz: [
      q(
        "Nếu cap rate giảm mà NOI không đổi, giá trị tài sản sẽ thế nào?",
        ["Tăng", "Giảm", "Không đổi", "Âm"],
        0,
        "Giá trị = NOI / cap rate, nên cap rate giảm sẽ đẩy giá trị tài sản lên."
      ),
    ],
    keyTakeaways: [
      "Cap rate là NOI chia cho giá trị tài sản",
      "Cap rate thấp hơn thường đồng nghĩa định giá cao hơn",
      "Cần so cap rate trong cùng phân khúc tài sản",
    ],
  }),

  "operating-leverage": patch({
    openingQuestion: "Vì sao SaaS có thể tăng lợi nhuận nhanh hơn hãng hàng không khi doanh thu tăng?",
    openingOptions: ["Vì SaaS không có chi phí", "Vì fixed cost cao tạo operating leverage", "Vì vé máy bay rẻ hơn phần mềm", "Vì SaaS không cần khách hàng"],
    correctOption: 1,
    explanation: "Khi chi phí cố định lớn, mỗi đồng doanh thu tăng thêm sẽ rơi xuống lợi nhuận nhanh hơn, đó là operating leverage.",
    diagram: d("Fixed costs", "Doanh thu tăng", "Biên lợi nhuận mở rộng", "Operating leverage"),
    realWorldExample: {
      company: "SaaS vs Airlines",
      description: "Phần mềm thường có chi phí biên thấp, trong khi hàng không phải gánh chi phí cố định lớn cho đội bay, nhân sự và hạ tầng.",
    },
    quiz: [
      q(
        "Operating leverage cao thường làm điều gì?",
        ["Lợi nhuận nhạy hơn với doanh thu", "Doanh thu giảm ngay", "Nợ giảm", "Biên gộp luôn âm"],
        0,
        "Doanh thu tăng một chút có thể kéo lợi nhuận tăng rất mạnh nếu fixed costs đã được hấp thụ."
      ),
    ],
    keyTakeaways: [
      "Fixed costs lớn làm lãi/lỗ nhạy hơn với doanh thu",
      "Operating leverage cao vừa là cơ hội vừa là rủi ro",
      "Cần đọc cùng chu kỳ doanh thu",
    ],
  }),

  "income-affiliates-jv": patch({
    openingQuestion: "Khi nào một khoản đầu tư được ghi nhận bằng equity method thay vì hợp nhất?",
    openingOptions: ["Khi sở hữu 0-5%", "Khi sở hữu 20-50% hoặc có ảnh hưởng đáng kể", "Chỉ khi sở hữu 100%", "Không bao giờ"],
    correctOption: 1,
    explanation: "Công ty có ảnh hưởng đáng kể thường ghi nhận theo equity method; còn kiểm soát đa số mới hợp nhất vào BCTC.",
    diagram: d("Sở hữu đáng kể", "Equity method", "Kiểm soát", "Consolidation"),
    realWorldExample: {
      company: "Liên doanh / công ty liên kết",
      description: "Nhiều tập đoàn có phần lợi nhuận từ công ty liên kết, nhưng dòng tiền và rủi ro không giống như sở hữu toàn bộ.",
    },
    quiz: [
      q(
        "Tại sao equity income không giống hoàn toàn doanh thu hoạt động lõi?",
        ["Vì đó là lợi nhuận từ phần sở hữu, không phải sales của core business", "Vì equity income luôn âm", "Vì không có dòng tiền", "Vì là cash accounting"],
        0,
        "Lợi nhuận từ affiliates/JV là phần chia lợi nhuận chứ không phải doanh thu bán hàng của business lõi."
      ),
    ],
    keyTakeaways: [
      "20-50% thường liên quan ảnh hưởng đáng kể",
      "Trên 50% thường chuyển sang consolidation",
      "Equity income cần đọc riêng khỏi core operating profit",
    ],
  }),

  "interim-comprehensive-income": patch({
    openingQuestion: "Comprehensive income khác net income ở điểm nào?",
    openingOptions: ["Chỉ là tên gọi khác", "Bao gồm OCI ngoài net income", "Chỉ dùng cho ngân hàng", "Luôn nhỏ hơn"],
    correctOption: 1,
    explanation: "Comprehensive income = Net income + OCI, tức là cộng thêm các khoản lãi/lỗ chưa hiện thực hoặc chuyển đổi ngoại tệ.",
    diagram: d("Net income", "+ OCI", "Comprehensive income", "Bức tranh đầy đủ hơn"),
    realWorldExample: {
      company: "Doanh nghiệp có tài sản ngoại tệ",
      description: "Khi tỷ giá hoặc giá trị tài sản tài chính biến động, OCI có thể thay đổi mạnh dù net income chưa phản ánh hết.",
    },
    quiz: [
      q(
        "OCI thường chứa gì?",
        ["Thu nhập từ bán hàng", "Chênh lệch tỷ giá và unrealized gains/losses", "Chỉ lãi vay", "Lương nhân viên"],
        1,
        "OCI ghi nhận các khoản ngoài net income nhưng vẫn ảnh hưởng đến vốn chủ."
      ),
    ],
    keyTakeaways: [
      "Comprehensive income rộng hơn net income",
      "OCI có thể làm vốn chủ thay đổi đáng kể",
      "Cần xem khi phân tích doanh nghiệp quốc tế hoặc tài sản tài chính lớn",
    ],
  }),

  "transfer-pricing": patch({
    openingQuestion: "Transfer pricing là gì trong một tập đoàn đa quốc gia?",
    openingOptions: ["Cách tính thuế VAT", "Giá nội bộ giữa các công ty liên quan", "Giá cổ phiếu nội bộ", "Một loại nợ ngắn hạn"],
    correctOption: 1,
    explanation: "Transfer pricing là giá mà các công ty liên kết dùng để bán hàng hóa, dịch vụ hoặc IP cho nhau.",
    diagram: d("Công ty A", "Bán nội bộ", "Công ty B", "Phân bổ lợi nhuận và thuế"),
    realWorldExample: {
      company: "Apple Ireland",
      description: "Nhiều tranh cãi thuế quốc tế xoay quanh việc lợi nhuận được ghi nhận ở đâu và mức giá nội bộ có theo nguyên tắc arm's length hay không.",
    },
    quiz: [
      q(
        "Nguyên tắc arm's length nhằm làm gì?",
        ["Định giá nội bộ như bên độc lập sẽ làm", "Đẩy lợi nhuận về nơi thuế thấp bằng mọi giá", "Tránh báo cáo tài chính", "Tăng chi phí cố định"],
        0,
        "Arm's length yêu cầu giao dịch nội bộ giống như giao dịch giữa hai bên độc lập."
      ),
    ],
    keyTakeaways: [
      "Transfer pricing ảnh hưởng tới lợi nhuận và thuế",
      "Arm's length principle là chuẩn quan trọng",
      "Cần đọc cùng cấu trúc tập đoàn",
    ],
  }),

  "maple-leaf-leverage": patch({
    openingQuestion: "Net Debt/EBITDA cho biết điều gì trước tiên?",
    openingOptions: ["Khả năng trả nợ bằng dòng tiền vận hành", "Biên gộp", "Tốc độ tăng trưởng doanh thu", "Số lượng cổ phiếu lưu hành"],
    correctOption: 0,
    explanation: "Tỷ lệ này cho biết nếu dùng EBITDA hiện tại để trả nợ, doanh nghiệp cần bao lâu để trả hết nợ ròng.",
    diagram: d("Net debt", "Chia EBITDA", "Ra leverage ratio", "So với ngưỡng an toàn"),
    realWorldExample: {
      company: "Doanh nghiệp đòn bẩy",
      description: "Các ngành chu kỳ thường được nhìn kỹ net debt/EBITDA vì dòng tiền dao động mạnh có thể làm tỷ lệ này xấu đi rất nhanh.",
    },
    quiz: [
      q(
        "Tỷ lệ net debt/EBITDA quá cao thường hàm ý gì?",
        ["Rủi ro thanh khoản cao hơn", "Cổ tức cao hơn", "Doanh thu chắc chắn tăng", "Giá trị sổ sách tăng"],
        0,
        "Đòn bẩy cao làm biên an toàn mỏng hơn nếu EBITDA giảm."
      ),
    ],
    keyTakeaways: [
      "Net debt/EBITDA là thước đo leverage phổ biến",
      "Cần so sánh theo ngành, không đọc độc lập",
      "Đòn bẩy cao đi kèm rủi ro tái cấp vốn",
    ],
  }),

  "tesla-cash-flow": patch({
    openingQuestion: "Tại sao một công ty có net income dương nhưng operating cash flow vẫn yếu?",
    openingOptions: ["Vì doanh thu chưa thu tiền", "Vì tiền mặt biến mất", "Vì chỉ số kế toán sai", "Vì không có thuế"],
    correctOption: 0,
    explanation: "Doanh thu và lợi nhuận có thể ghi nhận trước khi tiền thực sự về, đặc biệt khi khoản phải thu và vốn lưu động tăng.",
    diagram: d("Net income", "Working capital", "CapEx", "Operating cash flow"),
    realWorldExample: {
      company: "Tesla",
      description: "Những công ty tăng trưởng nhanh thường bị soi kỹ vì lợi nhuận và dòng tiền có thể đi lệch nhau khá mạnh trong từng quý.",
    },
    quiz: [
      q(
        "Khi nào OCF thường yếu hơn net income?",
        ["Khi khoản phải thu tăng", "Khi lãi suất giảm", "Khi biên gộp tăng", "Khi cổ tức tăng"],
        0,
        "Working capital phình ra làm tiền bị giữ lại trong business."
      ),
    ],
    keyTakeaways: [
      "Net income không thay thế được cash flow",
      "Working capital và CapEx là hai nguồn lệch lớn",
      "Đọc báo cáo phải xem cả lợi nhuận và tiền mặt",
    ],
  }),

  "dupont-analysis": patch({
    openingQuestion: "DuPont Analysis tách ROE thành những phần nào?",
    openingOptions: ["Margin, turnover, leverage", "Revenue, tax, cash", "Debt, dividend, growth", "Price, book, EPS"],
    correctOption: 0,
    explanation: "DuPont cho phép bóc ROE thành biên lợi nhuận, vòng quay tài sản và đòn bẩy tài chính.",
    diagram: d("Net margin", "Asset turnover", "Equity multiplier", "ROE"),
    realWorldExample: {
      company: "Bán lẻ vs sản xuất",
      description: "Hai công ty có ROE giống nhau nhưng một bên nhờ margin cao, bên kia nhờ turnover hoặc đòn bẩy cao hơn.",
    },
    quiz: [
      q(
        "Nếu ROE tăng chủ yếu do equity multiplier, điều gì cần cảnh giác?",
        ["Đòn bẩy đang cao hơn", "Margin tăng mạnh", "Doanh thu giảm", "Thuế giảm"],
        0,
        "ROE tăng nhờ nợ nhiều hơn không chắc là chất lượng tăng trưởng tốt."
      ),
    ],
    keyTakeaways: [
      "DuPont giúp biết ROE đến từ đâu",
      "Margin, turnover và leverage đều có vai trò",
      "ROE cao chưa chắc đã là ROE khỏe",
    ],
  }),

  "dividend": patch({
    openingQuestion: "Cổ tức bền vững phụ thuộc nhiều nhất vào yếu tố nào?",
    openingOptions: ["Doanh thu tăng", "Free cash flow và payout discipline", "P/B thấp", "Số lượng nhân viên"],
    correctOption: 1,
    explanation: "Cổ tức chỉ bền khi doanh nghiệp thật sự tạo ra tiền mặt đủ sau CapEx và nhu cầu tái đầu tư.",
    diagram: d("FCF", "Payout ratio", "Cổ tức", "Tính bền vững"),
    realWorldExample: {
      company: "Doanh nghiệp trưởng thành",
      description: "Các công ty mature thường chi trả cổ tức đều hơn vì nhu cầu tái đầu tư thấp hơn các doanh nghiệp tăng trưởng.",
    },
    quiz: [
      q(
        "Một doanh nghiệp có Net Income cao nhưng FCF âm thì trả cổ tức thế nào?",
        ["Rất bền vững", "Có thể phải vay hoặc dùng tiền mặt dự trữ", "Không liên quan", "Chỉ cần chia cổ phiếu"],
        1,
        "Nếu tiền mặt thật không đủ, cổ tức chỉ có thể đến từ nguồn khác chứ không phải từ hoạt động hiện tại."
      ),
    ],
    keyTakeaways: [
      "Cổ tức phải đọc cùng FCF",
      "Payout ratio cao chưa chắc bền",
      "Mature business thường phù hợp hơn growth business để chia cổ tức",
    ],
  }),

  "walmart-earnings": patch({
    openingQuestion: "Walmart thường tạo lợi nhuận bằng cách nào?",
    openingOptions: ["Biên gộp siêu cao", "Volume lớn, turnover nhanh, logistics mạnh", "Dùng nhiều nợ", "Chờ giá hàng tăng"],
    correctOption: 1,
    explanation: "Bán lẻ lớn thường thắng nhờ vòng quay hàng, quy mô mua hàng và chuỗi cung ứng, không chỉ nhờ margin cao.",
    diagram: d("Volume lớn", "Inventory turn", "Logistics", "Lợi nhuận ổn định"),
    realWorldExample: {
      company: "Walmart",
      description: "Bài học của Walmart là đọc earnings phải nhìn cả vận hành, tồn kho, biên gộp và hiệu quả chuỗi cung ứng.",
    },
    quiz: [
      q(
        "Khi inventory turn tăng, nó thường nói điều gì?",
        ["Hàng bán nhanh hơn", "Hàng đắt hơn", "Nợ tăng", "Cổ tức giảm"],
        0,
        "Vòng quay hàng tốt thường cho thấy demand và vận hành khỏe."
      ),
    ],
    keyTakeaways: [
      "Bán lẻ lớn thắng bằng volume và turnover",
      "Earnings story phải đọc cùng vận hành",
      "Tồn kho là biến cực quan trọng với retail",
    ],
  }),

  "inventory-turnover": patch({
    openingQuestion: "Inventory turnover giảm mạnh thường báo hiệu điều gì?",
    openingOptions: ["Hàng bán chậm hơn", "Lợi nhuận chắc chắn tăng", "Tiền mặt tăng ngay", "Không có ý nghĩa"],
    correctOption: 0,
    explanation: "Inventory turnover = COGS / Average Inventory. Giảm nhanh thường cho thấy hàng ứ đọng hoặc bán chậm.",
    diagram: d("COGS", "Average inventory", "Inventory turnover", "Days inventory outstanding"),
    realWorldExample: {
      company: "Zara",
      description: "Fast fashion thành công một phần vì vòng quay tồn kho nhanh, giảm rủi ro hàng lỗi mốt.",
    },
    quiz: [
      q(
        "DIO tăng mạnh thường hàm ý gì?",
        ["Trung bình mất nhiều ngày hơn để bán hết hàng", "Hàng được bán ngay", "Tồn kho không liên quan", "ROIC tăng tự động"],
        0,
        "DIO cao nghĩa là vốn bị kẹt trong kho lâu hơn."
      ),
    ],
    keyTakeaways: [
      "Inventory turnover = COGS / average inventory",
      "DIO = 365 / turnover",
      "Tồn kho là cảnh báo sớm của vấn đề bán hàng",
    ],
  }),

  "post-ipo-dividend": patch({
    openingQuestion: "Sau IPO, khi nào doanh nghiệp nên trả cổ tức?",
    openingOptions: ["Ngay lập tức nếu có tên tuổi", "Khi FCF ổn định và đầu tư tăng trưởng đã đủ", "Chỉ khi thị giá giảm", "Càng nhiều càng tốt"],
    correctOption: 1,
    explanation: "Doanh nghiệp tăng trưởng mạnh thường nên ưu tiên tái đầu tư trước; cổ tức chỉ hợp lý khi cash flow và cơ hội đầu tư đã chín.",
    diagram: d("FCF", "Opportunities", "Payout policy", "Cổ tức hay tái đầu tư"),
    realWorldExample: {
      company: "Công ty mới niêm yết",
      description: "Một doanh nghiệp sau IPO có thể còn cần giữ tiền mặt để mở rộng hơn là chia hết cho cổ đông.",
    },
    quiz: [
      q(
        "Tại sao nhiều công ty tăng trưởng không nên trả cổ tức cao ngay?",
        ["Vì cần giữ vốn cho cơ hội đầu tư tốt hơn", "Vì thị trường cấm", "Vì cổ đông không thích tiền", "Vì kế toán không cho phép"],
        0,
        "Vốn giữ lại có thể tạo giá trị lớn hơn nếu ROIC của dự án mới cao."
      ),
    ],
    keyTakeaways: [
      "Dividend policy phải gắn với growth stage",
      "FCF và cơ hội đầu tư quan trọng hơn cảm xúc chia tiền",
      "IPO không đồng nghĩa với việc phải trả cổ tức ngay",
    ],
  }),

  "disney-pixar-ma": patch({
    openingQuestion: "Horizontal M&A như Disney-Pixar thường nhắm tới điều gì?",
    openingOptions: ["Synergy doanh thu và quyền sở hữu IP", "Giảm thuế ngay lập tức", "Tăng nợ xấu", "Giảm tồn kho"],
    correctOption: 0,
    explanation: "Khi hai doanh nghiệp cùng một chuỗi giá trị kết hợp, synergy đến từ phân phối, IP và khả năng khai thác chéo khách hàng.",
    diagram: d("Doanh nghiệp A", "Kết hợp với B", "Synergy", "Giá trị hợp nhất"),
    realWorldExample: {
      company: "Disney-Pixar",
      description: "Thương vụ Disney-Pixar thường được nhắc như một ví dụ về M&A tạo thêm giá trị nhờ hệ sinh thái nội dung và phân phối.",
    },
    quiz: [
      q(
        "Nếu synergy chỉ tồn tại trên slide mà không ra cash, điều gì nên nghi ngờ?",
        ["Phân tích đã đủ", "Deal có thể bị overpay", "Synergy chắc chắn lớn", "Không cần DD"],
        1,
        "Synergy phải đi kèm dòng tiền thực, không chỉ là câu chuyện truyền thông."
      ),
    ],
    keyTakeaways: [
      "M&A tốt phải tạo synergy thực",
      "Revenue synergy và cost synergy cần đo bằng cash",
      "Đừng trả quá nhiều cho câu chuyện đẹp",
    ],
  }),

  "nvidia-cash-securities": patch({
    openingQuestion: "Treasury và FP&A nhìn cash & marketable securities để làm gì khác nhau?",
    openingOptions: ["Một bên để vay, một bên để chia cổ tức", "Một bên tối ưu thanh khoản, bên kia tối ưu chiến lược vốn", "Không khác nhau", "Chỉ để trang trí BCTC"],
    correctOption: 1,
    explanation: "Treasury nhìn thanh khoản và rủi ro ngắn hạn; FP&A nhìn cách dùng cash cho buyback, M&A, capex hay dự trữ.",
    diagram: d("Cash stack", "Marketable securities", "Liquidity", "Capital allocation"),
    realWorldExample: {
      company: "NVIDIA",
      description: "Doanh nghiệp tăng trưởng mạnh có thể giữ lượng cash lớn để cân bằng đầu tư, buyback và đệm rủi ro chu kỳ.",
    },
    quiz: [
      q(
        "Cash lớn trên bảng cân đối có luôn là tín hiệu xấu không?",
        ["Có", "Không, nếu đi kèm chiến lược vốn rõ ràng", "Chỉ xấu với công ty công nghệ", "Không bao giờ quan trọng"],
        1,
        "Cash có thể là đệm an toàn hoặc là vốn chưa được phân bổ hiệu quả - phải đọc cùng chiến lược capital allocation."
      ),
    ],
    keyTakeaways: [
      "Treasury và FP&A đọc cash với mục tiêu khác nhau",
      "Cash lớn chưa chắc xấu, nhưng phải có lý do sử dụng",
      "Đọc cùng buyback, capex và M&A",
    ],
  }),

  "fpt-cfo-cash": patch({
    openingQuestion: "Khi một doanh nghiệp có nhiều tiền mặt, câu hỏi quan trọng nhất là gì?",
    openingOptions: ["Làm sao giữ càng nhiều càng tốt", "Sẽ dùng cash cho đâu: đầu tư, mua lại hay cổ tức", "Có nên giấu cash không", "Cash nhiều thì không cần hoạch định"],
    correctOption: 1,
    explanation: "Cash chỉ hữu ích khi được phân bổ tốt: growth, buyback, M&A, giảm nợ hoặc dự trữ an toàn.",
    diagram: d("Cash", "Growth investment", "Buyback / dividend", "Capital allocation"),
    realWorldExample: {
      company: "FPT",
      description: "Doanh nghiệp có dòng tiền mạnh thường được xem xét ở góc độ capital allocation hơn là chỉ nhìn số dư tiền mặt.",
    },
    quiz: [
      q(
        "Cash dồi dào có thể làm gì cho cổ đông?",
        ["Tạo đệm an toàn và linh hoạt vốn", "Làm báo cáo xấu hơn", "Bắt buộc phải trả hết ngay", "Không có tác dụng"],
        0,
        "Tiền mặt tốt khi nó giúp doanh nghiệp linh hoạt trước cơ hội và cú sốc."
      ),
    ],
    keyTakeaways: [
      "Quan trọng không phải chỉ có cash, mà là dùng cash thế nào",
      "Capital allocation là kỹ năng sống còn của quản trị",
      "Đừng nhầm cash lớn với hiệu quả vốn cao",
    ],
  }),

  "oil-gas-business-model": patch({
    openingQuestion: "Bốn mô hình trong ngành dầu khí khác nhau chủ yếu ở đâu?",
    openingOptions: ["Vị trí địa lý", "Khâu chuỗi giá trị và mức độ nhạy giá hàng hóa", "Số lượng nhân viên", "Chỉ số P/B"],
    correctOption: 1,
    explanation: "Upstream, midstream, downstream và dịch vụ dầu khí chịu rủi ro và biên lợi nhuận khác nhau dọc chuỗi giá trị.",
    diagram: d("Upstream", "Midstream", "Downstream", "Dịch vụ / logistics"),
    realWorldExample: {
      company: "PV GAS / lọc hóa dầu",
      description: "Có doanh nghiệp hưởng lợi khi giá hàng hóa tăng, có doanh nghiệp lại phụ thuộc vào chu kỳ đầu tư và sản lượng.",
    },
    quiz: [
      q(
        "Khâu nào thường nhạy nhất với giá commodity?",
        ["Upstream", "Downstream", "HR", "Kế toán"],
        0,
        "Khai thác thường chịu trực tiếp nhất biến động giá hàng hóa."
      ),
    ],
    keyTakeaways: [
      "Ngành dầu khí là chuỗi giá trị nhiều lớp",
      "Rủi ro và biên lợi nhuận thay đổi theo từng khâu",
      "Phải đọc theo chu kỳ hàng hóa",
    ],
  }),

  "bitcoin-crypto": patch({
    openingQuestion: "Giá trị của Bitcoin thường được người ủng hộ giải thích bằng yếu tố nào?",
    openingOptions: ["Supply cố định và network effect", "Lợi nhuận kế toán", "Cổ tức", "P/B"],
    correctOption: 0,
    explanation: "Bitcoin không dựa vào cash flow truyền thống; nó thường được nhìn qua khan hiếm, network effect và niềm tin thị trường.",
    diagram: d("Fixed supply", "Network effect", "Demand", "Price"),
    realWorldExample: {
      company: "Crypto market",
      description: "Các tài sản số biến động mạnh vì định giá phụ thuộc nhiều vào kỳ vọng, thanh khoản và tâm lý thị trường.",
    },
    quiz: [
      q(
        "Điều nào khiến Bitcoin khác cổ phiếu truyền thống?",
        ["Không có cash flow nền tảng", "Không thể mua bán", "Không có người dùng", "Không biến động"],
        0,
        "Định giá crypto thường không đi theo khung doanh nghiệp tạo cash flow như cổ phiếu."
      ),
    ],
    keyTakeaways: [
      "Crypto thường được nhìn qua supply, network effect và tâm lý",
      "Định giá khác hoàn toàn cổ phiếu",
      "Biến động và thanh khoản là trọng tâm cần quản trị",
    ],
  }),

  "pvgas-bad-debt": patch({
    openingQuestion: "Nợ xấu và khoản phải thu lớn thường ảnh hưởng gì trước tiên?",
    openingOptions: ["Quality of earnings", "Tỷ lệ cổ tức", "Số lượng cổ phiếu", "Vốn hóa thị trường"],
    correctOption: 0,
    explanation: "Khoản phải thu lớn và tập trung khách hàng cao có thể làm doanh thu đẹp nhưng cash flow xấu và tăng rủi ro tín dụng.",
    diagram: d("Receivables", "Concentration risk", "Bad debt", "Cash conversion"),
    realWorldExample: {
      company: "PVGas",
      description: "Doanh nghiệp bán cho số ít khách hàng lớn cần đặc biệt soi khả năng thu tiền và rủi ro tập trung.",
    },
    quiz: [
      q(
        "Khoản phải thu tăng nhanh hơn doanh thu gợi ý điều gì?",
        ["Thu tiền chậm hơn", "Doanh nghiệp chắc chắn khỏe hơn", "Không liên quan", "Cổ tức cao hơn"],
        0,
        "Khi phải thu tăng mạnh, lợi nhuận kế toán có thể đẹp hơn dòng tiền thực tế."
      ),
    ],
    keyTakeaways: [
      "Receivables là điểm cần soi trong quality of earnings",
      "Concentration risk có thể làm bad debt tăng",
      "Doanh thu không đồng nghĩa với tiền đã về",
    ],
  }),

  "retail-store-analysis": patch({
    openingQuestion: "Khi phân tích doanh nghiệp bán lẻ, KPI nào nên nhìn đầu tiên?",
    openingOptions: ["Store productivity, same-store sales growth và payback period", "EPS và P/E thôi", "Số lượng nhân viên", "Tỷ giá USD"],
    correctOption: 0,
    explanation: "Retail sống bằng hiệu quả từng cửa hàng, doanh số trên cùng cửa hàng và tốc độ hoàn vốn mở mới.",
    diagram: d("Store productivity", "Same-store sales", "Payback period", "Mở rộng chuỗi"),
    realWorldExample: {
      company: "Chuỗi bán lẻ",
      description: "Một chuỗi có thể mở rất nhanh, nhưng nếu doanh thu trên mỗi cửa hàng và thời gian hoàn vốn không đẹp thì tăng trưởng đó chưa chắc tốt.",
    },
    quiz: [
      q(
        "Same-store sales growth cho biết gì?",
        ["Doanh số cửa hàng cũ tăng hay giảm", "Doanh số online", "Lợi nhuận ròng", "Số lượng nhân sự"],
        0,
        "SSS growth đo sức khỏe của cửa hàng hiện hữu, không bị làm méo bởi việc mở mới."
      ),
      q(
        "Payback period dài thường hàm ý gì?",
        ["Mở mới kém hấp dẫn hơn", "Cửa hàng in tiền nhanh", "Không quan trọng", "Rủi ro giảm"],
        0,
        "Nếu phải mất quá lâu mới hoàn vốn, tốc độ mở rộng có thể không tạo giá trị như kỳ vọng."
      ),
    ],
    keyTakeaways: [
      "Retail phải nhìn store-level economics",
      "SSS growth là chỉ báo sức khỏe cửa hàng hiện hữu",
      "Payback period quyết định mở mới có đáng không",
    ],
    sections: [
      { type: "lead", text: "Bài này không chỉ là đọc doanh thu chuỗi bán lẻ. Mục tiêu là biết một cửa hàng có thật sự đáng mở hay không." },
      { type: "heading", text: "Ba KPI cốt lõi" },
      { type: "list", items: ["Store productivity: doanh thu hoặc lợi nhuận trên mỗi cửa hàng", "Same-store sales growth: tăng trưởng của cửa hàng cũ", "Payback period: mất bao lâu để hoàn vốn mở mới"] },
      { type: "comparison", left: { label: "Mở rộng nhanh", text: "Nếu store productivity yếu, mở thêm cửa hàng chỉ làm doanh thu trông lớn hơn, không chắc làm giá trị lớn hơn." }, right: { label: "Mở rộng khỏe", text: "Khi cửa hàng mới hoàn vốn nhanh và doanh số cửa hàng cũ vẫn tăng, chuỗi có nền tảng tốt hơn để scale." } },
      { type: "closing", lines: ["Doanh thu chuỗi không kể hết câu chuyện.", "Cửa hàng nào tự sinh lời mới là chỗ nên mở rộng."] },
    ],
  }),

  "bds-business-model": patch({
    openingQuestion: "4 mô hình kinh doanh BĐS khác nhau chủ yếu ở đâu?",
    openingOptions: ["Chu kỳ vốn và nguồn doanh thu", "Số lượng dự án quảng cáo", "Tỷ giá", "Số phòng ban"],
    correctOption: 0,
    explanation: "Phát triển nhà ở, khu công nghiệp, cho thuê tài sản và môi giới có chu kỳ vốn, biên lợi nhuận và rủi ro dòng tiền rất khác nhau.",
    diagram: d("Phát triển nhà ở", "KCN", "Cho thuê tài sản", "Môi giới"),
    realWorldExample: {
      company: "BĐS Việt Nam",
      description: "Có doanh nghiệp kiếm tiền từ chuyển giao dự án, có doanh nghiệp sống nhờ dòng tiền thuê, có doanh nghiệp hưởng hoa hồng môi giới.",
    },
    quiz: [
      q(
        "Mô hình nào thường tạo dòng tiền đều hơn?",
        ["Cho thuê tài sản", "Phát triển đất dự án", "Môi giới zero", "Đầu cơ ngắn hạn"],
        0,
        "Mô hình cho thuê thường cho cash flow đều hơn vì tài sản tạo tiền theo thời gian."
      ),
    ],
    keyTakeaways: [
      "BĐS không phải một business model duy nhất",
      "Chu kỳ vốn và rủi ro dòng tiền khác nhau rất mạnh",
      "Phải đọc theo mô hình kiếm tiền cụ thể",
    ],
  }),

  "financial-risk": patch({
    openingQuestion: "Rủi ro tài chính thường được chia thành những nhóm nào?",
    openingOptions: ["Credit, liquidity, interest rate, market, concentration", "Chỉ market risk", "Chỉ currency risk", "Chỉ operational risk"],
    correctOption: 0,
    explanation: "Một danh mục hay doanh nghiệp có thể gặp nhiều lớp rủi ro khác nhau, không chỉ một loại biến động giá.",
    diagram: d("Credit risk", "Liquidity risk", "Interest rate risk", "Market / concentration risk"),
    realWorldExample: {
      company: "Danh mục đầu tư / doanh nghiệp",
      description: "Rủi ro tập trung hoặc đòn bẩy cao có thể khiến một cú sốc nhỏ biến thành vấn đề lớn về thanh khoản.",
    },
    quiz: [
      q(
        "Rủi ro nào xảy ra khi không bán được tài sản đủ nhanh để trả nghĩa vụ?",
        ["Liquidity risk", "Market risk", "Tax risk", "Growth risk"],
        0,
        "Thanh khoản thấp có thể làm doanh nghiệp hoặc nhà đầu tư rơi vào thế khó dù tài sản danh nghĩa vẫn còn."
      ),
    ],
    keyTakeaways: [
      "Rủi ro có nhiều lớp, không chỉ giá",
      "Liquidity và concentration thường bị xem nhẹ",
      "Đa dạng hóa chỉ loại bỏ một phần rủi ro",
    ],
  }),

  "hoc-tai-chinh-hanh-trinh": patch({
    openingQuestion: "Điều gì làm nhiều người nản nhất khi học tài chính?",
    openingOptions: ["Quá nhiều công thức và ít áp dụng", "Không có ví dụ thật", "Học quá nhanh", "Tất cả đúng"],
    correctOption: 3,
    explanation: "Tài chính dễ nản vì phải vừa hiểu công thức vừa gắn với bối cảnh kinh doanh thật và quyết định thật.",
    diagram: d("Học lý thuyết", "Gắn ví dụ thật", "Áp dụng", "Tiến bộ"),
    realWorldExample: {
      company: "Người học tài chính",
      description: "Người học bền thường là người biến kiến thức thành một checklist áp dụng lặp lại, thay vì cố học thuộc tất cả một lần.",
    },
    quiz: [
      q(
        "Cách học tài chính bền nhất thường là gì?",
        ["Học công thức rồi áp dụng ngay vào ví dụ thật", "Chỉ đọc định nghĩa", "Chỉ xem video ngắn", "Đợi nhớ hết mới làm"],
        0,
        "Tài chính hiểu sâu nhất khi đi cùng thực hành trên báo cáo, case thật và quyết định thật."
      ),
    ],
    keyTakeaways: [
      "Tài chính nản vì nhiều lớp kiến thức",
      "Ví dụ thật giúp kiến thức bám lâu hơn",
      "Học bền là học để áp dụng",
    ],
  }),

  "wealth-management": patch({
    openingQuestion: "Wealth management thực sự quản lý cái gì trước tiên?",
    openingOptions: ["Tài sản ròng và mục tiêu sống", "Chỉ là chọn cổ phiếu", "Chỉ là giữ tiền mặt", "Chỉ là mua bảo hiểm"],
    correctOption: 0,
    explanation: "Wealth management bắt đầu từ net worth, mục tiêu, dòng tiền và khẩu vị rủi ro - đầu tư chỉ là một phần của bức tranh.",
    diagram: d("Net worth", "Asset allocation", "Goal planning", "Tái cân bằng"),
    realWorldExample: {
      company: "Cá nhân / gia đình",
      description: "Một kế hoạch wealth management tốt không chỉ tối đa hóa lợi nhuận mà còn đảm bảo tiền cho mục tiêu học hành, nhà cửa, hưu trí và bảo vệ rủi ro.",
    },
    quiz: [
      q(
        "Tài sản nào thường nằm ở nhóm thanh khoản cao nhất?",
        ["Tiền mặt và tiền gửi", "Bất động sản", "Cổ phiếu tăng trưởng", "Đồ sưu tầm"],
        0,
        "Thanh khoản là yếu tố đầu tiên khi xây dựng bảng cân đối tài chính cá nhân."
      ),
      q(
        "Tái cân bằng danh mục có ý nghĩa gì?",
        ["Giữ đúng mức rủi ro đã chọn", "Chỉ để mua thấp bán cao ngẫu nhiên", "Làm danh mục xấu đi", "Không cần thiết nếu lãi"],
        0,
        "Nếu không tái cân bằng, danh mục dễ lệch khỏi khẩu vị rủi ro ban đầu."
      ),
    ],
    keyTakeaways: [
      "Wealth management nhìn net worth trước, rồi mới đến đầu tư",
      "Asset allocation quan trọng hơn chọn một mã thắng",
      "Tái cân bằng giúp giữ kỷ luật rủi ro",
    ],
    sections: [
      { type: "lead", text: "Wealth management không phải là 'có nhiều tiền thì mới cần'. Nó là cách bạn tổ chức tài sản, rủi ro và mục tiêu để tiền phục vụ đời sống." },
      { type: "heading", text: "Ba lớp cần quản" },
      { type: "conceptTable", title: "Khung quản lý tài sản", subtitle: "Đọc từ trái sang phải như một quy trình", concepts: [
        { vi: "Tài sản ròng", en: "Net worth", def: "Tổng tài sản trừ tổng nợ - điểm xuất phát của mọi kế hoạch." },
        { vi: "Phân bổ tài sản", en: "Asset allocation", def: "Chia tiền vào tiền mặt, trái phiếu, cổ phiếu, BĐS... theo mục tiêu." },
        { vi: "Tái cân bằng", en: "Rebalancing", def: "Giữ danh mục quay về tỷ trọng mục tiêu khi thị trường biến động." },
      ] },
      { type: "comparison", left: { label: "Sai lầm thường gặp", text: "Nhìn một kênh lợi nhuận cao rồi dồn tiền vào đó mà không xét mục tiêu, thanh khoản hay khung thời gian." }, right: { label: "Cách làm đúng", text: "Chia tài sản theo mục tiêu: tiền gần hạn, tiền bảo vệ, tiền tăng trưởng và tiền dài hạn." } },
      { type: "closing", lines: ["Quản lý tài sản tốt là để cuộc sống ít bất ngờ hơn.", "Không phải để chạy theo một con số lợi nhuận đẹp nhất."] },
    ],
    application: {
      title: "Vẽ net worth của bạn",
      message: "Liệt kê tài sản, nợ, tiền mặt, khoản đầu tư và mục tiêu sắp tới của bạn vào một bảng đơn giản để biết đâu là phần cần bảo vệ trước tiên.",
      secondary: "Thường thì thanh khoản và đệm an toàn quan trọng hơn lợi nhuận tối đa.",
    },
  }),

  "modern-portfolio-theory": patch({
    openingQuestion: "MPT muốn trả lời câu hỏi nào?",
    openingOptions: ["Một tài sản tốt là đủ", "Danh mục tối ưu cho mỗi mức rủi ro", "Chỉ nên mua tài sản an toàn tuyệt đối", "Tăng số lượng mã càng nhiều càng tốt"],
    correctOption: 1,
    explanation: "Modern Portfolio Theory cho rằng danh mục tối ưu phụ thuộc vào return kỳ vọng, volatility và correlation giữa các tài sản.",
    diagram: d("Expected return", "Volatility", "Correlation", "Efficient frontier"),
    realWorldExample: {
      company: "Danh mục đầu tư cá nhân",
      description: "Một người nắm 100% cổ phiếu công nghệ sẽ rủi ro khác hẳn người chia đều sang trái phiếu, tiền mặt và cổ phiếu phòng thủ.",
    },
    quiz: [
      q(
        "Lợi ích cốt lõi của đa dạng hóa theo MPT là gì?",
        ["Giảm rủi ro danh mục mà không nhất thiết hy sinh tương ứng lợi nhuận kỳ vọng", "Tăng rủi ro để kiếm thêm phí", "Xóa sạch mọi rủi ro", "Chỉ phù hợp với quỹ lớn"],
        0,
        "Kết hợp tài sản ít tương quan giúp giảm biến động tổng thể của danh mục."
      ),
      q(
        "Nếu hai tài sản có correlation thấp, điều gì xảy ra với danh mục?",
        ["Biến động danh mục có thể thấp hơn từng tài sản riêng lẻ", "Chắc chắn lỗ", "Không thay đổi", "Bắt buộc phải vay thêm"],
        0,
        "Correlation thấp là nơi MPT tìm thấy lợi ích lớn nhất của diversification."
      ),
    ],
    keyTakeaways: [
      "MPT dùng return, risk và correlation để xây danh mục",
      "Đa dạng hóa đúng cách có thể giảm rủi ro tổng thể",
      "Efficient frontier là danh mục tốt nhất cho từng mức rủi ro",
    ],
    sections: [
      { type: "lead", text: "MPT không dạy bạn chọn 'mã ngon nhất'. Nó dạy bạn ghép các tài sản sao cho cả danh mục trở nên tốt hơn." },
      { type: "heading", text: "Mini simulation" },
      { type: "comparison", left: { label: "Danh mục A", text: "100% cổ phiếu tăng trưởng: return cao nhưng biến động cũng cao, dễ bị một chu kỳ xấu đánh mạnh." }, right: { label: "Danh mục B", text: "60% cổ phiếu + 30% trái phiếu + 10% tiền mặt: return thấp hơn chút nhưng đường đi mượt hơn nhiều." } },
      { type: "conceptTable", title: "Ba biến số trong MPT", concepts: [
        { vi: "Lợi nhuận kỳ vọng", en: "Expected return", def: "Mức lợi nhuận trung bình bạn hy vọng nhận được." },
        { vi: "Độ biến động", en: "Volatility", def: "Mức dao động quanh kỳ vọng - càng cao càng khó chịu." },
        { vi: "Tương quan", en: "Correlation", def: "Đo tài sản đi cùng chiều hay ngược chiều với nhau." },
      ] },
      { type: "closing", lines: ["Danh mục tốt không phải danh mục liều nhất.", "Là danh mục phù hợp nhất với mục tiêu và tâm lý của bạn."] },
    ],
    application: {
      title: "Tự mô phỏng danh mục",
      message: "Lấy 3 tài sản bạn đang nghĩ tới và tự hỏi: nếu một tài sản giảm, hai tài sản kia có giúp bạn đỡ sốc không?",
      secondary: "Đây là cách đơn giản nhất để cảm nhận hiệu ứng tương quan trong danh mục.",
    },
  }),

  "finance-as-math": patch({
    openingQuestion: "Tài chính quy về công thức toán học ở chỗ nào rõ nhất?",
    openingOptions: ["DCF, WACC, terminal value và các bội số định giá", "Chỉ có kế toán", "Chỉ có thuế", "Chỉ có lãi suất"],
    correctOption: 0,
    explanation: "Nhiều bài toán tài chính chỉ là chiết khấu dòng tiền, so sánh bội số và mô hình hóa rủi ro theo công thức rõ ràng.",
    diagram: d("Cash flows", "Discount rate", "Terminal value", "Valuation"),
    realWorldExample: {
      company: "Valuation model",
      description: "Khi phân tích một doanh nghiệp, phần lớn công việc chỉ là đưa giả định hợp lý vào các công thức quen thuộc rồi kiểm tra độ nhạy.",
    },
    quiz: [
      q(
        "DCF chủ yếu dựa trên nguyên lý nào?",
        ["Tiền tương lai phải chiết khấu về hiện tại", "Giá cổ phiếu luôn đúng", "Doanh nghiệp nào cũng giống nhau", "Lợi nhuận kế toán là đủ"],
        0,
        "DCF quy về giá trị hiện tại của dòng tiền tương lai."
      ),
    ],
    keyTakeaways: [
      "Tài chính nhiều khi là toán ứng dụng",
      "DCF và multiples là hai khung quan trọng",
      "Giả định đầu vào quyết định kết quả định giá",
    ],
  }),

  "samsung-ai-finance": patch({
    openingQuestion: "AI capex trong một công ty chip thường tác động gì mạnh nhất?",
    openingOptions: ["Revenue, margin và chu kỳ đầu tư", "Chỉ marketing", "Chỉ thuế", "Chỉ cổ tức"],
    correctOption: 0,
    explanation: "AI capex có thể tăng doanh thu tương lai nhưng cũng kéo theo chu kỳ đầu tư, biên lợi nhuận và nhu cầu vốn lưu động.",
    diagram: d("AI demand", "Capex", "Memory cycle", "Pricing power"),
    realWorldExample: {
      company: "Samsung",
      description: "Công ty bán chip/thiết bị thường bị định giá theo chu kỳ memory, pricing power và mức capex để bắt nhịp AI.",
    },
    quiz: [
      q(
        "Capex lớn chưa chắc xấu khi nào?",
        ["Khi nó tạo năng lực sản xuất và doanh thu tương lai", "Khi báo chí khen", "Khi thị trường giảm", "Khi nợ tăng"],
        0,
        "Capex là xấu hay tốt phụ thuộc vào tỷ suất sinh lời tương lai mà nó mở ra."
      ),
    ],
    keyTakeaways: [
      "AI làm thay đổi chu kỳ capex và pricing power",
      "Đọc công ty chip phải đọc cả chu kỳ lẫn demand",
      "Capex chỉ đáng giá nếu tạo cash future đủ tốt",
    ],
  }),

  "fcf-deep-dive": patch({
    openingQuestion: "FCF thường được định nghĩa ngắn gọn nhất là gì?",
    openingOptions: ["OCF − CapEx", "Net income", "Revenue − tax", "EBITDA"],
    correctOption: 0,
    explanation: "Free Cash Flow là tiền còn lại sau khi doanh nghiệp đã tài trợ cho hoạt động và đầu tư duy trì/mở rộng cần thiết.",
    diagram: d("Operating cash flow", "− CapEx", "Free cash flow", "Value creation"),
    realWorldExample: {
      company: "Doanh nghiệp tăng trưởng",
      description: "Một công ty có thể báo lãi đều, nhưng nếu phải liên tục đổ tiền vào capex và vốn lưu động, FCF vẫn có thể yếu.",
    },
    quiz: [
      q(
        "FCF dương bền vững thường cho thấy điều gì?",
        ["Doanh nghiệp có khả năng tự tài trợ tốt hơn", "Chỉ là may mắn", "Không quan trọng", "Chắc chắn cổ phiếu sẽ tăng"],
        0,
        "FCF dương nghĩa là business tạo tiền thật sau đầu tư cần thiết."
      ),
    ],
    keyTakeaways: [
      "FCF là tiền còn lại sau đầu tư cần thiết",
      "OCF và CapEx đều phải đọc",
      "FCF mới gần nhất với giá trị kinh tế tạo ra",
    ],
  }),

  "dinh-gia-tai-san-rong": patch({
    openingQuestion: "Asset-based valuation phù hợp nhất khi nào?",
    openingOptions: ["Khi muốn định giá tài sản có thể bán riêng lẻ", "Khi công ty không có tài sản", "Khi không cần báo cáo", "Chỉ dùng cho công nghệ"],
    correctOption: 0,
    explanation: "Định giá theo tài sản ròng phù hợp với doanh nghiệp nhiều tài sản hữu hình hoặc tình huống thanh lý / NAV / RNAV.",
    diagram: d("Assets", "Liabilities", "NAV / RNAV", "Equity value"),
    realWorldExample: {
      company: "BĐS / holding company",
      description: "Những công ty có nhiều tài sản rõ ràng như đất, dự án, tiền mặt thường được soi theo NAV bên cạnh DCF và multiples.",
    },
    quiz: [
      q(
        "NAV thường trả lời câu hỏi gì?",
        ["Nếu bán hết tài sản rồi trừ nợ thì còn bao nhiêu cho cổ đông", "Doanh thu năm sau", "Biên gộp", "Tăng trưởng người dùng"],
        0,
        "NAV là khung nhìn tài sản ròng khá trực tiếp."
      ),
    ],
    keyTakeaways: [
      "Asset-based valuation hữu ích khi tài sản rõ và có thể tách rời",
      "NAV/RNAV thường dùng trong BĐS và holding",
      "Đừng dùng một khung định giá cho mọi doanh nghiệp",
    ],
  }),

  "bien-so-r-twr-mwrr": patch({
    openingQuestion: "TWR và MWRR khác nhau ở đâu quan trọng nhất?",
    openingOptions: ["TWR đo hiệu suất danh mục, MWRR bị ảnh hưởng bởi thời điểm dòng tiền", "MWRR luôn cao hơn", "TWR chỉ cho trái phiếu", "Hai cái là một"],
    correctOption: 0,
    explanation: "TWR đo hiệu suất của chiến lược đầu tư; MWRR phản ánh tác động của timing dòng tiền vào/ra.",
    diagram: d("Time-weighted return", "Money-weighted return", "Dòng tiền vào/ra", "Đọc hiệu suất đúng"),
    realWorldExample: {
      company: "Quỹ đầu tư",
      description: "Một quỹ có TWR đẹp nhưng MWRR xấu có thể đơn giản vì nhà đầu tư nạp tiền sai thời điểm.",
    },
    quiz: [
      q(
        "Khi nào MWRR dễ bị méo hơn TWR?",
        ["Khi có nhiều dòng tiền vào/ra không đều", "Khi không có phí", "Khi không có thị trường", "Khi trái phiếu không tồn tại"],
        0,
        "MWRR nhạy với thời điểm nạp/rút tiền nên có thể khác TWR khá nhiều."
      ),
    ],
    keyTakeaways: [
      "TWR đánh giá chiến lược, MWRR đánh giá trải nghiệm của tiền thật",
      "Timing dòng tiền có thể làm MWRR khác TWR mạnh",
      "Hiệu suất quỹ nên nhìn qua cả hai kính",
    ],
  }),

  "commodity": patch({
    diagram: d("Standardized goods", "Spot market", "Futures / hedging", "Cost driver for many industries"),
  }),

};

export function applyLessonOverrides(lessons) {
  return lessons.map((lesson) => {
    const override = lessonOverrides[lesson.slug];
    return override ? { ...lesson, ...override } : lesson;
  });
}
