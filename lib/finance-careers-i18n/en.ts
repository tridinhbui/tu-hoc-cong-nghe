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

  quant: {
    title: "Quantitative Analyst (Quant)",
    summary:
      "Builds the mathematical models, automated trading algorithms and pricing systems for complex financial products, in code.",
    responsibilities: [
      "Research and develop statistical models that forecast asset prices",
      "Write algorithmic trading strategies",
      "Price complex derivatives and measure systemic risk",
      "Optimise execution speed and backtest the models",
    ],
    skills: [
      "Financial mathematics and statistics",
      "Python/C++/R",
      "Trading algorithms",
      "Machine learning",
      "Data structures",
    ],
    entryLevel: "Junior/Senior - fiercely competitive, with a very high bar in maths and applied computing",
    salaryHint: "VND 25-50M (Junior Quant) • VND 70-150M+ (Quant Trader / Senior Quant)",
    searchKeyword: "Quantitative Analyst",
    dayInLife:
      "Review yesterday's algorithm performance, write Python to test a new statistical signal on tick data, and shave latency off the execution path.",
    careerPath: ["Quant Researcher", "Senior Quant Analyst", "Quant Portfolio Manager", "Chief Quant Officer"],
    requiredTools: ["Python (NumPy/Pandas/Scikit-Learn)", "C++", "SQL", "Bloomberg API", "Git"],
    certifications: ["CQF (Certificate in Quantitative Finance)", "FRM", "CFA"],
    pros:
      "The most technical and mathematical corner of finance, with exceptional pay tied to algorithm PnL and little client-facing pressure.",
    cons:
      "The entry bar in maths and computing is severe (a master's or PhD is often expected), and the competition on models and technology never lets up.",
    applicationTips:
      "Put a public backtesting project on GitHub, and be ready for probability and algorithm problems in the interview.",
  },

  "valuation-specialist": {
    title: "Valuation Specialist",
    summary:
      "Establishes what a business, project, property or intangible asset is actually worth, for M&A, tax or audit purposes.",
    responsibilities: [
      "Value companies and shareholdings (DCF, multiples, asset-based)",
      "Value intangibles (brands, patents, goodwill)",
      "Write the detailed valuation report and defend the reasoning to auditors or clients",
      "Analyse market transaction data to find the right comparable multiples",
    ],
    skills: [
      "Valuation modelling",
      "Financial statement analysis",
      "Knowing valuation law and standards",
      "Critical thinking",
      "Deep Excel",
    ],
    entryLevel: "Fresh/Junior - hired into Big4 transaction advisory and independent valuation firms",
    salaryHint: "VND 12-22M (Fresher/Junior) • VND 25-50M+ (Senior/Manager)",
    searchKeyword: "Asset valuation",
    dayInLife:
      "Review the valuation model for a tech company about to merge, check it against comparable M&A deals, and write up the justification for the discount rate you chose.",
    careerPath: [
      "Valuation Associate",
      "Senior Valuation Specialist",
      "Valuation Manager",
      "Partner / Director of Advisory",
    ],
    requiredTools: ["MS Excel", "Capital IQ", "Bloomberg", "Valuation Databases"],
    certifications: ["CFA", "Valuer licence (Ministry of Finance)", "ASA (American Society of Appraisers)"],
    pros:
      "Deep knowledge of what actually creates value, work at large advisory firms, and exposure to a wide range of businesses.",
    cons:
      "Heavy pressure to justify every number when an independent auditor or a regulator questions it, and the documentation load is large.",
    applicationTips:
      "Know discounting cold (WACC, CAPM) and how intangibles are valued, and get good at writing a clear justification.",
  },

  "ir-specialist": {
    title: "Investor Relations Specialist (IR)",
    summary:
      "Runs communication between a listed company and its investors, shareholders, funds and sell-side analysts.",
    responsibilities: [
      "Prepare disclosures, investor newsletters and the quarterly results deck",
      "Run earnings calls, investor meetings and the annual general meeting",
      "Answer questions from shareholders and analysts about company strategy",
      "Track the shareholder register, the share price and what the market says about the company",
    ],
    skills: [
      "Corporate finance literacy",
      "Communication and diplomacy",
      "Writing press releases",
      "Professional PowerPoint",
      "Fluent English",
    ],
    entryLevel:
      "Junior/Senior - usually people with a PR/marketing plus finance background, or former sell-side analysts",
    salaryHint: "VND 15-28M (Junior/Mid) • VND 30-65M+ (Senior/Manager)",
    searchKeyword: "Investor relations",
    dayInLife:
      "Pull the new quarterly results from finance, write the press release in both Vietnamese and English, and build the deck for this afternoon's call with foreign funds.",
    careerPath: ["IR Officer", "IR Manager", "IR Director", "Chief Communications Officer / CFO"],
    requiredTools: ["PowerPoint", "Investor Relations Web Portal", "Excel", "Media monitoring tools"],
    certifications: ["CIRA (Certified Investor Relations Analyst)", "CFA (Level I or II)"],
    pros:
      "You sit exactly between company strategy and the capital markets, meet major global funds, and build an unusually wide financial network.",
    cons:
      "Constant pressure on the company's public image, disclosure is legally sensitive (insider trading rules), and AGM season is punishing.",
    applicationTips:
      "Get your financial English strong enough to translate both ways, write clearly, and know the disclosure rules for listed companies.",
  },

  "ma-origination": {
    title: "M&A Origination & Strategy (Pre-Deal)",
    summary:
      "Finds, screens and builds the strategic case for potential M&A deals, before a deal formally starts.",
    responsibilities: [
      "Screen the market for target companies that fit the growth strategy",
      "Build the strategic rationale - why this deal creates value over the long run",
      "Run a preliminary valuation to estimate a fair price before approaching",
      "Make the first approach and build the relationship with the owner or the fund holding the target",
    ],
    skills: [
      "Industry and competitor analysis",
      "Preliminary valuation",
      "Corporate strategy thinking",
      "Networking",
      "Presenting an investment case",
    ],
    entryLevel:
      "Junior to Senior - usually from investment banking or an in-house corporate development team",
    salaryHint: "VND 20-35M (Junior) • VND 50-90M+ (Senior/Director)",
    searchKeyword: "M&A Origination",
    dayInLife:
      "Screen 30 companies in the sector for a fit, build the strategic case for the board, and prepare the first meeting with the target's owner.",
    careerPath: [
      "Corporate Development Analyst",
      "M&A Origination Associate",
      "Head of Corporate Development",
      "Chief Strategy Officer (CSO)",
    ],
    requiredTools: ["Capital IQ", "Bloomberg Terminal", "Excel (Screening Models)", "PowerPoint"],
    certifications: ["CFA", "An MBA is a major advantage"],
    pros:
      "You see the strategic picture of a whole sector rather than one deal, build a wide network of owners and funds, and face less deadline pressure than the execution side.",
    cons:
      "Most of what you screen never becomes a real deal - the low hit rate wears on you, and the relationship building pays off only over years.",
    applicationTips:
      "Show strategic thinking through your own case studies (\"if I ran company X, who would I buy and why\"), get fast at preliminary valuation, and network properly.",
  },

  "ma-execution": {
    title: "M&A Execution - DD & Financing (In-Deal)",
    summary:
      "Executes the deal itself - due diligence, arranging the financing, and negotiating terms with the other side.",
    responsibilities: [
      "Coordinate due diligence (financial, legal, commercial, operational) with auditors and lawyers",
      "Build the detailed valuation model (DCF, LBO, comps) and the deal structure",
      "Arrange the financing (debt, bond issuance, equity)",
      "Negotiate the sale and purchase agreement alongside the legal team",
    ],
    skills: [
      "Financial due diligence",
      "Advanced valuation (DCF/LBO)",
      "Deal structuring and financing",
      "Negotiation",
      "Working to hard deadlines",
    ],
    entryLevel:
      "Junior - the classic Analyst/Associate seat at investment banks and Big4 transaction advisory",
    salaryHint: "VND 18-32M (Analyst) • VND 45-85M+ (Associate/VP)",
    searchKeyword: "M&A Execution",
    dayInLife:
      "Reconcile the financial due diligence against the audited accounts, update the LBO model for the latest financing structure, and sit with the lawyers over the SPA before signing.",
    careerPath: ["M&A Analyst", "M&A Associate", "Vice President (VP)", "Director / Head of M&A"],
    requiredTools: [
      "Excel (LBO/DCF Models)",
      "Bloomberg Terminal",
      "Capital IQ",
      "Virtual Data Room (Datasite, Intralinks)",
    ],
    certifications: ["CFA (Chartered Financial Analyst)", "MBA"],
    pros:
      "You run a billion-dollar deal from start to signing, learn complex deal structures fast, and sit in the middle connecting the buy side and the sell side.",
    cons:
      "The most punishing hours in finance (80-100 a week when a deal is closing), and a deal can collapse at the last minute after months of work.",
    applicationTips:
      "Get fluent at complex LBO and DCF models, understand the debt/equity mix, and be ready for a high-pressure environment with tight deadlines.",
  },

  "pmi-specialist": {
    title: "Post-Merger Integration - PMI (Post-Deal)",
    summary:
      "Makes the synergies promised in an M&A deal actually happen, by merging the systems, processes and people of two organisations.",
    responsibilities: [
      "Plan the first 100 days after close (Day-1 and 100-day plan)",
      "Merge the finance and accounting systems, the ERP and the operating processes of both sides",
      "Track and report synergy delivery against what was committed to the board",
      "Run change management - handle the culture clash between the two organisations",
    ],
    skills: [
      "Complex project management",
      "Merging finance/ERP systems",
      "Change and culture management",
      "Measuring synergy for real",
      "Communicating across departments",
    ],
    entryLevel:
      "Senior - usually from management consulting, FP&A, or M&A execution people with operating experience",
    salaryHint: "VND 25-45M (PMI Manager) • VND 60-110M+ (Head of Integration)",
    searchKeyword: "Post-Merger Integration",
    dayInLife:
      "Sit with the finance heads of both merged companies to agree one ERP, then review cost synergy delivery against the original commitment for the board.",
    careerPath: ["Integration Analyst", "PMI Manager", "Head of Integration", "Chief Operating Officer (COO)"],
    requiredTools: [
      "Project Management Tools (Asana, MS Project)",
      "ERP Systems (SAP/Oracle)",
      "Excel (Synergy Tracking)",
      "PowerPoint",
    ],
    certifications: ["PMP (Project Management Professional)", "MBA", "CFA is an advantage"],
    pros:
      "A little-known role that decides whether a deal actually worked - most of the synergy promised on paper only lands because PMI did its job - and you learn finance alongside operations and leading people.",
    cons:
      "Clearing up after the party gets less attention than the deal team, and you have to handle the culture and internal politics of two just-merged organisations, which is delicate.",
    applicationTips:
      "Combine the finance story (reading synergy) with people and change management on your CV - candidates with both are rare, so proving it is a real advantage.",
  },

  "pe-vc-analyst": {
    title: "Private Equity / Venture Capital Analyst",
    summary:
      "Finds, screens and invests in private companies (PE) or early-stage startups (VC), then supports their growth until exit.",
    responsibilities: [
      "Source and screen investment opportunities that fit the fund's strategy",
      "Run due diligence on the company or startup (commercial, financial, management)",
      "Build the valuation model and structure the deal (equity stake, board seat, investor protections)",
      "Work with portfolio companies on growth until exit",
    ],
    skills: [
      "Valuing private companies",
      "End-to-end due diligence",
      "Negotiating the term sheet",
      "Judging the founding and management team",
      "Patience for a long holding period",
    ],
    entryLevel:
      "Junior to Senior - very competitive, usually from investment banking, consulting, or founders with startup experience",
    salaryHint: "VND 20-40M (Analyst/Associate) • VND 60-150M+ (Principal/Partner + carried interest)",
    searchKeyword: "Private Equity Venture Capital",
    dayInLife:
      "Meet the founder of a fintech raising a Series A, work through the business model and unit economics, then update the valuation model for the fund's investment committee.",
    careerPath: ["Analyst", "Associate", "Principal", "Partner / Managing Director"],
    requiredTools: ["Excel (LBO/VC Models)", "PitchBook / Preqin", "Capital IQ", "Investment CRM (Affinity)"],
    certifications: ["CFA", "CAIA (Chartered Alternative Investment Analyst)", "MBA"],
    pros:
      "Direct contact with founders and the newest business models in the market. Fund size changes everything - under USD 30M, under USD 100M and under USD 300M AUM each demand a different investment strategy and team structure - so the learning is unusually varied, and carried interest pays well if the fund works.",
    cons:
      "The cycle is long (5-10 years to exit), portfolio failure rates stay high even after careful diligence, and getting in is fiercely competitive because there are so few seats.",
    applicationTips:
      "Write a sample investment memo on a real company or startup to attach to your CV, understand how fund AUM tier shapes investment appetite, and a founder network is a real advantage.",
  },

  "compliance-officer": {
    title: "Compliance Officer",
    summary:
      "Keeps a bank or securities firm fully within the law, the anti-money-laundering rules, and professional ethics.",
    responsibilities: [
      "Write and update compliance policy against the latest central bank and securities commission rules",
      "Review unusual transactions and run the AML/KYC process",
      "Train the business staff internally on the compliance rules",
      "Report breaches and propose remediation to the board",
    ],
    skills: [
      "Banking and financial law",
      "AML/KYC procedures",
      "Systems thinking and detailed review",
      "Delivering internal training",
      "Professional ethics",
    ],
    entryLevel: "Junior to Senior - common at banks, securities firms and funds with foreign ownership",
    salaryHint: "VND 15-25M (Junior) • VND 35-65M+ (Senior/Manager)",
    searchKeyword: "Compliance Officer",
    dayInLife:
      "Review the day's large transactions for money-laundering signals, update internal policy for the central bank's new circular, and run a compliance session for the sales floor.",
    careerPath: [
      "Compliance Analyst",
      "Senior Compliance Officer",
      "Compliance Manager",
      "Chief Compliance Officer (CCO)",
    ],
    requiredTools: ["AML Screening Systems", "Excel", "Regulatory Databases", "Case Management Tools"],
    certifications: ["CAMS (Certified Anti-Money Laundering Specialist)", "CFA (Level I is an advantage)"],
    pros:
      "A gatekeeping role that protects the institution from serious legal risk, with stable office hours and none of the sales pressure.",
    cons:
      "The business side sometimes treats you as the obstacle to getting a deal done, and the volume of regulation to keep up with can be dull unless you genuinely like the subject.",
    applicationTips:
      "Know the current central bank and securities commission circulars, build real attention to detail, and consider the CAMS to stand out.",
  },

  "internal-audit": {
    title: "Internal Audit Specialist",
    summary:
      "Independently assesses the internal controls, operating processes and risk management of the company you work for.",
    responsibilities: [
      "Build the annual internal audit plan from a material risk assessment",
      "Test each department's operational, financial and compliance processes",
      "Find the control gaps and propose the fix",
      "Report findings directly to the Audit Committee or the board",
    ],
    skills: [
      "Assessing internal control",
      "Process analysis",
      "Accounting and auditing standards",
      "Report writing",
      "Independence and objectivity",
    ],
    entryLevel: "Junior to Senior - common at large groups, banks and listed companies",
    salaryHint: "VND 14-24M (Junior) • VND 35-60M+ (Senior/Manager)",
    searchKeyword: "Internal audit",
    dayInLife:
      "Interview the warehouse manager about inventory controls, check the actual paperwork against the written process, and draft the control-gap report for the Audit Committee.",
    careerPath: [
      "Internal Audit Associate",
      "Senior Internal Auditor",
      "Internal Audit Manager",
      "Head of Internal Audit",
    ],
    requiredTools: ["ACL / IDEA (Audit Analytics)", "Excel (Advanced)", "ERP Systems", "GRC Software"],
    certifications: ["CIA (Certified Internal Auditor)", "ACCA", "CPA Việt Nam"],
    pros:
      "You see the whole business through a risk lens, with less seasonal crunch than external audit, and a clear path into risk management or corporate governance.",
    cons:
      "Departments under audit get defensive, and it takes independence and nerve to report honestly when the finding will not be welcome internally.",
    applicationTips:
      "Get good at interviewing and at writing objectively, take the CIA to prove the specialism, and show systematic risk thinking on your CV.",
  },

  "tax-advisory": {
    title: "Tax Advisory Specialist",
    summary:
      "Advises businesses and individuals on legal tax optimisation, and handles complex filings and settlements.",
    responsibilities: [
      "Advise on tax-efficient deal structures (M&A, transfer pricing, restructuring)",
      "Review and prepare corporate income tax, VAT and capital transfer tax filings",
      "Represent clients with the tax authority during inspections and settlements",
      "Track new tax policy and advise on what it changes",
    ],
    skills: [
      "Vietnamese and international tax law",
      "Transfer pricing",
      "Financial statement analysis",
      "Negotiating with the tax authority",
      "Deep Excel",
    ],
    entryLevel:
      "Fresh/Junior - hired in volume by Big4 tax practices and independent tax advisory firms",
    salaryHint: "VND 10-20M (Fresher/Junior) • VND 25-55M+ (Senior/Manager)",
    searchKeyword: "Tax advisory",
    dayInLife:
      "Review the transfer pricing file between a parent and its foreign subsidiary, prepare the defence for the coming tax inspection, and advise a client on the tax effect of a restructuring.",
    careerPath: ["Tax Associate", "Senior Tax Consultant", "Tax Manager", "Tax Partner / Director"],
    requiredTools: ["Excel (Tax Models)", "E-filing software", "Tax Research Databases"],
    certifications: ["CPA Việt Nam", "ACCA (F6/P6 Tax)", "Tax Agent Certificate"],
    pros:
      "Deep tax knowledge is scarce and always in demand, fees on large deals are attractive, and you work across both domestic and foreign-invested businesses.",
    cons:
      "Tax law changes constantly so the reading never stops, year-end settlement season is heavy, and bad advice creates real legal exposure for the client.",
    applicationTips:
      "Know the current corporate income tax and VAT law well, go deep on transfer pricing (the live topic for foreign-invested firms), and start the CPA or ACCA route early.",
  },

  "esg-analyst": {
    title: "ESG / Sustainable Finance Analyst",
    summary:
      "Assesses the environmental, social and governance profile of companies, and folds it into investment decisions and sustainable portfolios.",
    responsibilities: [
      "Build the ESG scoring framework for companies in the portfolio",
      "Analyse non-financial risk (environmental, labour, corporate governance)",
      "Write ESG and sustainability reports to international standards (GRI, SASB)",
      "Advise funds and companies on green finance strategy and sustainable bonds",
    ],
    skills: [
      "ESG frameworks (GRI, SASB, TCFD)",
      "Reading sustainability reports",
      "Non-financial risk management",
      "Technical English",
      "Cross-disciplinary thinking",
    ],
    entryLevel:
      "Junior/Senior - an emerging field in Vietnam, hiring from either finance or environment/sustainability backgrounds",
    salaryHint: "VND 15-28M (Junior) • VND 35-65M+ (Senior)",
    searchKeyword: "ESG Analyst",
    dayInLife:
      "Score 15 portfolio companies on ESG from their sustainability reports, check them against the GRI standard, and tell the investment team why one stock should be dropped on governance risk.",
    careerPath: [
      "ESG Analyst",
      "Senior ESG Analyst",
      "Head of Sustainable Investing",
      "Chief Sustainability Officer (CSO)",
    ],
    requiredTools: ["MSCI ESG Ratings", "Bloomberg ESG Data", "Excel", "Sustainability Reporting Frameworks"],
    certifications: ["CFA ESG Investing Certificate", "SASB FSA Credential", "CFA (Level I-II)"],
    pros:
      "A field growing fast globally and starting to matter in Vietnam, with genuine social impact and the chance to build a specialism while it is still new.",
    cons:
      "Vietnam has no fully standardised ESG data or regulatory framework yet, and traditional boards can be hard to convince that ESG ranks alongside returns.",
    applicationTips:
      "Teach yourself the international frameworks (GRI, SASB) from the free material, and follow the Vietnamese listed companies already publishing sustainability reports so you have real examples in the interview.",
  },

  "retail-banking-rm": {
    title: "Retail Banking Relationship Manager",
    summary:
      "Advises on and sells retail banking products (savings, consumer loans, credit cards, insurance) to individual customers at a branch.",
    responsibilities: [
      "Advise on savings, consumer loans and credit cards that fit the customer",
      "Look after and keep the existing individual customer book",
      "Do the initial screening on consumer and mortgage applications before credit takes them",
      "Hit the deposit targets and cross-sell",
    ],
    skills: [
      "Selling and advising",
      "Knowing the retail banking products",
      "Holding up under KPIs",
      "Building customer relationships",
      "Handling complaints",
    ],
    entryLevel: "Fresh/Junior - the most common way into banking, hiring in volume every year",
    salaryHint: "VND 8-14M + KPI commission (Fresher) • VND 18-30M+ (Senior RM)",
    searchKeyword: "Retail relationship manager",
    dayInLife:
      "Walk a young customer through their first mortgage, call ten savings customers whose deposits are maturing, and finish the credit card application for a new one.",
    careerPath: ["Relationship Manager", "Senior RM", "Branch Deputy Director", "Branch Director"],
    requiredTools: ["Core Banking Systems", "Internal CRM", "Basic Excel"],
    certifications: ["In-house banking certificates", "CFA (Level I is a long-term advantage)"],
    pros:
      "The widest opening in banking for graduates, a fast way to build communication and sales skills, and a fairly clear path to running a branch.",
    cons:
      "Monthly targets never stop, income swings with commission when you miss KPIs, and you handle the difficult customers and the complaints.",
    applicationTips:
      "Show confident communication and that you can work under pressure, and read up on the bank's flagship products so you can handle the advisory case study.",
  },

  "real-estate-finance": {
    title: "Real Estate Finance / REIT Analyst",
    summary:
      "Analyses and values property projects and assets, arranges project funding, and assesses REIT investment performance.",
    responsibilities: [
      "Value property projects on cap rate, DCF and comparable transactions",
      "Build the project development model from construction through to operation",
      "Structure the funding (bank debt, project bonds, equity) for the developer",
      "Track leasing performance, occupancy and cash flow on operating assets",
    ],
    skills: [
      "Property valuation (cap rate, DCF)",
      "Project financial modelling",
      "Land and property law",
      "Project capital structure",
      "Deep Excel",
    ],
    entryLevel:
      "Junior/Senior - hired by large developers, property funds and Big4 real estate transaction advisory",
    salaryHint: "VND 15-28M (Junior) • VND 35-70M+ (Senior/Manager)",
    searchKeyword: "Real estate finance",
    dayInLife:
      "Update an apartment project's model against actual construction progress, work out the cap rate on an office building for sale, and sit with the bank on the new project loan.",
    careerPath: [
      "Real Estate Analyst",
      "Senior Analyst",
      "Investment Manager",
      "Head of Real Estate Investment",
    ],
    requiredTools: ["Excel (Development/DCF Models)", "ARGUS Enterprise", "AutoCAD (basic)", "Capital IQ"],
    certifications: ["CFA", "Property Valuation Certificate (Ministry of Construction)", "MBA"],
    pros:
      "Property is still the largest asset class in Vietnam so the expertise is in demand, you work on large tangible projects you can go and look at, and senior pay is strong.",
    cons:
      "The market is strongly cyclical, land and legal policy changes hit the work directly, and large projects run for years, which takes patience.",
    applicationTips:
      "Build a DCF and cap rate model for one specific project to put on your CV, keep up with land law and zoning, and understand the Vietnamese property cycle.",
  },

  "insurance-actuarial": {
    title: "Insurance & Actuarial Analyst",
    summary:
      "Uses statistics and probability to price insurance, assess risk, and keep the insurer solvent over the long run.",
    responsibilities: [
      "Build the pricing model for new life and non-life products",
      "Calculate technical reserves and assess the insurer's solvency",
      "Analyse historical loss data to forecast risk and adjust premiums",
      "Report the company's financial position to the insurance regulator on schedule",
    ],
    skills: [
      "Advanced probability and statistics",
      "Insurance pricing models",
      "Excel/SQL/R",
      "Knowing the insurance regulations",
      "Working with large datasets",
    ],
    entryLevel:
      "Junior/Senior - needs strong maths and statistics, and the actuarial exam route runs for years",
    salaryHint: "VND 15-28M (Junior Actuarial Analyst) • VND 45-90M+ (Fellow Actuary/Senior)",
    searchKeyword: "Actuarial Analyst",
    dayInLife:
      "Run the mortality model for a new life product, reconcile last quarter's motor loss data, and write part of the solvency report for the Ministry of Finance.",
    careerPath: ["Actuarial Analyst", "Associate Actuary", "Fellow Actuary", "Chief Actuary"],
    requiredTools: ["Excel (Advanced)", "R / Python", "SQL", "Actuarial Software (Prophet, AXIS)"],
    certifications: ["Actuarial qualification (SOA/IFoA - a long multi-exam route)", "FRM is an advantage"],
    pros:
      "One of the best-paid senior roles in finance, with a high technical barrier that keeps competition low (few people finish the exam route), and stable, respected work.",
    cons:
      "The professional exam route (SOA/IFoA) takes years and is genuinely hard, it needs strong maths from the start, and the number of Vietnamese roles is still limited.",
    applicationTips:
      "A maths, statistics or actuarial science degree is a real advantage, start the exams as early as you can, and get comfortable in R or Python for the data work.",
  },

  "family-office-advisor": {
    title: "Family Office / Private Banking Advisor",
    summary:
      "Manages the whole financial picture for high-net-worth families and individuals, from investments through to succession planning.",
    responsibilities: [
      "Build a diversified allocation strategy (equities, property, private equity, alternatives)",
      "Plan inheritance and the transfer of wealth between generations",
      "Coordinate the specialist services around the client (tax, legal, insurance)",
      "Hold a long-term relationship of trust and report on the whole portfolio regularly",
    ],
    skills: [
      "Whole-of-wealth planning",
      "Succession and generational transfer",
      "Advising with strict confidentiality",
      "Knowing many asset classes",
      "Building trust over years",
    ],
    entryLevel:
      "Senior - usually experienced wealth managers or private bankers who already have the network",
    salaryHint: "VND 30-55M (Junior Advisor) • VND 80-200M+ (Senior/Partner + AUM fees)",
    searchKeyword: "Family Office Advisor",
    dayInLife:
      "Meet the second generation of a business family about transferring company shares, review the family's multi-asset portfolio, and work with the lawyers on the trust structure.",
    careerPath: ["Private Banking Associate", "Private Banker", "Family Office Advisor", "Managing Partner"],
    requiredTools: ["Financial Planning Software", "Portfolio Management Systems", "Premium CRM", "Excel"],
    certifications: ["CFP (Certified Financial Planner)", "CFA", "STEP (Trust and Estate Practitioner)"],
    pros:
      "Very high senior earnings from large AUM fees, deep trusted relationships with the most powerful families in the market, and work that goes well beyond investing (legal, tax, estate).",
    cons:
      "It takes years of experience and a network before you can start, absolute discretion is required because the information is highly sensitive, and the pressure to retain large clients is real.",
    applicationTips:
      "Build the personal financial planning foundation first (CFP), spend time as a wealth manager to learn what wealthy clients actually need, and invest seriously in long-term relationship skills.",
  },

  "fintech-product-finance": {
    title: "FinTech Product Finance Specialist",
    summary:
      "Combines finance and technology to build and run digital financial products (e-wallets, P2P lending, payments, blockchain).",
    responsibilities: [
      "Analyse the business model and unit economics of the fintech product",
      "Assess credit and fraud risk from large datasets for digital lending",
      "Work with product and engineering to design new financial features (BNPL, e-wallets)",
      "Track product financial performance and propose revenue or cost improvements",
    ],
    skills: [
      "Unit economics for digital products",
      "Fintech domain knowledge (payments, lending)",
      "SQL / data analysis",
      "Product thinking",
      "Digital credit risk management",
    ],
    entryLevel: "Junior/Senior - a fast-growing field, hiring from finance, data or consulting backgrounds",
    salaryHint: "VND 18-30M (Junior) • VND 40-80M+ (Senior/Product Finance Lead)",
    searchKeyword: "FinTech Finance",
    dayInLife:
      "Break down the digital consumer loan book's bad-debt rate by customer segment, meet product about a new instalment feature, and update next quarter's e-wallet revenue forecast.",
    careerPath: [
      "Financial Analyst (FinTech)",
      "Product Finance Manager",
      "Head of Risk & Finance",
      "VP of Finance",
    ],
    requiredTools: ["SQL", "Python/R (data analysis)", "Excel", "BI Tools (Looker, Tableau)"],
    certifications: ["CFA", "FRM (for digital credit risk)", "Data Analytics certificates"],
    pros:
      "A fast-growing sector with new roles opening, a startup and technology culture unlike traditional finance, and a scarce skill set that spans both.",
    cons:
      "The sector is young so the regulation is incomplete, volatility is higher than in traditional finance (some fintechs fail or shrink), and the technology keeps moving.",
    applicationTips:
      "Pair the finance story with real product and technology understanding on your CV, learn SQL and basic data analysis, and follow the fintech successes and failures in Vietnam and Southeast Asia.",
  },

  "macro-research-analyst": {
    title: "Macro / Economic Research Analyst",
    summary:
      "Analyses the macro picture - rates, inflation, FX, monetary policy - to produce forecasts and strategy calls for a bank or fund.",
    responsibilities: [
      "Track and analyse the macro indicators (GDP, CPI, FX, policy rates)",
      "Write the periodic economic outlook (monthly and quarterly)",
      "Forecast what monetary and fiscal policy will do to financial markets",
      "Advise the investment team on macro asset allocation under each scenario",
    ],
    skills: [
      "Macroeconomic analysis",
      "Econometric forecasting models",
      "Writing research",
      "Following monetary and fiscal policy",
      "Research-level English",
    ],
    entryLevel: "Junior/Senior - usually economics graduates with strong macro reasoning",
    salaryHint: "VND 15-25M (Junior) • VND 35-70M+ (Senior Economist)",
    searchKeyword: "Macro Research Analyst",
    dayInLife:
      "Work through the CPI print and what it means for the central bank's next rate decision, update the USD/VND forecast model, and write the quarterly macro outlook for the investment team.",
    careerPath: ["Economic Research Analyst", "Senior Economist", "Head of Macro Research", "Chief Economist"],
    requiredTools: [
      "Bloomberg Terminal",
      "Excel/Eviews (Econometrics)",
      "Python/R",
      "Macro databases (IMF, World Bank)",
    ],
    certifications: ["CFA", "A master's in economics is a major advantage"],
    pros:
      "You build a view of the whole economy rather than one company or sector, your forecasts feed large investment decisions, and there are chances to appear publicly as an expert.",
    cons:
      "Macro forecasts are not very accurate because too many variables move at once, the news and data need watching outside office hours, and a badly wrong call costs you credibility.",
    applicationTips:
      "Have solid economics (macro, econometrics), write a sample macro note on a live topic (inflation, FX), and follow the central bank, IMF and World Bank reporting closely.",
  },

  "personal-financial-advisor": {
    title: "Personal Financial Advisor",
    summary:
      "Advises individuals on managing income, saving, basic investing (stocks, ETFs) and building a plan that fits their life goals.",
    responsibilities: [
      "Assess the client's current finances and goals (a home, retirement, children's education)",
      "Build a saving and investing plan that fits their risk appetite",
      "Explain the basic products (stocks, ETFs, open-ended funds) in plain language",
      "Review regularly and adjust the plan as their circumstances change",
    ],
    skills: [
      "Personal financial planning",
      "Communication and advising",
      "Basic investment knowledge",
      "Listening to what the client actually needs",
      "Excel for financial planning",
    ],
    entryLevel: "Fresh/Junior - suits people who like advising, and needs solid personal finance grounding",
    salaryHint: "VND 12-20M (Junior) • VND 25-45M+ (Senior/Partner)",
    searchKeyword: "Personal financial advice",
    dayInLife:
      "Meet a new client who wants to start investing, build a savings and investment plan around buying a home in five years, and update an existing client on their ETF progress.",
    careerPath: ["Advisor", "Senior Advisor", "Advisory Team Lead", "Branch Advisory Director"],
    requiredTools: ["Excel / financial planning tools", "Client CRM", "ETF and brokerage platforms"],
    certifications: ["CFP (Certified Financial Planner)", "Basic securities practice licence"],
    pros:
      "Meaningful work that directly improves someone's financial life, no advanced maths required, and room to build a personal brand and your own client base.",
    cons:
      "Early income depends heavily on how many clients you have, credibility and trust take time to build, and you explain the same basics repeatedly.",
    applicationTips:
      "Build a financial plan for yourself or a family member as a case study for your CV, and practise explaining investment concepts simply.",
  },

  "financial-coach": {
    title: "Personal Finance Coach",
    summary:
      "Coaches clients through changing spending habits, building saving discipline and healthier money thinking - behaviour rather than investment products.",
    responsibilities: [
      "Coach one-to-one or in groups on budgeting and spending habits",
      "Help clients spot and change their money psychology mistakes (FOMO, emotional spending)",
      "Build personal finance content and courses (articles, video, workshops)",
      "Track progress toward the client's goals (clearing debt, an emergency fund)",
    ],
    skills: [
      "Behavioural coaching",
      "Personal finance fundamentals",
      "Building educational content",
      "Empathy and listening",
      "Presenting",
    ],
    entryLevel: "Fresh/Junior - suits people who like teaching and helping others",
    salaryHint: "VND 10-18M (Junior/Freelance) • VND 20-40M+ (an established coach with a brand)",
    searchKeyword: "Personal finance coach",
    dayInLife:
      "Run a one-to-one session with a client trying to get out of consumer debt, write a piece on FOMO in investing, and prepare the weekend savings workshop.",
    careerPath: [
      "Financial Coach",
      "Senior coach with an established brand",
      "Founder of a financial education programme",
      "Speaker / author",
    ],
    requiredTools: ["Content platforms (video, blog)", "Budgeting tools", "Zoom / online coaching platforms"],
    certifications: ["Coaching certification (ICF is an advantage)", "CFP as a further advantage"],
    pros:
      "Direct and visible impact on how people handle money, flexible work (freelance or remote), and a strong personal brand is genuinely achievable through content.",
    cons:
      "Income is unstable early on, credibility and an audience take time, and the role is easily confused with investment advice, so the boundary has to be clear.",
    applicationTips:
      "Build a small content channel (blog, Instagram, TikTok) to prove you can explain things, and coach friends or family for free first.",
  },

  "insurance-financial-advisor": {
    title: "Insurance & Financial Protection Advisor",
    summary:
      "Advises on financial protection (life, health and property insurance) so clients are covered against sudden financial risk - distinct from the actuary's pricing role.",
    responsibilities: [
      "Analyse the client's protection needs (income, family, assets)",
      "Advise on and design the right cover (life, health, property)",
      "Explain the terms, benefits and exclusions clearly",
      "Support the client through a claim when one is needed",
    ],
    skills: [
      "Insurance product knowledge",
      "Advising and communication",
      "Assessing individual risk",
      "Building long-term relationships",
      "Professional ethics",
    ],
    entryLevel:
      "Fresh/Junior - needs the agent licence, and suits people who like advising and sales",
    salaryHint: "VND 8-15M + commission (Junior) • VND 25-60M+ (Senior with a large book)",
    searchKeyword: "Insurance advisor",
    dayInLife:
      "Meet a newly married couple about life cover to protect their income, process a claim for an existing client, and sit the training session on a new product.",
    careerPath: ["Agent / Advisor", "Senior Advisor", "Sales Team Lead", "Regional Sales Director"],
    requiredTools: ["Policy illustration software", "Client CRM", "Excel"],
    certifications: ["Insurance agent licence (required by regulation)", "CFP is an advantage"],
    pros:
      "Uncapped income through commission once the book is large, clear social value in protecting families financially, and flexible hours.",
    cons:
      "Heavy sales pressure, unstable income early on, and an industry reputation for opaque selling that you have to work against.",
    applicationTips:
      "Be able to explain the differences between policy types transparently, practise listening for the need rather than closing, and build credibility on honesty.",
  },

  "household-finance-planner": {
    title: "Household Finance Planner",
    summary:
      "Helps households budget, balance income against spending, and plan for the big goals (a home, children's education, retirement) over the long run.",
    responsibilities: [
      "Review the household's whole cash flow, assets and debts",
      "Build a workable budget for the life stage they are in",
      "Plan long term for the big goals (home, education, retirement)",
      "Advise on the balance between paying down debt, saving and investing",
    ],
    skills: [
      "Household budgeting",
      "Long-term financial advice",
      "Excel / planning tools",
      "Talking to several generations of one family",
      "Patience",
    ],
    entryLevel: "Junior/Senior - needs deep personal finance knowledge and family advisory skills",
    salaryHint: "VND 10-18M (Junior) • VND 22-40M+ (Senior)",
    searchKeyword: "Household financial planning",
    dayInLife:
      "Sit with a young family to build the monthly budget, work out how much they need to save each month for a home in seven years, and set up an education fund for the children.",
    careerPath: [
      "Junior Planner",
      "Senior Household Planner",
      "Head of Family Advisory",
      "Independent financial planner",
    ],
    requiredTools: ["Advanced Excel", "Personal financial planning software", "Financial calculator (TVM)"],
    certifications: ["CFP (Certified Financial Planner)"],
    pros:
      "The work touches real family life directly, needs no advanced maths, and demand keeps growing as the middle class expands.",
    cons:
      "Money is a sensitive subject inside a family and needs handling carefully, family members often want different things, and income grows slowly at first.",
    applicationTips:
      "Build a sample household plan as a case study, and practise talking about money tactfully.",
  },

  "equity-research-analyst": {
    title: "Equity Research Analyst",
    summary:
      "Researches listed companies in depth, works through the actual statements, and issues buy/sell/hold calls for investors.",
    responsibilities: [
      "Read and analyse the financial and annual reports of listed companies",
      "Build valuation models (DCF, P/E and P/B comparables) for the stocks you cover",
      "Write company and sector research with a specific recommendation",
      "Follow the news and quarterly results, and update the call",
    ],
    skills: [
      "Reading real company statements",
      "Equity valuation (DCF, comparables)",
      "Writing research",
      "Excel / financial modelling",
      "Following market news",
    ],
    entryLevel: "Fresh/Junior - needs solid financial analysis and statement literacy",
    salaryHint: "VND 12-22M (Junior) • VND 30-60M+ (Senior)",
    searchKeyword: "Equity research analyst",
    dayInLife:
      "Read the quarterly results just published by a company you cover, update the DCF, and send the investment team a short note on the change to your recommendation.",
    careerPath: ["Junior Equity Analyst", "Senior Analyst", "Head of Research", "Portfolio Manager"],
    requiredTools: ["Bloomberg/FiinPro Terminal", "Excel (Advanced)", "DCF valuation tools", "PowerPoint"],
    certifications: ["CFA (Chartered Financial Analyst)", "Financial analysis practice licence"],
    pros:
      "You go deep on many different companies and sectors, your calls move real investment decisions, and the path to Portfolio Manager is clear.",
    cons:
      "Heavy pressure on accuracy because the market reacts fast to a wrong call, the reading volume never lets up, and good seats at the large firms are competitive.",
    applicationTips:
      "Write a sample equity research report on a real listed company from public filings as your portfolio piece, and get genuinely fluent at valuation in Excel.",
  },

  "portfolio-analyst": {
    title: "Portfolio Analyst",
    summary:
      "Analyses and optimises portfolio structure - weights, risk, correlation - so the Portfolio Manager can decide how to allocate.",
    responsibilities: [
      "Track the performance and risk of the current portfolio",
      "Analyse correlation and diversification across the holdings",
      "Produce the periodic performance attribution report",
      "Propose rebalancing as the market moves and the risk appetite changes",
    ],
    skills: [
      "Modern portfolio theory",
      "Risk and correlation analysis",
      "Excel/Python for quantitative work",
      "Reading market data",
      "Writing performance reports",
    ],
    entryLevel: "Junior/Senior - needs solid statistics and portfolio theory",
    salaryHint: "VND 15-25M (Junior) • VND 35-70M+ (Senior/Portfolio Manager)",
    searchKeyword: "Portfolio Analyst",
    dayInLife:
      "Re-run the correlation analysis across the holdings after a market move, update the monthly attribution report, and propose weight changes to the Portfolio Manager.",
    careerPath: ["Junior Portfolio Analyst", "Senior Analyst", "Portfolio Manager", "Chief Investment Officer"],
    requiredTools: ["Excel/Python (quantitative analysis)", "Bloomberg Terminal", "Portfolio management systems"],
    certifications: ["CFA (Chartered Financial Analyst)", "FRM is an advantage"],
    pros:
      "You think at the level of the whole portfolio rather than single stocks, the path to Portfolio Manager is clear, and fund environments are professional.",
    cons:
      "It needs real statistical grounding, risk monitoring continues when the market moves outside hours, and performance is measured in plain numbers.",
    applicationTips:
      "Build and analyse a simulated 3-5 asset portfolio in Excel to internalise risk and correlation, and learn modern portfolio theory properly.",
  },

  "etf-fund-specialist": {
    title: "Open-Ended Fund & ETF Specialist",
    summary:
      "Runs, distributes and promotes fund and ETF products - the bridge between the asset manager and retail investors who want passive, diversified exposure.",
    responsibilities: [
      "Track the performance and holdings of the ETFs and funds under management",
      "Build the product materials for retail and institutional investors",
      "Work with sales to distribute fund certificates through each channel (app, bank)",
      "Track fund flows in and out, and report periodically",
    ],
    skills: [
      "Knowing open-ended funds and ETFs",
      "Fund performance analysis",
      "Building product materials",
      "Talking to investors",
      "Excel",
    ],
    entryLevel:
      "Fresh/Junior - suits people interested in passive investing and financial product distribution",
    salaryHint: "VND 12-20M (Junior) • VND 28-50M+ (Senior)",
    searchKeyword: "ETF fund specialist",
    dayInLife:
      "Update the performance report for a VN30 tracker, write the new fund's introduction material for the sales team, and answer investor questions about the management fee.",
    careerPath: [
      "Fund Specialist",
      "Senior Fund Specialist",
      "Product Manager (Funds)",
      "Head of Fund Product Development",
    ],
    requiredTools: ["Excel", "Fund performance platforms", "Bloomberg/FiinPro"],
    certifications: ["Fund management practice licence", "CFA is an advantage"],
    pros:
      "Passive investing is growing fast in Vietnam, the work mixes analysis with communication and sales, and asset managers are professional places to work.",
    cons:
      "You need both the product knowledge and the selling - it is not pure analysis - inflows depend on the market overall, and there is competition from every other channel.",
    applicationTips:
      "Compare the ETFs listed in Vietnam (fees, performance, index tracked) as a case study, and practise explaining the case for passive investing simply.",
  },

  "fixed-income-trader": {
    title: "Fixed Income Trader",
    summary:
      "Trades bonds - government and corporate - pricing them off rates, maturity and credit risk.",
    responsibilities: [
      "Watch rate moves and the yield curve daily",
      "Price bonds and calculate YTM and credit spreads for each trade",
      "Execute buy and sell orders according to the fund's or bank's strategy",
      "Manage the interest rate and credit risk of the bond book",
    ],
    skills: [
      "Bond pricing (YTM, duration)",
      "Reading the yield curve",
      "Credit risk analysis",
      "Excel/Bloomberg",
      "Deciding fast under pressure",
    ],
    entryLevel: "Junior/Senior - needs financial mathematics and a real grasp of the bond market",
    salaryHint: "VND 15-28M (Junior) • VND 40-90M+ (Senior Trader)",
    searchKeyword: "Fixed Income Trader",
    dayInLife:
      "Watch the policy rate first thing, reprice the corporate bond book you hold, and buy the 5-year government bond the strategy calls for.",
    careerPath: ["Junior Trader", "Senior Trader", "Head of Fixed Income Trading", "Chief Investment Officer"],
    requiredTools: ["Bloomberg Terminal", "Bond trading systems (Bloomberg/Reuters)", "Excel (Advanced)"],
    certifications: ["CFA (Chartered Financial Analyst)", "Bond trading practice licence"],
    pros:
      "Very high senior earnings tied to trading performance, a fast professional environment at large banks and funds, and it sharpens your thinking on rates and risk.",
    cons:
      "You have to decide fast and be right, Vietnam's bond market is less liquid than equities, and following rate moves keeps the hours tense.",
    applicationTips:
      "Know bond pricing cold (YTM, duration) and be able to do it by hand and in Excel, and follow government issuance and policy rate moves closely.",
  },

  "consumer-credit-analyst": {
    title: "Consumer Credit Analyst",
    summary:
      "Assesses repayment capacity and credit risk for individual borrowers (consumer loans, credit cards, home and car loans) - unlike the credit officer role, which leans corporate.",
    responsibilities: [
      "Appraise consumer loan and credit card applications from individuals",
      "Analyse the applicant's credit score and credit history",
      "Build the consumer credit risk scorecard",
      "Track the bad debt ratio and propose changes to lending policy",
    ],
    skills: [
      "Individual credit analysis",
      "Risk scorecards",
      "Excel/SQL",
      "Reading credit bureau history",
      "Lending compliance",
    ],
    entryLevel:
      "Fresh/Junior - needs finance or statistics grounding, and sits at banks and consumer finance companies",
    salaryHint: "VND 9-16M (Junior) • VND 20-35M+ (Senior/Team Lead)",
    searchKeyword: "Consumer credit analyst",
    dayInLife:
      "Work through the day's new consumer loan applications, pull the credit bureau history on the ones that look risky, and update the weekly bad-debt report for your manager.",
    careerPath: [
      "Junior Credit Analyst",
      "Senior Analyst",
      "Head of Credit Appraisal",
      "Director of Consumer Credit Risk",
    ],
    requiredTools: ["Excel/SQL", "In-house credit scoring systems", "National Credit Information Centre (CIC)"],
    certifications: ["Credit analysis certificates", "FRM is an advantage for senior roles"],
    pros:
      "Steady hiring at banks and consumer finance companies, a clear process that is easy to learn, and a route into broader risk management.",
    cons:
      "The daily file volume is large and repetitive, you are always balancing approval speed against bad debt, and turning applications down is uncomfortable.",
    applicationTips:
      "Learn how credit scoring actually works, and get fast and accurate at reading an individual or household's financial position.",
  },

  "management-accountant": {
    title: "Management Accountant",
    summary:
      "Supplies internal cost figures and analysis so leadership can decide - product costing, budgets, operating efficiency - as opposed to statutory accounting, which reports outward.",
    responsibilities: [
      "Cost products and services, and analyse the cost structure",
      "Build and track each department's operating budget",
      "Run cost-volume-profit analysis",
      "Prepare the internal management reporting that decisions are made on",
    ],
    skills: [
      "Cost and product accounting",
      "Building and controlling budgets",
      "CVP analysis",
      "Advanced Excel",
      "Understanding how the business actually runs",
    ],
    entryLevel:
      "Fresh/Junior - needs solid accounting or finance grounding, and suits people who like real operating numbers",
    salaryHint: "VND 10-18M (Junior) • VND 25-45M+ (Senior/Chief Accountant)",
    searchKeyword: "Management accounting",
    dayInLife:
      "Recost a product line after raw material prices rose, update the budget-versus-actual report for the production department, and take a cost reduction proposal to the board.",
    careerPath: [
      "Junior Management Accountant",
      "Senior Accountant",
      "Chief Accountant",
      "Chief Financial Officer (CFO)",
    ],
    requiredTools: ["Excel (Advanced)", "ERP software (SAP, Oracle)", "Budgeting tools"],
    certifications: ["CMA (Certified Management Accountant)", "ACCA/CPA is an advantage"],
    pros:
      "You understand how the business really operates rather than just the ledger, the role sits next to strategic decisions, and the path to CFO is clear.",
    cons:
      "Getting numbers out of other departments takes time, budget and quarter-end deadlines bite, and you need both the accounting and the operations.",
    applicationTips:
      "Practise CVP analysis on a simple case study, and learn how a real ERP moves data so you understand where management figures come from.",
  },

  "data-analyst": {
    title: "Data Analyst",
    summary:
      "Turns raw data into answers for business decisions: picks what to measure, finds the reason behind the number, and presents it so somebody acts.",
    responsibilities: [
      "Pull and clean data from several systems with SQL and Python",
      "Build the reports and dashboards departments decide on regularly",
      "Design and read A/B tests, cohort analysis and customer behaviour",
      "Present findings with a recommendation, to people who are not data specialists",
    ],
    skills: ["SQL", "Python (pandas)", "Data visualisation", "Applied statistics", "Telling the story in the data"],
    entryLevel:
      "Fresh/Junior - needs solid SQL and basic statistical thinking, no computer science degree required",
    salaryHint: "VND 12-22M (Junior) • VND 30-55M+ (Senior)",
    searchKeyword: "Data Analyst",
    dayInLife:
      "Re-run the queries behind the weekly dashboard in the morning, sit with product at midday to read an A/B test that has just reached sample size, and spend the afternoon digging into why retention dropped and writing up the recommendation.",
    careerPath: ["Junior Data Analyst", "Senior Data Analyst", "Analytics Lead", "Head of Analytics"],
    requiredTools: ["SQL", "Python (pandas)", "Power BI / Tableau / Looker", "Excel (Advanced)", "Git"],
    certifications: ["Google Data Analytics Certificate", "Microsoft Power BI Data Analyst"],
    pros:
      "Demand is wide across almost every industry rather than just finance, the door is relatively open to career changers with solid SQL, and the work sits close enough to decisions that the impact is visible.",
    cons:
      "Most of the real time goes on pulling and cleaning data rather than analysing it, you often have to chase the data across departments, and the role slides into being a report-request desk unless you shape it.",
    applicationTips:
      "Do one real project end to end on public data: ask the question, pull it with SQL, clean it, analyse it, and write a one-page conclusion. One complete project persuades more than several certificates.",
  },

  "bi-analyst": {
    title: "Business Intelligence Analyst",
    summary:
      "Builds the reporting the whole organisation shares: standardises what each metric means, models the data behind the reports, and makes sure every department reads the same number.",
    responsibilities: [
      "Design and maintain the shared dashboards departments use",
      "Standardise metric definitions so two teams do not compute two different numbers",
      "Build the data model behind the reporting (fact and dimension tables)",
      "Train business users to pull their own reports instead of raising a request",
    ],
    skills: [
      "Power BI / Tableau",
      "SQL",
      "Data modelling for reporting",
      "Designing KPIs",
      "Working with business departments",
    ],
    entryLevel:
      "Junior - needs SQL and one BI tool, and people who understand finance or operations are preferred",
    salaryHint: "VND 13-24M (Junior) • VND 30-55M+ (Senior)",
    searchKeyword: "Business Intelligence Analyst",
    dayInLife:
      "Fix a sales dashboard that went wrong after the source system changed shape, agree with accounting on how recognised revenue is calculated, and show a team lead how to filter the report by region themselves.",
    careerPath: [
      "BI Analyst",
      "Senior BI Analyst",
      "BI Lead",
      "Head of Data / Analytics Engineering Manager",
    ],
    requiredTools: ["Power BI", "Tableau", "SQL", "dbt", "Excel (Advanced)"],
    certifications: ["Microsoft Power BI Data Analyst", "Tableau Desktop Specialist"],
    pros:
      "What you build gets used across the organisation every day so the impact is obvious, there is less sudden deadline pressure than other analytics roles, and no one sees the whole operating picture more clearly.",
    cons:
      "Most dashboard arguments are really arguments about metric definitions between departments, maintaining old reports takes more time than building new ones, and the function gets treated as support rather than analysis.",
    applicationTips:
      "Build one complete dashboard from public data and write the definition of every metric alongside it. The definitions - not the visuals - are what separate a real BI person from someone who can drive the tool.",
  },

  "data-engineer": {
    title: "Data Engineer",
    summary:
      "Builds and runs the systems that move data from source into the warehouse reliably - the infrastructure every report and model behind it depends on.",
    responsibilities: [
      "Build and maintain the pipelines from source systems into the warehouse",
      "Design the warehouse structure and the data model several teams will use",
      "Monitor data quality and fix pipelines when they break or the numbers drift",
      "Optimise storage cost and query speed as the data volume grows",
    ],
    skills: [
      "Advanced SQL",
      "Python",
      "Data warehousing",
      "Pipeline orchestration",
      "Data quality control",
    ],
    entryLevel:
      "Junior - needs stronger programming than the other two data roles, and usually hires from a computing background",
    salaryHint: "VND 16-28M (Junior) • VND 40-80M+ (Senior)",
    searchKeyword: "Data Engineer",
    dayInLife:
      "Check the overnight pipelines in the morning and fix the one that broke when a source system changed its date format, then redesign a table that queries slowly and add automated data quality checks.",
    careerPath: ["Junior Data Engineer", "Data Engineer", "Senior Data Engineer", "Data Platform Lead"],
    requiredTools: ["SQL", "Python", "Airflow", "dbt", "Snowflake / BigQuery", "Git"],
    certifications: ["Google Professional Data Engineer", "AWS Certified Data Engineer"],
    pros:
      "The best paid of the three data roles with demand outstripping supply, purely technical skills that transfer between industries, and clearer standards of right and wrong than analysis.",
    cons:
      "You are on call when pipelines break outside hours, the work is invisible until something fails, and the programming bar makes it a harder entry point for career changers.",
    applicationTips:
      "Build one small but complete pipeline: pull from a public source on a schedule, clean it, load it into a database, with quality checks and alerting. The completeness matters more than the scale.",
  },
};
