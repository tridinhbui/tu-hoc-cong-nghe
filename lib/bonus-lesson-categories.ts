// Purely presentational grouping for the dashboard's "Case chuyên sâu"
// section (the flat list of bonus/case-study lessons, ids 1001+). That list
// renders sorted by id, so a newly added lesson always lands at the very
// bottom regardless of topic - e.g. dinh-gia-tai-san-rong (asset-based
// valuation) landed after 35 unrelated cases instead of near ROIC/
// Enterprise Value/WACC, making it effectively impossible to find. This map
// clusters bonus lessons by topic so the section can render sub-headers
// instead. Does not affect lesson ids, unlock logic, or the day-numbered
// Personal/Professional tracks - display grouping only.
/* i18n-ignore-start: giá trị của bảng này vừa là NHÃN hiển thị vừa là KHOÁ
   nhóm - DashboardClient lọc bài theo `BONUS_CATEGORIES[slug] === category`.
   Nên chúng không được dịch tại chỗ; nhãn hiển thị tra qua
   `t.bonusCategories[category]` còn phép lọc vẫn so bằng chuỗi gốc. Dịch ở đây
   sẽ làm mọi nhóm rỗng mà không có lỗi nào. */
export const BONUS_CATEGORIES: Record<string, string> = {
  "case-uoc-luong-dung-luong": "Đo lường & vận hành hệ thống",
  "case-chi-phi-moi-request": "Đo lường & vận hành hệ thống",
  "case-chi-phi-va-kien-truc": "Đo lường & vận hành hệ thống",
  "chon-phuong-phap-dinh-gia": "Định giá doanh nghiệp",
  "bang-can-doi-ke-toan": "Đọc báo cáo tài chính",
  "10-cong-thuc-finance": "Định giá doanh nghiệp",
  "market-fair-value": "Định giá doanh nghiệp",
  "case-tong-chi-phi-so-huu": "Đo lường & vận hành hệ thống",
  "case-tach-do-tre-thanh-phan": "Đo lường & vận hành hệ thống",
  "case-lap-trinh-quy-ve-may-y-tuong": "Đo lường & vận hành hệ thống",
  "case-hai-cach-do-do-kha-dung": "Đo lường & vận hành hệ thống",
  "danh-gia-du-an-npv-irr": "Định giá doanh nghiệp",

  "discontinued-operations": "Đọc báo cáo tài chính",
  "vingroup-cash-flow": "Đọc báo cáo tài chính",
  "interim-comprehensive-income": "Đọc báo cáo tài chính",
  "tesla-cash-flow": "Đọc báo cáo tài chính",
  "case-dat-truoc-hay-tra-theo-dung": "Đo lường & vận hành hệ thống",
  "fpt-cfo-cash": "Đọc báo cáo tài chính",
  "case-no-ky-thuat-tich-luy": "Đo lường & vận hành hệ thống",
  "inventory-turnover": "Đọc báo cáo tài chính",
  "operating-leverage": "Đọc báo cáo tài chính",
  "income-affiliates-jv": "Đọc báo cáo tài chính",
  "case-tinh-phi-ha-tang-noi-bo": "Đo lường & vận hành hệ thống",
  "maple-leaf-leverage": "Đọc báo cáo tài chính",
  "case-doc-sau-nhat-ky": "Đo lường & vận hành hệ thống",
  "financial-risk": "Đọc báo cáo tài chính",
  "case-doc-bao-cao-su-co": "Đo lường & vận hành hệ thống",
  "case-ghep-hai-he-thong": "Đo lường & vận hành hệ thống",
  "case-bon-mo-hinh-trien-khai": "Đo lường & vận hành hệ thống",
  "case-tu-dung-hay-mua": "Đo lường & vận hành hệ thống",
  "case-phan-tich-mot-dich-vu": "Đo lường & vận hành hệ thống",
  "case-ai-trong-san-pham-that": "Đo lường & vận hành hệ thống",
  "case-cong-nghe-moi-co-that-khong": "Đo lường & vận hành hệ thống",
  "commodity-phan-2": "Case công ty thực tế",
  "case-ty-le-trung-cache": "Đo lường & vận hành hệ thống",

  dividend: "Vốn & cổ đông",
  "post-ipo-dividend": "Vốn & cổ đông",

  "modern-portfolio-theory": "Đầu tư & danh mục",
  "wealth-management": "Đầu tư & danh mục",
  "case-ba-dieu-nan-khi-hoc-lap-trinh": "Đo lường & vận hành hệ thống",
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

/* i18n-ignore-end */
