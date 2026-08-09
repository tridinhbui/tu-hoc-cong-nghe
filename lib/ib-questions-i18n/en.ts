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
  5041: {
    category: "ESG - Reporting frameworks & valuation",
    question: "Why is Scope 3 the hardest emissions category to measure?",
    options: [
      "Because it sits in the value chain, outside the company's control",
      "Because regulators forbid companies from publishing Scope 3 figures",
      "Because the GHG Protocol has not yet defined Scope 3",
      "Because Scope 3 is always far smaller than Scopes 1 and 2",
    ],
    explanation:
      "Scopes 1 and 2 come off the company's own fuel and electricity bills. Scope 3 sits with tier-one and tier-two suppliers and in how customers use the product - data the company does not own, so most of it has to be estimated from industry factors.",
  },
  5042: {
    category: "ESG - Reporting frameworks & valuation",
    question: "How does a green bond differ from an ordinary corporate bond?",
    options: [
      "The proceeds are tied to defined green projects",
      "The interest income is tax-exempt",
      "Its maturity is always longer than an ordinary corporate bond",
      "It pays less because the government guarantees repayment",
    ],
    explanation:
      "The constraint is on USE OF PROCEEDS, with an obligation to report the allocation periodically. Credit risk remains the issuer's own - a green bond from a weak company is still a high-risk investment, and the colour does not change that.",
  },
  5043: {
    category: "ESG - Reporting frameworks & valuation",
    question: "What is say-on-pay in corporate governance?",
    options: [
      "Shareholders' right to vote on the executive pay package",
      "The duty to disclose the median salary across all staff",
      "Workers' right to bargain over the minimum wage",
      "A statutory cap on the chief executive's pay",
    ],
    explanation:
      "Say-on-pay puts the executive pay package to a shareholder vote. In many markets the result is only advisory, but a high protest vote is still a governance signal the board finds hard to ignore.",
  },
  5044: {
    category: "ESG - Reporting frameworks & valuation",
    question: "Why do many large funds choose engagement over divesting from ESG laggards?",
    options: [
      "Because selling means losing any ability to influence the company",
      "Because rules require funds to hold shares for at least five years",
      "Because divestment is legally restricted for institutions",
      "Because engagement always returns more in the short run",
    ],
    explanation:
      "Divesting hands the shares to an investor who cares less, and does not cut the company's emissions by a single tonne. Holding keeps the vote, the right to nominate and the right to question - the only tools that produce real change inside the business.",
  },
  5045: {
    category: "ESG - Reporting frameworks & valuation",
    question: "What was the EU Taxonomy created to do?",
    options: [
      "Define, uniformly, which activities count as sustainable",
      "Set the carbon tax rate for each manufacturing sector",
      "Certify sustainable investment funds in Europe",
      "Assign ESG ratings to listed companies",
    ],
    explanation:
      "Before the Taxonomy every party defined 'green' its own way, so two funds both calling themselves sustainable could hold entirely different portfolios. The Taxonomy sets shared technical criteria per economic activity, turning 'green' from a marketing adjective into a verifiable threshold.",
  },
  5046: {
    category: "Fixed income - Trading & rates",
    question: "What does a bond's duration measure?",
    options: [
      "How sensitive the bond's price is to a change in interest rates",
      "The total coupon interest to be received until maturity",
      "The period during which the bond may not be resold",
      "The number of years remaining until maturity",
    ],
    explanation:
      "Duration approximates the percentage price change for a 1% move in yield. It is quoted in years, which invites confusion with remaining maturity, but the two coincide only for a zero-coupon bond - every coupon paid before maturity pulls duration below the term.",
  },
  5047: {
    category: "Fixed income - Trading & rates",
    question: "What does convexity add that duration cannot say?",
    options: [
      "It corrects duration's error when rates move sharply",
      "It measures the gap between nominal and real yield",
      "It identifies the best moment to sell the bond on the exchange",
      "It determines the probability the issuer defaults",
    ],
    explanation:
      "Duration is a linear approximation while the price-yield relationship is curved. For small moves the error is negligible; for a large rate shock, duration understates the price gain when yields fall and overstates the loss when they rise. Positive convexity is therefore a desirable property.",
  },
  5048: {
    category: "Fixed income - Trading & rates",
    question: "How does the market usually read an inverted yield curve?",
    options: [
      "The market expects the economy to slow in the period ahead",
      "An indicator that bond market liquidity is improving",
      "A sign the central bank is about to raise its policy rate",
      "Evidence that inflation will surge over the next twelve months",
    ],
    explanation:
      "Long yields below short ones means the market is pricing rate cuts - something that usually only happens when the economy weakens. It is one of the few recession indicators with a serious historical record, though the lag between signal and recession varies a lot by cycle.",
  },
  5049: {
    category: "Fixed income - Trading & rates",
    question: "When does a callable bond work against the holder?",
    options: [
      "When rates fall and the issuer calls it to refinance more cheaply",
      "When the market is illiquid and no buyer can be found",
      "When rates rise and the investor is forced to sell it back",
      "When the issuer is suddenly downgraded",
    ],
    explanation:
      "The call belongs to the issuer, so they exercise it only when it suits them: rates fall, the old bond is called and a cheaper one is issued. The holder loses exactly the capital gain they should have had, then has to reinvest at the lower prevailing rate.",
  },
  5050: {
    category: "Fixed income - Trading & rates",
    question: "What is a repo transaction?",
    options: [
      "Selling securities with a commitment to buy them back at an agreed price",
      "Swapping a fixed rate for a floating rate",
      "Unsecured lending between two commercial banks",
      "Issuing government bonds to the public",
    ],
    explanation:
      "It looks like a sale and purchase but is in substance a secured loan: the gap between the sale and repurchase price is the interest. It is the main short-term funding source for bond dealers, and the channel through which stress spreads fastest once confidence goes.",
  },
  5051: {
    category: "Fixed income - Trading & rates",
    question: "What does an unusually wide bid-ask spread on a corporate bond tell you?",
    options: [
      "Poor liquidity, so both entering and exiting cost more",
      "Trading volume in the session is above normal",
      "The issuer has just been upgraded",
      "The bond's yield to maturity is rising quickly",
    ],
    explanation:
      "The spread is the price of liquidity: market makers widen it when counterparties are hard to find or inventory risk rises. On a corporate bond, an attractive quoted yield can be entirely consumed by the spread if you need to exit early.",
  },
  5052: {
    category: "Fixed income - Trading & rates",
    question: "Why is a zero-coupon bond more rate-sensitive than a coupon bond of the same maturity?",
    options: [
      "Because all the cash flow lands at maturity, so duration is longer",
      "Because having no coupon frees it from reinvestment risk",
      "Because zero-coupon bonds trade over the counter",
      "Because zero-coupon bonds always carry a lower credit rating",
    ],
    explanation:
      "A coupon bond returns some money early, pulling the centre of gravity of its cash flows closer to today. A zero pays nothing until the final day, so its duration equals its maturity - the longest possible - and its price swings hardest in its maturity bucket.",
  },
  5053: {
    category: "Fixed income - Trading & rates",
    question: "What does credit spread duration measure?",
    options: [
      "Price sensitivity to a change in the credit spread itself",
      "How long the issuer typically holds its rating",
      "The maturity gap between corporate and government bonds",
      "The average days taken to resolve a bad debt",
    ],
    explanation:
      "A corporate bond carries two separate price risks: the risk-free yield moving, and the credit risk premium moving. Ordinary duration measures the first; credit spread duration measures the second - and in a credit crisis the second causes most of the damage.",
  },
  5054: {
    category: "Fixed income - Trading & rates",
    question: "How does a carry trade work in the bond market?",
    options: [
      "Borrow short at a low rate to hold a higher-yielding asset",
      "Swap local-currency bonds for foreign ones of the same maturity",
      "Hold bonds to maturity to avoid price risk",
      "Buy and sell the same bond within one session",
    ],
    explanation:
      "The profit is the rate differential, and it accrues steadily right up until it does not. The risk sits at both ends: short-term funding costs can spike and the asset held can fall - and the two usually happen together, exactly when leverage is highest.",
  },
  5055: {
    category: "Brokerage - Products & clients",
    question: "How does margin trading change an investor's risk?",
    options: [
      "It amplifies both gains and losses on the investor's own capital",
      "It amplifies only gains, since the firm absorbs the losses",
      "It leaves risk unchanged, because collateral covers it",
      "It reduces risk by allowing more names to be held",
    ],
    explanation:
      "Leverage multiplies in both directions: borrowing to hold twice the shares turns a 10% rise into 20% on your own capital, and a 10% fall into 20% as well. Add the interest cost and the risk of being force-sold at the bottom - risks that buying with your own money does not carry.",
  },
  5056: {
    category: "Brokerage - Products & clients",
    question: "When does a margin call happen?",
    options: [
      "When the margin ratio falls below the required maintenance level",
      "When the stock is put on the exchange's warning list",
      "When the broker exhausts its margin lending quota",
      "When the client wants to withdraw cash from the account",
    ],
    explanation:
      "Margin ratio = own equity / asset value. A falling price shrinks the numerator faster than the denominator, so the ratio breaks the maintenance threshold and the broker demands a top-up. Fail to post it and you are force-sold - usually in the worst session, because that is when margin calls arrive in bulk.",
  },
  5057: {
    category: "Brokerage - Products & clients",
    question: "How does an ATO order differ from a limit order?",
    options: [
      "ATO fills at the opening price; a limit order fills only at the price set",
      "ATO has priority over every other order in the session",
      "ATO carries a lower commission than a limit order",
      "ATO is only for institutions and limit orders only for retail",
    ],
    explanation:
      "ATO accepts whatever price the opening auction determines, so it is sure to fill but gives up control of price. A limit order controls price but may not fill. Trading fill certainty against price certainty is the most basic choice in order placement.",
  },
  5058: {
    category: "Brokerage - Products & clients",
    question: "Why must a broker assess a client's risk tolerance before recommending a product?",
    options: [
      "Because a product right for one person can be wrong for another",
      "Because the commission varies with the client's risk tolerance",
      "Because the firm needs the data to set the margin limit",
      "Because rules require every client to hold the same portfolio",
    ],
    explanation:
      "This is the suitability principle: a product is not good or bad in the abstract, only suited or unsuited to a particular person's goals, horizon and capacity for loss. Selling covered warrants to someone about to retire is wrong even though the product is perfectly legal.",
  },
  5059: {
    category: "Brokerage - Products & clients",
    question: "What is the inherent conflict of interest in per-trade commission?",
    options: [
      "Per-trade commission rewards the broker for pushing more trading",
      "The firm pays a fixed salary unrelated to sales",
      "Client and firm share one system",
      "Brokers are not permitted to hold their own shares",
    ],
    explanation:
      "The broker's income rises with how often the client trades, while the client's interest usually lies in trading less. The two incentives are structurally opposed, so professional standards have to compensate with disclosure and limits - goodwill alone cannot be relied on.",
  },
  5060: {
    category: "Brokerage - Products & clients",
    question: "What does a T+2 settlement cycle mean?",
    options: [
      "Securities and cash reach the account two business days later",
      "The investor must hold for at least two days before selling",
      "The commission is collected in two instalments two days apart",
      "An order is only valid for two trading sessions",
    ],
    explanation:
      "The trade matches immediately but the transfer of securities and cash completes two business days later. That lag is why a central depository and settlement margin exist: for those two days the system carries the risk that one side fails to deliver.",
  },
  5061: {
    category: "Brokerage - Products & clients",
    question: "What particular risk does short selling create that buying does not?",
    options: [
      "The loss is theoretically unlimited as the price rises",
      "Trades can only be executed in the periodic auction",
      "The investor loses the right to dividends on the shares sold",
      "The maximum loss equals exactly the capital committed",
    ],
    explanation:
      "Buying a share risks at most everything you paid, because the price cannot go below zero. A short faces a price that can rise without limit, so the loss has no ceiling - and a short squeeze can force the position closed exactly as the price is spiking.",
  },
  5062: {
    category: "Brokerage - Products & clients",
    question: "Why must client money be segregated from the broker's own accounts?",
    options: [
      "So client money cannot be used for the firm's own purposes",
      "To lower the cost of administering each client account",
      "So clients earn a higher deposit rate",
      "So the tax authority can compute investment income tax",
    ],
    explanation:
      "Segregation keeps client money out of the firm's estate when the firm gets into trouble - if it fails, that money is not distributed to its creditors. Most large investor losses begin exactly where this boundary gets blurred.",
  },
  5063: {
    category: "Brokerage - Products & clients",
    question: "What is churning in the brokerage business?",
    options: [
      "Pushing a client to trade far more than necessary just to earn commission",
      "Bundling several small client orders into one large order",
      "Moving a client's account to another brokerage",
      "Filling the firm's own orders ahead of the client's",
    ],
    explanation:
      "Churning is the per-trade conflict of interest carried into abuse: a stream of buy and sell recommendations serving no client strategy, only the commission. The tell is unusually high portfolio turnover while the asset weights barely change.",
  },
  5064: {
    category: "Macro - Policy & cycles",
    question: "How does core CPI differ from headline CPI?",
    options: [
      "It strips out food and energy, which swing violently",
      "It counts only domestically produced goods, excluding imports",
      "It is computed quarterly rather than monthly",
      "It covers only the basket of large urban areas",
    ],
    explanation:
      "Food and energy prices move with weather and geopolitics, which monetary policy cannot touch. Core therefore reflects more durable price pressure - but people live the headline number, so a central bank has to watch both.",
  },
  5065: {
    category: "Macro - Policy & cycles",
    question: "Through which channel does a policy rate rise reach the economy first?",
    options: [
      "Borrowing costs rise, slowing consumption and investment",
      "Nominal wages rise along with the rate",
      "Budget revenue rises through higher income tax",
      "Import prices fall as the exchange rate moves",
    ],
    explanation:
      "The interest rate channel is the most direct: dearer borrowing makes companies postpone projects and households postpone a house or a car. The other channels - exchange rate, asset prices, expectations - are real but slower and more indirect.",
  },
};
