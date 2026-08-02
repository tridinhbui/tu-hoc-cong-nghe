// Maps the IB question bank's technical categories onto the careers in
// lib/finance-careers.ts.
//
// The bank was written for one job - Investment Banking - but a lot of it
// isn't IB-specific at all. Accounting, valuation, DCF and enterprise value
// are the shared core of most analytical finance roles, so an aspiring equity
// research analyst or valuation specialist can drill 100+ of these questions
// productively. Deal-mechanics categories (merger model, LBO, restructuring)
// genuinely are specific to transaction roles and stay mapped narrowly.
//
// This is a reuse layer, not new content: no question is rewritten, they're
// just filtered. 40 of the 41 careers still have no bank of their own, and
// the UI says so rather than implying coverage that doesn't exist.

import { IB_TECHNICAL_QUESTIONS, formatCategoryLabel, type IbQuestion } from "@/lib/ib-question-bank";
import { CAREER_TECHNICAL_QUESTIONS } from "@/lib/career-question-bank";

/** Every technical question a learner can be served, from both sources.
 *  The IB bank covers the shared analytical core; lib/career-question-bank.ts
 *  covers the roles that core says nothing about. Both are filtered through
 *  the same category -> careers map below, so a new career bank becomes
 *  reachable by adding its categories here and nothing else. */
const ALL_TECHNICAL_QUESTIONS: IbQuestion[] = [
  ...IB_TECHNICAL_QUESTIONS,
  ...CAREER_TECHNICAL_QUESTIONS,
];

/** Career ids (from FINANCE_CAREERS) each technical category is useful for.
 *  Keys are the raw category strings as they appear in the bank. */
export const IB_CATEGORY_CAREERS: Record<string, readonly string[]> = {
  // The analytical core - relevant well beyond banking.
  "Accounting - Basic": [
    "investment-banking",
    "financial-analyst",
    "accountant",
    "auditor",
    "management-accountant",
    "internal-audit",
    "cfo-track",
    "equity-research-analyst",
    "valuation-specialist",
    "credit-officer",
    "fpa",
  ],
  "Accounting - Advanced": [
    "investment-banking",
    "financial-analyst",
    "accountant",
    "auditor",
    "management-accountant",
    "cfo-track",
    "equity-research-analyst",
    "valuation-specialist",
  ],
  "Enterprise / Equity Value - Basic": [
    "investment-banking",
    "financial-analyst",
    "equity-research-analyst",
    "valuation-specialist",
    "investment-analyst",
    "pe-vc-analyst",
    "ir-specialist",
  ],
  "Enterprise / Equity Value - Advanced": [
    "investment-banking",
    "equity-research-analyst",
    "valuation-specialist",
    "pe-vc-analyst",
  ],
  "Valuation - Basic": [
    "investment-banking",
    "financial-analyst",
    "equity-research-analyst",
    "valuation-specialist",
    "investment-analyst",
    "pe-vc-analyst",
    "ir-specialist",
    "real-estate-finance",
  ],
  "Valuation - Advanced": [
    "investment-banking",
    "equity-research-analyst",
    "valuation-specialist",
    "investment-analyst",
    "pe-vc-analyst",
    "real-estate-finance",
  ],
  "Discounted Cash Flow - Basic": [
    "investment-banking",
    "financial-analyst",
    "equity-research-analyst",
    "valuation-specialist",
    "investment-analyst",
    "pe-vc-analyst",
    "fpa",
  ],
  "Discounted Cash Flow - Advanced": [
    "investment-banking",
    "equity-research-analyst",
    "valuation-specialist",
    "pe-vc-analyst",
  ],

  // Deal mechanics - genuinely specific to transaction roles.
  "Merger Model - Basic": [
    "investment-banking",
    "ma-origination",
    "ma-execution",
    "pmi-specialist",
    "pe-vc-analyst",
  ],
  "Merger Model - Advanced": ["investment-banking", "ma-execution", "pe-vc-analyst"],
  "LBO Model - Basic": ["investment-banking", "pe-vc-analyst", "ma-execution"],
  "LBO Model - Advanced": ["investment-banking", "pe-vc-analyst"],
  "Restructuring / Distressed M&A": [
    "investment-banking",
    "credit-officer",
    "risk-management",
    "pe-vc-analyst",
  ],

  // Logic puzzles show up in quant and banking screens alike.
  "Brain Teaser": ["investment-banking", "quant", "pe-vc-analyst"],

  // Nội dung viết riêng (lib/career-question-bank.ts). Ánh xạ hẹp có chủ ý:
  // đây là kiến thức đặc thù của nghề, không phải phần lõi dùng chung, nên
  // gán rộng ra sẽ lặp lại đúng sai lầm mà file này sinh ra để sửa.
  "Quản lý quỹ - Phí & hiệu suất": ["fund-manager", "portfolio-analyst", "etf-fund-specialist"],
  "Nguồn vốn - Thanh khoản & tỷ giá": ["treasury", "cfo-track", "fpa"],
  "Tuân thủ - Quy định & kiểm soát": ["compliance-officer", "internal-audit", "auditor"],
  "Định lượng - Xác suất & thống kê": ["quant", "data-analyst", "portfolio-analyst"],
  "ESG - Khung báo cáo & định giá": ["esg-analyst", "portfolio-analyst", "ir-specialist"],
  "Trái phiếu - Giao dịch & lãi suất": ["fixed-income-trader", "treasury", "portfolio-analyst"],
  "Môi giới - Sản phẩm & khách hàng": ["stockbroker", "retail-banking-rm", "personal-financial-advisor"],
  "Vĩ mô - Chính sách & chu kỳ": ["macro-research-analyst", "fixed-income-trader", "treasury"],
  "Thuế - Doanh nghiệp & cá nhân": ["tax-advisory", "accountant", "cfo-track"],
  "Bảo hiểm - Định phí & rủi ro": ["insurance-actuarial", "insurance-financial-advisor"],
  "Tín dụng tiêu dùng - Chấm điểm & thu hồi": ["consumer-credit-analyst", "credit-officer", "retail-banking-rm"],
};

/** Technical questions worth drilling for a given career. An unmapped career
 *  returns an empty array - the caller must treat that as "no bank yet"
 *  rather than silently falling back to the full IB set, which would tell an
 *  aspiring auditor that LBO modelling is part of their interview. */
export function getTechnicalQuestionsForCareer(careerId: string): IbQuestion[] {
  return ALL_TECHNICAL_QUESTIONS.filter((q) => IB_CATEGORY_CAREERS[q.category]?.includes(careerId));
}

export interface CareerCoverage {
  careerId: string;
  questionCount: number;
  /** Display labels of the categories that career draws from, largest first. */
  categories: string[];
}

/** Every career the bank covers, with how much of it applies to them.
 *  Sorted by coverage so the UI can lead with the best-served roles. */
export function getCareersCoveredByBank(): CareerCoverage[] {
  const byCareer = new Map<string, { count: number; categories: Map<string, number> }>();

  for (const q of ALL_TECHNICAL_QUESTIONS) {
    for (const careerId of IB_CATEGORY_CAREERS[q.category] ?? []) {
      let entry = byCareer.get(careerId);
      if (!entry) {
        entry = { count: 0, categories: new Map() };
        byCareer.set(careerId, entry);
      }
      entry.count++;
      const label = formatCategoryLabel(q.category);
      entry.categories.set(label, (entry.categories.get(label) ?? 0) + 1);
    }
  }

  return Array.from(byCareer.entries())
    .map(([careerId, e]) => ({
      careerId,
      questionCount: e.count,
      categories: Array.from(e.categories.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([label]) => label),
    }))
    .sort((a, b) => b.questionCount - a.questionCount);
}

/** True if the bank has enough questions for this career to be worth a drill.
 *  Below this the drill can't fill a five-question round without repeating. */
export const MIN_QUESTIONS_FOR_CAREER_DRILL = 5;

export function bankCoversCareer(careerId: string): boolean {
  return getTechnicalQuestionsForCareer(careerId).length >= MIN_QUESTIONS_FOR_CAREER_DRILL;
}
