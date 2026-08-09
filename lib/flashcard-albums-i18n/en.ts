import type { FlashcardAlbumTranslation } from "./index";

/**
 * Bản tiếng Anh của 5 album thẻ ghi nhớ.
 *
 * Luật cho `term`, và nó khác nhau theo từng dạng tên ở tệp gốc:
 *
 * - Tên đã kèm tiếng Anh trong ngoặc thì bản tiếng Anh CHÍNH LÀ phần trong
 *   ngoặc, bỏ ngoặc đi: "Tài sản (Assets)" -> "Assets". Dịch lại từ đầu sẽ ra
 *   một cách gọi khác với chính chữ người học vừa thấy ở bản tiếng Việt.
 * - Tên vốn đã là tiếng Anh ("Sharpe Ratio", "EBITDA", "Current Ratio") thì
 *   KHÔNG ghi lại ở đây. Ghi lại là tạo ra một `alsoKnownAs` rỗng nghĩa đi qua
 *   cả đường nhập thẻ.
 * - Tên thuần tiếng Việt ("Vòng quay hàng tồn kho") thì dịch bằng thuật ngữ
 *   chuẩn của ngành, không dịch từng chữ.
 *
 * Công thức trong `definition` đã là tiếng Anh ở tệp gốc và phải giữ NGUYÊN ký
 * tự: "FCFF = NI + NCC + Int(1-T) - FCInv - WCInv" là thứ người học phải nhớ
 * đúng từng chữ.
 */
export const flashcardAlbumsEn: Record<string, FlashcardAlbumTranslation> = {
  "cfa-level-1-terms": {
    title: "CFA Level I - Terms & formulas",
    description:
      "The standard CFA Level 1 term set (FSA, Quant, Corporate, Ethics, Equity, Derivatives...)",
    cards: [
      {
        definition:
          "Net Income / Average Equity - measures how efficiently shareholder capital produces net profit.",
      },
      {
        definition:
          "The free cash flow available to both creditors and shareholders after operating costs and CapEx (FCFF = NI + NCC + Int(1-T) - FCInv - WCInv).",
      },
      {
        definition:
          "ROE = Net Profit Margin × Asset Turnover × Financial Leverage - breaks ROE apart to find what drives it.",
      },
      {
        definition:
          "A dong today is always worth more than a dong in the future, because it can earn a return in the meantime.",
      },
      {
        definition:
          "E(R) = Rf + Beta × [E(Rm) - Rf] - prices an asset's required return off its systematic risk.",
      },
      {
        definition:
          "WACC = (Wd × Rd × (1-T)) + (Wp × Rp) + (We × Re) - the minimum blended return the business has to clear.",
      },
      {
        term: "Ethical & Professional Standards (Code of Ethics)",
        definition:
          "The CFA code of professional ethics, binding on financial analysts worldwide.",
      },
      {
        term: "Modigliani-Miller Theorem",
        definition:
          "In a perfect market - no taxes, no bankruptcy costs - the value of a firm does not depend on its capital structure.",
      },
      {
        term: "Duration (Macaulay / Modified)",
        definition:
          "How sensitive a bond's price is to a change in interest rates - the higher the duration, the more the price moves.",
      },
      {
        definition:
          "(Rp - Rf) / StdDev(p) - return earned per unit of total risk taken.",
      },
    ],
  },

  "ke-toan-co-ban": {
    title: "Accounting basics",
    description: "The foundational terms for reading the three financial statements",
    cards: [
      {
        term: "Assets",
        definition:
          "What a business owns that carries economic value - cash, inventory, fixed assets and so on.",
      },
      {
        term: "Liabilities",
        definition: "Financial obligations the business must settle with someone else in future.",
      },
      {
        term: "Equity",
        definition: "The assets left over for the owners once every liability is subtracted.",
      },
      {
        term: "Revenue",
        definition:
          "The value of goods or services delivered to customers, recognised when the obligation is met - not when the cash arrives.",
      },
      {
        term: "Cost of goods sold (COGS)",
        definition: "The direct cost of producing or buying the goods sold during the period.",
      },
      {
        term: "Gross profit",
        definition:
          "Revenue less cost of goods sold - measures how well the core operation runs.",
      },
      {
        term: "Depreciation",
        definition:
          "Spreading the cost of a fixed asset across several periods to reflect wear over time.",
      },
      {
        term: "Cash flow",
        definition:
          "The money that actually moves in and out of the business - different from accounting profit, because it owes nothing to accrual rules.",
      },
      {
        term: "Working capital",
        definition:
          "Current assets less current liabilities - measures the ability to meet near-term obligations.",
      },
      {
        definition:
          "Earnings before interest, taxes, depreciation and amortisation - used to compare operating performance across companies with different capital structures.",
      },
    ],
  },

  "dinh-gia-dau-tu": {
    title: "Valuation & investing",
    description: "The toolkit every investor needs by heart",
    cards: [
      {
        definition:
          "Share price divided by earnings per share - how much the market pays for each unit of profit.",
      },
      {
        definition:
          "Share price divided by book value per share - compares market price against net asset value.",
      },
      {
        definition:
          "The present value of future cash flows less the upfront investment - positive means the investment creates value.",
      },
      {
        definition:
          "The discount rate at which NPV equals zero - the investment's actual rate of return.",
      },
      {
        definition:
          "Weighted average cost of capital - the minimum return needed to satisfy both creditors and shareholders.",
      },
      {
        term: "Free cash flow (FCF)",
        definition:
          "The cash left after capital expenditure - the part the business is genuinely free to use.",
      },
      {
        definition:
          "Net profit over shareholders' equity - how much the business earns on the owners' money.",
      },
      {
        definition:
          "Return on invested capital - how efficiently all capital, debt and equity together, produces profit.",
      },
      {
        term: "Diversification",
        definition:
          "Spreading capital across uncorrelated assets to reduce the total risk of a portfolio.",
      },
      {
        definition:
          "How much a stock moves relative to the market as a whole - a beta above 1 means it moves more than the market.",
      },
    ],
  },

  "chi-so-tai-chinh-hot": {
    title: "The ratios analysts live by",
    description: "The ratios an analyst uses to score a business",
    cards: [
      {
        definition:
          "Current assets / current liabilities - can short-term debts be covered by easily converted assets.",
      },
      {
        definition:
          "(Current assets - inventory) / current liabilities - a stricter liquidity measure than the current ratio.",
      },
      {
        definition: "Total debt / equity - how heavily the business leans on financial leverage.",
      },
      {
        definition:
          "EBIT / interest expense - can the interest bill be paid out of operating profit.",
      },
      {
        term: "Inventory turnover",
        definition:
          "Cost of goods sold / average inventory - how fast goods move through the business.",
      },
      {
        term: "Receivables turnover",
        definition: "Revenue / average receivables - how fast customers actually pay.",
      },
      {
        term: "Net margin",
        definition:
          "Net profit / revenue - the share of revenue that survives all the way to the bottom line.",
      },
      {
        term: "DuPont analysis",
        definition:
          "Splits ROE into three parts - margin, asset turnover and leverage - to show where the ROE comes from.",
      },
    ],
  },

  "tai-chinh-ca-nhan": {
    title: "Personal finance",
    description: "The groundwork for managing your own money before you invest",
    cards: [
      {
        term: "Emergency fund",
        definition:
          "Savings covering 3-6 months of living costs, kept for the unexpected - losing a job, falling ill.",
      },
      {
        term: "Compound interest",
        definition:
          "Interest earned on the principal and on the interest already accumulated - the longer it runs, the faster it grows.",
      },
      {
        term: "Good debt vs bad debt",
        definition:
          "Good debt builds a future asset or income - a mortgage, tuition. Bad debt only funds consumption and loses value immediately.",
      },
      {
        term: "The 50/30/20 rule",
        definition:
          "Split income three ways: 50% needs, 30% wants, 20% savings and debt repayment.",
      },
      {
        term: "Inflation",
        definition:
          "Prices rising over time, which reduces what the same amount of money can buy.",
      },
      {
        term: "Diversifying your income",
        definition:
          "Having several independent income sources instead of depending on one, which lowers personal financial risk.",
      },
    ],
  },
};
