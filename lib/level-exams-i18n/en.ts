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
};
