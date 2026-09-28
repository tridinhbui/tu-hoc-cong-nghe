import { beforeEach, describe, expect, it, vi } from "vitest";
import { toPublicItems, fillDaily } from "../public-activity";

const lessons = new Map([
  [42, { title: "Big-O trong 5 phút", slug: "big-o" }],
  [7, { title: "Biến và phép gán", slug: "bien-va-phep-gan" }],
]);

describe("dòng hoạt động công khai - ẩn danh", () => {
  it("mỗi mục chỉ có đúng bốn trường, kể cả khi hàng gốc mang thêm cột", () => {
    // RPC trả tên, ảnh, user_id của người thật. Và một cột mới thêm vào RPC sau
    // này - ở đây là `email` - cũng không được lọt: danh sách TRẮNG, không đen.
    const out = toPublicItems(
      [
        {
          user_id: "u-1",
          name: "Nguyễn Văn A",
          avatar_url: "https://x/a.png",
          email: "a@example.com",
          current_streak: 12,
          lesson_id: 42,
          completed_at: "2026-09-27 10:15:00",
        },
      ],
      lessons
    );
    expect(out).toHaveLength(1);
    expect(Object.keys(out[0]).sort()).toEqual(["at", "lessonSlug", "lessonTitle", "streak"]);
    const serialized = JSON.stringify(out);
    for (const secret of ["u-1", "Nguyễn Văn A", "a.png", "a@example.com"]) {
      expect(serialized).not.toContain(secret);
    }
  });

  it("bỏ hàng không có bài hoặc không có thời điểm - không bịa dòng trống", () => {
    const out = toPublicItems(
      [
        { lesson_id: null, completed_at: "2026-09-27 10:00:00", current_streak: 3 },
        { lesson_id: 999, completed_at: "2026-09-27 10:00:00", current_streak: 3 },
        { lesson_id: 7, completed_at: null, current_streak: 3 },
        { lesson_id: 7, completed_at: "2026-09-27 09:00:00", current_streak: 3 },
      ],
      lessons
    );
    expect(out.map((x) => x.lessonSlug)).toEqual(["bien-va-phep-gan"]);
  });

  it("thời điểm SQLite thành ISO UTC, mới nhất lên đầu", () => {
    const out = toPublicItems(
      [
        { lesson_id: 7, completed_at: "2026-09-26 08:00:00", current_streak: 1 },
        { lesson_id: 42, completed_at: "2026-09-27 08:00:00", current_streak: 1 },
      ],
      lessons
    );
    expect(out[0].at).toBe("2026-09-27T08:00:00.000Z");
    expect(out.map((x) => x.lessonSlug)).toEqual(["big-o", "bien-va-phep-gan"]);
  });
});

describe("đồ thị 14 ngày", () => {
  it("đủ 14 ngày, ngày không ai học là 0 chứ không biến mất", () => {
    const now = new Date("2026-09-27T12:00:00Z");
    const d = fillDaily([{ d: "2026-09-27", n: 5 }, { d: "2026-09-20", n: 2 }], 14, now);
    expect(d).toHaveLength(14);
    expect(d[0].date).toBe("2026-09-14");
    expect(d[13]).toEqual({ date: "2026-09-27", count: 5 });
    expect(d.find((x) => x.date === "2026-09-20")?.count).toBe(2);
    expect(d.filter((x) => x.count === 0)).toHaveLength(12);
  });
});

// ---------------------------------------------------------------------------
// Route: bộ đệm là thứ đứng giữa trang chủ công khai và hạn mức đọc của D1.
// ---------------------------------------------------------------------------

const prepare = vi.fn(() => ({ all: async () => ({ results: [{ d: "2026-09-27", n: 3 }] }) }));
vi.mock("@/lib/d1/server", () => ({ getDb: () => ({ prepare }) }));
vi.mock("@/lib/d1/rpc", () => ({
  getCommunityLearningNow: vi.fn(async () => [
    { user_id: "u-1", name: "Người Thật", avatar_url: "x", current_streak: 4, lesson_id: 42, completed_at: "2026-09-27 10:00:00" },
  ]),
}));
vi.mock("@/lib/lessons-loader", () => ({
  getLessonsMeta: vi.fn(async () => [{ id: 42, title: "Big-O trong 5 phút", slug: "big-o" }]),
}));

describe("route /api/public/activity", () => {
  beforeEach(() => {
    vi.resetModules();
    prepare.mockClear();
  });

  it("lượt gọi thứ hai đi qua bộ đệm, không chạm cơ sở dữ liệu", async () => {
    const { GET } = await import("../../app/api/public/activity/route");
    await GET(new Request("http://x/api/public/activity?locale=vi"));
    await GET(new Request("http://x/api/public/activity?locale=vi"));
    expect(prepare).toHaveBeenCalledTimes(1);
  });

  it("tham số lạ không phá được bộ đệm", async () => {
    // Nếu khoá đệm là cả URL, `?x=1`, `?x=2`... mỗi cái một lần quét D1.
    const { GET } = await import("../../app/api/public/activity/route");
    await GET(new Request("http://x/api/public/activity?locale=vi&x=1"));
    await GET(new Request("http://x/api/public/activity?locale=vi&x=2"));
    await GET(new Request("http://x/api/public/activity?locale=vi&x=3"));
    expect(prepare).toHaveBeenCalledTimes(1);
  });

  it("phản hồi không chứa danh tính, và có header đệm", async () => {
    const { GET } = await import("../../app/api/public/activity/route");
    const res = await GET(new Request("http://x/api/public/activity?locale=vi"));
    const text = await res.text();
    expect(text).not.toContain("Người Thật");
    expect(text).not.toContain("u-1");
    expect(text).toContain("Big-O trong 5 phút");
    expect(res.headers.get("Cache-Control")).toMatch(/s-maxage=\d+/);
  });

  it("cơ sở dữ liệu lỗi thì trả rỗng, không 500", async () => {
    prepare.mockImplementationOnce(() => {
      throw new Error("D1 exceeded daily read limit");
    });
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const { GET } = await import("../../app/api/public/activity/route");
    const res = await GET(new Request("http://x/api/public/activity?locale=en"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.items).toEqual([]);
    expect(body.daily).toHaveLength(14);
    err.mockRestore();
  });
});
