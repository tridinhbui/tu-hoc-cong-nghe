export const TRACKS = {
  personal: {
    tab: "Tài chính cá nhân",
    subtitle: "Lộ trình 108 ngày · dành cho người mới",
    estimatedHours: 10,
    description: "Kiểm tra tài chính của chính bạn, kiểm soát chi tiêu, xây quỹ khẩn cấp, trả nợ và đầu tư thông minh — không cần kiến thức ngành.",
    stages: [
      "Chặng 0 — Biết mình: audit, ngân sách, quỹ khẩn cấp, trả nợ",
      "Chặng 1 — Tư duy tiền bạc và tài chính cơ bản",
      "Chặng 2 — Cổ phiếu, ETF và quỹ đầu tư",
      "Chặng 3 — Trái phiếu và các công cụ cố định",
      "Chặng 4 — Danh mục đầu tư và kế hoạch hưu trí",
      "Chặng 5 — Chiến lược đầu tư cá nhân",
      "Chặng 6 — Quản lý tài sản & hưu trí",
    ],
    previewSlug: "audit-tai-chinh-ca-nhan",
    previewLabel: "Chặng 0: Bạn đang đứng ở đâu?",
  },
  professional: {
    tab: "Tài chính chuyên ngành",
    subtitle: "Lộ trình 180 ngày · chuyên sâu",
    estimatedHours: 18,
    description: "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục và phái sinh.",
    stages: [
      "Chặng 1-3 — Kế toán, báo cáo tài chính, chỉ số",
      "Chặng 4-5 — Giá trị thời gian của tiền, tài chính doanh nghiệp",
      "Chặng 6-7 — Định giá cổ phiếu, trái phiếu và tín dụng",
      "Chặng 8-9 — Danh mục đầu tư và công cụ phái sinh",
    ],
    previewSlug: "ke-toan-la-gi",
    previewLabel: "Day 21: Kế toán là ngôn ngữ của kinh doanh",
  },
} as const;

export type TrackId = keyof typeof TRACKS;
