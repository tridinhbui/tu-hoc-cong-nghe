import { describe, it, expect } from "vitest";
import { sanitizeSearchTerm, buildOrIlikeFilter } from "@/lib/admin/search-filter";

describe("sanitizeSearchTerm", () => {
  it("strips PostgREST filter-DSL syntax characters", () => {
    expect(sanitizeSearchTerm("a,b(c)d")).toBe("abcd");
  });

  it("trims surrounding whitespace", () => {
    expect(sanitizeSearchTerm("  hello  ")).toBe("hello");
  });
});

describe("buildOrIlikeFilter", () => {
  it("builds a comma-joined ilike filter across all given fields", () => {
    expect(buildOrIlikeFilter(["name", "email"], "an")).toBe("name.ilike.%an%,email.ilike.%an%");
  });

  it("returns null for an empty or whitespace-only term", () => {
    expect(buildOrIlikeFilter(["name"], "")).toBeNull();
    expect(buildOrIlikeFilter(["name"], "   ")).toBeNull();
  });

  it("sanitizes the term before building the filter, so it can't break the .or() DSL", () => {
    expect(buildOrIlikeFilter(["name", "email"], "a,b(c)")).toBe("name.ilike.%abc%,email.ilike.%abc%");
  });
});
