// Module-scope data tables that render Vietnamese prose directly out of a
// `const` at the top of a component, instead of through a display position
// `i18n-coverage.mjs`'s `data` rule was written to catch. See AGENTS.md,
// "Translating the UI" - this is the section that closes that blind spot for
// StageTipsBanner, RpgInventoryPanel, ScrollytellingPinnedSection and
// CongCuClient. Everything structural (ids, keys, rarity values, ordering,
// stats) stays in the component; only the human-readable strings live here.

export const dataTablesVi = {
  dataTables: {
    stageTips: {
      mascotName: "Tài Tài",
      tips: {
        "personal-Chặng 1": [
          "Bí quyết tài chính đơn giản nhất: chi tiêu ít hơn thu nhập. Nghe hiển nhiên, nhưng 70% người trưởng thành không làm được điều này mỗi tháng.",
          "Người giàu không nhất thiết kiếm nhiều hơn; họ giữ được nhiều hơn. Net worth bằng tài sản trừ nợ, không phải thu nhập hàng tháng.",
          "Dòng tiền âm là kẻ thù thầm lặng. Theo dõi chi tiêu 30 ngày và bạn sẽ ngạc nhiên tiền biến đi đâu.",
          "Quy tắc 50/30/20: 50% nhu cầu thiết yếu, 30% muốn, 20% tiết kiệm và đầu tư.",
        ],
        "personal-Chặng 0": [
          "Nhiều người audit lần đầu mới phát hiện mình quên cộng khoản nợ trả góp điện thoại hay vay bạn bè - tài sản ròng thường thấp hơn cảm giác chủ quan vì hay bỏ sót đúng những khoản nợ nhỏ, rải rác.",
          "Một nghiên cứu hành vi hay được nhắc: người dùng Snowball (trả nợ nhỏ trước) có tỷ lệ kiên trì đến cùng cao hơn Avalanche, dù Avalanche tối ưu hơn về tiền - kỷ luật thắng tối ưu nếu bạn dễ bỏ cuộc.",
          "Sai lầm phổ biến nhất về khẩu vị rủi ro: đánh giá nó lúc thị trường đang yên ả. Câu hỏi thật chỉ lộ ra khi tài khoản đỏ 20% - lúc đó mới biết mình đã tự đánh giá đúng hay sai.",
          "Sinking fund và quỹ khẩn cấp hay bị nhầm là một - khác nhau ở chỗ sinking fund dành cho khoản chi BIẾT TRƯỚC (Tết, học phí), quỹ khẩn cấp dành cho thứ KHÔNG lường trước được.",
        ],
        "personal-Chặng 2": [
          "ETF chỉ số theo dõi cả thị trường thay vì cược vào một công ty - chi phí thấp, đa dạng hóa sẵn, phù hợp phần lớn nhà đầu tư cá nhân.",
          "FOMO khiến bạn mua đúng lúc giá đã tăng mạnh vì sợ bỏ lỡ - thường là gần đỉnh, không phải lúc tốt để vào.",
          "DCA (đầu tư định kỳ) không phải phép màu, chỉ là cách giảm rủi ro timing sai bằng kỷ luật chia nhỏ khoản đầu tư theo thời gian.",
          "Thuế trên lợi nhuận đầu tư và kỷ luật chốt lời/cắt lỗ quan trọng không kém việc chọn đúng cổ phiếu.",
        ],
        "personal-Chặng 3": [
          "Giá trái phiếu và lãi suất luôn đi ngược chiều nhau - lãi suất thị trường tăng, giá trái phiếu bạn đang cầm sẽ giảm.",
          "Trái phiếu chính phủ thường an toàn hơn trái phiếu doanh nghiệp, đổi lại lợi suất thấp hơn - đánh đổi rủi ro và lợi nhuận không có ngoại lệ.",
          "Duration đo độ nhạy của trái phiếu với lãi suất - duration càng cao, giá càng biến động mạnh khi lãi suất thay đổi.",
          "Trái phiếu không phải tài sản 'miễn rủi ro'- vẫn có rủi ro lãi suất, rủi ro tín dụng, và rủi ro lạm phát ăn mòn lợi suất thực.",
        ],
        "personal-Chặng 4": [
          "Phân bổ tài sản (asset allocation) quyết định phần lớn kết quả danh mục dài hạn - quan trọng hơn việc chọn đúng một mã cổ phiếu.",
          "Càng gần tuổi nghỉ hưu, danh mục nên nghiêng dần sang tài sản ổn định hơn - vì không còn nhiều thời gian để hồi phục sau một cú giảm mạnh.",
          "Tái cân bằng danh mục định kỳ về bản chất là bán bớt thứ đã tăng nhiều, mua thêm thứ đang yếu hơn - kỷ luật ngược với bản năng.",
          "Bảo hiểm đi trước đầu tư trong thứ tự ưu tiên: một sự kiện y tế không có bảo hiểm có thể xóa sổ nhiều năm tích lũy chỉ trong vài tháng.",
        ],
        "personal-Chặng 5": [
          "Warren Buffett từng nói ông thà mua một công ty tuyệt vời với giá hợp lý còn hơn một công ty tầm thường với giá rẻ - đầu tư giá trị không có nghĩa là cứ rẻ là mua.",
          "Một dấu hiệu dễ bỏ qua khi đánh giá đa dạng hóa: hỏi 'nếu tin xấu ập vào NGÀNH này, bao nhiêu % danh mục của tôi bị ảnh hưởng cùng lúc', không chỉ đếm số mã.",
          "Cách đơn giản để tự kiểm tra thiên kiến xác nhận: trước khi mua, thử viết ra 2 lý do KHÔNG nên mua cổ phiếu đó. Nếu không nghĩ ra được lý do nào, có thể bạn chưa nhìn đủ góc.",
          "Một chỉ số tốt ở một công ty vẫn có thể là tín hiệu xấu nếu đến từ nguồn không bền vững - ROE cao nhờ vay nợ nhiều khác hẳn ROE cao nhờ vận hành hiệu quả.",
        ],
        "personal-Chặng 6": [
          "FIRE (Financial Independence, Retire Early) là một cộng đồng thực tế đã tính toán chi tiết con số tự do tài chính của họ - không phải khái niệm mơ hồ, mà là một phép tính ai cũng làm được.",
          "Sequence of returns risk là rủi ro ít người để ý: thị trường giảm mạnh ngay 2-3 năm đầu nghỉ hưu nguy hiểm hơn nhiều so với giảm mạnh ở năm thứ 20, dù mức giảm % là như nhau.",
          "Cách nhanh nhất để nhận ra lừa đảo tài chính: hỏi 'nếu chiến lược này thật sự hiệu quả và an toàn, tại sao họ cần rủ thêm người thay vì tự âm thầm làm giàu'.",
          "Ở nhiều gia đình, tranh chấp thừa kế không phải vì thiếu tiền mà vì thiếu một cuộc trò chuyện rõ ràng từ sớm - giấy tờ pháp lý chỉ là một nửa câu chuyện.",
        ],
        "professional-Chặng 1": [
          "Kế toán là ngôn ngữ kinh doanh, Warren Buffett gọi như vậy. Đọc được báo cáo tài chính là kỹ năng quan trọng nhất của người làm tài chính.",
          "Accrual accounting: doanh thu ghi nhận khi bán, không khi thu tiền. Đây là lý do P&L đẹp nhưng tài khoản ngân hàng trống.",
          "Phương trình kế toán: Tài sản bằng Nợ cộng Vốn chủ. Ba chữ này giải thích mọi giao dịch tài chính, không có ngoại lệ.",
          "Debit và Credit không phải tốt hay xấu, chỉ là hai phía của cùng một giao dịch kép.",
        ],
        "professional-Chặng 2": [
          "Ba báo cáo tài chính là ba góc nhìn: P&L nói doanh nghiệp kiếm gì, Balance Sheet nói có gì, Cash Flow nói tiền đi đâu.",
          "Nếu chỉ đọc một báo cáo, hãy đọc Cash Flow Statement. Lợi nhuận có thể giả tạo, nhưng tiền mặt trong tài khoản thì không.",
          "Gross Margin là chỉ số đầu tiên cần nhìn khi phân tích P&L; nó tiết lộ pricing power và moat thực sự của doanh nghiệp.",
          "Balance Sheet luôn phải cân. Nếu không cân, kế toán đã sai. Đây là quy luật không thể vi phạm.",
        ],
        "professional-Chặng 3": [
          "ROE cao chưa chắc tốt nếu đến từ đòn bẩy. DuPont tách ROE thành 3 phần: Margin nhân Turnover nhân Leverage, mới hiểu chất lượng thực.",
          "So sánh P/E giữa ngành khác nhau như so sánh táo với cam, vô nghĩa. Luôn so trong cùng ngành và so với lịch sử.",
          "EV/EBITDA tốt hơn P/E khi so sánh công ty có cơ cấu vốn khác nhau vì loại bỏ ảnh hưởng thuế, lãi vay và khấu hao.",
          "Một chỉ số đơn độc không nói lên gì. Ý nghĩa nằm ở xu hướng theo thời gian và so sánh với peers.",
        ],
        "professional-Chặng 4": [
          "1 triệu hôm nay đáng giá hơn 1 triệu năm sau vì bạn có thể đầu tư nó. Đây là nền tảng mọi quyết định tài chính định lượng.",
          "Compound interest: 100 triệu tăng 10% mỗi năm, sau 30 năm thành 1.7 tỷ. Bắt đầu sớm 5 năm quan trọng hơn đầu tư thêm 50%.",
          "NPV lớn hơn 0: đầu tư tạo giá trị. NPV nhỏ hơn 0: phá hủy giá trị. Mọi quyết định đầu tư đều đưa được về câu hỏi này.",
          "IRR là rate làm NPV bằng 0. Nếu IRR lớn hơn WACC: đầu tư. Nếu IRR nhỏ hơn WACC: từ chối. Đây là cách CEO nghĩ khi xem xét dự án.",
        ],
        "professional-Chặng 5": [
          "Ba quyết định của CFO: Đầu tư vào đâu, Tài trợ bằng gì, Trả lại cổ đông thế nào. Tất cả hướng đến tối đa hóa giá trị.",
          "Nợ có tax shield vì lãi vay được khấu trừ thuế. Nhưng quá nhiều nợ khiến chi phí phá sản tăng. Optimal structure là điểm cân bằng giữa hai yếu tố này.",
          "70% M&A không đạt kỳ vọng: synergy ảo, culture clash, integration thất bại. Người mua thường trả quá nhiều.",
          "LTV/CAC từ 3 trở lên là benchmark tối thiểu cho startup. Dưới 1 nghĩa là mua khách hàng với giá lỗ.",
        ],
        "professional-Chặng 6": [
          "Intrinsic value khác giá thị trường. Giá là cái bạn trả, giá trị là cái bạn nhận; khoảng chênh lệch là margin of safety.",
          "DCF rất nhạy với WACC và g. Thay đổi 1% có thể khiến định giá thay đổi 20 đến 30%. Luôn làm sensitivity analysis.",
          "Moat rộng bằng ROIC cao bền vững nhiều năm. Tìm công ty ROIC lớn hơn WACC ổn định 10 năm, đó là moat thực sự.",
          "Earnings quality: NI tăng nhưng OCF giảm là dấu hiệu đỏ cần điều tra. Lợi nhuận có thể điều chỉnh, tiền mặt thì không.",
        ],
        "professional-Chặng 7": [
          "Giá trái phiếu và lãi suất quan hệ nghịch đảo, quy luật sắt của fixed income. Fed tăng lãi dẫn đến toàn bộ danh mục bond mất giá.",
          "Duration đo độ nhạy giá bond với lãi suất. Duration 7 có nghĩa lãi suất tăng 1% thì giá giảm khoảng 7%. Quản lý duration là quản lý risk.",
          "Investment Grade vs High Yield: HY spreads nới rộng trước suy thoái 6 đến 12 tháng, là chỉ báo kinh tế quan trọng.",
          "Yield curve đảo ngược đã dự báo mọi cuộc suy thoái Mỹ kể từ 1955, tỷ lệ chính xác khoảng 80%.",
        ],
        "professional-Chặng 8": [
          "Asset allocation quyết định 90% lợi nhuận danh mục, không phải stock picking hay market timing.",
          "Đa dạng hóa loại bỏ unsystematic risk nhưng không loại bỏ systematic risk. 20 đến 30 cổ phiếu là đủ.",
          "Loss aversion: đau khi mất 1 triệu gấp đôi niềm vui khi lãi 1 triệu, dẫn đến quyết định đầu tư sai.",
          "80% active fund managers không đánh bại index sau 15 năm. ETF chi phí thấp cộng DCA hàng tháng là giải pháp.",
        ],
        "professional-Chặng 9": [
          "Phái sinh không tự nhiên rủi ro; rủi ro nằm ở cách dùng. Hedge giá nhiên liệu là giảm rủi ro. Đầu cơ đòn bẩy là tăng rủi ro.",
          "Options cho phép mua bảo hiểm cho danh mục: protective put là quyền bán cổ phiếu ở giá cố định khi thị trường giảm.",
          "Interest Rate Swap: hoán đổi lãi thả nổi sang cố định. Doanh nghiệp loại bỏ rủi ro biến động lãi suất.",
          "Sau 200 bài, tài chính là bộ mental models. DCF cho giá trị, WACC cho chi phí cơ hội, Portfolio theory cho rủi ro và tương quan.",
        ],
        "professional-Chặng 10": [
          "LBO dùng đòn bẩy nợ để khuếch đại lợi nhuận vốn chủ - nếu doanh nghiệp sinh lời tốt, ROE tăng mạnh; nếu không, rủi ro phá sản cũng tăng theo.",
          "Synergy trong M&A thường bị thổi phồng lúc đàm phán và hiếm khi đạt đủ trong thực tế - phần lớn giá trị thương vụ mất đi ở khâu tích hợp hậu sáp nhập.",
          "Accretion/dilution analysis trả lời câu hỏi: thương vụ M&A này làm EPS công ty mua tăng hay giảm - phụ thuộc cách tài trợ (tiền mặt, nợ, hay phát hành cổ phiếu).",
          "Exit strategy (IPO, bán lại, chia cổ tức đặc biệt) phải được nhà đầu tư private equity nghĩ đến ngay từ ngày đầu tư, không phải lúc sắp thoái vốn.",
        ],
        "professional-Chặng 13": [
          "AI in Finance không thay thế tư duy tài chính; nó khuếch đại người biết đặt câu hỏi, kiểm chứng nguồn và hiểu bản chất con số.",
          "Prompt tốt phải có vai trò, dữ liệu, nhiệm vụ, định dạng đầu ra và ràng buộc nguồn - nếu thiếu một phần, output rất dễ hay nhưng khó dùng.",
          "Khi dùng AI đọc BCTC, hãy bắt AI trích nguồn trang/dòng cho từng con số và ghi 'Không tìm thấy dữ liệu' nếu tài liệu không có.",
          "AI mạnh nhất trong workflow: đọc tài liệu, bóc số, tìm rủi ro, viết bản nháp; quyết định đầu tư cuối cùng vẫn cần con người chịu trách nhiệm.",
        ],
        bonus: [
          "Case study thực tế là nơi lý thuyết gặp thực tế lộn xộn - số liệu công ty thật hiếm khi gọn gàng như ví dụ trong sách giáo khoa.",
          "Đọc báo cáo tài chính của một công ty thật khác hẳn đọc ví dụ minh họa - luôn có ngữ cảnh ngành, chu kỳ kinh tế, và quyết định quản trị ẩn phía sau con số.",
          "Phân tích một thương vụ hay một công ty cụ thể là cách tốt nhất để kiểm tra xem bạn đã thực sự hiểu khái niệm hay chỉ mới thuộc lòng định nghĩa.",
          "Không có công ty nào hoàn hảo để phân tích - mỗi case đều có điểm mù riêng, quan trọng là nhận ra được điểm mù đó là gì.",
        ],
      },
    },

    rpgInventory: {
      items: {
        suit_armani: {
          name: "Vest Armani Executive",
          description: "Vest doanh nhân xa xỉ tăng +45 Sức mạnh định giá và phong thái Phố Wall.",
        },
        watch_rolex: {
          name: "Rolex Submariner Gold",
          description: "Đồng hồ mạ vàng Thụy Sĩ giúp tăng tốc độ đọc BCTC lên +40%.",
        },
        glasses_bloomberg: {
          name: "Kính Bloomberg Terminal",
          description: "Kính nhìn thấu dòng tiền và chỉ số tài chính thời gian thực.",
        },
        pen_gold: {
          name: "Bút Vàng Ký Hợp Đồng M&A",
          description: "Bút máy mạ vàng chuyên dùng chốt các thương vụ M&A triệu đô.",
        },
        potion_x2xp: {
          name: "Thuốc X2 XP Wall Street (24H)",
          description: "Nhân đôi toàn bộ XP nhận được khi hoàn thành bài học và Quiz.",
        },
        card_vinamilk: {
          name: "Thẻ Doanh Nghiệp Vinamilk (VNM)",
          description: "Thẻ cổ phiếu đầu ngành tiêu dùng Việt Nam.",
        },
      },
      rarityLabels: {
        "Thường": "Thường",
        "Hiếm": "Hiếm",
        "Huyền Thoại": "Huyền Thoại",
      },
    },

    scrollytelling: {
      panels: {
        panel0: {
          tag: "01 / NGUYÊN TẮC THIẾT KẾ",
          badge: "1. Vì sao ở lại",
          title: "Vì sao 92% học viên duy trì thói quen học mỗi ngày?",
          subtitle: "Giải quyết 4 rào cản tâm lý lớn nhất khi tự học tài chính bằng thiết kế sản phẩm tinh gọn.",
          items: [
            { title: "Chống quên bài học", desc: "Spaced Repetition tự động nhắc ôn lại đúng thời điểm sắp quên." },
            { title: "100% Miễn phí mãi mãi", desc: "Không khoá học trả phí đắt đỏ ẩn phía sau. Tự do học hoàn toàn." },
            { title: "Lộ trình rõ ràng", desc: "Chia chặng từng bước từ cơ bản đến phân tích báo cáo tài chính." },
            { title: "Đo lường phản xạ", desc: "Quiz Active Recall + XP bảng xếp hạng giúp biết ngay độ hiểu bài." },
          ],
        },
        panel1: {
          tag: "02 / PHƯƠNG PHÁP KHOA HỌC",
          badge: "2. Phương pháp",
          title: "Spaced Repetition & Active Recall — Học ít, nhớ lâu",
          subtitle: "Phương pháp ghi nhớ bám sát đường cong quên lãng (Forgetting Curve) của não bộ.",
          items: [
            { title: "5-7 phút / bài", desc: "Bài học ngắn gọn, tập trung đúng 1 khái niệm cốt lõi." },
            { title: "Active Recall", desc: "Bắt não kích hoạt nhớ lại kiến thức qua Quiz kiểm tra." },
            { title: "Nhắc ôn đúng lúc", desc: "Câu hỏi ôn lặp lại xuất hiện tự động sau ~5 bài tiếp." },
            { title: "Khắc sâu bản chất", desc: "Biến lý thuyết thành phản xạ đọc báo cáo tài chính." },
          ],
        },
        panel2: {
          tag: "03 / ĐỐI TƯỢNG PHÙ HỢP",
          badge: "3. Đối tượng",
          title: "Lộ trình được thiết kế dành riêng cho bạn",
          subtitle: "Dù bạn bắt đầu từ con số 0 hay cần chuẩn hóa kiến thức chuyên sâu.",
          items: [
            { title: "Tài chính cá nhân", tag: "Dòng tiền", desc: "Dành cho ai muốn quản lý tiền, tiết kiệm và đầu tư an toàn." },
            { title: "Người học CFA", tag: "Candidates", desc: "Cần nạp nền tảng kiến thức chắc chắn và phản xạ lý thuyết." },
            { title: "Financial Planner", tag: "Tư vấn", desc: "Chuẩn hóa khung tư duy hoạch định tài chính bài bản." },
            { title: "Nhà đầu tư cá nhân", tag: "Cổ phiếu", desc: "Nắm vững cách đọc chỉ số tài chính và bóc tách doanh nghiệp." },
          ],
        },
      },
    },

    toolsIndex: {
      eyebrow: "Công cụ tài chính & Định giá",
      title: "Áp dụng số liệu vào thực tế",
      subtitle: "Mô phỏng tài chính cá nhân & định giá doanh nghiệp chuẩn CFA.",
      loading: "Đang tải...",
      tabs: {
        netWorth: "Tài sản ròng",
        budget: "Ngân sách 50/30/20",
        emergencyFund: "Quỹ khẩn cấp",
        compoundInterest: "Giả lập Lãi kép",
        firePlanner: "Kế hoạch FIRE",
        valuationDcf: "Định giá DCF & WACC",
      },
    },
  },
};

export const dataTablesEn: typeof dataTablesVi = {
  dataTables: {
    stageTips: {
      mascotName: "Tài Tài",
      tips: {
        "personal-Chặng 1": [
          "The simplest financial rule there is: spend less than you earn. Obvious to hear, but 70% of adults miss it every single month.",
          "The rich aren't necessarily earning more; they're keeping more. Net worth is assets minus debt, not your monthly paycheck.",
          "Negative cash flow is the silent enemy. Track 30 days of spending and you'll be surprised where the money actually goes.",
          "The 50/30/20 rule: 50% essentials, 30% wants, 20% savings and investing.",
        ],
        "personal-Chặng 0": [
          "Most people running their first net worth audit forget to add a phone installment or a loan from a friend - net worth usually comes out lower than expected because it's exactly the small, scattered debts that get missed.",
          "A behavioral finance finding worth knowing: Snowball users (paying off the smallest debt first) stick with the plan more often than Avalanche users, even though Avalanche saves more money - discipline beats optimization if you're prone to giving up.",
          "The most common mistake about risk tolerance: rating it while markets are calm. The real answer only shows up when your account is down 20% - that's when you find out whether your self-assessment was right.",
          "A sinking fund and an emergency fund often get confused as the same thing - the difference is a sinking fund covers an expense you KNOW is coming (holidays, tuition), while an emergency fund covers what you CAN'T see coming.",
        ],
        "personal-Chặng 2": [
          "An index ETF tracks the whole market instead of betting on one company - low cost, diversified by design, and a fit for most individual investors.",
          "FOMO makes you buy right after a price has already surged out of fear of missing out - usually close to the top, not a good time to get in.",
          "DCA (dollar-cost averaging) isn't magic, just a disciplined way to reduce the risk of getting the timing wrong by spreading purchases over time.",
          "Taxes on investment gains and the discipline to take profit or cut losses matter just as much as picking the right stock.",
        ],
        "personal-Chặng 3": [
          "Bond prices and interest rates always move in opposite directions - when market rates rise, the bond you're holding drops in price.",
          "Government bonds are usually safer than corporate bonds, in exchange for a lower yield - the risk-return trade-off has no exceptions.",
          "Duration measures how sensitive a bond is to interest rates - the higher the duration, the more the price swings when rates change.",
          "Bonds aren't a 'risk-free' asset - there's still interest rate risk, credit risk, and inflation risk eating into real returns.",
        ],
        "personal-Chặng 4": [
          "Asset allocation drives most of a long-term portfolio's outcome - more than picking the right single stock.",
          "The closer you get to retirement, the more a portfolio should tilt toward stable assets - because there's less time left to recover from a sharp drop.",
          "Rebalancing a portfolio is essentially selling what has risen a lot and buying more of what's lagging - a discipline that runs against instinct.",
          "Insurance comes before investing in the priority order: an uninsured medical event can wipe out years of savings in just a few months.",
        ],
        "personal-Chặng 5": [
          "Warren Buffett once said he'd rather buy a wonderful company at a fair price than a fair company at a wonderful price - value investing doesn't mean buying whatever is cheap.",
          "An easy-to-miss check when assessing diversification: ask 'if bad news hit this ONE sector, how much of my portfolio gets hurt at once', not just count the number of tickers.",
          "A simple way to test your own confirmation bias: before buying, try writing down 2 reasons NOT to buy that stock. If you can't think of any, you probably haven't looked hard enough.",
          "A good metric at one company can still be a red flag if it comes from an unsustainable source - a high ROE from heavy debt is very different from a high ROE from efficient operations.",
        ],
        "personal-Chặng 6": [
          "FIRE (Financial Independence, Retire Early) is a real community that has worked out their financial-independence number in detail - not a vague idea, but a calculation anyone can do.",
          "Sequence of returns risk is easy to overlook: a sharp market drop in the first 2-3 years of retirement is far more dangerous than the same size drop in year 20, even though the percentage loss is identical.",
          "The fastest way to spot a financial scam: ask 'if this strategy really worked and were safe, why would they need to recruit more people instead of quietly getting rich on their own'.",
          "In many families, inheritance disputes aren't about a lack of money but a lack of one clear conversation early on - the legal paperwork is only half the story.",
        ],
        "professional-Chặng 1": [
          "Accounting is the language of business, as Warren Buffett put it. Reading financial statements is the single most important skill in finance.",
          "Accrual accounting: revenue is recorded at the sale, not when cash is collected. That's why a P&L can look great while the bank account is empty.",
          "The accounting equation: Assets equal Liabilities plus Equity. Those three terms explain every financial transaction, with no exceptions.",
          "Debits and credits aren't good or bad, just two sides of the same double-entry transaction.",
        ],
        "professional-Chặng 2": [
          "The three financial statements are three different lenses: the P&L shows what the business earns, the balance sheet shows what it owns, the cash flow statement shows where cash actually goes.",
          "If you can only read one statement, read the cash flow statement. Profit can be dressed up, but cash in the bank can't.",
          "Gross margin is the first metric to check when reading a P&L; it reveals a company's real pricing power and moat.",
          "The balance sheet must always balance. If it doesn't, the accounting is wrong. That's a rule with no exceptions.",
        ],
        "professional-Chặng 3": [
          "A high ROE isn't automatically good if it comes from leverage. DuPont splits ROE into three parts: margin times turnover times leverage, which is where the real quality shows up.",
          "Comparing P/E across different industries is like comparing apples to oranges - it's meaningless. Always compare within the same industry and against history.",
          "EV/EBITDA works better than P/E when comparing companies with different capital structures because it strips out the effect of taxes, interest, and depreciation.",
          "A single metric on its own says nothing. The meaning comes from its trend over time and how it compares to peers.",
        ],
        "professional-Chặng 4": [
          "A dollar today is worth more than a dollar next year because you can invest it. That's the foundation of every quantitative financial decision.",
          "Compound interest: 100 million growing 10% a year becomes 1.7 billion after 30 years. Starting 5 years earlier matters more than investing 50% more.",
          "NPV above zero: the investment creates value. NPV below zero: it destroys value. Every investment decision reduces to this one question.",
          "IRR is the rate that makes NPV zero. If IRR is above WACC: invest. If IRR is below WACC: reject. This is how a CEO thinks when reviewing a project.",
        ],
        "professional-Chặng 5": [
          "A CFO's three decisions: where to invest, how to finance it, and how to return cash to shareholders. All of it aims at maximizing value.",
          "Debt carries a tax shield because interest is tax-deductible. But too much debt raises bankruptcy costs. The optimal structure balances the two.",
          "70% of M&A deals fail to meet expectations: phantom synergies, culture clashes, failed integration. Buyers routinely overpay.",
          "LTV/CAC of 3 or higher is the minimum benchmark for a startup. Below 1 means acquiring customers at a loss.",
        ],
        "professional-Chặng 6": [
          "Intrinsic value differs from market price. Price is what you pay, value is what you get; the gap between them is the margin of safety.",
          "DCF is highly sensitive to WACC and g. A 1% change can shift the valuation by 20 to 30%. Always run a sensitivity analysis.",
          "A wide moat means a high ROIC sustained for years. Look for a company with ROIC consistently above WACC for 10 years - that's a real moat.",
          "Earnings quality: net income rising while operating cash flow falls is a red flag worth investigating. Profit can be managed, cash can't.",
        ],
        "professional-Chặng 7": [
          "Bond prices and interest rates move inversely - an iron law of fixed income. When the Fed raises rates, the whole bond portfolio loses value.",
          "Duration measures how sensitive a bond's price is to interest rates. A duration of 7 means a 1% rate rise cuts the price by roughly 7%. Managing duration is managing risk.",
          "Investment Grade vs High Yield: HY spreads widen 6 to 12 months before a recession, making them an important economic indicator.",
          "An inverted yield curve has preceded every US recession since 1955, with roughly 80% accuracy.",
        ],
        "professional-Chặng 8": [
          "Asset allocation drives 90% of a portfolio's return, not stock picking or market timing.",
          "Diversification removes unsystematic risk but not systematic risk. 20 to 30 stocks is usually enough.",
          "Loss aversion: the pain of losing a million feels roughly twice as strong as the joy of gaining a million, which pushes investors toward bad decisions.",
          "80% of active fund managers fail to beat the index over 15 years. A low-cost ETF plus monthly DCA is the simple answer.",
        ],
        "professional-Chặng 9": [
          "Derivatives aren't inherently risky; the risk depends on how they're used. Hedging fuel prices reduces risk. Leveraged speculation increases it.",
          "Options let you buy insurance for a portfolio: a protective put is the right to sell a stock at a fixed price if the market falls.",
          "An interest rate swap exchanges floating-rate interest for fixed-rate. Companies use it to remove exposure to rate swings.",
          "After 200 lessons, finance boils down to a set of mental models: DCF for value, WACC for opportunity cost, portfolio theory for risk and correlation.",
        ],
        "professional-Chặng 10": [
          "An LBO uses debt leverage to amplify returns on equity - if the business performs well, ROE jumps; if it doesn't, bankruptcy risk rises just as fast.",
          "M&A synergies are usually oversold during negotiations and rarely fully realized - most of a deal's value is lost in post-merger integration.",
          "Accretion/dilution analysis answers one question: does this M&A deal raise or lower the acquirer's EPS - which depends on how it's financed (cash, debt, or new shares).",
          "An exit strategy (IPO, sale, or special dividend) has to be on a private equity investor's mind from day one, not once it's time to exit.",
        ],
        "professional-Chặng 13": [
          "AI in finance doesn't replace financial thinking; it amplifies people who know how to ask questions, verify sources, and understand what the numbers mean.",
          "A good prompt needs a role, data, a task, an output format, and a source constraint - miss any one piece and the output tends to look good while being hard to actually use.",
          "When using AI to read financial statements, make it cite the page or line for every number and say 'data not found' when the document doesn't have it.",
          "AI is strongest inside a workflow: reading documents, pulling out numbers, spotting risks, drafting a first pass; the final investment decision still needs a human to own it.",
        ],
        bonus: [
          "A real case study is where theory meets messy reality - real company numbers are rarely as tidy as a textbook example.",
          "Reading a real company's financial statements is a different experience from reading a worked example - there's always industry context, an economic cycle, and management decisions hiding behind the numbers.",
          "Analyzing a specific deal or company is the best way to check whether you actually understand a concept or just memorized its definition.",
          "No company is a perfect subject to analyze - every case has its own blind spot, and the point is learning to spot what that blind spot is.",
        ],
      },
    },

    rpgInventory: {
      items: {
        suit_armani: {
          name: "Armani Executive Suit",
          description: "A luxury business suit that adds +45 Valuation Power and Wall Street poise.",
        },
        watch_rolex: {
          name: "Rolex Submariner Gold",
          description: "A gold-plated Swiss watch that boosts financial-statement reading speed by +40%.",
        },
        glasses_bloomberg: {
          name: "Bloomberg Terminal Glasses",
          description: "Glasses that see straight through cash flow and financial metrics in real time.",
        },
        pen_gold: {
          name: "Golden M&A Signing Pen",
          description: "A gold-plated fountain pen made for closing multi-million-dollar M&A deals.",
        },
        potion_x2xp: {
          name: "Wall Street 2X XP Potion (24H)",
          description: "Doubles all XP earned from completing lessons and quizzes.",
        },
        card_vinamilk: {
          name: "Vinamilk (VNM) Corporate Card",
          description: "A stock card for Vietnam's leading consumer-goods company.",
        },
      },
      rarityLabels: {
        "Thường": "Common",
        "Hiếm": "Rare",
        "Huyền Thoại": "Legendary",
      },
    },

    scrollytelling: {
      panels: {
        panel0: {
          tag: "01 / DESIGN PRINCIPLES",
          badge: "1. Why learners stay",
          title: "Why do 92% of learners keep up their daily habit?",
          subtitle: "Solving the 4 biggest psychological barriers to self-taught finance through lean product design.",
          items: [
            { title: "Beats forgetting", desc: "Spaced repetition automatically resurfaces a review right before you'd forget it." },
            { title: "100% free, forever", desc: "No expensive paywall hiding behind it. Completely free to learn." },
            { title: "A clear path", desc: "Broken into stages, step by step, from the basics to reading financial statements." },
            { title: "Measured, not guessed", desc: "Active-recall quizzes plus an XP leaderboard show exactly how well you understood a lesson." },
          ],
        },
        panel1: {
          tag: "02 / THE SCIENCE",
          badge: "2. The method",
          title: "Spaced Repetition & Active Recall - learn less, remember longer",
          subtitle: "A memory method built around the brain's forgetting curve.",
          items: [
            { title: "5-7 minutes a lesson", desc: "Short lessons, each focused on exactly one core concept." },
            { title: "Active recall", desc: "Quizzes force your brain to actively retrieve what it just learned." },
            { title: "Reviews at the right time", desc: "Spaced-repetition questions resurface automatically after roughly 5 more lessons." },
            { title: "Makes it second nature", desc: "Turns theory into the reflex of actually reading a financial statement." },
          ],
        },
        panel2: {
          tag: "03 / WHO IT'S FOR",
          badge: "3. Who it's for",
          title: "A path designed around who you are",
          subtitle: "Whether you're starting from zero or need to formalize deep expertise.",
          items: [
            { title: "Personal finance", tag: "Cash flow", desc: "For anyone who wants to manage money, save, and invest safely." },
            { title: "CFA candidates", tag: "Candidates", desc: "For building a solid theoretical foundation and sharp recall of it." },
            { title: "Financial planners", tag: "Advisory", desc: "For formalizing a rigorous financial-planning framework." },
            { title: "Individual investors", tag: "Equities", desc: "For mastering how to read financial ratios and dissect a company." },
          ],
        },
      },
    },

    toolsIndex: {
      eyebrow: "Financial Tools & Valuation",
      title: "Put the numbers to work",
      subtitle: "Personal-finance simulations and CFA-standard business valuation.",
      loading: "Loading...",
      tabs: {
        netWorth: "Net Worth",
        budget: "50/30/20 Budget",
        emergencyFund: "Emergency Fund",
        compoundInterest: "Compound Interest",
        firePlanner: "FIRE Planner",
        valuationDcf: "DCF & WACC Valuation",
      },
    },
  },
};
