/** Phân loại bài trong feed cộng đồng, và quy tắc bài nào hiện ở dòng chính.
 *
 *  Tách khỏi CommunityFeedClient.tsx vì đây là phần duy nhất của màn hình đó
 *  kiểm được mà không cần trình duyệt: màn hình tự lấy dữ liệu từ Supabase sau
 *  tường đăng nhập, nên "bài thành tựu có bị lọc đúng không" không có cách nào
 *  nhìn thấy bằng ảnh chụp trong lúc dựng.
 *
 *  Ở đây không có React, không có icon, không có class Tailwind - chỉ chuỗi và
 *  điều kiện. Phần icon và tông màu vẫn nằm lại trong component. */

/** Hashtag nhận diện chủ đề, KHÔNG bao giờ dịch.
 *
 *  Chúng được so khớp với nội dung bài ĐÃ LƯU trong cơ sở dữ liệu, nên đổi một
 *  chuỗi ở đây là làm mồ côi mọi bài đã nằm dưới chủ đề đó.
 *
 *  `meo-tai-chinh` có một lần bị bỏ khỏi bảng này rồi đưa lại, và lý do bỏ vẫn
 *  đúng nhưng nhắm sai chỗ: nó là giá trị MẶC ĐỊNH của ô soạn bài, nên bài của
 *  người chưa từng mở hộp chọn đều ra đời dưới nhãn "Mẹo tài chính". Cái sai là
 *  cái mặc định, không phải cái chủ đề - và bỏ chủ đề đi thì mọi bài từng được
 *  gắn nhãn ấy MỘT CÁCH CÓ Ý cũng mất nhãn theo. Cái mặc định đã sửa ở
 *  CommunityFeedClient; chủ đề thì ở lại.
 *
 *  `thanh-tuu` thì ĐI THẬT, và đi vì lý do khác: nó gần như toàn bộ là bài do
 *  hệ thống tự đăng, nên nó không phải một chủ đề người ta viết vào mà là một
 *  luồng máy sinh ra được cho một cái nhãn. Bài cũ dưới nó trở thành không loại
 *  nào và VẪN HIỆN đủ ở dòng chính - đây là bỏ một cái nhãn, không phải ẩn bài. */
export const FEED_TOPIC_TAGS = [
  { id: "meo-tai-chinh", tag: "#MeoTaiChinh" },
  { id: "phan-tich", tag: "#PhanTich" },
  { id: "hoi-dap", tag: "#HoiDap" },
  { id: "tin-nong", tag: "#TinNong" },
  { id: "ai-finance", tag: "#AITaiChinh" },
] as const;

export type FeedTopicId = (typeof FEED_TOPIC_TAGS)[number]["id"] | "all";

const TOPIC_IDS: ReadonlySet<string> = new Set<string>([
  "all",
  ...FEED_TOPIC_TAGS.map((topic) => topic.id),
]);

/** Bài đủ để phân loại: chỉ ba trường quyết định chủ đề. */
export type ClassifiablePost = {
  content: string | null;
  kind?: string | null;
  metadata?: unknown;
};

export function getPostCategory(post: ClassifiablePost): FeedTopicId {
  // `metadata` tới từ cột jsonb nên nó là `unknown` thật, không phải một object
  // chắc chắn. Dùng Set thay vì `x in {...}` để "constructor" hay "toString"
  // trong dữ liệu không lọt qua bằng chuỗi nguyên mẫu.
  const raw =
    post.metadata && typeof post.metadata === "object"
      ? String((post.metadata as Record<string, unknown>).category ?? "")
      : "";
  if (TOPIC_IDS.has(raw)) return raw as FeedTopicId;

  const content = post.content || "";
  for (const topic of FEED_TOPIC_TAGS) {
    if (content.includes(topic.tag)) return topic.id;
  }
  // Bài chuỗi ngày học do hệ thống tự đăng KHÔNG còn được xếp loại. Trước đây
  // chúng vào "thanh-tuu", và chính chúng là gần hết nhóm ấy - tức cái nhãn đó
  // đếm được một việc máy làm chứ không phải một việc ai viết. Giờ chúng là bài
  // không loại nào, hiện đủ ở dòng chính như mọi bài khác.
  return "all";
}

/** Bài này có hiện ở dòng chính không.
 *
 *  KHÔNG CÓ QUY TẮC HẠ ƯU TIÊN NỮA. Bản trước bỏ bài thành tựu khỏi dòng chính
 *  khi đang xem "tất cả", với lý do đúng: phần lớn chúng do hệ thống tự sinh,
 *  nên trộn chung thì bài người thật viết thành phần khó thấy nhất của trang.
 *
 *  Nhưng cái giá thì lớn hơn cái lợi, và nó đo được: một cộng đồng có 20 bài mở
 *  /finsocial ra thấy dòng chính trống kèm câu "chưa có bài nào phù hợp bộ lọc".
 *  Người đọc ra là "tôi mất bài rồi" - và đó là cách đọc đúng với thứ họ nhìn
 *  thấy. Nhánh cứu từng được thêm để đỡ chuyện đó nhưng loại trừ luôn bài chuỗi
 *  ngày, tức loại trừ đúng nhóm chiếm gần hết số bài, nên nó không đỡ được gì
 *  trong chính trường hợp nó sinh ra để đỡ.
 *
 *  Một dòng chính hiện đủ bài không cần giải thích cho ai. Việc bài hệ thống
 *  nhiều hơn bài người viết là vấn đề của NGUỒN bài, không phải của bộ lọc -
 *  giấu chúng đi không làm ai viết thêm bài nào. */
export function isPostVisibleInFeed(
  post: ClassifiablePost & { user_name?: string | null },
  filter: FeedTopicId,
  searchQuery: string
): boolean {
  const query = searchQuery.trim().toLowerCase();
  const category = getPostCategory(post);

  if (query) {
    const haystack = `${post.content ?? ""} ${post.user_name ?? ""}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  if (filter !== "all") return category === filter;
  return true;
}

/** Danh sách bài hiện ở dòng chính.
 *
 *  Giữ hàm này dù nó giờ chỉ là một `filter`, vì hai chỗ gọi nó và giữ một điểm
 *  vào duy nhất nghĩa là luật hiển thị chỉ có một chỗ để đọc.
 *
 *  Bản trước có thêm một NHÁNH CỨU: nếu hạ ưu tiên xong mà dòng chính rỗng thì
 *  trả lại những bài vừa bị hạ. Nhánh đó đi cùng luật hạ ưu tiên, và nó cũng
 *  cho thấy vì sao luật kia không đứng được: nhánh cứu phải loại trừ bài chuỗi
 *  ngày để dòng chính không thành hai mươi dòng "đã học N ngày liên tiếp" - mà
 *  chuỗi ngày lại chiếm gần hết số bài, nên nhánh cứu không cứu được đúng
 *  trường hợp nó sinh ra để cứu. Sửa một luật bằng một ngoại lệ vô hiệu trong
 *  chính ca thường gặp nhất thì luật đó nên đi. */
export function visibleFeedPosts<T extends ClassifiablePost & { user_name?: string | null }>(
  posts: readonly T[],
  filter: FeedTopicId,
  searchQuery: string
): T[] {
  return posts.filter((post) => isPostVisibleInFeed(post, filter, searchQuery));
}

