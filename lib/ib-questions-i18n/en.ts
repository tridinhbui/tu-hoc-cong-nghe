// Bản dịch tiếng Anh ngân hàng câu hỏi kỹ thuật. Xem ./index.ts cho quy tắc -
// `options` là POSITIONAL, và không có `correct` trong file này.
import type { IbQuestionTranslations } from "./index";

export const IB_QUESTIONS_EN: IbQuestionTranslations = {
  5001: {
    category: "Fund management - Fees & performance",
    question: "What does a fund's '2 and 20' fee structure mean?",
    options: [
      "2% of NAV a year, and 20% of the profit above a hurdle",
      "Both are charged on profit above the benchmark",
      "2% of the initial capital, 20% of closing NAV",
      "2% of profit, 20% of the capital raised",
    ],
    explanation:
      "The management fee (2%) is charged on net assets whether the fund gains or loses; the performance fee (20%) applies only to profit above the agreed hurdle. The two create very different incentives: the management fee rewards gathering assets, the performance fee rewards results.",
  },
  5002: {
    category: "Fund management - Fees & performance",
    question: "What does a high-water mark clause in a performance fee do?",
    options: [
      "Stops a performance fee being charged twice on the same gain",
      "Sets a floor NAV the fund must refund below",
      "Sets the minimum return the fund promises investors",
      "Caps the performance fee rate the fund may charge",
    ],
    explanation:
      "If NAV falls and then recovers, the high-water mark forces the fund past its old peak before performance fees resume. Without it, a fund that gains 20%, loses 20% and gains 20% again charges twice while the investor is barely back to even.",
  },
  5003: {
    category: "Fund management - Fees & performance",
    question: "How do a portfolio's alpha and beta differ?",
    options: [
      "Beta is the return that comes with the market, alpha is what is left on top",
      "Beta always exceeds alpha, since it includes the market return",
      "Alpha measures the portfolio's risk, beta measures absolute return",
      "Alpha applies to open-ended funds and beta to closed-ended and ETFs",
    ],
    explanation:
      "Beta measures how much the portfolio moves with the market - a return the investor can buy cheaply through an index fund. Alpha is what remains after beta's contribution is removed, the part that genuinely comes from the manager's skill. This is why a high fee is only justified where there is alpha.",
  },
  5004: {
    category: "Fund management - Fees & performance",
    question: "What does unusually high tracking error tell you about an index fund?",
    options: [
      "The fund is drifting further from its benchmark than intended",
      "The fund holds little cash so it tracks the index better",
      "The fund's trading costs are below the industry average",
      "The fund is generating more alpha than comparable funds",
    ],
    explanation:
      "For an index fund, low tracking error is the goal - its job is to replicate the index, not beat it. High tracking error usually comes from idle cash, trading costs, or sampling instead of holding the full basket.",
  },
  5005: {
    category: "Fund management - Fees & performance",
    question: "What does the Sharpe ratio measure?",
    options: [
      "Return above the risk-free rate per unit of volatility",
      "The percentage of trading days the fund gained in the year",
      "The gap between the fund's return and its benchmark",
      "The total absolute return the fund achieved in the period",
    ],
    explanation:
      "Sharpe = (portfolio return - risk-free rate) / standard deviation. It answers how much return each extra unit of risk bought, so two funds both up 15% with different volatility have very different Sharpe ratios.",
  },
  5006: {
    category: "Fund management - Fees & performance",
    question: "Why does the Sortino ratio sometimes describe reality better than Sharpe?",
    options: [
      "Because it penalises only downside volatility, not upside",
      "Because it uses daily rather than monthly data",
      "Because it uses a higher risk-free rate, making it stricter",
      "Because it strips out the effect of management fees",
    ],
    explanation:
      "Sharpe uses standard deviation, treating a sharp gain as just as 'risky' as a sharp loss - which nobody actually believes. Sortino puts only the below-threshold volatility in the denominator, so it does not punish a strategy for a few outsized winning months.",
  },
  5007: {
    category: "Fund management - Fees & performance",
    question: "How is NAV per unit of an open-ended fund determined?",
    options: [
      "Total assets minus liabilities, divided by units outstanding",
      "Total assets divided by units, before deducting liabilities",
      "Initial capital contributed divided by units issued",
      "The closing matched price on the exchange",
    ],
    explanation:
      "NAV per unit = (total assets - total liabilities) / units outstanding. In an open-ended fund the investor buys and redeems at exactly this NAV (plus or minus fees), quite unlike a closed-ended fund where the market sets the price.",
  },
  5008: {
    category: "Fund management - Fees & performance",
    question: "Why can a closed-ended fund's units trade below NAV?",
    options: [
      "Because supply and demand on the exchange set the price, not NAV",
      "Because the management fee is deducted straight from the market price",
      "Because a closed-ended fund's NAV is always stated above true value",
      "Because the fund must provision for redemptions",
    ],
    explanation:
      "A closed-ended fund does not redeem units at NAV, so nothing forces the market price back towards it. The discount therefore reflects the market's view on management quality, liquidity and fees - and it can persist for years.",
  },
  5009: {
    category: "Fund management - Fees & performance",
    question: "What structural risk does an open-ended fund holding illiquid assets face?",
    options: [
      "Mass redemptions forcing fire sales at bad prices",
      "The regulator automatically converting it to a closed-ended fund",
      "Having to pay investors a penalty rate for slow redemptions",
      "Its NAV being frozen and no longer published",
    ],
    explanation:
      "This is the liquidity mismatch: the fund promises daily redemption while the assets need weeks to sell at a fair price. When investors redeem together the fund sells whatever is easiest first, leaving the remaining portfolio even less liquid and the later redeemers worse off.",
  },
  5010: {
    category: "Fund management - Fees & performance",
    question: "What benchmark suits a Vietnamese mid-cap equity fund?",
    options: [
      "A Vietnamese mid-cap equity index",
      "The VN-Index, as it represents the whole market",
      "The twelve-month bank deposit rate",
      "The S&P 500, for an international standard",
    ],
    explanation:
      "A benchmark only makes the comparison meaningful when it matches the asset class and the capitalisation segment. Using the VN-Index for a mid-cap fund makes performance look good or bad purely because of the large-cap cycle, saying nothing about stock selection.",
  },
  5011: {
    category: "Treasury - Liquidity & FX",
    question: "What is the treasury function's core job in a company?",
    options: [
      "Making sure the company can always meet obligations as they fall due",
      "Preparing consolidated statements and dealing with the auditors",
      "Maximising the return on idle cash",
      "Analysing the profitability of each product line and market",
    ],
    explanation:
      "Treasury exists so the company never becomes unable to pay, even while profitable on paper. Earning a return on idle cash is a secondary aim and always ranks behind liquidity safety - that is what separates treasury from FP&A.",
  },
  5012: {
    category: "Treasury - Liquidity & FX",
    question: "Where does cash pooling save money for a group with many subsidiaries?",
    options: [
      "Offsetting balances between units, cutting the need to borrow externally",
      "Reducing the corporate income tax owed by each subsidiary",
      "Allowing financial income to be booked one period earlier",
      "Removing all FX risk between units in different countries",
    ],
    explanation:
      "One subsidiary sitting on cash while another borrows short-term means the group is paying the bank the spread on its own money. Cash pooling nets the balances, so external borrowing covers only the group's genuine net shortfall.",
  },
};
