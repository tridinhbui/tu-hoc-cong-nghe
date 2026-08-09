import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
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

/* i18n-ignore-start: tên ba trang là THƯƠNG HIỆU - "LinkedIn", "TopCV",
   "VietnamWorks" đọc y hệt ở mọi ngôn ngữ, và dịch chúng là đổi tên một công
   ty. Các chuỗi còn lại trong khối là URL, không phải chữ người dùng đọc. */
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
/* i18n-ignore-end */

/** Từ khoá gợi ý, mỗi cái một CẶP: chuỗi tìm kiếm và khoá nhãn.
 *
 *  `term` BẮT BUỘC giữ tiếng Việt và không dịch. Nó không phải chữ hiển thị mà
 *  là thứ được đẩy vào URL: `slugifyKeyword` bỏ dấu rồi dựng đường dẫn TopCV
 *  (`tim-viec-lam-ke-toan`) và VietnamWorks. Dịch nó thành "Accounting" là
 *  dựng ra `tim-viec-lam-accounting`, một trang không tồn tại - tức nút vẫn
 *  bấm được và vẫn mở tab mới, chỉ là không có việc nào.
 *
 *  Chỉ NHÃN được dịch. Người đọc giao diện tiếng Anh vẫn đang tìm việc ở thị
 *  trường Việt Nam, nên họ cần đọc được nút bấm chứ không cần đổi thị trường.
 *
 *  Danh sách là điểm khởi đầu chọn tay cho người học của ứng dụng này - không
 *  đầy đủ, chỉ đủ để đỡ một lần gõ đầu tiên.
 */
/* i18n-ignore-start: `term` là chuỗi TÌM KIẾM đẩy vào URL, không phải chữ
   hiển thị - nhãn người dùng đọc nằm ở t.jobKeywords. Xem chú thích ngay trên:
   dịch term là dựng ra một đường dẫn TopCV không tồn tại. */
export const SUGGESTED_JOB_KEYWORDS: ReadonlyArray<{
  term: string;
  key: keyof Dictionary["jobKeywords"];
}> = [
  { term: "Phân tích tài chính", key: "financialAnalysis" },
  { term: "Kế toán", key: "accounting" },
  { term: "Kiểm toán", key: "audit" },
  { term: "Ngân hàng đầu tư", key: "investmentBanking" },
  { term: "Chuyên viên tín dụng", key: "creditOfficer" },
  { term: "FP&A", key: "fpa" },
  { term: "Quản lý quỹ đầu tư", key: "fundManagement" },
  { term: "Chuyên viên đầu tư", key: "investmentOfficer" },
  { term: "Kế toán trưởng", key: "chiefAccountant" },
  { term: "Chuyên viên phân tích rủi ro", key: "riskAnalyst" },
  { term: "Hoạch định tài chính", key: "financialPlanning" },
  { term: "Quantitative Analyst", key: "quant" },
  { term: "Định giá tài sản", key: "valuation" },
  { term: "Quan hệ cổ đông", key: "investorRelations" },
];
/* i18n-ignore-end */