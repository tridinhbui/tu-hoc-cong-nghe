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
  5066: {
    category: "Macro - Policy & cycles",
    question: "How does fiscal policy differ from monetary policy?",
    options: [
      "Fiscal uses tax and public spending; monetary uses rates and money supply",
      "Fiscal is run by the central bank and monetary by parliament",
      "Fiscal applies only in recession and monetary only in growth",
      "Fiscal acts immediately while monetary always lags for years",
    ],
    explanation:
      "The two tools sit in different institutions with different kinds of lag: fiscal needs legislation so it is slow to enact but fast once the money is spent; monetary is decided quickly but takes several quarters to work through the economy.",
  },
  5067: {
    category: "Macro - Policy & cycles",
    question: "What relationship does the Phillips curve describe?",
    options: [
      "A short-run trade-off between unemployment and inflation",
      "The link between the budget and the trade balance",
      "The correlation between short and long interest rates",
      "The relation between money supply and real GDP growth",
    ],
    explanation:
      "The key words are SHORT RUN. The trade-off broke down in the 1970s when inflation and unemployment were high together, and the explanation - inflation expectations shifting the whole curve - is the foundation of anchoring expectations today.",
  },
  5068: {
    category: "Macro - Policy & cycles",
    question: "Why do central banks care so much about inflation expectations?",
    options: [
      "Because expectations become self-fulfilling through wage and price setting",
      "Because expectations feed into the GDP formula",
      "Because the law requires publishing expectations quarterly",
      "Because expectations directly determine the exchange rate",
    ],
    explanation:
      "If companies believe prices will rise 8%, they set prices 8% higher and workers ask for 8% more - inflation arrives because everyone expected it. This is why a central bank that has lost credibility pays a far higher price to bring inflation back down.",
  },
  5069: {
    category: "Macro - Policy & cycles",
    question: "How does a leading indicator like PMI differ from a lagging one?",
    options: [
      "It changes before the economy actually turns",
      "It reflects the state of the economy right now",
      "It is published once a year by international bodies",
      "It only confirms a trend after it has already happened",
    ],
    explanation:
      "PMI asks purchasing managers about orders ahead, so it reacts before actual output. Unemployment is the opposite - firms cut staff after being weak for a while, so it confirms a recession rather than forecasting one.",
  },
  5070: {
    category: "Macro - Policy & cycles",
    question: "What pressure does a persistent trade surplus put on the exchange rate?",
    options: [
      "It raises demand for the local currency, pushing it up",
      "None, because the central bank sets the rate",
      "It lowers demand for the local currency, as exports get relatively cheaper",
      "It pushes domestic rates up to attract foreign capital",
    ],
    explanation:
      "Buyers of exports must convert foreign currency into local currency to pay, so a persistent surplus lifts demand for it. That is also the self-correcting mechanism: a stronger currency makes exports dearer and gradually shrinks the surplus itself.",
  },
  5071: {
    category: "Macro - Policy & cycles",
    question: "What state of the economy does stagflation describe?",
    options: [
      "High inflation alongside stagnant growth",
      "Fast growth alongside a trade deficit",
      "Prolonged deflation alongside very low unemployment",
      "High inflation alongside an overheating boom",
    ],
    explanation:
      "This is the hardest situation for a central bank: cutting rates to rescue growth makes inflation worse, raising them to stop inflation makes growth worse. The usual cause is a supply shock, such as an oil price spike.",
  },
  5072: {
    category: "Macro - Policy & cycles",
    question: "Why does monetary policy take so long to reach the economy?",
    options: [
      "Because investment and consumption decisions respond slowly",
      "Because the law makes policy effective only after twelve months",
      "Because statistics are published several years behind reality",
      "Because the central bank meets only once a year",
    ],
    explanation:
      "A factory already under construction does not stop because rates rose, and existing loans keep running on their old terms. The typical lag is estimated at four to eight quarters, so today's policy targets the economy of a year or two ahead, not today's.",
  },
  5073: {
    category: "Tax - Corporate & personal",
    question: "Where does deferred corporate income tax come from?",
    options: [
      "Temporary differences between the accounting books and the tax books",
      "Tax reassessed after an inspection",
      "Foreign contractor tax not yet declared in the period",
      "Tax whose payment was deferred to next year on request",
    ],
    explanation:
      "Accounting and tax recognise the same item at different moments - depreciation being the classic case. That difference reverses over time, so it creates a deferred tax asset or liability rather than tax genuinely payable now.",
  },
  5074: {
    category: "Tax - Corporate & personal",
    question: "What is the benefit of accelerated depreciation for tax purposes?",
    options: [
      "It defers the tax bill, which is worth something in time-value terms",
      "It allows the asset to be recorded above its real value",
      "It lowers the total tax paid over the asset's life",
      "It raises accounting profit in the first year of use",
    ],
    explanation:
      "The total tax across the asset's life is unchanged - acceleration only moves the obligation later. But a dong of tax paid in year five is cheaper than one paid today, so the present value of the obligation falls. The benefit is in cash flow, not in the amount.",
  },
  5075: {
    category: "Tax - Corporate & personal",
    question: "How does the effective tax rate differ from the statutory rate?",
    options: [
      "The effective rate is tax actually paid over accounting pre-tax profit",
      "The two are always equal if the company complies with the law",
      "The effective rate applies only to foreign-invested companies",
      "The effective rate is a statutory ceiling for the industry",
    ],
    explanation:
      "The statutory rate is the number in the law; the effective rate is what the company actually pays after incentives, loss carry-forwards, exempt income and cross-border differences. The gap between the two is where an analyst should read the notes carefully.",
  },
  5076: {
    category: "Tax - Corporate & personal",
    question: "What problem does a double taxation treaty solve?",
    options: [
      "The same income being taxed in two different countries",
      "VAT being charged twice through the distribution chain",
      "An individual having income from two different jobs",
      "A company having to pay tax twice in the same year",
    ],
    explanation:
      "Without a treaty, both the source country and the country of residence have a claim on the same income. A treaty allocates the taxing right and credits the tax paid abroad - otherwise cross-border investment would be taxed to the point of being unworkable.",
  },
  5077: {
    category: "Tax - Corporate & personal",
    question: "How does VAT differ in nature from corporate income tax?",
    options: [
      "VAT taxes consumption; corporate income tax taxes profit",
      "VAT applies only to imported goods",
      "VAT is computed annually and income tax per transaction",
      "VAT is borne by the company and income tax by the buyer",
    ],
    explanation:
      "The company collects VAT from the buyer and remits the difference after deducting input VAT, so the final burden sits with the consumer. Corporate income tax falls directly on the company's own profit - two taxes with genuinely different people bearing them.",
  },
  5078: {
    category: "Tax - Corporate & personal",
    question: "Why does the interest tax shield raise a company's value?",
    options: [
      "Because interest is deducted before taxable income is computed",
      "Because interest reduces revenue subject to VAT",
      "Because part of the interest is refunded from the state budget",
      "Because interest is capitalised into the asset",
    ],
    explanation:
      "Every dong of interest saves tax equal to interest times the tax rate, and that saving belongs to the owners. It is the core argument for using debt - but it is only worth anything while the company still has profit to deduct against.",
  },
  5079: {
    category: "Tax - Corporate & personal",
    question: "What does a loss carry-forward let a company do?",
    options: [
      "Offset a prior year's loss against taxable profit in later years",
      "Record the loss as an intangible asset on the balance sheet",
      "Reclaim tax paid in earlier years from the authority",
      "Push the loss onto the parent company",
    ],
    explanation:
      "Without it, a company losing 100 this year and making 100 next year would still pay tax on 100 despite breaking even overall. Carry-forward smooths the tax burden across the cycle, and it is also what creates a deferred tax asset on the balance sheet.",
  },
  5080: {
    category: "Tax - Corporate & personal",
    question: "What does a progressive personal income tax with brackets mean?",
    options: [
      "Each slice of income is taxed at that bracket's own rate",
      "All income is taxed at the highest bracket reached",
      "High earners are charged a single flat rate",
      "The rate rises with the number of years worked",
    ],
    explanation:
      "This is the most common misunderstanding about income tax: moving into a new bracket does not tax all your income at the higher rate, only the part above the threshold. A raise can therefore never leave you worse off after tax.",
  },
  5081: {
    category: "Tax - Corporate & personal",
    question: "Why do investment tax incentives usually come with a time limit?",
    options: [
      "To encourage investment without giving up budget revenue forever",
      "Because companies only need relief during construction",
      "Because the tax authority lacks staff to monitor longer",
      "Because international law forbids incentives beyond five years",
    ],
    explanation:
      "A time-limited incentive is long enough to shift the initial investment decision - the thing policy wants - and ends before it becomes a permanent subsidy. When appraising a project, it is the profit after the incentive expires that shows whether it is genuinely viable.",
  },
  5082: {
    category: "Insurance - Pricing & risk",
    question: "How does insurance risk pooling work?",
    options: [
      "Many contribute so the few who suffer a loss are compensated",
      "The insurer keeps all the risk and shares none of it",
      "Each person pays exactly their own expected loss",
      "The risk is transferred entirely to the state regulator",
    ],
    explanation:
      "One individual cannot predict whether they will have an accident, but across ten thousand people the rate is fairly stable. Insurance sells exactly that stability: swapping one large uncertain loss for one small certain premium.",
  },
  5083: {
    category: "Insurance - Pricing & risk",
    question: "What does adverse selection mean in insurance?",
    options: [
      "Higher-risk people are more inclined to buy cover",
      "People behave more carelessly once they are insured",
      "The insurer picks the wrong target customer group",
      "Customers choose a policy that does not fit their needs",
    ],
    explanation:
      "Someone who knows their health is poor cares more about health cover than someone healthy, so the insured pool is riskier than the general population. Without underwriting and risk classing, premiums must rise, the healthy leave, and that spiral can break a market.",
  },
  5084: {
    category: "Insurance - Pricing & risk",
    question: "How does moral hazard differ from adverse selection?",
    options: [
      "Moral hazard happens after purchase, adverse selection at purchase",
      "Moral hazard is caused by the insurer, adverse selection by the client",
      "Moral hazard exists only in life cover and adverse selection in general",
      "They are the same concept under two regional names",
    ],
    explanation:
      "Adverse selection is a problem of WHO buys; moral hazard is a problem of how the insured BEHAVES afterwards. The two need different tools: underwriting and risk classing for the first, deductibles and co-payment for the second.",
  },
  5085: {
    category: "Insurance - Pricing & risk",
    question: "What does the pure premium consist of?",
    options: [
      "The expected loss, before expenses and profit",
      "A minimum premium set by the regulator for the industry",
      "The whole premium the client pays, agent commission included",
      "The premium left over after all claims are paid",
    ],
    explanation:
      "Pure premium = probability of occurrence x average loss. The commercial premium the client actually pays adds acquisition costs, commission, administration and a profit margin - so the gap between the two shows how expensive the insurer's machinery is.",
  },
  5086: {
    category: "Insurance - Pricing & risk",
    question: "What does a loss ratio of 110% mean?",
    options: [
      "Claims exceed premiums collected, so underwriting is loss-making",
      "There were 110 claims for every 100 policies sold",
      "The insurer pays out 110% of the contract value",
      "Premium revenue grew 110% against the same period last year",
    ],
    explanation:
      "Loss ratio = claims / premiums. Above 100% means the underwriting itself loses money before operating costs are even counted. Many insurers stay profitable by investing the premiums collected in advance - but that is investment profit, not profit from pricing risk correctly.",
  },
  5087: {
    category: "Insurance - Pricing & risk",
    question: "What does reinsurance do for an insurer?",
    options: [
      "Passes part of a large risk to a third party",
      "Reduces the reserving obligation to zero",
      "Sells the whole policy on to another insurer",
      "Raises the premium collected from existing clients",
    ],
    explanation:
      "Without reinsurance a single storm could wipe out a regional insurer's capital. Reinsurance lets it write policies larger than its own capital could bear, in exchange for ceding part of the premium - buying insurance for itself.",
  },
  5088: {
    category: "Insurance - Pricing & risk",
    question: "What are technical reserves on an insurer's balance sheet?",
    options: [
      "Estimated obligations for losses incurred and still to emerge",
      "Undistributed profit retained from earlier years",
      "The share of equity set aside for investment activity",
      "Cash required to be deposited at the central bank",
    ],
    explanation:
      "This is the largest and most judgemental line on an insurer's balance sheet: it includes losses that have occurred but not yet been reported. Under-reserving flatters today's profit and pushes the problem into later years, which is why analysts scrutinise it hardest.",
  },
  5089: {
    category: "Insurance - Pricing & risk",
    question: "Why does life insurance have a savings element while general insurance does not?",
    options: [
      "Because the contract is long-dated, so early premiums accumulate",
      "Because mortality risk is always lower than property damage risk",
      "Because general insurers may not invest the premiums collected",
      "Because the law requires life insurers to pay interest",
    ],
    explanation:
      "A life contract runs for decades at a roughly level premium while mortality risk rises with age - so the excess premium paid in the early years accumulates to cover the later ones. That accumulation is what creates the surrender value.",
  },
  5090: {
    category: "Insurance - Pricing & risk",
    question: "What is a mortality table used for?",
    options: [
      "Estimating the probability of death by age, to set premiums",
      "Setting the maximum payout for each age group",
      "Recording the actual number of deaths each year",
      "Classifying clients by their current health status",
    ],
    explanation:
      "This is the core input to life pricing. The subtlety is that the table must reflect the actual insured group rather than the general population - people who buy life cover have passed underwriting, so they tend to live longer than average.",
  },
  5091: {
    category: "Consumer credit - Scoring & collections",
    question: "What does a borrower's credit score represent?",
    options: [
      "The probability of falling behind on repayments within a given window",
      "The borrower's monthly income as verified by the bank",
      "The total value of assets the borrower legally owns",
      "The maximum the bank is permitted to lend them",
    ],
    explanation:
      "A credit score is a probability mapped onto a scale, not a measure of wealth or income. Someone with a high income and a poor repayment history still scores low - the model predicts behaviour, it does not assess overall financial capacity.",
  },
  5092: {
    category: "Consumer credit - Scoring & collections",
    question: "What does the debt-to-income ratio measure?",
    options: [
      "The share of income already committed to debt repayments",
      "How many loans the person holds across institutions",
      "The spread between lending and deposit rates",
      "The ratio of collateral to total outstanding debt",
    ],
    explanation:
      "DTI answers the cash flow question: after the monthly obligations, how much is left to live on. It complements the credit score - someone who has repaid on time for years can still be borrowing beyond their means.",
  },
  5093: {
    category: "Consumer credit - Scoring & collections",
    question: "What does group 3 and above mean in Vietnam's loan classification?",
    options: [
      "Substandard and worse, meaning it already counts as a bad debt",
      "Standard, but needing to be watched for a while",
      "Debt restructured at the client's request",
      "Debt secured on property",
    ],
    explanation:
      "Group 1 is standard, group 2 needs attention, and from group 3 up it is classified as a bad debt with provisioning rising to 100% at group 5. A bank's published NPL ratio is exactly groups 3-5 over total loans.",
  },
  5094: {
    category: "Consumer credit - Scoring & collections",
    question: "Why do lenders provision separately for each loan group?",
    options: [
      "Because recoverability falls as the arrears get older",
      "Because regulators want separate reporting per group",
      "Because each group carries a distinctly different lending rate",
      "Because tax rules allow provisions to be deducted from income",
    ],
    explanation:
      "A loan 30 days past due and one 360 days past due have completely different recovery prospects, so a single blended rate would over-provide for one and under-provide for the other. Grouping forces the loss to be recognised gradually instead of all in one quarter.",
  },
  5095: {
    category: "Consumer credit - Scoring & collections",
    question: "What is vintage analysis in consumer credit?",
    options: [
      "Comparing bad debt rates by the month each loan was disbursed",
      "Revaluing collateral at market prices each quarter",
      "Ranking clients by years of relationship with the bank",
      "Analysing the maturity structure of the whole loan book",
    ],
    explanation:
      "Group loans by disbursement month, then track each group's bad debt rate by months since origination. This separates the underwriting quality of each period from the effect of portfolio growth - a total NPL ratio is always diluted while new lending grows fast.",
  },
  5096: {
    category: "Consumer credit - Scoring & collections",
    question: "Why are unsecured consumer loan rates so much higher than mortgage rates?",
    options: [
      "Because with no collateral, the loss on default is far larger",
      "Because assessing an unsecured file costs several times more",
      "Because unsecured loans always run longer than mortgages",
      "Because rules impose a separate rate cap on unsecured lending",
    ],
    explanation:
      "Expected loss = probability of default x loss given default. A mortgage has a house to repossess so loss given default is low; an unsecured loan is close to a total write-off. The rate difference compensates for exactly that, not for price gouging.",
  },
  5097: {
    category: "Consumer credit - Scoring & collections",
    question: "What is the cut-off score in a credit scoring model for?",
    options: [
      "Setting the threshold at which an application is accepted or declined",
      "Determining the preferential rate for loyal customers",
      "Capping how many files each officer handles per day",
      "Setting the approval turnaround time",
    ],
    explanation:
      "The model produces a continuous score, but the decision is binary - approve or not. The cut-off is where that line is drawn, and it is a business choice rather than an output of the model.",
  },
  5098: {
    category: "Consumer credit - Scoring & collections",
    question: "What is the core trade-off in lowering the cut-off score?",
    options: [
      "More applications approved, but bad debt rises as well",
      "Lower funding costs, but higher marketing spend",
      "Lower operating costs, but slower processing",
      "Fewer approvals, but a wider margin",
    ],
    explanation:
      "Lowering the threshold chooses loan growth and accepts higher losses. Whether it is right depends on whether the extra interest from the marginal customers covers the extra losses - and the answer changes with the economic cycle.",
  },
  5099: {
    category: "Consumer credit - Scoring & collections",
    question: "Why must a credit scoring model be recalibrated periodically?",
    options: [
      "Because borrower behaviour and the macro environment both change",
      "Because the scoring software licence expires annually",
      "Because rules require a new model every twelve months",
      "Because historical data is deleted by regulation",
    ],
    explanation:
      "The model learned a relationship between application features and repayment behaviour over one specific period. When unemployment rises, rates move, or the customer mix itself changes, that relationship drifts - model drift, which degrades the model quietly with no warning.",
  },
  5100: {
    category: "Personal financial planning",
    question: "What assumption does the 4% retirement withdrawal rule rest on?",
    options: [
      "A stock and bond portfolio returning above inflation",
      "Bank deposit rates staying flat for thirty years",
      "The retiree living exactly twenty more years",
      "All assets being held in cash for safety",
    ],
    explanation:
      "The rule came from US market data with a stock-bond portfolio, where a positive real return covers the withdrawals. Applying it straight to an all-deposit portfolio, or a market with a different history, gives the wrong answer - so 4% is a starting point for the calculation, not a constant.",
  },
  5101: {
    category: "Personal financial planning",
    question: "How large should an emergency fund be, and where should it sit?",
    options: [
      "Three to six months of spending, somewhere it can be withdrawn immediately",
      "Three to six months of spending, invested in growth stocks",
      "Two weeks of spending, with the rest in property",
      "A year of income, in a five-year term deposit",
    ],
    explanation:
      "Two requirements have to hold at once: large enough to survive a period without income, and available immediately. Putting the emergency fund in equities breaks the second requirement at the worst possible moment - a crisis tends to cost the job and knock the share price at the same time.",
  },
  5102: {
    category: "Personal financial planning",
    question: "Why does clearing credit card debt usually come before investing?",
    options: [
      "Because the card rate exceeds the expected investment return",
      "Because card repayments are deductible against personal income tax",
      "Because the bank will freeze the investment account while card debt remains",
      "Because the law forbids investing while a card balance is outstanding",
    ],
    explanation:
      "Paying off debt at 25% a year is an investment returning a guaranteed 25%, tax-free and risk-free - no investment competes with that. It is one of the few personal finance decisions with a near-absolute answer.",
  },
  5103: {
    category: "Personal financial planning",
    question: "How does unit-linked life insurance differ from term life?",
    options: [
      "Unit-linked bundles protection with savings; term is protection only",
      "Term costs far more because the contract runs longer",
      "They are the same thing under different company names",
      "Unit-linked has its principal guaranteed by the state",
    ],
    explanation:
      "Term buys exactly one thing - a payout if the insured dies within the term - so it is far cheaper for the same cover. A unit-linked product bundles protection and savings into one contract: convenient, but it makes the cost of each part hard to compare.",
  },
  5104: {
    category: "Personal financial planning",
    question: "Why do fixed living costs matter more than income in a financial plan?",
    options: [
      "Because they set the minimum you need every month",
      "Because banks only look at costs when approving a loan",
      "Because income is always more stable than costs in the long run",
      "Because the tax authority computes tax from fixed costs",
    ],
    explanation:
      "Income can stop abruptly; rent, school fees and instalments do not. Fixed costs therefore determine how large the emergency fund must be, how much cover to buy, and how quickly a job loss becomes a crisis.",
  },
  5105: {
    category: "Personal financial planning",
    question: "What is sequence risk for someone who has just retired?",
    options: [
      "A heavy loss in the first withdrawal years wrecking the plan",
      "Inflation outpacing the state pension's increases",
      "The long-run average return coming in below plan",
      "The portfolio being too concentrated in a few large names",
    ],
    explanation:
      "Two people with the same thirty-year average return can end up in very different places if the good and bad years arrive in a different order. Withdrawing while the portfolio is down forces more units to be sold, and the capital sold is no longer there to recover with the market.",
  },
  5106: {
    category: "Personal financial planning",
    question: "Why is periodic rebalancing useful?",
    options: [
      "It brings the risk weighting back to the level originally chosen",
      "It avoids capital gains tax on investments entirely",
      "It guarantees the portfolio beats the market",
      "It removes any need to monitor the portfolio during the year",
    ],
    explanation:
      "After a few strong equity years, a portfolio set at 60/40 can have become 80/20 without its owner ever deciding that. Rebalancing restores the risk level actually chosen - and incidentally forces selling what has risen to buy what has fallen.",
  },
  5107: {
    category: "Personal financial planning",
    question: "How does a family office differ from a personal financial adviser?",
    options: [
      "It manages a family's assets, tax and succession as a whole",
      "It serves only clients whose income is a fixed salary",
      "It operates as an open-ended fund selling units to the public",
      "It advises on the portfolio only and never touches tax",
    ],
    explanation:
      "A family office serves one or a few very wealthy families and covers investment, tax structuring, succession, philanthropy and family governance. The asset base is large enough that running a dedicated team costs less than buying each service outside.",
  },
  5108: {
    category: "Personal financial planning",
    question: "Why does diversification matter for a long-term saver?",
    options: [
      "Because nobody knows in advance which asset class will lead",
      "Because trading costs fall when more asset types are bought",
      "Because rules require holding at least ten names",
      "Because diversification guarantees the portfolio never loses",
    ],
    explanation:
      "Diversification does not remove broad market risk and guarantees no gain. What it removes is the risk of betting wrong on one name or one sector - risk the market does not pay you to carry, so bearing it means taking the loss without the compensation.",
  },
  5109: {
    category: "Personal financial planning",
    question: "What is estate planning for?",
    options: [
      "Passing assets on as intended, with less dispute and less tax",
      "Avoiding every tax obligation the law imposes",
      "Ensuring assets earn the highest return after death",
      "Handing everything to the state to administer",
    ],
    explanation:
      "With no plan, the law decides instead - usually slowly, expensively and not as intended. Wills, trusts and beneficiary nominations are the main tools, and they need reviewing after every major family event.",
  },
  5110: {
    category: "Data & BI for finance",
    question: "Why must financial data be reconciled before it reaches a dashboard?",
    options: [
      "Because a wrong number on a dashboard is still believed and acted on",
      "Because reconciliation reduces warehouse storage",
      "Because accounting rules forbid displaying unaudited figures",
      "Because BI tools cannot read unreconciled data",
    ],
    explanation:
      "A number on a dashboard carries an air of precision that a raw spreadsheet does not, so it is trusted more, not less. Reconciling against the ledger before publishing is the only control standing between an ETL bug and a business decision made on it.",
  },
  5111: {
    category: "Data & BI for finance",
    question: "How does a fact table differ from a dimension table in a star schema?",
    options: [
      "Facts hold measures; dimensions hold descriptive attributes",
      "Facts always have fewer rows than dimensions",
      "Facts hold old data and dimensions the latest",
      "Facts are for reporting and dimensions for archiving",
    ],
    explanation:
      "A fact table holds what is measured - revenue, quantity, cost - and is usually very long. Dimensions hold the context those measures are sliced by: which customer, which product, which date. Separating them is why a multi-dimensional query still runs fast.",
  },
  5112: {
    category: "Data & BI for finance",
    question: "What does a type 2 slowly changing dimension handle?",
    options: [
      "Preserving history by adding a new row",
      "Overwriting the old value so the table always shows the present",
      "Compressing historical data to save storage",
      "Deleting old records after a set period",
    ],
    explanation:
      "When a customer moves from one segment to another, type 1 overwrites and every past report changes with it; type 2 adds a new row with its own validity window, so old reports stay put. Choosing the wrong type is why a report rerun a year later gives a different number.",
  },
  5113: {
    category: "Data & BI for finance",
    question: "Why store effective-date columns rather than only the current value?",
    options: [
      "So a report can be reproduced exactly as it stood at a past date",
      "To reduce the number of tables to maintain",
      "To speed up queries on large tables",
      "So the system can auto-delete expired data",
    ],
    explanation:
      "Audit and analysis both need to answer 'what did we see at the time', not 'what does the data say now'. Without validity windows, every historical report is rewritten each time a record is updated.",
  },
  5114: {
    category: "Data & BI for finance",
    question: "Why does each dashboard metric need one agreed definition?",
    options: [
      "Because each department defining its own produces contradictory reports",
      "Because BI tools accept only one definition per column",
      "Because auditors require every metric to have an English name",
      "Because a shared definition makes queries run faster",
    ],
    explanation:
      "Is an 'active customer' thirty days or ninety, and do trial accounts count - each choice gives a different number. When two departments bring two numbers into the same meeting, the discussion moves from the decision to which figure is right.",
  },
  5115: {
    category: "Data & BI for finance",
    question: "What does idempotency mean in a data pipeline?",
    options: [
      "Running it repeatedly produces the same result",
      "The pipeline restarts automatically when it fails midway",
      "Each run creates a new version of the data",
      "The data is compressed to cut transfer costs",
    ],
    explanation:
      "A non-idempotent pipeline rerun after a mid-way failure duplicates part of the data, and with financial data that is revenue counted twice. Idempotency is what makes rerunning safe - and rerunning always happens eventually.",
  },
  5116: {
    category: "Data & BI for finance",
    question: "What is a backfill in a data pipeline?",
    options: [
      "Rerunning the pipeline over a past date range",
      "Backing up the whole warehouse to another system",
      "Filling missing cells with the average value",
      "Deleting old data to free up storage",
    ],
    explanation:
      "When logic changes or a bug is found, historical data has to be recomputed on the new logic - otherwise the same metric breaks exactly on the deployment date. A safe backfill requires an idempotent pipeline, which is why the two concepts always travel together.",
  },
  5117: {
    category: "Data & BI for finance",
    question: "Why do operational and financial metrics so often disagree?",
    options: [
      "Because the two use different cut-off points and definitions",
      "Because operational systems always record data incorrectly",
      "Because operational data is not kept beyond thirty days",
      "Because accounting deliberately adjusts the figures upward",
    ],
    explanation:
      "The operational system counts an order when it is placed, accounting books revenue when it is delivered, and the two close their books at different moments. A gap is therefore normal; what is abnormal is not being able to explain it with a reconciliation.",
  },
  5118: {
    category: "Data & BI for finance",
    question: "Where is data lineage most useful?",
    options: [
      "Tracing a wrong number on a report back to its origin",
      "Letting several people edit one table at the same time",
      "Compressing historical data to a smaller size",
      "Auto-generating charts from an existing table",
    ],
    explanation:
      "When a figure on the board report looks wrong, the first question is which tables and transformations it passed through. Without lineage, tracing back means reading dozens of queries by hand - and that usually takes longer than the time until the next meeting.",
  },
  5119: {
    category: "FinTech - Product economics",
    question: "What do a fintech product's unit economics measure?",
    options: [
      "Profit or loss per customer after the cost of serving them",
      "The company's valuation at the latest funding round",
      "Total company revenue for a financial year",
      "How many new customers arrive each month",
    ],
    explanation:
      "Unit economics asks one very specific question: does one more customer make the company money or lose it. A fast-growing company with negative unit economics is only scaling its losses - growth there is not evidence of a good model.",
  },
  5120: {
    category: "FinTech - Product economics",
    question: "How do CAC and LTV relate?",
    options: [
      "LTV must exceed CAC by a wide enough margin for the model to hold",
      "CAC must always exceed LTV for fast growth",
      "LTV equals CAC times the number of years a customer stays",
      "The two have nothing to do with each other",
    ],
    explanation:
      "The cost of acquiring a customer has to be below the value they bring over their lifetime, with enough of a gap left to cover fixed costs. CAC payback period matters as much as the ratio: a healthy LTV/CAC with a four-year payback can still run the company out of cash.",
  },
  5121: {
    category: "FinTech - Product economics",
    question: "Why does churn matter more to fintech than to traditional retail?",
    options: [
      "Because revenue is recurring, so losing a customer loses all future cash flow",
      "Because fintechs may not charge a fee when a customer leaves",
      "Because fintech retention costs are always zero",
      "Because churn is monitored and published by the regulator",
    ],
    explanation:
      "Retail loses one sale; a recurring model loses that customer's entire remaining revenue stream. Churn therefore multiplies straight into LTV, and one percentage point of monthly churn can erase the effect of an entire growth campaign.",
  },
  5122: {
    category: "FinTech - Product economics",
    question: "What is a payment platform's take rate?",
    options: [
      "The percentage of transaction value the platform keeps",
      "A fixed monthly fee charged to each merchant",
      "The share of transactions that fail",
      "New customers as a share of total visitors",
    ],
    explanation:
      "The take rate decides how much the platform earns on every dong flowing through it. It is usually very thin, so the model only works at scale - and every competitive pressure lands on shaving that very number.",
  },
  5123: {
    category: "FinTech - Product economics",
    question: "Why must a lending fintech model its losses before scaling fast?",
    options: [
      "Because fast growth means bad debt only surfaces several quarters later",
      "Because investors demand to see the model before funding",
      "Because the law requires a model before the first loan",
      "Because a loss model lowers the cost of funding",
    ],
    explanation:
      "New loans have not had time to go bad, so a fast-growing book always shows a flattering NPL ratio - the denominator swells before the numerator can catch up. The real losses appear once growth slows, usually just as the company has scaled to its limit.",
  },
  5124: {
    category: "FinTech - Product economics",
    question: "What is float in an e-wallet business model?",
    options: [
      "Customer balances the wallet holds before they are paid out",
      "The number of wallets active in a given month",
      "The accumulated loss accepted to win market share",
      "The fee the wallet earns on each successful transaction",
    ],
    explanation:
      "The lag between money entering the wallet and money leaving creates a permanent balance the wallet is holding on someone's behalf. It can earn interest, but it is the customer's money - so regulation usually requires it segregated and limits how it may be used.",
  },
  5125: {
    category: "FinTech - Product economics",
    question: "Why is compliance cost a major barrier to entry in fintech?",
    options: [
      "Because it is a fixed cost, which weighs on the smaller player",
      "Because compliance cost rises in proportion to transactions",
      "Because regulators bar new companies from the market",
      "Because large companies are exempt from compliance obligations",
    ],
    explanation:
      "Licences, KYC systems and a compliance function cost roughly the same whether they serve ten thousand customers or ten million. A fixed cost spread over few customers is expensive per unit, so regulation protects users and, incidentally, whoever already has scale.",
  },
  5126: {
    category: "FinTech - Product economics",
    question: "How does the network effect work on a payments platform?",
    options: [
      "More merchants attract more buyers, and the reverse",
      "More transactions mean a higher fee per transaction",
      "More capital raised means a higher valuation",
      "More staff mean faster product delivery",
    ],
    explanation:
      "This is a two-sided network effect, and it explains why the early stage is so expensive: one side has to be subsidised to attract the other. Once the loop is self-sustaining it becomes a hard moat, but before then it is simply a large loss.",
  },
  5127: {
    category: "Foundations - New to the field",
    question: "How does compound interest differ from simple interest?",
    options: [
      "Compound interest earns interest on the interest already generated",
      "Compound interest always carries a higher rate for the same term",
      "Compound is only for loans and simple only for deposits",
      "Simple interest applies only to central bank deposits",
    ],
    explanation:
      "At the same rate, simple interest grows in a straight line and compound grows on a curve - and the gap between the two widens with time. This is why time, not the starting amount, is the strongest variable in long-run accumulation.",
  },
  5128: {
    category: "Foundations - New to the field",
    question: "What are a company's three main financial statements?",
    options: [
      "Income statement, balance sheet, cash flow statement",
      "Tax return, payroll report and inventory report",
      "Revenue, costs and after-tax profit for the period",
      "Annual report, quarterly report and monthly report",
    ],
    explanation:
      "The three answer three different questions: did the business make or lose money over the period, what does it own and owe at a point in time, and how much real cash came in and went out. Reading only two of them means missing a dimension of the picture.",
  },
  5129: {
    category: "Foundations - New to the field",
    question: "How do assets, liabilities and equity relate?",
    options: [
      "Assets equal liabilities plus equity",
      "Assets equal equity minus liabilities",
      "Equity equals assets plus liabilities",
      "Liabilities equal assets plus equity",
    ],
    explanation:
      "The accounting equation says everything the business owns was funded either by borrowing or by the owners. It always balances, and it is because it always balances that every entry has to be recorded on both sides.",
  },
  5130: {
    category: "Foundations - New to the field",
    question: "How does profit differ from cash flow?",
    options: [
      "Profit is recorded on accrual, cash flow on real money moving",
      "They are the same thing as long as the business is profitable",
      "Cash flow always exceeds profit at every company",
      "Profit is quarterly and cash flow monthly",
    ],
    explanation:
      "A credit sale books revenue immediately though nothing has been collected; buying an asset spends the cash at once but is expensed gradually through depreciation. The two measures therefore diverge - and companies go bankrupt from running out of cash, not from running out of profit.",
  },
  5131: {
    category: "Foundations - New to the field",
    question: "Why does inflation reduce the value of money sitting in an account?",
    options: [
      "Because that same amount buys fewer goods than before",
      "Because the state taxes the account balance each year",
      "Because deposit rates always fall when inflation rises",
      "Because the bank deducts an account fee each month",
    ],
    explanation:
      "The number on the statement is unchanged, but what it can be exchanged for shrinks. This is why a deposit rate has to be compared against inflation before calling it a gain - earning 5% while inflation runs at 6% is a loss of purchasing power.",
  },
  5132: {
    category: "Foundations - New to the field",
    question: "What is the fundamental difference between a share and a bond?",
    options: [
      "A share is ownership; a bond is a loan",
      "A share is always safer than a bond from the same company",
      "A share has a fixed maturity and a bond does not",
      "A bond carries voting rights and a share does not",
    ],
    explanation:
      "A bondholder is a creditor: paid a fixed interest and ranked ahead in a bankruptcy. A shareholder is an owner: entitled to whatever is left after the creditors are paid, which is why the upside is larger and so is the risk.",
  },
  5133: {
    category: "Foundations - New to the field",
    question: "What does portfolio diversification mean?",
    options: [
      "Spreading capital across assets that move together as little as possible",
      "Buying a great many shares in one large company",
      "Switching the whole portfolio to cash when the market falls",
      "Investing only in the fastest-growing sector",
    ],
    explanation:
      "The key phrase is MOVE TOGETHER AS LITTLE AS POSSIBLE, not simply many. Holding twenty names in one sector means all twenty fall when that sector struggles - a portfolio that looks diversified but is really a single bet.",
  },
  5134: {
    category: "Foundations - New to the field",
    question: "Why start investing early even with a small amount?",
    options: [
      "Because time is the strongest factor in compounding",
      "Because beginners always have their trading fees waived",
      "Because the market always rises, so any entry point profits",
      "Because small amounts are exempt from investment income tax",
    ],
    explanation:
      "Every year of delay is a year cut off the far end of the compounding curve - the steepest part. A small sum started at twenty-five usually beats a larger one started at thirty-five, even though less money went in.",
  },
};
