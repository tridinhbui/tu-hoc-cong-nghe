import type { GlossaryTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của thẻ thuật ngữ FRM (`lib/frm-glossary-terms.ts`), khoá
 * theo `id`.
 *
 * Tách khỏi `en.ts` chứ không trộn chung: hai bộ thẻ có hai tệp gốc, hai kỳ
 * thi, và hai người có thể dịch song song mà không đụng nhau. Id của chúng rời
 * nhau (`frm-*` với `fsa-*`/`eth-*`/…) nên `glossaryPatch` tra một map gộp là
 * đủ, không cần biết thẻ thuộc bộ nào.
 *
 * Ba luật khi thêm mục, giống `en.ts`:
 *
 * 1. `termEn` KHÔNG nằm ở đây - nó đã là tiếng Anh trong tệp gốc, đủ ở cả 92
 *    mục, và đang làm tiêu đề thẻ.
 *
 * 2. `frmTip` là chỗ ghi CÁI BẪY, không phải chỗ nhắc lại định nghĩa lần hai.
 *    Chú thích đầu `frm-glossary-terms.ts` nói rõ điều đó, và bản dịch phải
 *    giữ đúng vai trò ấy: phần lớn tip ở đây là một phân biệt ("đừng lẫn X với
 *    Y") hoặc một điều kiện mà mô hình chỉ đúng bên trong nó. Dịch thành một
 *    câu tóm tắt chung chung là làm hỏng thẻ.
 *
 * 3. Viết tắt và tên chuẩn giữ nguyên: VaR, ES, CVA/DVA, LGD, PD, EWMA,
 *    GARCH, BCBS 239, RiskMetrics. Đó là dữ liệu, không phải chữ để dịch -
 *    người học tra cứu bằng đúng chữ đó.
 *
 * Đổi dấu thập phân: "λ = 0,94" thành "λ = 0.94", cùng lý do với lessons-i18n.
 */
export const frmGlossaryEn: Record<string, GlossaryTranslation> = {
  // ─── Foundations ─────────────────────────────────────────────────────────
  "frm-fou-001": {
    definition:
      "The overall level of risk an organisation deliberately takes on in pursuit of its strategic objectives.",
    frmTip:
      "Don't confuse this with risk capacity. Capacity is the maximum the organisation can WITHSTAND before it can no longer operate; appetite is what it CHOOSES to take, and must always sit below capacity.",
  },
  "frm-fou-002": {
    definition:
      "The maximum loss an organisation can absorb while still holding enough capital and liquidity to keep operating.",
    frmTip:
      "Capacity is an objective constraint derived from capital and liquidity; appetite is a board decision. The exam likes to describe an appetite that exceeds capacity - that is always the wrong answer.",
  },
  "frm-fou-003": {
    definition:
      "Excess return over the risk-free rate per unit of total risk, measured by standard deviation.",
    frmTip:
      "The denominator is TOTAL risk. Treynor uses beta, i.e. systematic risk only - so for a well-diversified portfolio the two rank identically, and for a concentrated one they do not.",
  },
  "frm-fou-004": {
    definition:
      "Excess return over the benchmark divided by tracking error - a measure of the manager's active skill.",
    frmTip:
      "It differs from Sharpe in the reference point: a benchmark rather than the risk-free rate. An index-hugging fund can show a fine Sharpe ratio and an information ratio near 0, meaning it added no active value at all.",
  },
  "frm-fou-005": {
    definition:
      "The Basel principles on risk data aggregation and reporting capability, written after 2008 exposed that many banks needed days to answer what their total exposure to a single counterparty was.",
    frmTip:
      "This is a standard about DATA INFRASTRUCTURE, not about models. A correct model running on data that can't be aggregated in time still produces its number too late.",
  },

  // ─── Quantitative Analysis ───────────────────────────────────────────────
  "frm-qua-001": {
    definition:
      "A Type I error rejects the null hypothesis when it is true; a Type II error fails to reject it when it is false.",
    frmTip:
      "In VaR backtesting, Type I is concluding the model is broken when it is fine. Lowering the significance level to cut Type I automatically raises Type II - with the sample size fixed, the two cannot both fall.",
  },
  "frm-qua-002": {
    definition:
      "A model that estimates today's variance from the long-run variance, yesterday's variance and yesterday's squared return.",
    frmTip:
      "The stationarity condition is α + β < 1. The closer to 1, the more persistent a shock; at exactly 1 the model collapses into EWMA and there is no long-run variance left to revert to.",
  },
  "frm-qua-003": {
    definition:
      "A variance estimate that weights the past with exponentially decaying weights, governed by the parameter λ.",
    frmTip:
      "EWMA is GARCH(1,1) with ω = 0. RiskMetrics uses λ = 0.94 for daily data - the smaller λ is, the faster the model reacts and the noisier it gets.",
  },
  "frm-qua-004": {
    definition:
      "A tool for joining individual marginal distributions into a joint distribution, separating the dependence structure from each variable's own distribution.",
    frmTip:
      "The Gaussian copula has zero tail dependence: it quietly assumes extreme events do not happen together. That is precisely the assumption that collapsed in the 2007-2008 housing crisis.",
  },

  // ─── Financial Markets and Products ──────────────────────────────────────
  "frm-fmp-001": {
    definition: "Contango is a futures price above spot; backwardation is a futures price below it.",
    frmTip:
      "Commodity ETFs have to roll contracts continuously, so sustained contango erodes returns through a negative roll yield even when the spot price hasn't moved at all.",
  },
  "frm-fmp-002": {
    definition:
      "The bond the seller of a bond futures contract chooses to deliver because it costs them the least.",
    frmTip:
      "The delivery option belongs to the SELLER, so it always pushes the futures price slightly below what it would be without that option.",
  },
  "frm-fmp-003": {
    definition:
      "The risk that the price of the asset being hedged and the price of the hedging instrument do not move together as assumed.",
    frmTip:
      "A hedge doesn't remove risk, it EXCHANGES price risk for basis risk. The right question isn't whether risk remains, but whether what remains is smaller and more predictable.",
  },
  "frm-fmp-004": {
    definition:
      "A contract in which two parties exchange interest cash flows - typically fixed for floating - on the same notional amount.",
    frmTip:
      "The notional is never exchanged, so the credit exposure is far smaller than the notional figure suggests. This is where the exam sets its trap.",
  },

  // ─── Valuation and Risk Models ───────────────────────────────────────────
  "frm-vrm-001": {
    definition:
      "The loss level whose probability of being exceeded over a given horizon is exactly the level chosen.",
    frmTip:
      "VaR is a QUANTILE THRESHOLD, not a maximum loss. It says nothing at all about the tail beyond that threshold - reading it as a maximum is the misunderstanding that caught many institutions out in 2008.",
    example:
      "A 1-day 95% VaR of USD 3 million means: on roughly 5% of days, the loss will be larger than 3 million.",
  },
  "frm-vrm-002": {
    definition:
      "The expected loss GIVEN that it has already exceeded the VaR threshold - in other words, the average of the tail.",
    frmTip:
      "ES is a coherent measure and VaR is not: VaR can violate subadditivity, meaning two portfolios combined can show a VaR larger than the sum of their separate VaRs. That is why Basel moved to ES.",
  },
  "frm-vrm-003": {
    definition:
      "A measure satisfying four properties: monotonicity, translation invariance, positive homogeneity and subadditivity.",
    frmTip:
      "The property VaR violates is subadditivity - precisely the one stating that diversification must not increase risk.",
  },
  "frm-vrm-004": {
    definition:
      "Duration is the first-order sensitivity of a bond's price to interest rates; convexity is the second-order correction for the curvature.",
    frmTip:
      "Using duration alone always UNDERSTATES the price for large rate moves in either direction, because positive convexity only ever adds to the price.",
  },
  "frm-vrm-005": {
    definition:
      "A model that treats equity as a call option on the firm's assets, struck at the face value of its debt.",
    frmTip:
      "Being a structural model, it infers PD from the share price and its volatility - so PD jumps the moment the equity market moves, even with the financial statements unchanged.",
  },

  // ─── Market Risk ─────────────────────────────────────────────────────────
  "frm-mkt-001": {
    definition:
      "Comparing how often losses actually exceeded VaR against how often theory allows, to check whether the model still holds.",
    frmTip:
      "Basel uses three traffic-light zones over 250 days: green for 0-4 exceptions, yellow for 5-9, red from 10. Entering yellow or red raises the capital multiplier.",
  },
  "frm-mkt-002": {
    definition: "The rule for converting VaR from a short horizon to a longer one.",
    frmTip:
      "It only holds when returns are independent and identically distributed. With autocorrelation or volatility clustering - which is to say, in nearly every real market - the rule UNDERSTATES risk.",
  },
  "frm-mkt-003": {
    definition:
      "VaR recomputed using data from a genuine past crisis period rather than from recent data.",
    frmTip:
      "It exists to counter procyclicality: a calm stretch of market pulls ordinary VaR down, cutting the capital requirement at exactly the point where risk is building up.",
  },

  // ─── Credit Risk ─────────────────────────────────────────────────────────
  "frm-cre-001": {
    definition: "The average loss anticipated on a credit exposure over one year.",
    frmTip:
      "EL is covered by PROVISIONS and priced into the loan. Capital exists to absorb UNexpected loss - confusing the two is the most common conceptual error in the credit section.",
  },
  "frm-cre-002": {
    definition:
      "The percentage of the outstanding exposure actually lost after recovering on the collateral.",
    frmTip:
      "LGD is positively correlated with PD: a crisis both pushes more borrowers into default and drives collateral values down, so the two deteriorate together rather than independently.",
  },
  "frm-cre-003": {
    definition:
      "The amount deducted from the value of a derivative contract to reflect the chance the counterparty fails to perform.",
    frmTip:
      "DVA is the mirror image, computed on YOUR OWN default risk - and it creates the paradox that your credit quality deteriorating makes your reported profit look better.",
  },

  // ─── Credit Risk, tiếp ────────────────────────────────────────────────────
  "frm-cre-004": {
    definition:
      "The situation where exposure to a counterparty rises at exactly the moment that counterparty's credit quality deteriorates.",
    frmTip:
      "Distinguish specific (arising from the structure of the particular trade) from general (arising from broad macro factors). SA-CCR applies a separate penalty factor to the specific kind.",
    example:
      "Buying CDS protection on a country's government bonds from that country's own largest bank.",
  },
  "frm-cre-005": {
    definition:
      "The maximum exposure to a counterparty at a given confidence quantile, at some point in the future.",
    frmTip:
      "It differs from Expected Exposure in that EE is an average while PFE is a tail quantile. Counterparty credit limits are normally set on PFE, not on EE.",
  },

  // ─── Operational Risk ────────────────────────────────────────────────────
  "frm-ope-001": {
    definition:
      "A way of modelling operational risk by combining a FREQUENCY distribution and a SEVERITY distribution separately.",
    frmTip:
      "Frequency is usually Poisson, severity lognormal. Separating the two dimensions is the whole point: one event type can be rare and severe, another frequent and mild.",
  },
  "frm-ope-002": {
    definition:
      "A tracked metric used as an early warning that operational risk is rising.",
    frmTip:
      "A KRI looks FORWARD, a KPI looks BACK. A KRI that only moves after the loss has already happened is a KPI in disguise.",
  },
  "frm-ope-003": {
    definition:
      "The process by which a business unit identifies its own risks and rates how effective its existing controls are.",
    frmTip:
      "Its inherent weakness is self-scoring. It has to be reconciled against actual loss data, or it degenerates into a form-filling exercise.",
  },
  "frm-ope-004": {
    definition:
      "The three elements that generally have to be present together for fraud to occur: pressure, opportunity and rationalisation.",
    frmTip:
      "Internal controls can realistically act on OPPORTUNITY alone. Pressure comes from someone's private life and rationalisation happens in their head - an organisation reaches very little of either.",
  },

  // ─── Liquidity and Treasury Risk ─────────────────────────────────────────
  "frm-liq-001": {
    definition:
      "High-quality liquid assets divided by expected net cash outflows over 30 days of stress, with a 100% minimum.",
    frmTip:
      "LCR is the SHORT-TERM standard, 30 days. NSFR is the one-year structural standard - the exam very often swaps the two horizons around.",
    formulaNumerator: "HQLA",
    formulaDenominator: "Net cash outflows over 30 days",
  },
  "frm-liq-002": {
    definition:
      "Available stable funding divided by required stable funding over a one-year horizon, with a 100% minimum.",
    frmTip:
      "NSFR targets structural maturity mismatch - borrowing short to lend long. LCR targets an acute withdrawal shock. Two different illnesses, two different remedies.",
  },
  "frm-liq-003": {
    definition:
      "VaR plus the cost of unwinding the position, usually estimated as half the bid-ask spread.",
    frmTip:
      "Standard VaR quietly assumes you exit at the mid price and exit immediately. For a large position in a thin market, the liquidation cost alone can exceed the original VaR figure.",
  },

  // ─── Investment Management ───────────────────────────────────────────────
  "frm-inv-001": {
    definition:
      "The standard deviation of the return difference between a portfolio and its benchmark.",
    frmTip:
      "Low tracking error doesn't mean good management - it means hugging the index. Read it alongside the Information Ratio to see whether the deviation from the index earned anything.",
  },
  "frm-inv-002": {
    definition:
      "Allocating a portfolio by each holding's contribution to total risk rather than by its share of capital.",
    frmTip:
      "A 60/40 portfolio by capital is typically about 90/10 by risk, because equities are far more volatile than bonds. That is exactly the argument risk parity is built on.",
  },
  "frm-inv-003": {
    definition:
      "VaR applied to the difference between the assets and the liabilities of a pension fund or insurer.",
    frmTip:
      "Measuring risk on the asset side alone misses half the problem: falling rates inflate the present value of the liabilities, and a fund can move into deficit in a year when its assets rose.",
  },

  // ─── Current Issues ──────────────────────────────────────────────────────
  "frm-cur-001": {
    definition:
      "Physical risk comes from weather and climate events themselves; transition risk comes from the policy, technology and behaviour changes along the path to a low-carbon economy.",
    frmTip:
      "The two trade off against each other: aggressive climate action lowers long-run physical risk but RAISES near-term transition risk for high-emission sectors.",
  },
  "frm-cur-002": {
    definition:
      "Translating cyber attack risk into monetary loss so it can sit in the same framework as other risk types.",
    frmTip:
      "The main obstacle is data: severe incidents are rare and rarely disclosed, so the tail of the distribution is close to unestimable from internal data alone.",
  },

  // ─── Foundations, tiếp ───────────────────────────────────────────────────
  "frm-fou-006": {
    definition:
      "Looking at risk across the whole organisation rather than managing each type separately inside each unit.",
    frmTip:
      "The value of ERM is in seeing the correlations between risk types. Managed in silos, total risk is always understated, because the part where they deteriorate together belongs to no single report.",
  },
  "frm-fou-007": {
    definition:
      "Profit after deducting expected loss, divided by the economic capital of that activity.",
    frmTip:
      "It only means something compared against the cost of capital. Absolute profit always rewards the desk carrying the most risk, which makes it the wrong measure for allocating capital.",
  },
  "frm-fou-008": {
    definition:
      "The capital needed to absorb unexpected loss at a chosen confidence level.",
    frmTip:
      "Don't confuse it with regulatory capital. Economic capital is modelled by the institution to its own appetite; regulatory capital is imposed by the supervisor. The two figures often differ substantially.",
  },
  "frm-fou-009": {
    definition:
      "The business unit owns the risk, the risk function oversees it independently, and internal audit assures both.",
    frmTip:
      "The first line is the business unit, not the risk department. Getting this the wrong way round produces a culture where risk is treated as somebody else's job.",
  },

  // ─── Quantitative Analysis, tiếp ─────────────────────────────────────────
  "frm-qua-005": {
    definition:
      "A series whose mean and variance don't change over time, and whose covariance depends only on the lag.",
    frmTip:
      "Regressing two non-stationary series produces a very high R-squared with no relationship at all - that is spurious regression. Testing for stationarity is the first step, not a final check.",
  },
  "frm-qua-006": {
    definition:
      "Choosing the parameter set that makes the observed data most likely.",
    frmTip:
      "MLE is asymptotically efficient but very sensitive to picking the wrong distributional form. Choose the wrong family and the parameters still converge - onto a wrong answer.",
  },
  "frm-qua-007": {
    definition:
      "The variance of the regression errors is not constant across observations.",
    frmTip:
      "It does NOT bias the coefficients, only the standard errors - so it's the t-tests and p-values that break. This is the point most often understood backwards.",
  },
  "frm-qua-008": {
    definition:
      "Resampling with replacement from the data itself to build the distribution of an estimator.",
    frmTip:
      "Bootstrapping creates no new information. It measures uncertainty only within the data you already have, so on rare tails it stays just as silent as the original method.",
  },
  "frm-qua-009": {
    definition:
      "Extracting a set of orthogonal factors that explain most of the variation across many correlated variables.",
    frmTip:
      "On a yield curve the first three components are typically level, slope and curvature, and they explain nearly all the variation. That is the basis of key rate hedging.",
  },

  // ─── Financial Markets and Products, tiếp ────────────────────────────────
  "frm-fmp-005": {
    definition:
      "A forward is a customised OTC contract; a future is standardised, exchange-listed and settled daily through a clearing house.",
    frmTip:
      "The important difference is that daily settlement on futures creates interim cash flows - so when interest rates correlate with the asset price, futures and forward prices are no longer equal.",
  },

  // ─── Financial Markets and Products, nốt ─────────────────────────────────
  "frm-fmp-006": {
    definition:
      "The relationship that must hold between a call, a put, the underlying asset and a risk-free bond.",
    frmTip:
      "It only holds for European options on a non-dividend-paying asset. Violating it creates an arbitrage, which is why in practice it almost always holds.",
  },
  "frm-fmp-007": {
    definition:
      "The sensitivities of an option's price: delta to the price, gamma to delta, vega to volatility, theta to time.",
    frmTip:
      "A short option position has negative gamma: delta moves against you, so hedging it means buying high and selling low continuously.",
  },
  "frm-fmp-008": {
    definition:
      "The interest rate differential between two currencies must equal the difference between the forward and spot exchange rates.",
    frmTip:
      "Since 2008 a persistently non-zero cross-currency basis has shown this can break when balance sheets are constrained - an arbitrage that exists but that nobody has the balance sheet to take.",
  },
  "frm-fmp-009": {
    definition:
      "A listed fund that trades like a share, with a creation and redemption mechanism that keeps its price close to NAV.",
    frmTip:
      "It is the Authorized Participants' create-redeem mechanism that holds price to NAV. When the underlying assets lose liquidity that mechanism jams and the price-NAV gap widens.",
  },
  "frm-fmp-010": {
    definition:
      "The gain or loss arising when a near-dated futures contract is rolled into a longer-dated one.",
    frmTip:
      "Sustained contango produces a negative roll yield that erodes commodity ETF returns even with the spot price flat. That is why commodity ETFs so often lag the commodity itself.",
  },
  "frm-fmp-011": {
    definition:
      "A security backed by a pool of mortgages, paying investors from the principal and interest the borrowers pay.",
    frmTip:
      "Its distinctive risk is prepayment: when rates fall, borrowers refinance and investors get their capital back at exactly the point where it can only be reinvested at a lower rate.",
  },
  "frm-fmp-012": {
    definition:
      "The price rises more slowly as yields fall, instead of accelerating the way an ordinary bond's does.",
    frmTip:
      "MBS have negative convexity because the prepayment option belongs to the borrower. The consequence: you gain little when rates fall but lose fully when they rise - asymmetric in the unhelpful direction.",
  },
  "frm-fmp-013": {
    definition: "An institution that stands between two trading parties, becoming the counterparty to both.",
    frmTip:
      "A CCP trades a web of bilateral exposures for a hub-and-spoke structure - less contagion, but the risk is concentrated into the CCP itself, which makes its default fund and margin systemically important.",
  },
  "frm-fmp-014": {
    definition:
      "Initial margin is a buffer against future loss; variation margin settles the profit or loss that has already occurred.",
    frmTip:
      "Variation margin moves cash daily with the market price; initial margin sits still until the position is closed. Confusing the two is a common error in the derivatives section.",
  },

  // ─── Valuation and Risk Models, nốt ──────────────────────────────────────
  "frm-vrm-006": {
    definition:
      "Applying historical market moves to today's portfolio and taking a quantile of the resulting P&L series.",
    frmTip:
      "It assumes no distribution, so it preserves genuinely fat tails. In exchange it cannot generate any scenario that never occurred inside the observation window.",
  },
  "frm-vrm-007": {
    definition:
      "Generating many scenarios from a distributional model and repricing the portfolio under each one.",
    frmTip:
      "The most flexible of the three methods and the most expensive. Its exposure is model risk: the result is only ever as good as the distribution assumed.",
  },
  "frm-vrm-008": {
    definition:
      "Assuming normally distributed returns and a linear price relationship, computing VaR from the portfolio's standard deviation.",
    frmTip:
      "For a portfolio holding options the linearity assumption breaks: gamma makes losses grow faster than linearly exactly in the tail you are trying to measure.",
  },
  "frm-vrm-009": {
    definition:
      "The change in portfolio VaR from adding one small unit to a position.",
    frmTip:
      "Use it for small adjustments. For taking on or dropping a whole trade you need incremental VaR, because the relationship is not linear.",
  },
  "frm-vrm-010": {
    definition:
      "A position's contribution to total VaR, constructed so the contributions sum exactly to the whole.",
    frmTip:
      "It is the only measure in this family usable for capital allocation: the parts add up exactly, so no risk is double-counted or left out.",
  },
  "frm-vrm-011": {
    definition:
      "Pricing an option by building a tree of discrete price states and working backwards to the present.",
    frmTip:
      "Its main advantage over Black-Scholes is pricing American options, because at every node you can compare exercising early against holding on.",
  },
  "frm-vrm-012": {
    definition:
      "The assumed probabilities used for pricing, under which every asset earns the risk-free rate.",
    frmTip:
      "These are not the market's real probabilities. They are a computational device, and mistaking them for real-world probabilities is the core misunderstanding in the valuation section.",
  },
  "frm-vrm-013": {
    definition: "The change in a position's value when the yield moves by one basis point.",
    frmTip:
      "Hedging on DV01 only neutralises a parallel shift. If the curve twists or kinks, the residual risk is uncovered - that is the basis risk of the hedge itself.",
  },
  "frm-vrm-014": {
    definition:
      "The risk of loss from a model being wrong, used for the wrong purpose, or fed the wrong data.",
    frmTip:
      "Three different sources need three different remedies: independent validation for a wrong model, use governance for the wrong application, and data quality for the third.",
  },

  // ─── Market Risk, nốt ────────────────────────────────────────────────────
  "frm-mkt-004": {
    definition:
      "The Basel standards that rewrote how capital for the trading book is calculated after the 2008 crisis.",
    frmTip:
      "All four major changes point at something that had broken: the boundary between the two books was being gamed, VaR was blind in the tail, liquidity was assumed uniform, and internal models were approved bank-wide.",
  },
  "frm-mkt-005": {
    definition:
      "The assumed time to exit or hedge a risk factor, assigned by factor category.",
    frmTip:
      "The old framework used 10 days for everything. FRTB spans 10 to 120 days, because the lesson of 2008 was that liquidity does not evaporate at the same rate across markets.",
  },
  "frm-mkt-006": {
    definition:
      "Comparing how closely the P&L predicted by the risk model matches a desk's actual P&L.",
    frmTip:
      "It runs at DESK level, not bank level. A desk that fails moves to the standardised approach with higher capital - the consequence is economic, not a prohibition.",
  },
  "frm-mkt-007": {
    definition:
      "The price sensitivity to a rate change at one specific maturity point, holding the other points fixed.",
    frmTip:
      "The key rate durations sum to approximately the effective duration, because adding them up is exactly what simulates a parallel shift. That also serves as a quick check that the set of numbers is right.",
  },

  // ─── Market Risk, hết ────────────────────────────────────────────────────
  "frm-mkt-008": {
    definition:
      "Reducing thousands of positions to a smaller set of factors so the covariance matrix can actually be estimated.",
    frmTip:
      "The coarser the mapping, the more VaR is understated, because collapsing many positions onto one factor implicitly assumes they are perfectly correlated and offset each other completely.",
  },
  "frm-mkt-009": {
    definition:
      "Classifying 250-day VaR backtesting results into green, yellow and red zones by the number of exceptions.",
    frmTip:
      "Entering yellow or red raises the capital multiplier. This is the mechanism that makes a bank keep its own model honest: understating VaR costs more than it saves.",
  },

  // ─── Credit Risk, hết ────────────────────────────────────────────────────
  "frm-cre-006": {
    definition:
      "A clause collapsing every contract with a counterparty into a single net obligation when they default.",
    frmTip:
      "Without it the bankrupt party cherry-picks: demanding full payment on contracts where you owe, while what they owe you joins the general queue. Legal enforceability in each jurisdiction is the first question.",
  },
  "frm-cre-007": {
    definition:
      "The portion of collateral value not counted toward the loan, buffering against a fall in price.",
    frmTip:
      "Haircuts rise for everyone at once when markets tighten, forcing every holder to sell the same asset on the same day - and that selling pushes haircuts higher still.",
  },
  "frm-cre-008": {
    definition:
      "The deviation of credit losses around their expected level - the part capital has to carry.",
    frmTip:
      "EL goes into provisions and into the loan price; only UL requires capital. Confusing the two is the most common conceptual error in the credit section.",
  },
  "frm-cre-009": {
    definition: "The risk arising when many loans are exposed to one common factor.",
    frmTip:
      "Expected loss adds linearly, so it is completely BLIND to concentration. The entire effect lives in the tail - that is, in capital rather than in provisions.",
  },

  // ─── Operational Risk, hết ───────────────────────────────────────────────
  "frm-ope-005": {
    definition:
      "The standard classification of operational risk events, from internal fraud through to execution and process failures.",
    frmTip:
      "Classification is by ROOT CAUSE, not by the channel the loss travelled through. A loss that surfaces in market prices is still operational risk if the root cause was a failed internal control.",
  },
  "frm-ope-006": {
    definition:
      "The Basel method for operational risk capital, based on a business indicator and internal loss history.",
    frmTip:
      "SMA replaced the old internal model approaches. The trade-off: less sensitivity to each bank's own risk profile, in exchange for comparability across banks.",
  },
  "frm-ope-007": {
    definition:
      "The maximum tolerable disruption to a critical service before the harm becomes unacceptable.",
    frmTip:
      "It has to be set from the harm to customers, not from current recovery capability. Set from capability, the test always passes itself and the whole exercise becomes paperwork.",
  },
  "frm-ope-008": {
    definition: "The risk of depending on external suppliers for critical operations.",
    frmTip:
      "Outsourcing transfers the work but not the accountability. Concentration risk is heavier still: many institutions depend on the same cloud provider.",
  },
  "frm-ope-009": {
    definition:
      "Separating the initiating, approving and reconciling steps across different people.",
    frmTip:
      "It raises the bar for fraud from one person deciding to requiring collusion. Internal controls can realistically act only on the OPPORTUNITY side of the fraud triangle.",
  },

  // ─── Liquidity and Treasury Risk, hết ────────────────────────────────────
  "frm-liq-004": {
    definition:
      "Funding liquidity is the ability to raise cash; market liquidity is the ability to sell an asset without moving its price.",
    frmTip:
      "The two feed each other into a spiral: short of cash you must sell, everyone selling pushes prices down, falling prices devalue the collateral and raising cash gets harder still.",
  },
  "frm-liq-005": {
    definition:
      "The internal pricing mechanism for funds between the units that raise deposits and the units that lend inside a bank.",
    frmTip:
      "Set wrongly, FTP makes liquidity cost invisible to the business - and at that point they will fund long lending with short money without ever seeing what they are doing.",
  },
  "frm-liq-006": {
    definition:
      "A schedule of cash inflows and outflows by maturity bucket, exposing the liquidity gaps.",
    frmTip:
      "A gap in one bucket can be masked by a surplus in another if you only look at the total. The ladder exists precisely to stop that netting from happening.",
  },
  "frm-liq-007": {
    definition:
      "The risk of failing to settle at the right moment during the day even though liquidity is sufficient by the close.",
    frmTip:
      "LCR measures over 30 days and NSFR over a year - both are blind to a mismatch lasting hours. The payment one bank hasn't made is the payment another is waiting on to make its own.",
  },

  // ─── Investment Management, hết ──────────────────────────────────────────
  "frm-inv-004": {
    definition:
      "The return above what the portfolio's systematic risk should have delivered on its own.",
    frmTip:
      "A high beta produces excess return in a rising market with no skill involved at all. You have to subtract the reward for risk before you can speak about skill.",
  },
  "frm-inv-005": {
    definition:
      "Splitting the difference against the benchmark into allocation effect, selection effect and the interaction term.",
    frmTip:
      "The headline number can hide two opposite stories. A fund that claims to be a stock picker while all its excess return came from sector allocation isn't selling what actually produced the return.",
  },
  "frm-inv-006": {
    definition:
      "The bias arising when the data only contains funds still operating and still reporting.",
    frmTip:
      "It travels with two other biases in hedge fund data: backfilling a flattering history on joining, and self-selecting when to start reporting. All three push the average return upward.",
  },
  "frm-inv-007": {
    definition:
      "Reported returns appearing less volatile than reality because the assets are valued by model.",
    frmTip:
      "The cheapest way to spot it is unusually positive autocorrelation in the return series. Genuine market prices show almost no meaningful autocorrelation.",
  },

  // ─── Current Issues, hết ─────────────────────────────────────────────────
  "frm-cur-003": {
    definition: "The risks that arise when machine learning models are used for financial decisions.",
    frmTip:
      "Three failure modes differ from traditional models: overfitting, temporal data leakage, and an accurate model that cannot be explained - which is unusable for credit decisions.",
  },
  "frm-cur-004": {
    definition:
      "Assets built on distributed ledgers, among them stablecoins that peg their value to a reference asset.",
    frmTip:
      "A stablecoin's main risk isn't the technology but the quality of its reserves and its redeemability - which is to say, the classic bank run problem in a new wrapper.",
  },
  "frm-cur-005": {
    definition: "Digital fiat money issued directly by a central bank.",
    frmTip:
      "The largest systemic risk is disintermediation: in a crisis, depositors can move straight into CBDC, making a run on commercial banks faster than ever before.",
  },
};
