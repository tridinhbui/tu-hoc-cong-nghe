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

describe("dòng chính hiện đủ bài", () => {
  it("bài thành tựu HIỆN khi đang xem tất cả", () => {
    // Bản trước trả false ở đây: bài thành tựu bị cất khỏi dòng chính khi xem
    // "tất cả". Luật đó đã bỏ - xem chú thích của isPostVisibleInFeed. Ca này
    // giữ nguyên tên biến để đọc song song với lịch sử: cùng hai bài, đảo kết
    // quả, vì đó đúng là thay đổi duy nhất.
    expect(isPostVisibleInFeed(streak, "all", "")).toBe(true);
    expect(isPostVisibleInFeed(tagged, "all", "")).toBe(true);
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
 *  chuỗi ngày học do hệ thống đăng. Quy tắc hạ ưu tiên giấu hết cả 20, dòng
 *  chính hiện "không có bài nào khớp bộ lọc", và người dùng đọc ra là bài viết
 *  đã mất - câu đầu tiên họ hỏi đúng là "tôi bị mất bài rồi à".
 *
 *  Nhánh cứu từng được thêm để đỡ chuyện đó, nhưng nó loại trừ bài chuỗi ngày -
 *  tức loại trừ đúng nhóm chiếm gần hết số bài - nên nó không cứu được chính ca
 *  nó sinh ra để cứu. Cả luật và nhánh cứu đã bỏ; dòng chính giờ hiện đủ bài.
 *
 *  Vấn đề thật mà luật kia nhắm tới - bài hệ thống nhiều hơn bài người viết -
 *  là vấn đề của NGUỒN bài, và giấu chúng đi không làm ai viết thêm bài nào. */
describe("cộng đồng chỉ toàn bài hệ thống vẫn hiện đủ ở dòng chính", () => {
  const onlyStreaks = [streak, post({ content: "Đã học 21 ngày liên tiếp", kind: "streak" })];

  it("chỉ toàn chuỗi ngày học thì dòng chính hiện ĐỦ, không rỗng", () => {
    expect(visibleFeedPosts(onlyStreaks, "all", "")).toHaveLength(2);
  });

  it("bài thành tựu người thật viết đứng cùng bài hệ thống", () => {
    expect(visibleFeedPosts([...onlyStreaks, tagged], "all", "")).toHaveLength(3);
  });

  it("có bài người thật thì mọi bài cùng hiện, không bài nào bị hạ", () => {
    const mixed = [...onlyStreaks, post()];
    expect(visibleFeedPosts(mixed, "all", "")).toHaveLength(3);
  });

  it("tìm kiếm không ra kết quả thì vẫn là rỗng, không lấp bằng bài khác", () => {
    // "Không có gì khớp" là câu trả lời đúng ở đây; lấp nó mới là nói dối.
    expect(visibleFeedPosts(onlyStreaks, "all", "wacc")).toHaveLength(0);
  });

  it("bộ lọc chủ đề rỗng thì vẫn là rỗng", () => {
    expect(visibleFeedPosts(onlyStreaks, "hoi-dap", "")).toHaveLength(0);
  });
});
