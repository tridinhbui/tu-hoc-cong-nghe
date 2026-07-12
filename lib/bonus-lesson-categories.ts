// Purely presentational grouping for the dashboard's "Case chuyên sâu"
// section (the flat list of bonus/case-study lessons, ids 1001+). That list
// renders sorted by id, so a newly added lesson always lands at the very
// bottom regardless of topic - e.g. dinh-gia-tai-san-rong (asset-based
// valuation) landed after 35 unrelated cases instead of near ROIC/
// Enterprise Value/WACC, making it effectively impossible to find. This map
// clusters bonus lessons by topic so the section can render sub-headers
// instead. Does not affect lesson ids, unlock logic, or the day-numbered
// Personal/Professional tracks - display grouping only.
export const BONUS_CATEGORIES: Record<string, string> = {
  "on-tap-wacc": "Định giá doanh nghiệp",
  roic: "Định giá doanh nghiệp",
  "roic-phan-2": "Định giá doanh nghiệp",
  "market-fair-value": "Định giá doanh nghiệp",
  "enterprise-value": "Định giá doanh nghiệp",
  "dupont-analysis": "Định giá doanh nghiệp",
  "finance-as-math": "Định giá doanh nghiệp",
  "dinh-gia-tai-san-rong": "Định giá doanh nghiệp",

  "discontinued-operations": "Đọc báo cáo tài chính",
  "vingroup-cash-flow": "Đọc báo cáo tài chính",
  "interim-comprehensive-income": "Đọc báo cáo tài chính",
  "tesla-cash-flow": "Đọc báo cáo tài chính",
  "nvidia-cash-securities": "Đọc báo cáo tài chính",
  "fpt-cfo-cash": "Đọc báo cáo tài chính",
  "pvgas-bad-debt": "Đọc báo cáo tài chính",
  "inventory-turnover": "Đọc báo cáo tài chính",
  "operating-leverage": "Đọc báo cáo tài chính",
  "income-affiliates-jv": "Đọc báo cáo tài chính",
  "transfer-pricing": "Đọc báo cáo tài chính",
  "maple-leaf-leverage": "Đọc báo cáo tài chính",
  "fcf-deep-dive": "Đọc báo cáo tài chính",
  "financial-risk": "Đọc báo cáo tài chính",

  "walmart-earnings": "Case công ty thực tế",
  "disney-pixar-ma": "Case công ty thực tế",
  "oil-gas-business-model": "Case công ty thực tế",
  "bds-business-model": "Case công ty thực tế",
  "retail-store-analysis": "Case công ty thực tế",
  "samsung-ai-finance": "Case công ty thực tế",
  "bitcoin-crypto": "Case công ty thực tế",
  "commodity-phan-2": "Case công ty thực tế",
  "cap-rate": "Case công ty thực tế",

  dividend: "Vốn & cổ đông",
  "post-ipo-dividend": "Vốn & cổ đông",

  "modern-portfolio-theory": "Đầu tư & danh mục",
  "wealth-management": "Đầu tư & danh mục",

  "hoc-tai-chinh-hanh-trinh": "Khác",
};

// Render order - "Định giá doanh nghiệp" first since it's the cluster most
// people look for (ROIC/EV/WACC/asset-based valuation).
export const BONUS_CATEGORY_ORDER = [
  "Định giá doanh nghiệp",
  "Đọc báo cáo tài chính",
  "Case công ty thực tế",
  "Vốn & cổ đông",
  "Đầu tư & danh mục",
  "Khác",
];
