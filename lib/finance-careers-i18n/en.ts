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
};
