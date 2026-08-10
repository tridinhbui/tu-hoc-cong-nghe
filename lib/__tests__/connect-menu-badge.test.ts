import { describe, expect, it } from "vitest";
import {
  EMPTY_CONNECT_COUNTS,
  connectBadgeLabel,
  hasPending,
  totalConnectCount,
  type ConnectCounts,
} from "@/lib/connect-menu-badge";

/** Huy hiệu của nút Kết nối.
 *
 *  Lỗi được báo là MẤT tin: lời mời kết bạn tới mà không thấy báo ở đâu. Nên
 *  phần đáng kiểm nhất ở đây là chiều thiếu - một nguồn bị bỏ quên, một phép
 *  cộng trả 0 khi lẽ ra phải báo. Cộng thừa chỉ làm người dùng mở ra rồi thấy
 *  trống; cộng thiếu thì họ không mở ra bao giờ. */

const counts = (over: Partial<ConnectCounts> = {}): ConnectCounts => ({
  ...EMPTY_CONNECT_COUNTS,
  ...over,
});

const SOURCES = Object.keys(EMPTY_CONNECT_COUNTS) as (keyof ConnectCounts)[];

describe("cộng đủ mọi nguồn", () => {
  it("cộng tất cả", () => {
    expect(
      totalConnectCount(counts({ friendRequests: 2, directMessages: 4, feedbackReplies: 1, groupMessages: 3 }))
    ).toBe(10);
  });

  // Duyệt theo EMPTY_CONNECT_COUNTS chứ không liệt kê tay, và đó là điểm của
  // bộ kiểm này. Bản đầu liệt kê ba nguồn; khi `directMessages` được thêm vào
  // kiểu, cả bốn ca vẫn xanh vì helper `counts()` trải EMPTY vào - tức là bộ
  // kiểm dựng lên để bắt "bỏ sót một nguồn" lại không bắt được đúng lần một
  // nguồn bị thêm mà quên cộng. Duyệt thì lần sau không quên được nữa.
  it.each(SOURCES)("nguồn %s một mình vẫn được báo", (source) => {
    expect(totalConnectCount(counts({ [source]: 1 }))).toBe(1);
    expect(connectBadgeLabel(counts({ [source]: 1 }))).toBe("1");
    expect(hasPending(counts({ [source]: 1 }), source)).toBe(true);
  });

  it("không có gì thì là 0", () => {
    expect(totalConnectCount(EMPTY_CONNECT_COUNTS)).toBe(0);
  });

  it("số rác không làm hỏng tổng", () => {
    // Các nguồn đến từ ba truy vấn khác nhau; một cái hỏng trả NaN thì hai
    // cái còn lại vẫn phải báo được.
    expect(totalConnectCount(counts({ friendRequests: Number.NaN, groupMessages: 2 }))).toBe(2);
    expect(totalConnectCount(counts({ feedbackReplies: -5, groupMessages: 2 }))).toBe(2);
  });
});

describe("chữ trên huy hiệu", () => {
  it("không có việc gì thì KHÔNG dựng huy hiệu", () => {
    // null chứ không phải "0": một chấm đỏ ghi 0 vẫn kéo mắt người dùng.
    expect(connectBadgeLabel(EMPTY_CONNECT_COUNTS)).toBeNull();
  });

  it("in số thật khi còn đọc được", () => {
    expect(connectBadgeLabel(counts({ friendRequests: 1 }))).toBe("1");
    expect(connectBadgeLabel(counts({ groupMessages: 9 }))).toBe("9");
  });

  it("cắt ở 9+ để không tràn khỏi nút tròn", () => {
    expect(connectBadgeLabel(counts({ groupMessages: 10 }))).toBe("9+");
    expect(connectBadgeLabel(counts({ groupMessages: 348 }))).toBe("9+");
  });

  it("cộng dồn mới vượt 9 thì cũng cắt", () => {
    expect(connectBadgeLabel(counts({ friendRequests: 5, groupMessages: 5 }))).toBe("9+");
  });
});

describe("chấm báo cạnh từng dòng trong menu", () => {
  it("chỉ dòng có việc mới có chấm", () => {
    const c = counts({ friendRequests: 2 });
    expect(hasPending(c, "friendRequests")).toBe(true);
    expect(hasPending(c, "feedbackReplies")).toBe(false);
    expect(hasPending(c, "groupMessages")).toBe(false);
  });

  it("số rác không thành chấm", () => {
    expect(hasPending(counts({ friendRequests: Number.NaN }), "friendRequests")).toBe(false);
  });
});
