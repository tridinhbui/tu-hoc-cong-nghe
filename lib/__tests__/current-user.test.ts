import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

/** Chỗ hỏi "tôi là ai" dùng chung.
 *
 *  Cái nó cắt là số vòng mạng, nên bài kiểm chính là ĐẾM số lần gọi
 *  fetch("/api/auth/me"). Phần còn lại kiểm rằng nó không cắt nhầm: đổi phiên
 *  phải quên kết quả cũ, và một lần hỏng mạng không được kẹt vĩnh viễn.
 *
 *  VIẾT LẠI SAU KHI CHUYỂN SANG D1. Bản trước mô phỏng
 *  supabase.auth.getSession()/onAuthStateChange(); bản này mô phỏng thẳng
 *  fetch() toàn cục, vì đó là API duy nhất module mới gọi tới - không còn sự
 *  kiện đổi phiên nào để lắng nghe (cookie phiên là httpOnly, trình duyệt
 *  không thấy nó đổi), nên mọi thao tác đổi phiên phải tự gọi
 *  resetCurrentUserCache() - xem signOut() và app/login/page.tsx. */

const fetchMock = vi.fn();

function userRes(id: string) {
  return new Response(
    JSON.stringify({ user: { id, email: `${id}@x.vn`, role: "user", fullName: null, avatarUrl: null } }),
    { status: 200 }
  );
}
const nullRes = () => new Response(JSON.stringify({ user: null }), { status: 200 });

async function freshModule() {
  vi.resetModules();
  return import("@/lib/current-user");
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("gộp lời gọi", () => {
  it("năm component gắn cùng lúc chỉ tạo một request", async () => {
    // Đây là con số thật trên một trang bài học: LessonNotes, BookmarkButton,
    // LessonPageLayout, LessonStatsHover, ManualLessonFlagButton.
    const { getCurrentUser } = await freshModule();
    fetchMock.mockImplementation(
      () => new Promise((r) => setTimeout(() => r(userRes("u1")), 5))
    );

    const all = await Promise.all(Array.from({ length: 5 }, () => getCurrentUser()));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(all.every((u) => u?.id === "u1")).toBe(true);
  });

  it("component gắn muộn hơn lấy kết quả đã nhớ, không hỏi lại", async () => {
    const { getCurrentUser } = await freshModule();
    fetchMock.mockResolvedValue(userRes("u1"));

    await getCurrentUser();
    await getCurrentUser();
    await getCurrentUser();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("getCurrentUserId dùng chung phần đã nhớ đó", async () => {
    const { getCurrentUser, getCurrentUserId } = await freshModule();
    fetchMock.mockResolvedValue(userRes("u1"));

    await getCurrentUser();
    expect(await getCurrentUserId()).toBe("u1");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("không cắt nhầm", () => {
  it("chưa đăng nhập thì trả null, và vẫn chỉ hỏi một lần", async () => {
    const { getCurrentUser } = await freshModule();
    fetchMock.mockResolvedValue(nullRes());

    expect(await getCurrentUser()).toBeNull();
    expect(await getCurrentUser()).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("đổi phiên thì quên kết quả cũ", async () => {
    // Không có phần này thì một người đăng xuất rồi đăng nhập bằng tài khoản
    // khác trong cùng tab sẽ thấy dữ liệu của tài khoản cũ tới khi tải lại.
    const { getCurrentUser, resetCurrentUserCache } = await freshModule();
    fetchMock.mockResolvedValue(userRes("u1"));
    expect((await getCurrentUser())?.id).toBe("u1");

    resetCurrentUserCache();
    fetchMock.mockResolvedValue(userRes("u2"));

    expect((await getCurrentUser())?.id).toBe("u2");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("signOut() gọi route máy chủ RỒI mới quên bộ nhớ đệm, không phải ngược lại", async () => {
    // Ngược lại để lại một khoảng ngắn nơi getCurrentUser() gọi lại trong lúc
    // request đăng xuất chưa xong, và có thể vẫn thấy phiên cũ.
    const { getCurrentUser, signOut } = await freshModule();
    fetchMock.mockResolvedValue(userRes("u1"));
    await getCurrentUser();

    const order: string[] = [];
    fetchMock.mockImplementation((url: string) => {
      if (url === "/api/auth/sign-out") {
        order.push("sign-out-called");
        return Promise.resolve(new Response(null, { status: 200 }));
      }
      return Promise.resolve(userRes("u2"));
    });

    await signOut();
    order.push("cache-should-be-empty-now");

    expect(order).toEqual(["sign-out-called", "cache-should-be-empty-now"]);
    // Sau signOut(), hỏi lại phải đi một lượt fetch mới - không còn u1 trong bộ nhớ.
    fetchMock.mockResolvedValue(nullRes());
    expect(await getCurrentUser()).toBeNull();
  });

  it("hỏng mạng một lần thì lần sau thử lại, không kẹt vĩnh viễn", async () => {
    const { getCurrentUser } = await freshModule();
    fetchMock.mockRejectedValueOnce(new Error("network"));

    // fetch() ném lỗi mạng thật (không phải HTTP lỗi) không được để inflight
    // kẹt lại mãi - lần gọi sau phải thử lại chứ không chờ một lời hứa đã vỡ.
    await expect(getCurrentUser()).rejects.toThrow("network");

    fetchMock.mockResolvedValue(userRes("u1"));
    expect((await getCurrentUser())?.id).toBe("u1");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("JSON hỏng thì coi như chưa đăng nhập, không ném lỗi", async () => {
    const { getCurrentUser } = await freshModule();
    fetchMock.mockResolvedValue(new Response("khong phai json", { status: 200 }));
    expect(await getCurrentUser()).toBeNull();
  });
});

describe("đọc hồ sơ", () => {
  it("fullName/avatarUrl đi thẳng từ phản hồi, không cần hàm phụ trợ nào", async () => {
    // Khác bản Supabase cũ: không còn "user_metadata" tách khỏi hồ sơ - cả hai
    // đường tạo tài khoản (đăng ký, Google) đều ghi thẳng vào user_profiles
    // ngay lúc tạo, xem lib/auth/service.ts.
    const { getCurrentUser } = await freshModule();
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({ user: { id: "u1", email: "a@b.vn", role: "user", fullName: "Trí", avatarUrl: "https://x/y.png" } }),
        { status: 200 }
      )
    );
    const u = await getCurrentUser();
    expect(u?.fullName).toBe("Trí");
    expect(u?.avatarUrl).toBe("https://x/y.png");
  });
});
