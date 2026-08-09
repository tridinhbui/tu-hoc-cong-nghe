// Tên hai lộ trình, 53 chặng và 125 phần của chúng - phần chữ hiện dày nhất
// trên /hoc-bai và trong mọi thẻ tiến độ.
//
// KHOÁ THEO VỊ TRÍ, không theo tên. `TRACK_PERSONAL`/`TRACK_PROFESSIONAL` trong
// lib/track-stages.ts vẫn là nguồn duy nhất của cấu trúc: `days`,
// `extraLessonIds`, `available` quyết định bài nào thuộc chặng nào, và chúng
// không dịch được. Chỗ này chỉ thay phần chữ, đúng cách một bản dịch bài học là
// một patch đắp lên bài tiếng Việt chứ không phải bản sao của nó.
//
// Vị trí thay vì tên tiếng Việt vì cùng lý do với `level-titles.ts`: sửa một
// chữ trong dữ liệu mà khoá theo tên thì bản dịch rơi mất, im lặng, không có
// lỗi biên dịch nào. Đổi lại, thêm hay bớt một chặng mà quên sửa ở đây cũng im
// lặng như vậy - nên `lib/__tests__/track-stages-i18n.test.ts` đối chiếu cả ba:
// bản Việt ở đây phải khớp TỪNG CHỮ với dữ liệu, và bản Anh phải khớp hình dạng.
//
// Nhãn "Chặng" dịch thành "Stage", không phải "Chapter": nó là một quãng của lộ
// trình đo bằng dải bài học, còn "chapter" gợi ý một cuốn sách có mục lục cố
// định. Tên môn FRM/CFA giữ nguyên tiếng Anh ở cả hai bản vì đó là tên môn
// trong đề cương thật - người học tra cứu bằng đúng chữ đó.
//
// Xem AGENTS.md, mục "Translating the UI".

export const trackStagesVi = {
  trackStages: {
    personal: {
      title: "Tài chính cá nhân",
      subtitle: "Dành cho người mới bắt đầu",
      description:
        "Dành cho người muốn hiểu tiền bạc, kiểm soát chi tiêu, xây dựng tài sản và đầu tư thông minh - không cần kiến thức ngành.",
      pillars: ["Tư duy tiền bạc", "Đầu tư cá nhân", "Lập kế hoạch tài chính"],
      stages: [
        {
          label: "Chặng 1",
          name: "Biết mình trước khi học: audit, ngân sách, quỹ khẩn cấp, nợ",
          parts: [
            "Đo trước: theo dõi chi tiêu",
            "Audit tài chính và khẩu vị rủi ro",
            "Ngân sách, quỹ khẩn cấp, trả nợ và mục tiêu",
            "Giữ kế hoạch sống sót: tự động hóa và bảo hiểm",
          ],
        },
        {
          label: "Chặng 2",
          name: "Thuế TNCN & Lương thực nhận",
          parts: ["Từ lương gross đến lương net", "Cải cách 2026, quyết toán và thu nhập ngoài lương"],
        },
        {
          label: "Chặng 3",
          name: "Tư duy tiền bạc và tài chính cơ bản",
          parts: ["Tiền, thời gian và lãi kép", "Rủi ro, nợ và hệ thống tài chính"],
        },
        {
          label: "Chặng 4",
          name: "Cổ phiếu, ETF và quỹ đầu tư",
          parts: [
            "Cổ phiếu, ETF, quỹ chỉ số và DCA",
            "Tâm lý, sai lầm cần tránh và kỳ vọng thực tế",
            "Thuế, kỷ luật mua bán và thực hành",
          ],
        },
        {
          label: "Chặng 5",
          name: "Trái phiếu và các công cụ cố định",
          parts: ["Nền tảng trái phiếu", "Chiến lược và rủi ro trái phiếu"],
        },
        {
          label: "Chặng 6",
          name: "Danh mục đầu tư và kế hoạch hưu trí",
          parts: ["Danh mục theo tuổi và kế hoạch hưu trí", "Bảo vệ tài sản và tổng kết hành trình"],
        },
        {
          label: "Chặng 7",
          name: "Chiến lược đầu tư cá nhân",
          parts: [
            "Giá trị, tăng trưởng và chỉ số cơ bản",
            "Đa dạng hóa, tái cân bằng và tâm lý đầu tư",
          ],
        },
        {
          label: "Chặng 8",
          name: "Quản lý tài sản & hưu trí",
          parts: [
            "Tự do tài chính, lãi kép và quy tắc rút 4%",
            "Bảo vệ tài sản và tổng kết hành trình",
          ],
        },
        {
          label: "Chặng 9",
          name: "Nhà ở, bảo vệ tài sản và các quyết định tài chính lớn",
          parts: ["Nhà ở & tín dụng", "Bảo vệ tài sản & di sản"],
        },
        {
          label: "Chặng 10",
          name: "Tâm lý học tài chính hành vi (Behavioral Finance)",
          parts: [
            "Thiên kiến trong đầu tư cá nhân",
            "Tiền bạc, thời gian và xây kỷ luật tài chính",
          ],
        },
      ],
    },
    professional: {
      title: "Tài chính chuyên ngành",
      subtitle: "Chuyên sâu, cho người đã có nền tài chính",
      description:
        "Lộ trình chuyên sâu dành cho người đã biết tài chính cơ bản: kế toán, báo cáo tài chính, định giá, trái phiếu, danh mục đầu tư, phái sinh.",
      pillars: ["Kế toán & báo cáo tài chính", "Định giá & phân tích", "Đầu tư & quản lý rủi ro"],
      stages: [
        {
          label: "Chặng 1",
          name: "Kế toán nền tảng",
          parts: ["Ngôn ngữ kế toán và bảng cân đối", "Vốn lưu động và nguyên tắc ghi nhận"],
        },
        {
          label: "Chặng 2",
          name: "Đọc 3 báo cáo tài chính",
          parts: [
            "Income Statement và Balance Sheet",
            "Cash Flow Statement và case thực tế",
            "Đọc sâu: thuyết minh, tỷ trọng và ý kiến kiểm toán",
          ],
        },
        {
          label: "Chặng 3",
          name: "Chỉ số tài chính cơ bản",
          parts: ["Biên lợi nhuận và khả năng sinh lời", "Hiệu quả vận hành và định giá cơ bản"],
        },
        {
          label: "Chặng 4",
          name: "Giá trị thời gian của tiền",
          parts: ["PV, FV và các công cụ chiết khấu", "WACC, CAPM và ứng dụng"],
        },
        {
          label: "Chặng 5",
          name: "Tài chính doanh nghiệp",
          parts: ["Cơ cấu vốn và M&A", "Vận hành vốn và tài chính khởi nghiệp"],
        },
        {
          label: "Chặng 6",
          name: "Cổ phiếu và định giá doanh nghiệp",
          parts: ["Định giá tương đối (multiples)", "Định giá DCF"],
        },
        {
          label: "Chặng 7",
          name: "Trái phiếu, lãi suất và tín dụng",
          parts: ["Định giá trái phiếu và lãi suất", "Rủi ro tín dụng và các loại trái phiếu"],
        },
        {
          label: "Chặng 8",
          name: "Danh mục đầu tư và quản trị rủi ro",
          parts: ["Lý thuyết danh mục hiện đại", "Đo lường hiệu quả và các loại quỹ"],
        },
        {
          label: "Chặng 9",
          name: "Phái sinh và công cụ tài chính nâng cao",
          parts: ["Hợp đồng phái sinh cơ bản", "Swap, phòng hộ rủi ro và tổng kết"],
        },
        {
          label: "Chặng 10",
          name: "Nâng cao: Ứng dụng nghề Phân tích & Ngân hàng đầu tư",
          parts: [
            "Chất lượng lợi nhuận, định giá tương đối và tín dụng",
            "M&A, LBO và cơ chế giao dịch",
          ],
        },
        {
          label: "Chặng 11",
          name: "Vận hành tài chính doanh nghiệp hiện đại",
          parts: ["FP&A & vận hành vốn", "Treasury & quản trị tài chính"],
        },
        {
          label: "Chặng 12",
          name: "Tâm lý học tài chính hành vi nâng cao (Behavioral Finance)",
          parts: ["Nền tảng lý thuyết & phân tích thị trường", "Quản lý danh mục & thiết kế sản phẩm"],
        },
        {
          label: "Chặng 13",
          name: "AI trong Tài chính: Dùng ChatGPT/Claude để đọc báo cáo, phân tích và viết memo",
          parts: [
            "Bắt đầu an toàn: AI làm gì, đọc tin và đọc BCTC",
            "Thực hành: họp, tin tức, trợ lý riêng và viết memo",
            "Project cuối chặng: thư viện câu lệnh và quy trình kiểm chứng",
          ],
        },
        {
          label: "Chặng 14",
          name: "Masterclass Chuyên Đề: Bất Động Sản, Trái Phiếu, Startup VC, VaR & ESG",
          parts: [
            "Tài chính Bất động sản, Trái phiếu doanh nghiệp, Startup VC, Quản trị rủi ro VaR & Đầu tư ESG",
          ],
        },
        {
          label: "Chặng 15",
          name: "Mô hình tài chính thực hành (Financial Modeling)",
          parts: [
            "Cấu trúc, doanh thu và mô hình 3 báo cáo",
            "Bảng hỗ trợ, nợ vay và định giá DCF",
            "LBO, kiểm tra mô hình và project cuối chặng",
          ],
        },
        {
          label: "Chặng 16",
          name: "Tài chính bền vững (ESG & Climate Finance)",
          parts: [
            "Nền tảng: ESG là gì, đánh giá và đầu tư theo ESG",
            "Quy định, rủi ro khí hậu và định giá",
            "Quản trị doanh nghiệp chuyên sâu",
          ],
        },
        {
          label: "Chặng 17",
          name: "Kinh tế học cho người làm tài chính",
          parts: [
            "Vi mô: cung cầu, chi phí doanh nghiệp và cấu trúc thị trường",
            "Vĩ mô: AD/AS, tăng trưởng, chu kỳ và chính sách",
            "Kinh tế quốc tế và đọc chỉ báo vĩ mô",
          ],
        },
        {
          label: "Chặng 18",
          name: "Ngân hàng, tín dụng và tuân thủ",
          parts: [
            "Đọc và định giá một ngân hàng",
            "Tín dụng: thẩm định, chấm điểm và vốn",
            "Tuân thủ, kiểm soát nội bộ và mô hình kinh doanh mới",
          ],
        },
        {
          label: "Chặng 19",
          name: "Định giá phái sinh và quản trị rủi ro thị trường",
          parts: [
            "Định giá quyền chọn: từ không-arbitrage đến Greeks",
            "Đo lường và quản trị rủi ro thị trường",
          ],
        },
        {
          label: "Chặng 20",
          name: "Buy-side: quy trình nghiên cứu và định giá chuyên sâu",
          parts: [
            "Quy trình quỹ, luận điểm đầu tư và chiến lược định lượng",
            "Cơ chế thị trường và công cụ",
            "Định giá tài sản đặc thù: bất động sản, vô hình, REIT",
          ],
        },
        {
          label: "Chặng 21",
          name: "Quản lý gia sản và bảo hiểm",
          parts: [
            "Quy trình hoạch định tài chính cho khách hàng",
            "Bảo hiểm: định phí, tư vấn nhu cầu và quy định",
          ],
        },
        {
          label: "Chặng 22",
          name: "Phương pháp định lượng (Quantitative Methods)",
          parts: [
            "Phân phối, mẫu và suy diễn thống kê",
            "Hồi quy, chuỗi thời gian và kiểm chứng ngoài mẫu",
          ],
        },
        {
          label: "Chặng 23",
          name: "Excel và dữ liệu cho phân tích tài chính",
          parts: [
            "Bàn phím, hàm tra cứu và dựng mô hình trong Excel",
            "Kiểm tra, làm sạch dữ liệu và SQL",
          ],
        },
        {
          label: "Chặng 24",
          name: "Chuẩn mực kế toán và thuế doanh nghiệp Việt Nam",
          parts: [
            "VAS, IFRS và chuyển đổi chuẩn mực",
            "Thuế doanh nghiệp và thuế hoãn lại",
            "Chi phí được trừ, ưu đãi và thanh tra thuế",
          ],
        },
        {
          label: "Chặng 25",
          name: "Thị trường chứng khoán Việt Nam",
          parts: [
            "Cơ chế giao dịch và dòng vốn ngoại",
            "Trái phiếu doanh nghiệp và quản trị công ty",
            "Chỉ số, đòn bẩy ký quỹ và quỹ đầu tư",
          ],
        },
        {
          label: "Chặng 26",
          name: "Tài chính quốc tế",
          parts: [
            "Quan hệ ngang giá: lãi suất và sức mua",
            "Định giá xuyên biên giới và rủi ro tỷ giá trên báo cáo",
          ],
        },
        {
          label: "Chặng 27",
          name: "Private markets: cấu trúc và hiệu suất quỹ PE/VC",
          parts: ["Cấu trúc quỹ và cơ chế phân phối lợi nhuận", "Đo hiệu suất và thoái vốn"],
        },
        {
          label: "Chặng 28",
          name: "Kỹ năng nghề phân tích tài chính",
          parts: ["Viết memo và bảo vệ luận điểm", "Bài kiểm tra dựng mô hình và lộ trình nghề"],
        },
        {
          label: "Chặng 29",
          name: "Công cụ phân tích dữ liệu",
          parts: [
            "Chuyển từ bảng tính sang code, và làm sạch dữ liệu",
            "Trực quan hóa, dashboard và SQL nâng cao",
          ],
        },
        {
          label: "Chặng 30",
          name: "Tư duy phân tích dữ liệu",
          parts: [
            "Chọn chỉ số, phân tích cohort và thử nghiệm A/B",
            "Nhân quả, kể chuyện bằng dữ liệu và đạo đức dữ liệu",
          ],
        },
        {
          label: "Chặng 31",
          name: "Lập kế hoạch tài chính vận hành",
          parts: [
            "Yếu tố dẫn dắt, kế hoạch nhân sự và dòng tiền 13 tuần",
            "Kịch bản, phân bổ chi phí và nhịp báo cáo tháng",
          ],
        },
        {
          label: "Chặng 32",
          name: "Cơ chế thương vụ M&A",
          parts: [
            "Pha loãng EPS, nguồn vốn và phân bổ giá mua",
            "Thoái vốn, quy trình thương vụ và nghĩa vụ hội đồng",
          ],
        },
        {
          label: "Chặng 33",
          name: "Kiểm toán: cách một báo cáo được xác nhận",
          parts: [
            "Ý kiến kiểm toán, trọng yếu và bằng chứng",
            "Chọn mẫu, gian lận và ba tuyến phòng vệ",
          ],
        },
        {
          label: "Chặng 34",
          name: "FRM: Nền tảng, rủi ro vận hành & rủi ro thanh khoản",
          parts: [
            "Foundations of Risk Management: ERM, văn hoá rủi ro, thảm hoạ kinh điển",
            "Operational Resilience: LDA, BCP/DR, rủi ro mô hình & bên thứ ba",
            "Liquidity and Treasury Risk: LCR/NSFR, CFP, ALM/IRRBB",
          ],
        },
        {
          label: "Chặng 35",
          name: "FRM: Rủi ro thị trường",
          parts: [
            "Tính VaR, kiểm định hậu nghiệm và Expected Shortfall",
            "Mô hình biến động, phụ thuộc đuôi và stress testing",
          ],
        },
        {
          label: "Chặng 36",
          name: "FRM: Tín dụng nâng cao & Vấn đề thời sự",
          parts: [
            "CDS, chứng khoán hoá/CDO và rủi ro tín dụng đối tác (CVA)",
            "Ngân hàng ngầm, rủi ro liên kết hệ thống và tài sản số",
            "Rủi ro tín dụng chủ quyền và stablecoin",
          ],
        },
        {
          label: "Chặng 37",
          name: "FRM: Nền tảng, vận hành, thanh khoản & định lượng nâng cao",
          parts: [
            "Foundations: phân loại rủi ro, khẩu vị & hạn mức, đo hiệu quả, CAPM, đạo đức, BCBS 239",
            "Foundations nâng cao: RAROC & vốn kinh tế, quản trị cấp hội đồng, bốn lựa chọn với rủi ro, rủi ro hệ thống, danh tiếng & chiến lược",
            "Operational nâng cao: phân tích kịch bản, dữ liệu tổn thất bên ngoài, rủi ro thay đổi, dịch vụ trọng yếu, rủi ro con người",
            "Market Risk nâng cao: FRTB, key rate duration, ánh xạ nhân tố rủi ro, phân rã rủi ro giữa các bàn",
            "San nốt bốn môn: định lượng nâng cao, rủi ro đối tác và tập trung, thanh khoản nội ngày và repo, quy kết hiệu quả và rủi ro quỹ",
            "Operational Resilience: sự kiện Basel, RCSA/KRI, an ninh mạng, gian lận, vốn SMA, rủi ro hành vi",
            "Liquidity and Treasury: hai loại thanh khoản, thang dòng tiền, FTP, stress test, tài sản bảo đảm, quỹ mở",
            "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA",
          ],
        },
        {
          label: "Chặng 38",
          name: "FRM: Định giá, mô hình rủi ro & vấn đề thời sự",
          parts: [
            "Valuation and Risk Models: không chênh lệch giá, cây nhị thức, Black-Scholes, Greeks, DV01, xếp hạng",
            "Current Issues: AI/ML, rủi ro khí hậu, hậu LIBOR, CBDC, tập trung đám mây, bất ổn 2023",
          ],
        },
        {
          label: "Chặng 39",
          name: "Tài chính sản phẩm FinTech",
          parts: [
            "Doanh thu và đơn vị kinh tế: take rate, CAC/LTV, số dư ví",
            "Phần mất đi và đường tới hoà vốn: rủi ro tín dụng, gian lận, burn",
          ],
        },
        {
          label: "Chặng 40",
          name: "Quan hệ cổ đông (IR)",
          parts: [
            "Nghề IR và nghĩa vụ công bố thông tin",
            "Guidance, buổi gặp nhà đầu tư và xử lý tin xấu",
          ],
        },
        {
          label: "Chặng 41",
          name: "Bút toán và sổ sách kế toán",
          parts: [
            "Ghi sổ kép và đường đi từ chứng từ tới báo cáo",
            "Điều chỉnh cuối kỳ, đối chiếu và khoá sổ",
          ],
        },
        {
          label: "Chặng 42",
          name: "Tài chính dự án bất động sản",
          parts: [
            "Pháp lý, dòng tiền chữ J và cấu trúc vốn dự án",
            "Tài sản cho thuê và rủi ro dự án",
          ],
        },
        {
          label: "Chặng 43",
          name: "Định phí bảo hiểm",
          parts: [
            "Định phí, dự phòng nghiệp vụ và tái bảo hiểm",
            "Bất cân xứng thông tin và lợi nhuận công ty bảo hiểm",
          ],
        },
      ],
    },
  },
};

export const trackStagesEn: typeof trackStagesVi = {
  trackStages: {
    personal: {
      title: "Personal Finance",
      subtitle: "For complete beginners",
      description:
        "For anyone who wants to understand money, control their spending, build assets and invest sensibly - no industry background needed.",
      pillars: ["Money mindset", "Personal investing", "Financial planning"],
      stages: [
        {
          label: "Stage 1",
          name: "Know your own numbers first: audit, budget, emergency fund, debt",
          parts: [
            "Measure first: tracking your spending",
            "Financial audit and risk appetite",
            "Budget, emergency fund, debt payoff and goals",
            "Keeping the plan alive: automation and insurance",
          ],
        },
        {
          label: "Stage 2",
          name: "Income tax & take-home pay",
          parts: [
            "From gross salary to net salary",
            "The 2026 reform, annual filing and income outside your salary",
          ],
        },
        {
          label: "Stage 3",
          name: "Money mindset and financial basics",
          parts: ["Money, time and compounding", "Risk, debt and the financial system"],
        },
        {
          label: "Stage 4",
          name: "Stocks, ETFs and investment funds",
          parts: [
            "Stocks, ETFs, index funds and DCA",
            "Psychology, mistakes to avoid and realistic expectations",
            "Tax, trading discipline and practice",
          ],
        },
        {
          label: "Stage 5",
          name: "Bonds and fixed income instruments",
          parts: ["Bond fundamentals", "Bond strategies and risks"],
        },
        {
          label: "Stage 6",
          name: "Portfolios and retirement planning",
          parts: [
            "Age-based portfolios and retirement planning",
            "Protecting your assets, and wrapping up the journey",
          ],
        },
        {
          label: "Stage 7",
          name: "Personal investing strategy",
          parts: [
            "Value, growth and the core ratios",
            "Diversification, rebalancing and investor psychology",
          ],
        },
        {
          label: "Stage 8",
          name: "Wealth management & retirement",
          parts: [
            "Financial independence, compounding and the 4% rule",
            "Protecting your assets, and wrapping up the journey",
          ],
        },
        {
          label: "Stage 9",
          name: "Housing, asset protection and the big financial decisions",
          parts: ["Housing & credit", "Asset protection & estate planning"],
        },
        {
          label: "Stage 10",
          name: "Behavioral finance",
          parts: [
            "Biases in personal investing",
            "Money, time and building financial discipline",
          ],
        },
      ],
    },
    professional: {
      title: "Professional Finance",
      subtitle: "In depth, for those with a finance foundation",
      description:
        "An in-depth track for anyone who already knows the basics: accounting, financial statements, valuation, bonds, portfolios and derivatives.",
      pillars: ["Accounting & reporting", "Valuation & analysis", "Investing & risk management"],
      stages: [
        {
          label: "Stage 1",
          name: "Accounting foundations",
          parts: [
            "The language of accounting and the balance sheet",
            "Working capital and recognition principles",
          ],
        },
        {
          label: "Stage 2",
          name: "Reading the three financial statements",
          parts: [
            "Income Statement and Balance Sheet",
            "Cash Flow Statement and a real case",
            "Reading deeper: notes, common-size and the audit opinion",
          ],
        },
        {
          label: "Stage 3",
          name: "Core financial ratios",
          parts: ["Margins and profitability", "Operating efficiency and basic valuation"],
        },
        {
          label: "Stage 4",
          name: "The time value of money",
          parts: ["PV, FV and the discounting toolkit", "WACC, CAPM and their uses"],
        },
        {
          label: "Stage 5",
          name: "Corporate finance",
          parts: ["Capital structure and M&A", "Running the capital base, and startup finance"],
        },
        {
          label: "Stage 6",
          name: "Equities and company valuation",
          parts: ["Relative valuation (multiples)", "DCF valuation"],
        },
        {
          label: "Stage 7",
          name: "Bonds, interest rates and credit",
          parts: ["Bond pricing and interest rates", "Credit risk and the types of bonds"],
        },
        {
          label: "Stage 8",
          name: "Portfolios and risk management",
          parts: ["Modern portfolio theory", "Performance measurement and fund types"],
        },
        {
          label: "Stage 9",
          name: "Derivatives and advanced instruments",
          parts: ["Basic derivative contracts", "Swaps, hedging and a wrap-up"],
        },
        {
          label: "Stage 10",
          name: "Advanced: on the job in Equity Research & Investment Banking",
          parts: [
            "Earnings quality, relative valuation and credit",
            "M&A, LBO and deal mechanics",
          ],
        },
        {
          label: "Stage 11",
          name: "Running finance in a modern company",
          parts: ["FP&A & capital operations", "Treasury & financial governance"],
        },
        {
          label: "Stage 12",
          name: "Advanced behavioral finance",
          parts: ["Theory and market analysis", "Portfolio management & product design"],
        },
        {
          label: "Stage 13",
          name: "AI in finance: using ChatGPT/Claude to read filings, analyse and draft memos",
          parts: [
            "Starting safely: what AI does, reading news and reading financials",
            "In practice: meetings, news, your own assistant and memo writing",
            "End-of-stage project: a prompt library and a verification routine",
          ],
        },
        {
          label: "Stage 14",
          name: "Masterclass: Real Estate, Bonds, Startup VC, VaR & ESG",
          parts: [
            "Real estate finance, corporate bonds, startup VC, VaR risk management & ESG investing",
          ],
        },
        {
          label: "Stage 15",
          name: "Financial modeling in practice",
          parts: [
            "Structure, revenue and the three-statement model",
            "Supporting schedules, debt and DCF valuation",
            "LBO, model review and the end-of-stage project",
          ],
        },
        {
          label: "Stage 16",
          name: "Sustainable finance (ESG & Climate Finance)",
          parts: [
            "Foundations: what ESG is, how it is rated, and ESG investing",
            "Regulation, climate risk and valuation",
            "Corporate governance in depth",
          ],
        },
        {
          label: "Stage 17",
          name: "Economics for finance professionals",
          parts: [
            "Micro: supply and demand, firm costs and market structure",
            "Macro: AD/AS, growth, cycles and policy",
            "International economics and reading macro indicators",
          ],
        },
        {
          label: "Stage 18",
          name: "Banking, credit and compliance",
          parts: [
            "Reading and valuing a bank",
            "Credit: appraisal, scoring and capital",
            "Compliance, internal control and new business models",
          ],
        },
        {
          label: "Stage 19",
          name: "Derivatives pricing and market risk management",
          parts: [
            "Option pricing: from no-arbitrage to the Greeks",
            "Measuring and managing market risk",
          ],
        },
        {
          label: "Stage 20",
          name: "Buy-side: the research process and valuation in depth",
          parts: [
            "How a fund works, the investment thesis and quant strategies",
            "Market mechanics and the tools",
            "Valuing special assets: real estate, intangibles, REITs",
          ],
        },
        {
          label: "Stage 21",
          name: "Wealth management and insurance",
          parts: [
            "The financial planning process for a client",
            "Insurance: pricing, needs-based advice and regulation",
          ],
        },
        {
          label: "Stage 22",
          name: "Quantitative Methods",
          parts: [
            "Distributions, samples and statistical inference",
            "Regression, time series and out-of-sample testing",
          ],
        },
        {
          label: "Stage 23",
          name: "Excel and data for financial analysis",
          parts: [
            "Keyboard, lookup functions and building models in Excel",
            "Checking, cleaning data and SQL",
          ],
        },
        {
          label: "Stage 24",
          name: "Vietnamese accounting standards and corporate tax",
          parts: [
            "VAS, IFRS and the conversion between them",
            "Corporate income tax and deferred tax",
            "Deductible expenses, incentives and tax audits",
          ],
        },
        {
          label: "Stage 25",
          name: "The Vietnamese stock market",
          parts: [
            "Trading mechanics and foreign capital flows",
            "Corporate bonds and corporate governance",
            "Indices, margin leverage and investment funds",
          ],
        },
        {
          label: "Stage 26",
          name: "International finance",
          parts: [
            "Parity relationships: interest rates and purchasing power",
            "Cross-border valuation and FX risk in the accounts",
          ],
        },
        {
          label: "Stage 27",
          name: "Private markets: PE/VC fund structure and performance",
          parts: ["Fund structure and the distribution waterfall", "Measuring performance and exits"],
        },
        {
          label: "Stage 28",
          name: "The craft of financial analysis",
          parts: [
            "Writing a memo and defending the thesis",
            "The modelling test and the career path",
          ],
        },
        {
          label: "Stage 29",
          name: "Data analysis tooling",
          parts: [
            "Moving from spreadsheets to code, and cleaning data",
            "Visualisation, dashboards and advanced SQL",
          ],
        },
        {
          label: "Stage 30",
          name: "Thinking with data",
          parts: [
            "Choosing metrics, cohort analysis and A/B testing",
            "Causality, telling a story with data, and data ethics",
          ],
        },
        {
          label: "Stage 31",
          name: "Operational financial planning",
          parts: [
            "Drivers, headcount planning and the 13-week cash flow",
            "Scenarios, cost allocation and the monthly reporting rhythm",
          ],
        },
        {
          label: "Stage 32",
          name: "M&A deal mechanics",
          parts: [
            "EPS dilution, funding and purchase price allocation",
            "Divestitures, the deal process and board duties",
          ],
        },
        {
          label: "Stage 33",
          name: "Audit: how a set of accounts gets signed off",
          parts: [
            "The audit opinion, materiality and evidence",
            "Sampling, fraud and the three lines of defence",
          ],
        },
        {
          label: "Stage 34",
          name: "FRM: Foundations, operational risk & liquidity risk",
          parts: [
            "Foundations of Risk Management: ERM, risk culture, the classic blow-ups",
            "Operational Resilience: LDA, BCP/DR, model and third-party risk",
            "Liquidity and Treasury Risk: LCR/NSFR, CFP, ALM/IRRBB",
          ],
        },
        {
          label: "Stage 35",
          name: "FRM: Market risk",
          parts: [
            "Computing VaR, backtesting and Expected Shortfall",
            "Volatility models, tail dependence and stress testing",
          ],
        },
        {
          label: "Stage 36",
          name: "FRM: Advanced credit & Current Issues",
          parts: [
            "CDS, securitisation/CDOs and counterparty credit risk (CVA)",
            "Shadow banking, systemic interconnection risk and digital assets",
            "Sovereign credit risk and stablecoins",
          ],
        },
        {
          label: "Stage 37",
          name: "FRM: Foundations, operational, liquidity & advanced quantitative",
          parts: [
            "Foundations: risk taxonomy, appetite & limits, performance measurement, CAPM, ethics, BCBS 239",
            "Foundations advanced: RAROC & economic capital, board-level governance, the four choices about risk, systemic risk, reputation & strategy",
            "Operational advanced: scenario analysis, external loss data, change risk, critical services, people risk",
            "Market Risk advanced: FRTB, key rate duration, risk factor mapping, risk decomposition across desks",
            "Finishing the four subjects: advanced quantitative, counterparty and concentration risk, intraday liquidity and repo, performance attribution and fund risk",
            "Operational Resilience: Basel event types, RCSA/KRI, cyber security, fraud, SMA capital, conduct risk",
            "Liquidity and Treasury: the two kinds of liquidity, the cash flow ladder, FTP, stress testing, collateral, open-ended funds",
            "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA",
          ],
        },
        {
          label: "Stage 38",
          name: "FRM: Valuation, risk models & current issues",
          parts: [
            "Valuation and Risk Models: no-arbitrage, binomial trees, Black-Scholes, the Greeks, DV01, ratings",
            "Current Issues: AI/ML, climate risk, life after LIBOR, CBDCs, cloud concentration, the 2023 turmoil",
          ],
        },
        {
          label: "Stage 39",
          name: "FinTech product finance",
          parts: [
            "Revenue and unit economics: take rate, CAC/LTV, wallet balances",
            "Where the money leaks and the path to breakeven: credit risk, fraud, burn",
          ],
        },
        {
          label: "Stage 40",
          name: "Investor relations (IR)",
          parts: [
            "The IR job and disclosure obligations",
            "Guidance, investor meetings and handling bad news",
          ],
        },
        {
          label: "Stage 41",
          name: "Journal entries and bookkeeping",
          parts: [
            "Double entry and the road from a receipt to the accounts",
            "Period-end adjustments, reconciliation and the close",
          ],
        },
        {
          label: "Stage 42",
          name: "Real estate project finance",
          parts: [
            "Legal status, the J-curve cash flow and the project capital stack",
            "Leased assets and project risk",
          ],
        },
        {
          label: "Stage 43",
          name: "Insurance pricing",
          parts: [
            "Pricing, technical reserves and reinsurance",
            "Information asymmetry and how an insurer makes money",
          ],
        },
      ],
    },
  },
};
