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
};
