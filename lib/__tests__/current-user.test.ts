import { beforeEach, describe, expect, it, vi } from "vitest";

/** Chỗ hỏi "tôi là ai" dùng chung.
 *
 *  Cái nó cắt là số vòng mạng, nên bài kiểm chính là ĐẾM số lần gọi. Phần còn
 *  lại kiểm rằng nó không cắt nhầm: đổi phiên phải quên kết quả cũ, và một lần
 *  hỏng mạng không được kẹt vĩnh viễn. */

const getSession = vi.fn();
const onAuthStateChange = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createClient: () => ({ auth: { getSession, onAuthStateChange } }),
}));

const session = (id: string) => ({ data: { session: { user: { id, email: `${id}@x.vn` } } } });

async function freshModule() {
  vi.resetModules();
  return import("@/lib/current-user");
}

beforeEach(() => {
  getSession.mockReset();
  onAuthStateChange.mockReset();
});

describe("gộp lời gọi", () => {
  it("năm component gắn cùng lúc chỉ tạo một request", async () => {
    // Đây là con số thật trên một trang bài học: LessonNotes, BookmarkButton,
    // LessonPageLayout, LessonStatsHover, ManualLessonFlagButton.
    const { getCurrentUser } = await freshModule();
    getSession.mockImplementation(
      () => new Promise((r) => setTimeout(() => r(session("u1")), 5))
    );

    const all = await Promise.all(Array.from({ length: 5 }, () => getCurrentUser()));

    expect(getSession).toHaveBeenCalledTimes(1);
    expect(all.every((u) => u?.id === "u1")).toBe(true);
  });

  it("component gắn muộn hơn lấy kết quả đã nhớ, không hỏi lại", async () => {
    const { getCurrentUser } = await freshModule();
    getSession.mockResolvedValue(session("u1"));

    await getCurrentUser();
    await getCurrentUser();
    await getCurrentUser();

    expect(getSession).toHaveBeenCalledTimes(1);
  });

  it("getCurrentUserId dùng chung phần đã nhớ đó", async () => {
    const { getCurrentUser, getCurrentUserId } = await freshModule();
    getSession.mockResolvedValue(session("u1"));

    await getCurrentUser();
    expect(await getCurrentUserId()).toBe("u1");
    expect(getSession).toHaveBeenCalledTimes(1);
  });
});

describe("không cắt nhầm", () => {
  it("chưa đăng nhập thì trả null, và vẫn chỉ hỏi một lần", async () => {
    const { getCurrentUser } = await freshModule();
    getSession.mockResolvedValue({ data: { session: null } });

    expect(await getCurrentUser()).toBeNull();
    expect(await getCurrentUser()).toBeNull();
    expect(getSession).toHaveBeenCalledTimes(1);
  });

  it("đổi phiên thì quên kết quả cũ", async () => {
    // Không có phần này thì một người đăng xuất rồi đăng nhập bằng tài khoản
    // khác trong cùng tab sẽ thấy dữ liệu của tài khoản cũ tới khi tải lại.
    const { getCurrentUser, resetCurrentUserCache } = await freshModule();
    getSession.mockResolvedValue(session("u1"));
    expect((await getCurrentUser())?.id).toBe("u1");

    resetCurrentUserCache();
    getSession.mockResolvedValue(session("u2"));

    expect((await getCurrentUser())?.id).toBe("u2");
    expect(getSession).toHaveBeenCalledTimes(2);
  });

  it("có đăng ký lắng nghe đổi phiên, và chỉ đăng ký một lần", async () => {
    const { getCurrentUser } = await freshModule();
    getSession.mockResolvedValue(session("u1"));

    await getCurrentUser();
    await getCurrentUser();

    expect(onAuthStateChange).toHaveBeenCalledTimes(1);
  });

  it("lời gọi đăng ký đó thật sự xoá phần đã nhớ", async () => {
    const { getCurrentUser } = await freshModule();
    getSession.mockResolvedValue(session("u1"));
    await getCurrentUser();

    // Gọi đúng callback mà module đã đưa cho onAuthStateChange.
    const handler = onAuthStateChange.mock.calls[0][0] as () => void;
    handler();

    getSession.mockResolvedValue(session("u2"));
    expect((await getCurrentUser())?.id).toBe("u2");
  });

  it("hỏng mạng một lần thì lần sau thử lại, không kẹt vĩnh viễn", async () => {
    const { getCurrentUser } = await freshModule();
    getSession.mockRejectedValueOnce(new Error("network"));

    await expect(getCurrentUser()).rejects.toThrow("network");

    getSession.mockResolvedValue(session("u1"));
    expect((await getCurrentUser())?.id).toBe("u1");
    expect(getSession).toHaveBeenCalledTimes(2);
  });
});
