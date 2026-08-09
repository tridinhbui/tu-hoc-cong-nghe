import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  FEED_TOPIC_TAGS,
  getPostCategory,
  isPostVisibleInFeed,
  visibleFeedPosts,
  type ClassifiablePost,
} from "@/lib/community-feed-visibility";

/** Phân loại và hiển thị bài trong feed cộng đồng.
 *
 *  Màn hình cộng đồng tự lấy dữ liệu từ Supabase sau tường đăng nhập, nên đây
 *  là chỗ duy nhất kiểm được những luật này mà không cần một phiên đăng nhập
 *  thật và vài chục bài đăng dựng sẵn. */

const post = (over: Partial<ClassifiablePost & { user_name: string }> = {}) => ({
  content: "Hôm nay mình hiểu ra cách đọc dòng tiền tự do",
  user_name: "Minh",
  kind: "post",
  ...over,
});

const streak = post({ content: "Đã học 7 ngày liên tiếp", kind: "streak" });

describe("phân loại bài", () => {
  it("hashtag trong nội dung đã lưu quyết định chủ đề", () => {
    expect(getPostCategory(post({ content: "#HoiDap WACC tính sao" }))).toBe("hoi-dap");
    expect(getPostCategory(post({ content: "Trả nợ thẻ trước đã #MeoTaiChinh" }))).toBe(
      "meo-tai-chinh"
    );
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

/** Chủ đề "Thành tựu" đã bỏ hẳn.
 *
 *  Nó gần như toàn bộ là bài do hệ thống tự đăng - chuỗi ngày học - nên nó
 *  không phải một chủ đề người ta viết vào mà là một luồng máy sinh ra được cho
 *  một cái nhãn, rồi cái nhãn đó lại đứng cạnh những nhãn do người chọn.
 *
 *  Điều PHẢI đúng khi bỏ một chủ đề: bài cũ dưới nó mất nhãn, chứ không mất
 *  bài. Đó là phân biệt duy nhất đáng kiểm ở đây, vì lần trước chính chỗ này
 *  sai theo chiều còn lại - một luật giấu bài đi và người dùng đọc ra là mất
 *  dữ liệu. */
describe("thành tựu không còn là một chủ đề", () => {
  it("không còn chủ đề nào tên thanh-tuu", () => {
    expect(FEED_TOPIC_TAGS.map((topic) => topic.id)).not.toContain("thanh-tuu");
  });

  it("bài chuỗi ngày do hệ thống đăng là bài không loại nào", () => {
    expect(getPostCategory(streak)).toBe("all");
  });

  it("hashtag #ThanhTuu trong bài cũ không còn phân loại gì", () => {
    expect(getPostCategory(post({ content: "#ThanhTuu Vừa xong chặng định giá" }))).toBe("all");
  });

  it("mất nhãn chứ KHÔNG mất bài: cả hai vẫn hiện đủ ở dòng chính", () => {
    const old = [streak, post({ content: "#ThanhTuu Vừa xong chặng định giá" })];
    expect(visibleFeedPosts(old, "all", "")).toHaveLength(2);
  });

  it("tìm kiếm vẫn tìm ra chúng", () => {
    // Gõ tên một người rồi không thấy bài của họ đâu là một lỗi, không phải
    // một lựa chọn bố cục.
    expect(isPostVisibleInFeed(streak, "all", "7 ngày")).toBe(true);
    expect(isPostVisibleInFeed(streak, "all", "Minh")).toBe(true);
  });
});

/** Mẹo tài chính ở LẠI, sau một lần bị bỏ rồi đưa về.
 *
 *  Lý do bỏ vẫn đúng nhưng nhắm sai chỗ: nó là giá trị MẶC ĐỊNH của ô soạn bài,
 *  nên bài của người chưa từng mở hộp chọn đều ra đời dưới nhãn "Mẹo tài chính".
 *  Cái sai là cái mặc định. Bỏ chủ đề đi thì mọi bài từng được gắn nhãn ấy một
 *  cách có ý cũng mất nhãn theo - tức sửa một lỗi gán nhãn bằng cách xoá nhãn
 *  của người gán đúng. */
describe("mẹo tài chính vẫn là một chủ đề", () => {
  it("còn trong bảng chủ đề", () => {
    expect(FEED_TOPIC_TAGS.map((topic) => topic.id)).toContain("meo-tai-chinh");
  });

  it("bài cũ đọc lại đúng nhãn của nó, qua cả hai đường", () => {
    expect(getPostCategory(post({ content: "Tiết kiệm 20% #MeoTaiChinh" }))).toBe("meo-tai-chinh");
    expect(getPostCategory(post({ metadata: { category: "meo-tai-chinh" } }))).toBe(
      "meo-tai-chinh"
    );
  });

  it("lọc theo chủ đề đó ra đúng bài của nó", () => {
    const posts = [post({ content: "Tiết kiệm 20% #MeoTaiChinh" }), post(), streak];
    expect(visibleFeedPosts(posts, "meo-tai-chinh", "")).toHaveLength(1);
  });
});

describe("dòng chính hiện đủ bài", () => {
  it("bài chia sẻ thường thì hiện", () => {
    expect(isPostVisibleInFeed(post(), "all", "")).toBe(true);
  });

  it("tìm kiếm không khớp thì không hiện", () => {
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
 *  chuỗi ngày học do hệ thống đăng. Một quy tắc hạ ưu tiên giấu hết cả 20, dòng
 *  chính hiện "không có bài nào khớp bộ lọc", và người dùng đọc ra là bài viết
 *  đã mất - câu đầu tiên họ hỏi đúng là "tôi bị mất bài rồi à".
 *
 *  Nhánh cứu từng được thêm để đỡ chuyện đó, nhưng nó loại trừ bài chuỗi ngày -
 *  tức loại trừ đúng nhóm chiếm gần hết số bài - nên nó không cứu được chính ca
 *  nó sinh ra để cứu. Cả luật và nhánh cứu đã bỏ.
 *
 *  Vấn đề thật mà luật kia nhắm tới - bài hệ thống nhiều hơn bài người viết -
 *  là vấn đề của NGUỒN bài, và giấu chúng đi không làm ai viết thêm bài nào. */
describe("cộng đồng chỉ toàn bài hệ thống vẫn hiện đủ ở dòng chính", () => {
  const onlyStreaks = [streak, post({ content: "Đã học 21 ngày liên tiếp", kind: "streak" })];

  it("chỉ toàn chuỗi ngày học thì dòng chính hiện ĐỦ, không rỗng", () => {
    expect(visibleFeedPosts(onlyStreaks, "all", "")).toHaveLength(2);
  });

  it("có bài người thật thì mọi bài cùng hiện, không bài nào bị hạ", () => {
    expect(visibleFeedPosts([...onlyStreaks, post()], "all", "")).toHaveLength(3);
  });

  it("tìm kiếm không ra kết quả thì vẫn là rỗng, không lấp bằng bài khác", () => {
    // "Không có gì khớp" là câu trả lời đúng ở đây; lấp nó mới là nói dối.
    expect(visibleFeedPosts(onlyStreaks, "all", "wacc")).toHaveLength(0);
  });

  it("bộ lọc chủ đề rỗng thì vẫn là rỗng", () => {
    expect(visibleFeedPosts(onlyStreaks, "hoi-dap", "")).toHaveLength(0);
  });
});

/** Những luật nằm trong JSX, nên chỉ đọc được từ mã nguồn.
 *
 *  Ba luật dưới đây không có hàm nào để gọi: chúng là một giá trị khởi tạo, một
 *  danh sách render, và sự VẮNG MẶT của một khối. Cái thứ ba là cái đáng kiểm
 *  nhất - một khối JSX bị dựng lại thì tsc không nói gì, test hàm không nói gì,
 *  và chủ đề đã bỏ sẽ quay lại chỉ trên màn hình. */
describe("ô soạn bài và cột bên", () => {
  const source = readFileSync(
    new URL("../../components/CommunityFeedClient.tsx", import.meta.url),
    "utf-8"
  );

  it("mặc định là KHÔNG chọn loại nào", () => {
    // Đây là lỗi gốc: mặc định từng là "meo-tai-chinh", nên một câu hỏi hay một
    // dòng tâm sự cũng ra đời dưới nhãn "Mẹo", do phần mềm đoán hộ.
    expect(source).toMatch(/useState<TopicId>\("all"\)/);
  });

  it("không ghi khoá category khi người viết không chọn loại nào", () => {
    // Ghi "all" vào cột này là để dành sẵn một chủ đề tên "Tất cả" cho lần sau
    // ai đó đọc dữ liệu đã lưu.
    expect(source).toContain('selectedTopic === "all" ? {} : { category: selectedTopic }');
  });

  it("hộp chọn đọc COMPOSER_TOPICS, không lọc lại ngay tại chỗ hiển thị", () => {
    expect(source).toContain("{COMPOSER_TOPICS.map((item) => (");
    expect(source).not.toContain('{TOPICS.filter((item) => item.id !== "all").map(');
  });

  it("không còn chữ thanh-tuu nào trong màn hình cộng đồng", () => {
    // Bao gồm cả khối "Thành tựu" ở cột bên và ô thứ ba của thẻ "Nổi bật": cả
    // hai đọc theo chủ đề đã bỏ, nên còn lại một chữ nghĩa là còn một đường
    // dựng nó về.
    expect(source).not.toContain("thanh-tuu");
    expect(source).not.toContain("achievementPosts");
  });
});
