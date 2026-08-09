// Curated Vietnamese -> English finance-term glossary, used to auto-highlight
// terms in lesson body text with an English translation on hover (see
// components/GlossaryTerm.tsx). Requested by a finance-student user who
// wanted the English term available inline so it's not a separate lookup
// when they later encounter it at work.
//
// Keys are lowercase Vietnamese phrases; matching is case-insensitive and
// only wraps the first occurrence of each term across a lesson (see
// highlightGlossaryTerms), so repeated use of a term in one lesson doesn't
// get noisy.
/* i18n-ignore-start: bảng này CHÍNH LÀ một bản dịch, không phải chuỗi chờ
   dịch. Khoá là cụm tiếng Việt xuất hiện trong bài học, giá trị là thuật ngữ
   tiếng Anh hiện ra khi rê chuột (components/GlossaryTerm.tsx). Dịch khoá sang
   tiếng Anh thì `highlightGlossaryTerms` không còn khớp chữ nào trong bài
   tiếng Việt, và tính năng biến mất - không lỗi, không cảnh báo.

   Cùng bảng này còn làm bể ghép cặp cho game `en-vi-terms`, nơi trò chơi chính
   là ghép hai cột với nhau; dịch cột trái là làm hai cột giống hệt nhau. */
export const FINANCE_GLOSSARY: Record<string, string> = {
  "chi phí cơ hội": "Opportunity Cost",
  "dòng tiền": "Cash Flow",
  "dòng tiền tự do": "Free Cash Flow",
  "dòng tiền hoạt động": "Operating Cash Flow",
  "dòng tiền đầu tư": "Investing Cash Flow",
  "dòng tiền tài chính": "Financing Cash Flow",
  "tài sản": "Asset",
  "nợ phải trả": "Liabilities",
  "vốn chủ sở hữu": "Equity",
  "lợi nhuận": "Profit",
  "doanh thu": "Revenue",
  "biên lợi nhuận": "Profit Margin",
  "biên lãi gộp": "Gross Margin",
  "quỹ khẩn cấp": "Emergency Fund",
  "lãi suất": "Interest Rate",
  "lạm phát": "Inflation",
  "đầu tư": "Investment",
  "rủi ro": "Risk",
  "đa dạng hóa": "Diversification",
  "cổ phiếu": "Stock",
  "trái phiếu": "Bond",
  "thanh khoản": "Liquidity",
  "đòn bẩy tài chính": "Financial Leverage",
  "giá trị nội tại": "Intrinsic Value",
  "định giá": "Valuation",
  "báo cáo tài chính": "Financial Statement",
  "bảng cân đối kế toán": "Balance Sheet",
  "báo cáo kết quả kinh doanh": "Income Statement",
  "báo cáo lưu chuyển tiền tệ": "Cash Flow Statement",
  "khấu hao": "Depreciation",
  "tỷ suất sinh lời": "Rate of Return",
  "quản lý rủi ro": "Risk Management",
  "phân bổ tài sản": "Asset Allocation",
  "giá trị thời gian của tiền": "Time Value of Money",
  "lãi kép": "Compound Interest",
  "ngân sách": "Budget",
  "tiết kiệm": "Savings",
  "nợ xấu": "Bad Debt",
  "tín dụng": "Credit",
  "thế chấp": "Mortgage / Collateral",
  "cổ tức": "Dividend",
  "vốn hóa thị trường": "Market Capitalization",
  "chu kỳ kinh tế": "Business Cycle",
  "suy thoái": "Recession",
  "tỷ giá hối đoái": "Exchange Rate",
  "quỹ tương hỗ": "Mutual Fund",
  "quỹ hoán đổi danh mục": "ETF (Exchange-Traded Fund)",
  "quản lý danh mục đầu tư": "Portfolio Management",
  "phân tích cơ bản": "Fundamental Analysis",
  "phân tích kỹ thuật": "Technical Analysis",
  "giá trị sổ sách": "Book Value",
  "giá trị thị trường": "Market Value",
  "chi phí vốn": "Cost of Capital",
  "chi phí sử dụng vốn": "Cost of Capital",
  "giá trị hiện tại ròng": "Net Present Value (NPV)",
  "tỷ suất hoàn vốn nội bộ": "Internal Rate of Return (IRR)",
  "điểm hòa vốn": "Break-even Point",
  "biên an toàn": "Margin of Safety",
  "quản trị dòng tiền": "Cash Flow Management",
  "quỹ đầu tư": "Investment Fund",
  "tài sản ròng": "Net Worth",
  "chi phí cố định": "Fixed Cost",
  "chi phí biến đổi": "Variable Cost",
  "vòng quay hàng tồn kho": "Inventory Turnover",
  "vòng quay vốn": "Capital Turnover",
  "tỷ lệ nợ trên vốn chủ sở hữu": "Debt-to-Equity Ratio",
  "khả năng thanh toán": "Solvency",
};

const GLOSSARY_ENTRIES = Object.entries(FINANCE_GLOSSARY).sort(
  (a, b) => b[0].length - a[0].length
);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface GlossaryMatch {
  start: number;
  end: number;
  term: string;
  en: string;
}

// Finds the first occurrence of each not-yet-seen glossary term in `text`,
// longest term first so e.g. "dòng tiền tự do" wins over "dòng tiền".
// `seen` is mutated so callers can share it across a whole lesson body and
// avoid highlighting the same term twice.
export function findGlossaryMatches(text: string, seen: Set<string>): GlossaryMatch[] {
  const matches: GlossaryMatch[] = [];
  for (const [term, en] of GLOSSARY_ENTRIES) {
    if (seen.has(term)) continue;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(${escapeRegExp(term)})(?![\\p{L}\\p{N}])`, "iu");
    const m = re.exec(text);
    if (m) {
      matches.push({ start: m.index, end: m.index + m[0].length, term, en });
    }
  }
  matches.sort((a, b) => a.start - b.start);

  // Drop overlaps (can happen since terms are matched independently).
  const filtered: GlossaryMatch[] = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }
  filtered.forEach((m) => seen.add(m.term));
  return filtered;
}

/* i18n-ignore-end */
