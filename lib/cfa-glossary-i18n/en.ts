import type { GlossaryTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 118 thuật ngữ CFA, khoá theo `id`.
 *
 * Hai điều đáng biết trước khi thêm mục:
 *
 * 1. `termEn` KHÔNG nằm ở đây. Nó đã là tiếng Anh trong tệp gốc và có đủ ở cả
 *    118 mục, nên phần tiêu đề thẻ vốn đã đúng ngôn ngữ.
 *
 * 2. Tử và mẫu công thức bên tiếng Việt thường đã KÈM SẴN tiếng Anh trong
 *    ngoặc - "Lợi nhuận ròng (Net Income)". Bản tiếng Anh chỉ là phần trong
 *    ngoặc đó, bỏ ngoặc đi. Đừng dịch lại từ đầu rồi ra một cách gọi khác với
 *    chính chữ người học vừa thấy ở bản tiếng Việt.
 */
export const glossaryEn: Record<string, GlossaryTranslation> = {
  // Mục duy nhất từng có `definitionEn` trong tệp gốc. Chuyển nguyên văn sang
  // đây khi gỡ trường chết đó, nên không mất chữ nào.
  "fsa-001": {
    definition:
      "Measures a corporation's profitability by revealing how much profit a company generates with the money shareholders have invested.",
    cfaTip: "Three-step DuPont: ROE = Net Profit Margin × Asset Turnover × Financial Leverage.",
    example: "If Net Income = 150bn and Average Equity = 1,000bn, ROE = 15%.",
    formulaNumerator: "Net Income",
    formulaDenominator: "Average Equity",
  },

  "fsa-002": {
    definition:
      "The cash available to all capital providers - both creditors and shareholders - after operating costs and investment in fixed assets.",
    cfaTip:
      "NI: Net Income, NCC: Non-Cash Charges (depreciation), Int: Interest Expense, FCInv: Capital Expenditures, WCInv: Change in Working Capital.",
  },

  "fsa-003": {
    definition:
      "The model that breaks ROE into five components: tax burden, interest burden, operating margin, asset turnover and the equity multiplier.",
  },

  "fsa-004": {
    definition: "The percentage of revenue left after deducting the cost of goods sold (COGS).",
    formulaNumerator: "Net Revenue - Cost of Goods Sold (COGS)",
    formulaDenominator: "Net Revenue",
  },

  "fsa-005": {
    definition: "How often inventory is sold and replaced over a period.",
    formulaNumerator: "Cost of Goods Sold (COGS)",
    formulaDenominator: "Average Inventory",
  },

  "fsa-006": {
    definition: "The average number of days it takes the business to collect its receivables.",
    formulaNumerator: "365",
    formulaDenominator: "Receivables Turnover",
  },

  "fsa-007": {
    definition:
      "Measures whether the business can cover its short-term liabilities with its short-term assets.",
    formulaNumerator: "Current Assets",
    formulaDenominator: "Current Liabilities",
  },

  "fsa-008": {
    definition:
      "Tests immediate liquidity using only the most liquid assets, excluding inventory.",
    formulaNumerator: "Cash + Cash Equivalents + Short-term Securities + Receivables",
    formulaDenominator: "Current Liabilities",
  },

  "eth-001": {
    definition:
      "The six core ethical principles every CFA member and candidate must follow in all investment activity.",
  },

  "eth-002": {
    definition:
      "Members must understand and comply with all applicable law. Where local law and the CFA Code conflict, the stricter one applies.",
  },
};
