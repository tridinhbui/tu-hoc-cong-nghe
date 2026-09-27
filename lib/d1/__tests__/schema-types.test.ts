import { describe, expect, it } from "vitest";
import snapshot from "../../../scripts/d1/schema-snapshot.json";
import { typesFromSnapshot } from "../schema-types";

describe("bảng kiểu cột mà server.ts dùng", () => {
  const types = typesFromSnapshot(snapshot);

  it("khoá là TÊN BẢNG, không phải khoá cấp cao của tệp JSON", () => {
    // Bản lỗi cho ra đúng ba khoá này, và mọi `.from()` phía máy chủ đều hỏng.
    expect(Object.keys(types)).not.toContain("tables");
    expect(Object.keys(types)).not.toContain("takenAt");
    expect(types.community_posts).toBeDefined();
    expect(types.user_progress).toBeDefined();
  });

  it("giá trị là format của từng cột - thứ bộ dựng truy vấn dùng để đổi boolean/jsonb", () => {
    expect(types.user_progress.completed).toBe("boolean");
    expect(types.user_profiles.tour_flags).toBe("jsonb");
  });

  it("phủ đủ mọi bảng trong bản chụp", () => {
    expect(Object.keys(types).length).toBe(Object.keys((snapshot as { tables: object }).tables).length);
  });
});
