/** Quy tắc bài nào hiện ở dòng chính của feed cộng đồng.
 *
 *  Tách khỏi CommunityFeedClient.tsx vì đây là phần duy nhất của màn hình đó
 *  kiểm được mà không cần trình duyệt: màn hình tự lấy dữ liệu từ Supabase sau
 *  tường đăng nhập, nên "bài chuỗi ngày có bị lọc đúng không" không có cách nào
 *  nhìn thấy bằng ảnh chụp trong lúc dựng.
 *
 *  Ở đây không có React, không có icon, không có class Tailwind - chỉ chuỗi và
 *  điều kiện.
 *
 *  KHÔNG CÒN PHÂN LOẠI CHỦ ĐỀ. Trước đây file này giữ năm hashtag (#MeoTaiChinh,
 *  #PhanTich, #HoiDap, #TinNong, #AITaiChinh) và một hàm đoán chủ đề của bài từ
 *  nội dung. Cả bộ đã bị gỡ theo yêu cầu của chủ dự án: một cộng đồng ở quy mô
 *  này không cần ai xếp bài vào ngăn nào, và sáu cái chip ở đầu trang chỉ làm
 *  người viết phải chọn trước khi được nói.
 *
 *  Hashtag cũ nằm trong NỘI DUNG bài đã lưu, nên gỡ bảng này không đụng vào dữ
 *  liệu: chúng vẫn ở đó, chỉ trở lại thành chữ thường trong bài. Không bài nào
 *  biến mất, và ai muốn dựng lại phân loại thì đọc git history của file này. */

/** Bài đủ để quyết định hiển thị. */
export type FeedVisibilityPost = {
  content: string | null;
  kind?: string | null;
  user_name?: string | null;
};

/** Bài do hệ thống tự đăng, không phải do người viết.
 *
 *  Hiện chỉ có `streak`. Để thành một Set thay vì so `=== "streak"` vì lần sau
 *  thêm một loại máy sinh (lên cấp, mở rương) thì chỗ phải sửa là đây, không
 *  phải đi tìm khắp component. */
const SYSTEM_KINDS: ReadonlySet<string> = new Set(["streak"]);

export function isSystemPost(post: FeedVisibilityPost): boolean {
  return SYSTEM_KINDS.has(post.kind ?? "");
}

/** Bài này có hiện ở dòng chính không.
 *
 *  BÀI CHUỖI NGÀY BỊ LOẠI HẲN, không phải hạ ưu tiên. Đây là lần thứ hai luật
 *  này được đặt vào, và lần trước nó bị gỡ với một lý do đo được: dòng chính
 *  thành trống kèm câu "chưa có bài nào phù hợp bộ lọc", và người đọc ra là
 *  "tôi mất bài rồi".
 *
 *  Lần này khác ở chỗ nguyên nhân thật đã được sửa cùng lúc, và nó không nằm ở
 *  luật lọc mà ở chỗ LẤY DỮ LIỆU: feed lấy 20 bài mỗi trang, mà bài chuỗi ngày
 *  chiếm gần hết 20 bài mới nhất - nên lọc phía client xong thì trang đầu gần
 *  như rỗng dù trong cơ sở dữ liệu vẫn còn đầy bài người viết ở phía dưới.
 *  CommunityFeedClient giờ lấy tiếp trang sau cho tới khi đủ bài thật (xem
 *  `fillFeed`), nên loại bài hệ thống ra không còn làm mất bài của ai.
 *
 *  Bài chuỗi ngày vẫn còn nguyên trong cơ sở dữ liệu và vẫn hiện ở bảng bên
 *  phải - chúng chỉ không chen vào giữa những bài người thật viết nữa. */
export function isPostVisibleInFeed(post: FeedVisibilityPost, searchQuery: string): boolean {
  if (isSystemPost(post)) return false;

  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const haystack = `${post.content ?? ""} ${post.user_name ?? ""}`.toLowerCase();
  return haystack.includes(query);
}

/** Danh sách bài hiện ở dòng chính.
 *
 *  Giữ hàm này dù nó chỉ là một `filter`, vì hai chỗ gọi nó và giữ một điểm vào
 *  duy nhất nghĩa là luật hiển thị chỉ có một chỗ để đọc. */
export function visibleFeedPosts<T extends FeedVisibilityPost>(
  posts: readonly T[],
  searchQuery: string
): T[] {
  return posts.filter((post) => isPostVisibleInFeed(post, searchQuery));
}
