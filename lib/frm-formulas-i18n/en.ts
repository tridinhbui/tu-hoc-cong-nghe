import type { FormulaTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 92 công thức FRM, khoá theo `id`.
 *
 * Luật viết, ngoài những gì index.ts đã nói:
 *
 * 1. `title` của phần lớn mục đã KÈM SẴN tiếng Anh trong ngoặc - "Tỷ số Sharpe
 *    (Sharpe Ratio)". Bản tiếng Anh là phần trong ngoặc đó, bỏ ngoặc đi. Đừng
 *    dịch lại từ đầu rồi ra một cách gọi khác với chính chữ người học vừa thấy.
 *
 * 2. `badge` có dạng "Môn • Nhóm chủ đề". Tên môn giữ nguyên (Foundations,
 *    Quant, Market Risk...) vì đó là tên môn của GARP; chỉ dịch phần sau dấu •.
 *
 * 3. ĐỔI DẤU THẬP PHÂN ở mọi con số: "0,70" thành "0.70", "5.050" thành
 *    "5,050". Đây là chỗ dễ sót nhất vì nó nằm trong `example.result` và
 *    `example.calculation`, không phải trong câu văn.
 *
 * 4. Chữ VIẾT HOA nhấn mạnh trong bản gốc ("đo TOÀN BỘ rủi ro") giữ nguyên vai
 *    trò nhấn mạnh. Phần lớn chúng đánh dấu đúng chỗ hay bị hiểu ngược.
 */
export const frmFormulasEn: Record<string, FormulaTranslation> = {
  // ─── Foundations of Risk Management ──────────────────────────────────────
  "f-001": {
    title: "Sharpe Ratio",
    badge: "Foundations • Risk-adjusted performance",
    numerator: "Portfolio return (Rp) − Risk-free rate (Rf)",
    denominator: "Portfolio standard deviation (σp)",
    variables: [
      { name: "Portfolio return" },
      { name: "Risk-free rate" },
      { name: "Standard deviation - measures TOTAL risk, systematic and idiosyncratic alike" },
    ],
    example: {
      title: "Comparing two funds",
      calculation: "Fund A: (18% − 4%) / 20% · Fund B: (11% − 4%) / 7%",
      result: "A = 0.70 · B = 1.00",
      explanation:
        "Fund A returned considerably more but has the lower Sharpe ratio - most of the extra return came from carrying more risk, not from skill.",
    },
  },
  "f-002": {
    title: "Treynor Ratio",
    badge: "Foundations • Risk-adjusted performance",
    numerator: "Portfolio return (Rp) − Risk-free rate (Rf)",
    denominator: "Portfolio beta (βp)",
    variables: [
      { name: "Beta - measures systematic risk only, not idiosyncratic risk" },
    ],
    example: {
      title: "When to use it instead of Sharpe",
      calculation: "The portfolio is one sleeve of a well-diversified total portfolio",
      result: "Use Treynor",
      explanation:
        "The denominator is beta, so it quietly assumes idiosyncratic risk has already been diversified away. Applied to a portfolio concentrated in a few names it gives a flatteringly good number.",
    },
  },
  "f-003": {
    title: "Jensen's Alpha",
    badge: "Foundations • Manager skill",
    variables: [
      { name: "The return above what CAPM predicts for that beta" },
      { name: "Return on the market portfolio" },
    ],
    example: {
      title: "Reading a positive alpha",
      calculation: "Rp = 14%, Rf = 4%, β = 1.2, Rm = 11% → 14% − [4% + 1.2 × 7%]",
      result: "α = +1.6%",
      explanation:
        "Ahead even after subtracting what market risk exposure explains - this is the closest thing there is to a measure of skill.",
    },
  },
  "f-004": {
    title: "Information Ratio",
    badge: "Foundations • Active management",
    numerator: "Portfolio return − Benchmark return",
    denominator: "Tracking error",
    variables: [{ name: "Standard deviation of the difference against the benchmark" }],
    example: {
      title: "What it means",
      calculation: "3%/year above the benchmark with 6% tracking error → 3 / 6",
      result: "IR = 0.5",
      explanation:
        "How much excess return each unit of willingness to deviate bought. For a passive fund both numerator and denominator sit near 0, so the measure loses its meaning.",
    },
  },
  "f-005": {
    title: "CAPM - Expected Return",
    badge: "Foundations • Asset pricing model",
    variables: [
      { name: "Sensitivity of asset i to the market portfolio" },
      { name: "The market risk premium" },
    ],
    example: {
      title: "The underlying argument",
      calculation: "Rf = 4%, β = 1.3, market premium = 6% → 4% + 1.3 × 6%",
      result: "11.8%",
      explanation:
        "Only systematic risk is compensated: the market does not pay for risk an investor could remove for free by diversifying.",
    },
  },

  // ─── Quantitative Analysis ───────────────────────────────────────────────
  "q-001": {
    title: "Bayes' Theorem",
    badge: "Quant • Conditional probability",
    numerator: "P(B|A) × P(A)",
    denominator: "P(B)",
    variables: [
      { name: "Prior probability - the belief held before the new data" },
      { name: "Posterior probability - the number you actually needed" },
    ],
    example: {
      title: "The false-alarm paradox",
      calculation:
        "A system that is 99% accurate, with a true fraud rate of 1 in 1,000. Across 1 million transactions: 990 correct catches, about 9,990 false alarms",
      result: "≈ 9% of alerts are real",
      explanation:
        "A low base rate dominates the result far more than the system's accuracy does - which is why compliance teams drown in false positives.",
    },
  },
  "q-002": {
    title: "Standard Error of a Monte Carlo Simulation",
    badge: "Quant • Simulation",
    numerator: "Standard deviation of the simulated results (σ)",
    denominator: "Square root of the number of runs (√N)",
    variables: [{ name: "Number of simulation runs" }],
    example: {
      title: "Why variance reduction techniques exist",
      calculation: "To halve the error → N must rise fourfold",
      result: "Four times the compute cost",
      explanation:
        "Square-root convergence is a fundamental limit. For a portfolio where each single revaluation is already expensive, this is why antithetic variates and importance sampling exist.",
    },
  },
  "q-003": {
    title: "Correlation Coefficient",
    badge: "Quant • Dependence",
    numerator: "Covariance between X and Y - Cov(X,Y)",
    denominator: "σX × σY",
    variables: [{ name: "Covariance" }, { name: "Standard deviation of each variable" }],
    example: {
      title: "The biggest trap",
      calculation: "Correlation estimated over a normal period ≈ 0.3",
      result: "Moves toward 1 in a crisis",
      explanation:
        "The diversification benefit computed from past correlations evaporates exactly when it is needed most, as everyone sells everything to raise cash.",
    },
  },
  "q-004": {
    title: "Number of Parameters in a Covariance Matrix",
    badge: "Quant • Dimension reduction",
    variables: [{ name: "Number of risk factors" }],
    example: {
      title: "Why PCA is needed",
      calculation: "n = 100 → 100 + 100 × 99 / 2",
      result: "5,050 parameters",
      explanation:
        "Estimating 5,050 parameters from about 500 daily observations (two years of data) produces a matrix full of noise - which is why shrinkage techniques and PCA are used.",
    },
  },
  "q-005": {
    title: "GARCH(1,1) Model",
    badge: "Quantitative • Conditional volatility",
    variables: [
      { name: "Constant, tied to the long-run variance through ω / (1 − α − β)" },
      { name: "Weight on yesterday's shock - the larger it is, the faster the model reacts" },
      { name: "Weight on yesterday's variance - the larger it is, the more persistent a shock" },
    ],
    example: {
      title: "The stationarity condition",
      calculation: "α + β = 0.05 + 0.94 = 0.99",
      result: "Stationary, but only just",
      explanation:
        "α + β < 1 is required for variance to revert to its long-run level. At exactly 1 the model becomes EWMA and there is no long-run level left to revert to; the closer to 1, the longer a shock takes to decay.",
    },
  },

  "q-006": {
    title: "GARCH Long-Run Variance",
    badge: "Quantitative • Conditional volatility",
    numerator: "ω",
    denominator: "1 − α − β",
    variables: [{ name: "The long-run variance the model pulls back toward over time" }],
    example: {
      title: "Computing the anchor",
      calculation: "ω = 0.000002 · α = 0.05 · β = 0.94 → 0.000002 / 0.01",
      result: "VL = 0.0002 → σ ≈ 1.41%/day",
      explanation:
        "This is the volatility every long-horizon GARCH forecast converges to, whether the market is calm or in turmoil today.",
    },
  },
  "q-007": {
    title: "Kupiec Backtest Statistic",
    badge: "Quantitative • Model validation",
    variables: [
      { name: "Number of actual losses exceeding VaR" },
      { name: "Number of observations" },
      { name: "Expected exception rate, equal to one minus the confidence level" },
    ],
    example: {
      title: "Why 250 days is too few",
      calculation: "99% VaR over 250 days: 2.5 exceptions expected",
      result: "A very wide acceptance region",
      explanation:
        "On a small sample the test cannot separate a good model from a poor one - which is why a single year of backtesting rarely rejects anything, and why Basel adds the traffic-light zones on top.",
    },
  },

  // ─── Financial Markets and Products ──────────────────────────────────────
  "m-001": {
    title: "Forward Price",
    badge: "Markets • No-arbitrage",
    variables: [
      { name: "Current spot price" },
      { name: "Continuously compounded risk-free rate" },
      { name: "Time to maturity (years)" },
    ],
    example: {
      title: "The no-arbitrage argument",
      calculation: "S₀ = 100, r = 5%, T = 1 → 100 × e^0.05",
      result: "F₀ ≈ 105.13",
      explanation:
        "If the forward price differed, you would buy cheap and sell dear across the two markets simultaneously and lock in a risk-free profit - so it doesn't last.",
    },
  },
  "m-002": {
    title: "Put-Call Parity",
    badge: "Markets • Derivatives",
    variables: [
      { name: "Call and put prices, on the same K and the same T" },
      { name: "Strike price" },
    ],
    example: {
      title: "Why it has to hold",
      calculation: "Both sides produce exactly the same cash flow in every state at expiry",
      result: "A gap is an arbitrage opportunity",
      explanation:
        "This is the most direct application of the no-arbitrage principle, and the fastest way to check whether an option price table is coherent.",
    },
  },
  "m-003": {
    title: "Optimal Hedge Ratio",
    badge: "Markets • Hedging",
    numerator: "ρ × σS",
    denominator: "σF",
    variables: [
      { name: "Correlation between changes in the spot price and the futures price" },
      { name: "Standard deviation of spot and futures price changes" },
    ],
    example: {
      title: "Basis risk",
      calculation: "ρ = 0.9, σS = 12%, σF = 10% → 0.9 × 12 / 10",
      result: "h* = 1.08",
      explanation:
        "A correlation below 1 means the hedge is never perfect - and what remains uncovered is precisely basis risk.",
    },
  },
  "m-004": {
    title: "Number of Futures Contracts to Hedge an Equity Portfolio",
    badge: "Markets • Beta hedging",
    numerator: "(Target β − Current β) × Portfolio value",
    denominator: "Value of one futures contract",
    variables: [{ name: "The beta you want to reach; 0 to neutralise completely" }],
    example: {
      title: "Neutralising beta",
      calculation:
        "A 100bn portfolio, β = 1.2, targeting 0, each contract worth 2bn → (0 − 1.2) × 100 / 2",
      result: "Sell 60 contracts",
      explanation:
        "Much cheaper and faster than selling the individual shares, and reversible when you want the exposure back.",
    },
  },
  "m-005": {
    title: "Forward Price with Storage Costs",
    badge: "Markets & Products • Commodities",
    variables: [
      { name: "Storage cost as a rate, added to the cost of carry" },
      { name: "Convenience yield - the benefit of holding the physical rather than the contract" },
    ],
    example: {
      title: "When the market goes into backwardation",
      calculation: "y > r + u",
      result: "F₀ < S₀",
      explanation:
        "A convenience yield above the total cost of carry means the physical commodity is scarce - and that is exactly when futures fall below spot.",
    },
  },
  "m-006": {
    title: "Conversion Factor and the Invoice Price of a Bond Future",
    badge: "Markets & Products • Fixed income",
    equation: "Invoice price = (Settlement price × Conversion factor) + Accrued interest",
    variables: [
      { name: "Conversion factor, normalising the deliverable bonds onto one basis" },
    ],
    example: {
      title: "Finding the cheapest-to-deliver bond",
      calculation: "Pick the bond that minimises: Market price − (Settlement price × CF)",
      result: "That is the CTD",
      explanation:
        "The delivery option belongs to the seller, so the seller always picks whichever bond suits them best - and that option itself pulls the futures price down slightly.",
    },
  },
  "m-007": {
    title: "Valuing an Interest Rate Swap",
    badge: "Markets & Products • Derivatives",
    equation: "V_swap (fixed receiver) = B_fixed − B_floating",
    variables: [
      { name: "Present value of the fixed leg, discounted along the curve" },
      { name: "Immediately after a reset date, always exactly equal to the notional" },
    ],
    example: {
      title: "Why it is worth zero at inception",
      calculation: "At signing, the fixed rate is chosen so the two legs are equal",
      result: "V = 0",
      explanation:
        "A swap costs nothing to enter; it only takes on value once rates have moved. The notional is never exchanged, so credit exposure is far smaller than the notional figure.",
    },
  },

  // ─── Valuation and Risk Models ───────────────────────────────────────────
  "v-001": {
    title: "Delta in a One-Step Binomial Tree",
    badge: "Valuation • Option pricing",
    numerator: "Cu − Cd",
    denominator: "Su − Sd",
    variables: [
      { name: "Option value in the up state and the down state" },
      { name: "Underlying price in the up state and the down state" },
    ],
    example: {
      title: "Building the replicating portfolio",
      calculation:
        "S = 100 → 120 or 80; a call with K = 100 → 20 or 0 → (20 − 0)/(120 − 80)",
      result: "Δ = 0.5",
      explanation:
        "Half a share plus a borrowing replicates that option exactly. The cost of building the portfolio is the option price - no real-world probability required.",
    },
  },

  "v-006": {
    title: "Distance to Default in the Merton Model",
    badge: "Valuation • Structural models",
    numerator: "ln(V₀/K) + (μ − σ²/2)·T",
    denominator: "σ·√T",
    variables: [
      { name: "Value of the firm's assets" },
      { name: "Face value of the debt - playing the role of the strike" },
      { name: "Volatility of the asset value, not of the equity" },
    ],
    example: {
      title: "From distance to probability",
      calculation: "PD = N(−DD)",
      result: "DD = 2.5 → PD ≈ 0.62%",
      explanation:
        "Because the inputs are market prices, PD moves the moment the equity does - far earlier than a credit rating, and correspondingly noisier.",
    },
  },
  "v-007": {
    title: "Gamma and the Delta-Gamma Correction",
    badge: "Valuation • Options",
    variables: [
      { name: "Delta - first-order sensitivity to the underlying price" },
      { name: "Gamma - the rate at which delta itself changes" },
    ],
    example: {
      title: "Why delta-normal VaR breaks on options",
      calculation: "A short option book with large negative Γ",
      result: "VaR is understated",
      explanation:
        "A delta-only approximation assumes a linear relationship. With negative gamma, losses grow faster than linearly in both directions - exactly the tail VaR is meant to measure.",
    },
  },
  "v-008": {
    title: "Portfolio Duration and DV01 Hedging",
    badge: "Valuation • Hedging",
    equation: "Number of contracts = − (DV01_portfolio / DV01_hedge instrument)",
    variables: [{ name: "The change in value for a 1 basis point move in yield" }],
    example: {
      title: "Hedging with bond futures",
      calculation: "Portfolio DV01 42,000 · contract DV01 68 → 42,000 / 68",
      result: "Sell about 618 contracts",
      explanation:
        "DV01 hedging only neutralises a parallel shift in the curve. If the curve twists or kinks the residual is uncovered - that is the basis risk of this hedge itself.",
    },
  },

  // ─── Market Risk ─────────────────────────────────────────────────────────
  "mr-001": {
    title: "Parametric VaR",
    badge: "Market Risk • Measurement",
    variables: [
      { name: "Portfolio value" },
      { name: "Normal quantile: 1.645 at 95% confidence; 2.326 at 99%" },
      { name: "Standard deviation and expected return over the period" },
    ],
    example: {
      title: "One-day 99% VaR",
      calculation: "V = 100bn, daily σ = 1.5%, μ ≈ 0 → 100 × 2.326 × 1.5%",
      result: "≈ 3.49bn",
      explanation:
        "Read it correctly: on only 1% of days does the loss exceed 3.49bn. It does NOT say how large the loss is on those days - that is what Expected Shortfall is for.",
    },
  },
  "mr-002": {
    title: "Scaling VaR Through Time (Square Root of Time)",
    badge: "Market Risk • Scaling",
    equation: "VaR_T days = VaR_1 day × √T",
    variables: [{ name: "Number of days" }],
    example: {
      title: "The implicit assumption",
      calculation: "1-day VaR = 3bn, T = 10 → 3 × √10",
      result: "≈ 9.49bn",
      explanation:
        "It only holds when returns are independent and identically distributed across days. Volatility clustering in real markets makes this scaling understate multi-day risk.",
    },
  },
  "mr-003": {
    title: "Expected Shortfall (Conditional VaR)",
    badge: "Market Risk • Coherent measures",
    equation: "ES = E[ Loss | Loss > VaR ]",
    variables: [
      { name: "Conditional expectation, taken over the tail beyond the VaR threshold" },
    ],
    example: {
      title: "Why Basel moved to ES",
      calculation: "Two portfolios with the same VaR of 3bn but different tails",
      result: "ES tells them apart; VaR does not",
      explanation:
        "VaR gives only the threshold, not how bad things get past it. ES is also coherent - combining two portfolios can never produce more risk than the sum of the parts.",
    },
  },
  "mr-004": {
    title: "EWMA Volatility Estimate",
    badge: "Market Risk • Volatility models",
    variables: [
      { name: "Decay factor; RiskMetrics uses 0.94 for daily data" },
      { name: "Previous period's return" },
    ],
    example: {
      title: "Why not a plain standard deviation",
      calculation: "λ = 0.94 → an observation 30 days ago retains a weight of ≈ 0.94³⁰ ≈ 16%",
      result: "Reacts quickly to a fresh shock",
      explanation:
        "A plain standard deviation treats every day in the window equally, so it responds slowly when the market has just shifted into a high-volatility regime.",
    },
  },
  "mr-005": {
    title: "Historical Simulation VaR",
    badge: "Market Risk • Non-parametric",
    equation: "VaR = the (1−c) quantile of the re-simulated P&L series",
    variables: [
      { name: "Confidence level" },
      { name: "Number of historical observations applied to today's portfolio" },
    ],
    example: {
      title: "500 days at the 99% level",
      calculation: "Sort the 500 results and take the 5th worst",
      result: "That is the VaR",
      explanation:
        "It assumes no distribution, so it preserves the fat tails and genuine skew in the data. In exchange it cannot produce a scenario that never appeared in the observation window.",
    },
  },
  "mr-006": {
    title: "Incremental VaR and Marginal VaR",
    badge: "Market Risk • Risk decomposition",
    equation: "Incremental VaR = VaR(with the position) − VaR(without it)",
    variables: [
      { name: "The derivative of VaR with respect to the position weight - used to allocate risk" },
    ],
    example: {
      title: "Why the parts don't sum to the whole",
      calculation: "Add up the standalone VaR of each trading desk",
      result: "Larger than the bank-wide VaR",
      explanation:
        "The difference is the diversification benefit. Allocating capital on standalone VaR overcharges every desk - Component VaR is the measure that adds up exactly to the total.",
    },
  },
  "mr-007": {
    title: "The Basel Market Risk Capital Multiplier",
    badge: "Market Risk • Capital requirement",
    equation: "Capital = max[VaRₜ₋₁ , m × 60-day average VaR] + the stressed VaR component",
    variables: [
      { name: "The multiplier, minimum 3, rising with the number of backtesting exceptions" },
    ],
    example: {
      title: "The traffic-light zones over 250 days",
      calculation: "0-4 exceptions: m = 3 · 5: 3.4 · 9: 3.85 · 10 or more: 4",
      result: "A poor model makes capital expensive",
      explanation:
        "This is the mechanism that makes a bank keep its own model honest: understating VaR to save capital raises the exception count, and the multiplier takes back more than was saved.",
    },
  },

  // ─── Credit Risk ─────────────────────────────────────────────────────────
  "c-001": {
    title: "Expected Loss",
    badge: "Credit • Risk components",
    variables: [
      { name: "Probability of default over the period" },
      { name: "Loss given default = 1 − the recovery rate" },
      { name: "Exposure at the moment of default" },
    ],
    example: {
      title: "The three components",
      calculation: "PD = 2%, LGD = 45%, EAD = 100bn → 0.02 × 0.45 × 100",
      result: "EL = 0.9bn",
      explanation:
        "Expected loss is priced into the loan as a cost. Capital exists for UNexpected loss, not for this figure.",
    },
  },

  "c-003": {
    title: "Credit Valuation Adjustment (CVA)",
    badge: "Credit • Counterparty risk",
    equation: "CVA ≈ Σ [ PD(t) × LGD × EE(t) × DF(t) ]",
    variables: [
      { name: "Expected exposure at time t" },
      { name: "Discount factor" },
    ],
    example: {
      title: "What it means",
      calculation: "The derivative's value minus the CVA",
      result: "The counterparty-risk-adjusted value",
      explanation:
        "CVA is the discount reflecting the chance the counterparty fails to perform. It turns counterparty credit risk into a number you can book.",
    },
  },
  "c-004": {
    title: "Recovery Rate and LGD",
    badge: "Credit • Recovery",
    equation: "LGD = 1 − Recovery Rate",
    variables: [
      { name: "What is recovered after realising collateral and working through bankruptcy" },
    ],
    example: {
      title: "The unhelpful correlation",
      calculation: "A recession → PD rises AND the recovery rate falls at the same time",
      result: "EL grows faster than linearly",
      explanation:
        "Assuming PD and LGD are independent understates tail risk: exactly when many borrowers default, collateral values are collapsing too.",
    },
  },
  "c-005": {
    title: "Marginal and Cumulative Default Probability",
    badge: "Credit Risk • Term structure",
    equation: "Cumulative PD (n years) = 1 − (1 − PD₁)(1 − PD₂)…(1 − PDₙ)",
    variables: [
      { name: "Marginal default probability in year k, conditional on surviving to it" },
    ],
    example: {
      title: "Three years at 2% PD each",
      calculation: "1 − 0.98³",
      result: "≈ 5.88%",
      explanation:
        "Adding 2% three times gives 6% - close, but always too high, and the error grows quickly when PD is large or the horizon long.",
    },
  },
  "c-006": {
    title: "Unexpected Loss",
    badge: "Credit Risk • Economic capital",
    variables: [
      { name: "Standard deviation of credit losses around their expected level" },
    ],
    example: {
      title: "Why capital doesn't cover EL",
      calculation: "EL goes into provisions and into the loan price",
      result: "Capital carries UL alone",
      explanation:
        "Confusing the two is the most common conceptual error in the credit section: average loss is a cost of doing business already priced into the lending rate, while capital exists for what exceeds the average.",
    },
  },
  "c-007": {
    title: "Expected Exposure and Potential Future Exposure",
    badge: "Credit Risk • Counterparty risk",
    equation: "EE(t) = E[max(V(t), 0)] · PFE(t) = the α quantile of max(V(t), 0)",
    variables: [
      { name: "Expected exposure - the average value when positive" },
      { name: "Potential exposure - a tail quantile, usually 95% or 97.5%" },
    ],
    example: {
      title: "Which one sets limits, which one prices",
      calculation: "Counterparty limits are set on PFE; CVA is computed from EE",
      result: "Two different purposes",
      explanation:
        "Only a positive value creates exposure - if the contract is negative to you, the counterparty defaulting costs you nothing. That is why both formulas carry max(·, 0).",
    },
  },

  // ─── Liquidity and Treasury Risk ─────────────────────────────────────────
  "l-001": {
    title: "Liquidity Coverage Ratio (LCR)",
    badge: "Liquidity • Basel III",
    numerator: "High-quality liquid assets (HQLA)",
    denominator: "Net cash outflows over 30 days of stress",
    variables: [
      { name: "Assets sellable quickly at close to their price, mostly government bonds" },
    ],
    example: {
      title: "The minimum threshold",
      calculation: "HQLA = 120bn, 30-day net outflows = 100bn → 120/100",
      result: "LCR = 120% (≥ 100%)",
      explanation:
        "This is a liquidity standard, not a capital one: it asks whether the bank survives a month of crisis without the interbank market.",
    },
  },
  "l-002": {
    title: "Net Stable Funding Ratio (NSFR)",
    badge: "Liquidity • Basel III",
    numerator: "Available stable funding (ASF)",
    denominator: "Required stable funding (RSF)",
    variables: [
      { name: "Capital and long-term debt; retail deposits weight highly because they are sticky" },
      { name: "The stable funding the assets held actually require" },
    ],
    example: {
      title: "Different horizon from LCR",
      calculation: "LCR looks 30 days ahead · NSFR looks one year ahead",
      result: "Both must be ≥ 100%",
      explanation:
        "LCR blocks a short-term shock; NSFR blocks a business model that is structurally maturity-mismatched - funding long assets short as a matter of habit.",
    },
  },
  "l-003": {
    title: "The Liquidity Cost of a Position",
    badge: "Liquidity • Market liquidity",
    equation: "Cost ≈ ½ × Bid-ask spread × Position value + Price impact",
    variables: [
      { name: "The extra slippage once the size exceeds the depth of the order book" },
    ],
    example: {
      title: "For a large position",
      calculation: "The bid-ask spread is the small part; most of the cost is price impact",
      result: "The second term dominates",
      explanation:
        "This is why liquidity-adjusted VaR exists: selling a large position at the quoted price is not something that happens in practice.",
    },
  },
  "l-004": {
    title: "Cumulative Liquidity Gap",
    badge: "Liquidity • Cash flow ladder",
    equation: "Cumulative gap(T) = Σ (Inflows − Outflows) across the buckets up to T",
    variables: [{ name: "Maturity bucket: overnight, 1 week, 1 month, 3 months, 1 year" }],
    example: {
      title: "The number that decides",
      calculation: "The bucket where the cumulative figure turns negative",
      result: "That is when the institution runs out of cash",
      explanation:
        "A single bucket's gap can be covered by a surplus in the one before it. Only the cumulative figure answers the question that actually matters.",
    },
  },

  // ─── Investment Management ───────────────────────────────────────────────
  "i-001": {
    title: "Sortino Ratio",
    badge: "Investment • Downside risk",
    numerator: "Portfolio return − Minimum acceptable return (MAR)",
    denominator: "Standard deviation of returns BELOW the threshold",
    variables: [{ name: "Minimum acceptable return - the threshold the investor treats as acceptable" }],
    example: {
      title: "The improvement on Sharpe",
      calculation: "Sharpe penalises upside volatility as well as downside",
      result: "Sortino penalises the downside only",
      explanation:
        "No investor is afraid of their portfolio rising sharply. For strategies with asymmetric payoffs, Sortino reflects the actual experience better.",
    },
  },
  "i-002": {
    title: "Tracking Error",
    badge: "Investment • Active management",
    equation: "TE = Standard deviation of (Rp − Rb)",
    variables: [{ name: "Benchmark return" }],
    example: {
      title: "Reading the number",
      calculation: "TE = 2% → an index-hugging fund · TE = 10% → large active bets",
      result: "It measures willingness to deviate",
      explanation:
        "TE isn't a measure of good or bad, it's a measure of how active a fund is. A fund charging active fees with a TE near 0 is an index fund in disguise.",
    },
  },

  "i-004": {
    title: "Geometric Mean Return",
    badge: "Investment • Measuring returns",
    variables: [{ name: "Return in each period" }],
    example: {
      title: "Why it is always below the arithmetic mean",
      calculation: "Year 1: +50%, year 2: −50% → arithmetic = 0%, geometric = √(1.5 × 0.5) − 1",
      result: "Geometric = −13.4%",
      explanation:
        "The arithmetic mean says 0%, but 100 has become 75. Only the geometric mean reflects what the investor actually ended up with.",
    },
  },

  // ─── Operational Risk ────────────────────────────────────────────────────
  "o-001": {
    title: "Operational Risk Capital Under SMA",
    badge: "Operational • Basel III",
    equation: "Capital = BIC × ILM",
    variables: [
      { name: "Business Indicator Component - the scale of operations, from the accounts" },
      { name: "Internal Loss Multiplier - derived from the bank's own 10-year loss history" },
    ],
    example: {
      title: "Why internal models were dropped",
      calculation: "Two banks with similar risk profiles produced very different capital numbers",
      result: "Sensitivity traded for comparability",
      explanation:
        "Extremely sparse tail data plus an incentive to reduce capital made internal models incomparable, so Basel returned to one standard formula for everyone.",
    },
  },
  "o-002": {
    title: "Aggregate Loss Distribution (LDA)",
    badge: "Operational • Loss modelling",
    equation: "Annual loss = Σ Xᵢ , for i = 1..N",
    variables: [
      { name: "Number of events in the year - the frequency model, usually Poisson" },
      { name: "Severity of each event - the severity model, usually lognormal" },
    ],
    example: {
      title: "Two separate distributions",
      calculation: "Combine frequency and severity by simulation → the annual loss distribution",
      result: "Take the 99.9% quantile as capital",
      explanation:
        "Separating the two dimensions lets you model how often it happens and how much it costs independently - two things with very different drivers.",
    },
  },
  "o-003": {
    title: "Inherent and Residual Risk (RCSA)",
    badge: "Operational • Self-assessment",
    equation: "Residual risk = Inherent risk × (1 − Control effectiveness)",
    variables: [{ name: "The risk level before any control is taken into account" }],
    example: {
      title: "The gap is what the controls are worth",
      calculation: "High inherent, low residual → the control system is working",
      result: "Inherent ≈ residual → the controls do nothing",
      explanation:
        "Rating both levels is what answers the governance question: is this control worth what it costs to maintain, and how exposed would we be without it?",
    },
  },

  // ─── Current Issues ──────────────────────────────────────────────────────
  "ci-001": {
    title: "Unrealised Losses on a Held-to-Maturity Portfolio",
    badge: "Current Issues • The 2023 turmoil",
    equation: "Unrealised loss = Fair value − Carrying value",
    variables: [
      { name: "Amortised cost; the held-to-maturity book is not remeasured to market" },
    ],
    example: {
      title: "The figure to look for in the notes",
      calculation: "Compare that loss against the reported shareholders' equity",
      result: "It can exceed the equity entirely",
      explanation:
        "Held-to-maturity is an intention, not an ability. When depositors withdraw together the bank has to sell, and the paper loss becomes a real one.",
    },
  },
  "ci-002": {
    title: "Share of Uninsured Deposits",
    badge: "Current Issues • Run risk",
    numerator: "Deposits above the insurance limit",
    denominator: "Total deposits",
    variables: [{ name: "The maximum the deposit insurer will pay out" }],
    example: {
      title: "Why this is a warning indicator",
      calculation: "The higher the share → the more depositors have a reason to withdraw first",
      result: "The brake on a run disappears",
      explanation:
        "Deposit insurance exists to remove the incentive to run first. When most of the balance sits above the limit, running becomes the rational individual response.",
    },
  },
  "ci-003": {
    title: "The Credit Adjustment Spread in the LIBOR Transition",
    badge: "Current Issues • Life after LIBOR",
    equation: "Replacement rate = New reference rate + Credit adjustment spread",
    variables: [
      { name: "Compensates for the bank credit risk in LIBOR that the new rate does not carry" },
    ],
    example: {
      title: "Why you cannot simply substitute one for the other",
      calculation: "LIBOR is unsecured interbank lending; the new rates are near risk-free",
      result: "Omitting the spread transfers value",
      explanation:
        "Substituting directly without adding the spread shifts economic value from one side to the other in every existing contract.",
    },
  },

  // ─── Foundations, tiếp ───────────────────────────────────────────────────
  "f-006": {
    title: "Economic Capital from a Loss Quantile",
    badge: "Foundations • Capital",
    equation: "EC = Loss quantile at the confidence level − Expected loss",
    variables: [
      { name: "Economic capital - carries UNexpected loss only" },
      { name: "Expected loss, already in provisions and in the price" },
    ],
    example: {
      title: "Why EL is subtracted",
      calculation: "EC = the 99.9% loss quantile − EL",
      result: "Only what exceeds the average",
      explanation:
        "Average loss is a cost of doing business, already in the lending rate. Capital exists for the part you never know is coming.",
    },
  },
  "f-007": {
    title: "RAROC",
    badge: "Foundations • Capital allocation",
    numerator: "Profit − Expected loss",
    denominator: "Economic capital",
    variables: [
      { name: "The cost of shareholders' capital - the line between creating and destroying value" },
    ],
    example: {
      title: "Two trading desks",
      calculation: "A: 100/1,000 = 10% · B: 40/250 = 16% · cost of capital 12%",
      result: "B creates value, A destroys it",
      explanation:
        "Desk A earns two and a half times as much but consumes so much capital that it cannot cover what shareholders demand for it.",
    },
  },
  "f-008": {
    title: "Basel Tier 1 Capital Ratio",
    badge: "Foundations • Regulatory capital",
    numerator: "Tier 1 capital",
    denominator: "Risk-weighted assets (RWA)",
    variables: [{ name: "Assets multiplied by the risk weight of their category" }],
    example: {
      title: "Why two banks of the same size need different capital",
      calculation: "100bn of government bonds (0%) + 100bn of corporate loans (100%)",
      result: "RWA = 100bn",
      explanation: "The capital requirement is driven by the asset mix, not by total assets.",
    },
  },
  "f-009": {
    title: "The Basel Leverage Ratio",
    badge: "Foundations • Leverage",
    numerator: "Tier 1 capital",
    denominator: "Total exposure, with no risk weighting",
    variables: [{ name: "The minimum is 3% under Basel III" }],
    example: {
      title: "Why this second measure is needed",
      calculation: "RWA depends on the model; total exposure does not",
      result: "A model-independent backstop",
      explanation:
        "It exists to catch the bank that lowers RWA by choosing a model rather than by reducing actual risk.",
    },
  },

  // ─── Financial Markets and Products, tiếp ────────────────────────────────
  "m-008": {
    title: "The Option Greeks",
    badge: "Markets & Products • Derivatives",
    variables: [
      { name: "Sensitivity to the underlying price" },
      { name: "The rate at which delta changes" },
      { name: "Vega - sensitivity to volatility" },
      { name: "Theta - decay through time" },
    ],
    example: {
      title: "A short option position",
      calculation: "Negative Γ and positive θ",
      result: "Paid by time, exposed to volatility",
      explanation:
        "Selling options means collecting a steady premium every day and carrying the tail - stable profit right up until it isn't.",
    },
  },
  "m-009": {
    title: "Covered Interest Rate Parity",
    badge: "Markets & Products • FX",
    equation: "F = S · (1 + r_domestic · T) / (1 + r_foreign · T)",
    variables: [{ name: "Forward exchange rate" }, { name: "Spot exchange rate" }],
    example: {
      title: "Why the relationship holds",
      calculation: "Any deviation from it is a riskless arbitrage",
      result: "The market closes it immediately",
      explanation:
        "Since 2008 the cross-currency basis has been persistently non-zero - the arbitrage still exists, but nobody has the balance sheet to take it.",
    },
  },
  "m-010": {
    title: "The Value of a Forward After Inception",
    badge: "Markets & Products • Derivatives",
    equation: "f = (F_current − F_at inception) · e^(−rT)",
    variables: [{ name: "Present value of the contract to the buyer" }],
    example: {
      title: "What it is worth at signing",
      calculation: "F_current = F_at inception",
      result: "f = 0",
      explanation:
        "A forward costs nothing to enter; it only takes on value once the forward price has moved.",
    },
  },
  "m-011": {
    title: "General Cost of Carry",
    badge: "Markets & Products • Commodities",
    variables: [
      { name: "Storage cost" },
      { name: "Yield paid by the asset, such as dividends" },
      { name: "Convenience yield" },
    ],
    example: {
      title: "When backwardation appears",
      calculation: "y > r + u − q",
      result: "F₀ < S₀",
      explanation:
        "A convenience yield above the total cost of carry means the physical is scarce - and that is when futures fall below spot.",
    },
  },
  "m-012": {
    title: "Effective Duration",
    badge: "Markets & Products • Fixed income",
    numerator: "P(y−Δy) − P(y+Δy)",
    denominator: "2 · P₀ · Δy",
    variables: [{ name: "Works for bonds with embedded options too" }],
    example: {
      title: "Why Macaulay duration doesn't work for MBS",
      calculation: "MBS cash flows change with interest rates",
      result: "You have to reprice in both directions",
      explanation:
        "This formula measures by actually repricing at two yields, so it captures the cash flows changing shape as well.",
    },
  },
  "m-013": {
    title: "Bid-Ask Spread and Round-Trip Cost",
    badge: "Markets & Products • Microstructure",
    numerator: "Ask − Bid",
    denominator: "Mid price",
    variables: [
      { name: "The cost of buying and immediately selling, approximately the full spread" },
    ],
    example: {
      title: "Why half the spread is used for one direction",
      calculation: "Exiting a position crosses only half of it",
      result: "Half the spread",
      explanation:
        "This is the figure that feeds LVaR: the liquidation cost added on top of standard VaR.",
    },
  },
  "m-014": {
    title: "Bond-Equivalent Yield from a Discount Price",
    badge: "Markets & Products • Money markets",
    numerator: "(Face value − Price) · 365",
    denominator: "Price · Days remaining",
    variables: [{ name: "Bond-equivalent yield, put on a 365-day basis" }],
    example: {
      title: "Why it differs from the discount yield",
      calculation: "The discount yield divides by FACE VALUE and uses 360 days",
      result: "BEY is always higher",
      explanation:
        "Two different conventions on the same instrument - comparing the two figures directly is a common error in the money markets section.",
    },
  },

  // ─── Valuation and Risk Models, tiếp ─────────────────────────────────────
  "v-009": {
    title: "The Black-Scholes-Merton Formula",
    badge: "Valuation • Options",
    variables: [
      { name: "The risk-neutral probability the option finishes in the money" },
      { name: "The call's delta" },
    ],
    example: {
      title: "The assumption most often violated",
      calculation: "Volatility constant through time and across strikes",
      result: "The volatility smile",
      explanation:
        "It is precisely because that assumption is wrong that the market implies different volatilities at different strikes.",
    },
  },
  "v-010": {
    title: "d₁ and d₂ in Black-Scholes",
    variables: [{ name: "Standard deviation of the cumulative return to expiry" }],
    example: {
      title: "How the two relate",
      calculation: "d₂ is always below d₁ by exactly σ√T",
      result: "The gap widens with maturity",
      explanation:
        "The longer the maturity and the higher the volatility, the further the two probabilities separate.",
    },
  },
  "v-011": {
    title: "Multi-Step Binomial Option Pricing",
    badge: "Valuation • Options",
    equation: "f = e^(−rΔt)·[p·f_u + (1−p)·f_d]",
    variables: [
      { name: "Risk-neutral probability" },
      { name: "Option value at the two branches of the next step" },
    ],
    example: {
      title: "American options",
      calculation: "At every node, compare holding on against exercising immediately",
      result: "Take the larger value",
      explanation:
        "This is why a binomial tree can price American options while Black-Scholes cannot.",
    },
  },
  "v-012": {
    title: "Duration of a Bond Portfolio",
    badge: "Valuation • Portfolio",
    equation: "D_portfolio = Σ wᵢ · Dᵢ",
    variables: [{ name: "Weights by MARKET VALUE, not by face value" }],
    example: {
      title: "A common trap",
      calculation: "Using face-value weights instead of market-value weights",
      result: "Wrong when prices are far from par",
      explanation:
        "For deeply discounted or heavily premium bonds, the two weighting methods give materially different durations.",
    },
  },

  "v-014": {
    title: "Beta Hedge Ratio for an Equity Portfolio",
    badge: "Valuation • Hedging",
    numerator: "(Target β − Current β) · Portfolio value",
    denominator: "Value of one futures contract",
    variables: [{ name: "The beta being targeted; 0 means market-neutral" }],
    example: {
      title: "Full neutralisation",
      calculation: "Target β = 0",
      result: "Sell contracts",
      explanation:
        "A beta hedge neutralises systematic risk only; the idiosyncratic risk of the individual names remains untouched.",
    },
  },
  "mr-008": {
    title: "Component VaR",
    badge: "Market Risk • Allocation",
    equation: "CVaRᵢ = wᵢ × Marginal VaRᵢ",
    variables: [
      { name: "Position i's contribution - the components sum exactly to total VaR" },
    ],
    example: {
      title: "Why this is the measure for splitting capital",
      calculation: "Sum of the Component VaRs = portfolio VaR",
      result: "Nothing double-counted",
      explanation:
        "Standalone VaRs sum to more than the whole by exactly the diversification benefit, so charging on them charges for risk that does not exist.",
    },
  },
  "mr-009": {
    title: "FRTB Liquidity Horizons",
    badge: "Market Risk • Capital",
    equation: "ES = √( Σ (ES_j)² ) across the liquidity horizon buckets",
    variables: [
      { name: "From 10 days for liquid FX to 120 days for hard-to-sell credit" },
    ],
    example: {
      title: "Why the flat 10-day assumption was dropped",
      calculation: "2008 showed liquidity does not evaporate at the same rate everywhere",
      result: "Bucketed by factor category",
      explanation:
        "Some credit markets had no price at all for weeks while major currency pairs kept trading normally.",
    },
  },
  "c-008": {
    title: "Exposure After Netting and Collateral",
    badge: "Credit Risk • Counterparty risk",
    equation: "Exposure = max(0, Net value after netting − Collateral × (1 − haircut))",
    variables: [{ name: "The discount applied to collateral value against a fall in price" }],
    example: {
      title: "An example",
      calculation: "Net exposure 60, collateral 50, haircut 10%",
      result: "60 − 45 = 15bn",
      explanation:
        "Ignoring the haircut understates the residual risk exactly in the cases where the collateral is of the poorest quality.",
    },
  },
  "c-009": {
    title: "Asset Correlation in the Single-Factor Model",
    badge: "Credit Risk • Portfolio",
    equation: "Aᵢ = √ρ · Z + √(1−ρ) · εᵢ",
    variables: [
      { name: "Asset correlation - arising from a common systematic factor, not from links between the borrowers" },
      { name: "The common systematic factor" },
      { name: "Each borrower's idiosyncratic component" },
    ],
    example: {
      title: "Why defaults cluster",
      calculation: "A high ρ means many borrowers cross the threshold at once",
      result: "A fatter tail",
      explanation:
        "Expected loss doesn't change with ρ; only the tail does - which is why concentration shows up in capital rather than in provisions.",
    },
  },
  "o-004": {
    title: "Annualised Expected Loss from a Scenario",
    badge: "Operational • Scenarios",
    numerator: "The scenario's loss amount",
    denominator: "Years between occurrences",
    variables: [{ name: "Frequency - the inverse of the return period" }],
    example: {
      title: "A 1-in-20-year scenario losing 500bn",
      calculation: "500 ÷ 20",
      result: "25bn/year",
      explanation:
        "Don't read it as a forecast: in 19 years the loss is 0 and in one year it is 500bn. No year is ever 25.",
    },
  },
  "o-005": {
    title: "Scaling External Loss Data by Size",
    badge: "Operational • Industry data",
    equation: "Scaled loss = Original loss × (Our size / Their size)^λ",
    variables: [{ name: "The exponent, usually below 1 - a sub-linear relationship" }],
    example: {
      title: "Why it is not linear",
      calculation: "Larger institutions have more layers of control and detect problems earlier",
      result: "λ < 1",
      explanation:
        "The choice of λ moves the result more than most other technical choices, and it is rarely justified.",
    },
  },
  "o-006": {
    title: "The Poisson Frequency Distribution",
    badge: "Operational • LDA",
    equation: "P(N = k) = e^(−λ) · λ^k / k!",
    variables: [
      { name: "Expected events per year - both the mean and the variance" },
    ],
    example: {
      title: "Why Poisson is used for frequency",
      calculation: "Rare, independent events arriving at a steady rate",
      result: "It matches the operational risk assumptions",
      explanation:
        "Severity uses a different distribution, usually lognormal - separating the two dimensions is the core of LDA.",
    },
  },
  "o-007": {
    title: "The Business Indicator in SMA",
    badge: "Operational • Capital",
    equation: "BI = Interest and leasing component + Services component + Financial component",
    variables: [
      { name: "Business Indicator - the interest, services and financial components combined" },
    ],
    example: {
      title: "Why it is based on business scale",
      calculation: "No internal model is approved any more",
      result: "Comparable across banks",
      explanation:
        "The trade-off: less sensitivity to an individual risk profile, in exchange for being able to compare institutions.",
    },
  },
  "o-008": {
    title: "The Internal Loss Multiplier",
    badge: "Operational • Capital",
    equation: "ILM = ln( e − 1 + (Loss component / Business indicator component)^0.8 )",
    variables: [
      { name: "Internal Loss Multiplier - pulls capital up or down with the actual loss history" },
    ],
    example: {
      title: "What it means",
      calculation: "A bank with a lighter-than-average loss history gets an ILM below 1",
      result: "Lower capital",
      explanation:
        "This is the only place left in SMA where a bank's own risk profile still moves the capital number.",
    },
  },

  "o-009": {
    title: "Residual Risk After Controls",
    badge: "Operational • RCSA",
    equation: "Residual risk = Inherent risk × (1 − Control effectiveness)",
    variables: [{ name: "The risk level with no control in place at all" }],
    example: {
      title: "Why both have to be measured",
      calculation: "Measuring residual risk alone hides how much the controls are carrying",
      result: "A control failure exposes everything",
      explanation:
        "A low residual risk resting on a single control is a very different thing from a risk that was low to begin with.",
    },
  },
  "l-005": {
    title: "Liquidity-Adjusted VaR",
    badge: "Liquidity • Measurement",
    equation: "LVaR = VaR + ½ · Bid-ask spread × Position value",
    variables: [{ name: "Half the spread - the one-way exit cost, measured from the mid" }],
    example: {
      title: "Why standard VaR is not enough",
      calculation: "It assumes you exit at the mid and exit immediately",
      result: "Wrong for a large position",
      explanation:
        "In a thin market the liquidation cost alone can exceed the original VaR figure.",
    },
  },
  "l-006": {
    title: "Loan-to-Deposit Ratio",
    badge: "Liquidity • Funding structure",
    numerator: "Total loans",
    denominator: "Total deposits",
    variables: [
      { name: "Above 100% means the difference has to be funded in the wholesale market" },
    ],
    example: {
      title: "Why exceeding 100% is a concern",
      calculation: "Wholesale funding disappears faster than retail deposits",
      result: "Rollover risk",
      explanation:
        "A wholesale counterparty doesn't need to withdraw - they only need to not roll the contract the following morning.",
    },
  },
  "l-007": {
    title: "Intraday Liquidity Requirement",
    badge: "Liquidity • Payments",
    equation: "Peak requirement = max over the hours of (Cumulative outflows − Cumulative inflows)",
    variables: [
      { name: "The buffer needed to avoid a payment jam in the middle of the day" },
    ],
    example: {
      title: "Why LCR doesn't catch it",
      calculation: "LCR measures over 30 days, not over hours",
      result: "A separate metric is needed",
      explanation:
        "A bank with ample liquidity at the close can still be unable to settle at ten in the morning.",
    },
  },
  "i-005": {
    title: "Pension Fund Surplus at Risk",
    badge: "Investment • Assets and liabilities",
    equation: "Surplus at Risk = z × σ(Assets − Liabilities) × Surplus value",
    variables: [
      { name: "Volatility of the gap between assets and liabilities, not of the assets alone" },
    ],
    example: {
      title: "Why measuring the asset side alone is wrong",
      calculation: "Rates fall → the present value of the liabilities inflates",
      result: "A deficit in a year when the assets rose",
      explanation:
        "A fund can gain on its portfolio and still get worse at paying what it owes. Measuring asset risk alone misses exactly half of the problem a pension fund exists to solve.",
    },
  },
  "i-006": {
    title: "The Allocation Effect in Attribution",
    badge: "Investment • Attribution",
    equation: "Allocation effect = Σ (w_portfolio − w_benchmark) × (R_sector − R_benchmark)",
    variables: [{ name: "Sector weight in the portfolio and in the benchmark" }],
    example: {
      title: "Separating it from selection",
      calculation: "The selection effect uses return differences WITHIN each sector",
      result: "Two different skills",
      explanation:
        "A positive total can hide two opposite stories - good allocation with poor selection, or the reverse.",
    },
  },
  "i-007": {
    title: "Portfolio Beta",
    badge: "Investment • Systematic risk",
    equation: "β_portfolio = Σ wᵢ · βᵢ",
    variables: [{ name: "Weights by market value" }],
    example: {
      title: "Why it comes before any talk of alpha",
      calculation: "A high beta produces excess return on its own in a rising market",
      result: "That is not skill",
      explanation:
        "Subtract the reward for risk first; what remains is where skill can be discussed at all.",
    },
  },
  "ci-004": {
    title: "Expected Loss Under a Climate Scenario",
    badge: "Current Issues • Climate",
    equation: "EL_climate = Σ P(scenario) × Loss(scenario)",
    variables: [
      { name: "Scenarios usually follow standard temperature pathways, not a statistical distribution" },
    ],
    example: {
      title: "Why scenarios are used",
      calculation: "There is no historical series for something that hasn't happened",
      result: "The same shape as operational risk",
      explanation:
        "Physical risk and transition risk trade off against each other: aggressive action lowers the first and raises the second.",
    },
  },
  "ci-005": {
    title: "Expected Loss from a Cyber Incident",
    badge: "Current Issues • Cyber risk",
    equation: "EL = Frequency × Average severity",
    variables: [
      { name: "Expected number of incidents per year" },
      { name: "Average loss per incident, including disruption and legal costs" },
    ],
    example: {
      title: "The main obstacle",
      calculation: "Severe incidents are rare and rarely disclosed",
      result: "The tail cannot be estimated",
      explanation:
        "Internal data has almost no observations in the most severe range - which forces a reliance on scenarios.",
    },
  },

  "v-002": {
    title: "Risk-Neutral Probability",
    badge: "Valuation • Option pricing",
    numerator: "e^(r×Δt) − d",
    denominator: "u − d",
    variables: [
      { name: "The up and down multipliers" },
      { name: "The length of one step" },
    ],
    example: {
      title: "Not a real-world probability",
      calculation: "u = 1.2, d = 0.8, r = 5%, Δt = 1 → (e^0.05 − 0.8) / (1.2 − 0.8)",
      result: "p ≈ 0.628",
      explanation:
        "This is a set of mathematical weights with the risk premium already folded in, which is what lets us discount at the risk-free rate. It is nobody's belief about the chance of a rise.",
    },
  },
  "v-003": {
    title: "Second-Order Bond Price Estimate",
    badge: "Valuation • Duration & Convexity",
    equation: "%ΔP ≈ − Duration × Δr + ½ × Convexity × (Δr)²",
    variables: [
      { name: "The change in yield" },
      { name: "The second-order curvature term, always additive when convexity is positive" },
    ],
    example: {
      title: "Why the second order is needed",
      calculation: "Duration 6, convexity 80, rates up 2% → −6 × 2% + ½ × 80 × 0.02²",
      result: "−12% + 1.6% = −10.4%",
      explanation:
        "Duration alone overstates the loss. The convexity term helps in both directions, which is why a high-convexity bond usually has to be paid for with a lower yield.",
    },
  },
  "v-004": {
    title: "DV01 (Dollar Value of One Basis Point)",
    badge: "Valuation • Interest rate risk",
    equation: "DV01 = Effective duration × Position value × 0.0001",
    variables: [{ name: "One basis point" }],
    example: {
      title: "Why trading desks prefer DV01",
      calculation: "A 500bn position, duration 7 → 7 × 500bn × 0.0001",
      result: "350 million per basis point",
      explanation:
        "Expressed in money, it adds up across positions of different maturities and sizes - which a duration in percent cannot do.",
    },
  },
  "v-005": {
    title: "Bond Price Approximation with Duration and Convexity",
    badge: "Valuation • Rate sensitivity",
    equation: "ΔP/P ≈ −D·Δy + ½·C·(Δy)²",
    variables: [
      { name: "Modified duration - the first-order sensitivity" },
      { name: "Convexity - the second-order correction for the curvature of the price line" },
    ],
    example: {
      title: "Rates up 200 basis points",
      calculation: "D = 7 · C = 90 · Δy = 0.02 → −0.14 + 0.018",
      result: "≈ −12.2% rather than −14%",
      explanation:
        "Duration alone always understates the price in both directions, because positive convexity only ever adds. The error grows the larger the rate move.",
    },
  },
  "v-013": {
    title: "Approximate Yield to Maturity",
    badge: "Valuation • Fixed income",
    numerator: "Coupon + (Face value − Price) / Years",
    denominator: "(Face value + Price) / 2",
    variables: [
      { name: "The yield assuming you hold to maturity and reinvest coupons at the same rate" },
    ],
    example: {
      title: "The hidden assumption",
      calculation: "Coupons are reinvested at exactly the YTM",
      result: "Rarely true",
      explanation:
        "This is why the realised return differs from YTM when reinvestment rates change - reinvestment risk.",
    },
  },
  "c-002": {
    title: "Default Probability Implied by a Credit Spread",
    badge: "Credit • Pricing",
    numerator: "Credit spread",
    denominator: "LGD",
    variables: [
      { name: "The yield difference against a risk-free bond of the same maturity" },
    ],
    example: {
      title: "A quick approximation",
      calculation: "Spread = 300 basis points, LGD = 60% → 3% / 0.6",
      result: "PD ≈ 5% per year",
      explanation:
        "This is a risk-neutral PD, so it always exceeds the real-world one - the difference is the risk premium and the liquidity premium investors demand on top.",
    },
  },
  "i-003": {
    title: "Maximum Drawdown and the Calmar Ratio",
    badge: "Investment • Experienced risk",
    numerator: "Average annual return",
    denominator: "Maximum drawdown",
    variables: [
      { name: "The deepest peak-to-trough fall over the observation period" },
    ],
    example: {
      title: "Why measure against drawdown",
      calculation: "15%/year return, 30% maximum drawdown → 15/30",
      result: "Calmar = 0.5",
      explanation:
        "What makes an investor quit is the deepest fall they had to sit through, not the standard deviation - Calmar puts return beside exactly that pain.",
    },
  },
  "q-008": {
    title: "Standard Error of the Sample Mean",
    badge: "Quantitative • Inference",
    numerator: "Sample standard deviation (s)",
    denominator: "Square root of the sample size (√n)",
    variables: [
      { name: "Sample size - the error falls with the square root, not with n" },
    ],
    example: {
      title: "To halve the error",
      calculation: "The sample size has to quadruple",
      result: "√4 = 2",
      explanation:
        "This is why adding data hits diminishing returns so fast, and why three years of fund returns says very little about skill.",
    },
  },
  "q-009": {
    title: "Linear Regression - The Beta Coefficient",
    badge: "Quantitative • Regression",
    numerator: "Covariance(X, Y)",
    denominator: "Variance(X)",
    variables: [
      { name: "The slope - the expected change in Y for a one-unit rise in X" },
    ],
    example: {
      title: "A stock's beta",
      calculation: "Cov(Ri, Rm) / Var(Rm)",
      result: "That is the CAPM beta",
      explanation:
        "The beta in CAPM is exactly the slope of a regression of the stock's returns on the market's - not a separate concept.",
    },
  },
};
