import type { CareerTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 47 nghề, khoá theo `id` của lib/finance-careers.ts.
 *
 * Ba luật khi thêm một nghề vào đây:
 *
 * 1. MẢNG THEO VỊ TRÍ. `responsibilities`, `skills`, `careerPath`,
 *    `requiredTools`, `certifications` phải cùng số phần tử với bản tiếng
 *    Việt, và phần tử thứ i dịch phần tử thứ i. Lệch số phần tử thì mergeCareer
 *    bỏ cả mảng và rơi về tiếng Việt - lib/__tests__/career-translations.test.ts
 *    bắt việc đó, nên nó đỏ chứ không âm thầm.
 *
 * 2. GIỮ NGUYÊN TÊN RIÊNG VÀ CON SỐ. Tên phần mềm (MISA, FAST, SAP, Bloomberg),
 *    chứng chỉ (CFA, ACCA, CPA Việt Nam) và mức lương là dữ liệu, không phải
 *    chữ để dịch. "CPA Việt Nam" giữ nguyên vì đó là tên của chứng chỉ Việt
 *    Nam, không phải "Vietnamese CPA".
 *
 * 3. ĐỔI DẤU THẬP PHÂN VÀ ĐƠN VỊ TIỀN. "10 - 25 triệu" thành
 *    "VND 10-25M": người đọc tiếng Anh không đọc được "triệu", và bỏ đơn vị đi
 *    thì con số thành vô nghĩa. Dấu chấm phân cách hàng nghìn của tiếng Việt
 *    cũng phải đổi, cùng lý do với lessons-i18n.
 */
export const careersEn: Record<string, CareerTranslation> = {
  "non-finance-learner": {
    title: "Learner / Outside the field",
    summary:
      "For people learning finance to manage their own money, run a household, run their own business, or add management knowledge from outside a finance background.",
    responsibilities: [
      "Manage personal and household finances effectively",
      "Assess personal investment options (stocks, property, savings, fund certificates)",
      "Understand and control personal or small-business cash flow",
      "Read the financial picture well enough to make sound decisions in daily life",
    ],
    skills: [
      "Personal budgeting",
      "Basic financial statement literacy",
      "Value investing",
      "Cash flow thinking",
      "Risk control",
    ],
    entryLevel: "Anyone - no degree or finance experience required",
    salaryHint: "Personal financial freedom • Steady wealth growth",
    searchKeyword: "Outside the field",
    dayInLife:
      "Spend 15-20 minutes a day on a new lesson, build a personal budget, put capital into safe assets and track net worth as it accumulates.",
    careerPath: ["Complete beginner", "Informed personal investor", "Financially independent"],
    requiredTools: [
      "The Tự Học Tài Chính app",
      "Excel/Notion for personal finance",
      "Banking & brokerage apps",
    ],
    certifications: ["Tự Học Tài Chính certificate"],
    pros:
      "Applies to real life immediately, and protects family savings from inflation and financial traps.",
    cons: "Needs personal discipline sustained over a long time.",
    applicationTips: "Focus on finishing the 20 foundational Personal Finance lessons.",
  },

  "financial-analyst": {
    title: "Financial Analyst",
    summary:
      "Analyses financial statements, builds valuation models, and turns the numbers into investment or business recommendations.",
    responsibilities: [
      "Build and maintain financial models (DCF, comps, sensitivity analysis)",
      "Analyse company financial statements, spotting trends and risks",
      "Prepare reports and pitch recommendations to management or investors",
      "Track market moves and what they do to the portfolio or project under analysis",
    ],
    skills: [
      "Excel / financial modelling",
      "Financial statement literacy",
      "Company valuation",
      "Critical thinking",
      "PowerPoint",
    ],
    entryLevel: "Fresh/Junior - needs accounting and corporate finance fundamentals",
    salaryHint: "VND 10-25M (Fresher/Junior) • VND 25-50M+ (Senior)",
    searchKeyword: "Financial analysis",
    dayInLife:
      "Read market news at 8:30am, work through the target company's financial ratios, build the DCF, and have the recommendation written up before 5pm.",
    careerPath: ["Intern / Analyst", "Senior Analyst", "Finance Manager", "Finance Director"],
    requiredTools: ["Excel (Advanced)", "Bloomberg Terminal", "FiinPro", "Python (Pandas)", "PowerPoint"],
    certifications: ["CFA (Chartered Financial Analyst)", "CMA (Certified Management Accountant)"],
    pros:
      "You see the whole financial picture of a business, it sharpens logical thinking, and it opens doors into investing or management later.",
    cons:
      "Heavy pressure on the numbers, absolute accuracy expected, and hours that stretch when quarterly or annual reporting is due.",
    applicationTips:
      "Put real case studies on your CV, and make the flexible Excel modelling and the analytical reasoning the parts that stand out.",
  },

  accountant: {
    title: "Accountant",
    summary:
      "Records, controls and consolidates accounting transactions, keeping the books compliant with standards and the law.",
    responsibilities: [
      "Post the day's economic transactions to the ledger",
      "Prepare periodic financial statements and tax filings",
      "Reconcile payables and receivables, control vouchers and invoices",
      "Work with internal or external auditors when required",
    ],
    skills: [
      "Accounting principles",
      "Accounting software (MISA, FAST, ...)",
      "Tax law",
      "Meticulous and accurate",
      "Excel",
    ],
    entryLevel: "Fresh/Junior - suits graduates from accounting or finance programmes",
    salaryHint: "VND 8-15M (Fresher/Junior) • VND 15-30M+ (Senior/General Accountant)",
    searchKeyword: "Accounting",
    dayInLife:
      "Check incoming and outgoing invoices, post the transactions that came up, work through the VAT/CIT filings, and prepare the periodic trial balance.",
    careerPath: ["Junior Accountant", "Senior / General Accountant", "Chief Accountant", "Finance Controller"],
    requiredTools: ["MISA", "FAST", "SAP ERP", "Excel"],
    certifications: ["ACCA (F-levels)", "CPA Việt Nam", "CIMA"],
    pros:
      "Demand is enormous and remarkably steady - every business needs an accounting function to operate within the law.",
    cons:
      "The work repeats on a monthly and quarterly cycle, and year-end tax settlement or audit season brings real pressure and overtime.",
    applicationTips:
      "Prioritise a professional certification, know the current tax law well, and get genuinely fluent in at least one common package such as MISA.",
  },

  auditor: {
    title: "Auditor",
    summary:
      "Examines whether a company's financial statements are true and fair, against the auditing standards.",
    responsibilities: [
      "Gather audit evidence, testing vouchers and figures",
      "Evaluate the client's internal control system",
      "Write the audit report and take the findings back to the client",
      "Keep up with accounting and auditing standards (VAS, IFRS) as they change",
    ],
    skills: [
      "Accounting and auditing standards",
      "Risk analysis",
      "Client communication",
      "Holding up through busy season",
      "Excel",
    ],
    entryLevel: "Fresh/Junior - Big4 and local audit firms recruit in volume every year",
    salaryHint: "VND 10-18M (Fresher/Junior) • VND 20-40M+ (Senior/Manager)",
    searchKeyword: "Audit",
    dayInLife:
      "Travel to the client's office, run the physical inventory checks, interview their accounting staff, and write up the fieldwork on site.",
    careerPath: ["Associate", "Senior Auditor", "Audit Manager", "Senior Manager", "Partner"],
    requiredTools: ["CaseWare", "MS Excel (Advanced)", "SAP ERP", "Oracle Financials"],
    certifications: ["ACCA", "CPA Việt Nam", "ICAEW", "CFA"],
    pros:
      "The promotion ladder is unusually transparent year by year, you see a wide range of business models, and the professional network you build is exceptional.",
    cons:
      "Busy season (December to March) is punishing, the time pressure is real, and travel to provincial clients or overtime is routine.",
    applicationTips:
      "Get your English up, especially spoken, work on teamwork, and learn how the Big4 annual recruitment cycle actually runs.",
  },

  "investment-banking": {
    title: "Investment Banking",
    summary:
      "Advises on M&A, raises capital (IPOs, bonds) and values companies for corporate and institutional clients.",
    responsibilities: [
      "Build complex valuation models for M&A and IPO deals",
      "Prepare offering materials (pitch books, information memoranda)",
      "Support due diligence and work with lawyers and auditors on the deal",
      "Research the industry and competitors to feed the strategic advice",
    ],
    skills: [
      "Advanced valuation",
      "Deep Excel/PowerPoint",
      "Strong English",
      "Holding up under pressure",
      "CFA is a major advantage",
    ],
    entryLevel: "Junior - highly competitive, usually favours CFA Level I-II or a relevant internship",
    salaryHint: "VND 15-30M (Analyst) • VND 40-80M+ (Associate and above)",
    searchKeyword: "Investment Banking",
    dayInLife:
      "Build the pitch book for a large client's capital raise, value the company on an LBO/M&A basis, and work through the night to finish the bond offering documents.",
    careerPath: ["Analyst", "Associate", "Vice President (VP)", "Director", "Managing Director (MD)"],
    requiredTools: ["Bloomberg Terminal", "Excel (Advanced Model)", "PowerPoint", "Capital IQ"],
    certifications: ["CFA (Chartered Financial Analyst)", "MBA"],
    pros:
      "Pay and bonuses are exceptional, you work directly with the leadership of major groups, and you sit on billion-dollar deals that reshape the market.",
    cons:
      "The hours are brutal (80-100 a week is common), deadline pressure is relentless, and burnout takes a high share of people out.",
    applicationTips:
      "Get genuinely fluent at complex company valuation and professional slide design, and back it with a CFA or a degree from a top university.",
  },

  "fund-manager": {
    title: "Fund / Portfolio Manager",
    summary:
      "Builds and runs an investment portfolio (equities, bonds, other assets) to hit the return target for the fund or the client.",
    responsibilities: [
      "Research and select assets that fit the fund's strategy",
      "Monitor and rebalance the portfolio as the market moves",
      "Manage portfolio risk and stay within the investment limits",
      "Report performance to investors and the board on schedule",
    ],
    skills: [
      "Investment analysis",
      "Portfolio risk management",
      "CFA/CIIA is a major advantage",
      "Deciding under pressure",
      "Macro and markets",
    ],
    entryLevel: "Senior - usually several years of investment analysis before running a portfolio",
    salaryHint: "VND 25-50M (Junior PM) • VND 60-150M+ (Senior PM + performance bonus)",
    searchKeyword: "Fund management",
    dayInLife:
      "Sit the investment committee on macro strategy, sign off large buy and sell orders, and meet the management of listed companies to judge how the business is really going.",
    careerPath: ["Research Analyst", "Portfolio Manager", "Chief Investment Officer (CIO)"],
    requiredTools: ["Bloomberg Terminal", "Reuters Eikon", "Excel (Portfolio Modeling)", "Matlab / Python"],
    certifications: ["CFA", "CIIA (Certified International Investment Analyst)", "Fund Management License"],
    pros:
      "Real decision-making authority over capital, deep exposure to both the macro picture and individual companies, and bonuses tied directly to the returns you produce.",
    cons:
      "Daily psychological weight from moves in the VN-Index you cannot predict, and having to explain the numbers to shareholders when they go against you.",
    applicationTips:
      "Run a personal portfolio with verifiable numbers so the CV has evidence, keep working through the CFA, and build the temperament to hold steady under pressure.",
  },

  "credit-officer": {
    title: "Credit Officer",
    summary:
      "Appraises loan applications from individuals and businesses, and manages the lending book at a bank or credit institution.",
    responsibilities: [
      "Collect and appraise loan files and the borrower's ability to repay",
      "Assess collateral and write the credit proposal",
      "Track, chase and work out overdue debt in the portfolio you own",
      "Advise on the credit products that fit the customer's need",
    ],
    skills: [
      "Credit appraisal",
      "Reading corporate customers' financial statements",
      "Communication and advising",
      "Holding up under sales KPIs",
      "Risk management",
    ],
    entryLevel: "Fresh/Junior - one of the most common ways graduates get into a bank",
    salaryHint: "VND 8-15M + KPI bonus (Fresher) • VND 20-35M+ (Senior)",
    searchKeyword: "Credit officer",
    dayInLife:
      "Meet corporate borrowers, go out to inspect the collateral and the factory in person, then write the credit proposal setting out repayment capacity and projected cash flow.",
    careerPath: ["Credit Officer", "Senior Credit Officer", "Branch Deputy Director", "Branch Director"],
    requiredTools: ["Core Banking Systems (T24, Flexcube)", "CIC System", "MS Excel"],
    certifications: ["CFA (Level I)", "Banking Academy Professional Certs"],
    pros:
      "You come to understand how Vietnamese businesses actually run, and the network of individual and corporate contacts you build is unusually strong.",
    cons:
      "Personal legal and financial responsibility if a loan turns bad, plus monthly pressure on disbursement targets and KPIs.",
    applicationTips:
      "Build negotiation and communication skills, learn to read an SME's core financial ratios quickly, and know the credit regulations properly.",
  },

  fpa: {
    title: "FP&A (Financial Planning & Analysis)",
    summary:
      "Builds the budget, forecasts the financials and analyses business performance so the company can decide internally.",
    responsibilities: [
      "Build the budget and forecast revenue and cost by period",
      "Analyse variance between actuals and plan",
      "Support leadership on investment decisions and cost cuts",
      "Build management reporting (dashboards, financial KPIs)",
    ],
    skills: [
      "Budgeting and forecasting",
      "Advanced Excel / BI tools",
      "Cost-benefit analysis",
      "Working across departments",
      "Commercial thinking",
    ],
    entryLevel: "Junior to Senior - often people moving over from accounting or audit after a few years",
    salaryHint: "VND 15-25M (Junior) • VND 30-60M+ (Senior/Manager)",
    searchKeyword: "FP&A",
    dayInLife:
      "Pull actual spend from each department, reconcile it against the approved budget, and put an optimal capital allocation proposal in front of the board.",
    careerPath: ["FP&A Analyst", "Senior FP&A Analyst", "FP&A Manager", "Head of FP&A", "CFO"],
    requiredTools: ["Oracle Hyperion", "SAP BPC", "Power BI", "Tableau", "Excel (Advanced)"],
    certifications: ["CMA (Certified Management Accountant)", "CIMA", "ACCA"],
    pros:
      "You work directly with and learn from senior management (CEO, CFO), and contribute straight into the growth strategy or the cost base.",
    cons:
      "You sit between departments, so budget and plan negotiations put you in the middle of internal conflicts.",
    applicationTips:
      "Learn a visualisation tool such as Power BI or Tableau to lift the quality of your management dashboards, and build real commercial judgement.",
  },

  "risk-management": {
    title: "Risk Management Officer",
    summary:
      "Identifies, measures and controls risk - credit, market and operational - inside a bank or financial institution.",
    responsibilities: [
      "Build and monitor the risk measurement models",
      "Set risk limits and raise early warnings when they are breached",
      "Work with other departments to reduce operational risk",
      "Report risk on the schedule the board and the regulator require",
    ],
    skills: [
      "Statistics and quantitative methods",
      "Knowing the regulations (Basel, State Bank of Vietnam)",
      "Basic Excel/SQL",
      "Systems thinking",
      "CFA/FRM is an advantage",
    ],
    entryLevel: "Junior to Senior - common at banks and securities firms",
    salaryHint: "VND 15-25M (Junior) • VND 35-70M+ (Senior)",
    searchKeyword: "Risk management",
    dayInLife:
      "Run the Value at Risk model, stress test the bank's credit book against a rate shock, and update the Basel III compliance reporting.",
    careerPath: ["Risk Analyst", "Senior Risk Analyst", "Risk Manager", "Chief Risk Officer (CRO)"],
    requiredTools: ["SQL", "SAS", "R / Python", "Excel", "RiskManager System"],
    certifications: ["FRM (Financial Risk Manager)", "PRM", "CFA"],
    pros:
      "Technical, protective work with none of the direct disbursement targets the business side carries, and it is stable over the long run.",
    cons:
      "The business side sometimes treats you as the thing slowing them down, and the quantitative and statistical work is genuinely demanding.",
    applicationTips:
      "Go for the FRM to prove the specialism, and practise writing SQL well enough to pull your own data.",
  },

  "investment-analyst": {
    title: "Investment Analyst (CFA Track)",
    summary:
      "Researches industries and companies, builds the investment case, and issues buy/sell recommendations for a securities firm or fund.",
    responsibilities: [
      "Research one or a few industries in depth",
      "Write analysis and investment recommendation reports",
      "Update valuation models as new results come in",
      "Present the investment case to the investment committee or clients",
    ],
    skills: [
      "Industry and company analysis",
      "Valuation (DCF, P/E, EV/EBITDA, ...)",
      "Writing research reports",
      "CFA is a very large advantage",
      "English",
    ],
    entryLevel: "Junior - many securities firms hire fresh CFA Level I/II candidates",
    salaryHint: "VND 12-22M (Junior) • VND 30-60M+ (Senior Analyst)",
    searchKeyword: "Investment analyst",
    dayInLife:
      "Read the statements of companies across one sector to find the cheap one, write the detailed industry note, and present it to the fund's investment committee.",
    careerPath: ["Research Associate", "Research Analyst", "Senior Research Analyst", "Head of Research"],
    requiredTools: ["Bloomberg Terminal", "Excel (Modeling)", "PowerPoint", "Python (Web Scraping)"],
    certifications: ["CFA (Chartered Financial Analyst)", "SEC License"],
    pros:
      "The work is research for its own sake, you keep learning new business models, and you get direct access to the leadership of large listed companies.",
    cons:
      "Heavy pressure on being right, because a buy or sell call moves client or fund money directly, and the daily reading volume is enormous.",
    applicationTips:
      "Write a few polished sample investment pitch reports to send with your CV, and start the CFA exams as early as you can.",
  },

  "cfo-track": {
    title: "Chief Accountant / CFO Track",
    summary:
      "Runs the whole finance and accounting function, and advises the executive team on financial strategy.",
    responsibilities: [
      "Own and stand behind the accuracy of the financial statements",
      "Set financial strategy and raise capital for the business",
      "Manage cash flow and control financial risk across the group",
      "Advise the executive team on major investment and M&A decisions",
    ],
    skills: [
      "Corporate financial management",
      "Leading a team",
      "CMA/ACCA/CFA is an advantage",
      "Strategic thinking",
      "Negotiating with banks and investors",
    ],
    entryLevel: "Senior - where you land after 7-10+ years in accounting or finance",
    salaryHint: "VND 40-80M (Chief Accountant) • VND 100M+ (CFO of a large group)",
    searchKeyword: "Chief accountant",
    dayInLife:
      "Negotiate a project credit line with the major banks, review the group's consolidated statements, and advise the CEO directly on the next acquisition.",
    careerPath: ["Finance Manager", "Financial Controller", "Chief Accountant", "Chief Financial Officer (CFO)"],
    requiredTools: ["ERP Systems (SAP, Oracle)", "BI Dashboards", "Excel (Strategic Models)", "Board portals"],
    certifications: ["CPA", "ACCA", "CMA", "CFA"],
    pros:
      "The top of the corporate finance ladder, with pay to match and influence over where the whole business goes long term.",
    cons:
      "Enormous legal responsibility and workload, and you are the one who has to take the hardest financial problems to the board.",
    applicationTips:
      "Get management experience across several areas (accounting, cash flow, FP&A), and build both strategic leadership and the outward-facing side.",
  },

  stockbroker: {
    title: "Securities Broker",
    summary:
      "Advises on equity investments, opens accounts and executes trades for individual or institutional clients at a securities firm.",
    responsibilities: [
      "Find new clients and look after the existing book",
      "Read the market daily and advise on portfolio allocation",
      "Help with account opening, deposits and withdrawals, and order execution",
      "Watch margin balances and handle force sells when needed",
    ],
    skills: [
      "Technical analysis (TA)",
      "Communication and advising",
      "Holding up under sales KPIs",
      "Knowing securities law",
      "Reading news fast",
    ],
    entryLevel: "Fresh/Junior - wide open to energetic students who love the market",
    salaryHint: "VND 10-20M + commission (uncapped if the volume is there)",
    searchKeyword: "Securities broker",
    dayInLife:
      "Call 20 clients about their portfolios, track macro news and the VN-Index at the open and the close, and handle margin calls when the market moves.",
    careerPath: ["Broker", "Senior Broker", "Team Leader", "Head of Brokerage", "Brokerage Director"],
    requiredTools: ["SSI Pro / TCBS Active One, ...", "TradingView", "Excel", "Amibroker"],
    certifications: ["Broker licence (SSC)", "CFA (Level I)"],
    pros:
      "Income can jump sharply with trading volume, and you build relationships with serious investors across the market.",
    cons:
      "Sales KPIs are demanding, and income swings hard with the market cycle.",
    applicationTips:
      "Show real command of technical analysis, confident communication, and genuine interest in the market on your CV.",
  },

  treasury: {
    title: "Treasury Officer",
    summary:
      "Manages liquidity, cash flow, foreign exchange and short- and long-term funding at a bank or a large group.",
    responsibilities: [
      "Watch the daily cash and liquidity position",
      "Execute foreign exchange (FX) and money market (MM) trades",
      "Negotiate deposit rates and manage interest rate and FX risk",
      "Keep the regulatory liquidity ratios where they need to be",
    ],
    skills: [
      "Quantitative analysis",
      "A sharp instinct for the numbers",
      "Knowing the interbank market",
      "Negotiating rates and FX",
    ],
    entryLevel: "Junior - needs solid macro and monetary economics",
    salaryHint: "VND 15-25M (Junior) • VND 35-65M+ (Senior/Manager)",
    searchKeyword: "Treasury officer",
    dayInLife:
      "Check the liquidity balance at the open, execute the FX swaps, balance the bank's funding position, and report on interbank rate moves.",
    careerPath: ["Treasury Analyst", "Senior Dealer", "Treasury Manager", "Head of Treasury", "CFO"],
    requiredTools: ["Reuters Dealing", "Bloomberg Terminal", "Excel (Treasury Models)", "ERP (Treasury Module)"],
    certifications: ["ACI Dealing Certificate", "CFA", "FRM"],
    pros:
      "A fast trading environment, working directly with the large cash flows of a bank or group, and a genuinely specialised skill set.",
    cons:
      "Immediate pressure from FX and rate moves, and real responsibility for staying inside the liquidity safety margin.",
    applicationTips:
      "Highlight macro research projects and fast quantitative work, and prepare for the ACI Dealing Certificate or the CFA.",
  },

  "wealth-manager": {
    title: "Financial Planner / Wealth Manager",
    summary:
      "Advises individuals and builds their financial plan - portfolio, insurance, tax and retirement.",
    responsibilities: [
      "Analyse the client's current finances, cash flow and long-term goals",
      "Build a complete personal financial plan (saving, investing, retirement, insurance)",
      "Manage and restructure the asset portfolio against the client's risk appetite",
      "Review performance periodically and adjust the plan as the client's life changes",
    ],
    skills: [
      "Financial planning",
      "Portfolio management",
      "Advising and negotiation",
      "Knowing insurance and fund products",
      "Household-level macro",
    ],
    entryLevel: "Fresh/Junior - suits energetic people who like advising and personal financial services",
    salaryHint: "VND 12-22M + AUM commission • VND 30-70M+ (Senior Advisor)",
    searchKeyword: "Financial planning",
    dayInLife:
      "Meet a client to talk through their children's education and their retirement plan, review the current portfolio, and put together the optimal fund allocation.",
    careerPath: ["Associate Advisor", "Wealth Manager", "Senior Wealth Advisor", "Managing Director of Wealth"],
    requiredTools: ["MS Excel", "Financial Planning Tools", "CRM Systems", "Morningstar Advisor"],
    certifications: ["CFP (Certified Financial Planner)", "CFA", "LOMA"],
    pros:
      "Genuinely meaningful work helping individuals reach financial independence, flexible hours, and income that grows with the assets you manage.",
    cons:
      "It takes real communication and persuasion to earn trust in the first place, and the AUM targets carry their own pressure.",
    applicationTips:
      "Build broad knowledge across the investment options (equities, property, open-ended funds), get very good at presenting, and aim for the CFP.",
  },
};
