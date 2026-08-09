import type { GamesTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của phần VỎ trong lib/games.ts - tên trò, mô tả, nhãn
 * nhóm, câu hướng dẫn và danh hiệu xếp hạng.
 *
 * KHÔNG dịch nội dung chơi, và ranh giới đó không phải để tiết kiệm công:
 *
 *   - `en-vi-terms` ghép thuật ngữ TIẾNG VIỆT với thuật ngữ TIẾNG ANH, và pool
 *     của nó dựng thẳng từ FINANCE_GLOSSARY. Dịch vế trái sang tiếng Anh thì
 *     hai cột cùng một thứ tiếng và trò chơi không còn gì để ghép. `random-mix`
 *     trộn chính pool đó vào nên dính theo.
 *   - `TICKER_PAIRS` là tên doanh nghiệp ↔ mã cổ phiếu ("Vingroup ↔ VIC").
 *     Danh từ riêng; dịch là sai chứ không phải là thừa.
 *
 * Các pool còn lại (khoản mục báo cáo, tỷ số, nhóm rủi ro, chi phí, cặp
 * thuật ngữ - định nghĩa, tên - công thức) nằm trong `content` bên dưới.
 *
 * `emoji`, `accent`, `id`, `mechanic` là cấu trúc - đọc từ phía tiếng Việt.
 */
export const gamesEn: GamesTranslation = {
  special: {
    "wall-street-millionaire": {
      title: "Who Wants to Be a Wall Street Millionaire",
      description:
        "15 advanced finance questions with game-show style lifelines.",
    },
    "dcf-mastermind": {
      title: "DCF & M&A Valuation Arena",
      description:
        "Work through 5 M&A deals, set an intrinsic target price, and call buy or walk away.",
    },
    "snowball-racer": {
      title: "Compounding Snowball Race",
      description:
        "Pick an investment strategy across 20 years and try to reach $1,000,000 on compounding alone.",
    },
  },

  difficulties: {
    de: { label: "Easy", hint: "Fewer cards, no time limit" },
    "trung-binh": { label: "Medium", hint: "Default card count, no time limit" },
    kho: { label: "Hard", hint: "More cards + a 60-second limit" },
  },

  games: {
    "random-mix": {
      title: "🎲 Random mix of every topic",
      description:
        "The all-round challenge: statements, terms, ratios, formulas and risk, shuffled together.",
    },
    "financial-statement-match": {
      title: "Financial statements",
      description:
        "Drag each line item onto the right statement (balance sheet / income statement / cash flow).",
    },
    "en-vi-terms": {
      title: "English - Vietnamese terms",
      description:
        "Match each finance term in English with its Vietnamese counterpart, taken from the lessons you have studied.",
    },
    "ratio-category": {
      title: "Sorting financial ratios",
      description:
        "Drag each ratio into the right family: liquidity / profitability / leverage / efficiency.",
    },
    "term-definition": {
      title: "Terms & definitions",
      description: "Match each finance term with the short definition that fits it.",
    },
    "formula-match": {
      title: "Names & formulas",
      description:
        "Match each ratio's name with the formula that computes it (ROE, P/E, current ratio...).",
    },
    "risk-category": {
      title: "Sorting investment risk",
      description: "Drag each asset type into the right risk band: low / medium / high.",
    },
    "ticker-match": {
      title: "Stock tickers",
      description: "Match each listed company with its ticker on the exchange.",
    },
    "cost-category": {
      title: "Sorting costs",
      description: "Drag each cost into the right group: fixed or variable.",
    },
  },

  statementLabels: {
    "balance-sheet": "Balance sheet",
    "income-statement": "Income statement",
    "cash-flow": "Cash flow statement",
  },

  buckets: {
    "financial-statement-match": {
      sourceHint: "Drag or tap a card, then drop it on the right statement",
    },
    "ratio-category": {
      sourceHint: "Drag or tap a ratio, then drop it in the right family",
      labels: {
        liquidity: "Liquidity",
        profitability: "Profitability",
        leverage: "Leverage",
        efficiency: "Operating efficiency",
      },
    },
    "risk-category": {
      sourceHint: "Drag or tap an asset, then drop it on the right risk level",
      labels: {
        low: "Low risk",
        medium: "Medium risk",
        high: "High risk",
      },
    },
    "cost-category": {
      sourceHint: "Drag or tap a cost, then drop it in the right group",
      labels: {
        fixed: "Fixed costs",
        variable: "Variable costs",
      },
    },
  },

  pairs: {
    "term-definition": {
      leftLabel: "Term",
      rightLabel: "Definition",
      hint: "Tap a term then tap its definition (or drag and drop) to make a pair.",
    },
    "formula-match": {
      leftLabel: "Ratio name",
      rightLabel: "Formula",
      hint: "Tap a ratio name then tap its formula (or drag and drop) to make a pair.",
    },
    "ticker-match": {
      leftLabel: "Company",
      rightLabel: "Ticker",
      hint: "Tap a company then tap its ticker (or drag and drop) to make a pair.",
    },
    randomMix: {
      leftLabel: "Term / name",
      rightLabel: "Definition / ticker / concept",
      hint: "Random mix: match pairs drawn from several different topics.",
    },
    // Nhãn cột của `en-vi-terms`. Hai nhãn này PHẢI giữ đúng nghĩa ngôn ngữ:
    // cột trái là thẻ tiếng Việt, cột phải là thẻ tiếng Anh, và người chơi
    // tiếng Anh vẫn cần biết bên nào là bên nào.
    fallback: {
      leftLabel: "Vietnamese",
      rightLabel: "English",
      hint: "Drag and drop, or tap one card then tap its match, to make a pair.",
    },
  },

  titles: {
    "random-mix": ["Grandmaster of the Random Mix", "Wizard of All Topics", "Shuffle Champion"],
    "financial-statement-match": [
      "Chief Accountant of the Universe",
      "Balance Sheet Deity",
      "Grandmaster of Financial Statements",
    ],
    "en-vi-terms": ["Bilingual Finance Sorcerer", "Saint of Terminology", "Wall Street Translator"],
    "ratio-category": ["Master of Ratios", "Analyst Supreme", "Ratio Overlord"],
    "term-definition": ["Living Dictionary", "Finance Scholar", "Encyclopaedic Brain"],
    "formula-match": ["Formula Prodigy", "Sorcerer of Numbers", "Quant Champion"],
    "risk-category": ["Guardian of the Portfolio", "Risk Management Champion", "Master of Allocation"],
    "ticker-match": ["Spirit of the Trading Floor", "Champion Tape Reader", "Ticker Legend"],
    "cost-category": [
      "Cost Accountant Supreme",
      "Master of Fixed & Variable",
      "Legend of Cost Classification",
    ],
  },

  combinedTitles: ["Mini Game Legend", "Finance Grandmaster", "All-Round Champion"],

  // ─────────────────────────────────────────────────────────────────────────
  // NỘI DUNG CHƠI. Khoá là CHUỖI TIẾNG VIỆT, không phải id - những mảng này
  // không có id, và khoá theo vị trí thì thêm một khoản mục vào giữa danh
  // sách là lệch hết phần còn lại mà không có gì báo.
  //
  // Ai gọi tới quyết định pool nào được dịch, KHÔNG phải bảng này (xem
  // localizePairConfig). Tra theo chuỗi mà không chọn pool thì "Thanh khoản"
  // trong pool vi↔en cũng thành "Liquidity", và cột phải của nó vốn đã là
  // "Liquidity" - trò chơi hiện hai thẻ giống hệt nhau ở hai cột.
  content: {
    // ── Khoản mục bảng cân đối kế toán ──
    "Tiền mặt & Tương đương tiền": "Cash & cash equivalents",
    "Hàng tồn kho (Sắt thép HPG / Hàng hóa FPT)": "Inventory (HPG steel / FPT goods)",
    "Phải thu ngắn hạn khách hàng": "Short-term trade receivables",
    "Tài sản cố định hữu hình": "Tangible fixed assets",
    "Chi phí xây dựng dở dang dài hạn": "Long-term construction in progress",
    "Phải trả người bán ngắn hạn": "Short-term trade payables",
    "Vay & nợ thuê tài chính ngắn hạn": "Short-term borrowings & finance leases",
    "Vay & nợ thuê tài chính dài hạn": "Long-term borrowings & finance leases",
    "Vốn góp của chủ sở hữu": "Owners' contributed capital",
    "Thặng dư vốn cổ phần": "Share premium",
    "Lợi nhuận sau thuế chưa phân phối": "Undistributed post-tax profit",
    "Người mua trả tiền trước ngắn hạn": "Short-term advances from customers",
    "Chi phí trả trước dài hạn": "Long-term prepaid expenses",
    "Tiền gửi ngân hàng có kỳ hạn": "Term bank deposits",
    "Bất động sản đầu tư": "Investment property",
    "Quyền sử dụng đất & Lợi thế thương mại": "Land use rights & goodwill",
    "Trái phiếu doanh nghiệp phát hành": "Corporate bonds issued",
    "Quỹ đầu tư phát triển": "Development investment fund",
    "Thuế & các khoản phải nộp Nhà nước": "Taxes & other payables to the State",

    // ── Khoản mục báo cáo kết quả kinh doanh ──
    "Doanh thu bán hàng & dịch vụ": "Revenue from goods & services",
    "Các khoản giảm trừ doanh thu": "Revenue deductions",
    "Doanh thu thuần": "Net revenue",
    "Giá vốn hàng bán (COGS)": "Cost of goods sold (COGS)",
    "Lợi nhuận gộp": "Gross profit",
    "Doanh thu hoạt động tài chính": "Financial income",
    "Chi phí lãi vay": "Interest expense",
    "Chi phí bán hàng & Marketing": "Selling & marketing expenses",
    "Chi phí quản lý doanh nghiệp": "General & administrative expenses",
    "Chi phí Nghiên cứu & Phát triển (R&D)": "Research & development expense (R&D)",
    "Chi phí khấu hao tài sản cố định trong kỳ": "Depreciation of fixed assets for the period",
    "Thu nhập khác": "Other income",
    "Chi phí thuế TNDN hiện hành": "Current corporate income tax expense",
    "Lợi nhuận sau thuế (Lợi nhuận ròng)": "Profit after tax (net profit)",
    "Lãi cơ bản trên cổ phiếu (EPS)": "Basic earnings per share (EPS)",

    // ── Khoản mục báo cáo lưu chuyển tiền tệ ──
    "Dòng tiền thuần từ hoạt động kinh doanh": "Net cash flow from operating activities",
    "Dòng tiền thuần từ hoạt động đầu tư": "Net cash flow from investing activities",
    "Dòng tiền thuần từ hoạt động tài chính": "Net cash flow from financing activities",
    "Tiền chi mua sắm tài sản cố định (CapEx)": "Cash paid to acquire fixed assets (CapEx)",
    "Tiền thu từ thanh lý tài sản cố định": "Cash from disposal of fixed assets",
    "Tiền chi trả nợ gốc vay": "Cash repayment of loan principal",
    "Tiền thu từ nhận nợ vay mới": "Cash from new borrowings",
    "Tiền chi trả cổ tức cho cổ đông": "Dividends paid to shareholders",
    "Tiền thu từ phát hành cổ phiếu mới": "Cash from issuing new shares",
    "Lãi tiền gửi ngân hàng đã thu bằng tiền": "Bank deposit interest received in cash",
    "Tiền lãi vay đã trả trong kỳ": "Loan interest paid during the period",
    "Tiền chi mua cổ phiếu công ty con": "Cash paid to buy shares in subsidiaries",
    "Tăng/giảm tiền & tương đương tiền ròng": "Net increase/decrease in cash & cash equivalents",

    // ── Tỷ số tài chính (những cái còn tiếng Việt; ROE, Quick Ratio... đã là
    //    tiếng Anh sẵn nên không có mặt ở đây) ──
    "Biên lợi nhuận gộp": "Gross profit margin",
    "Biên lợi nhuận ròng": "Net profit margin",
    "Vòng quay hàng tồn kho": "Inventory turnover",
    "Vòng quay khoản phải thu": "Receivables turnover",
    "Vòng quay tổng tài sản": "Total asset turnover",

    // ── Nhóm rủi ro đầu tư ──
    "Tiền gửi tiết kiệm": "Savings deposits",
    "Trái phiếu Chính phủ": "Government bonds",
    "Chứng chỉ quỹ trái phiếu": "Bond fund certificates",
    Vàng: "Gold",
    "Trái phiếu doanh nghiệp lớn": "Large-cap corporate bonds",
    "Bất động sản cho thuê": "Rental real estate",
    "Quỹ đầu tư cân bằng": "Balanced investment funds",
    "Cổ phiếu Bluechip (VN30)": "Blue-chip stocks (VN30)",
    "Cổ phiếu Penny": "Penny stocks",
    "Tiền mã hóa (Crypto)": "Cryptocurrency (crypto)",
    "Hợp đồng phái sinh": "Derivative contracts",
    "Cổ phiếu công ty mới IPO": "Shares in a newly IPO'd company",

    // ── Chi phí cố định / biến đổi. Chú thích trong ngoặc là ĐỀ BÀI, không
    //    phải trang trí: "(theo sản lượng)" chính là thứ khiến khoản mục đó
    //    là chi phí biến đổi, nên nó phải sang tiếng Anh nguyên vẹn. ──
    "Tiền thuê mặt bằng": "Premises rent",
    "Lương quản lý (cố định hàng tháng)": "Management salaries (fixed monthly)",
    "Khấu hao tài sản cố định": "Depreciation of fixed assets",
    "Bảo hiểm nhà xưởng": "Factory insurance",
    "Lãi vay ngân hàng cố định": "Fixed-rate bank loan interest",
    "Phí thuê phần mềm hàng tháng": "Monthly software subscription",
    "Nguyên vật liệu trực tiếp": "Direct raw materials",
    "Hoa hồng bán hàng": "Sales commission",
    "Chi phí vận chuyển hàng bán": "Outbound shipping cost",
    "Chi phí đóng gói sản phẩm": "Product packaging cost",
    "Nhân công trực tiếp sản xuất (theo sản lượng)": "Direct production labour (per unit made)",
    "Phí giao dịch thẻ (theo doanh số)": "Card transaction fees (per sale)",

    // ── Cặp thuật ngữ - định nghĩa (vế trái nào đã là tiếng Anh thì vắng mặt) ──
    "Dòng tiền tự do (FCF)": "Free cash flow (FCF)",
    "Khấu hao": "Depreciation",
    "Thanh khoản": "Liquidity",
    "Đòn bẩy tài chính": "Financial leverage",
    "Vốn lưu động": "Working capital",
    "Cổ tức": "Dividend",
    "Lợi nhuận ròng trên vốn chủ sở hữu": "Net profit relative to shareholders' equity",
    "Giá cổ phiếu chia lợi nhuận mỗi cổ phần": "Share price divided by earnings per share",
    "Tiền còn lại sau khi trừ chi đầu tư (CapEx)": "Cash left over after capital spending (CapEx)",
    "Phân bổ dần chi phí tài sản dài hạn qua nhiều năm":
      "Spreading the cost of a long-lived asset across several years",
    "Khả năng chuyển tài sản thành tiền mặt nhanh": "How quickly an asset can be turned into cash",
    "Dùng nợ vay để khuếch đại lợi nhuận (và rủi ro)":
      "Using borrowed money to amplify returns (and risk)",
    "Tài sản ngắn hạn trừ nợ ngắn hạn": "Current assets minus current liabilities",
    "Chi phí vốn bình quân gia quyền": "The weighted average cost of capital",
    "Giá trị hiện tại ròng của dòng tiền tương lai": "The net present value of future cash flows",
    "Tỷ suất chiết khấu làm NPV bằng 0": "The discount rate at which NPV equals zero",
    "Lợi nhuận trước lãi vay, thuế và khấu hao":
      "Earnings before interest, tax, depreciation and amortisation",
    "Phần lợi nhuận công ty chia cho cổ đông":
      "The share of profit a company pays out to its shareholders",

    // ── Cặp tên chỉ số - công thức. Giữ nguyên dấu "/" và "−" của bản gốc:
    //    đây là công thức, không phải câu văn. Hai dòng cuối trông na ná hai
    //    dòng ngay trên trong nhóm định nghĩa và ĐÚNG là phải khác nhau -
    //    trộn ngẫu nhiên có thể rút cả hai vào cùng một ván, và hai thẻ giống
    //    hệt nhau ở cột phải là một ván không giải được. ──
    "Lợi nhuận ròng / Vốn chủ sở hữu": "Net profit / Shareholders' equity",
    "Lợi nhuận ròng / Tổng tài sản": "Net profit / Total assets",
    "Tài sản ngắn hạn / Nợ ngắn hạn": "Current assets / Current liabilities",
    "Giá cổ phiếu / EPS": "Share price / EPS",
    "Lợi nhuận ròng / Số cổ phiếu lưu hành": "Net profit / Shares outstanding",
    "Tổng nợ / Vốn chủ sở hữu": "Total debt / Shareholders' equity",
    "Lợi nhuận gộp / Doanh thu": "Gross profit / Revenue",
    "Dòng tiền hoạt động − CapEx": "Operating cash flow − CapEx",
    "(Tài sản ngắn hạn − Hàng tồn kho) / Nợ ngắn hạn":
      "(Current assets − Inventory) / Current liabilities",
    "Tài sản ngắn hạn − Nợ ngắn hạn": "Current assets − Current liabilities",
  },
};
