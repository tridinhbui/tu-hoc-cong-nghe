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
};
