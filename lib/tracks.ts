export const TRACKS = {
  personal: {
    tab: "Tài chính cá nhân",
    subtitle: "Lộ trình 108 ngày · dành cho người mới",
    estimatedHours: 10,
    description: "Kiểm tra tài chính của chính bạn, kiểm soát chi tiêu, xây quỹ khẩn cấp, trả nợ và đầu tư thông minh - không cần kiến thức ngành.",
    stages: [
      "Chặng 0 - Biết mình: audit, ngân sách, quỹ khẩn cấp, trả nợ",
      "Chặng 1 - Tư duy tiền bạc và tài chính cơ bản",
      "Chặng 2 - Cổ phiếu, ETF và quỹ đầu tư",
      "Chặng 3 - Trái phiếu và các công cụ cố định",
      "Chặng 4 - Danh mục đầu tư và kế hoạch hưu trí",
      "Chặng 5 - Chiến lược đầu tư cá nhân",
      "Chặng 6 - Quản lý tài sản & hưu trí",
      "Chặng 7 - Nhà ở, bảo vệ tài sản và các quyết định tài chính lớn",
    ],
    previewSlug: "audit-tai-chinh-ca-nhan",
    previewLabel: "Chặng 0: Bạn đang đứng ở đâu?",
  },
  professional: {
    tab: "Tài chính chuyên ngành",
    subtitle: "Lộ trình 180 ngày · chuyên sâu",
    estimatedHours: 18,
    description: "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục, phái sinh và AI in Finance.",
    stages: [
      "Chặng 1-3 - Kế toán, báo cáo tài chính, chỉ số",
      "Chặng 4-5 - Giá trị thời gian của tiền, tài chính doanh nghiệp",
      "Chặng 6-7 - Định giá cổ phiếu, trái phiếu và tín dụng",
      "Chặng 8-9 - Danh mục đầu tư và công cụ phái sinh",
      "Chặng 11 - Vận hành tài chính doanh nghiệp hiện đại (sắp ra mắt)",
      "Chặng 13 - AI in Finance, Prompt Engineering và trợ lý phân tích",
    ],
    previewSlug: "ke-toan-la-gi",
    previewLabel: "Day 21: Kế toán là ngôn ngữ của kinh doanh",
  },
  cfa: {
    tab: "Tài chính chứng chỉ",
    subtitle: "CFA Level I · đang xây dựng",
    // Sum of the ~258 mapped lessons' own durations (lib/cfa-track.ts),
    // same "total lesson minutes / 60" method as the other two tracks -
    // not an estimate of real CFA Level I study time (that's the 300h
    // figure CFA Institute cites), just how long it'd take to read every
    // lesson currently mapped into these 10 subjects.
    estimatedHours: 27,
    description: "Ánh xạ các bài học đã có sang đúng 10 môn thi CFA Level I chính thức - không tạo bài mới, không đổi số ngày của 2 track kia. Môn nào chưa có bài phù hợp sẽ được xây dần.",
    stages: [
      "Ethics and Professional Standards - sẽ xây trong tương lai",
      "Quantitative Methods, Economics",
      "Financial Statement Analysis, Corporate Issuers",
      "Equity Investments, Fixed Income",
      "Derivatives, Alternative Investments, Portfolio Management",
    ],
    previewSlug: "",
    previewLabel: "Xem lộ trình CFA Level I",
  },
} as const;

export type TrackId = keyof typeof TRACKS;
