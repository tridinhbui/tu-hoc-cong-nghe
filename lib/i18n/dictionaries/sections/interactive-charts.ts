// UI copy for the standalone Interactive* widgets embedded in lesson content:
// InteractiveCashFlowSimulator, InteractiveChart, InteractiveRegression,
// InteractiveTaxBrackets, InteractiveROE. See AGENTS.md "Translating the UI".

export const interactiveChartsVi = {

  chartDemo: {
    title: "📊 Lãi kép tách khỏi lãi đơn từ lúc nào",
    subtitle: "100 triệu ban đầu. Kéo lãi suất và số năm để xem hai đường rời nhau.",
    chartAriaLabel: "Sau {years} năm ở mức {rate}%, lãi kép cho {compound} triệu, lãi đơn cho {simple} triệu",
    compoundLegend: "Lãi kép",
    simpleLegend: "Lãi đơn",
    rateLabel: "Lãi suất mỗi năm",
    rateAriaLabel: "Lãi suất mỗi năm",
    yearsLabel: "Số năm",
    yearsValueSuffix: "{years} năm",
    yearsAriaLabel: "Số năm",
    summaryPart1: "Sau {years} năm: lãi kép",
    summaryCompound: "{compound} triệu",
    summaryPart2: ", lãi đơn",
    summarySimple: "{simple} triệu",
    summaryPart3: ". Chênh lệch",
    summaryGap: "{gap} triệu",
    summaryPart4: "là phần lãi sinh ra từ chính lãi.",
    summaryHint: "Hạ số năm xuống dưới năm rồi kéo lại: mấy năm đầu hai đường gần như dính nhau. Phần lớn khoảng cách được tạo ra ở đoạn cuối - đó là lý do rút tiền ra giữa chừng đắt hơn nhiều so với cảm giác.",
  },

  regressionCalc: {
    title: "Bạn đặt ra sự thật, rồi xem hồi quy tìm lại được bao nhiêu",
    sampleSizeLabel: "Cỡ mẫu",
    trueSlopeLabel: "Hệ số thật",
    noiseLabel: "Mức nhiễu",
    chartAriaLabel: "Biểu đồ phân tán {n} điểm, đường hồi quy có hệ số {estimated} so với hệ số thật {trueSlope}",
    chartHint: "Nét đứt là quan hệ thật bạn vừa đặt. Nét liền là thứ hồi quy tìm ra từ mẫu này.",
    resampleButton: "Lấy mẫu lại",
    resampleHint: "Cùng một sự thật, một mẫu khác. Bấm vài lần ở cỡ mẫu 15 rồi ở cỡ mẫu 300.",
    estimatedSlopeLabel: "Hệ số ước lượng",
    errorLabel: "Lệch so với sự thật",
    r2Label: "R²",
    pValueLabel: "p-value",
    pValueBelowThreshold: "<0,001",
    smallSampleNote: "Ở cỡ mẫu {n}, bấm \"lấy mẫu lại\" vài lần là thấy hệ số nhảy đáng kể dù sự thật không đổi. Đó là sai số chuẩn - và nó là lý do một hệ số đơn lẻ từ mẫu nhỏ không nói được gì chắc chắn.",
    r2ExplainerNote: "R² {r2} không đo mức đúng của mô hình, nó đo phần biến động của y được x giải thích. Tăng nhiễu lên là thấy R² rơi trong khi hệ số ước lượng vẫn quanh giá trị thật — hai thứ khác nhau, và bị nhầm với nhau rất thường xuyên.",
    testsTriedLabel: "Số biến đã thử trước khi báo cáo kết quả",
    testsTriedAriaLabel: "Số biến đã thử",
    pHackingText: "Thử {tests} biến ở mức ý nghĩa 5% trên dữ liệu KHÔNG có quan hệ nào, xác suất tìm được ít nhất một kết quả \"có ý nghĩa thống kê\" là {chance}%. Đó là toàn bộ p-hacking: không ai bịa số liệu, người ta chỉ thử đủ nhiều rồi báo cáo cái nào đẹp. Vì thế một kết quả có ý nghĩa chỉ đáng tin khi biết nó là phép thử thứ mấy.",
  },


};

export const interactiveChartsEn: typeof interactiveChartsVi = {

  chartDemo: {
    title: "📊 When compound interest pulls away from simple interest",
    subtitle: "Starting with 100 million. Drag the rate and number of years to watch the lines separate.",
    chartAriaLabel: "After {years} years at {rate}%, compound interest gives {compound} million, simple interest gives {simple} million",
    compoundLegend: "Compound interest",
    simpleLegend: "Simple interest",
    rateLabel: "Annual interest rate",
    rateAriaLabel: "Annual interest rate",
    yearsLabel: "Number of years",
    yearsValueSuffix: "{years} years",
    yearsAriaLabel: "Number of years",
    summaryPart1: "After {years} years: compound interest gives",
    summaryCompound: "{compound} million",
    summaryPart2: ", simple interest gives",
    summarySimple: "{simple} million",
    summaryPart3: ". The",
    summaryGap: "{gap} million",
    summaryPart4: "gap is interest earned on interest.",
    summaryHint: "Drop the years below five, then drag it back up: the first few years the two lines are almost stuck together. Most of the gap forms near the end - which is why cashing out early costs far more than it feels like.",
  },

  regressionCalc: {
    title: "You set the truth, then see how much the regression recovers",
    sampleSizeLabel: "Sample size",
    trueSlopeLabel: "True coefficient",
    noiseLabel: "Noise level",
    chartAriaLabel: "Scatter plot of {n} points, regression line with coefficient {estimated} against true coefficient {trueSlope}",
    chartHint: "The dashed line is the true relationship you just set. The solid line is what the regression found from this sample.",
    resampleButton: "Resample",
    resampleHint: "Same truth, a different sample. Click a few times at sample size 15, then at 300.",
    estimatedSlopeLabel: "Estimated coefficient",
    errorLabel: "Error vs. truth",
    r2Label: "R²",
    pValueLabel: "p-value",
    pValueBelowThreshold: "<0.001",
    smallSampleNote: "At sample size {n}, click \"resample\" a few times and you'll see the coefficient swing noticeably even though the truth hasn't changed. That's standard error - and it's why a single coefficient from a small sample can't tell you much for certain.",
    r2ExplainerNote: "R² {r2} does not measure how correct the model is - it measures the share of y's variation explained by x. Raise the noise and R² drops while the estimated coefficient stays near the true value — two different things that get confused with each other constantly.",
    testsTriedLabel: "Number of variables tried before reporting the result",
    testsTriedAriaLabel: "Number of variables tried",
    pHackingText: "Try {tests} variables at a 5% significance level on data with NO relationship at all, and the probability of finding at least one \"statistically significant\" result is {chance}%. That's the entirety of p-hacking: nobody fabricates data, people just try enough things and report the one that looks good. So a significant result is only trustworthy once you know how many attempts it took.",
  },


};
