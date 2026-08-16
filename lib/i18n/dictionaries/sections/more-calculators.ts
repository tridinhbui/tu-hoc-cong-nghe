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
    categoryNeedsLabel: "Thiết yếu",
    categoryNeedsHint: "Thuê nhà, ăn uống, đi lại, hoá đơn",
    categoryWantsLabel: "Mong muốn",
    categoryWantsHint: "Ăn ngoài, giải trí, mua sắm",
    categorySaveLabel: "Tiết kiệm & đầu tư",
    categorySaveHint: "Quỹ khẩn cấp, đầu tư, trả nợ thêm",
    title: "Chia ngân sách và xem quỹ khẩn cấp mất bao lâu",
    subtitle: "Kéo hai thanh đầu; phần còn lại tự động là tiết kiệm.",
    incomeLabel: "Thu nhập mỗi tháng",
    incomeAmount: "{amount} triệu",
    incomeAriaLabel: "Thu nhập mỗi tháng, triệu đồng",
    needsAriaLabel: "Tỷ lệ chi thiết yếu",
    wantsAriaLabel: "Tỷ lệ chi cho mong muốn",
    categoryAmount: "{amount} triệu",
    noSavingsMessage: "Không còn đồng nào để dành. Ở mức này, một sự cố bất ngờ buộc phải vay.",
    savingsPart1: "Để dành",
    savingsAmount: "{amount} triệu",
    savingsPart2: "mỗi tháng. Quỹ khẩn cấp sáu tháng chi phí",
    savingsTarget: "{amount} triệu",
    savingsPart3: "sẽ đủ sau",
    savingsMonths: "{months} tháng",
    savingsPart4: ".",
    footerNote:
      "Tăng thu nhập mà chi tiêu tăng theo thì tỷ lệ tiết kiệm không đổi - và số tháng ở trên cũng gần như không đổi. Đó là lý do tỷ lệ quan trọng hơn số tiền.",
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
    categoryNeedsLabel: "Needs",
    categoryNeedsHint: "Rent, food, transport, bills",
    categoryWantsLabel: "Wants",
    categoryWantsHint: "Eating out, entertainment, shopping",
    categorySaveLabel: "Savings & investing",
    categorySaveHint: "Emergency fund, investing, extra debt payoff",
    title: "Split your budget and see how long the emergency fund takes",
    subtitle: "Drag the first two bars; the rest automatically goes to savings.",
    incomeLabel: "Monthly income",
    incomeAmount: "{amount} million",
    incomeAriaLabel: "Monthly income, million VND",
    needsAriaLabel: "Needs spending share",
    wantsAriaLabel: "Wants spending share",
    categoryAmount: "{amount} million",
    noSavingsMessage: "Nothing left to save. At this level, any surprise expense forces you to borrow.",
    savingsPart1: "You'll save",
    savingsAmount: "{amount} million",
    savingsPart2: "per month. A six-month emergency fund",
    savingsTarget: "{amount} million",
    savingsPart3: "will be ready in",
    savingsMonths: "{months} months",
    savingsPart4: ".",
    footerNote:
      "If income and spending rise together, the savings rate stays the same - and so does the number of months above. That's why the rate matters more than the amount.",
  },

};
