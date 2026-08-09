import { describe, expect, it } from "vitest";
import {
  getPostCategory,
  isPostVisibleInFeed,
  visibleFeedPosts,
  type ClassifiablePost,
} from "@/lib/community-feed-visibility";

/** Bài thành tựu bị cất khỏi dòng chính, và cả hai lối ra vẫn còn.
 *
 *  Màn hình cộng đồng tự lấy dữ liệu từ Supabase sau tường đăng nhập, nên đây
 *  là chỗ duy nhất kiểm được quy tắc này mà không cần một phiên đăng nhập thật
 *  và vài chục bài đăng dựng sẵn. */

const post = (over: Partial<ClassifiablePost & { user_name: string }> = {}) => ({
  content: "Hôm nay mình hiểu ra cách đọc dòng tiền tự do",
  user_name: "Minh",
  kind: "post",
  ...over,
});

const streak = post({ content: "Đã học 7 ngày liên tiếp", kind: "streak" });
const tagged = post({ content: "#ThanhTuu Vừa xong chặng định giá" });

describe("phân loại bài", () => {
  it("bài chuỗi ngày không mang hashtag vẫn là thành tựu", () => {
    // Đây là phần đông của nhóm: hệ thống tự đăng, không ai gõ hashtag vào.
    expect(getPostCategory(streak)).toBe("thanh-tuu");
  });

  it("hashtag trong nội dung đã lưu quyết định chủ đề", () => {
    expect(getPostCategory(tagged)).toBe("thanh-tuu");
    expect(getPostCategory(post({ content: "#HoiDap WACC tính sao" }))).toBe("hoi-dap");
  });

  it("metadata.category thắng nội dung khi nó là một chủ đề thật", () => {
    expect(getPostCategory(post({ metadata: { category: "phan-tich" } }))).toBe("phan-tich");
  });

  it("một khoá trên chuỗi nguyên mẫu không thành chủ đề", () => {
    // `"constructor" in {...}` trả về true. Nếu chỗ này dùng `in` thay vì Set
    // thì một bài có metadata lạ sẽ được xếp vào một chủ đề không tồn tại và
    // biến mất khỏi mọi bộ lọc.
    for (const evil of ["constructor", "toString", "__proto__", "hasOwnProperty"]) {
      expect(getPostCategory(post({ metadata: { category: evil } }))).toBe("all");
    }
  });
});

describe("dòng chính ưu tiên bài người dùng tự viết", () => {
  it("bài thành tựu không hiện khi đang xem tất cả", () => {
    expect(isPostVisibleInFeed(streak, "all", "")).toBe(false);
    expect(isPostVisibleInFeed(tagged, "all", "")).toBe(false);
  });

  it("bài chia sẻ thường thì vẫn hiện", () => {
    expect(isPostVisibleInFeed(post(), "all", "")).toBe(true);
  });

  it("chọn chip Thành tựu thì chúng hiện ở dòng chính", () => {
    // Lối ra thứ nhất. Không có nhánh này thì chip đó thành một nút chết.
    expect(isPostVisibleInFeed(streak, "thanh-tuu", "")).toBe(true);
    expect(isPostVisibleInFeed(post(), "thanh-tuu", "")).toBe(false);
  });

  it("tìm kiếm vẫn tìm ra bài thành tựu", () => {
    // Lối ra thứ hai, và là cái quan trọng hơn: gõ tên một người rồi không
    // thấy bài của họ đâu là một lỗi, không phải một lựa chọn bố cục.
    expect(isPostVisibleInFeed(streak, "all", "7 ngày")).toBe(true);
    expect(isPostVisibleInFeed(streak, "all", "Minh")).toBe(true);
  });

  it("tìm kiếm không khớp thì không hiện, kể cả bài thường", () => {
    expect(isPostVisibleInFeed(post(), "all", "trái phiếu")).toBe(false);
  });

  it("tìm kiếm không phân biệt hoa thường và bỏ khoảng trắng thừa", () => {
    expect(isPostVisibleInFeed(post(), "all", "  DÒNG TIỀN  ")).toBe(true);
  });

  it("bài không có nội dung, chỉ có ảnh, không làm vỡ bộ lọc", () => {
    const imageOnly = post({ content: null });
    expect(isPostVisibleInFeed(imageOnly, "all", "")).toBe(true);
    expect(isPostVisibleInFeed(imageOnly, "all", "Minh")).toBe(true);
  });
});

/** Cộng đồng chỉ toàn bài hệ thống tự sinh.
 *
 *  Đây là trạng thái thật của /finsocial lúc phát hiện: 20 bài, cả 20 đều là
 *  chuỗi ngày học do hệ thống đăng. Quy tắc hạ ưu tiên giấu hết cả 20, và dòng
 *  chính hiện "không có bài nào khớp bộ lọc" - người dùng đọc ra là bài viết
 *  đã mất. Quy tắc sinh ra để bài hệ thống không dìm bài người thật; khi chưa
 *  có bài người thật nào thì nó không còn gì để dìm. */
describe("dòng chính không được rỗng vì chính quy tắc hạ ưu tiên", () => {
  const onlyStreaks = [streak, post({ content: "Đã học 21 ngày liên tiếp", kind: "streak" })];

  it("chỉ toàn thành tựu thì vẫn hiện chúng ở dòng chính", () => {
    expect(visibleFeedPosts(onlyStreaks, "all", "")).toHaveLength(2);
  });

  it("có bài người thật thì thành tựu vẫn bị hạ như cũ", () => {
    const mixed = [...onlyStreaks, post()];
    const visible = visibleFeedPosts(mixed, "all", "");
    expect(visible).toHaveLength(1);
    expect(visible[0].kind).toBe("post");
  });

  it("tìm kiếm không ra kết quả thì vẫn là rỗng, không lấp bằng bài khác", () => {
    // "Không có gì khớp" là câu trả lời đúng ở đây; lấp nó mới là nói dối.
    expect(visibleFeedPosts(onlyStreaks, "all", "wacc")).toHaveLength(0);
  });

  it("bộ lọc chủ đề rỗng thì vẫn là rỗng", () => {
    expect(visibleFeedPosts(onlyStreaks, "hoi-dap", "")).toHaveLength(0);
  });
});
