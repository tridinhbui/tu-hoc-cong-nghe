export interface StagePart {
  name: string;
  days: [number, number];
}

export interface Stage {
  label: string;
  name: string;
  days: [number, number];
  available: boolean;
  parts: StagePart[];
}

export const TRACK_PERSONAL = {
  id: "personal",
  title: "Tài chính cá nhân",
  subtitle: "Lộ trình 108 ngày",
  estimatedHours: 10,
  description:
    "Dành cho người muốn hiểu tiền bạc, kiểm soát chi tiêu, xây dựng tài sản và đầu tư thông minh - không cần kiến thức ngành.",
  pillars: ["Tư duy tiền bạc", "Đầu tư cá nhân", "Lập kế hoạch tài chính"],
  stages: [
    {
      // Foundation-first: know your own numbers before learning any theory.
      // Ids 263-268 sort after 262 but stages render in array order, so this
      // block appears first on the dashboard as intended.
      label: "Chặng 0",
      name: "Biết mình trước khi học: audit, ngân sách, quỹ khẩn cấp, nợ",
      days: [263, 268] as [number, number],
      available: true,
      parts: [
        { name: "Audit tài chính và khẩu vị rủi ro", days: [263, 264] as [number, number] },
        { name: "Ngân sách, quỹ khẩn cấp, trả nợ và mục tiêu", days: [265, 268] as [number, number] },
      ],
    },
    {
      label: "Chặng 1",
      name: "Tư duy tiền bạc và tài chính cơ bản",
      days: [1, 20] as [number, number],
      available: true,
      parts: [
        { name: "Tiền, thời gian và lãi kép", days: [1, 10] as [number, number] },
        { name: "Rủi ro, nợ và hệ thống tài chính", days: [11, 20] as [number, number] },
      ],
    },
    {
      label: "Chặng 2",
      name: "Cổ phiếu, ETF và quỹ đầu tư",
      days: [201, 220] as [number, number],
      available: true,
      // Psychology-first ordering: learn the traps (FOMO, margin, phím hàng)
      // and realistic expectations BEFORE learning how to buy. Parts render
      // in array order regardless of lesson ids.
      parts: [
        { name: "Tâm lý, sai lầm cần tránh và kỳ vọng thực tế", days: [212, 214] as [number, number] },
        { name: "Cổ phiếu, ETF, quỹ chỉ số và DCA", days: [201, 211] as [number, number] },
        { name: "Thuế, kỷ luật mua bán và thực hành", days: [215, 220] as [number, number] },
      ],
    },
    {
      label: "Chặng 3",
      name: "Trái phiếu và các công cụ cố định",
      days: [221, 240] as [number, number],
      available: true,
      parts: [
        { name: "Nền tảng trái phiếu", days: [221, 230] as [number, number] },
        { name: "Chiến lược và rủi ro trái phiếu", days: [231, 240] as [number, number] },
      ],
    },
    {
      label: "Chặng 4",
      name: "Danh mục đầu tư và kế hoạch hưu trí",
      days: [241, 262] as [number, number],
      available: true,
      parts: [
        { name: "Danh mục theo tuổi và kế hoạch hưu trí", days: [241, 250] as [number, number] },
        { name: "Bảo vệ tài sản và tổng kết hành trình", days: [251, 262] as [number, number] },
      ],
    },
    {
      label: "Chặng 5",
      name: "Chiến lược đầu tư cá nhân",
      days: [269, 278] as [number, number],
      available: true,
      parts: [
        { name: "Giá trị, tăng trưởng và chỉ số cơ bản", days: [269, 273] as [number, number] },
        { name: "Đa dạng hóa, tái cân bằng và tâm lý đầu tư", days: [274, 278] as [number, number] },
      ],
    },
    {
      label: "Chặng 6",
      name: "Quản lý tài sản & hưu trí",
      days: [279, 288] as [number, number],
      available: true,
      parts: [
        { name: "Tự do tài chính, lãi kép và quy tắc rút 4%", days: [279, 283] as [number, number] },
        { name: "Bảo vệ tài sản và tổng kết hành trình", days: [284, 288] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

export const TRACK_PROFESSIONAL = {
  id: "professional",
  title: "Tài chính chuyên ngành",
  subtitle: "Lộ trình 180 ngày chuyên sâu",
  estimatedHours: 18,
  description:
    "Lộ trình chuyên sâu 180 ngày dành cho người đã biết tài chính cơ bản: kế toán, báo cáo tài chính, định giá, trái phiếu, danh mục đầu tư, phái sinh.",
  pillars: ["Kế toán & báo cáo tài chính", "Định giá & phân tích", "Đầu tư & quản lý rủi ro"],
  stages: [
    {
      label: "Chặng 1",
      name: "Kế toán nền tảng",
      days: [21, 40] as [number, number],
      available: true,
      parts: [
        { name: "Ngôn ngữ kế toán và bảng cân đối", days: [21, 30] as [number, number] },
        { name: "Vốn lưu động và nguyên tắc ghi nhận", days: [31, 40] as [number, number] },
      ],
    },
    {
      label: "Chặng 2",
      name: "Đọc 3 báo cáo tài chính",
      days: [41, 60] as [number, number],
      available: true,
      parts: [
        { name: "Income Statement và Balance Sheet", days: [41, 50] as [number, number] },
        { name: "Cash Flow Statement và case thực tế", days: [51, 60] as [number, number] },
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
      available: true,
      parts: [
        { name: "Cơ cấu vốn và M&A", days: [101, 110] as [number, number] },
        { name: "Vận hành vốn và tài chính khởi nghiệp", days: [111, 120] as [number, number] },
      ],
    },
    {
      label: "Chặng 6",
      name: "Cổ phiếu và định giá doanh nghiệp",
      days: [121, 140] as [number, number],
      available: true,
      parts: [
        { name: "Định giá tương đối (multiples)", days: [121, 130] as [number, number] },
        { name: "Định giá DCF", days: [131, 140] as [number, number] },
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
      parts: [
        { name: "Chất lượng lợi nhuận, định giá tương đối và tín dụng", days: [1101, 1105] as [number, number] },
        { name: "M&A, LBO và cơ chế giao dịch", days: [1106, 1110] as [number, number] },
      ],
    },
  ] satisfies Stage[],
};

/**
 * Whether a lesson id falls within a track's day ranges. Most lessons don't
 * carry an explicit `track` field on the Lesson object - track membership is
 * determined by which stage's day range the id falls into (mirrors the
 * dashboard's own stage-matching logic). An explicit `track` field, when
 * present, still takes priority and is checked by the caller first.
 */
export function isLessonIdInTrack(id: number, track: "personal" | "professional"): boolean {
  const stages = track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages;
  return stages.some((stage) => id >= stage.days[0] && id <= stage.days[1]);
}
