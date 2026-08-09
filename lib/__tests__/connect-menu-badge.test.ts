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

describe("cộng đủ ba nguồn", () => {
  it("cộng cả ba", () => {
    expect(totalConnectCount(counts({ friendRequests: 2, feedbackReplies: 1, groupMessages: 3 }))).toBe(6);
  });

  it("mỗi nguồn một mình đều được báo", () => {
    // Bỏ sót một nguồn là đúng lỗi đang sửa, nên kiểm từng cái riêng.
    expect(totalConnectCount(counts({ friendRequests: 1 }))).toBe(1);
    expect(totalConnectCount(counts({ feedbackReplies: 1 }))).toBe(1);
    expect(totalConnectCount(counts({ groupMessages: 1 }))).toBe(1);
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
