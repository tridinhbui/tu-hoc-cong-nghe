// Dictionary section for four smaller calculators: EmergencyFundCalculator,
// InteractiveInflationCalculator, InteractiveBudget, InteractiveLiquidityRun.
// See lib/i18n/dictionaries/sections/index.ts for how sections are wired in.

export const moreCalculatorsVi = {

  inflationCalc: {
    title: "Máy tính Lạm phát",
    subtitle: "Xem tiền của bạn mất giá như thế nào theo thời gian",
    amountLabel: "Số tiền hiện tại (triệu VNĐ): {amount}M",
    yearsLabel: "Số năm: {years}",
    rateLabel: "Tỷ lệ lạm phát (%/năm): {rate}%",
    currentValueLabel: "Giá trị hiện tại",
    valueAfterYearsLabel: "Giá trị sau {years} năm",
    millionSuffix: "{amount}M",
    lossTitle: "Mất sức mua",
    lossPercentOfOriginal: "({pct}% giá trị ban đầu)",
    formulaTitle: "Công thức tính:",
    formulaLine: "Giá trị tương lai = Hiện tại / (1 + lạm phát)^năm",
    formulaApplied: "{amount} / (1 + {rate})^{years} = {result}M",
    meaningTitle: "Ý nghĩa:",
    meaningBody:
      "Nếu bạn giữ {amount} triệu tiền mặt trong {years} năm với lạm phát {rate}%/năm, số tiền đó chỉ còn giá trị mua được tương đương {result} triệu ngày nay. Đây là lý do cần đầu tư để lợi nhuận vượt lạm phát.",
  },

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

  inflationCalc: {
    title: "Inflation Calculator",
    subtitle: "See how your money loses value over time",
    amountLabel: "Current amount (million VND): {amount}M",
    yearsLabel: "Years: {years}",
    rateLabel: "Inflation rate (%/year): {rate}%",
    currentValueLabel: "Current value",
    valueAfterYearsLabel: "Value after {years} years",
    millionSuffix: "{amount}M",
    lossTitle: "Loss of purchasing power",
    lossPercentOfOriginal: "({pct}% of original value)",
    formulaTitle: "Formula:",
    formulaLine: "Future value = Current / (1 + inflation)^years",
    formulaApplied: "{amount} / (1 + {rate})^{years} = {result}M",
    meaningTitle: "What this means:",
    meaningBody:
      "If you hold {amount} million in cash for {years} years at {rate}%/year inflation, that money will only buy what {result} million buys today. This is why you need to invest at a return above inflation.",
  },

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
