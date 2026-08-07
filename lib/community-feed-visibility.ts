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
 *  chuỗi ở đây là làm mồ côi mọi bài đã nằm dưới chủ đề đó. */
export const FEED_TOPIC_TAGS = [
  { id: "meo-tai-chinh", tag: "#MeoTaiChinh" },
  { id: "phan-tich", tag: "#PhanTich" },
  { id: "thanh-tuu", tag: "#ThanhTuu" },
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
  // Chuỗi ngày học do hệ thống tự đăng: không mang hashtag nào nhưng vẫn là
  // thành tựu, và chính chúng là phần đông của nhóm này.
  if (post.kind === "streak") return "thanh-tuu";
  return "all";
}

/** Bài này có hiện ở dòng chính không.
 *
 *  Quy tắc riêng nằm ở nhánh cuối: khi đang xem "tất cả" và không tìm kiếm gì,
 *  bài thành tựu được cất sang thẻ ở cột phải. Lý do là số lượng - phần lớn
 *  chúng do hệ thống tự sinh, nên trộn chung thì bài do người thật ngồi viết
 *  trở thành phần khó thấy nhất của một trang cộng đồng.
 *
 *  Hai lối ra giữ nó là ưu tiên chứ không phải giấu: chọn chip "Thành tựu" thì
 *  dòng chính hiện đúng chúng, và một truy vấn tìm kiếm vẫn tìm ra chúng. Tìm
 *  tên một người rồi không thấy bài của họ đâu là một lỗi, không phải một lựa
 *  chọn bố cục. */
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
  if (!query && category === "thanh-tuu") return false;
  return true;
}
