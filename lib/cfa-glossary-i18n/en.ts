import type { GlossaryTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 118 thuật ngữ CFA, khoá theo `id`.
 *
 * Hai điều đáng biết trước khi thêm mục:
 *
 * 1. `termEn` KHÔNG nằm ở đây. Nó đã là tiếng Anh trong tệp gốc và có đủ ở cả
 *    118 mục, nên phần tiêu đề thẻ vốn đã đúng ngôn ngữ.
 *
 * 2. Tử và mẫu công thức bên tiếng Việt thường đã KÈM SẴN tiếng Anh trong
 *    ngoặc - "Lợi nhuận ròng (Net Income)". Bản tiếng Anh chỉ là phần trong
 *    ngoặc đó, bỏ ngoặc đi. Đừng dịch lại từ đầu rồi ra một cách gọi khác với
 *    chính chữ người học vừa thấy ở bản tiếng Việt.
 */
export const glossaryEn: Record<string, GlossaryTranslation> = {
  // Mục duy nhất từng có `definitionEn` trong tệp gốc. Chuyển nguyên văn sang
  // đây khi gỡ trường chết đó, nên không mất chữ nào.
  "fsa-001": {
    definition:
      "Measures a corporation's profitability by revealing how much profit a company generates with the money shareholders have invested.",
    cfaTip: "Three-step DuPont: ROE = Net Profit Margin × Asset Turnover × Financial Leverage.",
    example: "If Net Income = 150bn and Average Equity = 1,000bn, ROE = 15%.",
    formulaNumerator: "Net Income",
    formulaDenominator: "Average Equity",
  },

  "fsa-002": {
    definition:
      "The cash available to all capital providers - both creditors and shareholders - after operating costs and investment in fixed assets.",
    cfaTip:
      "NI: Net Income, NCC: Non-Cash Charges (depreciation), Int: Interest Expense, FCInv: Capital Expenditures, WCInv: Change in Working Capital.",
  },

  "fsa-003": {
    definition:
      "The model that breaks ROE into five components: tax burden, interest burden, operating margin, asset turnover and the equity multiplier.",
  },

  "fsa-004": {
    definition: "The percentage of revenue left after deducting the cost of goods sold (COGS).",
    formulaNumerator: "Net Revenue - Cost of Goods Sold (COGS)",
    formulaDenominator: "Net Revenue",
  },

  "fsa-005": {
    definition: "How often inventory is sold and replaced over a period.",
    formulaNumerator: "Cost of Goods Sold (COGS)",
    formulaDenominator: "Average Inventory",
  },

  "fsa-006": {
    definition: "The average number of days it takes the business to collect its receivables.",
    formulaNumerator: "365",
    formulaDenominator: "Receivables Turnover",
  },

  "fsa-007": {
    definition:
      "Measures whether the business can cover its short-term liabilities with its short-term assets.",
    formulaNumerator: "Current Assets",
    formulaDenominator: "Current Liabilities",
  },

  "fsa-008": {
    definition:
      "Tests immediate liquidity using only the most liquid assets, excluding inventory.",
    formulaNumerator: "Cash + Cash Equivalents + Short-term Securities + Receivables",
    formulaDenominator: "Current Liabilities",
  },

  "eth-001": {
    definition:
      "The six core ethical principles every CFA member and candidate must follow in all investment activity.",
  },

  "eth-002": {
    definition:
      "Members must understand and comply with all applicable law. Where local law and the CFA Code conflict, the stricter one applies.",
  },

  "eth-003": {
    definition:
      "Bars trading on, or acting upon, material information that has not been made public (insider trading). The Mosaic Theory is permitted.",
    cfaTip:
      "Mosaic Theory: combining non-material public and non-public information into an analysis is LEGITIMATE.",
  },

  "eth-004": {
    definition:
      "Members have a fiduciary duty to put the client's interest ahead of their own and ahead of their employer's.",
  },

  "eq-001": {
    definition: "The ratio of the market price of a share to earnings per share (EPS).",
    formulaNumerator: "Market Price Per Share",
    formulaDenominator: "Earnings Per Share (EPS)",
  },

  "eq-002": {
    definition:
      "Values a share as the present value of all future dividends, growing at a constant rate g.",
    cfaTip: "r: required rate of return, g: long-run dividend growth rate (g < r).",
    formulaNumerator: "D1 = D0 × (1 + g)",
    formulaDenominator: "r - g",
  },

  "eq-003": {
    definition:
      "The total economic value of the business - what it would actually cost to buy the whole company.",
  },

  "fi-001": {
    definition:
      "The weighted average time an investor waits to receive the bond's full cash flows.",
  },

  "fi-002": {
    definition:
      "Measures the percentage change in a bond's price for a 1% change in yield to maturity.",
    formulaNumerator: "Macaulay Duration",
    formulaDenominator: "1 + Yield per Period",
  },

  "fi-003": {
    definition:
      "The internal rate of return an investor earns by holding the bond to maturity and reinvesting every coupon at the same rate.",
  },

  "corp-001": {
    definition:
      "The average cost of capital the business pays across all its funding sources (debt, preferred shares, common equity).",
  },

  "corp-002": {
    definition:
      "The present value of all future cash inflows, less the initial investment.",
    cfaTip: "Decision rule: accept the project when NPV > 0.",
  },

  "corp-003": {
    definition: "The discount rate at which a project's NPV is exactly zero.",
  },

  "quant-001": {
    definition:
      "The principle that a unit of money today is worth more than the same unit in the future, because it can be put to work.",
  },

  "quant-002": {
    definition:
      "Measures the excess return earned per unit of total risk (standard deviation).",
    formulaNumerator: "Portfolio Return (Rp) - Risk-Free Rate (Rf)",
    formulaDenominator: "Portfolio Standard Deviation (σp)",
  },

  "econ-001": {
    definition:
      "The total market value of all finished goods and services produced within a country's borders over a period.",
  },

  "econ-002": {
    definition:
      "The exchange rate theory that rates adjust until a basket of goods costs the same in both countries.",
  },

  "der-001": {
    definition:
      "A private agreement between two parties to buy or sell an underlying asset at a future date, at a price fixed today.",
  },

  "der-002": {
    definition:
      "An American option can be exercised at any time up to and including expiry; a European option only on the expiry date itself.",
  },

  "alt-001": {
    definition: "Investing capital directly into private companies that are not listed on an exchange.",
  },

  "port-001": {
    definition:
      "The model that sets an asset's required return from its systematic risk (beta) relative to the whole market.",
  },

  "alt-002": {
    definition:
      "The capital an investor commits to a fund, which the GP draws down over several years rather than taking at once.",
    cfaTip:
      "The uncalled portion is still an obligation - and it tends to get called hardest exactly when markets are falling.",
    example: "A 100bn commitment where only 20bn is called in the first year.",
  },

  "alt-003": {
    definition:
      "The GP's notice requiring an LP to transfer part of the committed capital, usually on very short notice.",
    cfaTip:
      "The LP does not control the timing, so liquidity has to be held against the uncalled commitment.",
  },

  "alt-004": {
    definition:
      "The characteristic PE return shape: negative in the early years because fees and costs come before returns, then turning positive as exits arrive.",
    cfaTip:
      "A PE fund's IRR in year three is almost always poor, and that says nothing about how it finishes.",
  },

  "alt-005": {
    definition:
      "The GP's share of profit once LPs have received their capital back plus the preferred return - typically 20%.",
    cfaTip: "Carry only starts above the hurdle - this is where it gets confused with the management fee.",
  },

  "alt-006": {
    definition: "The return LPs must receive before the GP starts earning carry.",
    example: "With an 8% hurdle, a fund returning 6% pays the GP no carry.",
  },

  "alt-007": {
    definition:
      "The year a fund starts deploying capital, used to compare funds that faced the same market conditions.",
    cfaTip:
      "Comparing two funds from different vintages compares two economic cycles, not two levels of skill.",
  },

  "alt-008": {
    definition: "The period during which an investor cannot withdraw capital from the fund.",
    cfaTip:
      "This is what creates the illiquidity premium - and it is also the real risk when you need the money.",
  },

  "alt-009": {
    definition:
      "The shape of the commodity futures curve: contango is futures above spot, backwardation is the reverse.",
    cfaTip:
      "Commodity funds have to roll contracts continually, so sustained contango erodes returns even when spot never moves.",
  },

  "port-002": {
    definition: "The set of portfolios giving the highest return available at each level of risk.",
    cfaTip: "Any portfolio below this line can be improved without taking on any more risk.",
  },

  "port-003": {
    definition: "Whole-market risk, which diversification cannot remove.",
    cfaTip: "Only systematic risk is compensated by the market - that is the entire argument of CAPM.",
  },

  "port-004": {
    definition: "Risk specific to one company or industry, which diversification removes.",
    cfaTip: "Carrying this risk means bearing it unpaid - you could have removed it for free.",
  },

  "port-005": {
    definition:
      "The line joining the risk-free asset to a risky portfolio, showing every possible combination of the two.",
    cfaTip: "When the risky portfolio is the market portfolio, this line becomes the Capital Market Line.",
  },

  "port-006": {
    definition: "Returning portfolio weights to their targets after market prices have moved them.",
    cfaTip: "It forces you to sell what has risen and buy what has fallen - exactly what instinct resists.",
  },

  "port-007": {
    definition:
      "Strategic allocation is the long-run target weighting; tactical is a temporary deviation from it based on a market view.",
    cfaTip:
      "Most of the variation in long-run returns comes from the strategic allocation, not from timing.",
  },

  "port-008": {
    definition:
      "The document setting out a portfolio's objectives, constraints, risk appetite and benchmark.",
    cfaTip: "The IPS is what you write while calm so you can follow it while panicking.",
  },

  "quant-003": {
    definition:
      "Measures the strategy's performance by chaining period returns, independent of when money was paid in or taken out.",
    cfaTip: "Funds publish TWR because they do not control when investors add or withdraw.",
  },

  "quant-004": {
    definition:
      "The IRR of the whole cash flow stream - what the investor actually experienced.",
    cfaTip:
      "Putting a lot of money in just before a fall drags MWRR well below the TWR the fund publishes.",
  },

  "quant-005": {
    definition:
      "Type I is rejecting H0 when it is true; Type II is failing to reject H0 when it is false.",
    cfaTip:
      "Cutting Type I by lowering the significance level raises Type II - the two errors trade against each other.",
  },

  "quant-006": {
    definition:
      "The distribution of the sample mean tends to normal as the sample grows, whatever the underlying distribution.",
    cfaTip: "This is why most statistical tests still work on financial data that is not normal.",
  },

  "quant-007": {
    definition:
      "Skewness measures asymmetry in the distribution; kurtosis measures how heavy the tails are.",
    cfaTip:
      "Financial returns are left-skewed with fat tails, so standard deviation always understates the real risk.",
  },

  "quant-008": {
    definition: "Error arising when the sample does not represent the population you want to reason about.",
    cfaTip: "Survivorship bias is the form you meet most often in performance data.",
    example: "A hedge fund index containing only funds still alive and voluntarily reporting.",
  },

  "econ-003": {
    definition:
      "The swing of output around its long-run trend, through expansion, peak, contraction and trough.",
    cfaTip:
      "Each phase favours a different group of sectors - that is the basis of cyclical allocation.",
  },

  "econ-004": {
    definition: "An indicator that turns before the economy does, such as PMI or new orders.",
    cfaTip:
      "The opposite of a lagging indicator like unemployment, which only confirms what has already happened.",
  },

  "econ-005": {
    definition: "Heavy government borrowing pushes rates up and reduces private investment.",
    cfaTip:
      "This is the central argument against fiscal expansion when the economy is already near full employment.",
  },

  "econ-006": {
    definition: "High inflation alongside stagnant growth, usually from a supply shock.",
    cfaTip: "The hardest situation for a central bank, because the two objectives pull in opposite directions.",
  },

  "econ-007": {
    definition: "The record of all economic transactions between a country and the rest of the world.",
    cfaTip:
      "A current account surplus always comes with a capital account deficit - the two offset by definition.",
  },

  "econ-008": {
    definition: "Being able to produce a good at a lower opportunity cost than another country.",
    cfaTip:
      "Different from absolute advantage: a country worse at everything still has a comparative advantage somewhere.",
  },

  "der-003": {
    definition:
      "The relationship between the underlying price and the strike: in-the-money, at-the-money or out-of-the-money.",
    cfaTip: "An ATM option carries the most time value, because that is where the uncertainty is greatest.",
  },

  "der-004": {
    definition: "How much the option price moves when the underlying moves by one unit.",
    cfaTip:
      "Call delta runs between 0 and 1, put delta between -1 and 0 - and it also approximates the probability of finishing in the money.",
  },

  "der-005": {
    definition: "How much delta itself moves when the underlying moves - the curvature of the relationship.",
    cfaTip: "Gamma peaks near the strike and near expiry, exactly when hedging is hardest.",
  },

  "der-006": {
    definition: "How sensitive the option price is to a change in implied volatility.",
    cfaTip: "Buying an option is buying volatility - so the price can rise while the underlying stands still.",
  },

  "der-007": {
    definition:
      "The volatility the market is pricing into an option, backed out from the market price.",
    cfaTip: "The only Black-Scholes input that cannot be observed directly.",
  },

  "der-008": {
    definition: "The risk that the hedging instrument does not move in step with the asset being hedged.",
    cfaTip: "Imperfect hedges are the norm, and basis risk is what is left over after hedging.",
    example: "Hedging Brent crude with a WTI contract.",
  },

  "corp-004": {
    definition:
      "The debt-to-equity mix that minimises WACC, balancing the tax shield against the cost of financial distress.",
    cfaTip: "The tax shield is only worth anything while the business still has profit to deduct against.",
  },

  "corp-005": {
    definition: "The cost that arises when managers pursue their own interest instead of shareholders'.",
    cfaTip: "Debt reduces it, by forcing the business to hand over cash on a schedule.",
  },

  "corp-006": {
    definition:
      "Running inventory, receivables and payables so as little cash as possible is locked up in operations.",
    cfaTip:
      "Negative working capital is a strength for retail and subscription models, not a warning sign.",
  },

  "corp-007": {
    definition: "The revenue level at which operating profit is exactly zero.",
    formulaNumerator: "Fixed Costs",
    formulaDenominator: "Contribution Margin per Unit",
  },

  "eq-004": {
    definition:
      "A durable competitive advantage that lets a business keep ROIC above its cost of capital for years.",
    cfaTip: "Without a moat, competition drags ROIC down to WACC and growth stops creating value.",
  },

  "eq-005": {
    definition:
      "Cyclicals swing hard with the economy; defensives have steady demand whatever the cycle does.",
    cfaTip:
      "A cyclical's lowest P/E usually appears just before earnings turn down.",
  },

  "eq-006": {
    definition: "The share of stock actually available to trade, excluding permanently held blocks.",
    cfaTip: "A low free float makes the price easy to push and makes the index less representative.",
  },

  "fi-004": {
    definition: "The relationship between yield and maturity for bonds of the same credit quality.",
    cfaTip: "An inversion is usually read as the market expecting the economy to slow.",
  },

  "fi-005": {
    definition: "The risk of having to reinvest coupons or principal at a lower rate.",
    cfaTip:
      "It works against price risk - which is why a zero-coupon bond has no reinvestment risk at all.",
  },

  "fi-006": {
    definition:
      "A callable bond gives the issuer the right to redeem early; a putable bond gives the holder the right to sell back.",
    cfaTip:
      "Whoever holds the option gains from it - so a callable bond has to pay a higher yield in compensation.",
  },

  "eth-006": {
    definition:
      "Reaching a material conclusion by assembling many pieces of non-material information is legitimate.",
    cfaTip: "One piece of material inside information anywhere in the chain destroys the whole defence.",
  },

  "eth-007": {
    definition:
      "Information a reasonable investor would use in a decision, which has not yet been widely released.",
    cfaTip:
      "Materiality is measured by the effect on a decision, not by the seniority of whoever holds it.",
  },

  "eth-008": {
    definition:
      "The legal obligation to put the interest of the person you serve ahead of your own.",
    cfaTip:
      "A higher bar than suitability: not merely a reasonable product, but the best available choice.",
  },

  "eth-009": {
    definition:
      "Information that would move a security's price if released, and has not been widely disseminated. You may neither trade on it nor pass it on.",
    cfaTip:
      "Standard II(A). The materiality test is whether a reasonable investor would want it before deciding. Receiving MNPI by accident binds you exactly as much as seeking it out.",
  },

  "eth-010": {
    definition:
      "A material conclusion assembled from public information and non-material non-public pieces. That conclusion may be traded on.",
    cfaTip:
      "This is the legal boundary of analysis. Keep the source record for every piece - when questioned, that is the only thing separating mosaic work from insider dealing.",
  },

  "eth-011": {
    definition:
      "Recommendations and investment actions must be disclosed to all clients fairly with respect to timing.",
    cfaTip:
      "Standard III(B). Fair does NOT mean equal - different clients can receive different allocations according to their objectives, as long as nobody is systematically late to the information.",
  },

  "eth-012": {
    definition:
      "Commission generated by client trading belongs to the client, and may only buy research that serves that same client.",
    cfaTip:
      "Standard III(A). Using client commission to buy your firm's accounting software is a violation - that is an operating cost, not investment research.",
  },

  "eth-013": {
    definition:
      "The set of all portfolios run to the same investment strategy, used to present performance under GIPS.",
    cfaTip:
      "Every actual fee-paying portfolio MUST sit in at least one composite. That rule is precisely what stops a firm showing only its winners.",
  },

  "quant-009": {
    definition: "Type I is rejecting H₀ when it is true; Type II is failing to reject H₀ when it is false.",
    cfaTip:
      "The significance level α is the probability of a Type I error. Lowering α cuts Type I but raises Type II - there is no way to reduce both except by increasing the sample size.",
  },

  "quant-010": {
    definition: "The smallest significance level at which H₀ would still be rejected.",
    cfaTip:
      "p is NOT the probability that H₀ is true - that is the most common misreading. It is the probability of seeing data like this IF H₀ were true.",
    example: "p = 0.03 rejects H₀ at the 5% level but not at the 1% level.",
  },

  "quant-011": {
    definition:
      "The distribution of the sample mean tends to normal as the sample grows, whatever shape the underlying distribution has.",
    cfaTip:
      "n ≥ 30 is the conventional threshold. This is why a normal distribution works for mean returns while daily returns are skewed with fat tails.",
  },

  "quant-012": {
    definition:
      "Bias from data containing only what survived to the end of the period - funds and companies that closed are missing from the sample.",
    cfaTip:
      "It always makes an industry's average performance look BETTER than it was. Same family as look-ahead bias and time-period bias - the three sampling errors the exam asks about together.",
  },

  "quant-013": {
    definition:
      "The distribution of a variable whose logarithm is normally distributed; always positive and right-skewed.",
    cfaTip:
      "Use it for asset PRICES, and the normal distribution for continuous RETURNS. Prices cannot go negative, so modelling them as normal is wrong from the start.",
  },

  "econ-009": {
    definition:
      "Producing a good at a lower opportunity cost than your partner, even while being less efficient at everything.",
    cfaTip:
      "Different from ABSOLUTE advantage. Trade still benefits both sides where comparative advantage exists, even if one side is better at everything - that is where the exam sets the trap.",
  },

  "econ-010": {
    definition: "Heavy government borrowing pushes rates up and reduces private sector investment.",
    cfaTip:
      "The main argument against fiscal stimulus. How much crowding out happens depends on where the economy sits relative to potential output - it is strongest near full employment.",
  },

  "econ-011": {
    definition:
      "Prices and wages do not adjust immediately to supply and demand, so a demand shock hits output before it hits prices.",
    cfaTip:
      "The foundation of Keynesian economics, and the reason monetary policy works in the short run. In the long run prices become flexible again and only inflation moves.",
  },

  "econ-012": {
    definition:
      "In the pair A/B, B is the base currency and A is the price currency: the rate says how much A buys one B.",
    cfaTip:
      "Reading the pair backwards loses more marks than anything else in Economics. Write down which one is the base before doing any calculation.",
    example: "USD/VND = 25,400 means 1 USD buys 25,400 VND; USD is the base, VND the price currency.",
  },

  "econ-013": {
    definition:
      "The gap between the forward rate and the spot rate; positive when the base currency is more expensive forward.",
    cfaTip:
      "The HIGHER interest rate currency always trades at a forward discount - otherwise a riskless arbitrage would exist.",
  },

  "fsa-009": {
    definition:
      "A tax obligation arising when accounting profit exceeds taxable profit through a temporary difference, typically accelerated depreciation in the tax books.",
    cfaTip:
      "Only TEMPORARY differences create deferred tax; permanent ones (a non-deductible fine, say) do not - they only change the effective tax rate.",
  },

  "fsa-010": {
    definition:
      "How a lease is classified, which decides where the cost lands on the income statement and the cash flow statement.",
    cfaTip:
      "Under IFRS 16 the lessee treats every lease as a finance lease; US GAAP still keeps both types. So comparing an IFRS company's EBITDA with a US GAAP company's is not comparing the same measure.",
  },

  "fsa-011": {
    definition:
      "Capitalising puts the spend on the balance sheet and depreciates it; expensing takes it through profit in full this period.",
    cfaTip:
      "Capitalising makes first-year profit and assets HIGHER, and operating cash flow higher too (the outflow moves to investing). Total cash flow is unchanged - only where it sits.",
  },

  "fsa-012": {
    definition:
      "Presenting every line as a percentage of one common base - revenue for the income statement, total assets for the balance sheet.",
    cfaTip:
      "The only way to compare a trillion-dong company directly with a hundred-billion one. Also the fastest way to spot a cost structure drifting across years.",
  },

  "fsa-013": {
    definition:
      "The part of profit not backed by cash. The larger the accruals, the more the profit rests on accounting estimates.",
    cfaTip:
      "High and persistent accruals are the strongest early warning in financial statement analysis - stronger than any single ratio.",
  },

  "corp-008": {
    definition:
      "The conflict of interest between management and shareholders, or between shareholders and creditors.",
    cfaTip:
      "The root of almost every corporate governance question at Level I. Paying management in shares reduces the conflict with shareholders but INCREASES the one with creditors.",
  },

  "corp-009": {
    definition:
      "The cost of the next unit of capital raised, which rises as the business exhausts its cheaper sources.",
    cfaTip:
      "Project appraisal must use the MARGINAL cost of capital, not the historical WACC - capital already raised is sunk and says nothing about a new project.",
  },

  "corp-010": {
    definition: "Money already spent and unrecoverable, independent of the decision ahead.",
    cfaTip:
      "Do NOT put it in the project cash flows. Opportunity cost and knock-on effects on other products, by contrast, MUST go in - the exam asks about the pair together.",
  },

  "corp-011": {
    definition:
      "Businesses prefer retained earnings first, then debt, and issue equity only as a last resort.",
    cfaTip:
      "It comes from information asymmetry: the market reads an equity issue as management signalling that the shares look expensive.",
  },

  "eq-007": {
    definition:
      "The share of stock actually tradable, after removing restricted holdings and strategic stakes.",
    cfaTip:
      "Most modern indices weight by FREE-FLOAT ADJUSTED market cap, not full market cap - which is why a large state-owned company can carry a small index weight.",
  },

  "eq-008": {
    definition:
      "An index that averages the prices of its constituents and divides by an adjusting divisor.",
    cfaTip:
      "High-priced shares dominate the index regardless of company size. A stock split changes the weighting while the business is unchanged - the core flaw of this index type.",
  },

  "eq-009": {
    definition:
      "A cyclical's earnings are sensitive to the economic cycle; a defensive's are much less so.",
    cfaTip:
      "Cyclicals usually show their HIGHEST P/E at the bottom of the cycle - earnings collapse faster than the price. Reading their P/E without the cycle is reading it backwards.",
  },

  "eq-010": {
    definition:
      "Weak form reflects past price data; semi-strong adds all public information; strong form includes inside information as well.",
    cfaTip:
      "If weak form holds, technical analysis is useless; if semi-strong holds, fundamental analysis is too. The empirical evidence leans toward semi-strong.",
  },

  "fi-007": {
    definition: "A plot of yield against maturity for bonds of the same credit quality.",
    cfaTip:
      "An inverted curve - short rates above long - is the most historically accurate recession signal among financial market indicators.",
  },

  "fi-008": {
    definition:
      "A bond with an embedded option: the issuer can redeem early (callable), or the investor can sell back early (putable).",
    cfaTip:
      "Callable price = straight bond price − option value (the option belongs to the issuer). For a putable it is ADDED. A callable shows NEGATIVE convexity at low yields.",
  },

  "fi-009": {
    definition:
      "The Z-spread is the constant amount added across the whole spot curve to match the price; the OAS is the Z-spread with the embedded option value stripped out.",
    cfaTip:
      "For an option-free bond, Z-spread equals OAS. Comparing a callable bond with a straight bond requires the OAS, not the Z-spread.",
  },

  "fi-010": {
    definition:
      "Pooling a set of loans into a separate legal entity and issuing securities backed by the pool's cash flows.",
    cfaTip:
      "The separate entity (SPE) is the whole point: it isolates the pool's risk from the originator's bankruptcy risk, which is how the issued securities can be rated above the originator itself.",
  },

  "der-009": {
    definition:
      "The relationship between the underlying price and the strike: in-the-money, at-the-money or out-of-the-money.",
    cfaTip:
      "For a call, ITM means S > X; for a put it is the reverse, ITM means S < X. Flipping these two is the most common mark-loser in derivatives.",
  },

  "der-010": {
    definition: "Contango is futures above spot; backwardation is the reverse.",
    cfaTip:
      "A long-only investor LOSES on the roll in contango and GAINS in backwardation. This is why commodity funds so often trail the rise in the spot price.",
  },

  "der-011": {
    definition:
      "The institution that stands between the two sides of a derivatives trade, becoming buyer to every seller and seller to every buyer.",
    cfaTip:
      "The biggest difference between a future and a forward: futures clear through a CCP so counterparty risk is close to nil, forwards do not.",
  },

  "alt-010": {
    definition:
      "The typical private equity return shape: negative in the early years from fees and investment, positive later as exits come through.",
    cfaTip:
      "Judging a PE fund after three years almost always looks bad, and it means nothing. The full cycle takes 8-12 years.",
  },

  "alt-011": {
    definition:
      "The period during which an investor cannot withdraw from the fund, and the notice required to withdraw afterwards.",
    cfaTip:
      "This is LIQUIDITY risk, not market risk, and it bites at the worst possible moment: when everyone wants out at once, the fund is entitled to block them.",
  },

  "alt-012": {
    definition:
      "Reported returns on appraisal-valued assets (real estate, PE) show artificially low volatility because the valuations do not update continuously with the market.",
    cfaTip:
      "It makes reported standard deviation LOWER and the Sharpe ratio HIGHER than reality, and it also understates correlation with equities - so it overstates the diversification benefit twice over.",
  },

  "port-009": {
    definition:
      "The document recording the investor's objectives, risk appetite and constraints, which every allocation decision is judged against.",
    cfaTip:
      "Remember the constraints as TTLLU: Time horizon, Taxes, Liquidity, Legal, Unique circumstances. The exam gives a scenario and asks which constraint was breached.",
  },

  "port-010": {
    definition:
      "Strategic is the long-run weighting set by the IPS; tactical is a temporary deviation from it to exploit short-term valuation.",
    cfaTip:
      "Research shows the strategic allocation explains most of the variation in a portfolio's returns - far more than stock selection does.",
  },

  "port-011": {
    definition: "The set of portfolios offering the highest expected return at each level of risk.",
    cfaTip:
      "Only the UPPER part of the minimum-variance frontier is efficient; the lower part is entirely dominated. Add a risk-free asset and the frontier becomes a straight line - the CML.",
  },

  "port-012": {
    definition: "Returning portfolio weights to target after price moves have let them drift.",
    cfaTip:
      "In substance it means selling what just rose to buy what just fell - the opposite of instinct, which is why most individual investors never do it.",
  },

  "port-013": {
    definition:
      "Systematic risk affects the whole market and cannot be diversified away; unsystematic risk is company-specific and diversification cancels it.",
    cfaTip:
      "The market pays only for SYSTEMATIC risk. Carrying one company's specific risk earns no higher expected return - that is the entire argument of CAPM.",
  },
};
