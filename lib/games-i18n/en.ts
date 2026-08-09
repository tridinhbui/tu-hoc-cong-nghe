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
 * thuật ngữ - định nghĩa, tên - công thức) dịch được và nên dịch, nhưng là nội
 * dung tài chính chứ không phải nhãn giao diện, nên để một lượt riêng.
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
};
