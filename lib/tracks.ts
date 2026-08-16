/* i18n-ignore-start: `tab`, `subtitle`, `description`, `stages` và
   `previewLabel` đã có lớp phủ trong mục `tracks` của
   lib/i18n/dictionaries/dictionaries (vi.ts / en.ts) từ trước lượt dịch này;
   components/login/TrackPreviewPanel.tsx và app/(app)/profile/page.tsx đọc
   `t.tracks[id]`, không đọc thẳng tệp này. `estimatedHours` và `previewSlug`
   là số và khoá định tuyến. */
export const TRACKS = {
  personal: {
    tab: "Tài chính cá nhân",
    subtitle: "Dành cho người mới bắt đầu",
    estimatedHours: 10,
    description: "Kiểm tra tài chính của chính bạn, kiểm soát chi tiêu, xây quỹ khẩn cấp, trả nợ và đầu tư thông minh - không cần kiến thức ngành.",
    // Phải khớp thứ tự và số hiệu của TRACK_PERSONAL.stages trong
    // lib/track-stages.ts - đó mới là thứ người học nhìn thấy trên
    // dashboard. Danh sách này từng dừng ở "Chặng 0 → Chặng 7" của lần
    // đánh số cũ, nên trang giới thiệu hứa một lộ trình khác với lộ trình
    // thật. lib/__tests__/stage-numbering.test.ts giữ hai bên khớp nhau.
    stages: [
      "Chặng 1 - Biết mình: audit, ngân sách, quỹ khẩn cấp, trả nợ",
      "Chặng 2 - Thuế TNCN và lương thực nhận",
      "Chặng 3 - Tư duy tiền bạc và tài chính cơ bản",
      "Chặng 4 - Cổ phiếu, ETF và quỹ đầu tư",
      "Chặng 5 - Trái phiếu và các công cụ cố định",
      "Chặng 6 - Danh mục đầu tư và kế hoạch hưu trí",
      "Chặng 7 - Chiến lược đầu tư cá nhân",
      "Chặng 8 - Quản lý tài sản & hưu trí",
      "Chặng 9 - Nhà ở, bảo vệ tài sản và các quyết định tài chính lớn",
      "Chặng 10 - Tâm lý học tài chính hành vi",
      "Chặng 11 - Tăng thu nhập & đầu tư vào bản thân",
      "Chặng 12 - Ngân hàng, tiết kiệm & tiền gửi",
      "Chặng 13 - Vàng, ngoại tệ và tỷ giá",
      "Chặng 14 - Chứng khoán Việt Nam trong thực tế",
      "Chặng 15 - Crypto & tài sản số",
      "Chặng 16 - Phòng lừa đảo & an toàn tài chính",
      "Chặng 17 - Bất động sản Việt Nam thực chiến",
      "Chặng 18 - Những khoản chi lớn trong đời",
      "Chặng 19 - Y tế, BHYT và rủi ro con người",
      "Chặng 20 - Tài chính theo giai đoạn tuổi",
      "Chặng 21 - Công cụ và vận hành",
    ],
    previewSlug: "audit-tai-chinh-ca-nhan",
    previewLabel: "Chặng 1: Bạn đang đứng ở đâu?",
  },
  professional: {
    tab: "Tài chính chuyên ngành",
    subtitle: "Chuyên sâu, cho người đã có nền tài chính",
    estimatedHours: 18,
    description: "Kế toán, đọc báo cáo tài chính, định giá doanh nghiệp, trái phiếu, danh mục, phái sinh và AI in Finance.",
    // Cố ý KHÔNG đánh số. Dashboard chuyên ngành đánh lại số chặng theo
    // nhánh nghề đang chọn (DashboardClient dựng `Chặng ${displayIdx + 1}`
    // từ PROFESSIONAL_BRANCHES), nên cùng một chặng hiện ra dưới số khác
    // nhau tuỳ nhánh: chặng "Cổ phiếu và định giá" là Chặng 6 trong dữ
    // liệu nhưng là Chặng 1 với người chọn nhánh Đầu tư. Một con số ở đây
    // chỉ đúng cho một nhánh và sai với mọi nhánh còn lại.
    stages: [
      "Kế toán, báo cáo tài chính và chỉ số",
      "Giá trị thời gian của tiền, tài chính doanh nghiệp",
      "Định giá cổ phiếu, trái phiếu và tín dụng",
      "Danh mục đầu tư và công cụ phái sinh",
      "Vận hành tài chính doanh nghiệp hiện đại",
      "AI trong tài chính: đọc báo cáo, phân tích tin và viết memo",
    ],
    previewSlug: "ke-toan-la-gi",
    previewLabel: "Bài mở đầu: Kế toán là ngôn ngữ của kinh doanh",
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
      // Dòng này từng ghi "sẽ xây trong tương lai" và đã sai từ lúc 14 bài
      // Ethics được ánh xạ vào môn này trong lib/cfa-track.ts.
      "Ethics and Professional Standards",
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

/* i18n-ignore-end */
