import { describe, it, expect } from "vitest";
import { timeAgo } from "@/lib/time-ago";

describe("timeAgo", () => {
  it("shows 'Vừa xong' for anything under a minute", () => {
    expect(timeAgo(new Date(Date.now() - 30_000).toISOString())).toBe("Vừa xong");
    expect(timeAgo(new Date().toISOString())).toBe("Vừa xong");
  });

  it("shows minutes under an hour", () => {
    expect(timeAgo(new Date(Date.now() - 5 * 60_000).toISOString())).toBe("5 phút trước");
    expect(timeAgo(new Date(Date.now() - 59 * 60_000).toISOString())).toBe("59 phút trước");
  });

  it("shows hours under a day", () => {
    expect(timeAgo(new Date(Date.now() - 3 * 3_600_000).toISOString())).toBe("3 giờ trước");
    expect(timeAgo(new Date(Date.now() - 23 * 3_600_000).toISOString())).toBe("23 giờ trước");
  });

  it("shows days beyond that", () => {
    expect(timeAgo(new Date(Date.now() - 2 * 86_400_000).toISOString())).toBe("2 ngày trước");
  });
});
