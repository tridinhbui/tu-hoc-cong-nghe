// Khoá localStorage của mục tiêu sự nghiệp, và kênh báo khi nó đổi.
//
// Để ở lib chứ không ở cạnh JobSearchClient: CareerGoalWidget và AppNavbar
// cũng cần chúng, và import từ JobSearchClient sẽ kéo cả trang tìm việc -
// hơn hai nghìn dòng cùng toàn bộ dữ liệu nghề - vào bundle của một widget
// sidebar, chỉ để lấy hai chuỗi.

/** Mục tiêu sự nghiệp đang theo dõi. */
export const CAREER_GOAL_KEY = "active_career_goal";

/** Các mục kỹ năng/chứng chỉ đã đánh dấu hoàn thành, lưu dạng JSON array. */
export const CAREER_ITEMS_KEY = "active_career_completed_items";

/** Kênh cho những nơi đọc thẳng localStorage (useLocalStorageValue).
 *
 *  CỐ Ý khác tên với CAREER_GOAL_EVENT bên dưới. Hai kênh mang hai loại tin:
 *  kênh này chỉ nói "khoá vừa đổi, đọc lại đi", còn kênh kia mang giá trị mới
 *  trong `detail` và AppNavbar tin vào đó. Bắn một Event trần lên kênh có
 *  `detail` sẽ khiến AppNavbar đọc `detail` ra undefined và xoá mất mục tiêu
 *  đang có. */
export const CAREER_GOAL_STORAGE_EVENT = "thtcdn:career-goal-storage";

/** Kênh mang giá trị mới, AppNavbar nghe sẵn từ trước. Luôn dùng CustomEvent
 *  kèm `detail.careerId`. */
export const CAREER_GOAL_EVENT = "thtcdn:career-goal-updated";
