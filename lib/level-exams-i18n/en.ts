// Bản dịch tiếng Anh của kỳ thi thăng cấp. Xem ./index.ts cho các quy tắc -
// đáng nhắc lại một điều: `options` là POSITIONAL, phần tử i ở đây phải dịch
// phần tử i của `lib/level-exams.ts`. Không có `correctIndex` trong file này.
import type { LevelExamTranslations } from "./index";

export const LEVEL_EXAMS_EN: LevelExamTranslations = {
  2: {
    title: "Entry Exam - Level 2: Finance Student",
    questions: {
      l2_q1: {
        question: "Which of these assets is the most liquid on the balance sheet?",
        options: [
          "Finished inventory, ready to ship to the customer",
          "A demand bank deposit you can withdraw and use right away",
          "A customer receivable falling due within 30 days",
          "Investment property that is rented out steadily",
        ],
        explanation:
          "A demand deposit is usable instantly - nothing has to be sold or collected first. Inventory and property both take time to turn into cash.",
      },
      l2_q2: {
        question: "The 50/30/20 rule puts 20% of income towards what?",
        options: [
          "Wants, such as entertainment and travel",
          "Saving and investing for long-term goals",
          "Essentials: rent, food and getting around",
          "Interest on the consumer loans you already have",
        ],
        explanation:
          "50% for needs, 30% for wants, 20% for saving and investing. That 20% should be moved automatically the moment your salary arrives.",
      },
      l2_q3: {
        question: "Which formula gives gross profit?",
        options: [
          "Net revenue minus the cost of goods sold in the period",
          "Net revenue minus all selling expenses incurred",
          "Pre-tax profit plus corporate income tax added back",
          "Net revenue minus general and administrative expenses",
        ],
        explanation:
          "Gross profit = net revenue - cost of goods sold. It measures how well the making or buying step works, before any other operating cost.",
      },
      l2_q4: {
        question: "How many months of spending should an emergency fund hold?",
        options: [
          "One to two weeks of spending is enough",
          "Three to six months of the household's essential spending",
          "At least three years of spending to be truly safe",
          "Exactly one month of your own income",
        ],
        explanation:
          "Three to six months carries you through job loss or illness without having to sell investments at the worst possible moment.",
      },
      l2_q5: {
        question: "How does inflation affect the purchasing power of cash?",
        options: [
          "It raises purchasing power because the nominal value goes up",
          "It lowers what your money can buy as time passes",
          "No effect, as long as the money sits in a savings account",
          "It only affects borrowers, not people holding cash",
        ],
        explanation:
          "The same amount of money buys fewer goods over time. A savings account only helps if the rate beats inflation.",
      },
      l2_q6: {
        question: "What is the core difference between simple and compound interest?",
        options: [
          "Compound interest earns interest on the interest already generated",
          "Compound interest always carries a higher headline rate than simple",
          "Simple interest is only for deposits, compound only for loans",
          "Simple interest pays at the end of the term, compound pays monthly",
        ],
        explanation:
          "Simple interest is always computed on the original principal. Compound adds interest to the principal and computes again, so the gap between the two widens fast over time.",
      },
      l2_q7: {
        question: "A car bought on instalments for personal travel is which of these?",
        options: [
          "An asset, because it has value and can be resold when cash is needed",
          "A liability in practice, because it produces an outgoing cash flow every month",
          "An asset, because it is recorded on your personal balance sheet",
          "Neither, until the loan has been fully repaid",
        ],
        explanation:
          "The car gives you utility but keeps taking money out: instalments, fuel, servicing, insurance - while losing value the whole time.",
      },
      l2_q8: {
        question: "What does the basic accounting equation state?",
        options: [
          "Assets equal Liabilities plus Owners' Equity",
          "Assets equal Revenue minus all expenses in the period",
          "Owners' Equity equals Assets plus Liabilities",
          "Liabilities equal Assets plus Owners' Equity",
        ],
        explanation:
          "Every dong of assets came from somewhere: it was either borrowed or put in by the owners. That is why the two sides always balance.",
      },
      l2_q9: {
        question: "A company reports a profit but cannot pay salaries. What is the most likely cause?",
        options: [
          "Revenue has been recognised but customers have not paid yet",
          "The reported profit must certainly have been recorded wrongly",
          "The company paid the whole profit out to shareholders in the period",
          "Depreciation for the period was recorded far too low",
        ],
        explanation:
          "Accounting recognises revenue when the obligation arises, not when the cash lands. Profit is an accounting opinion; the bank balance is the fact.",
      },
      l2_q10: {
        question: "The debt snowball method pays down which debt first?",
        options: [
          "The one with the highest rate, to save the most interest",
          "The one with the smallest remaining balance on the list",
          "The one with the longest remaining term on the list",
          "The bank loan rather than the loan from a family member",
        ],
        explanation:
          "The snowball clears the smallest balance first to build momentum. It is the avalanche method that targets the highest rate and saves more arithmetically.",
      },
      l2_q11: {
        question: "How is the real interest rate derived from the nominal rate?",
        options: [
          "Take the nominal rate and subtract the inflation rate",
          "Take the nominal rate and add the inflation rate for the period",
          "Multiply the nominal rate by the number of years to get total interest",
          "Divide the nominal rate by the number of compounding periods in a year",
        ],
        explanation:
          "The real rate is roughly the nominal rate minus inflation. Earning 6% while inflation runs at 5% lifts your purchasing power by about 1% - that is the number that says how much richer you actually got.",
      },
      l2_q12: {
        question: "What is the opportunity cost of spending 100 million in cash on a car?",
        options: [
          "The return given up on the best alternative you passed over",
          "The registration tax and number-plate fees you have to pay",
          "The fuel and monthly servicing you now have to cover",
          "The value the car loses to depreciation over time",
        ],
        explanation:
          "Opportunity cost is the value of the best alternative forgone. Fuel, servicing and depreciation are real costs but a different kind - they arise whether you paid cash or took a loan.",
      },
      l2_q13: {
        question: "What is the core difference between good debt and bad debt?",
        options: [
          "Good debt funds an asset that can produce income or gain value",
          "Good debt always carries a rate below the bank's own deposit rate",
          "Good debt is long-term borrowing, bad debt is short-term borrowing",
          "Good debt comes from banks, bad debt comes from finance companies",
        ],
        explanation:
          "The line is drawn by what the borrowing funds. Borrowing to buy something that produces cash flow or raises your earning power is good debt; borrowing to consume something that loses value fast is bad debt, whatever the rate or the term.",
      },
      l2_q14: {
        question: "How is a personal savings rate calculated?",
        options: [
          "Money saved divided by total income over the same period",
          "Money saved divided by total spending over the same period",
          "The savings account balance divided by total assets held",
          "Income minus spending, divided by the number of months saved",
        ],
        explanation:
          "Savings rate = savings / income. It matters more than the absolute amount, because it says what share of what you earn you actually keep - and it compares across very different income levels.",
      },
      l2_q15: {
        question: "Why is life insurance considered a risk-management tool rather than an investment?",
        options: [
          "Because its main purpose is transferring the risk of lost income to the insurer",
          "Because the return on an insurance contract is always below a bank deposit",
          "Because the law does not permit premiums to be invested at all",
          "Because an insurance contract has no surrender value under any circumstances",
        ],
        explanation:
          "Insurance exists to move a large, hard-to-bear risk - lost income, death, critical illness - onto someone else, at the cost of a steady premium. The savings component in some products is a secondary function.",
      },
      l2_q16: {
        question: "How do fixed costs differ from variable costs when you budget?",
        options: [
          "Fixed costs barely move month to month and are hard to cut in the short run",
          "Fixed costs are always larger than variable costs each month",
          "Fixed costs are only payments to banks and to the state",
          "Fixed costs are recorded at year end, variable ones monthly",
        ],
        explanation:
          "Rent, instalments and insurance are fixed - cutting them means changing how you live. Food, entertainment and shopping are variable - they can be cut today. Telling the two apart shows where saving is actually possible.",
      },
      l2_q17: {
        question: "What is the best description of passive income?",
        options: [
          "Cash flow you receive without trading your working hours for it",
          "Income that is exempt from personal income tax under the rules",
          "Bonuses and allowances received on top of base monthly salary",
          "Income from a second job worked in the evenings",
        ],
        explanation:
          "What defines passive income is that it is detached from hours worked: rent, dividends, bond coupons. An evening job is still time traded for money, so it is active income.",
      },
      l2_q18: {
        question: "What does the time value of money state?",
        options: [
          "A dong today is worth more than a dong received in the future",
          "The longer money sits in an account, the lower its nominal value falls",
          "The value of money only changes when the central bank moves rates",
          "Cash and term deposits always have equal value at every point in time",
        ],
        explanation:
          "A dong today is worth more because it can be put to work immediately. This is the foundation of every discounted cash flow, from bond pricing to project appraisal.",
      },
      l2_q19: {
        question: "What does zero-based budgeting require?",
        options: [
          "Assigning every dong of income to a specific line, saving and investing included",
          "Spending exactly what you spent last month, to keep things stable",
          "Bringing the current account balance to 0 on the last day of each month",
          "Budgeting only for items above a million dong and ignoring small ones",
        ],
        explanation:
          "Zero-based means every dong of income is given a job until the unassigned amount reaches 0 - saving and investing are lines of their own, not whatever happens to be left at month end.",
      },
      l2_q20: {
        question: "Why should an emergency fund sit apart from your day-to-day account?",
        options: [
          "It cuts the chance of spending it on something that is not an emergency, and shows the true balance",
          "Because the law requires a reserve fund to sit in a separate account",
          "Because a separate account always pays a substantially higher rate",
          "Because money in a spending account is charged much higher management fees",
        ],
        explanation:
          "An emergency fund sharing the spending account gets eaten away without anyone noticing. Separating it adds a small psychological barrier, and lets you see how much is genuinely ready for the unexpected.",
      },
    },
  },
  3: {
    title: "Insight Exam - Level 3: Practical Investor",
    questions: {
      l3_q1: {
        question: "What does a P/E of 15x mean?",
        options: [
          "The company is losing 15% on its equity for the period",
          "Investors are paying 15 dong for every dong of net profit",
          "The share price is 15% of book value per share",
          "The dividend yield to investors is 15% a year",
        ],
        explanation:
          "P/E = price / EPS. Read another way, it is the number of years to break even if profit stays flat.",
      },
      l3_q2: {
        question: "What makes compounding work hardest for you?",
        options: [
          "The larger the starting capital, the stronger the effect",
          "A long holding period with returns continuously reinvested",
          "Trading as often as possible within the session",
          "Using margin leverage up to the maximum allowed",
        ],
        explanation:
          "A = P(1+r)^t is exponential in the number of periods t, so time matters far more than the size of the initial capital.",
      },
      l3_q3: {
        question: "What does an excessively high debt-to-equity ratio indicate?",
        options: [
          "The company faces higher inflation pressure than its peers",
          "Heavy leverage risk, and distress if rates rise",
          "The company barely uses outside borrowing at all",
          "The company's free cash flow is very abundant",
        ],
        explanation:
          "A high D/E means heavy dependence on borrowing, so interest expense eats profit quickly once rates start climbing.",
      },
      l3_q4: {
        question: "What does FOMO in investing typically lead to?",
        options: [
          "Chasing the price at the top because the crowd is buying",
          "Dumping the entire portfolio the moment the market bottoms",
          "Risk management becoming so cautious that chances are missed",
          "More accurate valuation, because you follow the market closely",
        ],
        explanation:
          "FOMO makes investors chase a stock that has just run hot - paying the highest price at exactly the moment risk is greatest.",
      },
      l3_q5: {
        question: "P/B is best suited to valuing which kind of business?",
        options: [
          "Software firms whose main asset is their people",
          "Banks and financial institutions, whose assets are easy to value",
          "Media businesses living off advertising revenue",
          "Biotech startups with no stable revenue yet",
        ],
        explanation:
          "P/B suits businesses whose value sits in assets recorded on the balance sheet - banks being the classic case.",
      },
      l3_q6: {
        question: "What does ROE measure?",
        options: [
          "The return generated on each dong of shareholders' equity",
          "Profit as a share of the total assets the company holds",
          "The percentage of revenue left after every cost is deducted",
          "How fast net profit grew against the same period last year",
        ],
        explanation:
          "ROE = net profit / shareholders' equity. The second option describes ROA; the third is the net profit margin.",
      },
      l3_q7: {
        question: "Which kind of risk does diversification reduce?",
        options: [
          "Systematic risk, which moves the whole market at once",
          "The risk specific to each individual company in the portfolio",
          "Both systematic risk and each company's own specific risk",
          "Inflation risk eroding the purchasing power of the whole portfolio",
        ],
        explanation:
          "Diversification cancels out company-specific risk. Systematic risk cannot be removed no matter how many names you hold.",
      },
      l3_q8: {
        question: "When market rates rise, what happens to the price of bonds already outstanding?",
        options: [
          "It rises, because bonds become more attractive to investors",
          "It falls, and falls harder the longer the remaining term",
          "It stays flat, because the coupon was fixed at issue",
          "It moves with rates one-for-one in the same direction",
        ],
        explanation:
          "An older bond pays a coupon below the new market level, so its price has to drop until the yield on buying it matches a newly issued bond.",
      },
      l3_q9: {
        question: "What is the main difference between an index ETF and an active fund?",
        options: [
          "An ETF tracks an index, so its management fee is far lower",
          "An ETF always delivers a higher return than an active fund",
          "Active funds are not permitted to hold listed shares",
          "An ETF can only be traded once, at the end of each session",
        ],
        explanation:
          "An ETF follows a ready-made basket, so running costs are low. Nothing guarantees it returns more than an active fund.",
      },
      l3_q10: {
        question: "On the ex-dividend date, how is the reference price adjusted?",
        options: [
          "Unchanged, because the dividend is paid in the company's cash",
          "Reduced by the amount of the dividend about to be paid",
          "Increased by exactly the dividend shareholders are about to receive",
          "Set by the exchange, depending on how liquid the stock is",
        ],
        explanation:
          "The dividend cash leaves the company, so the value of each share falls by the same amount. An investor is not richer merely for receiving a dividend.",
      },
      l3_q11: {
        question: "How does paying a cash dividend affect a company's equity?",
        options: [
          "It reduces equity, because retained earnings are drawn back out",
          "It raises equity, because it shows the business is profitable",
          "It leaves equity untouched and only affects the income statement",
          "It raises total assets, because shareholders usually reinvest",
        ],
        explanation:
          "Paying a cash dividend takes money out of the company: assets fall and retained earnings within equity fall by the same amount. It is a distribution of profit, not a cost, so it never passes through the income statement.",
      },
      l3_q12: {
        question: "How does diluted EPS differ from basic EPS?",
        options: [
          "It also counts shares that could arise from options and convertibles",
          "Diluted EPS counts only profit after all preferred dividends are removed",
          "Diluted EPS uses the closing share count instead of the period average",
          "Diluted EPS strips out one-off, non-recurring profits",
        ],
        explanation:
          "Diluted EPS assumes every instrument convertible into shares is converted, swelling the denominator. It is the more conservative number: earnings per share under the worst case for dilution.",
      },
      l3_q13: {
        question: "Why can a negative P/E not be used to compare valuations?",
        options: [
          "Because the company is loss-making, so the ratio loses economic meaning in comparison",
          "Because accounting rules forbid publishing a P/E while a company is loss-making",
          "Because a negative P/E always means the company will go bankrupt shortly",
          "Because the exchange automatically suspends any stock with a negative P/E",
        ],
        explanation:
          "A negative P/E means the denominator, earnings, is negative. A P/E of -5 is not cheaper than -20; the ordering stops meaning anything. For loss-making companies, multiples on revenue or EBITDA are usually more useful.",
      },
      l3_q14: {
        question: "What does short selling a stock mean?",
        options: [
          "Borrowing shares to sell first, hoping to buy back cheaper and return them",
          "Placing a sell order larger than the number of shares actually held",
          "Selling a stock in the same session in which it was bought",
          "Selling a stock below that day's reference price",
        ],
        explanation:
          "Short selling reverses the usual order: sell first with borrowed shares, buy back later. The profit comes when the price falls, but the loss is theoretically unlimited, because a price can rise without limit.",
      },
      l3_q15: {
        question: "How is a company's market capitalisation calculated?",
        options: [
          "The price of one share multiplied by the total shares outstanding",
          "Total assets on the balance sheet minus total liabilities",
          "After-tax profit multiplied by the industry's average P/E",
          "Registered charter capital plus cumulative retained earnings",
        ],
        explanation:
          "Market cap is what the market is currently paying for the whole of the equity. It differs from book value (assets minus liabilities) - the gap between the two reflects what the market expects of the company's future.",
      },
      l3_q16: {
        question: "What problem does dollar-cost averaging solve for an investor?",
        options: [
          "It cuts the risk of picking the wrong moment by spreading orders evenly over time",
          "It guarantees the average purchase price is always below the market price",
          "It raises expected return above lump-sum investing in every market",
          "It removes all risk of loss when the market enters a deep decline",
        ],
        explanation:
          "Averaging in handles the psychology and the timing risk; it promises no extra return. In a long rising market, lump-sum investing usually does better in pure expected-value terms.",
      },
      l3_q17: {
        question: "A stock's liquidity is judged mainly by what?",
        options: [
          "Average trading volume and how wide the bid-ask spread is",
          "The market capitalisation of the company that issued the stock",
          "The cash dividend the company pays shareholders each year",
          "How many brokerages publish research reports on the stock",
        ],
        explanation:
          "Liquidity is the ability to trade size without pushing the price far. Steady volume and a narrow bid-ask spread are the two most direct signs.",
      },
      l3_q18: {
        question: "Why is an unusually high dividend yield sometimes a warning sign?",
        options: [
          "Because it may come from a collapsed share price rather than a raised dividend",
          "Because a company paying a high dividend is certainly breaching profit-distribution rules",
          "Because a high dividend yield always brings a higher tax bill for shareholders",
          "Because large funds are barred from holding stocks yielding above average",
        ],
        explanation:
          "Dividend yield is the dividend divided by the price. A denominator that has collapsed because the market fears what is coming pushes the ratio up too - and that dividend may be cut next period.",
      },
      l3_q19: {
        question: "How does an open-ended fund differ from a stock in how it trades?",
        options: [
          "It is bought and sold at the net asset value struck after the close, not matched continuously",
          "Open-ended fund certificates may be traded only once per financial year",
          "Open-ended fund certificates have a fixed price regardless of performance",
          "Open-ended fund certificates may not be sold back to the managing company",
        ],
        explanation:
          "An open-ended fund issues and redeems certificates at the NAV determined after the session closes, so you do not know the exact price when you place the order. Stocks and ETFs match continuously on supply and demand.",
      },
      l3_q20: {
        question: "How does systematic risk differ from unsystematic risk?",
        options: [
          "Systematic risk hits the whole market, so diversification cannot remove it",
          "Systematic risk only appears in companies with a large market capitalisation",
          "Systematic risk always causes greater damage than unsystematic risk, in every case",
          "Systematic risk exists only in emerging markets, never in developed ones",
        ],
        explanation:
          "Recessions, interest rates and wars move every asset at once, so holding another name does not help. Risk specific to one company can be removed by holding many.",
      },
    },
  },
  4: {
    title: "Advanced Exam - Level 4: Financial Analyst",
    questions: {
      l4_q1: {
        question: "In a DCF model, what role does WACC play?",
        options: [
          "The discount rate that brings future cash flows back to today",
          "The long-term growth rate used for the terminal value",
          "The target margin the business needs to hit",
          "The return shareholders actually received in the period",
        ],
        explanation:
          "WACC is the blended cost of both debt and equity, so it is the right discount rate for cash flows that belong to the whole firm.",
      },
      l4_q2: {
        question: "What does an ROE of 25% tell you?",
        options: [
          "The company retains 25% of profit for reinvestment",
          "Every 100 dong of equity produces 25 dong of net profit",
          "Revenue grew 25% against the same period last year",
          "The net margin on net revenue reached 25%",
        ],
        explanation:
          "ROE = net profit / shareholders' equity. It measures how well the capital belonging to shareholders is being used.",
      },
      l4_q3: {
        question: "What does a beta of 1.5 mean?",
        options: [
          "The stock moves the same way as the market, but harder",
          "The stock is certain to beat the market by 50% a year",
          "The stock moves in the opposite direction to the index",
          "The company's specific risk is 1.5x the industry average",
        ],
        explanation:
          "Beta measures sensitivity to the market: when the index moves 1%, the stock tends to move about 1.5% the same way. It promises nothing about returns.",
      },
      l4_q4: {
        question: "How does FCFF differ from FCFE?",
        options: [
          "FCFF belongs to lenders and shareholders both; FCFE only to shareholders",
          "FCFF is measured before depreciation and FCFE after it",
          "FCFF is for listed companies, FCFE for unlisted ones",
          "FCFF is always smaller than FCFE, having deducted all interest",
        ],
        explanation:
          "FCFF is the cash flow to every capital provider, so it is discounted at WACC. FCFE has already met the debt obligations, so it is discounted at the cost of equity.",
      },
      l4_q5: {
        question: "What does a current ratio below 1.0 warn about?",
        options: [
          "The company is losing money in its main operations",
          "Current assets do not cover the current liabilities coming due",
          "The company uses far less leverage than its industry",
          "Inventory makes up too large a share of total assets",
        ],
        explanation:
          "Current ratio = current assets / current liabilities. Below 1 means the obligations of the next 12 months exceed the resources on hand to meet them.",
      },
      l4_q6: {
        question: "What share of a DCF's value does the terminal value usually carry?",
        options: [
          "Under 10%, since it is only the remainder after the forecast period",
          "Usually more than half, so its assumptions dominate the result",
          "Exactly the same as the discounted cash flows of the forecast period",
          "Negligible, if the forecast period runs five years or more",
        ],
        explanation:
          "This is why a small change to the long-term growth rate or the exit multiple moves the valuation so violently.",
      },
      l4_q7: {
        question: "What is the relationship between enterprise value and equity value?",
        options: [
          "Enterprise value equals equity plus debt minus cash",
          "Enterprise value equals equity plus all current assets",
          "The two are equal for any listed company",
          "Equity value equals enterprise value plus debt",
        ],
        explanation:
          "A buyer of the whole business pays the shareholders and takes on the debt, but gets back the cash sitting on the balance sheet.",
      },
      l4_q8: {
        question: "Which item does EBITDA leave out, in a way that can mislead?",
        options: [
          "Selling expenses and general administrative expenses for the period",
          "The capital spending needed to keep the business running",
          "Financial income and one-off, non-recurring gains",
          "The cost of every product sold during the period",
        ],
        explanation:
          "EBITDA adds depreciation back, so for a capital-intensive business it hides the money that has to be spent again and again just to keep the assets working.",
      },
      l4_q9: {
        question: "Inventory turnover has risen sharply year on year. What does that usually show?",
        options: [
          "Goods are selling faster, so less capital is stuck in the warehouse",
          "The company is stocking up ahead of the peak season",
          "The cost of goods sold has fallen considerably from before",
          "The company is stretching out payments to its suppliers",
        ],
        explanation:
          "Read it with context: turnover can also rise because stock is being cleared at a discount, so check the gross margin alongside it.",
      },
      l4_q10: {
        question: "How does a higher depreciation charge affect cash flow?",
        options: [
          "It lowers cash flow by exactly the extra depreciation",
          "It raises cash flow, through the tax it saves",
          "No effect, because it is a non-cash item",
          "It lowers cash flow, as after-tax profit falls by the same amount",
        ],
        explanation:
          "Depreciation is a non-cash charge but it is deductible for tax, so it creates a tax shield and actual cash flow goes up.",
      },
      l4_q11: {
        question: "What is the problem with comparing P/E across two companies with very different leverage?",
        options: [
          "No problem, since P/E is already normalised by earnings",
          "P/E is affected by interest expense, so it is hard to compare directly",
          "P/E only works for companies that carry no debt at all",
          "The P/E of a heavily borrowed company is systematically higher",
        ],
        explanation:
          "Net profit sits below interest expense, so leverage distorts the denominator. Across two different capital structures, EV/EBITDA is the fairer comparison.",
      },
      l4_q12: {
        question: "How does CAPM determine the cost of equity?",
        options: [
          "The risk-free rate plus beta times the market risk premium",
          "After-tax profit divided by the book value of equity",
          "The dividend payout ratio plus expected revenue growth",
          "The average lending rate of the large commercial banks",
        ],
        explanation:
          "CAPM sets the cost of equity at the risk-free rate plus a risk premium scaled by beta. It is the minimum return shareholders demand for taking on the company's systematic risk.",
      },
      l4_q13: {
        question: "How is net working capital calculated?",
        options: [
          "Current assets minus current liabilities",
          "Total assets minus all liabilities of the company",
          "Cash plus financial investments that can be sold immediately",
          "Inventory plus receivables minus payables to suppliers",
        ],
        explanation:
          "Net working capital = current assets - current liabilities, measuring the long-term capital tied up in day-to-day operations. The last option is the operating working-capital cycle, a narrower measure.",
      },
      l4_q14: {
        question: "Why is depreciation added back when computing operating cash flow?",
        options: [
          "Because it is an accounting charge that moves no money out of the company",
          "Because it is already deducted for tax, so it need not be counted twice",
          "Because it is always offset by new capital spending in the same period",
          "Because accounting standards require depreciation to be shown under investing",
        ],
        explanation:
          "Depreciation reduces accounting profit, but the money left when the asset was bought. Going from profit to cash flow means adding this non-cash item back.",
      },
      l4_q15: {
        question: "Gross margin is falling while revenue is still growing. What does that usually reflect?",
        options: [
          "Input costs are rising faster than selling prices",
          "The company has sharply cut selling and administrative expenses",
          "The company has just booked a large one-off financial gain",
          "The number of shares outstanding has just been increased",
        ],
        explanation:
          "Gross margin depends on revenue and cost of goods sold alone. Revenue up with the margin squeezed means the company is sacrificing price, or absorbing higher input costs, to keep growing.",
      },
      l4_q16: {
        question: "In a DCF, how does raising the long-term growth assumption affect the valuation?",
        options: [
          "It lifts the terminal value and with it the whole enterprise value",
          "It lowers the terminal value, because cash flows are discounted harder",
          "No effect, because the terminal value is fixed from the start",
          "It only affects the forecast-period cash flows, not the terminal value",
        ],
        explanation:
          "Terminal value usually comes from the Gordon formula, whose denominator is WACC minus the growth rate. Raising g shrinks the denominator and the terminal value swells fast - it is the model's most sensitive assumption.",
      },
      l4_q17: {
        question: "What does a high receivables turnover ratio mean?",
        options: [
          "The company collects from customers quickly, with little capital tied up",
          "The company is selling more on credit to push revenue",
          "The company has an unusually high rate of bad customer debt",
          "The company is stockpiling inventory while it waits for prices to rise",
        ],
        explanation:
          "Receivables turnover is revenue divided by average receivables. A high figure means a short collection cycle - good for cash flow, though an extreme one can mean credit terms so tight they cost you customers.",
      },
      l4_q18: {
        question: "Why should accounting profit not stand in for cash flow when appraising a project?",
        options: [
          "Because profit is shaped by accounting estimates and non-cash items",
          "Because accounting profit is always smaller than actual cash flow, in every case",
          "Because accounting standards forbid using profit in project appraisal models",
          "Because profit is only determined at the financial year end, too late to decide",
        ],
        explanation:
          "Depreciation, provisions and the timing of revenue recognition are all accounting choices that pull profit away from real money. A project is paid for in cash, so NPV has to rest on cash flow.",
      },
      l4_q19: {
        question: "Through what mechanism does financial leverage amplify ROE?",
        options: [
          "Debt replaces equity, shrinking the denominator while the profit still belongs to shareholders",
          "It lowers interest expense, because banks give better rates on large loans",
          "It raises revenue, because there is more capital to expand the business with",
          "It cuts corporate income tax to the lowest rate the rules allow",
        ],
        explanation:
          "Borrowing in place of equity shrinks the ROE denominator. If the return on assets beats the borrowing rate, the whole difference accrues to shareholders - but the same mechanism amplifies losses too.",
      },
      l4_q20: {
        question: "Comparing two companies in one industry, why look at EV/EBIT alongside EV/EBITDA?",
        options: [
          "Because EBIT keeps depreciation in, exposing the business that eats fixed assets",
          "Because EBIT always gives a lower multiple, making cheap stocks easier to find",
          "Because EBITDA is not recognised as an official measure by accounting standards",
          "Because EV/EBIT removes the effect of capital structure on valuation entirely",
        ],
        explanation:
          "EBITDA adds depreciation back, treating a software company and a steel mill the same by accident. EBIT keeps it in, which exposes who has to reinvest heavily just to keep operating.",
      },
    },
  },
  5: {
    title: "Rigorous Exam - Level 5: Seasoned Financial Adviser",
    questions: {
      l5_q1: {
        question: "What are the three sections of a cash flow statement?",
        options: [
          "Cash flow from operating, from investing and from financing",
          "Short-term, medium-term and long-term cash flow",
          "Cash flow from revenue, from costs and from tax payable",
          "Cash received, cash paid and the closing balance",
        ],
        explanation:
          "Three core activities: operating, investing and financing. The split tells you whether the money came from running the business or from borrowing.",
      },
      l5_q2: {
        question: "What is the central bank's main purpose in raising its policy rate?",
        options: [
          "Making borrowing dearer and cooling demand to hold inflation down",
          "Encouraging companies to expand investment and production",
          "Weakening the local currency to support exports",
          "Pumping more liquidity into the commercial banking system",
        ],
        explanation:
          "Higher rates make borrowing dearer and saving more attractive, so consumption and investment fall and price pressure eases.",
      },
      l5_q3: {
        question: "The three-factor DuPont model breaks ROE into which components?",
        options: [
          "Net margin, asset turnover and financial leverage",
          "Revenue, operating costs and corporate income tax",
          "Current assets, non-current assets and total equity",
          "Revenue growth, gross margin and interest expense",
        ],
        explanation:
          "The decomposition says whether a high ROE comes from selling profitably, from using assets well, or simply from borrowing a lot - three very different causes.",
      },
      l5_q4: {
        question: "When does a margin call happen?",
        options: [
          "When the margin ratio drops below the required maintenance level",
          "When the investor asks for a higher margin borrowing limit",
          "When the broker lowers its margin lending rate",
          "When a stock in the portfolio is put under a warning notice",
        ],
        explanation:
          "A falling price shrinks your own equity in the position. Once the margin ratio breaks the maintenance threshold, the broker demands more cash or force-sells.",
      },
      l5_q5: {
        question: "What does a positive NPV on a project mean?",
        options: [
          "The project pays back sooner than originally expected",
          "The present value of cash inflows exceeds the capital invested",
          "The project is certain to be profitable in every market scenario",
          "The project's internal rate of return is above inflation",
        ],
        explanation:
          "NPV > 0 means the project adds value after fully charging for the opportunity cost of capital through the discount rate.",
      },
      l5_q6: {
        question: "What is IRR's main weakness against NPV?",
        options: [
          "IRR cannot be computed for projects lasting over ten years",
          "IRR can have several solutions when cash flows change sign repeatedly",
          "IRR always comes out lower than NPV, so it is too conservative",
          "IRR only applies to projects investing in tangible fixed assets",
        ],
        explanation:
          "IRR also implicitly assumes cash flows are reinvested at the IRR itself, which is usually unrealistic. NPV adds value up, so it ranks projects more reliably.",
      },
      l5_q7: {
        question: "What does a bond's duration measure?",
        options: [
          "The number of years left until the bond matures",
          "How sensitive the bond's price is to a change in interest rates",
          "The total coupon interest received until maturity",
          "The probability that the issuer defaults on the principal",
        ],
        explanation:
          "The higher the duration, the more the price moves with rates. It equals the remaining term only for a zero-coupon bond.",
      },
      l5_q8: {
        question: "What does the Sharpe ratio measure?",
        options: [
          "Excess return per unit of risk taken on",
          "The absolute return the portfolio achieved in a year",
          "The weight of stocks against bonds in the portfolio",
          "The gap between the portfolio's return and the risk-free rate",
        ],
        explanation:
          "Sharpe = (portfolio return - risk-free rate) / standard deviation. The last option is only the numerator, with nothing dividing by risk.",
      },
      l5_q9: {
        question: "What is the effect of combining two negatively correlated assets in a portfolio?",
        options: [
          "Total risk falls below the average of the two assets",
          "Expected return rises above either asset on its own",
          "Portfolio risk equals exactly the average risk of the two",
          "Both assets will rise and fall in the same rhythm",
        ],
        explanation:
          "Negative correlation means one asset tends to rise when the other falls, so the swings of the combined portfolio are smoothed out.",
      },
      l5_q10: {
        question: "What does periodic portfolio rebalancing achieve?",
        options: [
          "It returns weights to target, meaning you trim what has run up",
          "It guarantees the portfolio beats its benchmark index",
          "It removes market risk from the portfolio entirely",
          "It cuts trading costs by reducing the number of trades a year",
        ],
        explanation:
          "Rebalancing keeps risk at the level you actually chose. It promises no outperformance and it cannot erase market risk.",
      },
      l5_q11: {
        question: "What does the opportunity cost of capital mean in project appraisal?",
        options: [
          "The bank rate currently charged on the company's borrowing",
          "The return on the best alternative that was passed over",
          "All the money actually spent to get the project running",
          "Expected inflation over the life of the project",
        ],
        explanation:
          "Capital always has an alternative use. The discount rate has to reflect that return, or the project will look better than it is.",
      },
      l5_q12: {
        question: "What is the payback period's basic weakness against NPV?",
        options: [
          "It ignores every cash flow arising after the payback point",
          "It cannot be computed for projects with very large upfront capital",
          "It always contradicts NPV, for every kind of project",
          "It only works for projects with identical cash flows each year",
        ],
        explanation:
          "Payback stops counting the moment the capital is recovered, so a project that earns heavily later is rated the same as one that dies right after. It also does not discount cash flows for time.",
      },
      l5_q13: {
        question: "When two mutually exclusive projects give conflicting NPV and IRR answers, which do you follow?",
        options: [
          "NPV, because it measures the absolute value added to the owners directly",
          "IRR, because it shows the return earned on each dong invested",
          "The project with the shorter payback, to cut liquidity risk",
          "The project needing less capital, to preserve resources",
        ],
        explanation:
          "NPV wins when the two conflict, because the goal is maximising value, not maximising a rate. IRR also assumes cash flows are reinvested at the IRR itself, which is rarely realistic.",
      },
      l5_q14: {
        question: "How does the depreciation tax shield create value?",
        options: [
          "Depreciation lowers taxable income, so less tax is paid in actual cash",
          "Depreciation is refunded directly from the state budget at year end",
          "Depreciation raises the carrying value of fixed assets on the balance sheet",
          "Depreciation lets the company defer principal repayments to the bank",
        ],
        explanation:
          "Depreciation costs no cash but is deductible for tax, so it keeps real money inside the company. The shield is worth roughly depreciation times the tax rate.",
      },
      l5_q15: {
        question: "How does the quick ratio differ from the current ratio?",
        options: [
          "The quick ratio takes inventory out of the numerator",
          "The quick ratio counts only debts due within three months",
          "The quick ratio uses total assets instead of current assets",
          "The quick ratio is computed on the market value of assets",
        ],
        explanation:
          "Inventory is the hardest current asset to turn into cash quickly, especially when the business is struggling. Removing it gives a harsher picture of short-term solvency.",
      },
      l5_q16: {
        question: "What does prolonged high inflation do to the holder of a fixed-rate bond?",
        options: [
          "It erodes the real value of the coupons and the principal received later",
          "It raises the real value of the coupons, as the issuer must compensate for inflation",
          "No effect, because the coupon was fixed at the moment of issue",
          "It forces the issuer to redeem the bond early under the rules",
        ],
        explanation:
          "The coupon is fixed in nominal terms while inflation eats the purchasing power of every dong received. This is why long-dated fixed-rate bonds suffer worst in an inflationary environment.",
      },
      l5_q17: {
        question: "Why can a fast-growing company still be desperately short of cash?",
        options: [
          "Because inventory and receivables have to swell before the money comes in",
          "Because fast-growing companies are legally restricted from bank borrowing",
          "Because revenue growth always drags the gross margin below zero",
          "Because accounting standards force revenue to be recognised later than the cash arrives",
        ],
        explanation:
          "Selling more means holding more stock and extending more credit - the money goes out first and comes back later. This is why many companies with handsome profits die of an empty bank account.",
      },
      l5_q18: {
        question: "What does the efficient frontier show in portfolio theory?",
        options: [
          "The set of portfolios with the highest expected return at each level of risk",
          "The list of assets whose beta is close to one in the market",
          "The maximum loss a portfolio can suffer in a single session",
          "The asset weights the regulator recommends for pension funds",
        ],
        explanation:
          "Every point on the frontier is a portfolio that cannot be improved: a higher return demands accepting higher risk. Any portfolio below the frontier is inefficient.",
      },
      l5_q19: {
        question: "In what situation does a bond's reinvestment risk arise?",
        options: [
          "When the coupons received have to be reinvested at a lower rate than before",
          "When the issuer becomes unable to repay the principal at maturity",
          "When the bond is downgraded partway through the holding period",
          "When there is no buyer for the bond on the secondary market",
        ],
        explanation:
          "Yield to maturity implicitly assumes every coupon is reinvested at that same rate. Falling rates break the assumption, so the realised total return comes in below the original YTM.",
      },
      l5_q20: {
        question: "Why is asset allocation usually considered a bigger decision than picking individual stocks?",
        options: [
          "Because the weights between asset classes drive most of the variation in returns",
          "Because picking individual stocks is legally restricted for retail investors",
          "Because asset classes always return more than individual stocks, in every period",
          "Because asset allocation incurs no trading costs while stock picking does",
        ],
        explanation:
          "Empirical work shows the stock-bond-cash mix drives most of the variation in returns over time, far more than which particular name was chosen inside each class.",
      },
    },
  },
  6: {
    title: "Peak Exam - Level 6: Finance Adept",
    questions: {
      l6_q1: {
        question: "What does holding a call option give you?",
        options: [
          "The right to buy the underlying at a strike price fixed in advance",
          "The obligation to sell the underlying when the buyer exercises",
          "The right to sell the underlying at the market price on expiry",
          "The right to a fixed dividend from the issuing company",
        ],
        explanation:
          "The key word is right, not obligation: if the market price sits below the strike, the holder simply does not exercise.",
      },
      l6_q2: {
        question: "What does the CAPM model compute?",
        options: [
          "The required rate of return on equity",
          "The company's cost of goods sold for the period",
          "The effective tax rate the company actually pays",
          "Forecast net profit for the next financial year",
        ],
        explanation:
          "CAPM produces the cost of equity: the risk-free rate plus the market risk premium multiplied by the stock's beta.",
      },
      l6_q3: {
        question: "When does a bond trade above par?",
        options: [
          "When its coupon rate is above the market's yield to maturity",
          "When its coupon rate is below the market's yield to maturity",
          "When the issuer is about to default on the principal",
          "When the issuing company reported a loss in the latest period",
        ],
        explanation:
          "A coupon above the market level means the interest stream beats a newly issued bond, so investors will pay more than par for it.",
      },
      l6_q4: {
        question: "How does a sharply stronger local currency affect an exporter?",
        options: [
          "Its goods become more expensive to foreign buyers",
          "Revenue converted into local currency rises considerably",
          "No effect, since contracts are already priced in foreign currency",
          "Margins improve, because imported input costs fall",
        ],
        explanation:
          "A strong local currency makes exports dearer in the eyes of foreign buyers, and each unit of foreign currency earned converts into less local currency.",
      },
      l6_q5: {
        question: "What advantage does EV/EBITDA have over P/E when comparing companies?",
        options: [
          "It is neutral to different capital structures and depreciation policies",
          "It always gives a lower valuation, so it is safer for investors",
          "It only works for technology companies making accounting losses",
          "It is unaffected by the size of the company's revenue",
        ],
        explanation:
          "EBITDA sits above interest and depreciation, and EV includes debt, so a heavily borrowed company and a lightly borrowed one can still be compared.",
      },
      l6_q6: {
        question: "Where do retained earnings sit on the balance sheet?",
        options: [
          "Current liabilities, due within the next twelve months",
          "Shareholders' equity, alongside the capital shareholders paid in",
          "Tangible fixed assets, net of accumulated depreciation",
          "Operating cash flow for the reporting period",
        ],
        explanation:
          "These are accumulated profits not yet distributed to shareholders, so they belong to the owners rather than being an obligation to anyone outside.",
      },
      l6_q7: {
        question: "In what situation does the buyer of a put option profit?",
        options: [
          "When the underlying price falls below the strike price",
          "When the underlying price rises above the strike price",
          "When the underlying's volatility collapses before expiry",
          "When the issuer raises the dividend paid to shareholders",
        ],
        explanation:
          "The right to sell above the market price is what has value, so a put pays off as the underlying falls - it works like an insurance contract.",
      },
      l6_q8: {
        question: "What is WACC made up of?",
        options: [
          "The cost of equity and the after-tax cost of debt, weighted at market values",
          "The average bank rate plus expected inflation for the period",
          "The industry's average return over the last five years",
          "The cost of equity minus the tax shield on interest",
        ],
        explanation:
          "Interest is deductible for tax, so the cost of debt has to be taken after tax. The weights use market values, not book values.",
      },
      l6_q9: {
        question: "How does a sharp rise in net working capital affect operating cash flow?",
        options: [
          "It lowers cash flow, because capital is trapped in receivables and inventory",
          "It raises cash flow, because the company holds more current assets",
          "No effect, because working capital is a balance sheet item",
          "It only affects investing cash flow, not operating cash flow",
        ],
        explanation:
          "Selling without collecting, or holding more stock, is money already spent that has not come back yet - profit rises while cash flow does not.",
      },
      l6_q10: {
        question: "What characterises a company with high operating leverage?",
        options: [
          "Large fixed costs, so profit swings hard with revenue",
          "A debt-to-equity ratio above the industry average",
          "Variable costs making up most of the product's cost structure",
          "Faster inventory turnover than its industry rivals",
        ],
        explanation:
          "Operating leverage is about the mix of fixed and variable costs. The second option describes financial leverage, a different concept.",
      },
      l6_q11: {
        question: "How does a share buyback affect EPS, if profit is unchanged?",
        options: [
          "EPS rises, because the share count falls",
          "EPS falls, because the company spends cash on the buyback",
          "EPS is unchanged, because a buyback does not affect profit",
          "EPS only changes once the treasury shares are cancelled",
        ],
        explanation:
          "The denominator shrinks so EPS rises, even though the company earned not one dong more. This is why rising EPS does not automatically mean the business improved.",
      },
      l6_q12: {
        question: "What does the semi-strong form of the efficient market hypothesis state?",
        options: [
          "Prices already reflect all public information, financial statements included",
          "Prices reflect only past price and volume data",
          "Prices reflect inside information that has not been disclosed",
          "Prices always equal intrinsic value, under any market conditions",
        ],
        explanation:
          "The weak form covers only past price data, the strong form covers inside information too. Semi-strong sits between them, and implies public fundamental analysis rarely produces a durable edge.",
      },
      l6_q13: {
        question: "What is a call option's intrinsic value at expiry?",
        options: [
          "The gap between the underlying price and the strike, floored at 0",
          "The whole premium paid to the seller when the contract was signed",
          "The underlying price multiplied by the market's implied volatility",
          "The strike price minus the underlying price on the expiry date",
        ],
        explanation:
          "A call is only exercised when it pays to, so its value at expiry is max(S - K, 0). The last option is the put formula - a very common mix-up.",
      },
      l6_q14: {
        question: "Why is the after-tax cost of debt below the loan's headline rate?",
        options: [
          "Because interest is deductible against corporate income tax",
          "Because banks usually refund part of the interest to borrowers who pay on time",
          "Because interest is spread over several years, so its present value falls",
          "Because companies may pay interest in shares instead of cash",
        ],
        explanation:
          "The after-tax cost of debt is the rate times (1 - tax rate). Because interest is deductible, every dong of interest paid really costs (1 - t) dong - this is the root of the tax shield.",
      },
      l6_q15: {
        question: "What kind of business typically runs persistently negative working capital?",
        options: [
          "One that collects from customers immediately but pays suppliers later",
          "One losing solvency, at risk of bankruptcy in the short term",
          "One whose fixed assets are a very small share of total assets",
          "One that is barred from listing its shares on the exchange",
        ],
        explanation:
          "Supermarkets and subscription models collect first and pay suppliers later, so negative working capital signals bargaining power rather than trouble - the suppliers are funding them.",
      },
      l6_q16: {
        question: "What risk position does the seller of an option hold?",
        options: [
          "Maximum profit is the premium collected, while the loss can be very large",
          "Both profit and loss are capped at the value of the premium",
          "Profit is unlimited while loss is capped at the premium received",
          "No risk at all, since the premium was collected up front",
        ],
        explanation:
          "The seller's payoff is the mirror image of the buyer's: a fixed premium collected, the tail risk carried. Selling a call without owning the underlying is a theoretically unlimited loss.",
      },
      l6_q17: {
        question: "How is the interest coverage ratio calculated?",
        options: [
          "EBIT divided by interest expense for the period",
          "After-tax profit divided by total outstanding debt",
          "Operating cash flow divided by average total assets",
          "Total liabilities divided by shareholders' equity",
        ],
        explanation:
          "The ratio says how many times profit before interest and tax covers the interest bill. Below about 1.5x is usually a worry: one small dip in profit and the interest cannot be paid.",
      },
      l6_q18: {
        question: "Why is free cash flow to the firm discounted at WACC rather than the cost of equity?",
        options: [
          "Because FCFF is the cash flow belonging to lenders and shareholders both",
          "Because WACC is always lower than the cost of equity, giving a higher valuation",
          "Because international valuation standards mandate WACC for every kind of cash flow",
          "Because the cost of equity only works for companies carrying no debt",
        ],
        explanation:
          "The rule is that the discount rate must match whoever receives the cash flow. FCFF feeds both groups, so WACC; FCFE is what is left for shareholders, so the cost of equity.",
      },
      l6_q19: {
        question: "What is a company's economic exchange-rate exposure?",
        options: [
          "The long-run effect of exchange rates on its competitiveness",
          "The FX loss arising when foreign-currency balances are revalued at period end",
          "The spread between a commercial bank's quoted buy and sell rates",
          "The risk of not being able to buy foreign currency to settle an import contract",
        ],
        explanation:
          "Economic exposure lives outside the books: a stronger local currency makes exports relatively dearer than a foreign rival's and erodes market share over years. The second option is accounting translation exposure.",
      },
      l6_q20: {
        question: "Why can a company with stable cash flow carry a higher debt ratio?",
        options: [
          "Because meeting interest and principal on time depends little on the business cycle",
          "Because banks are required to lend more to stable companies",
          "Because stable companies get statutory interest-rate reductions",
          "Because stable cash flow means no audited financial statements are needed",
        ],
        explanation:
          "Debt imposes fixed obligations, so what decides capacity is the reliability of the cash flow, not its size. Utilities and infrastructure borrow heavily because revenue barely moves; cyclical tech companies are the opposite.",
      },
    },
  },
  7: {
    title: "Expert Exam - Level 7: Finance Specialist",
    questions: {
      l7_q1: {
        question: "What does an inverted yield curve usually forecast?",
        options: [
          "The economy is about to enter a period of booming growth",
          "Recession risk within roughly twelve to eighteen months",
          "Inflation will reach zero within the next year",
          "The stock market will keep setting new highs in the short term",
        ],
        explanation:
          "Short rates above long rates reflect an expectation that the central bank will have to cut - which is to say the economy is expected to weaken.",
      },
      l7_q2: {
        question: "What does the Sharpe ratio measure in portfolio management?",
        options: [
          "Excess return per unit of the portfolio's standard deviation",
          "Return earned on each dong of margin borrowing used",
          "Total debt against the total assets the portfolio holds",
          "Average slippage when large buy orders are filled",
        ],
        explanation:
          "Sharpe = (portfolio return - risk-free return) divided by standard deviation: return measured against the total risk carried.",
      },
      l7_q3: {
        question: "What is the core improvement the Sortino ratio makes on Sharpe?",
        options: [
          "It counts only downside volatility in the denominator",
          "It removes the risk-free rate from the numerator entirely",
          "It applies only to bond and credit portfolios",
          "It adds the volatility of gold into the formula",
        ],
        explanation:
          "Sharpe punishes upside and downside volatility alike. Sortino punishes only the downside, which is more sensible: nobody fears their portfolio rising sharply.",
      },
      l7_q4: {
        question: "What is a value trap in equity investing?",
        options: [
          "Valuation that looks cheap while the business itself keeps deteriorating",
          "A stock that multiplies several times over within a single trading year",
          "A company delisted for paying an excessively high dividend",
          "An investor buying into an IPO at far too high a price",
        ],
        explanation:
          "A low P/E can mean the market has correctly priced a business that is getting worse, rather than an opportunity everyone else missed.",
      },
      l7_q5: {
        question: "How is FCFE derived from FCFF?",
        options: [
          "Subtract after-tax interest, then add net borrowing for the period",
          "Add back all capital expenditure incurred in the period",
          "Subtract net revenue, then divide by the shares outstanding",
          "Divide FCFF by the average shares outstanding in the period",
        ],
        explanation:
          "FCFE is what remains for shareholders after the lenders have been served, so after-tax interest comes out and newly raised net borrowing goes back in.",
      },
      l7_q6: {
        question: "What is central bank quantitative tightening, in substance?",
        options: [
          "Shrinking the balance sheet by letting bonds mature or selling them",
          "Printing money to buy shares on the secondary market",
          "Cutting corporate income tax to stimulate private investment",
          "Raising credit limits for the commercial banks in the system",
        ],
        explanation:
          "Quantitative tightening drains liquidity from the system - the reverse of quantitative easing, which injects money by buying assets.",
      },
      l7_q7: {
        question: "What does a sudden widening of credit spreads usually signal?",
        options: [
          "The market is demanding a higher premium for default risk",
          "The central bank has just cut its policy rate",
          "The issuing company has just been upgraded",
          "Liquidity in the bond market is improving markedly",
        ],
        explanation:
          "The credit spread is the price of default risk. It widens when investors turn anxious, and it usually widens ahead of economic downturns.",
      },
      l7_q8: {
        question: "What does a portfolio's alpha measure?",
        options: [
          "The return beyond what systematic risk can explain",
          "The total absolute return the portfolio achieved in the period",
          "How volatile the portfolio is against its benchmark index",
          "The weight of large-cap stocks held in the portfolio",
        ],
        explanation:
          "Beta explains the return that comes from accepting market risk. Alpha is what is left - the manager's actual contribution.",
      },
      l7_q9: {
        question: "Which assumption is the Gordon growth model most sensitive to?",
        options: [
          "The gap between the discount rate and the long-term growth rate",
          "The dividend the company paid in the most recent period",
          "The number of shares outstanding at the valuation date",
          "The company's retention ratio for the current year",
        ],
        explanation:
          "The denominator is the difference between two numbers that sit close together, so as growth approaches the discount rate the valuation explodes to nonsense.",
      },
      l7_q10: {
        question: "What is delta hedging an option position meant to achieve?",
        options: [
          "Neutralising the effect of small moves in the underlying price",
          "Removing every risk from the position until expiry",
          "Maximising profit when the underlying moves violently",
          "Fixing the option premium payable at the moment of signing",
        ],
        explanation:
          "Delta only holds for small moves. When the price shifts hard, gamma changes the delta and the position has to be rebalanced continuously.",
      },
      l7_q11: {
        question: "What does it mean when a company's ROIC exceeds its WACC over the long run?",
        options: [
          "Every additional dong invested creates value for the owners",
          "The company is borrowing below the prevailing market rate",
          "The company needs no new capital to keep expanding",
          "The company's gross margin is above the industry average",
        ],
        explanation:
          "That is the definition of value creation. A company whose ROIC sits below its WACC destroys shareholder value the faster it grows.",
      },
      l7_q12: {
        question: "Why is operating cash flow harder to manipulate than profit?",
        options: [
          "Because it reflects money actually received and paid, with little room for estimates",
          "Because it is audited more thoroughly than the other measures",
          "Because accounting standards forbid adjusting this line",
          "Because it is always published before profit in the financial statements",
        ],
        explanation:
          "Profit carries estimates: provisions, depreciation, the timing of revenue recognition. Money landing in the bank account is far harder to invent.",
      },
      l7_q13: {
        question: "What does the term premium on a yield curve reflect?",
        options: [
          "The compensation investors demand for holding long bonds instead of short ones",
          "The yield gap between government and corporate bonds of the same maturity",
          "The rate the central bank commits to holding through the financial year",
          "The extra yield from buying bonds in the primary market",
        ],
        explanation:
          "Holding a long bond means carrying interest-rate and inflation risk for longer, so investors demand extra yield. The second option describes the credit spread, a different component.",
      },
      l7_q14: {
        question: "What characterises a barbell strategy in bond portfolio management?",
        options: [
          "Concentrating on very short and very long maturities, leaving the middle empty",
          "Spreading weight evenly across every maturity on the curve",
          "Holding bonds of a single maturity to match a repayment obligation",
          "Combining government bonds with equities in a fixed fifty-fifty split",
        ],
        explanation:
          "A barbell puts the weight at both ends of the curve. It gives the same duration as a concentrated middle but higher convexity, so it gains when rates move sharply either way.",
      },
      l7_q15: {
        question: "Why is the dividend discount model hard to apply to high-growth technology companies?",
        options: [
          "Because many pay no dividend, retaining all profit to reinvest",
          "Because technology dividends are taxed at a higher rate than usual",
          "Because accounting standards bar the technology sector from announcing dividend plans",
          "Because dividend growth in the sector always exceeds the discount rate",
        ],
        explanation:
          "The model needs a dividend stream to discount. A company retaining all its profit makes the numerator zero, forcing a switch to free-cash-flow or multiple-based models.",
      },
      l7_q16: {
        question: "What does the PEG ratio add to the P/E ratio?",
        options: [
          "It puts the earnings growth rate into the denominator of the multiple",
          "It removes the effect of capital structure from the valuation multiple",
          "It swaps accounting profit for free cash flow to equity",
          "It adjusts the share price for the last year's inflation rate",
        ],
        explanation:
          "PEG divides P/E by the growth rate, so a stock on 30x growing at 30% is viewed alongside one on 10x growing at 10%. Its weakness is extreme sensitivity to whichever growth forecast you choose.",
      },
      l7_q17: {
        question: "Why can accounting profit be flattered through the timing of revenue recognition?",
        options: [
          "Because revenue is booked when control transfers, not when the cash arrives",
          "Because accounting standards let a company pick any financial year it likes",
          "Because the tax authority only inspects revenue once every five years",
          "Because external auditors have no right of access to sales contracts",
        ],
        explanation:
          "Accrual accounting separates when revenue is booked from when the cash lands, which leaves room for judgement. This is why receivables growing faster than revenue is a signal worth examining closely.",
      },
      l7_q18: {
        question: "What is duration matching used for in asset-liability management?",
        options: [
          "Balancing the duration of assets against liabilities to cut interest-rate risk",
          "Ensuring every investment matures on the same date each year",
          "Holding equal weights of stocks and bonds throughout the fund's life",
          "Investing only in bonds rated the same as the issuing institution",
        ],
        explanation:
          "When both durations match, a shift in rates moves the value of assets and liabilities by almost the same amount, so the funding gap is protected. This underpins pension and insurance fund management.",
      },
      l7_q19: {
        question: "Why do agency costs arise between shareholders and management?",
        options: [
          "Because managers do not own the whole business, so incentives diverge",
          "Because company law bars managers from holding shares in their own firm",
          "Because shareholders have no right of access to audited financial statements",
          "Because management is always paid above the market rate",
        ],
        explanation:
          "The decision-maker does not bear the full financial consequence, so size, personal safety or short-term gain can win out. Pay design and corporate governance exist to narrow that gap.",
      },
      l7_q20: {
        question: "What does the yield gap between a corporate bond and a government bond of the same maturity mainly reflect?",
        options: [
          "The issuer's credit risk and liquidity risk",
          "The difference in tax rates applied to the two kinds of bond",
          "The difference in how often each pays its coupon",
          "The brokerage cost incurred when trading corporate bonds",
        ],
        explanation:
          "The credit spread compensates for the chance of default plus the fact that a corporate bond is harder to sell quickly. It widens when the market takes fright and narrows as risk appetite returns.",
      },
    },
  },
  8: {
    title: "Master Exam - Level 8: Finance Master",
    questions: {
      l8_q1: {
        question: "Which measure captures a bond's price sensitivity to interest rates?",
        options: [
          "Duration, the weighted average life of the cash flows",
          "The yield to maturity at the moment the investor bought",
          "The coupon rate fixed in the contract at issue",
          "The credit rating published by an independent agency",
        ],
        explanation:
          "Duration says how many percent the price moves when rates move one percentage point. The other three describe different properties of a bond.",
      },
      l8_q2: {
        question: "What characterises a leveraged buyout?",
        options: [
          "Most of the price is funded with debt, secured on the target's own assets",
          "The fund buys only a small share stake on the exchange",
          "The whole price is paid from the investors' own cash",
          "It targets only newly founded technology companies with no revenue",
        ],
        explanation:
          "The target's own cash flow services the debt, so the ideal target is a business with steady cash flow and modest reinvestment needs.",
      },
      l8_q3: {
        question: "What characterises unsystematic risk?",
        options: [
          "Most of it can be removed by diversifying the portfolio",
          "It cannot be removed no matter how many stocks are held",
          "It is driven mainly by the monetary policy of large economies",
          "It hits every listed stock on the market at the same time",
        ],
        explanation:
          "Company-specific risks cancel each other out once a portfolio is broad enough. The other three all describe systematic risk.",
      },
      l8_q4: {
        question: "In an interest rate swap, what do the two parties exchange?",
        options: [
          "A fixed interest stream for a floating interest stream",
          "Ownership of shares in two different companies",
          "Government bonds for physical gold at market prices",
          "The principal repayment obligations of two loans of equal remaining term",
        ],
        explanation:
          "Only the interest streams are swapped; the principal stays where it is. It is a tool for changing the interest structure without restructuring the loan.",
      },
      l8_q5: {
        question: "What is a company's economic moat?",
        options: [
          "A durable competitive advantage that stops rivals eroding the margin",
          "A large cash pile that carries the company through hard times",
          "A short-term debt ratio well below the industry average",
          "A patent portfolio whose protection expires in a few years",
        ],
        explanation:
          "A moat can come from brand, network effects, switching costs or a cost advantage. What they share is durability - not a passing advantage.",
      },
      l8_q6: {
        question: "What is the Blume adjustment to beta for?",
        options: [
          "Pulling the historical beta back towards the market average of one",
          "Doubling beta to reflect risk more conservatively",
          "Removing the effect of beta from the valuation model entirely",
          "Estimating the cost of debt in place of the cost of equity",
        ],
        explanation:
          "A company's beta tends to drift towards one over time, so a raw historical beta usually overstates how far it sits from the market.",
      },
      l8_q7: {
        question: "How is enterprise value calculated?",
        options: [
          "Market capitalisation plus total debt, minus cash",
          "Market capitalisation minus all the debt on the balance sheet",
          "Net revenue for the period multiplied by the price-earnings ratio",
          "Shareholders' equity plus closing inventory",
        ],
        explanation:
          "It is the real cost of buying the business outright: pay the shareholders, assume the debt, but receive the cash already sitting on the balance sheet.",
      },
      l8_q8: {
        question: "What does convexity add that duration cannot capture?",
        options: [
          "That the price-rate relationship is a curve, not a straight line",
          "The probability that the issuer defaults when rates rise",
          "The effect of expected inflation on the bond's real yield",
          "The gap between the bid and the offer in the market",
        ],
        explanation:
          "Duration is a linear approximation, so its error grows as rates move further. Convexity is the second-order term that corrects for it.",
      },
      l8_q9: {
        question: "In an LBO, which source of return does NOT depend on operational improvement?",
        options: [
          "Paying debt down with cash flow, so the equity slice grows",
          "Cutting operating costs and slimming the management structure",
          "Expanding revenue into new markets and customer groups",
          "Improving gross margin by renegotiating with suppliers",
        ],
        explanation:
          "Debt repayment shifts value from lenders to owners without the business having to get any better. The other three all require operations to genuinely improve.",
      },
      l8_q10: {
        question: "How should a sunk cost be treated in an investment decision?",
        options: [
          "Ignored entirely, since it does not change with the decision ahead",
          "Added to total capital, to get the project's return right",
          "Spread evenly across the remaining years of the project",
          "Deducted from the first year's cash flow in the appraisal",
        ],
        explanation:
          "Money already spent cannot be recovered whichever option you pick, so it does not belong in the comparison. Including it is the sunk cost fallacy.",
      },
      l8_q11: {
        question: "How does a futures contract differ from a forward?",
        options: [
          "Futures are standardised, exchange-listed and settled daily",
          "Futures require no initial margin from the participants",
          "Forwards always have deeper liquidity on the secondary market",
          "Forwards are guaranteed by a central clearing house",
        ],
        explanation:
          "Daily settlement and a clearing house standing in the middle make counterparty risk nearly vanish - the price is losing flexibility in the terms.",
      },
      l8_q12: {
        question: "What is the limitation of valuing a company on its industry peers' multiples?",
        options: [
          "It assumes the market is pricing the comparable group correctly",
          "It requires a detailed cash flow forecast for at least five years",
          "It only applies to companies not yet listed on the market",
          "It ignores the revenue size of the company being valued",
        ],
        explanation:
          "Relative valuation tells you whether a company is cheap or dear against its peers; it cannot tell you whether the whole peer group is mispriced.",
      },
      l8_q13: {
        question: "How does the interest tax shield create value?",
        options: [
          "Interest is deductible for tax, so the company pays less tax",
          "Interest lowers accounting profit, so shareholders demand less dividend",
          "Debt always carries a lower headline cost than equity",
          "Lenders take on part of the business risk on behalf of shareholders",
        ],
        explanation:
          "The value comes from the tax saved, not from debt being cheaper than equity. The benefit is capped by the cost of financial distress once borrowing goes too far.",
      },
      l8_q14: {
        question: "In a sum-of-the-parts valuation, how is the company's value determined?",
        options: [
          "Value each business line on its own suitable multiple, add them up and deduct net debt",
          "Take market capitalisation and add all fixed assets at book value",
          "Multiply consolidated revenue by the average multiple of the whole market",
          "Add up the last five years of after-tax profit and discount it to today",
        ],
        explanation:
          "The method is useful for conglomerates, where a single blended multiple hides how differently each arm is worth. The result usually exceeds the market price, and the gap is called the conglomerate discount.",
      },
      l8_q15: {
        question: "What purpose do financial covenants serve for the lender?",
        options: [
          "An early warning, and the right to step in when the borrower deteriorates",
          "Fixing the lending rate for the whole life of the loan",
          "Giving the lender voting rights at the shareholders' meeting",
          "Excusing the borrower from providing security for the loan",
        ],
        explanation:
          "Covenants set thresholds on ratios such as debt to EBITDA or interest cover. Breaching one triggers the right to renegotiate or call the loan early - before things get bad enough to lose the money.",
      },
      l8_q16: {
        question: "In an M&A deal, why are cost synergies usually more reliable than revenue synergies?",
        options: [
          "Because cutting duplication is within the acquirer's own control",
          "Because cost synergies are always larger in absolute terms",
          "Because accounting standards only allow cost synergies into goodwill",
          "Because competition regulators forbid revenue synergies in deal valuation",
        ],
        explanation:
          "Closing a duplicate head office is an internal decision that can simply be executed. Cross-selling into the other side's customer base depends on outsiders' behaviour, so it usually runs late and lands short.",
      },
      l8_q17: {
        question: "Why does free cash flow matter more than accounting profit in an LBO model?",
        options: [
          "Because cash flow sets the pace of debt repayment, the key driver of the fund's return",
          "Because banks funding the deal do not accept accounting profit",
          "Because an LBO model does not use the income statement at all",
          "Because accounting profit in the acquired company is always negative after the deal",
        ],
        explanation:
          "The LBO structure bets on using the company's cash flow to work down a large debt. Every dong of debt repaid is a dong of value transferred to the fund's equity - accounting profit says nothing about that capacity.",
      },
      l8_q18: {
        question: "What is model risk in financial risk management?",
        options: [
          "The risk of loss because the model rests on wrong assumptions",
          "The risk that the computer running the model fails or loses power",
          "The risk that the staff who built the model leave without documentation",
          "The risk that a competitor copies the proprietary valuation model",
        ],
        explanation:
          "A model is always a simplification of reality. The risk appears when its founding assumptions stop holding - for instance assuming normally distributed returns while the market has fat tails.",
      },
      l8_q19: {
        question: "Why does goodwill arise in a business combination?",
        options: [
          "Because the price paid exceeds the fair value of the identifiable net assets acquired",
          "Because the acquirer must capitalise all deal advisory fees as a long-term asset",
          "Because the acquired company has been profitable for several years running",
          "Because accounting standards require a provision against consolidation risk",
        ],
        explanation:
          "Goodwill is the gap between what was paid and the fair value of identifiable net assets - it stands for brand, customer relationships and expected synergies. It has to be tested for impairment every year.",
      },
      l8_q20: {
        question: "What is a natural hedge for an exporting company?",
        options: [
          "Creating costs in the same currency as the revenue, so inflows and outflows offset",
          "Buying FX put options for the same volume as export revenue",
          "Converting all foreign revenue into local currency the day it arrives",
          "Selling in local currency and leaving the customer to handle the exchange rate",
        ],
        explanation:
          "A natural hedge needs no derivative: borrowing in the foreign currency, or putting a plant in the export market, creates an outflow in the same currency as the inflow, so most of the FX movement cancels itself out.",
      },
    },
  },
  9: {
    title: "CFA Exam - Level 9: CFA Candidate",
    questions: {
      l9_q1: {
        question: "What does the Fair Dealing standard in the CFA Code require?",
        options: [
          "Dealing fairly with all clients when making investment recommendations",
          "Filling orders for the largest-asset client group first",
          "Filling an analyst's personal orders ahead of client orders",
          "Offering discounted management fees to family members",
        ],
        explanation:
          "Fair does not mean identical: service tiers are allowed, but no tier may profit ahead of another from the same recommendation.",
      },
      l9_q2: {
        question: "The semi-strong form of market efficiency says prices already reflect what?",
        options: [
          "All past data and every piece of publicly disclosed information",
          "Past price and trading volume data alone",
          "Everything, including inside information not yet disclosed",
          "No category of information, in any reliable way",
        ],
        explanation:
          "The practical consequence: fundamental analysis of public information rarely gives a durable edge, while inside information still would.",
      },
      l9_q3: {
        question: "Which variable dominates an option's price in the Black-Scholes model?",
        options: [
          "The volatility of the underlying over the remaining life",
          "The number of existing shareholders in the issuing company",
          "The inflation target the central bank is pursuing",
          "The net revenue the company booked in the latest quarter",
        ],
        explanation:
          "Volatility is the one input in the model that cannot be observed directly, which makes it both the most important and the most argued-over.",
      },
      l9_q4: {
        question: "What does a one-day VaR of $10 million at 95% confidence mean?",
        options: [
          "On 5% of days, the loss will exceed $10 million",
          "The portfolio's maximum loss in a day is $10 million",
          "The portfolio will certainly gain $10 million on the other 95% of days",
          "There is a 95% chance the loss lands exactly at $10 million",
        ],
        explanation:
          "VaR is a threshold, not a ceiling. It says nothing at all about how deep the loss goes once the threshold is breached - that is what Expected Shortfall is for.",
      },
      l9_q5: {
        question: "Where does a cash-and-carry arbitrage make its profit?",
        options: [
          "A temporary mispricing between the spot market and the futures contract",
          "Correctly predicting the market's short-term direction",
          "Holding growth stocks over a long enough horizon",
          "Buying shares just before the cash dividend record date",
        ],
        explanation:
          "Buying spot and selling the future at the same moment locks the gap in, so the profit does not depend on which way the price goes.",
      },
      l9_q6: {
        question: "What does unlevered beta strip out?",
        options: [
          "The debt structure within the company's funding",
          "The gross margin the company achieved in the reporting period",
          "The prevailing lending rate of the commercial banking system",
          "The headcount and organisational structure of the company",
        ],
        explanation:
          "Taking leverage out leaves pure business risk, which is what lets you compare betas across companies with very different capital structures.",
      },
      l9_q7: {
        question: "What does it mean for a commodity market to be in contango?",
        options: [
          "The futures price sits above the current spot price",
          "The futures price sits below the current spot price",
          "Futures and spot prices are exactly equal",
          "Trading is suspended because prices moved too far",
        ],
        explanation:
          "Contango reflects storage costs and the cost of capital tied up in holding the goods. Commodity funds bleed return when they have to roll contracts in this state.",
      },
      l9_q8: {
        question: "What does the standard on material non-public information require of whoever holds it?",
        options: [
          "Do not trade on it, and do not tip anyone else to trade",
          "Trading is allowed if compliance has been notified beforehand",
          "Trading is allowed once the information is more than seven days old",
          "Only disclose the personal holding in the year-end report",
        ],
        explanation:
          "Tipping breaches the standard exactly as trading does. The right course is to urge the issuer to disclose the information to the market.",
      },
      l9_q9: {
        question: "Which performance measure fits when a portfolio is only one part of the investor's total wealth?",
        options: [
          "The Treynor ratio, because it divides by beta rather than standard deviation",
          "The Sharpe ratio, because it uses the portfolio's total risk",
          "The absolute return achieved over the evaluation period",
          "The largest drawdown the portfolio has ever suffered",
        ],
        explanation:
          "When the portfolio is only a part, specific risk has already been diversified away at the total level, so only systematic risk counts - that is, beta.",
      },
      l9_q10: {
        question: "What does the efficient frontier represent in portfolio theory?",
        options: [
          "The set of portfolios with the highest return at each level of risk",
          "The set of portfolios with the lowest risk the investor can accept",
          "The relationship between the risk-free rate and the holding period",
          "The boundary between equity portfolios and bond portfolios",
        ],
        explanation:
          "Every portfolio below the frontier is dominated: there is always another portfolio offering a higher return at the same level of risk.",
      },
      l9_q11: {
        question: "In GIPS, what behaviour does the composite requirement prevent?",
        options: [
          "Showing only the portfolios that performed well and hiding the rest",
          "Charging a higher management fee than the contract promised",
          "Changing investment strategy without telling clients first",
          "Using leverage beyond the limit set in the fund prospectus",
        ],
        explanation:
          "Every portfolio run on the same strategy must sit in the same composite, so a firm cannot cherry-pick its best results to display.",
      },
      l9_q12: {
        question: "Why is an American option never worth less than an otherwise identical European one?",
        options: [
          "Because it grants the extra right of early exercise with no added obligation",
          "Because it always has a longer time to expiry",
          "Because it trades on markets with deeper liquidity",
          "Because it requires no initial margin from the buyer",
        ],
        explanation:
          "Adding a right without adding an obligation cannot reduce value. For a call on a non-dividend-paying asset, though, that right is rarely worth using.",
      },
      l9_q13: {
        question: "What does the suitability rule require of an adviser before recommending an investment?",
        options: [
          "Understanding the client's finances, objectives and risk tolerance",
          "Giving every client the same recommendation, to be fair",
          "Favouring products issued by the adviser's own firm",
          "Guaranteeing a return above the bank deposit rate",
        ],
        explanation:
          "A recommendation that is right for one person can be entirely wrong for another, so the client profile has to come before the recommendation, not after.",
      },
      l9_q14: {
        question: "Whose interests does the Loyalty, Prudence and Care standard put first?",
        options: [
          "The client's, ahead of the firm's and your own",
          "The employer's, since it pays the salary",
          "The firm's shareholders', since they carry the greatest capital risk",
          "The market regulator's, since it holds the power to sanction",
        ],
        explanation:
          "The order of priority in the Code is explicit: client first, then employer, and personal interest last. This is what separates a fiduciary duty from an ordinary commercial relationship.",
      },
      l9_q15: {
        question: "Under international standards, what is the effect of capitalising development costs?",
        options: [
          "Assets and current-period profit rise, but amortisation rises in later periods",
          "Both assets and profit fall in the period the cost is incurred",
          "No effect on the financial statements, as this is only a note disclosure",
          "Operating cash flow rises while profit stays unchanged",
        ],
        explanation:
          "Capitalising puts the cost on the balance sheet instead of straight against profit, so this period looks better and later ones worse through amortisation. It also moves the cash outflow from operating into investing.",
      },
      l9_q16: {
        question: "The capital asset pricing model assumes investors are compensated for which risk only?",
        options: [
          "Systematic risk, the part diversification cannot remove",
          "The entire risk of each individual asset in the portfolio",
          "The asset's liquidity risk on the secondary market",
          "The credit risk of whoever issued the asset",
        ],
        explanation:
          "The core logic of CAPM: the market does not pay for risk an investor could have removed for free. Only the undiversifiable part, measured by beta, earns compensation.",
      },
      l9_q17: {
        question: "Why does a callable bond usually yield more than a straight bond?",
        options: [
          "Because the issuer can call it in exactly when rates fall",
          "Because callable bonds always carry a lower credit rating",
          "Because callable bonds always have a longer maturity",
          "Because this type of bond may not be traded on the secondary market",
        ],
        explanation:
          "The call is an option belonging to the issuer, and they will use it at the worst moment for the investor - when rates fall and the bond is appreciating. The higher yield is the price of that option.",
      },
      l9_q18: {
        question: "What is the Independence and Objectivity standard aimed at preventing?",
        options: [
          "Gifts, hospitality or outside pressure distorting professional judgement",
          "A professional working for two financial firms at the same time",
          "An analyst issuing a recommendation that differs from market consensus",
          "The use of third-party analysis software at work",
        ],
        explanation:
          "The focus is protecting the objectivity of judgement. A recommendation against the crowd is entirely legitimate if it is well founded - the problem only arises when judgement is swayed by interests outside the analysis.",
      },
      l9_q19: {
        question: "In portfolio theory, how does the capital market line differ from the security market line?",
        options: [
          "The capital market line measures risk by standard deviation, the other by beta",
          "The capital market line applies only to bonds and the other only to equities",
          "The capital market line slopes downward while the security market line slopes up",
          "The capital market line is built from past data and the other from forecasts",
        ],
        explanation:
          "The capital market line describes efficient portfolios combining the risk-free asset with the market portfolio, measuring total risk by standard deviation. The security market line applies to any asset and measures systematic risk only.",
      },
      l9_q20: {
        question: "Why is yield to maturity not the return actually realised in most cases?",
        options: [
          "Because it assumes holding to maturity and reinvesting coupons at that same rate",
          "Because it is stated before the tax the investor owes on the interest",
          "Because it is computed on par value rather than the actual market price",
          "Because it applies only to bonds that pay no periodic coupon",
        ],
        explanation:
          "Both implicit assumptions rarely hold: the investor may sell early, and reinvestment rates move with the market. The gap between YTM and the realised return is precisely reinvestment risk.",
      },
    },
  },
  10: {
    title: "Legend Exam - Level 10: Investing Legend",
    questions: {
      l10_q1: {
        question: "Beyond the market factor, which two factors does the Fama-French three-factor model add?",
        options: [
          "Company size and valuation against book value",
          "Expected inflation and exchange-rate volatility",
          "The world crude oil price and the international gold price",
          "The dividend yield and the prevailing policy rate",
        ],
        explanation:
          "Fama-French adds a size factor and a value factor to the market risk premium of the original single-factor model.",
      },
      l10_q2: {
        question: "A credit default swap works like which product?",
        options: [
          "An insurance contract against a bond defaulting",
          "A mortgage secured on property you already own",
          "Preferred shares paying a fixed annual dividend",
          "A term deposit at a commercial bank",
        ],
        explanation:
          "The buyer pays a periodic fee and is compensated if the issuer defaults. Unlike insurance, the buyer does not need to own the bond at all.",
      },
      l10_q3: {
        question: "What characterises a black swan event, in Nassim Taleb's sense?",
        options: [
          "Very rare, enormous impact, and only sounds reasonable after it happened",
          "Predictable precisely, on a regular repeating cycle",
          "Occurring only in emerging and developing economies",
          "Causing violent price moves without creating real financial risk",
        ],
        explanation:
          "The third element is the sharp one: after the event, everyone can build a story that makes it look inevitable, and that story hides the fact that nobody saw it coming.",
      },
      l10_q4: {
        question: "Which set of portfolios does the Markowitz efficient frontier represent?",
        options: [
          "Those with the highest return at each defined level of risk",
          "Those allocated entirely to the highest-risk equities",
          "Those holding only cash and other risk-free assets",
          "Those with equal weights across every asset class",
        ],
        explanation:
          "Every portfolio below the frontier is dominated: there is always another offering a higher return at the same level of risk.",
      },
      l10_q5: {
        question: "What is a currency carry trade?",
        options: [
          "Borrowing a low-rate currency to invest in a high-rate one",
          "Trading physical gold between markets in different countries",
          "Borrowing short-term to invest in rental property",
          "Sending remittances home through official banking channels",
        ],
        explanation:
          "The profit comes from the rate differential and the risk sits in the exchange rate: one currency move can wipe out years of accumulated carry.",
      },
      l10_q6: {
        question: "How does the Treynor ratio's denominator differ from Sharpe's?",
        options: [
          "It uses beta instead of the portfolio's standard deviation",
          "It uses the portfolio's revenue instead of its profit",
          "It removes risk from the calculation entirely",
          "It counts only the dividends received in the period",
        ],
        explanation:
          "Sharpe measures against total risk, Treynor only against systematic risk - which makes Treynor the right one when the portfolio is part of a larger whole.",
      },
      l10_q7: {
        question: "What does bearish RSI divergence warn of?",
        options: [
          "Price is making new highs while the momentum behind it fades",
          "Price is about to enter a stronger, more decisive rally",
          "The current uptrend is being confirmed and will run for a long time",
          "The market will trade sideways in a narrow range for a long stretch",
        ],
        explanation:
          "Divergence is a warning, not an entry signal: momentum can fade for a long time before the price actually turns.",
      },
      l10_q8: {
        question: "How does the Fama-French three-factor model challenge CAPM?",
        options: [
          "Beta alone does not explain the return differences between stocks",
          "The risk-free rate does not exist in practice, so the model is meaningless",
          "Investors in practice pay no attention to risk when deciding",
          "Markets are always efficient, so every pricing model gives the same answer",
        ],
        explanation:
          "Empirical data shows small-cap and value stocks return more than beta predicts, which means more factors are needed.",
      },
      l10_q9: {
        question: "Where does a portfolio's liquidity risk show up most clearly?",
        options: [
          "The cost and time it takes to exit a position when you must sell fast",
          "The daily price volatility of the assets in the portfolio",
          "The cash weight the portfolio holds at each month end",
          "How many different assets the portfolio is spread across",
        ],
        explanation:
          "An asset can be marked at a very high value and still be unsellable at that price, and the gap only reveals itself exactly when markets are tight.",
      },
      l10_q10: {
        question: "Why is the geometric average return lower than the arithmetic average?",
        options: [
          "Because volatility erodes accumulated value across consecutive periods",
          "Because the geometric average already deducts trading costs",
          "Because the arithmetic average counts dividends and the geometric does not",
          "Because the geometric average only applies to periods with positive returns",
        ],
        explanation:
          "Losing 50% then gaining 50% averages arithmetically to zero, while you are actually down 25%. The more volatile the series, the wider the gap between the two figures.",
      },
      l10_q11: {
        question: "What characterises a protective put hedging strategy?",
        options: [
          "It caps the maximum loss but the premium must be paid up front",
          "It removes all risk at no cost whatsoever",
          "It raises profit when the market rises, through the option's leverage",
          "It transfers all risk to the seller without capping the upside",
        ],
        explanation:
          "This is portfolio insurance: the premium is the insurance cost, and it drags on returns through every stretch in which the market does not fall.",
      },
      l10_q12: {
        question: "How does survivorship bias affect fund performance statistics?",
        options: [
          "It flatters the average, because the poor funds have disappeared",
          "It worsens the average, because good funds tend to close earlier",
          "No effect, as long as the sample contains enough funds",
          "It only affects venture funds, not ordinary open-ended funds",
        ],
        explanation:
          "Funds that perform badly are closed or merged away and leave the database, so the remaining sample is only the survivors - the difference is often over a percentage point a year.",
      },
      l10_q13: {
        question: "What is the largest hidden trading cost on a large order?",
        options: [
          "Market impact: your own order pushing the price against you",
          "The brokerage commission charged on each fill",
          "The tax owed on the capital gain when you sell",
          "The custody fee charged on the value of assets held",
        ],
        explanation:
          "Commissions and tax both appear on the statement. Market impact appears nowhere, and for a large fund it usually exceeds both.",
      },
      l10_q14: {
        question: "Why can rebalancing a portfolio produce additional return?",
        options: [
          "Because it forces you to trim what has risen and add to what has fallen",
          "Because it lowers the total trading cost incurred over the year",
          "Because it keeps the portfolio closely tracking the chosen benchmark",
          "Because it lets the investor avoid tax on realised capital gains",
        ],
        explanation:
          "The effect only appears when assets tend to revert to a mean. For assets that trend persistently, rebalancing reduces returns instead.",
      },
      l10_q15: {
        question: "In factor investing, the quality factor is usually measured by which group of metrics?",
        options: [
          "Stable profitability, low leverage and low earnings volatility",
          "How far the share price has risen over the last twelve months",
          "Market capitalisation against the median of the whole exchange",
          "Trading volume against the number of shares outstanding",
        ],
        explanation:
          "The quality factor captures businesses with durable foundations: high and stable ROE, low debt, earnings that do not swing. The second option is momentum, the third is size.",
      },
      l10_q16: {
        question: "Why is a strategy built on historical data prone to data mining?",
        options: [
          "Because testing enough rules on one dataset is certain to find one that fits by chance",
          "Because historical market data may not legally be used commercially",
          "Because the longer the data, the more statistical reliability decays exponentially",
          "Because exchanges only keep historical data for a maximum of five years",
        ],
        explanation:
          "This is the multiple-comparisons problem: test thousands of rules against one price series and a few will look excellent purely by luck. Validating out of sample is the minimum defence.",
      },
      l10_q17: {
        question: "What does a portfolio's tail risk refer to?",
        options: [
          "The chance of an extreme loss at low probability, far beyond the normal distribution",
          "The risk of the portfolio being liquidated in the last sessions of the year",
          "The return lost to trading costs on small odd-lot orders",
          "The risk of the fund manager leaving at the end of the evaluation period",
        ],
        explanation:
          "Financial returns have fatter tails than the normal distribution, so severe crashes happen more often than the model predicts. This is the inherent weakness of VaR built on a normality assumption.",
      },
      l10_q18: {
        question: "How is the Calmar ratio calculated?",
        options: [
          "Average annual return divided by the portfolio's maximum drawdown",
          "Excess return divided by the standard deviation of negative returns",
          "Return against the benchmark divided by tracking error",
          "Portfolio return divided by beta against the broad market",
        ],
        explanation:
          "Calmar sets return against the worst pain the investor had to sit through. It fits when maximum drawdown, not standard deviation, is what makes people quit.",
      },
      l10_q19: {
        question: "Why does even a small management fee matter so much to long-run results?",
        options: [
          "Because the slice taken each year no longer compounds afterwards",
          "Because management fees are charged progressively on the investor's assets",
          "Because the tax authority treats management fees as taxable income",
          "Because management fees always double every ten years of holding",
        ],
        explanation:
          "One percent a year sounds small, but over thirty years it eats roughly a quarter of the final value - because every dong taken in fees also takes away all the compounding that dong would have produced.",
      },
      l10_q20: {
        question: "How does anchoring bias show up in investment decisions?",
        options: [
          "Clinging to an initial reference number, such as your purchase price",
          "Seeking only information that supports a view you already hold",
          "Overrating the probability of an event that has been all over the news",
          "Selling winners too early and holding losers far too long",
        ],
        explanation:
          "Anchoring turns your purchase price into the yardstick, even though the market does not care what you paid. The other three are confirmation bias, availability bias and loss aversion.",
      },
    },
  },
  11: {
    title: "Hedge Fund Manager Exam (Level 11)",
    questions: {
      l11_q1: {
        question: "How does a market-neutral strategy keep the portfolio positioned?",
        options: [
          "Balancing long and short positions so portfolio beta sits near zero",
          "Holding only long positions with the fund's entire capital",
          "Trading only derivatives on gold and precious metals",
          "Holding everything in cash and opening no positions at all",
        ],
        explanation:
          "Cancelling beta leaves profit coming only from the spread between the longs and the shorts - from selection skill, not from market direction.",
      },
      l11_q2: {
        question: "How does the Black-Litterman model improve on modern portfolio theory?",
        options: [
          "It blends the market's equilibrium allocation with the manager's own views",
          "It removes risk from the optimisation problem entirely",
          "It applies only to portfolios of cryptocurrencies",
          "It always allocates everything to long-dated government bonds",
        ],
        explanation:
          "Pure Markowitz is hypersensitive to the expected returns you feed it and spits out extreme weights. Anchoring on the market equilibrium makes the result far more stable.",
      },
      l11_q3: {
        question: "What is central bank yield curve control?",
        options: [
          "Buying and selling bonds to pin a target maturity's yield at a set level",
          "Raising property taxes to cool the real estate market",
          "Banning trading in bank stocks during volatile periods",
          "Fixing the domestic gold price at a level the state announces",
        ],
        explanation:
          "Unlike quantitative easing, which fixes the quantity purchased, yield curve control fixes the price and buys however much the market demands.",
      },
      l11_q4: {
        question: "What does a positive Jensen's alpha say about a fund manager?",
        options: [
          "The fund returned more than its systematic risk can explain",
          "The fund is losing money against its benchmark index",
          "The fund is using leverage beyond its mandate",
          "The fund charges investors no management fee at all",
        ],
        explanation:
          "Alpha is what remains after subtracting the return that would have come from simply accepting market risk, which makes it a genuine measure of skill.",
      },
      l11_q5: {
        question: "What advantage does high-frequency trading exploit?",
        options: [
          "Execution speed in microseconds, and automated algorithms",
          "Deep fundamental analysis of a company over many years",
          "Reading and synthesising the daily financial press",
          "Hand-drawing and analysing candlestick patterns on charts",
        ],
        explanation:
          "The edge is infrastructure, not insight: servers colocated at the exchange, dedicated lines, and algorithms reacting before a human can even see the price.",
      },
      l11_q6: {
        question: "What does a global macro strategy focus on?",
        options: [
          "Forecasting global macro shifts and trading them across asset classes",
          "Buying only domestic retail companies' shares",
          "Analysing one single company's financial statements very deeply",
          "Short-term trading of very low-priced stocks",
        ],
        explanation:
          "Rates, currencies, commodities and politics are all variables, and the fund expresses its view through whichever instrument reflects it most cheaply.",
      },
      l11_q7: {
        question: "What does maximum drawdown measure?",
        options: [
          "The deepest peak-to-trough fall over a period",
          "The highest return the fund has ever achieved",
          "How many investors withdrew in the latest reporting period",
          "Total operating costs the fund paid in a financial year",
        ],
        explanation:
          "It measures real pain: it answers how much someone who bought exactly at the top had to endure before recovering.",
      },
      l11_q8: {
        question: "How do a long/short fund's gross and net exposure differ?",
        options: [
          "Gross adds both sides together, net is the difference between long and short",
          "Gross is at market value, net at original cost",
          "Gross counts only longs, net counts only shorts",
          "The two are always equal for a fund using leverage",
        ],
        explanation:
          "Net exposure says how much directional market risk is carried; gross exposure says how much leverage is really in place. A fund at zero net can still be very risky.",
      },
      l11_q9: {
        question: "What is the biggest risk in a pairs trading strategy?",
        options: [
          "The historical relationship between the two names can break permanently",
          "Trading costs rise because two offsetting positions must be opened",
          "Profit is capped at the spread between the two names at entry",
          "It cannot be applied to stocks listed on the same exchange",
        ],
        explanation:
          "The strategy bets the spread will narrow again. When one of the two businesses changes in nature, the spread can widen forever.",
      },
      l11_q10: {
        question: "What does a high-water mark clause in a fee structure achieve?",
        options: [
          "It stops the fund charging performance fees twice on the same gain",
          "It guarantees investors a minimum promised return",
          "It caps the total management fee chargeable in a year",
          "It lets the manager withdraw their own capital ahead of investors",
        ],
        explanation:
          "After a losing year the fund has to climb back to its old peak before performance fees resume, otherwise investors pay twice for the same profit.",
      },
      l11_q11: {
        question: "Why does a successful strategy usually run into a capacity limit?",
        options: [
          "The larger the capital, the more market impact on entry and exit erodes the return",
          "Regulators cap the assets a single fund may raise",
          "Operating costs rise exponentially once the fund passes a size threshold",
          "Institutional investors may not place more than a set share in one fund",
        ],
        explanation:
          "Opportunities in the market have a finite size. This is why many good funds close to new money rather than take more and get worse.",
      },
      l11_q12: {
        question: "How does a margin spiral work in a crisis?",
        options: [
          "Falling prices force liquidation, and the selling drives prices lower still",
          "Banks cut margin lending rates in unison to support the market",
          "Investors post more margin, so market liquidity rises",
          "Regulators halt trading until prices return to previous levels",
        ],
        explanation:
          "This is the positive feedback loop that turns an ordinary fall into a collapse, and it is why leverage raises risk non-linearly rather than proportionally.",
      },
      l11_q13: {
        question: "Where does an event-driven strategy make its money?",
        options: [
          "Price gaps around corporate events such as mergers or restructurings",
          "The long-run trend of the whole equity market over many years",
          "Interest rate differences between countries with different policies",
          "Seasonal cycles in basic commodity prices",
        ],
        explanation:
          "The main risk is not market direction but deal breakage: if the transaction is blocked, the spread that was narrowing blows straight back out.",
      },
      l11_q14: {
        question: "Why must a hedge fund care about its prime brokerage terms?",
        options: [
          "The prime broker can change margin terms at the tightest possible moment",
          "The prime broker decides which strategies the fund may run",
          "The prime broker compensates the fund for losses beyond a threshold",
          "The prime broker is the only party permitted to value the fund's assets",
        ],
        explanation:
          "Funding can be pulled exactly when it is needed most. Many funds collapse not because the bet was wrong but because the financing vanished before the thesis had time to be right.",
      },
      l11_q15: {
        question: "Which two positions does convertible arbitrage usually combine?",
        options: [
          "Buying the convertible bond and shorting the matching underlying stock",
          "Buying preferred shares and shorting government bonds of the same maturity",
          "Buying a call and selling a put on the same underlying",
          "Buying corporate bonds and selling index futures",
        ],
        explanation:
          "A convertible bond contains an embedded call. Shorting the underlying neutralises the directional risk, leaving the fund with the option's mispricing and the coupon stream.",
      },
      l11_q16: {
        question: "Why do hedge funds impose lock-up and redemption restrictions?",
        options: [
          "To stop a rush of withdrawals forcing fire sales of illiquid assets",
          "To guarantee investors the minimum return promised in the contract",
          "To avoid periodic disclosure obligations to the regulator",
          "To allow management fees above the regulatory cap",
        ],
        explanation:
          "Lock-ups solve a liquidity mismatch: the assets need time to exit while investors want out now. Without them, a panicked redemption wave manufactures the very loss everyone fears.",
      },
      l11_q17: {
        question: "Why does leverage raise the risk of ruin even when a strategy has positive expected return?",
        options: [
          "Because a temporary losing streak can trigger margin calls and force positions closed",
          "Because leverage cuts the strategy's expected return below the risk-free rate",
          "Because current rules forbid funds from leveraging beyond twice their capital",
          "Because the interest cost of leverage always exceeds the strategy's gross profit",
        ],
        explanation:
          "This is path-dependent ruin: a long-run expectation cannot save a position closed out midway. Leverage shortens the distance between an ordinary swing and the point where the position can no longer be held.",
      },
      l11_q18: {
        question: "Why should hedge fund returns be quoted on survivorship-adjusted data?",
        options: [
          "Because funds that closed after losses have vanished from the database",
          "Because regulators require every fund to publish inflation-adjusted data",
          "Because unadjusted data misstates management and performance fees",
          "Because new funds lack the history to compare against a benchmark",
        ],
        explanation:
          "Industry indices aggregate only the funds still alive, so the failures have been erased from the sample. The average performance observed is therefore higher than what investors actually lived through.",
      },
      l11_q19: {
        question: "When does basis risk arise in a hedged position?",
        options: [
          "When the hedging instrument and the asset being protected do not move in lockstep",
          "When the hedge contract size exceeds the underlying holding",
          "When the hedge expires on the same day the underlying is sold",
          "When the hedge counterparty is downgraded",
        ],
        explanation:
          "Hedges are rarely perfect: using Brent futures to protect a different crude, or a sector index to protect one stock. Whatever difference remains is basis risk.",
      },
      l11_q20: {
        question: "Why can a two-and-twenty fee structure encourage excessive risk-taking?",
        options: [
          "Because the manager takes a large share of the gains but none of the losses",
          "Because a two percent management fee forces the fund to target a very high return",
          "Because performance fees are only paid after ten continuous years of operation",
          "Because investors can demand fees back if the fund loses money in a year",
        ],
        explanation:
          "A performance fee is structured like a call option granted to the manager: the upside is theirs, the downside is not. A high-water mark and personal capital alongside investors are the two usual ways to soften that misalignment.",
      },
    },
  },
};
