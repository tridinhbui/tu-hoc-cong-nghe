// Deep-links into each site's own public job-search results page for a
// given keyword - NOT scraping. LinkedIn's ToS explicitly prohibits
// scraping (and they actively detect/block/pursue it), and neither TopCV
// nor VietnamWorks publish a documented public API, so pulling their
// listings into our own DB would mean an unsupported, ToS-violating
// scraper that silently breaks on every markup change. This instead opens
// their own search results in a new tab, exactly like a "search on Google"
// button - verified against each site's real search URL format (see
// components/JobSearchClient.tsx's comment for how).

export interface JobSearchSite {
  id: "linkedin" | "topcv" | "vietnamworks";
  label: string;
  buildUrl: (keyword: string) => string;
}

function slugifyKeyword(keyword: string): string {
  return keyword
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip Vietnamese diacritics
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const JOB_SEARCH_SITES: JobSearchSite[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    buildUrl: (keyword) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=Vietnam`,
  },
  {
    id: "topcv",
    label: "TopCV",
    buildUrl: (keyword) => `https://www.topcv.vn/tim-viec-lam-${slugifyKeyword(keyword)}?type_keyword=1&sba=1`,
  },
  {
    id: "vietnamworks",
    label: "VietnamWorks",
    buildUrl: (keyword) => `https://www.vietnamworks.com/viec-lam?q=${slugifyKeyword(keyword)}`,
  },
];

// Curated starting points relevant to this app's learners (personal
// finance track, professional/corporate+investment branches, CFA
// candidates) - not exhaustive, just enough to save a first keystroke.
export const SUGGESTED_JOB_KEYWORDS = [
  "Phân tích tài chính",
  "Kế toán",
  "Kiểm toán",
  "Ngân hàng đầu tư",
  "Chuyên viên tín dụng",
  "FP&A",
  "Quản lý quỹ đầu tư",
  "Chuyên viên đầu tư",
  "Kế toán trưởng",
  "Chuyên viên phân tích rủi ro",
];
