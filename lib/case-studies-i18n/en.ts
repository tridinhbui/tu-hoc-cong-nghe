import type { CaseStudyTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 3 case study, khoá theo `id`.
 *
 * Con số trong phần giải thích là dữ liệu, giữ nguyên: 55-60% doanh thu, biên
 * gộp 35-40%, ROE 25-35%, công suất 5,6 triệu tấn. Chỉ đổi dấu thập phân sang
 * dấu chấm, cùng luật với lessons-i18n.
 *
 * Tên riêng giữ nguyên: FPT, Vinamilk, Hoa Phat, Dung Quat. Nhưng `company` là
 * TÊN PHÁP NHÂN chứ không phải thương hiệu, nên "Công ty Cổ phần Sữa Việt Nam"
 * dịch thành "Vietnam Dairy Products JSC" - không rút gọn thành "Vinamilk".
 */
export const caseStudiesEn: Record<string, CaseStudyTranslation> = {
  "fpt-sotp-analysis": {
    title: "FPT Group: SOTP Analysis & Valuation",
    company: "FPT Corporation",
    sector: "Technology & Telecoms",
    description:
      "Work through FPT's three-pillar business model (technology, telecoms, education), then apply sum-of-the-parts valuation to establish what it is really worth.",
    relatedLessonTitles: ["Core financial ratios", "Day 4: What is cash flow?"],
    questions: [
      {
        prompt: "Which business line contributes the largest share of FPT's revenue and profit?",
        options: [
          "Technology (software exports & IT)",
          "Telecoms (internet, FPT Play)",
          "Education & other",
        ],
        explanation:
          "Technology contributes over 55-60% of FPT's revenue and profit, driven by strong growth in software export services to Japan, the US and the EU.",
      },
      {
        prompt:
          "When using sum-of-the-parts (SOTP), why not apply a single P/E to the whole group?",
        options: [
          "Because each business line (technology, telecoms, education) has a different growth rate, risk profile and sector average P/E",
          "Because the securities commission requires P/E to be split out",
          "Because accounting cannot consolidate the profit",
        ],
        explanation:
          "Technology grows 25-30% a year and justifies a 20-25x P/E; telecoms has stable cash flow at 12-15x; education has high returns at 15-18x.",
      },
      {
        prompt: "What gross margin does FPT's software export business hold?",
        options: ["Below 15%", "Around 35-40%", "Above 70%"],
        explanation:
          "FPT's overseas IT services hold a very healthy gross margin of roughly 35-40%, helped by the cost advantage of software engineers in Vietnam.",
      },
      {
        prompt: "What state has FPT's net operating cash flow (CFO) been in over the past year?",
        options: [
          "Strongly positive and stable",
          "Persistently negative from expanding the schools",
          "Flat at zero",
        ],
        explanation:
          "FPT's operating cash flow is consistently strongly positive, because it collects well and is not blocked by receivables.",
      },
      {
        prompt:
          "If technology is on 22x, telecoms 14x and education 16x, how does the SOTP valuation of FPT compare with a single group-wide P/E?",
        options: [
          "It reflects each segment's real value and stops the fast-growing part being dragged down by the slower ones",
          "It comes out below net asset value",
          "It is identical to the P/B method",
        ],
        explanation:
          "SOTP values multi-industry groups accurately, avoiding the case where a high-growth technology arm is marked down because it is averaged with slower-growing segments.",
      },
    ],
  },

  "vnm-cashflow-brand": {
    title: "Vinamilk: Brand Restructuring & Cash Flow Management",
    company: "Vietnam Dairy Products JSC",
    sector: "Consumer Goods & F&B",
    description:
      "How Vinamilk defends its market leadership, manages free cash flow, and sustains an unusually high cash dividend policy.",
    relatedLessonTitles: ["Day 4: What is cash flow?", "Day 5: Assets and liabilities"],
    questions: [
      {
        prompt: "What produces Vinamilk's exceptionally strong free cash flow?",
        options: [
          "Large market share, a strong brand, a closed-loop dairy supply chain, and daily staple demand",
          "Continuous short-term borrowing to pay the dividend",
          "Zero marketing spend",
        ],
        explanation:
          "Vinamilk holds a national brand, a distribution network with nationwide reach, and steady demand for milk - which together generate abundant cash year after year.",
      },
      {
        prompt: "What does Vinamilk's high cash dividend payout ratio give shareholders?",
        options: [
          "A real annual cash income, reducing exposure to share price swings",
          "It writes the company's book value down to zero",
          "It makes banks refuse to lend",
        ],
        explanation:
          "A steady cash dividend reflects profit that actually arrived as cash, giving shareholders a safer income stream.",
      },
      {
        prompt: "When Vinamilk rebrands, how is that cost reflected in the financial statements?",
        options: [
          "As selling expense on the income statement",
          "Capitalised as an intangible fixed asset on the balance sheet",
          "It does not need to be recorded",
        ],
        explanation:
          "Marketing and brand campaign spend is expensed straight to selling costs in the period it occurs.",
      },
      {
        prompt: "Where does Vinamilk's return on equity (ROE) typically sit?",
        options: ["Below 5%", "Exceptionally high (25-35%)", "Negative because of inflation"],
        explanation:
          "Vinamilk uses shareholder capital extremely efficiently, holding ROE at 25-35% for years running.",
      },
    ],
  },

  "hpg-steel-cycle": {
    title: "Hoa Phat Group: Riding the Commodity Cycle & the Dung Quat 2 Mega-Project",
    company: "Hoa Phat Group",
    sector: "Industrials & Steel",
    description:
      "How the global steel price cycle, the fixed cost of a BOF blast furnace, and the returns on the Dung Quat 2 project interact.",
    relatedLessonTitles: ["Day 3: Income, expenses, saving", "Day 5: Assets and liabilities"],
    questions: [
      {
        prompt:
          "What core advantage gives Hoa Phat the lowest steel production cost in the region?",
        options: [
          "Large-scale closed-loop BOF blast furnace technology, its own deep-water port, and tight cost control",
          "Importing all its steel billet from abroad",
          "Paying no depreciation on its machinery",
        ],
        explanation:
          "Large-scale BOF combined with the Dung Quat port lets capesize vessels berth directly, cutting the cost of shipping iron ore and coking coal to a minimum.",
      },
      {
        prompt:
          "At the bottom of the steel cycle - selling prices down, input costs up - what happens to Hoa Phat's gross margin?",
        options: [
          "It comes under pressure, because fixed costs (blast furnace depreciation) do not fall with it",
          "It hits a record high",
          "It is unaffected, because steel prices only ever rise",
        ],
        explanation:
          "The blast furnace has to run 24/7 and carries very large fixed depreciation, so a fall in the world steel price compresses the gross margin considerably.",
      },
      {
        prompt: "How does completing Dung Quat 2 change Hoa Phat's capacity?",
        options: [
          "Adds 5.6 million tonnes of HRC a year, putting Hoa Phat in the world's top 30 steelmakers",
          "Reduces capacity to focus on property",
          "Switches production to aluminium",
        ],
        explanation:
          "Dung Quat 2 lifts total capacity above 14 million tonnes a year, concentrated on high-quality hot-rolled coil (HRC).",
      },
      {
        prompt: "When does Hoa Phat's debt-to-equity ratio typically rise sharply?",
        options: [
          "During the construction and CapEx drawdown of a major project (such as Dung Quat)",
          "When it repays all its debt and stops investing",
          "When it pays a stock dividend",
        ],
        explanation:
          "Funding a new plant with bank debt raises total borrowings temporarily, until the plant comes on stream and generates the cash flow to repay it.",
      },
    ],
  },
};
