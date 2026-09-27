import type { GlossaryTranslation } from "./index";

/**
 * Bản tiếng Anh của 8 thẻ mặc định, khoá theo tên tiếng Việt gốc.
 *
 * Tên gốc đã kèm tiếng Anh trong ngoặc, nên bản tiếng Anh CHÍNH LÀ phần trong
 * ngoặc - "Thanh khoản (Liquidity)" thành "Liquidity". Dịch lại từ đầu sẽ ra
 * một cách gọi khác với chính chữ người học vừa thấy ở bản tiếng Việt.
 *
 * Ba thẻ vốn đã là tiếng Anh trong ngoặc kép của chính nó (WACC, NPV) thì tên
 * giữ nguyên; chỉ định nghĩa được dịch.
 */
export const defaultGlossaryEn: GlossaryTranslation = {
  "Thanh khoản (Liquidity)": {
    term: "Liquidity",
    definition:
      "How quickly an asset can be turned into cash without losing value in the process.",
  },
  "Lãi kép (Compound Interest)": {
    term: "Compound interest",
    definition:
      "Interest calculated on the original principal plus the interest already accumulated in earlier periods.",
  },
  "Đòn bẩy tài chính (Leverage)": {
    term: "Financial leverage",
    definition: "Using borrowed money to increase the return an investment can produce.",
  },
  "WACC (Weighted Average Cost of Capital)": {
    term: "WACC (Weighted Average Cost of Capital)",
    definition:
      "The blended cost of capital, and the minimum return needed to satisfy both creditors and shareholders.",
  },
  "NPV (Net Present Value)": {
    term: "NPV (Net Present Value)",
    definition:
      "Net present value: future cash inflows discounted back to today, less the upfront investment.",
  },
  "Cổ tức (Dividend)": {
    term: "Dividend",
    definition:
      "A share of after-tax profit distributed to shareholders, in cash or in shares.",
  },
  "Hàng tồn kho (Inventory)": {
    term: "Inventory",
    definition:
      "A current asset covering raw materials, work in progress and finished goods waiting to be sold.",
  },
  "Bảng cân đối kế toán (Balance Sheet)": {
    term: "Balance sheet",
    definition:
      "The statement showing total assets, liabilities and equity at one point in time.",
  },
};
