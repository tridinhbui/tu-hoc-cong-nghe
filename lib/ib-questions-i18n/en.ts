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
  5013: {
    category: "Treasury - Liquidity & FX",
    question: "An exporter earns USD and pays costs in VND. Where is the FX risk?",
    options: [
      "USD weakening against VND, so converted revenue falls",
      "USD strengthening against VND, so input costs rise",
      "Volatile rates raising the export tax owed",
      "USD rates rising, making working capital dearer",
    ],
    explanation:
      "Revenue in foreign currency with costs in local currency is a long-USD position: a weaker dollar converts the same shipment into fewer dong, while domestic wages and materials do not fall with it. This is transaction exposure, which a forward contract handles.",
  },
  5014: {
    category: "Treasury - Liquidity & FX",
    question: "How does an FX forward differ from an FX option?",
    options: [
      "A forward is a binding obligation; an option is a right to choose",
      "Forwards are only for hard currencies, options for any currency",
      "Forwards are set by the central bank, options by the market",
      "Forwards always cost more than options for the same tenor",
    ],
    explanation:
      "A forward locks the rate: you are protected if it moves against you and you also give up the gain if it moves your way. An option lets you walk away, in exchange for a premium paid up front. Choosing between them is a question of paying now or giving up the upside.",
  },
  5015: {
    category: "Treasury - Liquidity & FX",
    question: "What is a committed credit line worth to treasury?",
    options: [
      "Certainty of drawing funds even when markets are under stress",
      "Borrowing below the market rate",
      "Removing any need to hold cash on the balance sheet",
      "Being recorded as a current asset on the balance sheet",
    ],
    explanation:
      "The difference is the word 'committed': the bank is contractually bound to fund, and the company pays a commitment fee for that. Uncommitted lines tend to be withdrawn exactly when markets turn - which is exactly when they are needed.",
  },
  5016: {
    category: "Treasury - Liquidity & FX",
    question: "Why does treasury track the cash conversion cycle rather than profit alone?",
    options: [
      "Because the CCC says how many days cash is locked inside operations",
      "Because the CCC must be disclosed in the annual report",
      "Because the CCC determines the deferred tax to be recognised",
      "Because the CCC replaces both the cash flow statement and the balance sheet",
    ],
    explanation:
      "CCC = inventory days + receivable days - payable days. A profitable company with a long CCC still has to borrow to fund working capital, and every day shaved off is a day of interest saved - a lever treasury can pull directly.",
  },
  5017: {
    category: "Treasury - Liquidity & FX",
    question: "What does a natural hedge mean in FX risk management?",
    options: [
      "Matching revenue and costs in the same currency so they offset",
      "Buying exchange-traded FX futures instead of going through a bank",
      "Holding all cash in the strongest currency in the region",
      "Switching every sales contract to settle in local currency",
    ],
    explanation:
      "If an exporter earns USD and also buys raw materials in USD, most of the exposure cancels at no hedging cost. It is the cheapest option, so treasury usually exhausts natural hedges first and uses derivatives only for the remainder.",
  },
  5018: {
    category: "Treasury - Liquidity & FX",
    question: "Why can a profitable company still go bankrupt?",
    options: [
      "Because obligations falling due need cash, not accounting profit",
      "Because accounting profit is always taxed before it becomes cash",
      "Because regulators force bankruptcy once borrowing gets too high",
      "Because auditors can order a company to cease operations",
    ],
    explanation:
      "Profit is an accounting figure; creditors want real money on a specific date. Revenue booked but uncollected, swelling inventory, or several debts maturing at once can all leave a company unable to pay while the P&L still looks fine.",
  },
  5019: {
    category: "Treasury - Liquidity & FX",
    question: "Why does treasury usually ladder its idle cash across maturities?",
    options: [
      "So something is always maturing soon while the rest earns more",
      "To avoid disclosing the investments in the notes",
      "To earn the highest rate on the entire idle balance",
      "To transfer all interest rate risk to the receiving bank",
    ],
    explanation:
      "Putting everything at the long end pays best but locks the money up; leaving it all on demand is safe but costly in forgone interest. Staggering maturities keeps liquidity arriving steadily while capturing most of the long-tenor rate.",
  },
  5020: {
    category: "Treasury - Liquidity & FX",
    question: "A company borrows in USD but earns entirely in VND. What is the main risk?",
    options: [
      "VND weakening, so the debt swells when converted into VND",
      "VND rates rising, which raises the USD interest cost",
      "The bank being able to call the loan early if the rate moves",
      "The loan having to be reclassified as equity",
    ],
    explanation:
      "This is a currency mismatch: the source of repayment and the obligation sit in different currencies. If the dong weakens 10%, it takes 10% more dong to buy the dollars owed while revenue is unchanged - the mechanism that hurt many Vietnamese FX borrowers through past devaluations.",
  },
  5021: {
    category: "Compliance - Regulation & controls",
    question: "What is KYC for at a financial institution?",
    options: [
      "Verifying the client's identity and the source of their money",
      "Assessing how profitable the client will be",
      "Rating how satisfied the client is with the service",
      "Setting the maximum credit limit for the client",
    ],
    explanation:
      "KYC is the first line of defence against money laundering and terrorist financing: who the client is, where the money comes from, and whether expected activity matches that profile. An unusual transaction can only be spotted once there is a 'normal' to compare against.",
  },
  5022: {
    category: "Compliance - Regulation & controls",
    question: "How does the three lines of defence model split responsibility?",
    options: [
      "The business, compliance/risk, and internal audit",
      "Management, the board, and the annual general meeting",
      "Internal audit, external audit, and the regulator",
      "Legal, human resources, and information technology",
    ],
    explanation:
      "The first line owns the risk and controls it daily; the second sets the framework, monitors and challenges the first; the third audits both independently. The crucial point is that the third line reports straight to the audit committee, not through management.",
  },
  5023: {
    category: "Compliance - Regulation & controls",
    question: "What is a Chinese wall at a securities firm for?",
    options: [
      "Stopping inside information flowing from advisory into trading",
      "Stopping staff discussing work with other securities firms",
      "Stopping clients accessing unpublished research reports",
      "Stopping IT from reaching client account data",
    ],
    explanation:
      "The advisory side holds material non-public information while proprietary trading and brokerage trade in the market. If that information crosses, the firm both breaches insider dealing rules and betrays the very client who entrusted it.",
  },
  5024: {
    category: "Compliance - Regulation & controls",
    question: "What makes information 'material' under insider dealing rules?",
    options: [
      "Information a reasonable investor would use in a buy or sell decision",
      "Information only the most senior management is allowed to know",
      "Information an independent auditor has confirmed as accurate",
      "Information worth more than 5% of the company's total assets",
    ],
    explanation:
      "Materiality is measured by the effect on an investor's decision, not by the seniority of who holds it or a fixed percentage threshold. That is why a well-founded rumour about losing a major contract can be material even before any audited figure exists.",
  },
  5025: {
    category: "Compliance - Regulation & controls",
    question: "Why must staff trades be pre-cleared with compliance?",
    options: [
      "To catch trades based on undisclosed information before they happen",
      "To compute the employee's personal income tax on investments",
      "So the firm collects brokerage commission on staff trades",
      "To assess an employee's investing ability at promotion time",
    ],
    explanation:
      "Pre-clearance lets compliance block a trade on the restricted list before it takes place, rather than discovering a breach after the fact. It is a preventive control, not a detective one.",
  },
  5026: {
    category: "Compliance - Regulation & controls",
    question: "When is a suspicious transaction report filed?",
    options: [
      "When activity diverges from the client's declared profile and source of funds",
      "When the transaction exceeds the client's approved credit limit",
      "When the client complains about the quality of service",
      "When the system logs an error while processing an order",
    ],
    explanation:
      "The suspicious signal is the mismatch between behaviour and profile: an account declaring tens of millions of monthly income suddenly receiving tens of billions. A value threshold triggers a large-transaction report, which is a different filing.",
  },
  5027: {
    category: "Compliance - Regulation & controls",
    question: "Why is tone at the top considered decisive for a compliance culture?",
    options: [
      "Because staff follow what leaders reward and punish, not the rulebook",
      "Because the law holds leaders directly criminally liable",
      "Because only senior management may approve compliance procedures",
      "Because compliance always reports straight to the chief executive",
    ],
    explanation:
      "A thick rulebook alongside leaders who reward whoever hits target by cutting corners teaches staff that the rulebook is decoration. Compliance culture is built through specific personnel decisions, not through documents.",
  },
  5028: {
    category: "Compliance - Regulation & controls",
    question: "How does operational risk differ from market risk?",
    options: [
      "It comes from the organisation's own processes, people and systems",
      "It is always measured with a VaR model at 99% confidence",
      "It only arises at very large financial institutions",
      "It is transferred entirely to an insurer by contract",
    ],
    explanation:
      "Market risk comes from outside prices; operational risk comes from inside the firm - a mistyped order, internal fraud, a system outage, a process missing a control. It carries no reward, so the only strategy is to reduce it.",
  },
  5029: {
    category: "Compliance - Regulation & controls",
    question: "Why does segregation of duties matter?",
    options: [
      "Because one person both doing and approving makes fraud very hard to detect",
      "Because splitting work reduces each employee's workload",
      "Because the law requires three signatures on every transaction",
      "Because each department needs its own performance metrics",
    ],
    explanation:
      "Most large internal frauds share one structure: a single person controlling an entire cycle from initiation to approval to reconciliation. Splitting those steps forces fraud to need an accomplice, which is both harder to arrange and far easier to expose.",
  },
  5030: {
    category: "Compliance - Regulation & controls",
    question: "What extra treatment does a politically exposed person require?",
    options: [
      "Enhanced due diligence and approval at a more senior level",
      "Refusing the relationship, since serving them is prohibited",
      "Charging higher fees to offset the added legal risk",
      "Publishing the client's identity in the annual report",
    ],
    explanation:
      "PEPs are not prohibited clients, but their position raises corruption risk, so they need enhanced due diligence: verifying the source of wealth, senior sign-off, and closer transaction monitoring throughout. The rules extend to close family and associates too.",
  },
  5031: {
    category: "Quantitative - Probability & statistics",
    question: "For a strongly right-skewed distribution, which measure better represents a typical value?",
    options: [
      "The median represents the typical value better than the mean",
      "The mean is better, because it uses all the data",
      "The mean is always below the median when data is right-skewed",
      "The two give the same answer for any distribution",
    ],
    explanation:
      "A few very large observations drag the mean towards them, while the median only cares about ordering and stays put. Income, deal size and fund returns are all right-skewed, so reporting a mean for them paints a picture nobody actually experiences.",
  },
  5032: {
    category: "Quantitative - Probability & statistics",
    question: "A test returns a p-value of 0.03. What does that number mean?",
    options: [
      "The probability of seeing this data if H0 is true is 3%",
      "The independent variable's effect on the dependent variable is 3%",
      "The probability that H0 is true, given the data, is 3%",
      "The probability that this study's conclusion is wrong is 3%",
    ],
    explanation:
      "A p-value is the probability of the DATA given H0, not the probability of H0 given the data - reversing the two is the most common misreading in applied statistics. It also says nothing about effect size: with a large enough sample, an economically meaningless difference still produces a tiny p-value.",
  },
  5033: {
    category: "Quantitative - Probability & statistics",
    question: "What does a regression model's R-squared measure?",
    options: [
      "The share of variation in the dependent variable the model explains",
      "How certain we can be that a causal relationship exists",
      "The average slope of the fitted regression line",
      "The probability the model predicts the next period correctly",
    ],
    explanation:
      "R-squared only says how well the model fits past data. It confirms no causation, guarantees no forecasting power, and always rises when a variable is added - even a meaningless one. That is why adjusted R-squared and out-of-sample testing are the measures worth trusting.",
  },
  5034: {
    category: "Quantitative - Probability & statistics",
    question: "What does multicollinearity between independent variables cause?",
    options: [
      "Unstable coefficients that cannot be interpreted individually",
      "Forecast error rising by exactly the number of variables added",
      "The dependent variable being dropped from the model automatically",
      "A low R-squared no matter which variables are chosen",
    ],
    explanation:
      "When two explanatory variables move almost together, the model cannot separate their contributions: coefficients swing wildly on a handful of extra observations, and their signs can come out backwards. Notably, overall forecasting power can still be fine - the damage is to interpreting each coefficient.",
  },
  5035: {
    category: "Quantitative - Probability & statistics",
    question: "Why does a high correlation between two variables not establish causation?",
    options: [
      "Because a third variable may be driving both of them",
      "Because correlation can only be computed on time series data",
      "Because causation is only proven once correlation passes 0.9",
      "Because the correlation coefficient always carries large measurement error",
    ],
    explanation:
      "Three explanations always compete with the causal reading: the causation runs the other way, a hidden variable drives both, or it is pure coincidence in this sample. In financial data the hidden variable is usually the economic cycle, which pushes many indicators together with no direct link between them.",
  },
  5036: {
    category: "Quantitative - Probability & statistics",
    question: "What does overfitting mean in a quantitative model?",
    options: [
      "The model fits the training data's noise too, so it forecasts poorly",
      "The model uses too few variables and misses important relationships",
      "The model runs too long because of the volume of input data",
      "The model gives identical results on every dataset",
    ],
    explanation:
      "An overfitted model looks superb on past data because it memorised the random part too, then falls apart on anything new. This is precisely the mechanism behind countless trading strategies with beautiful backtests that lose money the moment they go live.",
  },
  5037: {
    category: "ESG - Reporting frameworks & valuation",
    question: "Which metric allows emissions to be compared across companies of different size?",
    options: [
      "Emissions per unit of revenue or output",
      "The number of emission-reduction projects the company has run",
      "The percentage of staff trained on environmental matters",
      "The company's total absolute emissions for the year",
    ],
    explanation:
      "Absolute emissions always favour the smaller company: a plant ten times larger naturally emits more, which says nothing about efficiency. Dividing by revenue or output gives emissions intensity, the only measure comparable across sizes - and the one that shows whether a company is improving or merely shrinking production.",
  },
  5038: {
    category: "ESG - Reporting frameworks & valuation",
    question: "What is negative screening in ESG investing?",
    options: [
      "Removing whole sectors from the fund's investable universe up front",
      "Choosing the highest ESG-scoring company within each sector",
      "Investing in projects with measurable social impact",
      "Pressing for change through shareholder voting rights",
    ],
    explanation:
      "This is the oldest ESG strategy: tobacco, weapons, gambling or fossil fuels are excluded from the outset. It is clear and easy to verify; the cost is a narrower universe and no change at all inside the companies excluded.",
  },
  5039: {
    category: "ESG - Reporting frameworks & valuation",
    question: "How does best-in-class differ from negative screening?",
    options: [
      "It keeps every sector but picks only the leaders within each one",
      "It removes low-ESG sectors from the portfolio entirely",
      "It applies only to bond portfolios, not equities",
      "It invests only in companies with an international ESG certificate",
    ],
    explanation:
      "Best-in-class excludes no sector, not even the dirtiest - it picks the ESG leaders inside it. The logic is to reward relative improvement and keep sector diversification, at the price of a portfolio that can still hold oil and mining shares.",
  },
  5040: {
    category: "ESG - Reporting frameworks & valuation",
    question: "What does stranded asset risk mean?",
    options: [
      "An asset losing value early because policy or technology changed",
      "An asset that cannot be sold because the market lacks liquidity",
      "An asset frozen by regulators over an environmental breach",
      "An asset fully depreciated but still in use",
    ],
    explanation:
      "A coal mine with thirty years of reserves that carbon policy makes uneconomic after ten has to be written down before the end of its life. This is the main channel through which climate risk reaches the balance sheet, and it hits lenders as well as owners.",
  },
};
