import type { CfaLevelTranslation } from "./index";

/**
 * Bản dịch tiếng Anh, khoá theo `level` ("II" / "III").
 *
 * Tên môn giữ nguyên vì chúng đã là tên chính thức của CFA Institute - chỉ
 * "Hướng chuyên sâu đã chọn" ở Level III là câu mô tả nên được dịch.
 */
export const cfaLevelsEn: Record<string, CfaLevelTranslation> = {
  II: {
    format:
      "Item-set format: each vignette is a long block of data, followed by several questions that all draw on it.",
    facts: [
      ["Item sets", "22 (20 scored, 2 unscored)"],
      ["Questions", "88 multiple choice"],
      ["Sessions", "2"],
      ["Time per session", "2 hours 12 minutes"],
    ],
    topicNames: [
      "Ethical and Professional Standards",
      "Quantitative Methods",
      "Economics",
      "Financial Statement Analysis",
      "Corporate Issuers",
      "Equity Investments",
      "Fixed Income",
      "Derivatives",
      "Alternative Investments",
      "Portfolio Management",
    ],
    noMockReason:
      "There is no Level II mock exam here. What makes this level hard is reading one long vignette and answering several questions that depend on it - stitching our standalone questions together and calling it a Level II paper would train the wrong skill.",
  },

  III: {
    format:
      "Half item sets, half constructed response. The written half is marked on the reasoning, not only the answer.",
    facts: [
      ["Structure", "11 item sets + 11 constructed-response sets"],
      ["Scoring", "20 scored sets, 2 unscored"],
      ["Sessions", "2"],
      ["Time per session", "2 hours 12 minutes"],
    ],
    topicNames: [
      "Asset Allocation",
      "Portfolio Construction",
      "Performance Measurement",
      "Derivatives and Risk Management",
      "Ethical and Professional Standards",
      "Your chosen pathway",
    ],
    noMockReason:
      "There is no Level III mock exam, and there will not be one built the same way: half the paper is constructed response, marked on the argument rather than a correct option - multiple choice cannot simulate that.",
  },
};
