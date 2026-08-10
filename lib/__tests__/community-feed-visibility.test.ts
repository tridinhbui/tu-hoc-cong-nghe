import { describe, expect, it } from "vitest";
import {
  isPostVisibleInFeed,
  isSystemPost,
  visibleFeedPosts,
  type FeedVisibilityPost,
} from "@/lib/community-feed-visibility";

// Màn hình feed tự lấy dữ liệu từ Supabase sau tường đăng nhập, nên đây là chỗ
// duy nhất kiểm được luật hiển thị mà không cần một phiên đăng nhập thật và vài
// chục bài dựng sẵn.

function post(overrides: Partial<FeedVisibilityPost> = {}): FeedVisibilityPost {
  return { content: "Hôm nay mình học xong bài về lãi kép", kind: "manual", ...overrides };
}

describe("bài hệ thống", () => {
  it("bài chuỗi ngày không hiện ở dòng chính", () => {
    expect(isPostVisibleInFeed(post({ kind: "streak" }), "")).toBe(false);
  });

  it("bài người viết thì hiện", () => {
    expect(isPostVisibleInFeed(post(), "")).toBe(true);
  });

  it("isSystemPost nhận đúng loại, không đoán theo nội dung", () => {
    // Một người hoàn toàn có thể tự viết bài khoe chuỗi ngày của mình. Bài đó
    // là bài người viết và phải hiện - phân biệt nằm ở cột `kind`, không nằm ở
    // chữ trong bài.
    expect(isSystemPost({ content: "Mình vừa đạt chuỗi 30 ngày!", kind: "manual" })).toBe(false);
    expect(isSystemPost({ content: "", kind: "streak" })).toBe(true);
  });

  it("kind thiếu thì coi là bài người viết", () => {
    expect(isPostVisibleInFeed({ content: "abc" }, "")).toBe(true);
  });
});

describe("tìm kiếm", () => {
  it("khớp nội dung", () => {
    expect(isPostVisibleInFeed(post(), "lãi kép")).toBe(true);
    expect(isPostVisibleInFeed(post(), "trái phiếu")).toBe(false);
  });

  it("khớp cả tên người đăng", () => {
    expect(isPostVisibleInFeed(post({ user_name: "Hùng Lê" }), "hùng")).toBe(true);
  });

  it("khoảng trắng thừa trong ô tìm kiếm không lọc mất bài nào", () => {
    expect(isPostVisibleInFeed(post(), "   ")).toBe(true);
  });

  it("tìm kiếm KHÔNG kéo bài hệ thống trở lại", () => {
    // Đây là chỗ dễ hỏng nhất nếu ai đó sắp lại thứ tự hai điều kiện: gõ đúng
    // chữ trong bài chuỗi ngày cũng không được làm nó hiện lên.
    expect(isPostVisibleInFeed({ content: "chuỗi 7 ngày", kind: "streak" }, "chuỗi")).toBe(false);
  });
});

describe("visibleFeedPosts", () => {
  it("giữ nguyên thứ tự và chỉ bỏ bài hệ thống", () => {
    const posts = [
      post({ content: "a" }),
      post({ content: "b", kind: "streak" }),
      post({ content: "c" }),
    ];
    expect(visibleFeedPosts(posts, "").map((p) => p.content)).toEqual(["a", "c"]);
  });

  it("một trang toàn bài chuỗi ngày cho ra danh sách rỗng - đúng như thiết kế", () => {
    // Trang rỗng ở tầng này KHÔNG phải lỗi: nó là tín hiệu để CommunityFeedClient
    // lấy tiếp trang sau. Lần trước luật lọc bị gỡ vì trang đầu rỗng bị hiểu là
    // "mất bài", và cách chữa nằm ở chỗ lấy dữ liệu chứ không ở đây.
    const posts = [post({ kind: "streak" }), post({ kind: "streak" })];
    expect(visibleFeedPosts(posts, "")).toHaveLength(0);
  });
});
