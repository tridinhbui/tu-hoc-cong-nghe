// Chữ của các trang bài học VIẾT TAY dưới app/bai-hoc/<slug>/, khoá theo slug.
//
// VÌ SAO CHÚNG KHÔNG DÙNG ĐƯỜNG DỊCH BÀI HỌC. `lib/lessons-i18n/` chỉ đắp lên
// bài trong `lib/lessons.ts`; năm trang này viết nội dung thẳng vào JSX và
// không bao giờ gọi `getLessonBySlug`. `scripts/build-translation-index.mjs`
// còn CHẶN BUILD nếu ai đó đặt một bản dịch cho slug có trang viết tay - vì
// Next phục vụ trang bespoke trước, nên bản dịch sẽ nằm trong repo trông như
// đã xong mà không đổi một chữ nào. Từ điển là đường duy nhất còn lại.
//
// KHÔNG dịch ở đây - và ba nhóm dưới đây là ba lý do KHÁC NHAU:
//
//   - Chuỗi vốn đã là tiếng Anh trong bản gốc: "LBO Capital Structure
//     Simulator", "MOIC (equity return)", và tên bốn nguồn vốn ("Cash on
//     Hand", "Debt Financing"...). Đưa chúng vào đây tạo ra một cặp giá trị
//     giống hệt nhau giữa hai ngôn ngữ, mà dictionary-parity không phân biệt
//     được với một bản dịch bị bỏ quên - nó đã bắt đúng cả ba. Chúng sống
//     thành hằng số trong chính trang, cạnh mảng emoji.
//   - `difficulty` ("Dễ" / "Trung bình" / "Khó") là một union tiếng Việt dùng
//     làm GIÁ TRỊ khắp ứng dụng; giao diện render nó qua `t.difficulty[...]`.
//   - `duration` ("8 phút") được `LessonPageLayout` parse lấy con số để ghi
//     thời gian học; chữ "phút" không hiện nguyên dạng.
//   - `slug`, `id`, `accent`, `nextSlug`: cấu trúc và định tuyến.
//
// `options` của quiz LÀ THEO VỊ TRÍ - `correct` là chỉ số vào mảng gốc, và
// `LessonPageLayout` ghi `quiz_score` xuống Supabase như mọi bài khác. Xáo thứ
// tự khi dịch làm sai ĐÁP ÁN, không phải sai chữ. Cùng luật với
// lib/lessons-i18n; xem AGENTS.md, mục "Translating lessons", luật số 2.
//
// Hai trang, cả hai đã dịch xong: source-cash-ma và cac-loai-debt.
//
// Ba trang viết tay còn lại đã được DI TRÚ về lib/lessons.ts và xoá khỏi
// app/bai-hoc/ trong lúc lượt này đang chạy, nên chúng đi theo đường dịch bài
// học chuẩn (lib/lessons-i18n/) chứ không qua tệp này. Đó là cách sửa GỐC cho
// khiếm khuyết mà chú thích trong mỗi trang từng ghi lại: id giả kiểu 9004 làm
// tiến độ, XP và ghi chú đổ sang một bài khác có thật. Nếu hai trang còn lại
// cũng được di trú thì tệp này biến mất theo.

export const bespokeLessonsVi = {
  bespokeLessons: {
    "cac-loai-debt": {
      title: "Các Loại Debt Cần Biết",
      subtitle: "9 loại nợ, capital structure và thứ tự ưu tiên thanh toán",
      nextTitle: "Day 6: Báo Cáo LCTT",
      heading: "Không phải mọi khoản nợ đều giống nhau",
      intro:
        "Khi nói về \"nợ\" của một doanh nghiệp, hầu hết người mới bắt đầu nghĩ đó là một con số duy nhất trên bảng cân đối. Thực tế, debt là một bức tranh đa tầng với ít nhất 9 loại khác nhau - mỗi loại có rủi ro, lãi suất, và thứ tự ưu tiên hoàn toàn khác.",
      intro2:
        "Hiểu điều này giúp bạn: (1) đọc balance sheet đúng hơn, (2) hiểu tại sao lãi suất khác nhau, (3) biết ai bị thiệt nhất khi công ty gặp khó khăn.",
      ruleHeading: "Quy tắc vàng: Risk ↔ Return",
      ruleLead: "Trước khi đi vào từng loại, hãy ghi nhớ một quy tắc bất biến trong finance:",
      ruleBanner: "Rủi ro càng cao → Lợi suất yêu cầu càng cao",
      ruleNote:
        "Không ai cho vay với rủi ro cao mà chấp nhận lãi suất thấp. Đây là lý do mezzanine trả 18% trong khi senior secured chỉ 5%.",
      typesHeading: "9 loại Debt",
      rateSuffix: "{tag} · Lãi ~{rate}%",
      waterfallHeading: "🏗️ Capital Structure Waterfall - Ai được trả khi phá sản?",
      scenarioNormal: " Bình thường (Tài sản 600 tỷ)",
      scenarioDistress: "🔥 Khó khăn (Tài sản 280 tỷ)",
      payoutLine: "{paid}/{total} tỷ",
      verdictNormal:
        " Tài sản 600 tỷ > Tổng nợ 450 tỷ → Tất cả được trả đầy đủ. Cổ đông nhận thêm 150 tỷ.",
      verdictDistress:
        "🔥 Tài sản 280 tỷ < Tổng nợ 450 tỷ → Senior secured đủ, từ tầng 3 trở đi: không còn tiền. Cổ đông mất trắng.",
      lboHeading: "LBO - Ứng dụng thực tế của capital structure",
      lboLead:
        "Leveraged Buyout (LBO) là thương vụ điển hình nhất để thấy capital structure trong hành động. PE firm mua lại công ty bằng cách kết hợp nhiều tầng nợ và ít equity nhất có thể - để khuếch đại ROI cho equity.",
      lboTableTitle: "Cấu trúc LBO điển hình - Mua công ty 1,000 tỷ",
      lboAmounts: ["500 tỷ", "200 tỷ", "100 tỷ", "200 tỷ"],
      lboEquityRate: "Target 25%+ IRR",
      lboNote:
        "PE dùng nhiều nợ để mua - nếu bán lại sau 5 năm với giá 1,500 tỷ: equity tăng từ 200 → 700 tỷ = 3.5x, tương đương ~28% IRR.",
      takeawayHeading: " 3 điều cần nhớ",
      takeaways: [
        "Risk ↔ Return: secured senior lãi thấp nhất, mezzanine/equity lãi cao nhất",
        "Waterfall ưu tiên: Senior Secured → Senior Unsecured → Sub → Equity - ai đứng cuối mất nhiều nhất khi phá sản",
        "Hiểu capital structure = hiểu tại sao mỗi loại nợ có giá (lãi suất) khác nhau",
      ],
      debtTypes: [
        { tag: "Có tài sản đảm bảo", desc: "Người vay thế chấp tài sản cụ thể (nhà máy, bất động sản, phải thu). Nếu không trả được, chủ nợ thu hồi tài sản đó. Rủi ro thấp → lãi suất thấp nhất trong cấu trúc vốn.", eg: "Vay ngân hàng thế chấp sổ đỏ, vay mua ô tô thế chấp xe" },
        { tag: "Không tài sản đảm bảo", desc: "Không có tài sản cụ thể làm đảm bảo. Nếu vỡ nợ, chủ nợ phải xếp hàng tranh chấp tài sản còn lại. Rủi ro cao hơn → lãi cao hơn.", eg: "Thẻ tín dụng, trái phiếu doanh nghiệp không có tài sản đảm bảo" },
        { tag: "Ưu tiên trả trước", desc: "Được ưu tiên thanh toán trước tất cả trong thứ tự phân phối khi phá sản. Không nhất thiết có tài sản đảm bảo - senior đề cập đến thứ tự ưu tiên, không phải loại đảm bảo.", eg: "Term loan từ ngân hàng thường là senior secured - vừa có tài sản vừa ưu tiên" },
        { tag: "Đứng sau senior", desc: "Chỉ được thanh toán sau khi senior debt đã được trả đầy đủ. Trong LBO, thường là junior bonds hoặc PIK notes. Rủi ro thực sự cao hơn → spread 3-5% so với senior.", eg: "Junior bonds, PIK notes, second-lien loans trong LBO" },
        { tag: "Hạn mức quay vòng", desc: "Như thẻ tín dụng cho doanh nghiệp. Có hạn mức tối đa, rút ra khi cần, trả lại rồi có thể rút tiếp. Linh hoạt nhất trong các loại debt, thường dùng cho vốn lưu động.", eg: "Retailer dùng revolver nhập hàng trước Tết, sau bán xong trả lại" },
        { tag: "Vay có kỳ hạn cố định", desc: "Vay một lần, trả dần theo lịch định sẵn (monthly/quarterly). Không rút lại được sau khi trả. Dùng để mua tài sản cố định hoặc tài trợ M&A.", eg: "Vay 5 năm mua dây chuyền sản xuất, trả gốc + lãi mỗi quý" },
        { tag: "Chuyển được thành cổ phần", desc: "Người cho vay có quyền chuyển khoản nợ thành cổ phần. Lãi thấp hơn debt thông thường nhưng investor được upside. Phổ biến ở startup vì tránh định giá sớm.", eg: "Startup huy động $1M convertible note, lãi 6%, convert ở Series A với 20% discount" },
        { tag: "Vay từ thị trường vốn", desc: "Doanh nghiệp/chính phủ phát hành ra thị trường, nhiều nhà đầu tư mua. Lãi coupon cố định, hoàn gốc khi đáo hạn. Phân tán rủi ro, không cần qua ngân hàng.", eg: "Vingroup phát hành trái phiếu 3,000 tỷ lãi 10%/năm kỳ hạn 3 năm" },
        { tag: "Lai giữa nợ và vốn", desc: "Đứng giữa senior debt và equity. Lãi suất rất cao (15-25%) hoặc có equity kicker (warrants). Phổ biến trong LBO để 'lấp chỗ trống' khi ngân hàng không cho vay thêm.", eg: "PE dùng mezz trong LBO: senior 50% + mezz 20% + equity 30%" },
      ],
      quiz: [
        {
          question: "Tại sao Secured Debt có lãi suất thấp hơn Unsecured Debt?",
          options: [
            "Vì ngân hàng ưu tiên doanh nghiệp lớn, và secured debt hầu hết là của họ",
            "Vì secured debt luôn có kỳ hạn ngắn hơn nên rủi ro ít hơn",
            "Vì có tài sản đảm bảo nên chủ nợ thu hồi được khi vỡ nợ",
            "Vì lãi suất secured debt được nhà nước hỗ trợ một phần",
          ],
          explanation: "Risk-return luôn tỷ lệ thuận. Secured debt có tài sản đảm bảo → rủi ro thu hồi thấp → người cho vay chấp nhận lãi thấp hơn. Đây là nguyên tắc cốt lõi của tín dụng.",
        },
        {
          question: "Trong capital structure waterfall, thứ tự ưu tiên đúng là:",
          options: [
            "Equity → Senior Secured → Senior Unsecured → Subordinated",
            "Subordinated → Senior Unsecured → Senior Secured → Equity",
            "Equity → Mezzanine → Senior Unsecured → Senior Secured",
            "Senior Secured → Senior Unsecured → Subordinated → Equity",
          ],
          explanation: "Khi phá sản, Senior Secured được trả trước (có tài sản đảm bảo + ưu tiên cao), sau đó Senior Unsecured, rồi Subordinated/Mezz, cuối cùng mới đến Equity (cổ đông). Thứ tự này quyết định lãi suất của từng lớp.",
        },
        {
          question: "Revolving Credit Facility (Revolver) khác Term Loan ở điểm gì?",
          options: [
            "Revolver là hạn mức quay vòng, Term Loan giải ngân một lần",
            "Revolver có lãi suất cố định còn Term Loan thì thả nổi theo kỳ",
            "Revolver chỉ dành cho doanh nghiệp nhà nước và tập đoàn lớn",
            "Term Loan không tính lãi trên dư nợ, Revolver thì có tính",
          ],
          explanation: "Revolver giống thẻ tín dụng doanh nghiệp - có hạn mức tối đa, rút khi cần, trả lại rồi rút tiếp. Linh hoạt, dùng cho vốn lưu động. Term Loan là khoản vay một lần, trả dần theo lịch cố định.",
        },
        {
          question: "Convertible Note trong startup có đặc điểm gì?",
          options: [
            "Là trái phiếu chính phủ phát hành riêng cho công ty khởi nghiệp",
            "Là một dạng cổ phần không kèm quyền biểu quyết của cổ đông",
            "Là khoản nợ không tính lãi, trả bằng tiền khi đáo hạn",
            "Là khoản vay chuyển đổi thành cổ phần ở vòng huy động sau",
          ],
          explanation: "Convertible note là debt có thể convert thành equity ở vòng sau (thường với discount 20%). Win-win: startup vay được tiền lãi thấp hơn, investor được upside nếu startup tăng trưởng mạnh.",
        },
        {
          question: "Mezzanine Debt phù hợp nhất trong tình huống nào?",
          options: [
            "Khi doanh nghiệp muốn vay với lãi suất thấp nhất có thể",
            "Khi PE cần lấp khoảng giữa senior debt và equity trong LBO",
            "Khi một startup vòng hạt giống cần vốn mà chưa có tài sản",
            "Khi chính phủ phát hành trái phiếu để tài trợ hạ tầng công",
          ],
          explanation: "Mezzanine lấp khoảng trống trong capital structure của LBO. Ngân hàng chỉ cho vay đến một mức nhất định (senior debt). Phần còn lại muốn dùng debt thay equity → mezz với lãi 15-20% và thường có equity kicker (warrants).",
        },
      ],
    },
    "source-cash-ma": {
      title: "Source of Cash trong M&A",
      subtitle: "Tiền mua lại doanh nghiệp đến từ đâu?",
      nextTitle: "Synergy trong M&A",
      heading: "Source of Cash trong M&A",
      intro: "Tiền mua acquisition đến từ đâu - và cấu trúc nào tối ưu hóa return?",
      sourcesHeading: "💰 4 nguồn vốn chính trong M&A",
      debtShareLabel: "Tỷ lệ Debt ({debt}% / {equity}% equity)",
      dealSizeLabel: "Deal Size: {size} tỷ",
      equityShare: "{pct}% Equity",
      debtShare: "{pct}% Debt",
      equityCaption: "Equity (PE fund)",
      debtCaption: "Debt (bank/bond)",
      exitAssumption: "Sau 5 năm (giả định EBITDA +50%, trả 50% nợ):",
      exitEvLabel: "Exit EV ({multiple}x × {ebitda} tỷ EBITDA)",
      remainingDebtLabel: "Remaining Debt",
      billion: "{value} tỷ",
      checklistHeading: "📋 Checklist khi phân tích deal financing",
      sources: [
        {
          desc: "Dùng tiền mặt sẵn có trên bảng cân đối. Đơn giản nhất, không dilute shareholders.",
          example: "Apple mua lại startup AI bằng cash reserve hàng trăm tỷ USD",
          pro: "Không dilution, execution nhanh",
          con: "Cơ hội cost cao nếu có use tốt hơn",
        },
        {
          desc: "Vay ngân hàng hoặc phát hành bond để tài trợ acquisition. Dùng leverage để amplify return.",
          example: "LBO: PE fund vay 60-70% deal size từ bank syndicate",
          pro: "Leverage tăng equity return, lãi được khấu trừ thuế",
          con: "Tăng rủi ro tài chính, ICR phải maintain",
        },
        {
          desc: "Phát hành cổ phiếu mới của bên mua để trả cho bên bán. Bên bán trở thành cổ đông.",
          example: "Merger of equals: hai công ty lớn sáp nhập, trao đổi cổ phiếu",
          pro: "Không cần tiền mặt, có thể tax-advantaged cho bên bán",
          con: "Dilute existing shareholders",
        },
        {
          desc: "Kết hợp cash + stock + earnout (phần trả thêm nếu đạt KPI tương lai).",
          example: "Mua startup: 70% cash khi close + 30% earnout sau 2 năm nếu đạt revenue target",
          pro: "Bridge valuation gap giữa bên mua và bên bán",
          con: "Phức tạp trong thực thi và monitoring",
        },
      ],
      checklist: [
        "Bên mua có đủ tiền/capacity để thực hiện deal không?",
        "Debt/EBITDA post-deal sẽ là bao nhiêu? Lender comfortable không?",
        "Deal accretive hay dilutive cho EPS bên mua?",
        "Tax implications cho cả hai bên?",
        "Integration cost và synergy realization timeline?",
      ],
      quiz: [
        {
          question: "Trong Leveraged Buyout (LBO), 'leverage' đề cập đến điều gì?",
          options: [
            "Đòn bẩy thương lượng của bên mua trên bàn đàm phán",
            "Khả năng đẩy giá bán lại lên sau khi mua",
            "Phương pháp định giá doanh nghiệp thường dùng",
            "Phần lớn giá mua được tài trợ bằng nợ vay",
          ],
          explanation: "LBO dùng leverage (nợ) để amplify equity return. PE fund bỏ 30-40% equity, còn lại 60-70% là debt được tài trợ bởi lender (thường là bank và institutional investors).",
        },
        {
          question: "All-cash deal vs all-stock deal: bên bán thích deal nào hơn về mặt thuế?",
          options: [
            "All-stock, vì phần thuế được hoãn tới khi bán cổ phần",
            "All-cash - nhận tiền ngay, chắc chắn",
            "Hai deal ngang nhau, vì thuế tính trên cùng một khoản lãi",
            "Phụ thuộc luật từng nước nên không có câu trả lời chung",
          ],
          explanation: "Stock-for-stock deal trong nhiều jurisdiction được xử lý như tax-free reorganization - bên bán không phải trả thuế capital gain ngay, chỉ trả khi bán cổ phiếu nhận được từ bên mua.",
        },
        {
          question: "Accretive deal là gì?",
          options: [
            "Deal có synergy cao nên tổng lợi nhuận hai bên tăng",
            "Bên bán đồng ý bán với giá thấp hơn market",
            "EPS của bên mua tăng sau thương vụ",
            "Deal được thực hiện và hoàn tất rất nhanh chóng",
          ],
          explanation: "Accretive: EPS post-deal > EPS pre-deal. Dilutive: ngược lại. Trong stock deal, bên mua phát hành cổ phiếu mới (dilution) - deal accretive khi earnings từ target bù đắp được dilution.",
        },
        {
          question: "Tại sao PE fund dùng LBO thay vì all-equity deal?",
          options: [
            "Để giữ lại tiền mặt của quỹ cho thương vụ khác",
            "Nợ khuếch đại lợi suất trên phần vốn tự bỏ",
            "Lender yêu cầu PE phải dùng debt trong mọi deal",
            "All-equity deal không được phép trong PE",
          ],
          explanation: "Ví dụ: mua 1.000 tỷ. All-equity: sau 5 năm bán 1.500 tỷ → return 50%. LBO (300 tỷ equity + 700 tỷ debt, sau 5 năm trả 400 tỷ nợ, bán 1.500 tỷ): equity return = (1.500-300)/300 - 1 = 300%. Leverage amplifies return.",
        },
        {
          question: "Earnout trong M&A là gì?",
          options: [
            "Phần giá mua phụ thuộc vào performance tương lai của target",
            "Khoản tiền bên bán phải trả lại nếu business không đạt target",
            "Lãi suất tính trên phần tiền trả chậm",
            "Cổ phiếu bên mua tặng cho management target",
          ],
          explanation: "Earnout = một phần của deal consideration được trả sau dựa trên performance metrics (revenue, EBITDA). Dùng khi bên mua và bên bán không đồng ý về giá trị tương lai - chia sẻ rủi ro.",
        },
      ],
    },
  } as Record<string, BespokeLessonCopy>,
};

// Năm trang có năm bố cục khác nhau, nên chỉ phần CHUNG là bắt buộc; phần
// riêng của từng trang để tuỳ chọn. Trang tự biết nó cần trường nào, còn
// lib/__tests__/bespoke-lessons-i18n.test.ts kiểm rằng mọi mảng của một slug
// khớp độ dài giữa hai bản - đó mới là ràng buộc quan trọng, vì `correct` của
// quiz là chỉ số vào chính những mảng đó.
export interface BespokeLessonCopy {
  title: string;
  subtitle: string;
  nextTitle: string;
  heading: string;
  intro: string;
  sourcesHeading?: string;
  debtShareLabel?: string;
  dealSizeLabel?: string;
  equityShare?: string;
  debtShare?: string;
  equityCaption?: string;
  debtCaption?: string;
  exitAssumption?: string;
  exitEvLabel?: string;
  remainingDebtLabel?: string;
  billion?: string;
  checklistHeading?: string;
  sources?: { desc: string; example: string; pro: string; con: string }[];
  checklist?: string[];
  answerParagraphs?: { text: string; style: string }[][];
  recipeHeading?: string;
  recipe?: string[];
  selectorHeading?: string;
  selectorHint?: string;
  selectorEmpty?: string;
  selectorWhen?: string;
  selectorCompanies?: string;
  selectorWhy?: string;
  selectorWeakness?: string;
  methods?: { when: string; companies: string; why: string; weakness: string }[];
  mistakesHeading?: string;
  mistakes?: { mistake: string; bad: string; fix: string }[];
  onelinerHeading?: string;
  onelinerNote?: string;
  /** cac-loai-debt */
  intro2?: string;
  ruleHeading?: string;
  ruleLead?: string;
  ruleBanner?: string;
  ruleNote?: string;
  typesHeading?: string;
  rateSuffix?: string;
  waterfallHeading?: string;
  scenarioNormal?: string;
  scenarioDistress?: string;
  payoutLine?: string;
  verdictNormal?: string;
  verdictDistress?: string;
  lboHeading?: string;
  lboLead?: string;
  lboTableTitle?: string;
  lboAmounts?: string[];
  lboEquityRate?: string;
  lboNote?: string;
  takeawayHeading?: string;
  takeaways?: string[];
  debtTypes?: { tag: string; desc: string; eg: string }[];
  quiz: { question: string; options: string[]; explanation: string }[];
}

export const bespokeLessonsEn: typeof bespokeLessonsVi = {
  bespokeLessons: {
    "cac-loai-debt": {
      title: "The Types of Debt Worth Knowing",
      subtitle: "Nine kinds of debt, the capital structure, and who gets paid first",
      nextTitle: "Day 6: The Cash Flow Statement",
      heading: "Not all debt is the same",
      intro:
        "When people talk about a company's \"debt\", most beginners picture a single number on the balance sheet. In reality debt is a layered picture with at least nine different kinds - each with its own risk, its own interest rate and its own place in the queue.",
      intro2:
        "Understanding this lets you: (1) read a balance sheet more accurately, (2) see why the interest rates differ, and (3) know who loses most when the company runs into trouble.",
      ruleHeading: "The golden rule: Risk ↔ Return",
      ruleLead: "Before going through the types, hold on to one rule that never bends in finance:",
      ruleBanner: "The higher the risk → the higher the return demanded",
      ruleNote:
        "Nobody lends into high risk and accepts a low rate. That is why mezzanine pays 18% while senior secured pays 5%.",
      typesHeading: "The nine types of debt",
      rateSuffix: "{tag} · around {rate}% interest",
      waterfallHeading: "🏗️ The Capital Structure Waterfall - who gets paid in a bankruptcy?",
      scenarioNormal: " Normal (assets 600bn)",
      scenarioDistress: "🔥 Distress (assets 280bn)",
      payoutLine: "{paid}/{total}bn",
      verdictNormal:
        " Assets 600bn > total debt 450bn → everyone is paid in full. Shareholders take the remaining 150bn.",
      verdictDistress:
        "🔥 Assets 280bn < total debt 450bn → senior secured is covered; from the third layer down there is nothing left. Shareholders get zero.",
      lboHeading: "The LBO - capital structure in the real world",
      lboLead:
        "A Leveraged Buyout is the clearest place to see a capital structure in action. The PE firm buys the company using as many layers of debt and as little equity as it can - to amplify the return on that equity.",
      lboTableTitle: "A typical LBO structure - buying a company for 1,000bn",
      lboAmounts: ["500bn", "200bn", "100bn", "200bn"],
      lboEquityRate: "Target 25%+ IRR",
      lboNote:
        "The PE firm buys with a lot of debt - sell it five years later for 1,500bn and the equity goes from 200 to 700bn = 3.5x, roughly a 28% IRR.",
      takeawayHeading: " Three things to remember",
      takeaways: [
        "Risk ↔ Return: senior secured pays the least, mezzanine and equity the most",
        "The waterfall: Senior Secured → Senior Unsecured → Subordinated → Equity - whoever stands last loses the most in a bankruptcy",
        "Understanding the capital structure means understanding why each kind of debt has its own price",
      ],
      debtTypes: [
        { tag: "Backed by collateral", desc: "The borrower pledges specific assets (a plant, property, receivables). If they cannot repay, the lender takes those assets. Low risk → the lowest rate in the capital structure.", eg: "A bank loan against a property title, or a car loan secured on the car" },
        { tag: "No collateral", desc: "No specific asset backs it. On default the lender joins the queue for whatever is left. Higher risk → higher rate.", eg: "Credit cards, and corporate bonds issued without security" },
        { tag: "Paid first", desc: "Paid ahead of everything else in the bankruptcy waterfall. Not necessarily secured - senior refers to priority in the queue, not to collateral.", eg: "A bank term loan is usually senior secured - both collateralised and senior" },
        { tag: "Ranks behind senior", desc: "Paid only after senior debt has been repaid in full. In an LBO this is usually junior bonds or PIK notes. Genuinely higher risk → a 3-5% spread over senior.", eg: "Junior bonds, PIK notes and second-lien loans in an LBO" },
        { tag: "A revolving limit", desc: "A credit card for companies. There is a maximum limit; draw when you need it, repay, and draw again. The most flexible kind of debt, usually used for working capital.", eg: "A retailer draws on the revolver to stock up before Tet, then repays once the stock is sold" },
        { tag: "A fixed-term loan", desc: "Drawn once and repaid on a set schedule (monthly or quarterly). Cannot be re-drawn once repaid. Used to buy fixed assets or to fund M&A.", eg: "A five-year loan for a production line, repaying principal and interest each quarter" },
        { tag: "Convertible into shares", desc: "The lender has the right to convert the loan into equity. A lower rate than ordinary debt, but the investor gets the upside. Common with startups because it avoids pricing the company too early.", eg: "A startup raises a $1M convertible note at 6%, converting at Series A with a 20% discount" },
        { tag: "Borrowed from the market", desc: "A company or government issues into the market and many investors buy. Fixed coupon, principal returned at maturity. Spreads the risk, with no bank in between.", eg: "Vingroup issues 3,000bn of bonds at 10% a year over three years" },
        { tag: "Halfway between debt and equity", desc: "Sits between senior debt and equity. A very high rate (15-25%), or an equity kicker in the form of warrants. Common in LBOs to 'fill the gap' where the bank will not lend more.", eg: "PE uses mezz in an LBO: senior 50% + mezz 20% + equity 30%" },
      ],
      quiz: [
        {
          question: "Why does secured debt carry a lower rate than unsecured debt?",
          options: [
            "Because banks prefer large companies, and most secured debt is theirs",
            "Because secured debt always has a shorter maturity, so less risk",
            "Because collateral lets the lender seize the asset on default",
            "Because the state subsidises part of the rate on secured debt",
          ],
          explanation: "Risk and return always move together. Secured debt has collateral → a lower loss on default → the lender accepts a lower rate. That is the core principle of credit.",
        },
        {
          question: "In the capital structure waterfall, the correct order is:",
          options: [
            "Equity → Senior Secured → Senior Unsecured → Subordinated",
            "Subordinated → Senior Unsecured → Senior Secured → Equity",
            "Equity → Mezzanine → Senior Unsecured → Senior Secured",
            "Senior Secured → Senior Unsecured → Subordinated → Equity",
          ],
          explanation: "In a bankruptcy, senior secured is paid first (collateral plus priority), then senior unsecured, then subordinated and mezzanine, and only then equity. That order is what sets each layer's interest rate.",
        },
        {
          question: "How does a Revolving Credit Facility differ from a Term Loan?",
          options: [
            "A revolver is a revolving limit; a term loan is drawn once",
            "A revolver has a fixed rate while a term loan floats each period",
            "Revolvers are only available to state-owned firms and large groups",
            "Term loans charge no interest on the balance while revolvers do",
          ],
          explanation: "A revolver is a corporate credit card - a maximum limit, drawn when needed, repaid and drawn again. Flexible, and used for working capital. A term loan is drawn once and repaid on a fixed schedule.",
        },
        {
          question: "What characterises a convertible note in a startup?",
          options: [
            "It is a government bond issued specially for startup companies",
            "It is a form of equity that carries no shareholder voting rights",
            "It is a loan charging no interest, repaid in cash at maturity",
            "It is a loan that converts into equity at the next funding round",
          ],
          explanation: "A convertible note is debt that can convert into equity at a later round, usually at a 20% discount. Win-win: the startup borrows at a lower rate, and the investor keeps the upside if it grows.",
        },
        {
          question: "When is mezzanine debt the right fit?",
          options: [
            "When a company wants to borrow at the lowest possible rate",
            "When PE needs to fill the gap between senior debt and equity",
            "When a seed-round startup needs capital but holds no assets",
            "When a government issues bonds to fund public infrastructure",
          ],
          explanation: "Mezzanine fills the gap in an LBO's capital structure. The bank will only lend up to a point (senior debt). For the rest, using debt instead of equity means mezz at 15-20% with an equity kicker in warrants.",
        },
      ],
    },
    "source-cash-ma": {
      title: "Sources of Cash in M&A",
      subtitle: "Where does the money to buy a company come from?",
      nextTitle: "Synergy in M&A",
      heading: "Sources of Cash in M&A",
      intro: "Where the money for an acquisition comes from - and which structure maximises the return.",
      sourcesHeading: "💰 The four main funding sources in M&A",
      debtShareLabel: "Debt share ({debt}% / {equity}% equity)",
      dealSizeLabel: "Deal size: {size}bn",
      equityShare: "{pct}% Equity",
      debtShare: "{pct}% Debt",
      equityCaption: "Equity (PE fund)",
      debtCaption: "Debt (bank/bond)",
      exitAssumption: "After 5 years (assuming EBITDA +50% and half the debt repaid):",
      exitEvLabel: "Exit EV ({multiple}x × {ebitda}bn EBITDA)",
      remainingDebtLabel: "Remaining debt",
      billion: "{value}bn",
      checklistHeading: "📋 A checklist for analysing deal financing",
      sources: [
        {
          desc: "Using the cash already on the balance sheet. The simplest route, and it doesn't dilute shareholders.",
          example: "Apple buying an AI startup out of its hundreds of billions in cash reserves",
          pro: "No dilution, fast execution",
          con: "High opportunity cost if there is a better use for the cash",
        },
        {
          desc: "Borrowing from banks or issuing bonds to fund the acquisition. Leverage amplifies the return.",
          example: "An LBO: the PE fund borrows 60-70% of the deal size from a bank syndicate",
          pro: "Leverage raises the equity return, and the interest is tax deductible",
          con: "Higher financial risk, and the interest coverage ratio has to be maintained",
        },
        {
          desc: "Issuing new buyer shares to pay the seller. The seller becomes a shareholder.",
          example: "A merger of equals: two large companies combine by exchanging shares",
          pro: "No cash required, and it can be tax-advantaged for the seller",
          con: "Dilutes the existing shareholders",
        },
        {
          desc: "A mix of cash, stock and an earnout (an extra payment if future KPIs are met).",
          example: "Buying a startup: 70% cash at closing plus a 30% earnout after two years if the revenue target is hit",
          pro: "Bridges the valuation gap between buyer and seller",
          con: "Complex to execute and to monitor",
        },
      ],
      checklist: [
        "Does the buyer have the cash or the capacity to execute the deal?",
        "What will post-deal Debt/EBITDA be? Are the lenders comfortable with it?",
        "Is the deal accretive or dilutive to the buyer's EPS?",
        "What are the tax implications for both sides?",
        "What are the integration costs and the timeline for realising the synergies?",
      ],
      quiz: [
        {
          question: "In a Leveraged Buyout (LBO), what does 'leverage' refer to?",
          options: [
            "The buyer's negotiating leverage at the table",
            "The ability to push up the resale price after buying",
            "A commonly used company valuation method",
            "Most of the purchase price being funded by debt",
          ],
          explanation: "An LBO uses leverage (debt) to amplify the equity return. The PE fund puts up 30-40% as equity; the remaining 60-70% is debt provided by lenders, usually banks and institutional investors.",
        },
        {
          question: "All-cash versus all-stock: which does the seller prefer on tax grounds?",
          options: [
            "All-stock, because the tax is deferred until they sell",
            "All-cash - the money arrives now, with certainty",
            "They are equivalent, since the tax falls on the same gain",
            "It depends on each country's law, so there is no general answer",
          ],
          explanation: "In many jurisdictions a stock-for-stock deal is treated as a tax-free reorganisation - the seller owes no capital gains tax at closing, only when they sell the shares they received.",
        },
        {
          question: "What is an accretive deal?",
          options: [
            "A deal with such high synergies that both sides' profits rise",
            "The seller agrees to sell below the market price",
            "The buyer's EPS rises after the transaction",
            "A deal that is negotiated and closed very quickly",
          ],
          explanation: "Accretive: post-deal EPS > pre-deal EPS. Dilutive is the reverse. In a stock deal the buyer issues new shares (dilution) - the deal is accretive when the target's earnings more than cover that dilution.",
        },
        {
          question: "Why does a PE fund use an LBO rather than an all-equity deal?",
          options: [
            "To keep the fund's cash available for another deal",
            "Debt amplifies the return on the equity they put in",
            "Lenders require PE funds to use debt in every deal",
            "All-equity deals are not permitted in PE",
          ],
          explanation: "Take a 1,000bn purchase. All-equity: sell for 1,500bn after 5 years → a 50% return. LBO (300bn equity + 700bn debt, 400bn repaid over 5 years, sold at 1,500bn): equity return = (1,500-300)/300 - 1 = 300%. Leverage amplifies the return.",
        },
        {
          question: "What is an earnout in M&A?",
          options: [
            "The part of the price that depends on the target's future performance",
            "Money the seller must pay back if the business misses its stated targets",
            "Interest charged on the deferred portion of the price",
            "Buyer shares given to the target's management",
          ],
          explanation: "An earnout is part of the consideration paid later, based on performance metrics such as revenue or EBITDA. It is used when buyer and seller disagree about future value - it shares the risk.",
        },
      ],
    },
  },
};

/** Phần riêng của từng trang, thu hẹp lại thành BẮT BUỘC.
 *
 *  Trang ép kiểu về đây một lần ở đầu component thay vì kiểm `?.` ở ba mươi chỗ
 *  render. Phép ép đó an toàn nhờ lib/__tests__/bespoke-lessons-i18n.test.ts:
 *  nó kiểm từng slug có đủ trường của chính nó ở CẢ HAI ngôn ngữ, nên một
 *  trường thiếu làm đỏ build chứ không thành `undefined` trên màn hình. */
export interface SourceCashLessonCopy extends BespokeLessonCopy {
  remainingDebtLabel: string;
  sourcesHeading: string;
  debtShareLabel: string;
  dealSizeLabel: string;
  equityShare: string;
  debtShare: string;
  equityCaption: string;
  debtCaption: string;
  exitAssumption: string;
  exitEvLabel: string;
  billion: string;
  checklistHeading: string;
  sources: { desc: string; example: string; pro: string; con: string }[];
  checklist: string[];
}

export interface DebtLessonCopy extends BespokeLessonCopy {
  intro2: string;
  ruleHeading: string;
  ruleLead: string;
  ruleBanner: string;
  ruleNote: string;
  typesHeading: string;
  rateSuffix: string;
  waterfallHeading: string;
  scenarioNormal: string;
  scenarioDistress: string;
  payoutLine: string;
  verdictNormal: string;
  verdictDistress: string;
  lboHeading: string;
  lboLead: string;
  lboTableTitle: string;
  lboAmounts: string[];
  lboEquityRate: string;
  lboNote: string;
  takeawayHeading: string;
  takeaways: string[];
  debtTypes: { tag: string; desc: string; eg: string }[];
}

export interface ValuationMethodLessonCopy extends BespokeLessonCopy {
  answerHeading: string;
  answerPrompt: string;
  answerParagraphs: { text: string; style: string }[][];
  recipeHeading: string;
  recipe: string[];
  selectorHeading: string;
  selectorHint: string;
  selectorEmpty: string;
  selectorWhen: string;
  selectorCompanies: string;
  selectorWhy: string;
  selectorWeakness: string;
  methods: { when: string; companies: string; why: string; weakness: string }[];
  mistakesHeading: string;
  mistakes: { mistake: string; bad: string; fix: string }[];
  onelinerHeading: string;
  onelinerNote: string;
}
