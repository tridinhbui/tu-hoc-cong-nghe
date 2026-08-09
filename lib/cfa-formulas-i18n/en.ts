import type { FormulaTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 98 công thức CFA, khoá theo `id`.
 *
 * Cùng luật với lib/frm-formulas-i18n/en.ts, và có một luật riêng mà kho FRM
 * không cần:
 *
 * 1. `title` gần như mục nào cũng KÈM SẴN tiếng Anh trong ngoặc - "Hệ Số
 *    Sharpe (Sharpe Ratio)". Bản tiếng Anh là phần trong ngoặc đó, bỏ ngoặc
 *    đi. Đừng dịch lại từ đầu rồi ra một cách gọi khác với chính chữ người học
 *    vừa nhìn thấy.
 *
 * 2. `badge` có dạng "Môn • Nhóm chủ đề". Tên môn là tên môn thi của CFA
 *    Institute (Quant, FSA, Corporate, Equity, Fixed Income, Portfolio,
 *    Derivatives, Econ, Alt) nên giữ nguyên; chỉ dịch phần sau dấu •, và nhiều
 *    mục phần đó đã là tiếng Anh sẵn.
 *
 * 3. LUẬT RIÊNG CỦA KHO NÀY: rất nhiều `variables[].name` đã viết theo kiểu
 *    "Thuật ngữ tiếng Anh (giải thích tiếng Việt)" - "Risk-free Rate (Lãi suất
 *    trái phiếu chính phủ)". Bản tiếng Anh KHÔNG phải là bỏ phần trong ngoặc
 *    đi: phần đó mang thông tin mà cụm tiếng Anh không có. Phải dịch nó thành
 *    một câu tiếng Anh đọc được - "Risk-free rate - yield on government
 *    bonds" - chứ không cắt cụt.
 *
 * 4. ĐỔI DẤU THẬP PHÂN VÀ ĐƠN VỊ TIỀN. Kho này dày đặc số: "125.97 Triệu VNĐ"
 *    thành "VND 125.97 million", "30,000 VNĐ / Cổ phiếu" thành "VND 30,000 per
 *    share", "10 tỷ" thành "VND 10 billion". Đây là chỗ dễ sót nhất vì nó nằm
 *    trong `example.result`, không phải trong câu văn.
 *
 * 5. `equation`, `numerator`, `denominator` chỉ dịch KHI chúng là câu chữ.
 *    "FV = PV × (1 + r)^n" giữ nguyên; "Lợi nhuận ròng (Net Income)" thì dịch.
 */
export const cfaFormulasEn: Record<string, FormulaTranslation> = {
  // ─── Quantitative Methods ────────────────────────────────────────────────
  "q-001": {
    title: "Future Value of Money (TVM)",
    badge: "Quant • TVM",
    variables: [
      { name: "Future value" },
      { name: "Present value" },
      { name: "Discount rate per period" },
      { name: "Number of periods" },
    ],
    example: {
      title: "Worked TVM example",
      calculation: "PV = 100M, r = 8%/year, n = 3 years -> FV = 100 × (1 + 0.08)^3",
      result: "VND 125.97 million",
      explanation:
        "Deposit 100 million and after 3 years at 8% compounded annually you get back 125.97 million.",
    },
  },
  "q-002": {
    title: "Sharpe Ratio",
    badge: "Quant • Risk",
    numerator: "Portfolio return (Rp) − Risk-free rate (Rf)",
    denominator: "Portfolio standard deviation (σp)",
    variables: [
      { name: "Portfolio return" },
      { name: "Risk-free rate - yield on government bonds" },
      { name: "Standard deviation - the portfolio's total risk" },
    ],
    example: {
      calculation: "(15% - 4%) / 10%",
      result: "1.10",
      explanation: "Every 1% of risk carried delivers 1.10% of excess return.",
    },
  },

  // ─── Financial Statement Analysis ────────────────────────────────────────
  "fsa-001": {
    title: "Return on Equity (ROE)",
    badge: "FSA • Profitability",
    numerator: "Net income",
    denominator: "Average shareholders' equity",
    variables: [
      { name: "After-tax profit attributable to shareholders" },
      { name: "(Opening equity + closing equity) / 2" },
    ],
    example: {
      calculation: "(VND 150bn / VND 1,000bn) × 100%",
      result: "15.0%",
    },
  },
  "fsa-002": {
    title: "DuPont 3-Step Analysis",
    badge: "FSA • DuPont",
    variables: [
      { name: "Net income / Revenue" },
      { name: "Revenue / Average total assets" },
      { name: "Average total assets / Average equity" },
    ],
    example: {
      calculation: "10% (NPM) × 1.2 (asset turnover) × 1.5 (leverage)",
      result: "18.0% ROE",
    },
  },
  "fsa-003": {
    title: "DuPont 5-Step Analysis",
    badge: "FSA • DuPont",
    variables: [
      { name: "Net income / EBT" },
      { name: "EBT / EBIT" },
      { name: "EBIT / Revenue" },
      { name: "Revenue / Average total assets" },
      { name: "Average assets / Average equity" },
    ],
  },
  "fsa-004": {
    title: "Free Cash Flow to the Firm (FCFF)",
    badge: "FSA • Cash Flow",
    variables: [
      { name: "Net income" },
      { name: "Non-cash charges - depreciation and other non-cash items" },
      { name: "Interest expense" },
      { name: "Tax rate" },
      { name: "Capital expenditures on fixed assets" },
      { name: "Working capital investment - the change in working capital" },
    ],
  },
  "fsa-005": {
    title: "Free Cash Flow to Equity (FCFE)",
    badge: "FSA • Cash Flow",
    variables: [
      { name: "Cash flow from operations" },
      { name: "Capital expenditures on fixed assets" },
      { name: "New borrowings less principal repaid" },
    ],
  },

  // ─── Corporate Issuers ───────────────────────────────────────────────────
  "corp-001": {
    title: "Weighted Average Cost of Capital (WACC)",
    badge: "Corporate • WACC",
    variables: [
      { name: "Weights of debt, preferred equity and common equity" },
      { name: "Pre-tax cost of debt" },
      { name: "Corporate income tax rate" },
      { name: "Cost of common equity" },
    ],
    example: {
      calculation: "(40% × 8% × (1 - 20%)) + (60% × 12%)",
      result: "9.76% WACC",
    },
  },
  "corp-002": {
    title: "Net Present Value (NPV)",
    badge: "Corporate • Capital Budgeting",
    variables: [
      { name: "Net cash flow in year t" },
      { name: "Risk-adjusted discount rate (WACC)" },
      { name: "Up-front investment cost" },
    ],
  },

  // ─── Equity Investments ──────────────────────────────────────────────────
  "eq-001": {
    title: "Gordon Growth Dividend Discount Model",
    badge: "Equity • Valuation",
    numerator: "Next year's expected dividend (D1 = D0 × (1 + g))",
    denominator: "Required return (r) − Dividend growth rate (g)",
    variables: [
      { name: "Dividend just paid in the most recent period" },
      { name: "Long-run dividend growth rate" },
      { name: "Required return on equity (CAPM)" },
    ],
    example: {
      calculation: "(2,000 × (1 + 0.05)) / (0.12 - 0.05)",
      result: "VND 30,000 per share",
    },
  },
  "eq-002": {
    title: "Sustainable Growth Rate (g)",
    badge: "Equity • Valuation",
    variables: [
      { name: "Return on equity" },
      { name: "Retention rate - earnings kept in the business = 1 − payout ratio" },
    ],
  },

  // ─── Fixed Income ────────────────────────────────────────────────────────
  "fi-001": {
    title: "Modified Duration",
    badge: "Fixed Income • Risk",
    variables: [
      { name: "Percentage price sensitivity of a bond to a 1% move in yields" },
    ],
    example: {
      calculation: "Macaulay duration = 5.2 years, YTM = 5% -> ModDur = 5.2 / 1.05",
      result: "4.95 years",
      explanation: "If YTM rises by 1%, the bond price falls by roughly 4.95%.",
    },
  },
  "fi-002": {
    title: "Bond Price Change (Duration & Convexity)",
    badge: "Fixed Income • Risk",
  },

  // ─── Portfolio Management ────────────────────────────────────────────────
  "port-001": {
    title: "Capital Asset Pricing Model (CAPM)",
    badge: "Portfolio • CAPM",
    variables: [
      { name: "Risk-free rate" },
      { name: "Beta - the systematic risk of stock i" },
      { name: "Market risk premium" },
    ],
    example: {
      calculation: "Rf = 4%, beta = 1.2, E(Rm) = 11% -> 4% + 1.2 × (11% - 4%)",
      result: "12.4%",
    },
  },

  // ─── Derivatives ─────────────────────────────────────────────────────────
  "der-001": {
    title: "Put-Call Parity",
    badge: "Derivatives • Options",
    variables: [
      { name: "Call price" },
      { name: "Put price" },
      { name: "Strike price" },
      { name: "Spot price of the underlying today" },
    ],
  },
  "der-002": {
    title: "Forward Price of a Non-Income-Producing Asset",
    badge: "Derivatives • Forward",
    variables: [
      { name: "Forward price agreed today" },
      { name: "Current spot price" },
      { name: "Risk-free rate" },
      { name: "Time to maturity (years)" },
    ],
    example: {
      calculation: "S0 = 100, r = 5%, T = 1 -> F0 = 100 × 1.05",
      result: "105",
      explanation:
        "A forward price is not a forecast of the future price - it is the spot price plus the cost of carrying the asset to maturity.",
    },
  },
  "der-003": {
    title: "Forward Price When the Asset Pays Income",
    badge: "Derivatives • Forward",
    variables: [
      { name: "Present value of income received before maturity" },
      { name: "Spot price" },
      { name: "Risk-free rate" },
      { name: "Time to maturity" },
    ],
    example: {
      calculation: "S0 = 100, PV of dividends = 2, r = 5%, T = 1",
      result: "102.90",
      explanation:
        "The income belongs to whoever holds the asset, not to the forward buyer, so it is subtracted from the forward price.",
    },
  },
  "der-004": {
    title: "Value of a Forward Contract Before Maturity",
    badge: "Derivatives • Forward",
    variables: [
      { name: "Value of the contract to the buyer at time t" },
      { name: "Current forward price for the same maturity date" },
      { name: "Forward price locked in at inception" },
    ],
    example: {
      calculation: "Ft = 110, F0 = 105, r = 5%, 0.5 years remaining",
      result: "4.88",
      explanation:
        "A forward is worth zero at inception, then drifts as the prevailing forward price moves away from the locked-in level.",
    },
  },
  "der-005": {
    title: "Intrinsic Value of an Option",
    badge: "Derivatives • Options",
    variables: [
      { name: "Current price of the underlying" },
      { name: "Strike price" },
    ],
    example: {
      calculation: "S = 120, X = 100 -> Call = max(20, 0); Put = max(-20, 0)",
      result: "Call 20, Put 0",
      explanation:
        "Intrinsic value is never negative - the holder can simply decline to exercise, so the downside stops at zero.",
    },
  },
  "der-006": {
    title: "Time Value of an Option",
    badge: "Derivatives • Options",
    equation: "Option price = Intrinsic value + Time value",
    variables: [
      { name: "What you pay for the chance the underlying still moves in your favour before expiry" },
    ],
    example: {
      calculation: "Call priced at 25, S = 120, X = 100 -> intrinsic 20",
      result: "Time value = 5",
      explanation:
        "Time value decays to zero at expiry, and decays fastest in the final stretch.",
    },
  },
  "der-007": {
    title: "Fixed Rate on an Interest Rate Swap",
    badge: "Derivatives • Swaps",
    numerator: "1 − Discount factor for the final period",
    denominator: "Sum of the discount factors for every payment date",
    variables: [
      { name: "Discount factor - present value of 1 unit received in each period" },
    ],
    example: {
      calculation: "Factors: 0.97, 0.94, 0.90 -> (1 - 0.90) / 2.81",
      result: "3.56%",
      explanation:
        "The swap's fixed rate is the level that makes both legs worth the same, which is why a swap is worth zero at inception.",
    },
  },

  // ─── Economics ───────────────────────────────────────────────────────────
  "econ-001": {
    title: "Fisher Relation - Real and Nominal Rates",
    badge: "Econ • Interest rates",
    variables: [
      { name: "Nominal interest rate" },
      { name: "Real interest rate" },
      { name: "Expected inflation" },
    ],
    example: {
      calculation: "i = 8%, π = 5% -> r = 1.08/1.05 - 1",
      result: "2.86%",
      explanation:
        "The additive approximation gives 3%; the multiplicative formula gives 2.86%. The gap widens as inflation rises.",
    },
  },
  "econ-002": {
    title: "Covered Interest Rate Parity",
    badge: "Econ • Exchange rates",
    equation: "F/S = (1 + i_domestic) / (1 + i_foreign)",
    variables: [
      { name: "Forward exchange rate" },
      { name: "Spot exchange rate" },
      { name: "Interest rate in each currency" },
    ],
    example: {
      calculation: "S = 25,000, i_VND = 5%, i_USD = 2% -> F = 25,000 × 1.05/1.02",
      result: "25,735",
      explanation:
        "The forward rate reflects the interest rate differential; it is not a forecast of the future spot rate.",
    },
  },
  "econ-003": {
    title: "Relative Purchasing Power Parity",
    badge: "Econ • Exchange rates",
    equation: "%ΔS ≈ π_domestic − π_foreign",
    variables: [
      { name: "Percentage change in the exchange rate" },
      { name: "Inflation in each economy" },
    ],
    example: {
      calculation: "π_Vietnam = 4%, π_US = 2% -> VND depreciates by about 2% a year",
      result: "≈ 2%",
      explanation:
        "This is the long-run anchor for exchange rates; over short horizons capital flows dominate it by a wide margin.",
    },
  },
  "econ-004": {
    title: "Real Exchange Rate",
    badge: "Econ • Exchange rates",
    equation: "Real exchange rate = Nominal rate × (P_foreign / P_domestic)",
    variables: [{ name: "Price level in each economy" }],
    example: {
      calculation: "Nominal up 5%, domestic prices up 6%, foreign prices up 2%",
      result: "Real exchange rate roughly unchanged",
      explanation:
        "It is the real rate that decides how competitive exports are, not the nominal number.",
    },
  },
  "econ-005": {
    title: "Price Elasticity of Demand",
    badge: "Econ • Supply and demand",
    numerator: "Percentage change in quantity demanded",
    denominator: "Percentage change in price",
    variables: [
      { name: "Elastic demand - cutting the price raises total revenue" },
      { name: "Inelastic demand - raising the price raises total revenue" },
    ],
    example: {
      calculation: "Price up 10%, quantity demanded down 25% -> E = -2.5",
      result: "Elastic",
      explanation:
        "Only a firm facing inelastic demand has pricing power, and that is what an analyst is looking for when assessing competitive advantage.",
    },
  },
  "econ-006": {
    title: "Money Multiplier",
    badge: "Econ • Monetary policy",
    denominator: "Required reserve ratio",
    variables: [{ name: "The share of deposits a bank must hold back" }],
    example: {
      calculation: "Reserve ratio of 10% -> multiplier = 1/0.10",
      result: "10x",
      explanation:
        "This is the theoretical ceiling; the real multiplier is lower because banks hold excess reserves and the public holds cash.",
    },
  },
  "econ-007": {
    title: "GDP Deflator",
    badge: "Econ • Output",
    numerator: "Nominal GDP",
    denominator: "Real GDP",
    variables: [
      { name: "Measured at current prices" },
      { name: "Measured at base-year prices" },
    ],
    example: {
      calculation: "Nominal GDP 110, real GDP 100",
      result: "110",
      explanation:
        "Unlike CPI, the deflator covers everything produced domestically, while CPI tracks a fixed consumption basket.",
    },
  },

  // ─── Alternative Investments ─────────────────────────────────────────────
  "alt-001": {
    title: "Net Operating Income and Property Value",
    badge: "Alt • Real estate",
    numerator: "NOI (net operating income)",
    denominator: "Cap rate",
    variables: [
      { name: "Rental revenue less operating expenses, before interest and tax" },
      { name: "The market yield demanded for that asset" },
    ],
    example: {
      calculation: "NOI = VND 700 million, cap rate 7%",
      result: "VND 10 billion",
      explanation:
        "The cap rate sits in the denominator, so the relationship is inverse: rising rates push cap rates up and values down even when rents are flat.",
    },
  },
  "alt-002": {
    title: "Multiple on Invested Capital (MOIC)",
    badge: "Alt • Private Equity",
    numerator: "Total distributed value + Residual value",
    denominator: "Total capital called",
    variables: [{ name: "Multiple on invested capital - how many times the original money" }],
    example: {
      calculation: "Distributed 150, residual 90, called 100",
      result: "2.4x",
      explanation:
        "MOIC ignores time, so it always has to be read alongside IRR - 2.4x over 4 years is nothing like 2.4x over 12.",
    },
  },
  "alt-003": {
    title: "DPI, RVPI and TVPI of a PE/VC Fund",
    badge: "Alt • Private Equity",
    equation: "DPI = Distributed / Called   |   RVPI = Residual value / Called   |   TVPI = DPI + RVPI",
    variables: [
      { name: "Cash actually back in investors' hands" },
      { name: "What is still inside the fund, so far only a valuation" },
      { name: "The two above added together" },
    ],
    example: {
      calculation: "DPI = 1.5, RVPI = 0.9",
      result: "TVPI = 2.4",
      explanation:
        "DPI is real money; RVPI is a number the GP marked themselves - so a fund with high TVPI and low DPI has not proven anything yet.",
    },
  },
  "alt-004": {
    title: "Performance Fee with a Hurdle and High-Water Mark",
    badge: "Alt • Fund fees",
    equation:
      "Performance fee = Carry rate × max(0, closing NAV − max(high-water mark, opening NAV × (1 + hurdle)))",
    variables: [
      { name: "High-water mark - the highest NAV ever reached, which stops the same gain being charged for twice" },
      { name: "Hurdle - the minimum return before any carry is taken" },
    ],
    example: {
      calculation: "NAV 100 -> 120, hurdle 8%, carry 20% -> 20% × (120 - 108)",
      result: "2.4",
      explanation:
        "Without a high-water mark, a fund that gains, loses and gains again charges twice while the investor is barely back to even.",
    },
  },
  "alt-005": {
    title: "Cash-on-Cash Return of a Leveraged Property",
    badge: "Alt • Leverage",
    numerator: "NOI − Interest expense",
    denominator: "Equity actually invested",
    variables: [
      { name: "Net operating income" },
      { name: "Equity - purchase price less the bank loan" },
    ],
    example: {
      calculation: "NOI 700m, interest 480m, equity VND 3 billion",
      result: "7.33%",
      explanation:
        "Leverage only amplifies returns while the cap rate exceeds the borrowing rate; below that, every extra unit of debt makes cash flow worse.",
    },
  },
  "alt-006": {
    title: "Debt Service Coverage Ratio (DSCR)",
    badge: "Alt • Real estate",
    numerator: "NOI",
    denominator: "Total debt service for the year",
    variables: [
      { name: "The property cannot service its own loan" },
      { name: "The cushion project lenders usually require" },
    ],
    example: {
      calculation: "NOI 700m, debt service 820m",
      result: "0.85",
      explanation:
        "Below 1 means the owner tops the loan up from somewhere else every year - and that is when one empty quarter becomes a crisis.",
    },
  },

  // ─── Portfolio Management (continued) ────────────────────────────────────
  "port-002": {
    title: "Two-Asset Portfolio Variance",
    badge: "Portfolio • Risk",
    variables: [
      { name: "Weight of each asset" },
      { name: "Standard deviation of each asset" },
      { name: "Correlation between the two assets" },
    ],
    example: {
      calculation: "w = 50/50, σ1 = σ2 = 20%, ρ = 0.2",
      result: "σp ≈ 15.5%",
      explanation:
        "The whole diversification benefit lives in that last term: the lower ρ is, the further portfolio risk falls below the average of the parts.",
    },
  },
  "port-003": {
    title: "Treynor Ratio",
    badge: "Portfolio • Performance",
    denominator: "Portfolio beta (βp)",
    variables: [{ name: "How sensitive the portfolio is to the broad market" }],
    example: {
      calculation: "Rp = 14%, Rf = 4%, β = 1.25",
      result: "8.0%",
      explanation:
        "Treynor divides by systematic risk, so it fits an already well-diversified portfolio; Sharpe divides by total risk.",
    },
  },
  "port-004": {
    title: "Jensen's Alpha",
    badge: "Portfolio • Performance",
    variables: [
      { name: "Market return" },
      { name: "Portfolio beta" },
    ],
    example: {
      calculation: "Rp = 14%, Rf = 4%, β = 1.0, Rm = 12%",
      result: "α = 2%",
      explanation:
        "Alpha is what is left after subtracting the part CAPM already explains - the part that actually came from skill.",
    },
  },
  "port-005": {
    title: "Information Ratio",
    badge: "Portfolio • Performance",
    numerator: "Rp − R_benchmark",
    denominator: "Tracking error",
    variables: [
      { name: "Tracking error - standard deviation of the difference against the benchmark" },
    ],
    example: {
      calculation: "3% above the index, tracking error 5%",
      result: "0.60",
      explanation:
        "It measures how consistent the excess return is - the question of whether an active manager is worth the fee.",
    },
  },

  // ─── Quantitative Methods (continued) ────────────────────────────────────
  "q-003": {
    title: "Coefficient of Variation",
    badge: "Quant • Risk",
    numerator: "Standard deviation (σ)",
    denominator: "Mean (μ)",
    variables: [{ name: "Risk per unit of expected return" }],
    example: {
      calculation: "σ = 12%, μ = 8%",
      result: "1.5",
      explanation:
        "CV lets you compare risk across two investments with very different return scales, which a standard deviation on its own cannot do.",
    },
  },
  "q-004": {
    title: "Geometric Mean Return",
    badge: "Quant • Returns",
    variables: [{ name: "Average compounded return per period" }],
    example: {
      calculation: "Up 50% then down 50% -> [(1.5)(0.5)]^0.5 - 1",
      result: "-13.4%",
      explanation:
        "The arithmetic mean says 0%, hiding the fact that the investor lost 25% of their capital. Only the geometric mean describes the compounded outcome.",
    },
  },
  "q-005": {
    title: "Standard Error of the Sample Mean",
    badge: "Quant • Statistics",
    numerator: "Sample standard deviation (s)",
    denominator: "Square root of sample size (√n)",
    variables: [{ name: "Number of observations in the sample" }],
    example: {
      calculation: "s = 20%, n = 36 -> 20/6",
      result: "3.33%",
      explanation:
        "Halving the error takes four times the sample - which is why short-run performance data settles very little.",
    },
  },
  "q-006": {
    title: "Money-Weighted (MWRR) and Time-Weighted (TWR) Returns",
    badge: "Quant • Performance",
    equation: "TWR: chain the sub-period returns   |   MWRR: the IRR of the whole cash flow stream",
    variables: [
      { name: "Measures the strategy, ignoring when money went in and out" },
      { name: "Measures what the investor actually experienced" },
    ],
    example: {
      calculation: "Fund reports TWR of 15%; the investor added heavily right before a drawdown",
      result: "MWRR much lower",
      explanation:
        "Funds report TWR because the manager does not control the timing of flows; an investor should work out their own MWRR.",
    },
  },
  "q-007": {
    title: "Effective Annual Rate (EAR)",
    badge: "Quant • TVM",
    variables: [
      { name: "Nominal annual rate" },
      { name: "Compounding periods per year" },
    ],
    example: {
      calculation: "i = 12%/year, compounded monthly: (1 + 0.12/12)^12 − 1",
      result: "12.68%",
      explanation:
        "The more often it compounds, the higher the EAR. Comparing two loans by their nominal rates is comparing the wrong thing when compounding frequencies differ.",
    },
  },
  "q-008": {
    title: "Present Value of an Annuity",
    badge: "Quant • TVM",
    variables: [
      { name: "The level payment each period" },
      { name: "Number of periods" },
      { name: "Discount rate per period" },
    ],
    example: {
      calculation: "A = VND 10 million/year, N = 5, r = 8%",
      result: "VND 39.93 million",
      explanation:
        "This is an ordinary annuity - paid at the end of each period. For an annuity due, paid at the start, multiply by (1 + r).",
    },
  },
  "q-009": {
    title: "Present Value of a Perpetuity",
    badge: "Quant • TVM",
    variables: [
      { name: "The level payment received forever, each period" },
      { name: "Discount rate per period" },
    ],
    example: {
      calculation: "Preferred dividend of VND 6,000/year, r = 10%",
      result: "VND 60,000",
      explanation:
        "The N → ∞ case of an annuity. It only works while r > 0, and it is the skeleton of the Gordon model with g = 0.",
    },
  },
  "q-010": {
    title: "Bayes' Theorem",
    badge: "Quant • Probability",
    variables: [
      { name: "Prior probability - what you believed before the new information" },
      { name: "Posterior probability - after learning that B happened" },
    ],
    example: {
      calculation: "P(default) = 5%, P(downgrade | default) = 80%, P(downgrade) = 12%",
      result: "P(default | downgrade) ≈ 33%",
      explanation:
        "The common mistake is confusing P(A|B) with P(B|A). In the example above, 80% and 33% are entirely different numbers.",
    },
  },
  "q-011": {
    title: "Confidence Interval for a Population Mean",
    badge: "Quant • Inference",
    variables: [
      { name: "Sample mean" },
      { name: "Sample standard deviation" },
      { name: "Sample size" },
    ],
    example: {
      calculation: "x̄ = 8%, s = 6%, n = 25, t(0.025, 24) = 2.064",
      result: "8% ± 2.48% → [5.52%, 10.48%]",
      explanation:
        "Use t rather than z when the population variance is unknown. For large samples the two nearly coincide, but t is always the safe choice.",
    },
  },
  "q-012": {
    title: "Correlation Coefficient",
    badge: "Quant • Statistics",
    denominator: "σX × σY",
    variables: [
      { name: "Correlation coefficient, always within [−1, +1]" },
      { name: "Covariance between the two variables" },
    ],
    example: {
      calculation: "Cov = 0.0048, σX = 12%, σY = 8%",
      result: "ρ = 0.5",
      explanation:
        "Correlation normalises covariance onto a unitless scale, so it compares across different asset pairs. It only measures a LINEAR relationship.",
    },
  },
  "q-013": {
    title: "Roy's Safety-First Ratio",
    badge: "Quant • Risk",
    numerator: "E(Rp) − RL",
    denominator: "σp",
    variables: [{ name: "The minimum acceptable return threshold" }],
    example: {
      calculation: "E(Rp) = 12%, RL = 4%, σp = 16%",
      result: "SFRatio = 0.5",
      explanation:
        "Picking the highest SFRatio minimises the chance of falling below the threshold. Same shape as Sharpe, with RL in place of the risk-free rate.",
    },
  },

  // ─── Economics (continued) ───────────────────────────────────────────────
  "econ-008": {
    title: "Cross and Income Elasticity",
    badge: "Econ • Demand",
    equation: "E_cross = %ΔQx / %ΔPy   |   E_income = %ΔQ / %ΔI",
    variables: [
      { name: "The two goods are substitutes" },
      { name: "The two goods are complements" },
      { name: "An inferior good" },
    ],
    example: {
      calculation: "Coffee price +10%, tea volume sold +4%",
      result: "E_cross = +0.4",
      explanation:
        "The sign matters more than the size: a positive sign says tea and coffee substitute for each other, and that is what decides an industry competition analysis.",
    },
  },
  "econ-009": {
    title: "GDP by the Expenditure Approach",
    badge: "Econ • Macro",
    variables: [
      { name: "Household consumption" },
      { name: "Private investment, including the change in inventories" },
      { name: "Government spending on goods and services" },
      { name: "Net exports" },
    ],
    example: {
      calculation: "C 600, I 200, G 180, X 250, M 210",
      result: "GDP = 1,020",
      explanation:
        "G excludes transfer payments such as pensions and benefits - those move money rather than buy goods, and counting them would double-count once households spend it.",
    },
  },
  "econ-010": {
    title: "Unemployment Rate and Labour Force Participation Rate",
    badge: "Econ • Macro",
    equation:
      "Unemployment = Unemployed / Labour force   |   Participation = Labour force / Working-age population",
    variables: [{ name: "Labour force - the employed plus the unemployed who are looking for work" }],
    example: {
      calculation: "48m employed, 2m unemployed, 70m of working age",
      result: "Unemployment 4.0%, participation 71.4%",
      explanation:
        "Discouraged workers who stop looking drop out of the labour force, so unemployment can FALL while the economy worsens. Read it alongside participation.",
    },
  },
  "econ-011": {
    title: "Herfindahl-Hirschman Index (HHI)",
    badge: "Econ • Market structure",
    equation: "HHI = Σ (market share_i × 100)²",
    variables: [
      { name: "Fragmented market" },
      { name: "Highly concentrated market" },
    ],
    example: {
      calculation: "Four firms: 40%, 30%, 20%, 10%",
      result: "1600 + 900 + 400 + 100 = 3,000",
      explanation:
        "Squaring weights the large firms far more heavily, so HHI separates 'four equal firms' from 'one dominant firm' where a four-firm concentration ratio cannot.",
    },
  },
  "econ-012": {
    title: "Break-Even and Shutdown Points for a Firm",
    badge: "Econ • Supply",
    equation: "Break-even: P = ATC (long run)   |   Shutdown: P < AVC (short run)",
    variables: [
      { name: "Average total cost" },
      { name: "Average variable cost" },
    ],
    example: {
      calculation: "P = 18, AVC = 15, ATC = 22",
      result: "Keep producing in the short run",
      explanation:
        "A price between AVC and ATC means the firm is losing money but still covering variable cost and part of fixed cost - shutting down now would lose more.",
    },
  },

  // ─── Financial Statement Analysis (continued) ────────────────────────────
  "fsa-006": {
    title: "Current and Quick Ratios",
    badge: "FSA • Liquidity",
    equation:
      "Current = Current assets / Current liabilities   |   Quick = (Current assets − Inventory) / Current liabilities",
    variables: [{ name: "The quick ratio strips out inventory as the hardest current asset to turn into cash" }],
    example: {
      calculation: "Current assets 300, inventory 120, current liabilities 200",
      result: "Current 1.5, Quick 0.9",
      explanation:
        "A wide gap between the two says the business depends on selling inventory in order to pay its bills.",
    },
  },
  "fsa-007": {
    title: "Interest Coverage Ratio",
    badge: "FSA • Leverage",
    denominator: "Interest expense",
    variables: [{ name: "How many times operating profit covers the interest bill" }],
    example: {
      calculation: "EBIT 240, interest 80",
      result: "3.0x",
      explanation:
        "Below 1.5x is the usual warning line; for a cyclical business, re-run it at the EBIT of the worst year of the last cycle.",
    },
  },
  "fsa-008": {
    title: "Inventory Turnover and Days Inventory Outstanding",
    badge: "FSA • Efficiency",
    equation: "Turnover = COGS / Average inventory   |   DIO = 365 / Turnover",
    variables: [
      { name: "Cost of goods sold" },
      { name: "Average number of days stock sits in the warehouse" },
    ],
    example: {
      calculation: "COGS 720, average inventory 120 -> turnover 6",
      result: "DIO ≈ 61 days",
      explanation:
        "DIO rising while gross margin falls is the signature of a business discounting to clear slow-moving stock.",
    },
  },
  "fsa-009": {
    title: "Basic and Diluted EPS",
    badge: "FSA • Earnings",
    equation: "Basic EPS = (Net income − Preferred dividends) / Weighted average shares",
    variables: [
      { name: "Diluted EPS also counts options, convertible bonds and convertible preferred shares" },
    ],
    example: {
      calculation: "Net income 500, preferred dividends 40, average shares 100",
      result: "Basic EPS 4.6",
      explanation:
        "Preferred dividends are subtracted only in basic EPS. Under the if-converted method for diluted EPS they are ADDED BACK, because the shares are assumed to have converted already.",
    },
  },
  "fsa-010": {
    title: "Effective Tax Rate",
    badge: "FSA • Tax",
    numerator: "Income tax expense",
    denominator: "Pre-tax profit",
    variables: [
      { name: "Differs from the statutory rate because of incentives, loss carry-forwards and foreign income" },
    ],
    example: {
      calculation: "Tax expense 42, pre-tax profit 240",
      result: "17.5%",
      explanation:
        "A persistent gap between the effective and statutory rate is a cue to read the tax note - it may be an incentive about to expire, which means profit falls with revenue flat.",
    },
  },
  "fsa-011": {
    title: "Receivables Turnover and Days Sales Outstanding (DSO)",
    badge: "FSA • Efficiency",
    equation: "Turnover = Revenue / Average receivables   |   DSO = 365 / Turnover",
    variables: [{ name: "Average number of days from making the sale to collecting the cash" }],
    example: {
      calculation: "Revenue 1,460, average receivables 200 → turnover 7.3",
      result: "DSO = 50 days",
      explanation:
        "DSO growing faster than revenue says the business is loosening credit terms to hold its growth - revenue still looks good while the cash has not arrived.",
    },
  },
  "fsa-012": {
    title: "Payables Turnover and Days Payable Outstanding (DPO)",
    badge: "FSA • Efficiency",
    equation: "Turnover = COGS (or purchases) / Average payables   |   DPO = 365 / Turnover",
    variables: [{ name: "Average number of days the firm holds on to its suppliers' money" }],
    example: {
      calculation: "COGS 1,095, average payables 150 → turnover 7.3",
      result: "DPO = 50 days",
      explanation:
        "A long DPO is interest-free funding, but an unusually long one can equally mean there is not enough cash to pay on time. Read it with DSO and DIO in the cash cycle.",
    },
  },
  "fsa-013": {
    title: "Profit Margins",
    badge: "FSA • Earnings",
    equation:
      "Gross = Gross profit / Revenue   |   Operating = EBIT / Revenue   |   Net = Net income / Revenue",
    variables: [
      { name: "Gross margin - pricing power and cost of goods structure" },
      { name: "Operating margin - adds selling and administrative cost efficiency" },
    ],
    example: {
      calculation: "Revenue 1,000, gross profit 380, EBIT 150, net income 96",
      result: "38% / 15% / 9.6%",
      explanation:
        "Gross margin holding while operating margin slips places the problem in selling and admin costs, not in pricing or cost of goods.",
    },
  },
  "fsa-014": {
    title: "Straight-Line and Double-Declining-Balance Depreciation",
    badge: "FSA • Long-lived assets",
    equation:
      "Straight-line = (Cost − Salvage) / Useful life   |   DDB = (2 / Useful life) × Opening carrying value",
    variables: [{ name: "Double declining balance - accelerated depreciation" }],
    example: {
      calculation: "Cost 100, salvage 10, 5-year life. Year 1: straight-line (100−10)/5, DDB (2/5)×100",
      result: "18 versus 40",
      explanation:
        "DDB does NOT subtract salvage in the calculation, but must stop once carrying value reaches it. Accelerated depreciation lowers early profit and raises later ROA - comparing two firms on different methods compares the wrong thing.",
    },
  },
  "fsa-015": {
    title: "LIFO Reserve - Converting to FIFO",
    badge: "FSA • Inventory",
    equation:
      "Inventory_FIFO = Inventory_LIFO + LIFO reserve   |   COGS_FIFO = COGS_LIFO − ΔLIFO reserve",
    variables: [
      { name: "LIFO reserve - the gap between FIFO and LIFO inventory value, disclosed in the notes" },
    ],
    example: {
      calculation: "LIFO inventory 300, reserve 80 (up 15 in the year), LIFO COGS 900",
      result: "FIFO inventory 380, FIFO COGS 885",
      explanation:
        "A required step when comparing a US firm on LIFO with an IFRS firm - IFRS bans LIFO, so skipping the conversion compares two different measures.",
    },
  },

  // ─── Corporate Issuers (continued) ───────────────────────────────────────
  "corp-003": {
    title: "Degree of Operating Leverage (DOL)",
    badge: "Corporate • Leverage",
    numerator: "Percentage change in operating profit",
    denominator: "Percentage change in revenue",
    variables: [{ name: "How far fixed costs amplify profit" }],
    example: {
      calculation: "DOL = 3, revenue down 10%",
      result: "Operating profit down 30%",
      explanation:
        "The amplification runs both ways, and it is strongest exactly when the business most needs a cushion.",
    },
  },
  "corp-004": {
    title: "Degree of Financial Leverage (DFL)",
    badge: "Corporate • Leverage",
    numerator: "Earnings before interest and tax (EBIT)",
    denominator: "EBIT − Interest expense",
    variables: [{ name: "How far fixed interest amplifies the profit left for shareholders" }],
    example: {
      calculation: "EBIT = 100, interest = 40",
      result: "1.67",
      explanation:
        "DOL times DFL gives total leverage - two layers of amplification stacked on each other is the recipe for financial distress in a downturn.",
    },
  },
  "corp-005": {
    title: "Cash Conversion Cycle (CCC)",
    badge: "Corporate • Working capital",
    equation: "CCC = Days inventory + Days receivable − Days payable",
    variables: [
      { name: "Days stock sits in the warehouse" },
      { name: "Days to collect from customers" },
      { name: "Days taken to pay suppliers" },
    ],
    example: {
      calculation: "DIO 60 + DSO 45 - DPO 30",
      result: "75 days",
      explanation:
        "A negative CCC means suppliers are funding your working capital - the signature of retail and subscription models.",
    },
  },
  "corp-006": {
    title: "After-Tax Cost of Debt and Cost of Preferred Equity",
    badge: "Corporate • Cost of capital",
    equation: "After-tax r_d = r_d × (1 − t)   |   r_p = D_p / P_p",
    variables: [
      { name: "The firm's marginal tax rate" },
      { name: "Preferred dividend divided by the market price of the preferred shares" },
    ],
    example: {
      calculation: "r_d = 10%, t = 20%; preferred dividend VND 8,000, price VND 80,000",
      result: "After-tax r_d 8%, r_p 10%",
      explanation:
        "Only DEBT carries a tax shield. Preferred dividends are paid out of after-tax profit, so they are not multiplied by (1 − t) - the most common slip when assembling a WACC.",
    },
  },
  "corp-007": {
    title: "Break-Even Quantity",
    badge: "Corporate • Leverage",
    numerator: "Fixed costs",
    denominator: "Price − Variable cost per unit",
    variables: [{ name: "The volume at which operating profit is zero" }],
    example: {
      calculation: "Fixed costs VND 600m, price VND 50,000, variable cost VND 30,000",
      result: "30,000 units",
      explanation:
        "The denominator is the unit contribution margin. Higher fixed costs push break-even up and operating leverage with it - gains are amplified past break-even, and so are losses short of it.",
    },
  },
  "corp-008": {
    title: "Degree of Total Leverage (DTL)",
    badge: "Corporate • Leverage",
    equation: "DTL = DOL × DFL = %Δnet income / %Δrevenue",
    variables: [
      { name: "Operating leverage - from fixed production costs" },
      { name: "Financial leverage - from fixed interest" },
    ],
    example: {
      calculation: "DOL = 2.0, DFL = 1.5",
      result: "DTL = 3.0",
      explanation:
        "Revenue down 10% takes net income down 30%. A high-fixed-cost business that also borrows heavily stacks two leverages - the fastest route to default in a recession.",
    },
  },

  // ─── Equity and Fixed Income (continued) ─────────────────────────────────
  "eq-003": {
    title: "Enterprise Value",
    badge: "Equity • Valuation",
    equation: "EV = Market capitalisation + Debt − Cash",
    variables: [{ name: "What it truly costs to own the whole operating business" }],
    example: {
      calculation: "Market cap 100, debt 30, cash 10",
      result: "120",
      explanation:
        "Cash is subtracted because the buyer gets it straight back after the purchase - EV measures the operating business, not the balance sheet.",
    },
  },
  "eq-004": {
    title: "Justified P/E from the Gordon Model",
    badge: "Equity • Valuation",
    numerator: "Payout ratio (1 − b)",
    denominator: "r − g",
    variables: [
      { name: "Retention rate" },
      { name: "Required return" },
      { name: "Long-run growth rate" },
    ],
    example: {
      calculation: "Payout 40%, r = 10%, g = 4%",
      result: "6.67x",
      explanation:
        "It tells you what P/E a given set of assumptions justifies - useful in reverse, to read out what the market is currently assuming.",
    },
  },
  "eq-005": {
    title: "Return on Invested Capital (ROIC)",
    badge: "Equity • Efficiency",
    numerator: "NOPAT (net operating profit after tax)",
    denominator: "Invested capital (debt + equity)",
    variables: [{ name: "EBIT × (1 − tax rate)" }],
    example: {
      calculation: "NOPAT 120, invested capital 800",
      result: "15%",
      explanation:
        "A business only creates value while ROIC exceeds WACC; growing with ROIC below WACC destroys value faster.",
    },
  },
  "fi-003": {
    title: "Price of a Coupon Bond",
    badge: "Fixed Income • Valuation",
    equation: "P = Σ [C / (1 + y)^t] + [Face value / (1 + y)^n]",
    variables: [
      { name: "Coupon paid each period" },
      { name: "Yield to maturity per period" },
      { name: "Periods remaining" },
    ],
    example: {
      calculation: "Coupon 8, face value 100, y = 10%, n = 3",
      result: "95.03",
      explanation:
        "A coupon below the market yield means the bond trades below par - and the other way round.",
    },
  },
  "fi-004": {
    title: "Current Yield and Yield to Maturity",
    badge: "Fixed Income • Yield",
    equation: "Current yield = Annual coupon / Market price",
    variables: [{ name: "YTM includes the coupon plus the gain or loss as the price pulls to par" }],
    example: {
      calculation: "Coupon 8, price 95 -> current yield = 8/95",
      result: "8.42%",
      explanation:
        "Current yield ignores the capital gain, so it is always below YTM for a bond bought at a discount.",
    },
  },
  "fi-005": {
    title: "Implied Forward Rate from Spot Rates",
    badge: "Fixed Income • Curve",
    variables: [
      { name: "One-year and two-year spot rates" },
      { name: "The one-year rate starting one year from now" },
    ],
    example: {
      calculation: "s1 = 4%, s2 = 5% -> f = 1.05²/1.04 - 1",
      result: "6.01%",
      explanation:
        "The implied forward rate is the level that makes two investment strategies break even against each other - not a forecast of future rates.",
    },
  },

  "corp-009": {
    title: "Profitability Index",
    badge: "Corporate • Capital budgeting",
    equation: "PI = PV of future cash flows / Initial investment = 1 + NPV / CF₀",
    variables: [{ name: "Equivalent to NPV > 0 - the project is worth doing" }],
    example: {
      calculation: "Investment 100, PV of cash flows 118",
      result: "PI = 1.18",
      explanation:
        "PI ranks by value created per unit of capital, which helps when capital is rationed. For mutually exclusive projects of different sizes, follow NPV rather than PI.",
    },
  },

  // ─── Equity Investments (continued) ──────────────────────────────────────
  "eq-006": {
    title: "Holding Period Return",
    badge: "Equity • Returns",
    variables: [{ name: "Dividend received during the holding period" }],
    example: {
      calculation: "Buy at VND 50,000, sell at VND 56,000, dividend VND 2,000",
      result: "16%",
      explanation:
        "Leaving the dividend out of the numerator is the most common mistake when comparing a high-dividend stock with a growth stock - it always shortchanges the former.",
    },
  },
  "eq-007": {
    title: "Book Value per Share and P/B",
    badge: "Equity • Multiples",
    equation: "BVPS = Common equity / Shares outstanding   |   P/B = Price / BVPS",
    variables: [{ name: "Common equity - total equity less the preferred shareholders' claim" }],
    example: {
      calculation: "Common equity VND 4,800bn, 400 million shares, price VND 24,000",
      result: "BVPS VND 12,000, P/B 2.0",
      explanation:
        "P/B only means something where assets are carried near their economic value - it suits banks and is close to meaningless for a software firm whose main asset is not on the balance sheet.",
    },
  },
  "eq-008": {
    title: "Two-Stage Dividend Discount Model",
    badge: "Equity • Valuation",
    variables: [
      { name: "Long-run growth rate, which must be below r" },
      { name: "Number of years in the high-growth stage" },
    ],
    example: {
      calculation: "D₁=2, growing 20%/year for 3 years then 5% forever; r = 12%",
      result: "Terminal value dominates V₀",
      explanation:
        "Terminal value is usually 70-80% of the total, so the answer is far more sensitive to g_L than to the first three years of dividends. That is where to run sensitivity, not where to forecast in more detail.",
    },
  },
  "eq-009": {
    title: "Value of Preferred Stock",
    badge: "Equity • Valuation",
    variables: [
      { name: "The fixed annual preferred dividend" },
      { name: "Required return on the preferred shares" },
    ],
    example: {
      calculation: "Dividend VND 9,000/year, required return 12%",
      result: "VND 75,000",
      explanation:
        "It is a perpetuity because the preferred dividend does not grow. That makes preferred shares almost as rate-sensitive as a bond, unlike common stock.",
    },
  },
  "eq-010": {
    title: "Payout Ratio and Retention Rate",
    badge: "Equity • Dividend policy",
    equation: "Payout ratio = D / EPS   |   b = 1 − payout ratio",
    variables: [{ name: "The share of earnings retained and reinvested" }],
    example: {
      calculation: "EPS VND 5,000, dividend VND 2,000",
      result: "Payout 40%, b = 60%",
      explanation:
        "b is the link between dividend policy and growth: g = b × ROE. Raising the dividend with ROE unchanged automatically lowers the sustainable growth rate.",
    },
  },

  // ─── Fixed Income (continued) ────────────────────────────────────────────
  "fi-006": {
    title: "Macaulay Duration and Its Link to Modified Duration",
    badge: "Fixed Income • Interest rate risk",
    equation: "MacDur = Σ [t × PV(CFₜ)] / Price   |   ModDur = MacDur / (1 + y/m)",
    variables: [
      { name: "Weighted average maturity of the cash flows, in years" },
      { name: "Coupon payments per year" },
    ],
    example: {
      calculation: "MacDur = 7.2 years, y = 6%, paid semi-annually",
      result: "ModDur = 7.2 / 1.03 = 6.99",
      explanation:
        "MacDur is a time; ModDur is a percentage price sensitivity. A zero-coupon bond has a MacDur exactly equal to its remaining maturity - the one case where the two numbers coincide intuitively.",
    },
  },
  "fi-007": {
    title: "Money Duration and PVBP",
    badge: "Fixed Income • Interest rate risk",
    equation: "Money duration = ModDur × Full price   |   PVBP = Money duration × 0.0001",
    variables: [{ name: "The change in value, in money, for a one basis point move in yield" }],
    example: {
      calculation: "ModDur 6.99, full price VND 100bn",
      result: "Money duration VND 699bn, PVBP VND 69.9 million",
      explanation:
        "Duration speaks in percentages, PVBP in money. Hedging a portfolio means matching PVBP, not duration - two portfolios with the same duration but different size gain and lose very differently.",
    },
  },
  "fi-008": {
    title: "Effective Duration",
    badge: "Fixed Income • Interest rate risk",
    numerator: "PV₋ − PV₊",
    denominator: "2 × Δcurve × PV₀",
    variables: [{ name: "Price when the yield curve shifts down and when it shifts up" }],
    example: {
      calculation: "PV₋ = 101.5, PV₊ = 98.7, Δ = 0.25%, PV₀ = 100",
      result: "5.6",
      explanation:
        "This is the REQUIRED measure for bonds with embedded options - their cash flows change as rates change, so a ModDur computed from fixed cash flows no longer holds.",
    },
  },
  "fi-009": {
    title: "Clean Price, Accrued Interest and Full Price",
    badge: "Fixed Income • Valuation",
    equation: "Full price = Clean price + Accrued interest   |   Accrued = Coupon × (t / T)",
    variables: [
      { name: "Days since the last coupon payment" },
      { name: "Days in the full coupon period" },
    ],
    example: {
      calculation: "Semi-annual coupon 4, 60 of 180 days elapsed, clean price 98.2",
      result: "Accrued 1.33, full price 99.53",
      explanation:
        "Quoted prices are CLEAN, but the cash actually paid is the full price. Different day-count conventions (30/360 for corporates, actual/actual for governments) change the accrued figure.",
    },
  },
  "fi-010": {
    title: "Expected Credit Loss",
    badge: "Fixed Income • Credit risk",
    equation: "Expected loss = POD × LGD   |   LGD = 1 − Recovery rate",
    variables: [
      { name: "Probability of default over the period" },
      { name: "Share of principal lost when default happens" },
    ],
    example: {
      calculation: "POD 3%/year, recovery rate 40%",
      result: "Expected loss 1.8%/year",
      explanation:
        "The yield spread has to at least cover this figure to be worth holding. A bond with a high POD but strong collateral can be safer than a low-POD unsecured one.",
    },
  },

  // ─── Derivatives (continued) ─────────────────────────────────────────────
  "der-008": {
    title: "Option Payoff at Expiry",
    badge: "Derivatives • Payoff",
    equation: "Long call: max(0, Sₜ − X)   |   Long put: max(0, X − Sₜ)",
    variables: [
      { name: "Price of the underlying at expiry" },
      { name: "Strike price" },
    ],
    example: {
      calculation: "X = 100, Sₜ = 118, premium paid 6",
      result: "Payoff 18, net profit 12",
      explanation:
        "The payoff is never negative for the buyer - that is the whole point of an option. Net PROFIT can be, because the premium is spent. The seller's payoff is the mirror image about zero.",
    },
  },
  "der-009": {
    title: "One-Period Binomial Option Pricing",
    badge: "Derivatives • Valuation",
    equation: "c = [π·c⁺ + (1−π)·c⁻] / (1 + r)   where   π = (1 + r − d) / (u − d)",
    variables: [
      { name: "Risk-neutral probability - NOT the real-world probability" },
      { name: "Up and down price factors" },
    ],
    example: {
      calculation: "S=100, u=1.25, d=0.8, X=100, r=5% → π = (1.05−0.8)/(1.25−0.8) = 0.556",
      result: "c = (0.556 × 25) / 1.05 ≈ 13.2",
      explanation:
        "The real probability of the price rising does NOT appear in the formula. That is the most surprising thing about derivative pricing: an option's value does not depend on whether you think the stock will rise or fall.",
    },
  },
  "der-010": {
    title: "Cost of Carry",
    badge: "Derivatives • Forward",
    equation: "F₀ = S₀(1 + r)^T + FV(storage costs) − FV(benefits of holding)",
    variables: [
      { name: "Storage and insurance - push the forward price UP" },
      { name: "Dividends, coupons, convenience yield - pull the forward price DOWN" },
    ],
    example: {
      calculation: "S₀ = 100, r = 5%, T = 1, storage cost 3, benefits 0",
      result: "F₀ = 108",
      explanation:
        "This is the frame that explains contango and backwardation: a commodity whose convenience yield exceeds its storage cost trades at a forward price BELOW spot.",
    },
  },

  // ─── Alternative Investments (continued) ─────────────────────────────────
  "alt-007": {
    title: "'2 and 20' Management and Performance Fees",
    badge: "Alternatives • Fees",
    equation: "Total fees = 2% × Assets under management + 20% × Profit (above the hurdle)",
    variables: [
      { name: "Management fee - charged on assets, payable even in a losing year" },
      { name: "Performance fee - charged on profit, usually with a high-water mark" },
    ],
    example: {
      calculation: "AUM VND 100bn, gross gain VND 20bn, 2/20 fees",
      result: "Fees 2 + 4 = VND 6bn, net gain VND 14bn (14%)",
      explanation:
        "A 20% gross return becomes 14% net - fees took 30% of the result. The management fee is charged on assets, so investors pay it in losing years too; that is why a high-fee fund compounds so far behind an index fund over time.",
    },
  },
  "alt-008": {
    title: "Components of Commodity Investment Return",
    badge: "Alternatives • Commodities",
    equation: "Total return = Spot return + Roll return + Collateral return",
    variables: [
      { name: "Roll return - positive in backwardation, negative in contango" },
      { name: "Collateral return - interest on the margin posted, usually Treasury bills" },
    ],
    example: {
      calculation: "Spot +5%, roll −4% (contango), collateral +3%",
      result: "Total +4%",
      explanation:
        "Investors often watch only the spot price and are then surprised their commodity fund lags badly. Through a long contango, the roll component alone can wipe out the entire spot gain.",
    },
  },
  "alt-009": {
    title: "Loan-to-Value Ratio (LTV)",
    badge: "Alternatives • Real estate",
    numerator: "Outstanding loan balance",
    denominator: "Property value",
    variables: [{ name: "The higher it is, the greater the leverage and the thinner the safety margin" }],
    example: {
      calculation: "VND 42bn borrowed against a VND 60bn property",
      result: "LTV 70%",
      explanation:
        "A 30% fall in value wipes the equity out. Read it with DSCR: LTV speaks to asset value, DSCR to the ability to service the debt from cash flow - a loan can look safe on one and dangerous on the other.",
    },
  },

  // ─── Portfolio Management (continued) ────────────────────────────────────
  "port-006": {
    title: "Beta",
    badge: "Portfolio • Risk",
    denominator: "σ²_m",
    variables: [
      { name: "Moves in step with the market" },
      { name: "Amplifies market moves" },
    ],
    example: {
      calculation: "Cov = 0.024, σ_m = 15% → σ²_m = 0.0225",
      result: "β = 1.07",
      explanation:
        "Beta measures SYSTEMATIC risk only - the part that cannot be diversified away. Firm-specific risk is not in beta, and the market does not pay for carrying it.",
    },
  },
  "port-007": {
    title: "Portfolio Expected Return and Beta",
    badge: "Portfolio • Construction",
    equation: "E(R_p) = Σ wᵢ E(Rᵢ)   |   β_p = Σ wᵢ βᵢ",
    variables: [{ name: "Weight of asset i, summing to 1" }],
    example: {
      calculation: "60% equities β=1.2, 40% bonds β=0.2",
      result: "β_p = 0.8",
      explanation:
        "Return and beta add up linearly by weight. RISK does not - portfolio variance also depends on correlation, and that is exactly where diversification creates value.",
    },
  },
  "port-008": {
    title: "Capital Market Line (CML)",
    badge: "Portfolio • Theory",
    equation: "E(R_p) = R_f + [(E(R_m) − R_f) / σ_m] × σ_p",
    variables: [
      { name: "The slope is the market portfolio's Sharpe ratio - the market price of risk" },
    ],
    example: {
      calculation: "R_f = 4%, E(R_m) = 11%, σ_m = 16%, σ_p = 8%",
      result: "E(R_p) = 7.5%",
      explanation:
        "The CML measures risk as σ (TOTAL risk) and applies only to efficient portfolios. The SML uses β (systematic risk) and applies to every asset - confusing the two is the classic Level I error.",
    },
  },
  "port-009": {
    title: "Investor Utility Function",
    badge: "Portfolio • Risk appetite",
    equation: "U = E(R) − ½ × A × σ²",
    variables: [{ name: "Risk-aversion coefficient; the larger it is, the more risk-averse" }],
    example: {
      calculation: "E(R) = 12%, σ = 20%, A = 4",
      result: "U = 0.12 − 0.5×4×0.04 = 4%",
      explanation:
        "A negative A is a risk SEEKER, A = 0 is risk-neutral. The same portfolio yields different utility for different people - which is why no single 'best' portfolio exists for every investor.",
    },
  },
  "port-010": {
    title: "Tracking Error",
    badge: "Portfolio • Evaluation",
    equation: "TE = Standard deviation of (R_p − R_b)",
    variables: [{ name: "Return of the benchmark index" }],
    example: {
      calculation: "Annual differences: +2%, −1%, +3%, 0%, +1%",
      result: "TE ≈ 1.6%",
      explanation:
        "A good index fund keeps TE below 0.5%. TE is the denominator of the information ratio, so a fund that beats the index through big bets can score a lower IR than one that beats it slightly but consistently.",
    },
  },
};
