export interface StagePart {
  name: string;
  days: [number, number];
  // Lesson ids to include in this part even though they fall outside the
  // contiguous `days` range - e.g. a bonus-track case study that belongs
  // topically in this part but can't be given a contiguous id here without
  // renumbering every lesson after it (which would break existing users'
  // progress, tracked by these exact ids).
  extraLessonIds?: number[];
}

export interface Stage {
  label: string;
  name: string;
  days: [number, number];
  available: boolean;
  parts: StagePart[];
  extraLessonIds?: number[];
  // Shows a "Mới" badge on the stage card. Manually flip off once a stage
  // has been live for a while - not time-based, so it won't silently expire.
  isNew?: boolean;
}

// True if `lesson` belongs to `range` either via the contiguous [start, end]
// day span or via `range`'s extraLessonIds allowlist.
export function isLessonInRange(
  lessonId: number,
  range: { days: [number, number]; extraLessonIds?: number[] }
): boolean {
  return (lessonId >= range.days[0] && lessonId <= range.days[1]) || !!range.extraLessonIds?.includes(lessonId);
}

export const TRACK_PERSONAL = {
  id: "personal",
  title: "Tài chính cá nhân",
  // Không hứa số ngày nữa. Con số 108 được viết khi track có 108 bài và mỗi
  // ngày một bài; hôm nay track có 136 bài và người học đi theo nhịp của họ,
  // nên "108 ngày" vừa sai vừa không có gì trong ứng dụng đối chiếu được.
  subtitle: "Dành cho người mới bắt đầu",
  estimatedHours: 10,
  description:
    "Dành cho người muốn hiểu tiền bạc, kiểm soát chi tiêu, xây dựng tài sản và đầu tư thông minh - không cần kiến thức ngành.",
  pillars: ["Tư duy tiền bạc", "Đầu tư cá nhân", "Lập kế hoạch tài chính"],
  stages: [
    {
      // Foundation-first: know your own numbers before learning any theory.
      // Ids 263-268 sort after 262 but stages render in array order, so this
      // block appears first on the dashboard as intended.
      label: "Chặng 1",
      name: "Biết mình trước khi học: audit, ngân sách, quỹ khẩn cấp, nợ",
      days: [263, 268] as [number, number],
      // Ids 1351-1353 mở rộng chặng ở hai đầu: một bài đo chi tiêu đứng trước
      // phần lập ngân sách, hai bài tự động hóa và bảo hiểm đứng sau. Dải
      // 263-268 đã kín và 269 trở đi thuộc Chặng 7, nên không nới days được.
      extraLessonIds: [1351, 1352, 1353],
      available: true,
      parts: [
        { name: "Đo trước: theo dõi chi tiêu", days: [0, 0] as [number, number], extraLessonIds: [1351] },
        { name: "Audit tài chính và khẩu vị rủi ro", days: [263, 264] as [number, number] },
        { name: "Ngân sách, quỹ khẩn cấp, trả nợ và mục tiêu", days: [265, 268] as [number, number] },
        { name: "Giữ kế hoạch sống sót: tự động hóa và bảo hiểm", days: [0, 0] as [number, number], extraLessonIds: [1352, 1353] },
      ],
    },
    {
      // Placed second on purpose: you cannot budget, size an emergency fund
      // or plan debt repayment without knowing your actual take-home pay,
      // which is what this chặng computes. Ids 1301-1308 sit above every
      // existing block so no renumbering (and no progress loss) is needed.
      label: "Chặng 2",
      name: "Thuế TNCN & Lương thực nhận",
      days: [1301, 1308] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Từ lương gross đến lương net", days: [1301, 1304] as [number, number] },
        { name: "Cải cách 2026, quyết toán và thu nhập ngoài lương", days: [1305, 1308] as [number, number] },
      ],
    },
    {
      label: "Chặng 3",
      name: "Tư duy tiền bạc và tài chính cơ bản",
      days: [1, 20] as [number, number],
      available: true,
      parts: [
        { name: "Tiền, thời gian và lãi kép", days: [1, 10] as [number, number] },
        { name: "Rủi ro, nợ và hệ thống tài chính", days: [11, 20] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Cổ phiếu, ETF và quỹ đầu tư",
      days: [201, 220] as [number, number],
      available: true,
      // Display in numerical order to avoid lesson-number jumps on dashboard
      // (was: psychology first [212-214], stocks [201-211], taxes [215-220])
      parts: [
        { name: "Cổ phiếu, ETF, quỹ chỉ số và DCA", days: [201, 211] as [number, number] },
        { name: "Tâm lý, sai lầm cần tránh và kỳ vọng thực tế", days: [212, 214] as [number, number] },
        { name: "Thuế, kỷ luật mua bán và thực hành", days: [215, 220] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "Trái phiếu và các công cụ cố định",
      days: [221, 240] as [number, number],
      available: true,
      parts: [
        { name: "Nền tảng trái phiếu", days: [221, 230] as [number, number] },
        { name: "Chiến lược và rủi ro trái phiếu", days: [231, 240] as [number, number] },
      ],
    },
    {
      label: "Chặng 6",
      name: "Danh mục đầu tư và kế hoạch hưu trí",
      days: [241, 262] as [number, number],
      available: true,
      parts: [
        { name: "Danh mục theo tuổi và kế hoạch hưu trí", days: [241, 250] as [number, number] },
        { name: "Bảo vệ tài sản và tổng kết hành trình", days: [251, 262] as [number, number] },
      ],
    },
    {
      label: "Chặng 7",
      name: "Chiến lược đầu tư cá nhân",
      days: [269, 278] as [number, number],
      available: true,
      parts: [
        { name: "Giá trị, tăng trưởng và chỉ số cơ bản", days: [269, 273] as [number, number] },
        { name: "Đa dạng hóa, tái cân bằng và tâm lý đầu tư", days: [274, 278] as [number, number] },
      ],
    },
    {
      label: "Chặng 8",
      name: "Quản lý tài sản & hưu trí",
      days: [279, 288] as [number, number],
      available: true,
      parts: [
        { name: "Tự do tài chính, lãi kép và quy tắc rút 4%", days: [279, 283] as [number, number] },
        { name: "Bảo vệ tài sản và tổng kết hành trình", days: [284, 288] as [number, number] },
      ],
    },
    {
      label: "Chặng 9",
      name: "Nhà ở, bảo vệ tài sản và các quyết định tài chính lớn",
      days: [289, 298] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Nhà ở & tín dụng", days: [289, 293] as [number, number] },
        { name: "Bảo vệ tài sản & di sản", days: [294, 298] as [number, number] },
      ],
    },
    {
      label: "Chặng 10",
      name: "Tâm lý học tài chính hành vi (Behavioral Finance)",
      days: [1235, 1240] as [number, number],
      extraLessonIds: [1030],
      available: true,
      isNew: true,
      parts: [
        { name: "Thiên kiến trong đầu tư cá nhân", days: [1235, 1237] as [number, number] },
        {
          name: "Tiền bạc, thời gian và xây kỷ luật tài chính",
          days: [1238, 1240] as [number, number],
          extraLessonIds: [1030],
        },
      ],
    },
  ] satisfies Stage[],
};

export const TRACK_PROFESSIONAL = {
  id: "professional",
  title: "Tài chính chuyên ngành",
  subtitle: "Chuyên sâu, cho người đã có nền tài chính",
  estimatedHours: 18,
  description:
    "Lộ trình chuyên sâu dành cho người đã biết tài chính cơ bản: kế toán, báo cáo tài chính, định giá, trái phiếu, danh mục đầu tư, phái sinh.",
  pillars: ["Kế toán & báo cáo tài chính", "Định giá & phân tích", "Đầu tư & quản lý rủi ro"],
  stages: [
    {
      label: "Chặng 1",
      name: "Kế toán nền tảng",
      days: [21, 40] as [number, number],
      extraLessonIds: [1244],
      available: true,
      parts: [
        { name: "Ngôn ngữ kế toán và bảng cân đối", days: [21, 30] as [number, number] },
        {
          name: "Vốn lưu động và nguyên tắc ghi nhận",
          days: [31, 40] as [number, number],
          extraLessonIds: [1244],
        },
      ],
    },
    {
      label: "Chặng 2",
      name: "Đọc 3 báo cáo tài chính",
      days: [41, 60] as [number, number],
      // Ba bài đọc-sâu nằm ngoài dải ngày vì chúng được viết sau, khi đo ra
      // rằng chặng này dạy đọc ba bảng số mà không dạy đọc thuyết minh, không
      // dạy chuẩn hoá theo tỷ trọng, và không nhắc tới ý kiến kiểm toán ở đâu.
      extraLessonIds: [1690, 1691, 1692],
      available: true,
      parts: [
        { name: "Income Statement và Balance Sheet", days: [41, 50] as [number, number] },
        { name: "Cash Flow Statement và case thực tế", days: [51, 60] as [number, number] },
        {
          name: "Đọc sâu: thuyết minh, tỷ trọng và ý kiến kiểm toán",
          days: [0, 0] as [number, number],
          extraLessonIds: [1690, 1691, 1692],
        },
      ],
    },
    {
      label: "Chặng 3",
      name: "Chỉ số tài chính cơ bản",
      days: [61, 80] as [number, number],
      available: true,
      parts: [
        { name: "Biên lợi nhuận và khả năng sinh lời", days: [61, 70] as [number, number] },
        { name: "Hiệu quả vận hành và định giá cơ bản", days: [71, 80] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Giá trị thời gian của tiền",
      days: [81, 100] as [number, number],
      available: true,
      parts: [
        { name: "PV, FV và các công cụ chiết khấu", days: [81, 90] as [number, number] },
        { name: "WACC, CAPM và ứng dụng", days: [91, 100] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "Tài chính doanh nghiệp",
      days: [101, 120] as [number, number],
      extraLessonIds: [1247, 1257, 1337, 1338, 1339],
      available: true,
      parts: [
        {
          name: "Cơ cấu vốn và M&A",
          days: [101, 110] as [number, number],
          extraLessonIds: [1337, 1338, 1339],
        },
        {
          name: "Vận hành vốn và tài chính khởi nghiệp",
          days: [111, 120] as [number, number],
          extraLessonIds: [1247, 1257],
        },
      ],
    },
    {
      label: "Chặng 6",
      name: "Cổ phiếu và định giá doanh nghiệp",
      days: [121, 140] as [number, number],
      available: true,
      extraLessonIds: [1036],
      parts: [
        { name: "Định giá tương đối (multiples)", days: [121, 130] as [number, number] },
        { name: "Định giá DCF", days: [131, 140] as [number, number], extraLessonIds: [1036] },
      ],
    },
    {
      label: "Chặng 7",
      name: "Trái phiếu, lãi suất và tín dụng",
      days: [141, 160] as [number, number],
      available: true,
      parts: [
        { name: "Định giá trái phiếu và lãi suất", days: [141, 150] as [number, number] },
        { name: "Rủi ro tín dụng và các loại trái phiếu", days: [151, 160] as [number, number] },
      ],
    },
    {
      label: "Chặng 8",
      name: "Danh mục đầu tư và quản trị rủi ro",
      days: [161, 180] as [number, number],
      available: true,
      parts: [
        { name: "Lý thuyết danh mục hiện đại", days: [161, 170] as [number, number] },
        { name: "Đo lường hiệu quả và các loại quỹ", days: [171, 180] as [number, number] },
      ],
    },
    {
      label: "Chặng 9",
      name: "Phái sinh và công cụ tài chính nâng cao",
      days: [181, 200] as [number, number],
      available: true,
      parts: [
        { name: "Hợp đồng phái sinh cơ bản", days: [181, 190] as [number, number] },
        { name: "Swap, phòng hộ rủi ro và tổng kết", days: [191, 200] as [number, number] },
      ],
    },
    {
      label: "Chặng 10",
      name: "Nâng cao: Ứng dụng nghề Phân tích & Ngân hàng đầu tư",
      days: [1101, 1110] as [number, number],
      available: true,
      isNew: true,
      extraLessonIds: [1021, 1260],
      parts: [
        { name: "Chất lượng lợi nhuận, định giá tương đối và tín dụng", days: [1101, 1105] as [number, number] },
        {
          name: "M&A, LBO và cơ chế giao dịch",
          days: [1106, 1110] as [number, number],
          extraLessonIds: [1021, 1260],
        },
      ],
    },
    {
      label: "Chặng 11",
      name: "Vận hành tài chính doanh nghiệp hiện đại",
      days: [1201, 1210] as [number, number],
      extraLessonIds: [1213, 1214, 1259],
      available: true,
      isNew: true,
      parts: [
        {
          name: "FP&A & vận hành vốn",
          days: [1201, 1205] as [number, number],
          extraLessonIds: [1213, 1214],
        },
        {
          name: "Treasury & quản trị tài chính",
          days: [1206, 1210] as [number, number],
          extraLessonIds: [1259],
        },
      ],
    },
    {
      label: "Chặng 12",
      name: "Tâm lý học tài chính hành vi nâng cao (Behavioral Finance)",
      days: [1241, 1243] as [number, number],
      // The second part below always pointed at 1250-1252, but membership is
      // decided at stage level first, and the stage span stopped at 1243 - so
      // those three lessons belonged to no stage at all and appeared nowhere
      // in the learning path. The span cannot simply be widened to 1252:
      // 1244 is Chặng 1's, 1247 is Chặng 5's, 1248 is Chặng 18's, and
      // 1245/1246/1249 are Chặng 20 and 21's.
      extraLessonIds: [1250, 1251, 1252],
      available: true,
      isNew: true,
      parts: [
        { name: "Nền tảng lý thuyết & phân tích thị trường", days: [1241, 1243] as [number, number] },
        { name: "Quản lý danh mục & thiết kế sản phẩm", days: [1250, 1252] as [number, number] },
      ],
    },
    {
      label: "Chặng 13",
      name: "AI trong Tài chính: Dùng ChatGPT/Claude để đọc báo cáo, phân tích và viết memo",
      days: [1261, 1280] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Bắt đầu an toàn: AI làm gì, đọc tin và đọc BCTC", days: [1261, 1266] as [number, number] },
        { name: "Thực hành: họp, tin tức, trợ lý riêng và viết memo", days: [1267, 1273] as [number, number] },
        { name: "Project cuối chặng: thư viện câu lệnh và quy trình kiểm chứng", days: [1274, 1280] as [number, number] },
      ],
    },
    {
      label: "Chặng 14",
      name: "Masterclass Chuyên Đề: Bất Động Sản, Trái Phiếu, Startup VC, VaR & ESG",
      days: [801, 805] as [number, number],
      extraLessonIds: [801, 802, 803, 804, 805],
      available: true,
      isNew: true,
      parts: [
        { name: "Tài chính Bất động sản, Trái phiếu doanh nghiệp, Startup VC, Quản trị rủi ro VaR & Đầu tư ESG", days: [801, 805] as [number, number], extraLessonIds: [801, 802, 803, 804, 805] },
      ],
    },
    {
      // Hands-on modelling is the core hard skill behind the analyst/IB path
      // that Chặng 10 introduces, so it sits at the end as the applied
      // capstone. Text lessons target structure, statement linkage and the
      // judgment behind assumptions - the parts that transfer through prose.
      label: "Chặng 15",
      name: "Mô hình tài chính thực hành (Financial Modeling)",
      days: [1311, 1320] as [number, number],
      extraLessonIds: [1342],
      available: true,
      isNew: true,
      parts: [
        { name: "Cấu trúc, doanh thu và mô hình 3 báo cáo", days: [1311, 1313] as [number, number] },
        { name: "Bảng hỗ trợ, nợ vay và định giá DCF", days: [1314, 1317] as [number, number] },
        {
          name: "LBO, kiểm tra mô hình và project cuối chặng",
          days: [1318, 1320] as [number, number],
          extraLessonIds: [1342],
        },
      ],
    },
    {
      // ESG had four lessons but no home in either track: 805 sat inside the
      // Chặng 14 masterclass bundle, while 1229-1231 were reachable only by
      // learners who happened to pick the "esg-analyst" career path. A learner
      // working through Track 2 in order never met them. This stage gives the
      // topic a proper sequence - the three existing foundation lessons first,
      // then the four new ones covering what 805 doesn't: disclosure regimes,
      // climate risk as financial risk, ESG inside a valuation model, and the
      // governance pillar in depth.
      label: "Chặng 16",
      name: "Tài chính bền vững (ESG & Climate Finance)",
      days: [1327, 1330] as [number, number],
      extraLessonIds: [1229, 1230, 1231],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Nền tảng: ESG là gì, đánh giá và đầu tư theo ESG",
          days: [1229, 1231] as [number, number],
          extraLessonIds: [1229, 1230, 1231],
        },
        { name: "Quy định, rủi ro khí hậu và định giá", days: [1327, 1329] as [number, number] },
        { name: "Quản trị doanh nghiệp chuyên sâu", days: [1330, 1330] as [number, number] },
      ],
    },
    {
      // Track 2 had no macro stage at all, yet eleven finished CFA Economics
      // lessons existed - reachable only from the CFA cross-reference page,
      // never from the curriculum itself. They carried track: "bonus", which
      // DashboardClient filters out of professional stages, so putting them
      // here also required flipping that field in lib/lessons.ts.
      label: "Chặng 17",
      name: "Kinh tế học cho người làm tài chính",
      days: [1321, 1326] as [number, number],
      extraLessonIds: [1224, 1225, 1226, 1227, 1228, 1258],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Vi mô: cung cầu, chi phí doanh nghiệp và cấu trúc thị trường",
          days: [1321, 1322] as [number, number],
          extraLessonIds: [1228],
        },
        {
          name: "Vĩ mô: AD/AS, tăng trưởng, chu kỳ và chính sách",
          days: [1323, 1325] as [number, number],
          extraLessonIds: [1224, 1225],
        },
        {
          name: "Kinh tế quốc tế và đọc chỉ báo vĩ mô",
          days: [1326, 1326] as [number, number],
          extraLessonIds: [1226, 1227, 1258],
        },
      ],
    },
    {
      // The whole Track 2 spine assumes a non-financial company, so it breaks
      // silently on banks - the largest sector on the local market. 1401-1402
      // are new; the rest already existed but were reachable only by learners
      // who happened to pick the credit-analyst or compliance career path.
      label: "Chặng 18",
      name: "Ngân hàng, tín dụng và tuân thủ",
      days: [1401, 1402] as [number, number],
      extraLessonIds: [1218, 1222, 1248, 1253, 1254, 1256, 1281, 1282, 1283],
      available: true,
      isNew: true,
      parts: [
        { name: "Đọc và định giá một ngân hàng", days: [1401, 1402] as [number, number] },
        {
          name: "Tín dụng: thẩm định, chấm điểm và vốn",
          days: [0, 0] as [number, number],
          extraLessonIds: [1218, 1222, 1256],
        },
        {
          name: "Tuân thủ, kiểm soát nội bộ và mô hình kinh doanh mới",
          days: [0, 0] as [number, number],
          extraLessonIds: [1248, 1253, 1254, 1281, 1282, 1283],
        },
      ],
    },
    {
      // Chặng 9 stops at "what is an option". 1411-1414 answer the question
      // every practitioner hits next - where the price comes from and what the
      // position is sensitive to - and 1216/1217/1223 (previously career-path
      // only) are the risk-management half of the same subject.
      label: "Chặng 19",
      name: "Định giá phái sinh và quản trị rủi ro thị trường",
      days: [1411, 1414] as [number, number],
      extraLessonIds: [1216, 1217, 1223],
      available: true,
      isNew: true,
      parts: [
        { name: "Định giá quyền chọn: từ không-arbitrage đến Greeks", days: [1411, 1414] as [number, number] },
        {
          name: "Đo lường và quản trị rủi ro thị trường",
          days: [0, 0] as [number, number],
          extraLessonIds: [1216, 1217, 1223],
        },
      ],
    },
    {
      // Nine finished lessons that no learner following Track 2 in order ever
      // met. Grouped here by what a buy-side analyst actually does end to end:
      // research process, market plumbing, then the asset classes where the
      // standard DCF/multiples toolkit does not apply.
      label: "Chặng 20",
      name: "Buy-side: quy trình nghiên cứu và định giá chuyên sâu",
      days: [0, 0] as [number, number],
      extraLessonIds: [1215, 1219, 1220, 1221, 1245, 1246, 1286, 1288, 1289],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Quy trình quỹ, luận điểm đầu tư và chiến lược định lượng",
          days: [0, 0] as [number, number],
          extraLessonIds: [1221, 1245, 1246, 1215],
        },
        {
          name: "Cơ chế thị trường và công cụ",
          days: [0, 0] as [number, number],
          extraLessonIds: [1288, 1289],
        },
        {
          name: "Định giá tài sản đặc thù: bất động sản, vô hình, REIT",
          days: [0, 0] as [number, number],
          extraLessonIds: [1219, 1220, 1286],
        },
      ],
    },
    {
      // Same story: eight lessons covering the advisory/insurance side of the
      // industry, previously visible only through two career paths.
      label: "Chặng 21",
      name: "Quản lý gia sản và bảo hiểm",
      days: [0, 0] as [number, number],
      extraLessonIds: [1232, 1233, 1234, 1249, 1255, 1284, 1285, 1287],
      available: true,
      isNew: true,
      parts: [
        {
          name: "Quy trình hoạch định tài chính cho khách hàng",
          days: [0, 0] as [number, number],
          extraLessonIds: [1249, 1284, 1285, 1287],
        },
        {
          name: "Bảo hiểm: định phí, tư vấn nhu cầu và quy định",
          days: [0, 0] as [number, number],
          extraLessonIds: [1255, 1232, 1233, 1234],
        },
      ],
    },
    {
      label: "Chặng 22",
      name: "Phương pháp định lượng (Quantitative Methods)",
      days: [1421, 1426] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Phân phối, mẫu và suy diễn thống kê", days: [1421, 1423] as [number, number] },
        { name: "Hồi quy, chuỗi thời gian và kiểm chứng ngoài mẫu", days: [1424, 1426] as [number, number] },
      ],
    },
    {
      // Chặng 15 deliberately teaches modelling judgment in prose and says so.
      // This is the execution half that recruiting actually tests.
      label: "Chặng 23",
      name: "Excel và dữ liệu cho phân tích tài chính",
      days: [1431, 1436] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Bàn phím, hàm tra cứu và dựng mô hình trong Excel", days: [1431, 1433] as [number, number] },
        { name: "Kiểm tra, làm sạch dữ liệu và SQL", days: [1434, 1436] as [number, number] },
      ],
    },
    {
      // Track 2 dạy kế toán và thuế ở mức nguyên lý phổ quát. Hai lỗ hổng bối
      // cảnh: không bài nào nói VAS khác IFRS ở đâu (trong khi doanh nghiệp
      // niêm yết đang chuyển đổi), và tám bài thuế hiện có đều là thuế TNCN
      // của track cá nhân - không bài nào về thuế doanh nghiệp.
      label: "Chặng 24",
      name: "Chuẩn mực kế toán và thuế doanh nghiệp Việt Nam",
      days: [1441, 1448] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "VAS, IFRS và chuyển đổi chuẩn mực", days: [1441, 1442] as [number, number] },
        { name: "Thuế doanh nghiệp và thuế hoãn lại", days: [1443, 1445] as [number, number] },
        { name: "Chi phí được trừ, ưu đãi và thanh tra thuế", days: [1446, 1448] as [number, number] },
      ],
    },
    {
      label: "Chặng 25",
      name: "Thị trường chứng khoán Việt Nam",
      days: [1451, 1457] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Cơ chế giao dịch và dòng vốn ngoại", days: [1451, 1452] as [number, number] },
        { name: "Trái phiếu doanh nghiệp và quản trị công ty", days: [1453, 1454] as [number, number] },
        { name: "Chỉ số, đòn bẩy ký quỹ và quỹ đầu tư", days: [1455, 1457] as [number, number] },
      ],
    },
    {
      // Chặng 19 dạy phòng hộ tỷ giá ở mức công cụ và Chặng 17 dạy dòng vốn
      // quốc tế ở mức vĩ mô, nhưng phần nối hai thứ đó - quan hệ ngang giá và
      // hệ quả của chúng lên mô hình định giá - thì chưa có bài nào.
      label: "Chặng 26",
      name: "Tài chính quốc tế",
      days: [1461, 1464] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Quan hệ ngang giá: lãi suất và sức mua", days: [1461, 1462] as [number, number] },
        { name: "Định giá xuyên biên giới và rủi ro tỷ giá trên báo cáo", days: [1463, 1464] as [number, number] },
      ],
    },
    {
      // App đã có bài về phía thương vụ (PE là gì, VC là gì, cap table, LBO).
      // Chặng này bổ sung phía quỹ: tiền của ai, nhà quản lý được trả thế nào,
      // và vì sao hiệu suất quỹ đóng cần bộ chỉ số riêng.
      label: "Chặng 27",
      name: "Private markets: cấu trúc và hiệu suất quỹ PE/VC",
      days: [1471, 1474] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Cấu trúc quỹ và cơ chế phân phối lợi nhuận", days: [1471, 1472] as [number, number] },
        { name: "Đo hiệu suất và thoái vốn", days: [1473, 1474] as [number, number] },
      ],
    },
    {
      // Trang /phong-van-ky-thuat có ngân hàng câu hỏi nhưng không có bài học
      // nào dạy phần kỹ năng đứng sau nó.
      label: "Chặng 28",
      name: "Kỹ năng nghề phân tích tài chính",
      days: [1481, 1484] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Viết memo và bảo vệ luận điểm", days: [1481, 1482] as [number, number] },
        { name: "Bài kiểm tra dựng mô hình và lộ trình nghề", days: [1483, 1484] as [number, number] },
      ],
    },
    {
      // Chặng 23 dừng ở SQL cơ bản vì với một mô hình định giá thì Excel vẫn
      // là công cụ đúng. Hai chặng này là phần công việc còn lại - phần mà
      // bảng tính thành gánh nặng - và là nền cho ba nghề dữ liệu vừa thêm
      // vào lib/finance-careers.ts.
      label: "Chặng 29",
      name: "Công cụ phân tích dữ liệu",
      days: [1491, 1496] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chuyển từ bảng tính sang code, và làm sạch dữ liệu", days: [1491, 1493] as [number, number] },
        { name: "Trực quan hóa, dashboard và SQL nâng cao", days: [1494, 1496] as [number, number] },
      ],
    },
    {
      // Phần khiến công cụ ở Chặng 29 có ích hay có hại: chọn đo cái gì, đọc
      // con số ra sao, và ở đâu thì một phân tích đúng kỹ thuật vẫn dẫn tới
      // kết luận sai.
      label: "Chặng 30",
      name: "Tư duy phân tích dữ liệu",
      days: [1501, 1506] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Chọn chỉ số, phân tích cohort và thử nghiệm A/B", days: [1501, 1503] as [number, number] },
        { name: "Nhân quả, kể chuyện bằng dữ liệu và đạo đức dữ liệu", days: [1504, 1506] as [number, number] },
      ],
    },
    {
      // Chặng 11 dạy ngân sách, rolling forecast và variance - tức là các sản
      // phẩm đầu ra của FP&A. Chặng này lo phần đứng trước: những con số ấy
      // từ đâu ra, và nó là phần chiếm gần hết thời gian thật của nghề.
      label: "Chặng 31",
      name: "Lập kế hoạch tài chính vận hành",
      days: [1511, 1516] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Yếu tố dẫn dắt, kế hoạch nhân sự và dòng tiền 13 tuần", days: [1511, 1513] as [number, number] },
        { name: "Kịch bản, phân bổ chi phí và nhịp báo cáo tháng", days: [1514, 1516] as [number, number] },
      ],
    },
    {
      // Chặng 10 dạy vì sao mua, mua ai, trả bằng gì và vì sao hậu sáp nhập
      // hay hỏng. Chặng này lo phần cơ khí ở giữa - và là phần mà bộ câu hỏi
      // phỏng vấn IB hỏi nhiều nhất trong khi chưa có bài học nào dạy nó.
      label: "Chặng 32",
      name: "Cơ chế thương vụ M&A",
      days: [1521, 1526] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Pha loãng EPS, nguồn vốn và phân bổ giá mua", days: [1521, 1523] as [number, number] },
        { name: "Thoái vốn, quy trình thương vụ và nghĩa vụ hội đồng", days: [1524, 1526] as [number, number] },
      ],
    },
    {
      // Có hai nghề kiểm toán trong lib/finance-careers.ts và trước chặng này
      // cả kho chỉ có đúng một bài liên quan (1254, khung COSO). Lộ trình của
      // nghề "Kiểm toán viên" gồm năm bài kế toán chung, không bài nào nói
      // kiểm toán làm gì.
      label: "Chặng 33",
      name: "Kiểm toán: cách một báo cáo được xác nhận",
      days: [1531, 1536] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Ý kiến kiểm toán, trọng yếu và bằng chứng", days: [1531, 1533] as [number, number] },
        { name: "Chọn mẫu, gian lận và ba tuyến phòng vệ", days: [1534, 1536] as [number, number] },
      ],
    },
    {
      // Lấp 3/10 môn FRM gần như trống trơn trên /frm (xem lib/frm-track.ts):
      // Foundations of Risk Management, Operational Resilience, và Liquidity
      // and Treasury Risk. Ids 1531-1536 đã bị lib/audit-lessons.ts (Chặng
      // 33) chiếm trước trong cùng một đợt commit song song, nên chặng này
      // nhảy cóc qua đoạn đó - xem extraLessonIds.
      label: "Chặng 34",
      name: "FRM: Nền tảng, rủi ro vận hành & rủi ro thanh khoản",
      days: [1527, 1530] as [number, number],
      extraLessonIds: [1537, 1538, 1539, 1540, 1541],
      available: true,
      isNew: true,
      parts: [
        { name: "Foundations of Risk Management: ERM, văn hoá rủi ro, thảm hoạ kinh điển", days: [1527, 1529] as [number, number] },
        { name: "Operational Resilience: LDA, BCP/DR, rủi ro mô hình & bên thứ ba", days: [1530, 1530] as [number, number], extraLessonIds: [1537, 1538] },
        { name: "Liquidity and Treasury Risk: LCR/NSFR, CFP, ALM/IRRBB", days: [1539, 1541] as [number, number] },
      ],
    },
    {
      // Market Risk chiếm 20% FRM Part II nhưng chỉ có 5 bài mượn từ nơi khác
      // (VaR nhập môn, duration, Greeks, implied vol). Phần lõi định lượng mà
      // GARP kiểm tra - so sánh phương pháp VaR, kiểm định hậu nghiệm, ES,
      // mô hình biến động, copula, stress testing - không có bài nào.
      label: "Chặng 35",
      name: "FRM: Rủi ro thị trường",
      days: [1551, 1556] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Tính VaR, kiểm định hậu nghiệm và Expected Shortfall", days: [1551, 1553] as [number, number] },
        { name: "Mô hình biến động, phụ thuộc đuôi và stress testing", days: [1554, 1556] as [number, number] },
      ],
    },
    {
      // Lấp phần rủi ro tín dụng nâng cao (CDS, chứng khoán hoá/CDO, CVA,
      // sovereign credit risk) và các chủ đề Current Issues còn thiếu của
      // FRM Part II. Xem lib/frm-track.ts's credit-risk/current-issues
      // subjects.
      label: "Chặng 36",
      name: "FRM: Tín dụng nâng cao & Vấn đề thời sự",
      days: [1557, 1563] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "CDS, chứng khoán hoá/CDO và rủi ro tín dụng đối tác (CVA)", days: [1557, 1559] as [number, number] },
        { name: "Ngân hàng ngầm, rủi ro liên kết hệ thống và tài sản số", days: [1560, 1561] as [number, number] },
        { name: "Rủi ro tín dụng chủ quyền và stablecoin", days: [1562, 1563] as [number, number] },
      ],
    },
    {
      // Bốn môn FRM mỏng nhất so với tỷ trọng đề thi sau các đợt trước (xem
      // lib/frm-track.ts): Foundations và Operational Resilience mỗi môn 4
      // bài trên tỷ trọng 20%, Liquidity and Treasury 4 bài trên 15%, và
      // Quantitative Analysis 6 bài trên 20%.
      label: "Chặng 37",
      name: "FRM: Nền tảng, vận hành, thanh khoản & định lượng nâng cao",
      days: [1613, 1636] as [number, number],
      // 1650-1654 nằm ngoài dải liên tục vì dải 1637-1648 đã thuộc Chặng 38.
      // Không có chúng ở đây thì năm bài đó tồn tại, sinh ra file, lên trang
      // FRM - và không chặng nào dẫn tới, đúng lỗi mà Chặng 12 từng mắc.
      extraLessonIds: [1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672],
      available: true,
      isNew: true,
      parts: [
        { name: "Foundations: phân loại rủi ro, khẩu vị & hạn mức, đo hiệu quả, CAPM, đạo đức, BCBS 239", days: [1613, 1618] as [number, number] },
        {
          name: "Foundations nâng cao: RAROC & vốn kinh tế, quản trị cấp hội đồng, bốn lựa chọn với rủi ro, rủi ro hệ thống, danh tiếng & chiến lược",
          days: [0, 0] as [number, number],
          extraLessonIds: [1650, 1651, 1652, 1653, 1654],
        },
        {
          name: "Operational nâng cao: phân tích kịch bản, dữ liệu tổn thất bên ngoài, rủi ro thay đổi, dịch vụ trọng yếu, rủi ro con người",
          days: [0, 0] as [number, number],
          extraLessonIds: [1655, 1656, 1657, 1658, 1659],
        },
        {
          name: "Market Risk nâng cao: FRTB, key rate duration, ánh xạ nhân tố rủi ro, phân rã rủi ro giữa các bàn",
          days: [0, 0] as [number, number],
          extraLessonIds: [1660, 1661, 1662, 1663],
        },
        {
          name: "San nốt bốn môn: định lượng nâng cao, rủi ro đối tác và tập trung, thanh khoản nội ngày và repo, quy kết hiệu quả và rủi ro quỹ",
          days: [0, 0] as [number, number],
          extraLessonIds: [1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672],
        },
        { name: "Operational Resilience: sự kiện Basel, RCSA/KRI, an ninh mạng, gian lận, vốn SMA, rủi ro hành vi", days: [1619, 1624] as [number, number] },
        { name: "Liquidity and Treasury: hai loại thanh khoản, thang dòng tiền, FTP, stress test, tài sản bảo đảm, quỹ mở", days: [1625, 1630] as [number, number] },
        { name: "Quantitative Analysis: Bayes, MLE, Monte Carlo, bootstrapping, EVT, PCA", days: [1631, 1636] as [number, number] },
      ],
    },
    {
      // Hai môn còn lại của FRM: Valuation and Risk Models (30% Part I, tỷ
      // trọng lớn nhất của cả phần, trước đợt này không có bài viết riêng
      // nào) và Current Issues.
      label: "Chặng 38",
      name: "FRM: Định giá, mô hình rủi ro & vấn đề thời sự",
      days: [1637, 1648] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Valuation and Risk Models: không chênh lệch giá, cây nhị thức, Black-Scholes, Greeks, DV01, xếp hạng", days: [1637, 1642] as [number, number] },
        { name: "Current Issues: AI/ML, rủi ro khí hậu, hậu LIBOR, CBDC, tập trung đám mây, bất ổn 2023", days: [1643, 1648] as [number, number] },
      ],
    },
    {
      // Nghề "Chuyên viên Tài chính Sản phẩm FinTech" trong lib/finance-careers.ts
      // là nghề duy nhất trong 44 nghề mà kho bài học thực sự mỏng - quét cả
      // 689 bài chỉ ra vài bài chung chung để nối vào, trong khi mọi nghề khác
      // đều đã có bài đúng chủ đề nằm rải rác. Chặng này lấp chỗ đó, và cố ý
      // không dạy công nghệ: người làm tài chính sản phẩm không viết code, họ
      // trả lời câu sản phẩm này kiếm tiền ở đâu và mỗi khách lãi hay lỗ.
      label: "Chặng 39",
      name: "Tài chính sản phẩm FinTech",
      days: [1701, 1706] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Doanh thu và đơn vị kinh tế: take rate, CAC/LTV, số dư ví", days: [1701, 1703] as [number, number] },
        { name: "Phần mất đi và đường tới hoà vốn: rủi ro tín dụng, gian lận, burn", days: [1704, 1706] as [number, number] },
      ],
    },
    {
      // Quét kho theo từng kỹ năng mà nghề "Chuyên viên Quan hệ Cổ đông" tự
      // khai - soạn thông cáo, gặp nhà đầu tư, xử lý câu hỏi khó - cho ra 0
      // bài. Nghề này trước đó học ghép từ các bài tài chính doanh nghiệp
      // chung, tức là học được phần hiểu số mà không học phần chính: đứng
      // trước người khác và chịu trách nhiệm về những con số đó.
      label: "Chặng 40",
      name: "Quan hệ cổ đông (IR)",
      days: [1711, 1715] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Nghề IR và nghĩa vụ công bố thông tin", days: [1711, 1712] as [number, number] },
        { name: "Guidance, buổi gặp nhà đầu tư và xử lý tin xấu", days: [1713, 1715] as [number, number] },
      ],
    },
    {
      // Kho có rất nhiều bài dạy ĐỌC báo cáo tài chính và không bài nào dạy
      // báo cáo đó được LẬP ra thế nào - quét bút toán, sổ cái, hạch toán ra
      // 0 bài. Ảnh hưởng xa hơn nghề kế toán: người phân tích chưa từng thấy
      // hai vế của một định khoản sẽ không giải thích được vì sao lãi tăng mà
      // tiền không tăng.
      label: "Chặng 41",
      name: "Bút toán và sổ sách kế toán",
      days: [1721, 1725] as [number, number],
      available: true,
      isNew: true,
      parts: [
        { name: "Ghi sổ kép và đường đi từ chứng từ tới báo cáo", days: [1721, 1722] as [number, number] },
        { name: "Điều chỉnh cuối kỳ, đối chiếu và khoá sổ", days: [1723, 1725] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

// A professional stage only renders on the dashboard if some branch lists its
// label (DashboardClient filters track.stages by the active branch), so every
// stage added above must appear in exactly one branch here or it is invisible
// to learners - which is what had silently happened to Chặng 14, 15 and 16.
export const PROFESSIONAL_BRANCHES = [
  {
    id: "corporate",
    label: "Tài chính doanh nghiệp",
    subtitle: "Kế toán, báo cáo tài chính, định giá, vận hành vốn & mô hình tài chính",
    emoji: "🏢",
    stageLabels: ["Chặng 1", "Chặng 2", "Chặng 3", "Chặng 4", "Chặng 5", "Chặng 11", "Chặng 15", "Chặng 24", "Chặng 31", "Chặng 33", "Chặng 40", "Chặng 41"],
  },
  {
    id: "investment",
    label: "Tài chính đầu tư",
    subtitle: "Cổ phiếu, trái phiếu, danh mục, phái sinh, kinh tế học & quy trình buy-side",
    emoji: "📈",
    stageLabels: [
      "Chặng 6",
      "Chặng 7",
      "Chặng 8",
      "Chặng 9",
      "Chặng 10",
      "Chặng 12",
      "Chặng 14",
      "Chặng 16",
      "Chặng 17",
      "Chặng 19",
      "Chặng 20",
      "Chặng 25",
      "Chặng 26",
      "Chặng 27",
      "Chặng 32",
    ],
  },
  {
    id: "banking",
    label: "Ngân hàng, bảo hiểm & tư vấn",
    subtitle: "Đọc và định giá ngân hàng, tín dụng, tuân thủ, quản lý gia sản & bảo hiểm",
    emoji: "🏦",
    stageLabels: ["Chặng 18", "Chặng 21", "Chặng 34", "Chặng 35", "Chặng 36", "Chặng 37", "Chặng 38", "Chặng 39"],
  },
  {
    id: "quant",
    label: "Định lượng & dữ liệu",
    subtitle: "Thống kê, hồi quy, chuỗi thời gian, Excel và SQL cho phân tích",
    emoji: "📊",
    stageLabels: ["Chặng 22", "Chặng 23"],
  },
  {
    // Tách khỏi nhánh "quant" thay vì nối thêm vào đó: nhánh kia phục vụ
    // người làm phân tích tài chính cần công cụ định lượng, còn nhánh này là
    // lộ trình của ba nghề dữ liệu (data-analyst, bi-analyst, data-engineer)
    // trong lib/finance-careers.ts - cùng dùng SQL nhưng đích đến khác nhau.
    id: "data",
    label: "Phân tích dữ liệu",
    subtitle: "Python, làm sạch dữ liệu, dashboard, chọn chỉ số, thử nghiệm A/B và đạo đức dữ liệu",
    emoji: "🧮",
    stageLabels: ["Chặng 29", "Chặng 30"],
  },
  {
    id: "craft",
    label: "Kỹ năng nghề",
    subtitle: "Viết memo, bảo vệ luận điểm, bài kiểm tra dựng mô hình và lộ trình nghề nghiệp",
    emoji: "💼",
    stageLabels: ["Chặng 28"],
  },
  {
    id: "ai",
    label: "AI trong tài chính",
    subtitle: "Dùng ChatGPT/Claude để đọc báo cáo, phân tích tin và viết memo",
    emoji: "🤖",
    stageLabels: ["Chặng 13"],
  },
] as const;

export type ProfessionalBranchId = (typeof PROFESSIONAL_BRANCHES)[number]["id"];

/**
 * Whether a lesson id falls within a track's day ranges. Most lessons don't
 * carry an explicit `track` field on the Lesson object - track membership is
 * determined by which stage's day range the id falls into (mirrors the
 * dashboard's own stage-matching logic). An explicit `track` field, when
 * present, still takes priority and is checked by the caller first.
 */
export function isLessonIdInTrack(id: number, track: "personal" | "professional"): boolean {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  return stages.some((stage) => isLessonInRange(id, stage));
}

type TrackLessonLike = {
  id: number;
  track?: "personal" | "professional" | "bonus";
};

/**
 * The single rule for "does this lesson belong to this track": an explicit
 * `track` field wins, otherwise membership is derived from the stage day
 * ranges. Most lessons carry no `track` (42% of them), so anything that
 * compares `lesson.track === track` directly silently drops the majority of
 * the curriculum - which is exactly what lib/lessons-loader's
 * getLessonsByTrack used to do.
 */
export function lessonBelongsToTrack(
  lesson: TrackLessonLike,
  track: "personal" | "professional"
): boolean {
  return isExplicitlyInTrack(lesson, track);
}

function isExplicitlyInTrack(lesson: TrackLessonLike, track: "personal" | "professional"): boolean {
  if (lesson.track === "bonus") return false;
  if (lesson.track) return lesson.track === track;
  return isLessonIdInTrack(lesson.id, track);
}

// Dashboard sections render in stage/part order, not raw numeric id order.
// Personal Chặng 0 lives at ids 263-268 but is intentionally the FIRST
// thing a learner should do; sorting by id makes resume logic jump to Day 1
// first and makes the app talk as if Chặng 0 were "after" 262 earlier days.
export function orderLessonsForTrack<T extends TrackLessonLike>(
  lessons: T[],
  track: "personal" | "professional"
): T[] {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  const trackLessons = lessons.filter((lesson) => isExplicitlyInTrack(lesson, track));
  const byId = new Map(trackLessons.map((lesson) => [lesson.id, lesson]));
  const ordered: T[] = [];
  const seen = new Set<number>();

  const pushLessonsInRange = (range: { days: [number, number]; extraLessonIds?: number[] }) => {
    const partLessons = trackLessons
      .filter((lesson) => !seen.has(lesson.id) && isLessonInRange(lesson.id, range))
      .sort((a, b) => a.id - b.id);

    for (const lesson of partLessons) {
      seen.add(lesson.id);
      ordered.push(lesson);
    }
  };

  for (const stage of stages) {
    for (const part of stage.parts) {
      pushLessonsInRange(part);
    }

    const stageExtraLessonIds = (stage as Stage).extraLessonIds;
    if (stageExtraLessonIds) {
      for (const lessonId of stageExtraLessonIds) {
        const lesson = byId.get(lessonId);
        if (lesson && !seen.has(lesson.id)) {
          seen.add(lesson.id);
          ordered.push(lesson);
        }
      }
    }
  }

  const leftovers = trackLessons
    .filter((lesson) => !seen.has(lesson.id))
    .sort((a, b) => a.id - b.id);

  return [...ordered, ...leftovers];
}
