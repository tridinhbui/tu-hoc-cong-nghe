/** Dải "người thật đang học" ở cuối màn hình Học bài.
 *
 *  NGUYÊN TẮC VIẾT: khối này thay thế những con số bịa ("219 người đang học",
 *  băm ra từ slug bài học trong lib/illustrative-stats.ts), nên chữ ở đây không
 *  được hứa nhiều hơn dữ liệu. Ba luật:
 *
 *  1. Nói ĐÚNG thứ đo được. Người trong danh sách là người còn chuỗi ngày VÀ
 *     còn hoạt động trong 7 ngày - nên tiêu đề nói "đang giữ chuỗi ngày", không
 *     nói "đang học" theo nghĩa lúc này đang mở trang.
 *  2. Không có số tổng nào không đếm được. Câu phụ đếm đúng số người trong dải,
 *     không ước lượng cả cộng đồng.
 *  3. Tên người là tên thật, nên không có giọng quảng cáo. Không "siêu sao",
 *     không "cao thủ" - chỉ tên, số ngày, và bài họ vừa học. */
export const communityLearningVi = {
  communityLearning: {
    title: "Đang giữ chuỗi ngày",
    // "trong tuần này" là 7 ngày, khớp p_days của RPC. Đổi một bên thì đổi cả
    // hai, không thì câu này thành câu sai.
    subtitle: "{count} người học đang duy trì chuỗi ngày trong tuần này.",
    subtitleOne: "1 người học đang duy trì chuỗi ngày trong tuần này.",
    streakDays: "{days} ngày",
    justStudied: "Vừa học",
    // Người dùng chưa đặt tên hiển thị. Không dùng "Ẩn danh" - họ không chọn ẩn
    // danh, họ chỉ chưa điền tên.
    anonLearner: "Người học",
    loading: "Đang xem cộng đồng…",
  },
};

export const communityLearningEn: typeof communityLearningVi = {
  communityLearning: {
    title: "Streaks running now",
    subtitle: "{count} learners kept a streak going this week.",
    subtitleOne: "1 learner kept a streak going this week.",
    streakDays: "{days} days",
    justStudied: "Just studied",
    anonLearner: "A learner",
    loading: "Checking the community…",
  },
};
