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
};
