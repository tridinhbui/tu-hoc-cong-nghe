// Dictionary section for the budget simulator (InteractiveBudget).
// See lib/i18n/dictionaries/sections/index.ts for how sections are wired in.

export const moreCalculatorsVi = {
  budgetSim: {
    categoryNeedsLabel: "Tải nền",
    categoryNeedsHint: "Phần luôn chạy: dịch vụ thường trực, CSDL, hàng đợi",
    categoryWantsLabel: "Tải cao điểm",
    categoryWantsHint: "Phần chỉ cần vào giờ đông, đợt phát hành, chiến dịch",
    categorySaveLabel: "Dự phòng",
    categorySaveHint: "Phần để trống cho sự cố vùng, tăng đột biến, tăng trưởng",
    title: "Chia dung lượng và xem dự phòng đủ cho tăng trưởng sau bao lâu",
    subtitle: "Kéo hai thanh đầu; phần còn lại tự động là dự phòng.",
    incomeLabel: "Dung lượng cấp mỗi tháng",
    incomeAmount: "{amount} nghìn vCPU-giờ",
    incomeAriaLabel: "Dung lượng cấp mỗi tháng, nghìn vCPU-giờ",
    needsAriaLabel: "Tỷ lệ dành cho tải nền",
    wantsAriaLabel: "Tỷ lệ dành cho tải cao điểm",
    categoryAmount: "{amount} nghìn",
    noSavingsMessage: "Không còn chỗ trống nào. Ở mức này, một sự cố vùng buộc phải cắt dịch vụ.",
    savingsPart1: "Để trống",
    savingsAmount: "{amount} nghìn",
    savingsPart2: "mỗi tháng. Mức dự phòng gấp sáu lần tải đang dùng",
    savingsTarget: "{amount} nghìn",
    savingsPart3: "sẽ đủ sau",
    savingsMonths: "{months} tháng",
    savingsPart4: ".",
    footerNote:
      "Cấp thêm dung lượng mà tải tăng theo thì tỷ lệ dự phòng không đổi - và số tháng ở trên cũng gần như không đổi. Đó là lý do tỷ lệ quan trọng hơn con số tuyệt đối.",
  },

};

export const moreCalculatorsEn: typeof moreCalculatorsVi = {
  budgetSim: {
    categoryNeedsLabel: "Baseline load",
    categoryNeedsHint: "Always on: long-running services, databases, queues",
    categoryWantsLabel: "Peak load",
    categoryWantsHint: "Only needed at busy hours, releases, campaigns",
    categorySaveLabel: "Headroom",
    categorySaveHint: "Kept free for zone failures, spikes, and growth",
    title: "Split your capacity and see how long headroom covers growth",
    subtitle: "Drag the first two bars; the rest automatically becomes headroom.",
    incomeLabel: "Capacity provisioned per month",
    incomeAmount: "{amount}k vCPU-hours",
    incomeAriaLabel: "Capacity provisioned per month, thousand vCPU-hours",
    needsAriaLabel: "Share given to baseline load",
    wantsAriaLabel: "Share given to peak load",
    categoryAmount: "{amount}k",
    noSavingsMessage: "No room left at all. At this level, one zone failure forces you to shed traffic.",
    savingsPart1: "You keep",
    savingsAmount: "{amount}k",
    savingsPart2: "free per month. Headroom of six times the load in use",
    savingsTarget: "{amount}k",
    savingsPart3: "will be reached in",
    savingsMonths: "{months} months",
    savingsPart4: ".",
    footerNote:
      "If provisioned capacity and load rise together, the headroom rate stays the same - and so does the number of months above. That's why the rate matters more than the absolute figure.",
  },

};
