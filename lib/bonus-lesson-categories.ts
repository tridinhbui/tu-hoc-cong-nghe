// Purely presentational grouping for the dashboard's "Case chuyên sâu"
// section (the flat list of bonus/case-study lessons, ids 1001+). That list
// renders sorted by id, so a newly added lesson always lands at the very
// bottom regardless of topic, landing after dozens of unrelated cases and
// becoming effectively impossible to find. This map
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
  "chon-cach-uoc-luong": "Ước lượng & quyết định kỹ thuật",
  "he-thong-dang-co-gi": "Đọc số liệu hệ thống",
  "10-cong-thuc-phong-van-ky-thuat": "Ước lượng & quyết định kỹ thuật",
  "chi-phi-moi-request-co-hop-ly": "Ước lượng & quyết định kỹ thuật",
  "case-tong-chi-phi-so-huu": "Đo lường & vận hành hệ thống",
  "case-tach-do-tre-thanh-phan": "Đo lường & vận hành hệ thống",
  "case-lap-trinh-quy-ve-may-y-tuong": "Đo lường & vận hành hệ thống",
  "case-hai-cach-do-do-kha-dung": "Đo lường & vận hành hệ thống",
  "danh-gia-mot-du-an-nen-tang-noi-bo": "Ước lượng & quyết định kỹ thuật",

  "mot-lan-toi-uu-lon": "Đọc số liệu hệ thống",
  "doc-dong-tai-nguyen-he-thong-lon": "Đọc số liệu hệ thống",
  "so-lieu-giua-ky-va-thay-doi-an": "Đọc số liệu hệ thống",
  "dong-tai-nguyen-san-pham-tang-nhanh": "Đọc số liệu hệ thống",
  "case-dat-truoc-hay-tra-theo-dung": "Đo lường & vận hành hệ thống",
  "doi-co-20-phan-tram-nang-luc-du": "Đọc số liệu hệ thống",
  "case-no-ky-thuat-tich-luy": "Đo lường & vận hành hệ thống",
  "chi-phi-co-dinh-va-theo-luong-dung": "Đọc số liệu hệ thống",
  "chia-chi-phi-dich-vu-dung-chung": "Đọc số liệu hệ thống",
  "case-tinh-phi-ha-tang-noi-bo": "Đo lường & vận hành hệ thống",
  "ty-le-no-ky-thuat": "Đọc số liệu hệ thống",
  "case-doc-sau-nhat-ky": "Đo lường & vận hành hệ thống",
  "phan-loai-rui-ro-ky-thuat": "Đọc số liệu hệ thống",
  "case-doc-bao-cao-su-co": "Đo lường & vận hành hệ thống",
  "case-ghep-hai-he-thong": "Đo lường & vận hành hệ thống",
  "case-bon-mo-hinh-trien-khai": "Đo lường & vận hành hệ thống",
  "case-tu-dung-hay-mua": "Đo lường & vận hành hệ thống",
  "case-phan-tich-mot-dich-vu": "Đo lường & vận hành hệ thống",
  "case-ai-trong-san-pham-that": "Đo lường & vận hành hệ thống",
  "case-cong-nghe-moi-co-that-khong": "Đo lường & vận hành hệ thống",
  "tai-nguyen-tinh-toan-khan-hiem": "Case sản phẩm thực tế",
  "case-ty-le-trung-cache": "Đo lường & vận hành hệ thống",

  "slo-cam-ket-do-tin-cay": "Cam kết độ tin cậy",
  "sau-khi-ra-mat-co-nen-cong-bo-slo": "Cam kết độ tin cậy",

  "nhieu-dich-vu-nho-hay-mot-dich-vu-lon": "Kiến trúc & nền tảng",
  "wealth-management": "Kiến trúc & nền tảng",
  "case-ba-dieu-nan-khi-hoc-lap-trinh": "Đo lường & vận hành hệ thống",
};

// Render order - "Ước lượng & quyết định kỹ thuật" first since it's the cluster most
// people look for.
/** Nhóm dành cho bài chưa được gán. Là KHOÁ, không phải nhãn hiển thị. */
export const BONUS_CATEGORY_FALLBACK = "Khác";

/* Thứ tự ƯU TIÊN, không phải danh sách đầy đủ.
 *
 * Trước đây đây LÀ danh sách đầy đủ, và `DashboardClient` duyệt đúng mảng này
 * để dựng nhóm - nên một nhóm có trong `BONUS_CATEGORIES` mà thiếu ở đây thì
 * mọi bài thuộc nhóm đó lọc ra rỗng và KHÔNG hiện ở đâu cả. Đúng chuyện đã
 * xảy ra: nhóm "Đo lường & vận hành hệ thống" được gán cho 20 bài trong đợt
 * chuyển sang công nghệ, không ai thêm nó vào đây, và 20 bài biến mất khỏi
 * bảng điều khiển. Không lỗi biên dịch, không bộ kiểm nào đỏ, `tsc` xanh -
 * một mảng thiếu một phần tử trông giống hệt một mảng đủ.
 *
 * Nên danh sách đầy đủ giờ được TÍNH, không gõ tay: ưu tiên trước, phần còn
 * lại của bảng nối vào sau, nhóm dự phòng luôn cuối. Thêm một nhóm mới vào
 * `BONUS_CATEGORIES` là đủ để nó hiện ra. */
export const BONUS_CATEGORY_PREFERRED_ORDER = [
  "Ước lượng & quyết định kỹ thuật",
  "Đọc số liệu hệ thống",
  "Case sản phẩm thực tế",
  "Cam kết độ tin cậy",
  "Kiến trúc & nền tảng",
];

export const BONUS_CATEGORY_ORDER: string[] = (() => {
  const uu = BONUS_CATEGORY_PREFERRED_ORDER.filter((c) => c !== BONUS_CATEGORY_FALLBACK);
  const conLai = [...new Set(Object.values(BONUS_CATEGORIES))]
    .filter((c) => c !== BONUS_CATEGORY_FALLBACK && !uu.includes(c))
    .sort((a, b) => a.localeCompare(b, "vi"));
  return [...uu, ...conLai, BONUS_CATEGORY_FALLBACK];
})();

/* i18n-ignore-end */
